# Research Log

Status: Draft discovery log
Last updated: 2026-08-13

## Original Workbook Publication Verification - 2026-08-13

- Published the source-integrated Column G mapping to the exact original SharePoint workbook, not only to an intermediate derivative.
- Recorded the initial Column G publication checkpoint on the same drive item `01LYSC3QO2BT5B2GJIV5C3ZACT2RWFSRLV`, filename `ORBIT - HR Fitness Check Matrix.xlsx`, sourcedoc `{1DFA0CDA-2819-45AF-BC80-53D46C594575}`, version `30.0`, last modified `2026-08-13T19:44:43Z`, size 17,144 bytes.
- Re-read the current workbook after the product-contract extension: version `34.0`, last modified `2026-08-17T16:16:20Z`, size 37,518 bytes. It preserves `G2:G34` as 33/33 exact and nonblank and adds `Measure Contract`, `Cadence & Context`, and `Product Readiness` with 19 gates. Content verification confirms `quarterly_fitness_check` and `annual_summary` are present and legacy `quarterly_audit` is absent; publication does not approve those contracts or gates.
- Verified `G2:G34` as 33/33 nonblank and 33/33 exact matches to the publication manifest.
- Preserved the source-readiness totals: 21 candidate, including 2 external governed-source candidates; 5 blocked; 5 manual/hybrid; 1 validated-object/rule-pending; 1 derived; and 0 production-approved.
- Publication and exact manifest matching prove workbook synchronization only. They do not approve a production denominator, source contract, scoring rule, access model, or runtime connector.

## Source-Integrated Reconciliation - 2026-08-12 (superseded publication checkpoint)

- Published and version-verified an intermediate 33-row Column G derivative in OneDrive/SharePoint. That checkpoint was superseded on 2026-08-13 when the exact original workbook was updated and verified.
- Reconciled dispositions to 21 candidate, including 2 external governed-source candidates; 5 blocked; 5 manual/hybrid; 1 validated-object/rule-pending; 1 derived; and 0 production-approved. Fifteen candidates remain sandbox-dependent.
- Ran the EDLDB deep gap metadata query, which returned 3,249 rows under query ID `01c65a14-071c-f099-00a0-2d04da237b03`.
- Preserved the HRDM deep-column output at `outputs/019ff1d5-e2d8-76b1-8f5b-ea0500b454ce/hrdm_gap_deep_columns.csv` with 399 rows. No producing query ID was retained, so none is claimed.
- Confirmed that the deeper Snowflake search did not surface production-grade objects for the unresolved ServiceNow, LOAA, beneficiary, emergency-contact, investigation, FLO, locker, badge-inventory, TM Experience, or signage requirements.
- Located an EPA weekly ServiceNow resolved-case export with fields relevant to SNOW and LOAA. Both rows are now external governed-source candidates, but production scoring remains blocked until complete/open-case coverage, cadence, site mapping, and service-specific SLA rules are approved.
- Located authoritative site Smartsheet workflows for FLO and temporary schedules through current SOPs; current site SharePoint locker examples; Workday report paths for beneficiary and emergency-contact checks; and EthicsPoint/OpenBark governance paths for investigations.
- Located a future TM Experience/Signage Microsoft Forms data contract, but did not verify a live deployed response source. Badge inventory remains manual because the located Badge Reprint App and CCURE artifacts do not represent consumable inventory.

These findings distinguish a located source lead from an approved production mapping. No catalog, source contract, scoring rule, privacy treatment, or access approval was granted by this discovery pass.

## Current Reconciliation - 2026-08-11

- The latest verified SharePoint workbook copy was last modified 2026-07-29 16:32:27 UTC.
- Its working catalog contains 33 task rows, all marked `In Scope.`, with owner roles populated for all 33.
- The SharePoint source workbook's source-table, reviewer, and result fields were blank when fetched. A local mapped derivative was prepared on 2026-08-11, but SharePoint connector/version verification is pending; no live publication claim is made.
- The local derivative classifies the 33 rows as 19 candidate, 8 blocked, 4 manual/hybrid, 1 validated-object/rule-pending, and 1 derived. Zero rows are approved for pilot or production. Stable IDs, implementation modes, source contracts, and rating rules remain unapproved, and `HR Metrics & Roster Health` still has no approved threshold.
- Five June 30 rows are absent. Absence is not interpreted as an approved removal, consolidation, or retirement decision.
- Confluence PRD page `5006537577` was re-verified on 2026-08-10 at version 15 with the reconciled 33-row and synthetic/read-only MVP boundaries.
- The local MVP is a review-only, read-only application using synthetic fixture results. It does not connect to production HR systems or approve a scoring denominator.

The dated sections below preserve what was known during the June 30 through July 7 discovery work. References to the "latest" workbook, blank owner fields, Confluence version 14, or a required PRD replacement are historical statements and must not be treated as current.

## Targeted Snowflake Refresh - 2026-08-11

Actions completed:

- Revalidated the separate EDLDB and HRDM browser-SSO profiles using the read-only query runner.
- Ran targeted object and column discovery for UKG, People Analytics sandbox, fulfillment sandbox, HRDM roster/Workday, ServiceNow names, surveys, ECHO/CAT/VOC, Talent Management candidates, and labor planning.
- At this superseded 2026-08-11 checkpoint, matched the accessible metadata to all 33 working workbook task names and created a local Column-G derivative; the exact original workbook was subsequently published and verified on 2026-08-13.
- Ran metadata queries only. No DML, DDL, record-level sampling, source-system write, credential change, or live SharePoint update was performed.

Results:

| Query | Rows | Snowflake query ID |
|---|---:|---|
| EDLDB HRFC table candidates | 3,206 | `01c652ca-071c-ed42-00a0-2d04d51ded47` |
| EDLDB UKG priority columns | 710 | `01c652cb-071c-eb73-00a0-2d04d51eeba3` |
| HRDM HRFC table candidates | 101 | `01c652cc-0420-bdd7-0066-27031a10b762` |
| HRDM priority columns | 1,066 | `01c652cc-0420-b7c9-0066-27031a1059f2` |
| EDLDB People Analytics HRFC columns | 738 | `01c652cf-071c-eb73-00a0-2d04d5224267` |
| Local EDLDB labor-plan column output | 103 | Not captured; producing query ID was not retained |
| HRDM ServiceNow candidate names | 0 | `01c652c8-0420-b62d-0066-27031a1068ee` |

Key findings:

- `EDLDB.UKG.GOLD_V_TIMECARD_EXCEPTION` and `EDLDB.UKG.GOLD_V_TIMECARD_PUNCH` contain the relevant Missing Time Stamps object/column evidence. This is the single `validated objects; rule pending` row; the executable rule and source contract remain unapproved.
- EDLDB sandbox candidates were found for Roster Health, Standup Audits, New Hire surveys, Quality 1:1, LEWs, CAT, ECHO, VOC, VET/VTO, and Labor Planning. Sandbox discovery is not production certification.
- The HRDM-only no-match for Quality 1:1 and LEWs is now qualified: HRDM did not expose obvious names, but EDLDB sandbox objects `QUALITY_ONE_ON_ONE`, `FULFILLMENT_QUALITY`, and `FULFILLMENT_LEW` were found later.
- No ServiceNow HR case/task object was found in the live HRDM name search. Beneficiary and emergency-contact fields also remain undiscovered.
- `D_HRDATAMART.S_ANALYTICS.EMPLOYEE_BADGING` is badge-scan evidence, not badge inventory and not a payroll punch source.
- The local mapped workbook derivative remains pending connector/version verification and source-owner review.

## Historical Discovery Log - June 30 Through July 7

Actions completed:

- Confirmed the user-provided GitHub repository `https://github.com/kwallace-chwy/HR-Fitness-Check` matches the local HEAD, then realigned local `origin` to that canonical repository.
- Prepared a repo-aligned replacement body for Confluence page `5006537577`.
- Verified through the Atlassian connector that the live Confluence page still contains stale May 2026 PRD content and requires replacement from the repo copy.
- Read the reviewed workbook content via SharePoint and local workbook inspection.
- Confirmed reviewed workbook gaps: blank Snowflake table, current owner, and reviewer cells.
- Created draft PRD and reviewed checklist disposition docs.

June 30 audit-sheet output, superseded by the July 29 working copy:

- SharePoint workbook version 22.0, last modified 2026-06-30 14:43:58 UTC.
- 38 task rows.
- 37 in-scope intent rows.
- 1 remove/out-of-scope row.
- 0 explicit research, future, or manual/physical status rows in the latest sheet.
- Current Owner, Snowflake Table, Reviewer(s), and Fitness Level are blank for all 38 task rows.

## Local Snowflake Capability Check

Actions completed:

- Checked for `snow` CLI.
- Checked for `snowsql`.
- Checked environment variable names matching Snowflake patterns without printing secret values.
- Checked bundled Python for `snowflake.connector` and Snowpark packages.
- Located the prior Workload Lens Python virtual environment and Snowflake SSO config.
- Verified that the Workload Lens venv has `snowflake.connector` installed.
- Ran a Snowflake browser SSO smoke test through the existing Workload Lens query runner.
- Ran `EDLDB` and `EDLDB.UKG` metadata discovery queries.
- Tested `D_HRDATAMART` through the working Workload Lens `EDLDB` profile and searched locally for a separate HRDM profile.
- Created a separate local HRDM Snowflake profile outside this repository using approved browser SSO values.
- Ran HRDM smoke test, schema inventory, candidate table search, candidate column search, ServiceNow table-name search, and priority object column inventory.
- Captured 2026-07-07 user discovery for MAIA missed-punch correction research using UKG Dataview 965, individual UKG timecards, and HRDM `D_HRDATAMART.S_ANALYTICS.EMPLOYEE_BADGING` directional badge scans.

Result:

- Existing Python + SSO access works through the Workload Lens project.
- Current active role is `PEOPLE_ANALYTICS_DEVELOPER`.
- Current active database is `EDLDB`.
- Current secondary roles include `FULFILLMENT_OPTIMIZATION_DEVELOPER`, `OTH_USER`, and `DBT_DEMO_DEVELOPER`.
- `EDLDB` candidate table discovery succeeded with 817 metadata rows.
- `EDLDB.UKG` candidate column discovery succeeded with 618 metadata rows.
- HR DataMart is a different Snowflake environment/profile from the working Workload Lens `EDLDB` profile.
- HRDM SSO profile is now validated for `D_HRDATAMART` metadata discovery.
- HRDM schema discovery succeeded with 11 metadata rows.
- HRDM candidate table discovery succeeded with 173 metadata rows.
- HRDM candidate column discovery succeeded with 1307 metadata rows.
- HRDM priority object column inventory succeeded with 879 metadata rows.
- HRDM ServiceNow table-name search returned zero expected case/task table matches.
- HRDM employee badge scan source lead is now documented as a candidate corroborating source for HRA-reviewed missed-punch recommendations.
- First-pass HRDM metadata did not find obvious beneficiary, emergency-contact, dependent, benefit-completeness, Quality 1:1, LEW, or Talent table/field names. The later EDLDB refresh found Quality 1:1 and LEW sandbox candidates; the historical statement remains true only for HRDM.
- The connector warns that `keyring` is not installed, causing repeated browser SSO prompts.

## SharePoint Searches And Fetches

Located:

- ORBIT - HR Fitness Check Matrix.xlsx.
- HR Standard Work Fitness Check SOP.
- ORBIT intake form.
- HR SW Fitness Check historical planning document.
- Fulfillment Center & Pharmacy Human Resources Reporting Job Aid.
- Chewy Locations.csv.
- HR Daily Packet handbook.
- Roster Health Dashboard handbook.
- ECHO Dashboard handbook.
- VOC Dashboard handbook.
- New Hire Experience Survey Report handbook.
- ServiceNow SOP.
- SNOW Case & Task Management SOP.
- UKG Standard Reporting and Dataview/Report Library SOPs.
- UKG VET/VTO Management job aid.
- UKG missed punch job aid.
- UKG schedule group job aid.
- FLO Certification SOP.
- Investigations SOP.
- ECHO Program SOP.
- Roundtables SOP.
- HR Onboarding Heatmap workbook.
- FC Ops Library of Docs / 2026 Roadmap / TM Experience Roadmap folder.
- `2025 VOC Pulse , Core FC Network Review.pdf`.
- `2026 TM Focus Areas.xlsx`.
- VOC Pulse action workstream charters for Equipment, Facility Comfort and Housekeeping, Leader Presence, Recognition, Performance Management, Safety, VET/VTO Fairness, and X-Training Rotation.

Key TM Experience roadmap finding:

- The new FC Ops Library source is a post-2025 VOC Pulse action-planning hub. It should be treated as downstream action-loop evidence and recommendation-library context rather than primary Fitness Check scoring data. It links VOC themes to 2026 workstreams, pilot controls, playbooks, SOPs, and candidate metrics for future reporting.

Not located by SharePoint search:

- 2025 Q3 HR Fitness Check workbook by exact name.
- 2025 Q3 SW Quality Index workbook by exact name.
- 2025 Q3 Fitness Assessment workbook by exact name.
- Workday Missing Beneficiary Report by exact name.
- Workday Employee Emergency Contact Info report by exact name.
- Field-level Talent Management Dashboard mapping for Quality 1:1 and LEWs.

## Atlassian / Rovo Searches And Fetches

Located:

- Existing HR Fitness Check Confluence PRD page.
- ORBIT Program Home Page.
- Jira FCA-333 HR Engagement Tracking: Tableau request for FC-HRE, VOC, and Stand Up Audits from HR engagement SharePoint with daily refresh and 30-day timeframe.
- FC HR Analytics Documentation.
- Roster Health Assessment technical documentation.
- EDS - UKG Pro Data Ingestion into Snowflake.
- UKG Data Pipeline.
- ServiceNow Data Replication into HR DataMart.
- ServiceNow Data Ingestion Progress.
- EPA - HR Datamart (Snowflake) Overview.
- HRDM Workday pipeline documentation.
- EPA Team Product Inventory.
- Jira issue reference for LEW/Quality 1:1 dashboard update.

Important source leads:

- `https://github.com/Chewy-Inc/fc_hr_analytics`
- `D_HRDATAMART.S_ANALYTICS`
- `D_HRDATAMART.S_WORKDAY`
- `EDLDB.UKG`
- `EDLDB.UKG.GOLD_V_TIMECARD_TOTAL`
- `EDLDB.UKG.GOLD_V_TIMECARD_TRANSACTION`
- `EDLDB.UKG.GOLD_V_SCHEDULE_TOTAL`
- `EDLDB.UKG.GOLD_V_SCHEDULE_TRANSACTION`
- `EDLDB.UKG.GOLD_V_ACCRUAL_BALANCE_SUMMARY`
- `sn_hr_core_case`
- `sn_hr_core_task`
- `hr_fulfillment_etl_0630`
- `hr_fulfillment_roster_health_0830`
- `hr_fulfillment_smartsheet_etl_0630`
- `cat_tracker_snapshot`

GitHub access check:

- Read-only `git ls-remote` against `https://github.com/Chewy-Inc/fc_hr_analytics.git` returned repository not found from this local context. Treat the repo as a located lead with access blocked until Chewy GitHub permissions are confirmed.

Snowflake output files created:

- `knowledge-base/discovery-output/snowflake_access_smoke_test.csv`
- `knowledge-base/discovery-output/snowflake_role_context.csv`
- `knowledge-base/discovery-output/edldb_candidate_tables.csv`
- `knowledge-base/discovery-output/ukg_candidate_columns.csv`
- `knowledge-base/discovery-output/hrdm_access_smoke_test.csv`
- `knowledge-base/discovery-output/hrdm_schemas.csv`
- `knowledge-base/discovery-output/hrdm_candidate_tables.csv`
- `knowledge-base/discovery-output/hrdm_candidate_columns.csv`
- `knowledge-base/discovery-output/hrdm_key_object_columns.csv`
- `knowledge-base/discovery-output/hrdm_servicenow_candidate_tables.csv`

The 2026-08-11 refresh outputs are local work artifacts under `outputs/019ff1d5-e2d8-76b1-8f5b-ea0500b454ce/` and have not yet replaced the maintained discovery-output baseline.

## Privacy And Sensitive-Data Handling Notes

The research surfaced some source content that may include direct contacts, case details, employee-level fields, or credential-adjacent material. This knowledge base intentionally does not copy personal contact values, credentials, passcodes, raw employee data, case narratives, or work notes.

Use source docs for context, but perform ingestion work only through approved governed access paths.

## Next Research Actions

1. Install Snowflake connector secure local storage in the existing Workload Lens venv if repeated browser prompts become disruptive.
2. Reconcile the 21 candidate mappings to source owners, Tableau definitions, and production-certified objects or governed external-source contracts; do not promote sandbox names or discovery exports directly into scoring contracts.
3. Confirm UKG Dataview 965 name, owner, field list, filters, and intended missed-punch use.
4. Run the HRDM employee badging SQL seed for BNA1, DFW8, SDF2, and SDF4 and compare against a labelled HRA sample.
5. Ask Workday report owners to approve the exact beneficiary and emergency-contact report/RaaS fields, privacy-minimized outputs, filters, cadence, and reconciliation samples; HRDM deep discovery did not reveal the required columns.
6. Replace the weekly EPA ServiceNow resolved-case discovery export with an approved complete/open-case production contract, then confirm site keys, service crosswalks, pause logic, and SLA denominators for SNOW and LOAA.
7. Confirm whether the FC HR Analytics GitHub repo is accessible and inspect source SQL for the HR Packet, Roster Health, ECHO, CAT, VOC, and survey pipelines.
8. Ask EPA/Talent Management owners to validate the discovered sandbox Quality 1:1 and LEW objects, completion denominators, Tableau reconciliation, and production targets.
9. Ask Governance/Legal whether Investigations can be measured using aggregate SLA metadata only.
10. Re-read the exact original SharePoint item after every approved workbook update and require a full `G2:G34` manifest match before representing it as synchronized; synchronization does not confer production approval.
11. Confirm live deployment, response storage, coverage, ownership, and approval for the TM Experience/Signage Forms contract before using it as scoring evidence.
