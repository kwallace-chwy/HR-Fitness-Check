# Technical Design and Scoring Contract

## Document metadata

| Field | Value |
| --- | --- |
| Document ID | `HRFC-MVP-TECH-001` |
| Version | `0.3` |
| Status | Implemented MVP contract; not a production architecture approval |
| Last updated | 2026-08-10 |
| Runtime | Node.js 22 or newer; use a supported LTS line; built-in production modules only; Playwright/Axe are development test dependencies |
| Product version | `0.1.0` |
| Catalog version | `working-2026-07-29`, approval pending |
| Accountable owner | Engineering / Product, approval pending |

> **Authority boundary:** The server deterministically exercises a synthetic fixture. It does not implement production scoring, identity, source retrieval, durable audit, model use, approval, or publishing.

## Implemented topology

```text
Browser (HTML/CSS/JS)
        |
        | GET/HEAD only
        v
Node HTTP server
  - filter validation
  - deterministic item fixture generation
  - metric aggregation
  - executive draft and CSV builders
  - static-file serving
  - in-memory request audit
        |
        v
mvp/data/mvp-data.json
```

Implemented files are `mvp/server.js`, `mvp/public/index.html`, `mvp/public/app.js`, `mvp/public/styles.css`, and `mvp/data/mvp-data.json`. The MVP has no production runtime package or network dependency. Playwright and Axe are development-only dependencies for checked-in browser validation.

## HTTP behavior

- Default bind: `127.0.0.1:8800`; `HOST` and `PORT` may override it.
- Allowed methods: `GET` and `HEAD`. Every other method returns HTTP 405 with `error=method_not_allowed`.
- Unknown API routes return HTTP 404 with `error=not_found`.
- Invalid or explicitly empty filter values return HTTP 400 with `error=invalid_filter`; only absent optional parameters receive defaults.
- Query validation is route-first. Unknown parameters return HTTP 400 with `error=invalid_parameter`; duplicate parameters return HTTP 400 with `error=duplicate_parameter`; an unknown route remains 404 even when its query is invalid.
- Item results without `site` return HTTP 400 with `error=site_required`.
- JSON responses include `Content-Type: application/json; charset=utf-8`; CSV includes `text/csv; charset=utf-8` and an attachment filename.
- API responses include `X-Request-Id`, `X-Api-Version: v1`, and `X-Contract-Version: hrfc.api.v1`. Responses use `Cache-Control: no-store`, CSP, `Referrer-Policy: no-referrer`, `X-Content-Type-Options: nosniff`, and `X-Frame-Options: DENY`.
- Invalid percent-encoding and NUL-containing static paths fail closed with HTTP 400. Static traversal outside `mvp/public` fails with HTTP 403. A top-level request boundary prevents malformed requests from terminating the process.
- Response envelopes are route-specific; there is no implemented OpenAPI document or uniform `{data,meta}` wrapper.

## Filter contract

| Parameter | Default | Allowed fixture values | Semantics |
| --- | --- | --- | --- |
| `period` | `2026 Q3` | `2026 Q3`, `2026 Q2`, `2026 Q1`, `2025 Q4` | Exact match |
| `group` | `All` | `All`, `1G`, `2G`, `Rx` | Intersects with region and site |
| `region` | `All` | `All`, `East`, `West`, `Rx` | Intersects with group and site |
| `site` | omitted / `null` | Any fixture `siteId` | Optional except on item-results; intersects with group and region |

An individually valid but incompatible group/region/site combination produces an empty scope. Each route publishes its allowed and required filter keys in `/api/v1/contracts`; unscoped catalog, source, release-gate, and audit routes reject scope parameters. The browser retains period, region, and group in URL state but hides the scope controls on global-only views. Site is added by the site-review drilldown.

## API contract

All routes below support `GET` and `HEAD` and are read-only.

| Route | Response contract |
| --- | --- |
| `/api/health` | `{status, product, version, dataStatus}` |
| `/api/v1/meta` | Full fixture `meta` fields plus `catalog`, `apiVersion`, and `contractVersion` |
| `/api/v1/contracts` | Machine-readable API/contract versions, provenance semantics, query conventions, metric definitions, result enums, invariants, and per-route filter allowlists |
| `/api/v1/filters` | `{periods, groups, regions}` |
| `/api/v1/summary` | `{dataStatus, catalogVersion, dataAsOf, catalogAsOf, catalogApprovalStatus, period, scope, metrics, previousPeriod, change, illustrativeChange, distribution, redItems, catalogReadiness}` |
| `/api/v1/sites` | `{dataStatus, period, rows[]}`; each row contains scope, distribution, green share, evidence coverage, illustrative `change`, category detail, and result status |
| `/api/v1/trends` | `{dataStatus, rows[]}` ordered `2025 Q4` through `2026 Q3`; each row contains period, green share, evidence coverage, red count, catalog version, and non-comparability status |
| `/api/v1/categories` | `{dataStatus, rows[]}` sorted from lowest to highest rated fixture green share with null/unrated evidence gaps last; each row contains category, distribution, green share, and evidence coverage |
| `/api/v1/catalog-items` | `{dataStatus:"latest_working_evidence", catalogVersion, catalogApprovalStatus, rows[]}` |
| `/api/v1/item-results` | Requires `site`; returns `{dataStatus, catalogVersion, period, siteId, rows[]}` |
| `/api/v1/sources` | `{status:"reviewed_discovery", rows[]}`; rows are source leads, not connections |
| `/api/v1/release-gates` | `{status:"draft", rows[]}` |
| `/api/v1/reports/executive` | Executive report contract defined below |
| `/api/v1/reports/export.csv` | One site-summary row per selected site using the exact CSV contract below |
| `/api/v1/audit-events` | `{status:"ephemeral", rows[]}` with at most the newest 50 events |

## Metric object contract

Each implemented ratio metric is:

```json
{
  "metricId": "green_share",
  "numerator": 118,
  "denominator": 189,
  "value": 0.624,
  "definitionVersion": "metric.hrfc.v1",
  "asOf": "2026-08-06T20:00:00Z",
  "dataAsOf": "2026-08-06T20:00:00Z",
  "catalogAsOf": "2026-07-29T16:32:27Z",
  "comparabilityStatus": "illustrative_not_recast"
}
```

`value = null` when the denominator is zero; otherwise it is `round(numerator / denominator, 3)`. UI and report whole percentages are calculated directly from `numerator / denominator`, avoiding double rounding. Report metric objects retain numeric `value` and add `displayValue`; count metrics use `denominator=null` and the same provenance/version fields. `asOf` is the synthetic data snapshot time, while `catalogAsOf` separately identifies catalog currency.

For a selected scope and period, define:

- `G` = count of generated results rated green.
- `Y` = count rated yellow.
- `R` = count rated red.
- `M` = count with `rating=null`.
- `Rated = G + Y + R`.
- `Eligible = G + Y + R + M`.
- `ManualExpected` = count of manual or hybrid catalog-item observations.
- `ManualAccepted` = count with `resultStatus=manual_input`.

| Metric ID | Exact formula | Denominator policy |
| --- | --- | --- |
| `green_share` | `G / Rated` | Excludes unrated exceptions; this is a fixture rated-observation denominator, not the approved V1 catalog denominator |
| `evidence_coverage` | `Rated / Eligible` | Includes every generated catalog-item observation in the selected scope |
| `evidence_exception_rate` | `M / Eligible` | Complement of evidence coverage for the current implemented statuses |
| `manual_completion` | `ManualAccepted / ManualExpected` | Includes only assumed manual and hybrid rows |
| `red_item_observations` | `R` | Count metric; `denominator=null`. Summary also exposes the same count as raw field `redItems`. |
| `sites_in_scope` | Count of sites in the resolved filter intersection | Count metric; `denominator=null` |

No composite Quality Index is calculated or returned.

## Comparison contract

- `comparabilityStatus` is always `illustrative_not_recast` in the fixture.
- Summary `change` is deliberately `null`.
- Summary `illustrativeChange` and each site row's `change` are current-minus-prior `green_share` deltas when both values exist.
- Trend rows are rendered for product review only. They must not be described as business improvement, regression, or a valid quarter-over-quarter comparison.
- Production comparison remains blocked until an approved catalog, missing-value policy, rules, and historical recast exist.

## Fixture result generation contract

- `validateFixture()` runs before the server can start. It fails closed on missing/duplicate IDs, invalid enums or timestamps, unknown source references, catalog-count drift, missing periods, invalid distributions, unavailable-source undercount, or inconsistent result status.
- The server generates 33 item rows for a valid selected site.
- IDs use `demo-result-{site}-{period}-{demoItemId}` and are non-production.
- The assumed mode and evidence source come from the fixture catalog.
- A blocked or governance source forces `rating=null`.
- A manual/hybrid row with a fixture rating receives `resultStatus=manual_input`; an absent or blocked one receives `manual_required`.
- An absent automated item receives `missing_source`; a governance-first or blocked automated item receives `unmapped`.
- Rated automated items receive `scored`.
- Rated manual/hybrid rows use `evidenceStatus=accepted_fixture`; rated automated rows use `source_fixture`; unrated rows use `required`.
- Every row uses `ruleVersion=demo-policy-v1-unapproved` and a synthetic-data caveat.
- Every site-period generated distribution must exactly reconcile to the stored post-policy expected distribution.

## Executive report contract

`GET /api/v1/reports/executive` returns:

| Field | Exact behavior |
| --- | --- |
| `reportId` | New `rpt-{UUID}` for each request; not stable |
| `contentKey` / `contentVersion` | First 16 lowercase hexadecimal characters of SHA-256 over canonical semantic-report JSON plus schema version; excludes volatile request fields and includes the scoped-result fingerprint |
| `status` / `dataStatus` | `draft` / `fixture` |
| `title` | `{period} HR Fitness Check review` |
| `scopeLabel` | Site ID first; otherwise `{group} sites in {region} region` when both filters are specific; otherwise `{group} sites`, `{region} region`, or `network fixture` |
| `generatedAt` | Current server time in ISO-8601; not deterministic |
| Provenance fields | `dataAsOf`; `dataFingerprint` as the first 16 lowercase hexadecimal characters of SHA-256 over canonical scoped item-result JSON; `catalogVersion`, `catalogAsOf`, `catalogApprovalStatus`, `contractVersion`, `comparabilityStatus` |
| `headline` | Template-derived green share and evidence coverage plus the disabled-comparison statement |
| `metrics` | Uniform numeric metric objects; human presentation is isolated in `displayValue` |
| `strengths` | Highest rated category by fixture green share |
| `opportunities` | Lowest rated category plus red-observation review statement |
| `caveats` | Synthetic data, approval blockers, legacy-label non-comparability, and non-causal/no-model statement |
| `decisions` | First five incomplete release gates |
| `sourceRefs` | Repository evidence paths from fixture metadata |

The analytic values, narrative templates, `dataFingerprint`, and `contentKey` are deterministic for the same fixture content and filters; `reportId` and `generatedAt` are intentionally volatile. A result or semantic report change changes the content key even when catalog and API versions do not. The report contains no model-generated causality or individual attribution and cannot be published from the MVP.

## CSV contract

The header order is exact:

```text
period,site_id,group,region,green_share,green_numerator,rated_denominator,evidence_coverage,rated_items,eligible_items,green,yellow,red,missing,result_status,data_status,catalog_version,catalog_approval_status,data_as_of,catalog_as_of,metric_definition_version,comparability_status,contract_version
```

Rows reconcile to `/api/v1/sites` for the same filters. Fields beginning with `=`, `+`, `-`, or `@` are prefixed with an apostrophe before CSV quoting to reduce spreadsheet-formula injection risk. The export is still synthetic and approval-pending.

## Audit contract

Each API request records `requestId`, UTC timestamp, fixed `userScope="mvp-reviewer / fixture"`, capability ID, route, method, status code, route-applicable filters, data status, catalog version/status, latency in milliseconds, and `decision` (`answered` below 400; otherwise `rejected`). Capability is selected by exact registered route membership: the two registered report routes use `cap.hrfc.reporting.v1`; every other or unknown API route uses `cap.hrfc.cockpit_read.v1`. Unscoped routes and requests rejected before filter resolution store `filters=null`; scoped routes store only the filter keys allowed by that route.

The store is process memory only, holds at most 100 newest events, returns at most 50, and resets on restart. It is demonstrative observability, not production auditability.

## Testable technical requirements

| Requirement ID | Requirement and acceptance test |
| --- | --- |
| `TECH-REQ-001` | Every API route shall reject unsupported methods with 405 and unknown API routes with JSON 404. |
| `TECH-REQ-002` | Filter values and route-specific query allowlists shall fail closed with 400; duplicate/unknown parameters shall never silently widen scope. |
| `TECH-REQ-003` | Metric values shall reconcile to explicit numerators and denominators using `metric.hrfc.v1`; zero denominator shall return null. |
| `TECH-REQ-004` | Site and category rollups shall be derived from item results for the same period and filter intersection. |
| `TECH-REQ-005` | Missing, blocked, governance, and manual-required evidence shall not receive a synthetic rating. |
| `TECH-REQ-006` | The executive report and CSV shall use the same selected scope and metric inputs as summary/site APIs. |
| `TECH-REQ-007` | CSV output shall preserve header order, scope, provenance, and formula-prefix neutralization. |
| `TECH-REQ-008` | Responses shall include no-store and implemented security headers, and the static app shall require no external asset host. |
| `TECH-REQ-009` | The MVP shall perform no external source, model, approval, Confluence, or HR-system call. |
| `TECH-REQ-010` | Production runtime shall not reuse the fixed fixture user scope or memory audit as an authorization/audit control. |
| `TECH-REQ-011` | Startup shall validate every published fixture metadata/source/gate field, nonblank rendered dimensions, exact safety statuses, canonical UTC provenance, newest-to-oldest contiguous quarters, referential integrity, enumerations, bounded catalog counts, and distributions before accepting a request. |
| `TECH-REQ-012` | Report content identity shall be deterministic over semantic report content and scoped results while request ID and generation time remain volatile. |

## Future production work

| Area | Not implemented in MVP | Required before pilot/production |
| --- | --- | --- |
| Identity and authorization | No authentication, RBAC, site scope, or row/field policy | Phoenix identity integration and fail-closed route/source/output authorization tests |
| Catalog | Demo IDs and assumed modes | Approved stable catalog, version/effective dates, legacy crosswalk, denominator decision |
| Sources | Discovery metadata only | Governed connectors, active versions, freshness, lineage, access, rollback |
| Scoring | Synthetic generator | Executable SME-approved rules, missing policy, reconciliation fixtures, run IDs |
| Storage | Repository JSON and process memory | Governed result, lineage, report, approval, and append-only audit stores |
| Narrative | Static templates | Optional supervised model gateway only after data handling, grounding, citation, validation, eval, cost, and rollback approval |
| Actions | None | Explicit preview/approve/execute receipts for each approved action class; autonomous operation remains out of scope |
| Operations | Local health and audit view | SLOs, alerting, incident runbooks, support ownership, backup, retention, DR, and capacity tests |

## Assumptions

| ID | Type | Statement / response |
| --- | --- | --- |
| `TECH-A-001` | Assumption | Node.js 22+ is available in the reviewer environment; a supported LTS line is used for any shared environment. |
| `TECH-A-002` | Assumption | A single-process localhost server is sufficient for MVP review, not concurrent production use. |

## Risks

| ID | Type | Statement / response |
| --- | --- | --- |
| `TECH-R-001` | Risk | `site.change` and `illustrativeChange` could be misread as valid trends; UI and reports must retain non-comparability labels. |
| `TECH-R-002` | Risk | Report content is called deterministic although IDs/timestamps vary; validation must compare semantic fields, not whole-response bytes. |
| `TECH-R-003` | Risk | The implemented versioned contract registry is not a formal OpenAPI/JSON Schema compatibility program; production still requires generated schema conformance and deprecation policy. |
| `TECH-R-004` | Risk | Local security headers do not replace authentication, authorization, secrets, deployment hardening, or privacy review. |

## Cross-references

| Document ID | Repository page | Confluence page |
| --- | --- | --- |
| `HRFC-MVP-DATA-001` | `Data-Map-and-Classification.md` | [5404164396](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5404164396) |
| `HRFC-MVP-UX-001` | `UX-and-Reporting-Specification.md` | [5403968355](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5403968355) |
| `HRFC-MVP-EVAL-001` | `Evaluation-and-Release-Evidence.md` | [5403968375](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5403968375) |
| `HRFC-MVP-OPS-001` | `Runbook-and-Rollout.md` | [5404262565](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5404262565) |
