"""Local landing pages for the public site (/municipios/pintor-*).

URLs are kept from the old site (they may already rank). Each page has its
own local content: housing type, what the climate does to paint and
finishes there, and which services fit. No invented jobs, reviews or
addresses: works shown are the documented ones, labelled as ours.
"""
TOWNS = [
    {
        "slug": "pintor-cabrils", "name": "Cabrils", "photo": "mc-bano-ducha-desague",
        "intro": "Cabrils es nuestra base. Trabajamos en sus casas unifamiliares y en los pisos del pueblo, con la ventaja de estar a pocos minutos de cualquier obra.",
        "local": [
            "La mayoría de viviendas de Cabrils son casas con jardín en ladera. Eso significa fachadas expuestas al sol de mediodía, carpintería exterior de madera y muros de contención que acumulan humedad.",
            "En interior, muchas casas de los años 80 y 90 conservan el gotelé y los baños de origen: dos trabajos que resolvemos con alisado de paredes y revestimiento de microcemento sin levantar el suelo.",
        ],
        "services": ["microcemento", "pintura-viviendas", "alisados-lacados", "decorativa-estucos"],
    },
    {
        "slug": "pintor-alella", "name": "Alella", "photo": "mc-suelo-escalones",
        "intro": "En Alella pintamos casas y pisos, aplicamos estuco veneciano y revestimos baños y suelos con microcemento, con la vivienda protegida de principio a fin.",
        "local": [
            "Alella combina urbanizaciones de casas unifamiliares con el núcleo antiguo. En las casas grandes, lo habitual es un proyecto completo: interiores, carpintería y, a menudo, un baño o un salón con microcemento.",
            "Son viviendas donde el acabado se ve de cerca y con luz natural. Por eso cuidamos la preparación de cada pared: es lo que distingue un estuco o un liso perfecto de uno que delata los defectos.",
        ],
        "services": ["decorativa-estucos", "microcemento", "pintura-viviendas", "alisados-lacados"],
    },
    {
        "slug": "pintor-el-masnou", "name": "El Masnou", "photo": "fachada-despues-general",
        "intro": "En El Masnou trabajamos en pisos cerca del mar, casas de indianos y viviendas del casco antiguo: pintura, fachadas, estucos y microcemento.",
        "local": [
            "La cercanía del mar trae salitre y humedad: la pintura exterior y la carpintería se degradan antes que en el interior del Maresme. Por eso elegimos sistemas de exterior adecuados y saneamos el soporte antes de pintar.",
            "En las casas antiguas, los techos altos y las molduras piden un trabajo de preparación más cuidadoso que en un piso nuevo.",
        ],
        "services": ["pintura-viviendas", "decorativa-estucos", "microcemento", "alisados-lacados"],
    },
    {
        "slug": "pintor-mataro", "name": "Mataró", "photo": "fachada-proceso-escalera",
        "intro": "En Mataró pintamos pisos y casas, reparamos y pintamos fachadas y revestimos baños con microcemento, desde Cabrils, a pocos minutos.",
        "local": [
            "Mataró es la ciudad más grande del Maresme: pisos en el centro y en los barrios, y casas en las zonas altas. En los pisos, el trabajo más pedido es pintar la vivienda entera y quitar el gotelé; en las casas, fachadas y exteriores.",
            "Cerca del mar, el salitre ataca el revoque y la pintura de fachadas. Antes de pintar, saneamos el soporte: si no, la pintura nueva se levanta en pocos años.",
        ],
        "services": ["pintura-viviendas", "alisados-lacados", "microcemento", "decorativa-estucos"],
    },
    {
        "slug": "pintor-premia-de-mar", "name": "Premià de Mar", "photo": "mc-terraza-escalera",
        "intro": "En Premià de Mar pintamos pisos y casas, revestimos terrazas, baños y escaleras con microcemento y renovamos fachadas cerca del mar.",
        "local": [
            "Muchas viviendas de Premià de Mar tienen terraza o balcón al sol y cerca del mar. El microcemento de exterior y una buena pintura de fachada necesitan un sistema pensado para sol, lluvia y salitre.",
            "En interior, el trabajo más habitual es renovar la pintura de toda la vivienda y alisar paredes con gotelé.",
        ],
        "services": ["microcemento", "pintura-viviendas", "alisados-lacados", "decorativa-estucos"],
    },
    {
        "slug": "pintor-vilassar-de-mar", "name": "Vilassar de Mar", "photo": "madera-despues-terraza",
        "intro": "En Vilassar de Mar pintamos viviendas, renovamos carpintería exterior de madera y aplicamos estucos y microcemento.",
        "local": [
            "Junto al mar, la madera exterior se agrisa y el barniz se pierde con el sol y el salitre. Lijar hasta la madera sana y volver a proteger alarga mucho su vida.",
            "En las casas de pueblo y en los pisos, el estuco y el microcemento son la forma de dar carácter a un salón o a un baño sin una reforma completa.",
        ],
        "services": ["alisados-lacados", "pintura-viviendas", "microcemento", "decorativa-estucos"],
    },
    {
        "slug": "pintor-montgat", "name": "Montgat", "photo": "mc-bano-general",
        "intro": "En Montgat pintamos pisos y casas, revestimos baños con microcemento y aplicamos estucos, con la vivienda protegida durante toda la obra.",
        "local": [
            "Montgat, entre Badalona y El Masnou, tiene muchos pisos con vistas al mar y casas en la parte alta. Los proyectos más habituales son pintar la vivienda entera y renovar el baño con microcemento.",
            "Cerca de la costa, ventilar bien durante la obra y elegir pinturas adecuadas para la humedad marca la diferencia en el resultado.",
        ],
        "services": ["pintura-viviendas", "microcemento", "decorativa-estucos", "alisados-lacados"],
    },
    {
        "slug": "pintor-badalona", "name": "Badalona", "photo": "garaje-despues-pasillo",
        "intro": "En Badalona pintamos pisos, casas y zonas comunes de comunidades, y revestimos baños y suelos con microcemento.",
        "local": [
            "Badalona es una ciudad de pisos: el trabajo más pedido es pintar la vivienda entera, quitar el gotelé y lacar puertas. También pintamos escaleras, portales y garajes de comunidades.",
            "En las comunidades, organizamos la obra para molestar lo mínimo a los vecinos y dejamos la señalización de garajes y escaleras como debe quedar.",
        ],
        "services": ["pintura-viviendas", "alisados-lacados", "microcemento", "decorativa-estucos"],
    },
]


def faq(name: str) -> list:
    return [
        (f"¿Trabajáis en {name}?", f"Sí. Tenemos la base en Cabrils y trabajamos en {name} y en todo el Maresme y Barcelona."),
        ("¿Cómo pido presupuesto?", "Por el formulario, por teléfono o por WhatsApp, con fotos si las tienes. Si hace falta, visitamos la obra y te enviamos el presupuesto por escrito."),
        ("¿Qué incluye el presupuesto?", "La preparación de las superficies, los materiales, la protección de la vivienda, lo que no está incluido y cómo se gestionan los cambios durante la obra."),
    ]
