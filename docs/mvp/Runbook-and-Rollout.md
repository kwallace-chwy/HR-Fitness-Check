# Runbook and Rollout

## Document metadata

| Field | Value |
| --- | --- |
| Document ID | `HRFC-MVP-OPS-001` |
| Version | `0.3` |
| Status | Local MVP review runbook; production rollout prohibited |
| Last updated | 2026-08-10 |
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

## Confluence documentation update procedure

The HR Fitness Check PRD at page ID `5006537577` was refreshed from the reconciled repository PRD to version 15 and re-verified on 2026-08-10. GitHub remains canonical. Re-verify the current page version and editor state immediately before any later write.

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

## Cross-references

| Document ID | Repository page | Confluence page |
| --- | --- | --- |
| `HRFC-MVP-DATA-001` | `Data-Map-and-Classification.md` | [5404164396](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5404164396) |
| `HRFC-MVP-TECH-001` | `Technical-Design-and-Scoring-Contract.md` | [5404327956](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5404327956) |
| `HRFC-MVP-UX-001` | `UX-and-Reporting-Specification.md` | [5403968355](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5403968355) |
| `HRFC-MVP-EVAL-001` | `Evaluation-and-Release-Evidence.md` | [5403968375](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5403968375) |
