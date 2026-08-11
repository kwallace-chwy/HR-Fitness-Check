# Snowflake Discovery Results

Status: Draft discovery results
Last updated: 2026-08-11

Identifier note: `V1-###` references below are legacy discovery IDs from the older 27-row snapshot. Use the crosswalk in `knowledge-base/ingestion-backlog.md`; do not use legacy or current draft IDs for production joins until the stable catalog is approved.

## Working Local Solution

Use the existing Workload Lens Python virtual environment and read-only query runner for `EDLDB` / `UKG` discovery:

- Python venv: `C:\Users\kwallace12\OneDrive - Chewy.com, LLC\Desktop\Codex ORBIT\Workload Lens\.venv`
- Query runner: `C:\Users\kwallace12\OneDrive - Chewy.com, LLC\Desktop\Codex ORBIT\Workload Lens\scripts\run_snowflake_query.py`
- Config: `C:\Users\kwallace12\OneDrive - Chewy.com, LLC\Desktop\Codex ORBIT\Workload Lens\config\snowflake.toml`

The config uses browser SSO through Okta. No credential value is stored in the Fitness Check repository.

Important boundary: HR DataMart is a different Snowflake environment/profile. The working Workload Lens config should be treated as the `EDLDB` / UKG profile, not as the HRDM connection.

## Confirmed Session Context

The smoke test succeeded with:

- Role: `PEOPLE_ANALYTICS_DEVELOPER`
- Warehouse: `PEOPLE_ANALYTICS_WH`
- Database: `EDLDB`
- Schema: `PEOPLE_ANALYTICS_SANDBOX`
- Secondary roles: `FULFILLMENT_OPTIMIZATION_DEVELOPER`, `OTH_USER`, `DBT_DEMO_DEVELOPER`

## Successful Metadata Outputs

| Output | Rows | Meaning |
|---|---:|---|
| `knowledge-base/discovery-output/snowflake_access_smoke_test.csv` | 1 | Confirms SSO and current role/warehouse/database/schema. |
| `knowledge-base/discovery-output/snowflake_role_context.csv` | 1 | Confirms active role and secondary-role state. |
| `knowledge-base/discovery-output/edldb_candidate_tables.csv` | 817 | Candidate EDLDB tables and views relevant to HR Fitness Check discovery. |
| `knowledge-base/discovery-output/ukg_candidate_columns.csv` | 618 | Candidate columns in `EDLDB.UKG` tables/views. |
| `knowledge-base/discovery-output/hrdm_access_smoke_test.csv` | 1 | Confirms HRDM SSO profile, role, warehouse, database, and schema context. |
| `knowledge-base/discovery-output/hrdm_schemas.csv` | 11 | Confirms accessible HRDM schemas. |
| `knowledge-base/discovery-output/hrdm_candidate_tables.csv` | 173 | Candidate HRDM tables/views relevant to Fitness Check discovery. |
| `knowledge-base/discovery-output/hrdm_candidate_columns.csv` | 1307 | Candidate HRDM columns by table/schema keyword search. |
| `knowledge-base/discovery-output/hrdm_key_object_columns.csv` | 879 | Full column inventory for priority roster and Workday objects. |
| `knowledge-base/discovery-output/hrdm_servicenow_candidate_tables.csv` | 0 | No HRDM tables matched expected ServiceNow case/task name patterns. |

The table above preserves the June 19 discovery baseline. A targeted live refresh was run on 2026-08-11 against both browser-SSO profiles using the same read-only runner. The refresh outputs are local work artifacts in `outputs/019ff1d5-e2d8-76b1-8f5b-ea0500b454ce/`; they have not been promoted into the maintained `knowledge-base/discovery-output/` baseline.

| 2026-08-11 query | Rows | Snowflake query ID | Purpose |
|---|---:|---|---|
| `edldb_hrfc_table_candidates.sql` | 3,206 | `01c652ca-071c-ed42-00a0-2d04d51ded47` | Broad EDLDB object-name discovery across HR Fitness Check source families. |
| `edldb_ukg_priority_columns.sql` | 710 | `01c652cb-071c-eb73-00a0-2d04d51eeba3` | Full columns for priority `EDLDB.UKG` people, schedule, timecard, and accrual objects. |
| `hrdm_hrfc_table_candidates.sql` | 101 | `01c652cc-0420-bdd7-0066-27031a10b762` | Targeted HRDM object-name discovery. |
| `hrdm_priority_columns.sql` | 1,066 | `01c652cc-0420-b7c9-0066-27031a1059f2` | Priority HRDM roster, Workday, badging, and keyword-matched columns. |
| `edldb_people_hrfc_columns.sql` | 738 | `01c652cf-071c-eb73-00a0-2d04d5224267` | Columns for HRFC-relevant `PEOPLE_ANALYTICS_SANDBOX` and fulfillment-optimization objects. |
| `edldb_labor_plan_columns.csv` local output | 103 | Not captured | Local sandbox labor-planning column inventory; the producing query ID was not retained. |
| `hrdm_servicenow_candidate_tables.sql` | 0 | `01c652c8-0420-b62d-0066-27031a1068ee` | Live confirmation that expected ServiceNow HR case/task names are not visible in the queried HRDM metadata. |

The EDLDB and HRDM session smoke tests also passed on 2026-08-11. No DML, DDL, record-level sampling, or source-system write was performed.

## 2026-08-11 Column-G Mapping Derivative

The July 29 SharePoint-sourced workbook copy still had a blank `Snowflake Table` column when fetched. The following is a local mapped derivative prepared from the live metadata results. It is pending SharePoint connector/version verification and is not evidence that the live workbook was updated. It is also not an approved catalog, production source map, or scoring contract.

Disposition counts across the 33 working rows:

| Disposition | Rows |
|---|---:|
| Candidate | 19 |
| Blocked | 8 |
| Manual/hybrid | 4 |
| Validated objects; rule pending | 1 |
| Derived | 1 |
| Approved for production or pilot | 0 |

`Validated objects; rule pending` means only that the named objects and relevant columns were confirmed in accessible metadata. It does not mean the source owner, joins, population, window, rating rule, freshness, access model, or production use is approved. Every object containing `SANDBOX` is a discovery candidate and must not be represented as production-certified.

| Workbook row | HR task | Disposition | Local column-G mapping or gap |
|---:|---|---|---|
| 2 | TM Experience Walk | Manual/hybrid | No Snowflake table found; source remains the TM Experience Walk Smartsheet. |
| 3 | Standup Audits | Candidate | Sandbox: `EDLDB.PEOPLE_ANALYTICS_SANDBOX.STAND_UP_AUDITS`; base `EDLDB.PEOPLE_ANALYTICS_SANDBOX.FULFILLMENT_STAND_UPS`. |
| 4 | New Hire Orientation | Blocked | CCURE DNS object not found; UKG-side candidate `EDLDB.UKG.GOLD_V_PEOPLE`. |
| 5 | HR Metrics & Roster Health | Blocked | Metric definition/threshold blocked; sandbox candidate `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ROSTER_HEALTH_SNAPSHOT`; roster reference `D_HRDATAMART.S_ANALYTICS.ROSTER_DAY_END`. |
| 6 | HR ServiceNow (SNOW) Tickets | Blocked | No ServiceNow HR case/task object found in live `D_HRDATAMART` metadata. |
| 7 | VET Process | Candidate | Sandbox `EDLDB.FULFILLMENT_OPTIMIZATION_SANDBOX.VET_VTO_INFO_ZEUS`; request detail `EDLDB.PEOPLE_ANALYTICS_SANDBOX.V_UKG_TIME_OFF_REQUESTS`. No-match semantics remain unconfirmed. |
| 8 | VTO Process | Candidate | Sandbox `EDLDB.FULFILLMENT_OPTIMIZATION_SANDBOX.VET_VTO_INFO_ZEUS`; request detail `EDLDB.PEOPLE_ANALYTICS_SANDBOX.V_UKG_TIME_OFF_REQUESTS`. No-match semantics remain unconfirmed. |
| 9 | Shift Transfers / Includes site-to-site transfers | Candidate | `EDLDB.UKG.GOLD_V_PEOPLE` plus `EDLDB.UKG.GOLD_V_SCHEDULE_SHIFT`; FC MET Scheduled mismatch rule pending. |
| 10 | FLO Certification management | Manual/hybrid | No Snowflake FLO tracker object found; Smartsheet/Workday/UKG reconciliation remains unvalidated. |
| 11 | Missing Time Stamps | Validated objects; rule pending | `EDLDB.UKG.GOLD_V_TIMECARD_EXCEPTION` plus `EDLDB.UKG.GOLD_V_TIMECARD_PUNCH`. Current-shift exclusion, grace period, site key, and rating logic remain unapproved. |
| 12 | Unscheduled but Working | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ROSTER_HEALTH_SNAPSHOT` has exact NSBW fields; UKG reference `EDLDB.UKG.GOLD_V_TIMECARD_WORK_SHIFT`. |
| 13 | 13h Day (or +1h over scheduled shift) Risk Assessment | Candidate | `EDLDB.UKG.GOLD_V_TIMECARD_WORK_SHIFT` (`SHIFT_TOTAL_HOURS`) plus `EDLDB.UKG.GOLD_V_SCHEDULE_SHIFT`. |
| 14 | 60h Week Risk Assessment | Candidate | `EDLDB.UKG.GOLD_V_TIMECARD_TOTAL` (`HOURS_AMOUNT`); week detail `EDLDB.UKG.GOLD_V_TIMECARD_TRANSACTION`. |
| 15 | Locker Management | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.NHE_SURVEYS` (`NHO_RESOURCES`); locker-question mapping pending. |
| 16 | Badge Management | Manual/hybrid | No badge-inventory table found. `D_HRDATAMART.S_ANALYTICS.EMPLOYEE_BADGING` is scan evidence, not badge stock. |
| 17 | Swag Management | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.VOC_BOARD`; taxonomy and text-scoring approval pending. |
| 18 | Audit schedule groups | Candidate | `EDLDB.UKG.GOLD_V_PEOPLE` (`SCHEDULE_GROUP`, `GROUP_SCHEDULE`) plus `EDLDB.UKG.GOLD_V_SCHEDULE_SHIFT`. |
| 19 | Review Temporary Schedule Adjustments | Blocked | Approved accommodations tracker is not in Snowflake; UKG-side candidates are `EDLDB.UKG.GOLD_V_PEOPLE` and `EDLDB.UKG.GOLD_V_SCHEDULE_SHIFT`. |
| 20 | Attendance Management | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ROSTER_HEALTH_SNAPSHOT`; no `BUBBLE` or `BUBBLE_PERCENT` field was found, so the Tableau calculation is pending. |
| 21 | Ensure site TMs have listed beneficiaries | Blocked | `D_HRDATAMART.S_WORKDAY.WD_DATAMARTFEED` supplies denominator context only; no beneficiary/enrollment field found. |
| 22 | Ensure site TMs have listed emergency contacts | Blocked | `D_HRDATAMART.S_WORKDAY.WD_DATAMARTFEED` supplies denominator context only; no emergency-contact field found. |
| 23 | Quality 1:1 | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.QUALITY_ONE_ON_ONE`; base `EDLDB.PEOPLE_ANALYTICS_SANDBOX.FULFILLMENT_QUALITY`. |
| 24 | LEWs | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.FULFILLMENT_LEW`; completion denominator pending. |
| 25 | Investigations | Blocked | No approved aggregate investigation/SLA object; governance and Legal approval required. |
| 26 | LOAA Management | Blocked | No ServiceNow SLA object found; `D_HRDATAMART.S_WORKDAY.WD_DATAMARTFEED` provides LOA cohort context only. |
| 27 | CAT Tracker | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.CAT_TRACKER_SNAPSHOT`. |
| 28 | Fishbowl Display | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ECHO_SNAPSHOT` has a `FISHBOWL` field. |
| 29 | VOC Board Management | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ECHO_SNAPSHOT` plus `EDLDB.PEOPLE_ANALYTICS_SANDBOX.VOC_BOARD`; scoring rule pending. |
| 30 | Roundtables | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ECHO_SNAPSHOT`; no explicit roundtable field found, so taxonomy/window remain pending. |
| 31 | Chewtopian of the Month/Leader of the Pack | Candidate | Sandbox `EDLDB.PEOPLE_ANALYTICS_SANDBOX.ECHO_SNAPSHOT` has `COTM` and `LOP` fields. |
| 32 | Audit exempt HR Standard Work | Derived | No external table; future Fitness Check result fact is not implemented. |
| 33 | Site communication & signage | Manual/hybrid | No Snowflake table found; source remains the TM Experience Walk Smartsheet. |
| 34 | Labor Planning | Candidate | Sandbox only: `EDLDB.FULFILLMENT_OPTIMIZATION_SANDBOX.SP_SNAP_ATTENDANCE_FCST_HR_METRICS` exposes actual/forecast attendance factors and error fields; Rx lead `EDLDB.FULFILLMENT_OPTIMIZATION_SANDBOX.RX_LABOR_PLAN_METRICS`. Metric definition, FC/Rx coverage, and production target remain pending. |

## UKG Objects Confirmed In Metadata

High-value `EDLDB.UKG` objects found:

- `GOLD_V_PEOPLE`
- `GOLD_V_PEOPLE_CUSTOM_DATA`
- `GOLD_V_PEOPLE_EMPLOYMENT_STATUS_BY_DATE`
- `GOLD_V_PEOPLE_EMPLOYMENT_TERM`
- `GOLD_V_TIMECARD_TOTAL`
- `GOLD_V_TIMECARD_TRANSACTION`
- `GOLD_V_TIMECARD_PUNCH`
- `GOLD_V_TIMECARD_EXCEPTION`
- `GOLD_V_TIMECARD_EXCEPTION_COMMENT`
- `GOLD_V_TIMECARD_DURATION_PAYCODE_EDIT`
- `GOLD_V_TIMECARD_DURATION_PAYCODE_EDIT_COMMENT`
- `GOLD_V_TIMECARD_WORK_SHIFT`
- `GOLD_V_SCHEDULE_SHIFT`
- `GOLD_V_SCHEDULE_TOTAL`
- `GOLD_V_SCHEDULE_TRANSACTION`
- `GOLD_V_ACCRUAL_BALANCE`
- `GOLD_V_ACCRUAL_BALANCE_SUMMARY`
- `GOLD_V_ACCRUAL_CODES`
- `GOLD_V_ACCRUAL_TRANSACTION`

View-layer equivalents also exist, including:

- `V_PEOPLE`
- `V_TIMECARD_TOTAL`
- `V_TIMECARD_TRANSACTION`
- `V_TIMECARD_PUNCH`
- `V_TIMECARD_EXCEPTION`
- `V_SCHEDULE_TOTAL`
- `V_SCHEDULE_TRANSACTION`
- `V_SCHEDULE_SHIFT`
- `V_ACCRUAL_BALANCE_SUMMARY`

## V1 Items This Unlocks First

These items can move from source family research into table/field mapping using the generated EDLDB/UKG metadata:

- V1-003 Missing Time Stamps
- V1-005 13h Report
- V1-006 60h Report
- V1-007 Lunch Punch review
- V1-015 VTO Process, if UKG is used for VTO request/action data
- V1-025 Audit schedule groups

These may also benefit indirectly:

- V1-004 Unscheduled, if Roster Health can be rebuilt from UKG schedule/worked-hour data
- V1-011 Attendance Management, if Bubble/attendance source logic is confirmed against UKG

## HRDM Profile Validation

The HR DataMart profile was created locally outside this repository and validated through browser SSO on 2026-06-19.

- Local HRDM config: `C:\Users\kwallace12\OneDrive - Chewy.com, LLC\Desktop\Codex ORBIT\Workload Lens\config\snowflake_hrdm.toml`
- Account/environment: `CHEWY-CHEWYHR`
- Role: `HRDATA_STANDARD_ROLE`
- Warehouse: `USERS_WH`
- Database: `D_HRDATAMART`
- Default schema: `S_ANALYTICS`
- Authenticator: `externalbrowser`

The first attempt using the short user value failed because the IdP session user differed from the configured Snowflake user. The config was corrected by copying the already-working SSO user identifier from the existing Workload Lens profile without printing it.

Accessible HRDM schemas found:

- `S_ADMIN`
- `S_ANALYTICS`
- `S_BRIDGE`
- `S_CORNERSTONE`
- `S_CURATED`
- `S_GREENHOUSE`
- `S_HYPERION`
- `S_LMS`
- `S_REFERENCE`
- `S_WORKDAY`

## HRDM Objects Confirmed In Metadata

High-value HRDM objects found for Fitness Check source mapping:

- `D_HRDATAMART.S_ANALYTICS.ROSTER_DAY_END`
- `D_HRDATAMART.S_ANALYTICS.ROSTER_WEEK_END`
- `D_HRDATAMART.S_ANALYTICS.ROSTER_PERIOD_END`
- `D_HRDATAMART.S_CURATED.ROSTER_WEEK_END`
- `D_HRDATAMART.S_CURATED.ROSTER_PERIOD_END`
- `D_HRDATAMART.S_WORKDAY.WD_DATAMARTFEED`
- `D_HRDATAMART.S_WORKDAY.WD_DATAMARTFEED_TRENDED`
- `D_HRDATAMART.S_WORKDAY.WORKDAY_TRENDED`
- `D_HRDATAMART.S_WORKDAY.V_WORKDAY_TRENDED`
- `D_HRDATAMART.S_ANALYTICS.WORKDAY_TRENDED_MANAGER_HIERARCHY`
- `D_HRDATAMART.S_WORKDAY.WD_LOCATION`
- `D_HRDATAMART.S_WORKDAY.WD_SECURITY`

## User-Discovered HRDM Object Lead

The 2026-07-07 MAIA missed-punch correction discovery added this HRDM source lead:

- `D_HRDATAMART.S_ANALYTICS.EMPLOYEE_BADGING`

Use case: directional badge IN/OUT scans by employee, site, and date for HRA-reviewed missed-punch recommendation research. This should be treated as corroborating evidence only. Badge scans are access events, not payroll punches, and must not drive autonomous UKG edits.

Useful LOA fields were found in Workday/roster objects:

- `LOA`
- `LOA_TYPE`
- `LOA_REFERENCE_ID`
- `LOA_FLAG`

## HRDM Gaps Found

The metadata search did not find obvious beneficiary, emergency-contact, dependent, or benefit-completeness fields in the broad HRDM column search or the priority object column inventory.

The HRDM ServiceNow search returned zero rows for expected table names and patterns such as `sn_hr_core_case`, `sn_hr_core_task`, `SNOW`, and HR case/task names. This means SNOW Tickets and LOAA Management still need a ServiceNow replication schema, alternate database, or source-owner confirmation.

No Talent Management table or column names matched obvious `LEW`, `Quality`, `One on One`, or `Talent` patterns in the searched **HRDM** schemas. The later cross-environment EDLDB refresh found sandbox candidates `EDLDB.PEOPLE_ANALYTICS_SANDBOX.QUALITY_ONE_ON_ONE`, `EDLDB.PEOPLE_ANALYTICS_SANDBOX.FULFILLMENT_QUALITY`, and `EDLDB.PEOPLE_ANALYTICS_SANDBOX.FULFILLMENT_LEW`. These resolve the earlier HRDM-only name-discovery gap, but they remain sandbox candidates pending owner confirmation, denominator/rule reconciliation, access review, and a production-certified source decision.

## V1 Items This Unlocks First

These items can now move from environment-blocked to table/field mapping:

- V1-004 Unscheduled, using HRDM roster objects with UKG/CLMS validation still required.
- V1-011 Attendance Management, using HRDM roster objects if Bubble/attendance logic maps there.
- V1-016 Ensure site TMs have listed beneficiaries, only after Workday/HRDM owner identifies the field/report because no obvious column was found by name.
- V1-017 Ensure site TMs have listed emergency contacts, only after Workday/HRDM owner identifies the field/report because no obvious column was found by name.

These remain blocked by missing source schema or governance:

- V1-001 SNOW Tickets.
- V1-002 LOAA Management.
- V1-026 Investigations.

Quality 1:1 and LEWs can now move into sandbox field/rule reconciliation using the EDLDB candidates above; they are not approved for scoring or production ingestion.
