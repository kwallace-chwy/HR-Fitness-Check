# Data Map and Classification

## Document metadata

| Field | Value |
| --- | --- |
| Document ID | `HRFC-MVP-DATA-001` |
| Version | `0.2` |
| Status | MVP review draft; not production-ready |
| Last updated | 2026-08-10 |
| Evidence cutoff | Repository and connected-source verification on 2026-08-10; working catalog as of 2026-07-29 16:32:27 UTC; synthetic data snapshot as of 2026-08-06 20:00:00 UTC |
| Accountable owner | ORBIT Product, approval pending |
| Intended audience | Product, HR Operations, Engineering, Data Governance, Security, Evaluation |
| Source of truth | GitHub repository; Confluence is a downstream publishing copy |

> **Decision boundary:** The MVP uses synthetic product-validation data only. The 33-row July 29 working catalog is approval-pending and is not an approved production scoring denominator.

## Truth hierarchy

| Priority | Evidence | Current interpretation |
| --- | --- | --- |
| 1 | `mvp/data/mvp-data.json`, catalog version `working-2026-07-29` | Latest working evidence: 33 scope-intent rows, owner-group roles populated, 0 approved source mappings, 0 approved implementation modes, 33 blank source-table fields, 33 blank reviewer fields, and 33 blank result fields. |
| 2 | Historical June 30 workbook snapshot, retained in repository reconciliation notes | Superseded discovery snapshot: 38 task rows, 37 scope-intent rows, and 1 removal. Retain for reconciliation history; do not use as the current working denominator. |
| 3 | Live Confluence PRD, page 5006537577 | Downstream copy at version 15 was re-verified on 2026-08-10 against the reconciled repository PRD. It must not override GitHub or the July 29 working evidence. |

Any conflict must be shown, not silently resolved. A product/process-owner decision is required before a stable V1 catalog or denominator can be declared.

## Implemented MVP data flow

```text
mvp/data/mvp-data.json
        |
        v
Node.js deterministic fixture generation and aggregation
        |
        +--> read-only JSON/CSV APIs
        +--> browser cockpit and draft report
        +--> in-memory request audit (maximum 100 events)
```

There is no production connector, source query, model call, durable database, approval action, Confluence write, or HR system write in the implemented MVP.

## Data assets

| Asset ID | Implemented asset | Grain and key fields | Storage / retention | Classification posture |
| --- | --- | --- | --- | --- |
| `DA-001` | Working catalog fixture | One row per `demoItemId`; task, category, owner group, assumed modes, accountability, source lead | JSON in repository | Internal, synthetic metadata; demo IDs are not approved stable IDs |
| `DA-002` | Site-period expected fixture distribution | One row per synthetic site and period with exact expected green/yellow/red/missing counts | JSON in repository | Internal, synthetic; must not be treated as site performance |
| `DA-003` | Generated item result | Synthetic site x period x catalog item; rating, result status, evidence status, source status, rule version | Generated per request; not persisted | Internal, synthetic validation data |
| `DA-004` | Source discovery registry | One row per source lead; status, coverage, owner, freshness, next action, evidence reference | JSON in repository | Internal discovery metadata; not an activated-source registry |
| `DA-005` | Release-gate fixture | Gate ID, name, status, owner role | JSON in repository | Internal planning metadata |
| `DA-006` | Request audit event | Request ID, timestamp, fixed fixture user scope, capability, route, method, status, filters, catalog, latency, decision | Process memory only; newest 100 retained, API returns newest 50, reset on restart | Internal operational metadata; not a compliant production audit record |
| `DA-007` | Browser state | View, period, region, group in URL query parameters | Browser history only | Internal; contains no associate record in this MVP |

`sites[].results` values are exact post-policy expected distributions. The generator assigns source-blocked and governance-first rows to unavailable results before allocating rated rows, then validates that every generated site-period rollup exactly matches the stored distribution. Any mismatch is a fixture-integrity failure; the stored distribution and API are not competing truths.

## Working catalog profile

| Dimension | Implemented fixture count | Approval meaning |
| --- | ---: | --- |
| Rows | 33 | Latest working evidence only |
| Owner-group roles | HRA 18; HRBP 6; HRG 1; HRM 8 | Role labels are populated; named/current-owner approval remains blocked |
| Assumed implementation mode | Automatable 20; hybrid 6; manual 5; derived 1; governance-first 1 | All are product-validation assumptions; approved count is 0 |
| Assumed evidence mode | Virtual 22; mixed 6; physical 5 | Product-validation assumption |
| Approved source mappings | 0 | Production scoring is blocked |
| Approved denominator | 0 | The 33 rows must not be called the approved V1 denominator |
| Threshold gaps | 1 | At least one scoring threshold remains incomplete |

## Source-lead map

Catalog-row counts describe fixture assumptions, not approved mappings.

| Source ID | Source family | Discovery status | Assumed catalog rows | Production handling decision still required |
| --- | --- | --- | ---: | --- |
| `src.ukg` | UKG Pro / Snowflake | Located | 10 | Field mappings, site key, windows, freshness, access, and SME rating examples |
| `src.hrdm` | HR DataMart | Located | 4 | Roster grain, keys, snapshots, classification, and access |
| `src.workday` | Workday to HRDM | Candidate | 2 | Locate governed beneficiary and emergency-contact fields or reports |
| `src.snow` | ServiceNow / SNOW | Blocked | 2 | Confirm production replication location; prohibit case narrative exposure |
| `src.tableau` | Tableau | Candidate | 3 | Map underlying governed tables; use dashboards for reconciliation by default |
| `src.echo` | ECHO / CAT | Located | 5 | Map site, period, completion, score, and dwell fields |
| `src.manual` | Manual evidence workflow | Blocked | 6 | Approve evidence home, fields, approver, corrections, and retention |
| `src.investigations` | Investigations | Governance review | 1 | Legal, privacy, source-owner, and aggregate-only approval |
| `src.fc-analytics` | FC HR Analytics | Located | 0 direct | Confirm repository access and underlying SQL before use |
| `src.sharepoint` | SharePoint / OperationsHR | Located | 0 direct | Separate authoritative evidence from discovery artifacts |

## Canonical MVP result contract

The implemented result grain is synthetic `siteId x period x demoItemId`. Every row carries `catalogVersion`, owner/category fields, assumed implementation/evidence/accountability modes, `rating`, `resultStatus`, `evidenceStatus`, source metadata, `sourceSnapshotAt`, `ruleVersion`, and a caveat. Catalog currency (`catalogAsOf`) and synthetic result currency (`dataAsOf` / `sourceSnapshotAt`) are separate provenance concepts and must not be substituted for one another.

`rating` and `resultStatus` are independent:

| Result status | Rating rule in the fixture | Meaning |
| --- | --- | --- |
| `scored` | `green`, `yellow`, or `red` | Synthetic source-fixture result |
| `manual_input` | `green`, `yellow`, or `red` | Synthetic accepted manual/hybrid input |
| `manual_required` | `null` | Manual/hybrid evidence is absent or source is blocked |
| `missing_source` | `null` | Assumed automated evidence is absent |
| `unmapped` | `null` | Governance-first or blocked automated source |

The MVP rule version is `demo-policy-v1-unapproved`. No value emitted under that rule is a production fact.

## Classification and handling rules

| Data class | MVP behavior | Required production behavior |
| --- | --- | --- |
| Synthetic site/item data | May be displayed and exported with fixture labels | Keep isolated from production tables and decision records |
| Catalog and source metadata | Display working status, version, blockers, and provenance | Approve stable IDs, owner, classification, fields, effective dates, and change history |
| Aggregate HR metrics | Not queried in MVP | Apply role/site/rollup authorization before retrieval and display |
| Associate-level time, schedule, benefits, contacts, badges | Not present in MVP | Treat as confidential/restricted pending governance; minimize, aggregate, and exclude from shared reports and traces |
| HR case and investigation content | Not present in MVP | Do not ingest narratives; allow aggregate metadata only if Legal, Privacy, Governance, and source owner approve |
| Manual evidence | Synthetic status only | Store approver, timestamp, evidence reference, correction history, retention, and access controls in an approved system of record |
| Audit and traces | Ephemeral request metadata only | Persist append-only records with identity, authorization, source/rule versions, redaction, retention, alerts, and access review |

## Testable data requirements

| Requirement ID | Requirement and acceptance test |
| --- | --- |
| `DATA-REQ-001` | The MVP shall return exactly 33 catalog rows, all using `demo-sw-###` IDs, while `catalogApprovalStatus=approval_pending`. A contract test must fail on count, namespace, or status drift. |
| `DATA-REQ-002` | Every generated item result shall preserve `rating` separately from `resultStatus`. A test must prove all blocked/governance rows have `rating=null` and missing/manual/unmapped states never become red. |
| `DATA-REQ-003` | Site rollups shall reconcile exactly to item results for the same filters. Tests shall compare green, yellow, red, missing, rated, and eligible counts. |
| `DATA-REQ-004` | Every metric shall expose numerator, denominator, definition version, as-of time, and comparability status. Null denominator shall produce `value=null`. |
| `DATA-REQ-005` | All user-visible site/item outputs and exports shall carry fixture/catalog provenance sufficient to prevent production interpretation. |
| `DATA-REQ-006` | The MVP shall reject non-GET/HEAD methods and shall make no external source, model, approval, publishing, or system-write call. |
| `DATA-REQ-007` | Production activation of any source shall fail closed until owner, steward, classification, audience, workflow, freshness, retention, redaction, citation, field mapping, approval, and access tests are complete. |
| `DATA-REQ-008` | Associate-level, case-level, investigation-narrative, benefits, contact, badge, and raw time data shall not appear in shared UI, report, CSV, model context, trace, or Confluence output. |

## Assumptions

| Assumption ID | Assumption | Validation needed |
| --- | --- | --- |
| `DATA-A-001` | July 29 is the newest available working matrix evidence. | Product owner confirms source version and workbook lineage. |
| `DATA-A-002` | The 33 role assignments express working accountability intent. | HR Operations approves named/current owners. |
| `DATA-A-003` | Source-family leads are directionally useful for discovery. | Source owners approve exact objects, fields, filters, keys, and freshness. |
| `DATA-A-004` | Quarterly site-level aggregation is the intended reporting grain. | Product, Privacy, and HR Operations approve audience and minimum aggregation. |
| `DATA-A-005` | The reviewer access list is not yet confirmed. | Resolve open Confluence comment 5217812622 with an approved role/user list and test pre-retrieval scope enforcement before alpha. |

## Risks

| Risk ID | Risk | Response |
| --- | --- | --- |
| `DATA-R-001` | The 33 rows are mistaken for an approved denominator. | Keep `approval_pending`, fixture banners, and release gates visible; prohibit baseline recast. |
| `DATA-R-002` | Demo IDs become accidental production join keys. | Replace them only through an approved stable-ID catalog and legacy crosswalk. |
| `DATA-R-003` | Located source leads are mistaken for activated mappings. | Preserve source status and show approved mapping count as 0. |
| `DATA-R-004` | Synthetic site codes or percentages are used in an HR decision. | Label every view/export as synthetic and exclude outputs from production decision records. |
| `DATA-R-005` | Future detailed HR data leaks through reports, traces, or Confluence. | Enforce pre-retrieval authorization, aggregation, redaction, output validation, and audit controls. |

## Cross-references

| Document ID | Repository page | Confluence page |
| --- | --- | --- |
| `HRFC-MVP-TECH-001` | `Technical-Design-and-Scoring-Contract.md` | [5404327956](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5404327956) |
| `HRFC-MVP-UX-001` | `UX-and-Reporting-Specification.md` | [5403968355](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5403968355) |
| `HRFC-MVP-EVAL-001` | `Evaluation-and-Release-Evidence.md` | [5403968375](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5403968375) |
| `HRFC-MVP-OPS-001` | `Runbook-and-Rollout.md` | [5404262565](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5404262565) |
