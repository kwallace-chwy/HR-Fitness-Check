const state = {
  view: "overview",
  selectedGroup: "All",
  selectedSite: "HOU1",
  assessmentPeriod: "2026 Q3"
};

const metrics = [
  {
    label: "Audit rows",
    value: "38",
    caption: "task rows in latest SharePoint workbook v22",
    trend: "Needs stable owners and object contracts",
    tone: "accent",
    good: false
  },
  {
    label: "Scope-intent rows",
    value: "37",
    caption: "business wants measured if mapping is approved",
    trend: "Not a scoring denominator yet",
    tone: "success",
    good: true
  },
  {
    label: "Owner gaps",
    value: "38",
    caption: "current owner cells blank in workbook",
    trend: "Launch gate fails until assigned",
    tone: "attention",
    good: false
  },
  {
    label: "Mapped tables",
    value: "0",
    caption: "Snowflake Table cells populated",
    trend: "Do not score until cleared",
    tone: "danger",
    good: false
  }
];

const dispositions = [
  { label: "In scope intent", count: 37, tone: "success" },
  { label: "Remove", count: 1, tone: "danger" },
  { label: "Current owner blanks", count: 38, tone: "attention" },
  { label: "Snowflake table blanks", count: 38, tone: "danger" },
  { label: "Reviewer blanks", count: 38, tone: "attention" }
];

const blockers = [
  {
    title: "Source registry not approved",
    status: "Architecture",
    detail: "Source owner, classification, audience, workflow scope, freshness, retention, citation, and approval fields are not complete."
  },
  {
    title: "Capability routes are draft",
    status: "Agent control",
    detail: "Site assessment, rollup, manual input, narrative, and publishing routes need feature flags, eval gates, and audit fields."
  },
  {
    title: "Confluence sync must stay downstream",
    status: "Publishing",
    detail: "The live Confluence sync state must be re-verified against the GitHub source."
  },
  {
    title: "Manual workflow undecided",
    status: "Product",
    detail: "TM Experience Walk, badge, signage, and FLO-like items need a governed manual evidence home."
  }
];

const sites = [
  { site: "HOU1", group: "1G", green: 18, yellow: 9, red: 10, missing: 0, quality: 0.61, status: "Recast required" },
  { site: "AVP1", group: "1G", green: 20, yellow: 10, red: 7, missing: 0, quality: 0.68, status: "Recast required" },
  { site: "RNO1", group: "1G", green: 19, yellow: 8, red: 10, missing: 0, quality: 0.62, status: "Recast required" },
  { site: "DAY1", group: "2G", green: 22, yellow: 8, red: 6, missing: 1, quality: 0.70, status: "Missing visible" },
  { site: "AVP2", group: "2G", green: 23, yellow: 9, red: 4, missing: 1, quality: 0.74, status: "Missing visible" },
  { site: "RXC1", group: "Rx", green: 30, yellow: 5, red: 2, missing: 0, quality: 0.88, status: "Scope pending" }
];

const sourceQueue = [
  {
    id: "A-005",
    item: "SNOW Tickets",
    source: "ServiceNow / HRDM",
    status: "Blocked",
    tone: "danger",
    detail: "Expected case/task tables were not found in first-pass HRDM metadata search."
  },
  {
    id: "A-010",
    item: "Missing Time Stamps",
    source: "UKG / Snowflake",
    status: "Source located",
    tone: "success",
    detail: "EDLDB.UKG timecard objects exist; field-level mapping and 48-hour window validation are next."
  },
  {
    id: "A-002",
    item: "Standup Audits",
    source: "ECHO / FC HR Analytics",
    status: "Source located",
    tone: "success",
    detail: "Stand Ups task and ECHO dashboard are source leads; map site, week, score, and minimum audit count."
  },
  {
    id: "A-001",
    item: "TM Experience Walk",
    source: "Smartsheet or replacement",
    status: "Hybrid/manual",
    tone: "attention",
    detail: "Requires manual evidence workflow and Smartsheet replacement decision."
  },
  {
    id: "A-022",
    item: "Beneficiaries",
    source: "Workday / HRDM",
    status: "Candidate",
    tone: "attention",
    detail: "HRDM is accessible, but obvious beneficiary fields were not found by first-pass metadata search."
  },
  {
    id: "A-030",
    item: "Investigations",
    source: "Workday / ER",
    status: "Governance first",
    tone: "danger",
    detail: "Aggregate-only inclusion rules require legal and governance approval before mapping."
  }
];

const routes = [
  {
    id: "cap.hrfc.site_assessment.v1",
    title: "Site assessment review",
    level: "L3 Recommend",
    status: "Draft",
    detail: "Retrieve approved scored results, caveats, source IDs, and draft a human-reviewable summary."
  },
  {
    id: "cap.hrfc.rollup_review.v1",
    title: "Rollup review",
    level: "L3 Recommend",
    status: "Draft",
    detail: "Aggregate approved results to region, Rx, site group, and network after hierarchy approval."
  },
  {
    id: "cap.hrfc.source_mapping_review.v1",
    title: "Source mapping readiness",
    level: "L2 Analyze",
    status: "Draft",
    detail: "Show blocked, candidate, source-located, derived, and manual rows without scoring uncertainty."
  },
  {
    id: "cap.hrfc.manual_input_preview.v1",
    title: "Manual input preview",
    level: "L4 Preview",
    status: "Disabled for submit",
    detail: "Show exact evidence requirements. Submit action stays off until approval record contract is enabled."
  },
  {
    id: "cap.hrfc.narrative_summary.v1",
    title: "Supervised narrative",
    level: "L3 Recommend",
    status: "Draft",
    detail: "Draft strengths and opportunities only from scored results, caveats, and approved intervention references."
  },
  {
    id: "cap.hrfc.confluence_publish_preview.v1",
    title: "Confluence publishing preview",
    level: "L4 Preview",
    status: "Disabled",
    detail: "Prepare GitHub-derived page body. Direct page update requires publishing action-class approval."
  }
];

const evals = [
  ["Route accuracy", "Capability and workflow selected correctly."],
  ["Groundedness", "Claims tied to approved result, source, or registry evidence."],
  ["Access denial", "Unauthorized site or source requests fail closed."],
  ["Stale/conflict", "Stale or conflicting source does not become final authority."],
  ["Prompt injection", "User and source instructions cannot override workflow controls."],
  ["Action boundary", "No unapproved manual submit, publish, or write-back action."]
];

const auditFields = [
  "request_id",
  "session_id",
  "user_scope",
  "capability_id",
  "route_policy",
  "source_ids",
  "source_versions",
  "tool_ids",
  "model_profile",
  "prompt_package",
  "output_schema",
  "guardrails",
  "approval_record",
  "feedback"
];

const approvals = [
  ["Source owners", "Owner, steward, freshness, citation, and workflow scope for each source."],
  ["Governance", "Classification, retention, redaction, and trace payload mode."],
  ["Manual workflow", "Evidence home, required fields, approver, and correction process."],
  ["Publishing", "Confluence audience, retention, page owner, and rollback path."]
];

function labelClass(tone) {
  if (tone === "success") return "label success";
  if (tone === "attention") return "label attention";
  if (tone === "danger") return "label severe";
  if (tone === "accent") return "label accent";
  return "label secondary";
}

function renderMetrics() {
  const root = document.getElementById("metricGrid");
  root.innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric ${metric.tone}">
          <div class="metric-label">${metric.label}</div>
          <div class="metric-value">${metric.value}</div>
          <div class="metric-caption">${metric.caption}</div>
          <div class="metric-trend ${metric.good ? "good" : "bad"}">${metric.trend}</div>
        </article>
      `
    )
    .join("");
}

function renderDisposition() {
  const root = document.getElementById("dispositionBars");
  const max = Math.max(...dispositions.map((item) => item.count));
  root.innerHTML = dispositions
    .map((item) => {
      const width = Math.max(6, Math.round((item.count / max) * 100));
      return `
        <div class="bar-row">
          <span>${item.label}</span>
          <span class="bar-track"><span class="bar-fill ${item.tone}" style="--w:${width}%"></span></span>
          <strong>${item.count}</strong>
        </div>
      `;
    })
    .join("");
}

function renderBlockers() {
  const root = document.getElementById("blockerList");
  root.innerHTML = blockers
    .map(
      (item) => `
        <article class="blocker-item">
          <div class="blocker-title">
            <strong>${item.title}</strong>
            <span class="label attention">${item.status}</span>
          </div>
          <p>${item.detail}</p>
        </article>
      `
    )
    .join("");
}

function renderSiteFilters() {
  const root = document.getElementById("siteFilters");
  const groups = ["All", ...Array.from(new Set(sites.map((site) => site.group)))];
  root.innerHTML = groups
    .map(
      (group) => `
        <button class="chip ${state.selectedGroup === group ? "active" : ""}" type="button" data-group="${group}">
          ${group}
        </button>
      `
    )
    .join("");

  root.querySelectorAll("[data-group]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedGroup = button.dataset.group;
      const visible = getVisibleSites();
      state.selectedSite = visible[0]?.site || state.selectedSite;
      renderSiteFilters();
      renderSites();
      renderAside();
    });
  });
}

function getVisibleSites() {
  return state.selectedGroup === "All"
    ? sites
    : sites.filter((site) => site.group === state.selectedGroup);
}

function renderSites() {
  const root = document.getElementById("siteRows");
  const rows = getVisibleSites();
  root.innerHTML = rows
    .map((site) => {
      const selected = site.site === state.selectedSite ? "selected" : "";
      const statusTone = site.status.includes("Missing") ? "attention" : site.status.includes("Scope") ? "attention" : "accent";
      return `
        <tr class="${selected}" data-site="${site.site}" tabindex="0" aria-selected="${selected ? "true" : "false"}">
          <td><strong>${site.site}</strong></td>
          <td>${site.group}</td>
          <td class="num">${site.green}</td>
          <td class="num">${site.yellow}</td>
          <td class="num">${site.red}</td>
          <td class="num">${site.missing}</td>
          <td>
            <span class="score">
              <span class="score-bar"><span style="--w:${Math.round(site.quality * 100)}%"></span></span>
              <span>${site.quality.toFixed(2)}</span>
            </span>
          </td>
          <td><span class="${labelClass(statusTone)}">${site.status}</span></td>
        </tr>
      `;
    })
    .join("");

  root.querySelectorAll("[data-site]").forEach((row) => {
    const selectSite = () => {
      state.selectedSite = row.dataset.site;
      renderSites();
      renderAside();
    };
    row.addEventListener("click", selectSite);
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectSite();
      }
    });
  });
}

function renderSourceQueue() {
  const root = document.getElementById("sourceQueue");
  root.innerHTML = sourceQueue
    .map(
      (item) => `
        <article class="queue-item">
          <div class="queue-title">
            <strong>${item.id} ${item.item}</strong>
            <span class="${labelClass(item.tone)}">${item.status}</span>
          </div>
          <div class="small-muted">${item.source}</div>
          <p>${item.detail}</p>
        </article>
      `
    )
    .join("");
}

function renderRoutes() {
  const root = document.getElementById("routeGrid");
  root.innerHTML = routes
    .map(
      (route) => `
        <article class="route-item">
          <div class="route-title">
            <strong>${route.title}</strong>
            <span class="label secondary">${route.level}</span>
          </div>
          <div class="small-muted">${route.id}</div>
          <p>${route.detail}</p>
          <span class="${route.status.includes("Disabled") ? "label severe" : "label attention"}">${route.status}</span>
        </article>
      `
    )
    .join("");
}

function renderEval() {
  const root = document.getElementById("evalList");
  root.innerHTML = evals
    .map(
      ([title, detail]) => `
        <article class="check-item">
          <div class="check-title">
            <strong>${title}</strong>
            <span class="label attention">Required</span>
          </div>
          <p>${detail}</p>
        </article>
      `
    )
    .join("");

  const auditRoot = document.getElementById("auditGrid");
  auditRoot.innerHTML = auditFields
    .map(
      (field) => `
        <div class="audit-item">
          <strong>${field}</strong>
          <div class="small-muted">trace field</div>
        </div>
      `
    )
    .join("");
}

function renderAside() {
  const site = sites.find((entry) => entry.site === state.selectedSite) || sites[0];
  const routeRoot = document.getElementById("currentRoute");
  routeRoot.innerHTML = `
    <div class="route-summary">
      <div class="route-summary-row"><span>Capability</span><strong>site assessment</strong></div>
      <div class="route-summary-row"><span>Site scope</span><strong>${site.site}</strong></div>
      <div class="route-summary-row"><span>Group</span><strong>${site.group}</strong></div>
      <div class="route-summary-row"><span>Autonomy</span><strong>L3 draft</strong></div>
      <div class="route-summary-row"><span>Result status</span><strong>${site.status}</strong></div>
    </div>
  `;

  const approvalRoot = document.getElementById("approvalList");
  approvalRoot.innerHTML = approvals
    .map(
      ([title, detail]) => `
        <article class="approval-item">
          <strong>${title}</strong>
          <p>${detail}</p>
        </article>
      `
    )
    .join("");

  const preview = document.getElementById("packetPreview");
  if (!preview.hidden) renderPacketPreview();
}

function renderPacketPreview() {
  const site = sites.find((entry) => entry.site === state.selectedSite) || sites[0];
  const root = document.getElementById("packetPreviewContent");
  root.innerHTML = `
    <div class="packet-summary">
      <div><span>Review scope</span><strong>${site.site} / ${site.group}</strong></div>
      <div><span>Period</span><strong>${state.assessmentPeriod}</strong></div>
      <div><span>Evidence state</span><strong>Synthetic demo</strong></div>
      <div><span>Result status</span><strong>${site.status}</strong></div>
    </div>
    <p>Open decisions: stable catalog IDs, source owners, row-level source approvals, implementation modes, manual evidence home, and eval evidence.</p>
    <p class="packet-boundary">Draft preview only. No source query, model call, approval, publication, or system write occurred.</p>
  `;
}

function bindTabs() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      document.querySelectorAll(".tab").forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle("active", active);
        tab.setAttribute("aria-selected", String(active));
      });
      button.classList.add("active");
      document.querySelectorAll(".view").forEach((view) => {
        const active = view.id === `view-${state.view}`;
        view.classList.toggle("active", active);
        view.hidden = !active;
      });
    });
  });
}

function bindPeriodButtons() {
  document.querySelectorAll(".segmented").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));
    button.addEventListener("click", () => {
      state.assessmentPeriod = button.textContent.trim();
      document.querySelectorAll(".segmented").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      const preview = document.getElementById("packetPreview");
      if (!preview.hidden) renderPacketPreview();
    });
  });
}

function bindPacketPreview() {
  const button = document.getElementById("preparePacketButton");
  const preview = document.getElementById("packetPreview");
  button.addEventListener("click", () => {
    preview.hidden = false;
    renderPacketPreview();
    button.textContent = "Refresh draft packet";
  });
}

function init() {
  renderMetrics();
  renderDisposition();
  renderBlockers();
  renderSiteFilters();
  renderSites();
  renderSourceQueue();
  renderRoutes();
  renderEval();
  renderAside();
  bindTabs();
  bindPeriodButtons();
  bindPacketPreview();
}

init();
