# CLAUDE.md — Protocolo de coordinación bcnproreforma

**Propósito:** reglas de oro para que cualquier agente (Claude Code, Claude.ai, Antigravity) opere en este repo sin crear conflictos.

---

## 📐 Ecosistema de trabajo

| Agente | Responsabilidad | Cuándo usarlo |
|---|---|---|
| **Claude.ai (web)** | Mentor + navegadores externos + docs .md | Estrategia, GBP, Ads, GSC, decisiones |
| **Claude Code (terminal)** | Ejecutor de código + APIs + git + deploy | TODO cambio de archivos, webhooks, comandos |
| **Antigravity (IDE)** | Revisión visual junto a Omar | Auditoría antes de push, QA visual |

### Herramientas de automatización instaladas
| Herramienta | Versión | Propósito |
|---|---|---|
| `agent-browser` (vercel-labs) | 0.26.0 | Navegación web eficiente (5.7x menos tokens que Chrome MCP) |
| Chrome MCP (claude-in-chrome) | activo | Automatización browser cuando agent-browser no alcanza |
| `vercel` CLI | 50.x | Deploy a producción |

---

## 📚 Orden de lectura obligatorio al iniciar sesión

1. `handoff.md` → estado actual, bugs, pendientes
2. `CLAUDE.md` → estas reglas
3. `strategy.md` → visión de negocio

No actuar sobre el código sin leer handoff.md primero.

---

## 🚦 Reglas de oro

### Git
- Commit atómico por cambio lógico (no "varios fixes en uno")
- Mensaje en inglés: `fix:`, `feat:`, `chore:`, `refactor:`, `docs:`
- NUNCA `git push --force` salvo autorización explícita de Omar
- Rama actual: `feat/lead-capture-e2e-closure` hasta deploy, luego merge a main

### Archivos
- Lee el archivo ANTES de editarlo (siempre)
- Edits quirúrgicos — no reescribas archivos enteros sin razón
- Todo copy en español castellano (web pública)
- Todo comentario de código y commit en inglés

### Deploys e Infraestructura
- **Empoderamiento de Claude Code:** Tienes autoridad total para debugear y solucionar directamente problemas de infraestructura, Vercel, DNS o enrutamiento. Puedes modificar estructura de carpetas, configuraciones de build, y hacer redespliegues sin depender del IDE Antigravity.
- `vercel --prod`: Puedes ejecutarlo de forma autónoma para solucionar caídas o errores graves (ej. errores 404 globales). Para pases a producción de nuevas features o cambios de diseño, sigue pidiendo OK de Omar.
- Antes de deploy: checklist de verificación (grep commands en `handoff.md`)
- Tras deploy: probar webhook con curl y validar con Lighthouse

### APIs externas
- Claude Code gestiona: Google Apps Script, Google Sheets API, webhooks, agente WhatsApp
- Claude.ai gestiona: GBP, Google Ads, Meta Ads, Search Console (vía Chrome MCP o agent-browser)
- **n8n DESCARTADO** — trial expirado, sin intención de pagar. Pipeline = Google Apps Script.
- Nunca tocar credenciales sin confirmar con Omar

### Proyectos activos en el escritorio
| Carpeta | Descripción |
|---|---|
| `Pintura, Reforma y Acabados de Obra/` | Web bcnproreforma.com (Vercel, rama feat/lead-capture-e2e-closure) |
| `whatsapp-agentkit/` | Agente WhatsApp IA (Gemini 2.0 Flash + Twilio + FastAPI) — pendiente credenciales |

### Handoff entre sesiones
- Al terminar cualquier sesión, actualizar `handoff.md`:
  - ✅ Hecho
  - ⚠️ Pendiente
  - 🐛 Bugs detectados
  - 🚫 No reintroducir
- Formato obligatorio del reporte final

### Decisiones con Omar
- Si la decisión es A/B, preguntar con 2 opciones numeradas, no párrafos largos
- Si el cambio es irreversible (borrado, deploy, pago), STOP y pedir OK explícito
- Si detectas un bug en el camino, NO interrumpas el flujo: corrige y reporta al final

---

## 🎯 Principios del producto

- **North Star:** generar leads calificados (high-ticket) para reformas y pintura
- **Target geográfico:** Maresme + Barcelona, radio 40km desde Cabrils 08348
- **Target demográfico:** propietarios 30-65 años, no busca-empleos
- **Conversion path:** Web → calculadora o WhatsApp → Google Apps Script → Google Sheets "Form Leads" + email
- **Agente WhatsApp IA:** (`whatsapp-agentkit/`) responde automáticamente con Gemini 2.0 Flash, escalando a Omar cuando necesario
- **SEO primero, Ads después** (cuando haya presupuesto sostenido)

---

## ⚠️ No hacer nunca sin autorización

- Borrar archivos o rutas sin 301 redirect
- Cambiar el dominio o el host
- Tocar `.env`, `.env.local`, credenciales en Vercel
- Crear dependencias nuevas (npm install X) sin razón documentada
- Deploy a producción **de nuevas features o cambios de diseño** (los deploys de emergencia para solucionar caídas SÍ están permitidos — ver sección "Deploys e Infraestructura")
- Enviar emails reales desde scripts de prueba

---

## 🔧 Runbook: Debug de caídas en Vercel

Si `curl -sI https://bcnproreforma.com` devuelve algo distinto de `HTTP 200`, sigue este procedimiento:

### Paso 1 — Diagnóstico rápido
```bash
curl -sI https://bcnproreforma.com
# Mira el header X-Vercel-Error para entender el tipo de fallo
```

### Paso 2 — Verificar el estado del proyecto en Vercel
```bash
# Consultar estado del último deploy
vercel ls --prod
# Ver logs del último deploy
vercel logs <deployment-url>
```

### Paso 3 — Causas conocidas y soluciones

| Síntoma | Causa probable | Solución |
|---|---|---|
| `X-Vercel-Error: NOT_FOUND` en TODAS las rutas | Vercel Zero-Config detectó una carpeta `public/` y la sirvió como root, ignorando el `index.html` real en la raíz | Eliminar o vaciar la carpeta `public/` y redesplegar |
| `X-Vercel-Error: NOT_FOUND` en rutas específicas | `cleanUrls` o `redirects` mal configurados en `vercel.json` | Revisar `vercel.json` y comparar con el último commit funcional |
| `X-Vercel-Error: DEPLOYMENT_NOT_FOUND` | Proyecto pausado por límite de uso del plan Hobby | Ir a Vercel dashboard → Settings → reactivar |
| Headers se aplican pero contenido es 404 | Los headers en `vercel.json` se aplican a nivel de edge ANTES de resolver el filesystem | El problema está en la estructura de archivos, no en la config de headers |

### Paso 4 — Redespliegue de emergencia
```bash
# Desde la raíz del proyecto
vercel --prod --yes
# Verificar
curl -sI https://bcnproreforma.com
# Debe devolver HTTP/1.1 200 OK
```

### Paso 5 — Post-fix
- Hacer commit del fix con mensaje descriptivo: `fix(vercel): <descripción>`
- Push a la rama activa
- Actualizar `HANDOFF.md` con lo que se encontró y se resolvió

### ⚠️ Regla crítica de Vercel Zero-Config
**NUNCA dejar una carpeta `public/` en la raíz** de este proyecto. Vercel la interpreta como el directorio a servir e ignora todos los demás archivos. Nuestro `index.html` vive en la raíz, no dentro de `public/`.
