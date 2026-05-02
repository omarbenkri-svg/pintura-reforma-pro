# HANDOFF — bcnproreforma.com

**Última actualización:** 2026-05-02 por Claude Code (sesión cierre E2E + email en calculadora)
**Próximo ejecutor:** Antigravity (IDE Google) o Claude Code

---

## 🎯 Qué es este documento

Punto único de verdad del estado del proyecto. Cualquier agente (Claude Code, Claude.ai, Antigravity) lee esto ANTES de actuar. Se actualiza al final de cada sesión.

---

## 🏢 Contexto del negocio

- **Cliente:** empresa de pintura, reformas y acabados de obra
- **Área de servicio:** Maresme + Barcelona (radio ~40km desde Cabrils 08348)
- **Dominio:** bcnproreforma.com (registrado en GoDaddy)
- **Nombre legal:** "Pintura, Reforma y Acabado de Obras"
- **Nombre comercial/marca:** "BCN Pro Reforma"
- **Tipo de negocio:** SAB (Service Area Business) — no tiene local físico público
- **Dirección privada (solo verificación GBP):** Carrer Doctor Emili Masriera 8, 1º 2ª, 08348 Cabrils
- **Contactos:**
  - WhatsApp: +34 631 71 40 77 → `https://wa.me/34631714077`
  - Llamadas: +34 639 05 88 19 → `tel:+34639058819`
  - Email: bcnproreforma@gmail.com
- **Instagram:** @pintayreformatuobra

---

## 🛠️ Stack técnico

- HTML / CSS / JS Vanilla puro (cero frameworks)
- Hosting: Vercel (alias bcnproreforma.com activo)
- Lead pipeline: **Google Apps Script Web App** → Google Sheets "Form Leads" + Gmail
- Tracking: `tracking-unificado.js` activo
- Repo: git (rama `feat/lead-capture-e2e-closure`)

---

## ✅ Hecho (acumulado de todas las sesiones)

### Sesión 2026-05-02 (esta sesión — cierre E2E + campo email calculadora)
- `vercel.json`: 2 redirects 301 para duplicados `/pintor-cabrils.html` y `/pintor-vilassar-de-mar.html` → `/municipios/`
- `index.html`: OG image corregida a `hero-team.webp` (1200×630), enlace Blog en nav desktop + mobile, footer rutas corregidas
- **Google Apps Script Web App desplegado** (Versión 1, 2026-05-02 20:49):
  - URL: `https://script.google.com/macros/s/AKfycbwesZXU9_TUzmSptQnYt4CMJFfB6nHttnDA2XOXdsjyebmUJlaQHEpN0ku6Oum_3lCh/exec`
  - Acceso: Cualquier usuario (anónimo)
  - Ejecuta como: bcnproreforma@gmail.com
  - Escribe en Google Sheets `1IFAssx08QR-smmgj5Jzjr99aFnTCGZTnfH5KDQ0zQIQ` → pestaña "Form Leads"
  - Envía email de alerta a bcnproreforma@gmail.com por cada lead
- `js/lead-webhook.js`: WEBHOOK_URL actualizado al Apps Script (abandonado n8n cloud — trial expirado)
- **Deploy a producción completado** — `bcnproreforma.com` live con todos los fixes
- **Test E2E verificado**: 6 filas de test en "Form Leads" confirman que el pipeline funciona
- **Campo email integrado en Paso 9** de la calculadora (`js/main.js`): nombre + teléfono + email (opcional) en un solo paso. Step-email redundante descartado. `dispatchLead` se llama directamente al pulsar "Emitir Análisis".

### Código (acumulado sesiones previas)
- 8 landings municipio en `/municipios/*.html` con JSON-LD, geo tags, interlinking
- Blog en `/blog/` con 4 artículos iniciales + Article schema + breadcrumbs
- Homepage con JSON-LD LocalBusiness + FAQPage + HowTo, geo meta tags, OG
- Modal calculadora 3 pasos con lead-gate
- Página 404 premium con countdown + CTA WhatsApp
- `lead-webhook.js` dispatcher con retry + localStorage fallback → apunta a Apps Script
- `tracking-unificado.js` activo
- Trust badges, tabla comparativa, banner urgencia, zonas servicio
- `sitemap.xml` (12 URLs) + `robots.txt` + `vercel.json` security headers
- `whatsapp/n8n-workflows/` — 4 workflows n8n archivados (inactivos, n8n trial expirado)

### Configuraciones externas
- Google Ads: campaña PMAX "Pintores en Barcelona" → **PAUSADA** (saldo pendiente + targeting incorrecto)
- Meta Ads: ubicación corregida a "Cabrils + 25mi (40km)" → pendiente publicar por Payment error
- GBP perfil duplicado Premià → eliminado
- GBP perfil Cabrils → renombrado a "BcnProReforma" pero **SUSPENDIDO** por incumplimiento de directrices

---

## 🔴 Bugs pendientes (reducidos)

1. ~~Duplicados municipios~~ ✅ FIXED — 301 redirects en vercel.json
2. ~~Footer apunta a rutas viejas~~ ✅ FIXED
3. ~~Blog sin enlace visible~~ ✅ FIXED — añadido en nav desktop + mobile
4. ~~n8n webhook URL inoperativo~~ ✅ FIXED — migrado a Google Apps Script
5. ~~OG image incorrecta~~ ✅ FIXED — hero-team.webp 1200×630
6. **pintor-mataro.html usa CSS inline** — no comparte municipios.css. Bajo impacto.
7. **Foto "Quiénes somos" es stock Unsplash** — no auténtico.
8. **Filas de test en "Form Leads"** — eliminar manualmente las 6 filas de test (rows 2-7) antes de ir a producción real.

---

## ⏸️ Pendiente acción humana (solo Omar puede)

1. **Eliminar filas de test en Google Sheets** "Form Leads" (filas 2-7, son tests de curl)
2. Pagar saldo pendiente Google Ads (si decide reactivar)
3. Resolver Payment error Meta Ads (si decide reactivar)
4. Crear perfil GBP SAB nuevo en `business.google.com/create`
5. Google Search Console: añadir propiedad + verificar + submit sitemap
6. Bing Webmaster Tools: importar propiedad desde GSC (1 click)
7. WhatsApp Business app: auto-respuesta de bienvenida
8. Instagram bio: enlace `bcnproreforma.com`

---

## 🚫 No reintroducir

- No reintroducir páginas `/pintor-*.html` en raíz. Solo en `/municipios/`. Ya tienen redirects 301.
- No usar nombre "BCN Pro Reforma" en GBP oficial (usar nombre legal).
- No reactivar Google Ads PMAX sin corregir targeting + keywords negativas.
- No reactivar Meta Ads sin creativo real (antes/después) + intereses + idioma ES/CA.
- No usar `gtm-tracking.js` mientras `tracking-unificado.js` esté activo (duplicaría eventos).
- No volver a n8n cloud (trial expirado, sin intención de pagar). Pipeline = Google Apps Script.

---

## 🗺️ Próximas fases

### ✅ Fase cierre técnico — COMPLETADA
- ~~Limpieza duplicados~~ ✅
- ~~Footer + enlace blog~~ ✅
- ~~Lead pipeline operativo~~ ✅ (Apps Script → Sheets + email)
- ~~Deploy a producción~~ ✅

### Fase siguiente: tracción orgánica (4 semanas)
- GBP SAB nuevo verificado
- Google Search Console + Bing
- 5 citations locales
- Primeras reseñas GBP
- Fotos reales geotaggeadas

### Fase futura (cuando haya 300€/mes de presupuesto)
- Google Ads Search (no PMAX) con keywords high-ticket
- Meta Ads reactivado con creativo antes/después
