# ORBIT HR Fitness Check

Status: Q3 2026 launch planning; MVP review build available; approval gates remain open
Source of truth: Reviewed repository content; GitHub becomes authoritative after approved changes are committed and pushed
Current PRD: docs/HR-Fitness-Check-PRD.md
Target launch: 2026-09-28
Last updated: 2026-08-11

## Purpose

HR Fitness Check is an ORBIT product for quarterly C03-C06 HR Standard Work assessment across FC and Rx. It replaces a manually compiled, site-self-graded process with objective, repeatable, and traceable measurement while retaining authorized human review for manual and physical requirements.

The Q3 2026 target state is a governed closed loop: deterministic rules score approved measures; AI converts grounded results into site-specific insights and recommended paths to green; Regional HR reviewers accept, modify, decline, or defer each recommendation with rationale; and accepted actions can be recorded in the approved SharePoint tracker only after explicit user confirmation. Later comparable measurements link actions to verified quality movement and sustained results.

The product is being built for and in close collaboration with Weipan Le. It is estimated to make approximately 540 HR hours available annually for action rather than assessment compilation, representing $33,123 in estimated annual capacity value. These are planning estimates, not realized savings, until the baseline, live-source pilot, and reporting treatment are approved.

The current repository preserves the existing product intent while aligning the work to reusable Agentic HRA Agent Protocol and RAG Protocol patterns. The product should remain a governed HR operations cockpit, not a marketing page and not an unconstrained chatbot.

## Current Assessment

HR Fitness Check is directionally aligned with the target Agent/RAG architecture because the PRD protects deterministic scoring, manual evidence, missing data, stale data, human review, explicit action confirmation, and outcome lineage. It is not yet pilot-ready as a governed agent/RAG implementation because the catalog, source mappings, rules, access controls, recommendation workflow, SharePoint action class, eval gates, observability, audit, rollout, and outcome policies still need approval and implementation.

The latest audit-sheet disposition is:

| Disposition | Count | Meaning |
| --- | ---: | --- |
| Working in-scope intent | 33 | Business intent only; not an approved production denominator. |
| Current owner role populated | 33 | Named accountability and approval remain open. |
| Draft Column G dispositions in the preservation-safe local mapped derivative | 33 | 19 candidate; 8 blocked; 4 manual/hybrid; 1 validated-object/rule-pending; 1 derived. |
| Production-approved source mappings | 0 | Source and scoring readiness remain incomplete. |
| Reviewer / result populated in the July 29 SharePoint baseline | 0 | Review and scoring evidence remain incomplete. |

The original SharePoint workbook baseline, last modified 2026-07-29, retains `Resource to Check` in Column F and has a blank `Snowflake Table` mapping target in Column G. Live Snowflake metadata validation on 2026-08-11 produced the preservation-safe local mapped derivative summarized above. Many candidates are sandbox-only, the derivative has not been connector-verified as published to SharePoint, and none of its mappings is production-approved.

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
|   |-- HR-Fitness-Check-Q3-2026-Product-Narrative.md
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
| docs/HR-Fitness-Check-Q3-2026-Product-Narrative.md | Leadership-ready Q3 2026 overview, roadmap, value statement, and definition boundaries. |
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
npm run test:e2e:install
npm run test:all
npm start
```

Open:

```text
http://127.0.0.1:8800/
```

The MVP includes Overview, Work queue, Site review, Data readiness, Reports, and Audit views. Its reporting contract uses green share and evidence coverage with explicit numerators and denominators. Missing, stale, blocked, manual-required, and unmapped evidence is never converted to a red rating. Quarter comparisons are disabled when catalog versions are not comparable.

The review build is not a production system: it has no live HR-system connection, production authorization, model-generated recommendation workflow, SharePoint write-back, outcome linkage, or approved scoring denominator.

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

- The original July 29 SharePoint workbook has blank Column G values; Column F remains `Resource to Check`.
- The 2026-08-11 preservation-safe local mapped derivative contains draft Column G dispositions for all 33 rows: 19 candidate, 8 blocked, 4 manual/hybrid, 1 validated-object/rule-pending, and 1 derived.
- Many candidate mappings are sandbox-only; zero mappings are production-approved, and SharePoint publication remains pending connector verification.
- Current owner roles are populated for all 33 working rows; named accountability and approval are still required.
- ServiceNow HR case/task source discovery remains blocked by schema/source confirmation.
- Workday beneficiary and emergency contact fields were not found in the first HRDM metadata pass.
- Quality 1:1 and LEW have candidate sandbox objects, but field, rule, source-owner, and production approvals remain open.
- Investigations-related rows require governance review before field-level mapping.
- VOC Pulse action roadmap content is recommendation context only, not V1 scoring input.

## Agent/RAG Alignment Rules

For MVP, HR Fitness Check should operate at L0-L3:

- L0/L1 for approved knowledge and source lookup.
- L2 for deterministic status classification and readiness analysis.
- L3 for supervised narrative recommendations grounded in scored results and caveats.
- L4 for exact manual-input, recommendation-decision, SharePoint-action, or publishing previews after governance approval.
- L5 disabled by default. A single supervised SharePoint action-recording class may be enabled only after explicit authorization, confirmation, idempotency, rollback, audit, and eval gates pass.
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
  -> supervised insight and recommendation context package
  -> authorized human decision and rationale
  -> confirmed SharePoint action record
  -> comparable follow-up measurement and outcome linkage
  -> validated UI, evaluation, and downstream publishing
```

The repo does not currently include a workbook extraction script or production scoring service. Those should be implemented only after V1 denominator, owners, source mappings, rating rules, classification, and governance approvals are complete.

## Confluence Publishing

The live HR Fitness Check PRD is Confluence page `5006537577`. Before the August 11 update it was version 17 and contained stakeholder edits that were reconciled into the repository, including the September 28 launch target, role-owner decision, required reporting hierarchy, source-list changes, and collaboration notes. The five MVP support pages are downstream copies under the same HR Fitness Check product folder and must retain their synthetic, read-only current-state boundary.

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
