/* =============================================================
   LEAD WEBHOOK DISPATCHER
   Proyecto: Pintura, Reformas y Acabados de Obra
   
   INSTRUCCIONES:
   1. Incluye este script DESPUÉS de calculadora-lead-gate.js
      en tu index.html: <script src="lead-webhook.js"></script>
   2. Sustituye WEBHOOK_URL por tu endpoint real de Make/Zapier.
   3. El script escucha el evento 'leadCapturado' que dispara
      la calculadora y lo envía por POST al webhook.
   ============================================================= */

(function () {
  'use strict';

  // ⚠️ Configurado para n8n Cloud (Producción)
  var WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwesZXU9_TUzmSptQnYt4CMJFfB6nHttnDA2XOXdsjyebmUJlaQHEpN0ku6Oum_3lCh/exec';

  // ── Configuración ──
  var MAX_RETRIES = 2;
  var RETRY_DELAY = 3000; // ms

  // ── Listener principal ──
  window.addEventListener('leadCapturado', function (e) {
    var lead = e.detail;
    if (!lead || !lead.nombre || !lead.telefono) {
      console.error('[Lead Webhook] Payload inválido — se requiere nombre y telefono.', lead);
      return;
    }

    // Enriquecer con datos de contexto
    var payload = {
      nombre: lead.nombre || '',
      telefono: lead.telefono || '',
      email: lead.email || '',
      servicio: lead.servicio || '',
      metros: lead.metros || 0,
      timestamp: lead.timestamp || new Date().toISOString(),
      fuente: lead.fuente || 'calculadora_web',
      pagina: window.location.href,
      referrer: document.referrer || 'directo',
      dispositivo: getDeviceType(),
      utm_source: getUTM('utm_source'),
      utm_medium: getUTM('utm_medium'),
      utm_campaign: getUTM('utm_campaign')
    };

    console.info('[Lead Webhook] payload:', payload);
    sendToWebhook(payload, 0);
  });

  // ── Envío con reintentos ──
  function sendToWebhook(payload, attempt) {
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      mode: 'cors' // n8n Cloud expone CORS — permite detectar errores de red reales
    })
    .then(function () {
      // Con mode: no-cors no podemos leer la respuesta,
      // pero si no lanza error, el request se envió
      console.log('[Lead Webhook] Enviado correctamente');
    })
    .catch(function (err) {
      console.warn('[Lead Webhook] Error en intento ' + (attempt + 1) + ':', err.message);
      if (attempt < MAX_RETRIES) {
        setTimeout(function () {
          sendToWebhook(payload, attempt + 1);
        }, RETRY_DELAY * (attempt + 1));
      } else {
        console.error('[Lead Webhook] Agotados reintentos. Lead guardado en localStorage.');
        // El lead ya está en localStorage gracias a calculadora-lead-gate.js
        // Marcar como no-enviado para sync posterior
        flagUnsentLead(payload);
      }
    });
  }

  // ── Marcar leads no enviados ──
  function flagUnsentLead(payload) {
    var unsent = [];
    try {
      unsent = JSON.parse(localStorage.getItem('calc_leads_unsent') || '[]');
    } catch (e) { unsent = []; }
    unsent.push(payload);
    localStorage.setItem('calc_leads_unsent', JSON.stringify(unsent));
  }

  // ── Reintento de leads no enviados (al cargar la página) ──
  function retryUnsentLeads() {
    var unsent = [];
    try {
      unsent = JSON.parse(localStorage.getItem('calc_leads_unsent') || '[]');
    } catch (e) { return; }

    if (unsent.length === 0) return;

    // Intentar enviar el primero, si funciona, limpiar y seguir
    var lead = unsent[0];
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      mode: 'cors'
    })
    .then(function () {
      unsent.shift();
      localStorage.setItem('calc_leads_unsent', JSON.stringify(unsent));
      if (unsent.length > 0) {
        setTimeout(retryUnsentLeads, 2000);
      }
    })
    .catch(function () {
      // Silencioso — lo intentará en la próxima carga
    });
  }

  // ── Utilidades ──
  function getDeviceType() {
    var ua = navigator.userAgent || '';
    if (/Mobi|Android/i.test(ua)) return 'mobile';
    if (/Tablet|iPad/i.test(ua)) return 'tablet';
    return 'desktop';
  }

  function getUTM(param) {
    try {
      var url = new URL(window.location.href);
      return url.searchParams.get(param) || '';
    } catch (e) {
      return '';
    }
  }

  // ── Arranque ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', retryUnsentLeads);
  } else {
    retryUnsentLeads();
  }

})();
