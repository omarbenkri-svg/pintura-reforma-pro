# WhatsApp Business API — BCN Pro Reforma

Integración WhatsApp Cloud API (Meta) → n8n → Google Sheets + Email.

---

## Arquitectura

```
Usuario WhatsApp
       │
       ▼
Meta Cloud API  ──►  n8n Webhook  ──►  Router
                                         │
                          ┌──────────────┼──────────────┐
                          ▼              ▼              ▼
                    Fuera horario   Keyword match   General
                          │              │              │
                          └──────────────┴──────────────┘
                                         │
                                  WhatsApp Reply
                                         │
                            ┌────────────┴────────────┐
                            ▼                         ▼
                     Google Sheets              Email dueño
```

---

## PASO 1 — Crear Meta App y obtener credenciales

1. Ve a [developers.facebook.com](https://developers.facebook.com)
2. Crea una App → tipo **Business**
3. Añade producto **WhatsApp** a la app
4. En **WhatsApp > API Setup**:
   - Copia el **Phone Number ID** → `WA_PHONE_NUMBER_ID`
   - Genera un **Temporary Access Token** (o Access Token permanente) → `WA_ACCESS_TOKEN`
5. El **Verify Token** ya está definido: `bcnproreforma_whatsapp_2026`

---

## PASO 2 — Variables de entorno en Vercel

En el dashboard de Vercel → Settings → Environment Variables, añade:

| Variable             | Valor                        |
|----------------------|------------------------------|
| `WA_PHONE_NUMBER_ID` | (el ID del paso anterior)    |
| `WA_ACCESS_TOKEN`    | (el token del paso anterior) |
| `WA_VERIFY_TOKEN`    | `bcnproreforma_whatsapp_2026`|

> Estas variables también deben configurarse como **Variables de entorno en n8n**:
> n8n Cloud → Settings → Environment Variables → añade las mismas 3.

---

## PASO 3 — Importar workflows en n8n

1. Ve a [bcnproreforma.app.n8n.cloud](https://bcnproreforma.app.n8n.cloud)
2. Menú → **Workflows** → **Import from file**
3. Importa en este orden:
   - `n8n-workflows/workflow-b-verify.json` (verificación GET — debe activarse primero)
   - `n8n-workflows/workflow-a-router.json` (router principal POST)
   - `n8n-workflows/workflow-c-alert.json` (alertas cada 2h)
4. En **workflow-a-router** y **workflow-c-alert**, reemplaza `REEMPLAZAR_CON_ID_SHEET` con el ID de tu Google Sheet de leads.
5. Configura credenciales Google Sheets en n8n (OAuth2).
6. Activa los 3 workflows (toggle ON).

---

## PASO 4 — Registrar webhook en Meta Developer Console

1. En Meta Developers → tu App → WhatsApp → Configuration
2. **Webhook URL**: `https://bcnproreforma.app.n8n.cloud/webhook/whatsapp-inbound`
3. **Verify Token**: `bcnproreforma_whatsapp_2026`
4. Haz clic en **Verify and Save**
5. Suscríbete al evento: **messages**

---

## PASO 5 — Test end-to-end con curl

```bash
chmod +x test-webhook.sh
./test-webhook.sh
```

O manualmente:

```bash
# Verificación Meta (GET)
curl -G "https://bcnproreforma.app.n8n.cloud/webhook/whatsapp-inbound" \
  --data-urlencode "hub.mode=subscribe" \
  --data-urlencode "hub.verify_token=bcnproreforma_whatsapp_2026" \
  --data-urlencode "hub.challenge=MI_CHALLENGE"

# Simular mensaje entrante (POST)
curl -X POST "https://bcnproreforma.app.n8n.cloud/webhook/whatsapp-inbound" \
  -H "Content-Type: application/json" \
  -d '{"object":"whatsapp_business_account","entry":[{"changes":[{"value":{"messages":[{"from":"34612345678","text":{"body":"presupuesto pintura"},"timestamp":"1714384800","type":"text"}]}}]}]}'
```

---

## Estructura de archivos

```
whatsapp/
├── config.js                    # Configuración (vars de entorno)
├── messages.js                  # Plantillas de mensajes
├── n8n-workflows/
│   ├── workflow-a-router.json   # Webhook POST + router principal
│   ├── workflow-b-verify.json   # Webhook GET verificación Meta
│   └── workflow-c-alert.json    # Alertas leads pendientes > 2h
├── test-webhook.sh              # Tests curl
└── README.md                    # Este archivo
```

---

## Troubleshooting

| Problema | Solución |
|----------|----------|
| Meta devuelve 403 al verificar | Comprobar que `WA_VERIFY_TOKEN` coincide exactamente |
| n8n no recibe mensajes | Verificar que el webhook está activo y la suscripción a `messages` en Meta |
| WhatsApp no envía respuesta | Verificar `WA_PHONE_NUMBER_ID` y `WA_ACCESS_TOKEN` en variables n8n |
| Google Sheets no recibe filas | Reconfigurar credenciales OAuth2 Google en n8n |
| Email no llega | Configurar credencial SMTP/Gmail en n8n (cuenta bcnproreforma@gmail.com) |

---

## FASE 2 — Cuando Omar tenga las credenciales

Una vez que tengas `WA_PHONE_NUMBER_ID` y `WA_ACCESS_TOKEN`:

1. Pégalas en Vercel y en n8n (variables de entorno).
2. Avisa a Claude Code → activará los workflows y hará el test E2E completo.
3. Claude Code verificará con curl y confirmará que los mensajes llegan a WhatsApp + Google Sheets.
