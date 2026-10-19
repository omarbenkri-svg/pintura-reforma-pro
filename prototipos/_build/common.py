"""Page shell and the page bodies that the three themes share structurally.

Themes provide header(), footer() and the pages whose composition defines
the design direction (home, service, works, case). Company, contact,
privacy and 404 use the shared bodies below; each theme styles them with
its own CSS.
"""
from __future__ import annotations

from content import (
    CONFIG, PEOPLE, MUNICIPIOS, CTA_LABEL, WA_LABEL, CALL_LABEL,
    e, pend, pend_attr, wa_url, wa_message, tel_url, icon, placeholder,
    head, proto_bar, skip_link, mobile_bar, lightbox, albums_json, scripts,
    contact_form, gremi_line,
)


def page(theme, key, title, description, body, origin, albums=None, show_mobile_bar=True):
    body_cls = f"page-{key}" + (" has-mobile-bar" if show_mobile_bar else "")
    parts = [
        head(title, description, "style.css", theme.FONTS, theme.LETTER),
        f'<body class="{body_cls}">',
        skip_link(),
        proto_bar(theme.LETTER, theme.NAME),
        theme.header(key),
        f'<main id="contenido">{body}</main>',
        theme.footer(),
    ]
    if show_mobile_bar:
        parts.append(mobile_bar(origin))
    if albums:
        parts += [lightbox(), albums_json(albums)]
    parts += [scripts(), "</body>\n</html>\n"]
    return "\n".join(parts)


def breadcrumb(items) -> str:
    """items: list of (href or None, label). Last item is the current page."""
    lis = []
    for href, label in items:
        if href:
            lis.append(f'<li><a href="{href}">{e(label)}</a></li>')
        else:
            lis.append(f'<li aria-current="page">{e(label)}</li>')
    return f'<nav class="breadcrumb" aria-label="Migas de pan"><ol>{"".join(lis)}</ol></nav>'


def contact_actions(origin: str, service_name: str | None = None, contact_href: str = "contacto.html",
                    secondary_cls: str = "btn-link") -> str:
    return (
        f'<div class="actions">'
        f'<a class="btn btn-primary" href="{contact_href}" data-track="cta_presupuesto" data-origin="{e(origin)}">{CTA_LABEL}</a>'
        f'<a class="{secondary_cls}" href="{wa_url(wa_message(origin, service_name))}" data-track="whatsapp_click" '
        f'data-origin="{e(origin)}">{icon("whatsapp-logo")} {WA_LABEL}</a>'
        f'</div>'
    )


# ---------------------------------------------------------------- company


def company_body(theme) -> str:
    m, o = PEOPLE["mohamed"], PEOPLE["omar"]
    principles = [
        ("Presupuesto por escrito", "Con la preparación, los materiales, la protección y lo que no incluye."),
        ("La vivienda protegida", "Suelos, muebles y carpinterías cubiertos durante toda la obra."),
        ("Un único contacto", "Omar coordina contigo fechas, cambios y dudas."),
        ("Revisión final contigo", "Repasamos el trabajo juntos antes de darlo por terminado."),
    ]
    towns = "".join(f"<li>{e(t)}</li>" for t in MUNICIPIOS)
    return f"""
<section class="page-head container">
  {breadcrumb([("index.html", "Inicio"), (None, "Empresa")])}
  <h1>Una empresa familiar de pintura con base en Cabrils</h1>
  <p class="lead">{pend(f"{CONFIG['brand']} es el nombre de la empresa; {CONFIG['brand_web']}, el de su web.",
                        "Fijar una única versión de la marca. Facturas 2022-2023: «Pintura en general y acabados de obra», titular Mohamed Ben Mesaud (autónomo). En la web: «Pintura, Reforma y Acabado de Obras» y «Pinturas, Reformas y Acabados de Obra»")}
  Trabajamos en viviendas del Maresme y Barcelona, con la pintura como especialidad.</p>
</section>

<section class="people container" aria-labelledby="people-title">
  <h2 id="people-title" class="sr-only">Quién te atiende</h2>
  <article class="person reveal">
    {placeholder("Retrato de Mohamed en una obra", "Una foto real trabajando transmite más que un retrato de estudio.", "person-photo")}
    <div class="person-text">
      <h3>{m['name']}</h3>
      <p class="role">{m['role']}</p>
      <p>{m['text']}</p>
      <p class="gremi">{gremi_line()}</p>
    </div>
  </article>
  <article class="person reveal" style="--i:1">
    {placeholder("Retrato de Omar", "Mejor en la oficina o en una visita, con ropa de trabajo.", "person-photo")}
    <div class="person-text">
      <h3>{o['name']}</h3>
      <p class="role">{o['role']}</p>
      <p>{o['text']}</p>
    </div>
  </article>
</section>

<section class="principles container" aria-labelledby="principles-title" {pend_attr("Compromisos pendientes de validar con Mohamed y Omar")}>
  <h2 id="principles-title">Cómo trabajamos</h2>
  <ul class="principle-list">
    {"".join(f'<li class="reveal" style="--i:{i}"><h3>{e(t)}</h3><p>{e(d)}</p></li>' for i, (t, d) in enumerate(principles))}
  </ul>
</section>

<section class="area container" aria-labelledby="area-title">
  <h2 id="area-title">Dónde trabajamos</h2>
  <p>En el Maresme y Barcelona, en un radio aproximado de 40 km desde Cabrils. Estos son algunos de los municipios donde atendemos:</p>
  <ul class="town-list">{towns}</ul>
</section>

<section class="closing container">
  <h2>Cuéntanos qué quieres renovar</h2>
  {contact_actions("empresa", None, "contacto.html?origen=empresa")}
</section>
"""


# ---------------------------------------------------------------- contact


def contact_body(theme) -> str:
    return f"""
<section class="page-head container">
  {breadcrumb([("index.html", "Inicio"), (None, "Contacto")])}
  <h1>{CTA_LABEL}</h1>
  <p class="lead">Cuéntanos qué quieres renovar y en qué municipio. Revisaremos la información para indicarte el siguiente paso.</p>
  <p class="quick-alt">¿Prefieres hablar? <a href="{tel_url()}" data-track="phone_click" data-origin="contacto">{CALL_LABEL} al {CONFIG['tel_display']}</a> o
    <a href="{wa_url(wa_message('página de contacto'))}" data-track="whatsapp_click" data-origin="contacto">escribir por WhatsApp</a>.</p>
</section>

<div class="contact-layout container">
  <div class="contact-main">
    {contact_form("contacto")}
  </div>
  <aside class="contact-aside" aria-labelledby="aside-title">
    <h2 id="aside-title">Otras formas de contactar</h2>
    <ul class="channel-list" {pend_attr("Confirmar quién atiende cada canal y en qué horario. En las facturas solo figura el 639 05 88 19, el de Mohamed; el 631 71 40 77 no aparece")}>
      <li><span class="channel-label">{icon('phone')} Llamadas</span>
        <a href="{tel_url()}" data-track="phone_click" data-origin="contacto_aside">{CONFIG['tel_display']}</a></li>
      <li><span class="channel-label">{icon('whatsapp-logo')} WhatsApp, también para fotos</span>
        <a href="{wa_url(wa_message('página de contacto'))}" data-track="whatsapp_click" data-origin="contacto_aside">{CONFIG['wa_display']}</a></li>
      <li><span class="channel-label">{icon('envelope-simple')} Correo</span>
        <a href="mailto:{CONFIG['email']}">{CONFIG['email']}</a></li>
    </ul>
    <p class="hours">{pend("Horario de atención pendiente de confirmar.", "Indicar horario real de atención telefónica")}</p>
    <h2>Qué pasa después</h2>
    <ol class="next-steps">
      <li>Revisamos tu solicitud y te contactamos para concretar lo que necesitas.</li>
      <li>Si hace falta, acordamos una visita para ver las superficies.</li>
      <li>Te enviamos el presupuesto por escrito.</li>
    </ol>
  </aside>
</div>
"""


# ---------------------------------------------------------------- privacy


def privacy_body(theme) -> str:
    rows = [
        ("Responsable", pend("Mohamed Ben Mesaud, autónomo con domicilio fiscal en Cabrils. NIF y dirección completa pendientes de publicar.", "Contrastado con facturas 2022-2023. Confirmar si se publican el NIF (es un NIE) y el domicilio completo, que el aviso legal suele exigir (LSSI); validar con asesoría")),
        ("Finalidad", "Responder a tu solicitud de presupuesto y, si lo aceptas, gestionar la obra."),
        ("Base legal", pend("Aplicación de medidas precontractuales a petición tuya", "Validar con asesoría")),
        ("Conservación", pend("Plazo de conservación", "Definir plazo y criterio de borrado")),
        ("Destinatarios", pend("Proveedores que alojan los datos de las solicitudes", "Nombrar los encargados reales del tratamiento según el receptor elegido")),
        ("Derechos", f"Acceso, rectificación, supresión y demás derechos escribiendo a {CONFIG['email']}."),
    ]
    dl = "".join(f"<dt>{t}</dt><dd>{d}</dd>" for t, d in rows)
    return f"""
<section class="page-head container narrow">
  {breadcrumb([("index.html", "Inicio"), (None, "Privacidad")])}
  <h1>Privacidad</h1>
  <p class="lead" {pend_attr("Borrador: requiere revisión legal antes de publicar")}>Borrador para revisar. No es un texto legal definitivo.</p>
</section>
<section class="legal container narrow">
  <dl class="legal-list">{dl}</dl>
  <h2>Cookies y medición</h2>
  <p>{pend("Este prototipo no usa cookies ni herramientas de medición. El texto final dependerá de los scripts que se instalen.",
           "Revisar el aviso de cookies con los scripts definitivos")}</p>
</section>
"""


# ---------------------------------------------------------------- 404


def notfound_body(theme) -> str:
    return f"""
<section class="page-head container narrow notfound">
  <h1>No encontramos esta página</h1>
  <p class="lead">Puede que el enlace haya cambiado. Estas páginas sí existen:</p>
  <ul class="notfound-links">
    <li><a href="index.html">Inicio</a></li>
    <li><a href="pintura-viviendas.html">Pintura de viviendas</a></li>
    <li><a href="trabajos.html">Trabajos</a></li>
    <li><a href="contacto.html">{CTA_LABEL}</a></li>
  </ul>
</section>
"""
