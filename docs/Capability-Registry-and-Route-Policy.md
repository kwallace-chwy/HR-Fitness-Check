# HR Fitness Check Capability Registry And Route Policy

Version: 0.3
Status: Draft control artifact
Last updated: 2026-08-11

## Purpose

This file defines the initial governed capabilities and route policy for HR Fitness Check. Capabilities are the unit of agent governance. The route policy is the runtime decision that selects a capability before retrieval, model calls, or tool use.

## Capability Registry

| Capability ID | Name | Owner | Status | Autonomy | Supported users | Allowed sources | Tool posture | Eval gate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `cap.hrfc.site_assessment.v1` | Site assessment review | ORBIT product / HR Ops | Draft | L3 Recommend | HRM, HRD, approved HR leadership | Approved Fitness Check results, source registry, rating rules, site hierarchy | Read-only | `eval.hrfc.site_assessment.v1` |
| `cap.hrfc.rollup_review.v1` | Region, Rx, and network rollup review | ORBIT product / HR Ops | Draft | L3 Recommend | HRD, HR leadership | Approved rollups, site hierarchy, result facts | Read-only | `eval.hrfc.rollup_review.v1` |
| `cap.hrfc.catalog_workbench.v1` | Standard Work catalog readiness | ORBIT product / process owner | Draft | L2 Analyze | Product, process owner, data engineering | Reviewed catalog, disposition, source registry | Read-only | `eval.hrfc.catalog_workbench.v1` |
| `cap.hrfc.source_mapping_review.v1` | Source mapping readiness | Data engineering / source owners | Draft | L2 Analyze | Product, data engineering, governance | Source registry, ingestion backlog, discovery outputs | Read-only | `eval.hrfc.source_mapping.v1` |
| `cap.hrfc.manual_input_preview.v1` | Manual input preview | Product / Phoenix / HR Ops | Draft | L4 Preview | Authorized HR user | Manual input requirements, catalog, rating rules | Preview only | `eval.hrfc.manual_input.v1` |
| `cap.hrfc.narrative_summary.v1` | Supervised narrative summary | ORBIT product / HR Ops | Draft | L3 Recommend | HRM, HRD, HR leadership | Scored results, caveats, approved intervention registry when available | Draft-only | `eval.hrfc.narrative.v1` |
| `cap.hrfc.recommendation_review.v1` | Recommendation review and disposition preview | ORBIT product / Regional HR | Draft | L4 Preview | Authorized Regional HR reviewer, HRD | Grounded recommendation, scored results, caveats, approved intervention references | Read-only plus preview; no durable decision write | `eval.hrfc.recommendation_review.v1` |
| `cap.hrfc.recommendation_decision_write.v1` | Confirmed recommendation decision recording | ORBIT product / Regional HR | Disabled | L5 Supervised write | Authorized Regional HR reviewer | Exact reviewed recommendation, disposition preview, rationale, approval record | Disabled supervised write | `eval.hrfc.recommendation_decision_write.v1` |
| `cap.hrfc.action_tracker_write.v1` | Confirmed SharePoint action recording | ORBIT product / Regional HR | Disabled | L5 Supervised write | Authorized Regional HR reviewer | Accepted or modified decision, confirmed action text, owner, target date | Disabled supervised write | `eval.hrfc.action_tracker_write.v1` |
| `cap.hrfc.outcome_review.v1` | Comparable-measurement and quality-outcome review | ORBIT product / HR Ops | Draft | L2 Analyze | HRM, HRD, Regional HR, approved HR leadership | Completed action records, approved current and follow-up results, rule and denominator versions | Read-only; outcome-link preview only | `eval.hrfc.outcome_review.v1` |
| `cap.hrfc.outcome_link_write.v1` | Confirmed quality-outcome link recording | ORBIT product / data engineering | Disabled | L5 Supervised write | Authorized outcome reviewer | Completed action, approved comparable results, comparison decision, verification record, sustained-window policy | Disabled supervised write | `eval.hrfc.outcome_link_write.v1` |
| `cap.hrfc.confluence_publish_preview.v1` | Confluence publishing preview | ORBIT product | Disabled | L4 Preview | Product owner, approved publisher | GitHub PRD and approved docs | Preview only | `eval.hrfc.publish.v1` |

## Capability Contract Defaults

```json
{
  "status": "draft",
  "feature_flag": "hrfc.capability.disabled_by_default",
  "supported_channels": ["poc", "phoenix_chat_future"],
  "model_profiles": ["model.hrfc.supervised_summary.v1"],
  "prompt_package_version": "prompt.hrfc.v1",
  "output_schema_version": "schema.hrfc.answer.v1",
  "fallback": "clarify_or_escalate",
  "replan_allowed": false,
  "max_replan_attempts": 0
}
```

## Route Plan Template

```json
{
  "route_plan_id": "route.<request_id>",
  "route_policy_version": "route.hrfc.v1",
  "workflow": "site_assessment",
  "capability_id": "cap.hrfc.site_assessment.v1",
  "risk_tier": "sensitive_internal",
  "operating_mode": "request_led",
  "source_plan": ["metadata", "keyword", "tool"],
  "tool_plan": [
    {
      "tool_id": "tool.hrfc.result_lookup.v1",
      "purpose": "read_only_evidence",
      "required": true
    }
  ],
  "execution_strategy": "retrieve_then_validate_then_summarize",
  "model_profile_id": "model.hrfc.supervised_summary.v1",
  "prompt_package_version": "prompt.hrfc.v1",
  "output_schema_version": "schema.hrfc.answer.v1",
  "replan_allowed": false,
  "max_replan_attempts": 0,
  "confidence": 0.0,
  "fallback": "clarify_or_escalate"
}
```

## Route Policy Rules

1. Route before retrieval.
2. Fail closed when user role, site scope, rollup scope, or source access is unclear.
3. Select only a registered capability.
4. Select only sources allowed by the capability and user scope.
5. Select only approved model profiles and prompt packages.
6. No route may authorize a write or publish action by itself.
7. Low-confidence or unsupported requests must clarify, refuse, or escalate.
8. Route decisions must be recorded with policy version and confidence.
9. Recommendation dispositions are limited to `accepted`, `modified`, `declined`, or `deferred`, and every durable decision requires reviewer rationale.
10. Only an `accepted` or `modified` decision may proceed to an action-record preview, which must include exact action text, owner, and target date.
11. SharePoint decision, action, or outcome writes require an enabled write capability, approved action class, exact preview, explicit user confirmation, approval record, and execution receipt. Registration alone does not enable a write.
12. Outcome review must use the next approved comparable measurement. A later score is not comparable when the site/item scope, rule, denominator, measurement window, or source basis is materially different.
13. Verified quality movement is an observed association after an action, not proof that the action caused the change. Sustained status requires a separately approved recheck window.

## Request Routing Matrix

| User request pattern | Capability | Required checks | Fallback |
| --- | --- | --- | --- |
| "Show Fitness Check for HOU1" | `cap.hrfc.site_assessment.v1` | User can view HOU1; quarter selected; result source current or caveated. | Ask for site or quarter; escalate access issue. |
| "Compare 1G and Rx" | `cap.hrfc.rollup_review.v1` | User can view rollups; hierarchy version approved. | Ask for rollup scope; show hierarchy caveat. |
| "Which items are not source mapped?" | `cap.hrfc.source_mapping_review.v1` | User is approved for mapping backlog; sensitive discovery outputs redacted. | Return high-level counts only. |
| "Why is SNOW Tickets red?" | `cap.hrfc.site_assessment.v1` | Source mapping approved; result has source/citation; no case-level leakage. | Say evidence is missing or blocked. |
| "Submit manual result for TM Experience Walk" | `cap.hrfc.manual_input_preview.v1` | User authorized; item requires manual input; exact fields previewed. | Stop until manual workflow is approved. |
| "Draft strengths and opportunities" | `cap.hrfc.narrative_summary.v1` | Scored results, caveats, and source IDs available. | Draft caveat-only summary or ask for evidence. |
| "Review this recommendation" | `cap.hrfc.recommendation_review.v1` | Recommendation is grounded in approved results and intervention references; user is an authorized Regional HR reviewer. | Show evidence and caveats; do not capture a durable decision. |
| "Accept this recommendation" | `cap.hrfc.recommendation_decision_write.v1` | Exact recommendation shown; disposition and rationale supplied; write capability and action class approved; explicit confirmation captured. | Prepare a preview only or stop if the write remains disabled. |
| "Record this accepted action with an owner and target date" | `cap.hrfc.action_tracker_write.v1` | Decision is `accepted` or `modified`; exact action, owner, target date, target record, and confirmation are present. | Do not write; return missing fields or disabled-state explanation. |
| "Did the completed action improve quality?" | `cap.hrfc.outcome_review.v1` | Completed action and next comparable approved measurement exist; comparison rule and sustained window are identified. | Return pending or not-comparable status without a causal claim. |
| "Record this verified outcome" | `cap.hrfc.outcome_link_write.v1` | Outcome reviewer is authorized; action is completed; comparison is approved; exact result IDs, movement state, caveats, and confirmation are present. | Prepare a preview only or stop if the write remains disabled. |
| "Publish this to Confluence" | `cap.hrfc.confluence_publish_preview.v1` | Publishing action class approved; audience/retention approved; approval record captured. | Prepare preview only. |

## Feature Flags

| Flag | Default | Purpose |
| --- | --- | --- |
| `hrfc.cap.site_assessment` | Off | Enables site assessment capability. |
| `hrfc.cap.rollup_review` | Off | Enables rollup capability. |
| `hrfc.cap.catalog_workbench` | Off | Enables catalog readiness capability. |
| `hrfc.cap.source_mapping_review` | Off | Enables source mapping capability. |
| `hrfc.cap.manual_input_preview` | Off | Enables manual-input preview. |
| `hrfc.cap.narrative_summary` | Off | Enables supervised AI narrative drafting. |
| `hrfc.cap.recommendation_review` | Off | Enables grounded recommendation review and disposition preview. |
| `hrfc.cap.recommendation_decision_write` | Off | Enables an approved, explicitly confirmed durable recommendation decision write. |
| `hrfc.cap.action_tracker_write` | Off | Enables an approved, explicitly confirmed SharePoint action-record write. |
| `hrfc.cap.outcome_review` | Off | Enables comparable-measurement and verified/sustained outcome review. |
| `hrfc.cap.outcome_link_write` | Off | Enables an approved, explicitly confirmed durable quality-outcome link write. |
| `hrfc.cap.confluence_publish_preview` | Off | Enables publishing preview. |

All flags fail closed.

Cross-product MAIA/timekeeping behavior is intentionally excluded from this registry. The existing MAIA research document remains a separate discovery artifact pending relocation to its owning workspace.

## Output Contract

Every routed answer must include:

- Capability ID.
- Route policy version.
- Source IDs or missing evidence.
- Freshness state.
- Result status where applicable.
- Confidence and caveats.
- Action boundary.
- Escalation state.
- Recommendation ID, disposition, rationale, and decision record ID where applicable.
- Action record ID, action owner, target date, write status, and execution receipt where applicable.
- Baseline and follow-up result IDs, comparability status, verified quality-movement status, and sustained-result status where applicable.

## Open Decisions

| ID | Decision | Owner |
| --- | --- | --- |
| CR-001 | Confirm Phoenix channel and future Slack extension route names. | Phoenix / ORBIT |
| CR-002 | Confirm user roles and site/rollup scope rules. | Product / Security / HR Ops |
| CR-003 | Approve model profile for supervised summaries. | Phoenix / AI Engineering / Governance |
| CR-004 | Approve whether Confluence publishing is a product capability or manual release task. | Product / Governance |
| CR-005 | Approve Regional HR reviewer roles, site/region scope, and who may confirm recommendation decisions. | Product / HR Ops / Security |
| CR-006 | Approve the SharePoint site, list, schema, permissions, retention, correction, and rollback contract for decision and action records. | Product / Regional HR / SharePoint owner / Governance |
| CR-007 | Define next-comparable-measurement rules and the sustained-improvement recheck window for each supported measure. | Process owner / Data engineering / Evaluation |
