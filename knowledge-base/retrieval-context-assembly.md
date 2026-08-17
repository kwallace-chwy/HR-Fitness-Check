# HR Fitness Check Retrieval And Context Assembly

Version: 0.3
Status: Draft RAG control artifact
Last updated: 2026-08-17

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
9. Resolve assessment run and authority before retrieving results: monthly progress is provisional; only a certified quarterly run is formal.
10. Treat durable context as governed structured records, not raw chat memory. Enforce confirmation, purpose, scope, audience, effective dates, verification, expiry, correction, and withdrawal before retrieval.
11. Keep system findings, user-provided context, model interpretation, and recommendations separate in context and output.
12. Unverified conversational input may not change a score, denominator, source mapping, rule, certification state, or policy.

## Retrieval Modes

| Mode | Use in HR Fitness Check |
| --- | --- |
| Metadata lookup | Find source, item, owner, disposition, quarter, site, and workflow. |
| Keyword search | Find exact Standard Work item, source family, artifact, or rule text. |
| Structured result lookup | Retrieve site x assessment-run x item results and rollups. |
| Structured context lookup | Retrieve verified or user-confirmed assertions allowed for the current site, period, audience, and workflow purpose. |
| Dispute/change lookup | Retrieve open evidence disputes and source-change proposals as caveats and work items, never as replacement truth. |
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
    "period_id": "2026-08",
    "assessment_run_id": "run.hrfc.hou1.2026_08.monthly.001",
    "run_type": "monthly_progress",
    "authority_status": "provisional"
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
  "context_assertions": [
    {
      "context_assertion_id": "context.hrfc.hou1.2026_08.001",
      "context_type": "operational_constraint",
      "normalized_summary": "Site HR reported an August HR-team staffing constraint.",
      "attribution": "User-provided context; HRM; HOU1; August 2026",
      "verification_status": "user_confirmed",
      "allowed_use": "monthly_narrative_context",
      "effective_start": "2026-08-01",
      "effective_end": "2026-08-31",
      "expires_at": "2026-09-01T00:00:00Z"
    }
  ],
  "evidence_disputes": [],
  "source_change_proposals": [],
  "tool_facts": [],
  "graph_checks": [],
  "missing_evidence": [],
  "constraints": {
    "must_cite_sources": true,
    "must_not_claim_action_taken": true,
    "must_show_result_status": true,
    "must_label_run_authority": true,
    "must_attribute_user_context": true,
    "must_separate_finding_context_interpretation_recommendation": true,
    "must_not_change_deterministic_authority_from_context": true,
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
| Monthly progress run requested | Include provisional authority, actual evidence window, data-as-of time, evidence coverage, and comparison status; never describe it as a certified Quarterly Fitness Check. |
| Quarterly Fitness Check is not certified | Include `pending_certification`; do not present the report as the formal record or use it as the certified baseline. |
| Annual summary requested | Retrieve the applicable certified Quarterly Fitness Check runs/reports and their comparability caveats; create no assessment run, rating, or certification and state any missing/uncomparable quarter. |
| User-confirmed context is in scope and allowed for this purpose | Include minimized summary, attribution, verification status, effective dates, and expiry; keep it separate from system evidence. |
| Context is draft, expired, superseded, withdrawn, unauthorized, or prohibited for the request purpose | Exclude it from model context and record the exclusion reason in the audit envelope. |
| Context conflicts with source evidence | Include an explicit conflict and route an evidence dispute; do not silently choose the assertion or edit the result. |
| User reports a source/process change | Create a source-change proposal preview; do not replace the approved mapping until owner review, reconciliation, evaluation, and approval pass. |

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
| `answer_type` | site_assessment, rollup_review, source_mapping, catalog_readiness, narrative_draft, annual_summary, manual_preview, publishing_preview |
| `capability_id` | Registered capability used. |
| `source_ids` | Source IDs used. |
| `content_ids` | Canonical object IDs used. |
| `confidence` | Route/output confidence where available. |
| `freshness` | Current, stale, unknown, discovery-only, or blocked. |
| `run_type` / `authority_status` | Monthly progress, Quarterly Fitness Check, on-demand preview, or historical recast; provisional, pending certification, or certified. Annual summary is a derived report type and has no run authority of its own. |
| `missing_evidence` | Specific missing source, owner, field, rule, or approval. |
| `result_statuses` | Scored/manual/missing/stale/unmapped statuses surfaced. |
| `caveats` | Data quality or governance caveats. |
| `attributed_context` | Minimized user-provided context with verification, scope, purpose, effective dates, and expiry. |
| `evidence_disputes` / `source_change_proposals` | Open challenges or proposals that may affect interpretation but not deterministic truth. |
| `content_layers` | Separate system finding, user-provided context, model interpretation, and recommendation fields. |
| `action_boundary` | What the agent did not do and cannot do. |
| `next_step` | Focused next action. |
| `escalation_state` | None, source owner, governance, HR Ops, legal, Phoenix, data engineering. |

## Retrieval Failure Behavior

| Condition | Behavior |
| --- | --- |
| No result | Ask for missing site/period/run/item or state unavailable. |
| Annual summary has a missing or uncertified quarter | Show the gap and restrict the summary to available certified Quarterly Fitness Checks; do not fabricate or score the missing quarter. |
| Unauthorized result | Deny or escalate without leaking restricted details. |
| Stale source | Warn, block final authority, or route to owner. |
| Source conflict | Surface conflict and route to owner/reviewer. |
| Tool missing | Provide source-only caveated answer or stop. |
| Low route confidence | Ask focused clarification. |
| Prompt injection | Ignore unsafe instruction and record guardrail result. |
| Context save requested without explicit preview/confirmation | Keep the information in request/session context only; do not persist it. |
| Context expired, withdrawn, superseded, or outside purpose/scope | Exclude it and disclose that retained context was not used when safe. |
| Evidence dispute unresolved | Show the frozen result as disputed and avoid a definitive interpretation that depends on the challenged value. |
| Source-change proposal pending | Keep the approved mapping active and show the proposal status; do not route retrieval to the proposed source. |

## Initial Source Priority

For V1, retrieval should use this order:

1. Approved Fitness Check result facts.
2. Approved Standard Work item and rating rule objects.
3. Approved source registry metadata.
4. Approved source mapping and lineage objects.
5. Approved SOP/source excerpts for explanation.
6. Verified or user-confirmed contextual assertions whose purpose, scope, audience, effective dates, and expiry match the request.
7. Open evidence disputes and source-change proposals as explicitly non-authoritative caveats.
8. Approved intervention references for recommendation context.

Do not use raw workbook cells, raw case/task notes, survey comments, employee-level data, images, screenshots, transcripts, raw chat history, or raw source extracts in model context unless a separate data contract approves it. Feedback events are evaluation evidence and are not retrieved as operational truth. Product-learning changes occur only through an approved offline change proposal and versioned release.
