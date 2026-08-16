"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fixture = require("../data/mvp-data.json");
const { validateFixture } = require("../server");

function cloneFixture() {
  return JSON.parse(JSON.stringify(fixture));
}

test("current fixture passes deep validation", () => {
  const candidate = cloneFixture();
  assert.equal(validateFixture(candidate), candidate);
});

test("fixture validation rejects unknown source references", () => {
  const candidate = cloneFixture();
  candidate.catalogItems[0].sourceId = "src.not-registered";
  assert.throws(() => validateFixture(candidate), /references unknown source src\.not-registered/);
});

test("fixture validation rejects duplicate stable IDs", () => {
  const candidate = cloneFixture();
  candidate.catalogItems[1].demoItemId = candidate.catalogItems[0].demoItemId;
  assert.throws(() => validateFixture(candidate), /catalog item IDs must be unique/);
});

test("fixture validation requires every configured period for every site", () => {
  const candidate = cloneFixture();
  delete candidate.sites[0].results[candidate.periods[0]];
  assert.throws(() => validateFixture(candidate), /results must contain exactly the configured periods/);
});

test("fixture validation rejects distributions that do not total the catalog", () => {
  const candidate = cloneFixture();
  candidate.sites[0].results[candidate.periods[0]].green += 1;
  assert.throws(() => validateFixture(candidate), /distribution must total 33/);
});

test("fixture validation reserves missing observations for unavailable sources", () => {
  const candidate = cloneFixture();
  const mix = candidate.sites[0].results[candidate.periods[0]];
  mix.green += mix.missing;
  mix.missing = 0;
  mix.resultStatus = "fixture_complete";
  assert.throws(() => validateFixture(candidate), /missing count must include unavailable catalog items/);
});

test("fixture validation reconciles catalog metadata", () => {
  const candidate = cloneFixture();
  candidate.catalog.taskRows -= 1;
  assert.throws(() => validateFixture(candidate), /catalog\.taskRows must equal catalogItems length/);
});

test("fixture validation requires published metadata and safety posture", () => {
  const mutations = [
    ...["product", "version", "catalogVersion", "disclaimer", "sourceOfTruth"].map((field) => [
      (candidate) => delete candidate.meta[field],
      new RegExp(`meta\\.${field} must be a non-empty string`)
    ]),
    [(candidate) => { candidate.meta.sourceRefs = "not-an-array"; }, /meta\.sourceRefs must be a non-empty array/],
    [(candidate) => { candidate.meta.sourceRefs = []; }, /meta\.sourceRefs must be a non-empty array/],
    [(candidate) => { candidate.meta.sourceRefs[0] = ""; }, /meta\.sourceRefs must contain non-empty strings/],
    [(candidate) => { candidate.meta.sourceRefs[1] = candidate.meta.sourceRefs[0]; }, /meta\.sourceRefs must be unique/],
    [(candidate) => { candidate.meta.dataStatus = "live"; }, /meta\.dataStatus must be fixture/],
    [(candidate) => { candidate.meta.catalogApprovalStatus = "approved"; }, /meta\.catalogApprovalStatus must be approval_pending/],
    [(candidate) => { candidate.meta.comparisonStatus = "comparable"; }, /meta\.comparisonStatus must be illustrative_not_recast/]
  ];
  for (const [mutate, expected] of mutations) {
    const candidate = cloneFixture();
    mutate(candidate);
    assert.throws(() => validateFixture(candidate), expected);
  }
});

test("fixture validation rejects unsafe periods and noncanonical provenance timestamps", () => {
  for (const [path, mutate, expected] of [
    ["meta.generatedAt", (candidate) => { candidate.meta.generatedAt = "2026-02-30T00:00:00Z"; }, /meta\.generatedAt must be a canonical UTC timestamp/],
    ["meta.catalogAsOf", (candidate) => { candidate.meta.catalogAsOf = "not-a-timestamp"; }, /meta\.catalogAsOf must be a canonical UTC timestamp/],
    ["catalog.workbookModifiedAt", (candidate) => { candidate.catalog.workbookModifiedAt = "2026-02-30T00:00:00Z"; }, /catalog\.workbookModifiedAt must be a canonical UTC timestamp/]
  ]) {
    const candidate = cloneFixture();
    mutate(candidate);
    assert.throws(() => validateFixture(candidate), expected, path);
  }

  const driftedCatalogDate = cloneFixture();
  driftedCatalogDate.catalog.workbookModifiedAt = "2026-07-30T16:32:27Z";
  assert.throws(() => validateFixture(driftedCatalogDate), /workbookModifiedAt must equal meta\.catalogAsOf/);

  const unsafePeriod = cloneFixture();
  unsafePeriod.periods[0] = '2026 Q3"\r\nX-Injected: value';
  assert.throws(() => validateFixture(unsafePeriod), /periods must use YYYY Q1-Q4 format/);

  const reversedPeriods = cloneFixture();
  reversedPeriods.periods.reverse();
  assert.throws(() => validateFixture(reversedPeriods), /periods must be newest-to-oldest contiguous quarters/);

  const gappedPeriods = cloneFixture();
  gappedPeriods.periods[1] = "2024 Q4";
  assert.throws(() => validateFixture(gappedPeriods), /periods must be newest-to-oldest contiguous quarters/);

  const staleDefault = cloneFixture();
  staleDefault.meta.defaultPeriod = staleDefault.periods[1];
  assert.throws(() => validateFixture(staleDefault), /meta\.defaultPeriod must be the newest configured period/);
});

test("fixture validation bounds catalog counts and requires rendered source and gate fields", () => {
  for (const field of ["status", "workbookVersion", "approvalStatus"]) {
    const candidate = cloneFixture();
    delete candidate.catalog[field];
    assert.throws(() => validateFixture(candidate), new RegExp(`catalog\\.${field} must be a non-empty string`));
  }

  const boundedFields = ["approvedMappings", "approvedImplementationModes", "sourceTableBlanks", "reviewerBlanks", "resultBlanks"];
  for (const field of boundedFields) {
    const candidate = cloneFixture();
    candidate.catalog[field] = candidate.catalogItems.length + 1;
    assert.throws(() => validateFixture(candidate), new RegExp(`catalog\\.${field} must be an integer from 0 to 33`));
  }

  const impossibleMappingCounts = cloneFixture();
  impossibleMappingCounts.catalog.approvedMappings = 1;
  assert.throws(() => validateFixture(impossibleMappingCounts), /approvedMappings and sourceTableBlanks must not exceed catalogItems length/);

  for (const field of ["family", "coverage", "owner", "freshness", "nextAction", "evidence"]) {
    const candidate = cloneFixture();
    delete candidate.sources[0][field];
    assert.throws(() => validateFixture(candidate), new RegExp(`source src\\.ukg\\.${field} must be a non-empty string`));
  }

  for (const field of ["name", "owner"]) {
    const candidate = cloneFixture();
    delete candidate.releaseGates[0][field];
    assert.throws(() => validateFixture(candidate), new RegExp(`release gate RC-001\\.${field} must be a non-empty string`));
  }

  for (const [collection, field, expected] of [
    ["catalogItems", "task", /catalog item demo-sw-001 requires a task/],
    ["catalogItems", "category", /catalog item demo-sw-001 requires a category/],
    ["sites", "group", /site HOU1 requires a group/],
    ["sites", "region", /site HOU1 requires a region/]
  ]) {
    const candidate = cloneFixture();
    candidate[collection][0][field] = "   ";
    assert.throws(() => validateFixture(candidate), expected);
  }
});
