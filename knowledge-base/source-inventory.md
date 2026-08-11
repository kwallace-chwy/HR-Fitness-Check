# Source Inventory

Status: Draft discovery artifact
Last updated: 2026-08-11

## Source Status Legend

| Status | Meaning |
|---|---|
| Located | A credible source artifact, system path, table, or pipeline was found. |
| Candidate | A likely source was found, but table/field-level mapping is not confirmed. |
| Blocked | Source family is known, but access, connector, table metadata, or governance prevents ingestion planning. |
| Manual/hybrid | Evidence requires a physical inspection, human judgment, local tracker, or a data-plus-review workflow. |
| Validated objects; rule pending | The object and relevant columns were confirmed in metadata, but the source contract and scoring rule are not approved. |
| Derived | The future metric depends on other approved Fitness Check results rather than an external source table. |

## Core Platform Sources

| Source family | Status | Located evidence | Ingestion relevance |
|---|---|---|---|
| HR DataMart / Snowflake | Located, profile validated, metadata discovery started | Confluence: EPA - HR Datamart (Snowflake) Overview; Workday HRDM page; HR Datamart onboarding/security references; HRDM SSO validation output | Primary target for Workday-derived roster and people fields. Production database `D_HRDATAMART` is accessible through a separate HRDM profile. Visible schemas include `S_ANALYTICS`, `S_CURATED`, `S_GREENHOUSE`, `S_REFERENCE`, and `S_WORKDAY`. |
| Workday to HRDM | Located, field discovery started | Confluence: Workday HRDM pipeline page; HRDM metadata output | Workday current and trended objects are visible, including `S_WORKDAY.WD_DATAMARTFEED`, `S_WORKDAY.WD_DATAMARTFEED_TRENDED`, `S_WORKDAY.WORKDAY_TRENDED`, and `S_WORKDAY.V_WORKDAY_TRENDED`. First-pass metadata did not find obvious beneficiary or emergency-contact columns. |
| UKG Pro to Snowflake | Located, metadata discovery started | Confluence: EDS - UKG Pro Data Ingestion into Snowflake; UKG Data Pipeline; Snowflake metadata query output | Candidate source for timecard, schedule, accrual, missed punch, meal break, 13h, 60h, schedule group, and VTO/VET metrics. Current role can query `EDLDB.UKG` metadata. |
| EDLDB People Analytics sandbox | Located for discovery; not production-certified | 2026-08-11 live table and column metadata queries | Sandbox candidates now exist for Standup Audits, Roster Health, surveys, Quality 1:1, LEWs, CAT, ECHO, VOC, and supporting UKG extracts. Their names and columns are evidence for mapping work only; owner, lineage, freshness, access, production target, and scoring approval remain open. |
| ServiceNow to HR DataMart | Located in documentation, not found in HRDM metadata search | Confluence: ServiceNow Data Replication into HR DataMart; ServiceNow Data Ingestion Progress; HRDM metadata output | Candidate source for SNOW Tickets and LOAA Management. Expected tables `sn_hr_core_case` and `sn_hr_core_task` did not appear in the HRDM first-pass table-name search, so the actual replication schema/database still needs source-owner confirmation. |
| FC HR Analytics | Located | Confluence: FC HR Analytics Documentation | Critical map of existing HR Packet, Roster Health, ECHO, New Hire Survey, Smartsheet roster, VET/VTO, and CAT snapshot pipelines. Includes GitHub repository lead: `https://github.com/Chewy-Inc/fc_hr_analytics`. |
| SharePoint / OperationsHR | Located | OperationsHR site, SOP folders, HR Reports, UKG Pro, ECHO, SNOW, Investigations, Workday Documents | Best source for SOPs, process definitions, evidence of workflow, and some tracker/workbook artifacts. Not always the durable analytical source. |
| Tableau | Candidate | HR Daily Packet, Roster Health Assessment, ECHO Dashboard, VOC Dashboard, New Hire Experience Survey Report, Talent Management Dashboard references | Useful for reconciliation and source-owner discovery. Prefer underlying Snowflake/ETL sources for ingestion. |

## Snowflake And Data Mart Candidates

| Area | Candidate object | Evidence | Notes |
|---|---|---|---|
| UKG timecard totals | `EDLDB.UKG.GOLD_V_TIMECARD_TOTAL` | Confluence: UKG Data Pipeline | Reported lag about 5 hours in the source page. Useful for total hours, 60h, 13h, and timecard-derived metrics after field validation. |
| UKG timecard transactions | `EDLDB.UKG.GOLD_V_TIMECARD_TRANSACTION` | 2026-08-11 live Snowflake metadata; Confluence: UKG Data Pipeline | Candidate for transaction, punch/meal-break, and time-window details. |
| UKG timecard exceptions and punches | `EDLDB.UKG.GOLD_V_TIMECARD_EXCEPTION`, `EDLDB.UKG.GOLD_V_TIMECARD_PUNCH` | 2026-08-11 live Snowflake metadata and full column inventory | Objects and relevant columns are validated for Missing Time Stamps discovery; the current-shift exclusion, grace period, joins, site mapping, and rating rule remain pending. |
| UKG worked shifts | `EDLDB.UKG.GOLD_V_TIMECARD_WORK_SHIFT` | 2026-08-11 live Snowflake metadata | Candidate for unscheduled work and 13h risk logic; contains `SHIFT_TOTAL_HOURS`, schedule-origin, and start/end fields. |
| UKG schedule total | `EDLDB.UKG.GOLD_V_SCHEDULE_TOTAL` | Confluence: UKG Data Pipeline | Candidate for scheduled hours and schedule completeness. |
| UKG schedule transactions | `EDLDB.UKG.GOLD_V_SCHEDULE_TRANSACTION` | 2026-08-11 live Snowflake metadata; Confluence: UKG Data Pipeline | Candidate for schedule and shift-level validation. |
| UKG accrual balance summary | `EDLDB.UKG.GOLD_V_ACCRUAL_BALANCE_SUMMARY` | Confluence: UKG Data Pipeline | Candidate for UTO/accrual context if needed by Attendance Management. |
| UKG people | `EDLDB.UKG.GOLD_V_PEOPLE` | 2026-08-11 live Snowflake metadata; Confluence: EDS UKG ingestion page | Exact object is visible. Candidate fields include `SCHEDULE_GROUP`, `GROUP_SCHEDULE`, `SCHEDULE_PATTERN`, `SHIFT_CODE`, `BADGE_NUMBER`, employment status, and person/site join context. Metric rules remain pending. |
| Workday current feed | `D_HRDATAMART.S_WORKDAY.WD_DATAMARTFEED` | Confluence: Workday HRDM page; HRDM metadata output | Current employee details. Useful fields include employee, worker, location, hire, manager, and LOA fields. Beneficiary and emergency-contact fields were not found by obvious names. |
| Workday trended feed | `D_HRDATAMART.S_WORKDAY.WD_DATAMARTFEED_TRENDED`, `D_HRDATAMART.S_WORKDAY.WORKDAY_TRENDED`, `D_HRDATAMART.S_WORKDAY.V_WORKDAY_TRENDED` | Confluence: Workday HRDM page; HRDM metadata output | Historical employee details. Use for quarter snapshots if needed. Beneficiary and emergency-contact fields were not found by obvious names. |
| HR analytics roster | `D_HRDATAMART.S_ANALYTICS.ROSTER_DAY_END`, `ROSTER_WEEK_END`, `ROSTER_PERIOD_END`; `D_HRDATAMART.S_CURATED.ROSTER_WEEK_END`, `ROSTER_PERIOD_END` | Confluence: EPA HR Datamart overview; HRDM metadata output | Useful for site roster denominator, location/site mapping, LOA flags, worker attributes, and rollup context. |
| HRDM employee badging | `D_HRDATAMART.S_ANALYTICS.EMPLOYEE_BADGING` | User-discovered HRDM badge scan worksheet and SQL seed, 2026-07-07 | Candidate corroborating source for directional IN/OUT badge scans by employee, site, and date. Useful for MAIA missed-punch recommendation research for BNA1, DFW8, SDF2, and SDF4 after governance approval. Badge scans are not payroll punches. |
| ServiceNow case | `sn_hr_core_case` expected, not found | Confluence: ServiceNow Data Replication into HR DataMart; HRDM metadata output | Unique key is case number per source page. HRDM first-pass search returned zero matching tables; source owner must provide actual production schema or alternate database. |
| ServiceNow task | `sn_hr_core_task` expected, not found | Confluence: ServiceNow Data Replication into HR DataMart; HRDM metadata output | Unique key is task number per source page. HRDM first-pass search returned zero matching tables; source owner must provide actual production schema or alternate database. |
| Roster Health snapshot | `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ROSTER_HEALTH_SNAPSHOT` | 2026-08-11 live EDLDB table/column metadata | Sandbox candidate with exact NSBW fields and broader roster-health fields. The workbook's Bubble calculation and the blank HR Metrics threshold remain unresolved. |
| Standup audits | `EDLDB.PEOPLE_ANALYTICS_SANDBOX.STAND_UP_AUDITS`; base `EDLDB.PEOPLE_ANALYTICS_SANDBOX.FULFILLMENT_STAND_UPS` | 2026-08-11 live EDLDB table/column metadata | Sandbox candidate with site, date, shift, department, and rating fields. Not production-certified. |
| New-hire survey | `EDLDB.PEOPLE_ANALYTICS_SANDBOX.NHE_SURVEYS` | 2026-08-11 live EDLDB table/column metadata | Sandbox candidate containing `NHO_RESOURCES`; the exact locker-question mapping is pending. |
| Quality 1:1 | `EDLDB.PEOPLE_ANALYTICS_SANDBOX.QUALITY_ONE_ON_ONE`; base `EDLDB.PEOPLE_ANALYTICS_SANDBOX.FULFILLMENT_QUALITY` | 2026-08-11 live EDLDB table/column metadata | Resolves the earlier HRDM-only name-search gap with a sandbox candidate. Completion denominator, owner, and production source remain pending. |
| LEWs | `EDLDB.PEOPLE_ANALYTICS_SANDBOX.FULFILLMENT_LEW` | 2026-08-11 live EDLDB table/column metadata | Sandbox candidate with date, location, HRBP, and manager fields. Completion denominator and production source remain pending. |
| CAT / ECHO / VOC | `EDLDB.PEOPLE_ANALYTICS_SANDBOX.CAT_TRACKER_SNAPSHOT`, `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ECHO_SNAPSHOT`, `EDLDB.PEOPLE_ANALYTICS_SANDBOX.VOC_BOARD` | 2026-08-11 live EDLDB table/column metadata | Sandbox candidates for CAT, Fishbowl, VOC, CoTM/LOP, Roundtables, and Swag discovery. Metric definitions and production certification remain open. |
| VET / VTO | `EDLDB.FULFILLMENT_OPTIMIZATION_SANDBOX.VET_VTO_INFO_ZEUS`; request detail `EDLDB.PEOPLE_ANALYTICS_SANDBOX.V_UKG_TIME_OFF_REQUESTS` | 2026-08-11 live EDLDB table/column metadata | Sandbox candidates; workbook no-match semantics and rating numerator are not confirmed. |
| Labor Planning | `EDLDB.FULFILLMENT_OPTIMIZATION_SANDBOX.SP_SNAP_ATTENDANCE_FCST_HR_METRICS`; Rx lead `EDLDB.FULFILLMENT_OPTIMIZATION_SANDBOX.RX_LABOR_PLAN_METRICS` | 2026-08-11 live EDLDB metadata | Sandbox-only candidates. The FC lead exposes actual/forecast attendance factors and absolute-error fields; FC/Rx coverage, business definition, owner, and production target remain pending. |

## Existing HR Analytics Pipelines

| Pipeline / source | Status | Evidence | Likely Fitness Check use |
|---|---|---|---|
| `hr_fulfillment_etl_0630` | Located | FC HR Analytics Documentation | HR Packet, roster snapshots, headcount, attendance, labor planning, terminations. |
| `hr_ukg_datamart` / `hr_datamart_people_snapshot` | Located | FC HR Analytics Documentation | Loads UKG `vpeople` to HRDM for terminations/headcount query support. |
| `hr_fulfillment_roster_health_0830` | Located | FC HR Analytics Documentation | Roster Health Assessment source; daily snapshot from CLMS, UKG, and Workday. |
| `hr_fulfillment_smartsheet_etl_0630` | Located | FC HR Analytics Documentation | ECHO and New Hire Survey Smartsheet ingestion. |
| CAT Tracker task | Located | FC HR Analytics Documentation | CAT Tracker, Roundtables, Sr. Team Engagements if later in scope, and WBR snapshot support. |
| VOC task | Located | FC HR Analytics Documentation | VOC Board Management, VOC response, VOC comments and sentiment inputs. |
| Stand Ups task | Located | FC HR Analytics Documentation | Standup Audits source candidate. |
| Week 3 Surveys / New Hire Surveys tasks | Located | FC HR Analytics Documentation | Locker Management and new hire experience signals if survey questions map cleanly. |
| VET Hourly / VTO Hourly tasks | Located | FC HR Analytics Documentation | VET/VTO form/sheet data. VTO is V1; VET is research. |
| `cat_tracker_snapshot` | Located | FC HR Analytics Documentation | Daily CAT snapshot for weekly WBR reporting, open/outstanding items, dwell time. |

## SharePoint Artifacts Located

| Artifact | Status | Location / URL | Useful facts |
|---|---|---|---|
| HR Standard Work Fitness Check SOP | Located | `https://chewycomllc.sharepoint.com/sites/OperationsHR/Shared Documents/HRM/HR Standard Work Fitness Check - SOP.pdf?web=1` | Confirms FC and Rx scope, quarterly cadence, HRM accountability, HRD review, Smartsheet folders, and archive practice. |
| ORBIT - HR Fitness Check Matrix.xlsx | Located | User OneDrive/SharePoint workbook URL; latest source copy verified at 2026-07-29 16:32:27 UTC | Source working evidence: 33 task rows, all marked `In Scope.`, with owner roles populated for all 33; its source-table, reviewer, and result fields were blank when fetched. A local derivative was mapped on 2026-08-11 with 19 candidate, 8 blocked, 4 manual/hybrid, 1 validated-object/rule-pending, and 1 derived disposition. SharePoint connector/version verification is still pending; do not describe the derivative as published to the live workbook. |
| Fulfillment Center & Pharmacy Human Resources Reporting Job Aid | Located | `https://chewycomllc.sharepoint.com/sites/OperationsHR/Shared Documents/HR Reports/Fulfillment Center & Pharmacy Human Resources Reporting Job Aid.pdf?web=1` | Lists HR Daily Packet, Roster Health, Site Summary, ECHO, VOC, New Hire Experience, OTMP, PAWS, and other report sources. |
| Chewy Locations.csv | Located | OperationsHR HR Reports / FC Reports | Site/location reference with location code, type, region, active flag, and ECHO/PLLC/STAND_UPS/LEW/QUALITY_ONE columns. Contact columns exist but should not be copied into this KB. |
| HR Daily Packet handbook page | Located | HR Reports / FC Reports / FC and Rx Reporting Handbook / `2 - HR Daily Packet.pdf` | Daily Tableau report with Summary, Attendance Detail, Labor Plan Attendance, REG-VET-MET Summary, Over 12 or 13 Hours, and other views. |
| Roster Health Dashboard handbook page | Located | HR Reports / FC Reports / FC and Rx Reporting Handbook / `4 - Roster Health Dashboard.pdf` | Daily Tableau report covering LOA unavailable, termination risk, missing schedule, CLMS, roster scrub, and raw data. |
| ECHO Dashboard handbook page | Located | HR Reports / FC Reports / FC and Rx Reporting Handbook / `7 - ECHO Dashboard.pdf` | Weekly Tableau report with ECHO completion percentages and six-week history. |
| VOC Dashboard handbook page | Located | HR Reports / FC Reports / FC and Rx Reporting Handbook / `14 - VOC Dashboard.pdf` | Weekly Tableau report for VOC sentiment, topic, ER risk, keyword, and response-time analysis. |
| New Hire Experience Survey Report handbook page | Located | HR Reports / FC Reports / FC and Rx Reporting Handbook / `10 - New Hire Experience Survey Report.pdf` | Daily Tableau report with NHO survey, Week 3 survey, survey completion, roster, and anonymous response data. |
| ServiceNow SOP | Located | OperationsHR / SNOW (Service Now) / Service Now (SNOW) - SOP.pdf | Defines SNOW case fields such as number, opened for, subject person, HR service, state, priority, source, opened date, assignment group, assigned to, watchlist, short description, description, and SLA. |
| SNOW Case & Task Management SOP | Located | OperationsHR / SNOW (Service Now) / SNOW Case & Task Management - SOP.pdf | Defines case/task dashboard behavior, assigned-to-me/groups/watchlists, group-by fields, task closure, and LOA worked-on-leave process. |
| UKG Pro reporting SOPs | Located | OperationsHR / UKG Pro / HR Resources | Confirms Dataview Library vs Report Library, scheduled reporting jobs, and HR report-request path. |
| UKG VET/VTO Management job aid | Located | OperationsHR / UKG Pro / HR Resources / UKG Pro - HR VET_VTO Management.pdf | Names UKG Dataview `0 - ST Time Off Requests Info VET/VTO` and filters for department, schedule, status, paycode, and schedule period. |
| UKG missed punches job aid | Located | OperationsHR / UKG Pro / HR Resources / How To Fix Missed Punches.pdf | Defines punch records and add/edit/delete workflow. |
| UKG schedule groups job aid | Located | OperationsHR / UKG Pro / HR Resources / Assigning and Removing Schedule Groups.pdf | Confirms Schedule Planner and schedule-group assignment logic. |
| FLO Certification SOP | Located | OperationsHR / HRA / Forklift Operator (FLO) Certification - SOP.pdf | Confirms site-specific FLO Smartsheet form, pending and completed sheets, Workday/Kronos verification, and HRBP audit mechanism. |
| Investigations SOP | Located | OperationsHR / Investigations / Investigations (Intake, Escalating, Document Management) - SOP.pdf | Confirms Workday Investigation Documents and Ethicspoint/OpenBark case-document logic. Highly sensitive; aggregate only after governance approval. |
| ECHO Program SOP | Located | OperationsHR / ECHO / ECHO Program - SOP.pdf | Defines CAT, Standup Audits, VOC Board response, monthly uploads, Fishbowl, Roundtables, and ECHO completion/accountability. |
| Roundtables SOP | Located | OperationsHR / ECHO / ECHO Items / Roundtables - SOP.pdf | Defines monthly TM roundtables, quarterly lead/manager roundtables, two extra quarterly roundtables, CAT follow-up audit, and facilitation controls. |
| HR Onboarding Heatmap.xlsx | Located | OperationsHR / Onboarding & Standard Work / Onboarding Heatmap | Training checklist source; useful for future Direct Onboarding research, not V1 automation source. |
| FC Ops Library TM Experience Roadmap | Located | `https://chewycomllc.sharepoint.com/sites/FCOpsLibraryofDocs/Shared Documents/2026 Roadmap/TM Experience Roadmap` | Post-2025 VOC Pulse action-planning hub. Useful as downstream action-loop evidence and recommendation-library context, not as direct Fitness Check scoring input. |
| 2025 VOC Pulse , Core FC Network Review.pdf | Located | FC Ops Library / 2026 Roadmap / TM Experience Roadmap | Baseline ECHO Intelligence report with 19,058 2025 listening signals across 13 active Core FC sites, site clusters, positive themes, opportunity themes, and candidate future success metrics. |
| 2026 TM Focus Areas.xlsx | Located | FC Ops Library / 2026 Roadmap / TM Experience Roadmap | Roadmap index workbook for focus areas, sponsor/owner metadata, TM feedback, and problem-to-solve framing. Owner names exist in source and are not copied into this KB. |
| VOC Pulse action workstream charters | Located | FC Ops Library / 2026 Roadmap / TM Experience Roadmap subfolders | Charters reviewed for Equipment, Facility Comfort and Housekeeping, Leader Presence, Recognition, Performance Management, Safety, VET/VTO Fairness, and X-Training Rotation. See `knowledge-base/voc-pulse-action-roadmap.md`. |

## SharePoint Gaps

| Source lead | Search result |
|---|---|
| 2025 Q3 HR Fitness Check / SW Quality Index / Fitness Assessment workbooks | Not located by exact SharePoint searches. Local workbook evidence remains the current source. |
| Workday Missing Beneficiary Report | Not located in SharePoint by exact or broad searches. Needs HRDM column/report discovery. |
| Workday Employee Emergency Contact Info report | Not located in SharePoint by exact or broad searches. Needs HRDM column/report discovery. |
| Talent Management Dashboard production mapping for Quality 1:1 and LEWs | The earlier HRDM-only search found no matching objects. The 2026-08-11 EDLDB refresh found sandbox candidates `QUALITY_ONE_ON_ONE`, `FULFILLMENT_QUALITY`, and `FULFILLMENT_LEW`; Tableau reconciliation, ownership, denominator logic, and a production-certified source remain open. |
