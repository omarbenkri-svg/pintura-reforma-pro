# HANDOFF — bcnproreforma.com

**Última actualización:** 2026-10-28 por Codex — integración local de guía SEO/GEO; todavía sin push ni deploy. La web v2 anterior sigue en producción.
**Próximo ejecutor:** Claude Code (Terminal)

---

## Iteración local 2026-10-28 — guía de acabados y GEO

- La integración se preparó en `Desktop/⭐ bcnproreforma/sitio-integracion` y quedó incorporada al repositorio real `Developer/pintura-reforma-pro` en los commits locales `18f09b0` y `abfe62e`. Los cambios preexistentes en `.gitignore` y `.claude/` permanecen intactos.
- Generador `prototipos/_build/build_site.py` actualizado: crea `/guia-acabados`, la enlaza desde la portada, navegación y pie, y la añade al sitemap y a `llms.txt`. La guía compara pintura, estucos y microcemento, muestra obras propias y ofrece una ficha PDF sin registro. Los 12 casos del selector son locales; el formulario de contacto existente permanece intacto.
- Presentación comercial corregida: Omar no aparece en portada ni Empresa; Mohamed queda reservado a los datos legales y a la referencia discreta al directorio del Gremi. «Desde 1994» identifica la antigüedad en el Gremi según datos de la empresa, no la fundación del negocio.
- Datos estructurados: la guía tiene `Article` y `BreadcrumbList`; se retiraron de `HousePainter` el `founder` y `aggregateRating`, que daban protagonismo o podían interpretarse como valoración propia no apta para ese marcado.
- Verificación: 144 comprobaciones con Chrome en 24 páginas y cinco anchos más JS desactivado, todas en verde; 12 combinaciones del selector, enlaces/recursos locales, JSON-LD y `git diff --check` también comprobados. El cambio final de copy del Gremi se revalidó estáticamente tras esa pasada visual.
- Continuación de recomendación orgánica: el botón de compartir usa Web Share cuando está disponible y copia el enlace como alternativa. Un enlace con `espacio` y `busco` abre la respuesta seleccionada; `origen=compartida` se transmite al contacto como `guia_compartida`. Solo viajan esas elecciones, sin datos personales. Prueba dedicada: `PORT=8183 node prototipos/_build/check-guide-share.mjs` con servidor local en 8183.
- Campaña orgánica «Lo que no se ve en la foto» preparada en `prototipos/kit-google/CAMPANA-GUIA.md` con textos y fotos existentes. El kit del Perfil de Empresa ya no da protagonismo a Omar y Mohamed ni promete que un baño puede renovarse sin levantar el suelo. Publicar fotos solo con permiso y sin datos identificables.
- La guía acepta `canal=perfil|instagram|whatsapp|alianza` y pasa el valor validado al formulario como `guia_<canal>`. Los enlaces compartidos prevalecen como `guia_compartida`. La prueba `check-guide-share.mjs` comprueba el recorrido en Chrome sin enviar un lead.
- Auditoría de competencia 28/10 en `CAMPANA-GUIA.md`: ya hay competidores con comparación de acabados, FAQ, precios orientativos y WhatsApp visible. La serie «Lo que no se ve en la foto» se diferencia por la obra propia y la pregunta de soporte/uso. La guía incorpora acceso directo a contacto desde la primera pantalla para visitantes que ya tienen fotos, con origen preservado.
- Comprobación pública directa 28/10: `/` y `/empresa` responden 200 con la versión anterior; `/guia-acabados` responde 404. El nuevo contenido no está publicado todavía.
- Revisión local: 144 comprobaciones Chrome de 24 páginas y prueba específica del enlace compartido/canal en verde. Capturas de la guía en `Desktop/⭐ bcnproreforma/output/capturas/guia-desktop-2026-10-28.png` y `guia-movil-2026-10-28.png`; la móvil se tomó con emulación real de 390 px.
- `vercel deploy --dry --json` detectó 334 archivos (49,6 MB), incluyó la guía y el PDF y excluyó `HANDOFF.md`, `CLAUDE.md`, `.gitignore`, `.claude/` y `prototipos/`. El intento de **vista previa**, sin `--prod`, fue rechazado por la revisión automática por ser una subida externa sin autorización explícita y contener archivos cuyo carácter público no se ha acreditado. No repetir un despliegue directo o indirecto sin aprobación humana.
- **Pendiente para publicación:** obtener el OK de Omar para push y despliegue de esta nueva funcionalidad. No afirmar que la página ya esté indexada ni citada por asistentes. El formulario registra `guia_acabados`, `guia_compartida` o `guia_<canal>`; las visitas y los clics aún no se miden porque `window.track` es simulado y falta `GA_ID`.

---

## 🎯 Qué es este documento

Punto único de verdad del estado del proyecto. Cualquier agente lee esto ANTES de actuar.

---

## 🏢 Contexto del negocio

- **Titular (según facturas 2022-2023):** Mohamed Ben Mesaud, autónomo (NIF de tipo NIE), domicilio fiscal en Cabrils 08348. No es una sociedad: no hay «razón social» distinta del titular. NIF y dirección completa: en las facturas, no en este repo.
- **Nombre comercial:** en facturas «Pintura en general y acabados de obra»; en la web «Pintura, Reforma y Acabado de Obras» y «Pinturas, Reformas y Acabados de Obra». Pendiente fijar uno solo.
- **Marca web:** BCN Pro Reforma
- **Gremi:** agremiados en el Gremi de Pintors (Gremi d'Empreses de Pintura de Barcelona i Comarques) desde 1994, según Omar. Falta el enlace a la ficha o el certificado.
- **Dominio:** bcnproreforma.com (GoDaddy)
- **Tipo:** SAB — sin local físico público
- **Área:** Maresme + Barcelona (40km desde Cabrils 08348)
- **WhatsApp:** +34 631 71 40 77 → `https://wa.me/34631714077`
- **Teléfono:** +34 639 05 88 19 → `tel:+34639058819` (el que figura en las facturas, de Mohamed; el WhatsApp no aparece en ellas)
- **Email:** bcnproreforma@gmail.com
- **Instagram:** @pintayreformatuobra
- **Cuenta personal Omar:** omarbenkri@gmail.com (usada para Meta y servicios externos)

---

## 🛠️ Stack técnico

### Web (bcnproreforma.com)
- HTML / CSS / JS Vanilla puro (cero frameworks)
- Hosting: **Vercel** (alias bcnproreforma.com activo)
- Rama activa: `feat/web-v2` (luego merge a `master`)
- Lead pipeline: **Google Apps Script Web App** → Google Sheets + Gmail

### Agente WhatsApp IA (`Escritorio/whatsapp-agentkit/`)
- FastAPI + SQLite + **Gemini 2.0 Flash** (gratis) + Twilio WhatsApp
- Estado: código completo, pendiente de credenciales para activar
- Repositorio: git init hecho, NO subido a GitHub aún

### Herramientas Claude Code
- `agent-browser` 0.26.0 (vercel-labs) — instalado, scope user
- Chrome MCP — activo (cuando está conectado)
- `vercel` CLI 50.x — para deploy

---

## ✅ Hecho (acumulado)

### Web bcnproreforma.com
- [x] 8 landings municipio `/municipios/*.html` — JSON-LD, geo tags, interlinking
- [x] Blog `/blog/` — 4 artículos + Article schema + breadcrumbs
- [x] Homepage — JSON-LD LocalBusiness + FAQPage + HowTo, OG tags
- [x] Modal calculadora 3 pasos + lead-gate
- [x] **Email integrado en Paso 9** de calculadora (nombre + teléfono + email opcional)
- [x] Página 404 premium — countdown + CTA WhatsApp
- [x] `lead-webhook.js` → apunta a Google Apps Script Web App
- [x] `tracking-unificado.js` activo
- [x] Trust badges, tabla comparativa, banner urgencia
- [x] `sitemap.xml` (12 URLs) + `robots.txt` + `vercel.json` headers
- [x] 301 redirects para duplicados municipios (pintor-cabrils, pintor-vilassar-de-mar)
- [x] Footer rutas corregidas
- [x] Blog enlace en nav desktop + mobile
- [x] OG image → `hero-team.webp` 1200×630
- [x] **Google Apps Script Web App desplegado** — URL activa, acceso anónimo
  - Sheet ID: `1IFAssx08QR-smmgj5Jzjr99aFnTCGZTnfH5KDQ0zQIQ` → pestaña "Form Leads"
  - Email alertas: bcnproreforma@gmail.com
  - URL: `https://script.google.com/macros/s/AKfycbwesZXU9_TUzmSptQnYt4CMJFfB6nHttnDA2XOXdsjyebmUJlaQHEpN0ku6Oum_3lCh/exec`
- [x] **Test E2E verificado** — 6 filas en Form Leads confirman pipeline OK
- [x] **Deploy a producción** — bcnproreforma.com live (2026-05-02)
- [x] Auditoría a11y completada
- [x] Auditoría Alex Hormozi 2.0 completada (ver STRATEGY.md)
- [x] **Bug crítico resuelto (2026-05-18):** Error 404 global en Vercel arreglado. (Se eliminó la carpeta `public/` que Vercel estaba asumiendo erróneamente como root en Zero-Config).
- [x] **H1 de la portada invisible — resuelto y desplegado (2026-10-17, `c813941`):** `main.js` metía el H1 (`.anim-split-text`) en `.anim-target{opacity:0}` y nada le devolvía la opacidad; `setLanguage()` además borraba los spans por letra. Se retiró el mecanismo split-text. Prueba de regresión: `node scripts/check-hero-visibility.mjs` (con `python3 -m http.server 8181` en marcha) comprueba opacidad 1 con JS, con movimiento reducido y sin JS. `scripts/` está en `.vercelignore`.
- [x] **Archivos internos expuestos — resuelto y desplegado (2026-10-17, `3e00683`):** producción servía `HANDOFF.md`, `CLAUDE.md`, `KANBAN.json`, exports de n8n, `whatsapp/` y `_headers`. Añadidos a `.vercelignore` junto a `prototipos` y `.env*`; verificado 404 en producción.
- [x] **Verificación post-deploy (2026-10-17):** portada 200; HTML y `main.js` servidos idénticos al repo; 164/164 imágenes 200; prueba del H1 en verde contra bcnproreforma.com (JS, movimiento reducido, sin JS); Lighthouse móvil: Accesibilidad 87, Buenas prácticas 100, SEO 92 (fallos previos, ver bugs 7-9). Webhook NO probado con curl: crearía un lead y enviaría un email reales.
- [x] **Fotos fuera de git — resuelto (2026-10-17, `118466b`):** las 153 imágenes referenciadas (`scratch/fotosweb*`, `images/projects/real/`, `servicio_*.png`, `*-elite.webp`) solo existían en la copia de OneDrive y en producción. Copiadas al repo (idénticas por md5 a producción); las 164 referencias locales responden 200.
- [x] **3 prototipos de rediseño (2026-10-17, rama `feat/prototipos-rediseno`, sin push ni deploy):** A · Oficio (plan literal: marfil, azul, cobre, Inter), B · Estudio (interiorismo) y C · Técnico (proceso). 12 páginas cada uno, mismo contenido, fotos propias y formulario con 6 estados simulados (no envía nada). Comparativa en `prototipos/index.html`; plan y resultado en `prototipos/PLAN.md`. Regenerar con `python3 prototipos/_build/build.py`; comprobar con `node prototipos/_build/check-pages.mjs` (216 comprobaciones en verde). Lighthouse móvil: Accesibilidad 100 en las tres portadas. `prototipos/` está excluido del deploy.

### Agente WhatsApp (`whatsapp-agentkit/`)
- [x] Repo clonado en `Escritorio/whatsapp-agentkit/`
- [x] Stack construido: FastAPI + Gemini 2.0 Flash + Twilio + SQLite
- [x] `agent/brain.py` — Gemini 2.0 Flash (google-genai SDK)
- [x] `agent/memory.py` — historial por teléfono en SQLite
- [x] `agent/providers/twilio.py` — adaptador Twilio WhatsApp
- [x] `agent/main.py` — FastAPI webhook server
- [x] `config/prompts.yaml` — system prompt BCN Pro Reforma
- [x] `knowledge/bcnproreforma.md` — base de conocimiento completa
- [x] `tests/test_local.py` — simulador de chat local
- [x] `Dockerfile` + `requirements.txt` — Railway-ready
- [x] Dependencias instaladas (Python 3.14 + todos los paquetes)
- [x] `agent-browser` 0.26.0 instalado globalmente (scope user)

### Configuraciones externas
- Google Ads PMAX → **PAUSADA** (saldo pendiente + targeting incorrecto)
- Meta Ads → pendiente Payment error
- GBP Cabrils → **SUSPENDIDO** por directrices

---

## 🔴 Bugs pendientes

1. **Filas de test en Google Sheets** "Form Leads" (filas 2-7) — eliminar manualmente
2. **pintor-mataro.html** usa CSS inline — bajo impacto
3. **Foto "Quiénes somos"** es stock Unsplash — reemplazar con foto real
4. **Texto del H1 distinto con y sin JS** (2026-10-17): el HTML dice «¿Necesitas pintar o reformar tu piso…» y `setLanguage('es')` lo sustituye por `hero_title` del diccionario («Pintura, Reforma y Acabado de Obras en Cabrils y Maresme»). Google puede ver uno y el usuario otro. Decidir cuál es el bueno y unificar.
5. **Álbumes de galería mal etiquetados** (2026-10-17): «Baño de lujo» muestra la carpintería de madera del ático, «Estuco veneciano» una escalera de mármol y fontanería, «Tejados» el garaje comunitario, «Microcemento» una cocina.
6. **Imágenes generadas por IA presentadas como propias:** `servicio_*`, `*-elite`, `hero-team` (también la imagen OG).
7. **Redirect 301 de `/pintor-cabrils.html` y `/pintor-vilassar-de-mar.html` no se aplica:** `cleanUrls` redirige antes a `/pintor-cabrils`, que sirve el duplicado de la raíz (200). Contenido duplicado frente a `/municipios/…`.
8. **`/municipios/reformas-mataro.html` da 404** (el archivo está en la raíz como `reformas-mataro.html`).
9. **`robots.txt` bloquea `/js/`:** Google no puede ejecutar el JS al renderizar (idioma, galería). Lighthouse a11y: diálogo `#calcModal` sin nombre, contrastes bajos (etiquetas, pie, botón de cookies), orden de encabezados, `<main>` ausente, logo sin texto accesible.
10. **Token de verificación del webhook de WhatsApp estuvo público** (`whatsapp/config.js`, `test-webhook.sh`) hasta el 2026-10-17. Si ese webhook está en uso, rotar `WA_VERIFY_TOKEN`.
11. **Omar y Mohamed en la web v2:** corregido en `18f09b0`, pendiente de despliegue. Inicio y Empresa ya no les dan protagonismo.
12. **«Empresa familiar desde 1994»:** corregido en `18f09b0`, pendiente de despliegue. La fecha se atribuye a la agremiación según la empresa, no a la fundación.
13. **`aggregateRating` autoatribuido en JSON-LD:** retirado en `18f09b0`, pendiente de despliegue.
14. **«Trabajos con antes y después»** en la portada, pero el caso del baño no tiene fotos del «antes».

---

## ⏸️ Pendiente acción humana

### ✅ Incidencia DNS — web caída (detectada 25/10/2026, resuelta 26/10/2026)
- **Resuelto:** Claude Code cambió en GoDaddy, desde el Chrome de Omar y con su OK, el registro A `@` de `160.153.0.26` a `216.198.79.1` y el CNAME `www` de `bcnproreforma.com.` a `cname.vercel-dns.com.`. No tocó ningún otro registro.
- Verificado: nameservers de GoDaddy, 1.1.1.1 y 8.8.8.8 con los valores nuevos; portada 200 servida por Vercel e idéntica byte a byte a `index.html`; `www` hace 308 a la raíz; rutas principales 200; `HANDOFF.md` 404; certificado Let's Encrypt válido hasta el 13/01/2027; Vercel `misconfigured: false` en raíz y www.
- **Riesgo abierto:** GoDaddy → `bcnproreforma.com` → Productos sigue mostrando «Conectaste un sitio web a bcnproreforma.com» y un certificado SSL de GoDaddy (de ahí el CNAME `_acme-challenge` a Cloudflare). Si ese sitio se publica o se resincroniza, puede volver a cambiar el A. Desconectarlo requiere OK de Omar.
- Síntoma: todas las rutas de bcnproreforma.com y www devuelven 200 con una página «Coming Soon!» de 932 bytes, `noindex`, servida por Cloudflare (`ss-product-id: aab-v1`).
- Causa: en GoDaddy, el registro A `@` apunta a `160.153.0.26` (IP de GoDaddy) en vez de a Vercel. `www` es CNAME a `@`, así que hereda el fallo. Vercel marca el dominio `misconfigured: true`. El dominio está activo (vence 2027-04-13) y los nameservers siguen siendo de GoDaddy.
- Vercel está bien: `pintura-reforma-obra-v1.vercel.app` sirve el `index.html` del repo idéntico byte a byte.
- Codex no lo cambió (sus sesiones no tocan DNS ni despliegan). El cambio se hizo en el panel de GoDaddy, posiblemente al conectar un producto suyo (creador de webs o apps).
- Arreglo (Omar, en GoDaddy → DNS): A `@` → `216.198.79.1` (recomendada por Vercel; `76.76.21.21` también vale), borrar cualquier otro A `@`; CNAME `www` → `cname.vercel-dns.com`. Desconectar el producto de GoDaddy que reclame el dominio para que no vuelva a sobrescribirlo. Verificar con `curl -sI https://bcnproreforma.com` (debe responder Vercel) y `get_domain_config` (`misconfigured: false`).

### Trabajo de Codex (ChatGPT), 17-21/10/2026 — solo local
- Carpeta `~/Desktop/⭐ bcnproreforma/` (sin git). Prototipos propios (Oficio, Estudio, Técnico), una versión «Fusión» y una «candidata» de 24 páginas en `prototipos/candidata/`, con `noindex`, sin publicar. Generador `prototipos/scripts/build.py`; 10 pruebas `node --test qa/*.test.mjs` en verde (25/10).
- La candidata usa el mismo endpoint de Apps Script y campos compatibles con `apps-script-leads.gs` (solo marca éxito si la respuesta trae `ok: true`).
- Cambia URLs respecto a la v2 (p. ej. `caso-madera`, `caso-garaje`, `pintura-decorativa`, `servicios`, `elige-acabado`, `materiales`) y no incluye blog ni municipios: si se adopta, hacen falta 301.
- Su auditoría de nuestros prototipos (`documentos/auditoria-prototipos-claude-2026-10-21.md`) detecta problemas que siguen en la v2: bugs 11-14.

### Municipios v2 en producción (21/10/2026)
- 8 páginas `/municipios/pintor-*` regeneradas con el diseño y el enfoque nuevos (`prototipos/_build/municipios.py`). Deploy `qpmp73hp3`; rollback: `vercel promote pintura-reforma-obra-v1-fy9d0l6a4-omarbenkri-svgs-projects.vercel.app`.
- Plan por roles: `prototipos/PLAN-ROLES.md`. Kits: `prototipos/kit-google/` (Perfil de Empresa, directorios, Apps Script).
- Omar: pegar `apps-script-leads.gs` en el Apps Script de «Form Leads» (nueva versión de la misma implementación); OK para GA4 y Bing; sesión en la cuenta propietaria del Perfil de Empresa.

### Web v2 EN PRODUCCIÓN (21/10/2026)
- `master` e69cc83 desplegado (deploy `pintura-reforma-obra-v1-fy9d0l6a4`). Rollback: `vercel promote pintura-reforma-obra-v1-7k30d99od-omarbenkri-svgs-projects.vercel.app`.
- Verificado en producción: 28/28 URLs del sitemap 200, redirecciones OK, `/prototipos` y archivos internos 404, etiqueta de Search Console presente, sin «empleo»/«gratis».
- Regenerar la web: `python3 prototipos/_build/build_site.py` (rama de trabajo `feat/web-v2`, luego merge a master).
- Formulario verificado de extremo a extremo (21/10/2026): envío de prueba desde /contacto, ref. BCN-20261021-EXZB, acuse del Apps Script, fila en «Form Leads» y email confirmados por Omar. Borrar la fila de PRUEBA (tel. 600000000).
- Pendiente: GA4 (`GA_ID`), Perfil de Empresa (cuenta propietaria), páginas de municipios y blog con el diseño nuevo.

### Search Console (21/10/2026)
- Propiedad `https://bcnproreforma.com/` verificada con etiqueta HTML en la cuenta `omarbenkri@gmail.com`; sitemap enviado. **No quitar la meta `google-site-verification`** (está en `master` y en el generador de la v2).

### Web v2 (20/10/2026, rama `feat/web-v2`, NO en producción)
- Omar delegó la elección: **prototipo A · Oficio**. Generado con `python3 prototipos/_build/build_site.py` en la raíz (15 páginas, `/assets`, sitemap 28 URLs, `llms.txt`). Municipios y blog se mantienen y se enlazan.
- Vista previa verificada: 28/28 URLs del sitemap 200, 68 enlaces internos sin redirecciones, redirecciones antiguas OK. Lighthouse móvil portada: 100/100/100. `check-pages.mjs --site`: 90 comprobaciones OK.
- **Antes de publicar:** OK de Omar al diseño (es cambio de diseño, requiere OK) y una prueba real del formulario desde la vista previa (envía al Apps Script → hoja y email).
- GA4/Search Console: código listo; reconstruir con `GA_ID=G-… GSC_TOKEN=… python3 prototipos/_build/build_site.py` cuando Omar cree las cuentas.
- Kit del Perfil de Empresa: `prototipos/kit-google/` (nombre del perfil = nombre de alta, no BCN ProReforma).

### Iteración 2 (20/10/2026)
- Fase 1 hecha en `feat/prototipos-rediseno` (`ad0c4a8`): fotos de microcemento reveladas, servicio y caso de microcemento, texto reescrito, marca BCN ProReforma y aviso legal. Plan: `prototipos/PLAN-ITERACION-2.md`.
- **Desplegado 20/10/2026** (`master` 34317e8, deploy `pintura-reforma-obra-v1-64qjxrdm1`; rollback: `vercel promote pintura-reforma-obra-v1-b4d9n7z6s-omarbenkri-svgs-projects.vercel.app`): robots abierto a todos los rastreadores, canónicas y sitemap sin `.html` ni barra final (15 URLs, todas 200), 308 de los duplicados y del enlace roto de Mataró. Verificado en vista previa y en producción.
- Omar confirma (20/10/2026) que la valoración 4,9/23 y las 4 reseñas con nombre de la web actual son reales, del antiguo Perfil de Empresa de Google: **se mantienen**. Pendiente: elegir prototipo; crear GA4 y Search Console (fase 4).

### Prototipos de rediseño (decisión de Omar)
- Elegir dirección (A, B o C) en `prototipos/index.html`.
- Para publicar la elegida: municipio y permiso de cada obra (en la fachada se ve el número de la vivienda; en el álbum de madera, una persona y un cartel con teléfono), quién atiende cada canal y horario, URL del Gremi, FAQ y alcance validados por Mohamed, fotos de interiores/alisados/estucos y retratos, una sola versión de la marca y datos fiscales.
- Falta conectar el formulario a un receptor real con acuse (Paquete 5 del plan).

### Prioridad ALTA (desbloquean el agente WhatsApp)
1. **Gemini API Key** (2 min, gratis): `https://aistudio.google.com/apikey` → login con omarbenkri@gmail.com → "Create API key"
2. **Twilio Sandbox** (5 min, gratis): `https://www.twilio.com/try-twilio` → signup → Console → Messaging → Try it out → WhatsApp → copiar Account SID + Auth Token
3. Con esas 3 keys → decírselas a Claude Code → configura `.env`, prueba local, deploy Railway

### Prioridad MEDIA (tracción orgánica)
4. Eliminar filas test en Google Sheets "Form Leads" (filas 2-7)
5. GBP SAB nuevo: `business.google.com/create`
6. Google Search Console: añadir propiedad + submit sitemap
7. Bing Webmaster Tools: importar desde GSC (1 click)
8. WhatsApp Business app: auto-respuesta de bienvenida
9. Instagram bio: enlace `bcnproreforma.com`

### Prioridad BAJA
10. Pagar saldo Google Ads (si decide reactivar)
11. Resolver Payment error Meta Ads

---

## 🚫 No reintroducir

- No reintroducir `/pintor-*.html` en raíz — ya tienen 301 redirects
- No usar nombre "BCN Pro Reforma" en GBP (usar nombre legal)
- **No poner a Omar en la web ni dar protagonismo a Mohamed** (sin retratos ni tarjetas personales). Mohamed, solo la referencia discreta a su ficha del Gremi.
- No reactivar Google Ads PMAX sin corregir targeting
- No usar `gtm-tracking.js` (duplicaría eventos con tracking-unificado.js)
- **No usar n8n** — trial expirado, pipeline = Google Apps Script
- **No ocultar contenido esencial (H1, oferta, contacto) con clases que dependan de JS o de una animación para volver a verse.** Animar solo encima de un estado visible por defecto. No volver a partir titulares en spans por letra.
- **No hacer `vercel --prod` desde una copia sin las fotos** — las imágenes ya están en git desde `118466b`; desplegar siempre desde este repo.
- **NUNCA crear una carpeta `public/` en la raíz** — Vercel Zero-Config la interpreta como root y deja de servir index.html (esto causó la caída del 2026-05-18). Si necesitas archivos estáticos auxiliares, ponlos en la raíz o en subcarpetas con nombre distinto a `public`.

---

## 🗺️ Estado de fases

### ✅ COMPLETADA — Cierre técnico web
- Web live en bcnproreforma.com
- Pipeline leads operativo (Apps Script → Sheets + email)
- Calculadora con email integrado
- Todos los bugs de código resueltos

### 🔄 EN CURSO — Agente WhatsApp IA
- Código completo en `Escritorio/whatsapp-agentkit/`
- Bloqueado: necesita Gemini API Key + Twilio credentials
- Siguiente: `.env` → test local → Railway deploy → webhook Twilio

### ⏳ SIGUIENTE — Tracción orgánica (4-8 semanas)
- GBP SAB verificado + fotos reales
- Google Search Console + Bing
- 5 citations locales (Habitissimo, Páginas Amarillas, Houzz...)
- Primeras reseñas GBP
- Fotos antes/después reales (el mayor gap de conversión)

### 🔮 FUTURO (300€+/mes presupuesto)
- Google Ads Search (no PMAX) — keywords high-intent
- Meta Ads con vídeo antes/después real
- Email nurturing para leads con email que no cerraron
