#!/usr/bin/env node
/*
 * Browser regression for the contact form, run with local Chrome over CDP
 * (zero dependencies, Node >= 22).
 *
 *   python3 -m http.server 8181        # repo root
 *   PORT=8181 node prototipos/_build/check-contact-form.mjs [--fast]
 *
 * SAFETY: every request to the real receiver is intercepted and answered here.
 * Nothing can reach Apps Script, so no lead or email is ever created. An
 * unexpected request is aborted and fails the run.
 *
 * --fast skips the 20 s no-answer case.
 */
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtempSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

const httpPort = process.env.PORT || '8181';
const debugPort = 9336;
const BASE = `http://127.0.0.1:${httpPort}`;
const CONTACT = `${BASE}/contacto.html`;
const FAST = process.argv.includes('--fast');
const profile = mkdtempSync(join(tmpdir(), 'contact-check-'));
const chrome = spawn(process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new', `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--no-proxy-server'], {stdio: 'ignore'});
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let ws;
let failures = 0;
let passes = 0;

/* What the fake receiver does next: {status, body, type}, 'fail' or 'hold'. */
let scenario = null;
let requests = [];
let violations = [];
const held = [];

const acked = (ref) => JSON.stringify({ok: true, ref});
const GOOGLE_HTML = '<!doctype html><html><head><title>Iniciar sesión: Cuentas de Google</title></head><body>Sign in</body></html>';

async function main() {
  let ready = false;
  for (let i = 0; i < 50 && !ready; i++) {
    try { ready = (await fetch(`http://127.0.0.1:${debugPort}/json/version`)).ok; } catch { /* starting */ }
    if (!ready) await sleep(200);
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
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const next = ++id;
    pending.set(next, {resolve, reject});
    ws.send(JSON.stringify({id: next, method, params}));
  });
  const fulfil = (requestId, status, body, type) => send('Fetch.fulfillRequest', {
    requestId,
    responseCode: status,
    responseHeaders: [
      {name: 'Content-Type', value: type},
      {name: 'Access-Control-Allow-Origin', value: '*'},
    ],
    body: Buffer.from(body).toString('base64'),
  });

  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Fetch.requestPaused') {
      const {requestId, request} = msg.params;
      if (request.url.includes('/assets/js/app.js') && blockApp) {
        send('Fetch.failRequest', {requestId, errorReason: 'BlockedByClient'});
        return;
      }
      if (!/script\.google|googleusercontent/.test(request.url)) {
        send('Fetch.continueRequest', {requestId});
        return;
      }
      let payload = null;
      try { payload = JSON.parse(request.postData || 'null'); } catch { /* not JSON */ }
      requests.push({url: request.url, method: request.method, payload});
      if (!scenario) {
        violations.push(`Unexpected request to the receiver: ${request.method} ${request.url}`);
        send('Fetch.failRequest', {requestId, errorReason: 'BlockedByClient'});
      } else if (scenario === 'fail') {
        send('Fetch.failRequest', {requestId, errorReason: 'ConnectionReset'});
      } else if (scenario === 'hold') {
        held.push(requestId);
      } else {
        const body = typeof scenario.body === 'function' ? scenario.body(payload?.ref) : scenario.body;
        fulfil(requestId, scenario.status, body, scenario.type || 'application/json');
      }
      return;
    }
    if (!pending.has(msg.id)) return;
    const {resolve, reject} = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  });

  const evaluate = async (expression) => {
    const {result, exceptionDetails} = await send('Runtime.evaluate', {expression, awaitPromise: true, returnByValue: true});
    assert(!exceptionDetails, exceptionDetails?.exception?.description || exceptionDetails?.text);
    return result.value;
  };

  let blockApp = false;
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  await send('Network.setBlockedURLs', {urls: ['*fonts.googleapis.com*', '*fonts.gstatic.com*', '*unpkg.com*']});
  await send('Fetch.enable', {patterns: [{urlPattern: '*script.google*'}, {urlPattern: '*googleusercontent*'}, {urlPattern: '*/assets/js/app.js*'}]});

  const viewport = (width, height, mobile) => send('Emulation.setDeviceMetricsOverride',
    {width, height, deviceScaleFactor: 1, mobile});

  async function load(url = CONTACT) {
    scenario = null;
    requests = [];
    held.length = 0;
    await send('Page.navigate', {url});
    for (let i = 0; i < 100; i++) {
      await sleep(50);
      try {
        if (await evaluate(`document.readyState === 'complete'`)) break;
      } catch { /* navigating */ }
    }
    await sleep(80);
  }

  const fill = `(() => {
    const f = document.querySelector('[data-lead-form]');
    const set = (el, v) => { el.value = v; el.dispatchEvent(new Event('input', {bubbles: true})); };
    set(f.elements.telefono, '600 000 000');
    set(f.elements.municipio, 'Cabrils');
    set(f.elements.nombre, 'PRUEBA AUTOMATICA');
    set(f.elements.descripcion, 'Pintar un salón');
    const r = f.querySelector('input[name="trabajo"][value="pintura-vivienda"]');
    r.checked = true;
    r.dispatchEvent(new Event('change', {bubbles: true}));
  })()`;
  const submit = `document.querySelector('[data-lead-form] button[type="submit"]').click()`;
  const state = () => evaluate(`(() => {
    const f = document.querySelector('[data-lead-form]');
    const a = f.querySelector('.form-alert');
    const s = document.querySelector('.form-success');
    const cs = getComputedStyle(a);
    return {
      alertAttr: a.hidden, alertDisplay: cs.display, alertHeight: Math.round(a.getBoundingClientRect().height),
      alertText: a.textContent.trim(), alertClass: a.className,
      success: !s.hidden, successDisplay: getComputedStyle(s).display, formHidden: f.hidden,
      okRef: s.querySelector('.ok-ref').textContent,
      ref: f.elements.ref.value, telefono: f.elements.telefono.value, municipio: f.elements.municipio.value,
      descripcion: f.elements.descripcion.value, origen: f.elements.origen.value,
      submitDisabled: f.querySelector('button[type="submit"]').disabled,
      retry: !!a.querySelector('[data-retry]'),
      focusRetry: document.activeElement === a.querySelector('[data-retry]'),
      fieldErrors: [...f.querySelectorAll('.error')].filter((e) => !e.hidden).map((e) => e.id),
    };
  })()`);
  const settle = async () => { for (let i = 0; i < 60; i++) { await sleep(25); if (!(await evaluate(`document.querySelector('[data-lead-form]').classList.contains('is-sending')`))) return; } };

  async function check(name, fn) {
    violations = [];
    try {
      await fn();
      assert.deepEqual(violations, []);
      passes++;
      console.log(`  ok    ${name}`);
    } catch (err) {
      failures++;
      console.log(`  FAIL  ${name}\n        ${String(err.message).split('\n').slice(0, 4).join(' | ')}`);
    }
  }
  const assertKept = (s) => {
    assert.equal(s.telefono, '600 000 000', 'the phone must stay in the form');
    assert.equal(s.municipio, 'Cabrils', 'the town must stay in the form');
    assert.equal(s.descripcion, 'Pintar un salón', 'the description must stay in the form');
    assert.equal(s.success, false, 'must not claim the request was received');
    assert.equal(s.formHidden, false, 'the form must stay available');
  };
  const assertUnconfirmed = (s) => {
    assertKept(s);
    assert.match(s.alertText, /No hemos podido confirmar/, 'must say the outcome is unknown');
    assert.equal(s.retry, true, 'must offer a retry');
  };

  console.log('Aviso del formulario');
  for (const [label, w, h, m] of [['escritorio', 1440, 900, false], ['móvil', 390, 844, true]]) {
    await check(`oculto y sin ocupar sitio al cargar (${label})`, async () => {
      await viewport(w, h, m);
      await load();
      const s = await state();
      assert.equal(s.alertAttr, true);
      assert.equal(s.alertDisplay, 'none', `computed display is ${s.alertDisplay}`);
      assert.equal(s.alertHeight, 0, `the empty box measures ${s.alertHeight}px`);
    });
  }
  await viewport(1440, 900, false);
  await check('un envío vacío avisa con texto útil, marca los campos y no envía nada', async () => {
    await load();
    await evaluate(submit);
    await sleep(50);
    const s = await state();
    assert.notEqual(s.alertDisplay, 'none');
    assert.match(s.alertText, /Faltan datos/);
    assert.deepEqual(s.fieldErrors.sort(), ['err-municipio', 'err-telefono', 'err-trabajo']);
    assert.equal(requests.length, 0);
  });
  await check('un teléfono inválido se rechaza sin enviar', async () => {
    await load();
    await evaluate(fill);
    await evaluate(`(() => { const t = document.getElementById('f-telefono'); t.value = '12'; t.dispatchEvent(new Event('input', {bubbles: true})); })()`);
    await evaluate(submit);
    await sleep(50);
    const s = await state();
    assert.deepEqual(s.fieldErrors, ['err-telefono']);
    assert.equal(requests.length, 0);
  });
  await check('el aviso sigue mientras falte un campo', async () => {
    await load();
    await evaluate(submit);
    await sleep(30);
    await evaluate(`(() => { const t = document.getElementById('f-telefono'); t.value = '600000000'; t.dispatchEvent(new Event('input', {bubbles: true})); })()`);
    const s = await state();
    assert.notEqual(s.alertDisplay, 'none');
    assert.deepEqual(s.fieldErrors.sort(), ['err-municipio', 'err-trabajo']);
  });
  await check('el aviso se oculta al corregir todos los campos, sin reenviar', async () => {
    await load();
    await evaluate(submit);
    await sleep(30);
    await evaluate(fill);
    await sleep(30);
    const s = await state();
    assert.equal(s.alertDisplay, 'none', `still shows: "${s.alertText}"`);
    assert.equal(s.alertHeight, 0);
    assert.deepEqual(s.fieldErrors, []);
    assert.equal(requests.length, 0);
  });
  await check('no queda una caja vacía mientras se envía', async () => {
    await load();
    await evaluate(fill);
    scenario = 'hold';
    await evaluate(submit);
    await sleep(60);
    const s = await state();
    assert.equal(s.submitDisabled, true);
    assert.equal(s.alertDisplay, 'none', `box of ${s.alertHeight}px while sending`);
    while (held.length) await fulfil(held.pop(), 200, acked(s.ref), 'application/json');
    await settle();
  });

  console.log('Respuestas del receptor');
  await check('{ok:true}: solicitud recibida con su referencia', async () => {
    await load();
    await evaluate(fill);
    scenario = {status: 200, body: acked};
    await evaluate(submit);
    await settle();
    const s = await state();
    assert.equal(s.success, true);
    assert.notEqual(s.successDisplay, 'none');
    assert.equal(s.formHidden, true);
    assert.match(s.okRef, /^BCN-\d{8}-[A-Z2-9]{4}$/);
    assert.equal(requests.length, 1);
    assert.equal(requests[0].payload.telefono, '600 000 000');
    assert.equal(requests[0].payload.ref, s.okRef);
    assert.equal(requests[0].method, 'POST');
  });
  await check('{ok:true, duplicate:true}: un reintento ya registrado también es recepción', async () => {
    await load();
    await evaluate(fill);
    scenario = {status: 200, body: (ref) => JSON.stringify({ok: true, ref, duplicate: true})};
    await evaluate(submit);
    await settle();
    assert.equal((await state()).success, true);
  });
  await check('{ok:false}: error, sin perder lo escrito', async () => {
    await load();
    await evaluate(fill);
    scenario = {status: 200, body: JSON.stringify({ok: false, error: 'x'})};
    await evaluate(submit);
    await settle();
    const s = await state();
    assertKept(s);
    assert.match(s.alertText, /No hemos podido registrar/);
    assert.equal(s.focusRetry, true, 'focus goes to the retry button');
  });
  await check('HTTP 500: error, sin perder lo escrito', async () => {
    await load();
    await evaluate(fill);
    scenario = {status: 500, body: 'boom', type: 'text/plain'};
    await evaluate(submit);
    await settle();
    const s = await state();
    assertKept(s);
    assert.match(s.alertText, /No hemos podido registrar/);
  });
  await check('HTML con 200 (página de Google): NO es solicitud recibida', async () => {
    await load();
    await evaluate(fill);
    scenario = {status: 200, body: GOOGLE_HTML, type: 'text/html'};
    await evaluate(submit);
    await settle();
    assertUnconfirmed(await state());
  });
  await check('respuesta 200 vacía: NO es solicitud recibida', async () => {
    await load();
    await evaluate(fill);
    scenario = {status: 200, body: '', type: 'text/plain'};
    await evaluate(submit);
    await settle();
    assertUnconfirmed(await state());
  });
  await check('JSON sin acuse reconocible: NO es solicitud recibida', async () => {
    await load();
    await evaluate(fill);
    scenario = {status: 200, body: JSON.stringify({message: 'hola'})};
    await evaluate(submit);
    await settle();
    assertUnconfirmed(await state());
  });
  await check('conexión cortada: resultado incierto y reintento con la misma referencia', async () => {
    await load();
    await evaluate(fill);
    scenario = 'fail';
    await evaluate(submit);
    await settle();
    const first = await state();
    assertUnconfirmed(first);
    assert.equal(first.focusRetry, true);
    const ref = requests[0].payload.ref;
    scenario = {status: 200, body: acked};
    await evaluate(`document.querySelector('.form-alert [data-retry]').click()`);
    await settle();
    const second = await state();
    assert.equal(second.success, true);
    assert.equal(requests.length, 2);
    assert.equal(requests[1].payload.ref, ref, 'the retry must reuse the reference');
  });
  if (!FAST) {
    await check('sin respuesta en 20 s: resultado incierto, sin perder lo escrito', async () => {
      await load();
      await evaluate(fill);
      scenario = 'hold';
      await evaluate(submit);
      await sleep(20600);
      assertUnconfirmed(await state());
      held.length = 0;
    });
  }
  await check('la doble pulsación solo envía una vez', async () => {
    await load();
    await evaluate(fill);
    scenario = 'hold';
    await evaluate(`(() => { const b = document.querySelector('[data-lead-form] button[type="submit"]'); b.click(); b.click(); })()`);
    await evaluate(`document.querySelector('[data-lead-form]').requestSubmit()`);
    await sleep(80);
    assert.equal(requests.length, 1, `${requests.length} requests sent`);
    while (held.length) await fulfil(held.pop(), 200, acked(requests[0].payload.ref), 'application/json');
    await settle();
  });

  console.log('Sin JavaScript o si falla');
  await check('sin JavaScript se ofrecen teléfono y WhatsApp, no un formulario que no funciona', async () => {
    await send('Emulation.setScriptExecutionDisabled', {value: true});
    await load();
    const r = await evaluate(`(() => {
      const f = document.querySelector('[data-lead-form]');
      const fallback = document.querySelector('.contact-main noscript');
      return {
        formDisplay: getComputedStyle(f).display,
        fallback: fallback ? fallback.innerHTML : '',
      };
    })()`);
    await send('Emulation.setScriptExecutionDisabled', {value: false});
    assert.equal(r.formDisplay, 'none', 'without JS the form cannot deliver anything');
    assert.match(r.fallback, /tel:\+34639058819/, 'the fallback must link the phone');
    assert.match(r.fallback, /wa\.me\/34631714077/, 'the fallback must link WhatsApp');
    await load();
  });
  await check('si app.js no carga, enviar no deja el teléfono en la URL', async () => {
    blockApp = true;
    await load();
    await evaluate(`(() => {
      const f = document.querySelector('[data-lead-form]');
      f.elements.telefono.value = '600000000';
      f.elements.municipio.value = 'Cabrils';
      f.querySelector('input[name="trabajo"]').checked = true;
    })()`);
    const method = await evaluate(`document.querySelector('[data-lead-form]').method`);
    blockApp = false;
    assert.equal(method.toLowerCase(), 'post', 'a native GET would put the phone in the URL');
    await load();
  });

  console.log('Origen y canales');
  await check('un origen válido se conserva', async () => {
    await load(`${CONTACT}?origen=municipio_pintor-cabrils`);
    assert.equal((await state()).origen, 'municipio_pintor-cabrils');
  });
  for (const bad of ['=HYPERLINK("http://x")', '<img src=x>', 'a'.repeat(200)]) {
    await check(`se rechaza el origen ${JSON.stringify(bad.slice(0, 22))}`, async () => {
      await load(`${CONTACT}?origen=${encodeURIComponent(bad)}`);
      assert.equal((await state()).origen, 'contacto');
    });
  }
  await check('?servicio= preselecciona el trabajo', async () => {
    await load(`${CONTACT}?servicio=microcemento`);
    assert.equal(await evaluate(`document.querySelector('input[name="trabajo"]:checked').value`), 'microcemento');
  });
  await check('teléfono y WhatsApp apuntan a sus canales distintos', async () => {
    await load();
    const r = await evaluate(`({
      tel: [...document.querySelectorAll('a[href^="tel:"]')].map((a) => a.getAttribute('href')),
      wa: [...document.querySelectorAll('a[href*="wa.me"]')].map((a) => new URL(a.href).pathname),
    })`);
    assert(r.tel.length && r.tel.every((h) => h === 'tel:+34639058819'), JSON.stringify(r.tel));
    assert(r.wa.length && r.wa.every((p) => p === '/34631714077'), JSON.stringify(r.wa));
  });
}

try {
  await main();
} catch (err) {
  failures++;
  console.error('Run aborted:', err);
} finally {
  try { ws?.close(); } catch { /* closed */ }
  chrome.kill();
  await sleep(150);
  try { rmSync(profile, {recursive: true, force: true}); } catch { /* still locked */ }
}
console.log(`\n${passes + failures} comprobaciones, ${failures} con problemas`);
process.exit(failures ? 1 : 0);
