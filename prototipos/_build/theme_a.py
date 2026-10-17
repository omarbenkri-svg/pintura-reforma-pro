"""Prototype A · Oficio: evolves the current brand (plan section 4, literally).

Ivory, deep blue, copper. Inter. Photo and explanation alternate; cards only
where the visitor chooses a service or a job.
"""
from content import (
    CONFIG, SERVICES, SERVICE_BY_SLUG, SECONDARY, CASES, CASE_BY_SLUG, ALBUMS, HERO, PEOPLE,
    PREP_STEPS, PROCESS, FAQ, FAQ_NOTE, CTA_LABEL, WA_LABEL, CALL_LABEL,
    e, pend, pend_attr, wa_url, wa_message, tel_url, contact_url, photo, placeholder, icon,
    album_trigger, gremi_line,
)
from common import breadcrumb, contact_actions

LETTER = "A"
NAME = "Oficio"
DIR = "a-oficio"
FONTS = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"


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
      <span class="brand-web">{CONFIG['brand_web']} · {CONFIG['area']}</span>
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
      <p>Empresa familiar de pintura con base en Cabrils. Trabajamos en el Maresme y Barcelona.</p>
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
        <li><a href="empresa.html">Empresa</a></li>
        <li><a href="../../blog/">Blog</a></li>
        <li><a href="privacidad.html">Privacidad</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© 2026 {CONFIG['brand']}. {pend('Datos fiscales pendientes.', 'Añadir razón social y NIF en el pie')}</p>
  </div>
</footer>"""


# ---------------------------------------------------------------- pieces


def before_after(c, cls="ba") -> str:
    b_name, b_alt = c["before"][0]
    a_name, a_alt = c["after"][0]
    return f"""<div class="{cls}">
  <figure>{photo(b_name, b_alt, "(min-width: 1024px) 25vw, 50vw")}<figcaption>Antes</figcaption></figure>
  <figure>{photo(a_name, a_alt, "(min-width: 1024px) 25vw, 50vw")}<figcaption>Después</figcaption></figure>
</div>"""


def faq_list(items, note=FAQ_NOTE) -> str:
    rows = "".join(
        f'<details class="faq-item"><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q, a in items
    )
    return f'<div class="faq-list" {pend_attr(note)}>{rows}</div>'


# ---------------------------------------------------------------- home


def home():
    fachada, madera, garaje = CASES
    m = PEOPLE["mohamed"]
    services = SERVICES
    lead, *rest = services
    body = f"""
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">{HERO['eyebrow']}</p>
      <h1>{HERO['h1']}</h1>
      <p class="hero-desc">{HERO['desc']}</p>
      {contact_actions("inicio_hero", None, "contacto.html?origen=inicio")}
    </div>
    <figure class="hero-photo">
      {photo("fachada-despues-general", "Fachada de una vivienda reparada y pintada en color crema", "(min-width: 1024px) 40vw, 100vw", priority=True)}
      <figcaption>Fachada reparada y pintada. Obra propia.</figcaption>
    </figure>
  </div>
</section>

<section class="oficio" aria-labelledby="oficio-title">
  <div class="container oficio-grid">
    {placeholder("Mohamed trabajando en una obra", "Retrato en obra, con luz natural.", "oficio-photo")}
    <div class="oficio-text reveal">
      <h2 id="oficio-title">{m['name']}, al frente del oficio</h2>
      <p>Una empresa familiar con trato directo durante todo el proyecto. Mohamed valora cada superficie y supervisa la obra; Omar te atiende y coordina visitas y presupuestos.</p>
      <p class="gremi">{gremi_line()}</p>
      <a class="btn-link" href="empresa.html">Conocer la empresa {icon('arrow-right')}</a>
    </div>
  </div>
</section>

<section class="works" aria-labelledby="works-title">
  <div class="container">
    <h2 id="works-title">Trabajos con antes y después</h2>
    <div class="works-grid">
      <article class="work-feature reveal">
        {before_after(fachada)}
        <div class="work-text">
          <h3><a href="{fachada['slug']}.html">{fachada['title']}</a></h3>
          <p>{fachada['summary']}</p>
        </div>
      </article>
      <div class="work-side">
        {"".join(f'''<article class="work-mini reveal" style="--i:{i + 1}">
          {photo(c["cover"], dict(c["after"])[c["cover"]], "(min-width: 1024px) 15vw, 40vw")}
          <div><h3><a href="{c['slug']}.html">{c['title']}</a></h3><p>{c['summary']}</p></div>
        </article>''' for i, c in enumerate((madera, garaje)))}
        <a class="btn-link" href="trabajos.html">Ver todos los trabajos {icon('arrow-right')}</a>
      </div>
    </div>
  </div>
</section>

<section class="services" id="servicios" aria-labelledby="services-title">
  <div class="container">
    <h2 id="services-title">Pintura especializada</h2>
    <div class="services-grid">
      <a class="service-card service-lead reveal" href="{lead['slug']}.html">
        {placeholder(lead['photos'][0][0], lead['photos'][0][1])}
        <h3>{lead['name']}</h3>
        <p>{lead['short']}</p>
        <span class="card-link">Ver el servicio {icon('arrow-right')}</span>
      </a>
      {"".join(f'''<a class="service-card reveal" style="--i:{i + 1}" href="{s['slug']}.html">
        <h3>{s['name']}</h3><p>{s['short']}</p>
        <span class="card-link">Ver el servicio {icon('arrow-right')}</span></a>''' for i, s in enumerate(rest))}
      <div class="service-help">
        <p>¿No sabes qué servicio necesitas? Cuéntanos qué quieres renovar y te orientamos.</p>
        <a class="btn-link" href="contacto.html?origen=inicio_servicios">{CTA_LABEL} {icon('arrow-right')}</a>
      </div>
    </div>
  </div>
</section>

<section class="prep" aria-labelledby="prep-title">
  <div class="container prep-grid">
    <figure class="prep-photo">
      {photo("fachada-proceso-escalera", "Muro en reparación con una escalera apoyada y las zonas saneadas a la vista", "(min-width: 1024px) 35vw, 100vw")}
      <figcaption>Reparación del soporte antes de pintar la fachada.</figcaption>
    </figure>
    <div>
      <h2 id="prep-title">Protección y preparación: lo que explica el resultado y el precio</h2>
      <ol class="prep-list">
        {"".join(f'<li class="reveal" style="--i:{i}"><h3>{e(t)}</h3><p>{e(d)}</p></li>' for i, (t, d) in enumerate(PREP_STEPS))}
      </ol>
    </div>
  </div>
</section>

<section class="process" aria-labelledby="process-title">
  <div class="container">
    <h2 id="process-title">Cómo se organiza una obra</h2>
    <ol class="process-list" {pend_attr("Pasos y compromisos pendientes de validar con Omar")}>
      {"".join(f'<li class="reveal" style="--i:{i}"><span class="step-n" aria-hidden="true">{i + 1}</span><h3>{e(t)}</h3><p>{e(d)}</p></li>' for i, (t, d) in enumerate(PROCESS))}
    </ol>
  </div>
</section>

<section class="reviews container" aria-labelledby="reviews-title" {pend_attr("Opiniones: publicar solo reseñas con procedencia comprobada y permiso")}>
  <h2 id="reviews-title">Opiniones de clientes</h2>
  <p>Este espacio mostrará opiniones de clientes con su procedencia y su permiso. No publicamos reseñas que no podamos acreditar.</p>
</section>

<section class="others" id="otros-servicios" aria-labelledby="others-title">
  <div class="container">
    <h2 id="others-title">También hacemos reformas y acabados</h2>
    <ul class="others-list">
      {"".join(f'''<li class="reveal" style="--i:{i}"><h3>{e(t)}</h3><p>{e(d)}</p>{f'<a href="{slug}.html">Ver un caso</a>' if slug else f'<a href="{contact_url("reforma", "inicio_otros")}">{CTA_LABEL}</a>'}</li>''' for i, (t, d, slug) in enumerate(SECONDARY))}
    </ul>
  </div>
</section>

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
    first, *more = s["photos"]
    case = CASE_BY_SLUG.get(s["case"]) if s["case"] else None
    origin = f"servicio_{s['slug']}"
    related = (
        f"""<article class="related-case">
          {before_after(case)}
          <div><p class="kicker">Caso relacionado</p><h3><a href="{case['slug']}.html">{case['title']}</a></h3><p>{case['summary']}</p></div>
        </article>"""
        if case else
        f"""<div class="related-empty" {pend_attr("Documentar un caso propio de este servicio")}>
          <p>Todavía no hemos publicado un caso documentado de este servicio.</p>
          <a class="btn-link" href="trabajos.html">Ver otros trabajos {icon('arrow-right')}</a></div>"""
    )
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
    {placeholder(first[0], first[1], "svc-hero-photo")}
  </div>
</section>

<section class="svc-includes container" aria-labelledby="inc-title">
  <h2 id="inc-title">Qué incluye</h2>
  <ul class="check-list" {pend_attr("Alcance pendiente de validar con Mohamed")}>
    {"".join(f'<li>{icon("check")}<span>{e(i)}</span></li>' for i in s['includes'])}
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

<section class="svc-photos container" aria-labelledby="ph-title">
  <h2 id="ph-title">Así trabajamos</h2>
  <div class="svc-photo-row">
    {"".join(placeholder(t, d) for t, d in more)}
  </div>
  {related}
</section>

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


def works():
    cases = "".join(f"""
    <article class="case-row reveal">
      {before_after(c)}
      <div class="case-row-text">
        <p class="kicker">{e(c['service'])}</p>
        <h3><a href="{c['slug']}.html">{c['title']}</a></h3>
        <p>{c['summary']}</p>
        <p class="muni">{icon('map-pin')} {c['municipio']}</p>
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
  <p class="lead">Obras documentadas con su estado inicial, la preparación y el resultado. Más abajo, fotos agrupadas por tipo de trabajo.</p>
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

    process = (
        f"""<section class="case-step container" aria-labelledby="st-proc">
      <h2 id="st-proc">Durante la obra</h2>
      {gallery(c['process'], 'g-process')}
    </section>""" if c["process"] else ""
    )
    others = "".join(
        f'<li><a href="{o["slug"]}.html">{e(o["title"])}</a></li>' for o in CASES if o is not c
    )
    review = f'<p class="case-review" {pend_attr(c["review"])}>{e(c["review"])}</p>' if c["review"] else ""
    body = f"""
<section class="case-head">
  <div class="container case-head-grid">
    <div>
      {breadcrumb([("index.html", "Inicio"), ("trabajos.html", "Trabajos"), (None, c['title'])])}
      <h1>{c['title']}</h1>
      <p class="lead">{c['summary']}</p>
      <dl class="case-facts">
        <div><dt>Servicio</dt><dd>{e(c['service'])}</dd></div>
        <div><dt>Municipio</dt><dd>{c['municipio']}</dd></div>
        <div><dt>Superficie y duración</dt><dd>{pend("No publicadas", "Añadir solo si se conocen con certeza")}</dd></div>
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
  <p class="step-text">{c['finish']} {c['product']}.</p>
  {gallery(c['after'][1:], 'g-after')}
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
