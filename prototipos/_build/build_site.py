"""Build the public bcnproreforma.com site from prototype A (Oficio).

Run from the repo root:  python3 prototipos/_build/build_site.py
Optional env: GA_ID=G-XXXX (enables Analytics with Consent Mode), GSC_TOKEN=...

Writes the new pages to the repo root (index.html, microcemento.html, ...),
assets to /assets, plus sitemap.xml and llms.txt. Existing /municipios and
/blog pages are kept as they are and linked from the new pages.
"""
import json
import os
import re
import shutil
import sys
from pathlib import Path

os.environ["BUILD_MODE"] = "prod"
sys.path.insert(0, str(Path(__file__).parent))

from PIL import Image  # noqa: E402

import build  # noqa: E402
import common  # noqa: E402
import content as C  # noqa: E402
import theme_a as T  # noqa: E402
import municipios as M  # noqa: E402
import guia as G  # noqa: E402

ROOT = C.ROOT
ASSETS = ROOT / "assets"
SITE = C.SITE
CFG = C.CONFIG


# ---------------------------------------------------------------- structured data

def business() -> dict:
    towns = [{"@type": "City", "name": t} for t in C.MUNICIPIOS]
    return {
        "@type": "HousePainter",
        "@id": f"{SITE}/#negocio",
        "name": CFG["brand"],
        "legalName": CFG["legal_name"],
        "description": "Empresa familiar de pintores en Cabrils: pintura de viviendas, estucos y microcemento en el Maresme y Barcelona.",
        "url": f"{SITE}/",
        "telephone": CFG["tel"],
        "email": CFG["email"],
        "image": f"{SITE}/assets/img/og.jpg",
        "logo": f"{SITE}/logo%20.png",
        "priceRange": "€€",
        "address": {"@type": "PostalAddress", "addressLocality": "Cabrils", "postalCode": "08348",
                    "addressRegion": "Barcelona", "addressCountry": "ES"},
        "areaServed": towns + [{"@type": "AdministrativeArea", "name": "Maresme"}],
        "memberOf": {"@type": "Organization", "name": "Gremi d'Empreses de Pintura de Barcelona i Comarques"},
        "openingHoursSpecification": [
            {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
             "opens": "08:00", "closes": "19:00"},
            {"@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "14:00"},
        ],
        "sameAs": ["https://www.instagram.com/pintayreformatuobra"],
        "hasOfferCatalog": {"@type": "OfferCatalog", "name": "Servicios", "itemListElement": [
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": s["name"], "url": f"{SITE}/{s['slug']}"}}
            for s in C.SERVICES]},
    }


def plain(text: str) -> str:
    return re.sub(r"<[^>]+>", "", text)


def schema_for(key: str, title: str) -> list:
    blocks = []
    if key in ("index", "empresa", "contacto"):
        blocks.append(business())
    if key == "index":
        blocks.append({"@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": plain(a)}}
            for q, a in C.FAQ if plain(a)]})
    if key in C.SERVICE_BY_SLUG:
        s = C.SERVICE_BY_SLUG[key]
        blocks.append({"@type": "Service", "name": s["name"], "description": s["short"], "url": f"{SITE}/{key}",
                       "provider": {"@id": f"{SITE}/#negocio"}, "areaServed": "Maresme y Barcelona"})
        blocks.append({"@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": plain(a)}}
            for q, a in s["faq"] if plain(a)]})
    if key == "guia-acabados":
        blocks.append({"@type": "Article", "@id": f"{SITE}/guia-acabados#articulo",
                       "headline": title, "description": "Cómo comparar pintura, estucos y microcemento según el soporte, el uso y el acabado buscado.",
                       "inLanguage": "es", "author": {"@id": f"{SITE}/#negocio"},
                       "publisher": {"@id": f"{SITE}/#negocio"},
                       "mainEntityOfPage": f"{SITE}/guia-acabados"})
    if key != "index" and key != "404":
        crumbs = [("Inicio", f"{SITE}/")]
        if key in C.CASE_BY_SLUG:
            crumbs.append(("Trabajos", f"{SITE}/trabajos"))
        crumbs.append((title, f"{SITE}/{key}"))
        blocks.append({"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": i + 1, "name": n, "item": u} for i, (n, u) in enumerate(crumbs)]})
    return blocks


# ---------------------------------------------------------------- page shell

def head(key: str, title: str, desc: str, path: str = None, extra_ld=None) -> str:
    path = path or ("/" if key == "index" else f"/{key}")
    full = f"{title} | {CFG['brand']}" if key != "index" else f"{title} | {CFG['brand']}"
    robots = "noindex" if key == "404" else "index, follow"
    ld = "".join(
        f'<script type="application/ld+json">{json.dumps({"@context": "https://schema.org", **b}, ensure_ascii=False)}</script>\n'
        for b in (extra_ld if extra_ld is not None else schema_for(key, title)))
    gsc = f'<meta name="google-site-verification" content="{C.GSC_TOKEN}">\n' if C.GSC_TOKEN else ""
    ga = ""
    if C.GA_ID:
        ga = f"""<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}
gtag('consent','default',{{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'}});
try{{if(localStorage.getItem('consent-analytics')==='granted')gtag('consent','update',{{analytics_storage:'granted'}});}}catch(e){{}}
gtag('js',new Date());gtag('config','{C.GA_ID}');</script>
<script async src="https://www.googletagmanager.com/gtag/js?id={C.GA_ID}"></script>
"""
    return f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{C.e(full)}</title>
<meta name="description" content="{C.e(desc)}">
<meta name="robots" content="{robots}">
<link rel="canonical" href="{SITE}{path}">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="{CFG['brand']}">
<meta property="og:title" content="{C.e(title)}">
<meta property="og:description" content="{C.e(desc)}">
<meta property="og:url" content="{SITE}{path}">
<meta property="og:image" content="{SITE}/assets/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#162D3B">
{gsc}<script>document.documentElement.classList.add('js');</script>
{ga}<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{T.FONTS}">
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css">
<link rel="stylesheet" href="/assets/css/site.css">
{'<link rel="stylesheet" href="/assets/css/guia.css">' if key == 'guia-acabados' else ''}
<link rel="icon" href="/logo%20.png">
{ld}</head>"""


LINK = re.compile(r'href="(?!https?:|mailto:|tel:|/|#)([^"?#]*?)\.html([?#][^"]*)?"')


def clean_links(html: str) -> str:
    html = html.replace('href="../../blog/"', 'href="/blog"')
    html = LINK.sub(lambda m: f'href="/{m.group(1)}{m.group(2) or ""}"', html)
    return html.replace('href="/index"', 'href="/"').replace('href="/index#', 'href="/#').replace('href="/index?', 'href="/?')


def page(key, title, desc, body, albums, origin, path=None, extra_ld=None) -> str:
    parts = [head(key, title, desc, path, extra_ld), f'<body class="page-{key}{" has-mobile-bar" if key != "contacto" else ""}">',
             C.skip_link(), T.header(key), f'<main id="contenido">{body}</main>', T.footer()]
    if key != "contacto":
        parts.append(C.mobile_bar(origin))
    if albums:
        parts += [C.lightbox(), C.albums_json(albums)]
    parts += [C.scripts()]
    if key == "guia-acabados":
        parts.append('<script type="module" src="/assets/js/guia.js"></script>')
    parts += ["</body>\n</html>\n"]
    return clean_links("\n".join(parts))


# ---------------------------------------------------------------- assets & files

def copy_assets() -> None:
    (ASSETS / "css").mkdir(parents=True, exist_ok=True)
    (ASSETS / "js").mkdir(exist_ok=True)
    (ASSETS / "img").mkdir(exist_ok=True)
    (ASSETS / "media").mkdir(exist_ok=True)
    css = (C.PROTO / "shared" / "base.css").read_text() + "\n" + (C.PROTO / "a-oficio" / "style.css").read_text()
    (ASSETS / "css" / "site.css").write_text(css)
    shutil.copy(C.PROTO / "shared" / "app.js", ASSETS / "js" / "app.js")
    for f in (C.PROTO / "shared" / "img").glob("*.webp"):
        if not f.name.startswith("preview-"):
            shutil.copy(f, ASSETS / "img" / f.name)
    for f in (C.PROTO / "shared" / "media").iterdir():
        shutil.copy(f, ASSETS / "media" / f.name)
    og = Image.open(C.PROTO / "shared" / "img" / "mc-suelo-escalones-1200.webp").convert("RGB")
    w, h = og.size
    th = round(w * 630 / 1200)
    og = og.crop((0, (h - th) // 2, w, (h - th) // 2 + th)).resize((1200, 630), Image.LANCZOS)
    og.save(ASSETS / "img" / "og.jpg", "JPEG", quality=82)


def sitemap(keys) -> None:
    import datetime
    today = datetime.date.today().isoformat()
    urls = [("/" if k == "index" else f"/{k}") for k in keys if k not in ("404",)]
    urls += ["/reformas-mataro"] + [f"/municipios/{p.stem}" for p in sorted((ROOT / "municipios").glob("pintor-*.html"))]
    urls += ["/blog"] + [f"/blog/{p.stem}" for p in sorted((ROOT / "blog").glob("*.html")) if p.stem != "index"]
    xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    xml += "".join(f"  <url><loc>{SITE}{u}</loc><lastmod>{today}</lastmod></url>\n" for u in urls)
    (ROOT / "sitemap.xml").write_text(xml + "</urlset>\n")
    print(f"sitemap.xml: {len(urls)} URLs")


def llms() -> None:
    lines = [f"# {CFG['brand']}", "",
             f"> {CFG['brand']} ({CFG['legal_name']}) es una empresa familiar de pintores con base en Cabrils (Barcelona), "
             f"agremiada en el Gremi de Pintors desde {CFG['since']} (fecha facilitada por la empresa). Pinta viviendas y aplica estucos y microcemento en el Maresme y Barcelona.",
             "", f"- Teléfono: {CFG['tel_display']} · WhatsApp: {CFG['wa_display']} · {CFG['email']}",
             "- Zona: Maresme y Barcelona, unos 40 km alrededor de Cabrils", "", "## Servicios", ""]
    lines += [f"- [{s['name']}]({SITE}/{s['slug']}): {s['short']}" for s in C.SERVICES]
    lines += ["", "## Obras documentadas", ""]
    lines += [f"- [{c['title']}]({SITE}/{c['slug']}): {plain(c['summary'])}" for c in C.CASES]
    lines += ["", "## Más", "", f"- [Quiénes somos]({SITE}/empresa)",
              "- [Directorio oficial del Gremi](https://www.gremipintors.com/directori)",
              f"- [Solicitar presupuesto]({SITE}/contacto)",
              f"- [Guía para elegir entre pintura, estuco y microcemento]({SITE}/guia-acabados)",
              f"- [Blog]({SITE}/blog)"]
    (ROOT / "llms.txt").write_text("\n".join(lines) + "\n")


def town_page(t) -> str:
    name, slug = t["name"], t["slug"]
    origin = f"municipio_{slug}"
    cta = f"/contacto?origen={origin}&amp;municipio={name.replace(' ', '%20')}"
    svcs = [C.SERVICE_BY_SLUG[k] for k in t["services"]]
    cards = "".join(
        f'<li><h3><a href="/{s["slug"]}">{C.e(s["name"])} en {C.e(name)}</a></h3><p>{C.e(s["short"])}</p>'
        f'<a href="/{s["slug"]}">Ver el servicio</a></li>' for s in svcs)
    cases = "".join(f"""
    <article class="case-row">
      {T.before_after(c)}
      <div class="case-row-text">
        <p class="kicker">{C.e(c['service'])} · obra propia</p>
        <h3><a href="/{c['slug']}">{c['title']}</a></h3>
        <p>{c['summary']}</p>
      </div>
    </article>""" for c in C.CASES[:2])
    others = "".join(f'<li><a href="/municipios/{o["slug"]}">{C.e(o["name"])}</a></li>' for o in M.TOWNS if o is not t)
    pn, pa = t["photo"], {**dict(sum([c["after"] + c["process"] + c["before"] for c in C.CASES], [])),
                          **dict(C.MC_ALBUM)}.get(t["photo"], "Obra propia")
    body = f"""
<section class="svc-hero">
  <div class="container svc-hero-grid">
    <div>
      {common.breadcrumb([("/", "Inicio"), ("/empresa", "Zonas"), (None, name)])}
      <h1>Pintura, estucos y microcemento en {C.e(name)}</h1>
      <p class="lead">{C.e(t['intro'])}</p>
      <div class="actions">
        <a class="btn btn-primary" href="{cta}" data-track="cta_presupuesto" data-origin="{origin}">{C.CTA_LABEL}</a>
        <a class="btn-link" href="{C.wa_url(C.wa_message(origin) + name)}" data-track="whatsapp_click" data-origin="{origin}">{C.icon('whatsapp-logo')} {C.WA_LABEL}</a>
      </div>
    </div>
    <figure class="svc-hero-photo">{C.photo(pn, pa, "(min-width: 1024px) 40vw, 100vw", priority=True)}<figcaption>{C.e(pa)}. Obra propia.</figcaption></figure>
  </div>
</section>
<section class="svc-includes container" aria-labelledby="loc-title">
  <h2 id="loc-title">Lo que tenemos en cuenta en {C.e(name)}</h2>
  {''.join(f'<p class="step-text">{C.e(x)}</p>' for x in t['local'])}
</section>
<section class="others" aria-labelledby="srv-title">
  <div class="container">
    <h2 id="srv-title">Qué hacemos en {C.e(name)}</h2>
    <ul class="others-list">{cards}</ul>
  </div>
</section>
<section class="cases container" aria-labelledby="cs-title">
  <h2 id="cs-title">Obras documentadas</h2>
  {cases}
  <p><a class="btn-link" href="/trabajos">Ver todos los trabajos {C.icon('arrow-right')}</a></p>
</section>
<section class="svc-faq" aria-labelledby="fq-title">
  <div class="container faq-grid">
    <div>
      <h2 id="fq-title">Preguntas sobre obras en {C.e(name)}</h2>
      {T.faq_list(M.faq(name))}
    </div>
    <aside class="final-cta">
      <h2>Pide presupuesto en {C.e(name)}</h2>
      <p>Cuéntanos qué quieres renovar. Si tienes fotos, envíalas por WhatsApp.</p>
      <a class="btn btn-primary" href="{cta}" data-track="cta_presupuesto" data-origin="{origin}_final">{C.CTA_LABEL}</a>
      <a class="btn-link" href="tel:{CFG['tel']}" data-track="phone_click" data-origin="{origin}">{C.icon('phone')} {C.CALL_LABEL} al {CFG['tel_display']}</a>
      <p class="also">Otras zonas:</p>
      <ul class="also-list">{others}</ul>
    </aside>
  </div>
</section>
"""
    title = f"Pintura, estucos y microcemento en {name}"
    desc = f"{t['intro'][:150]}"
    ld = [
        {"@type": "Service", "name": title, "url": f"{SITE}/municipios/{slug}", "provider": {"@id": f"{SITE}/#negocio"},
         "areaServed": {"@type": "City", "name": name},
         "serviceType": ["Pintura de viviendas", "Microcemento", "Estuco veneciano", "Alisado de paredes"]},
        {"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
                                             for q, a in M.faq(name)]},
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Inicio", "item": f"{SITE}/"},
            {"@type": "ListItem", "position": 2, "name": name, "item": f"{SITE}/municipios/{slug}"}]},
    ]
    return page(f"municipio-{slug}", title, desc, body, None, origin, path=f"/municipios/{slug}", extra_ld=ld)


def main() -> None:
    copy_assets()
    keys = []
    for key, title, desc, body, albums, origin in build.pages_for(T):
        (ROOT / f"{key}.html").write_text(page(key, title, desc, body, albums, origin), encoding="utf-8")
        keys.append(key)
    key = "guia-acabados"
    body, albums = G.body()
    (ROOT / f"{key}.html").write_text(page(key, "Pintura, estuco o microcemento: cómo elegir",
        "Guía práctica para elegir entre pintura, estucos y microcemento según la superficie, su estado y el uso que tendrá. Con obras propias y una ficha gratuita.",
        body, albums, "guia_acabados"), encoding="utf-8")
    keys.append(key)
    for t in M.TOWNS:
        (ROOT / "municipios" / f"{t['slug']}.html").write_text(town_page(t), encoding="utf-8")
    sitemap(keys)
    llms()
    print(f"web pública: {len(keys)} páginas en la raíz, assets en /assets"
          f"{' (GA ' + C.GA_ID + ')' if C.GA_ID else ' (sin Analytics: falta GA_ID)'}")


if __name__ == "__main__":
    main()
