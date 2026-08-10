# HR Fitness Check Rollout And Operating Model

Version: 0.3
Status: Draft operating model
Last updated: 2026-08-10

## Purpose

This file defines the rollout posture for HR Fitness Check as a governed ORBIT product. Rollout is evidence-gated by source readiness, capability controls, eval results, audit samples, and stakeholder approval.

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

Remain at Prototype with the read-only synthetic `mvp/` cockpit and governance artifacts. Move to Alpha only after the 33-row working catalog is approved, source registry, capability registry, route policy, eval scorecard, and audit envelope are reviewed, and production identity/source controls are implemented.

## Owner Roles

| Role | Responsibility | Current status |
| --- | --- | --- |
| Product owner | Job, audience, workflow, success metrics, rollout decisions | Kenny Wallace |
| Process owner / SME | Standard Work interpretation, catalog, source meaning, rating rules | Weipan Le |
| Sponsor | Scope and business prioritization | Ashley Larue in GitHub PRD |
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
- Eval gold cases exist for supported workflows.
- Access-denial, stale-source, source-conflict, and prompt-injection tests pass in dry run.
- Audit envelope sample is reviewed.
- UI displays source readiness, route status, manual workflow state, and eval/audit state.

### Alpha to Beta

- Source owners approve pilot source set.
- 100% of enabled sources have classification, audience, workflow scope, freshness SLA, citation policy, and approval record.
- Deterministic scoring reconciles to SME-approved samples.
- Narrative summaries have acceptable human review acceptance/edit rates.
- No critical unsupported claims, access leaks, or action-boundary failures.
- Support path and issue triage are staffed.
- Rollback and feature flags tested.

### Beta to Stable

- Online metrics meet target.
- No critical safety defects open.
- No unresolved source conflicts affecting enabled workflows.
- Cost and latency accepted.
- Governance, security, legal, HR Ops, and source owners sign off.
- Confluence publishing process is proven to refresh from GitHub.

## Operating Reviews

Run weekly during pilot:

- Capability usage and route accuracy.
- Source freshness and blocked source status.
- Eval failures and new gold cases.
- User feedback, edits, and rejected narratives.
- Manual input workflow issues.
- Access denials and prompt-injection events.
- Tool failures and latency.
- Confluence drift from GitHub.
- Rollback or feature flag changes.

## Incident Triggers

| Severity | Trigger |
| --- | --- |
| SEV-1 | Restricted source exposure, unapproved action execution, critical prompt-injection bypass. |
| SEV-2 | Repeated wrong recommendations in supported workflow, stale answer published, access-control defect. |
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
| Confluence rollback | Missing |
| Capability rollback | Missing |
| Prompt/model rollback | Missing |

## Immediate Rollout Blockers

1. Owner roles are populated for all 33 working rows, but named accountable owners and approvals remain open.
2. Source mapping and implementation mode are not approved for any row in the 33-row working catalog.
3. ServiceNow, Workday beneficiary/emergency contact, Talent Management, and Investigations mappings remain blocked or candidate.
4. Data classification and retention are not approved source-by-source.
5. Manual input workflow home is undecided.
6. The local review runtime and synthetic contract tests do not implement production identity, source activation, durable audit, feature-flag governance, or rollout evidence.
7. The live Confluence PRD was re-verified at version 15 on 2026-08-10, but future syncs must be tied to an approved, committed repository revision.
