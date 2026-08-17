# HR Fitness Check - Project Progress

**Last Updated**: 2026-08-17

**Status**: Q3 2026 - read-only synthetic MVP complete for review; launch-readiness approvals remain open

**Planned Target**: 2026-09-28, subject to catalog, source, rule, access, governance, and production-readiness approvals

**Scope**: FC and Rx C03-C06 HR Standard Work

**Product Owner**: Kenny Wallace

**Process Owner / SME and Collaborator**: Weipan Le

---

## Executive Summary

HR Fitness Check advances the ORBIT mission by replacing a manually compiled, site-self-graded quarterly assessment with a continuous, evidence-backed quality-improvement workflow for FC and Rx C03-C06 HR Standard Work. The target operating model combines provisional Monthly Progress Checks, formal Quarterly Fitness Checks, annual Fitness Check reporting derived from certified quarterly results, authorized On-Demand Previews or Historical Recasts, and a governed conversational agent for questions, attributed context, feedback, and change proposals.

The review-ready MVP is complete as a read-only application that uses synthetic site results and the latest 33-row working catalog. It demonstrates the intended operational experience, deterministic metric behavior, provenance, reporting, source-readiness review, and governance boundaries without connecting to production HR systems or writing to downstream tools.

The product is not pilot- or production-ready. The working catalog remains approval-pending. Draft row-level source dispositions are now published and version-verified in the exact original SharePoint workbook, but production source mappings, monthly/quarterly measure construction, scoring rules, Quarterly Fitness Check certification, structured context, feedback routing, access controls, governance decisions, operational controls, and production approvals remain open. The current planned target is 2026-09-28, contingent on those launch gates being satisfied.

HR Fitness Check is being built for and in close collaboration with Weipan Le.

---

## Current Product Snapshot

| Area | Current State |
|---|---|
| Business scope | Monthly Progress Checks, Quarterly Fitness Checks, and annual reporting of FC and Rx C03-C06 HR Standard Work, with authorized On-Demand Preview/Historical Recast support |
| Working catalog | 33 task rows, all marked in-scope intent; approval pending and not an approved production scoring denominator |
| Accountability | Owner roles are populated for all 33 rows; named accountability and approval remain open |
| MVP | Read-only synthetic review build complete and ready for stakeholder review |
| Data posture | Synthetic site results only; no production HR-system connection or production scoring service |
| Source readiness | 33/33 draft Column G dispositions in the published original SharePoint workbook: 21 candidate, including 2 external governed-source candidates; 5 blocked; 5 manual/hybrid; 1 validated-object/rule-pending; and 1 derived. Fifteen candidates remain sandbox-dependent and 0 mappings are production-approved. |
| Cadence readiness | Target contract documented; 0 measures have approved monthly eligibility, monthly construction, quarterly construction, or quarterly certification status |
| Agent context posture | Target taxonomy and safeguards documented; persistent context, evidence disputes, source/process-change proposals, and feedback routing are not implemented in the current MVP |
| Launch posture | Planned target of 2026-09-28; pilot and production readiness remain gated by approvals and release evidence |

The five rows present in the June 30 working snapshot but absent from the latest July 29 workbook still require an approved disposition. Draft identifiers must not be used as production join keys until stable IDs and the final V1 denominator are approved.

---

## Completed and Ready for Review

- [x] Reconciled the latest working catalog to 33 task rows and preserved its approval-pending status.
- [x] Built the local read-only MVP with synthetic site results, item-derived reporting, explicit provenance, and visible catalog/data caveats.
- [x] Implemented deterministic review-build behavior for ratings, missing evidence, catalog readiness, rollups, and reports.
- [x] Preserved manual-required, missing, stale, blocked, and unmapped states without silently converting them to red ratings.
- [x] Added contract, API, reporting, fixture, browser, accessibility, and responsive-interface test coverage for the review build.
- [x] Documented the target source registry, canonical knowledge objects, route policy, tool/action boundaries, evaluation controls, audit-trail posture, and rollout gates.
- [x] Established source-inventory, discovery, and ingestion-planning artifacts for continued mapping work.
- [x] Validated live Snowflake metadata, integrated governed non-Snowflake source leads, and published draft Column G dispositions for all 33 rows to the exact original SharePoint workbook; post-write verification on 2026-08-17 confirmed version `34.0`, modified `2026-08-17T16:16:20Z`, size 37,518 bytes, `G2:G34` 33/33 exact and nonblank, and the added `Measure Contract`, `Cadence & Context`, and `Product Readiness` sheets with 19 gates. `quarterly_fitness_check` and `annual_summary` are present and legacy `quarterly_audit` is absent. No production approval is claimed.
- [x] Defined the future-state product contract for provisional Monthly Progress Checks, formal Quarterly Fitness Checks whose results may reach certified state, annual reporting derived from certified quarterly results, On-Demand Previews, Historical Recasts, and a governed conversational context/feedback loop.
- [x] Added an internal future-state working-backwards press release with explicit target-date, approval, and estimated-not-realized value caveats.

Completion of the review build does not approve the catalog, production data, scoring rules, access model, AI use, write actions, rollout, or production release.

---

## Work in Progress

### 1. Catalog Approval

- [ ] Approve the final V1 denominator for the 33-row working catalog.
- [ ] Approve stable Standard Work item IDs.
- [ ] Resolve the five rows absent from the latest workbook without an approved removal decision.
- [ ] Assign and approve named accountable owners, not only owner-role labels.
- [ ] Approve an implementation mode for every row: automatable, hybrid/manual input, manual only, or deferred.

### 2. Nine-Source Evidence and Source Mapping

The current manual process gathers evidence across nine source categories documented in the PRD:

1. UKG
2. Workday
3. ServiceNow / SNOW
4. Tableau dashboards
5. Smartsheet
6. SharePoint
7. CCURE
8. Absence One / LOAA portal
9. Local physical checks

Source discovery has identified leads across SharePoint, Snowflake/HR DataMart, UKG, Workday, ServiceNow, FC HR Analytics, Tableau, ECHO, CAT, and related workflow artifacts. Source availability is not the same as source approval or production readiness.

The source-integrated pass classifies the 33 draft Column G dispositions as 21 candidate, including 2 external governed-source candidates; 5 blocked; 5 manual/hybrid; 1 validated-object/rule-pending; and 1 derived. Fifteen candidates remain sandbox-dependent. On 2026-08-17, the exact original SharePoint workbook was updated and re-read: item `01LYSC3QO2BT5B2GJIV5C3ZACT2RWFSRLV`, version `34.0`, last modified `2026-08-17T16:16:20Z`, 37,518 bytes, with `G2:G34` 33/33 exact and nonblank and three governed design sheets added: `Measure Contract`, `Cadence & Context`, and `Product Readiness` with 19 gates. Content verification confirms `quarterly_fitness_check` and `annual_summary` are present and legacy `quarterly_audit` is absent. Column F remains `Resource to Check`; the workbook extension does not approve any production mapping, rule, or release gate.

The external source pass located the EPA ServiceNow resolved-case export for SNOW and LOAA discovery, site Smartsheet workflows for FLO and temporary schedules, site SharePoint locker examples, governed Workday report paths for beneficiary and emergency-contact checks, EthicsPoint/OpenBark governance paths for investigations, and a future TM Experience/Signage Forms data contract. These are source-found leads, not approved production mappings.

- [ ] Complete the source system, object/table/report, fields, joins, filters, site key, date window, data owner, and refresh cadence for every automatable row.
- [ ] Obtain source-owner approval and document classification, access, retention, redaction, citation, lineage, and freshness controls.
- [ ] Resolve blocked or incomplete mappings, including ServiceNow schema confirmation and remaining Workday and Talent Management fields.
- [ ] Separate approved scoring evidence from recommendation context and discovery-only artifacts.

### 3. Scoring Rules and Baseline

- [ ] Approve rating rules, thresholds, eligibility logic, and missing-data treatment for each scored measure.
- [ ] Validate deterministic calculations against SME-approved examples.
- [ ] Recast the Q3 2025 baseline against the approved V1 denominator before enabling comparable quarter-over-quarter claims.
- [ ] Define the comparable-measurement and sustained-improvement criteria used for outcome tracking.

### 4. Manual and Physical Review Workflow

- [ ] Confirm which measures require authorized manual review or physical inspection.
- [ ] Approve the manual evidence system of record, reviewer roles, evidence requirements, correction flow, retention, and audit-trail controls.
- [ ] Preserve human judgment for requirements that cannot be sourced and scored reliably.

### 5. Access, Governance, and Production Readiness

- [ ] Approve the FC, Rx, site, region, and network access model and hierarchy.
- [ ] Implement and test production identity, authorization, scope filtering, and least-privilege controls.
- [ ] Obtain required source-owner, Product, HR Operations, Data Governance, Privacy, Legal / Employment Law, Security, Architecture, and Change approvals.
- [ ] Approve AI data handling, grounding, citation, validation, evaluation, monitoring, escalation, and rollback controls.
- [ ] Implement production source activation, deterministic scoring, durable lineage/result storage, audit logging, observability, support, and release evidence.
- [ ] Keep source-system, SharePoint tracker, and Confluence writes disabled until the applicable action class and exact user-confirmation workflow are approved and tested.

### 6. Monthly Pulse, Quarterly Fitness Checks, and Annual Reporting

- [ ] Map every production row to C03-C06 and define its measure type, population, numerator, denominator, exclusions, direction, and complete rating boundaries.
- [ ] Approve whether each measure is monthly-enabled or Quarterly-Fitness-Check-only.
- [ ] Approve separate monthly and quarterly construction rules, evidence windows, freshness, comparability, and missing-data behavior; quarterly ratings must not be created by averaging monthly colors.
- [ ] Implement run types for `monthly_progress`, `quarterly_fitness_check`, `on_demand_preview`, and `historical_recast` with explicit authority, certification state, and version history.
- [ ] Define Quarterly Fitness Check evidence freeze, reconciliation, required manual review, sign-off, certification, reopening, and recast controls.
- [ ] Implement annual and year-to-date Fitness Check reporting as a summary of certified Quarterly Fitness Checks; do not create a fifth scoring run.

### 7. Conversational Context, Feedback, and Learning Loop

- [ ] Approve feedback types and owner queues for evidence disputes, operational context, source/process changes, recommendation feedback, action updates, narrative feedback, and product feedback.
- [ ] Implement a preview-and-confirm flow for durable context with user attribution, site/period/measure scope, effective dates, audience, sensitivity, verification state, allowed uses, and expiration.
- [ ] Implement correction, retraction, supersession, conflict, verification, and stale-context controls.
- [ ] Keep system findings, user-provided context, model interpretation, and recommendations visibly distinct in monthly and quarterly narratives.
- [ ] Route source/process changes to authorized owners; do not change production mappings, rules, denominators, or scores from unverified chat feedback.
- [ ] Establish the governed learning sequence: capture/classify, protect or redact, human review, propose change, evaluate/regression-test, approve/version, release, monitor, and rollback.

No catalog, source, rule, access, governance, pilot, or production approval is implied by the MVP review build.

---

## Closed-Loop Roadmap

The roadmap connects the full improvement cycle:

```text
Grounded finding
  -> provisional Monthly Progress Check or formal Quarterly Fitness Check
  -> attributed context, evidence dispute, or source/process-change proposal
  -> evidence-backed recommendation
  -> regional HR decision and rationale
  -> accepted action, owner, and target date
  -> completed action
  -> next comparable measurement
  -> verified quality movement and sustained-result review
```

Planned capabilities include:

- Apply deterministic rules to approved measures using trusted source data.
- Run Monthly Progress Checks for early course correction while preserving a separately governed Quarterly Fitness Check certification workflow.
- Produce annual and year-to-date Fitness Check reports from certified quarterly results without creating a separate annual score.
- Support authorized On-Demand Previews and Historical Recasts without overwriting certified history.
- Use AI to translate grounded results into site-specific insights and recommended paths to green.
- Let the agent ask focused questions and capture confirmed context or feedback with attribution, scope, verification, access, and expiration controls.
- Route evidence disputes and source/process-change proposals to authorized reviewers without changing deterministic results or approved mappings.
- Allow regional HR teams to accept, modify, decline, or defer each recommendation and capture the decision rationale.
- With user confirmation, record an accepted action, owner, and target date in the SharePoint tracker after the write workflow is approved.
- Link completed actions to subsequent comparable measurements so ORBIT can evaluate recommendation acceptance, execution, quality movement, and sustained results.
- Expand the agent's role from recording decisions to facilitating the review in the same governed interaction.
- Use context, feedback, decision, and outcome evidence to evaluate and continuously improve narrative and recommendation quality through a governed release process; no autonomous learning or unapproved model update is implied.

These closed-loop capabilities are roadmap items and are not implemented as production write actions in the current read-only MVP.

---

## Estimated Capacity Value

The current estimate is that reducing site- and network-level assessment compilation could make approximately **540 HR hours available annually** for action rather than assessment compilation. At the documented valuation, that represents approximately **$33,123 in estimated annual capacity value**.

This is a capacity estimate, not realized savings. The assumptions, baseline effort, adoption, and observed post-launch capacity should be validated before claiming realized value. Product success will ultimately be measured by whether recommendations are accepted, applied, and followed by verified, sustained improvement in HR Standard Work quality.

---

## Milestones

| Milestone | Status |
|---|---|
| Read-only synthetic MVP complete for stakeholder review | Complete |
| Latest 33-row working catalog reconciled in repository artifacts | Complete; approval pending |
| Nine-source inventory and initial discovery artifacts established | In progress; mappings and approvals open |
| Catalog, source, rule, manual-workflow, access, and governance gates closed | Open |
| Monthly Progress Check and Quarterly Fitness Check measure contracts approved | Open; 0 measures approved for production cadence |
| Conversational context, feedback routing, and learning-loop controls approved | Open; target contract documented only |
| Q3 2026 planned target - 2026-09-28 | Planned; contingent on launch gates |
| Recommendation, decision, action, and outcome loop | Roadmap; production writes not approved |

---

## Product Guardrails

1. Deterministic rules, not AI, calculate approved Standard Work ratings.
2. Manual and physical inspection requirements remain with authorized HR reviewers.
3. Missing, stale, blocked, manual-required, or unmapped evidence is shown explicitly and is not silently scored red.
4. AI-generated insights must be grounded in approved results, preserve caveats, and remain subject to human review.
5. The agent may not imply causality, individual accountability, approval, execution, or sustained improvement without supporting evidence.
6. Monthly Progress Checks and On-Demand Previews remain provisional; only a Quarterly Fitness Check result that completes the approved certification workflow becomes the official quarterly record, and monthly colors are not averaged into a quarterly rating.
7. Annual and year-to-date Fitness Check reports derive from certified Quarterly Fitness Checks and do not create a separate scoring run.
8. User-provided context remains attributed, scoped, time-bounded, reviewable, and separate from system evidence. It cannot by itself change a score, denominator, rule, or source mapping.
9. Persistent context requires explicit confirmation, access controls, effective dates, verification state, expiration, correction/retraction, and audit-trail history.
10. Feedback informs governed evaluation and approved versioned changes; it does not authorize automatic model learning or production behavior changes.
11. Production reads and writes remain disabled until source, access, action, confirmation, audit-trail, and rollback controls are approved and tested.
12. Confluence remains a downstream publishing surface; reviewed repository content is updated and approved first.

---

## Current Repository References

- Repository overview and current status: `README.md`
- Product requirements: `docs/HR-Fitness-Check-PRD.md`
- Internal future-state press release: `docs/HR-Fitness-Check-Internal-Press-Release.md`
- Current 33-row catalog reconciliation: `docs/Reviewed-Checklist-Disposition.md`
- Architecture readiness and gaps: `docs/Architecture-Alignment-Assessment.md`
- Agent/RAG implementation roadmap: `docs/Agent-RAG-Alignment-Plan.md`
- Source inventory: `knowledge-base/source-inventory.md`
- Source registry and approval requirements: `knowledge-base/source-registry.md`
- Source-mapping backlog: `knowledge-base/ingestion-backlog.md`
- MVP data map and classification: `docs/mvp/Data-Map-and-Classification.md`
- MVP technical and scoring contract: `docs/mvp/Technical-Design-and-Scoring-Contract.md`
- MVP UX and reporting specification: `docs/mvp/UX-and-Reporting-Specification.md`
- MVP evaluation and release evidence: `docs/mvp/Evaluation-and-Release-Evidence.md`
- MVP runbook and rollout gates: `docs/mvp/Runbook-and-Rollout.md`
- Tool and action governance: `docs/Tool-Action-Governance.md`
- Rollout and operating model: `docs/Rollout-and-Operating-Model.md`

The live HR Fitness Check PRD is Confluence page `5006537577`. Confluence updates must be prepared from an approved repository revision and verified after publishing.
