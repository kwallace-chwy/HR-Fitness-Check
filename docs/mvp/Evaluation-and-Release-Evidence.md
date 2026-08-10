# Evaluation and Release Evidence

## Document metadata

| Field | Value |
| --- | --- |
| Document ID | `HRFC-MVP-EVAL-001` |
| Version | `0.3` |
| Status | MVP review evidence; production release blocked |
| Last updated | 2026-08-10 |
| Evaluation target | Local read-only ORBIT HR Fitness Check MVP `0.1.0` |
| Catalog under test | `working-2026-07-29`, approval pending |
| Decision supported | Ready for product/UX review only |
| Evaluation owner | Engineering / Product, formal owner TBD |

> **Release conclusion:** The implemented local workflow passes its current automated contract tests. This is evidence for MVP review, not proof of source correctness, approved scoring, pilot readiness, or production readiness.

## Fact-check ledger

| Fact ID | Claim | Evidence | Result |
| --- | --- | --- | --- |
| `FACT-001` | Latest working catalog evidence has 33 rows as of July 29. | MVP metadata/catalog fixture and catalog test | Confirmed for implemented MVP |
| `FACT-002` | The 33 rows are approval-pending, not an approved denominator. | `catalogApprovalStatus=approval_pending`; approved mappings/modes both 0; disclaimer | Confirmed |
| `FACT-003` | The live Confluence PRD previously contained stale May 2026 / 49-item content and required replacement. | Pre-publish page version 14 plus repository fact-check; page 5006537577 was then refreshed from the reconciled repo PRD | Resolved downstream at Confluence version 15 and re-verified on 2026-08-10; the MVP Data Readiness panel intentionally preserves the discovered conflict as reconciliation history |
| `FACT-004` | The June 30 repository/workbook snapshot was 38 rows / 37 scope-intent / 1 removal. | PRD and reviewed disposition | Confirmed as superseded discovery evidence |
| `FACT-005` | Site and item results are synthetic and read-only. | Fixture disclaimer, static app boundary, server method guard, tests | Confirmed |
| `FACT-006` | No model produces the executive narrative. | Report builder uses fixed templates; report caveat states no model-generated causality | Confirmed |
| `FACT-007` | No Quality Index is emitted. | Trend/report contract test and server response inspection | Confirmed |
| `FACT-008` | No newer recorded approval closes the catalog/denominator, access-list, named-owner, source-mapping, or MVP-acceptance gates. | Read-only Slack, Outlook, SharePoint, and Confluence recheck on 2026-08-10; PRD inline comment 5217812622 remains open | No approval evidence found after the 2026-08-07 publication set; absence of a search result is not treated as approval |

## Executed automated evidence

Executed from `mvp` on 2026-08-10:

```powershell
npm test
npm run check
npm run test:e2e
npm run test:all
```

| Evidence ID | Command | Result |
| --- | --- | --- |
| `EVID-001` | `npm test` | PASS: 46 Node contract tests across reporting, API/UI static contracts, audit scope/capability, scope matrix, and fail-closed fixture validation; 0 failures, 0 skipped, 0 cancelled |
| `EVID-002` | `npm run check` | PASS: Node syntax checks for `server.js` and `public/app.js` |
| `EVID-003` | `npm run test:e2e` | PASS: 6 Microsoft Edge Playwright/Axe tests, 0 failures; stable bootstrap/deep-link recovery, six views with Back/Forward, reporting/CSV, modal/refresh focus, local announcements, exact-320px reflow/overflow, and serious/critical accessibility rules |
| `EVID-004` | `npm run test:all` | PASS: syntax, 46 core tests, and 6 browser/accessibility tests in one command |
| `EVID-005` | Independent adversarial QA | Found crash, route-contract, rounding, fixture-integrity, provenance, report-schema, audit-classification/scope, bootstrap/history/focus, mobile, and accessibility defects; each confirmed issue was corrected and regression-checked before handoff |
| `EVID-006` | Dependency audit | PASS: 0 known vulnerabilities reported after installing the locked development dependencies; production dependencies remain 0 |
| `EVID-007` | Connected-source currency check | Slack exact searches found no newer HRFC decision; the 2026-08-07 ORBIT update still names scope, source mapping, and data readiness as next steps; the SharePoint matrix remains modified 2026-07-29 with mapping/reviewer/result blanks; Confluence PRD remains version 15 and approval-pending |
| `EVID-008` | Supported-runtime replay | PASS: checksum-verified official Node 22.22.3 and Node 24.18.0 LTS runtimes each passed syntax, all 46 Node tests, and all 6 Edge/Axe tests; the locked install dry-run also passed on both runtimes |

Current tests cover:

- Health/version/fixture status, request ID, CSP, and nosniff headers.
- One-site 33-item eligible denominator.
- Oldest-period API and builder behavior when no prior period exists.
- Invalid-filter fail-closed behavior.
- Route-specific query allowlists, duplicate/unknown parameter rejection, and machine-readable contracts.
- Exact audit capability classification and route-applicable filter projection, including null scope for unscoped or pre-resolution rejection events.
- Required-site behavior for item detail.
- CSV scope reconciliation, separate data/catalog provenance, metric/contract versions, and formula neutralization.
- Static app delivery with no external asset URL and a locally served favicon.
- Reconciled Confluence history labeling in the Data Readiness UI.
- Neutral exception styling for unrated, blocked, missing, and unmapped evidence.
- Mobile active-tab visibility, visible overflow affordance, fixed-size brand mark, and keyboard-scrollable item results.
- Opaque high-contrast keyboard focus indicator.
- Malformed static-path rejection without server termination.
- HEAD handling, write rejection, and JSON 404.
- 33 approval-pending catalog rows and demo-ID namespace.
- Explicit metric numerators, denominators, version, and non-comparability.
- Separation of result status from rating.
- Exact item-to-site rollup reconciliation.
- Period-sensitive category aggregation.
- Trend ordering and absence of a composite Quality Index.
- Caveated, non-causal executive report.
- Combined region and site-group report scope labeling.
- Uniform numeric report metric schema plus presentation-only display values.
- Stable semantic report content keys and scoped data fingerprints, independent from volatile request trace fields.
- Exact reconciliation across all 64 period/region/group scopes and all 1,056 site-period-item observations.
- Fail-fast fixture validation for every published metadata/source/gate field, nonblank rendered dimensions, exact safety statuses, canonical UTC provenance, newest-to-oldest contiguous quarters, IDs, references, enums, bounded catalog counts, distributions, and unavailable-source handling.
- Stable boot-shell/deep-link initialization, bootstrap and initialized-view recovery, six-view Back/Forward navigation, modal/refresh focus behavior, local-filter announcements, report/CSV download, exact-320px reflow/keyboard overflow, and Axe serious/critical scans.

## Reference fixture outputs

These are regression fixtures, not HR performance claims.

| Scope | Distribution G/Y/R/M | Green share | Evidence coverage | Exception rate | Manual completion |
| --- | --- | --- | --- | --- | --- |
| 2026 Q3, all 8 fixture sites | 118 / 38 / 33 / 75 | 118/189 = 0.624 | 189/264 = 0.716 | 75/264 = 0.284 | 40/88 = 0.455 |
| 2026 Q3, HOU1 fixture | 11 / 8 / 5 / 9 | 11/24 = 0.458 | 24/33 = 0.727 | 9/33 = 0.273 | 5/11 = 0.455 |

For the network fixture, the executive report displays 62% green share, 72% evidence coverage, 33 red observations, and 8 sites. It labels the result synthetic, deterministic, approval-pending, and non-comparable.

## Requirements traceability

| Requirement area | Automated evidence now | Manual/future evidence required |
| --- | --- | --- |
| `DATA-REQ-001` through `DATA-REQ-004` | Catalog, result-state, rollup, and metric tests pass | Approved catalog/source reconciliation not available |
| `DATA-REQ-005` through `DATA-REQ-008` | Fixture integrity, distinct data/catalog provenance, and read-only paths tested | Privacy, access, source onboarding, and distribution reviews required |
| `TECH-REQ-001` through `TECH-REQ-012` | Method/query/API/scoring/report/CSV/schema/header/static/fixture tests pass across the complete fixture matrix | Concurrency, load, formal security, and deployment tests required |
| `TECH-REQ-010` | MVP visibly labels fixed/ephemeral audit | Production identity and audit implementation required |
| `UX-REQ-001` through `UX-REQ-009` | Checked-in Edge interaction tests plus desktop and exact-320px review pass for the review build | Product/UX acceptance and broader supported-browser coverage required |
| `UX-REQ-010` | Axe serious/critical scans, keyboard overflow, focus return, focus contrast, and reduced-motion foundations pass | Human screen-reader, full keyboard workflow, zoom/reflow, and formal WCAG review required |
| `UX-REQ-011` | Method guard and absence of write actions tested/inspected | Production broker/action policy required if actions are later added |

## Release-gate status

| Gate ID | Current fixture status | Evidence needed to close |
| --- | --- | --- |
| `RC-001` Stable catalog IDs | Blocked | Approved stable IDs and legacy crosswalk |
| `RC-002` Current owner for every V1 item | Blocked | Named/current-owner approvals, not only owner-group roles |
| `RC-003` Implementation mode approved | Blocked | Product, SME, and source-owner decision per row |
| `RC-004` Source mappings and rating rules approved | Blocked | Field/filter/window/key/lineage contracts and SME examples |
| `RC-005` Manual evidence workflow approved | Blocked | System of record, access, approval, correction, and retention |
| `RC-010` MVP backend/reporting validated | Review | Automated contract tests and manual browser checks pass; product/UX acceptance remains |

No gate in this document approves a production scoring denominator.

## Evaluation gaps

| Gap ID | Missing evidence | Release impact |
| --- | --- | --- |
| `EVAL-GAP-001` | Stable catalog and SME-approved expected ratings | Blocks scoring validation |
| `EVAL-GAP-002` | Production source samples and source-owner reconciliation | Blocks factual/source correctness claims |
| `EVAL-GAP-003` | Identity, RBAC, site/rollup isolation, and unauthorized access tests | Blocks pilot |
| `EVAL-GAP-004` | Human screen-reader review, full keyboard-only workflow, zoom/reflow, formal color-contrast evidence, and supported-browser matrix | Blocks UX/accessibility approval |
| `EVAL-GAP-005` | Load, concurrency, soak, restart, backup, recovery, and observability tests | Blocks operational readiness |
| `EVAL-GAP-006` | Persistent audit integrity, retention, redaction, and access review | Blocks compliance/audit readiness |
| `EVAL-GAP-007` | Automated Confluence publish/rollback validation and long-term drift detection | Does not block this verified documentation refresh; required before recurring automated publishing |
| `EVAL-GAP-008` | Privacy, Security, Legal, Data Governance, HR Operations, Architecture, and Change approvals | Blocks pilot/production |

## Required pre-pilot evaluation plan

1. Freeze an approved stable catalog and denominator decision; version both.
2. Build representative gold cases for every active item, including threshold boundaries, missing, stale, invalid, blocked, manual, conflicting, and unauthorized inputs.
3. Reconcile every deterministic result to source-owner and SME-approved examples.
4. Test role/site/rollup isolation before retrieval, computation, display, export, narrative, trace, and publishing.
5. Extend the implemented machine-readable contract tests to approved production catalog, source, authorization, result, report, approval, and audit schemas.
6. Extend the Edge review suite with human assistive-technology testing and the approved browser/device matrix.
7. Run failure, retry, timeout, restart, capacity, and rollback exercises.
8. If supervised AI narrative is proposed, separately test grounding, citation, unsupported claims, privacy, latency, cost, consistency, and human acceptance/edit rates.

## Release decision rubric

| Stage | Decision |
| --- | --- |
| Local MVP review | **Ready:** automated tests and syntax checks pass; fixture boundaries are visible. |
| Alpha | **Not ready:** `RC-001` through `RC-005` are blocked and human/formal accessibility evidence is incomplete. |
| Pilot/Beta | **Not ready:** sources, identity, governance, scoring, persistent audit, support, and rollback are not implemented or approved. |
| Production | **Not ready:** no production denominator, production data evidence, deployment, approvals, or operational SLO evidence exists. |

## Testable evaluation requirements

| Requirement ID | Requirement and acceptance test |
| --- | --- |
| `EVAL-REQ-001` | Every code or fixture change shall pass `npm test` and `npm run check`; the recorded evidence count shall match the current suite. |
| `EVAL-REQ-002` | Network and HOU1 reference outputs shall reconcile exactly to generated item rows; any intentional fixture change shall update code, tests, and evidence together. |
| `EVAL-REQ-003` | The oldest available period shall return `previousPeriod=null`, `change=null`, and `illustrativeChange=null` without an API or builder error. |
| `EVAL-REQ-004` | A report filtered by both region and site group shall name both filters in `scopeLabel`; a site filter shall take precedence. |
| `EVAL-REQ-005` | Release evidence shall keep MVP review, alpha, pilot, and production decisions separate and shall fail closed while `RC-001` through `RC-005` remain blocked. |
| `EVAL-REQ-006` | Confluence sync evidence shall record page ID, before/after version, source revision, verification, and rollback target; GitHub shall remain canonical. |
| `EVAL-REQ-007` | Production evaluation shall include approved source truth, access isolation, privacy, accessibility, reliability, persistent audit, and rollback evidence before any readiness claim. |
| `EVAL-REQ-008` | The checked-in browser suite shall pass all six views, bootstrap/view recovery, Back/Forward state, reporting/CSV reconciliation, modal/refresh focus, local announcements, mobile overflow, and Axe serious/critical checks before MVP review handoff. |

## Assumptions

| ID | Type | Statement / response |
| --- | --- | --- |
| `EVAL-A-001` | Assumption | The test run used the same working tree submitted for review; re-run after any code/data change. |
| `EVAL-A-002` | Assumption | Confluence page bodies and versions recorded in this evidence match the post-publish verification performed on 2026-08-10. |

## Risks

| ID | Type | Statement / response |
| --- | --- | --- |
| `EVAL-R-001` | Risk | Passing fixture tests may be mistaken for production correctness. Keep release conclusion and blocked gates attached to evidence. |
| `EVAL-R-002` | Risk | Exact fixture metrics can be circulated as real results. Label them regression fixtures in every test/report artifact. |
| `EVAL-R-003` | Risk | Automated browser and Axe checks miss assistive-technology or supported-browser defects. Complete human accessibility and browser-matrix review before alpha. |

## Cross-references

| Document ID | Repository page | Confluence page |
| --- | --- | --- |
| `HRFC-MVP-DATA-001` | `Data-Map-and-Classification.md` | [5404164396](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5404164396) |
| `HRFC-MVP-TECH-001` | `Technical-Design-and-Scoring-Contract.md` | [5404327956](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5404327956) |
| `HRFC-MVP-UX-001` | `UX-and-Reporting-Specification.md` | [5403968355](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5403968355) |
| `HRFC-MVP-OPS-001` | `Runbook-and-Rollout.md` | [5404262565](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5404262565) |
