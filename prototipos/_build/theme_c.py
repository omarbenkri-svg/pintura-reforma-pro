"""Prototype C · Técnico: process and system direction (plan section 3, option 3).

Swiss-industrial light mode, softened for homeowners: visible 1px grid,
square corners, IBM Plex Sans + Plex Mono for labels and data, copper as the
single accent. Each job is a technical sheet with real fields; unknown data
is marked pending, never estimated.
"""
from content import (
    CONFIG, SERVICES, SERVICE_BY_SLUG, SECONDARY, CASES, CASE_BY_SLUG, ALBUMS, HERO, PEOPLE,
    PREP_STEPS, PROCESS, FAQ, FAQ_NOTE, CTA_LABEL, WA_LABEL, CALL_LABEL,
    e, pend, pend_attr, wa_url, wa_message, tel_url, contact_url, photo, placeholder, icon,
    album_trigger, gremi_line, case_pair, video_block, rich, svc_hero, svc_slots, svc_gallery,
)
from common import breadcrumb, contact_actions

LETTER = "C"
NAME = "Técnico"
DIR = "c-tecnico"
FONTS = ("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700"
         "&family=IBM+Plex+Mono:wght@400;500&display=swap")


def header(active: str) -> str:
    def cur(key):
        return ' aria-current="page"' if key == active else ""

    sub = "".join(f'<li><a href="{s["slug"]}.html"{cur(s["slug"])}>{e(s["name"])}</a></li>' for s in SERVICES)
    return f"""<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="index.html"{cur("index")}>
      <span class="brand-name">{CONFIG['brand']}</span>
      <span class="brand-tag">{CONFIG['tagline']} · {CONFIG['base']}</span>
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
  <div class="container footer-grid">
    <div class="f-cell f-brand">
      <p class="f-name">{CONFIG['brand']}</p>
      <p>{CONFIG['tagline']}. Empresa familiar con base en Cabrils, en el Gremi de Pintors desde {CONFIG['since']}.</p>
    </div>
    <dl class="f-cell f-data">
      <div><dt>Llamadas</dt><dd><a href="{tel_url()}" data-track="phone_click" data-origin="pie">{CONFIG['tel_display']}</a></dd></div>
      <div><dt>WhatsApp</dt><dd><a href="{wa_url(wa_message('pie de página'))}" data-track="whatsapp_click" data-origin="pie">{CONFIG['wa_display']}</a></dd></div>
      <div><dt>Correo</dt><dd><a href="mailto:{CONFIG['email']}">{CONFIG['email']}</a></dd></div>
    </dl>
    <ul class="f-cell f-links">
      <li><a href="pintura-viviendas.html">Pintura y servicios</a></li>
      <li><a href="trabajos.html">Trabajos</a></li>
      <li><a href="empresa.html">Empresa</a></li>
      <li><a href="../../blog/">Blog</a></li>
      <li><a href="privacidad.html">Privacidad</a></li>
      <li><a href="aviso-legal.html">Aviso legal</a></li>
    </ul>
  </div>
  <div class="container footer-bottom">
    <p>© 2026 {CONFIG['legal_name']} · {CONFIG['brand']}.</p>
  </div>
</footer>"""


def faq_table(items, note=FAQ_NOTE) -> str:
    rows = "".join(f'<div class="faq-row"><dt>{e(q)}</dt><dd>{rich(a)}</dd></div>' for q, a in items)
    return f'<dl class="faq-table" {pend_attr(note)}>{rows}</dl>'


def label(text: str) -> str:
    return f'<p class="label">{text}</p>'


# ---------------------------------------------------------------- home


def home():
    fachada = CASE_BY_SLUG["caso-fachada"]
    m, o = PEOPLE["mohamed"], PEOPLE["omar"]
    seq = [
        (fachada["before"][1], "Estado inicial"),
        (fachada["process"][0], "Preparación"),
        (fachada["after"][0], "Acabado"),
    ]
    seq_cells = "".join(
        f'<figure class="seq-cell">{photo(n, a, "(min-width: 1024px) 22vw, 50vw", priority=i == 2)}'
        f'<figcaption><span class="label">{t}</span></figcaption></figure>'
        for i, ((n, a), t) in enumerate(seq)
    )
    case_rows = "".join(f"""
      <li class="case-line reveal" style="--i:{i}">
        <div class="cl-thumbs">
          {"".join(photo(n, a, "(min-width: 1024px) 10vw, 30vw") for n, a, _ in case_pair(c))}
        </div>
        <div class="cl-text">
          <p class="label">{e(c['service'])}</p>
          <h3><a href="{c['slug']}.html">{c['title']}</a></h3>
          <p>{c['summary']}</p>
        </div>
        <p class="cl-muni"><span class="label">Municipio</span>{c['municipio']}</p>
        <a class="cl-go" href="{c['slug']}.html" aria-label="Ver la ficha: {e(c['title'])}">{icon('arrow-right')}</a>
      </li>""" for i, c in enumerate(CASES))
    svc_rows = "".join(f"""
        <tr>
          <th scope="row"><a href="{s['slug']}.html">{e(s['name'])}</a></th>
          <td>{e(s['short'])}</td>
          <td><ul>{"".join(f"<li>{rich(x)}</li>" for x in s['includes'][:3])}</ul></td>
          <td><a class="row-go" href="{s['slug']}.html" aria-label="Ver {e(s['name'])}">{icon('arrow-right')}</a></td>
        </tr>""" for s in SERVICES)
    layers = [
        ("Acabado", "Las manos necesarias del color y el brillo elegidos"),
        ("Imprimación", "Fija el soporte y unifica la absorción"),
        ("Soporte reparado", "Grietas, desconchados y golpes saneados"),
    ]
    body = f"""
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      {label(HERO['eyebrow'])}
      <h1>{HERO['h1']}</h1>
      <p class="hero-desc">{HERO['desc']}</p>
      {contact_actions("inicio_hero", None, "contacto.html?origen=inicio")}
    </div>
    <div class="hero-seq">
      {seq_cells}
      <a class="seq-cell seq-link" href="{fachada['slug']}.html">
        <span class="label">Obra documentada</span>
        <span class="seq-title">{fachada['title']}</span>
        <span class="seq-more">Ver la ficha {icon('arrow-right')}</span>
      </a>
    </div>
  </div>
</section>

<section class="sheet" aria-labelledby="sheet-title">
  <div class="container sheet-grid">
    {placeholder("Mohamed trabajando en una obra", "Retrato en obra, con luz natural.", "sheet-photo")}
    <div class="sheet-body">
      <h2 id="sheet-title">Quién hace el trabajo</h2>
      <dl class="data-list">
        <div><dt>Oficio</dt><dd>{m['name']}. {m['text']}</dd></div>
        <div><dt>Atención</dt><dd>{o['name']}. {o['text']}</dd></div>
        <div><dt>Base</dt><dd>{CONFIG['base']}. Trabajos en el Maresme y Barcelona.</dd></div>
        <div><dt>Gremi</dt><dd>{gremi_line()}</dd></div>
      </dl>
      <a class="btn-link" href="empresa.html">Conocer la empresa {icon('arrow-right')}</a>
    </div>
  </div>
</section>

<section class="cases" aria-labelledby="cases-title">
  <div class="container">
    <h2 id="cases-title">Obras documentadas</h2>
    <ol class="case-lines">{case_rows}</ol>
    <a class="btn-link more" href="trabajos.html">Todos los trabajos y álbumes {icon('arrow-right')}</a>
  </div>
</section>

<section class="services" id="servicios" aria-labelledby="services-title">
  <div class="container">
    <h2 id="services-title">Pintura, estucos y microcemento</h2>
    <table class="svc-table">
      <caption class="sr-only">Servicios de pintura: para qué sirven y qué incluyen</caption>
      <thead><tr><th scope="col">Servicio</th><th scope="col">Para qué</th><th scope="col">Incluye, entre otros</th><th scope="col"><span class="sr-only">Enlace</span></th></tr></thead>
      <tbody>{svc_rows}</tbody>
    </table>
  </div>
</section>

<section class="system" aria-labelledby="system-title">
  <div class="container system-grid">
    <div>
      <h2 id="system-title">Protección y preparación: lo que explica el resultado y el precio</h2>
      <ol class="step-grid">
        {"".join(f'<li class="reveal" style="--i:{i}"><span class="n" aria-hidden="true">{i + 1}</span><h3>{e(t)}</h3><p>{e(d)}</p></li>' for i, (t, d) in enumerate(PREP_STEPS))}
      </ol>
    </div>
    <figure class="layers" aria-labelledby="layers-cap">
      <div class="layer-stack">
        {"".join(f'<div class="layer l{i}"><span class="layer-name">{t}</span><span class="layer-note">{d}</span></div>' for i, (t, d) in enumerate(layers))}
        <div class="layer substrate"><span class="layer-name">Pared</span></div>
      </div>
      <figcaption id="layers-cap">Esquema del sistema de pintura, de la pared al acabado. La protección de la vivienda va antes y la limpieza, después.</figcaption>
    </figure>
  </div>
</section>

<section class="process" aria-labelledby="process-title">
  <div class="container">
    <h2 id="process-title">Cómo se organiza una obra</h2>
    <ol class="process-row" {pend_attr("Pasos y compromisos pendientes de validar con Omar")}>
      {"".join(f'<li><span class="n" aria-hidden="true">{i + 1}</span><h3>{e(t)}</h3><p>{e(d)}</p></li>' for i, (t, d) in enumerate(PROCESS))}
    </ol>
  </div>
</section>

<section class="container reviews" aria-labelledby="reviews-title" {pend_attr("Opiniones: publicar solo reseñas con procedencia comprobada y permiso")}>
  <h2 id="reviews-title">Opiniones de clientes</h2>
  <p>Pendiente: solo publicaremos opiniones con procedencia y permiso del cliente.</p>
</section>

<section class="others" id="otros-servicios" aria-labelledby="others-title">
  <div class="container">
    <h2 id="others-title">También reformas y acabados</h2>
    <ul class="others-grid">
      {"".join(f'''<li><h3>{e(t)}</h3><p>{e(d)}</p>{f'<a href="{slug}.html">Ver la ficha</a>' if slug else f'<a href="{contact_url("reforma", "inicio_otros")}">{CTA_LABEL}</a>'}</li>''' for t, d, slug in SECONDARY)}
    </ul>
  </div>
</section>

<section class="faq" aria-labelledby="faq-title">
  <div class="container">
    <h2 id="faq-title">Preguntas frecuentes</h2>
    {faq_table(FAQ)}
  </div>
</section>

<section class="cta-band" aria-labelledby="cta-title">
  <div class="container cta-grid">
    <div class="cta-main">
      <h2 id="cta-title">Pide una valoración</h2>
      <p>{HERO['support']}</p>
      {contact_actions("inicio_final", None, "contacto.html?origen=inicio_final")}
    </div>
    <dl class="cta-data" {pend_attr("Confirmar quién atiende cada canal y en qué horario. En las facturas solo figura el 639 05 88 19, el de Mohamed; el 631 71 40 77 no aparece")}>
      <div><dt>Llamadas</dt><dd><a href="{tel_url()}" data-track="phone_click" data-origin="inicio_final">{CONFIG['tel_display']}</a></dd></div>
      <div><dt>WhatsApp y fotos</dt><dd><a href="{wa_url(wa_message('inicio'))}" data-track="whatsapp_click" data-origin="inicio_final">{CONFIG['wa_display']}</a></dd></div>
      <div><dt>Zona</dt><dd>Maresme y Barcelona, unos 40 km desde Cabrils</dd></div>
    </dl>
  </div>
</section>
"""
    return body, None


# ---------------------------------------------------------------- service


def service(s):
    case = CASE_BY_SLUG.get(s["case"]) if s["case"] else None
    origin = f"servicio_{s['slug']}"
    case_dd = f'<a href="{case["slug"]}.html">{e(case["title"])}</a>' if case else pend(
        "Todavía no publicado", "Documentar un caso propio de este servicio")
    related = (
        f"""<a class="related" href="{case['slug']}.html">
          {"".join(photo(n, a, "(min-width: 1024px) 20vw, 50vw") for n, a, _ in case_pair(case))}
          <span class="related-text"><span class="label">Obra documentada</span><span class="related-title">{case['title']}</span><span class="seq-more">Ver la ficha {icon('arrow-right')}</span></span>
        </a>""" if case else ""
    )
    body = f"""
<section class="svc-head">
  <div class="container svc-grid">
    <div class="svc-main">
      {breadcrumb([("index.html", "Inicio"), ("index.html#servicios", "Pintura y servicios"), (None, s['name'])])}
      <h1>{s['h1']}</h1>
      <p class="lead">{s['intro']}</p>
      {contact_actions(origin, s['name'], contact_url(s['form'], origin))}
    </div>
    <aside class="spec" aria-labelledby="spec-title">
      <h2 id="spec-title" class="label">Ficha del servicio</h2>
      <dl class="data-list">
        <div><dt>Servicio</dt><dd>{e(s['name'])}</dd></div>
        <div><dt>Para</dt><dd>Viviendas, pisos y casas</dd></div>
        <div><dt>Partidas</dt><dd>{len(s['includes'])} habituales</dd></div>
        <div><dt>Obra publicada</dt><dd>{case_dd}</dd></div>
      </dl>
    </aside>
  </div>
</section>

<section class="container block" aria-labelledby="inc-title">
  <h2 id="inc-title">Qué incluye</h2>
  <ol class="inc-grid" {pend_attr("Alcance pendiente de validar con Mohamed")}>
    {"".join(f'<li><span class="n" aria-hidden="true">{i + 1}</span>{rich(x)}</li>' for i, x in enumerate(s['includes']))}
  </ol>
</section>

<section class="container block" aria-labelledby="fac-title">
  <h2 id="fac-title">Qué influye en el precio</h2>
  <table class="fac-table">
    <caption class="sr-only">Factores que influyen en el precio</caption>
    <thead><tr><th scope="col">Factor</th><th scope="col">Por qué influye</th></tr></thead>
    <tbody>{"".join(f'<tr><th scope="row">{e(t)}</th><td>{e(d)}</td></tr>' for t, d in s['factors'])}</tbody>
  </table>
</section>

<section class="container block" aria-labelledby="ph-title">
  <h2 id="ph-title">Fotos de obra</h2>
  <div class="slot-grid">{svc_hero(s, "(min-width: 1024px) 30vw, 100vw", priority=False)}{svc_gallery(s)}{"".join(placeholder(t, d) for t, d in svc_slots(s))}</div>
  {related}
</section>

<section class="container block" aria-labelledby="sfaq-title">
  <h2 id="sfaq-title">Dudas sobre {s['name'].lower()}</h2>
  {faq_table(s['faq'])}
</section>

<section class="cta-band">
  <div class="container cta-grid">
    <div class="cta-main">
      <h2>Pide una valoración</h2>
      <p>Indica el municipio y qué superficies quieres renovar. Si tienes fotos, envíalas por WhatsApp.</p>
      {contact_actions(origin + "_final", s['name'], contact_url(s['form'], origin))}
    </div>
    <nav class="cta-data" aria-label="Otros servicios">
      <p class="label">Otros servicios</p>
      <ul>{"".join(f'<li><a href="{o["slug"]}.html">{e(o["name"])}</a></li>' for o in SERVICES if o is not s)}</ul>
    </nav>
  </div>
</section>
"""
    return body, None


# ---------------------------------------------------------------- works


def works():
    rows = "".join(f"""
      <tr>
        <td class="t-thumbs">{"".join(photo(n, a, "120px") for n, a, _ in case_pair(c))}</td>
        <th scope="row"><a href="{c['slug']}.html">{c['title']}</a><span>{c['summary']}</span></th>
        <td>{e(c['service'])}</td>
        <td>{c['municipio']}</td>
        <td>{len(c['before']) + len(c['process']) + len(c['after'])} fotos</td>
      </tr>""" for c in CASES)
    albums = "".join(f"""
      <li class="album">
        {photo(a['cover'], a['cover_alt'], "(min-width: 1024px) 20vw, 50vw")}
        <div class="album-text">
          <h3>{e(a['title'])}</h3>
          <p>{e(a['note'])}</p>
          {album_trigger(k, f"Ver {len(a['photos'])} fotos", "btn-link")}
        </div>
      </li>""" for k, a in ALBUMS.items())
    body = f"""
<section class="page-head container">
  {breadcrumb([("index.html", "Inicio"), (None, "Trabajos")])}
  <h1>Trabajos</h1>
  <p class="lead">Obras documentadas con su estado inicial, la preparación y el resultado. Más abajo, fotos agrupadas por tipo de trabajo.</p>
</section>
<section class="container block" aria-labelledby="t-title">
  <h2 id="t-title">Obras documentadas</h2>
  <div class="table-scroll" tabindex="0" role="region" aria-label="Tabla de obras, desplazable">
    <table class="works-table">
      <caption class="sr-only">Obras documentadas con servicio, municipio y número de fotos</caption>
      <thead><tr><th scope="col">Antes y después</th><th scope="col">Obra</th><th scope="col">Servicio</th><th scope="col">Municipio</th><th scope="col">Fotos</th></tr></thead>
      <tbody>{rows}</tbody>
    </table>
  </div>
</section>
<section class="container block" aria-labelledby="al-title">
  <h2 id="al-title">Álbumes por tipo de trabajo</h2>
  <p class="note">Un álbum puede reunir varias obras del mismo tipo. Las fichas de arriba documentan una obra concreta.</p>
  <ul class="album-grid">{albums}</ul>
</section>
"""
    return body, list(ALBUMS)


# ---------------------------------------------------------------- case


def case(c):
    origin = c["slug"]

    def stage(title, items, sid):
        if not items:
            return ""
        figs = "".join(f'<figure>{photo(n, a, "(min-width: 1024px) 22vw, 50vw")}<figcaption>{e(a)}</figcaption></figure>' for n, a in items)
        return f'<section class="stage" aria-labelledby="{sid}"><h2 id="{sid}" class="label">{title}</h2><div class="stage-grid">{figs}</div></section>'

    review = f'<p class="case-review" {pend_attr(c["review"])}>{e(c["review"])}</p>' if c["review"] else ""
    others = "".join(f'<li><a href="{o["slug"]}.html">{e(o["title"])}</a></li>' for o in CASES if o is not c)
    body = f"""
<section class="page-head container">
  {breadcrumb([("index.html", "Inicio"), ("trabajos.html", "Trabajos"), (None, c['title'])])}
  {label("Ficha de obra")}
  <h1>{c['title']}</h1>
  <p class="lead">{c['summary']}</p>
</section>

<div class="container case-grid">
  <aside class="case-sheet" aria-labelledby="sheet-h">
    <h2 id="sheet-h" class="label">Datos de la obra</h2>
    <dl class="data-list">
      <div><dt>Servicio</dt><dd>{e(c['service'])}</dd></div>
      <div><dt>Municipio</dt><dd>{c['municipio']}</dd></div>
      <div><dt>Soporte inicial</dt><dd>{c['need']}</dd></div>
      <div><dt>Preparación</dt><dd>{c['prep']}</dd></div>
      <div><dt>Acabado</dt><dd>{c['finish']} {c['product']}.</dd></div>
      <div><dt>Superficie</dt><dd>{pend("No publicada", "Añadir solo si se conoce con certeza")}</dd></div>
      <div><dt>Duración</dt><dd>{pend("No publicada", "Añadir solo si se conoce con certeza")}</dd></div>
    </dl>
    {review}
    {contact_actions(origin, c['service'], contact_url(c['form'], origin))}
  </aside>
  <div class="case-stages">
    {stage("Estado inicial", c['before'], "s-before")}
    {stage("Durante la obra", c['process'], "s-proc")}
    {stage("Acabado", c['after'], "s-after")}
    {video_block(c)}
    <p>{album_trigger(c['album'], f"Ver las {len(ALBUMS[c['album']]['photos'])} fotos del álbum {ALBUMS[c['album']]['title'].lower()}", "btn-link")}</p>
  </div>
</div>

<section class="cta-band">
  <div class="container cta-grid">
    <div class="cta-main">
      <h2>¿Tienes un trabajo parecido?</h2>
      <p>Cuéntanos qué necesitas y en qué municipio. Te indicaremos el siguiente paso.</p>
      {contact_actions(origin + "_final", c['service'], contact_url(c['form'], origin))}
    </div>
    <nav class="cta-data" aria-label="Otras obras">
      <p class="label">Otras obras</p>
      <ul>{others}</ul>
    </nav>
  </div>
</section>
"""
    return body, [c["album"]]
