# HR Fitness Check Source Registry

Version: 0.3
Status: Draft source registry
Last updated: 2026-08-10

## Purpose

This registry turns discovered source leads into governed source candidates. No source is ingestion-ready until owner, steward, classification, audience, workflow scope, freshness, retention, citation, access, and approval records are complete.

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
| Confluence PRD | No scoring | Publishing mirror | Must match the approved repository content at a committed, pushed revision. |

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
