# Reviewed Checklist Disposition

Version: 0.7
Status: Working catalog, approval pending
Source workbook: ORBIT - HR Fitness Check Matrix.xlsx
SharePoint last modified: 2026-07-29 16:32:27 UTC
Published workbook: ORBIT - HR Fitness Check Matrix.xlsx, item `01LYSC3QO2BT5B2GJIV5C3ZACT2RWFSRLV`, version `34.0`, 37,518 bytes, modified `2026-08-17T16:16:20Z`, verified 2026-08-17; includes `G2:G34` 33/33 exact and nonblank plus `Measure Contract`, `Cadence & Context`, and `Product Readiness` sheets with 19 gates; `quarterly_fitness_check` and `annual_summary` are present and legacy `quarterly_audit` is absent
Reviewed by: Repository research, live Snowflake metadata validation, and governed external-source discovery; workbook reviewer fields are blank
Last Updated: 2026-08-17

## Purpose

This file translates the current original SharePoint workbook, including the source-integrated Column G mapping published on 2026-08-13, into product-scope language. It is not an approved denominator, source-to-target map, scoring contract, monthly reporting contract, or Quarterly Fitness Check certification record. `In Scope.` means business intent only. Every item still requires stable identity, C03-C06 control mapping, implementation mode, source or manual-evidence mapping, measure definition, monthly and quarterly construction rules, named accountability, validation, and approval before production use.

The latest workbook supersedes the 49-row discovery snapshot and the June 30 38-row / 37-intent snapshot.

## Readiness Summary

| Attribute | Current finding |
|---|---|
| Working task rows | 33 |
| Rows marked in scope | 33 |
| Current owner role populated | 33 |
| Column F | `Resource to Check`; preserved from the July 29 SharePoint baseline and not the Snowflake mapping target |
| Draft Column G dispositions in published original workbook | 33: 21 candidate, including 2 external governed-source candidates; 5 blocked; 5 manual/hybrid; 1 validated-object/rule-pending; 1 derived |
| Sandbox-dependent candidates | 15 |
| Production-approved source mappings | 0 |
| Reviewer populated | 0 |
| Result / fitness value populated | 0 |
| Approved monthly-enabled measures | 0 |
| Approved monthly construction rules | 0 |
| Approved quarterly construction rules | 0 |
| Approved Quarterly Fitness Check measures | 0 |
| Approved production denominator | Not established |
| Approval status | Unfinished / approval pending |

The exact original SharePoint workbook now records 33/33 draft mapping dispositions in Column G. Post-write verification on 2026-08-17 of item `01LYSC3QO2BT5B2GJIV5C3ZACT2RWFSRLV`, version `34.0`, modified `2026-08-17T16:16:20Z`, and 37,518 bytes confirmed `G2:G34` as 33/33 exact and nonblank and the addition of `Measure Contract`, `Cadence & Context`, and `Product Readiness` sheets with 19 gates. `quarterly_fitness_check` and `annual_summary` are present and legacy `quarterly_audit` is absent. Fifteen candidates remain sandbox-dependent, two are governed external-source candidates, and zero mappings, measure/cadence contracts, rules, or release gates are production-approved. `HR Metrics & Roster Health` also has no populated threshold. Slack updates on 2026-07-28 and 2026-08-04 described the matrix work as unfinished while backend work was beginning.

The Monthly Progress Check and Quarterly Fitness Check operating model does not change those readiness counts. It adds approval requirements to every production measure. Column G is still a discovery disposition, not permission to score a measure monthly or place a Quarterly Fitness Check result in certified state.

## Current Working Catalog

Draft IDs are repository references only. They are not approved durable `sw_item_id` values.

| Draft ID | Current owner role | HR task |
|---|---|---|
| A-001 | HRA | TM Experience Walk |
| A-002 | HRA | Standup Audits |
| A-003 | HRA | New Hire Orientation |
| A-004 | HRA | HR Metrics & Roster Health |
| A-005 | HRA | HR ServiceNow (SNOW) Tickets |
| A-006 | HRA | VET Process |
| A-007 | HRA | VTO Process |
| A-008 | HRA | Shift Transfers / Includes site-to-site transfers |
| A-009 | HRA | FLO Certification management |
| A-010 | HRA | Missing Time Stamps |
| A-011 | HRA | Unscheduled but Working |
| A-012 | HRA | 13h Day (or +1h over scheduled shift) Risk Assessment |
| A-013 | HRA | 60h Week Risk Assessment |
| A-014 | HRA | Locker Management |
| A-015 | HRA | Badge Management |
| A-016 | HRA | Swag Management |
| A-017 | HRA | Audit schedule groups |
| A-018 | HRA | Review Temporary Schedule Adjustments |
| A-019 | HRBP | Attendance Management |
| A-020 | HRBP | Ensure site TMs have listed beneficiaries |
| A-021 | HRBP | Ensure site TMs have listed emergency contacts |
| A-022 | HRBP | Quality 1:1 |
| A-023 | HRBP | LEWs |
| A-024 | HRBP | Investigations |
| A-025 | HRG | LOAA Management |
| A-026 | HRM | CAT Tracker |
| A-027 | HRM | Fishbowl Display |
| A-028 | HRM | VOC Board Management |
| A-029 | HRM | Roundtables |
| A-030 | HRM | Chewtopian of the Month/Leader of the Pack |
| A-031 | HRM | Audit exempt HR Standard Work |
| A-032 | HRM | Site communication & signage |
| A-033 | HRM | Labor Planning |

Owner-role distribution: HRA 18, HRBP 6, HRG 1, HRM 8.

## Reconciliation With June 30

Five rows from the June 30 snapshot are absent from the July 29 working catalog:

| Prior disposition | HR task |
|---|---|
| Remove | Inspect HR/support office workspaces |
| In scope intent | Review and answer VOC board daily (with GM) |
| In scope intent | Prepare Ops training/development (such as in AMMs) |
| In scope intent | Monthly Engagement Calendar |
| In scope intent | HR Floor Engagement & Follow-Ups |

Absence is not interpreted as an approved removal decision. The catalog owner must confirm whether these rows were intentionally retired, consolidated, or omitted.

## Production Measure Contract Required

The spreadsheet may remain the human-readable planning view, but each row must become a governed machine-readable measure contract before it is used in a Monthly Progress Check or Quarterly Fitness Check. At minimum, each contract must define:

- Stable `sw_item_id` and the applicable C03-C06 control ID.
- FC, Rx, site, role, and effective-date applicability.
- Accountable business owner, source owner, rule approver, reviewer role, and quarterly certifier.
- Automated, hybrid, manual, or deferred implementation mode.
- Measure type, unit, direction, population, numerator, denominator, exclusions, sample-selection method, and minimum evidence.
- Complete, non-overlapping green/yellow/red rules and separate missing, stale, disputed, blocked, not-applicable, and calculation-error behavior.
- Exact source system, production object/API/report, fields, filters, joins, site key, date field, evidence window, freshness SLA, lineage, access, privacy class, and retention.
- Monthly eligibility and approved monthly construction method, or an explicit `quarterly_only` status.
- Approved quarterly construction method, evidence freeze, reconciliation, required manual-review, sign-off, and recast behavior.
- Comparability rules for month-over-month, certified-Quarterly-Fitness-Check-to-current-month, and quarter-over-quarter analysis.
- Rule, source, catalog, and measure versions with effective dates, examples, test cases, and approval records.

Approved run types must remain distinct:

| Run type | Purpose | Authority |
|---|---|---|
| Monthly Progress Check | Identify movement, open actions, evidence gaps, relevant attributed context, and risks before the next Quarterly Fitness Check. | Provisional operational report. |
| Quarterly Fitness Check (`quarterly_fitness_check`) | Produce the formal quarterly C03-C06 Standard Work result. | The result reaches certified state only after frozen configuration, required evidence/review, reconciliation, and authorized sign-off. |
| On-Demand Preview | Answer an authorized user's current or month-to-date question. | Draft; never certified. |
| Historical Recast | Recalculate an earlier period after an approved change or correction. | New version; never overwrites prior history. |

The Annual Fitness Check Report is a summary/report derived from certified Quarterly Fitness Checks. It is not a fifth scoring run; a year-to-date version must identify any missing or uncertified quarter.

Monthly colors must not be averaged into a quarterly result unless a measure-specific approved construction rule explicitly requires that method. A user-provided operational explanation, evidence dispute, or source-change statement also remains separate from the measure contract: the agent may use confirmed context in a narrative or route a proposal, but it may not change the result, rule, or source mapping without the required approval workflow.

## Required Decisions

| Decision ID | Decision needed | Recommended owner |
|---|---|---|
| DEC-001 | Approve the effective V1 catalog and explain the five absent rows. | Kenny / Weipan / Ashley |
| DEC-002 | Assign durable stable IDs and effective dates. | Product / Data Engineering |
| DEC-003 | Confirm owner roles and named accountable owners. | Weipan |
| DEC-004 | Classify every approved row as automated, hybrid, manual, or deferred. | Product / Data Engineering / Process Owner |
| DEC-005 | Approve source object, fields, site key, window, freshness, owner, and lineage for automated rows. | Data Engineering / Source Owners |
| DEC-006 | Approve evidence workflow for physical, visual, interview, and local-tracker checks. | Product / Phoenix / HR Operations |
| DEC-007 | Approve executable rating rules, including missing-data treatment and `HR Metrics & Roster Health` thresholds. | Process Owner / Data Governance |
| DEC-008 | Approve site hierarchy, access model, historical recast, and comparison policy. | HR Operations / Security / Data Governance |
| DEC-009 | Approve each measure's C03-C06 mapping, measure type, population, numerator/denominator, exclusions, and complete non-overlapping rating boundaries. | Weipan / Product / Data / QA |
| DEC-010 | Approve monthly eligibility, monthly construction, quarterly construction, evidence-window, certification, and comparability rules for every measure. | Weipan / Data / Regional HR / QA |
| DEC-011 | Approve evidence-dispute and source/process-change workflows so user feedback creates a routed proposal without silently changing scoring. | Data / Source Owners / Product / Governance |
| DEC-012 | Approve the context taxonomy, allowed uses, access scope, verification, effective dates, expiration, correction/retraction, retention, and audit-trail requirements. | Product / HR Operations / Privacy / Legal / Security |

## Product Interpretation

- The MVP may display all 33 rows as a clearly labeled working catalog.
- Synthetic review data must never be presented as actual site performance.
- Missing, stale, blocked, manual-required, and unmapped evidence must not receive a red rating or enter the valid-rated denominator.
- Historical `Requires Aid` / `Actively Monitor` labels are not equivalent to current green/yellow/red ratings without an approved mapping or recast.
- Monthly Progress Checks must be labeled provisional; On-Demand Previews must be labeled draft; Historical Recasts must preserve prior versions; only a Quarterly Fitness Check result that completes the certification workflow may become the official quarterly record. Annual reporting must derive from certified quarterly results and cannot create another score.
- Production reporting must publish run type, certification state, catalog/rule/source versions, approval status, evidence window, as-of time, numerator, denominator, metric definition version, evidence coverage, and comparability status.
- System findings, user-provided context, model interpretation, and recommendations must remain visibly distinct. Confirmed context may improve a narrative or recommendation, but it may not change deterministic scoring or the approved evidence contract.
