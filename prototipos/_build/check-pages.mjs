#!/usr/bin/env node
/*
 * Checks every prototype page at several widths with local Chrome over CDP
 * (zero dependencies, Node >= 22). Also captures the hub thumbnails.
 *
 *   python3 -m http.server 8181        # repo root
 *   node prototipos/_build/check-pages.mjs [--shots]
 *
 * Per page and width: exactly one visible <h1> (opacity 1), no horizontal
 * overflow, no broken images (lazy images forced), no console errors or
 * failed requests, no empty alt on content images, no href="#", no em or en
 * dashes in visible text. Then the same H1 check with JavaScript disabled.
 */
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const PROTO = join(HERE, '..');
const BASE = `http://localhost:${process.env.PORT || 8181}${process.argv.includes('--site') ? '' : '/prototipos'}`;
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9334;
const WIDTHS = [320, 390, 768, 1024, 1440];
const SITE_MODE = process.argv.includes('--site');
const THEMES = SITE_MODE ? ['.'] : ['a-oficio', 'b-estudio', 'c-tecnico'];
const SITE_PAGES = ['index', 'pintura-viviendas', 'microcemento', 'decorativa-estucos', 'alisados-lacados', 'trabajos', 'caso-bano-microcemento', 'caso-fachada', 'caso-carpinteria-madera', 'caso-garaje-comunitario', 'empresa', 'contacto', 'privacidad', 'aviso-legal', '404', ...['cabrils', 'alella', 'el-masnou', 'mataro', 'premia-de-mar', 'vilassar-de-mar', 'montgat', 'badalona'].map((m) => 'municipios/pintor-' + m)].map((p) => p + '.html');
const SHOTS = process.argv.includes('--shots');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function cdpTarget() {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' });
  const { webSocketDebuggerUrl } = await res.json();
  const ws = new WebSocket(webSocketDebuggerUrl);
  await new Promise((ok, ko) => { ws.addEventListener('open', ok, { once: true }); ws.addEventListener('error', ko, { once: true }); });
  let id = 0;
  const pending = new Map();
  const handlers = [];
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { ok, ko } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? ko(new Error(msg.error.message)) : ok(msg.result);
    } else if (msg.method) handlers.forEach((h) => h(msg));
  });
  const send = (method, params = {}) => new Promise((ok, ko) => {
    const n = ++id; pending.set(n, { ok, ko }); ws.send(JSON.stringify({ id: n, method, params }));
  });
  return { ws, send, on: (h) => handlers.push(h) };
}

const PROBE = `(async () => {
  document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
  await Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; })));
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
  const h1s = [...document.querySelectorAll('h1')];
  const text = document.body.innerText;
  return {
    h1Count: h1s.length,
    h1Opacity: h1s[0] ? getComputedStyle(h1s[0]).opacity : null,
    h1Height: h1s[0] ? h1s[0].getBoundingClientRect().height : 0,
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    wide: [...document.querySelectorAll('body *')].filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1
      && !el.closest('.album-strip, .table-scroll, dialog, .sr-only, .skip-link')).slice(0, 3)
      .map((el) => el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0]),
    brokenImgs: [...document.images].filter((i) => i.getAttribute('src') && i.naturalWidth === 0).map((i) => i.getAttribute('src')),
    emptyAlt: [...document.images].filter((i) => !i.closest('dialog') && !(i.getAttribute('alt') || '').trim()).length,
    hashLinks: document.querySelectorAll('a[href="#"]').length,
    dashes: (text.match(/[\\u2013\\u2014]/g) || []).length,
    headingSkips: (() => { const out = []; let prev = 0;
      document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6').forEach((h) => {
        const lvl = +h.tagName[1]; if (prev && lvl > prev + 1) out.push('h' + prev + '>h' + lvl + ' "' + h.textContent.trim().slice(0, 30) + '"'); prev = lvl; });
      return out; })(),
    title: document.title,
    description: (document.querySelector('meta[name=description]') || {}).content || '',
  };
})()`;

async function checkPage(url, width, jsOff = false) {
  const t = await cdpTarget();
  const errors = [];
  t.on((m) => {
    if (m.method === 'Runtime.exceptionThrown') errors.push('exception: ' + m.params.exceptionDetails.text);
    if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') errors.push(m.params.entry.text + ' ' + (m.params.entry.url || ''));
  });
  try {
    await t.send('Page.enable'); await t.send('Runtime.enable'); await t.send('Log.enable');
    await t.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
    if (jsOff) await t.send('Emulation.setScriptExecutionDisabled', { value: true });
    const loaded = new Promise((r) => t.on((m) => { if (m.method === 'Page.loadEventFired') r(); }));
    await t.send('Page.navigate', { url });
    await loaded;
    await sleep(400);
    let r;
    if (jsOff) {
      const { result } = await t.send('Runtime.evaluate', {
        expression: `(() => { const h = document.querySelector('h1'); return { h1Opacity: getComputedStyle(h).opacity, h1Height: h.getBoundingClientRect().height }; })()`,
        returnByValue: true,
      });
      r = result.value;
    } else {
      const { result } = await t.send('Runtime.evaluate', { expression: PROBE, awaitPromise: true, returnByValue: true });
      r = result.value;
    }
    return { ...r, errors };
  } finally { t.ws.close(); }
}

async function screenshot(url, file) {
  const t = await cdpTarget();
  try {
    await t.send('Page.enable');
    await t.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
    const loaded = new Promise((r) => t.on((m) => { if (m.method === 'Page.loadEventFired') r(); }));
    await t.send('Page.navigate', { url });
    await loaded;
    await sleep(1200);
    const { data } = await t.send('Page.captureScreenshot', { format: 'webp', quality: 72, clip: { x: 0, y: 0, width: 1280, height: 800, scale: 0.5 } });
    writeFileSync(file, Buffer.from(data, 'base64'));
  } finally { t.ws.close(); }
}

const profile = mkdtempSync(join(tmpdir(), 'proto-check-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--hide-scrollbars'], { stdio: 'ignore' });
let failures = 0, checks = 0;
const seenTitles = new Set();
try {
  for (let i = 0; i < 50; i++) { try { if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) break; } catch {} await sleep(200); }
  for (const theme of THEMES) {
    const pages = SITE_MODE ? SITE_PAGES : readdirSync(join(PROTO, theme)).filter((f) => f.endsWith('.html')).sort();
    for (const page of pages) {
      const url = SITE_MODE ? `${BASE}/${page}` : `${BASE}/${theme}/${page}`;
      for (const width of WIDTHS) {
        const r = await checkPage(url, width);
        checks++;
        const p = [];
        if (r.h1Count !== 1) p.push(`${r.h1Count} h1`);
        if (parseFloat(r.h1Opacity) < 0.99 || r.h1Height <= 0) p.push(`h1 hidden (${r.h1Opacity})`);
        if (r.overflow > 0) p.push(`overflow ${r.overflow}px ${r.wide.join(' ')}`);
        if (r.brokenImgs.length) p.push(`broken ${r.brokenImgs.join(' ')}`);
        if (r.emptyAlt) p.push(`${r.emptyAlt} empty alt`);
        if (r.hashLinks) p.push(`${r.hashLinks} href=#`);
        if (r.dashes) p.push(`${r.dashes} dashes`);
        if (r.errors.length) p.push(`errors: ${[...new Set(r.errors)].join(' | ')}`);
        if (r.headingSkips.length) p.push(`heading order: ${r.headingSkips.join(', ')}`);
        if (width === 1440) {
          if (seenTitles.has(r.title)) p.push(`duplicate title "${r.title}"`); seenTitles.add(r.title);
          if (!r.description) p.push('no meta description');
        }
        if (p.length) { failures++; console.log(`FAIL ${theme}/${page} @${width}: ${p.join('; ')}`); }
      }
      const off = await checkPage(url, 1280, true);
      checks++;
      if (parseFloat(off.h1Opacity) < 0.99 || off.h1Height <= 0) { failures++; console.log(`FAIL ${theme}/${page} sin JS: h1 hidden`); }
    }
    console.log(`${theme}: ${pages.length} páginas × ${WIDTHS.length} anchos + sin JS revisadas`);
    if (SHOTS) await screenshot(`${BASE}/${theme}/index.html`, join(PROTO, 'shared', 'img', `preview-${theme}.webp`));
  }
} finally {
  chrome.kill(); await sleep(300); rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
}
console.log(`\n${checks} comprobaciones, ${failures} con problemas`);
process.exit(failures ? 1 : 0);
