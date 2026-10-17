# HANDOFF — bcnproreforma.com

**Última actualización:** 2026-10-17 por Claude Code — prototipos en la rama `feat/prototipos-rediseno` (local). `master` en producción (deploy `dpl_8PJtDPMzPgWvKpTEUR9EAZV9Y2Qe`, URL `pintura-reforma-obra-v1-b4d9n7z6s`). Rollback: `vercel promote pintura-reforma-obra-v1-nlgej5n5e-omarbenkri-svgs-projects.vercel.app` (deploy anterior, 2026-06-11).
**Próximo ejecutor:** Claude Code (Terminal)

---

## 🎯 Qué es este documento

Punto único de verdad del estado del proyecto. Cualquier agente lee esto ANTES de actuar.

---

## 🏢 Contexto del negocio

- **Nombre legal:** Pintura, Reforma y Acabado de Obras
- **Marca:** BCN Pro Reforma
- **Dominio:** bcnproreforma.com (GoDaddy)
- **Tipo:** SAB — sin local físico público
- **Área:** Maresme + Barcelona (40km desde Cabrils 08348)
- **WhatsApp:** +34 631 71 40 77 → `https://wa.me/34631714077`
- **Teléfono:** +34 639 05 88 19 → `tel:+34639058819`
- **Email:** bcnproreforma@gmail.com
- **Instagram:** @pintayreformatuobra
- **Cuenta personal Omar:** omarbenkri@gmail.com (usada para Meta y servicios externos)

---

## 🛠️ Stack técnico

### Web (bcnproreforma.com)
- HTML / CSS / JS Vanilla puro (cero frameworks)
- Hosting: **Vercel** (alias bcnproreforma.com activo)
- Rama activa: `feat/lead-capture-e2e-closure`
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

---

## ⏸️ Pendiente acción humana

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
