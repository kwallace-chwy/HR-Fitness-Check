# HR Fitness Check POC

Status: Static operational cockpit
Last updated: 2026-07-15

## Purpose

This POC restores the checked-in UI artifact described by the root README. It is an operational HR product surface, not a marketing page. It focuses on source readiness, V1 scope, route policy, eval/audit controls, manual workflow boundaries, and site assessment review.

## Run

Open directly:

```text
C:\Users\kwallace12\OneDrive - Chewy.com, LLC\Documents\Agentic HR Fitness Check\poc\index.html
```

Or serve locally from the repository root:

```powershell
python -m http.server 8800
```

Then open:

```text
http://127.0.0.1:8800/poc/
```

## Reference

The UI mirrors the local ORBIT operational cockpit reference:

```text
http://127.0.0.1:8790/
```

The reference uses a dark, dense, Primer-like cockpit with compact status tiles, evidence panels, queues, and a sticky assistant pane. This POC adapts that feel for HR Fitness Check while preserving Chewy brand colors and the HR governance context.

The current interaction set is intentionally local and deterministic:

- Workspace tabs switch between overview, source, route, and eval/audit states.
- Site-group filters and site-row selection update the visible route scope.
- Period selection updates the draft review scope only.
- The source review action creates an in-page draft packet and performs no source query, model call, approval, publication, or external write.

## Data Note

Readiness counts reflect the reviewed workbook facts documented in the repo. Site-level green/yellow/red values are synthetic demonstration data only and must not be treated as current performance or an approved Q3 baseline. Production data binding remains blocked until the catalog denominator, source mappings, rating rules, access controls, and missing-data policy are approved and implemented.
