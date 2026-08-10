"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  buildSummary,
  buildSites,
  buildTrends,
  buildCategories,
  buildCatalogItems,
  buildItemResults,
  buildExecutiveReport,
  canonicalHash,
  escapeCsv
} = require("../server");

const networkFilters = { period: "2026 Q3", group: "All", region: "All", site: null };

test("working catalog exposes 33 approval-pending rows", () => {
  const rows = buildCatalogItems();
  assert.equal(rows.length, 33);
  assert.equal(rows.every((row) => row.demoItemId.startsWith("demo-sw-")), true);
  assert.equal(rows.some((row) => row.ownerGroup === "HRG"), true);
  assert.equal(rows.some((row) => row.readinessStatus === "governance_required"), true);
});

test("network metrics include transparent numerators and denominators", () => {
  const summary = buildSummary(networkFilters);
  assert.equal(summary.catalogVersion, "working-2026-07-29");
  assert.equal(summary.catalogApprovalStatus, "approval_pending");
  assert.equal(summary.scope.siteCount, 8);
  assert.equal(summary.metrics.greenShare.numerator, summary.distribution.green);
  assert.equal(
    summary.metrics.greenShare.denominator,
    summary.distribution.green + summary.distribution.yellow + summary.distribution.red
  );
  assert.equal(
    summary.metrics.evidenceCoverage.denominator,
    summary.metrics.greenShare.denominator + summary.distribution.missing
  );
  assert.equal(summary.metrics.greenShare.definitionVersion, "metric.hrfc.v1");
  assert.equal(summary.metrics.greenShare.comparabilityStatus, "illustrative_not_recast");
});

test("oldest period returns null change without crashing", () => {
  const oldestFilters = { ...networkFilters, period: "2025 Q4" };
  const summary = buildSummary(oldestFilters);
  const sites = buildSites(oldestFilters);
  assert.equal(summary.previousPeriod, null);
  assert.equal(summary.illustrativeChange, null);
  assert.equal(sites.length, 8);
  assert.equal(sites.every((site) => site.change === null), true);
});

test("item results preserve rating and result status independently", () => {
  const rows = buildItemResults({ ...networkFilters, site: "HOU1" });
  assert.equal(rows.length, 33);
  const unrated = rows.filter((row) => row.rating === null);
  assert.ok(unrated.length > 0);
  assert.equal(unrated.every((row) => ["unmapped", "manual_required", "missing_source"].includes(row.resultStatus)), true);
  assert.equal(rows.filter((row) => row.resultStatus === "unmapped").every((row) => row.rating === null), true);
  assert.equal(rows.filter((row) => ["blocked", "governance"].includes(row.sourceStatus)).every((row) => row.rating === null), true);
  assert.equal(rows.filter((row) => row.resultStatus === "manual_input").every((row) => row.rating !== null), true);
});

test("site rollups reconcile exactly to item results", () => {
  const site = buildSites({ ...networkFilters, site: "HOU1" })[0];
  const rows = buildItemResults({ ...networkFilters, site: "HOU1" });
  const counts = rows.reduce(
    (total, row) => {
      if (row.rating) total[row.rating] += 1;
      else total.missing += 1;
      return total;
    },
    { green: 0, yellow: 0, red: 0, missing: 0 }
  );
  assert.deepEqual(site.distribution, counts);
  assert.equal(site.metrics.evidenceCoverage.numerator, counts.green + counts.yellow + counts.red);
  assert.equal(site.metrics.evidenceCoverage.denominator, rows.length);
});

test("category summaries are derived from the selected period", () => {
  const current = buildCategories(networkFilters);
  const prior = buildCategories({ ...networkFilters, period: "2026 Q2" });
  assert.equal(current.length > 0, true);
  assert.notDeepEqual(
    current.map((row) => row.greenShare.value),
    prior.map((row) => row.greenShare.value)
  );
});

test("trend rows use explicit metrics and no composite quality index", () => {
  const trends = buildTrends(networkFilters);
  assert.equal(trends.length, 4);
  assert.deepEqual(trends.map((row) => row.period), ["2025 Q4", "2026 Q1", "2026 Q2", "2026 Q3"]);
  assert.equal(JSON.stringify(trends).includes("qualityIndex"), false);
});

test("executive report is deterministic, caveated, and non-causal", () => {
  const report = buildExecutiveReport(networkFilters);
  const repeated = buildExecutiveReport(networkFilters);
  assert.equal(report.status, "draft");
  assert.equal(report.dataStatus, "fixture");
  assert.equal(report.catalogApprovalStatus, "approval_pending");
  assert.equal(JSON.stringify(report).toLowerCase().includes("quality index"), false);
  assert.equal(report.caveats.some((caveat) => caveat.includes("Legacy Requires Aid")), true);
  assert.equal(report.caveats.some((caveat) => caveat.includes("no model-generated causality")), true);
  assert.equal(report.contentKey, repeated.contentKey);
  assert.notEqual(report.reportId, repeated.reportId);
  const stableReport = { ...report, reportId: null, generatedAt: null };
  const stableRepeated = { ...repeated, reportId: null, generatedAt: null };
  assert.deepEqual(stableReport, stableRepeated);
});

test("executive report names combined region and group scope", () => {
  const report = buildExecutiveReport({ ...networkFilters, group: "1G", region: "West" });
  assert.equal(report.scopeLabel, "1G sites in West region");
  assert.match(report.headline, /^1G sites in West region green share/);
});

test("whole-percent report labels use raw metric ratios", () => {
  const report = buildExecutiveReport({ ...networkFilters, site: "DAY1" });
  const greenShare = report.metrics.find((metric) => metric.label === "Green share");
  assert.equal(greenShare.numerator, 13);
  assert.equal(greenShare.denominator, 23);
  assert.equal(greenShare.value, 0.565);
  assert.equal(greenShare.displayValue, "57%");
  assert.match(report.headline, /green share is 57%/);
});

test("executive report metrics use one numeric schema", () => {
  const report = buildExecutiveReport(networkFilters);
  for (const reportMetric of report.metrics) {
    assert.equal(typeof reportMetric.metricId, "string");
    assert.equal(typeof reportMetric.numerator, "number");
    assert.equal(reportMetric.denominator === null || typeof reportMetric.denominator === "number", true);
    assert.equal(typeof reportMetric.value, "number");
    assert.equal(typeof reportMetric.displayValue, "string");
    assert.equal(reportMetric.definitionVersion, "metric.hrfc.v1");
    assert.equal(reportMetric.dataAsOf, "2026-08-06T20:00:00Z");
    assert.equal(reportMetric.catalogAsOf, "2026-07-29T16:32:27Z");
  }
});

test("report content key covers canonical semantic content and scoped results", () => {
  const filters = { ...networkFilters, site: "DAY1" };
  const report = buildExecutiveReport(filters);
  const rows = buildItemResults(filters);
  assert.equal(report.dataFingerprint, canonicalHash(rows).slice(0, 16));

  const semanticReport = { ...report };
  delete semanticReport.reportId;
  delete semanticReport.contentKey;
  delete semanticReport.generatedAt;
  assert.equal(report.contentKey, canonicalHash(semanticReport).slice(0, 16));

  const changedRows = structuredClone(rows);
  changedRows.find((row) => row.rating !== null).rating = "red";
  const changedSemanticReport = {
    ...semanticReport,
    dataFingerprint: canonicalHash(changedRows).slice(0, 16)
  };
  assert.notEqual(canonicalHash(changedSemanticReport), canonicalHash(semanticReport));
});

test("CSV values neutralize spreadsheet formula prefixes", () => {
  assert.equal(escapeCsv("=2+2"), "'=2+2");
  assert.equal(escapeCsv("+SUM(A1)"), "'+SUM(A1)");
  assert.equal(escapeCsv("-1+2"), "'-1+2");
  assert.equal(escapeCsv("@cmd"), "'@cmd");
  assert.equal(escapeCsv("plain"), "plain");
});
