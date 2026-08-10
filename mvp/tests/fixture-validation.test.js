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
