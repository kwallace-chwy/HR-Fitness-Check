# HR Fitness Check Canonical Knowledge Objects

Version: 0.2
Status: Draft knowledge model
Last updated: 2026-07-15

## Purpose

This file defines the canonical objects HR Fitness Check should use for governed retrieval, scoring, audit, and narrative generation. Source evidence remains provenance. Canonical objects define authority. Chunks or blocks support retrieval and citation.

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

## Canonical Object Readiness Gates

- [ ] Stable IDs replace the draft `A-###` references and a legacy-ID crosswalk is approved.
- [ ] Each V1 item has current owner.
- [ ] Each V1 item has implementation mode.
- [ ] Each automatable item has approved source mapping.
- [ ] Each manual or hybrid item has manual input requirement.
- [ ] Each scored item has rating rule version and SME example.
- [ ] Each result status has product behavior.
- [ ] Each recommendation uses approved intervention references only.
- [ ] Each canonical object carries source evidence and citation policy.
