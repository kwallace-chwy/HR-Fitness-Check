"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const { once } = require("node:events");
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const { createServer } = require("../server");

const desktopViewport = { width: 1440, height: 900 };
const edgePaths = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  process.env.LOCALAPPDATA ? `${process.env.LOCALAPPDATA}\\Microsoft\\Edge\\Application\\msedge.exe` : null
].filter(Boolean);

const views = [
  { name: "Overview", id: "overview", title: "Network overview", scoped: true },
  { name: "Work queue", id: "work-queue", title: "Standard Work queue", scoped: false },
  { name: "Site review", id: "sites", title: "Site attention view", scoped: true },
  { name: "Data readiness", id: "sources", title: "Source and release readiness", scoped: false },
  { name: "Reports", id: "reports", title: "Executive review draft", scoped: true },
  { name: "Audit", id: "audit", title: "Request audit", scoped: false }
];

let server;
let baseUrl;
let browser;

async function launchRegressionBrowser() {
  const executablePath = process.env.HRFC_E2E_EXECUTABLE || process.env.PLAYWRIGHT_EXECUTABLE_PATH;
  const channel = process.env.HRFC_E2E_CHANNEL || process.env.PLAYWRIGHT_CHANNEL;
  if (executablePath) {
    return { browser: await chromium.launch({ executablePath, headless: true }), label: executablePath };
  }
  if (channel) {
    return { browser: await chromium.launch({ channel, headless: true }), label: `channel:${channel}` };
  }

  if (process.platform === "win32") {
    try {
      return { browser: await chromium.launch({ channel: "msedge", headless: true }), label: "channel:msedge" };
    } catch (channelError) {
      for (const candidate of edgePaths) {
        if (fs.existsSync(candidate)) {
          return { browser: await chromium.launch({ executablePath: candidate, headless: true }), label: candidate };
        }
      }
      try {
        return { browser: await chromium.launch({ headless: true }), label: "bundled Chromium" };
      } catch (bundledError) {
        throw new AggregateError([channelError, bundledError], "No usable Edge or Chromium executable was found.");
      }
    }
  }

  return { browser: await chromium.launch({ headless: true }), label: "bundled Chromium" };
}

async function openPage(t, viewport = desktopViewport) {
  const context = await browser.newContext({
    acceptDownloads: true,
    colorScheme: "light",
    locale: "en-US",
    reducedMotion: "reduce",
    viewport
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().startsWith("Failed to load resource:")) {
      errors.push(`console: ${message.text()}`);
    }
  });
  t.after(() => context.close());
  return { page, errors };
}

async function gotoView(page, view, query = "") {
  await page.goto(`${baseUrl}/?view=${view.id}${query}`, { waitUntil: "domcontentloaded" });
  await page.getByRole("heading", { level: 1, name: view.title }).waitFor();
  await page.locator('#appContent[aria-busy="false"]').waitFor();
}

async function readStream(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
}

async function assertUniqueAccessibleNames(page, selector, prefix) {
  const names = await page.locator(selector).evaluateAll((nodes) => nodes.map((node) => node.getAttribute("aria-label")));
  assert.ok(names.length > 0, `${selector} should render at least one action.`);
  assert.equal(names.every((name) => name && name.startsWith(prefix)), true, `${selector} actions need contextual names.`);
  assert.equal(new Set(names).size, names.length, `${selector} accessible names must be unique.`);
}

function seriousAxeViolations(results) {
  return results.violations
    .filter((violation) => ["serious", "critical"].includes(violation.impact))
    .map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      targets: violation.nodes.map((node) => node.target.join(" ")).slice(0, 5)
    }));
}

test.before(async () => {
  server = createServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  baseUrl = `http://127.0.0.1:${server.address().port}`;
  const launched = await launchRegressionBrowser();
  browser = launched.browser;
  process.stdout.write(`# E2E browser: ${launched.label}\n`);
});

test.after(async () => {
  await browser?.close();
  if (server?.listening) {
    server.close();
    await once(server, "close");
  }
});

test("six views preserve navigation, focus, scope visibility, and recover from an API failure", { timeout: 30000 }, async (t) => {
  const { page, errors } = await openPage(t);
  await gotoView(page, views[0]);

  for (const view of [...views.slice(1), views[0]]) {
    const navButton = page.getByRole("button", { name: view.name, exact: true });
    await navButton.click();
    await page.getByRole("heading", { level: 1, name: view.title }).waitFor();
    await page.locator('#appContent[aria-busy="false"]').waitFor();
    assert.equal(new URL(page.url()).searchParams.get("view"), view.id);
    assert.equal(await navButton.getAttribute("aria-current"), "page");
    assert.equal(await page.evaluate(() => document.activeElement?.id), "mainContent");
    assert.equal(await page.locator("#globalFilterBar").isVisible(), view.scoped);
  }

  const failingRoute = "**/api/v1/summary*";
  await page.route(failingRoute, (route) => route.fulfill({
    status: 503,
    contentType: "application/json",
    body: JSON.stringify({ message: "Synthetic outage for regression test." })
  }));
  await page.getByRole("button", { name: "Refresh", exact: true }).click();
  await page.getByRole("heading", { level: 2, name: "Unable to load this view" }).waitFor();
  assert.match(await page.locator("#appContent").innerText(), /Synthetic outage for regression test/);
  await page.unroute(failingRoute);
  await page.getByRole("button", { name: "Try again", exact: true }).click();
  await page.getByRole("region", { name: "Assessment summary metrics" }).waitFor();

  await gotoView(page, views[0], "&region=Rx&group=1G");
  await page.getByRole("heading", { level: 2, name: "No results in this scope" }).waitFor();
  assert.equal(await page.locator("#viewStatus").innerText(), "Network overview has no results in this scope.");
  assert.deepEqual(errors, []);
});

test("filtered executive report and CSV export reconcile to the same scope", { timeout: 30000 }, async (t) => {
  const { page, errors } = await openPage(t);
  const query = "&period=2026+Q3&region=West&group=1G";
  await gotoView(page, views.find((view) => view.id === "reports"), query);

  const response = await fetch(`${baseUrl}/api/v1/reports/executive?period=2026+Q3&region=West&group=1G`);
  assert.equal(response.status, 200);
  const report = await response.json();
  const displayedMetrics = await page.locator(".report-sheet .summary-strip > div").evaluateAll((nodes) => Object.fromEntries(nodes.map((node) => [
    node.querySelector("span")?.textContent.trim(),
    node.querySelector("strong")?.textContent.trim()
  ])));
  for (const metric of report.metrics) {
    assert.equal(displayedMetrics[metric.label], String(metric.displayValue ?? metric.value));
  }
  assert.match(await page.locator(".report-cover").innerText(), new RegExp(report.scopeLabel));

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Export CSV", exact: true }).click();
  const download = await downloadPromise;
  assert.equal(download.suggestedFilename(), "hr-fitness-check-2026-q3.csv");
  const csv = await readStream(await download.createReadStream());
  const rows = csv.trim().split(/\r?\n/);
  const siteCount = Number(report.metrics.find((metric) => metric.label === "Sites in scope").value);
  assert.equal(rows.length, siteCount + 1);
  assert.match(rows[0], /green_share,green_numerator,rated_denominator,evidence_coverage/);
  assert.equal(rows.slice(1).every((row) => row.includes(",1G,West,")), true);
  assert.deepEqual(errors, []);
});

test("row actions have contextual names and dialogs restore focus", { timeout: 30000 }, async (t) => {
  const { page, errors } = await openPage(t);
  await gotoView(page, views.find((view) => view.id === "work-queue"));
  await assertUniqueAccessibleNames(page, ".inspect-catalog", "Inspect ");

  const catalogTrigger = page.getByRole("button", { name: "Inspect TM Experience Walk", exact: true });
  await catalogTrigger.click();
  await page.getByRole("heading", { level: 2, name: "TM Experience Walk" }).waitFor();
  await page.getByRole("button", { name: "Close detail", exact: true }).click();
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("aria-label")), "Inspect TM Experience Walk");

  await gotoView(page, views.find((view) => view.id === "sites"));
  await assertUniqueAccessibleNames(page, ".review-site", "Review synthetic site ");
  const siteTrigger = page.getByRole("button", { name: "Review synthetic site AVP1", exact: true });
  await siteTrigger.click();
  const itemRegion = page.getByRole("region", { name: "Item results. Scroll horizontally to review all columns." });
  await itemRegion.waitFor();
  assert.equal(await itemRegion.getAttribute("tabindex"), "0");
  await page.keyboard.press("Escape");
  await page.locator("#detailDialog").waitFor({ state: "hidden" });
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("aria-label")), "Review synthetic site AVP1");

  await gotoView(page, views.find((view) => view.id === "sources"));
  await assertUniqueAccessibleNames(page, ".inspect-source", "Inspect source ");
  assert.deepEqual(errors, []);
});

test("320px layout contains page overflow and makes wide data regions keyboard-scrollable", { timeout: 30000 }, async (t) => {
  const { page, errors } = await openPage(t, { width: 320, height: 844 });
  await gotoView(page, views.find((view) => view.id === "sites"));
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);

  await page.getByRole("button", { name: "Review synthetic site AVP1", exact: true }).click();
  const itemRegion = page.getByRole("region", { name: "Item results. Scroll horizontally to review all columns." });
  await itemRegion.waitFor();
  const geometry = await itemRegion.evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
    tabIndex: element.tabIndex
  }));
  assert.ok(geometry.scrollWidth > geometry.clientWidth);
  assert.equal(geometry.tabIndex, 0);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true);

  await itemRegion.focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(100);
  assert.ok(await itemRegion.evaluate((element) => element.scrollLeft) > 0);
  const closeSize = await page.getByRole("button", { name: "Close detail", exact: true }).boundingBox();
  assert.ok(closeSize && closeSize.width >= 44 && closeSize.height >= 44);

  await gotoView(page, views.find((view) => view.id === "audit"));
  const auditRegion = page.getByRole("region", { name: "Request audit events. Scroll horizontally to review all columns." });
  const auditGeometry = await auditRegion.evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
    tabIndex: element.tabIndex
  }));
  assert.ok(auditGeometry.scrollWidth > auditGeometry.clientWidth);
  assert.equal(auditGeometry.tabIndex, 0);
  await auditRegion.focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(100);
  assert.ok(await auditRegion.evaluate((element) => element.scrollLeft) > 0);
  const auditAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  assert.deepEqual(seriousAxeViolations(auditAxe), [], "Mobile Audit has blocking axe violations.");

  await gotoView(page, views.find((view) => view.id === "overview"));
  await page.getByText("View chart data", { exact: true }).click();
  const trendRegion = page.getByRole("region", { name: "Quarterly trend data. Scroll horizontally to review all columns." });
  const trendGeometry = await trendRegion.evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
    tabIndex: element.tabIndex
  }));
  assert.ok(trendGeometry.scrollWidth > trendGeometry.clientWidth);
  assert.equal(trendGeometry.tabIndex, 0);
  await trendRegion.focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(100);
  assert.ok(await trendRegion.evaluate((element) => element.scrollLeft) > 0);
  const trendAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  assert.deepEqual(seriousAxeViolations(trendAxe), [], "Expanded mobile trend data has blocking axe violations.");

  await gotoView(page, views.find((view) => view.id === "work-queue"));
  await page.locator("#queueSearch").fill("no fixture row matches this value");
  const queueRegion = page.getByRole("region", { name: "Standard Work catalog. Scroll horizontally to review all columns." });
  assert.equal(await page.locator("#queueRows .inspect-catalog").count(), 0);
  assert.match(await page.locator("#queueRows").innerText(), /No catalog items match/i);
  assert.equal(await queueRegion.getAttribute("tabindex"), "0");
  await queueRegion.focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(100);
  assert.ok(await queueRegion.evaluate((element) => element.scrollLeft) > 0);
  const emptyQueueAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  assert.deepEqual(seriousAxeViolations(emptyQueueAxe), [], "Empty mobile Work queue has blocking axe violations.");
  assert.deepEqual(errors, []);
});

test("high-value views and the site dialog have no serious or critical axe violations", { timeout: 60000 }, async (t) => {
  const { page, errors } = await openPage(t);
  for (const view of views) {
    await gotoView(page, view);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    assert.deepEqual(seriousAxeViolations(results), [], `${view.name} has blocking axe violations.`);
  }

  await gotoView(page, views.find((view) => view.id === "sites"));
  await page.getByRole("button", { name: "Review synthetic site AVP1", exact: true }).click();
  await page.getByRole("region", { name: "Item results. Scroll horizontally to review all columns." }).waitFor();
  const dialogResults = await new AxeBuilder({ page })
    .include("#detailDialog")
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  assert.deepEqual(seriousAxeViolations(dialogResults), [], "Site dialog has blocking axe violations.");
  assert.deepEqual(errors, []);
});
