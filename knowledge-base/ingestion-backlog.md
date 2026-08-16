# HR Fitness Check ingestion backlog

Status: Draft source-mapping backlog
Last updated: 2026-08-12

This backlog was originally seeded from an older 27-row V1 snapshot and then reconciled to the June 30 38-row / 37-intent snapshot. Both identifier mappings are historical. The original July 29 SharePoint workbook contains 33 task rows, all marked `In Scope.`, with owner roles populated for all 33; its source-table, reviewer, and result fields were blank when fetched and remain unchanged. A separate source-integrated derivative was published and version-verified on 2026-08-12 as item `01LYSC3QJ3RANZPMKYABGZQVLYSVXYKF7R`, version `1.0`. The catalog remains approval-pending: implementation modes, stable IDs, source contracts, rules, and approvals are unapproved, and five June 30 rows are absent without an approved removal decision.

The backlog rows below are source-discovery leads, not a complete or approved current V1 scope. The current working task list is maintained in `docs/Reviewed-Checklist-Disposition.md`. The local MVP is read-only and uses synthetic fixture results.

> **PROHIBITED FOR JOINS:** Every `V1-###` and `A-###` mapping in the historical sections below is superseded and may point to a different business task than the July 29 draft list. Do not use either namespace for source joins, scoring, ownership, results, or historical recasts. Approve stable IDs and an explicit crosswalk first.

## Current 33-Row Source-Integrated Derivative - Approval Pending

This is the task-name-based derivative published and version-verified on 2026-08-12. It records discovery posture, not production authorization. Counts reconcile to 33 rows: 21 candidate, including 2 external governed-source candidates; 5 blocked; 5 manual/hybrid; 1 validated-object/rule-pending; 1 derived; and 0 approved. Fifteen candidates remain sandbox-dependent. All `SANDBOX` objects are discovery candidates, not production-certified sources.

| Workbook row | Current task | Disposition | Candidate object or gap | Next decision |
|---:|---|---|---|---|
| 2 | TM Experience Walk | Manual/hybrid | Current TM Experience Walk Smartsheet; future normalized Microsoft Forms contract found but live deployment unverified | Inventory the governed current source and approve the evidence workflow; treat the Forms builder as future-state only. |
| 3 | Standup Audits | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.STAND_UP_AUDITS`; base `FULFILLMENT_STAND_UPS` | Confirm owner, production object, week/site grain, and rating calculation. |
| 4 | New Hire Orientation | Blocked | CCURE DNS object not found; UKG-side `EDLDB.UKG.GOLD_V_PEOPLE` | Locate CCURE source and approve mismatch join. |
| 5 | HR Metrics & Roster Health | Blocked | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ROSTER_HEALTH_SNAPSHOT`; HRDM roster reference | Approve the missing metric definition and thresholds before source selection. |
| 6 | HR ServiceNow (SNOW) Tickets | Candidate - external governed source | EPA weekly resolved-case export; no production Snowflake case/task object found | Approve complete/open-case coverage, cadence, site key, service mapping, SLA rule, classification, access, and production delivery contract. |
| 7 | VET Process | Candidate | Sandbox `EDLDB.FULFILLMENT_OPTIMIZATION_SANDBOX.VET_VTO_INFO_ZEUS`; request detail `V_UKG_TIME_OFF_REQUESTS` | Reconcile no-match semantics and numerator. |
| 8 | VTO Process | Candidate | Sandbox `EDLDB.FULFILLMENT_OPTIMIZATION_SANDBOX.VET_VTO_INFO_ZEUS`; request detail `V_UKG_TIME_OFF_REQUESTS` | Reconcile no-match semantics and numerator. |
| 9 | Shift Transfers | Candidate | `EDLDB.UKG.GOLD_V_PEOPLE` plus `GOLD_V_SCHEDULE_SHIFT` | Reconcile FC MET Scheduled logic, site transfers, and effective date. |
| 10 | FLO Certification management | Manual/hybrid | Authoritative site `FLO Process - Pending/Completed` Smartsheets per SOP; no Snowflake object | Inventory site sheets and approve the connector, fields, site/date keys, Workday/UKG reconciliation, access, and rating rule. |
| 11 | Missing Time Stamps | Validated objects; rule pending | `EDLDB.UKG.GOLD_V_TIMECARD_EXCEPTION` plus `GOLD_V_TIMECARD_PUNCH` | Approve joins, current-shift exclusion, grace period, site key, and rating rule. |
| 12 | Unscheduled but Working | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ROSTER_HEALTH_SNAPSHOT`; UKG `GOLD_V_TIMECARD_WORK_SHIFT` | Reconcile exact NSBW field to Tableau and approve seven-day rule. |
| 13 | 13h Day Risk Assessment | Candidate | `EDLDB.UKG.GOLD_V_TIMECARD_WORK_SHIFT` plus `GOLD_V_SCHEDULE_SHIFT` | Approve shift-type thresholds and exclusions. |
| 14 | 60h Week Risk Assessment | Candidate | `EDLDB.UKG.GOLD_V_TIMECARD_TOTAL`; detail `GOLD_V_TIMECARD_TRANSACTION` | Approve week boundary, paycodes, site grain, and exclusions. |
| 15 | Locker Management | Candidate | Sandbox `NHE_SURVEYS` plus current SDF4/SDF6 SharePoint locker workbooks and network SOP | Confirm the exact Day 1 survey mapping and denominator; inventory network site trackers and approve a durable contract. |
| 16 | Badge Management | Manual/hybrid | Badge Reprint App/CCURE cover replacements and access, not badge/reel/lanyard/ink stock; `EMPLOYEE_BADGING` is scan evidence only | Approve a physical inventory workflow and labor-plan input. |
| 17 | Swag Management | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.VOC_BOARD` | Approve VOC taxonomy/text handling and scoring rule. |
| 18 | Audit schedule groups | Candidate | `EDLDB.UKG.GOLD_V_PEOPLE` plus `GOLD_V_SCHEDULE_SHIFT` | Define missing/incorrect group logic and official source. |
| 19 | Review Temporary Schedule Adjustments | Manual/hybrid | Authoritative site Smartsheet tracker per SOP plus Workday documents and UKG schedule-group evidence | Inventory trackers and approve minimum-necessary access, site/date keys, sensitive joins, weekly review, and sample rule. |
| 20 | Attendance Management | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ROSTER_HEALTH_SNAPSHOT`; no Bubble field | Reconcile the Tableau Bubble calculation and source-of-truth discrepancy. |
| 21 | Ensure site TMs have listed beneficiaries | Blocked | Workday report workflow identified by SOP; HRDM feed provides denominator only and no target fields | Approve the report/RaaS contract, fields, exclusions, aggregate-only output, privacy controls, and monthly cadence. |
| 22 | Ensure site TMs have listed emergency contacts | Blocked | Workday report workflow identified by SOP; HRDM feed provides denominator only and no target fields | Approve the report/RaaS contract, fields, tenure rule, aggregate-only output, privacy controls, and cadence. |
| 23 | Quality 1:1 | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.QUALITY_ONE_ON_ONE`; base `FULFILLMENT_QUALITY` | Confirm completion denominator, Tableau reconciliation, and production source. |
| 24 | LEWs | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.FULFILLMENT_LEW` | Confirm completion denominator, Tableau reconciliation, and production source. |
| 25 | Investigations | Blocked | EthicsPoint/OpenBark are authoritative case systems; no current approved aggregate export located | Obtain Employee Relations, Legal, Privacy, source-owner, access, retention, and aggregate-only approval before field mapping. |
| 26 | LOAA Management | Candidate - external governed source | EPA weekly resolved-case export contains LOAA service and SLA-breach fields; Workday feed supplies cohort context only | Approve complete/open-case coverage, cadence, site key, LOAA service taxonomy, SLA formula, access, and production delivery contract. |
| 27 | CAT Tracker | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.CAT_TRACKER_SNAPSHOT` | Confirm weekly CAT score formula and production source. |
| 28 | Fishbowl Display | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ECHO_SNAPSHOT` (`FISHBOWL`) | Confirm score semantics and production source. |
| 29 | VOC Board Management | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ECHO_SNAPSHOT` plus `VOC_BOARD` | Approve weekly score formula and identifiable-comment treatment. |
| 30 | Roundtables | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ECHO_SNAPSHOT`; no explicit roundtable field | Confirm taxonomy, window, denominator, and production source. |
| 31 | Chewtopian of the Month/Leader of the Pack | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ECHO_SNAPSHOT` (`COTM`, `LOP`) | Confirm score semantics and production source. |
| 32 | Audit exempt HR Standard Work | Derived | No external table; future Fitness Check result fact is not implemented | Approve dependency set, denominator, and comparability rule. |
| 33 | Site communication & signage | Manual/hybrid | Current TM Experience Walk Smartsheet; future Microsoft Forms builder defines normalized signage fields but live deployment is unverified | Approve the current evidence workflow and separately validate future form deployment, response store, completeness, and ownership. |
| 34 | Labor Planning | Candidate | Sandbox `EDLDB.FULFILLMENT_OPTIMIZATION_SANDBOX.SP_SNAP_ATTENDANCE_FCST_HR_METRICS` exposes actual/forecast attendance factors and error fields; Rx lead `RX_LABOR_PLAN_METRICS` | Confirm FC/Rx coverage, business definition, owner, and production target. |

## Historical June 30 draft-ID crosswalk - superseded

| Legacy ID | June 30 draft ID | Item | Historical reconciliation note |
| --- | --- | --- | --- |
| V1-001 | A-005 | HR ServiceNow (SNOW) Tickets | Renamed in the June 30 snapshot. |
| V1-002 | A-016 | LOAA Management | Same business item. |
| V1-003 | A-010 | Missing Time Stamps | Same business item. |
| V1-004 | A-011 | Unscheduled but Working | Display name shortened. |
| V1-005 | A-012 | 13h Day risk assessment | Expanded display name. |
| V1-006 | A-013 | 60h Week risk assessment | Expanded display name. |
| V1-007 | None | Lunch Punch review | Not a separate row in the June 30 38-task-row list; product decision required before reuse. |
| V1-008 | A-002 | Standup Audits | Same business item. |
| V1-009 | A-019 | VOC Board Management | Same business item. |
| V1-010 | A-001 | TM Experience Walk | Same business item. |
| V1-011 | A-020 | Attendance Management | Same business item. |
| V1-012 | A-014 | Locker Management | Same business item. |
| V1-013 | A-015 | Badge Management | Same business item. |
| V1-014 | A-021 | Swag Management | Same business item. |
| V1-015 | A-007 | VTO Process | Same business item. |
| V1-016 | A-022 | Beneficiary completion | Expanded display name. |
| V1-017 | A-023 | Emergency-contact completion | Expanded display name. |
| V1-018 | A-024 | Audit exempt HR Standard Work | Same business item. |
| V1-019 | A-025 | Quality 1:1 | Same business item. |
| V1-020 | A-026 | LEWs | Same business item. |
| V1-021 | A-027 | Site communication and signage | Same business item. |
| V1-022 | A-028 | Review and answer VOC board daily | Expanded display name. |
| V1-023 | A-017 | CAT Tracker | Same business item. |
| V1-024 | A-018 | Roundtables | Same business item. |
| V1-025 | A-029 | Audit schedule groups | Same business item. |
| V1-026 | A-030 | Investigations | Same business item. |
| V1-027 | A-009 | FLO Certification management | Same business item. |

This table preserves June 30 lineage only. Its `A-###` values do not match the July 29 draft ordering and must never be treated as current IDs. The approved catalog must assign stable IDs to the effective task set and document how older identifiers map, split, merge, retire, or remain unresolved.

## Status Legend

| Status | Meaning |
|---|---|
| Source located | A likely source artifact, pipeline, table, or dashboard has been found. Field-level mapping still required. |
| Candidate | A source family is likely but not enough evidence exists to map fields yet. |
| Validated objects; rule pending | Named objects and relevant columns were confirmed in accessible metadata, but joins, filters, rule, owner, and production authorization remain open. |
| Hybrid/manual | Some data may exist, but the process requires physical inspection, human judgment, or manual evidence capture. |
| Derived | Metric can be calculated from other Fitness Check results after dependencies are scored. |
| Blocked | Access, governance, or source discovery is blocking ingestion design. |

## Backlog

| V1 ID | Item | Source family | Current evidence | Ingestion status | Next discovery step |
|---|---|---|---|---|---|
| V1-001 | SNOW Tickets | ServiceNow / HR DataMart | ServiceNow SOPs; ServiceNow replication pages; expected tables `sn_hr_core_case`, `sn_hr_core_task`; HRDM first-pass metadata search returned zero matching tables | Blocked | Confirm actual ServiceNow production database/schema with HRDM or ServiceNow owner, then map SLA breach formula, HR service/category filters, suspend handling, assignment group/site key, and production connector status. |
| V1-002 | LOAA Management | ServiceNow / AbsenceOne / HR DataMart | SNOW Case & Task SOP; ServiceNow replication pages; HRDM first-pass metadata search returned zero expected case/task tables | Blocked | Confirm actual ServiceNow production schema/database before defining LOAA case/task filters, AbsenceOne handoff treatment, SLA breach numerator/denominator, and yellow/red threshold overlap. |
| V1-003 | Missing Time Stamps | UKG / Snowflake / HRDM employee badging | Live metadata confirms `EDLDB.UKG.GOLD_V_TIMECARD_EXCEPTION` and `EDLDB.UKG.GOLD_V_TIMECARD_PUNCH`; HRDM `EMPLOYEE_BADGING` remains corroborating only | Validated objects; rule pending | Approve joins, site key, current-shift exclusion, grace period, exception treatment, and rating rule. Badge scans must not substitute for payroll punches. |
| V1-004 | Unscheduled (Not Scheduled but Working) | Roster Health / UKG / CLMS / Workday | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ROSTER_HEALTH_SNAPSHOT` contains exact NSBW fields; UKG reference `GOLD_V_TIMECARD_WORK_SHIFT` | Candidate | Reconcile sandbox fields to Tableau, confirm seven-day population/exclusions, and identify the production-certified source. |
| V1-005 | 13h Report | HR Packet / UKG / Snowflake | Live metadata confirms `EDLDB.UKG.GOLD_V_TIMECARD_WORK_SHIFT` (`SHIFT_TOTAL_HOURS`) and `GOLD_V_SCHEDULE_SHIFT` | Candidate | Confirm Over 12/13 Hours logic, scheduled-shift adjustment, exclusions, and workbook-noted roster flaw. |
| V1-006 | 60h Report | HR Packet / UKG / Snowflake | Live metadata confirms `EDLDB.UKG.GOLD_V_TIMECARD_TOTAL` and `GOLD_V_TIMECARD_TRANSACTION` | Candidate | Define prior-week boundary, paycodes, employee/site grain, exclusions, and source owner. |
| V1-007 | Lunch Punch review | UKG / Snowflake | UKG Punch Lunch Audit workbook lead; UKG timecard transactions; missed punch job aid | Source located | Validate meal-break exceptions and whether current report incorrectly conflates lunch and missing-punch issues. |
| V1-008 | Standup Audits | ECHO / Smartsheet / Tableau | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.STAND_UP_AUDITS` and base `FULFILLMENT_STAND_UPS` have site/date/rating fields | Candidate | Confirm owner, production object, week/site grain, minimum audit count, and rating calculation. |
| V1-009 | VOC Board Management | ECHO / VOC / Smartsheet / Tableau | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ECHO_SNAPSHOT` and `VOC_BOARD` are visible with weekly and raw VOC fields | Candidate | Confirm score formula, identifiable-comment treatment, site/window logic, and production source. |
| V1-010 | TM Experience Walk | Smartsheet or replacement workflow | Fitness Check SOP and workbook source; ECHO mentions site leadership walks/CAT but not exact TM Experience Walk source | Hybrid/manual | Decide Smartsheet replacement and manual evidence workflow. Determine whether historical Smartsheet can be ingested. |
| V1-011 | Attendance Management | Roster Health / UKG | Sandbox `ROSTER_HEALTH_SNAPSHOT` is visible, but no `BUBBLE` or `BUBBLE_PERCENT` column was found; workbook flags Tableau versus UKG discrepancy | Candidate | Confirm the Tableau Bubble calculation, source fields, and discrepancy root cause before scoring. |
| V1-012 | Locker Management | New Hire Experience Surveys / Tableau | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.NHE_SURVEYS` contains `NHO_RESOURCES` | Candidate | Confirm that `NHO_RESOURCES` maps to the locker question, then approve denominator, site key, and window. |
| V1-013 | Badge Management | CCure / labor projections / physical inventory | Workbook source; NHO resources mention badges; no durable inventory source found | Hybrid/manual | Separate automated labor projection from physical badge/reel/lanyard/ink inventory. Manual evidence likely required. |
| V1-014 | Swag Management | VOC Dashboard / comments | VOC Dashboard handbook; ECHO Program recognition/upload mechanics | Candidate | Define approved VOC taxonomy or keyword rule for swag comments; decide whether text analytics is acceptable for scoring. |
| V1-015 | VTO Process | Smartsheet / UKG | Sandbox `EDLDB.FULFILLMENT_OPTIMIZATION_SANDBOX.VET_VTO_INFO_ZEUS` and `EDLDB.PEOPLE_ANALYTICS_SANDBOX.V_UKG_TIME_OFF_REQUESTS` are visible | Candidate | Confirm Site VTO No-Match semantics, source of record, site sheets/fields, and rating numerator. |
| V1-016 | Ensure site TMs have listed beneficiaries | Workday / HR DataMart | `D_HRDATAMART.S_WORKDAY.WD_DATAMARTFEED` provides worker/site/tenure denominator context, but repeated metadata search found no beneficiary or enrollment field | Blocked | Ask Workday/HRDM owner for the exact report/table/field behind `Chewy Employees Missing Beneficiary Report`; confirm exclusion for TMs not enrolled in benefits. |
| V1-017 | Ensure site TMs have listed emergency contacts | Workday / HR DataMart | `D_HRDATAMART.S_WORKDAY.WD_DATAMARTFEED` provides worker/site/tenure denominator context, but repeated metadata search found no emergency-contact field | Blocked | Ask Workday/HRDM owner for the exact report/table/field behind `Chewy Employee Emergency Contact Info`; confirm 30-day employment denominator. |
| V1-018 | Audit exempt HR Standard Work | Fitness Check derived results | Product logic only | Derived | Define dependency set of HRBP/exempt items and denominator. Do not source externally unless process owner changes rule. |
| V1-019 | Quality 1:1 | Talent Management Dashboard / EDLDB sandbox / Tableau | HRDM-only search found no matching name, but later EDLDB discovery found sandbox `QUALITY_ONE_ON_ONE` and base `FULFILLMENT_QUALITY` with exact activity fields | Candidate | Confirm completion denominator, Tableau reconciliation, source owner, and production-certified object. |
| V1-020 | LEWs | Talent Management Dashboard / EDLDB sandbox / Tableau | HRDM-only search found no matching name, but later EDLDB discovery found sandbox `FULFILLMENT_LEW`; Chewy Locations has a likely expected-count field | Candidate | Confirm LEW definition, expected denominator, Tableau reconciliation, source owner, and production-certified object. |
| V1-021 | Site communication & signage | TM Experience Walk / physical site check | Workbook source from TM Experience Walk question | Hybrid/manual | Tie to TM Experience Walk workflow or create manual input evidence requirement. |
| V1-022 | Review and answer VOC board daily (with GM) | ECHO / VOC Dashboard | ECHO Program SOP; VOC Dashboard response-time view; FC HR Analytics VOC task | Source located | Map prior-week VOC score and response-time/completion fields; define GM/HRM partnership requirement as measurable proxy. |
| V1-023 | CAT Tracker | ECHO / CAT / Smartsheet | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.CAT_TRACKER_SNAPSHOT` has site/date/action/resolution/follow-up fields | Candidate | Confirm weekly score formula, owner, and production-certified source. |
| V1-024 | Roundtables | CAT / ECHO | Sandbox `ECHO_SNAPSHOT` is visible but has no explicit roundtable field | Candidate | Confirm event taxonomy, window, denominator, and production-certified source. |
| V1-025 | Audit schedule groups | UKG / Snowflake | `EDLDB.UKG.GOLD_V_PEOPLE` exposes schedule-group fields; `GOLD_V_SCHEDULE_SHIFT` supplies schedule detail | Candidate | Define missing/incorrect group logic and decide whether Roster Health or UKG is the official source. |
| V1-026 | Investigations | Workday / Ethicspoint/OpenBark / ER Dashboard | Investigations SOP; EPA inventory has OpenBark Dashboard; Workday Investigation Documents | Blocked by sensitivity | Governance/legal must approve inclusion rules, aggregate-only fields, and whether SLA completion average can be used without case detail exposure. |
| V1-027 | FLO Certification management | Smartsheet / Workday / UKG | FLO Certification SOP; site FLO pending/completed Smartsheet workflow; Workday/Kronos verification | Hybrid/manual | Locate FLO Smartsheet master/site sheets or pipeline. Define how to sample five most recent offer letters without exposing individual details. |

## Historical June 30 additional rows - superseded

The June 30 snapshot marked the following additional rows as in-scope intent or materially renamed older research rows. Preserve these entries for reconciliation only. Several IDs changed in the July 29 33-row list, and three listed business rows are among the five now absent. Use task names and an approved stable-ID crosswalk, never the draft IDs below, when deciding whether a source lead remains relevant.

| June 30 draft ID | Item | June 30 evidence | Initial posture | Next discovery step |
|---|---|---|---|---|
| A-003 | New Hire Orientation | UKG and CCure DNS status review for prior 3 NHO groups | Candidate | Confirm DNS status source, CCure access path, site key, date window, and mismatch definition. |
| A-004 | HR Metrics & Roster Health | Roster Health Report | Candidate | Define the exact metric because the health barometer was blank in the June 30 workbook and remains unapproved in the July 29 working copy. |
| A-006 | VET Process | Site VET No-Match Sheet | Candidate | Locate governed sheet/table and define no-match numerator and window. |
| A-008 | Shift Transfers / Includes site-to-site transfers | UKG Pro FC MET Scheduled report | Source located | Map MET cohort and schedule group mismatch logic. |
| A-031 | Fishbowl Display | Fishbowl SOP and current display review | Hybrid/manual | Decide whether this remains a manual display check or has durable evidence. |
| A-032 | Chewtopian of the Month/Leader of the Pack | Recognition boards | Hybrid/manual | Decide whether board evidence can be captured in an approved manual workflow. |
| A-033 | Labor Planning | Labor Planning Metrics; prior-week planned vs actual variance | Candidate | Identify authoritative planned/actual source and decide LOA/attrition treatment. |
| A-034 | Prepare Ops training/development (such as in AMMs) | Check-in with five Area Managers | Hybrid/manual | Decide whether interview/check-in evidence can be captured in a governed manual workflow. |
| A-035 | Review Temporary Schedule Adjustments | Approved temporary accommodations tracker and UKG profile review | Candidate | Locate approved tracker, define five-most-recent sampling rule, and map UKG schedule fields. |
| A-036 | Monthly Engagement Calendar | Public forum postings | Hybrid/manual | Decide evidence home and freshness rule for calendar postings. |
| A-037 | HR Floor Engagement & Follow-Ups | HR calendar/scheduled floor engagement percentage | Candidate / governance review | Confirm whether calendar data can be used for this HR measurement and define aggregation/privacy rules. |

## Recommended Ingestion Order

1. Start field/rule reconciliation with confirmed UKG objects and the discovered EDLDB sandbox candidates, while treating sandbox objects as non-production until an owner-approved target is identified.
2. Defer physical evidence and local tracker items until a manual input/evidence workflow is approved.
3. Reconcile against Tableau dashboards only after table-level source extracts are available.
4. Treat ServiceNow, beneficiary/emergency-contact, accommodations, CCURE, and Investigations rows as blocked until the missing schema, field, tracker, or governance decision is resolved.
5. Treat Investigations as a governance-first item before any field mapping or sample extraction.
6. Treat the 2026 TM Experience Roadmap as recommendation/action-loop context. Do not use VOC action trackers or project charters as Standard Work scoring inputs unless a specific approved metric, source field, and rule are added to the catalog.
