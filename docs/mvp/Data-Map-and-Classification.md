# Data Map and Classification

## Document metadata

| Field | Value |
| --- | --- |
| Document ID | `HRFC-MVP-DATA-001` |
| Version | `0.8` |
| Status | MVP review draft; not production-ready |
| Last updated | 2026-08-17 |
| Evidence cutoff | Implemented-MVP and connected-source verification through 2026-08-17; exact original SharePoint workbook and governed design sheets version-verified at version `34.0`; synthetic data snapshot as of 2026-08-06 20:00:00 UTC |
| Accountable owner | ORBIT Product, approval pending |
| Intended audience | Product, HR Operations, Engineering, Data Governance, Security, Evaluation |
| Source of truth | GitHub repository; Confluence is a downstream publishing copy |

> **Decision boundary:** The MVP uses synthetic product-validation data only. The 33-row working catalog is approval-pending and is not an approved production scoring denominator. The source-integrated Column G mapping is published in the exact original workbook, but it remains discovery evidence rather than an activated connector or approved production map.

## Truth hierarchy

| Priority | Evidence | Current interpretation |
| --- | --- | --- |
| 1 | `mvp/data/mvp-data.json`, catalog version `working-2026-07-29`, derived from the July 29 SharePoint baseline | Implemented synthetic fixture evidence: 33 scope-intent rows, owner-group roles populated, 0 approved source mappings, and 0 approved implementation modes. Its intentionally frozen source-readiness snapshot predates the current 2026-08-17 workbook publication and must not override the current workbook. |
| 2 | Exact original SharePoint workbook verified 2026-08-17 | Item `01LYSC3QO2BT5B2GJIV5C3ZACT2RWFSRLV`, filename `ORBIT - HR Fitness Check Matrix.xlsx`, sourcedoc `{1DFA0CDA-2819-45AF-BC80-53D46C594575}`, version `34.0`, modified `2026-08-17T16:16:20Z`, and 37,518 bytes. `G2:G34` is 33/33 exact and nonblank: 21 candidate, including 2 external governed-source candidates; 5 blocked; 5 manual/hybrid; 1 validated-object/rule-pending; and 1 derived. `Measure Contract`, `Cadence & Context`, and `Product Readiness` sheets were added with 19 gates; `quarterly_fitness_check` and `annual_summary` are present and legacy `quarterly_audit` is absent. Fifteen candidates depend on sandbox objects; 0 mappings or gates are production-approved. |
| 3 | Seven retained Snowflake query IDs plus the no-ID HRDM deep output listed under Source-lead map | Confirms accessible candidate objects and columns, the HRDM ServiceNow zero-match result, and a deep-gap search. Queryability is discovery evidence, not production mapping approval. |
| 4 | Historical July 29 SharePoint workbook state | Superseded publication checkpoint retained for provenance only; it must not be treated as the current workbook state. |
| 5 | Historical June 30 workbook snapshot, retained in repository reconciliation notes | Superseded discovery snapshot: 38 task rows, 37 scope-intent rows, and 1 removal. Retain for reconciliation history; do not use as the current working denominator. |
| 6 | Live Confluence PRD, page 5006537577 | Confluence is a published downstream copy. Re-fetch its current version before every write and record the actual before/after versions in the change log. Confluence does not override GitHub, workbook provenance, or approval gates. |

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
| `DA-006` | Request audit event | Request ID, timestamp, fixed fixture user scope, exact registered capability, route, method, status, route-applicable filters or `null`, catalog, latency, decision | Process memory only; newest 100 retained, API returns newest 50, reset on restart | Internal operational metadata; not a compliant production audit record |
| `DA-007` | Browser state | View, period, region, and group in URL query parameters; view navigation uses session history while filter changes update the current entry | Browser session history only | Internal; contains no associate record in this MVP |

`sites[].results` values are exact post-policy expected distributions. The generator assigns source-blocked and governance-first rows to unavailable results before allocating rated rows, then validates that every generated site-period rollup exactly matches the stored distribution. Any mismatch is a fixture-integrity failure; the stored distribution and API are not competing truths.

## Working catalog profile

| Dimension | Implemented fixture count | Approval meaning |
| --- | ---: | --- |
| Rows | 33 | Latest working evidence only |
| Owner-group roles | HRA 18; HRBP 6; HRG 1; HRM 8 | Role labels are populated; named/current-owner approval remains blocked |
| Assumed implementation mode | Automatable 20; hybrid 6; manual 5; derived 1; governance-first 1 | All are product-validation assumptions; approved count is 0 |
| Assumed evidence mode | Virtual 22; mixed 6; physical 5 | Product-validation assumption |
| Draft Column G candidate | 21 | Discovery candidates only; 15 depend on sandbox objects and 2 depend on governed external sources |
| Draft Column G blocked | 5 | Source, definition, or governance blockers remain |
| Draft Column G manual/hybrid | 5 | Approved manual evidence workflow is still required |
| Draft Column G validated-object/rule-pending | 1 | Missing Time Stamps objects were validated; rule and production mapping remain unapproved |
| Draft Column G derived | 1 | Depends on future `fact_fitness_check_result`; not implemented |
| Approved source mappings | 0 | Production scoring is blocked |
| Approved denominator | 0 | The 33 rows must not be called the approved V1 denominator |
| Threshold gaps | 1 | At least one scoring threshold remains incomplete |
| Original-workbook source and product-contract publication | Verified | Same item `01LYSC3QO2BT5B2GJIV5C3ZACT2RWFSRLV`, version `34.0`, modified `2026-08-17T16:16:20Z`, 37,518 bytes; `G2:G34` is 33/33 exact and nonblank; three governed design sheets and 19 readiness gates are present; `quarterly_fitness_check` and `annual_summary` are present and legacy `quarterly_audit` is absent; publication does not approve them |

## Source-lead map

Catalog-row counts describe fixture assumptions, not approved mappings.

### Draft Column G disposition summary

| Draft disposition | Rows | Control interpretation |
| --- | ---: | --- |
| Candidate | 21 | Requires exact production object, field, filter, window, site key, freshness, owner, lineage, rule, and access approval; 15 currently depend on sandbox objects and 2 on governed external-source delivery contracts. |
| Blocked | 5 | Requires source, definition, or governance remediation or an approved deferral. |
| Manual/hybrid | 5 | Requires an approved evidence system of record, reviewer workflow, corrections, retention, and access. |
| Validated-object/rule-pending | 1 | Object evidence exists; deterministic rule and production mapping remain open. |
| Derived | 1 | Depends on future Fitness Check result storage; no external table or implemented calculation exists. |

### Read-only Snowflake query evidence

| Evidence query | Query ID | What it supports |
| --- | --- | --- |
| EDLDB HRFC object inventory | `01c652ca-071c-ed42-00a0-2d04d51ded47` | Candidate EDLDB and sandbox objects used in draft Column G dispositions. |
| UKG priority-column inventory | `01c652cb-071c-eb73-00a0-2d04d51eeba3` | Candidate UKG people, schedule, timecard, punch, and exception fields. |
| HRDM HRFC table inventory | `01c652cc-0420-bdd7-0066-27031a10b762` | Candidate roster and Workday objects in `D_HRDATAMART`. |
| HRDM priority-column inventory | `01c652cc-0420-b7c9-0066-27031a1059f2` | Candidate HRDM roster, Workday, LOA, and related fields. |
| People/HRFC column inventory | `01c652cf-071c-eb73-00a0-2d04d5224267` | Candidate People Analytics and HRFC-relevant columns used to refine row dispositions. |
| HRDM ServiceNow zero-match search | `01c652c8-0420-b62d-0066-27031a1068ee` | Confirms no expected ServiceNow HR case/task object matched in the searched HRDM metadata. |
| EDLDB deep gap-column search | `01c65a14-071c-f099-00a0-2d04da237b03` | Returned 3,249 metadata rows; did not reveal an overlooked production-grade object that closes the unresolved source contracts. |
| HRDM deep gap-column output | Not captured | Local 399-row output at `outputs/019ff1d5-e2d8-76b1-8f5b-ea0500b454ce/hrdm_gap_deep_columns.csv`; no producing query ID is claimed. |

These query IDs are reproducibility evidence for read-only discovery only. They do not approve sandbox promotion, connector activation, row-level field contracts, scoring rules, or production use.

### Draft source-object leads

| Source family | Exact discovery objects | Covered rows | Candidate key/date evidence | Unresolved production contract |
| --- | --- | --- | --- | --- |
| UKG people, schedule, and timecard | `EDLDB.UKG.GOLD_V_PEOPLE`; `GOLD_V_SCHEDULE_SHIFT`; `GOLD_V_TIMECARD_EXCEPTION`; `GOLD_V_TIMECARD_PUNCH`; `GOLD_V_TIMECARD_WORK_SHIFT`; `GOLD_V_TIMECARD_TOTAL`; `GOLD_V_TIMECARD_TRANSACTION` | NHO UKG side, Shift Transfers, Missing Time Stamps, Unscheduled but Working, 13h, 60h, schedule groups, temporary-schedule UKG side | Person identifiers, schedule groups/patterns, shift dates, punch/exception events, `SHIFT_TOTAL_HOURS`, and `HOURS_AMOUNT` were visible | Production ownership, location/site join, filters, date windows, exclusions, reconciliation examples, freshness, and approved rating rules |
| People Analytics sandbox | `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ROSTER_HEALTH_SNAPSHOT`; `STAND_UP_AUDITS`; `FULFILLMENT_STAND_UPS`; `NHE_SURVEYS`; `QUALITY_ONE_ON_ONE`; `FULFILLMENT_QUALITY`; `FULFILLMENT_LEW` | Roster Health, Standups, NSBW, Locker, Attendance, Quality 1:1, LEWs | Location/site and date fields plus row-specific rating, schedule-status, survey, completion, leader, and HRBP fields were visible | Production-certified targets, exact denominators, Tableau reconciliation, freshness, site keys, and source-owner approval |
| ECHO, CAT, and VOC sandbox | `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ECHO_SNAPSHOT`; `CAT_TRACKER_SNAPSHOT`; `VOC_BOARD` | Swag, CAT, Fishbowl, VOC, Roundtables, CoTM/LOP | `LOCATION`, `COMMON_DATE`/timeframe, `FISHBOWL`, `COTM`, `LOP`, CAT action/resolution, and VOC date/category fields were visible | Approved taxonomy, score calculation, identifiable-comment handling, period rules, production target, and governance |
| VET/VTO and labor sandbox | `EDLDB.FULFILLMENT_OPTIMIZATION_SANDBOX.VET_VTO_INFO_ZEUS`; `SP_SNAP_ATTENDANCE_FCST_HR_METRICS`; `RX_LABOR_PLAN_METRICS`; `EDLDB.PEOPLE_ANALYTICS_SANDBOX.V_UKG_TIME_OFF_REQUESTS` | VET, VTO, Labor Planning | VET/VTO date, FC, week, request-detail fields and labor actual/forecast/error fields were visible | No-match semantics, FC/Rx coverage, planned-versus-actual definition, site grain, production target, freshness, and owner approval |
| HRDM Workday and roster | `D_HRDATAMART.S_WORKDAY.WD_DATAMARTFEED`; `D_HRDATAMART.S_ANALYTICS.ROSTER_DAY_END` | HR Metrics reference, beneficiary and emergency-contact denominators, LOAA cohort context | Worker, location/site, hire/tenure, roster, and LOA context were visible | Target beneficiary, enrollment, emergency-contact, and ServiceNow SLA fields were not found; source-owner mapping is required |
| External governed and hybrid sources | EPA ServiceNow resolved-case export; site FLO and temporary-schedule Smartsheets; Workday beneficiary/emergency-contact reports; EthicsPoint/OpenBark; site locker workbooks; TM Experience/Signage Forms contract | SNOW, LOAA, FLO, temporary schedules, beneficiary, emergency contacts, investigations, locker, TM Experience, signage | Source artifacts expose partial service/location/date/status, workflow, or audit fields | Approve production delivery, completeness, site keys, cadence, classification, access, retention, aggregation, reconciliation, and row-specific rules; the Forms contract is not verified live |
| Manual and derived | No badge-inventory source; current TM Experience/signage evidence remains manual/hybrid; future `fact_fitness_check_result` is not implemented | Five manual/hybrid rows and one derived row | Not applicable | Approve evidence home, reviewer/correction/retention workflow, action authorization, and derived comparability rule |

| Source ID | Source family | Discovery status | Assumed catalog rows | Production handling decision still required |
| --- | --- | --- | ---: | --- |
| `src.ukg` | UKG Pro / Snowflake | Located | 10 | Field mappings, site key, windows, freshness, access, and SME rating examples |
| `src.hrdm` | HR DataMart | Located | 4 | Roster grain, keys, snapshots, classification, and access |
| `src.workday` | Workday / governed reports | Blocked | 2 | Approve report/RaaS fields, privacy treatment, aggregation, cadence, exclusions, and reconciliation |
| `src.snow` | ServiceNow / EPA resolved-case export | External governed-source candidate | 2 | Approve complete/open-case coverage, site keys, service definitions, SLA logic, access, and production delivery; prohibit case narrative exposure |
| `src.tableau` | Tableau | Candidate | 3 | Map underlying governed tables; use dashboards for reconciliation by default |
| `src.echo` | ECHO / CAT | Located | 5 | Map site, period, completion, score, and dwell fields |
| `src.manual` | Manual/hybrid evidence workflow | Blocked | 5 | Approve evidence home, fields, approver, corrections, retention, and distributed Smartsheet/site-file contracts |
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
| Assessment runs and reports | Synthetic quarterly fixture periods only | Store immutable run type, period, site scope, authority, evidence cutoff, catalog/source/rule versions, certification state, recast lineage, and report identity |
| Context assertions | Not present in MVP | Store only after exact preview and explicit confirmation; require attribution, scope, allowed/prohibited use, effective dates, verification, audience, privacy/retention, expiry, correction, withdrawal, and access controls |
| Evidence disputes and source-change proposals | Not present in MVP | Store as non-authoritative workflow records; freeze challenged evidence and approved mappings until validation, reconciliation, evaluation, and approval produce a new version/recast |
| Feedback and product-learning evidence | Not present in MVP | Classify and redact for governed offline evaluation; prohibit direct training or production prompt/model/retrieval/source/rule/policy changes |
| Audit and traces | Ephemeral request metadata only | Persist append-only records with identity, authorization, source/rule versions, redaction, retention, alerts, and access review |

## Q3 2026 Target-State Data Contracts

These contracts are planned and are not implemented in the synthetic MVP.

| Contract | Required grain and linkage | Approval boundary |
| --- | --- | --- |
| Assessment period | One calendar/business period definition with type, start/end, timezone, and parent quarter | Product and data owners approve period calendar and item-specific exceptions |
| Assessment run | One immutable execution per site/rollup, period, and run type; links catalog/source/rule versions, evidence cutoff, authority, certification, and recast lineage | Monthly and on-demand runs remain provisional; quarterly runs require certification; recasts never overwrite history |
| Fitness result | One item result per site and assessment run with evidence window, aggregation method, result status, rating, source snapshot, and rule version | Production scoring requires approved source/rule contracts; context cannot alter the calculated result |
| Report artifact | One versioned report per assessment run with result IDs, data-as-of, evidence coverage, context/dispute/action references, narrative, and review/certification state | Monthly reports are provisional; only a report linked to a certified `quarterly_fitness_check` run may be called a certified Quarterly Fitness Check |
| Annual summary | One derived report per year and authorized scope, referencing the applicable certified Quarterly Fitness Check runs/reports, actions, outcomes, and comparability caveats | Not an assessment/scoring run; cannot recalculate ratings, certify a quarter, or conceal a missing/non-comparable quarter |
| Context assertion | One attributed, scoped, time-bounded assertion with explicit confirmation, verification, purpose, audience, expiry, and correction/withdrawal lineage | May inform an approved narrative or recommendation purpose; prohibited from changing score, denominator, approved source, rule, or causal claim |
| Evidence dispute | One challenge tied to frozen source/result evidence and a validation owner/resolution | Dispute status may qualify interpretation; correction requires new evidence/version and, where applicable, a recast |
| Source-change proposal | One proposed mapping change tied to affected items/sites, current mapping, claimed effective date, owner reviews, and reconciliation evidence | Cannot activate a connector or mapping until source/governance/process approval and regression evaluation pass |
| Feedback event / product change | Classified, redacted feedback linked to a reviewed change proposal, eval set, approval, versioned release, rollback, and monitoring | No automatic model training, prompt change, source/rule change, or policy change from chat or feedback |
| Recommendation | One immutable recommendation version per site, period, and grounded result set; includes result/evidence references, caveats, and approved intervention references | Recommendation schema, audience, grounding, and retention approved |
| Recommendation decision | One authorized Regional HR disposition per reviewed recommendation version: `accepted`, `modified`, `declined`, or `deferred`, with rationale and reviewer scope | Durable decision write remains disabled until its action class and target are approved |
| Accepted action | One confirmed action per accepted or modified decision; includes action text, owner, target date, SharePoint target, confirmation record, status, and receipt | No SharePoint write without exact preview, explicit confirmation, authorization, idempotency, correction, and rollback |
| Follow-up outcome | One comparison record linking a completed action, baseline result, and next approved comparable result | Comparability, verified-improvement, and sustained-result policies approved; observed movement is not proof of causality |

Decision and outcome records may support governed evaluation. They do not authorize automatic model training or policy changes. The estimated 540 annual hours and $33,123 annual capacity value remain planning estimates until the baseline, live pilot, and reporting treatment are approved.

### Assessment-run authority and comparability

- `monthly_progress` is provisional and supports course correction. `quarterly_fitness_check` starts pending certification and becomes the formal record only after required automated/manual evidence, reconciliation, and authorized sign-off.
- `on_demand_preview` is draft month-to-date or point-in-time output. `historical_recast` is a new immutable run linked to the prior run and its reason; it never overwrites the original.
- Each item contract defines supported run types, evidence window, aggregation method, denominator, exclusions, missing policy, direction, and threshold boundary operators.
- A quarterly result is computed from its approved quarterly construction method. It is never the average of monthly colors or percentages unless that exact numeric aggregation is explicitly approved for the measure.
- A comparison records baseline/follow-up run IDs and rejects comparability when material site, item, population, window, denominator, source basis, rule, or catalog changes are not reconciled by an approved comparison/recast policy.

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
| `DATA-REQ-009` | Every target-state recommendation, decision, action, follow-up measurement, and outcome shall use stable identifiers and pass referential-integrity tests. |
| `DATA-REQ-010` | A durable recommendation decision shall accept only `accepted`, `modified`, `declined`, or `deferred` and shall retain reviewer scope, rationale, timestamp, and immutable recommendation version. |
| `DATA-REQ-011` | An action record shall originate only from an accepted or modified decision and shall retain exact confirmation, owner, target date, SharePoint target, execution receipt, and correction history. |
| `DATA-REQ-012` | Outcome data shall preserve baseline/follow-up result versions, comparability status and reason, observed movement, verified-improvement status, and sustained-result status without an unsupported causal claim. |
| `DATA-REQ-013` | Decision and outcome data shall not be used for automatic model training or policy updates; any product change shall follow a versioned, approved evaluation process. |
| `DATA-REQ-014` | Capacity reporting shall label 540 hours and $33,123 as estimates until an approved baseline, pilot method, and Finance treatment exist. |
| `DATA-REQ-015` | Every production result and report shall link to an immutable assessment run with run type, period, authority, evidence cutoff, catalog/source/rule versions, site scope, and certification or recast lineage. |
| `DATA-REQ-016` | Monthly/on-demand outputs shall remain provisional; a Quarterly Fitness Check shall not be labeled certified until required evidence, reconciliation, manual review, and authorized sign-off pass. |
| `DATA-REQ-017` | Each active item shall define separate monthly and quarterly windows/aggregation methods. Tests shall prove quarterly ratings are not produced by averaging monthly colors and that boundary, missing, and zero-denominator cases fail as approved. |
| `DATA-REQ-018` | Historical corrections shall create a versioned recast linked to the superseded run and reason; original results, reports, decisions, and control history shall remain immutable. |
| `DATA-REQ-019` | Durable context shall require an exact save preview and explicit confirmation and shall enforce attribution, scope, purpose, audience, effective dates, verification, privacy/retention, expiry, correction, withdrawal, and access. |
| `DATA-REQ-020` | Unverified conversational input, evidence disputes, source-change proposals, and feedback shall cause zero direct score, denominator, source mapping, rule, certification, prompt, model, or policy changes. |
| `DATA-REQ-021` | Any feedback-driven product change shall be classified/redacted, human-reviewed, evaluated offline against regression cases, approved, versioned, reversible, and monitored before production use. |
| `DATA-REQ-022` | An annual summary shall reference only the applicable certified Quarterly Fitness Check runs/reports, disclose missing or non-comparable quarters, and create no new assessment run, rating, or certification. |

## Assumptions

| Assumption ID | Assumption | Validation needed |
| --- | --- | --- |
| `DATA-A-001` | The exact original SharePoint workbook is the current synchronized mapping-review and governed-design artifact at version `34.0`, modified `2026-08-17T16:16:20Z`, and 37,518 bytes. | Re-verify the same item ID, version, `G2:G34` as 33/33 exact and nonblank, sheet set, readiness-gate markers, presence of `quarterly_fitness_check` and `annual_summary`, and absence of legacy `quarterly_audit` after each approved change; do not treat workbook synchronization as catalog, source, scoring, cadence, or release approval. |
| `DATA-A-002` | The 33 role assignments express working accountability intent. | HR Operations approves named/current owners. |
| `DATA-A-003` | Source-family leads are directionally useful for discovery. | Source owners approve exact objects, fields, filters, keys, and freshness. |
| `DATA-A-004` | `site x assessment run x Standard Work item` is the intended result grain, with monthly provisional and quarterly certified reporting authorities. | Product, Privacy, Data, and HR Operations approve audiences, minimum aggregation, run calendar, certification, item windows, and comparability. |
| `DATA-A-005` | The reviewer access list is not yet confirmed. | Resolve open Confluence comment 5217812622 with an approved role/user list and test pre-retrieval scope enforcement before alpha. |

## Risks

| Risk ID | Risk | Response |
| --- | --- | --- |
| `DATA-R-001` | The 33 rows are mistaken for an approved denominator. | Keep `approval_pending`, fixture banners, and release gates visible; prohibit baseline recast. |
| `DATA-R-002` | Demo IDs become accidental production join keys. | Replace them only through an approved stable-ID catalog and legacy crosswalk. |
| `DATA-R-003` | Located source leads are mistaken for activated mappings. | Preserve source status and show approved mapping count as 0. |
| `DATA-R-004` | Synthetic site codes or percentages are used in an HR decision. | Label every view/export as synthetic and exclude outputs from production decision records. |
| `DATA-R-005` | Future detailed HR data leaks through reports, traces, or Confluence. | Enforce pre-retrieval authorization, aggregation, redaction, output validation, and audit controls. |
| `DATA-R-006` | Successful publication to the original workbook is mistaken for approved production mapping. | Display the verified item/version and keep approved mapping count at 0 until source contracts and rules pass governance. |
| `DATA-R-007` | Monthly progress is mistaken for a certified Quarterly Fitness Check or monthly colors are averaged into a quarterly result. | Persist/display run type and authority, require item-level construction contracts, and block certification on invalid aggregation. |
| `DATA-R-008` | Helpful site context becomes unscoped memory, changes a score, or leaks sensitive HR information. | Use structured confirmed assertions with minimum necessary data, privacy/retention/expiry controls, attributed output, and deterministic-authority prohibitions. |
| `DATA-R-009` | User feedback silently changes product behavior. | Require governed offline change proposals, eval/regression evidence, approval, versioning, rollback, and monitoring. |

## Cross-references

| Document ID | Repository page | Confluence page |
| --- | --- | --- |
| `HRFC-MVP-TECH-001` | `Technical-Design-and-Scoring-Contract.md` | [5404327956](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5404327956) |
| `HRFC-MVP-UX-001` | `UX-and-Reporting-Specification.md` | [5403968355](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5403968355) |
| `HRFC-MVP-EVAL-001` | `Evaluation-and-Release-Evidence.md` | [5403968375](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5403968375) |
| `HRFC-MVP-OPS-001` | `Runbook-and-Rollout.md` | [5404262565](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5404262565) |
