# HR Fitness Check Capability Registry And Route Policy

Version: 0.2
Status: Draft control artifact
Last updated: 2026-07-15

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

## Request Routing Matrix

| User request pattern | Capability | Required checks | Fallback |
| --- | --- | --- | --- |
| "Show Fitness Check for HOU1" | `cap.hrfc.site_assessment.v1` | User can view HOU1; quarter selected; result source current or caveated. | Ask for site or quarter; escalate access issue. |
| "Compare 1G and Rx" | `cap.hrfc.rollup_review.v1` | User can view rollups; hierarchy version approved. | Ask for rollup scope; show hierarchy caveat. |
| "Which items are not source mapped?" | `cap.hrfc.source_mapping_review.v1` | User is approved for mapping backlog; sensitive discovery outputs redacted. | Return high-level counts only. |
| "Why is SNOW Tickets red?" | `cap.hrfc.site_assessment.v1` | Source mapping approved; result has source/citation; no case-level leakage. | Say evidence is missing or blocked. |
| "Submit manual result for TM Experience Walk" | `cap.hrfc.manual_input_preview.v1` | User authorized; item requires manual input; exact fields previewed. | Stop until manual workflow is approved. |
| "Draft strengths and opportunities" | `cap.hrfc.narrative_summary.v1` | Scored results, caveats, and source IDs available. | Draft caveat-only summary or ask for evidence. |
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

## Open Decisions

| ID | Decision | Owner |
| --- | --- | --- |
| CR-001 | Confirm Phoenix channel and future Slack extension route names. | Phoenix / ORBIT |
| CR-002 | Confirm user roles and site/rollup scope rules. | Product / Security / HR Ops |
| CR-003 | Approve model profile for supervised summaries. | Phoenix / AI Engineering / Governance |
| CR-004 | Approve whether Confluence publishing is a product capability or manual release task. | Product / Governance |
