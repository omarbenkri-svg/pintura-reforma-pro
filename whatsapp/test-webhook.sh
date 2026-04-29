#!/usr/bin/env bash
# Test scripts — WhatsApp webhook BCN Pro Reforma
# Uso: chmod +x test-webhook.sh && ./test-webhook.sh

N8N_URL="https://bcnproreforma.app.n8n.cloud/webhook/whatsapp-inbound"
VERIFY_TOKEN="bcnproreforma_whatsapp_2026"

echo "======================================="
echo " BCN Pro Reforma — WhatsApp Webhook Tests"
echo "======================================="

# -----------------------------------------------
# TEST 1: Meta Webhook Verification (GET)
# -----------------------------------------------
echo ""
echo "TEST 1: Verificación META (GET) — debe devolver el challenge"
curl -s -G "$N8N_URL" \
  --data-urlencode "hub.mode=subscribe" \
  --data-urlencode "hub.verify_token=$VERIFY_TOKEN" \
  --data-urlencode "hub.challenge=TEST_CHALLENGE_12345"
echo ""
echo "Esperado: TEST_CHALLENGE_12345"

# -----------------------------------------------
# TEST 2: Mensaje fuera de horario (POST)
# -----------------------------------------------
echo ""
echo "TEST 2: Mensaje genérico (POST) — debe enrutar a respuestaGeneral"
curl -s -X POST "$N8N_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "object": "whatsapp_business_account",
    "entry": [{
      "id": "TEST_ENTRY",
      "changes": [{
        "value": {
          "messaging_product": "whatsapp",
          "metadata": { "display_phone_number": "631714077", "phone_number_id": "TEST_ID" },
          "messages": [{
            "from": "34612345678",
            "id": "TEST_MSG_001",
            "timestamp": "1714384800",
            "text": { "body": "Hola buenas" },
            "type": "text"
          }]
        },
        "field": "messages"
      }]
    }]
  }'
echo ""

# -----------------------------------------------
# TEST 3: Mensaje con keyword presupuesto (POST)
# -----------------------------------------------
echo ""
echo "TEST 3: Mensaje con keyword (POST) — debe enrutar a bienvenidaPresupuesto"
curl -s -X POST "$N8N_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "object": "whatsapp_business_account",
    "entry": [{
      "id": "TEST_ENTRY",
      "changes": [{
        "value": {
          "messaging_product": "whatsapp",
          "metadata": { "display_phone_number": "631714077", "phone_number_id": "TEST_ID" },
          "messages": [{
            "from": "34699000111",
            "id": "TEST_MSG_002",
            "timestamp": "1714384800",
            "text": { "body": "Quería un presupuesto para pintar el piso" },
            "type": "text"
          }]
        },
        "field": "messages"
      }]
    }]
  }'
echo ""

# -----------------------------------------------
# TEST 4: Verificar que Google Sheets recibe el log
# -----------------------------------------------
echo ""
echo "TEST 4: Verificar Google Sheets — abre manualmente:"
echo "https://docs.google.com/spreadsheets/d/1IFAssx08QR-smmgj5Jzjr99aFnTCGZTnfH5KDQ0zQIQ/edit"
echo "Comprueba que aparecen filas nuevas en 'WhatsApp Leads'"

echo ""
echo "======================================="
echo " Tests completados"
echo "======================================="
