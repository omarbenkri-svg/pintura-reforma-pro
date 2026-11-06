"""Prototype A · Oficio: evolves the current brand (plan section 4, literally).

Ivory, deep blue, copper. Inter. Photo and explanation alternate; cards only
where the visitor chooses a service or a job.
"""
from content import (
    CONFIG, SERVICES, SERVICE_BY_SLUG, SECONDARY, CASES, CASE_BY_SLUG, ALBUMS, HERO, PEOPLE,
    PREP_STEPS, PROCESS, FAQ, FAQ_NOTE, CTA_LABEL, WA_LABEL, CALL_LABEL,
    PROD, RATING, REVIEWS, e, pend, pend_attr, wa_url, wa_message, tel_url, contact_url, photo, placeholder, icon,
    album_trigger, gremi_line, case_pair, video_block, rich, svc_hero, svc_slots, svc_gallery,
)
from common import breadcrumb, contact_actions

LETTER = "A"
NAME = "Oficio"
DIR = "a-oficio"
# Proposal 2026-11: Geist for text, Cabinet Grotesk (Fontshare) for headings.
# Loaded from their CDNs for review; self-host only after approval and a licence check.
FONTS = "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap"
FONTS_DISPLAY = "https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&display=swap"


# ---------------------------------------------------------------- chrome


def header(active: str) -> str:
    def cur(key):
        return ' aria-current="page"' if key == active else ""

    svc_active = active in SERVICE_BY_SLUG
    sub = "".join(f'<li><a href="{s["slug"]}.html"{cur(s["slug"])}>{e(s["name"])}</a></li>' for s in SERVICES)
    return f"""<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="index.html"{cur("index")}>
      <span class="brand-name">{CONFIG['brand']}</span>
      <span class="brand-web">{CONFIG['tagline']} · {CONFIG['area']}</span>
    </a>
    <button type="button" class="menu-toggle" data-menu-toggle aria-expanded="false" aria-controls="menu">
      {icon('list')}<span>Menú</span>
    </button>
    <nav id="menu" class="site-nav" aria-label="Principal">
      <ul class="nav-list">
        <li><details class="nav-sub">
          <summary{' class="is-active"' if svc_active else ''}>Pintura y servicios {icon('caret-down')}</summary>
          <ul>{sub}<li><a href="index.html#otros-servicios">Reformas y acabados</a></li></ul>
        </details></li>
        <li><a href="trabajos.html"{cur("trabajos")}>Trabajos</a></li>
        {('<li><a href="guia-acabados.html"' + cur('guia-acabados') + '>Guía</a></li>') if PROD else ''}
        <li><a href="empresa.html"{cur("empresa")}>Empresa</a></li>
        <li><a href="contacto.html"{cur("contacto")}>Contacto</a></li>
      </ul>
      <a class="nav-phone" href="{tel_url()}" data-track="phone_click" data-origin="cabecera">{icon('phone')}<span>{CONFIG['tel_display']}</span></a>
      <a class="btn btn-primary nav-cta" href="contacto.html" data-track="cta_presupuesto" data-origin="cabecera">{CTA_LABEL}</a>
    </nav>
  </div>
</header>"""


def footer() -> str:
    return f"""<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-about">
      <p class="footer-brand">{CONFIG['brand']}</p>
      <p>{CONFIG['tagline']}. Empresa familiar con base en Cabrils, miembro del Gremi de Pintors.</p>
    </div>
    <div>
      <h2>Contacto</h2>
      <ul>
        <li><a href="{tel_url()}" data-track="phone_click" data-origin="pie">{CALL_LABEL} al {CONFIG['tel_display']}</a></li>
        <li><a href="{wa_url(wa_message('pie de página'))}" data-track="whatsapp_click" data-origin="pie">WhatsApp {CONFIG['wa_display']}</a></li>
        <li><a href="mailto:{CONFIG['email']}">{CONFIG['email']}</a></li>
      </ul>
    </div>
    <div>
      <h2>La web</h2>
      <ul>
        <li><a href="pintura-viviendas.html">Pintura y servicios</a></li>
        <li><a href="trabajos.html">Trabajos</a></li>
        {'<li><a href="guia-acabados.html">Guía de acabados</a></li>' if PROD else ''}
        <li><a href="empresa.html">Empresa</a></li>
        <li><a href="../../blog/">Blog</a></li>
        <li><a href="privacidad.html">Privacidad</a></li>
        <li><a href="aviso-legal.html">Aviso legal</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© 2026 {CONFIG['legal_name']} · {CONFIG['brand']}.</p>
  </div>
</footer>"""


# ---------------------------------------------------------------- pieces


def before_after(c, cls="ba") -> str:
    (b_name, b_alt, b_lab), (a_name, a_alt, a_lab) = case_pair(c)
    return f"""<div class="{cls}">
  <figure>{photo(b_name, b_alt, "(min-width: 1024px) 25vw, 50vw")}<figcaption>{b_lab}</figcaption></figure>
  <figure>{photo(a_name, a_alt, "(min-width: 1024px) 25vw, 50vw")}<figcaption>{a_lab}</figcaption></figure>
</div>"""


def faq_list(items, note=FAQ_NOTE) -> str:
    rows = "".join(
        f'<details class="faq-item"><summary>{e(q)}</summary><p>{rich(a)}</p></details>' for q, a in items
    )
    return f'<div class="faq-list" {pend_attr(note)}>{rows}</div>'


def reviews_block() -> str:
    if PROD:
        return ""  # withdrawn on 03/11/2026, see REVIEWS in content.py
    if not PROD:
        return f"""<section class="reviews container" aria-labelledby="reviews-title" {pend_attr("Opiniones: publicar solo reseñas con procedencia comprobada y permiso")}>
  <h2 id="reviews-title">Opiniones de clientes</h2>
  <p>Este espacio mostrará opiniones de clientes con su procedencia y su permiso. No publicamos reseñas que no podamos acreditar.</p>
</section>"""
    quotes = "".join(f'<figure class="quote"><blockquote><p>{e(t)}</p></blockquote><figcaption>{e(n)}, reseña en Google</figcaption></figure>' for n, t in REVIEWS)
    return f"""<section class="reviews-live" aria-labelledby="reviews-title">
  <div class="container">
    <h2 id="reviews-title">Lo que dicen nuestros clientes</h2>
    <p class="rating"><strong>{RATING['value'].replace('.', ',')} de 5</strong> en Google, con {RATING['count']} reseñas.</p>
    <div class="quote-grid">{quotes}</div>
  </div>
</section>"""


# ---------------------------------------------------------------- home


def home():
    """Proposal 2026-11 «oficio a la vista»: painting first, own works before promises."""
    fachada = CASE_BY_SLUG["caso-fachada"]
    garaje = CASE_BY_SLUG["caso-garaje-comunitario"]
    madera = CASE_BY_SLUG["caso-carpinteria-madera"]
    estuco = SERVICE_BY_SLUG["decorativa-estucos"]
    micro = SERVICE_BY_SLUG["microcemento"]
    gremi = '<a href="https://www.gremipintors.com/directori#:~:text=Mohamed%20Ben%20Mesaud">ver el directorio del Gremi</a>'
    others = " · ".join(
        (f'<a href="{slug}.html">{e(t)}</a>' if slug else e(t)) for t, d, slug in SECONDARY)
    body = f"""
<section class="hero-o" aria-labelledby="hero-title">
  <div class="hero-o-grid">
    <div class="hero-o-copy">
      <p class="eyebrow">{HERO['eyebrow']}</p>
      <h1 id="hero-title">{HERO['h1']}</h1>
      <p class="hero-desc">{HERO['desc']}</p>
      {contact_actions("inicio_hero", "pintura de vivienda", contact_url("pintura-vivienda", "inicio"))}
      <p class="hero-call">¿Prefieres hablar? <a href="{tel_url()}" data-track="phone_click" data-origin="inicio_hero">{CALL_LABEL} al {CONFIG['tel_display']}</a></p>
      <ul class="hero-proof">
        <li>{icon('check')}<span>Presupuesto por escrito, después de ver la obra</span></li>
        <li>{icon('check')}<span>Empresa familiar con base en Cabrils</span></li>
        <li>{icon('check')}<span>Agremiados en el Gremi de Pintors: {gremi}</span></li>
      </ul>
    </div>
    <div class="hero-o-media">
      <figure class="hero-o-main">
        {photo("fachada-despues-esquina", "Pilar y muro de una fachada reparados y pintados en color crema", "(min-width: 1024px) 52vw, 100vw", priority=True)}
        <figcaption><strong>Después.</strong> Pilar reparado y pintado. Obra propia.</figcaption>
      </figure>
      <figure class="hero-o-inset">
        {photo("fachada-antes-pilar", "Pilar de la misma fachada con el revoque desprendido antes de la obra", "(min-width: 1024px) 18vw, 40vw")}
        <figcaption><strong>Antes.</strong> Revoque desprendido.</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="obras" aria-labelledby="obras-title">
  <div class="container">
    <div class="sec-head">
      <p class="eyebrow">Obras propias</p>
      <h2 id="obras-title">Trabajos de pintura, tal como quedaron</h2>
      <p>Fotos de obras nuestras y lo que se hizo en cada una.</p>
    </div>
    <div class="obras-grid">
      <article class="obra obra-lead reveal">
        {photo("fachada-despues-general", "Fachada terminada en color crema con la puerta del garaje gris", "(min-width: 1024px) 45vw, 100vw")}
        <p class="kicker">Fachada · reparación y pintura</p>
        <h3><a href="{fachada['slug']}.html">{fachada['title']}</a></h3>
        <p>{fachada['summary']}</p>
      </article>
      <article class="obra reveal" style="--i:1">
        {photo("garaje-despues-zocalo", "Pared de garaje con zócalo gris y franja roja de señalización", "(min-width: 1024px) 22vw, 50vw")}
        <p class="kicker">Comunidad · garaje</p>
        <h3><a href="{garaje['slug']}.html">Zócalo y señalización con corte limpio</a></h3>
      </article>
      <article class="obra reveal" style="--i:2">
        {photo("madera-despues-terraza", "Cerramiento de madera de un ático barnizado", "(min-width: 1024px) 22vw, 50vw")}
        <p class="kicker">Carpintería · barniz</p>
        <h3><a href="{madera['slug']}.html">Madera recuperada en un ático</a></h3>
      </article>
    </div>
    <a class="btn-link" href="trabajos.html">Ver todos los trabajos {icon('arrow-right')}</a>
  </div>
</section>

<section class="prep" aria-labelledby="prep-title">
  <div class="container prep-grid">
    <figure class="prep-photo">
      {photo("fachada-proceso-escalera", "Muro en reparación con una escalera apoyada y las zonas saneadas a la vista", "(min-width: 1024px) 35vw, 100vw")}
      <figcaption>Antes del color: reparar el soporte.</figcaption>
    </figure>
    <div>
      <p class="eyebrow">Qué incluye</p>
      <h2 id="prep-title">Pintar bien empieza antes de abrir el bote</h2>
      <p class="prep-lead">Por eso dos presupuestos de pintura no siempre son comparables: pregunta qué preparación incluye cada uno.</p>
      <ol class="prep-list">
        {"".join(f'<li class="reveal" style="--i:{i}"><h3>{e(t)}</h3><p>{e(d)}</p></li>' for i, (t, d) in enumerate(PREP_STEPS))}
      </ol>
      <a class="btn-link" href="pintura-viviendas.html">Pintura de viviendas {icon('arrow-right')}</a>
    </div>
  </div>
</section>

<section class="espec" id="servicios" aria-labelledby="espec-title">
  <div class="container">
    <div class="sec-head">
      <p class="eyebrow">Otros acabados</p>
      <h2 id="espec-title">Cuando la pared pide algo más que color</h2>
    </div>
    <div class="espec-row reveal">
      {photo(estuco['hero'][0], "Pared con acabado decorativo de aguas, obra propia", "(min-width: 1024px) 30vw, 100vw")}
      <div><h3><a href="{estuco['slug']}.html">{estuco['name']}</a></h3><p>{estuco['short']}</p></div>
    </div>
    <div class="espec-row espec-alt reveal">
      {photo("mc-suelo-salon", "Suelo continuo de microcemento en una estancia amplia", "(min-width: 1024px) 30vw, 100vw")}
      <div><h3><a href="{micro['slug']}.html">{micro['name']}</a></h3><p>{micro['short']}</p></div>
    </div>
    <p class="espec-more" id="otros-servicios">También: <a href="alisados-lacados.html">quitar gotelé y lacar puertas</a> · {others}.</p>
    {'<p class="guide-line">¿Aún estás eligiendo? <a href="guia-acabados.html">Guía para comparar pintura, estuco y microcemento</a>, sin registro.</p>' if PROD else ''}
  </div>
</section>

<section class="process" aria-labelledby="process-title">
  <div class="container">
    <h2 id="process-title">De la consulta al presupuesto</h2>
    <ol class="process-list" {pend_attr("Pasos y compromisos pendientes de validar con Omar")}>
      {"".join(f'<li class="reveal" style="--i:{i}"><span class="step-n" aria-hidden="true">{i + 1}</span><h3>{e(t)}</h3><p>{e(d)}</p></li>' for i, (t, d) in enumerate(PROCESS))}
    </ol>
  </div>
</section>

{reviews_block()}

<section class="faq-contact" aria-labelledby="faq-title">
  <div class="container faq-grid">
    <div>
      <h2 id="faq-title">Preguntas frecuentes</h2>
      {faq_list(FAQ)}
    </div>
    <aside class="final-cta" aria-labelledby="final-title">
      <h2 id="final-title">Pide una valoración</h2>
      <p>{HERO['support']}</p>
      {contact_actions("inicio_final", None, "contacto.html?origen=inicio_final")}
      <a class="btn-link" href="{tel_url()}" data-track="phone_click" data-origin="inicio_final">{icon('phone')} {CALL_LABEL} al {CONFIG['tel_display']}</a>
    </aside>
  </div>
</section>
"""
    return body, None


# ---------------------------------------------------------------- service


def service(s):
    case = CASE_BY_SLUG.get(s["case"]) if s["case"] else None
    origin = f"servicio_{s['slug']}"
    more = "".join(
        f'<p><a class="btn-link" href="{CASE_BY_SLUG[k]["slug"]}.html">{e(CASE_BY_SLUG[k]["title"])} {icon("arrow-right")}</a></p>'
        for k in s.get("more_cases", []))
    if case:
        related = f"""<article class="related-case">
          {before_after(case)}
          <div><p class="kicker">Caso relacionado</p><h3><a href="{case['slug']}.html">{case['title']}</a></h3><p>{case['summary']}</p>{more}</div>
        </article>"""
    elif PROD:
        related = ""  # the public site never advertises what is missing
    else:
        related = f"""<div class="related-empty" {pend_attr("Documentar un caso propio de este servicio")}>
          <p>Todavía no hemos publicado un caso documentado de este servicio.</p>
          <a class="btn-link" href="trabajos.html">Ver otros trabajos {icon('arrow-right')}</a></div>"""
    photos = svc_gallery(s) + "".join(placeholder(t, d) for t, d in svc_slots(s))
    work = ""
    if photos or related:
        row = f'<div class="svc-photo-row">{photos}</div>' if photos else ""
        heading = "Así trabajamos" if photos else "Obras de este servicio"
        work = f'''<section class="svc-photos container" aria-labelledby="ph-title">
  <h2 id="ph-title">{heading}</h2>
  {row}
  {related}
</section>'''
    others = "".join(
        f'<li><a href="{o["slug"]}.html">{e(o["name"])}</a></li>' for o in SERVICES if o is not s
    )
    body = f"""
<section class="svc-hero">
  <div class="container svc-hero-grid">
    <div>
      {breadcrumb([("index.html", "Inicio"), ("index.html#servicios", "Pintura y servicios"), (None, s['name'])])}
      <h1>{s['h1']}</h1>
      <p class="lead">{s['intro']}</p>
      {contact_actions(origin, s['name'], contact_url(s['form'], origin))}
    </div>
    {svc_hero(s, "(min-width: 1024px) 40vw, 100vw", "svc-hero-photo")}
  </div>
</section>

<section class="svc-includes container" aria-labelledby="inc-title">
  <h2 id="inc-title">Qué incluye</h2>
  <ul class="check-list" {pend_attr("Alcance pendiente de validar con Mohamed")}>
    {"".join(f'<li>{icon("check")}<span>{rich(i)}</span></li>' for i in s['includes'])}
  </ul>
</section>

<section class="svc-factors" aria-labelledby="fac-title">
  <div class="container">
    <h2 id="fac-title">Qué influye en el precio</h2>
    <dl class="factor-grid">
      {"".join(f'<div class="reveal" style="--i:{i}"><dt>{e(t)}</dt><dd>{e(d)}</dd></div>' for i, (t, d) in enumerate(s['factors']))}
    </dl>
  </div>
</section>

{work}

<section class="svc-faq" aria-labelledby="sfaq-title">
  <div class="container faq-grid">
    <div>
      <h2 id="sfaq-title">Dudas sobre {s['name'].lower()}</h2>
      {faq_list(s['faq'])}
    </div>
    <aside class="final-cta">
      <h2>Pide una valoración</h2>
      <p>Indica el municipio y qué superficies quieres renovar. Si tienes fotos, envíalas por WhatsApp.</p>
      {contact_actions(origin + "_final", s['name'], contact_url(s['form'], origin))}
      <p class="also">Otros servicios:</p>
      <ul class="also-list">{others}</ul>
    </aside>
  </div>
</section>
"""
    return body, None


# ---------------------------------------------------------------- works


def muni_line(c) -> str:
    return f'<p class="muni">{icon("map-pin")} {c["municipio"]}</p>' if c["municipio"] else ""


def works():
    cases = "".join(f"""
    <article class="case-row reveal">
      {before_after(c)}
      <div class="case-row-text">
        <p class="kicker">{e(c['service'])}</p>
        <h3><a href="{c['slug']}.html">{c['title']}</a></h3>
        <p>{c['summary']}</p>
        {muni_line(c)}
      </div>
    </article>""" for c in CASES)
    albums = "".join(f"""
    <li class="album-card reveal" style="--i:{i}">
      {photo(a['cover'], a['cover_alt'], "(min-width: 1024px) 20vw, 50vw")}
      <h3>{e(a['title'])}</h3>
      <p>{e(a['note'])}</p>
      {album_trigger(k, f"Ver {len(a['photos'])} fotos", "btn-link")}
    </li>""" for i, (k, a) in enumerate(ALBUMS.items()))
    body = f"""
<section class="page-head container">
  {breadcrumb([("index.html", "Inicio"), (None, "Trabajos")])}
  <h1>Trabajos</h1>
  <p class="lead">Obras documentadas con su preparación y su resultado. Más abajo, fotos agrupadas por tipo de trabajo.</p>
</section>
<section class="cases container" aria-labelledby="cases-title">
  <h2 id="cases-title">Casos documentados</h2>
  {cases}
</section>
<section class="albums" aria-labelledby="albums-title">
  <div class="container">
    <h2 id="albums-title">Álbumes por tipo de trabajo</h2>
    <p class="albums-note">Un álbum agrupa fotos de un mismo tipo de trabajo y puede incluir varias obras. Los casos de arriba documentan una obra concreta.</p>
    <ul class="album-grid">{albums}</ul>
  </div>
</section>
"""
    return body, list(ALBUMS)


# ---------------------------------------------------------------- case


def case(c):
    origin = c["slug"]

    def gallery(items, cls):
        return f'<div class="case-gallery {cls}">' + "".join(
            f'<figure>{photo(n, a, "(min-width: 1024px) 30vw, 50vw")}<figcaption>{e(a)}</figcaption></figure>'
            for n, a in items) + "</div>"

    finish = f"{c['finish']} {c['product']}." if c["product"] else c["finish"]
    surface = pend("No publicadas", "Añadir solo si se conocen con certeza")
    facts = [("Servicio", e(c['service'])), ("Municipio", c['municipio']), ("Superficie y duración", surface)]
    process = (
        f"""<section class="case-step container" aria-labelledby="st-proc">
      <h2 id="st-proc">Durante la obra</h2>
      {gallery(c['process'], 'g-process')}
    </section>""" if c["process"] else ""
    )
    others = "".join(
        f'<li><a href="{o["slug"]}.html">{e(o["title"])}</a></li>' for o in CASES if o is not c
    )
    # Editorial notes are for review mode only: they must never reach the public site.
    review = f'<p class="case-review" {pend_attr(c["review"])}>{e(c["review"])}</p>' if c["review"] and not PROD else ""
    body = f"""
<section class="case-head">
  <div class="container case-head-grid">
    <div>
      {breadcrumb([("index.html", "Inicio"), ("trabajos.html", "Trabajos"), (None, c['title'])])}
      <h1>{c['title']}</h1>
      <p class="lead">{c['summary']}</p>
      <dl class="case-facts">
        {"".join(f'<div><dt>{t}</dt><dd>{v}</dd></div>' for t, v in facts if v)}
      </dl>
      {review}
    </div>
    <figure class="case-hero-photo">
      {photo(c['after'][0][0], c['after'][0][1], "(min-width: 1024px) 40vw, 100vw", priority=True)}
      <figcaption>Resultado final.</figcaption>
    </figure>
  </div>
</section>

<section class="case-step container" aria-labelledby="st-before">
  <h2 id="st-before">Estado inicial</h2>
  <p class="step-text">{c['need']}</p>
  {gallery(c['before'], 'g-before')}
</section>

<section class="case-step case-prep" aria-labelledby="st-prep">
  <div class="container">
    <h2 id="st-prep">Preparación</h2>
    <p class="step-text">{c['prep']}</p>
  </div>
</section>
{process}
<section class="case-step container" aria-labelledby="st-after">
  <h2 id="st-after">Resultado</h2>
  <p class="step-text">{finish}</p>
  {gallery(c['after'][1:], 'g-after')}
  {video_block(c)}
  <p>{album_trigger(c['album'], f"Ver las {len(ALBUMS[c['album']]['photos'])} fotos del álbum {ALBUMS[c['album']]['title'].lower()}", "btn-link")}</p>
</section>

<section class="case-cta">
  <div class="container case-cta-grid">
    <div>
      <h2>¿Tienes un trabajo parecido?</h2>
      <p>Cuéntanos qué necesitas y en qué municipio. Te indicaremos el siguiente paso.</p>
      {contact_actions(origin, c['service'], contact_url(c['form'], origin))}
    </div>
    <div>
      <h2 class="h-small">Otros casos</h2>
      <ul class="also-list">{others}</ul>
    </div>
  </div>
</section>
"""
    return body, [c["album"]]
