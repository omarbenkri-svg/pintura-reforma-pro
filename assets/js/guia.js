import {getGuide, spaces, goals} from './guia-core.mjs';

const space = document.getElementById('guide-space');
const goal = document.getElementById('guide-goal');
const show = document.getElementById('guide-show');
const result = document.getElementById('guide-result');
const share = document.getElementById('guide-share');
const shareStatus = document.getElementById('guide-share-status');
const params = new URLSearchParams(location.search);

if (spaces.includes(params.get('espacio'))) space.value = params.get('espacio');
if (goals.includes(params.get('busco'))) goal.value = params.get('busco');
show.disabled = false;

show.addEventListener('click', () => {
  const guidance = getGuide(space.value, goal.value);
  if (!guidance) return;
  for (const [id, value] of Object.entries({
    'guide-title': guidance.title,
    'guide-why': guidance.why,
    'guide-check': guidance.check,
    'guide-caveat': guidance.caveat,
  })) document.getElementById(id).textContent = value;
  document.getElementById('guide-detail').href = guidance.detail;
  document.getElementById('guide-contact').href = `/contacto?servicio=${encodeURIComponent(guidance.service)}&origen=guia_acabados`;
  const message = `Hola, os escribo desde la guía de acabados. Quiero valorar ${guidance.title.toLowerCase()}. Mi municipio es: `;
  document.getElementById('guide-wa').href = `https://wa.me/34631714077?text=${encodeURIComponent(message)}`;
  result.hidden = false;
  result.focus();
  const url = new URL(location.href);
  url.search = new URLSearchParams({espacio: space.value, busco: goal.value}).toString();
  history.replaceState(null, '', url);
  if (typeof window.track === 'function') window.track('guide_result', {espacio: space.value, busco: goal.value});
});

share.addEventListener('click', async () => {
  if (['localhost', '127.0.0.1'].includes(location.hostname)) {
    shareStatus.textContent = 'El enlace local solo funciona en este ordenador. Podrás compartirlo cuando la guía esté publicada.';
    return;
  }
  try {
    await navigator.clipboard.writeText(location.href);
    shareStatus.textContent = 'Enlace copiado. Ya puedes compartirlo.';
  } catch {
    shareStatus.textContent = 'No se pudo copiar. Selecciona la dirección del navegador para compartirla.';
  }
});
