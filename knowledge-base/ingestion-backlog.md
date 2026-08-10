# HR Fitness Check ingestion backlog

Status: Draft source-mapping backlog
Last updated: 2026-08-10

This backlog was originally seeded from an older 27-row V1 snapshot and then reconciled to the June 30 38-row / 37-intent snapshot. Both identifier mappings are historical. The latest verified SharePoint workbook copy was last modified 2026-07-29 16:32:27 UTC and contains 33 task rows, all marked `In Scope.`, with owner roles populated for all 33. The catalog remains approval-pending: source-table, reviewer, and result fields are blank, implementation modes and stable IDs are unapproved, and five June 30 rows are absent without an approved removal decision.

The backlog rows below are source-discovery leads, not a complete or approved current V1 scope. The current working task list is maintained in `docs/Reviewed-Checklist-Disposition.md`. The local MVP is read-only and uses synthetic fixture results.

> **PROHIBITED FOR JOINS:** Every `V1-###` and `A-###` mapping in the historical sections below is superseded and may point to a different business task than the July 29 draft list. Do not use either namespace for source joins, scoring, ownership, results, or historical recasts. Approve stable IDs and an explicit crosswalk first.

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
| Hybrid/manual | Some data may exist, but the process requires physical inspection, human judgment, or manual evidence capture. |
| Derived | Metric can be calculated from other Fitness Check results after dependencies are scored. |
| Blocked | Access, governance, or source discovery is blocking ingestion design. |

## Backlog

| V1 ID | Item | Source family | Current evidence | Ingestion status | Next discovery step |
|---|---|---|---|---|---|
| V1-001 | SNOW Tickets | ServiceNow / HR DataMart | ServiceNow SOPs; ServiceNow replication pages; expected tables `sn_hr_core_case`, `sn_hr_core_task`; HRDM first-pass metadata search returned zero matching tables | Blocked | Confirm actual ServiceNow production database/schema with HRDM or ServiceNow owner, then map SLA breach formula, HR service/category filters, suspend handling, assignment group/site key, and production connector status. |
| V1-002 | LOAA Management | ServiceNow / AbsenceOne / HR DataMart | SNOW Case & Task SOP; ServiceNow replication pages; HRDM first-pass metadata search returned zero expected case/task tables | Blocked | Confirm actual ServiceNow production schema/database before defining LOAA case/task filters, AbsenceOne handoff treatment, SLA breach numerator/denominator, and yellow/red threshold overlap. |
| V1-003 | Missing Time Stamps | UKG / Snowflake / HRDM employee badging | UKG Data Pipeline; UKG missed punch job aid; workbook references Punch Lunch Audit; user-discovered UKG Dataview 965 and HRDM `D_HRDATAMART.S_ANALYTICS.EMPLOYEE_BADGING` badge scan query | Source located | Test UKG Dataview 965, `EDLDB.UKG.GOLD_V_TIMECARD_TRANSACTIONS`, UKG exception tables, and HRDM badge first-in/last-out evidence for missed-punch recommendation candidates. Define current-shift grace period and HRA approval boundary. |
| V1-004 | Unscheduled (Not Scheduled but Working) | Roster Health / UKG / CLMS / Workday | Roster Health docs and SQL; `hr_fulfillment_roster_health_0830` pipeline | Source located | Confirm whether Roster Health source has NSBW/UBW site counts by 7-day window and reconcile to Tableau. |
| V1-005 | 13h Report | HR Packet / UKG / Snowflake | HR Daily Packet handbook; UKG timecard/schedule tables; HR Packet pipeline | Source located | Confirm Over 12 or 13 Hours view logic, scheduled-shift adjustment, and workbook-noted roster flaw. |
| V1-006 | 60h Report | HR Packet / UKG / Snowflake | HR Daily Packet handbook; `EDLDB.UKG.GOLD_V_TIMECARD_TOTAL` | Source located | Define prior-week week boundary, employee/site grain, and 60-hour calculation from timecard totals. |
| V1-007 | Lunch Punch review | UKG / Snowflake | UKG Punch Lunch Audit workbook lead; UKG timecard transactions; missed punch job aid | Source located | Validate meal-break exceptions and whether current report incorrectly conflates lunch and missing-punch issues. |
| V1-008 | Standup Audits | ECHO / Smartsheet / Tableau | ECHO Dashboard handbook; ECHO Program SOP; FC HR Analytics Stand Ups task | Source located | Locate target table/output for Stand Ups task and map site, week, score, and minimum audit count. |
| V1-009 | VOC Board Management | ECHO / VOC / Smartsheet / Tableau | ECHO Program SOP; VOC Dashboard handbook; FC HR Analytics VOC task | Source located | Confirm whether score and identifiable-comment percentage are in ECHO source, VOC source, or both. |
| V1-010 | TM Experience Walk | Smartsheet or replacement workflow | Fitness Check SOP and workbook source; ECHO mentions site leadership walks/CAT but not exact TM Experience Walk source | Hybrid/manual | Decide Smartsheet replacement and manual evidence workflow. Determine whether historical Smartsheet can be ingested. |
| V1-011 | Attendance Management | Roster Health / UKG | Roster Health docs; Roster Health SQL; workbook says Bubble % and flags Tableau vs UKG discrepancy | Source located | Confirm Bubble % definition, source table, and discrepancy root cause before scoring. |
| V1-012 | Locker Management | New Hire Experience Surveys / Tableau | New Hire Experience Survey Report handbook; new hire survey ETL tasks | Source located | Map Day 1 survey question to locker/resource availability, denominator, site key, and date window. |
| V1-013 | Badge Management | CCure / labor projections / physical inventory | Workbook source; NHO resources mention badges; no durable inventory source found | Hybrid/manual | Separate automated labor projection from physical badge/reel/lanyard/ink inventory. Manual evidence likely required. |
| V1-014 | Swag Management | VOC Dashboard / comments | VOC Dashboard handbook; ECHO Program recognition/upload mechanics | Candidate | Define approved VOC taxonomy or keyword rule for swag comments; decide whether text analytics is acceptable for scoring. |
| V1-015 | VTO Process | Smartsheet / UKG | UKG VET/VTO job aid; FC HR Analytics VTO Hourly task | Source located | Confirm Site VTO No-Match source, master file, site sheets, fields, and rating numerator. |
| V1-016 | Ensure site TMs have listed beneficiaries | Workday / HR DataMart | HRDM profile validated; Workday current/trended and roster objects visible; first-pass broad and key-object metadata searches found no obvious beneficiary, dependent, or benefit-completeness fields | Candidate | Ask Workday/HRDM owner for the exact report/table/field behind `Chewy Employees Missing Beneficiary Report`; confirm exclusion for TMs not enrolled in benefits. |
| V1-017 | Ensure site TMs have listed emergency contacts | Workday / HR DataMart | HRDM profile validated; Workday current/trended and roster objects visible; first-pass broad and key-object metadata searches found no obvious emergency-contact fields | Candidate | Ask Workday/HRDM owner for the exact report/table/field behind `Chewy Employee Emergency Contact Info`; confirm 30-day employment denominator. |
| V1-018 | Audit exempt HR Standard Work | Fitness Check derived results | Product logic only | Derived | Define dependency set of HRBP/exempt items and denominator. Do not source externally unless process owner changes rule. |
| V1-019 | Quality 1:1 | Talent Management Dashboard / Workday / Tableau | Talent Management Dashboard reference; One on One SOP; EPA inventory; HRDM first-pass metadata found no obvious Quality 1:1/Talent table or column matches | Candidate | Inspect Tableau workbook/data source or EPA repo for completion percentage fields and site mapping. |
| V1-020 | LEWs | Talent Management Dashboard / Tableau | Talent Management Dashboard reference; Chewy Locations has `LEW` column as likely expected count, not completion; HRDM first-pass metadata found no obvious LEW/Talent table or column matches | Candidate | Confirm LEW definition, expected denominator, completion source, and whether dashboard table exists outside obvious HRDM names. |
| V1-021 | Site communication & signage | TM Experience Walk / physical site check | Workbook source from TM Experience Walk question | Hybrid/manual | Tie to TM Experience Walk workflow or create manual input evidence requirement. |
| V1-022 | Review and answer VOC board daily (with GM) | ECHO / VOC Dashboard | ECHO Program SOP; VOC Dashboard response-time view; FC HR Analytics VOC task | Source located | Map prior-week VOC score and response-time/completion fields; define GM/HRM partnership requirement as measurable proxy. |
| V1-023 | CAT Tracker | ECHO / CAT / Smartsheet | ECHO Program SOP; FC HR Analytics CAT task; `cat_tracker_snapshot` | Source located | Locate table/output from CAT task/snapshot and map weekly score, open items, closed items, and dwell fields. |
| V1-024 | Roundtables | CAT / ECHO | Roundtables SOP; ECHO Program SOP; FC HR Analytics CAT task | Source located | Confirm roundtable event taxonomy in CAT and calculate monthly/quarterly counts. |
| V1-025 | Audit schedule groups | UKG / Snowflake | UKG schedule-group job aid; UKG schedule tables; Roster Health missing schedule category | Source located | Identify missing schedule group field/table and decide if Roster Health missing schedule is the official source. |
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

1. Start with source families that already have durable data paths: UKG/HR Packet/Roster Health, ECHO/CAT, ServiceNow, and Workday HRDM.
2. Defer physical evidence and local tracker items until a manual input/evidence workflow is approved.
3. Reconcile against Tableau dashboards only after table-level source extracts are available.
4. Treat Investigations as a governance-first item before any field mapping or sample extraction.
5. Treat the 2026 TM Experience Roadmap as recommendation/action-loop context. Do not use VOC action trackers or project charters as Standard Work scoring inputs unless a specific approved metric, source field, and rule are added to the catalog.
