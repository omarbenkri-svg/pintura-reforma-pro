#!/usr/bin/env node
/*
 * Release gate for what the public site says. Static, zero dependencies.
 *
 *   node prototipos/_build/check-public-copy.mjs        # from the repo root
 *
 * Reads the files that would really be deployed (honours .vercelignore for
 * exact paths) and fails if internal notes, gap messages, unverified claims or
 * private details reappear. A claim can come back once it is proven: remove its
 * rule in the same commit that records the evidence.
 */
import {createHash} from 'node:crypto';
import {existsSync, readdirSync, readFileSync} from 'node:fs';
import {join} from 'node:path';

const ROOT = process.cwd();
const ignore = new Set(readFileSync(join(ROOT, '.vercelignore'), 'utf8').split('\n')
  .map((l) => l.trim().replace(/^\//, '')).filter((l) => l && !l.startsWith('#')));
const list = (dir) => readdirSync(join(ROOT, dir)).filter((f) => f.endsWith('.html')).map((f) => (dir === '.' ? f : `${dir}/${f}`));
const pages = [...list('.'), ...list('blog'), ...list('municipios')].filter((p) => !ignore.has(p));
const extras = ['llms.txt', 'site.webmanifest'];

const decode = (s) => s
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'");

function readable(html) {
  const meta = [...html.matchAll(/<meta[^>]+content="([^"]*)"/g)].map((m) => m[1]);
  const ld = [...html.matchAll(/application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1]);
  const alts = [...html.matchAll(/\balt="([^"]*)"/g)].map((m) => m[1]);
  const body = html.replace(/<(script|style)\b[^>]*>.*?<\/\1>/gs, ' ').replace(/<[^>]+>/g, ' ');
  return decode([body, ...meta, ...alts, ...ld].join(' ')).replace(/\s+/g, ' ');
}

const BANNED = [
  // Internal notes and placeholders
  [/antes de publicar/i, 'nota interna'],
  [/borrador para revisar|no es un texto legal definitivo/i, 'borrador publicado'],
  [/este prototipo/i, 'texto de prototipo'],
  [/\[(MUNICIPIO|SLUG)\]/, 'plantilla sin rellenar'],
  [/plazo de conservaci[oó]n/i, 'marcador legal sin rellenar'],
  // Messages that point at what is missing
  [/todav[ií]a no hemos/i, 'señala una carencia'],
  [/\bno publicad[oa]s?\b/i, 'señala una carencia'],
  [/dato facilitado|fecha facilitada/i, 'coletilla que resta confianza'],
  [/pendientes? de (indicar|confirmar)/i, 'dato pendiente visible'],
  // Claims nobody has proven (see prototipos/docs/2026-11-validacion-mohamed.md)
  [/\b1994\b/, 'año sin justificante'],
  [/gratis|gratuit[oa]s?|sin compromiso/i, 'promesa sin validar'],
  [/\ben (24|48) ?(h|horas)\b/i, 'plazo sin validar'],
  [/garantizad[oa]s?|garant[ií]a de (calidad|oficio)|cumplimiento estricto/i, 'garantía sin validar'],
  [/\d+ a[nñ]os de (oficio|experiencia|trayectoria)|m[aá]s de \d+ (a[nñ]os|proyectos)/i, 'antigüedad o volumen sin validar'],
  [/de referencia en|resultado eterno|mejor precio|consejos de expertos|gu[ií]a de expertos/i, 'superlativo sin prueba'],
  [/sin subcontrat|equipo propio/i, 'compromiso sin validar'],
  [/precio cerrado|presupuesto cerrado|presupuesto firmado|precio firmado|sin sorpresas/i, 'compromiso sin validar'],
  [/\d+ ?% a la firma/i, 'condición de pago sin validar'],
  [/precios reales|ejemplo real/i, 'cifra presentada como real sin validar'],
  [/costa brava/i, 'cobertura no declarada'],
  [/sant gervasi|sarri[aà]|pedralbes/i, 'especialización de zona sin validar'],
  // Reviews withdrawn on 2026-11-03: they come back only with proof
  [/4,9 de 5|con 23 rese|rese[nñ]a en google|marta g[oó]mez|jordi c\.|roberto s\.|elena m\./i, 'reseñas retiradas'],
  // Identity
  [/\bOmar\b/, 'Omar no aparece en la web pública'],
  [/BCN Pro Reforma/, 'la marca es BCN ProReforma'],
  // Typographic leftovers from a removed value
  [/\. \.(?!\.)/, 'punto suelto de un dato retirado'],
];

const problems = [];
const add = (file, why) => problems.push(`${file}: ${why}`);

for (const file of pages) {
  const html = readFileSync(join(ROOT, file), 'utf8');
  const text = readable(html);
  for (const [rx, why] of BANNED) {
    const m = text.match(rx);
    if (m) add(file, `${why}: «${text.slice(Math.max(0, m.index - 30), m.index + m[0].length + 30).trim()}»`);
  }
  if (/<dd>\s*<\/dd>/.test(html)) add(file, 'dato vacío en una lista');
  if (/<p class="(hours|muni)"[^>]*>\s*<\/p>/.test(html)) add(file, 'párrafo vacío');
  if (/class="svc-photo-row">\s*<\/div>/.test(html)) add(file, 'galería vacía');
  if (/openingHoursSpecification/.test(html)) add(file, 'JSON-LD con horario sin confirmar');
  if (/aggregateRating/.test(html)) add(file, 'JSON-LD con valoración');
  if (/rehabilitacion-fachada-mataro|restauracion-madera-exterior-02/.test(html)) {
    add(file, 'enlaza una foto con número de vivienda o persona identificable');
  }
  for (const [asset, rx] of [
    ['assets/css/site.css', /\/assets\/css\/site\.css(\?v=([0-9a-f]+))?"/],
    ['assets/js/app.js', /\/assets\/js\/app\.js(\?v=([0-9a-f]+))?"/],
  ]) {
    const m = html.match(rx);
    if (!m) continue;
    const want = createHash('sha256').update(readFileSync(join(ROOT, asset))).digest('hex').slice(0, 10);
    if (m[2] !== want) add(file, `${asset} sin versión actual (${m[2] || 'sin ?v='}, debería ser ${want})`);
  }
}

for (const file of extras) {
  const text = readFileSync(join(ROOT, file), 'utf8');
  for (const [rx, why] of BANNED) {
    const m = text.match(rx);
    if (m) add(file, `${why}: «${m[0]}»`);
  }
}

for (const path of ['municipios/template.html', 'reformas-mataro.html', 'pintor-cabrils.html', 'pintor-vilassar-de-mar.html']) {
  if (!ignore.has(path)) add('.vercelignore', `${path} no debe publicarse`);
}
for (const pattern of ['images/projects/real/rehabilitacion-fachada-mataro-*', 'images/projects/real/restauracion-madera-exterior-02.webp']) {
  if (!ignore.has(pattern)) add('.vercelignore', `${pattern} no debe publicarse`);
}

const sitemap = readFileSync(join(ROOT, 'sitemap.xml'), 'utf8');
for (const [, url] of sitemap.matchAll(/<loc>https:\/\/bcnproreforma\.com([^<]*)<\/loc>/g)) {
  const path = url === '/' ? 'index.html' : `${url.slice(1)}.html`;
  if (!existsSync(join(ROOT, path))) add('sitemap.xml', `${url} no tiene archivo`);
  if (ignore.has(path)) add('sitemap.xml', `${url} está excluida del despliegue`);
}
const redirects = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8')).redirects;
if (!redirects.some((r) => r.source === '/reformas-mataro' && r.destination === '/municipios/pintor-mataro')) {
  add('vercel.json', '/reformas-mataro debe redirigir a /municipios/pintor-mataro');
}

if (problems.length) {
  console.log(problems.map((p) => `  FAIL  ${p}`).join('\n'));
}
console.log(`${pages.length} páginas y ${extras.length} archivos revisados, ${problems.length} con problemas`);
process.exit(problems.length ? 1 : 0);
