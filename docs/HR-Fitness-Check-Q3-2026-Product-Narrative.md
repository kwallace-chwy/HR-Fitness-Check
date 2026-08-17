# HR Fitness Check (Q3 2026)

Version: 1.1
Status: Product narrative - Q3 2026 launch target; approval gates remain open
Owner: Kenny Wallace, ORBIT Program Owner and Product Owner
Process Owner / SME: Weipan Le
Last Updated: 2026-08-17

## Overview

HR Fitness Check advances the ORBIT mission by improving the quality of HR Standard Work across FC and Rx business units. It combines provisional Monthly Progress Checks, formal Quarterly Fitness Checks, annual Fitness Check reporting, and a governed conversational agent that turns grounded assessment results into data-backed insights and evidence-based paths to green.

Today, FC and Rx HR Operations teams complete a quarterly self-assessment of site HR Standard Work quality. Teams manually gather evidence from nine sources and compile the results in a spreadsheet. HR Transformation subsequently aggregates and analyzes those results.

This process is time-consuming, introduces inconsistency, and relies on sites to grade their own performance.

Planned for launch on September 28, 2026, HR Fitness Check will provide objective, repeatable, and evidence-backed measurement of C03-C06 Standard Work. Monthly Progress Checks will help site and regional HR understand movement, open actions, evidence gaps, relevant local context, and risks before the next Quarterly Fitness Check. A Quarterly Fitness Check is the formal quarterly product event; its result reaches certified state only after a frozen catalog, approved scoring rules, defined evidence windows, required manual reviews, reconciliation, and authorized sign-off. Authorized On-Demand Previews will remain explicitly draft, and Historical Recasts will create a new version without overwriting prior results.

The annual Fitness Check view is a summary/report derived from the year's certified Quarterly Fitness Checks. It does not create a fifth scoring run, and a year-to-date report identifies any quarter that has not reached certified state.

The product is being designed with agent capabilities from day one so findings, recommendations, decisions, actions, context, feedback, and measured outcomes can be connected within a single governed workflow.

## How It Works

Deterministic rules evaluate approved Standard Work measures against trusted source data. Requirements that depend on manual review or physical inspection remain with authorized HR reviewers. Each measure has separately approved monthly and quarterly construction rules; a quarterly result is not produced by averaging monthly colors. AI converts the grounded results into site-specific insights and recommended paths to green.

The conversational agent helps authorized HR users ask questions, interpret findings, provide local context, and submit feedback. It can ask focused follow-up questions and classify a response as operational context, an evidence dispute, a source/process-change proposal, recommendation feedback, an action update, narrative feedback, or product feedback. Before durable context is saved, the agent previews what will be remembered, who supplied it, where and when it applies, who may see it, how it may be used, and when it expires.

System findings, user-provided context, model interpretation, and recommendations remain visibly distinct. Confirmed context may improve an applicable monthly narrative or constrain a recommendation. It cannot by itself change a deterministic result, the approved denominator, a scoring rule, a source mapping, or quarterly certification. Source and process changes require validation, reconciliation, approval, and versioned activation by an authorized owner.

Regional HR teams review each recommendation and accept, modify, decline, or defer it. The workflow captures each decision and its rationale, creating governed evidence that can be used to evaluate and improve recommendation quality over time. When a recommendation results in an accepted action, the agent records the action, owner, and target date in the approved SharePoint tracker only after explicit user confirmation.

At the next comparable measurement, HR Fitness Check links the completed action to subsequent quality movement. This allows ORBIT to measure not only whether a recommendation was produced, but also whether it was accepted, executed, and followed by verified improvement in Standard Work quality.

Feedback enters a governed learning loop: capture and classify, protect or redact as required, review, propose a change, evaluate and regression-test, approve, version, release, and monitor. The agent does not train itself or silently change production behavior from a conversation.

## What It Delivers

Across its launch scope and roadmap, HR Fitness Check improves HR Standard Work in seven distinct ways:

- Automates evidence gathering and scoring when reliable source data and approved rules are available.
- Replaces inconsistent self-grading with objective, repeatable, and traceable quality measurement.
- Establishes a monthly improvement rhythm while preserving Quarterly Fitness Check accountability and an annual reporting view.
- Surfaces patterns, strengths, and systemic opportunities across sites, regions, FC, Rx, and the network.
- Generates evidence-backed recommendations that give HR teams a clear path to green.
- Gives HR users a governed conversational experience for questions, attributed local context, evidence disputes, and feedback.
- Creates a closed-loop record linking each recommendation to the human decision, completed action, measured quality movement, and sustained result.

## Roadmap

The vision is for HR Fitness Check to become the network's closed-loop quality-improvement system for HR Standard Work. The roadmap is to:

- Complete catalog approval, source mapping, scoring rules, data-readiness decisions, access controls, and governance requirements ahead of launch.
- Automate only measures that can be sourced and scored reliably, while preserving human inspection and judgment where required.
- Approve monthly eligibility, monthly construction, quarterly construction, certification, recast, and comparability rules for every production measure.
- Launch provisional monthly progress reporting and a formal Quarterly Fitness Check certification workflow without conflating their authority.
- Deliver annual and year-to-date Fitness Check reporting derived from certified quarterly results, not a separate annual scoring run.
- Launch a structured context and feedback workflow with user confirmation, attribution, access scope, verification, expiration, correction, retraction, and source/change-proposal routing.
- Launch a governed recommendation workflow that captures accepted, modified, declined, and deferred decisions, including the rationale for each decision.
- Track action ownership, execution, and follow-up measurement so value can be demonstrated through verified quality movement.
- Expand the agent's role from recording decisions to facilitating the review itself by answering questions and capturing context, feedback, decisions, rationale, owners, and actions in the same governed interaction.
- Use decision and outcome evidence to evaluate and continuously improve recommendation quality across the network. Decision and outcome records are evaluation evidence; they do not authorize automatic model learning or autonomous action.

## Value And Success

HR Fitness Check shifts the quarterly assessment from a manually compiled, self-reported exercise to a closed-loop system for improving HR Standard Work. By reducing the effort required to compile assessments at both site and network levels, it is estimated to make approximately 540 HR hours available annually for action rather than assessment compilation. This represents an estimated $33,123 in annual capacity value.

These figures are planning estimates, not realized savings. The value case must be validated through an approved catalog, a documented current-state effort baseline, live-source pilot evidence, and a defined benefit-realization method.

Success will ultimately be measured by whether the product produces accurate and reproducible results, helps HR teams identify and address gaps earlier, uses context accurately without changing deterministic scores, resolves evidence and source issues, reduces assessment compilation effort, and converts accepted recommendations into completed actions followed by verified, sustained improvement in HR Standard Work quality.

This product is being built for and in close collaboration with Weipan Le.

## Current Readiness Boundary

The current application remains a synthetic, read-only review build. The exact original SharePoint workbook contains draft Column G dispositions for all 33 working rows: 21 candidate, including 2 external governed-source candidates; 5 blocked; 5 manual/hybrid; 1 validated-object/rule-pending; and 1 derived. Fifteen candidates depend on sandbox objects, and zero source mappings are production-approved. The 33 rows remain working business intent, not an approved denominator.

The monthly progress, Quarterly Fitness Check certification, annual reporting, persistent context/feedback, recommendation decision, SharePoint action, and outcome-linkage capabilities described here are governed target-state capabilities. They require the catalog, source, rule, measure-construction, access, privacy, audit-trail, evaluation, and release gates in the PRD; they are not claims about current production behavior.

## Definitions Requiring Approval

- `comparable measurement`: a later measurement whose catalog, rule, source, hierarchy, and period definitions pass the approved comparability policy.
- `verified improvement`: positive quality movement that passes the approved measurement and evidence rules; sequence alone does not prove causality.
- `sustained result`: verified improvement that remains above the approved threshold for the approved number of comparable measurements.
- `capacity value`: estimated available HR time multiplied by the approved loaded hourly value; it is not booked savings unless Finance approves that treatment.
- `monthly progress check`: a provisional operational report for approved monthly-enabled measures; it is not a certified Quarterly Fitness Check result.
- `quarterly fitness check`: the formal quarterly product event; canonical run type `quarterly_fitness_check`. Its result reaches certified state only after frozen approved configuration, required evidence, reconciliation, manual review, and authorized sign-off.
- `annual fitness check report`: an annual or year-to-date summary derived from certified Quarterly Fitness Checks; it is not a separate scoring run.
- `on-demand preview`: a draft or month-to-date view that never carries certified authority.
- `historical recast`: a new version of a prior result created after an approved source, rule, catalog, or correction change; it does not overwrite history.
- `context assertion`: an attributed, scoped, time-bounded user statement with an explicit verification state and approved uses; it is not deterministic evidence.
