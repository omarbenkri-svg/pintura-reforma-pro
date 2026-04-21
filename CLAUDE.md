# CLAUDE.md — Protocolo de coordinación bcnproreforma

**Propósito:** reglas de oro para que cualquier agente (Claude Code, Claude.ai, Antigravity) opere en este repo sin crear conflictos.

---

## 📐 Ecosistema de trabajo

| Agente | Responsabilidad | Cuándo usarlo |
|---|---|---|
| **Claude.ai (web)** | Mentor + navegadores externos + docs .md | Estrategia, GBP, Ads, GSC, decisiones |
| **Claude Code (terminal)** | Ejecutor de código + APIs + git + deploy | TODO cambio de archivos, webhooks, comandos |
| **Antigravity (IDE)** | Revisión visual junto a Omar | Auditoría antes de push, QA visual |

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

### Deploys
- `vercel --prod` SOLO con OK explícito de Omar
- Antes de deploy: checklist de verificación (grep commands en `handoff.md`)
- Tras deploy: probar webhook con curl y validar con Lighthouse

### APIs externas
- Claude Code gestiona: n8n, Google Sheets API, webhooks
- Claude.ai gestiona: GBP, Google Ads, Meta Ads, Search Console (vía Chrome MCP)
- Nunca tocar credenciales sin confirmar con Omar

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
- **Conversion path:** Web → calculadora o WhatsApp → lead en n8n → Google Sheets + email
- **SEO primero, Ads después** (cuando haya presupuesto sostenido)

---

## ⚠️ No hacer nunca sin autorización

- Borrar archivos o rutas sin 301 redirect
- Cambiar el dominio o el host
- Tocar `.env`, `.env.local`, credenciales en Vercel
- Crear dependencias nuevas (npm install X) sin razón documentada
- Deploy a producción
- Enviar emails reales desde scripts de prueba
