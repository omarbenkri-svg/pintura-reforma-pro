"""A shareable finish guide built from the public site's existing service knowledge."""

from content import photo


QUESTIONS = [
    ('¿Qué superficie es?', 'Pared, suelo, escalones, baño o fachada. La misma textura no se trabaja igual en todos los sitios.'),
    ('¿Cómo está ahora?', 'Grietas, humedad, capas sueltas, juntas o desniveles cambian la preparación.'),
    ('¿Qué uso tendrá?', 'Agua, sol, roce, tránsito y limpieza diaria pesan tanto como el aspecto.'),
    ('¿Qué efecto buscas?', 'Color liso, matices de estuco o continuidad. Una foto ayuda; una muestra y la luz del espacio ayudan más.'),
    ('¿Qué incluye el presupuesto?', 'Preparación, materiales, protección, acabado y remates deben quedar claros.'),
    ('¿Qué cuidados necesitará?', 'Pregunta cuándo podrás usar la superficie y cómo limpiarla según el sistema aplicado.'),
]


def body():
    questions = ''.join(f'<li><span class="guide-num">{i:02}</span><div><h3>{q}</h3><p>{a}</p></div></li>'
                        for i, (q, a) in enumerate(QUESTIONS, 1))
    return f'''
<section class="guide-hero">
  <div class="container guide-hero-grid">
    <div>
      <nav class="breadcrumb" aria-label="Migas de pan"><ol><li><a href="/">Inicio</a></li><li aria-current="page">Guía de acabados</li></ol></nav>
      <p class="eyebrow">Guía para guardar o pasar</p>
      <h1>Una foto bonita no decide el acabado.</h1>
      <p class="lead">Lo decide dónde va, cómo está la base y el uso que tendrá. Elige un espacio y lo que buscas. Te contamos qué mirar antes de pedir presupuesto.</p>
      <a class="btn btn-primary" href="#orientacion">Encontrar una orientación</a>
    </div>
    <figure>{photo('mc-suelo-escalones', 'Pavimento continuo y escalones de una obra propia', '(min-width: 1024px) 42vw, 100vw', priority=True)}<figcaption>Obra propia · Pavimento y escalones</figcaption></figure>
  </div>
</section>
<section class="guide-tool" id="orientacion" aria-labelledby="guide-tool-title">
  <div class="container guide-tool-grid">
    <div><p class="eyebrow">Dos decisiones sencillas</p><h2 id="guide-tool-title">¿Dónde quieres cambiar el acabado?</h2><p>La respuesta orienta la conversación. Antes de aplicar nada hay que ver el soporte.</p></div>
    <div class="guide-panel">
      <div class="guide-fields"><div><label for="guide-space">Espacio</label><select id="guide-space"><option value="pared">Pared interior</option><option value="suelo">Suelo o escalones</option><option value="bano">Baño o ducha</option><option value="fachada">Fachada o exterior</option></select></div><div><label for="guide-goal">Lo que buscas</label><select id="guide-goal"><option value="color">Cambiar el color</option><option value="textura">Textura y matices</option><option value="continuidad">Una superficie continua</option></select></div></div>
      <button class="btn btn-primary" type="button" id="guide-show" disabled>Ver qué conviene mirar</button>
      <noscript><p>Las tres opciones están explicadas debajo. También puedes llamarnos o escribirnos sin usar esta selección.</p></noscript>
      <div class="guide-result" id="guide-result" role="status" aria-live="polite" tabindex="-1" hidden><p class="kicker">Una opción para valorar</p><h3 id="guide-title"></h3><p id="guide-why"></p><div class="guide-check"><strong>Antes de decidir</strong><p id="guide-check"></p></div><p id="guide-caveat"></p><div class="actions"><a class="btn btn-primary" id="guide-contact" href="/contacto?origen=guia_acabados" data-track="cta_presupuesto" data-origin="guia_acabados">Consultar mi caso</a><a class="btn-link" id="guide-wa" href="https://wa.me/34631714077" data-track="whatsapp_click" data-origin="guia_acabados">Enviar fotos por WhatsApp</a></div><a class="guide-detail" id="guide-detail" href="/pintura-viviendas">Leer sobre el acabado</a></div>
    </div>
  </div>
</section>
<section class="guide-options container" aria-labelledby="guide-options-title"><div class="guide-heading"><div><p class="eyebrow">El mapa completo</p><h2 id="guide-options-title">Tres caminos. Ningún atajo sobre una mala base.</h2></div><p>Son trabajos distintos. El estado de la superficie y el uso del espacio cambian la preparación.</p></div><div class="guide-option-grid"><article><span>01 / COLOR</span><h3>Pintura</h3><p>Para renovar paredes o techos. Las grietas, manchas y capas anteriores se revisan antes del color.</p><a href="/pintura-viviendas">Pintura de viviendas ↗</a></article><article><span>02 / MATERIA</span><h3>Estuco</h3><p>Para una pared con profundidad, brillo o textura trabajada a mano. Veneciano, marmolizado y Portland no buscan el mismo efecto.</p><a href="/decorativa-estucos">Estucos y acabados ↗</a></article><article><span>03 / CONTINUIDAD</span><h3>Microcemento</h3><p>Para suelos y paredes de aspecto continuo. En baños importan además la impermeabilización, las pendientes y los encuentros.</p><a href="/microcemento">Microcemento ↗</a></article></div></section>
<section class="guide-real" aria-labelledby="guide-real-title"><div class="container"><div class="guide-heading"><div><p class="eyebrow">Obras propias</p><h2 id="guide-real-title">Verlo de cerca ayuda a decidir.</h2></div><p>Una foto inspira. Para elegir un sistema en otra casa hay que ver el soporte y el uso.</p></div><div class="guide-real-grid"><a href="/caso-bano-microcemento">{photo('mc-bano-general', 'Baño revestido con microcemento', '(min-width: 700px) 45vw, 100vw')}<span>Baño de microcemento ↗</span></a><a href="/caso-fachada">{photo('fachada-despues-general', 'Fachada tras la reparación y pintura', '(min-width: 700px) 45vw, 100vw')}<span>Recuperar una fachada ↗</span></a></div></div></section>
<section class="guide-pocket" id="ficha" aria-labelledby="guide-pocket-title"><div class="container"><div class="guide-heading"><div><p class="eyebrow">Una hoja para guardar</p><h2 id="guide-pocket-title">Seis preguntas antes de elegir un acabado.</h2><p>Sirven para hablar con nosotros o con cualquier profesional.</p></div><a class="btn btn-secondary" href="/assets/ficha-acabados.pdf" download="Ficha-BCN-ProReforma.pdf" data-track="guide_pdf" data-origin="guia_acabados">Descargar la ficha en PDF</a></div><ol class="guide-pocket-list">{questions}</ol></div></section>
<section class="guide-pass" aria-labelledby="guide-pass-title"><div class="container guide-pass-grid"><div><p class="eyebrow">Todavía no vas a reformar</p><h2 id="guide-pass-title">Guarda esta guía para cuando alguien saque el tema.</h2><p>Se la puedes pasar a quien esté eligiendo entre pintar, estucar o hacer un acabado continuo. No necesita registrarse ni dejar su teléfono.</p></div><div><button class="btn btn-secondary" id="guide-share" type="button">Copiar enlace de la guía</button><p id="guide-share-status" role="status" aria-live="polite"></p></div></div></section>
<section class="guide-close container" aria-labelledby="guide-close-title"><div><h2 id="guide-close-title">Si ya tienes un trabajo en mente, lo miramos.</h2><p>Dinos el municipio y qué superficie quieres renovar. Unas fotos ayudan a situar el alcance.</p></div><a class="btn btn-primary" href="/contacto?origen=guia_acabados" data-track="cta_presupuesto" data-origin="guia_acabados_final">Pedir presupuesto</a></section>
''', None
