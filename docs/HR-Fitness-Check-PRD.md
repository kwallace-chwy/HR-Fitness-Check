# HR Fitness Check Product Requirements Document

Version: 0.7
Status: Q3 2026 launch planning - MVP review build; approval gates remain open
Owner: Kenny Wallace, ORBIT Program Owner and Product Owner
Process Owner / SME: Weipan Le
Product Sponsor: Ashley Larue
Target Launch: 2026-09-28
Last Updated: 2026-08-12

## 1. Vision And Problem Statement

Tagline: HR Fitness Check measures the quality of standard work. Is the stated process being followed?

HR Fitness Check advances the ORBIT mission by improving the quality of HR Standard Work across FC and Rx business units. Planned for launch on September 28, 2026, it will provide an objective, repeatable, and evidence-backed quarterly assessment of C03-C06 Standard Work while preserving human accountability where judgment or physical inspection is required.

Today, FC and Rx HR Operations teams complete a quarterly self-assessment by gathering evidence from nine source families: UKG, Workday, ServiceNow/SNOW, Tableau, Smartsheet, SharePoint, CCURE, Absence One, and local physical checks. Teams compile the results in a spreadsheet, and HR Transformation subsequently aggregates and analyzes them. The process is time-consuming, introduces inconsistent interpretation, requires hours of manual dashboard and insight preparation, and relies on sites to grade their own performance.

The target state connects grounded findings, recommendations, human decisions, confirmed actions, and measured outcomes within one governed workflow. Deterministic rules calculate ratings from approved measures and trusted sources. AI turns those grounded results into site-specific insights and recommended paths to green. Regional HR reviewers accept, modify, decline, or defer recommendations and record the rationale. When a recommendation results in an accepted action, an approved agent action records the action, owner, and target date in the SharePoint tracker only after explicit user confirmation. At the next comparable measurement, the workflow links the completed action to subsequent quality movement.

This product is being built for and in close collaboration with Weipan Le.

Version 1 must automate only the portions of the exercise with reliable source data, approved source mapping, and testable rating rules. It must explicitly flag manual, research, missing, stale, or unmapped items instead of converting uncertainty into false red/yellow/green ratings. The current MVP remains synthetic and read-only; the closed-loop workflow is the governed Q3 target state, not a claim about current implementation.

## 2. Current Discovery Update

This PRD supersedes both the older 49-row discovery snapshot and the June 30 38-row snapshot. The latest available `ORBIT - HR Fitness Check Matrix.xlsx` was inspected from SharePoint with a last-modified timestamp of 2026-07-29 16:32:27 UTC. Its active working catalog contains 33 task rows:

| Disposition | Count | Product meaning |
|---|---:|---|
| Working in-scope intent | 33 | Business intent only. No row enters a production denominator until catalog, mapping, rule, and governance approval. |
| Current owner role populated | 33 | Role ownership is present for all rows; named accountability and approval remain release decisions. |
| Approved production items | 0 | The workbook is unfinished and was still described as approval-pending in Slack on 2026-07-28 and 2026-08-04. |

Current evidence layers as of 2026-08-12:

- The original SharePoint workbook baseline, last modified 2026-07-29, retains `Resource to Check` in Column F and has blank `Snowflake Table` values in Column G.
- A separate source-integrated derivative is published and version-verified in OneDrive/SharePoint as item `01LYSC3QJ3RANZPMKYABGZQVLYSVXYKF7R`, version `1.0`, 17,144 bytes. It contains draft Column G dispositions for all 33 rows: 21 candidate, including 2 external governed-source candidates; 5 blocked; 5 manual/hybrid; 1 validated-object/rule-pending; and 1 derived.
- Fifteen candidate mappings depend on sandbox objects. Zero mappings are production-approved. Publication of the derivative proves artifact availability, not approval or activation, and the original July 29 workbook remains unchanged.
- Deep Snowflake discovery did not locate production-grade objects that close the remaining gaps. EDLDB deep query `01c65a14-071c-f099-00a0-2d04da237b03` returned 3,249 metadata rows; the HRDM deep output contains 399 rows and has no retained query ID.
- Governed external-source discovery located an EPA ServiceNow resolved-case export for SNOW/LOAA, authoritative site Smartsheet workflows for FLO and temporary schedules, site SharePoint locker examples, Workday report paths for beneficiary/emergency-contact checks, and EthicsPoint/OpenBark for investigations. A future TM Experience/Signage Forms data contract was found, but live deployment is unverified. These are source leads, not approved production mappings.
- The workbook has populated `Current Owner` roles for all 33 rows.
- The workbook has no populated `Reviewer(s)` values for the 33 rows.
- The workbook has no populated result / fitness values for the 33 rows.
- `HR Metrics & Roster Health` has no approved threshold.
- Five June 30 rows are absent: `Inspect HR/support office workspaces`, `Review and answer VOC board daily (with GM)`, `Prepare Ops training/development (such as in AMMs)`, `Monthly Engagement Calendar`, and `HR Floor Engagement & Follow-Ups`.
- The earlier 2026-06-14 scope-decision date has passed. The current launch target is 2026-09-28, subject to the release gates in this PRD.
- Q3 2025 baseline percentages remain discovery evidence only until the denominator is recalculated against the approved V1 catalog.

## 3. Source Of Truth And Publishing Model

This GitHub repository is the controlled source of truth for HR Fitness Check product requirements, reviewed checklist disposition, runtime contracts, source mapping requirements, governance decisions, and implementation guidance once approved. Confluence pages, Word exports, and presentation materials are downstream publishing artifacts and must be refreshed from this repository.

The Excel workbook remains discovery evidence. It should not become the durable system of record for V1 scope, scoring logic, data mapping, or approval status.

Source discovery and ingestion planning are maintained in `knowledge-base/`. Those files capture located SharePoint, Snowflake, Tableau, ServiceNow, Workday, UKG, ECHO, CAT, and FC HR Analytics source leads, plus unresolved table and field mapping blockers.

The concise leadership narrative for the Q3 2026 vision, roadmap, value estimate, and definition boundaries is maintained in `docs/HR-Fitness-Check-Q3-2026-Product-Narrative.md`. It summarizes this PRD; it does not override the detailed requirements or release gates.

## 4. Objectives And Success Measures

| ID | Success measure | Definition / target | Current status |
|---|---|---|---|
| SM-001 | Catalog readiness | 100% of reviewed rows have stable item IDs, final V1 disposition, current owner, objective, source family, and rating band. | 33 working rows reviewed; owner roles are populated, while stable IDs and final approval remain open. |
| SM-002 | V1 scope readiness | 100% of the 33 working rows are classified as automatable, hybrid/manual input, manual only, or deferred with rationale. | Not complete for release. The local derivative has draft dispositions for all 33 rows, but implementation modes and scope decisions remain unapproved. |
| SM-003 | Source mapping readiness | 100% of V1 rows have source system, source object/table/report, source fields, filters, site key, date window, data owner, and refresh cadence. | The published source-integrated derivative covers 33/33 rows: 21 candidate, including 2 external governed-source candidates; 5 blocked; 5 manual/hybrid; 1 validated-object/rule-pending; and 1 derived. Fifteen candidate rows depend on sandbox objects, required mapping contracts remain incomplete, and 0 mappings are production-approved. |
| SM-004 | Rating accuracy | Deterministic scoring matches SME-approved examples for each mapped item. | TBD after examples and source fields are approved. |
| SM-005 | Baseline recast | Q3 2025 baseline is recalculated using the approved V1 denominator and missing-data policy. | The 33-row working catalog is not an approved denominator; historical legacy ratings are not comparable until a mapping or recast is approved. |
| SM-006 | Manual control integrity | Manual, physical, stale, missing, and unmapped items never masquerade as automated facts. | Required control; design in progress. |
| SM-007 | Insight usefulness | Pilot HRMs, HRDs, and Regional HR reviewers agree generated strengths, opportunities, and recommendations support action planning. | Target and measurement instrument TBD before pilot. |
| SM-008 | Capacity made available | Make approximately 540 HR hours available annually for action rather than assessment compilation, representing an estimated $33,123 in annual capacity value. | Planning estimate only; current-state baseline, loaded-hour methodology, pilot measurement, and Finance treatment remain to be validated. |
| SM-009 | Recommendation decision coverage | 100% of reviewed recommendations have a recorded disposition of accepted, modified, declined, or deferred, with reviewer, timestamp, and rationale. | Target-state requirement; not implemented in the current MVP. |
| SM-010 | Accepted-action execution | 100% of actions created from accepted or modified recommendations have a confirmed owner, target date, status, and completion evidence. | Target-state requirement; SharePoint action class and tracker contract require approval. |
| SM-011 | Verified quality movement | For every completed action reaching a comparable measurement, report whether quality improved, did not improve, regressed, or cannot be compared. | Comparability, improvement, and sustained-result definitions require approval before measurement. |
| SM-012 | Recommendation outcome rate | Measure recommendation acceptance, modification, decline, deferral, action completion, verified improvement, and sustained-result rates by authorized rollup. | Baselines and targets will be set after pilot evidence exists; no causal claim from sequence alone. |

## 5. Users And Stakeholders

Primary users:

- FC and Rx HRMs who need site-level Fitness Check results and action-planning support.
- Regional HR reviewers who need to accept, modify, decline, or defer recommendations and capture rationale.
- HRDs who need 1G, 2G, Rx, regional, network, and individual-site views.

Secondary stakeholders:

- FC HR teams who consume site-specific findings through HRMs.
- HR Transformation teams that aggregate, analyze, and improve the assessment process.
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

V1 is a quarterly C03-C06 Standard Work quality-improvement workflow for FC and Rx. It is not a generic dashboard and it is not a fully autonomous HR action-planning agent. The September 28, 2026 launch target remains conditional on the release criteria in Section 15.

In scope for V1:

- Reviewed catalog ingestion for the 33-row working catalog with stable `sw_item_id` values and current disposition.
- Measurement of approved rows once source mapping, implementation mode, rating rules, and governance are approved.
- Per-item implementation mode: automatable, hybrid/manual input, manual only, or deferred.
- Structured green/yellow/red rating rules for approved rows.
- Explicit result statuses separate from rating.
- Site x quarter x Standard Work item result grain.
- Site-level outputs showing strengths, opportunities, data quality caveats, manual-required items, and solution-planning prompts.
- Individual-site, 1G, 2G, Rx, regional, and network views using the approved hierarchy.
- Recast Q3 baseline using the approved V1 denominator and missing-data policy.
- Quarter-over-quarter retention in an approved durable store.
- Phoenix chatbot access for authorized HRMs and HRDs.
- Supervised AI insights and site-specific recommendations only after deterministic results, data caveats, and governance controls are available.
- Governed recommendation review with accepted, modified, declined, and deferred dispositions and recorded rationale.
- User-confirmed recording of accepted actions, owners, and target dates in the approved SharePoint tracker through an approved action class.
- Linkage from recommendation to decision, action, comparable follow-up measurement, verified quality movement, and sustained result.
- Network-level evaluation of recommendation quality using governed decision and outcome evidence.

Out of scope for V1:

- Rows absent from the latest working catalog unless a later approved decision restores them.
- Any in-scope intent row that is deferred by implementation-mode or governance decision record.
- Autonomous recommendation acceptance, action assignment, execution, notification, or distribution without authorized human review.
- Write-back to HR source systems or unapproved trackers. The only planned write is an explicitly confirmed action record to the approved SharePoint tracker through a separately approved action class.
- Automation of physical inspections or subjective checks without a manual input workflow.
- Name-based joins between catalog rows and source outputs.
- Individual employment decisions, individual accountability assignment, or unsupported causal claims.
- Daily or intra-quarter scoring cadence unless explicitly approved as a later capability.
- Automatic model training or policy changes from reviewer decisions or outcomes.

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
6. Produces individual-site, 1G, 2G, Rx, regional, and network views with green share, evidence coverage, exceptions, counts, caveats, and comparable trend context.
7. Uses supervised AI to convert grounded results into strengths, opportunities, and evidence-backed paths to green without changing deterministic ratings.
8. Presents each recommendation to an authorized Regional HR reviewer for an accepted, modified, declined, or deferred decision and captures the rationale.
9. Previews the exact action, owner, target date, and destination before any write.
10. Records an accepted action in the approved SharePoint tracker only after explicit user confirmation and stores the execution receipt.
11. Links the recommendation, decision, action, completion evidence, and next comparable measurement in a closed-loop record.
12. Uses governed decision and outcome evidence to evaluate recommendation quality and inform reviewed product improvements; it does not train or change the model automatically.

## 9. Why AI

AI is useful for narrative synthesis and action-planning support, not for deciding deterministic ratings. The scoring engine should be rules-based wherever source data and rating bands are approved.

Approved AI uses:

- Summarize top strengths and opportunities from scored item results.
- Convert scored findings into HR-reviewed SWOT-style language.
- Generate site-specific, evidence-backed recommendations and paths to green tied to scored items, approved intervention references, and data caveats.
- Explain caveats in plain language when source status is missing, stale, manual, or unmapped.
- Facilitate the review interaction by presenting recommendations and capturing an authorized user's disposition, rationale, owner, and target date.
- Evaluate aggregate decision and outcome evidence through a governed evaluation process to identify recommendation-quality improvements.

Disallowed AI uses:

- Inventing ratings, causes, or source facts.
- Assigning blame to individuals.
- Making employment decisions.
- Broadly distributing recommendations before governance approves the audience and review model.
- Hiding uncertainty or data quality limitations.
- Accepting a recommendation, assigning an action owner, or writing to SharePoint without explicit authorized-user confirmation.
- Claiming that an action caused a later quality movement when the evidence establishes only sequence or association.
- Automatically training, updating, or changing recommendation behavior from decision or outcome records.

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
| F-011 | Supervised AI insights and recommendations | Must | Generate reviewable site-specific insights and paths to green from grounded results, approved intervention references, and caveats. | 100% of recommendations trace to result and evidence references; unsupported-claim eval threshold met. |
| F-012 | Governed recommendation review | Must | Capture accepted, modified, declined, or deferred decisions with reviewer, timestamp, and rationale. | 100% of reviewed recommendations have a valid disposition record. |
| F-013 | Confirmed SharePoint action recording | Must | Preview and, after explicit confirmation, record an accepted action, owner, and target date in the approved SharePoint tracker. | 0 writes without valid authorization and confirmation; 100% successful writes have execution receipts. |
| F-014 | Closed-loop outcome linkage | Should | Link recommendations, decisions, completed actions, and comparable follow-up measurements. | 100% of eligible completed actions receive an outcome status at the next comparable measurement. |
| F-015 | Recommendation-quality evaluation | Should | Report acceptance, modification, decline, deferral, execution, verified-improvement, and sustained-result evidence by authorized rollup. | Versioned evaluation readout produced without automatic model changes or unsupported causality. |
| F-016 | Confluence publishing | Could | Publish approved assessments or documentation to a governed Confluence space. | Publishing audience, retention, and governance approved. |

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
| FR-014 | Every AI-generated recommendation must be grounded and traceable. | Must | Given a recommendation is displayed, then it references the applicable result IDs, evidence status, rule version, caveats, and approved intervention references used to create it. |
| FR-015 | Authorized Regional HR reviewers must be able to accept, modify, decline, or defer each recommendation. | Must | Given a recommendation review, when the reviewer submits a decision, then the system stores one valid disposition, the reviewer identity and scope, timestamp, and rationale. |
| FR-016 | The product must require explicit confirmation before recording an action in SharePoint. | Must | Given an accepted or modified recommendation produces an action, when the user confirms the exact action, owner, target date, and tracker destination, then one idempotent write occurs and an execution receipt is stored; without confirmation, no write occurs. |
| FR-017 | The product must track accepted-action execution. | Must | Given an action was recorded, when its state changes, then status, owner, target date, completion date, completion evidence reference, and change history are retained. |
| FR-018 | The product must determine whether a later measurement is comparable before evaluating movement. | Must | Given a completed action and a later result, when catalog, rule, source, hierarchy, and period versions are evaluated, then the system records `comparable`, `not_comparable`, or `insufficient_evidence` with the reason. |
| FR-019 | The product must link eligible completed actions to subsequent quality movement. | Should | Given a comparable follow-up result, when the outcome job runs, then it records improved, unchanged, regressed, or indeterminate movement and links the result to the originating recommendation, decision, and action without claiming causality. |
| FR-020 | The product must measure sustained results using an approved policy. | Should | Given verified improvement, when the approved number of later comparable measurements is available, then the system records sustained, not sustained, or pending with the policy version. |
| FR-021 | Decision and outcome evidence must be used through a governed evaluation process only. | Must | Given feedback or outcome records exist, when recommendation quality is reviewed, then the evaluation dataset, method, reviewer, decision, and resulting approved change are versioned; no automatic model or policy update occurs. |

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
| NFR-011 | Action safety | SharePoint action writes must be authorized, previewed, explicitly confirmed, idempotent, and auditable. | 0 unauthorized or duplicate writes in release-gate tests; every attempt has an approval or denial record. |
| NFR-012 | Closed-loop lineage | Every recommendation, decision, action, measurement, and outcome must be connected by stable identifiers and versioned provenance. | 100% of eligible records pass referential-integrity and lineage tests. |
| NFR-013 | Outcome integrity | The system must distinguish observed movement from verified improvement and from causality. | 0 outcome narratives claim causality unless a separately approved causal method supports the claim. |
| NFR-014 | Value measurement | Capacity value must remain labeled as estimated until the approved baseline and pilot method are satisfied. | 0 reports label the 540-hour or $33,123 estimate as realized savings before approval. |

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
| `fact_recommendation` | Versioned evidence-backed recommendation or path to green. | recommendation ID, site ID, period, result IDs, intervention references, recommendation text, caveats, model/prompt/policy versions, created timestamp. |
| `fact_recommendation_decision` | Human review disposition and rationale. | decision ID, recommendation ID, disposition, rationale, reviewer ID and authorized scope, decision timestamp, modified recommendation if applicable. |
| `fact_action` | Confirmed action recorded from an accepted or modified recommendation. | action ID, decision ID, action text, owner, target date, tracker record ID, confirmation record ID, status, completion date, completion evidence reference. |
| `fact_outcome_measurement` | Comparable follow-up measurement and quality movement. | outcome ID, action ID, baseline result ID, follow-up result ID, comparability status/reason, movement status, verified-improvement status, sustained-result status, policy version, measured timestamp. |

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
- Generate evidence-backed paths to green from approved sources and intervention references.
- Explain data quality caveats.
- Provide source-backed site and rollup assessment outputs.
- Capture an authorized reviewer's accepted, modified, declined, or deferred disposition and rationale.
- Preview an action record and, after explicit confirmation through an approved action class, write the action, selected owner, and target date to the approved SharePoint tracker.
- Link a completed action to a comparable later measurement and report observed quality movement using the approved outcome policy.

Disallowed ORBIT behavior:

- Make employment decisions.
- Assign accountability for defects to individuals.
- Infer unsupported root causes.
- Hide data quality limitations.
- Automatically distribute sensitive recommendations beyond approved audiences.
- Treat manual or physical checks as automated facts.
- Accept, modify, decline, or defer a recommendation on behalf of a human reviewer.
- Assign an action owner or execute a SharePoint write without explicit authorized-user selection and confirmation.
- Treat reviewer feedback as permission for automatic model training or policy change.
- Claim an action caused a later result when only temporal linkage or association is available.

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
| RC-011 | Recommendation sources, schemas, output validation, and Regional HR review workflow approved and pass the recommendation eval gate. | Q3 launch |
| RC-012 | SharePoint tracker, connector identity, field contract, access scope, action class, preview/confirmation flow, idempotency, rollback, and audit evidence approved. | Before action recording is enabled |
| RC-013 | Comparable measurement, verified improvement, and sustained-result policies approved with test cases. | Before outcome reporting is enabled |
| RC-014 | Recommendation decision, action execution, and outcome KPI definitions approved with authorized rollups and retention. | Before pilot measurement |
| RC-015 | The 540-hour and $33,123 capacity estimates have a documented calculation, timed baseline, loaded-hour source, and Finance-approved reporting treatment. | Before value is reported as validated or realized |

## 16. Risks

| Risk ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R-001 | The latest 33-row working list is treated as an approved scoring denominator before implementation-mode and governance decisions are complete. | Medium | High | Recast baseline only after final V1 catalog, source mapping, owner assignment, and missing-data policy are approved. |
| R-002 | Workbook says in scope, but Column G dispositions remain draft; 15 candidates are sandbox-dependent and 2 rely on unapproved governed external sources. | High | High | Treat in scope and draft mapping dispositions as discovery evidence only; require implementation mode, production source mapping, and approval before scoring. |
| R-003 | Source dashboards differ from system-of-record data. | Medium | High | Require source-owner approval and reconciliation examples for each mapped item. |
| R-004 | Manual/physical checks are automated without evidence controls. | Medium | High | Use manual input workflow with owner, timestamp, evidence reference, and result status. |
| R-005 | AI summaries overstate causality or hide caveats. | Medium | High | Ground narratives in scored IDs and caveats; require human review during pilot. |
| R-006 | Associate-level source data creates privacy or retention issues. | Medium | High | Complete data classification and aggregation review before build approval. |
| R-007 | Role-level owner labels are mistaken for named accountability or approval. | Medium | High | Confirm named owners and approvers as a launch gate. |
| R-008 | Recommendation decisions or rationales are incomplete, inconsistent, or used outside their approved purpose. | Medium | High | Require controlled dispositions, rationale, reviewer scope, retention, access, and evaluation-purpose rules. |
| R-009 | A SharePoint action is created without valid confirmation, with the wrong owner/date, or more than once. | Medium | High | Require preview, explicit confirmation, broker authorization, schema validation, idempotency key, receipt, correction path, and action-level audit. |
| R-010 | Later quality movement is attributed to an action without comparable evidence or causal support. | Medium | High | Apply a versioned comparability policy; label observed association separately from causality; require indeterminate status when evidence is insufficient. |
| R-011 | Planning capacity estimates are presented as realized financial savings. | Medium | High | Label 540 hours and $33,123 as estimated capacity value until the baseline, pilot, and Finance treatment are approved. |
| R-012 | Q3 date pressure causes catalog, data, access, governance, or action-safety gates to be bypassed. | Medium | High | Treat 2026-09-28 as a target date contingent on release evidence; fail closed on any unmet Must gate. |

## 17. Open Questions

Working matrix: [ORBIT - HR Fitness Check Matrix](https://chewycomllc-my.sharepoint.com/personal/kwallace12_chewy_com/Documents/ORBIT%20-%20HR%20Fitness%20Check%20Matrix.xlsx?d=w1dfa0cda281945afbc8053d46c594575&csf=1&web=1&e=c53ApK)

| ID | Question | Owner | Needed by |
|---|---|---|---|
| OQ-001 | Who gives final approval for the V1 catalog and movement of research items into or out of V1? | Kenny / Weipan / Ashley | Before catalog freeze |
| OQ-002 | Do release-gate results still support the confirmed 2026-09-28 launch target? | Weipan / Kenny / Ashley | Launch readiness review |
| OQ-003 | Role-based catalog owners are approved. Who is authorized to be selected as the named owner of each accepted action? | Weipan / Regional HR | Before action workflow enablement |
| OQ-004 | Which draft Column G dispositions can be promoted to approved, production-accessible source mappings and automatable V1 items? | Kenny / data engineering / source owners | Resolve sandbox promotion for 15 candidate rows; approve production delivery contracts for external SNOW/LOAA candidates and hybrid Smartsheet/Workday/UKG sources; and approve exact fields, filters, joins, site keys, windows, freshness, owners, lineage, access, reconciliation examples, and rules before build readiness. |
| OQ-005 | What approved system of record, evidence contract, reviewer workflow, correction path, and retention policy will support the four draft manual/hybrid rows? | Kenny / Phoenix / Weipan | Design readiness |
| OQ-006 | Does the working guidance in matrix column H constitute the approved missing-value policy for eligible-item and valid-rated denominators? | Weipan / Data Governance | Baseline recast |
| OQ-007 | Should any composite quality index be introduced later? It is intentionally excluded from the MVP pending definition and approval. | Kenny / Weipan / Ashley | Post-MVP decision |
| OQ-008 | The required views are individual site, 1G, 2G, Rx, region, and network. Which approved effective-dated hierarchy source and access rules implement them? | HR Operations / Data | Build readiness |
| OQ-009 | What governance approvals are required for AI-generated recommendations and their decision/outcome records? | Kenny / Matt Christian / Legal / Data Governance / HR Ops | Launch readiness |
| OQ-010 | Which of the eight draft blocked dispositions should be remediated before launch, and which should be deferred with an approved rationale? | Weipan / Ashley / source owners | Scope decision |
| OQ-011 | What SharePoint tracker, list schema, connector identity, retention rule, and correction workflow are approved for action recording? | Kenny / Phoenix / SharePoint owner / Security | Action design readiness |
| OQ-012 | What exact rules define a comparable measurement, verified improvement, and a sustained result? | Weipan / Data / Product / QA | Outcome-measurement design |
| OQ-013 | What calculation supports the 540-hour and $33,123 estimates, and what Finance treatment is approved? | Kenny / Weipan / Finance | Value baseline approval |

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

The current MVP remains L0-L3: approved source lookup, deterministic analysis, and supervised recommendations using synthetic data. The Q3 target adds L4 preview for manual input, recommendation disposition, and the exact SharePoint action payload. A single L5 supervised SharePoint action-recording class may be enabled only after RC-012 passes and only with explicit user confirmation. Autonomous writes and L6 autonomous business operation remain out of scope.

## 19. Appendix: Workbook Reconciliation Notes

The July 29 workbook changes the working catalog from the older 49-row snapshot and June 30 38-row snapshot to 33 rows, all marked in scope. "In Scope." is still business intent only. Rows must not be counted in a production denominator until catalog approval, implementation mode, source mapping, rating rules, and missing-data policy are approved.

On 2026-08-12, a separate source-integrated derivative populated Column G for all 33 rows while preserving Column F as `Resource to Check`. Its disposition totals are 21 candidate, including 2 external governed-source candidates; 5 blocked; 5 manual/hybrid; 1 validated-object/rule-pending; and 1 derived. Fifteen candidates depend on sandbox objects and no mapping is production-approved. The derivative is published and version-verified in the user's OneDrive/SharePoint; the original July 29 workbook remains unchanged with blank Column G values.

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
- It does not enable production access control, write-back, model-generated recommendations, recommendation decisions, action tracking, outcome linkage, or Confluence assessment publishing.
- Production launch remains blocked on catalog approval, source mappings, rating rules, hierarchy, access control, governance, and release evidence.

The closed-loop workflow in this PRD is a target-state contract. It does not change the behavior or authorization of the current review build.
