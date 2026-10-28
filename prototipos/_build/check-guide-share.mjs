#!/usr/bin/env node
/* Browser regression for shared guide selections. Run with a local HTTP server. */
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtempSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

const httpPort = process.env.PORT || '8181';
const debugPort = 9335;
const profile = mkdtempSync(join(tmpdir(), 'guide-check-'));
const chrome = spawn(process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new', `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--no-proxy-server',
    '--host-resolver-rules=MAP bcnproreforma.test 127.0.0.1'], {stdio: 'ignore'});
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let ws;
try {
  let ready = false;
  for (let i = 0; i < 50; i++) {
    try { ready = (await fetch(`http://127.0.0.1:${debugPort}/json/version`)).ok; } catch { /* starting */ }
    if (ready) break;
    await sleep(200);
  }
  assert(ready, 'Chrome did not start');
  const target = await (await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, {method: 'PUT'})).json();
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, {once: true});
    ws.addEventListener('error', reject, {once: true});
  });
  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (!pending.has(msg.id)) return;
    const {resolve, reject} = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const next = ++id;
    pending.set(next, {resolve, reject});
    ws.send(JSON.stringify({id: next, method, params}));
  });
  const evaluate = async (expression) => {
    const {result, exceptionDetails} = await send('Runtime.evaluate', {expression, awaitPromise: true, returnByValue: true});
    assert(!exceptionDetails, exceptionDetails?.text);
    return result.value;
  };
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', {url: `http://bcnproreforma.test:${httpPort}/guia-acabados.html?espacio=pared&busco=textura&origen=compartida`});
  await sleep(1000);
  const initial = await evaluate(`(() => ({
    title: document.getElementById('guide-title').textContent,
    resultHidden: document.getElementById('guide-result').hidden,
    shareHidden: document.getElementById('guide-share').hidden,
    contact: document.getElementById('guide-contact').getAttribute('href')
  }))()`);
  assert.match(initial.title, /Estuco/);
  assert.equal(initial.resultHidden, false);
  assert.equal(initial.shareHidden, false);
  assert.match(initial.contact, /servicio=decorativa&origen=guia_compartida/);

  const shared = await evaluate(`(async () => {
    navigator.share = async (data) => { window.__shared = data; };
    document.getElementById('guide-share').click();
    await new Promise(r => setTimeout(r, 50));
    return window.__shared;
  })()`);
  assert.equal(new URL(shared.url).searchParams.get('origen'), 'compartida');
  assert.equal(new URL(shared.url).searchParams.get('espacio'), 'pared');
  assert.equal(new URL(shared.url).searchParams.get('busco'), 'textura');

  const changed = await evaluate(`(() => {
    const space = document.getElementById('guide-space');
    const goal = document.getElementById('guide-goal');
    space.value = 'bano'; goal.value = 'continuidad';
    goal.dispatchEvent(new Event('change', {bubbles:true}));
    return {title: document.getElementById('guide-title').textContent,
      contact: document.getElementById('guide-contact').getAttribute('href'),
      search: location.search};
  })()`);
  assert.match(changed.title, /Continuidad/);
  assert.match(changed.contact, /servicio=microcemento&origen=guia_compartida/);
  assert.equal(new URLSearchParams(changed.search).get('origen'), 'compartida');
  await send('Page.navigate', {url: `http://bcnproreforma.test:${httpPort}/contacto.html?servicio=microcemento&origen=guia_compartida`});
  await sleep(600);
  const contact = await evaluate(`(() => ({
    selected: document.querySelector('input[name="trabajo"]:checked')?.value,
    origin: document.querySelector('[name="origen"]')?.value
  }))()`);
  assert.equal(contact.selected, 'microcemento');
  assert.equal(contact.origin, 'guia_compartida');
  await send('Page.navigate', {url: `http://bcnproreforma.test:${httpPort}/guia-acabados.html?espacio=suelo&busco=continuidad&canal=instagram`});
  await sleep(600);
  const campaign = await evaluate(`(() => ({
    contact: document.getElementById('guide-contact').getAttribute('href'),
    closing: document.querySelector('.guide-close a').getAttribute('href'),
    title: document.getElementById('guide-title').textContent
  }))()`);
  assert.match(campaign.title, /revestimiento continuo/);
  assert.match(campaign.contact, /origen=guia_instagram/);
  assert.match(campaign.closing, /origen=guia_instagram/);
  console.log('PASS: shared selection, native share URL, updated result, referred contact and campaign origin');
} finally {
  ws?.close();
  chrome.kill();
  await sleep(250);
  rmSync(profile, {recursive: true, force: true, maxRetries: 10, retryDelay: 200});
}
