# Reviewed Checklist Disposition

Version: 0.4
Status: Working catalog, approval pending
Source workbook: ORBIT - HR Fitness Check Matrix.xlsx
SharePoint last modified: 2026-07-29 16:32:27 UTC
Local mapped derivative: ORBIT - HR Fitness Check Matrix.preserved.xlsx, generated 2026-08-11; SharePoint connector verification pending
Reviewed by: Repository research and live Snowflake metadata validation; workbook reviewer fields are blank
Last Updated: 2026-08-11

## Purpose

This file translates the latest available SharePoint workbook and the 2026-08-11 preservation-safe local mapped derivative into product-scope language. It is not an approved denominator, source-to-target map, or scoring contract. `In Scope.` means business intent only. Every item still requires stable identity, implementation mode, source or manual-evidence mapping, rating rules, named accountability, validation, and approval before production use.

The latest workbook supersedes the 49-row discovery snapshot and the June 30 38-row / 37-intent snapshot.

## Readiness Summary

| Attribute | Current finding |
|---|---|
| Working task rows | 33 |
| Rows marked in scope | 33 |
| Current owner role populated | 33 |
| Column F | `Resource to Check`; preserved from the July 29 SharePoint baseline and not the Snowflake mapping target |
| Draft Column G dispositions in local derivative | 33: 19 candidate; 8 blocked; 4 manual/hybrid; 1 validated-object/rule-pending; 1 derived |
| Production-approved source mappings | 0 |
| Reviewer populated | 0 |
| Result / fitness value populated | 0 |
| Approved production denominator | Not established |
| Approval status | Unfinished / approval pending |

The original July 29 SharePoint workbook has blank `Snowflake Table` values in Column G. The local derivative preserves workbook structure while recording draft mapping dispositions; many candidates are sandbox-only, and the file has not been connector-verified as published to SharePoint. `HR Metrics & Roster Health` also has no populated threshold. Slack updates on 2026-07-28 and 2026-08-04 described the matrix work as unfinished while backend work was beginning.

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

## Product Interpretation

- The MVP may display all 33 rows as a clearly labeled working catalog.
- Synthetic review data must never be presented as actual site performance.
- Missing, stale, blocked, manual-required, and unmapped evidence must not receive a red rating or enter the valid-rated denominator.
- Historical `Requires Aid` / `Actively Monitor` labels are not equivalent to current green/yellow/red ratings without an approved mapping or recast.
- Production reporting must publish catalog version, approval status, as-of time, numerator, denominator, metric definition version, and comparability status.
