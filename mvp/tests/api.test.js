"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { once } = require("node:events");
const { createServer } = require("../server");

let server;
let baseUrl;

test.before(async () => {
  server = createServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
  server.close();
  await once(server, "close");
});

test("health route returns versioned fixture status and security headers", async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.status, "ok");
  assert.equal(body.dataStatus, "fixture");
  assert.match(response.headers.get("content-security-policy"), /default-src 'self'/);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-api-version"), "v1");
  assert.equal(response.headers.get("x-contract-version"), "hrfc.api.v1");
  assert.ok(response.headers.get("x-request-id"));
});

test("contract route publishes versioned metrics, invariants, and routes", async () => {
  const response = await fetch(`${baseUrl}/api/v1/contracts`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.apiVersion, "v1");
  assert.equal(body.contractVersion, "hrfc.api.v1");
  assert.equal(body.metricDefinitions.length, 6);
  assert.equal(new Set(body.metricDefinitions.map((metric) => metric.metricId)).size, 6);
  assert.equal(body.dataAsOf, "2026-08-06T20:00:00Z");
  assert.equal(body.catalogAsOf, "2026-07-29T16:32:27Z");
  assert.match(body.provenance.metricAsOf, /data snapshot/);
  assert.equal(body.routes.some((route) => route.path === "/api/v1/reports/export.csv"), true);
  assert.equal(body.invariants.some((rule) => rule.includes("rating=null")), true);
  assert.match(body.conventions.queryPolicy, /rejected/);
});

test("every published route is reachable from its own contract", async () => {
  const contractResponse = await fetch(`${baseUrl}/api/v1/contracts`);
  const contract = await contractResponse.json();
  for (const route of contract.routes) {
    const query = new URLSearchParams();
    if (route.requiredFilters?.includes("site")) query.set("site", "HOU1");
    const response = await fetch(`${baseUrl}${route.path}${query.size ? `?${query}` : ""}`);
    assert.equal(response.status, 200, route.path);
    assert.match(response.headers.get("content-type"), new RegExp(`^${route.mediaType.replace("/", "\\/")}`), route.path);
  }
});

test("summary filters by site and returns the 33-item denominator", async () => {
  const response = await fetch(`${baseUrl}/api/v1/summary?period=2026%20Q3&region=All&group=All&site=HOU1`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.scope.siteCount, 1);
  assert.equal(body.metrics.evidenceCoverage.denominator, 33);
});

test("oldest period stays available without prior-period data", async () => {
  const response = await fetch(`${baseUrl}/api/v1/summary?period=2025%20Q4&region=All&group=All`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.previousPeriod, null);
  assert.equal(body.illustrativeChange, null);
});

test("invalid filters fail closed with 400", async () => {
  const response = await fetch(`${baseUrl}/api/v1/summary?period=2099%20Q9`);
  const body = await response.json();
  assert.equal(response.status, 400);
  assert.equal(body.error, "invalid_filter");

  for (const key of ["period", "region", "group", "site"]) {
    const emptyResponse = await fetch(`${baseUrl}/api/v1/summary?${key}=`);
    const emptyBody = await emptyResponse.json();
    assert.equal(emptyResponse.status, 400, `${key}= must not widen to a default scope`);
    assert.equal(emptyBody.error, "invalid_filter");
  }

  const emptyRequiredSite = await fetch(`${baseUrl}/api/v1/item-results?site=`);
  const emptyRequiredSiteBody = await emptyRequiredSite.json();
  assert.equal(emptyRequiredSite.status, 400);
  assert.equal(emptyRequiredSiteBody.error, "invalid_filter");
});

test("unknown and duplicate query parameters fail closed without widening scope", async () => {
  const typo = await fetch(`${baseUrl}/api/v1/summary?siteId=HOU1`);
  const typoBody = await typo.json();
  assert.equal(typo.status, 400);
  assert.equal(typoBody.error, "invalid_parameter");

  const duplicate = await fetch(`${baseUrl}/api/v1/summary?region=East&region=West`);
  const duplicateBody = await duplicate.json();
  assert.equal(duplicate.status, 400);
  assert.equal(duplicateBody.error, "duplicate_parameter");

  const unknownRoute = await fetch(`${baseUrl}/api/v1/not-real?period=2099%20Q9`);
  const unknownBody = await unknownRoute.json();
  assert.equal(unknownRoute.status, 404);
  assert.equal(unknownBody.error, "not_found");
});

test("item result route requires a site", async () => {
  const response = await fetch(`${baseUrl}/api/v1/item-results?period=2026%20Q3`);
  const body = await response.json();
  assert.equal(response.status, 400);
  assert.equal(body.error, "site_required");
});

test("CSV export reconciles to selected scope and includes provenance", async () => {
  const response = await fetch(`${baseUrl}/api/v1/reports/export.csv?period=2026%20Q3&region=All&group=All&site=HOU1`);
  const csv = await response.text();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^text\/csv/);
  assert.equal(response.headers.get("x-contract-version"), "hrfc.api.v1");
  assert.match(csv, /green_share,green_numerator,rated_denominator,evidence_coverage/);
  assert.match(csv, /HOU1/);
  assert.match(csv, /working-2026-07-29/);
  assert.match(csv, /data_as_of,catalog_as_of,metric_definition_version,comparability_status,contract_version/);
  assert.match(csv, /2026-08-06T20:00:00Z,2026-07-29T16:32:27Z,metric\.hrfc\.v1,illustrative_not_recast,hrfc\.api\.v1/);
  assert.equal(csv.includes("AVP1"), false);
});

test("static app is served with no external asset dependency", async () => {
  const response = await fetch(`${baseUrl}/`);
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /ORBIT HR Fitness Check MVP/);
  assert.match(html, /src="\/app\.js"/);
  assert.match(html, /rel="icon" href="\/favicon\.svg"/);
  assert.equal(/https?:\/\//.test(html), false);

  const favicon = await fetch(`${baseUrl}/favicon.svg`);
  assert.equal(favicon.status, 200);
  assert.match(favicon.headers.get("content-type"), /^image\/svg\+xml/);
});

test("frontend uses route-specific filters and focused accessibility status", async () => {
  const htmlResponse = await fetch(`${baseUrl}/`);
  const html = await htmlResponse.text();
  const scriptResponse = await fetch(`${baseUrl}/app.js`);
  const script = await scriptResponse.text();
  assert.match(html, /id="viewStatus"[^>]+role="status"/);
  assert.equal(/id="appContent"[^>]+aria-live/.test(html), false);
  assert.match(script, /api\("\/api\/v1\/trends", \{\}, \["region", "group"\]\)/);
  assert.match(script, /api\("\/api\/v1\/catalog-items", \{\}, \[\]\)/);
  assert.match(script, /aria-label="Inspect \$\{escapeHtml\(item\.task\)\}"/);
  assert.match(script, /aria-label="Item results\. Scroll horizontally to review all columns\." tabindex="0"/);
});

test("data readiness UI records the resolved Confluence conflict as history", async () => {
  const response = await fetch(`${baseUrl}/app.js`);
  const script = await response.text();
  assert.equal(response.status, 200);
  assert.match(script, /Prior Confluence snapshot/);
  assert.match(script, /replaced August 6/);
  assert.equal(script.includes("<strong>Live Confluence</strong>"), false);
});

test("unrated item results use a neutral exception badge", async () => {
  const scriptResponse = await fetch(`${baseUrl}/app.js`);
  const script = await scriptResponse.text();
  const styleResponse = await fetch(`${baseUrl}/styles.css`);
  const styles = await styleResponse.text();
  assert.match(script, /statusBadge\("exception", "No rating"\)/);
  assert.equal(script.includes('statusBadge("danger", "No rating")'), false);
  assert.match(styles, /\.status-exception/);
});

test("UI percent labels derive from metric numerators and denominators", async () => {
  const response = await fetch(`${baseUrl}/app.js`);
  const script = await response.text();
  assert.match(script, /function formatMetricPercent\(metric\)/);
  assert.match(script, /metric\.numerator \/ metric\.denominator/);
});

test("mobile navigation keeps the active deep-linked view visible", async () => {
  const scriptResponse = await fetch(`${baseUrl}/app.js`);
  const script = await scriptResponse.text();
  const styleResponse = await fetch(`${baseUrl}/styles.css`);
  const styles = await styleResponse.text();
  assert.match(script, /activeNavItem\.scrollIntoView/);
  assert.match(styles, /\.sidebar::\-webkit-scrollbar/);
  assert.match(styles, /flex: 0 0 36px/);
});

test("keyboard focus indicator uses an opaque high-contrast color", async () => {
  const response = await fetch(`${baseUrl}/styles.css`);
  const styles = await response.text();
  assert.match(styles, /outline: 3px solid var\(--chewy-blue\)/);
  assert.equal(styles.includes("outline: 3px solid rgba(28, 73, 194, 0.28)"), false);
});

test("malformed static URL is rejected without terminating the server", async () => {
  const malformed = await fetch(`${baseUrl}/%E0%A4%A`);
  const body = await malformed.json();
  assert.equal(malformed.status, 400);
  assert.equal(body.error, "invalid_path");

  const health = await fetch(`${baseUrl}/api/health`);
  assert.equal(health.status, 200);
});

test("NUL-containing static path is rejected without terminating the server", async () => {
  const malformed = await fetch(`${baseUrl}/app.js%00.css`);
  const body = await malformed.json();
  assert.equal(malformed.status, 400);
  assert.equal(body.error, "invalid_path");

  const health = await fetch(`${baseUrl}/api/health`);
  assert.equal(health.status, 200);
});

test("HEAD is accepted and unsupported writes are rejected", async () => {
  const head = await fetch(`${baseUrl}/api/health`, { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
  const post = await fetch(`${baseUrl}/api/v1/summary`, { method: "POST" });
  const body = await post.json();
  assert.equal(post.status, 405);
  assert.equal(body.error, "method_not_allowed");
});

test("unknown API route returns JSON 404", async () => {
  const response = await fetch(`${baseUrl}/api/v1/not-real`);
  const body = await response.json();
  assert.equal(response.status, 404);
  assert.equal(body.error, "not_found");
});

test("audit events use exact capabilities and only route-applicable filters", async () => {
  const probes = [
    ["/api/health", "health"],
    ["/api/v1/trends?region=West&group=1G", "trends"],
    ["/api/v1/item-results?period=2026%20Q2&site=AVP1", "items"],
    ["/api/v1/reports/executive?period=2026%20Q3&region=West&group=1G", "report"],
    ["/api/v1/not-reports", "unknown"]
  ];
  const requestIds = {};
  for (const [path, key] of probes) {
    const response = await fetch(`${baseUrl}${path}`);
    requestIds[key] = response.headers.get("x-request-id");
  }
  const audit = await (await fetch(`${baseUrl}/api/v1/audit-events`)).json();
  const byKey = Object.fromEntries(Object.entries(requestIds).map(([key, requestId]) => [
    key,
    audit.rows.find((row) => row.requestId === requestId)
  ]));

  assert.equal(byKey.health.capabilityId, "cap.hrfc.cockpit_read.v1");
  assert.equal(byKey.health.filters, null);
  assert.deepEqual(byKey.trends.filters, { region: "West", group: "1G", site: null });
  assert.deepEqual(byKey.items.filters, { period: "2026 Q2", site: "AVP1" });
  assert.equal(byKey.report.capabilityId, "cap.hrfc.reporting.v1");
  assert.deepEqual(byKey.report.filters, { period: "2026 Q3", region: "West", group: "1G", site: null });
  assert.equal(byKey.unknown.capabilityId, "cap.hrfc.cockpit_read.v1");
  assert.equal(byKey.unknown.filters, null);
});
