# HR Fitness Check Rollout And Operating Model

Version: 0.4
Status: Draft operating model
Last updated: 2026-08-11

## Purpose

This file defines the rollout posture for HR Fitness Check as a governed ORBIT product planned for Q3 2026. The target is a closed-loop workflow connecting grounded findings, recommendations, Regional HR decisions, confirmed actions, comparable follow-up measurements, and verified and sustained quality outcomes. Rollout remains evidence-gated by source readiness, capability controls, eval results, audit samples, and stakeholder approval.

## Standard Phases

| Phase | Goal | Allowed behavior |
| --- | --- | --- |
| Design | Define product, source, capability, route, tool, eval, and rollout contracts. | No production runtime. |
| Prototype | Demonstrate operational workflow with static or approved test data. | No production actions. |
| Alpha | Internal controlled users and high observation. | L0-L3 only unless a specific L4 preview is approved. |
| Beta | Limited pilot with support model and weekly review. | L0-L4, L5 only by approved action class. |
| Stable | Approved production scope. | Capabilities and action classes as approved. |
| Scale | New channels, audiences, sources, or autonomy. | Requires separate gate. |

## Initial Rollout Recommendation

Remain at Prototype with the read-only synthetic `mvp/` cockpit and governance artifacts. The Q3 2026 target does not override readiness gates. Move to Alpha only after the 33-row working catalog is approved, source registry, capability registry, route policy, eval scorecard, and audit envelope are reviewed, and production identity/source controls are implemented. Recommendation decision, SharePoint action, and outcome-link writes remain disabled until each specific action class and target contract is approved and tested.

## Owner Roles

| Role | Responsibility | Current status |
| --- | --- | --- |
| Product owner | Job, audience, workflow, success metrics, rollout decisions | Kenny Wallace |
| Process owner / SME and close design collaborator | Standard Work interpretation, catalog, source meaning, rating rules, recommendation quality, and outcome interpretation | Weipan Le |
| Sponsor | Scope and business prioritization | Ashley Larue in GitHub PRD |
| Regional HR reviewer | Review recommendations; accept, modify, decline, or defer with rationale; confirm accepted/modified actions | Role and scope TBD |
| SharePoint tracker owner | Approve list schema, permissions, retention, correction, rollback, and operational support | TBD |
| Outcome reviewer | Approve comparability, verified quality movement, and sustained-result determination | Process owner / Data / Evaluation, exact RACI TBD |
| Engineering owner | Runtime, tools, validators, deployment, reliability | TBD |
| Source owners | Source accuracy, freshness, citation, access | TBD by source family |
| Governance/security owner | Data handling, access, prompt injection, retention, approval rules | TBD |
| Evaluation owner | Gold cases, eval gates, regression reports | TBD |
| Operations owner | Runbook, incidents, support, user readiness | TBD |

## Promotion Gates

### Prototype to Alpha

- Source registry draft exists for all V1 source families.
- Capability registry and route policy approved for read-only or draft-only behavior.
- Manual input and Confluence publishing remain disabled or preview-only.
- Recommendation review may be preview-only; recommendation decision, SharePoint action, and outcome-link writes remain disabled.
- Eval gold cases exist for supported workflows.
- Access-denial, stale-source, source-conflict, and prompt-injection tests pass in dry run.
- Audit envelope sample is reviewed.
- UI displays source readiness, route status, manual workflow state, and eval/audit state.

### Alpha to Beta

- Source owners approve pilot source set.
- 100% of enabled sources have classification, audience, workflow scope, freshness SLA, citation policy, and approval record.
- Deterministic scoring reconciles to SME-approved samples.
- Narrative summaries have acceptable human review acceptance/edit rates.
- Grounded recommendation review passes accepted, modified, declined, and deferred cases with required rationale and immutable source recommendations.
- The exact SharePoint site/list, schema, role permissions, confirmation UX, idempotency, retention, correction, rollback, and receipt contract is approved before any write pilot.
- Action records are created only for accepted or modified decisions and require exact action text, owner, target date, and explicit confirmation.
- No critical unsupported claims, access leaks, or action-boundary failures.
- Support path and issue triage are staffed.
- Rollback and feature flags tested.

### Beta to Stable

- Online metrics meet target.
- No critical safety defects open.
- No unresolved source conflicts affecting enabled workflows.
- Cost and latency accepted.
- Recommendation acceptance, action execution, comparable-outcome coverage, verified-improvement, and sustained-improvement metrics meet approved targets or have an approved remediation plan.
- Follow-up comparisons preserve rule, denominator, window, source, site, and item comparability; outcome narratives make no unsupported causal claims.
- Governance, security, legal, HR Ops, and source owners sign off.
- Confluence publishing process is proven to refresh from GitHub.

## Operating Reviews

Run weekly during pilot:

- Capability usage and route accuracy.
- Source freshness and blocked source status.
- Eval failures and new gold cases.
- User feedback, edits, and rejected narratives.
- Recommendation disposition volume and rates: accepted, modified, declined, and deferred, including rationale completeness.
- Confirmed action creation, ownership, target-date health, completion, cancellation, and overdue status.
- Comparable follow-up coverage and reasons for `pending_measurement` or `not_comparable` outcomes.
- Verified improvement, no-change, and decline rates plus sustained, not-sustained, and pending-recheck states.
- Manual input workflow issues.
- Access denials and prompt-injection events.
- Tool failures and latency.
- Confluence drift from GitHub.
- Rollback or feature flag changes.

## Incident Triggers

| Severity | Trigger |
| --- | --- |
| SEV-1 | Restricted source exposure, unapproved action execution, critical prompt-injection bypass. |
| SEV-2 | Repeated wrong recommendations in supported workflow, stale answer published, access-control defect, incorrect or duplicate SharePoint action write, or unsupported verified/sustained outcome claim. |
| SEV-3 | Retrieval degraded, source stale, model/tool latency high, noncritical tool outage. |
| SEV-4 | Documentation drift, nonblocking eval drift, low-volume quality issue. |

## Rollback Targets

- Capability feature flag.
- Source registry row status.
- Source index or active source version.
- Route policy.
- Prompt package.
- Model profile.
- Tool version.
- Recommendation decision or action record through the approved correction/supersession workflow.
- Follow-up measurement or outcome link through the approved void/supersession workflow.
- Confluence page version.
- Curated cache entry if future cache is introduced.

## Required Runbooks

| Runbook | Status |
| --- | --- |
| Source stale or expired | Missing |
| Source mapping blocked | Missing |
| Unauthorized retrieval suspected | Missing |
| Prompt injection detected | Missing |
| Tool outage | Missing |
| Bad answer or unsupported claim | Missing |
| Manual input correction | Missing |
| Recommendation decision correction | Missing |
| SharePoint action-record correction and duplicate-write handling | Missing |
| Follow-up comparability and outcome-link correction | Missing |
| Confluence rollback | Missing |
| Capability rollback | Missing |
| Prompt/model rollback | Missing |

## Closed-Loop Roadmap Contract

1. Deterministic rules evaluate only approved Standard Work measures from trusted source data; authorized HR reviewers retain manual and physical-inspection requirements.
2. AI produces a grounded recommendation with result IDs, approved intervention references, evidence, and caveats.
3. An authorized Regional HR reviewer selects `accepted`, `modified`, `declined`, or `deferred` and provides rationale. The generated recommendation remains immutable.
4. `Declined` and `deferred` decisions do not create an active action. An `accepted` or `modified` decision may proceed to an action preview containing exact action text, owner, target date, and SharePoint target.
5. A durable decision or action write requires an enabled capability and action class, exact preview, explicit user confirmation, approval record, idempotency protection, and execution receipt. All such writes are currently disabled.
6. When an action is completed, the next approved comparable Fitness Check measurement is linked using baseline/follow-up result IDs and an approved comparison-rule version.
7. Quality movement is recorded as `verified_improvement`, `verified_no_change`, `verified_decline`, `not_comparable`, or `pending_measurement`. Observed movement is association-only unless a separate causal method is approved.
8. An improvement becomes `sustained` only after the approved recheck window and a comparable recheck; otherwise it remains `pending_recheck` or becomes `not_sustained`.
9. Operating value is measured through recommendation acceptance, action execution, comparable-outcome coverage, verified improvement, and sustained improvement, not recommendation generation alone.

## Immediate Rollout Blockers

1. Owner roles are populated for all 33 working rows, but named accountable owners and approvals remain open.
2. Source mapping and implementation mode are not approved for any row in the 33-row working catalog.
3. ServiceNow, Workday beneficiary/emergency contact, Talent Management, and Investigations mappings remain blocked or candidate.
4. Data classification and retention are not approved source-by-source.
5. Manual input workflow home is undecided.
6. The local review runtime and synthetic contract tests do not implement production identity, source activation, durable audit, feature-flag governance, or rollout evidence.
7. The live Confluence PRD was re-verified at version 15 on 2026-08-10, but future syncs must be tied to an approved, committed repository revision.
8. The exact SharePoint decision/action tracker, list schema, access groups, confirmation UX, idempotency, retention, correction, rollback, and support ownership are not approved; all related writes remain disabled.
9. Recommendation disposition definitions, action execution states, next-comparable-measurement rules, outcome verification ownership, and sustained-result windows are not approved for production use.
10. Acceptance, execution, comparable-outcome, verified-improvement, and sustained-improvement metric targets do not yet have approved pilot baselines.
