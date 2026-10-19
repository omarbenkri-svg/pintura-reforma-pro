"""Prototype B · Estudio: interior-studio direction (plan section 3, option 2).

Cool stone canvas, slate ink, terracotta used sparingly. Newsreader serif
for headlines, Geist for reading. Big photography, asymmetric spreads,
generous whitespace. Photos are never filtered: paint colours must stay true.
"""
from content import (
    CONFIG, SERVICES, SERVICE_BY_SLUG, SECONDARY, CASES, CASE_BY_SLUG, ALBUMS, HERO, PEOPLE,
    PREP_STEPS, PROCESS, FAQ, FAQ_NOTE, CTA_LABEL, WA_LABEL, CALL_LABEL,
    e, pend, pend_attr, wa_url, wa_message, tel_url, contact_url, photo, placeholder, icon,
    album_trigger, gremi_line,
)
from common import breadcrumb, contact_actions

LETTER = "B"
NAME = "Estudio"
DIR = "b-estudio"
FONTS = ("https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;"
         "0,6..72,600;1,6..72,400&family=Geist:wght@400;500;600&display=swap")


def header(active: str) -> str:
    def cur(key):
        return ' aria-current="page"' if key == active else ""

    sub = "".join(f'<li><a href="{s["slug"]}.html"{cur(s["slug"])}>{e(s["name"])}</a></li>' for s in SERVICES)
    return f"""<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="index.html"{cur("index")}>
      <span class="brand-mark">{CONFIG['brand']}</span>
    </a>
    <button type="button" class="menu-toggle" data-menu-toggle aria-expanded="false" aria-controls="menu">
      {icon('list')}<span>Menú</span>
    </button>
    <nav id="menu" class="site-nav" aria-label="Principal">
      <ul class="nav-list">
        <li><details class="nav-sub">
          <summary{' class="is-active"' if active in SERVICE_BY_SLUG else ''}>Pintura y servicios {icon('caret-down')}</summary>
          <ul>{sub}<li><a href="index.html#otros-servicios">Reformas y acabados</a></li></ul>
        </details></li>
        <li><a href="trabajos.html"{cur("trabajos")}>Trabajos</a></li>
        <li><a href="empresa.html"{cur("empresa")}>Empresa</a></li>
        <li><a href="contacto.html"{cur("contacto")}>Contacto</a></li>
      </ul>
      <a class="nav-phone" href="{tel_url()}" data-track="phone_click" data-origin="cabecera" aria-label="Llamar al {CONFIG['tel_display']}">{icon('phone')}<span>{CONFIG['tel_display']}</span></a>
      <a class="btn btn-primary nav-cta" href="contacto.html" data-track="cta_presupuesto" data-origin="cabecera">{CTA_LABEL}</a>
    </nav>
  </div>
</header>"""


def footer() -> str:
    return f"""<footer class="site-footer">
  <div class="container footer-top">
    <p class="footer-statement">Pintura y acabados para viviendas del Maresme y Barcelona, desde Cabrils.</p>
    <a class="btn btn-primary" href="contacto.html" data-track="cta_presupuesto" data-origin="pie">{CTA_LABEL}</a>
  </div>
  <div class="container footer-grid">
    <ul>
      <li><a href="{tel_url()}" data-track="phone_click" data-origin="pie">{CALL_LABEL} {CONFIG['tel_display']}</a></li>
      <li><a href="{wa_url(wa_message('pie de página'))}" data-track="whatsapp_click" data-origin="pie">WhatsApp {CONFIG['wa_display']}</a></li>
      <li><a href="mailto:{CONFIG['email']}">{CONFIG['email']}</a></li>
    </ul>
    <ul>
      <li><a href="pintura-viviendas.html">Pintura y servicios</a></li>
      <li><a href="trabajos.html">Trabajos</a></li>
      <li><a href="empresa.html">Empresa</a></li>
    </ul>
    <ul>
      <li><a href="../../blog/">Blog</a></li>
      <li><a href="privacidad.html">Privacidad</a></li>
    </ul>
  </div>
  <div class="container footer-bottom">
    <p>© 2026 {CONFIG['brand']} · {CONFIG['brand_web']}. {pend('Datos fiscales pendientes.', 'Titular según facturas: Mohamed Ben Mesaud, autónomo. Añadir titular y NIF en el pie o en un aviso legal')}</p>
  </div>
</footer>"""


def spread(c, flip=False) -> str:
    """Large 'after' photo with the 'before' photo overlapping its corner."""
    a_name, a_alt = c["after"][0]
    b_name, b_alt = c["before"][0]
    return f"""<article class="spread{' is-flipped' if flip else ''} reveal">
  <div class="spread-media">
    <figure class="spread-after">{photo(a_name, a_alt, "(min-width: 1024px) 55vw, 100vw")}<figcaption>Después</figcaption></figure>
    <figure class="spread-before">{photo(b_name, b_alt, "(min-width: 1024px) 22vw, 45vw")}<figcaption>Antes</figcaption></figure>
  </div>
  <div class="spread-text">
    <p class="meta">{e(c['service'])} · {c['municipio']}</p>
    <h3><a href="{c['slug']}.html">{c['title']}</a></h3>
    <p>{c['summary']}</p>
    <a class="btn-link" href="{c['slug']}.html">Leer el caso {icon('arrow-right')}</a>
  </div>
</article>"""


def qa_columns(items, note=FAQ_NOTE) -> str:
    rows = "".join(f'<div class="qa reveal" style="--i:{i % 2}"><h3>{e(q)}</h3><p>{e(a)}</p></div>'
                   for i, (q, a) in enumerate(items))
    return f'<div class="qa-grid" {pend_attr(note)}>{rows}</div>'


# ---------------------------------------------------------------- home


def home():
    fachada, madera, garaje = CASES
    body = f"""
<section class="hero">
  <div class="container">
    <p class="hero-kicker">{HERO['eyebrow']}</p>
    <h1>{HERO['h1']}</h1>
    <div class="hero-foot">
      <p class="hero-desc">{HERO['desc']}</p>
      {contact_actions("inicio_hero", None, "contacto.html?origen=inicio")}
    </div>
  </div>
  <div class="hero-mosaic container">
    <figure class="m-main">{photo("madera-despues-cristaleras", "Cerramiento de madera barnizado con cristaleras en un ático", "(min-width: 1024px) 60vw, 100vw", priority=True)}</figure>
    <figure class="m-side">{photo("madera-despues-marco", "Detalle del marco de madera barnizado junto al ladrillo", "(min-width: 1024px) 30vw, 50vw")}</figure>
    <figure class="m-side">{photo("fachada-despues-esquina", "Esquina de fachada terminada en color crema", "(min-width: 1024px) 30vw, 50vw")}</figure>
    <p class="m-caption">Barnizado de madera y fachada reparada. Obras propias.</p>
  </div>
</section>

<section class="studio" aria-labelledby="studio-title">
  <div class="container studio-grid">
    <h2 id="studio-title" class="studio-statement reveal">Una empresa familiar. Mohamed Ben Mesaud dirige el oficio y Omar te atiende de principio a fin.</h2>
    <div class="studio-side reveal" style="--i:1">
      {placeholder("Mohamed trabajando en una obra", "Retrato en obra, con luz natural.", "studio-photo")}
      <p>{PEOPLE['mohamed']['text']}</p>
      <p class="gremi">{gremi_line()}</p>
      <a class="btn-link" href="empresa.html">Conocer la empresa {icon('arrow-right')}</a>
    </div>
  </div>
</section>

<section class="cases-home" aria-labelledby="cases-title">
  <div class="container">
    <h2 id="cases-title" class="section-title">Trabajos, del estado inicial al acabado</h2>
    {spread(fachada)}
    <div class="case-pair">
      {"".join(f'''<article class="case-card reveal" style="--i:{i}">
        <a href="{c['slug']}.html" class="case-card-media">{photo(c['cover'], dict(c['after'])[c['cover']], "(min-width: 1024px) 40vw, 100vw")}</a>
        <p class="meta">{e(c['service'])}</p>
        <h3><a href="{c['slug']}.html">{c['title']}</a></h3>
        <p>{c['summary']}</p></article>''' for i, c in enumerate((madera, garaje)))}
    </div>
    <a class="btn-link more" href="trabajos.html">Todos los trabajos {icon('arrow-right')}</a>
  </div>
</section>

<section class="services" id="servicios" aria-labelledby="services-title">
  <div class="container">
    <h2 id="services-title" class="section-title">Pintura especializada</h2>
    <ol class="service-index">
      {"".join(f'''<li class="reveal" style="--i:{i}"><a href="{s['slug']}.html">
        <span class="si-n" aria-hidden="true">{i + 1}</span>
        <span class="si-name">{e(s['name'])}</span>
        <span class="si-desc">{e(s['short'])}</span>
        {icon('arrow-right')}</a></li>''' for i, s in enumerate(SERVICES))}
    </ol>
  </div>
</section>

<section class="prep" aria-labelledby="prep-title">
  <div class="container">
    <h2 id="prep-title" class="section-title">Protección y preparación: lo que explica el resultado y el precio</h2>
    <div class="bento">
      <figure class="b-photo b-first">{photo("garaje-antes", "Pared con el revestimiento desconchado antes de repararla", "(min-width: 1024px) 30vw, 100vw")}<figcaption>Un soporte así no se pinta: primero se repara.</figcaption></figure>
      {"".join(f'<div class="b-cell reveal" style="--i:{i}"><h3>{e(t)}</h3><p>{e(d)}</p></div>' for i, (t, d) in enumerate(PREP_STEPS))}
      <figure class="b-photo b-last">{photo("fachada-proceso-pintor", "Pintor trabajando en el muro de una fachada", "(min-width: 1024px) 40vw, 100vw")}<figcaption>Reparación del muro antes de pintar.</figcaption></figure>
    </div>
  </div>
</section>

<section class="process" aria-labelledby="process-title">
  <div class="container">
    <h2 id="process-title" class="section-title">Cómo se organiza una obra</h2>
    <ol class="process-list" {pend_attr("Pasos y compromisos pendientes de validar con Omar")}>
      {"".join(f'<li class="reveal" style="--i:{i}"><span class="p-n" aria-hidden="true">{i + 1}</span><div><h3>{e(t)}</h3><p>{e(d)}</p></div></li>' for i, (t, d) in enumerate(PROCESS))}
    </ol>
  </div>
</section>

<section class="reviews container" aria-labelledby="reviews-title" {pend_attr("Opiniones: publicar solo reseñas con procedencia comprobada y permiso")}>
  <h2 id="reviews-title">Opiniones de clientes</h2>
  <p>Reservado para opiniones con procedencia y permiso. No publicamos reseñas que no podamos acreditar.</p>
</section>

<section class="others" id="otros-servicios" aria-labelledby="others-title">
  <div class="container">
    <h2 id="others-title" class="section-title">También reformas y acabados</h2>
    <ul class="others-grid">
      {"".join(f'''<li class="reveal" style="--i:{i}"><h3>{e(t)}</h3><p>{e(d)}</p>{f'<a href="{slug}.html">Ver un caso</a>' if slug else f'<a href="{contact_url("reforma", "inicio_otros")}">{CTA_LABEL}</a>'}</li>''' for i, (t, d, slug) in enumerate(SECONDARY))}
    </ul>
  </div>
</section>

<section class="faq" aria-labelledby="faq-title">
  <div class="container">
    <h2 id="faq-title" class="section-title">Preguntas frecuentes</h2>
    {qa_columns(FAQ)}
  </div>
</section>

<section class="closing-band" aria-labelledby="closing-title">
  <div class="container closing-grid">
    <h2 id="closing-title">{HERO['support']}</h2>
    <div class="closing-actions">
      {contact_actions("inicio_final", None, "contacto.html?origen=inicio_final")}
      <a class="btn-link" href="{tel_url()}" data-track="phone_click" data-origin="inicio_final">{icon('phone')} {CALL_LABEL} al {CONFIG['tel_display']}</a>
    </div>
  </div>
</section>
"""
    return body, None


# ---------------------------------------------------------------- service


def service(s):
    first, *more = s["photos"]
    case = CASE_BY_SLUG.get(s["case"]) if s["case"] else None
    origin = f"servicio_{s['slug']}"
    related = spread(case) if case else (
        f'<div class="related-empty" {pend_attr("Documentar un caso propio de este servicio")}>'
        f'<p>Todavía no hemos publicado un caso documentado de este servicio.</p>'
        f'<a class="btn-link" href="trabajos.html">Ver otros trabajos {icon("arrow-right")}</a></div>'
    )
    body = f"""
<section class="svc-hero container">
  {breadcrumb([("index.html", "Inicio"), ("index.html#servicios", "Pintura y servicios"), (None, s['name'])])}
  <h1>{s['h1']}</h1>
  <div class="svc-hero-foot">
    <p class="lead">{s['intro']}</p>
    {contact_actions(origin, s['name'], contact_url(s['form'], origin))}
  </div>
</section>
<div class="container svc-wide">{placeholder(first[0], first[1], "wide-slot")}</div>

<section class="svc-split container" aria-labelledby="inc-title">
  <h2 id="inc-title" class="split-title">Qué incluye</h2>
  <ul class="inc-list" {pend_attr("Alcance pendiente de validar con Mohamed")}>
    {"".join(f'<li class="reveal" style="--i:{i % 3}">{e(x)}</li>' for i, x in enumerate(s['includes']))}
  </ul>
</section>

<section class="svc-split container" aria-labelledby="fac-title">
  <h2 id="fac-title" class="split-title">Qué influye en el precio</h2>
  <dl class="fac-list">
    {"".join(f'<div class="reveal" style="--i:{i}"><dt>{e(t)}</dt><dd>{e(d)}</dd></div>' for i, (t, d) in enumerate(s['factors']))}
  </dl>
</section>

<section class="svc-photos container" aria-labelledby="ph-title">
  <h2 id="ph-title" class="section-title">Así trabajamos</h2>
  <div class="slot-row">{"".join(placeholder(t, d) for t, d in more)}</div>
  {related}
</section>

<section class="faq" aria-labelledby="sfaq-title">
  <div class="container">
    <h2 id="sfaq-title" class="section-title">Dudas sobre {s['name'].lower()}</h2>
    {qa_columns(s['faq'])}
  </div>
</section>

<section class="closing-band" aria-labelledby="closing-title">
  <div class="container closing-grid">
    <h2 id="closing-title">Indica el municipio y qué quieres renovar. Si tienes fotos, envíalas por WhatsApp.</h2>
    <div class="closing-actions">{contact_actions(origin + "_final", s['name'], contact_url(s['form'], origin))}</div>
  </div>
</section>
"""
    return body, None


# ---------------------------------------------------------------- works


def works():
    spreads = "".join(spread(c, flip=i % 2 == 1) for i, c in enumerate(CASES))
    albums = "".join(f"""
      <li class="album">
        {photo(a['cover'], a['cover_alt'], "(min-width: 1024px) 22vw, 70vw")}
        <h3>{e(a['title'])}</h3>
        <p>{e(a['note'])}</p>
        {album_trigger(k, f"Ver {len(a['photos'])} fotos", "btn-link")}
      </li>""" for k, a in ALBUMS.items())
    body = f"""
<section class="page-head container">
  {breadcrumb([("index.html", "Inicio"), (None, "Trabajos")])}
  <h1>Trabajos</h1>
  <p class="lead">Obras documentadas con su estado inicial, la preparación y el resultado. Más abajo, fotos agrupadas por tipo de trabajo.</p>
</section>
<section class="container works-spreads" aria-label="Casos documentados">{spreads}</section>
<section class="albums" aria-labelledby="albums-title">
  <div class="container">
    <h2 id="albums-title" class="section-title">Álbumes por tipo de trabajo</h2>
    <p class="albums-note">Un álbum puede reunir varias obras del mismo tipo. Los casos de arriba documentan una obra concreta.</p>
  </div>
  <ul class="album-strip container" tabindex="0" aria-label="Álbumes, desplazable en horizontal">{albums}</ul>
</section>
"""
    return body, list(ALBUMS)


# ---------------------------------------------------------------- case


def case(c):
    origin = c["slug"]

    def figs(items, sizes):
        return "".join(f'<figure>{photo(n, a, sizes)}<figcaption>{e(a)}</figcaption></figure>' for n, a in items)

    process = (
        f"""<section class="chapter container" aria-labelledby="ch-proc">
      <h2 id="ch-proc" class="split-title">Durante la obra</h2>
      <div class="chapter-body"><div class="masonry">{figs(c['process'], "(min-width: 1024px) 30vw, 50vw")}</div></div>
    </section>""" if c["process"] else ""
    )
    review = f'<p class="case-review" {pend_attr(c["review"])}>{e(c["review"])}</p>' if c["review"] else ""
    others = "".join(f'<li><a href="{o["slug"]}.html">{e(o["title"])}</a></li>' for o in CASES if o is not c)
    body = f"""
<section class="case-hero container">
  {breadcrumb([("index.html", "Inicio"), ("trabajos.html", "Trabajos"), (None, c['title'])])}
  <p class="meta">{e(c['service'])}</p>
  <h1>{c['title']}</h1>
  <dl class="facts">
    <div><dt>Municipio</dt><dd>{c['municipio']}</dd></div>
    <div><dt>Superficie y duración</dt><dd>{pend("No publicadas", "Añadir solo si se conocen con certeza")}</dd></div>
    <div><dt>Acabado</dt><dd>{c['product']}</dd></div>
  </dl>
  {review}
</section>

<div class="case-compare container">
  <figure>{photo(c['before'][0][0], c['before'][0][1], "(min-width: 1024px) 45vw, 100vw", priority=True)}<figcaption>Antes. {e(c['before'][0][1])}</figcaption></figure>
  <figure>{photo(c['after'][0][0], c['after'][0][1], "(min-width: 1024px) 45vw, 100vw", priority=True)}<figcaption>Después. {e(c['after'][0][1])}</figcaption></figure>
</div>

<section class="chapter container" aria-labelledby="ch-before">
  <h2 id="ch-before" class="split-title">Estado inicial</h2>
  <div class="chapter-body">
    <p class="chapter-text">{c['need']}</p>
    <div class="masonry">{figs(c['before'][1:], "(min-width: 1024px) 30vw, 50vw")}</div>
  </div>
</section>

<section class="chapter container" aria-labelledby="ch-prep">
  <h2 id="ch-prep" class="split-title">Preparación</h2>
  <div class="chapter-body"><p class="chapter-text">{c['prep']}</p></div>
</section>
{process}
<section class="chapter container" aria-labelledby="ch-after">
  <h2 id="ch-after" class="split-title">Resultado</h2>
  <div class="chapter-body">
    <p class="chapter-text">{c['finish']}</p>
    <div class="masonry">{figs(c['after'][1:], "(min-width: 1024px) 30vw, 50vw")}</div>
    <p>{album_trigger(c['album'], f"Ver las {len(ALBUMS[c['album']]['photos'])} fotos del álbum", "btn-link")}</p>
  </div>
</section>

<section class="closing-band" aria-labelledby="closing-title">
  <div class="container closing-grid">
    <h2 id="closing-title">¿Tienes un trabajo parecido? Cuéntanos qué necesitas y en qué municipio.</h2>
    <div class="closing-actions">
      {contact_actions(origin, c['service'], contact_url(c['form'], origin))}
      <p class="also">Otros casos:</p>
      <ul class="also-list">{others}</ul>
    </div>
  </div>
</section>
"""
    return body, [c["album"]]
