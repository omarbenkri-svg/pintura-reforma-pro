import {getGuide, spaces, goals} from './guia-core.mjs';

const space = document.getElementById('guide-space');
const goal = document.getElementById('guide-goal');
const show = document.getElementById('guide-show');
const result = document.getElementById('guide-result');
const share = document.getElementById('guide-share');
const shareStatus = document.getElementById('guide-share-status');
const params = new URLSearchParams(location.search);
const fromShare = params.get('origen') === 'compartida';
let hasSelection = spaces.includes(params.get('espacio')) && goals.includes(params.get('busco'));

if (spaces.includes(params.get('espacio'))) space.value = params.get('espacio');
if (goals.includes(params.get('busco'))) goal.value = params.get('busco');
show.disabled = false;
share.hidden = false;
if (typeof navigator.share === 'function') share.textContent = 'Compartir esta guía';

function shareUrl() {
  const url = new URL('/guia-acabados', location.origin);
  url.searchParams.set('origen', 'compartida');
  if (hasSelection) {
    url.searchParams.set('espacio', space.value);
    url.searchParams.set('busco', goal.value);
  }
  return url.href;
}

function render({focus = true, updateUrl = true} = {}) {
  const guidance = getGuide(space.value, goal.value);
  if (!guidance) return;
  for (const [id, value] of Object.entries({
    'guide-title': guidance.title,
    'guide-why': guidance.why,
    'guide-check': guidance.check,
    'guide-caveat': guidance.caveat,
  })) document.getElementById(id).textContent = value;
  document.getElementById('guide-detail').href = guidance.detail;
  const origin = fromShare ? 'guia_compartida' : 'guia_acabados';
  document.getElementById('guide-contact').href = `/contacto?servicio=${encodeURIComponent(guidance.service)}&origen=${origin}`;
  const message = `Hola, os escribo desde la guía de acabados. Quiero valorar ${guidance.title.toLowerCase()}. Mi municipio es: `;
  document.getElementById('guide-wa').href = `https://wa.me/34631714077?text=${encodeURIComponent(message)}`;
  result.hidden = false;
  if (focus) result.focus();
  hasSelection = true;
  if (updateUrl) {
    const url = new URL(location.href);
    url.search = new URLSearchParams({espacio: space.value, busco: goal.value, ...(fromShare ? {origen: 'compartida'} : {})}).toString();
    history.replaceState(null, '', url);
  }
  if (typeof window.track === 'function') window.track('guide_result', {espacio: space.value, busco: goal.value});
}

show.addEventListener('click', () => render());
if (hasSelection) render({focus: false, updateUrl: false});
space.addEventListener('change', () => { if (!result.hidden) render({focus: false}); });
goal.addEventListener('change', () => { if (!result.hidden) render({focus: false}); });

if (fromShare) {
  const closingLink = document.querySelector('.guide-close a[href^="/contacto"]');
  if (closingLink) closingLink.href = '/contacto?origen=guia_compartida';
}

share.addEventListener('click', async () => {
  if (['localhost', '127.0.0.1'].includes(location.hostname)) {
    shareStatus.textContent = 'El enlace local solo funciona en este ordenador. Podrás compartirlo cuando la guía esté publicada.';
    return;
  }
  const url = shareUrl();
  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({title: 'Pintura, estuco o microcemento',
        text: 'Por si algún día sale el tema: esta guía ayuda a comparar acabados antes de decidir.', url});
      shareStatus.textContent = 'Guía compartida.';
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    shareStatus.textContent = 'Enlace copiado. Ya puedes compartirlo.';
  } catch {
    shareStatus.textContent = 'No se pudo copiar. Selecciona la dirección del navegador para compartirla.';
  }
});
