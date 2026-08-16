# HR Fitness Check Retrieval And Context Assembly

Version: 0.2
Status: Draft RAG control artifact
Last updated: 2026-07-15

## Purpose

This file defines how HR Fitness Check should retrieve evidence and assemble model context. The goal is to keep answers grounded, scoped, current, citation-ready, and honest about missing or blocked evidence.

## Retrieval Principles

1. Route before retrieval.
2. Enforce user, site, rollup, workflow, classification, and audience access before context assembly.
3. Prefer canonical objects and approved result facts over raw source chunks.
4. Do not use stale, conflicting, restricted, or draft-only sources as final authority.
5. Separate deterministic score facts from AI-generated narrative.
6. Label all retrieved source text as untrusted.
7. Include missing evidence explicitly.
8. Preserve enough metadata for audit without storing raw sensitive payloads.

## Retrieval Modes

| Mode | Use in HR Fitness Check |
| --- | --- |
| Metadata lookup | Find source, item, owner, disposition, quarter, site, and workflow. |
| Keyword search | Find exact Standard Work item, source family, artifact, or rule text. |
| Structured result lookup | Retrieve site x quarter x item results and rollups. |
| Tool/API lookup | Retrieve live or governed facts from approved systems after authorization. |
| Graph traversal | Check dependencies, source conflicts, supersession, manual requirements, and used-by capability. |
| Vector/hybrid search | Later only if benchmark proves benefit for SOP and source-artifact discovery. |
| Curated cache | Later only for approved low-risk repeat explanations with TTL and source versions. |

## Context Package Template

```json
{
  "request_id": "req-123",
  "route_plan": {
    "route_policy_version": "route.hrfc.v1",
    "capability_id": "cap.hrfc.site_assessment.v1",
    "workflow": "site_assessment"
  },
  "scope": {
    "user_role": "HRM",
    "site_scope": ["HOU1"],
    "rollup_scope": [],
    "quarter": "2026-Q3"
  },
  "sources": [
    {
      "source_id": "src.hrfc.catalog.reviewed_matrix.v1",
      "content_id": "sw.hrfc.draft.a_005",
      "version": "2026-06-19",
      "title": "Reviewed HR Fitness Check matrix",
      "freshness_status": "current_for_discovery",
      "citation": "Reviewed checklist disposition draft item A-005",
      "allowed_use": "explain_catalog_disposition",
      "text": "Minimized excerpt or structured fact."
    }
  ],
  "results": [],
  "tool_facts": [],
  "graph_checks": [],
  "missing_evidence": [],
  "constraints": {
    "must_cite_sources": true,
    "must_not_claim_action_taken": true,
    "must_show_result_status": true,
    "escalate_if_missing_evidence": true,
    "no_individual_accountability": true
  },
  "output_schema": "schema.hrfc.answer.v1"
}
```

## Context Assembly Rules

| Rule | Product behavior |
| --- | --- |
| In-scope item has approved source and scored result | Include result, rule, source ID, source version, measured value where allowed, rating, caveat, and citation. |
| In-scope item has blocked source mapping | Include item and blocked status; do not invent measured value or rating. |
| In-scope-intent item has no approved implementation mode | State that scope is business intent only; do not include it in an approved scoring denominator. |
| Item is removed/out of scope | State it is excluded from V1 denominator unless decision record changes. |
| Item is deferred by approved decision | State not active for the effective catalog version and exclude it from the denominator. |
| Item is manual/physical by approved implementation decision | Include manual requirement and result status; do not auto-score. |
| Source stale | Include stale status and avoid final authority. |
| Source conflict | Surface conflict and route to source owner. |
| Unauthorized source | Do not include restricted source details. |
| Prompt injection found in source | Isolate source, block unsafe instruction, and record guardrail event. |

## Citation Requirements

Citations should carry:

- Source title.
- Source system.
- Source ID.
- Content ID.
- Version or last-reviewed date.
- Block, section, row, or item ID where available.
- Freshness state.
- Audience/access note where safe.

Example citation text:

`Reviewed Checklist Disposition, source src.hrfc.catalog.reviewed_matrix.v1, draft item A-005, last updated 2026-06-30.`

## Output Schema

Every answer should include:

| Field | Meaning |
| --- | --- |
| `answer_type` | site_assessment, rollup_review, source_mapping, catalog_readiness, narrative_draft, manual_preview, publishing_preview |
| `capability_id` | Registered capability used. |
| `source_ids` | Source IDs used. |
| `content_ids` | Canonical object IDs used. |
| `confidence` | Route/output confidence where available. |
| `freshness` | Current, stale, unknown, discovery-only, or blocked. |
| `missing_evidence` | Specific missing source, owner, field, rule, or approval. |
| `result_statuses` | Scored/manual/missing/stale/unmapped statuses surfaced. |
| `caveats` | Data quality or governance caveats. |
| `action_boundary` | What the agent did not do and cannot do. |
| `next_step` | Focused next action. |
| `escalation_state` | None, source owner, governance, HR Ops, legal, Phoenix, data engineering. |

## Retrieval Failure Behavior

| Condition | Behavior |
| --- | --- |
| No result | Ask for missing site/quarter/item or state unavailable. |
| Unauthorized result | Deny or escalate without leaking restricted details. |
| Stale source | Warn, block final authority, or route to owner. |
| Source conflict | Surface conflict and route to owner/reviewer. |
| Tool missing | Provide source-only caveated answer or stop. |
| Low route confidence | Ask focused clarification. |
| Prompt injection | Ignore unsafe instruction and record guardrail result. |

## Initial Source Priority

For V1, retrieval should use this order:

1. Approved Fitness Check result facts.
2. Approved Standard Work item and rating rule objects.
3. Approved source registry metadata.
4. Approved source mapping and lineage objects.
5. Approved SOP/source excerpts for explanation.
6. Approved intervention references for recommendation context.

Do not use raw workbook cells, raw case/task notes, survey comments, employee-level data, images, screenshots, transcripts, or raw source extracts in model context unless a separate data contract approves it.
