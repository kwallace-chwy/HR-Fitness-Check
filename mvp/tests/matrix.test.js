"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fixture = require("../data/mvp-data.json");
const {
  buildSummary,
  buildSites,
  buildItemResults,
  buildExecutiveReport,
  buildCsv
} = require("../server");

const groups = ["All", ...new Set(fixture.sites.map((site) => site.group))];
const regions = ["All", ...new Set(fixture.sites.map((site) => site.region))];

function sumDistribution(rows) {
  return rows.reduce(
    (total, row) => {
      for (const rating of ["green", "yellow", "red", "missing"]) total[rating] += row.distribution[rating];
      return total;
    },
    { green: 0, yellow: 0, red: 0, missing: 0 }
  );
}

test("all 64 period, region, and group scopes reconcile across reports and CSV", () => {
  let checked = 0;
  for (const period of fixture.periods) {
    for (const region of regions) {
      for (const group of groups) {
        const filters = { period, region, group, site: null };
        const summary = buildSummary(filters);
        const sites = buildSites(filters);
        const report = buildExecutiveReport(filters);
        const csvLines = buildCsv(filters).split("\r\n");
        const totals = sumDistribution(sites);

        assert.equal(summary.scope.siteCount, sites.length, JSON.stringify(filters));
        assert.deepEqual(summary.distribution, totals, JSON.stringify(filters));
        assert.equal(csvLines.length, sites.length + 1, JSON.stringify(filters));
        assert.equal(report.metrics.find((metric) => metric.label === "Sites in scope").value, sites.length);
        assert.equal(report.metrics.find((metric) => metric.label === "Sites in scope").displayValue, String(sites.length));
        assert.equal(report.metrics.find((metric) => metric.label === "Red item observations").value, totals.red);
        assert.equal(report.metrics.find((metric) => metric.label === "Red item observations").displayValue, String(totals.red));
        assert.equal(report.catalogApprovalStatus, "approval_pending");
        checked += 1;
      }
    }
  }
  assert.equal(checked, 64);
});

test("all 1,056 site-period item rows preserve rating and rollup invariants", () => {
  let checked = 0;
  for (const period of fixture.periods) {
    for (const fixtureSite of fixture.sites) {
      const filters = { period, region: "All", group: "All", site: fixtureSite.siteId };
      const rows = buildItemResults(filters);
      const site = buildSites(filters)[0];
      const totals = rows.reduce(
        (result, row) => {
          if (row.rating) result[row.rating] += 1;
          else result.missing += 1;
          if (["blocked", "governance"].includes(row.sourceStatus)) assert.equal(row.rating, null);
          if (["manual_required", "missing_source", "unmapped"].includes(row.resultStatus)) assert.equal(row.rating, null);
          assert.equal(row.catalogVersion, "working-2026-07-29");
          checked += 1;
          return result;
        },
        { green: 0, yellow: 0, red: 0, missing: 0 }
      );

      assert.equal(rows.length, 33);
      assert.deepEqual(site.distribution, totals, `${fixtureSite.siteId} ${period}`);
      const { green, yellow, red, missing } = fixtureSite.results[period];
      assert.deepEqual(site.distribution, { green, yellow, red, missing }, `${fixtureSite.siteId} ${period} fixture seed`);
    }
  }
  assert.equal(checked, 1056);
});
