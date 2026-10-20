/* Shared behaviour for the three BCN ProReforma prototypes.
 *
 * Progressive enhancement only: every page is fully readable and navigable
 * without this file. Nothing here hides essential content (lesson from the
 * invisible-H1 bug): motion only applies to `.reveal` blocks below the hero.
 * The lead form never sends data; a demo panel picks the simulated outcome.
 */
(function () {
  'use strict';
  var html = document.documentElement;

  /* ---------- simulated measurement (no personal data, console only) ---------- */
  window.track = function (name, props) {
    console.info('[medición simulada]', name, props || {});
  };
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest('[data-track]');
    if (t) window.track(t.dataset.track, { origen: t.dataset.origin || null });
  });

  /* ---------- navigation ---------- */
  var menuBtn = document.querySelector('[data-menu-toggle]');
  var menu = menuBtn && document.getElementById(menuBtn.getAttribute('aria-controls'));
  function setMenu(open) {
    if (!menuBtn) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
  }
  document.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Escape') return;
    document.querySelectorAll('details.nav-sub[open]').forEach(function (d) {
      d.open = false;
      d.querySelector('summary').focus();
    });
    if (menuBtn && menuBtn.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuBtn.focus();
    }
  });
  document.addEventListener('click', function (ev) {
    document.querySelectorAll('details.nav-sub[open]').forEach(function (d) {
      if (!d.contains(ev.target)) d.open = false;
    });
  });

  /* Keep the mobile contact bar away from the on-screen keyboard. */
  document.addEventListener('focusin', function (ev) {
    if (ev.target.matches('input, textarea, select')) html.classList.add('typing');
  });
  document.addEventListener('focusout', function () { html.classList.remove('typing'); });

  /* ---------- reveal on scroll (enhancement over visible content) ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window &&
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    html.classList.add('motion');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    window.addEventListener('beforeprint', function () {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    });
  }

  /* ---------- lightbox ---------- */
  var dlg = document.querySelector('dialog.lightbox');
  var albumsEl = document.getElementById('albums-data');
  if (dlg && albumsEl && typeof dlg.showModal === 'function') {
    var albums = JSON.parse(albumsEl.textContent);
    var lbImg = dlg.querySelector('.lb-img');
    var lbCap = dlg.querySelector('.lb-caption');
    var lbTitle = dlg.querySelector('.lb-title');
    var lbCount = dlg.querySelector('.lb-count');
    var current = null, index = 0, opener = null, startX = null;

    var render = function () {
      var p = current.photos[index];
      lbImg.src = p.src;
      lbImg.alt = p.alt;
      lbCap.textContent = p.alt;
      lbCount.textContent = (index + 1) + ' de ' + current.photos.length;
      var next = current.photos[(index + 1) % current.photos.length];
      (new Image()).src = next.src;
    };
    var step = function (d) {
      index = (index + d + current.photos.length) % current.photos.length;
      render();
    };
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest('[data-album]');
      if (!a || !albums[a.dataset.album]) return;
      ev.preventDefault();
      opener = a;
      current = albums[a.dataset.album];
      index = parseInt(a.dataset.index || '0', 10);
      lbTitle.textContent = current.title;
      render();
      dlg.showModal();
      window.track('album_open', { album: a.dataset.album });
    });
    dlg.querySelector('.lb-prev').addEventListener('click', function () { step(-1); });
    dlg.querySelector('.lb-next').addEventListener('click', function () { step(1); });
    dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (ev) { if (ev.target === dlg) dlg.close(); });
    dlg.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowLeft') step(-1);
      if (ev.key === 'ArrowRight') step(1);
    });
    dlg.addEventListener('pointerdown', function (ev) { startX = ev.clientX; });
    dlg.addEventListener('pointerup', function (ev) {
      if (startX === null) return;
      var dx = ev.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
    });
    dlg.addEventListener('close', function () {
      lbImg.removeAttribute('src');
      if (opener) opener.focus();
    });
  }

  /* ---------- review mode: highlight and list everything pending ---------- */
  var reviewBtn = document.querySelector('.review-toggle');
  var panel = null;
  function buildPanel() {
    var items = document.querySelectorAll('.pend[data-note], [data-pending]');
    panel = document.createElement('aside');
    panel.className = 'review-panel';
    panel.setAttribute('aria-labelledby', 'review-title');
    var h = document.createElement('h2');
    h.id = 'review-title';
    h.textContent = 'Pendiente de confirmar en esta página (' + items.length + ')';
    var ol = document.createElement('ol');
    items.forEach(function (el, i) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = el.dataset.note || el.dataset.pending;
      b.addEventListener('click', function () {
        el.scrollIntoView({ block: 'center' });
        el.classList.remove('flash');
        void el.offsetWidth;
        el.classList.add('flash');
      });
      li.appendChild(b);
      ol.appendChild(li);
      el.setAttribute('data-review-n', String(i + 1));
    });
    panel.appendChild(h);
    panel.appendChild(ol);
    document.body.appendChild(panel);
  }
  function setReview(on) {
    html.classList.toggle('review', on);
    if (reviewBtn) reviewBtn.setAttribute('aria-pressed', String(on));
    if (on && !panel) buildPanel();
    if (panel) panel.hidden = !on;
    try { localStorage.setItem('proto-review', on ? '1' : '0'); } catch (err) { /* storage unavailable */ }
  }
  if (reviewBtn) {
    reviewBtn.addEventListener('click', function () { setReview(!html.classList.contains('review')); });
    var saved = null;
    try { saved = localStorage.getItem('proto-review'); } catch (err) { /* storage unavailable */ }
    if (saved === '1') setReview(true);
  }

  /* ---------- lead form ---------- */
  var form = document.querySelector('[data-lead-form]');
  if (!form) return;

  var WA = 'https://wa.me/34631714077?text=';
  var TEL = 'tel:+34639058819';
  var alertBox = form.querySelector('.form-alert');
  var success = document.querySelector('.form-success');
  var submit = form.querySelector('button[type="submit"]');
  var waDynamic = form.querySelector('[data-wa-dynamic]');
  var sending = false;
  var attempted = false;
  var knownTowns = Array.prototype.map.call(
    document.querySelectorAll('#municipios option'), function (o) { return o.value.toLowerCase(); });

  var params = new URLSearchParams(location.search);
  if (params.get('servicio')) {
    var pre = form.querySelector('input[name="trabajo"][value="' + CSS.escape(params.get('servicio')) + '"]');
    if (pre) pre.checked = true;
  }
  if (params.get('origen')) form.elements.origen.value = params.get('origen');

  var rules = {
    telefono: function () {
      var d = form.elements.telefono.value.replace(/[\s.\-()]/g, '');
      if (!d) return 'Escribe un teléfono para que podamos contactarte.';
      if (!/^(\+|00)?\d{9,15}$/.test(d)) return 'Revisa el teléfono: debe tener al menos 9 cifras.';
      return '';
    },
    municipio: function () {
      return form.elements.municipio.value.trim() ? '' : 'Indica el municipio donde está la obra.';
    },
    trabajo: function () {
      return form.querySelector('input[name="trabajo"]:checked') ? '' : 'Elige el tipo de trabajo que más se parece al tuyo.';
    }
  };

  function showError(name, msg) {
    var err = form.querySelector('#err-' + name);
    err.textContent = msg;
    err.hidden = !msg;
    form.querySelectorAll('[name="' + name + '"]').forEach(function (i) {
      if (msg) i.setAttribute('aria-invalid', 'true'); else i.removeAttribute('aria-invalid');
    });
    var box = err.closest('.field');
    if (box) box.classList.toggle('has-error', !!msg);
  }
  function validate() {
    var first = null;
    Object.keys(rules).forEach(function (name) {
      var msg = rules[name]();
      showError(name, msg);
      if (msg && !first) first = form.querySelector('[name="' + name + '"]');
    });
    return first;
  }
  function selectedLabel() {
    var r = form.querySelector('input[name="trabajo"]:checked');
    return r ? r.parentElement.textContent.trim() : '';
  }
  function updateWhatsApp() {
    if (!waDynamic) return;
    var msg = 'Hola, os escribo desde la web (formulario de contacto). Quiero pedir valoración para ' +
      (selectedLabel() ? selectedLabel().toLowerCase() : 'un trabajo') + '. Mi municipio es: ' +
      form.elements.municipio.value.trim();
    waDynamic.href = WA + encodeURIComponent(msg);
  }
  function townNote() {
    var v = form.elements.municipio.value.trim().toLowerCase();
    document.getElementById('note-municipio').hidden = !v || knownTowns.indexOf(v) !== -1;
  }
  form.addEventListener('input', function (ev) {
    if (attempted && rules[ev.target.name]) showError(ev.target.name, rules[ev.target.name]());
    if (ev.target.name === 'municipio') townNote();
    updateWhatsApp();
  });
  form.addEventListener('change', function (ev) {
    if (attempted && rules[ev.target.name]) showError(ev.target.name, rules[ev.target.name]());
    updateWhatsApp();
  });
  updateWhatsApp();

  function makeRef() {
    var d = new Date();
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var rand = '';
    for (var i = 0; i < 4; i++) rand += chars[Math.floor(Math.random() * chars.length)];
    return 'BCN-' + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + '-' + rand;
  }
  function setBusy(on) {
    sending = on;
    submit.disabled = on;
    submit.textContent = on ? submit.dataset.busy : submit.dataset.label;
    form.classList.toggle('is-sending', on);
    form.setAttribute('aria-busy', String(on));
  }
  function setAlert(kind, htmlText) {
    alertBox.className = 'form-alert is-' + kind;
    alertBox.innerHTML = htmlText;
    alertBox.hidden = !htmlText;
  }
  function failure(kind) {
    var ref = form.elements.ref.value;
    var wa = WA + encodeURIComponent('Hola, he intentado enviar una solicitud desde la web (referencia ' + ref +
      ') y no se ha podido completar. Quiero pedir valoración para ' + (selectedLabel() || 'un trabajo').toLowerCase() +
      ' en ' + form.elements.municipio.value.trim() + '.');
    var text = kind === 'error'
      ? '<p><strong>No hemos podido registrar tu solicitud.</strong> Lo que has escrito sigue en el formulario.</p>'
      : '<p><strong>No hemos podido confirmar si tu solicitud llegó.</strong> Se cortó la conexión mientras se enviaba. ' +
        'Si reintentas, usaremos la misma referencia (' + ref + ') para no duplicarla.</p>';
    setAlert(kind, text +
      '<div class="alert-actions">' +
      '<button type="button" class="btn btn-primary" data-retry>' +
      (kind === 'error' ? 'Reintentar' : 'Reintentar con la misma referencia') + '</button>' +
      '<a class="btn-link" href="' + wa + '" data-track="whatsapp_click" data-origin="error_formulario">Escribir por WhatsApp</a>' +
      '<a class="btn-link" href="' + TEL + '" data-track="phone_click" data-origin="error_formulario">Llamar</a></div>');
    alertBox.querySelector('[data-retry]').focus();
    window.track(kind === 'error' ? 'lead_receiver_error' : 'lead_unconfirmed', { ref: ref });
  }
  function done() {
    var ref = form.elements.ref.value;
    form.hidden = true;
    success.hidden = false;
    success.querySelector('.ok-ref').textContent = ref;
    success.querySelector('.ok-wa').href = WA + encodeURIComponent(
      'Hola, os envío fotos para la solicitud ' + ref + ' que he hecho en la web.');
    success.focus();
    window.track('lead_received', { ref: ref, origen: form.elements.origen.value });
  }
  function send() {
    if (sending) return;
    setAlert('', '');
    setBusy(true);
    window.track('lead_submit', { trabajo: form.elements.trabajo.value, origen: form.elements.origen.value });
    if (form.dataset.endpoint) { realSend(); return; }
    var outcome = (form.querySelector('input[name="demo"]:checked') || {}).value || 'ok';
    window.setTimeout(function () {
      setBusy(false);
      if (outcome === 'ok') done();
      else failure(outcome);
    }, 1400);
  }

  /* Real delivery to the Apps Script receiver. text/plain avoids a CORS
   * preflight that Apps Script cannot answer. Only a readable 2xx answer
   * counts as received; an error answer keeps the data; a lost connection
   * is reported as unconfirmed (it may or may not have arrived). */
  function payload() {
    var el = form.elements;
    var q = new URLSearchParams(location.search);
    return {
      ref: el.ref.value,
      nombre: el.nombre.value.trim(),
      telefono: el.telefono.value.trim(),
      email: '',
      municipio: el.municipio.value.trim(),
      servicio: selectedLabel(),
      descripcion: el.descripcion.value.trim(),
      metros: el.superficie.value,
      fecha_deseada: el.fecha.value,
      presupuesto: el.presupuesto.value,
      fuente: 'web_v2_formulario',
      origen: el.origen.value,
      pagina: location.pathname,
      referrer: document.referrer || 'directo',
      dispositivo: window.matchMedia('(max-width: 767px)').matches ? 'movil' : 'escritorio',
      utm_source: q.get('utm_source') || '',
      utm_medium: q.get('utm_medium') || '',
      utm_campaign: q.get('utm_campaign') || '',
      timestamp: new Date().toISOString()
    };
  }
  function realSend() {
    var ctrl = 'AbortController' in window ? new AbortController() : null;
    var timer = window.setTimeout(function () { if (ctrl) ctrl.abort(); }, 20000);
    fetch(form.dataset.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload()),
      redirect: 'follow',
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (res) {
      if (!res.ok) throw new Error('http ' + res.status);
      return res.text();
    }).then(function (text) {
      var data = null;
      try { data = JSON.parse(text); } catch (err) { /* plain-text answer is fine */ }
      window.clearTimeout(timer);
      setBusy(false);
      if (data && (data.ok === false || data.status === 'error' || data.result === 'error')) failure('error');
      else done();
    }).catch(function (err) {
      window.clearTimeout(timer);
      setBusy(false);
      failure(/^http /.test(err.message) ? 'error' : 'network');
    });
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (sending) return;
    attempted = true;
    var first = validate();
    if (first) {
      setAlert('invalid', '<p><strong>Faltan datos para enviar la solicitud.</strong> Revisa los campos marcados.</p>');
      first.focus();
      return;
    }
    if (!form.elements.ref.value) form.elements.ref.value = makeRef();
    send();
  });
  alertBox.addEventListener('click', function (ev) {
    if (ev.target.closest('[data-retry]')) send();
  });
})();
