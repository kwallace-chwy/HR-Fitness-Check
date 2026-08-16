# HR Fitness Check Tool And Action Governance

Version: 0.3
Status: Draft control artifact
Last updated: 2026-08-11

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
| `tool.hrfc.recommendation_lookup.v1` | Grounded recommendation lookup | ORBIT product / HR Ops | Recommendation store | Draft | Read-only | Recommendation review and disposition preview |
| `tool.hrfc.recommendation_decision_preview.v1` | Recommendation decision preview builder | ORBIT product / Regional HR | Decision workflow | Draft | Preview only | Recommendation review and disposition preview |
| `tool.hrfc.recommendation_decision_write.v1` | Recommendation decision recorder | ORBIT product / Regional HR | HR Fitness Check SharePoint tracker, exact target pending approval | Disabled | Supervised write | Confirmed recommendation decision recording |
| `tool.hrfc.action_tracker_preview.v1` | Accepted-action record preview builder | ORBIT product / Regional HR | Action workflow | Draft | Preview only | Confirmed SharePoint action recording |
| `tool.hrfc.action_tracker_write.v1` | Accepted-action SharePoint recorder | ORBIT product / Regional HR | HR Fitness Check SharePoint tracker, exact target pending approval | Disabled | Supervised write | Confirmed SharePoint action recording |
| `tool.hrfc.outcome_lookup.v1` | Comparable measurement and outcome lookup | ORBIT product / data engineering | Fitness Check results and action tracker | Draft | Read-only | Comparable-measurement and quality-outcome review |
| `tool.hrfc.outcome_link_write.v1` | Verified outcome link recorder | ORBIT product / data engineering | HR Fitness Check outcome store, target pending approval | Disabled | Supervised write | Confirmed quality-outcome link recording |
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
9. A preview tool must never call its paired write tool or imply that a record was saved.
10. Recommendation decision writes accept only `accepted`, `modified`, `declined`, or `deferred`; rationale is required for every disposition, and the original recommendation must remain immutable.
11. Action tracker writes accept only an `accepted` or `modified` decision and require exact action text, owner, target date, target SharePoint record, and explicit user confirmation immediately before execution.
12. User confirmation does not activate a disabled tool. The capability flag, tool, action class, target, permissions, retention, rollback, and eval gate must all be approved first.
13. Outcome linking must use approved result IDs and a documented comparability decision. It must preserve `not_comparable` and `pending_measurement` states rather than inferring improvement.
14. A verified or sustained quality outcome records observed movement only and must not assert unsupported causation.

## Action Classes

| Action class ID | Action | Starting state | Required approval | Rollback or compensating control |
| --- | --- | --- | --- | --- |
| `act.hrfc.answer_from_approved_results.v1` | Return site or rollup answer from approved results | Allowed after read controls | No per-answer approval; source/eval approval required | Correct answer, update source, add eval case |
| `act.hrfc.draft_narrative.v1` | Draft strengths, opportunities, and solution-planning prompts | Draft only | Human review before broad distribution | Delete draft, revise prompt, add eval case |
| `act.hrfc.create_manual_input_record.v1` | Store manual result for an approved manual item | Disabled | Explicit user approval with exact item, quarter, rating, evidence reference, timestamp | Correction workflow and audit note |
| `act.hrfc.preview_recommendation_decision.v1` | Preview an `accepted`, `modified`, `declined`, or `deferred` recommendation decision and rationale | Draft only | No durable write; authorized reviewer scope required | Discard or revise preview |
| `act.hrfc.record_recommendation_decision.v1` | Store the confirmed recommendation disposition and rationale | Disabled | Explicit confirmation by an authorized Regional HR reviewer after exact before/after preview | Correct or supersede decision; retain immutable audit history |
| `act.hrfc.record_accepted_action.v1` | Store an accepted or modified action, owner, and target date in the approved SharePoint tracker | Disabled | Confirmed `accepted` or `modified` decision plus explicit user confirmation of action text, owner, target date, and target record | Correct or void tracker record; preserve execution receipt and audit history |
| `act.hrfc.link_verified_quality_outcome.v1` | Link a completed action to the next comparable measurement and record verified and sustained-result states | Disabled | Approved comparability rule, result IDs, outcome reviewer confirmation, and sustained-window policy | Void or supersede link; retain original comparison and correction reason |
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
| Recommendation ID and immutable recommendation version | Where applicable |
| Disposition (`accepted`, `modified`, `declined`, `deferred`) | Where applicable |
| Reviewer rationale | Required for recommendation decisions |
| Modified recommendation or action text | Required when disposition is `modified` |
| Action owner and target date | Required for accepted or modified action writes |
| Explicit confirmation payload and confirmation timestamp | Required for every durable decision, action, or outcome write |
| SharePoint target and execution receipt | Required for SharePoint writes |
| Baseline/follow-up result IDs and comparability decision | Required for outcome links |
| Verified movement and sustained-result status | Required for outcome records when due |

## Disabled Until Approved

The following are explicitly disabled:

- Write-back to UKG, Workday, ServiceNow, ECHO, CAT, Tableau, Smartsheet, or source systems.
- Autonomous publishing to Confluence.
- Autonomous manual input submission.
- Autonomous action plan creation, assignment, notification, or distribution.
- Recommendation decision, SharePoint action, and outcome-link writes until their target contracts, action classes, access rules, retention, correction paths, and eval gates are approved.
- Any action involving individual employment decisions or accountability assignment.
- Raw trace export for model replay or training.

An approved user-confirmed SharePoint action record is a bounded tracker write only. It does not authorize an upstream UKG, Workday, ServiceNow, ECHO, CAT, Tableau, or Smartsheet change; it does not notify or assign work outside the approved tracker workflow; and it does not activate any disabled capability or tool.

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
| Invalid or incomplete recommendation decision | Do not write; require an allowed disposition and rationale. |
| Accepted or modified action lacks owner, target date, exact preview, or confirmation | Do not write; return the missing required fields. |
| SharePoint write fails or returns no execution receipt | Report `write_failed`; do not claim the decision or action was recorded. |
| Duplicate write request | Return the existing idempotent receipt or stop for conflict review; do not create a second record. |
| Follow-up measurement is missing or not comparable | Return `pending_measurement` or `not_comparable`; do not calculate a verified outcome. |
| Sustained-result window is not yet due | Return `pending_recheck`; do not label the improvement sustained. |
| Output validation fails | Retry within policy or stop with safe failure state. |
| Partial result | Render completed rows and explicit exceptions. |

## Open Decisions

| ID | Decision | Owner |
| --- | --- | --- |
| TG-001 | Where will manual input records live? | Product / Phoenix / HR Ops |
| TG-002 | What approval UI language is required for manual input and publishing? | Product / Legal / Governance |
| TG-003 | What source lookup tools are APIs versus Snowflake views versus static registry files? | Data engineering |
| TG-004 | Who can approve source registry changes? | Governance / source owners |
| TG-005 | What exact SharePoint site, list, fields, permissions, idempotency key, retention, correction, and rollback behavior will govern decision and action records? | Product / SharePoint owner / Regional HR / Governance |
| TG-006 | Which Regional HR roles may record each disposition and confirm an accepted or modified action? | HR Ops / Security / Product |
| TG-007 | What makes a follow-up measurement comparable, who verifies the outcome, and when may an improvement be called sustained? | Process owner / Data engineering / Evaluation |
