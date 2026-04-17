/* =============================================================
   TRACKING UNIFICADO — dataLayer para GTM / GA4
   Proyecto: Pintura, Reformas y Acabados de Obra
   
   INSTRUCCIONES:
   1. Incluye este script DESPUÉS de lead-webhook.js en tu HTML.
   2. Asegúrate de que el snippet de GTM ya está en tu <head>.
   3. Este script captura 3 eventos:
      - leadCapturado   → lead de la calculadora
      - error404        → usuario aterriza en 404
      - ctaWhatsApp     → click en cualquier botón de WhatsApp
   ============================================================= */

(function () {
  'use strict';

  // Asegurar que dataLayer existe
  window.dataLayer = window.dataLayer || [];

  // ══════════════════════════════════════════════════════════
  //  EVENTO: Lead capturado en calculadora
  // ══════════════════════════════════════════════════════════
  window.addEventListener('leadCapturado', function (e) {
    var d = e.detail || {};
    window.dataLayer.push({
      event: 'generate_lead',
      lead_source: 'calculadora_presupuesto',
      lead_service: d.servicio || '',
      lead_metros: d.metros || 0,
      lead_device: getDeviceType(),
      page_url: window.location.href
    });
  });

  // ══════════════════════════════════════════════════════════
  //  EVENTO: Página 404
  // ══════════════════════════════════════════════════════════
  window.addEventListener('error404', function (e) {
    var d = e.detail || {};
    window.dataLayer.push({
      event: 'page_not_found',
      error_url: d.url || window.location.href,
      error_referrer: d.referrer || document.referrer || 'directo'
    });
  });

  // ══════════════════════════════════════════════════════════
  //  EVENTO: Click en cualquier CTA de WhatsApp
  // ══════════════════════════════════════════════════════════
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="wa.me"]');
    if (!link) return;

    window.dataLayer.push({
      event: 'whatsapp_click',
      wa_source: identifyWASource(link),
      page_url: window.location.href,
      page_section: getClosestSection(link)
    });
  });

  // ══════════════════════════════════════════════════════════
  //  EVENTO: Scroll depth (25%, 50%, 75%, 100%)
  // ══════════════════════════════════════════════════════════
  var scrollThresholds = [25, 50, 75, 100];
  var scrollFired = {};

  window.addEventListener('scroll', throttle(function () {
    var scrollPct = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );

    for (var i = 0; i < scrollThresholds.length; i++) {
      var t = scrollThresholds[i];
      if (scrollPct >= t && !scrollFired[t]) {
        scrollFired[t] = true;
        window.dataLayer.push({
          event: 'scroll_depth',
          scroll_percentage: t,
          page_url: window.location.href
        });
      }
    }
  }, 200));

  // ══════════════════════════════════════════════════════════
  //  EVENTO: Tiempo en página (30s, 60s, 120s, 300s)
  // ══════════════════════════════════════════════════════════
  var timeThresholds = [30, 60, 120, 300];

  timeThresholds.forEach(function (seconds) {
    setTimeout(function () {
      // Solo disparar si la pestaña está activa
      if (!document.hidden) {
        window.dataLayer.push({
          event: 'time_on_page',
          time_seconds: seconds,
          page_url: window.location.href
        });
      }
    }, seconds * 1000);
  });

  // ══════════════════════════════════════════════════════════
  //  UTILIDADES
  // ══════════════════════════════════════════════════════════
  function getDeviceType() {
    var ua = navigator.userAgent || '';
    if (/Mobi|Android/i.test(ua)) return 'mobile';
    if (/Tablet|iPad/i.test(ua)) return 'tablet';
    return 'desktop';
  }

  function identifyWASource(el) {
    // Intenta identificar de dónde viene el click al WA
    if (el.closest('.calc-step-3')) return 'calculadora';
    if (el.closest('.error-card')) return 'pagina_404';
    if (el.closest('nav, .navbar')) return 'navbar';
    if (el.closest('.hero')) return 'hero';
    if (el.closest('footer, .footer')) return 'footer';
    if (el.id) return el.id;
    return 'otro';
  }

  function getClosestSection(el) {
    var section = el.closest('section[id], [data-section]');
    if (section) return section.id || section.getAttribute('data-section') || 'unknown';
    return 'unknown';
  }

  function throttle(fn, wait) {
    var last = 0;
    return function () {
      var now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn.apply(this, arguments);
      }
    };
  }

})();
