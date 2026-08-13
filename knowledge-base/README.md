# HR Fitness Check Knowledge Base

Status: Draft discovery knowledge base
Last updated: 2026-08-12
Product: ORBIT HR Fitness Check

## Purpose

This knowledge base captures source-discovery findings for HR Fitness Check ingestion. It translates the reviewed PRD/checklist into data-source leads, ingestion candidates, open blockers, and Snowflake discovery steps.

Tagline: Fitness check measures the quality of standard work. Is the stated process being followed?

## How To Use This Knowledge Base

Start with these files:

- `knowledge-base/source-inventory.md` for the located systems, documents, dashboards, data marts, and pipeline leads.
- `knowledge-base/voc-pulse-action-roadmap.md` for the 2025 VOC Pulse action-loop context and 2026 TM Experience roadmap workstreams.
- `knowledge-base/ingestion-backlog.md` for the first source-mapping tranche, the current 33-row working-catalog boundary, and explicitly historical June 30 crosswalks.
- `knowledge-base/snowflake-discovery-playbook.md` for SQL templates and access checks to run once Snowflake access is available.
- `knowledge-base/research-log.md` for what has already been searched and what was not found.

## Current Discovery Summary

The original SharePoint source workbook was last modified 2026-07-29 16:32:27 UTC. It contains 33 task rows, all marked `In Scope.`, with owner roles populated for all 33; its source-table, reviewer, and result fields were blank when fetched and remain unchanged. A separate source-integrated derivative was published and version-verified in OneDrive/SharePoint on 2026-08-12 as item `01LYSC3QJ3RANZPMKYABGZQVLYSVXYKF7R`, version `1.0`, 17,144 bytes. The catalog remains approval-pending: stable IDs, implementation modes, source contracts, rating rules, and approvals are unapproved, and five June 30 rows are absent without an approved removal decision. The local MVP is read-only and uses synthetic fixture results.

The 33-row source-integrated mapping disposition is 21 candidate, including 2 external governed-source candidates; 5 blocked; 5 manual/hybrid; 1 validated-object/rule-pending; 1 derived; and 0 approved. Fifteen candidates remain sandbox-dependent. `Validated-object/rule-pending` confirms metadata only; it does not authorize production scoring. All `SANDBOX` objects are discovery candidates, not production-certified sources. Finding a source is not approval to ingest or score it.

Most V1 data appears to sit in one of these source families:

- HR DataMart / Snowflake, especially Workday and ServiceNow HR case/task data.
- EDLDB / UKG Snowflake tables for timecard, schedule, and accrual data.
- EDLDB People Analytics and fulfillment sandbox objects for Roster Health, Standups, surveys, Quality 1:1, LEWs, CAT, ECHO, VOC, VET/VTO, and Labor Planning discovery; these require production-source decisions.
- Existing FC HR Analytics / Pipewiser jobs for HR Packet, Roster Health, ECHO, New Hire Surveys, CAT, VET/VTO, and Smartsheet roster feeds.
- SharePoint and Smartsheet artifacts for SOPs and current tracker workflows, including authoritative site Smartsheets for FLO and temporary schedules plus site locker-management examples.
- Governed external-system leads: the EPA ServiceNow resolved-case export for SNOW/LOAA discovery, Workday report paths for beneficiary/emergency-contact checks, and EthicsPoint/OpenBark for investigations.
- FC Ops Library 2026 TM Experience Roadmap artifacts for VOC Pulse action-loop context, approved-intervention candidates, and future-report recommendations.
- Tableau dashboards fed by the sources above, useful for reconciliation but not preferred as the durable ingestion source.
- A TM Experience/Signage Microsoft Forms builder that defines a future normalized response contract; live deployment and response coverage are not verified.

## Important Controls

Do not treat any source as ingestion-ready until these are known:

- Source system and source object/table/report.
- Source fields, filters, joins, and site key.
- Date window and measurement cadence.
- Data owner and approval status.
- Data classification, retention, and output aggregation policy.
- Validation examples that reconcile against the current workbook or SME-approved expected output.

Associate-level and case-level detail may exist in source systems even when Fitness Check output is aggregate. The ingestion design must keep rating outputs separate from raw source access.

## Current Snowflake Access Status

An existing Python + Snowflake SSO setup was located in the Workload Lens project on this machine. It uses browser SSO through Okta and the Snowflake Python connector.

Current working context for `EDLDB` / `UKG`:

- Role: `PEOPLE_ANALYTICS_DEVELOPER`
- Warehouse: `PEOPLE_ANALYTICS_WH`
- Database: `EDLDB`
- Schema: `PEOPLE_ANALYTICS_SANDBOX`
- Secondary roles reported by Snowflake: `FULFILLMENT_OPTIMIZATION_DEVELOPER`, `OTH_USER`, `DBT_DEMO_DEVELOPER`

June 19 baseline discovery from that context:

- Snowflake SSO smoke test succeeded.
- `EDLDB` table metadata query succeeded and returned 817 candidate rows.
- `EDLDB.UKG` column metadata query succeeded and returned 618 candidate rows.

Targeted live refresh completed on 2026-08-11:

- HRFC-wide EDLDB table discovery returned 3,206 rows; query ID `01c652ca-071c-ed42-00a0-2d04d51ded47`.
- Priority UKG column discovery returned 710 rows; query ID `01c652cb-071c-eb73-00a0-2d04d51eeba3`.
- People Analytics HRFC column discovery returned 738 rows; query ID `01c652cf-071c-eb73-00a0-2d04d5224267`.

HRDM context:

- HR DataMart is a different Snowflake environment/profile from the Workload Lens `EDLDB` profile.
- A local HRDM profile was created outside this repository and validated through browser SSO.
- HRDM metadata discovery now has schema, table, and column outputs.
- HRDM roster and Workday current/trended objects are visible.
- The 2026-08-11 targeted HRDM table and priority-column queries returned 101 and 1,066 rows, with query IDs `01c652cc-0420-bdd7-0066-27031a10b762` and `01c652cc-0420-b7c9-0066-27031a1059f2`.
- No obvious beneficiary, emergency-contact, dependent, benefit-completeness, or ServiceNow HR case/task fields/tables were found in HRDM. The live ServiceNow name search returned zero rows under query ID `01c652c8-0420-b62d-0066-27031a1068ee`.
- The earlier HRDM-only search also found no LEW or Quality 1:1 names; the later EDLDB refresh found sandbox candidates `QUALITY_ONE_ON_ONE`, `FULFILLMENT_QUALITY`, and `FULFILLMENT_LEW`. They remain unapproved and non-production.

Practical solution:

1. Reuse the existing Workload Lens Python virtual environment and SSO config for EDLDB/UKG discovery.
2. Use the local HRDM profile for `D_HRDATAMART` metadata discovery and approved aggregate-only queries.
3. Reconcile each sandbox candidate to Tableau/source-owner definitions and identify a production-certified target before any scoring use.
4. Ask HRDM/Workday owners for beneficiary and emergency-contact field/report mapping because those fields were not discoverable by obvious column names.
5. Ask ServiceNow/HRDM owners for the actual production schema or database containing HR case/task replication.
6. Verify the live SharePoint workbook version before claiming the local Column-G derivative was published.
7. Optionally install `snowflake-connector-python[secure-local-storage]` in the existing venv to reduce repeated browser SSO prompts.
