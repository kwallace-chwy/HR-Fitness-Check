# HR Fitness Check Source Registry

Version: 0.4
Status: Draft source registry
Last updated: 2026-08-11

## Purpose

This registry turns discovered source leads and planned write targets into governed candidates. No source or write target is ingestion- or action-ready until owner, steward, classification, audience, workflow scope, freshness, retention, citation, access, approval, correction, and rollback records are complete.

This file complements:

- `knowledge-base/source-inventory.md`
- `knowledge-base/ingestion-backlog.md`
- `knowledge-base/snowflake-discovery-results.md`
- `knowledge-base/research-log.md`

## Registry Status Legend

| Status | Meaning |
| --- | --- |
| Draft | Source family is captured but not approved. |
| Candidate | Source appears useful but owner, mapping, or access is incomplete. |
| Blocked | Access, governance, schema, or source-owner confirmation blocks use. |
| Approved for pilot | Source owner and governance approvals are recorded for pilot scope. |
| Disabled | Source must not be retrieved or indexed. |
| Retired | Source is no longer active for Fitness Check. |

## Source Registry

| Source ID | Title | System | Owner | Steward | Classification | Allowed audiences | Allowed workflows | Freshness SLA | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `src.hrfc.catalog.reviewed_matrix.v1` | Reviewed HR Fitness Check matrix | Excel / SharePoint / local workbook evidence | Kenny Wallace / Weipan Le | ORBIT product | Internal, review required | Product, process owner, data engineering | Catalog readiness, source mapping, scoring design | Review per scope decision | Candidate; 33-row July 29 working catalog, approval pending |
| `src.hrfc.prd.github.v1` | GitHub PRD and repo docs | GitHub | ORBIT product | ORBIT product | Internal | Product, engineering, governance, Confluence publishers | Requirements, publishing, capability governance | On commit | Candidate |
| `src.hrfc.ukg.edldb.v1` | UKG Pro Snowflake objects | EDLDB.UKG | TBD UKG/data owner | Data engineering | Confidential until classified | Approved HR/data users | UKG-derived metrics | TBD by object | Candidate |
| `src.hrfc.hrdm.workday.v1` | Workday HRDM roster and worker objects | D_HRDATAMART | TBD HRDM/Workday owner | Data engineering | Confidential / regulated review | Approved HR/data users | Workday-derived aggregate metrics | TBD by object | Candidate |
| `src.hrfc.hrdm.employee_badging.v1` | HRDM employee badge scan records | D_HRDATAMART.S_ANALYTICS.EMPLOYEE_BADGING | TBD HRDM/badging owner | Data engineering | Restricted / associate-level time and access data review | Approved HR/data users only | Badge Management source-feasibility research only | TBD by object | Candidate |
| `src.hrfc.servicenow.hrdm.v1` | ServiceNow HR case/task replication | HRDM or alternate Snowflake schema | TBD ServiceNow/HRDM owner | Data engineering | Confidential / case-level review | Approved HR/data users | SNOW Tickets, LOAA | TBD | Blocked |
| `src.hrfc.fc_hr_analytics.v1` | FC HR Analytics pipeline outputs | GitHub / Snowflake / Tableau pipeline | TBD EPA/FC HR Analytics owner | Data engineering | Internal / confidential review | Product, data engineering, approved HR | Roster Health, HR Packet, ECHO, CAT, VOC, surveys | TBD by pipeline | Candidate |
| `src.hrfc.tableau.reconciliation.v1` | Tableau dashboards for reconciliation | Tableau | TBD dashboard owners | Data engineering | Internal / confidential review | Product, source owners, QA | Reconciliation only | Dashboard dependent | Candidate |
| `src.hrfc.echo_cat_voc.v1` | ECHO, CAT, VOC, Stand Ups, survey pipeline family | FC HR Analytics / Smartsheet / Tableau | TBD EPA/ECHO owner | Data engineering | Internal / confidential review | Approved HR/data users | ECHO, CAT, VOC, surveys, standups | TBD by pipeline | Candidate |
| `src.hrfc.manual_input.v1` | Manual and physical validation workflow | Phoenix, Forms, Confluence, or replacement TBD | HR Ops / Product | Phoenix / ORBIT | Internal / confidential review | Authorized HR users | Manual evidence capture | Per quarter and evidence rule | Draft |
| `src.hrfc.voc_action_roadmap.v1` | 2026 TM Experience Roadmap action context | SharePoint | TBD TM Experience roadmap owners | ORBIT product | Internal / listening-data review | HRM, HRD, leadership after approval | Recommendation context only | Review before citation | Candidate |
| `src.hrfc.sharepoint.action_tracker.v1` | HR Fitness Check recommendation, decision, action, and outcome tracker | SharePoint, exact site/list pending approval | Regional HR / ORBIT product, approval pending | SharePoint owner / ORBIT product, TBD | Internal / confidential review | Authorized Regional HR reviewers, product, approved HR leadership | Recommendation decision recording, accepted-action tracking, action completion, outcome review | On confirmed decision/action and each approved follow-up measurement | Draft; all writes disabled |
| `src.hrfc.confluence.prd.v1` | Downstream Confluence PRD page | Confluence | ORBIT product | ORBIT product | Internal | Product, stakeholders | Publishing mirror | Refresh after approved GitHub change | Candidate |

## Source Governance Requirements

Each registry row must be completed before pilot use:

| Field | Required rule |
| --- | --- |
| Owner | Business or source owner accountable for meaning and approval. |
| Steward | Operational contact for freshness, access, and incident review. |
| Classification | Public, internal, confidential, regulated, restricted, or local equivalent. |
| Sensitive data classes | Associate data, case data, survey comments, benefits data, schedule/time data, or none. |
| Allowed audiences | Roles/groups that may receive output from the source. |
| Allowed workflows | Capabilities allowed to retrieve or cite the source. |
| Disallowed workflows | Workflows blocked from use, especially scoring versus recommendation context. |
| Freshness SLA | Max allowed source age before stale behavior applies. |
| Effective dates | Dates or quarters for source authority. |
| Retention policy | How snapshots, derived results, traces, and outputs are retained. |
| Redaction policy | Ingest, retrieval, model-context, display, trace, and Confluence rules. |
| Citation policy | What title/system/version/block metadata can be shown to each audience. |
| Approval record | Ticket, PR, review, decision record, or governance approval. |
| Write posture | Read-only, preview-only, disabled supervised write, or approved supervised write. |
| Supported action classes | Exact actions that may target the system; no implicit write authority. |
| Confirmation and idempotency | Exact confirmation payload, confirmation freshness, and duplicate-write prevention. |
| Correction and rollback | How an incorrect decision, action, completion, or outcome link is corrected without erasing audit history. |

## Source-To-Workflow Rules

| Source family | Scoring input | Recommendation context | Notes |
| --- | --- | --- | --- |
| Reviewed matrix | Yes, after catalog approval | Yes | Discovery workbook is evidence, not durable runtime source. |
| UKG / EDLDB | Yes, for approved aggregate metrics | Limited | Avoid raw associate-level data in shared outputs. |
| HRDM / Workday | Yes, after owner mapping | Limited | Benefits/emergency contact fields are not yet located. |
| HRDM employee badging | No, unless approved as a specific aggregate Badge Management metric | Limited | Badge scans are access events, not badge-inventory evidence or payroll punches. Keep associate-level events out of shared Fitness Check context. |
| ServiceNow | Yes, after schema and governance approval | Limited | Case/task schema is blocked; avoid case narratives. |
| FC HR Analytics | Yes, after source owner approval | Yes | Prefer underlying pipeline tables over Tableau display names. |
| Tableau | Reconciliation only by default | Limited | Use dashboards to validate, not as first durable source. |
| Manual input | Yes, only through approved manual workflow | Yes | Must preserve owner, timestamp, evidence reference, and result status. |
| VOC action roadmap | No V1 scoring | Yes, if approved | Use as approved intervention context only. |
| SharePoint action tracker | No | Yes, after approval | Planned durable record for recommendation dispositions, rationale, confirmed accepted/modified actions, owners, target dates, completion, and outcome links. It is not a scoring source. All writes remain disabled pending target, access, retention, correction, rollback, and eval approval. |
| Confluence PRD | No scoring | Publishing mirror | Must match the approved repository content at a committed, pushed revision. |

## SharePoint Action Tracker Contract Boundary

- The exact SharePoint site, list, list ID, field schema, content types, access groups, retention label, API path, and owning team are not yet approved.
- A recommendation decision record must preserve the immutable recommendation ID, disposition of `accepted`, `modified`, `declined`, or `deferred`, reviewer scope, rationale, timestamp, approval record, and execution receipt.
- `declined` and `deferred` decisions do not create an active action record. An action record may be created only from an `accepted` or `modified` decision.
- The accepted-action write requires an exact preview of action text, owner, target date, and target record plus explicit user confirmation immediately before execution.
- The tracker write is bounded to the approved HR Fitness Check record. It does not authorize an upstream HR system write, notification, or assignment outside the approved tracker workflow.
- At the next approved comparable measurement, the product may preview a link between the completed action and subsequent quality movement. Persisting that link remains disabled until the outcome action class and target contract are approved.
- Outcome records must distinguish `pending_measurement`, `not_comparable`, verified movement, `pending_recheck`, `sustained`, and `not_sustained`. Observed movement must not be described as proof of causation.

## Ingestion Control Checklist

- [ ] Owner assigned.
- [ ] Steward assigned.
- [ ] Classification assigned.
- [ ] Sensitive data classes documented.
- [ ] Allowed audiences assigned.
- [ ] Allowed workflows assigned.
- [ ] Freshness SLA assigned.
- [ ] Retention policy assigned.
- [ ] Redaction policy assigned.
- [ ] Citation policy assigned.
- [ ] Access filters tested.
- [ ] PII/secrets scan completed where applicable.
- [ ] Prompt-injection handling tested for source text.
- [ ] Stale-source behavior tested.
- [ ] Conflict behavior tested.
- [ ] Source owner approved pilot use.

## Immediate Source Gaps

| Gap | Impact |
| --- | --- |
| Owner roles are populated for all 33 working rows, but named accountability and approval are incomplete | Blocks approved catalog identity, business accountability, and source-owner validation. |
| No populated workbook Snowflake table values | Blocks engineering from writing deterministic queries. |
| ServiceNow schema not found in first-pass HRDM discovery | Blocks SNOW Tickets and LOAA Management automation. |
| Beneficiary and emergency-contact fields not found in HRDM metadata search | Blocks Workday-derived rows until source owner identifies field/report. |
| Talent Management source fields not found | Blocks Quality 1:1 and LEW automation. |
| Investigations source is sensitive | Requires legal/governance approval before any field-level mapping. |
| Manual input home undecided | Blocks manual/physical evidence workflow. |
| SharePoint decision/action tracker target and schema are unapproved | Blocks durable disposition, rationale, owner, target-date, completion, and outcome-link writes. |
| Comparable-measurement and sustained-result policies are undefined | Blocks verified and sustained quality-outcome reporting even after actions are completed. |
