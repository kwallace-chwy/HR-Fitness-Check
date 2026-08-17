# Runbook and Rollout

## Document metadata

| Field | Value |
| --- | --- |
| Document ID | `HRFC-MVP-OPS-001` |
| Version | `0.5` |
| Status | Local MVP review runbook; production rollout prohibited |
| Last updated | 2026-08-17 |
| Supported stage | Local prototype / product review |
| Default endpoint | `http://127.0.0.1:8800` |
| Operational owner | Engineering / Product, formal owner TBD |
| Data posture | Synthetic fixture only; read-only |

> **Stop condition:** Do not connect production sources, replace fixture data with HR records, approve a denominator, publish results, or expose the server beyond an approved local review environment using this runbook.

## Prerequisites

- Windows PowerShell or equivalent shell.
- Node.js 22 or newer on `PATH`; use a currently supported LTS line for a shared review environment.
- Repository working tree available locally.
- Port 8800 available, or another localhost port selected.
- No dependency installation is required to run the server. Reproducing browser/accessibility evidence requires the locked development dependencies and Microsoft Edge or an installed Playwright Chromium browser.

## Preflight and validation

From the repository root:

```powershell
Set-Location .\mvp
node --version
npm ci
npm run test:e2e:install
npm run test:all
```

Expected evidence is a successful syntax check, 46 passing Node contract tests across reporting, API/UI static contracts, audit scope/capability, scope matrix, and fixture validation, plus 6 passing Edge Playwright/Axe tests. Stop the review if any test fails or if the catalog contract is not 33 rows with `approval_pending`. Browser launch may require the workstation's normal application-execution permission.

## Start and stop

Start on the default loopback endpoint:

```powershell
Set-Location .\mvp
npm start
```

If port 8800 is occupied:

```powershell
$env:PORT = '8801'
npm start
```

Keep `HOST=127.0.0.1` for review. Stop with `Ctrl+C`. Restarting clears the in-memory audit log.

## Smoke checks

In a second PowerShell window:

```powershell
Invoke-RestMethod http://127.0.0.1:8800/api/health
Invoke-RestMethod http://127.0.0.1:8800/api/v1/meta
Invoke-RestMethod http://127.0.0.1:8800/api/v1/contracts
Invoke-RestMethod 'http://127.0.0.1:8800/api/v1/summary?period=2026%20Q3&region=All&group=All'
```

Expected health fields are `status=ok`, `version=0.1.0`, and `dataStatus=fixture`. Expected metadata includes `apiVersion=v1`, `contractVersion=hrfc.api.v1`, `catalogVersion=working-2026-07-29`, `taskRows=33`, and `catalogApprovalStatus=approval_pending`. Contract metadata must distinguish `dataAsOf=2026-08-06T20:00:00Z` from `catalogAsOf=2026-07-29T16:32:27Z`.

## Reviewer walkthrough

1. Open the local endpoint and confirm the Validation data banner and approval-pending catalog badge.
2. Change quarter, rollup, and site-group filters; navigate between views; then use browser Back/Forward and confirm the prior view and selected scope return.
3. Review Overview metric numerators/denominators, exception separation, non-comparable trend, and release gates.
4. Search/filter the Work queue and inspect at least one automated, manual/hybrid, and governance-first item.
5. Open Site review and confirm alphabetical ordering, item-level drilldown, and no-rating exceptions distinct from red.
6. Review Data readiness source states and the historical stale 49-item / superseded 38/37 / working 33-row reconciliation conflict.
7. In Reports, compare displayed scope to CSV, copy the summary, and inspect print preview. Do not distribute it as real performance data.
8. Refresh Audit and verify route, scope, status, latency, and request ID entries; then explain that the log is memory-only.
9. Record product/UX findings separately from catalog, source, or governance decisions.

## Operational indicators

| Indicator | Implemented signal | Review response |
| --- | --- | --- |
| Server availability | `/api/health` returns 200 and fixture status | Restart local process; re-run checks |
| Contract integrity | `npm test` (46 tests) | Stop review on failure; inspect the failing test before changing expected values |
| Browser/accessibility regression | `npm run test:e2e` (6 tests) | Stop review on failure; retain the failing route, viewport, and Axe result |
| Syntax integrity | `npm run check` | Stop review; correct syntax before restart |
| Request behavior | Audit view / `/api/v1/audit-events` | Correlate by request ID; remember events reset on restart |
| Catalog posture | Header/truth banner/meta response | Stop if status is not approval-pending or if fixture labeling disappears |
| Scope behavior | Filter context and request audit | Check valid filter intersection; empty combinations are possible |

There is no implemented alerting, SLO monitor, durable log, paging, backup, or disaster recovery.

## Troubleshooting

| Symptom | Likely cause | Response |
| --- | --- | --- |
| Port already in use | Another local process owns 8800 | Set another `PORT`; keep loopback host |
| Page shows Unable to load | Server stopped, bootstrap/view API error, or invalid deep-link state | Use Try again; bootstrap failures re-request metadata/filters, while initialized-view failures re-request the view; verify health if retry fails |
| No results in scope | Valid filters have an empty intersection | Select a compatible region/group combination |
| Item results return `site_required` | Site omitted | Open from Site review or add a valid `site` query parameter |
| Audit appears empty | Server restarted or no earlier request was returned | Exercise another API/view, then refresh Audit |
| Server fails during fixture load | Startup fixture validation found published-field, rendered-dimension, safety-status, provenance, quarter-order, ID, reference, enum, count, distribution, or status drift | Correct the fixture and expected contract together; do not bypass validation |
| Copy summary fails | Browser clipboard permission unavailable | Use the displayed report; do not add an external clipboard service |
| Trend appears positive/negative | Fixture delta is illustrative | Retain non-comparability warning; do not interpret business movement |

## Incident responses for the MVP

| Incident ID | Trigger | Immediate action | Exit condition |
| --- | --- | --- | --- |
| `INC-001` | Fixture output is presented as real HR performance | Stop distribution, identify recipients, correct the record, retain incident evidence | All copies corrected/withdrawn and product owner notified |
| `INC-002` | Metric/CSV/item reconciliation fails | Stop review, run tests, isolate code/data drift | Tests pass and independent reconciliation is recorded |
| `INC-003` | Fixture/approval banner or caveat is absent | Stop report/export use | Boundary restored and browser review passes |
| `INC-004` | Live Confluence is claimed current without verification | Mark sync status unknown/stale and halt update claim | Page version/body verified against approved GitHub source |
| `INC-005` | Production or associate-level data is introduced | Stop server, restrict access, notify Security/Privacy/Data Governance under approved process | Data removed from MVP and incident owner clears restart |
| `INC-006` | Server is exposed beyond loopback | Stop server and network exposure | Bound to approved local environment and access reviewed |
| `INC-007` | Provisional monthly/on-demand output is presented as a certified Quarterly Fitness Check | Stop distribution and certification claims; preserve the run/report IDs | Recipients corrected and authority labels/run controls independently verified |
| `INC-008` | Conversational context changes or appears to change a deterministic score, denominator, source, rule, or certification | Disable context/recommendation capability, preserve trace, notify Product/Data/Governance/Security as applicable | Root cause fixed; affected reports corrected/recast under approval; regression cases pass |
| `INC-009` | Expired, withdrawn, superseded, unauthorized, or over-sensitive context appears in a report/model prompt | Disable retrieval path, restrict output, preserve redacted evidence, initiate privacy/access response | Context excluded/corrected, impacted outputs assessed, access and regression tests pass |

## Confluence documentation update procedure

The HR Fitness Check PRD is Confluence page `5006537577`. Its pre-update baseline was live version 17 on 2026-08-11. Do not rely on a version recorded in this runbook: GitHub remains canonical, and the live page version, body, restrictions, and editor state must be re-fetched immediately before every write.

1. Re-run tests and confirm the five `docs/mvp` pages share version, date, 33-row truth, approval status, and cross-references.
2. Re-open the live Confluence page and record page ID, current version, title, published body, editor-draft state, audience, and restrictions.
3. Compare the live page with the approved GitHub page body. Preserve any required Confluence structure while replacing any drifted facts.
4. Obtain product-owner approval for the exact preview and confirm that no production denominator or readiness claim is introduced.
5. Publish through an approved supervised workflow only; the MVP contains no publishing action.
6. Re-read the published page and verify title, metadata, 33-row working status, synthetic/read-only boundary, source-of-truth statement, and cross-page references.
7. Record old/new Confluence versions, approver, timestamp, verification result, and rollback target in the designated tracker/audit record.
8. If verification fails, restore the prior page version and keep GitHub marked canonical while correcting the preview.

Do not publish the synthetic metric examples as an assessment result. Do not overwrite an unpublished editor draft until its owner and intended structure are confirmed.

## Rollout stages

| Stage | Scope | Entry criteria | Current decision |
| --- | --- | --- | --- |
| MVP review | Localhost, synthetic data, read-only workflow | Automated tests pass; boundaries visible; docs available | Ready for user review |
| Alpha | Controlled users, approved read-only sources and identity | `RC-001` through `RC-005` closed; browser/accessibility, privacy, security, source, scoring, audit, support, and rollback evidence pass | Blocked |
| Pilot/Beta | Limited business workflow and supervised actions if separately approved | Alpha evidence plus operational metrics, support staffing, source SLAs, human approval, and rollback drills | Blocked |
| Production | Approved scope, denominator, deployment, operations, governance, and change control | All release criteria and organizational approvals recorded | Blocked |

## Future production operating rhythm

These procedures are target-state gates, not instructions for the current local MVP.

### Monthly progress run

1. Create an immutable `monthly_progress` assessment run with `provisional` authority, site/rollup scope, period, evidence cutoff, and frozen catalog/source/rule versions.
2. Validate source freshness, required monthly windows/aggregation, eligibility, missing/manual states, and evidence coverage.
3. Calculate deterministic results; never substitute context for missing evidence or a failed score.
4. Retrieve only authorized, in-scope, unexpired contextual assertions and open disputes/source-change proposals. Show attribution and verification state.
5. Generate a provisional report with system findings, user context, interpretation, recommendations, open actions, and risks to the next Quarterly Fitness Check kept separate.
6. Complete reviewer checks and publish only through the approved report workflow. The output remains provisional.

### Quarterly Fitness Check and certification

1. Create an immutable `quarterly_fitness_check` run in `pending_certification` with the approved quarterly evidence contract for every active item.
2. Freeze source snapshots, execute approved quarterly construction, collect required manual/physical evidence, and reconcile disputes/exceptions.
3. Prohibit averaging monthly colors. Use monthly runs only as operational context or approved numeric inputs explicitly permitted by the item contract.
4. Complete certification checklist, reviewer sign-off, audit envelope, and report verification before setting the run/report to `certified`.
5. Link the certified result as the formal baseline for later comparable measurement. Any approved correction creates a historical recast; it never edits the prior certified run in place.

### Annual summary

1. Resolve the authorized year/scope and retrieve the applicable certified Quarterly Fitness Check run/report IDs.
2. Verify certification and recast status and record any missing, uncertified, or non-comparable quarter.
3. Build the derived annual report from the certified quarterly results, actions, outcomes, and caveats. Do not create a fifth assessment/scoring run or calculate an annual rating.
4. Review and publish only through the approved reporting workflow with the supporting quarterly references visible.

### Context, dispute, and learning operations

- A durable context record requires classification, minimization, authorization, exact save preview, explicit confirmation, receipt, purpose/scope/audience, effective dates, verification, expiry, privacy/retention, and correction/retraction controls.
- Evidence disputes and source-change proposals enter owner work queues and leave frozen evidence/approved mappings unchanged until validation, reconciliation, evaluation, and approval complete.
- Expiry and access sweeps remove ineligible context from retrieval. Corrections supersede; withdrawals preserve audit lineage while preventing future use.
- Feedback improvement is offline: classify/redact, review, create a change proposal, run regression evals, approve, version and release, monitor, and roll back if needed. No runtime self-training or silent configuration update is permitted.

## Production promotion checklist

- [ ] Stable catalog IDs, final disposition, effective version, and legacy crosswalk approved.
- [ ] Denominator, missing-value policy, rating rules, and historical recast approved.
- [ ] Named/current owner and implementation mode approved for every active row.
- [ ] Exact source fields, joins, filters, windows, freshness, owner, and reconciliation approved.
- [ ] Identity, role/site/rollup authorization, privacy, retention, and redaction tested.
- [ ] Manual evidence system of record, approval, correction, and audit tested.
- [ ] Persistent result, lineage, report, approval, and audit stores implemented.
- [ ] Browser, accessibility, schema, security, reliability, capacity, recovery, and rollback tests pass.
- [ ] Legal, Data Governance, Security, HR Operations, Architecture, Change, source-owner, and product approvals recorded.
- [ ] Confluence publishing preview/update/verification/rollback is approved and proven.
- [ ] Grounded recommendation review passes all four dispositions with rationale, immutable source recommendation, and authorized reviewer scope.
- [ ] SharePoint action recording has an approved target/schema, action class, exact preview, explicit confirmation, idempotency, receipt, correction, rollback, and audit evidence.
- [ ] Comparable-measurement, verified-improvement, sustained-result, and association-only policies pass approved eval cases.
- [ ] Monthly, quarterly, on-demand, and recast run types have approved authority, period/window, item aggregation, certification, comparability, immutable lineage, scheduling, retry, and failure procedures.
- [ ] Quarterly construction tests prove monthly colors are never averaged; each active item has approved monthly and quarterly calculation fixtures.
- [ ] Context assertion, evidence dispute, source-change proposal, and feedback stores have approved authorization, preview/confirmation, attribution, privacy/retention, expiry, correction/retraction, access-review, audit, and incident procedures.
- [ ] Unverified chat-input tests produce zero score, denominator, source, rule, certification, prompt/model, or policy changes.
- [ ] Governed offline-learning change control and rollback drills pass before any feedback-driven production change.
- [ ] Annual-summary derivation identifies only applicable certified Quarterly Fitness Checks, exposes missing/uncertified/recast/non-comparable quarters, and creates no new run, annual rating, or certification.
- [ ] The 540-hour and $33,123 planning estimates have an approved baseline, pilot method, and reporting treatment before validated or realized value is claimed.

## Rollback posture

For the local MVP, rollback means stopping the process and returning reviewers to the last tested repository revision through the team's governed Git workflow. Preserve failing output and test evidence before changing code. Do not use destructive Git commands or delete evidence.

Production rollback is not implemented. A future design must independently roll back capability flags, source active versions, catalog/rule versions, report/prompt/model packages, tool/action classes, deployment, and Confluence page versions.

## Testable operations requirements

| Requirement ID | Requirement and acceptance test |
| --- | --- |
| `OPS-REQ-001` | A reviewer shall be able to start the app on loopback with Node.js 22+ and no production dependency download; full browser evidence uses locked development dependencies. |
| `OPS-REQ-002` | Preflight shall fail the review on any syntax/test failure or catalog truth drift. |
| `OPS-REQ-003` | Restart shall clear the ephemeral audit log and shall not alter fixture files. |
| `OPS-REQ-004` | Confluence shall be updated only from an approved GitHub-derived preview with before/after version and rollback evidence. |
| `OPS-REQ-005` | Any production-data introduction or non-loopback exposure shall stop the MVP review and trigger approved Security/Privacy handling. |
| `OPS-REQ-006` | Promotion beyond MVP review shall remain blocked until every stage-specific gate is supported by recorded evidence. |
| `OPS-REQ-007` | Recommendation, SharePoint action, and outcome-link writes shall remain disabled until their individual capability, action-class, target, confirmation, audit, correction, rollback, and eval gates pass. |
| `OPS-REQ-008` | Production scheduling shall keep monthly progress, quarterly certification, on-demand preview, and historical recast runs separate, immutable, idempotent, observable, and recoverable. |
| `OPS-REQ-009` | A quarterly run shall fail certification when required evidence/manual review/reconciliation/sign-off is incomplete or when an item lacks an approved quarterly construction contract. |
| `OPS-REQ-010` | Context retrieval shall run expiry, withdrawal, supersession, authorization, purpose, audience, and privacy checks before every prompt/report assembly. |
| `OPS-REQ-011` | Evidence disputes and source-change proposals shall have staffed ownership, service targets, escalation, resolution, recast, and communication procedures before chat capture is enabled. |
| `OPS-REQ-012` | Feedback-driven releases shall require offline eval, approval, version, rollback, and post-release monitoring evidence; runtime automatic learning remains prohibited. |
| `OPS-REQ-013` | Annual-summary generation shall be a read/derive/report workflow over certified Quarterly Fitness Checks, not an assessment scheduler or scoring path, and shall preserve exact source-quarter lineage. |

## Assumptions

| ID | Type | Statement / response |
| --- | --- | --- |
| `OPS-A-001` | Assumption | Review occurs on an approved Chewy-managed workstation with local repository access. |
| `OPS-A-002` | Assumption | Product review does not require persistence across server restarts. |

## Risks

| ID | Type | Statement / response |
| --- | --- | --- |
| `OPS-R-001` | Risk | A local prototype is treated as a deployed service. Use stage labels and loopback-only instructions. |
| `OPS-R-002` | Risk | Confluence is updated from a stale or unapproved editor draft. Re-verify current page/editor state and capture exact preview approval. |
| `OPS-R-003` | Risk | Rollback is improvised after a future source/action integration. Require tested component-level rollback before alpha/pilot. |
| `OPS-R-004` | Risk | Monthly cadence increases stale-source, partial-window, and report-volume failure modes. Use run-specific preflight, authority labels, freshness checks, and idempotent scheduling. |
| `OPS-R-005` | Risk | Persistent context creates privacy, staleness, and trust failures. Apply minimum-necessary storage, expiry/access sweeps, correction/withdrawal UX, and incident response. |

## Cross-references

| Document ID | Repository page | Confluence page |
| --- | --- | --- |
| `HRFC-MVP-DATA-001` | `Data-Map-and-Classification.md` | [5404164396](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5404164396) |
| `HRFC-MVP-TECH-001` | `Technical-Design-and-Scoring-Contract.md` | [5404327956](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5404327956) |
| `HRFC-MVP-UX-001` | `UX-and-Reporting-Specification.md` | [5403968355](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5403968355) |
| `HRFC-MVP-EVAL-001` | `Evaluation-and-Release-Evidence.md` | [5403968375](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5403968375) |
