# HR Fitness Check Canonical Knowledge Objects

Version: 0.4
Status: Draft knowledge model
Last updated: 2026-08-17

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
| `assessment_period` | Calendar and business window definition for a monthly progress check, Quarterly Fitness Check, on-demand preview, or recast. |
| `assessment_run` | Immutable execution instance with run type, authority, catalog/rule/source versions, evidence cutoff, and certification or recast state. |
| `standard_work_item` | Canonical reviewed HR Standard Work item. |
| `source_mapping` | Source system/object/field/filter/window mapping for one item. |
| `rating_rule` | Executable green/yellow/red rule and missing policy. |
| `fitness_result` | Site x assessment run x item result. |
| `rollup_result` | Region, site group, Rx, or network aggregate. |
| `report_artifact` | Versioned monthly progress report, certified Quarterly Fitness Check, on-demand preview, recast output, or derived annual summary. |
| `manual_input_requirement` | Manual or physical evidence requirement. |
| `context_assertion` | Attributed, scoped, time-bounded operational or process context that may inform interpretation without changing deterministic authority. |
| `evidence_dispute` | A user's challenge to source evidence or a result, routed for validation without directly changing the result. |
| `source_change_proposal` | Proposed replacement or modification of an approved source mapping, pending source-owner review and reconciliation. |
| `feedback_event` | Classified narrative, recommendation, question-quality, workflow, or product feedback used as governed evaluation evidence. |
| `product_change_proposal` | Reviewed offline-learning proposal linking feedback evidence to evaluation, approval, release, rollback, and monitoring records. |
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

## Assessment Period Schema

```json
{
  "content_id": "period.hrfc.2026_08",
  "object_type": "assessment_period",
  "period_id": "2026-08",
  "period_type": "month",
  "label": "August 2026",
  "calendar_start": "2026-08-01",
  "calendar_end": "2026-08-31",
  "parent_quarter_period_id": "2026-Q3",
  "timezone_policy": "America/New_York",
  "status": "draft"
}
```

Allowed `period_type` values are `month` and `quarter`. The period identifies the reporting frame; item-level evidence windows and aggregation methods remain in the approved rating/source contract and may differ from calendar boundaries.

## Assessment Run Schema

```json
{
  "content_id": "run.hrfc.hou1.2026_08.monthly.001",
  "object_type": "assessment_run",
  "run_id": "run.hrfc.hou1.2026_08.monthly.001",
  "run_type": "monthly_progress",
  "authority_status": "provisional",
  "period_id": "2026-08",
  "site_scope": ["HOU1"],
  "catalog_version": "catalog.hrfc.approved.v1",
  "source_mapping_versions": [],
  "rule_versions": [],
  "evidence_cutoff_at": null,
  "started_at": null,
  "completed_at": null,
  "certification_record_id": null,
  "recast_of_run_id": null,
  "recast_reason": null,
  "status": "planned"
}
```

Allowed `run_type` values are `monthly_progress`, `quarterly_fitness_check`, `on_demand_preview`, and `historical_recast`. Monthly progress and on-demand runs are always provisional. A Quarterly Fitness Check begins `pending_certification` and becomes `certified` only after the required evidence, manual review, reconciliation, and authorized sign-off pass. A recast creates a new immutable run linked through `recast_of_run_id`; it never overwrites history. `annual_summary` is deliberately not a run type.

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
  "monthly_measurement_window": "calendar_month",
  "quarterly_measurement_window": "calendar_quarter",
  "monthly_aggregation_method": "ratio_of_period_totals",
  "quarterly_aggregation_method": "ratio_of_quarter_totals",
  "comparable_dimensions": ["site", "sw_item_id", "rule_version", "source_basis", "window", "denominator"],
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
  "supported_run_types": ["monthly_progress", "quarterly_fitness_check"],
  "monthly_construction": "evaluate approved rule over approved monthly window",
  "quarterly_construction": "evaluate approved rule over approved quarterly evidence; never average monthly ratings",
  "missing_policy": "emit_result_status_unmapped_or_missing_source",
  "sme_approver": null,
  "status": "draft"
}
```

## Fitness Result Schema

```json
{
  "content_id": "result.hrfc.site.run.item",
  "object_type": "fitness_result",
  "site_id": "HOU1",
  "assessment_run_id": "run.hrfc.hou1.2026_08.monthly.001",
  "supporting_assessment_run_ids": ["run.hrfc.hou1.2026_08.monthly.001"],
  "reporting_year": 2026,
  "period_id": "2026-08",
  "run_type": "monthly_progress",
  "authority_status": "provisional",
  "sw_item_id": "A-005",
  "measured_value": null,
  "rating": null,
  "result_status": "unmapped",
  "source_snapshot_time": null,
  "rule_version": "rule.hrfc.draft.a_005.2026_q3",
  "evidence_window_start": "2026-08-01",
  "evidence_window_end": "2026-08-31",
  "aggregation_method": "ratio_of_period_totals",
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
  "required_fields": ["site_id", "assessment_run_id", "rating", "evidence_reference", "reviewer_role", "submitted_at"],
  "evidence_policy": "Do not store raw images or personal data unless approved.",
  "approval_required": true,
  "result_status": "manual_input",
  "allowed_submitters": ["authorized_hr_user"],
  "retention_policy": "TBD"
}
```

## Report Artifact Schema

```json
{
  "content_id": "report.hrfc.hou1.2026_08.monthly.001",
  "object_type": "report_artifact",
  "report_id": "report.hrfc.hou1.2026_08.monthly.001",
  "assessment_run_id": "run.hrfc.hou1.2026_08.monthly.001",
  "report_type": "monthly_progress",
  "authority_status": "provisional",
  "data_as_of": null,
  "evidence_coverage": null,
  "result_ids": [],
  "context_assertion_ids": [],
  "evidence_dispute_ids": [],
  "open_action_ids": [],
  "generated_narrative": null,
  "review_status": "draft",
  "certification_record_id": null,
  "supersedes_report_id": null
}
```

A monthly report is always provisional. A Quarterly Fitness Check report may use `authority_status=certified` only when its linked `quarterly_fitness_check` run is certified. Report text must visually distinguish system findings, attributed user context, model interpretation, and recommendations.

Allowed `report_type` values are `monthly_progress`, `quarterly_fitness_check`, `on_demand_preview`, `historical_recast`, and `annual_summary`. An annual summary has `assessment_run_id=null`, identifies the reporting year, and lists only the applicable certified Quarterly Fitness Check run/report IDs in `supporting_assessment_run_ids`. It may summarize movement, actions, outcomes, and comparability caveats, but it creates no assessment run, recalculates no rating, changes no certification, and never substitutes for a quarterly result.

## Context Assertion Schema

```json
{
  "content_id": "context.hrfc.hou1.2026_08.sequence",
  "object_type": "context_assertion",
  "context_assertion_id": "context.hrfc.hou1.2026_08.001",
  "context_type": "operational_constraint",
  "original_statement_reference": "conversation.hrfc.redacted.001",
  "normalized_summary": "Site HR reported an August HR-team staffing constraint.",
  "submitted_by_user_id": "authorized_user_reference",
  "submitted_by_role": "HRM",
  "site_scope": ["HOU1"],
  "business_unit_scope": ["FC"],
  "sw_item_ids": [],
  "assessment_run_ids": ["run.hrfc.hou1.2026_08.monthly.001"],
  "effective_start": "2026-08-01",
  "effective_end": "2026-08-31",
  "verification_status": "user_confirmed",
  "allowed_uses": ["monthly_narrative_context", "recommendation_feasibility_constraint"],
  "prohibited_uses": ["change_score", "change_denominator", "change_source_mapping", "change_rule", "prove_causation"],
  "audience": ["authorized_site_and_regional_hr"],
  "classification": "internal_hr_context",
  "retention_policy_id": "retention.hrfc.context.pending",
  "expires_at": "2026-09-01T00:00:00Z",
  "supporting_evidence_ids": [],
  "supersedes_context_assertion_id": null,
  "withdrawn_at": null,
  "withdrawal_reason": null,
  "confirmation_record_id": "approval.hrfc.context.001",
  "created_at": null
}
```

Allowed verification states are `draft`, `user_confirmed`, `pending_verification`, `verified`, `rejected`, `expired`, `superseded`, and `withdrawn`. A user-confirmed assertion may inform only its approved narrative or recommendation purpose. It is not source evidence and cannot change a deterministic result. Correction creates a superseding record; retraction/withdrawal preserves the append-only control history while excluding the assertion from future retrieval.

## Evidence Dispute Schema

```json
{
  "content_id": "dispute.hrfc.result.sequence",
  "object_type": "evidence_dispute",
  "evidence_dispute_id": "dispute.hrfc.result.001",
  "assessment_run_id": "run.hrfc.hou1.2026_08.monthly.001",
  "fitness_result_id": "result.hrfc.hou1.run.a_005",
  "source_ids": ["src.hrfc.servicenow.hrdm.v1"],
  "submitted_by_user_id": "authorized_user_reference",
  "dispute_type": "incorrect_value",
  "statement_summary": "User reports the displayed source value is incorrect.",
  "supporting_evidence_ids": [],
  "status": "submitted",
  "assigned_owner": null,
  "resolution": null,
  "resolution_record_id": null,
  "created_at": null,
  "resolved_at": null
}
```

Submitting a dispute marks the result as disputed for interpretation and routes it for source validation. It does not edit the frozen evidence snapshot or result. Any approved correction produces a new source snapshot and, when required, a new recast run.

## Source Change Proposal Schema

```json
{
  "content_id": "source_change.hrfc.item.sequence",
  "object_type": "source_change_proposal",
  "source_change_proposal_id": "source_change.hrfc.a_005.001",
  "sw_item_ids": ["A-005"],
  "site_scope": ["HOU1"],
  "current_source_mapping_id": "map.hrfc.draft.a_005",
  "proposed_source_system": "Smartsheet",
  "proposed_source_reference": "minimized_governed_reference",
  "effective_date_claimed": "2026-08-01",
  "submitted_by_user_id": "authorized_user_reference",
  "confirmation_record_id": "approval.hrfc.source_change.001",
  "status": "pending_source_owner_review",
  "required_reviews": ["source_owner", "data_governance", "process_owner"],
  "reconciliation_evidence_ids": [],
  "decision_record_id": null,
  "created_at": null
}
```

The proposal cannot activate a connector or change an approved mapping. Approval requires source ownership, field/filter/window/site-key mapping, access, classification, freshness, reconciliation, rule impact, effective dating, evaluation, and rollback.

## Feedback Event Schema

```json
{
  "content_id": "feedback.hrfc.sequence",
  "object_type": "feedback_event",
  "feedback_event_id": "feedback.hrfc.001",
  "feedback_type": "recommendation_feasibility",
  "assessment_run_id": "run.hrfc.hou1.2026_08.monthly.001",
  "related_object_ids": ["rec.hrfc.hou1.2026_08.a_005.001"],
  "submitted_by_role": "HRM",
  "site_scope": ["HOU1"],
  "normalized_summary": "Recommendation timing is not feasible during the stated staffing constraint.",
  "classification": "internal_product_feedback",
  "redaction_status": "pending",
  "consent_and_allowed_use": "governed_product_evaluation",
  "status": "captured",
  "created_at": null
}
```

Feedback is product evidence, not direct training data. It may revise the current draft when authorized, but cross-session behavior changes require the offline product-change process below.

## Product Change Proposal Schema

```json
{
  "content_id": "product_change.hrfc.sequence",
  "object_type": "product_change_proposal",
  "product_change_proposal_id": "product_change.hrfc.001",
  "change_type": "prompt_or_policy_or_source_or_intervention_update",
  "feedback_event_ids": [],
  "problem_statement": null,
  "proposed_change": null,
  "affected_versions": [],
  "privacy_review_status": "pending",
  "evaluation_set_id": null,
  "regression_result_id": null,
  "approval_record_ids": [],
  "release_version": null,
  "rollback_target": null,
  "monitoring_plan_id": null,
  "status": "draft"
}
```

The only supported learning path is `feedback captured -> classified and redacted -> human review -> change proposal -> offline evaluation and regression testing -> approval -> versioned release -> monitoring and rollback`. Production prompts, models, retrieval rules, source mappings, scoring rules, or policies never update directly from a conversation.

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
  "content_id": "recommendation.hrfc.site.run.item.sequence",
  "object_type": "recommendation",
  "recommendation_id": "rec.hrfc.hou1.2026_08.a_005.001",
  "site_id": "HOU1",
  "assessment_run_id": "run.hrfc.hou1.2026_08.monthly.001",
  "period_id": "2026-08",
  "sw_item_ids": ["A-005"],
  "finding_result_ids": ["result.hrfc.hou1.run.a_005"],
  "context_assertion_ids": ["context.hrfc.hou1.2026_08.001"],
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
  "recommendation_id": "rec.hrfc.hou1.2026_08.a_005.001",
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
  "recommendation_id": "rec.hrfc.hou1.2026_08.a_005.001",
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
  "baseline_result_ids": ["result.hrfc.hou1.run.a_005"],
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
| `EXECUTED_IN_RUN` | Result, report, recommendation, or review belongs to an immutable assessment run. |
| `RECASTS` | Historical recast run supersedes a prior run without deleting it. |
| `SUMMARIZES_CERTIFIED_RUN` | Annual summary derives from a certified Quarterly Fitness Check without creating a new score or run. |
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
| `PROVIDES_CONTEXT_FOR` | Context assertion may inform an approved report, interpretation, recommendation, or action-planning purpose. |
| `DISPUTES_EVIDENCE_FOR` | Evidence dispute challenges a source snapshot or result pending validation. |
| `PROPOSES_SOURCE_CHANGE_FOR` | Source-change proposal suggests a new or modified mapping pending approval. |
| `GENERATED_FROM_FEEDBACK` | Product change proposal uses governed, redacted feedback evidence. |

## ID Rules

| ID | Rule |
| --- | --- |
| `source_id` | Stable source registry ID, prefixed with `src.hrfc`. |
| `content_id` | Stable canonical object ID, prefixed by object type. |
| `sw_item_id` | Stable business item ID assigned by approved catalog decision. Current `A-###` values are draft references only and must not be used for production joins. |
| `rule_version` | Versioned rule ID with item and effective quarter. |
| `route_plan_id` | Runtime route ID tied to request ID. |
| `period_id` | Stable calendar/business period ID such as `2026-08` or `2026-Q3`. |
| `run_id` | Immutable assessment execution ID tied to site/rollup scope, period, run type, and sequence. |
| `approval_record_id` | Human approval record ID. |
| `recommendation_id` | Stable recommendation ID tied to site, assessment period, relevant items, and sequence. |
| `decision_id` | Immutable human decision record ID tied to one recommendation version. |
| `action_record_id` | Stable action record ID tied to an accepted or modified decision. |
| `measurement_id` | Stable comparison record ID tying an action to baseline and follow-up result IDs. |
| `outcome_id` | Stable verified/sustained quality-outcome record ID tied to one measurement. |
| `context_assertion_id` | Stable attributed context record ID with immutable correction/supersession lineage. |
| `evidence_dispute_id` | Stable dispute ID tied to challenged source/result evidence. |
| `source_change_proposal_id` | Stable proposed-mapping change ID; never an active mapping ID. |
| `feedback_event_id` | Stable classified feedback record ID. |
| `product_change_proposal_id` | Stable offline-learning/change-control proposal ID. |
| `report_id` | Stable report artifact ID; annual summaries use year/scope identity and reference certified Quarterly Fitness Check runs. |

## Canonical Object Readiness Gates

- [ ] Stable IDs replace the draft `A-###` references and a legacy-ID crosswalk is approved.
- [ ] Each V1 item has current owner.
- [ ] Each V1 item has implementation mode.
- [ ] Each automatable item has approved source mapping.
- [ ] Each manual or hybrid item has manual input requirement.
- [ ] Each scored item has rating rule version and SME example.
- [ ] Each active item has approved monthly and quarterly evidence-window, aggregation, missing-value, comparability, and recast behavior; quarterly construction never averages monthly ratings.
- [ ] Each assessment run records run type, authority, period, evidence cutoff, catalog/source/rule versions, site scope, completion state, and certification or recast lineage.
- [ ] Each annual summary references only applicable certified Quarterly Fitness Check runs/reports, carries comparability caveats, and creates no new assessment run, rating, or certification.
- [ ] Each result status has product behavior.
- [ ] Each recommendation uses approved intervention references only.
- [ ] Each recommendation is grounded in approved result IDs, carries caveats, and is immutable after review begins.
- [ ] Each durable recommendation decision uses an allowed disposition, required rationale, reviewer scope, approval record, and execution receipt.
- [ ] Each accepted or modified action includes exact action text, owner, target date, explicit confirmation, SharePoint target, and correction path.
- [ ] Each follow-up measurement records baseline/follow-up result IDs, comparison-rule version, and comparability state.
- [ ] Each quality outcome separates verified movement from sustained status and uses `association_only` unless a separately approved causal method exists.
- [ ] Each durable context assertion has explicit user confirmation, scope, allowed/prohibited use, effective dates, audience, classification, retention, expiry, correction, withdrawal, and verification state.
- [ ] Evidence disputes and source-change reports create proposals and never directly change frozen evidence, scores, denominators, approved mappings, or rules.
- [ ] Feedback used for product learning is classified/redacted and linked to a human-reviewed change proposal, offline eval, approval, versioned release, rollback target, and monitoring plan.
- [ ] Each canonical object carries source evidence and citation policy.
