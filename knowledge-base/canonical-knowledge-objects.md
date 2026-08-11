# HR Fitness Check Canonical Knowledge Objects

Version: 0.3
Status: Draft knowledge model
Last updated: 2026-08-11

## Purpose

This file defines the canonical objects HR Fitness Check should use for governed retrieval, scoring, audit, narrative generation, recommendation review, action tracking, and outcome measurement. Source evidence remains provenance. Canonical objects define authority. Chunks or blocks support retrieval and citation.

## Object Layers

| Layer | Meaning | Example |
| --- | --- | --- |
| Source evidence | Original artifact from source system | Reviewed workbook, SOP PDF, Snowflake table, Confluence page |
| Canonical object | Governed reusable knowledge unit | Standard Work item, rating rule, source mapping, manual input requirement |
| Retrieval block | Citation unit | PRD section, SOP step, registry row, rating rule row |

## Object Types

| Object type | Purpose |
| --- | --- |
| `standard_work_item` | Canonical reviewed HR Standard Work item. |
| `source_mapping` | Source system/object/field/filter/window mapping for one item. |
| `rating_rule` | Executable green/yellow/red rule and missing policy. |
| `fitness_result` | Site x quarter x item result. |
| `rollup_result` | Region, site group, Rx, or network aggregate. |
| `manual_input_requirement` | Manual or physical evidence requirement. |
| `capability_contract` | Governed agent/RAG capability. |
| `route_policy` | Runtime capability/source/tool/model route plan. |
| `tool_contract` | Deterministic tool contract. |
| `approval_record` | Human approval for manual input, publishing, or future writes. |
| `eval_case` | Gold case and expected behavior. |
| `intervention_reference` | Approved recommendation or action-plan context. |
| `recommendation` | Grounded, reviewable path-to-green recommendation tied to approved results and intervention references. |
| `recommendation_decision` | Regional HR disposition of `accepted`, `modified`, `declined`, or `deferred`, with required rationale. |
| `action_record` | User-confirmed action, owner, target date, execution state, and SharePoint receipt for an accepted or modified decision. |
| `followup_measurement` | Link between a completed action and the next approved comparable Fitness Check measurement. |
| `quality_outcome` | Verified quality movement and later sustained-result state without an unsupported causal claim. |
| `publishing_artifact` | Downstream Confluence or presentation artifact generated from GitHub. |

## Standard Work Item Schema

```json
{
  "content_id": "sw.hrfc.draft.a_005",
  "object_type": "standard_work_item",
  "sw_item_id": "A-005",
  "id_status": "draft_not_for_production_joins",
  "display_name": "HR ServiceNow (SNOW) Tickets",
  "aliases": [],
  "previous_owner": "HRA",
  "current_owner": null,
  "objective": null,
  "disposition": "in_scope_intent",
  "implementation_mode": "candidate_automatable",
  "status": "draft",
  "effective_start_quarter": "2026-Q3",
  "effective_end_quarter": null,
  "source_evidence_ids": ["src.hrfc.catalog.reviewed_matrix.v1"],
  "relationships": [],
  "classification": "internal_review",
  "retrieval_permission": "approved_hr_product_roles",
  "citation_policy": "cite_item_id_and_source_status"
}
```

## Source Mapping Schema

```json
{
  "content_id": "map.hrfc.draft.a_005",
  "object_type": "source_mapping",
  "sw_item_id": "A-005",
  "source_id": "src.hrfc.servicenow.hrdm.v1",
  "source_system": "ServiceNow",
  "source_object": null,
  "source_fields": [],
  "filters": [],
  "site_key": null,
  "measurement_window": "prior_month",
  "data_owner": null,
  "refresh_cadence": null,
  "mapping_status": "blocked",
  "blocked_reason": "Expected HRDM ServiceNow case/task tables not found in first-pass metadata search.",
  "validation_sample": null,
  "approval_record": null
}
```

## Rating Rule Schema

```json
{
  "content_id": "rule.hrfc.draft.a_005",
  "object_type": "rating_rule",
  "sw_item_id": "A-005",
  "rule_version": "rule.hrfc.draft.a_005.2026_q3",
  "metric_type": "percentage",
  "unit": "sla_breach_rate",
  "green_rule": "< 0.02",
  "yellow_rule": ">= 0.02 and <= 0.05",
  "red_rule": "> 0.05",
  "missing_policy": "emit_result_status_unmapped_or_missing_source",
  "sme_approver": null,
  "status": "draft"
}
```

## Fitness Result Schema

```json
{
  "content_id": "result.hrfc.site.quarter.item",
  "object_type": "fitness_result",
  "site_id": "HOU1",
  "quarter": "2026-Q3",
  "sw_item_id": "A-005",
  "measured_value": null,
  "rating": null,
  "result_status": "unmapped",
  "source_snapshot_time": null,
  "rule_version": "rule.hrfc.draft.a_005.2026_q3",
  "run_id": "run.hrfc.2026_q3.example",
  "source_ids": ["src.hrfc.servicenow.hrdm.v1"],
  "caveats": ["Source schema blocked."]
}
```

## Manual Input Requirement Schema

```json
{
  "content_id": "manual.hrfc.draft.a_001",
  "object_type": "manual_input_requirement",
  "sw_item_id": "A-001",
  "required_fields": ["site_id", "quarter", "rating", "evidence_reference", "reviewer_role", "submitted_at"],
  "evidence_policy": "Do not store raw images or personal data unless approved.",
  "approval_required": true,
  "result_status": "manual_input",
  "allowed_submitters": ["authorized_hr_user"],
  "retention_policy": "TBD"
}
```

## Intervention Reference Schema

```json
{
  "content_id": "intervention.hrfc.voc_action_roadmap.example",
  "object_type": "intervention_reference",
  "source_id": "src.hrfc.voc_action_roadmap.v1",
  "source_workstream": "VET/VTO fairness",
  "related_fitness_check_items": ["A-007"],
  "related_voc_themes": ["policy transparency"],
  "approved_audience": [],
  "approval_status": "draft",
  "recommended_when": [],
  "do_not_use_when": ["source_not_approved", "current_quarter_not_validated"],
  "citation_policy": "link_to_approved_artifact_only"
}
```

## Recommendation Schema

```json
{
  "content_id": "recommendation.hrfc.site.quarter.item.sequence",
  "object_type": "recommendation",
  "recommendation_id": "rec.hrfc.hou1.2026_q3.a_005.001",
  "site_id": "HOU1",
  "quarter": "2026-Q3",
  "sw_item_ids": ["A-005"],
  "finding_result_ids": ["result.hrfc.hou1.2026_q3.a_005"],
  "intervention_reference_ids": [],
  "recommendation_text": null,
  "evidence_summary": [],
  "caveats": [],
  "generation_method": "supervised_grounded_summary",
  "model_profile_id": "model.hrfc.supervised_summary.v1",
  "prompt_package_version": "prompt.hrfc.v1",
  "status": "draft_pending_regional_hr_review",
  "generated_at": null,
  "requires_human_review": true
}
```

The recommendation is immutable after review begins. A modification is stored in the decision and action records so the generated recommendation and the human-approved change remain distinguishable.

## Recommendation Decision Schema

```json
{
  "content_id": "decision.hrfc.recommendation.sequence",
  "object_type": "recommendation_decision",
  "decision_id": "decision.hrfc.rec.001",
  "recommendation_id": "rec.hrfc.hou1.2026_q3.a_005.001",
  "reviewer_role": "regional_hr_reviewer",
  "reviewer_scope": "approved_region_or_site_scope",
  "disposition": "accepted",
  "rationale": null,
  "modified_recommendation_text": null,
  "decided_at": null,
  "approval_record_id": null,
  "write_status": "preview_only",
  "target_record_id": null,
  "execution_receipt_id": null
}
```

Allowed dispositions are `accepted`, `modified`, `declined`, and `deferred`. Rationale is required for all four. `modified_recommendation_text` is required when disposition is `modified`. A durable decision write remains disabled until the target, action class, access, retention, correction, and evaluation contracts are approved.

## Action Record Schema

```json
{
  "content_id": "action.hrfc.decision.sequence",
  "object_type": "action_record",
  "action_record_id": "action.hrfc.decision.001",
  "decision_id": "decision.hrfc.rec.001",
  "recommendation_id": "rec.hrfc.hou1.2026_q3.a_005.001",
  "action_text": null,
  "action_owner": null,
  "target_date": null,
  "execution_status": "planned",
  "completion_date": null,
  "completion_evidence_reference": null,
  "sharepoint_target_id": null,
  "sharepoint_record_id": null,
  "approval_record_id": null,
  "confirmation_timestamp": null,
  "write_status": "preview_only",
  "execution_receipt_id": null
}
```

An action record may be created only from an `accepted` or `modified` decision. Exact action text, owner, target date, target record, and explicit user confirmation are required immediately before the approved SharePoint write. Allowed execution states are `planned`, `in_progress`, `completed`, `cancelled`, and `overdue`.

## Follow-up Measurement Schema

```json
{
  "content_id": "measurement.hrfc.action.sequence",
  "object_type": "followup_measurement",
  "measurement_id": "measurement.hrfc.action.001",
  "action_record_id": "action.hrfc.decision.001",
  "site_id": "HOU1",
  "sw_item_ids": ["A-005"],
  "baseline_result_ids": ["result.hrfc.hou1.2026_q3.a_005"],
  "followup_result_ids": [],
  "expected_followup_window": "next_comparable_measurement",
  "comparison_rule_version": null,
  "comparability_status": "pending_measurement",
  "comparability_reasons": [],
  "measured_at": null
}
```

Allowed comparability states are `pending_measurement`, `comparable`, and `not_comparable`. A measurement is comparable only when the approved site/item scope, rule, denominator, measurement window, and source basis satisfy the applicable comparison contract.

## Quality Outcome Schema

```json
{
  "content_id": "outcome.hrfc.measurement.sequence",
  "object_type": "quality_outcome",
  "outcome_id": "outcome.hrfc.measurement.001",
  "measurement_id": "measurement.hrfc.action.001",
  "action_record_id": "action.hrfc.decision.001",
  "verified_movement_status": "pending_measurement",
  "baseline_value": null,
  "followup_value": null,
  "movement_value": null,
  "movement_unit": null,
  "verification_method": null,
  "verified_at": null,
  "verified_by_role": null,
  "sustained_status": "pending_recheck",
  "sustained_recheck_due": null,
  "sustained_recheck_result_ids": [],
  "causal_claim_status": "association_only",
  "caveats": []
}
```

Allowed verified movement states are `pending_measurement`, `verified_improvement`, `verified_no_change`, `verified_decline`, and `not_comparable`. Allowed sustained states are `pending_recheck`, `sustained`, `not_sustained`, and `not_applicable`. A verified improvement means quality improved after the recorded action under an approved comparison; it does not by itself prove causation.

## Relationship Types

| Relationship | Meaning |
| --- | --- |
| `DERIVED_FROM` | Object comes from source evidence. |
| `USES_SOURCE` | Standard Work item or result depends on a source. |
| `HAS_RATING_RULE` | Standard Work item has a rating rule. |
| `HAS_MANUAL_REQUIREMENT` | Item requires manual input or physical evidence. |
| `APPLIES_TO_WORKFLOW` | Object applies to a capability/workflow. |
| `USED_BY_CAPABILITY` | Capability uses object. |
| `CONFLICTS_WITH` | Conflict requires source-owner review. |
| `SUPERSEDES` | Object/version replaces another. |
| `BLOCKED_BY_DECISION` | Governance or product decision is required. |
| `REQUIRES_PERMISSION` | Access condition applies. |
| `SUPPORTS_RECOMMENDATION` | Intervention context supports narrative recommendations. |
| `GROUNDED_IN_RESULT` | Recommendation is grounded in one or more approved Fitness Check results. |
| `HAS_DECISION` | Recommendation has a Regional HR disposition and rationale. |
| `CREATES_ACTION` | An accepted or modified decision creates a confirmed action record. |
| `HAS_FOLLOWUP_MEASUREMENT` | Completed action is linked to the next approved comparable measurement. |
| `HAS_VERIFIED_OUTCOME` | Comparable measurement produces a verified quality-movement status. |
| `HAS_SUSTAINED_RESULT` | Verified outcome has a later sustained-result determination. |

## ID Rules

| ID | Rule |
| --- | --- |
| `source_id` | Stable source registry ID, prefixed with `src.hrfc`. |
| `content_id` | Stable canonical object ID, prefixed by object type. |
| `sw_item_id` | Stable business item ID assigned by approved catalog decision. Current `A-###` values are draft references only and must not be used for production joins. |
| `rule_version` | Versioned rule ID with item and effective quarter. |
| `route_plan_id` | Runtime route ID tied to request ID. |
| `run_id` | Assessment run ID tied to quarter and execution. |
| `approval_record_id` | Human approval record ID. |
| `recommendation_id` | Stable recommendation ID tied to site, assessment period, relevant items, and sequence. |
| `decision_id` | Immutable human decision record ID tied to one recommendation version. |
| `action_record_id` | Stable action record ID tied to an accepted or modified decision. |
| `measurement_id` | Stable comparison record ID tying an action to baseline and follow-up result IDs. |
| `outcome_id` | Stable verified/sustained quality-outcome record ID tied to one measurement. |

## Canonical Object Readiness Gates

- [ ] Stable IDs replace the draft `A-###` references and a legacy-ID crosswalk is approved.
- [ ] Each V1 item has current owner.
- [ ] Each V1 item has implementation mode.
- [ ] Each automatable item has approved source mapping.
- [ ] Each manual or hybrid item has manual input requirement.
- [ ] Each scored item has rating rule version and SME example.
- [ ] Each result status has product behavior.
- [ ] Each recommendation uses approved intervention references only.
- [ ] Each recommendation is grounded in approved result IDs, carries caveats, and is immutable after review begins.
- [ ] Each durable recommendation decision uses an allowed disposition, required rationale, reviewer scope, approval record, and execution receipt.
- [ ] Each accepted or modified action includes exact action text, owner, target date, explicit confirmation, SharePoint target, and correction path.
- [ ] Each follow-up measurement records baseline/follow-up result IDs, comparison-rule version, and comparability state.
- [ ] Each quality outcome separates verified movement from sustained status and uses `association_only` unless a separately approved causal method exists.
- [ ] Each canonical object carries source evidence and citation policy.
