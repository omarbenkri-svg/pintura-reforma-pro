# HANDOFF — Lead Capture n8n Integration

> Documento de traspaso entre instancias de Claude (Cowork ↔ Antigravity ↔ Claude Code).
> Lee este archivo al inicio de cualquier sesión para no "perder el hilo".
> Última actualización: 2026-04-18 por Claude Code (cierre del bucle E2E).

---

## Contexto de la tarea en curso

**Objetivo:** Integrar captura de leads de la calculadora web con n8n Cloud → Google Sheets + Gmail.

**Frontend (ya desplegado):**
- `js/lead-webhook.js` apunta a `https://bcnproreforma.app.n8n.cloud/webhook/pintura_reforma_leads`
- Evento `leadCapturado` dispara el POST al webhook
- Payload real enviado:
  ```json
  { nombre, telefono, email, servicio, metros, timestamp, fuente,
    pagina, referrer, dispositivo, utm_source, utm_medium, utm_campaign }
  ```

**Backend n8n:** `n8n_workflow_reformas.json` reescrito con estructura completa:
`Webhook → Set (sanitize) → IF (nombre && telefono) → [Sheets + Gmail + Respond 200] / [Respond 400]`

---

## Estado actual (2026-04-18)

### HECHO ✅

#### BUG #1 — CORREGIDO (2026-04-18, sesión Cowork)
Se eliminó el guard `!lead.email` en `js/lead-webhook.js` para permitir leads sin email.

#### BUG #2 — CORREGIDO (2026-04-18, sesión Claude Code)
`n8n_workflow_reformas.json` reescrito con:
- Nodo `Set` sanitiza email vacío → `""`, UTMs vacías → `"directo"`
- Nodo `IF` valida nombre y telefono (no empty) antes de procesar
- Google Sheets v4.5 con `columns.mappingMode: "defineBelow"` — mapeo explícito campo a campo (13 columnas en orden exacto)
- Gmail HTML completo con todos los campos; si email vacío → "Sin email — contactar por teléfono"
- `Respond to Webhook` 200 OK `{status:"ok"}` y 400 `{error:"missing_required"}` en ramas TRUE/FALSE del IF
- Placeholders `USA_LA_CREDENCIAL_DE_CLARITYAUDIT` y `TU_ID_DE_HOJA_DE_CALCULO` documentados con `_comment`

#### BUG #3 — CORREGIDO (2026-04-18, sesión Claude Code)
`js/lead-webhook.js`: `mode: 'no-cors'` → `mode: 'cors'` (en `sendToWebhook` y `retryUnsentLeads`).
Guard reforzado: si `!lead.nombre || !lead.telefono` → `console.error` + return.
Log estructurado: `console.info('[Lead Webhook] payload:', payload)` antes del fetch.

#### NUEVO — Paso email opcional (2026-04-18, sesión Claude Code)
`js/main.js`: nuevo paso `step-email` insertado entre step-9 (datos) y step-10 (resultado).
- Botón "Saltar" → dispatcha `leadCapturado` con `email: ""`
- Botón "Añadir y enviar" → valida regex email → dispatcha con email o muestra error inline
- El email nunca bloquea el envío del lead
- Accesibilidad: `aria-required="false"`, `aria-describedby="calc-email-error"`, `<label for>`
- Mobile: botones `min-height:48px`, flex gap
- 6 claves i18n añadidas en ES/CA/EN: `calc_email_titulo`, `calc_email_subtitulo`, `calc_email_placeholder`, `calc_email_btn_saltar`, `calc_email_btn_anadir`, `calc_email_error_invalido`

#### NUEVO — n8n_error_workflow.json (2026-04-18, sesión Claude Code)
Workflow secundario creado: `Error Trigger → Gmail Error Notify`.
- Subject: `⚠️ ERROR — Lead Capture Reformas: {error.message}`
- Body: workflow name, nodo fallido, error message, timestamp, enlace a ejecución fallida
- Cómo asociar: ver instrucciones en **Setup Error Workflow** más abajo

---

## Setup Google Sheet (acción del CEO)

### Paso a paso:

1. Ir a [Google Sheets](https://sheets.google.com) con la cuenta `bcnproreforma@gmail.com`.
2. Crear una hoja nueva llamada exactamente: `Leads_Reformas_2026`.
3. En la **fila 1**, pegar los siguientes headers en este orden exacto (una columna por celda):

```
| A         | B       | C         | D     | E        | F      | G      | H        | I          | J          | K          | L            | M      |
|-----------|---------|-----------|-------|----------|--------|--------|----------|------------|------------|------------|--------------|--------|
| timestamp | nombre  | telefono  | email | servicio | metros | pagina | referrer | dispositivo| utm_source | utm_medium | utm_campaign | fuente |
```

4. Copiar el ID de la hoja desde la URL:
   - URL ejemplo: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit`
   - ID = `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms`

5. En n8n Cloud (tras importar `n8n_workflow_reformas.json`):
   - Abrir el nodo **Google Sheets**
   - En el campo **Document** → pegar el ID copiado (reemplaza el placeholder `TU_ID_DE_HOJA_DE_CALCULO`)
   - En **Sheet Name** → escribir `Leads_Reformas_2026`

---

## Setup Error Workflow (acción del CEO)

1. Importar `n8n_error_workflow.json` en n8n Cloud.
2. Reasignar la credential Gmail al nodo `Gmail Error Notify`.
3. Activar el toggle del error workflow.
4. Ir al workflow principal `Lead Capture - Reformas` → **Settings** (panel izquierdo) → **Error Workflow** → seleccionar `Lead Capture - Error Handler`.
5. Guardar.

---

## Setup Credentials (acción del CEO — ambos workflows)

Tras importar cada JSON, en cada nodo con credential:

| Nodo            | Tipo credential         | Seleccionar               |
|-----------------|-------------------------|---------------------------|
| Google Sheets   | Google Sheets OAuth2    | La credential de ClarityAudit existente |
| Gmail Notify    | Gmail OAuth2            | La credential de ClarityAudit existente |
| Gmail Error Notify | Gmail OAuth2         | La credential de ClarityAudit existente |

---

## QA E2E — Test Plan

Ejecutar con `vercel dev` o servidor local en el proyecto. Rellenar la calculadora hasta el final.

| # | Caso | Pasos | Output esperado Sheets | Output esperado Gmail |
|---|------|-------|------------------------|----------------------|
| 1 | Lead con email | 1. Abrir `http://localhost:3000` (o `https://bcnproreforma.com`) <br>2. Abrir calculadora <br>3. Completar todos los pasos <br>4. En paso email: rellenar `test@ejemplo.com` + clic "Añadir y enviar" | Nueva fila: email = `test@ejemplo.com`, timestamp rellenado, UTMs = "directo" si no hay params | Email recibido en `Bcnproreforma@gmail.com` con todos los campos, email muestra `test@ejemplo.com` |
| 2 | Lead sin email | 1-3. Igual que caso 1 <br>4. En paso email: clic "Saltar" | Nueva fila: email = vacío (celda vacía) | Email recibido con campo Email = "Sin email — contactar por teléfono" |
| 3 | Lead con UTM | 1. Abrir URL: `http://localhost:3000?utm_source=test&utm_medium=cpc&utm_campaign=qa` <br>2-4. Igual que caso 1 | Nueva fila: utm_source = "test", utm_medium = "cpc", utm_campaign = "qa" | Email con UTMs correctos |
| 4 | n8n caído / retry | 1. Desactivar el workflow en n8n Cloud <br>2. Completar el formulario <br>3. Verificar en DevTools → Console: `[Lead Webhook] Error en intento 1` y `[Lead Webhook] Agotados reintentos` <br>4. Verificar `localStorage.getItem('calc_leads_unsent')` contiene el lead <br>5. Re-activar workflow <br>6. Recargar página → el retry automático reenvía | Fila aparece tras retry al recargar | Email recibido tras retry |

**Nota para el CEO:** Para los casos 1-3, verificar también en n8n Cloud → Executions que el payload llega correctamente y la respuesta es 200 OK.

---

## Plan de ejecución (pendiente del CEO)

1. **Crear Google Sheet** → ver `## Setup Google Sheet` arriba.
2. **Import workflows** en n8n Cloud:
   - `n8n_workflow_reformas.json` → nombre: `Lead Capture - Reformas`
   - `n8n_error_workflow.json` → nombre: `Lead Capture - Error Handler`
3. **Map credentials** → ver `## Setup Credentials` arriba.
4. **Activar** ambos workflows (toggle ON).
5. **Asociar Error Workflow** → ver `## Setup Error Workflow` arriba.
6. **Ejecutar QA E2E** → ver `## QA E2E — Test Plan` arriba.
7. **Deploy frontend** → `vercel --prod` para publicar los cambios de `js/main.js` y `js/lead-webhook.js`.
