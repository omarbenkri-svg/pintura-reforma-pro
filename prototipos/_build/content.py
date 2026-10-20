"""Shared content and components for the three BCN ProReforma prototypes.

All three prototypes render exactly this copy, these photos and this contact
logic, so they can be compared on design alone. Copy is Spanish (castellano).
Any claim that still needs Omar's or Mohamed's confirmation is wrapped with
pend() so "Modo revisión" can highlight it.
"""
from __future__ import annotations

from html import escape
from pathlib import Path
from urllib.parse import quote
import json

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
PROTO = ROOT / "prototipos"
IMG_DIR = PROTO / "shared" / "img"

# ---------------------------------------------------------------- channels
# Single source of truth for contact destinations (plan section 9).
CONFIG = {
    "tel": "+34639058819",
    "tel_display": "639 05 88 19",
    "wa": "34631714077",
    "wa_display": "631 71 40 77",
    "email": "bcnproreforma@gmail.com",
    # Public brand (Omar, 20/10/2026) and the registered name for legal texts.
    "brand": "BCN ProReforma",
    "brand_web": "BCN ProReforma",
    "tagline": "Pintura, estucos y microcemento",
    "legal_name": "Pintura, Reformas y Acabados de Obra",
    "holder": "Mohamed Ben Mesaud",
    "nif": "X-1397024-G",
    "fiscal_address": "C/ Doctor Masriera, 8, bajo 2, 08348 Cabrils (Barcelona)",
    "since": "1994",
    "base": "Cabrils",
    "area": "Maresme y Barcelona",
}

# ---------------------------------------------------------------- helpers


def e(text: str) -> str:
    return escape(text, quote=True)


def pend(text: str, note: str) -> str:
    """Inline text pending confirmation. Highlighted in review mode."""
    return f'<span class="pend" data-note="{e(note)}">{text}</span>'


def pend_attr(note: str) -> str:
    """Attribute for a whole block pending confirmation."""
    return f'data-pending="{e(note)}"'


def wa_url(message: str) -> str:
    return f"https://wa.me/{CONFIG['wa']}?text={quote(message)}"


def wa_message(origin: str, service: str | None = None) -> str:
    what = service.lower() if service else "un trabajo"
    return f"Hola, os escribo desde la web ({origin}). Quiero pedir valoración para {what}. Mi municipio es: "


def tel_url() -> str:
    return f"tel:{CONFIG['tel']}"


def contact_url(service_key: str | None = None, origin: str | None = None) -> str:
    params = []
    if service_key:
        params.append(f"servicio={service_key}")
    if origin:
        params.append(f"origen={origin}")
    return "contacto.html" + ("?" + "&amp;".join(params) if params else "")


_dims: dict[str, tuple[int, int]] = {}


def dims(name: str) -> tuple[int, int]:
    if name not in _dims:
        with Image.open(IMG_DIR / f"{name}-1200.webp") as im:
            _dims[name] = im.size
    return _dims[name]


def photo(name: str, alt: str, sizes: str = "(min-width: 1024px) 50vw, 100vw",
          cls: str = "", priority: bool = False) -> str:
    """Responsive <img> for one of the optimized photos in shared/img."""
    w, h = dims(name)
    load = 'loading="eager" fetchpriority="high"' if priority else 'loading="lazy"'
    c = f' class="{cls}"' if cls else ""
    return (
        f'<img{c} src="../shared/img/{name}-1200.webp" '
        f'srcset="../shared/img/{name}-640.webp 640w, ../shared/img/{name}-1200.webp 1200w" '
        f'sizes="{sizes}" width="{w}" height="{h}" alt="{e(alt)}" {load} decoding="async">'
    )


def placeholder(label: str, detail: str, cls: str = "") -> str:
    """Labelled slot for an own photo that does not exist yet (plan section 5, option 1)."""
    return (
        f'<figure class="slot {cls}" {pend_attr("Foto propia pendiente: " + label)}>'
        f'<div class="slot-frame" role="img" aria-label="Espacio reservado para una foto propia: {e(label)}">'
        f'<i class="ph ph-camera" aria-hidden="true"></i>'
        f'<span class="slot-title">Foto propia pendiente</span>'
        f'<span class="slot-label">{e(label)}</span></div>'
        f'<figcaption>{e(detail)}</figcaption></figure>'
    )


def icon(name: str) -> str:
    # Phosphor icon font (regular weight), loaded from unpkg in <head>.
    return f'<i class="ph ph-{name}" aria-hidden="true"></i>'


# ---------------------------------------------------------------- navigation

PAGES = {
    "index": "Inicio",
    "pintura-viviendas": "Pintura de viviendas",
    "alisados-lacados": "Alisados y lacados",
    "microcemento": "Microcemento",
    "decorativa-estucos": "Estucos y pintura decorativa",
    "trabajos": "Trabajos",
    "caso-bano-microcemento": "Caso: baño de microcemento",
    "caso-fachada": "Caso: fachada",
    "caso-carpinteria-madera": "Caso: carpintería de madera",
    "caso-garaje-comunitario": "Caso: garaje comunitario",
    "empresa": "Empresa",
    "contacto": "Solicitar presupuesto",
    "privacidad": "Privacidad",
    "aviso-legal": "Aviso legal",
    "404": "Página no encontrada",
}

NAV = [
    ("trabajos", "Trabajos"),
    ("empresa", "Empresa"),
    ("contacto", "Contacto"),
]

CTA_LABEL = "Solicitar presupuesto"      # one label for the form intent, everywhere
WA_LABEL = "Enviar fotos por WhatsApp"    # one label for the WhatsApp intent
CALL_LABEL = "Llamar"

# ---------------------------------------------------------------- services

WEB = "Viene de la web actual: confirmar con Mohamed antes de publicar"

SERVICES = [
    {
        "slug": "pintura-viviendas",
        "form": "pintura-vivienda",
        "name": "Pintura de viviendas",
        "title": "Pintores para pisos y casas en el Maresme y Barcelona",
        "short": "Pisos y casas, enteros o por estancias: paredes, techos, puertas y radiadores, con la casa protegida.",
        "h1": "Pintura de pisos y casas en el Maresme y Barcelona",
        "intro": "Pintamos viviendas enteras o por estancias. Antes de abrir un bote tapamos muebles y suelos, reparamos grietas y golpes y preparamos cada pared para que el color quede uniforme y dure.",
        "hero": ("fachada-despues-general", "Fachada de una vivienda reparada y pintada por nuestro equipo"),
        "gallery": [],
        "includes": [
            "Protección de suelos, muebles, puertas y enchufes antes de empezar",
            "Reparación de grietas, golpes, agujeros y desconchados",
            "Lijado e imprimación allí donde el soporte lo pide",
            "Paredes y techos con el color y el acabado que elijas (mate, satinado o antimanchas)",
            "Puertas, marcos, zócalos y radiadores, si los incluimos en el presupuesto",
            "Limpieza diaria y retirada de protecciones al terminar",
        ],
        "factors": [
            ("Superficie real", "Se calculan los metros de pared y techo, no solo los del suelo."),
            ("Estado de las paredes", "Gotelé, grietas, humedades o pintura vieja que se levanta."),
            ("Vivienda vacía o amueblada", "Mover y proteger muebles añade horas de trabajo."),
            ("Cambio de color", "Pasar de un tono oscuro a uno claro puede pedir una mano más."),
        ],
        "photos": [
            ("Salón o dormitorio terminado con luz natural", "La foto que más ayuda a vender este servicio: una estancia recién pintada y vacía."),
            ("Muebles y suelo protegidos antes de pintar", "Enseña el cuidado de la casa, que es lo primero que pregunta el cliente."),
            ("Grieta reparada antes de la pintura", "La misma pared antes y después de prepararla."),
        ],
        "case": None,
        "faq": [
            ("¿Tengo que vaciar la vivienda?", "No. Juntamos los muebles en el centro de cada estancia y los cubrimos; el suelo se protege con papel grueso o lona según sea parqué, mármol o baldosa."),
            ("¿Cuántas manos de pintura dais?", "Las que pida el soporte y el color, normalmente dos. Lo dejamos escrito en el presupuesto para que sepas exactamente qué se va a hacer."),
        ],
    },
    {
        "slug": "microcemento",
        "form": "microcemento",
        "name": "Microcemento",
        "title": "Microcemento en baños, suelos y terrazas en el Maresme y Barcelona",
        "short": "Baños, suelos, escaleras y terrazas con un revestimiento continuo, sin juntas, aplicado a mano.",
        "h1": "Microcemento en baños, suelos y terrazas",
        "intro": "Revestimos suelos, paredes, platos de ducha, encimeras y escaleras con microcemento: una superficie continua, sin juntas, que se aplica a mano capa a capa. Es la forma de renovar un baño o un salón sin levantar el suelo existente cuando el soporte lo permite.",
        "hero": ("mc-bano-ducha-desague", "Ducha de obra revestida de microcemento con desagüe lineal"),
        "gallery": [
            ("mc-suelo-escalones", "Suelo de microcemento en un salón con escalones revestidos"),
            ("mc-terraza-escalera", "Terraza y escalera exterior revestidas de microcemento"),
            ("mc-bano-general", "Baño con suelo de microcemento satinado y ducha con mampara"),
            ("mc-gris-ducha", "Plato de ducha de microcemento gris oscuro, antes de montar la grifería"),
            ("mc-suelo-ladrillo", "Suelo de microcemento junto a una pared de ladrillo visto"),
            ("mc-proceso-base", "Fase intermedia del sistema, antes de las capas de acabado"),
        ],
        "includes": [
            "Revisión del soporte y reparación de grietas o piezas sueltas",
            pend("Aplicación sobre la baldosa existente, sin levantarla, cuando está firme", WEB),
            pend("Malla de fibra y capas de base que dan resistencia al revestimiento", WEB),
            "Platos de ducha de obra, hornacinas, bancos y encimeras revestidos",
            "Capas de acabado en el color elegido",
            pend("Sellado final que protege del agua y de las manchas", WEB),
        ],
        "factors": [
            ("Superficie y piezas", "Suelo, paredes, plato de ducha, encimera o escalones: cada pieza lleva su trabajo."),
            ("Estado del soporte", "Baldosa firme, grietas, humedad o desniveles que haya que corregir antes."),
            ("Interior o exterior", "Una terraza necesita un sistema preparado para sol, lluvia y cambios de temperatura."),
            ("Acabado", "Color, liso o con aguas, mate o satinado."),
        ],
        "photos": [],
        "case": "caso-bano-microcemento",
        "faq": [
            ("¿Se puede aplicar microcemento sobre el azulejo?", pend("En muchos casos sí, siempre que la baldosa esté firme y bien pegada. Lo comprobamos en la visita.", WEB)),
            ("¿Qué mantenimiento necesita?", pend("Limpieza con productos neutros y sin abrasivos. Te explicamos cómo cuidarlo al entregar la obra.", "Validar con Mohamed")),
        ],
    },
    {
        "slug": "decorativa-estucos",
        "form": "decorativa",
        "name": "Estucos y pintura decorativa",
        "title": "Estuco veneciano y pintura decorativa en el Maresme y Barcelona",
        "short": "Estuco a la cal, veladuras y acabados con aguas para paredes que tienen que lucir.",
        "h1": "Estucos y pintura decorativa",
        "intro": "El estuco y los acabados decorativos se trabajan a mano, con llana y espátula. Por eso dependen tanto del oficio como de la preparación: una pared mal preparada se nota más bajo un estuco que bajo una pintura lisa.",
        "hero": ("deco-pared-aguas", "Pared con acabado decorativo de aguas en tonos gris y verde"),
        "gallery": [],
        "includes": [
            "Muestra del acabado sobre la pared antes de aplicarlo entero",
            "Preparación del soporte hasta dejarlo plano y firme",
            pend("Estuco veneciano a la cal, espatulado en varias capas", WEB),
            "Veladuras y acabados con aguas",
            pend("Protección final con ceras cuando el acabado lo pide", WEB),
        ],
        "factors": [
            ("Técnica", "Cada estuco o efecto tiene su número de capas y su tiempo de secado."),
            ("Superficie", "Una pared de acento o una estancia entera."),
            ("Estado del soporte", "Un estuco necesita una pared muy plana: si no lo está, hay que alisarla antes."),
        ],
        "photos": [
            ("Estuco terminado con luz rasante", "La luz lateral muestra la profundidad y el brillo del estuco."),
            ("Aplicación con llana durante la obra", "Enseña el oficio, no solo el resultado."),
        ],
        "case": None,
        "faq": [
            ("¿Puedo ver el acabado antes de decidir?", "Sí. Hacemos una muestra sobre tu pared antes de aplicarlo en toda la superficie."),
            ("¿Qué diferencia hay entre estuco y microcemento?", "El estuco es un acabado decorativo de pared, con brillo y profundidad. El microcemento es un revestimiento resistente que también sirve para suelos, duchas y encimeras."),
        ],
    },
    {
        "slug": "alisados-lacados",
        "form": "alisado",
        "name": "Alisados y lacados",
        "title": "Quitar gotelé y lacar puertas en el Maresme y Barcelona",
        "short": "Fuera el gotelé, paredes lisas y puertas, armarios y carpinterías lacados o barnizados.",
        "h1": "Quitar gotelé, alisar paredes y lacar carpinterías",
        "intro": "Eliminamos el gotelé o lo tapamos hasta dejar la pared lisa, y renovamos puertas, armarios y carpinterías de madera con lacado, esmalte o barniz.",
        "hero": ("madera-despues-terraza", "Carpintería de madera de un ático barnizada de nuevo"),
        "gallery": [],
        "includes": [
            "Retirada o tapado del gotelé según el estado de la pared",
            "Enlucido y lijado hasta dejar una superficie lisa, sin ondulaciones",
            "Imprimación antes de la pintura final",
            "Lijado y preparación de puertas, marcos, zócalos y armarios",
            "Lacado o esmaltado de carpinterías interiores",
            "Barnizado de madera interior y exterior",
        ],
        "factors": [
            ("Tipo de gotelé", "No es lo mismo un gotelé fino que uno grueso o pintado varias veces."),
            ("Número de piezas", "Puertas, marcos y frentes de armario se presupuestan por unidad."),
            ("Estado de la madera", "Barniz levantado, golpes o madera agrisada por el sol."),
            ("Acabado", "Mate, satinado o brillo; color o madera vista."),
        ],
        "photos": [
            ("Pared con gotelé antes y después del alisado", "Tiene que ser la misma pared para poder compararla."),
            ("Puerta lacada terminada, detalle del canto", "El canto y las molduras delatan la calidad del lacado."),
        ],
        "case": "caso-carpinteria-madera",
        "faq": [
            ("¿Se puede quitar el gotelé sin hacer obra?", "En la mayoría de paredes se tapa y se alisa sin picar. Lo decidimos al ver el tipo de gotelé y el estado de la pared."),
            ("¿Laqueáis las puertas en casa o en taller?", "Depende del número de piezas y del acabado que busques. Lo concretamos en el presupuesto."),
        ],
    },
]
SERVICE_BY_SLUG = {s["slug"]: s for s in SERVICES}

SECONDARY = [
    ("Fachadas y exteriores", "Saneamos el revoque y pintamos fachadas, muros y rejas.", "caso-fachada"),
    ("Comunidades y garajes", "Escaleras, zonas comunes y garajes, con su señalización.", "caso-garaje-comunitario"),
    ("Reformas de baño y cocina", "Coordinamos la obra completa y nos ocupamos de los acabados.", None),
    ("Humedades y reparaciones", "Buscamos la filtración, la reparamos y dejamos la pared lista para pintar.", None),
]

# Form values for "tipo de trabajo" (radio group).
WORK_TYPES = [
    ("pintura-vivienda", "Pintura de vivienda"),
    ("alisado", "Alisar paredes o quitar gotelé"),
    ("lacado", "Lacar o barnizar carpinterías"),
    ("microcemento", "Microcemento"),
    ("decorativa", "Estuco o pintura decorativa"),
    ("exterior", "Fachada o exterior"),
    ("comunidad", "Comunidad, garaje o local"),
    ("reforma", "Reforma o reparación"),
    ("otro", "Otro trabajo"),
]

MUNICIPIOS = [
    "Alella", "Arenys de Mar", "Argentona", "Badalona", "Barcelona", "Cabrera de Mar",
    "Cabrils", "Caldes d'Estrac", "El Masnou", "Mataró", "Montgat", "Premià de Dalt",
    "Premià de Mar", "Sant Andreu de Llavaneres", "Sant Vicenç de Montalt", "Teià",
    "Tiana", "Vilassar de Dalt", "Vilassar de Mar",
]

# ---------------------------------------------------------------- cases
REAL = "../../images/projects/real"

GROUPED = "Agrupado por las fotos (mismo plato, desagüe y color). Mohamed debe confirmar que es una sola obra, el municipio y el año"

CASES = [
    {
        "slug": "caso-bano-microcemento",
        "form": "microcemento",
        "title": "Baño de microcemento con ducha de obra",
        "service": "Microcemento",
        "summary": "Suelo, paredes y plato de ducha en un mismo revestimiento continuo, con desagüe lineal y murete de obra.",
        "municipio": pend("No publicado", GROUPED),
        "need": pend("Baño revestido entero de microcemento: suelo, paredes, ducha a ras de suelo, murete y encimera de obra.",
                     "Indicar qué había antes (azulejo, plato, bañera): no hay fotos del estado inicial"),
        "prep": pend("Reparación del soporte, formación de la pendiente de la ducha hacia el desagüe lineal y capas de base antes del acabado.",
                     "Validar con Mohamed: sistema y capas aplicados"),
        "finish": "Revestimiento continuo en tono arena claro, sin juntas entre suelo, paredes y ducha.",
        "product": pend("Sistema de microcemento pendiente de indicar", "Indicar marca o sistema, si Mohamed quiere citarlo"),
        "before": [],
        "process": [
            ("mc-bano-obra", "Pared de la encimera revestida, antes de montar sanitarios y grifería"),
            ("mc-bano-encimera", "Encimera de obra y pared terminadas, con la toma de agua todavía a la vista"),
        ],
        "after": [
            ("mc-bano-ducha-desague", "Ducha a ras de suelo con desagüe lineal, revestida de microcemento"),
            ("mc-bano-ducha-esquina", "Esquina de la ducha con la pendiente hacia el desagüe"),
            ("mc-bano-murete", "Murete de obra y banco revestidos junto a la ducha"),
            ("mc-bano-mampara", "Ducha con la mampara de vidrio montada"),
            ("mc-bano-luz", "El baño terminado con luz natural de la ventana"),
        ],
        "video": ("mc-bano-recorrido", "Recorrido por el baño terminado: banco, paredes y ducha"),
        "album": "microcemento",
        "cover": "mc-bano-ducha-desague",
        "review": None,
    },
    {
        "slug": "caso-fachada",
        "form": "exterior",
        "title": "Reparación y pintura de una fachada",
        "service": "Fachadas y exteriores",
        "summary": "Pilar y muro con el revoque desprendido. Reparación del soporte y fachada pintada de nuevo.",
        "municipio": pend("Mataró", "Confirmar municipio: los archivos dicen Mataró y un álbum antiguo dice Vilassar de Mar"),
        "need": "El revoque del pilar y del muro de la entrada estaba agrietado y desprendido, con la pintura degradada en toda la fachada.",
        "prep": pend("Saneado de las zonas desprendidas, reparación del revoque y regularización del muro antes de pintar.",
                     "Validar con Mohamed: materiales y sistema de reparación aplicados"),
        "finish": "Fachada en color crema, con puerta de garaje y rejas en gris.",
        "product": pend("Producto de acabado pendiente de indicar", "Indicar pintura de fachada utilizada (marca o tipo)"),
        "before": [
            ("fachada-antes-general", "Fachada de la vivienda antes de la obra, con el revoque deteriorado junto a la puerta del garaje"),
            ("fachada-antes-pilar", "Pilar de la entrada con el revoque desprendido y grietas verticales"),
            ("fachada-antes-detalle", "Detalle del pilar dañado junto a la reja"),
        ],
        "process": [
            ("fachada-proceso-escalera", "Reparación del muro con escalera, con las zonas saneadas a la vista"),
            ("fachada-proceso-pintor", "Pintor trabajando en el muro junto a la puerta del garaje"),
        ],
        "after": [
            ("fachada-despues-general", "Fachada terminada en color crema con la puerta del garaje gris"),
            ("fachada-despues-muro", "Muro lateral reparado y pintado"),
            ("fachada-despues-esquina", "Esquina de la fachada terminada, con aristas rectas"),
            ("fachada-despues-entrada", "Escalera de entrada y pilar reparado tras la pintura"),
        ],
        "album": "fachadas",
        "cover": "fachada-despues-general",
        "review": "Antes de publicar: se ve el número de la vivienda en varias fotos. Confirmar permiso del cliente o recortar.",
    },
    {
        "slug": "caso-carpinteria-madera",
        "form": "lacado",
        "title": "Barnizado de la carpintería de madera de un ático",
        "service": "Lacados y barnizados",
        "summary": "Marcos y vigas agrisados por el sol. Lijado y barniz para recuperar la madera.",
        "municipio": pend("Municipio pendiente", "Indicar municipio del ático"),
        "need": "Los marcos, montantes y vigas del cerramiento de madera del ático estaban agrisados y con el barniz perdido por el sol.",
        "prep": pend("Lijado de la madera hasta retirar el barniz deteriorado y limpieza antes de aplicar.",
                     "Validar con Mohamed: preparación realizada"),
        "finish": "Madera barnizada con el color y el brillo recuperados en marcos, montantes y vigas.",
        "product": pend("Barniz y número de capas pendientes de indicar", "Indicar barniz utilizado y número de capas"),
        "before": [
            ("madera-antes-general", "Cerramiento de madera del ático con la madera agrisada"),
            ("madera-antes-marco", "Montante de madera con el barniz perdido"),
            ("madera-antes-detalle", "Detalle de la madera gastada por el sol"),
        ],
        "process": [],
        "after": [
            ("madera-despues-terraza", "Cerramiento de madera barnizado visto desde la terraza"),
            ("madera-despues-marco", "Marco y pilar de madera barnizados junto al ladrillo"),
            ("madera-despues-cristaleras", "Cristaleras con los marcos de madera recuperados"),
            ("madera-despues-exterior", "Carpintería exterior barnizada con brillo"),
        ],
        "album": "madera",
        "cover": "madera-despues-terraza",
        "review": None,
    },
    {
        "slug": "caso-garaje-comunitario",
        "form": "comunidad",
        "title": "Pintura de un garaje comunitario",
        "service": "Comunidades y garajes",
        "summary": "Paredes desconchadas en la parte baja. Reparación, zócalo gris y franja de señalización.",
        "municipio": pend("Municipio pendiente", "Indicar municipio y si se puede nombrar la comunidad"),
        "need": "Las paredes del garaje tenían la pintura y el revestimiento desconchados en la parte baja, con material suelto en el suelo.",
        "prep": pend("Retirada del material suelto y reparación de las zonas desconchadas antes de pintar.",
                     "Validar con Mohamed: preparación realizada"),
        "finish": "Paredes blancas, zócalo gris y franja roja de señalización a lo largo del garaje.",
        "product": pend("Pintura de suelo pendiente de confirmar", "Confirmar si el suelo rojo de las plazas se pintó en esta obra"),
        "before": [
            ("garaje-antes", "Pared del garaje con el revestimiento desconchado y restos en el suelo"),
        ],
        "process": [],
        "after": [
            ("garaje-despues-zocalo", "Pared terminada con zócalo gris y franja roja"),
            ("garaje-despues-pasillo", "Pasillo del garaje con las paredes pintadas"),
            ("garaje-despues-suelo", "Zona de plazas con la pared pintada y el suelo rojo"),
        ],
        "album": "comunidades",
        "cover": "garaje-despues-pasillo",
        "review": None,
    },
]
CASE_BY_SLUG = {c["slug"]: c for c in CASES}


def case_pair(c):
    """Two photos that summarise a case: (name, alt, label) for start and end."""
    if c["before"]:
        first = (*c["before"][0], "Antes")
    else:
        first = (*c["process"][0], "Durante la obra")
    return first, (c["cover"], dict(c["after"])[c["cover"]], "Terminado" if not c["before"] else "Después")


def video_block(c, cls: str = "case-video") -> str:
    if not c.get("video"):
        return ""
    name, caption = c["video"]
    return (f'<figure class="{cls}"><video controls muted playsinline preload="none" '
            f'poster="../shared/media/{name}.jpg" width="480" height="848">'
            f'<source src="../shared/media/{name}.mp4" type="video/mp4"></video>'
            f'<figcaption>{e(caption)}. Vídeo sin sonido.</figcaption></figure>')


def svc_hero(s, sizes: str, cls: str = "", priority: bool = True) -> str:
    """Own photo for the service header, or the labelled slot if there is none."""
    if s.get("hero"):
        n, a = s["hero"]
        return f'<figure class="{cls}">{photo(n, a, sizes, priority=priority)}<figcaption>{e(a)}. Obra propia.</figcaption></figure>'
    t, d = s["photos"][0]
    return placeholder(t, d, cls)


def svc_slots(s) -> list:
    """Photo slots still pending after the header photo."""
    return s["photos"] if s.get("hero") else s["photos"][1:]


def svc_gallery(s, sizes: str = "(min-width: 1024px) 30vw, 50vw") -> str:
    return "".join(f'<figure>{photo(n, a, sizes)}<figcaption>{e(a)}</figcaption></figure>' for n, a in s.get("gallery", []))


def rich(text: str) -> str:
    """Escape plain copy but keep our own pend() markup."""
    return text if text.startswith('<span class="pend"') else e(text)


def _series(prefix: str, numbers, alt_for) -> list[dict]:
    return [{"src": f"{REAL}/{prefix}-{n:02d}.webp", "alt": alt_for(n)} for n in numbers]


def _fachada_alt(n: int) -> str:
    if n <= 7:
        return "Cornisa de ladrillo y muro de la fachada"
    if n <= 17:
        return "Pilar y muro con el revoque desprendido antes de la obra"
    if n <= 19:
        return "Reparación del muro con escalera"
    return "Fachada terminada en color crema"


SHARED_IMG = "../shared/img"
MC_ALBUM = [
    ("mc-bano-ducha-desague", "Ducha a ras de suelo con desagüe lineal"),
    ("mc-bano-ducha-esquina", "Esquina de la ducha con la pendiente hacia el desagüe"),
    ("mc-bano-murete", "Murete de obra y banco revestidos"),
    ("mc-bano-mampara", "Ducha con mampara"),
    ("mc-bano-luz", "Baño terminado con luz natural"),
    ("mc-bano-obra", "Pared revestida antes de montar sanitarios"),
    ("mc-bano-encimera", "Encimera de obra revestida"),
    ("mc-bano-general", "Baño con suelo satinado y ducha con mampara"),
    ("mc-bano-banco", "Banco de obra revestido bajo la ventana"),
    ("mc-gris-pared", "Pared de ducha en microcemento gris oscuro, en obra"),
    ("mc-gris-ducha", "Plato de ducha de microcemento gris oscuro"),
    ("mc-proceso-base", "Fase intermedia del sistema, antes de las capas de acabado"),
    ("mc-proceso-suelo", "Suelo de vivienda durante la aplicación"),
    ("mc-suelo-escalones", "Suelo de salón con escalones revestidos"),
    ("mc-suelo-ladrillo", "Suelo junto a una pared de ladrillo visto"),
    ("mc-suelo-salon", "Suelo continuo en una estancia amplia"),
    ("mc-terraza-escalera", "Terraza y escalera exterior"),
    ("mc-terraza", "Terraza revestida de microcemento"),
    ("deco-pared-aguas", "Pared con acabado decorativo de aguas"),
]

ALBUMS = {
    "microcemento": {
        "title": "Microcemento y acabados decorativos",
        "note": "Baños, suelos, terrazas y paredes de varias obras.",
        "cover": "mc-suelo-escalones",
        "cover_alt": "Suelo de microcemento en un salón con escalones revestidos",
        "photos": [{"src": f"{SHARED_IMG}/{n}-1200.webp", "alt": a} for n, a in MC_ALBUM],
    },
    "fachadas": {
        "title": "Fachadas y exteriores",
        "note": "Fotos de reparación y pintura de fachadas.",
        "cover": "fachada-despues-general",
        "cover_alt": "Fachada terminada en color crema con la puerta del garaje gris",
        "photos": [{"src": "../shared/img/fachada-antes-general-1200.webp",
                    "alt": "Fachada antes de la obra, con el revoque deteriorado"}]
        + _series("rehabilitacion-fachada-mataro",
                  [*range(1, 8), *range(11, 20), *range(21, 29)], _fachada_alt),
    },
    "madera": {
        "title": "Carpintería de madera",
        "note": "Barnizado y recuperación de madera exterior.",
        "cover": "madera-despues-terraza",
        "cover_alt": "Cerramiento de madera barnizado visto desde la terraza",
        "photos": _series("barnizado-madera-atico", range(1, 16),
                          lambda n: "Carpintería de madera antes del barnizado" if n <= 8
                          else "Carpintería de madera barnizada")
        + _series("restauracion-madera-exterior", range(1, 3), lambda n: "Carpintería exterior barnizada"),
    },
    "comunidades": {
        "title": "Comunidades y garajes",
        "note": "Zonas comunes y garajes.",
        "cover": "garaje-despues-pasillo",
        "cover_alt": "Pasillo del garaje con las paredes pintadas",
        "photos": _series("pintura-garaje-comunitario", range(1, 8),
                          lambda n: "Pared del garaje desconchada antes de la obra" if n == 1
                          else "Garaje con paredes pintadas y franja de señalización"),
    },
    "tejados": {
        "title": "Tejados",
        "note": "Reparación de cubiertas de teja.",
        "cover": "reforma-tejado",
        "cover_alt": "Reparación de un tejado de teja",
        "photos": _series("reparacion-tejado-mataro", range(1, 7), lambda n: "Reparación de tejado de teja"),
    },
    "reformas": {
        "title": "Reformas",
        "note": "Escalera de mármol y baño.",
        "cover": "reforma-escalera",
        "cover_alt": "Escalera de mármol reformada",
        "photos": _series("reforma-escalera-marmol-bano", range(1, 12), lambda n: "Reforma de escalera y baño"),
    },
}

# ---------------------------------------------------------------- home copy

HERO = {
    "eyebrow": "BCN ProReforma · Pintores desde 1994",
    "h1": "Pintura, estucos y microcemento en el Maresme y Barcelona",
    "desc": "Empresa familiar de Cabrils. Preparamos cada superficie a conciencia antes de pintar, estucar o aplicar microcemento.",
    "support": "Cuéntanos qué quieres renovar y en qué municipio. Revisaremos la información para indicarte el siguiente paso.",
}

PEOPLE = {
    "mohamed": {
        "name": "Mohamed Ben Mesaud",
        "role": "Responsable del oficio",
        "text": "Pintor desde hace más de treinta años. Valora cada superficie, decide cómo prepararla y está en la obra hasta el último repaso.",
    },
    "omar": {
        "name": "Omar Ben Mesaud",
        "role": "Atención y coordinación",
        "text": "Atiende tu consulta, organiza la visita y el presupuesto, y es tu contacto durante toda la obra.",
    },
}


def gremi_line() -> str:
    return pend('Agremiados en el Gremi de Pintors de Barcelona desde 1994.',
                "Dato de Omar (19/10/2026). Nombre oficial: Gremi d'Empreses de Pintura de Barcelona i Comarques. "
                "Enlazar la ficha del directorio o el certificado de alta al publicar. No usar logotipo sin permiso")


PREP_STEPS = [
    ("Proteger", "Suelos, muebles, carpinterías y enchufes cubiertos antes de abrir un bote."),
    ("Reparar el soporte", "Grietas, desconchados y golpes saneados. La pintura no tapa un soporte en mal estado."),
    ("Imprimar", "Una capa que fija y unifica la superficie para que el acabado agarre y quede uniforme."),
    ("Acabar y limpiar", "Las manos necesarias, cortes limpios y la casa recogida al terminar."),
]

PROCESS = [
    ("Nos cuentas tu idea", "Por el formulario o por WhatsApp, con fotos si las tienes."),
    ("Valoramos el trabajo", "Si hace falta, visitamos la obra para ver el estado de las superficies."),
    ("Presupuesto por escrito", "Con preparación, materiales, protección, lo que no incluye y cómo se gestionan los cambios."),
    ("Ejecución y entrega", "Un responsable en la obra y una revisión final contigo antes de terminar."),
]

FAQ = [
    ("¿Protegéis los muebles y el suelo?",
     pend("Sí. Juntamos los muebles en el centro y los cubrimos con plástico; el suelo se protege con papel grueso o lona según el material. Al terminar retiramos todo y limpiamos.", WEB)),
    ("¿El precio puede cambiar durante la obra?",
     pend("El presupuesto firmado es el precio. Solo cambia si nos pides algo nuevo o si aparece un daño oculto: en ese caso te lo enseñamos con fotos y un presupuesto aparte antes de tocar nada.", WEB)),
    ("¿Cuánto cuesta pintar un piso de 80 m²?",
     pend("Como orientación, entre 1.800 y 3.200 €, según el estado de las paredes y la pintura elegida. Si hay gotelé que alisar, sube. El precio exacto lo da el presupuesto.",
          "Rango de la web actual: validar con presupuestos recientes y aclarar si incluye IVA")),
    ("¿Puedo pedir presupuesto sin que vengáis a casa?",
     "Puedes enviarnos fotos y medidas aproximadas por WhatsApp para una primera orientación. Para cerrar un precio necesitamos ver la obra."),
    ("¿Pedís un adelanto?",
     pend("Un 30 % a la firma, para materiales y reserva de fechas. El resto, durante la obra o al terminar, según su tamaño.", WEB)),
    ("¿Qué horario tenéis en obra?",
     pend("De lunes a viernes de 8:00 a 19:00 y sábados de 9:00 a 14:00. En locales podemos adaptarnos a otros horarios.", WEB)),
    ("¿En qué zona trabajáis?",
     "En el Maresme y Barcelona, en un radio de unos 40 km desde Cabrils. Si no tienes claro si llegamos a tu municipio, pregúntanos."),
    ("¿Hacéis también reformas?",
     "Sí: baños, cocinas, humedades y reparaciones. Nuestra especialidad son la pintura, los estucos y el microcemento."),
]
FAQ_NOTE = "Respuestas en borrador: validar con Mohamed antes de publicar"

# ---------------------------------------------------------------- shared markup


def head(title: str, description: str, theme_css: str, fonts_url: str, letter: str) -> str:
    return f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{e(title)} | Prototipo {letter} · BCN ProReforma</title>
<meta name="description" content="{e(description)}">
<script>document.documentElement.classList.add('js');</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{fonts_url}">
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css">
<link rel="stylesheet" href="../shared/base.css">
<link rel="stylesheet" href="{theme_css}">
<link rel="icon" href="../../logo%20.png">
</head>"""


def proto_bar(letter: str, name: str) -> str:
    return f"""<div class="proto-bar" role="region" aria-label="Avisos del prototipo">
  <p><strong>Prototipo {letter} · {e(name)}.</strong> No envía datos ni está publicado.</p>
  <a href="../index.html">Comparar prototipos</a>
  <button type="button" class="review-toggle" aria-pressed="false">Modo revisión</button>
</div>"""


def skip_link() -> str:
    return '<a class="skip-link" href="#contenido">Saltar al contenido</a>'


def mobile_bar(origin: str) -> str:
    return f"""<nav class="mobile-bar" aria-label="Contacto rápido">
  <a href="{wa_url(wa_message(origin))}" data-track="whatsapp_click" data-origin="{e(origin)}">{icon('whatsapp-logo')}<span>WhatsApp</span></a>
  <a href="{tel_url()}" data-track="phone_click" data-origin="{e(origin)}">{icon('phone')}<span>{CALL_LABEL}</span></a>
</nav>"""


def lightbox() -> str:
    return """<dialog class="lightbox" aria-labelledby="lb-title">
  <div class="lb-head">
    <h2 id="lb-title" class="lb-title"></h2>
    <p class="lb-count" aria-live="polite"></p>
    <button type="button" class="lb-close" aria-label="Cerrar galería"><i class="ph ph-x" aria-hidden="true"></i></button>
  </div>
  <figure class="lb-figure">
    <img class="lb-img" alt="">
    <figcaption class="lb-caption"></figcaption>
  </figure>
  <button type="button" class="lb-prev" aria-label="Foto anterior"><i class="ph ph-arrow-left" aria-hidden="true"></i></button>
  <button type="button" class="lb-next" aria-label="Foto siguiente"><i class="ph ph-arrow-right" aria-hidden="true"></i></button>
</dialog>"""


def albums_json(keys) -> str:
    data = {k: {"title": ALBUMS[k]["title"], "photos": ALBUMS[k]["photos"]} for k in keys}
    return f'<script type="application/json" id="albums-data">{json.dumps(data, ensure_ascii=False)}</script>'


def album_trigger(key: str, label: str, cls: str = "") -> str:
    """Opens the album in the lightbox; without JS it links to the first photo."""
    first = ALBUMS[key]["photos"][0]["src"]
    c = f' class="{cls}"' if cls else ""
    return f'<a{c} href="{first}" data-album="{key}">{label}</a>'


def scripts() -> str:
    return '<script src="../shared/app.js" defer></script>'


def contact_form(origin: str = "contacto") -> str:
    """The shared request form with every state from plan section 9."""
    radios = "\n".join(
        f'<label class="choice"><input type="radio" name="trabajo" value="{v}" required '
        f'aria-describedby="err-trabajo"><span>{e(t)}</span></label>'
        for v, t in WORK_TYPES
    )
    options = "\n".join(f'<option value="{e(m)}"></option>' for m in MUNICIPIOS)
    return f"""<form class="lead-form" data-lead-form novalidate>
  <div class="form-alert" role="alert" hidden></div>

  <div class="field">
    <label for="f-telefono">Teléfono de contacto</label>
    <input id="f-telefono" name="telefono" type="tel" inputmode="tel" autocomplete="tel" required
      aria-describedby="hint-telefono err-telefono">
    <p class="hint" id="hint-telefono">Te llamaremos o escribiremos a este número.</p>
    <p class="error" id="err-telefono" hidden></p>
  </div>

  <div class="field">
    <label for="f-municipio">Municipio de la obra</label>
    <input id="f-municipio" name="municipio" list="municipios" autocomplete="address-level2" required
      aria-describedby="err-municipio note-municipio">
    <datalist id="municipios">{options}</datalist>
    <p class="hint" id="note-municipio" hidden>Comprobaremos si llegamos a tu municipio.</p>
    <p class="error" id="err-municipio" hidden></p>
  </div>

  <fieldset class="field choices">
    <legend>Tipo de trabajo</legend>
    <div class="choice-grid">{radios}</div>
    <p class="error" id="err-trabajo" hidden></p>
  </fieldset>

  <div class="field">
    <label for="f-nombre">Nombre <span class="optional">(opcional)</span></label>
    <input id="f-nombre" name="nombre" autocomplete="given-name">
  </div>

  <div class="field">
    <label for="f-descripcion">Qué quieres renovar <span class="optional">(opcional)</span></label>
    <textarea id="f-descripcion" name="descripcion" rows="4" aria-describedby="hint-descripcion"></textarea>
    <p class="hint" id="hint-descripcion">Por ejemplo: pintar salón y dos dormitorios, paredes con gotelé.</p>
  </div>

  <details class="more">
    <summary>Añadir más detalles <span class="optional">(opcional)</span></summary>
    <div class="more-grid">
      <div class="field">
        <label for="f-superficie">Superficie aproximada</label>
        <select id="f-superficie" name="superficie">
          <option value="">Sin indicar</option>
          <option>No lo sé</option>
          <option>Menos de 50 m²</option>
          <option>De 50 a 90 m²</option>
          <option>De 90 a 150 m²</option>
          <option>Más de 150 m²</option>
        </select>
      </div>
      <div class="field">
        <label for="f-fecha">Cuándo te gustaría empezar</label>
        <select id="f-fecha" name="fecha">
          <option value="">Sin indicar</option>
          <option>Lo antes posible</option>
          <option>En los próximos 3 meses</option>
          <option>Más adelante</option>
          <option>Todavía no lo sé</option>
        </select>
      </div>
      <div class="field">
        <label for="f-presupuesto">Presupuesto previsto</label>
        <select id="f-presupuesto" name="presupuesto">
          <option value="">Prefiero no decirlo</option>
          <option>Todavía no lo sé</option>
          <option>Menos de 1.500 €</option>
          <option>De 1.500 a 5.000 €</option>
          <option>Más de 5.000 €</option>
        </select>
      </div>
    </div>
  </details>

  <input type="hidden" name="origen" value="{e(origin)}">
  <input type="hidden" name="ref" value="">

  <p class="privacy-note">{pend('Usaremos estos datos solo para responder a tu solicitud.', 'Texto legal pendiente de revisión')}
    <a href="privacidad.html">Cómo tratamos tus datos</a>.</p>

  <div class="form-actions">
    <button type="submit" class="btn btn-primary" data-label="Enviar solicitud" data-busy="Enviando…">Enviar solicitud</button>
    <a class="btn-link" href="{wa_url(wa_message('formulario de contacto'))}" data-wa-dynamic data-track="whatsapp_click" data-origin="contacto">{icon('whatsapp-logo')} {WA_LABEL}</a>
  </div>

  <div class="demo-panel" role="group" aria-labelledby="demo-title">
    <p id="demo-title"><strong>Prototipo:</strong> el formulario no envía nada. Elige qué resultado simular:</p>
    <label class="demo-choice"><input type="radio" name="demo" value="ok" checked> Solicitud recibida</label>
    <label class="demo-choice"><input type="radio" name="demo" value="error"> Error del receptor</label>
    <label class="demo-choice"><input type="radio" name="demo" value="network"> Conexión perdida al enviar</label>
  </div>
</form>

<section class="form-success" tabindex="-1" hidden aria-labelledby="ok-title">
  <h2 id="ok-title">{icon('check-circle')} Solicitud recibida</h2>
  <p>Tu referencia es <strong class="ok-ref"></strong>.</p>
  <p>Revisaremos lo que nos cuentas y te contactaremos por teléfono o WhatsApp para indicarte el siguiente paso.</p>
  <p><a class="btn-link ok-wa" href="{wa_url('Hola, os envío fotos para la solicitud que he hecho en la web.')}" data-track="whatsapp_click" data-origin="confirmacion">{icon('whatsapp-logo')} Enviar fotos con tu referencia</a></p>
</section>"""
