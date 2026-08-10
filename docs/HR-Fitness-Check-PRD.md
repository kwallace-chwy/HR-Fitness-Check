# HR Fitness Check Product Requirements Document

Version: 0.4
Status: MVP review build - working catalog approval pending
Owner: Kenny Wallace, ORBIT Program Owner and Product Owner
Process Owner / SME: Weipan Le
Product Sponsor: Ashley Larue
Last Updated: 2026-08-06

## 1. Vision And Problem Statement

Tagline: HR Fitness Check measures the quality of standard work. Is the stated process being followed?

HR Fitness Check is an ORBIT product that gives FC HR Operations Teams an objective, repeatable, and evidence-backed quarterly assessment of HR Standard Work. The product should reduce the manual scavenger hunt across dashboards, reports, physical checks, trackers, and subjective interpretation while preserving human accountability where judgment or physical inspection is required.

The current state is a quarterly, spreadsheet-driven process. HR teams gather evidence across systems such as UKG, Workday, ServiceNow/SNOW, ECHO, Tableau dashboards, Smartsheet, CAT, trackers, and local physical checks. The work is time-consuming, vulnerable to inconsistent interpretation, and dependent on Smartsheet, which is sunsetting as the durable workflow home.

Version 1 must automate only the portions of the exercise with reliable source data, approved source mapping, and testable rating rules. It must explicitly flag manual, research, missing, stale, or unmapped items instead of converting uncertainty into false red/yellow/green ratings.

## 2. Current Discovery Update

This PRD supersedes both the older 49-row discovery snapshot and the June 30 38-row snapshot. The latest available `ORBIT - HR Fitness Check Matrix.xlsx` was inspected from SharePoint with a last-modified timestamp of 2026-07-29 16:32:27 UTC. Its active working catalog contains 33 task rows:

| Disposition | Count | Product meaning |
|---|---:|---|
| Working in-scope intent | 33 | Business intent only. No row enters a production denominator until catalog, mapping, rule, and governance approval. |
| Current owner role populated | 33 | Role ownership is present for all rows; named accountability and approval remain release decisions. |
| Approved production items | 0 | The workbook is unfinished and was still described as approval-pending in Slack on 2026-07-28 and 2026-08-04. |

Important workbook readiness facts as of 2026-08-06:

- The workbook has no populated `Snowflake Table` values.
- The workbook has populated `Current Owner` roles for all 33 rows.
- The workbook has no populated `Reviewer(s)` values for the 33 rows.
- The workbook has no populated result / fitness values for the 33 rows.
- `HR Metrics & Roster Health` has no approved threshold.
- Five June 30 rows are absent: `Inspect HR/support office workspaces`, `Review and answer VOC board daily (with GM)`, `Prepare Ops training/development (such as in AMMs)`, `Monthly Engagement Calendar`, and `HR Floor Engagement & Follow-Ups`.
- The old target decision date of 2026-06-14 has passed. A new launch or scope decision date is TBD.
- Q3 2025 baseline percentages remain discovery evidence only until the denominator is recalculated against the approved V1 catalog.

## 3. Source Of Truth And Publishing Model

This GitHub repository is the controlled source of truth for HR Fitness Check product requirements, reviewed checklist disposition, runtime contracts, source mapping requirements, governance decisions, and implementation guidance once approved. Confluence pages, Word exports, and presentation materials are downstream publishing artifacts and must be refreshed from this repository.

The Excel workbook remains discovery evidence. It should not become the durable system of record for V1 scope, scoring logic, data mapping, or approval status.

Source discovery and ingestion planning are maintained in `knowledge-base/`. Those files capture located SharePoint, Snowflake, Tableau, ServiceNow, Workday, UKG, ECHO, CAT, and FC HR Analytics source leads, plus unresolved table and field mapping blockers.

## 4. Objectives And Success Measures

| ID | Success measure | Definition / target | Current status |
|---|---|---|---|
| SM-001 | Catalog readiness | 100% of reviewed rows have stable item IDs, final V1 disposition, current owner, objective, source family, and rating band. | 33 working rows reviewed; owner roles are populated, while stable IDs and final approval remain open. |
| SM-002 | V1 scope readiness | 100% of the 33 working rows are classified as automatable, hybrid/manual input, manual only, or deferred with rationale. | Not complete. Workbook says in scope but does not decide automation mode. |
| SM-003 | Source mapping readiness | 100% of V1 rows have source system, source object/table/report, source fields, filters, site key, date window, data owner, and refresh cadence. | Not started in workbook; Snowflake Table column is blank. |
| SM-004 | Rating accuracy | Deterministic scoring matches SME-approved examples for each mapped item. | TBD after examples and source fields are approved. |
| SM-005 | Baseline recast | Q3 2025 baseline is recalculated using the approved V1 denominator and missing-data policy. | The 33-row working catalog is not an approved denominator; historical legacy ratings are not comparable until a mapping or recast is approved. |
| SM-006 | Manual control integrity | Manual, physical, stale, missing, and unmapped items never masquerade as automated facts. | Required control; design in progress. |
| SM-007 | Insight usefulness | Pilot HRMs and HRDs agree generated strengths, opportunities, and solution prompts are useful for action planning. | TBD during pilot. |
| SM-008 | Time savings | Reduce quarterly manual completion, setup, audit, and report compilation effort per site. | Baseline estimate still TBD. |

## 5. Users And Stakeholders

Primary users:

- FC HRMs who need site-level Fitness Check results and action-planning support.
- HRDs who need regional, site-group, Rx, and network rollups.

Secondary stakeholders:

- FC HR teams who consume site-specific findings through HRMs.
- HR leadership using aggregate results for operating visibility.
- ORBIT product team maintaining requirements, scope, rollout readiness, and product decisions.
- Phoenix engineering owning chatbot delivery, rendering, access controls, and ORBIT agent experience.
- Data engineering owning source mapping, Snowflake datamart design, lineage, and data quality controls.
- QA validating rule calculations, output quality, and AI guardrails.
- Data Governance, Legal, Employment Law, HR Operations, EPA, and Security reviewing data use, retention, sharing, and recommendations.

Accountability map:

| Area | Accountable owner |
|---|---|
| ORBIT program and product ownership | Kenny Wallace |
| Fitness Check process ownership and SME review | Weipan Le |
| Product sponsorship | Ashley Larue |
| Data governance / compliance | TBD; legacy draft named Matthew Christian |
| Legal / Employment Law | TBD |
| HR Operations / Field HR | TBD |
| Phoenix / AI Engineering | TBD |
| HR Data and Apps Engineering | TBD |
| Change Management | TBD |

## 6. Product Scope

V1 is a quarterly Standard Work health assessment workflow. It is not a generic dashboard and it is not a fully autonomous HR action-planning agent.

In scope for V1:

- Reviewed catalog ingestion for the 33-row working catalog with stable `sw_item_id` values and current disposition.
- Measurement of approved rows once source mapping, implementation mode, rating rules, and governance are approved.
- Per-item implementation mode: automatable, hybrid/manual input, manual only, or deferred.
- Structured green/yellow/red rating rules for approved rows.
- Explicit result statuses separate from rating.
- Site x quarter x Standard Work item result grain.
- Site-level outputs showing strengths, opportunities, data quality caveats, manual-required items, and solution-planning prompts.
- Regional, Rx, site-group, and network rollups after hierarchy is confirmed.
- Recast Q3 baseline using the approved V1 denominator and missing-data policy.
- Quarter-over-quarter retention in an approved durable store.
- Phoenix chatbot access for authorized HRMs and HRDs.
- Supervised AI summaries only after deterministic results, data caveats, and governance controls are available.

Out of scope for V1:

- Rows absent from the latest working catalog unless a later approved decision restores them.
- Any in-scope intent row that is deferred by implementation-mode or governance decision record.
- Autonomous action plan creation or distribution without human review.
- Write-back to source systems.
- Automation of physical inspections or subjective checks without a manual input workflow.
- Name-based joins between catalog rows and source outputs.
- Individual employment decisions, individual accountability assignment, or unsupported causal claims.
- Daily or intra-quarter scoring cadence unless explicitly approved as a later capability.

## 7. Reviewed V1 Item Disposition

Detailed reviewed checklist disposition is maintained in `docs/Reviewed-Checklist-Disposition.md`.

Current in-scope intent item list:

| ID | Current owner role | HR task |
|---|---|---|
| A-001 | HRA | TM Experience Walk |
| A-002 | HRA | Standup Audits |
| A-003 | HRA | New Hire Orientation |
| A-004 | HRA | HR Metrics & Roster Health |
| A-005 | HRA | HR ServiceNow (SNOW) Tickets |
| A-006 | HRA | VET Process |
| A-007 | HRA | VTO Process |
| A-008 | HRA | Shift Transfers / Includes site-to-site transfers |
| A-009 | HRA | FLO Certification management |
| A-010 | HRA | Missing Time Stamps |
| A-011 | HRA | Unscheduled but Working |
| A-012 | HRA | 13h Day (or +1h over scheduled shift) Risk Assessment |
| A-013 | HRA | 60h Week Risk Assessment |
| A-014 | HRA | Locker Management |
| A-015 | HRA | Badge Management |
| A-016 | HRA | Swag Management |
| A-017 | HRA | Audit schedule groups |
| A-018 | HRA | Review Temporary Schedule Adjustments |
| A-019 | HRBP | Attendance Management |
| A-020 | HRBP | Ensure site TMs have listed beneficiaries |
| A-021 | HRBP | Ensure site TMs have listed emergency contacts |
| A-022 | HRBP | Quality 1:1 |
| A-023 | HRBP | LEWs |
| A-024 | HRBP | Investigations |
| A-025 | HRG | LOAA Management |
| A-026 | HRM | CAT Tracker |
| A-027 | HRM | Fishbowl Display |
| A-028 | HRM | VOC Board Management |
| A-029 | HRM | Roundtables |
| A-030 | HRM | Chewtopian of the Month/Leader of the Pack |
| A-031 | HRM | Audit exempt HR Standard Work |
| A-032 | HRM | Site communication & signage |
| A-033 | HRM | Labor Planning |

## 8. Proposed Solution

The product will provide an ORBIT-backed Fitness Check workflow that:

1. Maintains a versioned catalog of approved HR Standard Work items.
2. Maps each V1 item to a source system, source object, source fields, filters, date window, and data owner.
3. Calculates deterministic green/yellow/red ratings only for approved mapped items.
4. Routes manual, hybrid, or physical-inspection items through a controlled manual input workflow.
5. Stores scored and manual results at site x quarter x item grain.
6. Produces site, regional, Rx, and network views with green share, evidence coverage, exceptions, counts, caveats, and comparable trend context.
7. Uses supervised AI only to summarize already-grounded results into strengths, opportunities, and recommended solution-framing prompts.

## 9. Why AI

AI is useful for narrative synthesis and action-planning support, not for deciding deterministic ratings. The scoring engine should be rules-based wherever source data and rating bands are approved.

Approved AI uses:

- Summarize top strengths and opportunities from scored item results.
- Convert scored findings into HR-reviewed SWOT-style language.
- Draft solution-planning prompts tied to specific low-scoring items and data caveats.
- Explain caveats in plain language when source status is missing, stale, manual, or unmapped.

Disallowed AI uses:

- Inventing ratings, causes, or source facts.
- Assigning blame to individuals.
- Making employment decisions.
- Broadly distributing recommendations before governance approves the audience and review model.
- Hiding uncertainty or data quality limitations.

## 10. Features

| Feature ID | Feature name | Priority | Description | Success metric |
|---|---|---|---|---|
| F-001 | Reviewed catalog management | Must | Store the 33-row working catalog with stable IDs, disposition, owner, objective, rating band, source family, and effective dates. | 100% rows loaded with stable IDs and disposition. |
| F-002 | Scope decision tracking | Must | Preserve in-scope intent, remove, implementation-mode, deferred, and manual/hybrid decisions. | No removed or deferred row appears in V1 denominator without decision approval. |
| F-003 | Source mapping registry | Must | Capture source system, object/table/report, fields, filters, joins, site key, date window, data owner, and refresh cadence. | 100% V1 rows have approved mapping or approved manual/deferred status. |
| F-004 | Rating rule engine | Must | Apply structured green/yellow/red rules for approved mapped rows. | SME-approved examples reconcile for every mapped row. |
| F-005 | Manual and hybrid input workflow | Must | Capture physical or judgment-based inputs with owner, timestamp, evidence reference, and result status. | No manual-only item is silently auto-scored. |
| F-006 | Data quality and lineage visibility | Must | Show source freshness, result status, rule version, source snapshot time, and caveats. | All scored rows trace to source and rule metadata. |
| F-007 | Site assessment output | Must | Produce strengths, opportunities, manual-required list, source caveats, and solution-planning prompts. | Pilot HRMs and HRDs rate output useful for action planning. |
| F-008 | Rollup reporting | Must | Aggregate site results to region, Rx, site group, and network after hierarchy is approved. | Rollups reconcile to approved baseline logic. |
| F-009 | Baseline recast and QoQ retention | Must | Recalculate Q3 baseline and retain quarterly results for trend analysis. | Historical comparison works without manual workbook reloads. |
| F-010 | Phoenix chatbot access | Must | Allow authorized HRMs and HRDs to request site or rollup assessments. | Authorized requests return appropriate scoped output. |
| F-011 | Supervised AI narrative | Should | Generate reviewable summaries from grounded results and caveats. | Narrative approval and edit rates tracked during pilot. |
| F-012 | Confluence publishing | Could | Publish approved assessments or documentation to a governed Confluence space. | Publishing audience, retention, and governance approved. |

## 11. Functional Requirements

| ID | Requirement | Priority | Acceptance criteria |
|---|---|---|---|
| FR-001 | The product must use stable `sw_item_id` values instead of HR task display names for joins and historical results. | Must | Given the reviewed workbook is loaded, when source results are joined, then joins use stable IDs and not display names. |
| FR-002 | The product must store each reviewed row's disposition. | Must | Given a row is marked remove or deferred by implementation decision, when V1 scoring runs, then the row is excluded unless an approved decision changes its disposition. |
| FR-003 | Each V1 row must have a current owner before launch readiness. | Must | Given the catalog is reviewed, when readiness is assessed, then every V1 row has a named business owner or the launch gate fails. |
| FR-004 | Each V1 row must have an implementation mode. | Must | Given the 33 working rows, when source mapping is complete, then each row is classified as automatable, hybrid/manual input, manual only, or deferred with rationale. |
| FR-005 | Each automatable row must have source fields, filters, joins, site key, date window, and data owner. | Must | Given a source mapping row, engineering can write and validate a query without interpreting prose. |
| FR-006 | The product must preserve result status separately from rating. | Must | Given missing, stale, manual, failed, or unmapped data, then the output shows an explicit result status and does not silently score it red. |
| FR-007 | The product must calculate green/yellow/red ratings using structured rules. | Must | Given source values and approved thresholds, then calculated ratings match SME-approved examples. |
| FR-008 | The canonical result grain must be site x quarter x Standard Work item. | Must | Given a completed run, then every line-item result includes site, quarter, `sw_item_id`, measured value, rating, result status, rule version, and run ID. |
| FR-009 | The product must recast the Q3 2025 baseline against the approved V1 denominator. | Must | Given the approved catalog, when baseline is generated, then removed or deferred rows do not distort V1 percentages. |
| FR-010 | The product must support site and rollup assessment requests through Phoenix for authorized users. | Must | Given an authorized HRM or HRD request, then Phoenix returns only the site or rollup output permitted by access rules. |
| FR-011 | The product must support manual inputs for physical or judgment-based checks. | Must | Given a manual-required item, when an authorized HR user submits a result, then the input stores owner, timestamp, evidence reference, rating, and `manual_input` result status. |
| FR-012 | AI-generated summaries must be grounded in scored results and caveats. | Should | Given sufficient scored results, then each narrative references the underlying item IDs or categories and is marked for HR review. |
| FR-013 | Governance approvals must be captured before launch. | Must | Given launch readiness review, then data governance, legal/employment law, HR operations, security, and architecture approvals are attached or linked. |

## 12. Non-Functional Requirements

| ID | Category | Requirement | Measure |
|---|---|---|---|
| NFR-001 | Lineage | Every score must trace to source system, source object, source fields, filters, measurement window, rule version, and run ID. | 100% of scored rows have lineage metadata. |
| NFR-002 | Data quality | Missing, stale, invalid, failed, or unmapped data must produce visible exceptions. | 0 silent failures in QA scenarios. |
| NFR-003 | Security | Results access must be restricted to approved HR audiences. | Access control tested for HRM, HRD, unauthorized user, and admin roles. |
| NFR-004 | Privacy | If source systems contain associate-level data, outputs must use the approved aggregation and retention model. | Data classification review completed before build approval. |
| NFR-005 | Auditability | Runs must capture input snapshot or query reference, source snapshot time, rule version, output time, and actor/system initiator. | Audit record exists for every completed run. |
| NFR-006 | Explainability | Users must see why a row received its rating where allowed by data classification. | Output includes measured value, threshold, source timestamp, and caveat when allowed. |
| NFR-007 | Resilience | Partial source failure must not block the entire assessment from rendering. | Failed source rows render with explicit status and are excluded or flagged per policy. |
| NFR-008 | Performance | Site-level assessment should be suitable for interactive Phoenix use. | P95 target TBD with engineering after source mapping. |
| NFR-009 | Retention | Quarterly results must be retained for approved QoQ comparison and audit. | Retention period approved by governance. |
| NFR-010 | Observability | Phoenix and scoring workflow failures must be observable. | Run logs, error rates, and LLM narrative events available in approved monitoring. |

## 13. Data Requirements

Core entities:

| Entity | Purpose | Required fields |
|---|---|---|
| `dim_standard_work_item` | Versioned catalog of reviewed Standard Work rows. | `sw_item_id`, display name, aliases, previous owner, current owner, objective, disposition, active flag, effective start/end quarter. |
| `dim_site` | Site and hierarchy metadata. | site ID, site code, business line, region, site group, Rx flag if applicable, active flag, effective dates. |
| `metric_source_map` | Source mapping registry. | `sw_item_id`, implementation mode, source system, object/table/report, fields, filters, site key, date logic, data owner, refresh cadence. |
| `rating_rule` | Executable scoring rules. | `sw_item_id`, rule version, metric type, unit, green rule, yellow rule, red rule, missing policy, SME approver. |
| `fact_fitness_check_result` | Scored or manual result. | site ID, quarter, `sw_item_id`, measured value, rating, result status, source snapshot time, rule version, run ID. |
| `fact_fitness_check_rollup` | Aggregated outputs. | quarter, rollup type, rollup ID, green count, yellow count, red count, valid-rated denominator, eligible denominator, evidence coverage, green share, generated timestamp. |

Required result statuses:

- `scored`
- `manual_required`
- `manual_input`
- `missing_source`
- `missing_value`
- `stale_data`
- `not_applicable`
- `unmapped`
- `calculation_error`
- `deferred_by_scope`

## 14. Governance And Boundaries

Data classification must be revalidated after source mapping. The older intake stated no PII, sensitive business data, or protected secrets, but several candidate sources may contain associate-level detail before aggregation.

Allowed ORBIT behavior:

- Summarize strengths and opportunities.
- Recommend areas of focus.
- Suggest solution-planning prompts.
- Explain data quality caveats.
- Provide source-backed site and rollup assessment outputs.

Disallowed ORBIT behavior:

- Make employment decisions.
- Assign accountability for defects to individuals.
- Infer unsupported root causes.
- Hide data quality limitations.
- Automatically distribute sensitive recommendations beyond approved audiences.
- Treat manual or physical checks as automated facts.

## 15. Release Criteria

| ID | Release criterion | Required before |
|---|---|---|
| RC-001 | Approved catalog derived from the 33-row working set, with stable IDs and current disposition. | Production engineering start |
| RC-002 | Current owner assigned for every V1 item. | Engineering build start |
| RC-003 | Each approved row classified as automatable, hybrid/manual input, manual only, or deferred. | Production engineering start |
| RC-004 | Source mapping complete for all automatable rows. | Engineering build start |
| RC-005 | Manual workflow decision approved for hybrid/manual rows. | MVP launch |
| RC-006 | Q3 2025 baseline recast against approved V1 denominator. | Pilot launch |
| RC-007 | Data governance, legal/employment law, security, HR operations, architecture, and change approvals documented. | MVP launch |
| RC-008 | Phoenix access model and security group confirmed. | MVP launch |
| RC-009 | QA validates scoring against SME-approved examples. | MVP launch |
| RC-010 | Pilot HRM/HRD feedback loop and issue triage process defined. | Pilot launch |

## 16. Risks

| Risk ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R-001 | The latest 33-row working list is treated as an approved scoring denominator before implementation-mode and governance decisions are complete. | Medium | High | Recast baseline only after final V1 catalog, source mapping, owner assignment, and missing-data policy are approved. |
| R-002 | Workbook says in scope, but source mapping is not available. | High | High | Treat in scope as business intent only; require implementation mode and source mapping before scoring. |
| R-003 | Source dashboards differ from system-of-record data. | Medium | High | Require source-owner approval and reconciliation examples for each mapped item. |
| R-004 | Manual/physical checks are automated without evidence controls. | Medium | High | Use manual input workflow with owner, timestamp, evidence reference, and result status. |
| R-005 | AI summaries overstate causality or hide caveats. | Medium | High | Ground narratives in scored IDs and caveats; require human review during pilot. |
| R-006 | Associate-level source data creates privacy or retention issues. | Medium | High | Complete data classification and aggregation review before build approval. |
| R-007 | Role-level owner labels are mistaken for named accountability or approval. | Medium | High | Confirm named owners and approvers as a launch gate. |

## 17. Open Questions

| ID | Question | Owner | Needed by |
|---|---|---|---|
| OQ-001 | Who approves the final V1 catalog and movement of research items into or out of V1? | Kenny / Weipan / Ashley | Scope decision |
| OQ-002 | What is the new launch or scope decision date now that 2026-06-14 has passed? | Kenny / Ashley | Scope decision |
| OQ-003 | Are the workbook's current owner roles approved, and who is the named accountable owner for each V1 item? | Weipan | Build readiness |
| OQ-004 | Which V1 items are automatable from Snowflake or approved APIs today? | Data engineering / source owners | Build readiness |
| OQ-005 | Which V1 items require manual input, and where will manual input live? | Kenny / Phoenix / Weipan | Design readiness |
| OQ-006 | What is the approved missing-value policy for eligible-item and valid-rated denominators? | Weipan / Data Governance | Baseline recast |
| OQ-007 | Should any composite quality index be introduced later? It is intentionally excluded from the MVP pending definition and approval. | Kenny / Weipan / Ashley | Post-MVP decision |
| OQ-008 | What site hierarchy controls 1G, 2G, Rx, region, and network reporting? | HR Operations / Data | Build readiness |
| OQ-009 | What governance approvals are required for AI-generated solution prompts? | Legal / Data Governance / HR Ops | Launch readiness |
| OQ-010 | Which current in-scope intent rows, if any, should be deferred before MVP launch because source mapping, governance, or manual workflow cannot be completed? | Weipan / Ashley | Scope decision |

## 18. Agent/RAG Architecture Alignment

HR Fitness Check should align to the reusable Agentic HRA Agent Protocol and RAG Protocol before pilot. The current product intent is directionally aligned because scoring is deterministic, AI behavior is supervised, manual/missing/stale/unmapped states are explicit, and GitHub is the source of truth.

Pilot readiness requires the control artifacts now added to this repository:

- `docs/Architecture-Alignment-Assessment.md`
- `docs/Agent-RAG-Alignment-Plan.md`
- `docs/Capability-Registry-and-Route-Policy.md`
- `docs/Tool-Action-Governance.md`
- `docs/Evaluation-Observability-Audit.md`
- `docs/Rollout-and-Operating-Model.md`
- `knowledge-base/source-registry.md`
- `knowledge-base/canonical-knowledge-objects.md`
- `knowledge-base/retrieval-context-assembly.md`

For MVP, supported behavior should remain L0-L3: approved source lookup, deterministic analysis, and supervised recommendations. L4 preview can be used for manual input or Confluence publishing previews after governance approval. L5 autonomous writes and L6 autonomous business operation are out of scope.

## 19. Appendix: Workbook Reconciliation Notes

The July 29 workbook changes the working catalog from the older 49-row snapshot and June 30 38-row snapshot to 33 rows, all marked in scope. "In Scope." is still business intent only. Rows must not be counted in a production denominator until catalog approval, implementation mode, source mapping, rating rules, and missing-data policy are approved.

Specific data quality concerns captured in the workbook notes:

- SNOW Tickets: non-compliance may be affected by inconsistent suspend-feature use and tickets held by network partners.
- LOAA Management: timing may depend on information received from Absence One.
- Missing Time Stamps: the UKG Punch Lunch Audit report may be more useful in identifying missing lunches/missed lunch punches than missing punches, and report logic may need improvement.
- 13h Report: workbook note flags a roster/reporting flaw.
- Lunch Punch: workbook note says the Meal Break Audit SOP does not work as expected in UKG.
- Attendance Management: workbook note flags a discrepancy between Tableau and UKG counts.
- Beneficiaries: workbook note says the Workday report may flag TMs who are not enrolled in benefits.
- Labor Planning: notes include concerns about UKG reporting, LOA status, and access to underlying data.

## 20. MVP Review Build

The August 10 review build is a zero-production-dependency local Node application under `mvp/`. It demonstrates an implemented review interaction and reporting contract with explicitly synthetic site results and the unapproved 33-row working catalog; product/UX acceptance remains open.

Implemented review surfaces:

- Overview, work queue, site review, data readiness, reports, and audit views.
- Network, East, West, Rx, generation, and quarter filters persisted in the URL.
- Item-level rating and result-status separation, evidence mode, rule/source metadata, and caveats.
- Green share, evidence coverage, evidence exceptions, and manual completion with numerator, denominator, definition version, as-of timestamp, and comparability status.
- Executive report JSON, source/release-gate endpoints, item-grain API, and formula-safe CSV export.
- Explicit working-catalog, synthetic-data, non-comparable-trend, and blocked-source disclosures.

Review boundary:

- The MVP is read-only and uses synthetic site results. It does not connect to production HR systems.
- It does not assert that the 33-row workbook is approved.
- It does not enable production access control, write-back, automated recommendations, or Confluence assessment publishing.
- Production launch remains blocked on catalog approval, source mappings, rating rules, hierarchy, access control, governance, and release evidence.
