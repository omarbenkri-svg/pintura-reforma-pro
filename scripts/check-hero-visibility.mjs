#!/usr/bin/env node
/*
 * Regression check: the homepage hero H1 must be visible (opacity 1) in every
 * scenario — JS enabled, prefers-reduced-motion, and JS disabled.
 *
 * Zero dependencies: drives a local Chrome over the DevTools Protocol using
 * Node's built-in WebSocket (Node >= 22).
 *
 * Usage:
 *   python3 -m http.server 8181            # in the repo root
 *   node scripts/check-hero-visibility.mjs [url]
 *
 * Env: CHROME_PATH overrides the Chrome binary location.
 */
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const URL_TO_CHECK = process.argv[2] || 'http://localhost:8181/';
const CHROME = process.env.CHROME_PATH
  || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9333;
const SETTLE_MS = 2500; // longer than any hero animation + the 120ms split-text timer

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForDebugger() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return;
    } catch { /* not up yet */ }
    await sleep(200);
  }
  throw new Error('Chrome DevTools endpoint did not come up');
}

async function openTarget() {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' });
  const { webSocketDebuggerUrl } = await res.json();
  const ws = new WebSocket(webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });
  let nextId = 0;
  const pending = new Map();
  const listeners = new Map();
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method && listeners.has(msg.method)) {
      listeners.get(msg.method)(msg.params);
    }
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
  const once = (method) => new Promise((resolve) => listeners.set(method, resolve));
  return { ws, send, once };
}

const PROBE = `(() => {
  const h = document.querySelector('.hero h1') || document.querySelector('h1');
  if (!h) return { found: false };
  const r = h.getBoundingClientRect();
  return {
    found: true,
    opacity: getComputedStyle(h).opacity,
    text: h.textContent.trim(),
    charSpans: h.querySelectorAll('.char').length,
    height: r.height,
  };
})()`;

async function runScenario(name, setup) {
  const { ws, send, once } = await openTarget();
  try {
    await send('Page.enable');
    await send('Runtime.enable');
    await setup(send);
    const loaded = once('Page.loadEventFired');
    await send('Page.navigate', { url: URL_TO_CHECK });
    await loaded;
    await sleep(SETTLE_MS);
    const { result } = await send('Runtime.evaluate', { expression: PROBE, returnByValue: true });
    return { name, ...result.value };
  } finally {
    ws.close();
  }
}

const scenarios = [
  ['JS enabled', async () => {}],
  ['prefers-reduced-motion', async (send) => {
    await send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
    });
  }],
  ['JS disabled', async (send) => {
    await send('Emulation.setScriptExecutionDisabled', { value: true });
  }],
];

const profile = mkdtempSync(join(tmpdir(), 'hero-check-'));
const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--window-size=1366,900',
], { stdio: 'ignore' });

let failed = false;
try {
  await waitForDebugger();
  for (const [name, setup] of scenarios) {
    const r = await runScenario(name, setup);
    const problems = [];
    if (!r.found) problems.push('no <h1> found');
    else {
      if (parseFloat(r.opacity) < 0.99) problems.push(`opacity ${r.opacity}`);
      if (!r.text) problems.push('empty text');
      if (r.height <= 0) problems.push('zero height');
      if (r.charSpans > 0) problems.push(`${r.charSpans} per-letter spans (screen readers read letters)`);
    }
    failed ||= problems.length > 0;
    console.log(`${problems.length ? 'FAIL' : 'PASS'}  ${name.padEnd(24)} opacity=${r.opacity}  "${(r.text || '').slice(0, 60)}"${problems.length ? '  → ' + problems.join(', ') : ''}`);
  }
} catch (err) {
  failed = true;
  console.error('ERROR', err.message);
} finally {
  chrome.kill();
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
}

process.exit(failed ? 1 : 0);
