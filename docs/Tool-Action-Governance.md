# HR Fitness Check Tool And Action Governance

Version: 0.2
Status: Draft control artifact
Last updated: 2026-07-15

## Purpose

This file defines the initial tool broker posture, action classes, and approval boundaries for HR Fitness Check. The model may recommend or draft, but authority for source access and actions lives outside the model.

## Tool Registry

| Tool ID | Tool name | Owner | System | Status | Read/write posture | Supported capabilities |
| --- | --- | --- | --- | --- | --- | --- |
| `tool.hrfc.catalog_lookup.v1` | Standard Work catalog lookup | Product / data engineering | Fitness Check catalog store | Draft | Read-only | Catalog workbench, site assessment, narrative summary |
| `tool.hrfc.source_registry_lookup.v1` | Source registry lookup | Data engineering / governance | Source registry | Draft | Read-only | Source mapping review, site assessment |
| `tool.hrfc.result_lookup.v1` | Fitness Check result lookup | Data engineering | Fitness Check datamart | Draft | Read-only | Site assessment, rollup review, narrative summary |
| `tool.hrfc.rollup_lookup.v1` | Rollup result lookup | Data engineering | Fitness Check datamart | Draft | Read-only | Rollup review |
| `tool.hrfc.manual_input_preview.v1` | Manual input preview builder | Phoenix / HR Ops | Manual workflow | Draft | Preview only | Manual input preview |
| `tool.hrfc.manual_input_submit.v1` | Manual input submitter | Phoenix / HR Ops | Manual workflow | Disabled | Supervised write | Manual input preview |
| `tool.hrfc.confluence_preview.v1` | Confluence page preview builder | Product | GitHub docs / Confluence | Draft | Preview only | Confluence publishing preview |
| `tool.hrfc.confluence_update.v1` | Confluence page updater | Product / governance | Confluence | Disabled | Supervised write | Confluence publishing preview |

## Tool Broker Rules

1. Tools must be called through a server-side broker.
2. The broker validates capability ID, user scope, workflow purpose, input schema, output schema, and source permissions.
3. Read tools return minimized evidence and metadata, not raw source dumps.
4. Write tools stay disabled until action-class governance is approved.
5. Tool outputs are treated as untrusted context before model use.
6. Tool outputs must be redacted before shared traces.
7. Denied authorization must not reveal restricted source details.
8. Tool failures must produce explicit product statuses, not hidden red ratings.

## Action Classes

| Action class ID | Action | Starting state | Required approval | Rollback or compensating control |
| --- | --- | --- | --- | --- |
| `act.hrfc.answer_from_approved_results.v1` | Return site or rollup answer from approved results | Allowed after read controls | No per-answer approval; source/eval approval required | Correct answer, update source, add eval case |
| `act.hrfc.draft_narrative.v1` | Draft strengths, opportunities, and solution-planning prompts | Draft only | Human review before broad distribution | Delete draft, revise prompt, add eval case |
| `act.hrfc.create_manual_input_record.v1` | Store manual result for an approved manual item | Disabled | Explicit user approval with exact item, quarter, rating, evidence reference, timestamp | Correction workflow and audit note |
| `act.hrfc.publish_confluence_page.v1` | Replace or publish Confluence PRD/results page | Disabled | Explicit product owner approval and audience/retention approval | Page version rollback |
| `act.hrfc.update_source_registry.v1` | Approve or modify a source registry row | Disabled | Source owner and governance approval | Registry version rollback |
| `act.hrfc.promote_capability.v1` | Move capability from draft/dev to alpha/beta/stable | Disabled | Product, engineering, governance, and eval owner signoff | Feature flag rollback |

## Human Approval Record

Supervised actions must capture:

| Field | Required |
| --- | --- |
| Approval record ID | Yes |
| User and role | Yes |
| Site, rollup, or source scope | Yes |
| Capability ID | Yes |
| Action class ID | Yes |
| Target system and target record | Yes |
| Exact before value | Where applicable |
| Exact after value | Where applicable |
| Evidence summary | Yes |
| Source IDs and versions | Yes |
| Tool ID and version | Yes |
| Model profile and prompt package | Where applicable |
| Approval timestamp | Yes |
| Approval UI state | Yes |
| Execution result | Yes |
| Rollback or escalation path | Yes |

## Disabled Until Approved

The following are explicitly disabled:

- Write-back to UKG, Workday, ServiceNow, ECHO, CAT, Tableau, Smartsheet, or source systems.
- Autonomous publishing to Confluence.
- Autonomous manual input submission.
- Autonomous action plan creation, assignment, notification, or distribution.
- Any action involving individual employment decisions or accountability assignment.
- Raw trace export for model replay or training.

Cross-product MAIA/timekeeping tools and action classes are intentionally excluded from this HR Fitness Check registry. They require a separate owning product contract, source scope, eval gate, and audit boundary.

## Failure Behavior

| Failure | Product behavior |
| --- | --- |
| Authorization denied | Stop and explain scope issue without leaking restricted content. |
| Missing source mapping | Mark item `unmapped`; do not score. |
| Stale source | Mark item `stale_data` or escalate based on risk. |
| Source conflict | Surface conflict and route to source owner. |
| Tool unavailable | Show source/tool unavailable status and preserve prior valid results if policy allows. |
| Manual approval missing | Do not submit or publish. |
| Output validation fails | Retry within policy or stop with safe failure state. |
| Partial result | Render completed rows and explicit exceptions. |

## Open Decisions

| ID | Decision | Owner |
| --- | --- | --- |
| TG-001 | Where will manual input records live? | Product / Phoenix / HR Ops |
| TG-002 | What approval UI language is required for manual input and publishing? | Product / Legal / Governance |
| TG-003 | What source lookup tools are APIs versus Snowflake views versus static registry files? | Data engineering |
| TG-004 | Who can approve source registry changes? | Governance / source owners |
