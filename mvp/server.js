"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { URL } = require("node:url");

function fixtureAssertion(condition, message) {
  if (!condition) throw new Error(`Invalid fixture: ${message}`);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isCanonicalUtcTimestamp(value) {
  const utcPattern = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{3})?Z$/;
  if (!isNonEmptyString(value) || !utcPattern.test(value)) return false;
  const parsed = new Date(value);
  if (!Number.isFinite(parsed.getTime())) return false;
  const canonical = parsed.toISOString();
  return value === canonical || value === canonical.replace(".000Z", "Z");
}

function assertNonEmptyFields(record, fields, label) {
  for (const field of fields) {
    fixtureAssertion(isNonEmptyString(record[field]), `${label}.${field} must be a non-empty string.`);
  }
}

function assertUniqueValues(rows, key, label) {
  const values = rows.map((row) => row[key]);
  fixtureAssertion(values.every(isNonEmptyString), `${label} must be non-empty strings.`);
  fixtureAssertion(new Set(values).size === values.length, `${label} must be unique.`);
}

function validateFixture(fixture) {
  fixtureAssertion(fixture && typeof fixture === "object" && !Array.isArray(fixture), "root must be an object.");
  fixtureAssertion(fixture.meta && typeof fixture.meta === "object", "meta is required.");
  fixtureAssertion(fixture.catalog && typeof fixture.catalog === "object", "catalog is required.");
  for (const collection of ["periods", "sites", "catalogItems", "sources", "releaseGates"]) {
    fixtureAssertion(Array.isArray(fixture[collection]), `${collection} must be an array.`);
    fixtureAssertion(fixture[collection].length > 0, `${collection} must not be empty.`);
  }

  assertNonEmptyFields(
    fixture.meta,
    ["product", "version", "catalogVersion", "disclaimer", "sourceOfTruth"],
    "meta"
  );
  fixtureAssertion(fixture.meta.dataStatus === "fixture", "meta.dataStatus must be fixture.");
  fixtureAssertion(fixture.meta.catalogApprovalStatus === "approval_pending", "meta.catalogApprovalStatus must be approval_pending.");
  fixtureAssertion(fixture.meta.comparisonStatus === "illustrative_not_recast", "meta.comparisonStatus must be illustrative_not_recast.");
  fixtureAssertion(Array.isArray(fixture.meta.sourceRefs) && fixture.meta.sourceRefs.length > 0, "meta.sourceRefs must be a non-empty array.");
  fixtureAssertion(fixture.meta.sourceRefs.every(isNonEmptyString), "meta.sourceRefs must contain non-empty strings.");
  fixtureAssertion(new Set(fixture.meta.sourceRefs).size === fixture.meta.sourceRefs.length, "meta.sourceRefs must be unique.");

  fixtureAssertion(fixture.periods.every((period) => /^\d{4} Q[1-4]$/.test(period)), "periods must use YYYY Q1-Q4 format.");
  fixtureAssertion(new Set(fixture.periods).size === fixture.periods.length, "periods must be unique.");
  fixtureAssertion(fixture.periods.includes(fixture.meta.defaultPeriod), "meta.defaultPeriod must be present in periods.");
  const periodOrdinals = fixture.periods.map((period) => {
    const [year, quarter] = period.match(/^(\d{4}) Q([1-4])$/).slice(1).map(Number);
    return year * 4 + quarter - 1;
  });
  fixtureAssertion(
    periodOrdinals.every((ordinal, index) => index === 0 || ordinal === periodOrdinals[index - 1] - 1),
    "periods must be newest-to-oldest contiguous quarters."
  );
  fixtureAssertion(fixture.meta.defaultPeriod === fixture.periods[0], "meta.defaultPeriod must be the newest configured period.");
  for (const timestampField of ["generatedAt", "catalogAsOf"]) {
    fixtureAssertion(isCanonicalUtcTimestamp(fixture.meta[timestampField]), `meta.${timestampField} must be a canonical UTC timestamp.`);
  }

  assertUniqueValues(fixture.sources, "id", "source IDs");
  assertUniqueValues(fixture.catalogItems, "demoItemId", "catalog item IDs");
  assertUniqueValues(fixture.sites, "siteId", "site IDs");
  assertUniqueValues(fixture.releaseGates, "id", "release gate IDs");

  const sourceStatuses = new Set(["blocked", "candidate", "governance", "located"]);
  const implementationModes = new Set(["automatable", "derived", "governance_first", "hybrid", "manual"]);
  const evidenceModes = new Set(["mixed", "physical", "virtual"]);
  const accountabilityScopes = new Set(["enterprise_dependency", "governance_dependency", "shared_control", "shared_service", "site_controlled"]);
  const ownerGroups = new Set(["HRA", "HRBP", "HRG", "HRM"]);
  const releaseGateStatuses = new Set(["blocked", "complete", "review"]);
  const sourceIds = new Set(fixture.sources.map((source) => source.id));

  for (const source of fixture.sources) {
    assertNonEmptyFields(source, ["family", "coverage", "owner", "freshness", "nextAction", "evidence"], `source ${source.id}`);
    fixtureAssertion(sourceStatuses.has(source.status), `source ${source.id} has an unknown status.`);
  }
  for (const item of fixture.catalogItems) {
    fixtureAssertion(isNonEmptyString(item.task), `catalog item ${item.demoItemId} requires a task.`);
    fixtureAssertion(isNonEmptyString(item.category), `catalog item ${item.demoItemId} requires a category.`);
    fixtureAssertion(ownerGroups.has(item.ownerGroup), `catalog item ${item.demoItemId} has an unknown owner group.`);
    fixtureAssertion(implementationModes.has(item.implementationMode), `catalog item ${item.demoItemId} has an unknown implementation mode.`);
    fixtureAssertion(evidenceModes.has(item.evidenceMode), `catalog item ${item.demoItemId} has an unknown evidence mode.`);
    fixtureAssertion(accountabilityScopes.has(item.accountabilityScope), `catalog item ${item.demoItemId} has an unknown accountability scope.`);
    fixtureAssertion(sourceIds.has(item.sourceId), `catalog item ${item.demoItemId} references unknown source ${item.sourceId}.`);
  }
  for (const gate of fixture.releaseGates) {
    assertNonEmptyFields(gate, ["name", "owner"], `release gate ${gate.id}`);
    fixtureAssertion(releaseGateStatuses.has(gate.status), `release gate ${gate.id} has an unknown status.`);
  }

  const itemCount = fixture.catalogItems.length;
  assertNonEmptyFields(fixture.catalog, ["status", "workbookVersion", "approvalStatus"], "catalog");
  fixtureAssertion(isCanonicalUtcTimestamp(fixture.catalog.workbookModifiedAt), "catalog.workbookModifiedAt must be a canonical UTC timestamp.");
  fixtureAssertion(fixture.catalog.workbookModifiedAt === fixture.meta.catalogAsOf, "catalog.workbookModifiedAt must equal meta.catalogAsOf.");
  fixtureAssertion(fixture.catalog.taskRows === itemCount, "catalog.taskRows must equal catalogItems length.");
  fixtureAssertion(fixture.catalog.scopeIntentRows === itemCount, "catalog.scopeIntentRows must equal catalogItems length.");
  fixtureAssertion(
    fixture.catalog.ownerAssignments === fixture.catalogItems.filter((item) => item.ownerGroup).length,
    "catalog.ownerAssignments must equal populated catalog owner groups."
  );
  for (const field of ["removedRows", "thresholdGaps"]) {
    fixtureAssertion(Number.isInteger(fixture.catalog[field]) && fixture.catalog[field] >= 0, `catalog.${field} must be a non-negative integer.`);
  }
  for (const field of ["approvedMappings", "approvedImplementationModes", "sourceTableBlanks", "reviewerBlanks", "resultBlanks"]) {
    fixtureAssertion(
      Number.isInteger(fixture.catalog[field]) && fixture.catalog[field] >= 0 && fixture.catalog[field] <= itemCount,
      `catalog.${field} must be an integer from 0 to ${itemCount}.`
    );
  }
  fixtureAssertion(
    fixture.catalog.approvedMappings + fixture.catalog.sourceTableBlanks <= itemCount,
    "catalog approvedMappings and sourceTableBlanks must not exceed catalogItems length."
  );
  fixtureAssertion(fixture.meta.catalogApprovalStatus === fixture.catalog.approvalStatus, "catalog approval status must reconcile with meta.");

  const sourceById = new Map(fixture.sources.map((source) => [source.id, source]));
  const unavailableItemCount = fixture.catalogItems.filter((item) => {
    const sourceStatus = sourceById.get(item.sourceId).status;
    return item.implementationMode === "governance_first" || sourceStatus === "blocked" || sourceStatus === "governance";
  }).length;
  for (const site of fixture.sites) {
    fixtureAssertion(isNonEmptyString(site.group), `site ${site.siteId} requires a group.`);
    fixtureAssertion(isNonEmptyString(site.region), `site ${site.siteId} requires a region.`);
    fixtureAssertion(site.results && typeof site.results === "object" && !Array.isArray(site.results), `site ${site.siteId} requires results.`);
    const resultPeriods = Object.keys(site.results);
    fixtureAssertion(
      resultPeriods.length === fixture.periods.length && resultPeriods.every((period) => fixture.periods.includes(period)),
      `site ${site.siteId} results must contain exactly the configured periods.`
    );
    for (const period of fixture.periods) {
      const mix = site.results[period];
      fixtureAssertion(mix && typeof mix === "object", `site ${site.siteId} is missing ${period} results.`);
      for (const rating of ["green", "yellow", "red", "missing"]) {
        fixtureAssertion(Number.isInteger(mix[rating]) && mix[rating] >= 0, `${site.siteId} ${period} ${rating} must be a non-negative integer.`);
      }
      fixtureAssertion(mix.green + mix.yellow + mix.red + mix.missing === itemCount, `${site.siteId} ${period} distribution must total ${itemCount}.`);
      fixtureAssertion(mix.missing >= unavailableItemCount, `${site.siteId} ${period} missing count must include unavailable catalog items.`);
      const expectedStatus = mix.missing > 0 ? "fixture_partial" : "fixture_complete";
      fixtureAssertion(mix.resultStatus === expectedStatus, `${site.siteId} ${period} resultStatus must be ${expectedStatus}.`);
    }
  }
  return fixture;
}

const dataPath = path.join(__dirname, "data", "mvp-data.json");
const publicRoot = path.join(__dirname, "public");
const data = validateFixture(JSON.parse(fs.readFileSync(dataPath, "utf8")));
const auditEvents = [];
const API_VERSION = "v1";
const CONTRACT_VERSION = "hrfc.api.v1";
const METRIC_DEFINITION_VERSION = "metric.hrfc.v1";
const ROUTE_CONTRACTS = [
  { path: "/api/health", mediaType: "application/json", filters: [] },
  { path: "/api/v1/meta", mediaType: "application/json", filters: [] },
  { path: "/api/v1/contracts", mediaType: "application/json", filters: [] },
  { path: "/api/v1/filters", mediaType: "application/json", filters: [] },
  { path: "/api/v1/summary", mediaType: "application/json", filters: ["period", "region", "group", "site"] },
  { path: "/api/v1/sites", mediaType: "application/json", filters: ["period", "region", "group", "site"] },
  { path: "/api/v1/trends", mediaType: "application/json", filters: ["region", "group", "site"] },
  { path: "/api/v1/categories", mediaType: "application/json", filters: ["period", "region", "group", "site"] },
  { path: "/api/v1/catalog-items", mediaType: "application/json", filters: [] },
  { path: "/api/v1/item-results", mediaType: "application/json", filters: ["period", "site"], requiredFilters: ["site"] },
  { path: "/api/v1/sources", mediaType: "application/json", filters: [] },
  { path: "/api/v1/release-gates", mediaType: "application/json", filters: [] },
  { path: "/api/v1/reports/executive", mediaType: "application/json", filters: ["period", "region", "group", "site"] },
  { path: "/api/v1/reports/export.csv", mediaType: "text/csv", filters: ["period", "region", "group", "site"] },
  { path: "/api/v1/audit-events", mediaType: "application/json", filters: [] }
];
const REPORTING_ROUTE_PATHS = new Set(
  ROUTE_CONTRACTS.filter((route) => route.path.startsWith("/api/v1/reports/")).map((route) => route.path)
);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

function setSecurityHeaders(response) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'");
  response.setHeader("Referrer-Policy", "no-referrer");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
}

function sendJson(response, statusCode, payload, requestId) {
  setSecurityHeaders(response);
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("X-Api-Version", API_VERSION);
  response.setHeader("X-Contract-Version", CONTRACT_VERSION);
  if (requestId) response.setHeader("X-Request-Id", requestId);
  response.end(response.headOnly ? undefined : JSON.stringify(payload));
}

function sendCsv(response, filename, csv, requestId) {
  setSecurityHeaders(response);
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/csv; charset=utf-8");
  response.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  response.setHeader("X-Api-Version", API_VERSION);
  response.setHeader("X-Contract-Version", CONTRACT_VERSION);
  response.setHeader("X-Request-Id", requestId);
  response.end(response.headOnly ? undefined : csv);
}

function round(value, digits = 2) {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

function canonicalHash(value) {
  function sortValue(entry) {
    if (Array.isArray(entry)) return entry.map(sortValue);
    if (!entry || typeof entry !== "object") return entry;
    return Object.fromEntries(Object.keys(entry).sort().map((key) => [key, sortValue(entry[key])]));
  }
  return crypto.createHash("sha256").update(JSON.stringify(sortValue(value))).digest("hex");
}

function metricPercent(metricValue) {
  if (!metricValue || !metricValue.denominator) return "Not available";
  return `${Math.round((metricValue.numerator / metricValue.denominator) * 100)}%`;
}

function metric(metricId, numerator, denominator, definitionVersion = METRIC_DEFINITION_VERSION) {
  return {
    metricId,
    numerator,
    denominator,
    value: denominator ? round(numerator / denominator, 3) : null,
    definitionVersion,
    asOf: data.meta.generatedAt,
    dataAsOf: data.meta.generatedAt,
    catalogAsOf: data.meta.catalogAsOf,
    comparabilityStatus: data.meta.comparisonStatus
  };
}

function countMetric(metricId, label, value) {
  return {
    label,
    metricId,
    numerator: value,
    denominator: null,
    value,
    displayValue: String(value),
    definitionVersion: METRIC_DEFINITION_VERSION,
    asOf: data.meta.generatedAt,
    dataAsOf: data.meta.generatedAt,
    catalogAsOf: data.meta.catalogAsOf,
    comparabilityStatus: data.meta.comparisonStatus
  };
}

function buildContracts() {
  return {
    apiVersion: API_VERSION,
    contractVersion: CONTRACT_VERSION,
    status: "review_contract",
    dataStatus: data.meta.dataStatus,
    catalogVersion: data.meta.catalogVersion,
    dataAsOf: data.meta.generatedAt,
    catalogAsOf: data.meta.catalogAsOf,
    provenance: {
      dataAsOf: "Synthetic result snapshot time from meta.generatedAt.",
      catalogAsOf: "Working catalog artifact timestamp from meta.catalogAsOf.",
      metricAsOf: "Metric asOf is the data snapshot time; catalog currency is separate."
    },
    conventions: {
      methods: ["GET", "HEAD"],
      filters: {
        period: { required: false, default: data.meta.defaultPeriod, values: data.periods },
        region: { required: false, default: "All", values: ["All", ...new Set(data.sites.map((site) => site.region))] },
        group: { required: false, default: "All", values: ["All", ...new Set(data.sites.map((site) => site.group))] },
        site: { required: false, default: null, values: data.sites.map((site) => site.siteId) }
      },
      invalidFilterStatus: 400,
      invalidParameterStatus: 400,
      unknownRouteStatus: 404,
      unsupportedMethodStatus: 405,
      queryPolicy: "unknown and duplicate parameters are rejected"
    },
    metricDefinitions: [
      {
        metricId: "green_share",
        definitionVersion: METRIC_DEFINITION_VERSION,
        numerator: "rated item results with rating=green",
        denominator: "item results with a non-null rating",
        nullPolicy: "null when denominator is zero"
      },
      {
        metricId: "evidence_coverage",
        definitionVersion: METRIC_DEFINITION_VERSION,
        numerator: "item results with a non-null rating",
        denominator: "eligible item results",
        nullPolicy: "null when denominator is zero"
      },
      {
        metricId: "evidence_exception_rate",
        definitionVersion: METRIC_DEFINITION_VERSION,
        numerator: "eligible item results without a rating",
        denominator: "eligible item results",
        nullPolicy: "null when denominator is zero"
      },
      {
        metricId: "manual_completion",
        definitionVersion: METRIC_DEFINITION_VERSION,
        numerator: "manual or hybrid item results with accepted fixture evidence",
        denominator: "manual or hybrid item results expected",
        nullPolicy: "null when denominator is zero"
      },
      {
        metricId: "red_item_observations",
        definitionVersion: METRIC_DEFINITION_VERSION,
        numerator: "rated item results with rating=red",
        denominator: null,
        nullPolicy: "count returns zero for an empty scope"
      },
      {
        metricId: "sites_in_scope",
        definitionVersion: METRIC_DEFINITION_VERSION,
        numerator: "sites in the resolved filter intersection",
        denominator: null,
        nullPolicy: "count returns zero for an empty scope"
      }
    ],
    resultEnums: {
      rating: ["green", "yellow", "red", null],
      resultStatus: ["scored", "manual_input", "manual_required", "missing_source", "unmapped"]
    },
    invariants: [
      "rating and resultStatus are independent fields",
      "manual_required, missing_source, and unmapped results have rating=null",
      "blocked and governance source states have rating=null",
      "every metric carries numerator, denominator, numeric value, displayValue when rendered, definitionVersion, dataAsOf, catalogAsOf, and comparabilityStatus",
      "all site and item results are synthetic fixture data"
    ],
    routes: ROUTE_CONTRACTS
  };
}

function validateQueryParameters(url, routeContract) {
  const allowed = new Set(routeContract.filters);
  const seen = new Set();
  for (const key of url.searchParams.keys()) {
    if (!allowed.has(key)) return { error: "invalid_parameter", message: `Unknown query parameter for ${routeContract.path}: ${key}` };
    if (seen.has(key)) return { error: "duplicate_parameter", message: `Query parameter may appear only once: ${key}` };
    seen.add(key);
  }
  return null;
}

function queryFilters(url) {
  return {
    period: url.searchParams.has("period") ? url.searchParams.get("period") : data.meta.defaultPeriod,
    group: url.searchParams.has("group") ? url.searchParams.get("group") : "All",
    region: url.searchParams.has("region") ? url.searchParams.get("region") : "All",
    site: url.searchParams.has("site") ? url.searchParams.get("site") : null
  };
}

function validateFilters(filters) {
  const groups = new Set(data.sites.map((site) => site.group));
  const regions = new Set(data.sites.map((site) => site.region));
  const sites = new Set(data.sites.map((site) => site.siteId));
  if (!data.periods.includes(filters.period)) return `Unknown period: ${filters.period}`;
  if (filters.group !== "All" && !groups.has(filters.group)) return `Unknown group: ${filters.group}`;
  if (filters.region !== "All" && !regions.has(filters.region)) return `Unknown region: ${filters.region}`;
  if (filters.site !== null && !sites.has(filters.site)) return `Unknown site: ${filters.site}`;
  return null;
}

function filteredSites(filters) {
  return data.sites.filter((site) => {
    if (filters.group !== "All" && site.group !== filters.group) return false;
    if (filters.region !== "All" && site.region !== filters.region) return false;
    if (filters.site && site.siteId !== filters.site) return false;
    return true;
  });
}

function generatedItemResults(site, period) {
  const siteIndex = data.sites.findIndex((entry) => entry.siteId === site.siteId);
  const periodIndex = data.periods.indexOf(period);
  const mix = site.results[period];
  const sourceById = new Map(data.sources.map((source) => [source.id, source]));
  const unavailableItems = data.catalogItems.filter((item) => {
    const sourceStatus = sourceById.get(item.sourceId)?.status;
    return !sourceStatus || item.implementationMode === "governance_first" || sourceStatus === "blocked" || sourceStatus === "governance";
  });
  const unavailableIds = new Set(unavailableItems.map((item) => item.demoItemId));
  const scoreableItems = data.catalogItems.filter((item) => !unavailableIds.has(item.demoItemId));
  const expectedTotal = mix.green + mix.yellow + mix.red + mix.missing;
  const additionalMissingCount = mix.missing - unavailableItems.length;
  if (expectedTotal !== data.catalogItems.length || additionalMissingCount < 0 || additionalMissingCount > scoreableItems.length) {
    throw new Error(`Invalid fixture distribution for ${site.siteId} ${period}.`);
  }
  const offset = (siteIndex * 7 + periodIndex * 5) % scoreableItems.length;
  const ordered = [...scoreableItems.slice(offset), ...scoreableItems.slice(0, offset)];
  const additionalMissing = ordered.splice(ordered.length - additionalMissingCount);
  const missingItems = [...unavailableItems, ...additionalMissing];
  const ratings = [
    ...Array(mix.green).fill("green"),
    ...Array(mix.yellow).fill("yellow"),
    ...Array(mix.red).fill("red")
  ];
  if (ratings.length !== ordered.length) throw new Error(`Fixture ratings do not reconcile for ${site.siteId} ${period}.`);
  const ratingByItem = new Map(ordered.map((item, index) => [item.demoItemId, ratings[index]]));
  const missingIds = new Set(missingItems.map((item) => item.demoItemId));
  return data.catalogItems.map((item) => {
    const source = data.sources.find((entry) => entry.id === item.sourceId);
    const blockedSource = source?.status === "blocked" || source?.status === "governance";
    let rating = ratingByItem.get(item.demoItemId) || null;
    const manualMode = item.implementationMode === "manual" || item.implementationMode === "hybrid";
    let resultStatus = manualMode ? "manual_input" : "scored";
    if (blockedSource) {
      rating = null;
      resultStatus = manualMode ? "manual_required" : "unmapped";
    } else if (missingIds.has(item.demoItemId)) {
      resultStatus = item.implementationMode === "governance_first" ? "unmapped" : manualMode ? "manual_required" : "missing_source";
    }
    return {
      resultId: `demo-result-${site.siteId.toLowerCase()}-${period.replace(/\s+/g, "-").toLowerCase()}-${item.demoItemId}`,
      siteId: site.siteId,
      group: site.group,
      region: site.region,
      period,
      catalogVersion: data.meta.catalogVersion,
      demoItemId: item.demoItemId,
      task: item.task,
      category: item.category,
      ownerGroup: item.ownerGroup,
      accountabilityScope: item.accountabilityScope,
      implementationMode: item.implementationMode,
      evidenceMode: item.evidenceMode,
      rating,
      resultStatus,
      evidenceStatus: rating ? (manualMode ? "accepted_fixture" : "source_fixture") : "required",
      sourceId: item.sourceId,
      sourceStatus: source?.status || "unknown",
      sourceSnapshotAt: data.meta.generatedAt,
      ruleVersion: "demo-policy-v1-unapproved",
      caveat: source?.status === "blocked" || source?.status === "governance"
        ? `Synthetic result only; production source state is ${source.status}.`
        : "Synthetic product-validation result; no production source was queried."
    };
  });
}

function siteDistribution(site, period) {
  return generatedItemResults(site, period).reduce(
    (total, row) => {
      if (row.rating) total[row.rating] += 1;
      else total.missing += 1;
      if (row.resultStatus === "manual_input") total.manualAccepted += 1;
      if (row.implementationMode === "manual" || row.implementationMode === "hybrid") total.manualExpected += 1;
      return total;
    },
    { green: 0, yellow: 0, red: 0, missing: 0, manualAccepted: 0, manualExpected: 0 }
  );
}

function aggregateResult(sites, period) {
  return sites.reduce(
    (total, site) => {
      const result = siteDistribution(site, period);
      total.green += result.green;
      total.yellow += result.yellow;
      total.red += result.red;
      total.missing += result.missing;
      total.manualAccepted += result.manualAccepted;
      total.manualExpected += result.manualExpected;
      return total;
    },
    { green: 0, yellow: 0, red: 0, missing: 0, manualAccepted: 0, manualExpected: 0 }
  );
}

function previousPeriod(period) {
  const index = data.periods.indexOf(period);
  return index >= 0 && index < data.periods.length - 1 ? data.periods[index + 1] : null;
}

function buildSummary(filters) {
  const sites = filteredSites(filters);
  const result = aggregateResult(sites, filters.period);
  const previous = previousPeriod(filters.period);
  const previousResult = previous ? aggregateResult(sites, previous) : null;
  const eligible = result.green + result.yellow + result.red + result.missing;
  const rated = result.green + result.yellow + result.red;
  const greenShare = metric("green_share", result.green, rated);
  const evidenceCoverage = metric("evidence_coverage", rated, eligible);
  const evidenceExceptionRate = metric("evidence_exception_rate", result.missing, eligible);
  const manualCompletion = metric("manual_completion", result.manualAccepted, result.manualExpected);
  const priorGreenShare = previousResult
    ? metric("green_share", previousResult.green, previousResult.green + previousResult.yellow + previousResult.red)
    : null;
  return {
    dataStatus: data.meta.dataStatus,
    catalogVersion: data.meta.catalogVersion,
    dataAsOf: data.meta.generatedAt,
    catalogAsOf: data.meta.catalogAsOf,
    catalogApprovalStatus: data.meta.catalogApprovalStatus,
    period: filters.period,
    scope: { group: filters.group, region: filters.region, site: filters.site, siteCount: sites.length },
    metrics: { greenShare, evidenceCoverage, evidenceExceptionRate, manualCompletion },
    previousPeriod: previous,
    change: null,
    illustrativeChange:
      greenShare.value !== null && priorGreenShare && priorGreenShare.value !== null
        ? round(greenShare.value - priorGreenShare.value, 3)
        : null,
    distribution: { green: result.green, yellow: result.yellow, red: result.red, missing: result.missing },
    redItems: result.red,
    catalogReadiness: {
      scopeIntentRows: data.catalog.scopeIntentRows,
      ownerAssignments: data.catalog.ownerAssignments,
      approvedMappings: data.catalog.approvedMappings,
      approvedImplementationModes: data.catalog.approvedImplementationModes
    }
  };
}

function buildSites(filters) {
  const previous = previousPeriod(filters.period);
  return filteredSites(filters).map((site) => {
    const result = siteDistribution(site, filters.period);
    const priorResult = previous ? siteDistribution(site, previous) : null;
    const rated = result.green + result.yellow + result.red;
    const eligible = rated + result.missing;
    const greenShare = metric("green_share", result.green, rated);
    const coverage = metric("evidence_coverage", rated, eligible);
    const priorShare = priorResult ? metric("green_share", priorResult.green, priorResult.green + priorResult.yellow + priorResult.red) : null;
    const categories = buildCategories({ ...filters, site: site.siteId });
    const topOpportunity = categories[0] || null;
    return {
      siteId: site.siteId,
      group: site.group,
      region: site.region,
      resultStatus: result.missing ? "fixture_partial" : "fixture_complete",
      distribution: { green: result.green, yellow: result.yellow, red: result.red, missing: result.missing },
      metrics: { greenShare, evidenceCoverage: coverage },
      change:
        greenShare.value !== null && priorShare && priorShare.value !== null
          ? round(greenShare.value - priorShare.value, 3)
          : null,
      topOpportunity,
      categories
    };
  });
}

function buildTrends(filters) {
  const sites = filteredSites(filters);
  return data.periods
    .slice()
    .reverse()
    .map((period) => {
      const result = aggregateResult(sites, period);
      const rated = result.green + result.yellow + result.red;
      const eligible = rated + result.missing;
      return {
        period,
        greenShare: metric("green_share", result.green, rated),
        evidenceCoverage: metric("evidence_coverage", rated, eligible),
        redItems: result.red,
        catalogVersion: data.meta.catalogVersion,
        comparabilityStatus: data.meta.comparisonStatus
      };
    });
}

function buildCategories(filters) {
  const sites = filteredSites(filters);
  const totals = new Map();
  for (const site of sites) {
    for (const row of generatedItemResults(site, filters.period)) {
      const current = totals.get(row.category) || { green: 0, yellow: 0, red: 0, missing: 0 };
      if (row.rating) current[row.rating] += 1;
      else current.missing += 1;
      totals.set(row.category, current);
    }
  }
  return Array.from(totals.entries())
    .map(([category, values]) => {
      const rated = values.green + values.yellow + values.red;
      const eligible = rated + values.missing;
      return {
        category,
        distribution: values,
        greenShare: metric("green_share", values.green, rated),
        evidenceCoverage: metric("evidence_coverage", rated, eligible)
      };
    })
    .sort((a, b) => {
      if (a.greenShare.value === null) return b.greenShare.value === null ? a.category.localeCompare(b.category) : 1;
      if (b.greenShare.value === null) return -1;
      return a.greenShare.value - b.greenShare.value || a.category.localeCompare(b.category);
    });
}

function buildCatalogItems() {
  const sourceMap = new Map(data.sources.map((source) => [source.id, source]));
  return data.catalogItems.map((item) => {
    const source = sourceMap.get(item.sourceId);
    let readinessStatus = "mapping_required";
    if (item.implementationMode === "manual" || item.implementationMode === "hybrid") readinessStatus = "manual_workflow_required";
    if (item.implementationMode === "governance_first") readinessStatus = "governance_required";
    return { ...item, sourceFamily: source?.family || "Unknown", sourceStatus: source?.status || "unknown", readinessStatus };
  });
}

function buildItemResults(filters) {
  if (!filters.site) return [];
  const site = filteredSites(filters)[0];
  return site ? generatedItemResults(site, filters.period) : [];
}

function buildExecutiveReport(filters) {
  const summary = buildSummary(filters);
  const categories = buildCategories(filters);
  const ratedCategories = categories.filter((category) => category.greenShare.value !== null);
  const weakest = ratedCategories[0];
  const strongest = ratedCategories[ratedCategories.length - 1];
  const scopeLabel =
    filters.site ||
    (filters.group !== "All" && filters.region !== "All"
      ? `${filters.group} sites in ${filters.region} region`
      : filters.group !== "All"
        ? `${filters.group} sites`
        : filters.region !== "All"
          ? `${filters.region} region`
          : "network fixture");
  const scopedResults = filteredSites(filters).flatMap((site) => generatedItemResults(site, filters.period));
  const dataFingerprint = canonicalHash(scopedResults).slice(0, 16);
  const semanticReport = {
    contentVersion: "hrfc.report.v1",
    contractVersion: CONTRACT_VERSION,
    status: "draft",
    dataStatus: data.meta.dataStatus,
    title: `${filters.period} HR Fitness Check review`,
    period: filters.period,
    scopeLabel,
    scope: summary.scope,
    catalogVersion: data.meta.catalogVersion,
    catalogApprovalStatus: data.meta.catalogApprovalStatus,
    dataAsOf: data.meta.generatedAt,
    catalogAsOf: data.meta.catalogAsOf,
    dataFingerprint,
    comparabilityStatus: data.meta.comparisonStatus,
    headline: `${scopeLabel} green share is ${summary.metrics.greenShare.value === null ? "not available" : metricPercent(summary.metrics.greenShare)} with ${summary.metrics.evidenceCoverage.value === null ? "no" : metricPercent(summary.metrics.evidenceCoverage)} evidence coverage. Quarter comparison is disabled until the working catalog and historical results are recast.`,
    metrics: [
      { label: "Green share", ...summary.metrics.greenShare, displayValue: metricPercent(summary.metrics.greenShare) },
      { label: "Evidence coverage", ...summary.metrics.evidenceCoverage, displayValue: metricPercent(summary.metrics.evidenceCoverage) },
      countMetric("red_item_observations", "Red item observations", summary.redItems),
      countMetric("sites_in_scope", "Sites in scope", summary.scope.siteCount)
    ],
    strengths: strongest ? [`${strongest.category} has the highest fixture green share at ${metricPercent(strongest.greenShare)}.`] : [],
    opportunities: weakest ? [`${weakest.category} has the lowest fixture green share at ${metricPercent(weakest.greenShare)}.`, `${summary.redItems} red observations require item-level review before action planning.`] : [],
    caveats: [
      data.meta.disclaimer,
      "No catalog row is production-scoreable until stable IDs, implementation mode, source mapping, rating rules, and the denominator are approved.",
      "Legacy Requires Aid / Actively Monitor labels are not mapped to Green / Yellow / Red; historical comparisons remain non-comparable until a recast is approved.",
      "This report is generated deterministically from the selected fixture scope; it contains no model-generated causality or individual attribution."
    ],
    decisions: data.releaseGates.filter((gate) => gate.status !== "complete").slice(0, 5),
    sourceRefs: data.meta.sourceRefs
  };
  return {
    reportId: `rpt-${crypto.randomUUID()}`,
    contentKey: canonicalHash(semanticReport).slice(0, 16),
    generatedAt: new Date().toISOString(),
    ...semanticReport
  };
}

function escapeCsv(value) {
  let text = String(value ?? "");
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function buildCsv(filters) {
  const rows = buildSites(filters);
  const header = ["period", "site_id", "group", "region", "green_share", "green_numerator", "rated_denominator", "evidence_coverage", "rated_items", "eligible_items", "green", "yellow", "red", "missing", "result_status", "data_status", "catalog_version", "catalog_approval_status", "data_as_of", "catalog_as_of", "metric_definition_version", "comparability_status", "contract_version"];
  const body = rows.map((row) => [
    filters.period,
    row.siteId,
    row.group,
    row.region,
    row.metrics.greenShare.value,
    row.metrics.greenShare.numerator,
    row.metrics.greenShare.denominator,
    row.metrics.evidenceCoverage.value,
    row.metrics.evidenceCoverage.numerator,
    row.metrics.evidenceCoverage.denominator,
    row.distribution.green,
    row.distribution.yellow,
    row.distribution.red,
    row.distribution.missing,
    row.resultStatus,
    data.meta.dataStatus,
    data.meta.catalogVersion,
    data.meta.catalogApprovalStatus,
    data.meta.generatedAt,
    data.meta.catalogAsOf,
    METRIC_DEFINITION_VERSION,
    data.meta.comparisonStatus,
    CONTRACT_VERSION
  ]);
  return [header, ...body].map((row) => row.map(escapeCsv).join(",")).join("\r\n");
}

function recordAudit({ requestId, pathname, method, statusCode, startedAt, filters }) {
  auditEvents.unshift({
    requestId,
    timestamp: new Date().toISOString(),
    userScope: "mvp-reviewer / fixture",
    capabilityId: REPORTING_ROUTE_PATHS.has(pathname) ? "cap.hrfc.reporting.v1" : "cap.hrfc.cockpit_read.v1",
    route: pathname,
    method,
    statusCode,
    filters,
    dataStatus: data.meta.dataStatus,
    catalogVersion: data.meta.catalogVersion,
    catalogApprovalStatus: data.meta.catalogApprovalStatus,
    latencyMs: Date.now() - startedAt,
    decision: statusCode < 400 ? "answered" : "rejected"
  });
  if (auditEvents.length > 100) auditEvents.length = 100;
}

function applicableAuditFilters(filters, routeContract) {
  if (!filters || routeContract.filters.length === 0) return null;
  return Object.fromEntries(routeContract.filters.map((key) => [key, filters[key]]));
}

function handleApi(request, response, url, requestId, startedAt) {
  const routeContract = ROUTE_CONTRACTS.find((route) => route.path === url.pathname);
  if (!routeContract) {
    recordAudit({ requestId, pathname: url.pathname, method: request.method, statusCode: 404, startedAt, filters: null });
    sendJson(response, 404, { error: "not_found", message: "API route not found.", requestId }, requestId);
    return;
  }
  const parameterError = validateQueryParameters(url, routeContract);
  if (parameterError) {
    recordAudit({ requestId, pathname: url.pathname, method: request.method, statusCode: 400, startedAt, filters: null });
    sendJson(response, 400, { ...parameterError, requestId }, requestId);
    return;
  }
  const filters = queryFilters(url);
  const auditFilters = applicableAuditFilters(filters, routeContract);
  const filterError = validateFilters(filters);
  if (filterError) {
    recordAudit({ requestId, pathname: url.pathname, method: request.method, statusCode: 400, startedAt, filters: auditFilters });
    sendJson(response, 400, { error: "invalid_filter", message: filterError, requestId }, requestId);
    return;
  }

  let payload;
  let statusCode = 200;
  if (url.pathname === "/api/health") {
    payload = { status: "ok", product: data.meta.product, version: data.meta.version, dataStatus: data.meta.dataStatus };
  } else if (url.pathname === "/api/v1/meta") {
    payload = { ...data.meta, apiVersion: API_VERSION, contractVersion: CONTRACT_VERSION, catalog: data.catalog };
  } else if (url.pathname === "/api/v1/contracts") {
    payload = buildContracts();
  } else if (url.pathname === "/api/v1/filters") {
    payload = {
      periods: data.periods,
      groups: ["All", ...new Set(data.sites.map((site) => site.group))],
      regions: ["All", ...new Set(data.sites.map((site) => site.region))]
    };
  } else if (url.pathname === "/api/v1/summary") {
    payload = buildSummary(filters);
  } else if (url.pathname === "/api/v1/sites") {
    payload = { dataStatus: data.meta.dataStatus, period: filters.period, rows: buildSites(filters) };
  } else if (url.pathname === "/api/v1/trends") {
    payload = { dataStatus: data.meta.dataStatus, rows: buildTrends(filters) };
  } else if (url.pathname === "/api/v1/categories") {
    payload = { dataStatus: data.meta.dataStatus, rows: buildCategories(filters) };
  } else if (url.pathname === "/api/v1/catalog-items") {
    payload = {
      dataStatus: "latest_working_evidence",
      catalogVersion: data.meta.catalogVersion,
      catalogApprovalStatus: data.meta.catalogApprovalStatus,
      rows: buildCatalogItems()
    };
  } else if (url.pathname === "/api/v1/item-results") {
    if (!filters.site) {
      statusCode = 400;
      payload = { error: "site_required", message: "Select a site to inspect item-level fixture results.", requestId };
    } else {
      payload = {
        dataStatus: data.meta.dataStatus,
        catalogVersion: data.meta.catalogVersion,
        period: filters.period,
        siteId: filters.site,
        rows: buildItemResults(filters)
      };
    }
  } else if (url.pathname === "/api/v1/sources") {
    payload = { status: "reviewed_discovery", rows: data.sources };
  } else if (url.pathname === "/api/v1/release-gates") {
    payload = { status: "draft", rows: data.releaseGates };
  } else if (url.pathname === "/api/v1/reports/executive") {
    payload = buildExecutiveReport(filters);
  } else if (url.pathname === "/api/v1/reports/export.csv") {
    const filename = `hr-fitness-check-${filters.period.replace(/\s+/g, "-").toLowerCase()}.csv`;
    recordAudit({ requestId, pathname: url.pathname, method: request.method, statusCode: 200, startedAt, filters: auditFilters });
    sendCsv(response, filename, buildCsv(filters), requestId);
    return;
  } else if (url.pathname === "/api/v1/audit-events") {
    payload = { status: "ephemeral", rows: auditEvents.slice(0, 50) };
  }

  recordAudit({ requestId, pathname: url.pathname, method: request.method, statusCode, startedAt, filters: auditFilters });
  sendJson(response, statusCode, payload, requestId);
}

function serveStatic(response, pathname) {
  const requested = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const resolved = path.resolve(publicRoot, requested);
  if (!resolved.startsWith(publicRoot + path.sep) && resolved !== path.join(publicRoot, "index.html")) {
    sendJson(response, 403, { error: "forbidden", message: "Invalid path." });
    return;
  }
  fs.readFile(resolved, (error, contents) => {
    if (error) {
      if (error.code === "ENOENT") {
        sendJson(response, 404, { error: "not_found", message: "File not found." });
        return;
      }
      sendJson(response, 500, { error: "read_failed", message: "Unable to read static file." });
      return;
    }
    setSecurityHeaders(response);
    response.statusCode = 200;
    response.setHeader("Content-Type", contentTypes[path.extname(resolved)] || "application/octet-stream");
    response.end(response.headOnly ? undefined : contents);
  });
}

function createServer() {
  return http.createServer((request, response) => {
    const startedAt = Date.now();
    const requestId = crypto.randomUUID();
    response.headOnly = request.method === "HEAD";
    try {
      let url;
      try {
        url = new URL(request.url, `http://${request.headers.host || "127.0.0.1"}`);
      } catch {
        recordAudit({ requestId, pathname: "invalid_url", method: request.method, statusCode: 400, startedAt, filters: null });
        sendJson(response, 400, { error: "invalid_url", message: "The request URL is invalid.", requestId }, requestId);
        return;
      }
      if (request.method !== "GET" && request.method !== "HEAD") {
        recordAudit({ requestId, pathname: url.pathname, method: request.method, statusCode: 405, startedAt, filters: null });
        sendJson(response, 405, { error: "method_not_allowed", message: "This MVP exposes read-only GET routes.", requestId }, requestId);
        return;
      }
      if (url.pathname.startsWith("/api/")) {
        handleApi(request, response, url, requestId, startedAt);
        return;
      }
      let decodedPath;
      try {
        decodedPath = decodeURIComponent(url.pathname);
        if (decodedPath.includes("\0")) throw new URIError("NUL is not allowed in request paths.");
      } catch {
        recordAudit({ requestId, pathname: url.pathname, method: request.method, statusCode: 400, startedAt, filters: null });
        sendJson(response, 400, { error: "invalid_path", message: "The request path has invalid encoding or prohibited characters.", requestId }, requestId);
        return;
      }
      serveStatic(response, decodedPath);
    } catch {
      recordAudit({ requestId, pathname: request.url || "unknown", method: request.method, statusCode: 500, startedAt, filters: null });
      if (!response.headersSent) {
        sendJson(response, 500, { error: "internal_error", message: "The request could not be completed.", requestId }, requestId);
      } else {
        response.destroy();
      }
    }
  });
}

if (require.main === module) {
  const port = Number.parseInt(process.env.PORT || "8800", 10);
  const host = process.env.HOST || "127.0.0.1";
  createServer().listen(port, host, () => {
    process.stdout.write(`ORBIT HR Fitness Check MVP running at http://${host}:${port}\n`);
  });
}

module.exports = {
  createServer,
  buildSummary,
  buildSites,
  buildTrends,
  buildCategories,
  buildCatalogItems,
  buildItemResults,
  buildExecutiveReport,
  buildContracts,
  buildCsv,
  escapeCsv,
  validateFixture,
  canonicalHash
};
