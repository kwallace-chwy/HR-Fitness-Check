# HR Fitness Check Product Requirements Document

Version: 0.9
Status: Q3 2026 launch planning - MVP review build; approval gates remain open
Owner: Kenny Wallace, ORBIT Program Owner and Product Owner
Process Owner / SME: Weipan Le
Product Sponsor: Ashley Larue
Target Launch: 2026-09-28
Last Updated: 2026-08-17

## 1. Vision And Problem Statement

Tagline: HR Fitness Check measures the quality of standard work. Is the stated process being followed?

HR Fitness Check advances the ORBIT mission by improving the quality of HR Standard Work across FC and Rx business units. Planned for launch on September 28, 2026, it will provide objective, repeatable, and evidence-backed Monthly Progress Checks and Quarterly Fitness Checks of C03-C06 Standard Work while preserving human accountability where judgment or physical inspection is required.

Today, FC and Rx HR Operations teams complete a quarterly self-assessment by gathering evidence from nine source families: UKG, Workday, ServiceNow/SNOW, Tableau, Smartsheet, SharePoint, CCURE, Absence One, and local physical checks. Teams compile the results in a spreadsheet, and HR Transformation subsequently aggregates and analyzes them. The process is time-consuming, introduces inconsistent interpretation, requires hours of manual dashboard and insight preparation, and relies on sites to grade their own performance.

The target state connects grounded findings, recommendations, human decisions, confirmed actions, and measured outcomes within one governed workflow. Deterministic rules calculate ratings from approved measures and trusted sources. AI turns those grounded results into site-specific insights and recommended paths to green. Regional HR reviewers accept, modify, decline, or defer recommendations and record the rationale. When a recommendation results in an accepted action, an approved agent action records the action, owner, and target date in the SharePoint tracker only after explicit user confirmation. At the next comparable measurement, the workflow links the completed action to subsequent quality movement.

The product operates on two connected but distinct rhythms. Monthly Progress Checks are provisional operational reports used to understand movement, open actions, emerging risks, evidence gaps, and relevant site context before the next Quarterly Fitness Check. A Quarterly Fitness Check is the formal quarterly product event; its result reaches `certified` state only after a frozen catalog, approved rules, defined evidence windows, required manual reviews, reconciliation, and authorized sign-off. Authorized users may also request an On-Demand Preview or an explicitly versioned Historical Recast. A monthly or on-demand result never silently becomes a certified Quarterly Fitness Check result, and a quarterly rating is not calculated by averaging monthly colors.

The annual Fitness Check view is a summary/report derived from the year's certified Quarterly Fitness Checks. It does not calculate a fifth scoring run, and a year-to-date view must disclose any quarter that has not reached certified state.

The conversational agent is a governed interface for questions, interpretation, feedback, and local context. It may ask focused follow-up questions, capture evidence disputes, record operational context, or create source/process-change proposals. User-provided context remains attributed, scoped, time-bounded, reviewable, and separate from system findings. It may improve a narrative or constrain a recommendation, but it cannot by itself change a deterministic rating, approved source mapping, catalog denominator, or scoring rule.

This product is being built for and in close collaboration with Weipan Le.

Version 1 must automate only the portions of the exercise with reliable source data, approved source mapping, and testable rating rules. It must explicitly flag manual, research, missing, stale, disputed, or unmapped items instead of converting uncertainty into false red/yellow/green ratings. The current MVP remains synthetic and read-only; the dual-cadence, conversational, and closed-loop workflows are governed target-state contracts, not claims about current implementation.

## 2. Current Discovery Update

This PRD supersedes both the older 49-row discovery snapshot and the June 30 38-row snapshot. The exact original `ORBIT - HR Fitness Check Matrix.xlsx` remains the active human-readable working catalog and contains 33 task rows. Its initial 33-row scope-intent snapshot was last modified on 2026-07-29; subsequent publications added source dispositions and the governed product-contract checklists without changing those 33 task rows:

| Disposition | Count | Product meaning |
|---|---:|---|
| Working in-scope intent | 33 | Business intent only. No row enters a production denominator until catalog, mapping, rule, and governance approval. |
| Current owner role populated | 33 | Role ownership is present for all rows; named accountability and approval remain release decisions. |
| Approved production items | 0 | The workbook is unfinished and was still described as approval-pending in Slack on 2026-07-28 and 2026-08-04. |

Current evidence layers as of 2026-08-17:

- The exact original SharePoint workbook contains source-integrated Column G dispositions for all 33 rows while retaining `Resource to Check` in Column F. Post-write verification on 2026-08-17 confirmed item `01LYSC3QO2BT5B2GJIV5C3ZACT2RWFSRLV`, filename `ORBIT - HR Fitness Check Matrix.xlsx`, sourcedoc `{1DFA0CDA-2819-45AF-BC80-53D46C594575}`, version `34.0`, modified `2026-08-17T16:16:20Z`, and 37,518 bytes. `G2:G34` is 33/33 exact and nonblank. The workbook also contains `Measure Contract`, `Cadence & Context`, and `Product Readiness` sheets with 19 gates; `quarterly_fitness_check` and `annual_summary` are present and legacy `quarterly_audit` is absent. Their presence is design evidence, not approval.
- `G2:G34` is 33/33 nonblank and 33/33 exact against the publication manifest. The dispositions remain 21 candidate, including 2 external governed-source candidates; 5 blocked; 5 manual/hybrid; 1 validated-object/rule-pending; and 1 derived.
- Fifteen candidate mappings depend on sandbox objects. Zero mappings are production-approved. Publication and exact manifest matching prove workbook synchronization, not source approval or activation.
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

The concise leadership narrative for the Q3 2026 vision, roadmap, value estimate, and definition boundaries is maintained in `docs/HR-Fitness-Check-Q3-2026-Product-Narrative.md`. The future-state working-backwards narrative is maintained in `docs/HR-Fitness-Check-Internal-Press-Release.md`. Both summarize this PRD; neither overrides the detailed requirements, current readiness facts, or release gates.

## 4. Objectives And Success Measures

| ID | Success measure | Definition / target | Current status |
|---|---|---|---|
| SM-001 | Catalog readiness | 100% of reviewed rows have stable item IDs, final V1 disposition, current owner, objective, source family, and rating band. | 33 working rows reviewed; owner roles are populated, while stable IDs and final approval remain open. |
| SM-002 | V1 scope readiness | 100% of the 33 working rows are classified as automatable, hybrid/manual input, manual only, or deferred with rationale. | Not complete for release. The exact original SharePoint workbook has draft dispositions for all 33 rows, but implementation modes and scope decisions remain unapproved. |
| SM-003 | Source mapping readiness | 100% of V1 rows have source system, source object/table/report, source fields, filters, site key, date window, data owner, and refresh cadence. | The exact original SharePoint workbook covers 33/33 Column G rows and matches the publication manifest 33/33: 21 candidate, including 2 external governed-source candidates; 5 blocked; 5 manual/hybrid; 1 validated-object/rule-pending; and 1 derived. Fifteen candidate rows depend on sandbox objects, required mapping contracts remain incomplete, and 0 mappings are production-approved. |
| SM-004 | Rating accuracy | Deterministic scoring matches SME-approved examples for each mapped item. | TBD after examples and source fields are approved. |
| SM-005 | Baseline recast | Q3 2025 baseline is recalculated using the approved V1 denominator and missing-data policy. | The 33-row working catalog is not an approved denominator; historical legacy ratings are not comparable until a mapping or recast is approved. |
| SM-006 | Manual control integrity | Manual, physical, stale, missing, and unmapped items never masquerade as automated facts. | Required control; design in progress. |
| SM-007 | Insight usefulness | Pilot HRMs, HRDs, and Regional HR reviewers agree generated strengths, opportunities, and recommendations support action planning. | Target and measurement instrument TBD before pilot. |
| SM-008 | Capacity made available | Make approximately 540 HR hours available annually for action rather than assessment compilation, representing an estimated $33,123 in annual capacity value. | Planning estimate only; current-state baseline, loaded-hour methodology, pilot measurement, and Finance treatment remain to be validated. |
| SM-009 | Recommendation decision coverage | 100% of reviewed recommendations have a recorded disposition of accepted, modified, declined, or deferred, with reviewer, timestamp, and rationale. | Target-state requirement; not implemented in the current MVP. |
| SM-010 | Accepted-action execution | 100% of actions created from accepted or modified recommendations have a confirmed owner, target date, status, and completion evidence. | Target-state requirement; SharePoint action class and tracker contract require approval. |
| SM-011 | Verified quality movement | For every completed action reaching a comparable measurement, report whether quality improved, did not improve, regressed, or cannot be compared. | Comparability, improvement, and sustained-result definitions require approval before measurement. |
| SM-012 | Recommendation outcome rate | Measure recommendation acceptance, modification, decline, deferral, action completion, verified improvement, and sustained-result rates by authorized rollup. | Baselines and targets will be set after pilot evidence exists; no causal claim from sequence alone. |
| SM-013 | Monthly progress utility | Authorized site and regional users can run a provisional monthly report that shows comparable movement, open actions, evidence gaps, relevant attributed context, and risks to the next Quarterly Fitness Check. | Target-state requirement; monthly measure eligibility and construction rules require approval. |
| SM-014 | Context integrity | User-provided context is confirmed, attributed, scoped, time-bounded, access-controlled, and visibly separate from system findings; no unverified context changes a deterministic score or approved source. | Target-state requirement; structured context and feedback workflows are not implemented in the current MVP. |
| SM-015 | Feedback resolution | Evidence disputes, source/process-change proposals, recommendation feedback, and product feedback are classified, routed, and resolved through an auditable workflow. | Baseline and service-level targets will be set after pilot evidence exists. |

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

V1 is a continuous C03-C06 Standard Work quality-improvement workflow for FC and Rx with provisional Monthly Progress Checks and formal Quarterly Fitness Checks whose results may reach certified state. It is not a generic dashboard and it is not a fully autonomous HR action-planning agent. The September 28, 2026 launch target remains conditional on the release criteria in Section 15.

In scope for V1:

- Reviewed catalog ingestion for the 33-row working catalog with stable `sw_item_id` values and current disposition.
- Measurement of approved rows once source mapping, implementation mode, rating rules, and governance are approved.
- Per-item implementation mode: automatable, hybrid/manual input, manual only, or deferred.
- Structured green/yellow/red rating rules for approved rows.
- Explicit result statuses separate from rating.
- Site x assessment run x Standard Work item result grain, with run type, period, data-as-of time, catalog version, rule version, evidence coverage, and provisional/certified status.
- Site-level outputs showing strengths, opportunities, data quality caveats, manual-required items, and solution-planning prompts.
- Individual-site, 1G, 2G, Rx, regional, and network views using the approved hierarchy.
- Provisional Monthly Progress Checks for monthly-enabled measures, including comparable month-over-month movement, direction relative to the most recent certified Quarterly Fitness Check where valid, open actions, evidence gaps, attributed context, and risks to the next Quarterly Fitness Check.
- Quarterly Fitness Checks using a frozen catalog, approved quarterly construction rules, defined evidence windows, required manual reviews, reconciliation, and authorized sign-off before the result reaches certified state.
- An annual and year-to-date Fitness Check reporting view derived only from certified Quarterly Fitness Checks, with quarter-completeness disclosure and no separate annual scoring run.
- On-demand previews that are explicitly labeled draft/month-to-date and historical recasts that create a new version without overwriting prior results.
- Recast Q3 baseline using the approved V1 denominator and missing-data policy.
- Monthly and quarter-over-quarter retention in an approved durable store, with comparability determined before trend claims.
- Phoenix chatbot access for authorized HRMs and HRDs.
- Supervised AI insights and site-specific recommendations only after deterministic results, data caveats, and governance controls are available.
- A governed conversational workflow that asks focused follow-up questions, distinguishes system findings from user context and model interpretation, and captures user-confirmed context with scope, audience, effective dates, verification state, and expiration.
- Classified feedback routes for evidence disputes, operational context, source/process changes, recommendation feedback, action-status updates, narrative feedback, and product feedback.
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
- Continuous or daily automated scoring; V1 supports approved monthly runs and authorized on-demand previews, not an always-on performance monitor.
- Automatic model training or policy changes from reviewer decisions or outcomes.
- Treating an unverified conversational statement as production evidence, a scoring override, an approved source change, or a permanent site fact.
- Silent persistence of raw chat transcripts as durable product memory.

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
3. Creates an assessment run as a Monthly Progress Check, Quarterly Fitness Check, On-Demand Preview, or Historical Recast, with explicit period, evidence window, as-of time, catalog/rule versions, and certification state.
4. Calculates deterministic green/yellow/red ratings only for approved mapped items and applies an approved monthly or quarterly construction rule for the run type.
5. Routes manual, hybrid, or physical-inspection items through a controlled manual input workflow.
6. Stores scored and manual results at site x assessment run x item grain without averaging monthly colors into the Quarterly Fitness Check.
7. Produces individual-site, 1G, 2G, Rx, regional, and network views with green share, evidence coverage, exceptions, counts, caveats, comparable trend context, open actions, and risks to the next Quarterly Fitness Check.
8. Uses supervised AI to convert grounded results into strengths, opportunities, and evidence-backed paths to green without changing deterministic ratings.
9. Lets authorized users ask questions and provide feedback or local context; the agent clarifies, classifies, and previews the structured record and saves it only after confirmation.
10. Keeps system findings, user-provided context, model interpretation, and recommendations visibly distinct and routes evidence disputes or source/process-change proposals to an authorized reviewer.
11. Presents each recommendation to an authorized Regional HR reviewer for an accepted, modified, declined, or deferred decision and captures the rationale.
12. Previews the exact action, owner, target date, and destination before any write.
13. Records an accepted action in the approved SharePoint tracker only after explicit user confirmation and stores the execution receipt.
14. Links the recommendation, decision, action, completion evidence, and next comparable measurement in a closed-loop record.
15. Uses governed context, feedback, decision, and outcome evidence to evaluate narrative and recommendation quality and inform reviewed product improvements; it does not train or change the model automatically.

## 9. Why AI

AI is useful for narrative synthesis and action-planning support, not for deciding deterministic ratings. The scoring engine should be rules-based wherever source data and rating bands are approved.

Approved AI uses:

- Summarize top strengths and opportunities from scored item results.
- Convert scored findings into HR-reviewed SWOT-style language.
- Generate site-specific, evidence-backed recommendations and paths to green tied to scored items, approved intervention references, and data caveats.
- Explain caveats in plain language when source status is missing, stale, manual, or unmapped.
- Ask focused follow-up questions needed to understand a user's authorized site, reporting period, evidence dispute, operational context, or proposed source/process change.
- Classify and summarize user feedback into a structured, confirmable record for the appropriate workflow.
- Use confirmed context to improve the applicable narrative or constrain a recommendation while maintaining visible attribution and caveats.
- Facilitate the review interaction by presenting recommendations and capturing an authorized user's disposition, rationale, owner, and target date.
- Evaluate aggregate decision and outcome evidence through a governed evaluation process to identify recommendation-quality improvements.

Disallowed AI uses:

- Inventing ratings, causes, or source facts.
- Assigning blame to individuals.
- Making employment decisions.
- Broadly distributing recommendations before governance approves the audience and review model.
- Hiding uncertainty or data quality limitations.
- Presenting user-provided context or model interpretation as a system finding.
- Changing a rating, denominator, rule, source mapping, or certified Quarterly Fitness Check result solely because a user supplied conversational context.
- Saving context beyond the confirmed scope, audience, or expiration, or treating raw conversation history as permanent memory.
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
| F-009 | Baseline recast and trend retention | Must | Recalculate the Q3 baseline and retain monthly and quarterly results for governed trend analysis. | Comparable historical analysis works without manual workbook reloads and does not overwrite prior versions. |
| F-010 | Phoenix chatbot access | Must | Allow authorized HRMs and HRDs to request site or rollup assessments. | Authorized requests return appropriate scoped output. |
| F-011 | Supervised AI insights and recommendations | Must | Generate reviewable site-specific insights and paths to green from grounded results, approved intervention references, and caveats. | 100% of recommendations trace to result and evidence references; unsupported-claim eval threshold met. |
| F-012 | Governed recommendation review | Must | Capture accepted, modified, declined, or deferred decisions with reviewer, timestamp, and rationale. | 100% of reviewed recommendations have a valid disposition record. |
| F-013 | Confirmed SharePoint action recording | Must | Preview and, after explicit confirmation, record an accepted action, owner, and target date in the approved SharePoint tracker. | 0 writes without valid authorization and confirmation; 100% successful writes have execution receipts. |
| F-014 | Closed-loop outcome linkage | Should | Link recommendations, decisions, completed actions, and comparable follow-up measurements. | 100% of eligible completed actions receive an outcome status at the next comparable measurement. |
| F-015 | Recommendation-quality evaluation | Should | Report acceptance, modification, decline, deferral, execution, verified-improvement, and sustained-result evidence by authorized rollup. | Versioned evaluation readout produced without automatic model changes or unsupported causality. |
| F-016 | Confluence publishing | Could | Publish approved assessments or documentation to a governed Confluence space. | Publishing audience, retention, and governance approved. |
| F-017 | Assessment-run and cadence management | Must | Run Monthly Progress Checks, Quarterly Fitness Checks, On-Demand Previews, and versioned Historical Recasts with explicit period, window, as-of time, catalog/rule versions, and certification state. | 0 provisional or recast outputs are mislabeled or overwrite a certified Quarterly Fitness Check result. |
| F-018 | Monthly progress reporting | Must | Show monthly-enabled results, comparable movement, direction from the most recent certified Quarterly Fitness Check where valid, open actions, evidence gaps, attributed context, unanswered questions, and risks to the next Quarterly Fitness Check. | Pilot users can identify and act on risks before the next Quarterly Fitness Check. |
| F-019 | Governed conversational context | Must | Ask focused questions and capture user-confirmed context with type, attribution, scope, effective dates, audience, verification state, allowed use, and expiration. | 0 saved context records lack confirmation, provenance, scope, or lifecycle metadata. |
| F-020 | Feedback and change-proposal routing | Must | Classify and route evidence disputes, operational context, source/process changes, recommendation feedback, action updates, narrative feedback, and product feedback. | 100% of confirmed feedback receives the correct record type, owner queue, status, and audit trail. |
| F-021 | Context-aware narrative generation | Should | Produce monthly and quarterly narratives that visibly distinguish system findings, user context, interpretation, and recommendations. | Unsupported-attribution and context-leakage eval gates pass before pilot. |
| F-022 | Annual Fitness Check reporting | Should | Summarize the year's certified Quarterly Fitness Checks by authorized site and rollup without creating a separate scoring run. | Annual and year-to-date reports reconcile to certified quarterly results and disclose incomplete quarters. |

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
| FR-008 | The canonical result grain must be site x assessment run x Standard Work item. | Must | Given a completed run, then every line-item result includes site, run type, reporting period, evidence window, certification state, `sw_item_id`, measured value, rating, result status, rule version, catalog version, and run ID. |
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
| FR-022 | The product must support four explicit assessment-run types. | Must | Given a run request, the system creates a `monthly_progress`, `quarterly_fitness_check`, `on_demand_preview`, or `historical_recast` run and visibly labels its authority and certification state. |
| FR-023 | Monthly and quarterly results must use separately approved construction rules. | Must | Given monthly evidence and a Quarterly Fitness Check, the quarterly rating is calculated from its approved quarterly window/method and is never an average of monthly colors unless a measure-specific approved rule explicitly requires that method. |
| FR-024 | Quarterly certification must require evidence freeze, reconciliation, required manual review, and authorized sign-off. | Must | Given any certification prerequisite is missing, the run remains provisional and cannot become the official quarterly record. |
| FR-025 | The conversational agent must clarify and classify feedback before retention or routing. | Must | Given a user supplies context or feedback, the system identifies its type and affected site, period, measure/action, effective dates, and intended use or asks only the focused questions needed to do so. |
| FR-026 | The product must preview persistent context before saving it. | Must | Given a context record is ready, the user sees the normalized statement, attribution, scope, audience, allowed uses, verification state, and expiration; without confirmation, no durable record is created. |
| FR-027 | Context must remain separate from evidence and deterministic scoring. | Must | Given confirmed operational context exists, it may inform the applicable narrative or recommendation constraints, but it cannot change the measured value, rating, denominator, rule, source mapping, or certification state. |
| FR-028 | Evidence disputes and source/process changes must use governed proposal workflows. | Must | Given a user challenges evidence or reports a new source/process, the system creates a routed proposal/dispute and preserves the current approved evidence contract until an authorized owner validates and versions a change. |
| FR-029 | Context must support correction, retraction, supersession, expiration, and conflict. | Must | Given context becomes wrong or stale, an authorized user can correct, withdraw, supersede, or dispute it; subsequent retrieval respects the latest valid state while retaining history. |
| FR-030 | Monthly and quarterly narratives must distinguish statement types. | Must | Given a narrative is generated, system findings, user-provided context, model interpretation, and recommendations are visibly labeled or structurally separated and retain supporting references. |
| FR-031 | The annual Fitness Check view must be derived from certified quarterly results. | Must | Given an annual or year-to-date report, the system summarizes only certified Quarterly Fitness Check results, discloses missing or uncertified quarters, reconciles to their stable run IDs, and does not create an annual scoring run. |

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
| NFR-009 | Retention | Monthly results, Quarterly Fitness Check results and certification states, recasts, decisions, actions, outcomes, and approved context/feedback records must follow record-type-specific retention rules. | Retention and deletion periods approved by governance; certified history is not overwritten. |
| NFR-010 | Observability | Phoenix and scoring workflow failures must be observable. | Run logs, error rates, and LLM narrative events available in approved monitoring. |
| NFR-011 | Action safety | SharePoint action writes must be authorized, previewed, explicitly confirmed, idempotent, and auditable. | 0 unauthorized or duplicate writes in release-gate tests; every attempt has an approval or denial record. |
| NFR-012 | Closed-loop lineage | Every recommendation, decision, action, measurement, and outcome must be connected by stable identifiers and versioned provenance. | 100% of eligible records pass referential-integrity and lineage tests. |
| NFR-013 | Outcome integrity | The system must distinguish observed movement from verified improvement and from causality. | 0 outcome narratives claim causality unless a separately approved causal method supports the claim. |
| NFR-014 | Value measurement | Capacity value must remain labeled as estimated until the approved baseline and pilot method are satisfied. | 0 reports label the 540-hour or $33,123 estimate as realized savings before approval. |
| NFR-015 | Context provenance | Every durable context or feedback record must retain the user, original-statement reference, normalized summary, confirmation event, scope, effective dates, audience, verification state, allowed uses, and lifecycle history. | 100% of retrieved context passes provenance and lifecycle validation. |
| NFR-016 | Context privacy and access | Context retrieval must enforce the user's authorized site, business unit, role, audience, sensitivity, and minimum-necessary scope before model context assembly. | 0 unauthorized cross-site or cross-audience context disclosures in release-gate tests. |
| NFR-017 | Context freshness | Expired, withdrawn, rejected, or superseded context must not be presented as current; pending/unverified context must retain its label. | 0 stale-context carryover in gold-case and regression tests. |
| NFR-018 | Interaction recoverability | Users must be able to inspect, correct, retract, and escalate agent-captured context and feedback. | Correction and escalation paths pass end-to-end pilot tests. |

## 13. Data Requirements

Core entities:

| Entity | Purpose | Required fields |
|---|---|---|
| `dim_standard_work_item` | Versioned catalog of reviewed Standard Work rows. | `sw_item_id`, C03-C06 control ID, display name, aliases, previous owner, current owner, objective, disposition, active flag, monthly eligibility, monthly construction rule, quarterly construction rule, effective start/end period. |
| `dim_site` | Site and hierarchy metadata. | site ID, site code, business line, region, site group, Rx flag if applicable, active flag, effective dates. |
| `metric_source_map` | Source mapping registry. | `sw_item_id`, implementation mode, source system, object/table/report, fields, filters, site key, date logic, data owner, refresh cadence. |
| `rating_rule` | Executable scoring rules. | `sw_item_id`, rule version, metric type, unit, green rule, yellow rule, red rule, missing policy, SME approver. |
| `dim_assessment_period` | Governed calendar and comparable measurement window. | period ID, period type, start/end dates, fiscal quarter/month, comparison period ID, status. |
| `fact_assessment_run` | Monthly, quarterly, preview, or recast run envelope. | run ID, run type, period ID, evidence-window start/end, data-as-of time, catalog/rule/source/hierarchy versions, provisional/certified state, initiator, prior run ID if recast, sign-off records. |
| `fact_fitness_check_result` | Scored or manual result. | site ID, run ID, period ID, `sw_item_id`, measured value, rating, result status, source snapshot time, rule version, evidence references. |
| `fact_fitness_check_rollup` | Aggregated and reporting outputs, including an annual summary derived from certified quarterly results. | source run IDs, period ID, rollup type, rollup ID, green count, yellow count, red count, valid-rated denominator, eligible denominator, evidence coverage, green share, quarter completeness, generated timestamp. |
| `fact_recommendation` | Versioned evidence-backed recommendation or path to green. | recommendation ID, site ID, period, result IDs, intervention references, recommendation text, caveats, model/prompt/policy versions, created timestamp. |
| `fact_recommendation_decision` | Human review disposition and rationale. | decision ID, recommendation ID, disposition, rationale, reviewer ID and authorized scope, decision timestamp, modified recommendation if applicable. |
| `fact_action` | Confirmed action recorded from an accepted or modified recommendation. | action ID, decision ID, action text, owner, target date, tracker record ID, confirmation record ID, status, completion date, completion evidence reference. |
| `fact_outcome_measurement` | Comparable follow-up measurement and quality movement. | outcome ID, action ID, baseline result ID, follow-up result ID, comparability status/reason, movement status, verified-improvement status, sustained-result status, policy version, measured timestamp. |
| `fact_context_assertion` | User-confirmed operational context available for an approved narrative or recommendation scope. | context ID, context type, original-statement reference, normalized summary, user ID/role, site/business-unit/measure/action scope, effective dates, applicable run/period, verification state, audience, sensitivity, allowed/prohibited uses, expiration, evidence references, confirmation ID, revision history. |
| `fact_evidence_dispute` | Challenge to system evidence or a calculated result. | dispute ID, user ID, site/run/result IDs, disputed claim, rationale, supporting evidence, owner queue, status, resolution, resolution timestamp, linked correction/recast. |
| `fact_source_change_proposal` | Proposed replacement or change to a source or process contract. | proposal ID, affected `sw_item_id`, current/new source or process, affected sites, effective date, proposer, source owner, validation status, reconciliation evidence, approval/version reference. |
| `fact_feedback_event` | Recommendation, action, narrative, UX, or product feedback. | feedback ID, feedback type, user/site/run scope, affected object ID, statement reference, normalized summary, routing owner, status, disposition, resulting change proposal. |
| `fact_context_verification` | Review and lifecycle history for context. | verification ID, context ID, reviewer, decision, rationale, timestamp, resulting state, superseding context ID if applicable. |

Required result statuses:

- `scored`
- `manual_required`
- `manual_input`
- `disputed`
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
- Run provisional Monthly Progress Checks, Quarterly Fitness Checks, authorized On-Demand Previews, and versioned Historical Recasts using approved measure-specific construction rules and explicit certification state.
- Produce an annual or year-to-date Fitness Check summary from certified Quarterly Fitness Checks without creating a fifth scoring run.
- Ask focused follow-up questions and clearly identify system findings, user-provided context, model interpretation, and recommendations.
- After user confirmation, retain structured context for the approved scope and lifecycle or route an evidence dispute, source/process-change proposal, or feedback event to the authorized owner.
- Use valid confirmed context in the applicable narrative or to constrain a recommendation without changing deterministic evidence or ratings.
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
- Treat a Monthly Progress Check, On-Demand Preview, Historical Recast, or annual summary as a certified Quarterly Fitness Check result.
- Average monthly colors into a quarterly result without an approved measure-specific construction rule.
- Treat user context, a model interpretation, or an unapproved source/process-change proposal as production evidence or an approved mapping.
- Persist context without user confirmation or beyond its authorized scope, audience, effective dates, or expiration.
- Use expired, withdrawn, rejected, or superseded context as current.
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
| RC-012 | SharePoint tracker, connector identity, field contract, access scope, action class, preview/confirmation flow, idempotency, rollback, and audit-trail evidence approved. | Before action recording is enabled |
| RC-013 | Comparable measurement, verified improvement, and sustained-result policies approved with test cases. | Before outcome reporting is enabled |
| RC-014 | Recommendation decision, action execution, and outcome KPI definitions approved with authorized rollups and retention. | Before pilot measurement |
| RC-015 | The 540-hour and $33,123 capacity estimates have a documented calculation, timed baseline, loaded-hour source, and Finance-approved reporting treatment. | Before value is reported as validated or realized |
| RC-016 | Every production measure has approved monthly eligibility and construction, quarterly construction, evidence-window, and comparability rules; monthly-to-quarter aggregation tests pass. | Before monthly reporting is enabled |
| RC-017 | Quarterly Fitness Check certification prerequisites, sign-off authority, evidence freeze, reconciliation, recast, and immutable-history controls are approved and tested. | Before a Quarterly Fitness Check result is labeled certified |
| RC-018 | Context taxonomy, confirmation preview, scope/audience controls, retention/expiration, verification, correction/retraction, conflict, and retrieval policies are approved and pass privacy/security tests. | Before persistent conversational context is enabled |
| RC-019 | Evidence-dispute, source/process-change, recommendation/action/narrative feedback, and product-feedback queues have owners, service levels, resolution states, and audit-trail evidence. | Before the conversational feedback loop is enabled |
| RC-020 | Context-aware narrative and recommendation evaluations pass grounding, attribution, stale-context, conflict, unsupported-causality, and cross-site access thresholds. | Before context is used in generated outputs |

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
| R-009 | A SharePoint action is created without valid confirmation, with the wrong owner/date, or more than once. | Medium | High | Require preview, explicit confirmation, broker authorization, schema validation, idempotency key, receipt, correction path, and action-level audit trail. |
| R-010 | Later quality movement is attributed to an action without comparable evidence or causal support. | Medium | High | Apply a versioned comparability policy; label observed association separately from causality; require indeterminate status when evidence is insufficient. |
| R-011 | Planning capacity estimates are presented as realized financial savings. | Medium | High | Label 540 hours and $33,123 as estimated capacity value until the baseline, pilot, and Finance treatment are approved. |
| R-012 | Q3 date pressure causes catalog, data, access, governance, or action-safety gates to be bypassed. | Medium | High | Treat 2026-09-28 as a target date contingent on release evidence; fail closed on any unmet Must gate. |
| R-013 | Monthly Progress Checks or annual summaries are mistaken for certified Quarterly Fitness Check results, or monthly colors are averaged into an invalid quarterly rating. | Medium | High | Label run authority visibly; approve measure-specific monthly/quarterly construction; require certification gates, annual lineage, and regression tests. |
| R-014 | User-provided context is stale, incorrect, sensitive, or visible outside its intended site/audience. | Medium | High | Require confirmation, attribution, effective dates, scope/audience filtering, verification state, expiration, correction/retraction, and minimum-necessary retrieval. |
| R-015 | A source/process-change statement silently alters production scoring or evidence lineage. | Medium | High | Create a routed proposal only; retain the current mapping until source-owner validation, reconciliation, approval, and versioned activation. |
| R-016 | The learning loop is interpreted as automatic model training or self-modifying policy. | Medium | High | Use feedback as governed evaluation evidence; require human review, regression testing, approval, versioning, monitored release, and rollback for every product change. |

## 17. Open Questions

Working matrix: [ORBIT - HR Fitness Check Matrix](https://chewycomllc-my.sharepoint.com/personal/kwallace12_chewy_com/Documents/ORBIT%20-%20HR%20Fitness%20Check%20Matrix.xlsx?d=w1dfa0cda281945afbc8053d46c594575&csf=1&web=1&e=c53ApK)

| ID | Question | Owner | Needed by |
|---|---|---|---|
| OQ-001 | Who gives final approval for the V1 catalog and movement of research items into or out of V1? | Kenny / Weipan / Ashley | Before catalog freeze |
| OQ-002 | Do release-gate results still support the confirmed 2026-09-28 launch target? | Weipan / Kenny / Ashley | Launch readiness review |
| OQ-003 | Role-based catalog owners are approved. Who is authorized to be selected as the named owner of each accepted action? | Weipan / Regional HR | Before action workflow enablement |
| OQ-004 | Which draft Column G dispositions can be promoted to approved, production-accessible source mappings and automatable V1 items? | Kenny / data engineering / source owners | Resolve sandbox promotion for 15 candidate rows; approve production delivery contracts for external SNOW/LOAA candidates and hybrid Smartsheet/Workday/UKG sources; and approve exact fields, filters, joins, site keys, windows, freshness, owners, lineage, access, reconciliation examples, and rules before build readiness. |
| OQ-005 | What approved system of record, evidence contract, reviewer workflow, correction path, and retention policy will support the five draft manual/hybrid rows? | Kenny / Phoenix / Weipan | Design readiness |
| OQ-006 | Does the working guidance in matrix column H constitute the approved missing-value policy for eligible-item and valid-rated denominators? | Weipan / Data Governance | Baseline recast |
| OQ-007 | Should any composite quality index be introduced later? It is intentionally excluded from the MVP pending definition and approval. | Kenny / Weipan / Ashley | Post-MVP decision |
| OQ-008 | The required views are individual site, 1G, 2G, Rx, region, and network. Which approved effective-dated hierarchy source and access rules implement them? | HR Operations / Data | Build readiness |
| OQ-009 | What governance approvals are required for AI-generated recommendations and their decision/outcome records? | Kenny / Matt Christian / Legal / Data Governance / HR Ops | Launch readiness |
| OQ-010 | Which of the five draft blocked dispositions should be remediated before launch, and which should be deferred with an approved rationale? | Weipan / Ashley / source owners | Scope decision |
| OQ-011 | What SharePoint tracker, list schema, connector identity, retention rule, and correction workflow are approved for action recording? | Kenny / Phoenix / SharePoint owner / Security | Action design readiness |
| OQ-012 | What exact rules define a comparable measurement, verified improvement, and a sustained result? | Weipan / Data / Product / QA | Outcome-measurement design |
| OQ-013 | What calculation supports the 540-hour and $33,123 estimates, and what Finance treatment is approved? | Kenny / Weipan / Finance | Value baseline approval |
| OQ-014 | Which items are monthly-enabled, and what approved method constructs each monthly result and formal quarterly result? | Weipan / Data / QA | Cadence design readiness |
| OQ-015 | Who may certify a Quarterly Fitness Check result, reopen it, approve a recast, and resolve conflicts between a monthly report and frozen quarterly evidence? | Weipan / Regional HR / Governance | Quarterly Fitness Check operating-model approval |
| OQ-016 | What context types, audiences, retention periods, expirations, verification authorities, and prohibited uses are approved? | Product / HR Operations / Privacy / Legal / Security | Context governance readiness |
| OQ-017 | Who owns each evidence-dispute, source/process-change, narrative-feedback, and product-feedback queue, and what service level applies? | Product / Data / Source Owners / HR Operations | Feedback-loop readiness |
| OQ-018 | Which forms of user-confirmed context may be used in a monthly report, Quarterly Fitness Check narrative, recommendation, or only the current response? | Weipan / Product / Governance | Narrative-policy approval |
| OQ-019 | Which certified quarterly measures and rollups appear in the annual Fitness Check report, and how should an incomplete year be labeled? | Weipan / Product / Data / Regional HR | Annual-reporting design |

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

The current MVP remains L0-L3: approved source lookup, deterministic analysis, and supervised recommendations using synthetic data. The target state adds L4 preview and confirmation for manual input, persistent context, evidence/source-change proposals, recommendation disposition, and the exact SharePoint action payload. A single L5 supervised SharePoint action-recording class may be enabled only after RC-012 passes and only with explicit user confirmation. Context retention is not an autonomous write path: it requires its own confirmation, authorization, privacy, lifecycle, and audit-trail controls under RC-018. Autonomous source/rule changes, model learning, writes, and L6 autonomous business operation remain out of scope.

## 19. Appendix: Workbook Reconciliation Notes

The July 29 workbook changes the working catalog from the older 49-row snapshot and June 30 38-row snapshot to 33 rows, all marked in scope. "In Scope." is still business intent only. Rows must not be counted in a production denominator until catalog approval, implementation mode, source mapping, rating rules, and missing-data policy are approved.

The source-integrated mapping remains published to the exact original SharePoint workbook while preserving Column F as `Resource to Check`. Post-write verification on 2026-08-17 confirmed version `34.0`, modified `2026-08-17T16:16:20Z`, size 37,518 bytes, `G2:G34` as 33/33 exact and nonblank, and the added `Measure Contract`, `Cadence & Context`, and `Product Readiness` sheets with 19 gates. `quarterly_fitness_check` and `annual_summary` are present and legacy `quarterly_audit` is absent. Its disposition totals are 21 candidate, including 2 external governed-source candidates; 5 blocked; 5 manual/hybrid; 1 validated-object/rule-pending; and 1 derived. Fifteen candidates depend on sandbox objects and no mapping, measure/cadence contract, rule, or release gate is production-approved.

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

- Overview, work queue, site review, data readiness, reports, and audit-log views.
- Network, East, West, Rx, generation, and quarter filters persisted in the URL.
- Item-level rating and result-status separation, evidence mode, rule/source metadata, and caveats.
- Green share, evidence coverage, evidence exceptions, and manual completion with numerator, denominator, definition version, as-of timestamp, and comparability status.
- Executive report JSON, source/release-gate endpoints, item-grain API, and formula-safe CSV export.
- Explicit working-catalog, synthetic-data, non-comparable-trend, and blocked-source disclosures.

Review boundary:

- The MVP is read-only and uses synthetic site results. It does not connect to production HR systems.
- It does not assert that the 33-row workbook is approved.
- It does not enable production access control, live monthly runs, quarterly certification, persistent conversational context, feedback/change-proposal routing, write-back, model-generated recommendations, recommendation decisions, action tracking, outcome linkage, or Confluence assessment publishing.
- Production launch remains blocked on catalog approval, source mappings, rating rules, hierarchy, access control, governance, and release evidence.

The dual-cadence, conversational context/feedback, and closed-loop workflows in this PRD are target-state contracts. They do not change the behavior or authorization of the current review build.
