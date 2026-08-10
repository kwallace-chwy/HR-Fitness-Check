"use strict";

const state = {
  view: "overview",
  meta: null,
  filterOptions: null,
  filters: { period: "", region: "All", group: "All" },
  renderToken: 0
};

const views = {
  overview: {
    eyebrow: "Quarterly assessment",
    title: "Network overview",
    description: "Decision-ready reporting with coverage and result status kept separate."
  },
  "work-queue": {
    eyebrow: "Assessment operations",
    title: "Standard Work queue",
    description: "Review working-catalog ownership, evidence mode, source posture, and unresolved workflow gates."
  },
  sites: {
    eyebrow: "Site review",
    title: "Site attention view",
    description: "Compare evidence coverage and item distributions without ranking sites or assigning blame."
  },
  sources: {
    eyebrow: "Data readiness",
    title: "Source and release readiness",
    description: "Track source evidence, mapping blockers, ownership gaps, and the next decision required."
  },
  reports: {
    eyebrow: "Reporting",
    title: "Executive review draft",
    description: "Generate a deterministic, filter-consistent report with metrics, caveats, decisions, and export."
  },
  audit: {
    eyebrow: "Control evidence",
    title: "Request audit",
    description: "Inspect the local MVP request trail, route decisions, scope filters, and response status."
  }
};

const elements = {
  content: document.getElementById("appContent"),
  pageEyebrow: document.getElementById("pageEyebrow"),
  pageTitle: document.getElementById("pageTitle"),
  pageDescription: document.getElementById("pageDescription"),
  periodFilter: document.getElementById("periodFilter"),
  regionFilter: document.getElementById("regionFilter"),
  groupFilter: document.getElementById("groupFilter"),
  filterContext: document.getElementById("filterContext"),
  filterBar: document.getElementById("globalFilterBar"),
  viewStatus: document.getElementById("viewStatus"),
  truthBanner: document.getElementById("truthBanner"),
  catalogStatus: document.getElementById("catalogStatus"),
  dialog: document.getElementById("detailDialog"),
  dialogEyebrow: document.getElementById("dialogEyebrow"),
  dialogTitle: document.getElementById("dialogTitle"),
  dialogBody: document.getElementById("dialogBody"),
  toast: document.getElementById("toast")
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatLabel(value) {
  return String(value ?? "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatPercent(value) {
  return value === null || value === undefined ? "Not available" : `${Math.round(value * 100)}%`;
}

function formatMetricPercent(metric) {
  return !metric || !metric.denominator ? "Not available" : `${Math.round((metric.numerator / metric.denominator) * 100)}%`;
}

function formatPoints(value) {
  if (value === null || value === undefined) return "No comparison";
  const points = Math.round(value * 100);
  if (points === 0) return "No change";
  return `${points > 0 ? "+" : ""}${points} pts`;
}

function statusBadge(status, label = null) {
  const safeStatus = String(status || "info").toLowerCase().replace(/[^a-z0-9_-]/g, "-");
  return `<span class="status-badge status-${safeStatus}">${escapeHtml(label || formatLabel(status))}</span>`;
}

function metricCard(label, value, detail, metric, delta = null) {
  const deltaClass = delta > 0 ? "positive" : delta < 0 ? "negative" : "";
  const definition = metric
    ? `${metric.metricId}: ${metric.numerator}/${metric.denominator}; ${metric.definitionVersion}; ${metric.comparabilityStatus}`
    : detail;
  return `
    <article class="metric-card" title="${escapeHtml(definition)}">
      <div class="metric-label"><span>${escapeHtml(label)}</span>${metric ? statusBadge("info", metric.definitionVersion) : ""}</div>
      <div class="metric-value">${escapeHtml(value)}</div>
      <div class="metric-detail">${escapeHtml(detail)}</div>
      ${delta === null ? "" : `<div class="metric-delta ${deltaClass}">${escapeHtml(formatPoints(delta))} illustrative QoQ</div>`}
    </article>
  `;
}

function buildQuery(extra = {}, filterKeys = ["period", "region", "group"]) {
  const params = new URLSearchParams();
  for (const key of filterKeys) params.set(key, state.filters[key]);
  for (const [key, value] of Object.entries(extra)) params.set(key, value);
  return params;
}

async function api(path, extra = {}, filterKeys = ["period", "region", "group"]) {
  const query = buildQuery(extra, filterKeys);
  const response = await fetch(`${path}${query.size ? `?${query}` : ""}`, { headers: { Accept: "application/json" } });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.message || `Request failed with status ${response.status}.`);
  }
  return payload;
}

function announce(message) {
  elements.viewStatus.textContent = message;
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    elements.toast.hidden = true;
  }, 2800);
}

function showLoading() {
  elements.content.setAttribute("aria-busy", "true");
  announce(`Loading ${views[state.view].title}.`);
  elements.content.innerHTML = `
    <div class="loading-state">
      <div>
        <div class="loading-line" aria-hidden="true"><span></span></div>
        <p style="margin-top:14px">Loading the selected review scope.</p>
      </div>
    </div>
  `;
}

function showError(error) {
  elements.content.setAttribute("aria-busy", "false");
  announce(`${views[state.view].title} could not be loaded.`);
  elements.content.innerHTML = `
    <div class="error-state">
      <div>
        <h2>Unable to load this view</h2>
        <p style="margin:8px 0 16px">${escapeHtml(error.message)}</p>
        <button class="secondary-button" id="retryViewButton" type="button">Try again</button>
      </div>
    </div>
  `;
  document.getElementById("retryViewButton")?.addEventListener("click", renderCurrentView);
}

function showEmpty(message) {
  elements.content.setAttribute("aria-busy", "false");
  announce(`${views[state.view].title} has no results in this scope.`);
  elements.content.innerHTML = `
    <div class="empty-state">
      <div>
        <h2>No results in this scope</h2>
        <p style="margin-top:8px">${escapeHtml(message)}</p>
      </div>
    </div>
  `;
}

function persistUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("view", state.view);
  url.searchParams.set("period", state.filters.period);
  url.searchParams.set("region", state.filters.region);
  url.searchParams.set("group", state.filters.group);
  window.history.replaceState({}, "", url);
}

function updateChrome() {
  const copy = views[state.view];
  elements.pageEyebrow.textContent = copy.eyebrow;
  elements.pageTitle.textContent = copy.title;
  elements.pageDescription.textContent = copy.description;
  document.querySelectorAll("[data-view]").forEach((button) => {
    const active = button.dataset.view === state.view;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  const activeNavItem = document.querySelector(`[data-view="${state.view}"]`);
  if (activeNavItem && window.matchMedia("(max-width: 860px)").matches) {
    window.requestAnimationFrame(() => activeNavItem.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" }));
  }
  elements.filterBar.hidden = ["work-queue", "sources", "audit"].includes(state.view);
  elements.filterContext.textContent = `${state.filters.period} / ${state.filters.region === "All" ? "Network" : state.filters.region} / ${state.filters.group === "All" ? "All site groups" : state.filters.group}`;
  persistUrl();
}

function optionList(values, selected) {
  return values.map((value) => `<option value="${escapeHtml(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(value)}</option>`).join("");
}

function renderTrendChart(rows) {
  const width = 680;
  const height = 230;
  const padX = 54;
  const padTop = 24;
  const padBottom = 42;
  const plotWidth = width - padX * 2;
  const plotHeight = height - padTop - padBottom;
  const x = (index) => padX + (rows.length === 1 ? plotWidth / 2 : (index * plotWidth) / (rows.length - 1));
  const y = (value) => padTop + (1 - value) * plotHeight;
  const points = rows.map((row, index) => `${x(index)},${y(row.greenShare.value || 0)}`).join(" ");
  const guides = [0.25, 0.5, 0.75, 1]
    .map((value) => `<line class="chart-grid-line" x1="${padX}" x2="${width - padX}" y1="${y(value)}" y2="${y(value)}"></line><text class="chart-axis-text" x="8" y="${y(value) + 4}">${Math.round(value * 100)}%</text>`)
    .join("");
  const dots = rows
    .map((row, index) => `<circle class="chart-dot" cx="${x(index)}" cy="${y(row.greenShare.value || 0)}" r="5"><title>${escapeHtml(row.period)}: ${formatMetricPercent(row.greenShare)}</title></circle><text class="chart-value" x="${x(index)}" y="${y(row.greenShare.value || 0) - 12}" text-anchor="middle">${formatMetricPercent(row.greenShare)}</text><text class="chart-axis-text" x="${x(index)}" y="${height - 14}" text-anchor="middle">${escapeHtml(row.period)}</text>`)
    .join("");
  return `
    <div class="chart-wrap">
      <svg class="trend-chart" role="img" aria-label="Illustrative green share by quarter" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        ${guides}
        <polyline class="chart-line" points="${points}"></polyline>
        ${dots}
      </svg>
    </div>
    <details class="chart-data">
      <summary>View chart data</summary>
      <div class="table-wrap" role="region" aria-label="Quarterly trend data. Scroll horizontally to review all columns." tabindex="0">
        <table><thead><tr><th>Quarter</th><th class="numeric">Green share</th><th class="numeric">Evidence coverage</th><th>Comparison</th></tr></thead>
        <tbody>${rows.map((row) => `<tr><td>${escapeHtml(row.period)}</td><td class="numeric">${formatMetricPercent(row.greenShare)}</td><td class="numeric">${formatMetricPercent(row.evidenceCoverage)}</td><td>${escapeHtml(formatLabel(row.comparabilityStatus))}</td></tr>`).join("")}</tbody></table>
      </div>
    </details>
  `;
}

function renderDistribution(distribution) {
  const total = distribution.green + distribution.yellow + distribution.red + distribution.missing;
  const segments = [
    ["Green", distribution.green, "green"],
    ["Yellow", distribution.yellow, "yellow"],
    ["Red", distribution.red, "red"],
    ["Exception", distribution.missing, "missing"]
  ];
  return `
    <div class="distribution-bar" aria-label="Result distribution">
      ${segments.map(([label, count, tone]) => `<span class="fill-${tone}" style="width:${total ? (count / total) * 100 : 0}%" title="${label}: ${count}"></span>`).join("")}
    </div>
    <ul class="legend-list">
      ${segments.map(([label, count, tone]) => `<li><span class="legend-swatch fill-${tone}" aria-hidden="true"></span><span>${label}</span><strong>${count}</strong></li>`).join("")}
    </ul>
  `;
}

async function renderOverview(token) {
  const [summary, trends, categories, gates] = await Promise.all([
    api("/api/v1/summary"),
    api("/api/v1/trends", {}, ["region", "group"]),
    api("/api/v1/categories"),
    api("/api/v1/release-gates", {}, [])
  ]);
  if (token !== state.renderToken) return;
  if (!summary.scope.siteCount) {
    showEmpty("Try a different rollup and site-group combination.");
    return;
  }
  const greenShare = summary.metrics.greenShare;
  const coverage = summary.metrics.evidenceCoverage;
  const exceptionRate = summary.metrics.evidenceExceptionRate;
  const manualCompletion = summary.metrics.manualCompletion;
  const ratedCategories = categories.rows.filter((row) => row.greenShare.value !== null);
  const evidenceGapCategories = categories.rows.filter((row) => row.greenShare.value === null);
  elements.content.innerHTML = `
    <section class="metric-grid" aria-label="Assessment summary metrics">
      ${metricCard("Green share", formatMetricPercent(greenShare), `${greenShare.numerator} green / ${greenShare.denominator} valid rated observations`, greenShare)}
      ${metricCard("Evidence coverage", formatMetricPercent(coverage), `${coverage.numerator} rated / ${coverage.denominator} eligible observations`, coverage)}
      ${metricCard("Evidence exception rate", formatMetricPercent(exceptionRate), `${exceptionRate.numerator} exceptions / ${exceptionRate.denominator} eligible observations`, exceptionRate)}
      ${metricCard("Manual completion", formatMetricPercent(manualCompletion), `${manualCompletion.numerator} accepted fixture inputs / ${manualCompletion.denominator} expected`, manualCompletion)}
    </section>

    <div class="section-grid">
      <section class="workspace-panel">
        <div class="panel-header">
          <div><h2>Quarterly trend</h2><p>Illustrative only. The working catalog has not been recast or approved for historical comparison.</p></div>
          ${statusBadge("warning", "Not comparable")}
        </div>
        <div class="panel-body">${renderTrendChart(trends.rows)}</div>
      </section>
      <section class="workspace-panel">
        <div class="panel-header">
          <div><h2>Result distribution</h2><p>Missing or blocked evidence remains separate from red.</p></div>
          ${statusBadge("info", `${summary.scope.siteCount} sites`)}
        </div>
        <div class="panel-body">${renderDistribution(summary.distribution)}</div>
      </section>
    </div>

    <div class="section-grid equal">
      <section class="workspace-panel">
        <div class="panel-header">
          <div><h2>Rated opportunity themes</h2><p>Item-derived fixture green share by category, ordered for attention rather than site ranking.</p></div>
        </div>
        <div class="panel-body">
          ${ratedCategories.map((row) => `<div class="progress-row"><span>${escapeHtml(row.category)}</span><span class="progress-track"><span style="--progress:${Math.round(row.greenShare.value * 100)}%"></span></span><strong>${formatMetricPercent(row.greenShare)}</strong></div>`).join("") || `<p class="small-muted">No categories have valid rated observations in this scope.</p>`}
          ${evidenceGapCategories.length ? `<div class="attention-callout"><strong>Evidence gaps:</strong> ${escapeHtml(evidenceGapCategories.map((row) => row.category).join(", "))}</div>` : ""}
        </div>
      </section>
      <section class="workspace-panel">
        <div class="panel-header">
          <div><h2>Release decisions</h2><p>Production scoring remains blocked even though the review MVP is ready to exercise.</p></div>
        </div>
        <div class="panel-body">
          <ul class="gate-list">${gates.rows.map((gate) => `<li><div><strong>${escapeHtml(gate.name)}</strong><p>${escapeHtml(gate.id)} / ${escapeHtml(gate.owner)}</p></div>${statusBadge(gate.status)}</li>`).join("")}</ul>
        </div>
      </section>
    </div>
  `;
}

function catalogRow(item) {
  return `
    <tr>
      <td><strong>${escapeHtml(item.task)}</strong><div class="small-muted">${escapeHtml(item.demoItemId)} / demo ID only</div></td>
      <td>${escapeHtml(item.ownerGroup)}</td>
      <td>${escapeHtml(item.category)}</td>
      <td>${statusBadge("info", formatLabel(item.evidenceMode))}</td>
      <td>${escapeHtml(formatLabel(item.accountabilityScope))}</td>
      <td><span class="table-primary">${escapeHtml(item.sourceFamily)}</span><div class="small-muted">${formatLabel(item.sourceStatus)}</div></td>
      <td>${statusBadge(item.readinessStatus)}</td>
      <td><button class="text-button inspect-catalog" type="button" data-item-id="${escapeHtml(item.demoItemId)}" aria-label="Inspect ${escapeHtml(item.task)}">Inspect</button></td>
    </tr>
  `;
}

async function renderWorkQueue(token) {
  const payload = await api("/api/v1/catalog-items", {}, []);
  if (token !== state.renderToken) return;
  const items = payload.rows;
  const manualCount = items.filter((item) => ["manual", "hybrid"].includes(item.implementationMode)).length;
  const governanceCount = items.filter((item) => item.implementationMode === "governance_first").length;
  elements.content.innerHTML = `
    <div class="view-intro">
      <p>The latest working matrix has 33 owner assignments, but no approved source mappings, implementation modes, reviewer records, results, or denominator. Modes below are product-validation assumptions.</p>
      ${statusBadge("warning", "Approval pending")}
    </div>
    <div class="summary-strip">
      <div><span>Working rows</span><strong>${items.length}</strong></div>
      <div><span>Owner roles populated</span><strong>33</strong></div>
      <div><span>Manual / hybrid assumptions</span><strong>${manualCount}</strong></div>
      <div><span>Governance-first items</span><strong>${governanceCount}</strong></div>
    </div>
    <section class="workspace-panel">
      <div class="panel-header"><div><h2>Catalog readiness queue</h2><p>Search and filter the July 29 working catalog. Readiness is not an assessment rating.</p></div></div>
      <div class="panel-body">
        <div class="local-filter">
          <label><span>Search tasks</span><input type="search" id="queueSearch" placeholder="Search by task, category, or owner" /></label>
          <label><span>Evidence mode</span><select id="queueEvidence"><option value="All">All modes</option><option value="physical">Physical</option><option value="virtual">Virtual</option><option value="mixed">Mixed</option></select></label>
          <label><span>Readiness</span><select id="queueReadiness"><option value="All">All statuses</option><option value="mapping_required">Mapping required</option><option value="manual_workflow_required">Manual workflow required</option><option value="governance_required">Governance required</option></select></label>
        </div>
      </div>
      <div class="table-wrap" role="region" aria-label="Standard Work catalog. Scroll horizontally to review all columns." tabindex="0">
        <table>
          <thead><tr><th>Standard Work item</th><th>Owner</th><th>Category</th><th>Evidence</th><th>Accountability</th><th>Source lead</th><th>Readiness</th><th>Action</th></tr></thead>
          <tbody id="queueRows"></tbody>
        </table>
      </div>
    </section>
  `;
  const search = document.getElementById("queueSearch");
  const evidence = document.getElementById("queueEvidence");
  const readiness = document.getElementById("queueReadiness");
  const renderRows = () => {
    const needle = search.value.trim().toLowerCase();
    const filtered = items.filter((item) => {
      const haystack = `${item.task} ${item.category} ${item.ownerGroup} ${item.sourceFamily}`.toLowerCase();
      if (needle && !haystack.includes(needle)) return false;
      if (evidence.value !== "All" && item.evidenceMode !== evidence.value) return false;
      if (readiness.value !== "All" && item.readinessStatus !== readiness.value) return false;
      return true;
    });
    document.getElementById("queueRows").innerHTML = filtered.length
      ? filtered.map(catalogRow).join("")
      : `<tr><td colspan="8">No catalog items match these filters.</td></tr>`;
    document.querySelectorAll(".inspect-catalog").forEach((button) => button.addEventListener("click", () => openCatalogItem(items.find((item) => item.demoItemId === button.dataset.itemId))));
  };
  [search, evidence, readiness].forEach((control) => control.addEventListener(control === search ? "input" : "change", renderRows));
  renderRows();
}

function openDialog(eyebrow, title, body) {
  elements.dialogEyebrow.textContent = eyebrow;
  elements.dialogTitle.textContent = title;
  elements.dialogBody.innerHTML = body;
  elements.dialog.showModal();
}

function openCatalogItem(item) {
  if (!item) return;
  openDialog("Working catalog item", item.task, `
    <div class="truth-banner"><strong>Demo contract</strong><span>The item ID and implementation mode are placeholders until the working catalog is approved.</span></div>
    <div class="detail-grid">
      <div class="detail-field"><span>Demo item ID</span><strong>${escapeHtml(item.demoItemId)}</strong></div>
      <div class="detail-field"><span>Current owner role</span><strong>${escapeHtml(item.ownerGroup)}</strong></div>
      <div class="detail-field"><span>Category</span><strong>${escapeHtml(item.category)}</strong></div>
      <div class="detail-field"><span>Evidence mode</span><strong>${escapeHtml(formatLabel(item.evidenceMode))}</strong></div>
      <div class="detail-field"><span>Demo implementation mode</span><strong>${escapeHtml(formatLabel(item.implementationMode))}</strong></div>
      <div class="detail-field"><span>Accountability scope</span><strong>${escapeHtml(formatLabel(item.accountabilityScope))}</strong></div>
      <div class="detail-field"><span>Source lead</span><strong>${escapeHtml(item.sourceFamily)}</strong></div>
      <div class="detail-field"><span>Source status</span><strong>${escapeHtml(formatLabel(item.sourceStatus))}</strong></div>
    </div>
    <div class="attention-callout"><strong>Next gate:</strong> ${escapeHtml(formatLabel(item.readinessStatus))}. Production scoring also requires approved source fields, filters, date window, site key, rule, and SME examples.</div>
  `);
}

function siteRow(row) {
  return `
    <tr>
      <td><strong>${escapeHtml(row.siteId)}</strong><div class="small-muted">Synthetic site</div></td>
      <td>${escapeHtml(row.region)} / ${escapeHtml(row.group)}</td>
      <td class="numeric">${formatMetricPercent(row.metrics.evidenceCoverage)}</td>
      <td class="numeric">${formatMetricPercent(row.metrics.greenShare)}</td>
      <td class="numeric">${row.distribution.yellow}</td>
      <td class="numeric">${row.distribution.red}</td>
      <td>${escapeHtml(row.topOpportunity?.category || "No rated items")}</td>
      <td>${statusBadge(row.resultStatus)}</td>
      <td><button class="text-button review-site" type="button" data-site-id="${escapeHtml(row.siteId)}" aria-label="Review synthetic site ${escapeHtml(row.siteId)}">Review</button></td>
    </tr>
  `;
}

async function renderSites(token) {
  const payload = await api("/api/v1/sites");
  if (token !== state.renderToken) return;
  const rows = payload.rows.slice().sort((a, b) => a.siteId.localeCompare(b.siteId));
  if (!rows.length) {
    showEmpty("Try a different rollup and site-group combination.");
    return;
  }
  const rated = rows.reduce((sum, row) => sum + row.metrics.evidenceCoverage.numerator, 0);
  const eligible = rows.reduce((sum, row) => sum + row.metrics.evidenceCoverage.denominator, 0);
  const red = rows.reduce((sum, row) => sum + row.distribution.red, 0);
  const exceptions = rows.reduce((sum, row) => sum + row.distribution.missing, 0);
  elements.content.innerHTML = `
    <div class="view-intro">
      <p>Sites are alphabetical, not ranked. Use item drilldown to separate site-controlled opportunities from enterprise, shared-service, source-quality, and governance barriers.</p>
      ${statusBadge("info", "Attention view")}
    </div>
    <div class="summary-strip">
      <div><span>Sites in scope</span><strong>${rows.length}</strong></div>
      <div><span>Evidence coverage</span><strong>${formatPercent(eligible ? rated / eligible : null)}</strong></div>
      <div><span>Red observations</span><strong>${red}</strong></div>
      <div><span>Evidence exceptions</span><strong>${exceptions}</strong></div>
    </div>
    <section class="workspace-panel">
      <div class="panel-header"><div><h2>Site assessment summaries</h2><p>Click Review for the 33-item product-validation fixture and result-status detail.</p></div>${statusBadge("warning", "Synthetic")}</div>
      <div class="table-wrap" role="region" aria-label="Synthetic site summaries. Scroll horizontally to review all columns." tabindex="0">
        <table><thead><tr><th>Site</th><th>Scope</th><th class="numeric">Coverage</th><th class="numeric">Green share</th><th class="numeric">Yellow</th><th class="numeric">Red</th><th>Attention theme</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>${rows.map(siteRow).join("")}</tbody></table>
      </div>
    </section>
  `;
  document.querySelectorAll(".review-site").forEach((button) => {
    button.addEventListener("click", () => openSiteReview(rows.find((row) => row.siteId === button.dataset.siteId)));
  });
}

function itemResultRow(row) {
  return `
    <tr>
      <td><strong>${escapeHtml(row.task)}</strong><div class="small-muted">${escapeHtml(row.demoItemId)}</div></td>
      <td>${escapeHtml(row.category)}</td>
      <td>${escapeHtml(row.ownerGroup)}</td>
      <td>${row.rating ? statusBadge(row.rating === "green" ? "success" : row.rating === "yellow" ? "warning" : "danger", formatLabel(row.rating)) : statusBadge("exception", "No rating")}</td>
      <td>${statusBadge(row.resultStatus)}</td>
      <td>${escapeHtml(formatLabel(row.evidenceMode))}</td>
      <td>${escapeHtml(formatLabel(row.accountabilityScope))}</td>
      <td><span class="table-primary">${escapeHtml(row.sourceId)}</span><div class="small-muted">${escapeHtml(formatLabel(row.sourceStatus))}</div></td>
    </tr>
  `;
}

async function openSiteReview(site) {
  if (!site) return;
  openDialog("Site assessment", `${site.siteId} / ${state.filters.period}`, `<div class="loading-state"><p>Loading item-level results.</p></div>`);
  try {
    const payload = await api("/api/v1/item-results", { site: site.siteId }, ["period"]);
    const rows = payload.rows;
    elements.dialogBody.innerHTML = `
      <div class="truth-banner"><strong>Synthetic results</strong><span>Ratings use demo-policy-v1-unapproved. Missing, manual-required, and unmapped states never become red.</span></div>
      <div class="detail-grid">
        <div class="detail-field"><span>Evidence coverage</span><strong>${formatMetricPercent(site.metrics.evidenceCoverage)}</strong></div>
        <div class="detail-field"><span>Green share</span><strong>${formatMetricPercent(site.metrics.greenShare)}</strong></div>
        <div class="detail-field"><span>Rollup</span><strong>${escapeHtml(site.region)} / ${escapeHtml(site.group)}</strong></div>
        <div class="detail-field"><span>Catalog</span><strong>${escapeHtml(payload.catalogVersion)}</strong></div>
      </div>
      <div class="local-filter">
        <label><span>Search items</span><input type="search" id="itemSearch" placeholder="Search task or category" /></label>
        <label><span>Rating / exception</span><select id="itemRating"><option value="All">All results</option><option value="green">Green</option><option value="yellow">Yellow</option><option value="red">Red</option><option value="exception">No rating</option></select></label>
        <label><span>Evidence mode</span><select id="itemEvidence"><option value="All">All modes</option><option value="physical">Physical</option><option value="virtual">Virtual</option><option value="mixed">Mixed</option></select></label>
      </div>
      <div class="table-wrap dialog-table" role="region" aria-label="Item results. Scroll horizontally to review all columns." tabindex="0">
        <table><thead><tr><th>Item</th><th>Category</th><th>Owner</th><th>Rating</th><th>Result status</th><th>Evidence</th><th>Accountability</th><th>Source</th></tr></thead><tbody id="itemResultRows"></tbody></table>
      </div>
    `;
    const search = document.getElementById("itemSearch");
    const rating = document.getElementById("itemRating");
    const evidence = document.getElementById("itemEvidence");
    const renderRows = () => {
      const needle = search.value.trim().toLowerCase();
      const filtered = rows.filter((row) => {
        if (needle && !`${row.task} ${row.category} ${row.ownerGroup}`.toLowerCase().includes(needle)) return false;
        if (rating.value === "exception" && row.rating) return false;
        if (!["All", "exception"].includes(rating.value) && row.rating !== rating.value) return false;
        if (evidence.value !== "All" && row.evidenceMode !== evidence.value) return false;
        return true;
      });
      document.getElementById("itemResultRows").innerHTML = filtered.length ? filtered.map(itemResultRow).join("") : `<tr><td colspan="8">No item results match these filters.</td></tr>`;
    };
    search.addEventListener("input", renderRows);
    rating.addEventListener("change", renderRows);
    evidence.addEventListener("change", renderRows);
    renderRows();
  } catch (error) {
    elements.dialogBody.innerHTML = `<div class="error-state"><p>${escapeHtml(error.message)}</p></div>`;
  }
}

function sourceRow(source) {
  return `
    <tr>
      <td><strong>${escapeHtml(source.family)}</strong><div class="small-muted">${escapeHtml(source.id)}</div></td>
      <td>${statusBadge(source.status)}</td>
      <td>${escapeHtml(source.coverage)}</td>
      <td>${escapeHtml(source.owner)}</td>
      <td>${escapeHtml(source.freshness)}</td>
      <td>${escapeHtml(source.nextAction)}</td>
      <td><button class="text-button inspect-source" type="button" data-source-id="${escapeHtml(source.id)}" aria-label="Inspect source ${escapeHtml(source.family)}">Inspect</button></td>
    </tr>
  `;
}

async function renderSources(token) {
  const [sourcePayload, gatePayload] = await Promise.all([api("/api/v1/sources", {}, []), api("/api/v1/release-gates", {}, [])]);
  if (token !== state.renderToken) return;
  const sources = sourcePayload.rows;
  const counts = sources.reduce((totals, source) => ({ ...totals, [source.status]: (totals[source.status] || 0) + 1 }), {});
  elements.content.innerHTML = `
    <div class="view-intro"><p>Source leads are discovery evidence, not active connectors. All 33 current matrix rows still have blank Snowflake mapping, reviewer, and result fields.</p>${statusBadge("warning", "0 approved mappings")}</div>
    <div class="summary-strip">
      <div><span>Located leads</span><strong>${counts.located || 0}</strong></div>
      <div><span>Candidate leads</span><strong>${counts.candidate || 0}</strong></div>
      <div><span>Blocked leads</span><strong>${counts.blocked || 0}</strong></div>
      <div><span>Governance-first</span><strong>${counts.governance || 0}</strong></div>
    </div>
    <section class="workspace-panel">
      <div class="panel-header"><div><h2>Source registry discovery</h2><p>Coverage, freshness, owner, and next action are visible before any source is activated.</p></div><label><span class="small-muted">Status filter</span><select id="sourceStatusFilter"><option value="All">All statuses</option>${Object.keys(counts).sort().map((status) => `<option value="${escapeHtml(status)}">${escapeHtml(formatLabel(status))}</option>`).join("")}</select></label></div>
      <div class="table-wrap" role="region" aria-label="Source readiness registry. Scroll horizontally to review all columns." tabindex="0"><table><thead><tr><th>Source family</th><th>Status</th><th>Coverage</th><th>Owner</th><th>Freshness</th><th>Next action</th><th>Action</th></tr></thead><tbody id="sourceRows"></tbody></table></div>
    </section>
    <div class="section-grid equal">
      <section class="workspace-panel"><div class="panel-header"><div><h2>Catalog reconciliation</h2><p>Historical scope changes still require an explicit catalog decision.</p></div></div><div class="panel-body"><ul class="detail-list"><li><div><strong>Prior Confluence snapshot</strong><p>Version 14 held a 49-item body dated May 15; replaced August 6</p></div>${statusBadge("success", "Reconciled")}</li><li><div><strong>Repository snapshot</strong><p>38 rows / 37 scope-intent, June 30</p></div>${statusBadge("warning", "Superseded")}</li><li><div><strong>SharePoint working matrix</strong><p>33 rows with owners, July 29</p></div>${statusBadge("warning", "Approval pending")}</li></ul></div></section>
      <section class="workspace-panel"><div class="panel-header"><div><h2>Release gates</h2><p>Evidence required before the prototype can move to alpha.</p></div></div><div class="panel-body"><ul class="gate-list">${gatePayload.rows.map((gate) => `<li><div><strong>${escapeHtml(gate.name)}</strong><p>${escapeHtml(gate.owner)}</p></div>${statusBadge(gate.status)}</li>`).join("")}</ul></div></section>
    </div>
  `;
  const filter = document.getElementById("sourceStatusFilter");
  const renderRows = () => {
    const filtered = filter.value === "All" ? sources : sources.filter((source) => source.status === filter.value);
    document.getElementById("sourceRows").innerHTML = filtered.map(sourceRow).join("");
    document.querySelectorAll(".inspect-source").forEach((button) => button.addEventListener("click", () => openSource(sources.find((source) => source.id === button.dataset.sourceId))));
  };
  filter.addEventListener("change", renderRows);
  renderRows();
}

function openSource(source) {
  if (!source) return;
  openDialog("Source readiness", source.family, `
    <div class="detail-grid">
      <div class="detail-field"><span>Registry ID</span><strong>${escapeHtml(source.id)}</strong></div>
      <div class="detail-field"><span>Status</span><strong>${escapeHtml(formatLabel(source.status))}</strong></div>
      <div class="detail-field"><span>Owner</span><strong>${escapeHtml(source.owner)}</strong></div>
      <div class="detail-field"><span>Freshness</span><strong>${escapeHtml(source.freshness)}</strong></div>
    </div>
    <div class="report-section"><h3>Coverage</h3><p>${escapeHtml(source.coverage)}</p></div>
    <div class="report-section"><h3>Next action</h3><p>${escapeHtml(source.nextAction)}</p></div>
    <div class="report-section"><h3>Repository evidence</h3><span class="source-ref">${escapeHtml(source.evidence)}</span></div>
    <div class="truth-banner"><strong>Activation boundary</strong><span>No source is queried by this MVP. Owner, classification, audience, freshness, citation, fields, and approval must be complete first.</span></div>
  `);
}

function reportList(items) {
  return `<ul class="narrative-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

async function renderReports(token) {
  const report = await api("/api/v1/reports/executive");
  if (token !== state.renderToken) return;
  const exportUrl = `/api/v1/reports/export.csv?${buildQuery()}`;
  elements.content.innerHTML = `
    <div class="report-actions">
      <a class="primary-button" href="${escapeHtml(exportUrl)}">Export CSV</a>
      <button class="secondary-button" id="copyReportButton" type="button">Copy summary</button>
      <button class="secondary-button" id="printReportButton" type="button">Print report</button>
    </div>
    <article class="report-sheet">
      <header class="report-cover">
        <p class="eyebrow">${escapeHtml(report.scopeLabel)} / ${escapeHtml(state.filters.period)}</p>
        <h2>${escapeHtml(report.title)}</h2>
        <p>${escapeHtml(report.headline)}</p>
        <div class="report-meta">${statusBadge("warning", "Synthetic results")}${statusBadge("info", "Deterministic draft")}${statusBadge("warning", "Catalog approval pending")}${statusBadge("warning", "Trend not comparable")}</div>
      </header>
      <div class="summary-strip">${report.metrics.map((item) => `<div><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.displayValue ?? item.value)}</strong></div>`).join("")}</div>
      <div class="report-body">
        <div class="report-main">
          <section class="report-section"><h3>Strengths to preserve</h3>${reportList(report.strengths)}</section>
          <section class="report-section"><h3>Opportunities to review</h3>${reportList(report.opportunities)}</section>
          <section class="report-section"><h3>Interpretation</h3><p class="page-description">Non-green results are inputs to a partner deep dive, not a punitive target. Review item ownership and accountability scope before assigning site action.</p></section>
          <section class="report-section"><h3>Caveats</h3>${reportList(report.caveats)}</section>
        </div>
        <aside class="report-aside">
          <section class="report-section"><h3>Decisions before alpha</h3><ul class="gate-list">${report.decisions.map((decision) => `<li><div><strong>${escapeHtml(decision.name)}</strong><p>${escapeHtml(decision.id)} / ${escapeHtml(decision.owner)}</p></div>${statusBadge(decision.status)}</li>`).join("")}</ul></section>
          <section class="report-section"><h3>Source references</h3>${report.sourceRefs.map((ref) => `<span class="source-ref">${escapeHtml(ref)}</span>`).join("")}</section>
          <section class="report-section"><h3>Report trace</h3><span class="source-ref">Report ${escapeHtml(report.reportId)}</span><span class="source-ref">Generated ${escapeHtml(report.generatedAt)}</span><span class="source-ref">Content ${escapeHtml(report.contentVersion)} / ${escapeHtml(report.contentKey)}</span><span class="source-ref">Data ${escapeHtml(report.dataFingerprint)} / ${escapeHtml(report.dataAsOf)}</span><span class="source-ref">Catalog ${escapeHtml(report.catalogVersion)} / ${escapeHtml(report.catalogAsOf)}</span><span class="source-ref">Contract ${escapeHtml(report.contractVersion)}</span></section>
        </aside>
      </div>
    </article>
  `;
  document.getElementById("printReportButton").addEventListener("click", () => window.print());
  document.getElementById("copyReportButton").addEventListener("click", async () => {
    const text = `${report.title}\n${report.headline}\n\nStrengths\n${report.strengths.join("\n")}\n\nOpportunities\n${report.opportunities.join("\n")}\n\nCaveats\n${report.caveats.join("\n")}`;
    try {
      await navigator.clipboard.writeText(text);
      showToast("Report summary copied.");
    } catch {
      showToast("Clipboard access is unavailable in this browser.");
    }
  });
}

async function renderAudit(token) {
  const payload = await api("/api/v1/audit-events", {}, []);
  if (token !== state.renderToken) return;
  const rows = payload.rows;
  elements.content.innerHTML = `
    <div class="view-intro"><p>This audit trail is memory-only and resets when the local server restarts. It demonstrates the required request envelope without storing user or HR data.</p>${statusBadge("info", "Ephemeral")}</div>
    <section class="workspace-panel">
      <div class="panel-header"><div><h2>Recent API decisions</h2><p>Every route records scope, catalog, latency, response status, and decision.</p></div><button class="secondary-button" id="refreshAuditButton" type="button">Refresh log</button></div>
      <div class="table-wrap" role="region" aria-label="Request audit events. Scroll horizontally to review all columns." tabindex="0"><table><thead><tr><th>Timestamp</th><th>Capability</th><th>Route</th><th>Scope</th><th>Status</th><th class="numeric">Latency</th><th>Request ID</th></tr></thead><tbody>${rows.length ? rows.map((row) => `<tr><td>${escapeHtml(new Date(row.timestamp).toLocaleTimeString())}</td><td>${escapeHtml(row.capabilityId)}</td><td>${escapeHtml(row.route)}</td><td>${escapeHtml(row.filters ? `${row.filters.period} / ${row.filters.region} / ${row.filters.group}${row.filters.site ? ` / ${row.filters.site}` : ""}` : "None")}</td><td>${statusBadge(row.statusCode < 400 ? "success" : "danger", `${row.statusCode} ${formatLabel(row.decision)}`)}</td><td class="numeric">${row.latencyMs} ms</td><td><span class="source-ref">${escapeHtml(row.requestId)}</span></td></tr>`).join("") : `<tr><td colspan="7">No requests have been recorded yet.</td></tr>`}</tbody></table></div>
    </section>
  `;
  document.getElementById("refreshAuditButton").addEventListener("click", renderCurrentView);
}

async function renderCurrentView() {
  const token = ++state.renderToken;
  updateChrome();
  showLoading();
  try {
    if (state.view === "overview") await renderOverview(token);
    else if (state.view === "work-queue") await renderWorkQueue(token);
    else if (state.view === "sites") await renderSites(token);
    else if (state.view === "sources") await renderSources(token);
    else if (state.view === "reports") await renderReports(token);
    else if (state.view === "audit") await renderAudit(token);
    if (token === state.renderToken) {
      elements.content.setAttribute("aria-busy", "false");
      if (!elements.content.querySelector(".empty-state")) announce(`${views[state.view].title} loaded.`);
    }
  } catch (error) {
    if (token === state.renderToken) showError(error);
  }
}

function bindChrome() {
  document.getElementById("primaryNav").addEventListener("click", (event) => {
    const button = event.target.closest("[data-view]");
    if (!button) return;
    state.view = button.dataset.view;
    renderCurrentView();
    document.getElementById("mainContent").focus({ preventScroll: true });
  });
  document.getElementById("refreshButton").addEventListener("click", renderCurrentView);
  document.getElementById("closeDialogButton").addEventListener("click", () => elements.dialog.close());
  elements.dialog.addEventListener("click", (event) => {
    if (event.target === elements.dialog) elements.dialog.close();
  });
  [elements.periodFilter, elements.regionFilter, elements.groupFilter].forEach((control) => {
    control.addEventListener("change", () => {
      state.filters = {
        period: elements.periodFilter.value,
        region: elements.regionFilter.value,
        group: elements.groupFilter.value
      };
      renderCurrentView();
    });
  });
}

async function init() {
  bindChrome();
  try {
    const [meta, filters] = await Promise.all([api("/api/v1/meta", {}, []), api("/api/v1/filters", {}, [])]);
    state.meta = meta;
    state.filterOptions = filters;
    const url = new URL(window.location.href);
    const requestedView = url.searchParams.get("view");
    const requestedPeriod = url.searchParams.get("period");
    const requestedRegion = url.searchParams.get("region");
    const requestedGroup = url.searchParams.get("group");
    state.view = Object.hasOwn(views, requestedView) ? requestedView : "overview";
    state.filters.period = filters.periods.includes(requestedPeriod) ? requestedPeriod : meta.defaultPeriod;
    state.filters.region = filters.regions.includes(requestedRegion) ? requestedRegion : "All";
    state.filters.group = filters.groups.includes(requestedGroup) ? requestedGroup : "All";
    elements.periodFilter.innerHTML = optionList(filters.periods, state.filters.period);
    elements.regionFilter.innerHTML = optionList(filters.regions, state.filters.region);
    elements.groupFilter.innerHTML = optionList(filters.groups, state.filters.group);
    elements.catalogStatus.textContent = `${meta.catalog.taskRows}-row catalog / approval pending`;
    elements.truthBanner.innerHTML = `<strong>Validation data</strong><span>${escapeHtml(meta.disclaimer)} Catalog as of ${escapeHtml(new Date(meta.catalogAsOf).toLocaleDateString())}.</span>`;
    await renderCurrentView();
  } catch (error) {
    showError(error);
  }
}

init();
