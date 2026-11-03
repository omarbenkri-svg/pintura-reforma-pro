#!/usr/bin/env node
/*
 * Runs prototipos/kit-google/apps-script-leads.gs against an in-memory fake of
 * the Apps Script services. Touches no account, sheet or mailbox.
 *
 *   node prototipos/_build/check-apps-script.mjs        # from the repo root
 *
 * It proves the logic only. Whether the script deployed in Google is this one
 * still has to be read from the editor.
 */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const CODE = readFileSync(process.env.GS_FILE || 'prototipos/kit-google/apps-script-leads.gs', 'utf8');

function world({rows = [['timestamp', 'nombre', 'telefono', 'email', 'servicio', 'metros', 'fuente', 'dispositivo', 'utm_source', 'utm_medium', 'utm_campaign', 'pagina', 'estado']], mailFails = false} = {}) {
  const grid = rows.map((r) => [...r]);
  const mails = [];
  const opened = [];
  const sheet = {
    getLastColumn: () => Math.max(...grid.map((r) => r.length), 0),
    getLastRow: () => grid.length,
    getRange: (row, col, numRows = 1, numCols = 1) => ({
      getValues: () => grid.slice(row - 1, row - 1 + numRows).map((r) => {
        const out = [];
        for (let i = 0; i < numCols; i++) out.push(r[col - 1 + i] ?? '');
        return out;
      }),
      setValue: (v) => { grid[row - 1][col - 1] = v; },
    }),
    appendRow: (r) => grid.push(r),
  };
  const context = {
    console: {error() {}},
    Date,
    JSON,
    LockService: {getScriptLock: () => ({waitLock() {}, releaseLock() {}})},
    // No getActive(): the deployed project is standalone, so it would return null.
    SpreadsheetApp: {
      getActive: () => null,
      openById: (id) => { opened.push(id); return {getSheetByName: (n) => (n === 'Form Leads' ? sheet : null)}; },
    },
    MailApp: {sendEmail: (...a) => { if (mailFails) throw new Error('quota'); mails.push(a); }},
    ContentService: {
      MimeType: {JSON: 'json'},
      createTextOutput: (t) => ({setMimeType: () => ({text: t})}),
    },
  };
  vm.createContext(context);
  vm.runInContext(CODE, context);
  const raw = (contents) => JSON.parse(context.doPost({postData: {contents}}).text);
  const post = (data) => raw(JSON.stringify(data));
  const row = (n = grid.length - 1) => Object.fromEntries(grid[0].map((h, i) => [h, grid[n][i]]));
  return {grid, mails, opened, post, raw, row};
}

const LEAD = {
  ref: 'BCN-20261103-TEST', nombre: 'Prueba', telefono: '+34 600 000 000', email: '', municipio: 'Cabrils',
  servicio: 'Pintura de vivienda', descripcion: 'Pintar un salón', inmueble: 'Piso', metros: 'De 50 a 90 m²',
  fecha_deseada: 'Lo antes posible', presupuesto: 'Todavía no lo sé', fuente: 'web_v2_formulario', origen: 'inicio',
  pagina: '/contacto', referrer: 'directo', dispositivo: 'movil', utm_source: '', utm_medium: '', utm_campaign: '',
  timestamp: '2026-11-03T10:00:00.000Z',
};

const cases = {
  'abre la hoja por su ID, porque el proyecto es independiente': () => {
    const w = world();
    assert.equal(w.post(LEAD).ok, true);
    assert.deepEqual(w.opened, ['1IFAssx08QR-smmgj5Jzjr99aFnTCGZTnfH5KDQ0zQIQ']);
  },
  'responde el acuse que entienden la web actual y la anterior': () => {
    const r = world().post(LEAD);
    assert.equal(r.ok, true);
    assert.equal(r.status, 'ok');
    assert.equal(r.ref, LEAD.ref);
  },
  'guarda municipio, descripción, referencia y origen, que el script de mayo pierde': () => {
    const w = world();
    w.post(LEAD);
    const r = w.row();
    assert.equal(r.municipio, 'Cabrils');
    assert.equal(r.descripcion, 'Pintar un salón');
    assert.equal(r.ref, LEAD.ref);
    assert.equal(r.origen, 'inicio');
    assert.equal(r.presupuesto, 'Todavía no lo sé');
  },
  'respeta las columnas que ya existen': () => {
    const w = world();
    w.post(LEAD);
    assert.equal(w.grid[0][2], 'telefono');
    assert.equal(w.grid[1][1], 'Prueba');
    assert.equal(w.grid[0].length, new Set(w.grid[0]).size, 'no duplicated columns');
  },
  'un reintento con la misma referencia no duplica la fila ni el email': () => {
    const w = world();
    w.post(LEAD);
    const r = w.post(LEAD);
    assert.equal(r.duplicate, true);
    assert.equal(r.ok, true);
    assert.equal(w.grid.length, 2);
    assert.equal(w.mails.length, 1);
  },
  'el email incluye municipio y descripción': () => {
    const w = world();
    w.post(LEAD);
    assert.match(w.mails[0][2], /Municipio: Cabrils/);
    assert.match(w.mails[0][2], /Qué quiere renovar: Pintar un salón/);
    assert.match(w.mails[0][1], /en Cabrils/);
  },
  'un texto no se ejecuta como fórmula': () => {
    const w = world();
    w.post({...LEAD, nombre: '=HYPERLINK("http://x")', descripcion: '@SUM(1)'});
    assert.equal(w.row().nombre, `'=HYPERLINK("http://x")`);
    assert.equal(w.row().descripcion, "'@SUM(1)");
  },
  'si el email falla, la solicitud guardada se confirma igualmente': () => {
    const w = world({mailFails: true});
    assert.equal(w.post(LEAD).ok, true);
    assert.equal(w.grid.length, 2);
  },
  'sin teléfono responde error y no guarda nada': () => {
    const w = world();
    const r = w.post({...LEAD, telefono: ''});
    assert.equal(r.ok, false);
    assert.equal(r.status, 'error');
    assert.equal(w.grid.length, 1);
  },
  'un cuerpo que no es JSON responde error': () => {
    const w = world();
    const r = w.raw('<html>no</html>');
    assert.equal(r.ok, false);
    assert.equal(r.status, 'error');
    assert.equal(w.grid.length, 1);
  },
};

let failed = 0;
for (const [name, fn] of Object.entries(cases)) {
  try { fn(); console.log(`  ok    ${name}`); } catch (err) {
    failed++;
    console.log(`  FAIL  ${name}\n        ${String(err.message).split('\n').slice(0, 3).join(' | ')}`);
  }
}
console.log(`\n${Object.keys(cases).length} comprobaciones, ${failed} con problemas`);
process.exit(failed ? 1 : 0);
