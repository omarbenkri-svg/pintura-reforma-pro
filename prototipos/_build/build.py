"""Render the three prototypes to static HTML.

Run from the repo root:  python3 prototipos/_build/build.py [a b c]
Output: prototipos/<theme dir>/*.html (CSS lives next to it, hand-written).
"""
import importlib
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

import common  # noqa: E402
from content import PAGES, SERVICES, CASES, PROTO  # noqa: E402

THEMES = {"a": "theme_a", "b": "theme_b", "c": "theme_c"}


def pages_for(theme):
    yield "index", PAGES["index"], "Pintura especializada en el Maresme y Barcelona: interiores, alisados, estucos y lacados.", *theme.home(), "inicio"
    for s in SERVICES:
        yield s["slug"], s["name"], s["intro"], *theme.service(s), f"servicio {s['name'].lower()}"
    yield "trabajos", "Trabajos", "Obras documentadas con su estado inicial, la preparación y el resultado.", *theme.works(), "trabajos"
    for c in CASES:
        yield c["slug"], c["title"], c["summary"], *theme.case(c), c["slug"]
    yield "empresa", "Empresa", "Empresa familiar de pintura con base en Cabrils.", common.company_body(theme), None, "empresa"
    yield "contacto", PAGES["contacto"], "Cuéntanos qué quieres renovar y en qué municipio.", common.contact_body(theme), None, "contacto"
    yield "privacidad", "Privacidad", "Borrador de la política de privacidad.", common.privacy_body(theme), None, "privacidad"
    yield "404", PAGES["404"], "Página no encontrada.", common.notfound_body(theme), None, "404"


def build(letter: str) -> None:
    theme = importlib.import_module(THEMES[letter])
    out = PROTO / theme.DIR
    out.mkdir(exist_ok=True)
    count = 0
    for key, title, desc, body, albums, origin in pages_for(theme):
        html = common.page(theme, key, title, desc, body, origin, albums,
                           show_mobile_bar=key != "contacto")
        (out / f"{key}.html").write_text(html, encoding="utf-8")
        count += 1
    print(f"{theme.LETTER} · {theme.NAME}: {count} páginas en {out.relative_to(PROTO.parent)}")


if __name__ == "__main__":
    for letter in (sys.argv[1:] or [k for k in THEMES]):
        try:
            build(letter)
        except ModuleNotFoundError as err:
            print(f"{letter}: tema no disponible todavía ({err.name})")
