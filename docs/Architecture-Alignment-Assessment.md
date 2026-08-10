# HR Fitness Check architecture alignment assessment

Version: 0.3
Status: Draft alignment assessment
Last updated: 2026-08-10
Source of truth: Reviewed repository content; GitHub after approved changes are committed and pushed

## Evidence reviewed

This assessment compares the current HR Fitness Check repository and working tree with:

- `Agentic HRA/Agent-Protocol-Guidelines`
- `Agentic HRA/RAG-Protocol-Guidelines`
- The local operational cockpit reference at `http://127.0.0.1:8790/`

The review included the root README, PRD, disposition and publishing documents, architecture-control drafts, knowledge-base files, discovery SQL, static POC code, current git state, and the relevant ORBIT product-folder standard.

## Concise assessment

HR Fitness Check is aligned at the product-boundary and architecture-intent level, partially aligned at the contract-artifact level, and not yet aligned at the runtime-control level.

- Product boundary: aligned. The product is a quarterly governed assessment, not a general chatbot. Scoring is deterministic, missing/manual/stale states remain visible, and narrative support is supervised.
- Architecture artifacts: partially aligned. Draft source, knowledge-object, retrieval, capability, tool, eval, audit, and rollout documents now exist, but several are incomplete or internally inconsistent.
- Review runtime: partially implemented. The repository now contains a read-only local MVP with deterministic synthetic item generation, filtering, reporting, API contracts, explicit result states, and ephemeral request audit metadata. It does not contain production identity/scope enforcement, source activation, governed scoring, durable storage/audit, model gateway, tool broker, or production output validation.
- Pilot readiness: blocked. Source ownership, stable item IDs, implementation modes, source approvals, access rules, rating examples, manual workflow, retention, model approval, and tested release gates remain open.

The correct posture is to preserve the current product, complete the contracts, build deterministic scoring and access controls first, and add L3 supervised narrative only after the evidence path passes evals.

## Already aligned

| Area | Current evidence | Assessment |
| --- | --- | --- |
| Product job and users | `docs/HR-Fitness-Check-PRD.md` defines the quarterly Standard Work job for HRMs, HRDs, and approved HR leaders. | Meets the Agent Protocol product-framing requirement. |
| Deterministic authority | The PRD keeps rating rules outside the model and limits AI to grounded narrative synthesis. | Aligns with authority outside the model. |
| Explicit uncertainty | The PRD defines scored, manual, missing, stale, unmapped, calculation-error, and deferred result states separately from rating. | Aligns with RAG failure behavior. |
| Supervised-first behavior | L0-L3 is the default; manual input and publishing are preview-only; L5/L6 remain disabled. | Aligns with the autonomy ladder. |
| Source discovery provenance | `knowledge-base/source-inventory.md`, `ingestion-backlog.md`, `research-log.md`, and discovery SQL preserve located/candidate/blocked distinctions. | Directionally aligned with governed source onboarding. |
| Draft source governance | `knowledge-base/source-registry.md` defines source IDs and the required owner, access, freshness, retention, redaction, citation, and approval fields. | Correct artifact shape, but rows are not approval-complete. |
| Draft canonical model | `knowledge-base/canonical-knowledge-objects.md` separates source evidence, canonical objects, and retrieval blocks. | Aligns with the RAG knowledge model. |
| Route-before-retrieval design | `docs/Capability-Registry-and-Route-Policy.md` and `knowledge-base/retrieval-context-assembly.md` require a registered route before retrieval, tools, or models. | Aligns with both protocols. |
| Tool/action boundary | `docs/Tool-Action-Governance.md` keeps writes disabled and requires broker authorization and exact approval records. | Aligns at design level. |
| Eval, audit, and rollout design | Draft eval gates, trace fields, audit envelope, promotion gates, incidents, and rollback targets are documented. | Aligns at design level. |
| Operational UI direction | `mvp/` implements the read-only operational cockpit; `poc/` is retained as an earlier static reference. Both keep synthetic evidence explicit. | Consistent with the operational-product requirement for MVP review. |
| Source-of-truth model | Reviewed repository content is canonical; approved changes must be committed and pushed before Confluence is refreshed. | Correct publishing authority boundary, with Git traceability still required for the current working tree. |

## Needs cleanup

| Area | Current issue | Required cleanup |
| --- | --- | --- |
| Assessment drift | The prior assessment said core artifacts did not exist even though those artifacts are now in the working tree. | Treat them as draft/partial, not missing. |
| Catalog identifiers | The July 29 33-row working copy is represented with draft `A-###` references in the reviewed disposition, while older backlog and schema examples use `V1-###` and a differently ordered June 30 `A-###` namespace. | Approve stable IDs, preserve a versioned legacy crosswalk, and prohibit every draft namespace as a production join key. |
| Backlog reconciliation | `knowledge-base/ingestion-backlog.md` preserves the older 27-row and June 30 crosswalks as history while the July 29 working catalog contains 33 rows. | Reconcile the 33 approval-pending rows into one versioned backlog after stable-ID approval; never use either historical draft-ID namespace for joins. |
| Product boundary | MAIA missed-punch capabilities and tools appeared inside HR Fitness Check registries. | Keep HRFC registries product-specific; relocate the MAIA workflow and SQL to the owning MAIA/Agentic HRA workspace after owner confirmation. |
| Source registry completeness | Governance fields are described globally, but most registry rows do not carry row-level URI, approval, effective-date, retention, redaction, citation, connector, or indexing values. | Convert each candidate into a complete versioned record before activation. |
| Capability completeness | Capabilities are summarized in a table and inherit defaults, but do not yet have full per-capability contracts, approved model profiles, prompt packages, or schemas. | Create one complete machine-readable contract per enabled capability. |
| Confluence synchronization claim | The live PRD was re-verified at version 15 on 2026-08-10. Older version 14 publishing instructions are now tombstoned. | Prepare future changes from reviewed repository content, tie them to a committed revision, and verify the resulting Confluence version after publication. |
| UI evidence labeling | Hard-coded site values could be mistaken for current performance despite discovery caveats. | Label them explicitly as synthetic/illustrative and keep them out of audit or decision claims. |
| UI action feedback | The source-review button had no deterministic result or disabled-state explanation. | Produce a local draft preview only and state that no external write occurs. |
| ORBIT artifact mapping | The repo uses a lean docs/knowledge-base/poc layout instead of the program's 10-folder document taxonomy. | Add an artifact map; do not perform a disruptive folder migration until repository owners choose the standard. |

## Missing architecture artifact

The following artifacts do not yet exist as complete, reviewable contracts. Proposed paths are exact so work can be sequenced without reorganizing the current product docs.

| Artifact | Exact proposed path | Why it is needed |
| --- | --- | --- |
| Stable catalog and legacy-ID crosswalk | `contracts/standard-work-catalog.json` | Establishes the approved identity, disposition, ownership, and effective version for the current 33-row working set after catalog decisions are complete. |
| Machine-readable source registry | `contracts/source-registry.json` | Makes row-level governance and source activation enforceable. |
| Capability registry | `contracts/capability-registry.json` | Defines owner, source/tool/model scope, feature flag, output schema, eval gate, and rollout state per capability. |
| Tool registry and action classes | `contracts/tool-registry.json` and `contracts/action-classes.json` | Gives a broker enforceable allowlists and approval boundaries. |
| Model and prompt registry | `contracts/model-profiles.json` and `contracts/prompt-packages.json` | Prevents model/provider/prompt self-selection and supports rollback. |
| JSON schemas | `schemas/hrfc-control-contracts.schema.json` | Validates source, capability, route, context, output, approval, and audit envelopes. |
| Architecture decisions | `architecture/decisions/ADR-001-source-of-truth.md` through `ADR-006-retrieval-posture.md` | Converts the current decision table into reviewable proposed/accepted decisions with evidence and revisit triggers. |
| Access and data-handling matrix | `docs/Access-and-Data-Handling.md` | Defines role/site/rollup/source/field/output/trace access and retention. |
| Memory and state policy | `docs/Memory-State-and-Retention.md` | Separates ephemeral request context, workflow state, audit, feedback, eval fixtures, and prohibited training use. |
| Ingestion/versioning contract | `docs/Ingestion-and-Versioning.md` | Defines manifests, validation, active-version semantics, freshness monitoring, and rollback. |
| Runtime deployment design | `docs/Phoenix-Runtime-Design.md` | Maps the contracts to Phoenix identity, gateway, registry, broker, model, storage, and feature-flag components. |
| Gold cases and scorecard | `evals/hrfc-gold-cases.jsonl` and `evals/hrfc-pilot-scorecard.md` | Turns the documented scenarios and thresholds into executable release evidence. |
| Operational runbooks | `runbooks/source-stale.md`, `source-blocked.md`, `unauthorized-retrieval.md`, `prompt-injection.md`, `tool-outage.md`, `bad-answer.md`, `manual-input-correction.md`, and `rollback.md` | Makes incident, support, and rollback behavior executable. |

Vector search, graph infrastructure, curated cache, multi-agent orchestration, and long-term memory are not required MVP artifacts. Metadata/keyword lookup plus structured result tools are the smallest sufficient retrieval shape until benchmarks prove otherwise.

## Missing product or governance decision

| Decision | Why it matters | Recommended owner |
| --- | --- | --- |
| Stable IDs and final V1 denominator for the 33-row working set | All mappings, rules, historical joins, and baselines depend on stable identity, reconciliation of the five absent rows, and approved scope. | Product / process owner / sponsor |
| Named accountable owner and implementation mode per working row | Owner roles are populated for all 33 rows, but named accountability and automation/hybrid/manual/deferred decisions remain open. | Process owner / HR Ops / data engineering |
| Missing-value and Quality Index policy | Prevents absent evidence from being silently treated as poor performance. | Process owner / product / data governance |
| Source owner, classification, access, retention, and citation approval | Required before any source can be activated or retrieved. | Source owners / governance / security / legal |
| Site and rollup authorization model | Required to prevent cross-site or cross-rollup exposure. | HR Ops / security / Phoenix |
| Manual evidence system of record | Required for physical and judgment-based checks and correction/audit behavior. | Product / Phoenix / HR Ops |
| Model/provider and data-handling approval | Required before any HR evidence enters model context. | AI engineering / security / governance |
| Narrative distribution and Confluence publishing authority | Determines audience, approval UX, retention, and rollback. | Product / HR leadership / governance |
| Approved intervention library | Prevents draft roadmap material from becoming authoritative recommendations. | HR Ops / TM Experience source owners |
| Latency, cost, support, and review-sampling targets | Required for eval gates and operational staffing. | Product / engineering / evaluation / operations |

## Missing implementation or control

| Control | Current state | Required evidence before pilot |
| --- | --- | --- |
| Identity and scope resolver | Not present in repo. | Role, site, rollup, workflow, and source-scope denial tests. |
| Source onboarding and active-version pipeline | Discovery SQL only. | Manifest, validation, approval, activation, freshness, and rollback tests. |
| Deterministic scoring service | Not implemented. | SME-approved rules, fixtures, reconciliation, and explicit status handling. |
| Runtime route policy and feature flags | Documented only. | Schema validation, supported/unsupported route tests, and fail-closed flags. |
| Tool broker | Documented only. | Allowlist, purpose, identity, schema, timeout, redaction, denial, and audit tests. |
| Context guard | Documented only. | Pre-model access filtering, minimization, injection handling, stale/conflict behavior, and citation package tests. |
| Model gateway and prompt registry | Not implemented. | Approved profile, data handling, budget, fallback, eval, and rollback evidence. |
| Output validator | Not implemented. | Schema, citation, unsupported-claim, caveat, privacy, and action-boundary tests. |
| Eval harness | Scenario list only. | Versioned cases, deterministic checks, human review, results, and release decision. |
| Observability and audit stores | Schemas described only. | Redacted trace sample, complete audit sample, access review, alerting, and retention proof. |
| Human approval workflow | Fields described only. | Exact preview, approve/revise/reject/stop states, execution receipt, and correction/rollback test. |
| Incident and rollback operation | Targets described; runbooks missing. | Dry runs for source, route, prompt, model, tool, and capability rollback. |
| Production cockpit integration | Static POC only. | Contract-backed data, access tests, empty/error/stale/conflict states, responsive/accessibility checks. |

## Highest-risk failures

1. Scoring missing, stale, blocked, manual, or unmapped evidence as a valid red/yellow/green fact.
2. Using draft or mismatched item IDs to join results or recast the Q3 2025 baseline.
3. Exposing associate-level, case-level, benefits, investigations, comments, or raw source data in UI, model context, Confluence, traces, or eval exports.
4. Letting a model imply causality, individual accountability, approval, publishing, or source-system action that did not occur.
5. Activating a source or capability without owner approval, access filtering, eval evidence, feature flag, and rollback.
6. Allowing GitHub, Confluence, the workbook, and runtime contracts to drift into competing sources of truth.

## Recommended alignment posture

- MVP topology: one bounded retrieve-then-reason workflow, not a multi-agent system.
- Retrieval: metadata/keyword lookup and deterministic result/source tools first.
- Scoring: deterministic code outside the model.
- Narrative: L3 supervised draft only after results, caveats, citations, and output validation exist.
- Manual input and publishing: L4 preview only until an approved L5 action class, explicit approval record, and rollback exist.
- Autonomous execution: L6 out of scope.
- Vector, graph, cache, and memory: disabled until a measured use case and governance decision justify them.
