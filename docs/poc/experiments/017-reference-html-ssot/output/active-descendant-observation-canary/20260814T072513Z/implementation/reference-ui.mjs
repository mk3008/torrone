#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdtemp, readFile, rm, stat, writeFile, mkdir } from 'node:fs/promises';
import { createServer as createNetServer } from 'node:net';
import { tmpdir } from 'node:os';
import { basename, dirname, extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const CORE_PATH = resolve(HERE, '..', 'core', 'browser-core.js');
const GEOMETRY_TOLERANCE = 4;
const STRUCTURAL_GEOMETRY_TAGS = new Set(['header', 'nav', 'main', 'form', 'table', 'dialog']);
const DEBUG = process.env.REFERENCE_UI_DEBUG === '1';

function debug(message) {
  if (DEBUG) console.error(`[reference-ui] ${message}`);
}

function usage(message) {
  if (message) console.error(message);
  console.error('Usage:');
  console.error('  node reference-ui.mjs snapshot <html-or-directory> --out <json> [--artifacts <directory>]');
  console.error('  node reference-ui.mjs verify <html-or-directory> --baseline <json> --out <json> [--artifacts <directory>] [--scenario-overrides <json>]');
  console.error('  node reference-ui.mjs preflight <html-or-directory> --out <json> [--artifacts <directory>]');
  process.exitCode = 2;
}

function parseArgs(argv) {
  const [command, input, ...rest] = argv;
  const flags = {};
  for (let index = 0; index < rest.length; index += 2) {
    const key = rest[index];
    const value = rest[index + 1];
    if (!key?.startsWith('--') || value === undefined) throw new Error(`Invalid option ${key || ''}`.trim());
    flags[key.slice(2)] = value;
  }
  return { command, input, flags };
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

async function inputDescription(inputPath, rootOverride) {
  const absolute = resolve(inputPath);
  const inputStat = await stat(absolute);
  const entry = inputStat.isDirectory() ? join(absolute, 'index.html') : absolute;
  await stat(entry);
  const root = rootOverride ? resolve(rootOverride) : dirname(entry);
  const resolvedEntry = resolve(entry);
  const resolvedRoot = resolve(root);
  if (resolvedEntry !== resolvedRoot && !resolvedEntry.startsWith(`${resolvedRoot}${sep}`)) {
    throw new Error(`Input ${resolvedEntry} is outside --root ${resolvedRoot}.`);
  }
  const files = [];

  const pending = [entry];
  const seen = new Set();
  const rootPrefix = `${resolve(root)}${sep}`;
  while (pending.length) {
    const full = resolve(pending.shift());
    if (seen.has(full)) continue;
    seen.add(full);
    const content = await readFile(full);
    files.push({ path: relative(root, full).split(sep).join('/'), bytes: content.length, sha256: sha256(content) });

    const extension = extname(full).toLowerCase();
    if (!['.html', '.css', '.js', '.mjs'].includes(extension)) continue;
    const text = content.toString('utf8');
    const references = [];
    const patterns = extension === '.html'
      ? [/(?:src|href)\s*=\s*["']([^"'#?]+)["']/gi]
      : extension === '.css'
        ? [/url\(\s*["']?([^"')#?]+)["']?\s*\)/gi, /@import\s+["']([^"'#?]+)["']/gi]
        : [/(?:from\s+|import\s*)["']([^"'#?]+)["']/gi];
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(text))) references.push(match[1]);
    }
    for (const reference of references) {
      if (/^(?:[a-z]+:|\/\/)/i.test(reference)) continue;
      const dependency = reference.startsWith('/')
        ? resolve(root, `.${reference}`)
        : resolve(dirname(full), reference);
      if (dependency !== resolve(root) && !dependency.startsWith(rootPrefix)) continue;
      try {
        if ((await stat(dependency)).isFile()) pending.push(dependency);
      } catch {
        // The browser/network record reports missing runtime dependencies.
      }
    }
  }
  files.sort((left, right) => left.path.localeCompare(right.path));
  return {
    absolute,
    root,
    entry,
    record: {
      entry: relative(root, entry).split(sep).join('/'),
      digest: sha256(Buffer.from(files.map((file) => `${file.path}:${file.sha256}`).join('\n'))),
      files
    }
  };
}

async function freePort() {
  return new Promise((resolvePort, reject) => {
    const server = createNetServer();
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      server.close(() => resolvePort(address.port));
    });
  });
}

function contentType(path) {
  return {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.woff2': 'font/woff2'
  }[extname(path).toLowerCase()] || 'application/octet-stream';
}

async function startStaticServer(root, entry) {
  const requests = [];
  const server = createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url, 'http://127.0.0.1');
      const decoded = decodeURIComponent(requestUrl.pathname);
      const requested = decoded === '/' ? `/${basename(entry)}` : decoded;
      const fullPath = resolve(root, `.${requested}`);
      const allowedRoot = `${resolve(root)}${sep}`;
      if (fullPath !== resolve(root) && !fullPath.startsWith(allowedRoot)) {
        response.writeHead(403).end('Forbidden');
        return;
      }
      const content = await readFile(fullPath);
      requests.push(requested);
      response.writeHead(200, { 'content-type': contentType(fullPath), 'cache-control': 'no-store' });
      response.end(content);
    } catch {
      response.writeHead(404).end('Not found');
    }
  });

  await new Promise((resolveListen, reject) => {
    server.on('error', reject);
    server.listen(0, '127.0.0.1', resolveListen);
  });
  const address = server.address();
  const entryPath = relative(root, entry).split(sep).join('/');
  return {
    url: `http://127.0.0.1:${address.port}/${entryPath}`,
    requests,
    close: () => new Promise((resolveClose) => server.close(resolveClose))
  };
}

function browserCandidates(explicit) {
  return [
    explicit,
    process.env.REFERENCE_UI_BROWSER,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ].filter(Boolean);
}

async function findBrowser(explicit) {
  for (const candidate of browserCandidates(explicit)) {
    try {
      const candidateStat = await stat(candidate);
      if (candidateStat.isFile()) return candidate;
    } catch {
      // Try the next known browser location.
    }
  }
  throw new Error('No supported local Chrome or Edge executable was found. Set REFERENCE_UI_BROWSER.');
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
}

async function poll(fn, timeoutMs = 10000) {
  const started = Date.now();
  let lastError;
  while (Date.now() - started < timeoutMs) {
    try {
      const value = await fn();
      if (value) return value;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 50));
  }
  throw lastError || new Error('Timed out waiting for browser readiness.');
}

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async open() {
    await new Promise((resolveOpen, reject) => {
      const timer = setTimeout(() => reject(new Error('Timed out opening the DevTools WebSocket.')), 10000);
      const finish = (callback) => (value) => {
        clearTimeout(timer);
        callback(value);
      };
      this.socket.addEventListener('open', finish(resolveOpen), { once: true });
      this.socket.addEventListener('error', finish(reject), { once: true });
    });
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }
      for (const listener of this.listeners.get(message.method) || []) listener(message.params || {});
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolveSend, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`Timed out waiting for DevTools command ${method}`));
      }, 15000);
      this.pending.set(id, {
        resolve: (value) => { clearTimeout(timer); resolveSend(value); },
        reject: (error) => { clearTimeout(timer); reject(error); }
      });
      try {
        this.socket.send(JSON.stringify({ id, method, params }));
      } catch (error) {
        clearTimeout(timer);
        this.pending.delete(id);
        reject(error);
      }
    });
  }

  waitFor(method, timeoutMs = 10000) {
    return new Promise((resolveEvent, reject) => {
      const listeners = this.listeners.get(method) || [];
      const timer = setTimeout(() => {
        this.listeners.set(method, listeners.filter((listener) => listener !== handler));
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeoutMs);
      const handler = (params) => {
        clearTimeout(timer);
        this.listeners.set(method, listeners.filter((listener) => listener !== handler));
        resolveEvent(params);
      };
      listeners.push(handler);
      this.listeners.set(method, listeners);
    });
  }

  close() {
    this.socket.close();
  }
}

async function startBrowser(browserPath, width, height) {
  debug(`launching ${browserPath}`);
  const port = await freePort();
  const profile = await mkdtemp(join(tmpdir(), 'reference-ui-browser-'));
  const child = spawn(browserPath, [
    '--headless=new', '--disable-gpu', '--disable-background-networking',
    '--disable-component-update', '--disable-default-apps', '--disable-extensions',
    '--disable-sync', '--metrics-recording-only', '--mute-audio', '--no-first-run',
    '--no-default-browser-check', `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`, `--window-size=${width},${height}`, 'about:blank'
  ], { stdio: 'ignore', windowsHide: true });
  let cdp;
  const close = async () => {
      cdp?.close();
      child.kill();
      await new Promise((resolveExit) => {
        if (child.exitCode !== null) resolveExit();
        else {
          child.once('exit', resolveExit);
          setTimeout(resolveExit, 1500);
        }
      });
      const safePrefix = `${resolve(tmpdir())}${sep}`;
      const resolvedProfile = resolve(profile);
      if (resolvedProfile.startsWith(safePrefix) && basename(resolvedProfile).startsWith('reference-ui-browser-')) {
        await rm(resolvedProfile, { recursive: true, force: true });
      }
  };

  try {
    const target = await poll(async () => {
      const targets = await fetchJson(`http://127.0.0.1:${port}/json/list`);
      return targets.find((item) => item.type === 'page' && item.webSocketDebuggerUrl);
    });
    debug('DevTools page target discovered');
    const version = await fetchJson(`http://127.0.0.1:${port}/json/version`);
    cdp = new CdpClient(target.webSocketDebuggerUrl);
    await cdp.open();
    debug('DevTools WebSocket opened');
    await Promise.all([
      cdp.send('Page.enable'),
      cdp.send('Runtime.enable'),
      cdp.send('Network.enable'),
      cdp.send('Accessibility.enable')
    ]);
    await cdp.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });

    return { cdp, version: version.Browser || 'unknown', close };
  } catch (error) {
    await close();
    throw error;
  }
}

function runtimeValue(result) {
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || 'Browser evaluation failed.');
  return result.result?.value;
}

async function evaluate(cdp, expression, awaitPromise = false) {
  const result = await cdp.send('Runtime.evaluate', {
    expression,
    awaitPromise,
    returnByValue: true,
    userGesture: true
  });
  return runtimeValue(result);
}

async function navigate(cdp, url, coreSource) {
  debug(`navigating ${url}`);
  const loaded = cdp.waitFor('Page.loadEventFired');
  await cdp.send('Page.navigate', { url });
  await loaded;
  debug('page load event received');
  await evaluate(cdp, '(async () => { if (document.fonts?.ready) await document.fonts.ready; await new Promise(requestAnimationFrame); await new Promise(requestAnimationFrame); return true; })()', true);
  await evaluate(cdp, `${coreSource}\n//# sourceURL=reference-ui-browser-core.js`);
}

function summarizeAx(nodes) {
  const roles = {};
  const unnamedInteractive = {};
  const interactive = new Set(['button', 'link', 'textbox', 'combobox', 'checkbox', 'radio', 'switch', 'menuitem', 'tab']);
  for (const node of nodes) {
    if (node.ignored) continue;
    const role = node.role?.value || 'unknown';
    roles[role] = (roles[role] || 0) + 1;
    if (interactive.has(role) && !(node.name?.value || '').trim()) unnamedInteractive[role] = (unnamedInteractive[role] || 0) + 1;
  }
  return {
    nodeCount: nodes.filter((node) => !node.ignored).length,
    roles: Object.fromEntries(Object.entries(roles).sort(([left], [right]) => left.localeCompare(right))),
    unnamedInteractive: Object.fromEntries(Object.entries(unnamedInteractive).sort(([left], [right]) => left.localeCompare(right)))
  };
}

async function capture(cdp, includeConformance = false) {
  const snapshot = await evaluate(cdp, 'ReferenceUiCore.capture()');
  if (includeConformance) snapshot.conformance = await evaluate(cdp, 'ReferenceUiCore.inspectConformance()');
  const unfilteredAx = await cdp.send('Accessibility.getFullAXTree');
  const excludedHarnessRoots = await evaluate(cdp, `(() => {
    const roots = [...document.querySelectorAll('[data-reference-harness]')];
    globalThis.__referenceUiHarnessVisibility = roots.map((element) => ({
      element,
      hidden: element.hidden,
      hadAriaHidden: element.hasAttribute('aria-hidden'),
      ariaHidden: element.getAttribute('aria-hidden'),
      display: element.style.getPropertyValue('display'),
      displayPriority: element.style.getPropertyPriority('display')
    }));
    roots.forEach((element) => {
      element.hidden = true;
      element.setAttribute('aria-hidden', 'true');
      element.style.setProperty('display', 'none', 'important');
    });
    return roots.length;
  })()`);
  let ax;
  try {
    await evaluate(cdp, 'new Promise((resolve) => requestAnimationFrame(resolve))', true);
    ax = await cdp.send('Accessibility.getFullAXTree');
  } finally {
    await evaluate(cdp, `(() => {
      for (const entry of globalThis.__referenceUiHarnessVisibility || []) {
        entry.element.hidden = entry.hidden;
        if (entry.hadAriaHidden) entry.element.setAttribute('aria-hidden', entry.ariaHidden);
        else entry.element.removeAttribute('aria-hidden');
        if (entry.display) entry.element.style.setProperty('display', entry.display, entry.displayPriority);
        else entry.element.style.removeProperty('display');
      }
      delete globalThis.__referenceUiHarnessVisibility;
      return true;
    })()`);
    await evaluate(cdp, 'new Promise((resolve) => requestAnimationFrame(resolve))', true);
  }
  const unfilteredAxSummary = summarizeAx(unfilteredAx.nodes || []);
  snapshot.accessibilityTree = summarizeAx(ax?.nodes || []);
  snapshot.observationBoundary = {
    ...snapshot.observationBoundary,
    axExcludedHarnessRoots: excludedHarnessRoots,
    axExcludedNodeCount: unfilteredAxSummary.nodeCount - snapshot.accessibilityTree.nodeCount
  };
  return snapshot;
}

async function screenshot(cdp, outputPath) {
  const result = await cdp.send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false });
  await writeFile(outputPath, Buffer.from(result.data, 'base64'));
}

function targetExpression(target) {
  return `ReferenceUiCore.find(${JSON.stringify(String(target))})`;
}

async function targetCenter(cdp, target) {
  return evaluate(cdp, `(() => {
    const element = ${targetExpression(target)};
    if (!element) return { error: 'missing target' };
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) return { error: 'target is not visible' };
    element.scrollIntoView({ block: 'center', inline: 'center' });
    const next = element.getBoundingClientRect();
    return { x: next.left + next.width / 2, y: next.top + next.height / 2 };
  })()`);
}

async function focusTarget(cdp, target) {
  if (!target) return;
  const result = await evaluate(cdp, `(() => {
    const element = ${targetExpression(target)};
    if (!element) return 'missing target';
    element.focus();
    return document.activeElement === element ? null : 'target did not receive focus';
  })()`);
  if (result) throw new Error(`${target}: ${result}`);
}

async function performStep(cdp, step) {
  if (step.action === 'click') {
    const center = await targetCenter(cdp, step.target);
    if (center.error) throw new Error(`${step.target}: ${center.error}`);
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: center.x, y: center.y });
    await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: center.x, y: center.y, button: 'left', clickCount: 1 });
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: center.x, y: center.y, button: 'left', clickCount: 1 });
  } else if (step.action === 'press') {
    await focusTarget(cdp, step.target);
    const key = step.key;
    const codes = { Enter: ['Enter', 13], Escape: ['Escape', 27], Space: ['Space', 32] };
    const [code, virtualKey] = codes[key] || [key, 0];
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: key === 'Space' ? ' ' : key, code, windowsVirtualKeyCode: virtualKey, nativeVirtualKeyCode: virtualKey });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: key === 'Space' ? ' ' : key, code, windowsVirtualKeyCode: virtualKey, nativeVirtualKeyCode: virtualKey });
  } else if (step.action === 'fill') {
    await focusTarget(cdp, step.target);
    await evaluate(cdp, `(() => {
      const element = ${targetExpression(step.target)};
      element.value = ${JSON.stringify(step.value || '')};
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    })()`);
  } else {
    throw new Error(`Unsupported action ${step.action}`);
  }
  await evaluate(cdp, 'new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))', true);
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'state';
}

function validateContract(contract) {
  if (contract.parseError) throw new Error(`Reference scenario JSON is invalid: ${contract.parseError}`);
  if (!Array.isArray(contract.scenarios)) throw new Error('Reference scenarios must be an array.');
  const names = new Set();
  for (const scenario of contract.scenarios) {
    if (!scenario?.name || typeof scenario.name !== 'string') throw new Error('Every Reference scenario needs a string name.');
    if (names.has(scenario.name)) throw new Error(`Duplicate Reference scenario name: ${scenario.name}`);
    names.add(scenario.name);
    if (!Array.isArray(scenario.steps) || scenario.steps.length === 0) throw new Error(`Scenario ${scenario.name} needs at least one step.`);
    for (const step of scenario.steps) {
      if (!['click', 'press', 'fill'].includes(step.action)) throw new Error(`Scenario ${scenario.name} has unsupported action ${step.action}.`);
      if (['click', 'fill'].includes(step.action) && !step.target) throw new Error(`Scenario ${scenario.name} action ${step.action} needs a target.`);
      if (step.action === 'press' && !step.key) throw new Error(`Scenario ${scenario.name} press action needs a key.`);
    }
  }
}

function applyScenarioOverrides(contract, overrideDocument) {
  const adjusted = structuredClone(contract);
  const overrides = overrideDocument?.overrides;
  if (!Array.isArray(overrides)) throw new Error('Scenario override document needs an overrides array.');
  for (const override of overrides) {
    if (!override?.scenario || !Number.isInteger(override.step) || override.step < 1 || typeof override.value !== 'string') {
      throw new Error('Each scenario override needs scenario, one-based step, and string value.');
    }
    const scenario = adjusted.scenarios.find((item) => item.name === override.scenario);
    if (!scenario) throw new Error(`Scenario override names unknown scenario ${override.scenario}.`);
    const step = scenario.steps[override.step - 1];
    if (!step) throw new Error(`Scenario override ${override.scenario} has no step ${override.step}.`);
    if (step.action !== 'fill') throw new Error(`Scenario override ${override.scenario} step ${override.step} is not a fill action.`);
    step.value = override.value;
  }
  return adjusted;
}

async function observe(inputPath, options) {
  debug(`describing ${inputPath}`);
  const description = await inputDescription(inputPath, options.root);
  debug(`serving ${description.entry}`);
  const staticServer = await startStaticServer(description.root, description.entry);
  const browserPath = await findBrowser(options.browser);
  let browser;
  try {
    browser = await startBrowser(browserPath, options.width, options.height);
  } catch (error) {
    await staticServer.close();
    throw error;
  }
  const coreSource = await readFile(CORE_PATH, 'utf8');
  const artifacts = options.artifacts ? resolve(options.artifacts) : null;
  if (artifacts) await mkdir(artifacts, { recursive: true });
  const externalRequests = new Set();
  const failedRequests = [];
  const consoleErrors = [];
  const origin = new URL(staticServer.url).origin;
  const networkListener = (params) => {
    const url = params.request?.url;
    if (url && !url.startsWith(origin) && !url.startsWith('data:') && url !== 'about:blank') externalRequests.add(url);
  };
  const failureListener = (params) => failedRequests.push(params.errorText || 'unknown network failure');
  const normalizeBrowserError = (value) => String(value || 'Unknown browser error').split('\n')[0].replace(/\s+/g, ' ').trim();
  const consoleListener = (params) => {
    if (params.type !== 'error') return;
    const message = (params.args || [])
      .map((argument) => argument.value ?? argument.description ?? argument.unserializableValue ?? '')
      .map(normalizeBrowserError)
      .filter(Boolean)
      .join(' ');
    consoleErrors.push({ kind: 'console.error', message: message || 'Unknown console error' });
  };
  const exceptionListener = (params) => {
    const details = params.exceptionDetails || {};
    consoleErrors.push({ kind: 'uncaught-exception', message: normalizeBrowserError(details.exception?.description || details.text) });
  };
  browser.cdp.listeners.set('Network.requestWillBeSent', [networkListener]);
  browser.cdp.listeners.set('Network.loadingFailed', [failureListener]);
  browser.cdp.listeners.set('Runtime.consoleAPICalled', [consoleListener]);
  browser.cdp.listeners.set('Runtime.exceptionThrown', [exceptionListener]);

  try {
    await navigate(browser.cdp, staticServer.url, coreSource);
    debug('capturing initial state');
    const initial = await capture(browser.cdp, Boolean(options.preflight));
    if (artifacts) await screenshot(browser.cdp, join(artifacts, '00-initial.png'));
    const contract = options.contract || initial.contract;
    validateContract(contract);
    const scenarios = [];

    for (const scenario of contract.scenarios || []) {
      const loadErrorStart = consoleErrors.length;
      await navigate(browser.cdp, staticServer.url, coreSource);
      const loadConsoleErrors = consoleErrors.slice(loadErrorStart);
      const steps = [];
      for (let index = 0; index < scenario.steps.length; index += 1) {
        const step = scenario.steps[index];
        let actionError = null;
        const consoleErrorStart = consoleErrors.length;
        try {
          await performStep(browser.cdp, step);
        } catch (error) {
          actionError = String(error.message || error);
        }
        const state = await capture(browser.cdp, Boolean(options.preflight));
        const imageName = `${slug(scenario.name)}-${String(index + 1).padStart(2, '0')}.png`;
        if (artifacts) await screenshot(browser.cdp, join(artifacts, imageName));
        steps.push({ action: step, actionError, consoleErrors: consoleErrors.slice(consoleErrorStart), screenshot: artifacts ? imageName : null, state });
        if (actionError) break;
      }
      scenarios.push({ name: scenario.name, loadConsoleErrors, steps });
    }

    return {
      schemaVersion: 1,
      source: description.record,
      browser: { name: browser.version, viewport: { width: options.width, height: options.height } },
      network: {
        externalRequests: [...externalRequests].sort(),
        failedRequestCount: failedRequests.length
      },
      console: {
        errorCount: consoleErrors.length,
        errors: consoleErrors
      },
      contract: { version: contract.version || 1, scenarios: contract.scenarios || [] },
      initial,
      scenarios
    };
  } finally {
    await browser.close();
    await staticServer.close();
  }
}

function compareObjects(expected, actual, path, differences) {
  const expectedKeys = Object.keys(expected || {}).sort();
  const actualKeys = Object.keys(actual || {}).sort();
  for (const key of expectedKeys) {
    if (!(key in (actual || {}))) differences.push({ severity: 'error', path: `${path}.${key}`, expected: expected[key], actual: '<missing>' });
    else if (path.endsWith('.attributes') && ['aria-controls', 'aria-describedby'].includes(key)) {
      const expectedHasRelationship = Boolean(expected[key]);
      const actualHasRelationship = Boolean(actual[key]);
      if (expectedHasRelationship !== actualHasRelationship) {
        differences.push({ severity: 'error', path: `${path}.${key}`, expected: expectedHasRelationship ? 'relationship present' : null, actual: actualHasRelationship ? 'relationship present' : null });
      }
    }
    else {
      const expectedValue = expected[key];
      const actualValue = actual[key];
      const same = expectedValue && typeof expectedValue === 'object'
        ? JSON.stringify(expectedValue) === JSON.stringify(actualValue)
        : expectedValue === actualValue;
      if (!same) differences.push({ severity: 'error', path: `${path}.${key}`, expected: expectedValue, actual: actualValue });
    }
  }
  for (const key of actualKeys) {
    if (!(key in (expected || {}))) differences.push({ severity: 'info', path: `${path}.${key}`, expected: '<not present>', actual: actual[key] });
  }
}

function compareState(expected, actual, label) {
  const differences = [];
  if (expected.mode === 'heuristic-semantic') {
    compareObjects(expected.semanticInventory, actual.semanticInventory, `${label}.semanticInventory`, differences);
  }
  const expectedElements = expected.elements || {};
  const actualElements = actual.elements || {};
  for (const key of Object.keys(expectedElements).sort()) {
    const expectedElement = expectedElements[key];
    const actualElement = actualElements[key];
    if (!actualElement) {
      differences.push({ severity: 'error', path: `${label}.elements.${key}`, expected: 'present', actual: 'missing' });
      continue;
    }
    if (expectedElement.tag !== actualElement.tag) differences.push({ severity: 'error', path: `${label}.elements.${key}.tag`, expected: expectedElement.tag, actual: actualElement.tag });
    if (expectedElement.role !== actualElement.role) differences.push({ severity: 'error', path: `${label}.elements.${key}.role`, expected: expectedElement.role, actual: actualElement.role });
    if (expectedElement.visible !== actualElement.visible) differences.push({ severity: 'error', path: `${label}.elements.${key}.visible`, expected: expectedElement.visible, actual: actualElement.visible });
    compareObjects(expectedElement.attributes, actualElement.attributes, `${label}.elements.${key}.attributes`, differences);
    if (expectedElement.relationships) compareObjects(expectedElement.relationships, actualElement.relationships, `${label}.elements.${key}.relationships`, differences);
    compareObjects(expectedElement.styles, actualElement.styles, `${label}.elements.${key}.styles`, differences);
    if (STRUCTURAL_GEOMETRY_TAGS.has(expectedElement.tag)) {
      for (const dimension of ['x', 'y', 'width', 'height']) {
        const delta = Math.abs((expectedElement.box?.[dimension] || 0) - (actualElement.box?.[dimension] || 0));
        if (delta > GEOMETRY_TOLERANCE) {
          differences.push({ severity: 'info', path: `${label}.elements.${key}.box.${dimension}`, expected: expectedElement.box[dimension], actual: actualElement.box[dimension], delta });
        }
      }
    }
  }
  for (const key of Object.keys(actualElements).sort()) {
    if (!expectedElements[key]) differences.push({ severity: 'info', path: `${label}.elements.${key}`, expected: '<not present>', actual: 'extra annotated element' });
  }
  if (expected.document?.activeRef && expected.document.activeRef !== actual.document?.activeRef) {
    differences.push({ severity: 'error', path: `${label}.document.activeRef`, expected: expected.document.activeRef, actual: actual.document?.activeRef || null });
  }
  for (const key of actual.duplicateKeys || []) differences.push({ severity: 'error', path: `${label}.duplicateKeys`, expected: 'unique', actual: key });
  for (const issue of actual.accessibilityIssues || []) differences.push({ severity: 'error', path: `${label}.accessibility.${issue.code}`, expected: 'no issue', actual: `${issue.target}: ${issue.detail}` });
  for (const [role, count] of Object.entries(actual.accessibilityTree?.unnamedInteractive || {})) {
    differences.push({ severity: 'error', path: `${label}.accessibilityTree.unnamedInteractive.${role}`, expected: 0, actual: count });
  }
  return differences;
}

function compareBundles(baseline, actual) {
  const differences = [];
  if (actual.network.externalRequests.length) {
    for (const url of actual.network.externalRequests) differences.push({ severity: 'error', path: 'network.externalRequests', expected: 'none', actual: url });
  }
  if (actual.network.failedRequestCount) {
    differences.push({ severity: 'error', path: 'network.failedRequestCount', expected: 0, actual: actual.network.failedRequestCount });
  }
  for (const error of actual.console?.errors || []) {
    differences.push({ severity: 'error', path: `console.${error.kind}`, expected: 'none', actual: error.message });
  }
  differences.push(...compareState(baseline.initial, actual.initial, 'initial'));
  for (let scenarioIndex = 0; scenarioIndex < baseline.scenarios.length; scenarioIndex += 1) {
    const expectedScenario = baseline.scenarios[scenarioIndex];
    const actualScenario = actual.scenarios[scenarioIndex];
    if (!actualScenario || actualScenario.name !== expectedScenario.name) {
      differences.push({ severity: 'error', path: `scenarios.${expectedScenario.name}`, expected: 'present', actual: actualScenario?.name || 'missing' });
      continue;
    }
    for (let stepIndex = 0; stepIndex < expectedScenario.steps.length; stepIndex += 1) {
      const expectedStep = expectedScenario.steps[stepIndex];
      const actualStep = actualScenario.steps[stepIndex];
      const label = `scenarios.${expectedScenario.name}.step-${stepIndex + 1}`;
      if (!actualStep) {
        differences.push({ severity: 'error', path: label, expected: 'captured state', actual: 'missing' });
        continue;
      }
      if (actualStep.actionError) differences.push({ severity: 'error', path: `${label}.action`, expected: 'success', actual: actualStep.actionError });
      differences.push(...compareState(expectedStep.state, actualStep.state, label));
    }
  }
  const errors = differences.filter((difference) => difference.severity === 'error');
  const diagnostics = differences.filter((difference) => difference.severity === 'info');
  return { status: errors.length ? 'fail' : 'pass', errorCount: errors.length, diagnosticCount: diagnostics.length, differences };
}

function failureSignatures(differences) {
  const counts = new Map();
  for (const difference of differences.filter((item) => item.severity === 'error')) {
    const normalized = difference.path
      .replace(/^initial\./, '')
      .replace(/^scenarios\.[^.]+\.step-\d+\./, '');
    counts.set(normalized, (counts.get(normalized) || 0) + 1);
  }
  return [...counts.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([path, count]) => ({ path, count }));
}

function bundleStates(bundle) {
  return [
    { label: 'initial', state: bundle.initial },
    ...bundle.scenarios.flatMap((scenario) => scenario.steps.map((step, index) => ({
      label: `scenarios.${scenario.name}.step-${index + 1}`,
      state: step.state
    })))
  ];
}

function conformanceReport(bundle) {
  const errors = [];
  const add = (source, code, state, target, detail) => errors.push({ source, code, state, target, detail });
  const states = bundleStates(bundle);

  for (const { label, state } of states) {
    for (const issue of state.accessibilityIssues || []) {
      add('bounded-accessibility', issue.code, label, issue.target, issue.detail);
    }
    for (const key of state.duplicateKeys || []) {
      add('identity', 'duplicate-stable-identity', label, key, 'More than one observed element resolves to the same stable identity.');
    }
    for (const ambiguity of state.semanticAmbiguities || []) {
      add('identity', 'ambiguous-semantic-identity', label, ambiguity.key, `${ambiguity.count} elements resolve to this semantic identity.`);
    }
    for (const [role, count] of Object.entries(state.accessibilityTree?.unnamedInteractive || {})) {
      add('accessibility-tree', 'unnamed-ax-control', label, role, `${count} exposed ${role} control(s) have no accessible name.`);
    }
    for (const issue of state.conformance?.issues || []) {
      add('absolute-dom', issue.code, label, issue.target, issue.detail);
    }
  }

  const initialControls = new Map(
    (bundle.initial.conformance?.facts?.controls || []).map((control) => [control.target, control])
  );
  for (const { label, state } of states.slice(1)) {
    for (const control of state.conformance?.facts?.controls || []) {
      const initial = initialControls.get(control.target);
      if (!initial || initial.ariaInvalidPresent || !control.ariaInvalidPresent || !control.nativeInvalid) continue;
      const invalidValue = String(control.ariaInvalidValue || '').trim().toLowerCase();
      if (invalidValue !== '' && invalidValue !== 'false') continue;
      const initialDescriptions = new Map((initial.describedBy || []).map((description) => [description.id, description]));
      const newlyVisibleDescription = (control.describedBy || []).some((description) => {
        const prior = initialDescriptions.get(description.id);
        return description.exists && description.visible && !(prior?.exists && prior.visible);
      });
      if (newlyVisibleDescription) {
        add(
          'cross-state',
          'contradictory-aria-invalid-state',
          label,
          control.target,
          'The scenario introduced a visible described-by message for a natively invalid control while aria-invalid remained false-equivalent.'
        );
      }
    }
  }

  for (const url of bundle.network.externalRequests || []) {
    add('runtime', 'external-network-request', 'bundle', url, 'Reference execution made an external network request.');
  }
  if (bundle.network.failedRequestCount) {
    add('runtime', 'failed-network-request', 'bundle', 'network', `${bundle.network.failedRequestCount} network request(s) failed.`);
  }
  for (const error of bundle.console.errors || []) {
    add('runtime', 'console-error', 'bundle', error.kind, error.message);
  }
  for (const scenario of bundle.scenarios) {
    for (let index = 0; index < scenario.steps.length; index += 1) {
      const step = scenario.steps[index];
      if (step.actionError) {
        add('runtime', 'scenario-action-error', `scenarios.${scenario.name}.step-${index + 1}`, step.action.target || step.action.action, step.actionError);
      }
    }
  }

  errors.sort((left, right) => [left.source, left.code, left.state, left.target, left.detail]
    .join(':')
    .localeCompare([right.source, right.code, right.state, right.target, right.detail].join(':')));
  const signatures = new Set(errors.map((error) => `${error.source}:${error.code}`));
  return {
    schemaVersion: 1,
    responsibility: 'reference-library-only',
    status: errors.length ? 'error' : 'pass',
    source: bundle.source,
    browser: bundle.browser,
    network: bundle.network,
    console: bundle.console,
    summary: {
      errorCount: errors.length,
      uniqueErrorCount: signatures.size,
      warningCount: 0,
      checkedStateCount: states.length
    },
    errors
  };
}

async function writeJson(path, value) {
  const absolute = resolve(path);
  await mkdir(dirname(absolute), { recursive: true });
  await writeFile(absolute, `${JSON.stringify(value, null, 2)}\n`);
}

async function main() {
  let parsed;
  try {
    parsed = parseArgs(process.argv.slice(2));
  } catch (error) {
    usage(error.message);
    return;
  }
  const { command, input, flags } = parsed;
  if (!['snapshot', 'verify', 'preflight'].includes(command) || !input || !flags.out) {
    usage();
    return;
  }
  if (command === 'verify' && !flags.baseline) {
    usage('verify requires --baseline.');
    return;
  }

  const width = Number(flags.width || 1440);
  const height = Number(flags.height || 900);
  try {
    if (command === 'snapshot') {
      const bundle = await observe(input, { width, height, artifacts: flags.artifacts, browser: flags.browser, root: flags.root });
      await writeJson(flags.out, bundle);
      const issueCount = bundle.initial.accessibilityIssues.length + Object.values(bundle.initial.accessibilityTree.unnamedInteractive).reduce((sum, count) => sum + count, 0);
      console.log(`snapshot: ${Object.keys(bundle.initial.elements).length} elements, ${bundle.scenarios.length} scenarios, ${issueCount} accessibility issues`);
      console.log(`wrote ${resolve(flags.out)}`);
    } else if (command === 'verify') {
      const baseline = JSON.parse(await readFile(resolve(flags.baseline), 'utf8'));
      const contract = flags['scenario-overrides']
        ? applyScenarioOverrides(baseline.contract, JSON.parse(await readFile(resolve(flags['scenario-overrides']), 'utf8')))
        : baseline.contract;
      const actual = await observe(input, { width, height, artifacts: flags.artifacts, browser: flags.browser, root: flags.root, contract });
      const comparison = compareBundles(baseline, actual);
      const signatures = failureSignatures(comparison.differences);
      const report = {
        schemaVersion: 1,
        status: comparison.status,
        baseline: baseline.source,
        actual: actual.source,
        browser: actual.browser,
        contract: actual.contract,
        network: actual.network,
        console: actual.console,
        summary: {
          errorCount: comparison.errorCount,
          uniqueErrorCount: signatures.length,
          diagnosticCount: comparison.diagnosticCount,
          errorSignatures: signatures
        },
        differences: comparison.differences
      };
      await writeJson(flags.out, report);
      console.log(`verify: ${comparison.status} (${comparison.errorCount} errors across ${signatures.length} signatures, ${comparison.diagnosticCount} geometry/extra-element diagnostics)`);
      console.log(`wrote ${resolve(flags.out)}`);
      if (comparison.status !== 'pass') process.exitCode = 1;
    } else {
      const bundle = await observe(input, {
        width,
        height,
        artifacts: flags.artifacts,
        browser: flags.browser,
        root: flags.root,
        preflight: true
      });
      const report = conformanceReport(bundle);
      await writeJson(flags.out, report);
      console.log(`preflight: ${report.status} (${report.summary.errorCount} errors across ${report.summary.uniqueErrorCount} signatures, ${report.summary.checkedStateCount} states)`);
      console.log(`wrote ${resolve(flags.out)}`);
      if (report.status !== 'pass') process.exitCode = 1;
    }
  } catch (error) {
    console.error(error.stack || error.message || String(error));
    process.exitCode = 2;
  }
}

await main();
