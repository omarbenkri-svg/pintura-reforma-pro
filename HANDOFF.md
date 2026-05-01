# HANDOFF — bcnproreforma.com

**Última actualización:** 2026-05-01 por Claude.ai (sesión mentor)
**Próximo ejecutor:** Claude Code

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
- Hosting: Vercel
- Lead pipeline: n8n (bcnproreforma.app.n8n.cloud) → Google Sheets + email
- Tracking: GTM dataLayer (no GA4 directo aún)
- Repo: git (rama actual feat/lead-capture-e2e-closure)

---

## ✅ Hecho (acumulado de todas las sesiones)

### Código
- 8 landings municipio en `/municipios/*.html` con JSON-LD, geo tags, interlinking
- Blog en `/blog/` con 4 artículos iniciales + Article schema + breadcrumbs
- Homepage con JSON-LD LocalBusiness + FAQPage + HowTo, geo meta tags, OG
- Modal calculadora 3 pasos con lead-gate
- Página 404 premium con countdown + CTA WhatsApp
- `lead-webhook.js` dispatcher con retry + localStorage fallback
- `gtm-tracking.js` para eventos (scroll, tiempo, whatsapp clicks)
- `tracking-unificado.js` activo (preferido sobre gtm-tracking.js)
- Trust badges, tabla comparativa, banner urgencia, zonas servicio
- `sitemap.xml` (12 URLs) + `robots.txt` + `vercel.json` security headers
- `public/_headers` con CSP + HSTS + cache rules
- `whatsapp/n8n-workflows/` — 4 workflows n8n listos para importar: WA-A (router WhatsApp), WA-B (verificación Meta), WA-C (alertas 2h), WD (leads formulario web)
- `whatsapp/README.md` — guía completa de setup: Meta app, credenciales, import, test E2E
- `whatsapp/test-webhook.sh` — script de tests curl para los 4 workflows (5 tests)

### Configuraciones externas
- Google Ads: campaña PMAX "Pintores en Barcelona" → **PAUSADA** (saldo pendiente + targeting incorrecto)
- Meta Ads: ubicación corregida a "Cabrils + 25mi (40km)" → queda pendiente de publicar por Payment error
- GBP perfil duplicado Premià → eliminado
- GBP perfil Cabrils → renombrado a "BcnProReforma" pero **SUSPENDIDO** por incumplimiento de directrices

---

## 🔴 Bugs conocidos pendientes

1. **Duplicados municipios:** existen `/pintor-*.html` en raíz Y en `/municipios/`. Google penaliza contenido duplicado.
2. **Footer apunta a rutas viejas** (línea ~2553 de index.html).
3. **Blog sin enlace visible** en la web (no hay forma de llegar a `/blog/` desde el frontend).
4. ~~**n8n webhook URL en uso pero workflow no existe aún**~~ ✅ FIXED — Workflow D (`workflow-d-form-leads.json`) creado para `pintura_reforma_leads`. Pendiente solo importar en n8n y activar.
5. **pintor-mataro.html usa CSS inline** (no comparte municipios.css). Bajo impacto.
6. **Foto "Quiénes somos" es stock Unsplash** — no auténtico.
7. **No existe OG image 1200x630** — redes sociales no renderizan preview correcto.
8. **RESEND_API_KEY no configurada en Vercel** (si el blog o formularios necesitan email).

---

## ⏸️ Pendiente acción humana (solo Omar puede)

1. `vercel --prod` desde terminal local
1b. Importar 4 workflows en n8n: bcnproreforma.app.n8n.cloud → Workflows → Import from file (orden: B→A→C→D)
1c. En n8n: configurar credencial Google Sheets (OAuth2) y credencial Email (Gmail SMTP)
1d. En n8n: activar los 4 workflows (toggle ON)
1e. En Google Sheets `1IFAssx08QR-smmgj5Jzjr99aFnTCGZTnfH5KDQ0zQIQ`: crear pestaña "Form Leads" con headers: Timestamp|Nombre|Telefono|Email|Servicio|Metros|Fuente|Dispositivo|UTM_Source|UTM_Medium|UTM_Campaign|Pagina|Status
1f. WhatsApp: crear Meta App en developers.facebook.com → añadir producto WhatsApp → copiar WA_PHONE_NUMBER_ID y WA_ACCESS_TOKEN → añadir como env vars en n8n
1g. Ejecutar `./whatsapp/test-webhook.sh` tras activar workflows para verificar E2E
2. Pagar saldo pendiente Google Ads (si decide reactivar)
3. Resolver Payment error Meta Ads (si decide reactivar)
4. Crear perfil GBP SAB nuevo en `business.google.com/create` (Claude.ai guía vía MCP)
5. Google Search Console: añadir propiedad + verificar + submit sitemap
6. Bing Webmaster Tools: importar propiedad desde GSC (1 click)
7. WhatsApp Business app: auto-respuesta de bienvenida
8. Instagram bio: enlace `bcnproreforma.com`

---

## 🚫 No reintroducir

- No reintroducir páginas `/pintor-*.html` en raíz. Solo en `/municipios/`.
- No usar nombre "BCN Pro Reforma" en GBP oficial (usar nombre legal).
- No reactivar Google Ads PMAX sin corregir targeting + keywords negativas.
- No reactivar Meta Ads sin creativo real (antes/después) + intereses + idioma ES/CA.
- No usar `gtm-tracking.js` mientras `tracking-unificado.js` esté activo (duplicaría eventos).

---

## 🗺️ Próximas fases

### Fase actual: cierre técnico pre-deploy
- Limpieza duplicados
- Footer + enlace blog
- n8n workflows creados (A,B,C,D) — pendiente import manual + credenciales (ver puntos 1b-1g)
- Deploy a producción

### Fase siguiente: tracción orgánica (4 semanas)
- GBP SAB nuevo verificado
- Google Search Console + Bing
- 5 citations locales
- Primeras reseñas GBP
- Fotos reales geotaggeadas

### Fase futura (cuando haya 300€/mes de presupuesto)
- Google Ads Search (no PMAX) con keywords high-ticket
- Meta Ads reactivado con creativo antes/después
