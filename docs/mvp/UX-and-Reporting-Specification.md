# UX and Reporting Specification

## Document metadata

| Field | Value |
| --- | --- |
| Document ID | `HRFC-MVP-UX-001` |
| Version | `0.5` |
| Status | Implemented MVP review specification; not production-approved |
| Last updated | 2026-08-17 |
| Primary users | HR Fitness Check product reviewers, HR Operations SMEs, Engineering, Data Governance |
| Experience type | Dense read-only operational cockpit |
| Data posture | Synthetic fixture; 33-row working catalog; approval pending |

> **User promise:** Reviewers can inspect the proposed workflow, metric transparency, data readiness, exceptions, and report format without querying a source, calling a model, changing an approval, or writing to another system.

## Jobs to be done

| Job ID | User job | MVP outcome |
| --- | --- | --- |
| `JOB-001` | Understand the selected quarter and rollup | Transparent counts, ratios, distribution, and fixture provenance |
| `JOB-002` | Find catalog and evidence blockers | Searchable/filterable 33-row work queue and source-readiness view |
| `JOB-003` | Review a site without ranking or blame | Alphabetical site view with item-level drilldown and accountability context |
| `JOB-004` | Prepare an executive discussion | Deterministic draft with caveats, decisions, CSV, copy, and print |
| `JOB-005` | Inspect control evidence | Ephemeral request audit with route, scope, result, latency, and request ID |

## Navigation and view contract

| View | Implemented content | API dependencies |
| --- | --- | --- |
| Overview | Green share, evidence coverage, evidence exception rate, manual completion, illustrative trend, distribution, category opportunities, release decisions | Summary, trends, categories, release gates |
| Work queue | 33-row catalog summary; task search; evidence/readiness filters; item detail dialog | Catalog items |
| Site review | Alphabetical site table; coverage/distribution; attention theme; item-result drilldown with search/rating/evidence filters | Sites, item results |
| Data readiness | Source status counts/filter, source detail, historical 49 vs 38/37 vs 33 reconciliation conflict, release gates | Sources, release gates |
| Reports | Executive draft, summary metrics, strengths, opportunities, interpretation, caveats, decisions, source refs, trace, CSV/copy/print actions | Executive report, CSV export |
| Audit | Recent in-memory request decisions and manual refresh | Audit events |

The active view and global filter values are preserved in URL query parameters for refresh and review handoff. View changes create browser history entries; Back and Forward restore the prior view, while filter changes canonicalize the current entry.

## Global interaction model

- Global filters are quarter, rollup/region, and site group. They remain in URL state across views and are visible only where the backing API contract applies them; global catalog, source-readiness, and audit views hide the scope bar.
- Filter changes and Refresh re-fetch the current view.
- The requested deep-link view is applied before bootstrap requests complete. The boot shell uses disabled loading controls and stable fixture/approval boundaries; a bootstrap failure retries metadata and filter initialization rather than issuing an uninitialized view request.
- The truth banner always identifies validation data, approval status, and catalog date.
- Navigation is persistent on desktop and becomes a horizontally scrollable bar on narrower screens.
- Catalog/source inspection and site item review open a right-side modal dialog with explicit Tab/Shift+Tab focus containment and focus return.
- Loading, empty, bootstrap/view error retry, local filter result counts, and toast feedback are implemented. Audit refresh restores focus to the refreshed control.
- Site rows are alphabetical. The product does not rank sites or infer individual blame.
- Missing or blocked evidence is shown separately from red.

## Reporting experience

### Implemented report header

The report shows selected scope and period, a review title, deterministic template headline, and four non-dismissible badges:

- Synthetic results.
- Deterministic draft.
- Catalog approval pending.
- Trend not comparable.

### Implemented report body

| Section | Contract |
| --- | --- |
| Summary strip | Green share, evidence coverage, red item observations, and sites in scope |
| Strengths to preserve | Highest fixture category green share, without causality |
| Opportunities to review | Lowest fixture category green share and red-observation review count |
| Interpretation | Non-green results are deep-dive inputs, not punitive targets; accountability scope must be reviewed |
| Caveats | Synthetic data, approval blockers, legacy-label non-comparability, and no model-generated causality/individual attribution |
| Decisions before alpha | First five incomplete release gates with ID, owner role, and status |
| Source references | Repository evidence paths |
| Report trace | Volatile report ID/generation time plus deterministic content version/key, working catalog version/date, and separate synthetic data snapshot time |

### Implemented report actions

| Action | Behavior | Boundary |
| --- | --- | --- |
| Export CSV | Downloads site-summary rows for the exact global filter scope | Synthetic; includes catalog/data/approval provenance; no spreadsheet report styling |
| Copy summary | Copies title, headline, strengths, opportunities, and caveats | Browser clipboard may deny access; no external write |
| Print report | Opens browser print using a print-specific layout | Does not create or publish a PDF automatically |

There is no Confluence Publish, Approve, Send, Edit Source, Write Back, or model-generated recommendation action.

## Future continuous-review experience

This target-state experience is planned and is not implemented in the synthetic, read-only MVP.

### Run selector and authority

The user selects or confirms site/rollup, assessment period, and run type before results or chat context are assembled. Every page and exported report shows run type, actual evidence window, data-as-of time, evidence coverage, catalog/rule versions, and authority:

- Monthly Progress Check: provisional operational report.
- Quarterly Fitness Check: pending certification or certified formal record.
- On-Demand Preview: provisional and partial-window where applicable.
- Historical Recast: versioned replacement view linked to the superseded run and reason.

The product never presents monthly progress as a certified Quarterly Fitness Check and never implies that the quarterly result is an average of monthly colors.

### Annual summary

The future Reports experience may offer an Annual Summary assembled from the applicable certified Quarterly Fitness Checks for the selected year and authorized scope. The page shows the supporting quarterly run/report IDs, certification/recast state, and missing or non-comparable quarters. It is labeled as a derived summary—not another Fitness Check—and provides no annual score, assessment run, or certification action.

### Conversational review

The chat panel presents system evidence and caveats first, then asks only focused questions that can improve interpretation, source routing, or action planning. Responses are visually separated into:

1. System finding.
2. User-provided context with attribution, scope, verification, and effective dates.
3. Model interpretation.
4. Recommendation.

When the user offers persistent context, the agent classifies it as an operational/process assertion, evidence dispute, source-change proposal, recommendation/narrative feedback, action update, or product feedback. Before saving, the UI shows the normalized record, site/item/run scope, audience, allowed/prohibited use, effective dates, verification state, expiry, privacy/retention treatment, and correction/retraction path. The record is saved only after explicit confirmation and returns a receipt.

Useful retention choices are `this answer only`, `this month`, `submit as an ongoing site fact`, and `submit as a source/process change`. Each choice invokes a different persistence and approval workflow. The UI must never say the agent “learned” a production truth when it only recorded feedback for governed review.

An unresolved evidence dispute visibly qualifies the finding. A source-change report creates a pending proposal and leaves the approved mapping active. Context may qualify the monthly narrative or constrain a recommendation, but cannot change the rating, denominator, approved source, rule, quarterly certification, or causal boundary.

## Visual and responsive behavior

- The desktop surface uses a fixed top bar, left navigation, constrained main workspace, four-column metric grid, compact panels, tables, and a right-side detail dialog.
- At 1180px or below, metrics become two columns and paired panels stack.
- At 860px or below, navigation becomes horizontal and the report body becomes one column.
- At 640px or below, filters, metrics, summaries, headings, and dialog detail fields become one column; the dialog becomes full width.
- Tables remain horizontally scrollable at narrow widths. Item-result overflow is a labeled, keyboard-focusable region with a visible mobile scroll affordance. The trend-data disclosure has a stable 44px activation target.
- Print hides navigation, filters, banners, and report actions while retaining the report sheet.

## Accessibility contract

Implemented foundations include a skip link, semantic header/navigation/main regions, labeled form controls, `aria-current`, concise dedicated status live regions, `aria-busy` loading state, a native dialog with Tab/Shift+Tab containment and focus return, contextual accessible names for repeated row actions, keyboard-operable native controls, keyboard-focusable overflow regions, chart `role=img`, a 44px disclosure control with a data table, a high-contrast focus indicator, refresh-focus restoration, and reduced-motion support.

Checked-in Playwright coverage exercises the six top-level views, bootstrap and initialized-view recovery, Back/Forward state, report/CSV scope, modal focus containment/return, refresh focus, local-filter announcements, exact-320px reflow, keyboard access to item, audit, and expanded trend-table overflow, and Axe serious/critical rules in the review browser. Production accessibility approval is not claimed: human screen-reader testing, supported-browser coverage, 200%/400% zoom, and formal WCAG review remain required.

## Testable UX and reporting requirements

| Requirement ID | Requirement and acceptance test |
| --- | --- |
| `UX-REQ-001` | Every view shall retain the selected period, region, and group and shall use those filters for all dependent API calls. Refresh, deep-link, and Back/Forward tests must preserve state. |
| `UX-REQ-002` | The fixture/approval/non-comparability posture shall be visible before metrics and in the report; no reviewer action may dismiss it. |
| `UX-REQ-003` | Metric cards shall display numerator and denominator context, definition version, and a whole-percent value or `Not available`. |
| `UX-REQ-004` | Missing/blocked evidence shall be visually and textually distinct from red ratings in overview, site, and item detail. |
| `UX-REQ-005` | Sites shall be alphabetical and shall not be assigned ranks, causal claims, or individual blame. |
| `UX-REQ-006` | Work-queue, source, and site item-result filters shall update visible rows without changing source data and shall announce the resulting count or empty state. |
| `UX-REQ-007` | The executive draft, CSV, copied summary, and print view shall resolve from the same selected filter scope and carry synthetic/approval caveats. |
| `UX-REQ-008` | Empty, loading, recoverable bootstrap/view API error, clipboard denial, and no-audit-event states shall provide explicit feedback without corrupting navigation/filter state. |
| `UX-REQ-009` | All core review paths shall be usable at desktop and mobile widths without incoherent overlap; wide tables may scroll horizontally. |
| `UX-REQ-010` | Keyboard-only and screen-reader review shall cover navigation, filters, dialogs, chart alternative data, report actions, and retry behavior before pilot. |
| `UX-REQ-011` | The MVP shall expose no production write, approval, publish, or model action. |
| `UX-REQ-012` | A future recommendation review shall show grounded evidence and caveats before allowing `accepted`, `modified`, `declined`, or `deferred`; every disposition shall capture rationale. |
| `UX-REQ-013` | A future SharePoint action flow shall show the exact action, owner, target date, and destination and require explicit confirmation immediately before the write. |
| `UX-REQ-014` | A future outcome view shall distinguish pending, not comparable, improved, unchanged, regressed, and sustained states and shall not imply causality from sequence alone. |
| `UX-REQ-015` | Every future report/chat view shall show assessment run type, period, evidence window, data-as-of, evidence coverage, authority/certification state, and recast status before results. |
| `UX-REQ-016` | Monthly/on-demand reports shall remain visibly provisional; quarterly certification and recast status shall be unambiguous in UI, copy, CSV, print, and downstream publishing. |
| `UX-REQ-017` | The chat experience shall visually distinguish system findings, attributed user context, interpretation, and recommendation and shall not imply context changed deterministic evidence. |
| `UX-REQ-018` | A durable context/dispute/source-change/feedback record shall require an exact save preview, explicit confirmation, receipt, scope, purpose, audience, effective dates, expiry, privacy/retention, and correction/retraction controls. |
| `UX-REQ-019` | Users shall be able to inspect, correct, withdraw, or supersede retained context within authorized scope, and expired/withdrawn context shall not appear in later reports. |
| `UX-REQ-020` | An annual summary shall identify its certified Quarterly Fitness Check inputs and all missing/uncertified/recast/non-comparable quarters and shall never appear as a fifth assessment, annual score, or certified event. |

## Implemented versus future

| Capability | Implemented MVP | Future production work |
| --- | --- | --- |
| Scope selection | Fixture period/region/group filters | Authorized site/rollup scope derived from identity |
| Catalog review | Search/filter/read-only inspection | Stable IDs, approved decisions, workflow assignment, controlled change history |
| Site review | Synthetic alphabetical attention view | Governed current data, approved comparison, ownership workflow, correction/escalation |
| Assessment cadence | Fixture quarters only | Monthly provisional checks, certified Quarterly Fitness Checks, on-demand previews, and immutable historical recasts with authority labels |
| Annual summary | Not implemented | Derived report over certified Quarterly Fitness Checks with source-quarter and comparability disclosure; no new run or score |
| Data readiness | Discovery statuses and blockers | Source activation, freshness alerts, lineage, steward workflow |
| Reporting | Deterministic draft, CSV, copy, print | Approved templates, audience policy, durable version, reviewer edits/approval, governed publish |
| Audit | Ephemeral request table | Durable tamper-evident audit, authorization decision, alerts, retention, access review |
| Narrative | Static non-causal templates | Optional supervised grounded generation after model/data/eval approval |
| Conversational context | Not implemented | Focused questions; confirmed structured assertions; evidence disputes; source-change proposals; attributed monthly context; expiry/correction/retraction; no score/source/rule changes |
| Learning loop | Not implemented | Immediate draft revision plus governed offline feedback evaluation, approved versioned changes, rollback, and monitoring; no automatic training |
| Recommendation review | Not implemented | Evidence-backed recommendation plus authorized accept/modify/decline/defer decision and rationale in the same governed interaction |
| Action recording | Not implemented | Exact preview and explicit confirmation before recording action, owner, and target date in the approved SharePoint tracker |
| Outcome loop | Not implemented | Link completed action to the next comparable measurement and show verified movement and sustained-result state |
| Value readout | No production value claim | Show 540 hours and $33,123 only as planning estimates until baseline and pilot validation are approved |

## Assumptions

| Assumption ID | Assumption | Validation needed |
| --- | --- | --- |
| `UX-A-001` | Reviewers prefer a dense operational cockpit to a presentation-style landing page. | Moderated MVP review with HR Operations and product users. |
| `UX-A-002` | Category and accountability context reduces premature site attribution. | Observe whether reviewers use drilldown before assigning action. |
| `UX-A-003` | CSV, copied narrative, and browser print cover MVP reporting review needs. | Confirm target WBR/OBR workflow and required output channels. |

## Risks

| Risk ID | Risk | Response |
| --- | --- | --- |
| `UX-R-001` | Polished synthetic metrics look authoritative. | Keep persistent fixture and approval labels; exclude from production distribution. |
| `UX-R-002` | Lowest-category language is read as causality. | Preserve "review" language, evidence coverage, caveats, and accountability detail. |
| `UX-R-003` | CSV leaves the application without context. | Include provenance columns and require a synthetic-data banner in any review package. |
| `UX-R-004` | Print/copy output loses visible UI banners. | Keep caveats inside report content, not only application chrome. |
| `UX-R-005` | Accessibility gaps block reviewers. | Retain automated browser/Axe coverage and complete human accessibility validation before alpha. |
| `UX-R-006` | Users mistake provisional monthly output or local explanations for a certified Quarterly Fitness Check. | Keep run authority persistent in every channel and separate evidence, context, interpretation, and recommendation. |
| `UX-R-007` | Users do not understand what the agent will remember or who can see it. | Require explicit retention choices and a save preview with audience, purpose, expiry, privacy, and correction/withdrawal controls. |

## Cross-references

| Document ID | Repository page | Confluence page |
| --- | --- | --- |
| `HRFC-MVP-DATA-001` | `Data-Map-and-Classification.md` | [5404164396](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5404164396) |
| `HRFC-MVP-TECH-001` | `Technical-Design-and-Scoring-Contract.md` | [5404327956](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5404327956) |
| `HRFC-MVP-EVAL-001` | `Evaluation-and-Release-Evidence.md` | [5403968375](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5403968375) |
| `HRFC-MVP-OPS-001` | `Runbook-and-Rollout.md` | [5404262565](https://chewyinc.atlassian.net/wiki/pages/viewpage.action?pageId=5404262565) |
