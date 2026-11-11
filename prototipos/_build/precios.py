"""/precios-pintura: orientative prices, November 2026, VAT excluded.

Copy from prototipos/docs/2026-11-contenido-seo.md (section A). Figures come
from content.PRICE_SECTIONS, the same source as the service pages and JSON-LD.
"""
import content as C
from common import breadcrumb, contact_actions
from theme_a import faq_list

SLUG = "precios-pintura"
TITLE = "Precios de pintura en el Maresme y Barcelona 2026"
H1 = "Precios de pintura en el Maresme y Barcelona"
DESC = ("Precios orientativos de pintura sin IVA (nov. 2026): pisos, habitaciones, gotelé, lacado, fachadas, "
        "estucos y microcemento. Presupuesto tras la visita.")
ORIGIN = "precios_pintura"

NOTES = {
    "Pintura de viviendas": "Los €/m² se refieren a la superficie pintada (paredes y techos), no a los metros del suelo. "
                            "Un piso de 80 m² útiles tiene entre 250 y 280 m² de paredes y techos. Precios sin IVA.",
    "Fachadas, comunidades y garajes": "El andamio, si hace falta, va en una partida aparte. En fachadas, las grietas y "
                                       "desconchados se reparan antes de pintar y se presupuestan según su estado.",
}

INCLUDED = [
    "Protección de suelos, muebles, puertas y enchufes antes de empezar.",
    "Reparación de agujeros, golpes y fisuras finas.",
    "Imprimación donde el soporte la pide.",
    "Dos manos de pintura plástica de calidad media-alta, en blanco o en un color claro.",
    "Limpieza diaria y retirada de protecciones al terminar.",
]
EXTRA = ("quitar gotelé, tratar humedades, puertas, marcos y radiadores, colores intensos que pidan una tercera mano, "
         "andamio y permisos municipales.")

FACTORS = [
    ("Superficie real a pintar", "Se miden paredes y techos, no el suelo."),
    ("Estado de las paredes", "Gotelé, grietas, humedades o pintura vieja que se levanta."),
    ("Vivienda vacía o amueblada", "Mover y proteger muebles suele sumar entre un 10 y un 20 %."),
    ("Altura de techos y molduras", "Los techos de más de 3 metros y las molduras de yeso llevan más horas."),
    ("Cambio de color", "Pasar de un tono oscuro a uno claro puede pedir una mano más."),
    ("Tipo de pintura", "Plástica estándar, antimanchas, antihumedad o pintura de exterior."),
    ("Accesos", "Escaleras sin ascensor, aparcamiento, andamio o permiso de ocupación de la acera."),
    ("Cercanía al mar", "En exterior, el salitre y el sol obligan a sanear más el soporte y a usar sistemas de exterior."),
]

TIMES = [
    "Una habitación: 1 a 2 días.",
    "Piso de 80 m² vacío y en buen estado: 3 a 5 días laborables.",
    "Piso de 80 m² con gotelé: 8 a 12 días laborables.",
    "Baño de microcemento: 5 a 8 días, más el curado del sellado antes de usar la ducha.",
    "Fachada de casa unifamiliar: 1 a 2 semanas, según el tiempo y las reparaciones.",
]

FAQ = [
    ("¿Cuánto cuesta pintar un piso de 80 m² en el Maresme o Barcelona?",
     "Si está vacío y las paredes están en buen estado, entre 1.800 y 2.600 € sin IVA, con paredes, techos, material y dos manos. "
     "Si está amueblado, entre 2.100 y 3.000 €. Si hay gotelé, humedades o puertas que lacar, se presupuestan aparte."),
    ("¿Los precios incluyen IVA?",
     "No. Todos los precios de esta página son sin IVA. En la vivienda habitual de particulares y en comunidades de propietarios "
     "suele aplicarse el IVA reducido del 10 %, siempre que los materiales no superen el 40 % del presupuesto. "
     "Te indicamos el tipo que corresponde en el presupuesto."),
    ("¿El precio por m² es de suelo o de pared?",
     "Es de superficie pintada: paredes y techos. Un piso de 80 m² útiles tiene entre 250 y 280 m² de paredes y techos. "
     "Por eso también damos un precio por vivienda completa, que es más fácil de comparar."),
    ("¿Cuánto cuesta quitar el gotelé?",
     "Tapar el gotelé, alisar la pared y pintarla cuesta entre 16 y 28 €/m² sin IVA. Depende del grosor de la gota, de si la "
     "pintura antigua está bien adherida y de si también hay gotelé en los techos. En la visita decidimos si se tapa con plaste "
     "o hay que retirarlo."),
    ("¿Cuánto cuesta lacar las puertas de casa?",
     "Lacar una puerta de paso en casa, con las dos caras y el marco, cuesta entre 120 y 220 € sin IVA. Las puertas con "
     "cuarterones, cristales o barniz en mal estado están en la parte alta. Las hojas de armario empotrado empiezan en 70 € cada una."),
    ("¿Qué precio tiene el estuco veneciano?",
     "Entre 40 y 80 €/m² sin IVA, según el tipo de estuco y el número de capas. El estuco marmolizado a la cal está entre 45 y "
     "90 €/m². La pared tiene que estar muy plana; si no lo está, el alisado previo va aparte."),
    ("¿Cuánto cuesta un baño de microcemento?",
     "El microcemento en baño, con paredes y suelo, está entre 80 y 130 €/m² sin IVA. Un baño pequeño completo suele quedar "
     "entre 2.000 y 3.500 €, según las piezas que haya que revestir: plato de ducha, hornacinas o encimera."),
    ("¿Cuánto cuesta pintar una fachada?",
     "Sobre un soporte sano, entre 14 y 30 €/m² sin IVA. La reparación de grietas y desconchados y el andamio, si hace falta, "
     "se presupuestan aparte. Cerca del mar recomendamos un sistema de exterior más resistente al salitre."),
    ("¿Cuánto se tarda en pintar un piso?",
     "Un piso de 80 m² vacío y en buen estado se pinta en 3 a 5 días laborables. Amueblado, en 4 a 6 días. Si hay que quitar el "
     "gotelé, entre 8 y 12 días, porque el alisado necesita secar antes de lijar y pintar."),
    ("¿Por qué el precio final puede ser distinto del orientativo?",
     "Porque depende de lo que hay que preparar, y eso solo se ve en la obra: humedades, grietas, gotelé o la altura de los "
     "techos. Por eso, después de la visita, te enviamos un presupuesto cerrado y por escrito con lo que incluye y lo que no."),
]


def table(name, rows, i) -> str:
    body = "".join(
        f'<tr><th scope="row">{C.e(r[1])}</th><td data-label="Desde">{C.e(C.price_from(r))}</td>'
        f'<td data-label="Rango orientativo">{C.e(C.price_range(r))}</td></tr>' for r in rows)
    note = f'<caption>{C.e(NOTES[name])}</caption>' if name in NOTES else ""
    return f"""<section class="price-section container" aria-labelledby="pt-{i}">
  <h2 id="pt-{i}">{C.e(name)}</h2>
  <table class="price-table">{note}
    <thead><tr><th scope="col">Trabajo</th><th scope="col">Desde</th><th scope="col">Rango orientativo</th></tr></thead>
    <tbody>{body}</tbody>
  </table>
</section>"""


def body() -> str:
    cfg = C.CONFIG
    tables = "\n".join(table(n, rows, i) for i, (n, rows) in enumerate(C.PRICE_SECTIONS, 1))
    return f"""
<section class="page-head container">
  {breadcrumb([("index.html", "Inicio"), (None, "Precios de pintura")])}
  <h1>{H1}</h1>
  <p class="lead">Estos son los precios orientativos con los que trabajamos en noviembre de 2026 para pintura de viviendas, alisados, lacados, estucos, microcemento, fachadas y comunidades en el Maresme y Barcelona. Son precios <strong>sin IVA</strong>, con mano de obra y material incluidos, para superficies en buen estado. Sirven para que te hagas una idea antes de llamarnos. El precio que firmas es el del presupuesto cerrado que te enviamos por escrito después de ver la obra.</p>
  <p class="price-updated">Precios actualizados en noviembre de 2026.</p>
  {contact_actions(ORIGIN, None, "contacto.html?origen=" + ORIGIN)}
</section>
{tables}
<section class="svc-includes container" aria-labelledby="inc-title">
  <h2 id="inc-title">Qué incluye el precio</h2>
  <ul class="check-list">
    {"".join(f'<li>{C.icon("check")}<span>{C.e(i)}</span></li>' for i in INCLUDED)}
  </ul>
  <p><strong>Va aparte y se indica en el presupuesto:</strong> {C.e(EXTRA)}</p>
</section>

<section class="svc-factors" aria-labelledby="fac-title">
  <div class="container">
    <h2 id="fac-title">De qué depende el precio</h2>
    <dl class="factor-grid">
      {"".join(f'<div class="reveal" style="--i:{i}"><dt>{C.e(t)}</dt><dd>{C.e(d)}</dd></div>' for i, (t, d) in enumerate(FACTORS))}
    </dl>
  </div>
</section>

<section class="price-section container" aria-labelledby="time-title">
  <h2 id="time-title">Plazos orientativos</h2>
  <ul class="price-steps">{"".join(f'<li>{C.e(t)}</li>' for t in TIMES)}</ul>
  <p>Más detalle por servicio: <a href="pintura-viviendas.html">pintura de viviendas</a>, <a href="alisados-lacados.html">alisados y lacados</a>, <a href="decorativa-estucos.html">estucos</a> y <a href="microcemento.html">microcemento</a>.</p>
</section>

<section class="svc-faq" aria-labelledby="pfaq-title">
  <div class="container faq-grid">
    <div>
      <h2 id="pfaq-title">Preguntas sobre precios</h2>
      {faq_list(FAQ)}
    </div>
    <aside class="final-cta" aria-labelledby="pcta-title">
      <h2 id="pcta-title">¿Quieres saber cuánto costaría en tu casa?</h2>
      <p>Mándanos fotos y los metros aproximados por WhatsApp al {cfg['wa_display']} o llámanos al {cfg['tel_display']}, de lunes a sábado de 8:00 a 20:00. Te damos una primera orientación y, si quieres seguir, visitamos la obra y te enviamos el presupuesto por escrito.</p>
      {contact_actions(ORIGIN + "_final", None, "contacto.html?origen=" + ORIGIN)}
      <a class="btn-link" href="{C.tel_url()}" data-track="phone_click" data-origin="{ORIGIN}">{C.icon('phone')} {C.CALL_LABEL} al {cfg['tel_display']}</a>
      <p class="hours">{C.icon("clock")} {cfg['hours_text']}</p>
    </aside>
  </div>
</section>
"""


def ld(site: str, offer_ld) -> list:
    url = f"{site}/{SLUG}"
    return [
        {"@type": "Service", "name": "Pintura de viviendas y acabados", "url": url, "serviceType": "Pintura",
         "provider": {"@id": f"{site}/#negocio"}, "areaServed": "Maresme y Barcelona",
         "offers": [offer_ld(r) for _, rows in C.PRICE_SECTIONS for r in rows]},
        {"@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in FAQ]},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Inicio", "item": f"{site}/"},
            {"@type": "ListItem", "position": 2, "name": "Precios de pintura", "item": url}]},
    ]
