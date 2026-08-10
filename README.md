# ORBIT HR Fitness Check

Status: MVP review build; working catalog approval pending
Source of truth: Reviewed repository content; GitHub becomes authoritative after approved changes are committed and pushed
Current PRD: docs/HR-Fitness-Check-PRD.md
Last updated: 2026-08-10

## Purpose

HR Fitness Check is an ORBIT product for quarterly FC HR Standard Work assessment. It is designed to help HRMs and HRDs understand whether required Standard Work is being followed, where source evidence is strong, where manual validation is required, and where action planning should focus.

The current repository preserves the existing product intent while aligning the work to reusable Agentic HRA Agent Protocol and RAG Protocol patterns. The product should remain a governed HR operations cockpit, not a marketing page and not an unconstrained chatbot.

## Current Assessment

HR Fitness Check is directionally aligned with the target Agent/RAG architecture because the PRD already protects deterministic scoring, manual evidence, missing data, stale data, and human review. It is not yet pilot-ready as a governed agent/RAG implementation because source registry, canonical knowledge objects, route policy, tool boundaries, eval gates, observability, audit, rollout, and supervision controls still need approval and implementation.

The latest audit-sheet disposition is:

| Disposition | Count | Meaning |
| --- | ---: | --- |
| Working in-scope intent | 33 | Business intent only; not an approved production denominator. |
| Current owner role populated | 33 | Named accountability and approval remain open. |
| Snowflake table / reviewer / result populated | 0 | Source and scoring readiness remain incomplete. |

Q3 2025 baseline percentages remain discovery evidence only until the approved V1 denominator, implementation modes, source mappings, and missing-data policy are finalized.

## Repository

Canonical repository:

```text
https://github.com/kwallace-chwy/HR-Fitness-Check
```

Local project folder:

```text
C:\Users\kwallace12\OneDrive - Chewy.com, LLC\Documents\Agentic HR Fitness Check
```

Confluence is a downstream publishing surface. Requirements, architecture contracts, source decisions, and implementation guidance should be updated and reviewed in the repository first, committed and pushed through the governed Git workflow, and only then published to Confluence from that exact revision.

## Project Structure

```text
HR-Fitness-Check/
|-- mvp/
|   |-- public/
|   |-- data/
|   |-- tests/
|   `-- server.js
|-- poc/
|   |-- index.html
|   |-- app.js
|   |-- styles.css
|   `-- README.md
|-- docs/
|   |-- HR-Fitness-Check-PRD.md
|   |-- Reviewed-Checklist-Disposition.md
|   |-- Architecture-Alignment-Assessment.md
|   |-- Agent-RAG-Alignment-Plan.md
|   |-- Capability-Registry-and-Route-Policy.md
|   |-- Tool-Action-Governance.md
|   |-- Evaluation-Observability-Audit.md
|   |-- Rollout-and-Operating-Model.md
|   |-- mvp/
|   |   |-- Data-Map-and-Classification.md
|   |   |-- Technical-Design-and-Scoring-Contract.md
|   |   |-- UX-and-Reporting-Specification.md
|   |   |-- Evaluation-and-Release-Evidence.md
|   |   `-- Runbook-and-Rollout.md
|   |-- Confluence-PRD-Publishing-Copy.md (retired tombstone)
|   `-- Confluence-PRD-Structure-Preserving-Fact-Check.md (retired tombstone)
|-- knowledge-base/
|   |-- README.md
|   |-- source-inventory.md
|   |-- source-registry.md
|   |-- canonical-knowledge-objects.md
|   |-- retrieval-context-assembly.md
|   |-- ingestion-backlog.md
|   |-- snowflake-discovery-playbook.md
|   |-- snowflake-discovery-results.md
|   |-- research-log.md
|   |-- voc-pulse-action-roadmap.md
|   |-- discovery-output/
|   `-- discovery-sql/
|-- outputs/
|-- LICENSE
`-- README.md
```

## Key Artifacts

| Artifact | Purpose |
| --- | --- |
| docs/HR-Fitness-Check-PRD.md | Current product requirements and source-of-truth publishing model. |
| docs/Reviewed-Checklist-Disposition.md | Latest 33-task-row working catalog and reconciliation notes. |
| docs/Architecture-Alignment-Assessment.md | Gap assessment against Agent Protocol and RAG Protocol. |
| docs/Agent-RAG-Alignment-Plan.md | Practical product-preserving architecture alignment plan. |
| knowledge-base/source-registry.md | Governed source registry contract and source-to-workflow rules. |
| knowledge-base/canonical-knowledge-objects.md | Standard Work, mapping, rating, result, manual evidence, and recommendation object model. |
| knowledge-base/retrieval-context-assembly.md | Route-before-retrieval context assembly, access filters, citations, and failure behavior. |
| docs/Capability-Registry-and-Route-Policy.md | Registered capabilities, routes, autonomy levels, and fallback behavior. |
| docs/Tool-Action-Governance.md | Tool boundaries, action classes, approvals, and disabled write controls. |
| docs/Evaluation-Observability-Audit.md | Eval gates, gold cases, trace fields, audit envelope, and release thresholds. |
| docs/Rollout-and-Operating-Model.md | Pilot gates, operating reviews, rollback, incidents, and ownership. |
| docs/Confluence-PRD-Publishing-Copy.md | Retired tombstone that prohibits reuse of the superseded June 30 replacement body. |
| docs/Confluence-PRD-Structure-Preserving-Fact-Check.md | Retired tombstone for the superseded version 14 / June 30 fact-check instructions. |

## MVP Review Build

The review-ready MVP is a zero-production-dependency Node application with item-derived reporting, read-only APIs, a responsive operational interface, explicit provenance, and synthetic site results. Locked Playwright and Axe development dependencies provide real-browser regression coverage.

```powershell
cd mvp
npm ci
npm run test:all
npm start
```

Open:

```text
http://127.0.0.1:8800/
```

The MVP includes Overview, Work queue, Site review, Data readiness, Reports, and Audit views. Its reporting contract uses green share and evidence coverage with explicit numerators and denominators. Missing, stale, blocked, manual-required, and unmapped evidence is never converted to a red rating. Quarter comparisons are disabled when catalog versions are not comparable.

The review build is not a production system: it has no live HR-system connection, production authorization, write-back, or approved scoring denominator.

## Archived Static POC

The earlier static POC remains checked in at:

```text
poc/index.html
```

Open directly in a browser, or serve it from the repo root:

```powershell
python -m http.server 8800
```

Then open:

```text
http://127.0.0.1:8800/poc/
```

The POC mirrors the local ORBIT operational cockpit reference at:

```text
http://127.0.0.1:8790/
```

The interface is intentionally dense and operational: readiness metrics, source queue, illustrative site review, route policy, eval/audit controls, and a supervised assistant pane. Readiness counts come from the documented workbook review; site-level performance values are synthetic demo data only.

## Current Source Discovery

Source discovery and ingestion planning are captured in knowledge-base. Important current facts:

- No populated Snowflake table values exist in the reviewed workbook yet.
- Current owner roles are populated for all 33 working rows; named accountability and approval are still required.
- ServiceNow HR case/task source discovery remains blocked by schema/source confirmation.
- Workday beneficiary and emergency contact fields were not found in the first HRDM metadata pass.
- Talent Management source fields for Quality 1:1 and LEW are not yet located.
- Investigations-related rows require governance review before field-level mapping.
- VOC Pulse action roadmap content is recommendation context only, not V1 scoring input.

## Agent/RAG Alignment Rules

For MVP, HR Fitness Check should operate at L0-L3:

- L0/L1 for approved knowledge and source lookup.
- L2 for deterministic status classification and readiness analysis.
- L3 for supervised narrative recommendations grounded in scored results and caveats.
- L4 only for exact manual input or publishing previews.
- L5 disabled until manual input and publishing action classes have explicit approval records.
- L6 out of scope.

Required pilot controls:

- Source registry approval before indexing or retrieval.
- Canonical knowledge objects before implementation.
- Route policy before retrieval, tools, or model calls.
- Access filtering before context assembly.
- Deterministic scoring outside the model.
- Output validation for caveats, citations, unsupported claims, and action boundaries.
- Eval gates before pilot.
- Audit envelope for every run, tool call, model call, and publishing event.

## Data Flow Target

```text
Approved source registry
  -> canonical source mappings
  -> deterministic extraction or query
  -> rating rules
  -> fact_fitness_check_result
  -> rollups and exceptions
  -> supervised narrative context package
  -> validated UI and downstream publishing
```

The repo does not currently include a workbook extraction script or production scoring service. Those should be implemented only after V1 denominator, owners, source mappings, rating rules, classification, and governance approvals are complete.

## Confluence Publishing

The live HR Fitness Check PRD is Confluence page `5006537577`. It was re-verified on 2026-08-10 at version 15 with the reconciled 33-row working-catalog and synthetic MVP review boundaries. The five MVP support pages are downstream copies under the same HR Fitness Check product folder.

The two older publishing-helper files are tombstones only:

```text
docs/Confluence-PRD-Publishing-Copy.md
docs/Confluence-PRD-Structure-Preserving-Fact-Check.md
```

They must never be used as publishing payloads. Future Confluence updates must be prepared from the reviewed repository PRD and support documents, tied to a committed revision, approved through the supervised publishing process, and verified by re-reading the resulting page version.

## Development Notes

The checked-in POC is static HTML, CSS, and JavaScript. It has no build step and no package install requirement.

When production implementation begins, create explicit contracts before adding automation:

- Source contracts in knowledge-base/source-registry.md.
- Canonical object schemas in knowledge-base/canonical-knowledge-objects.md.
- Route and capability contracts in docs/Capability-Registry-and-Route-Policy.md.
- Tool approval and audit contracts in docs/Tool-Action-Governance.md.
- Eval and release gates in docs/Evaluation-Observability-Audit.md.

## License

This project is licensed under the terms specified in LICENSE.
