"""Local landing pages for the public site (/municipios/pintor-*).

URLs are kept from the old site (they may already rank). Each page has its
own local content: housing type, what the climate does to paint and
finishes there, and which services fit. No invented jobs, reviews or
addresses: works shown are the documented ones, labelled as ours.
Optional keys: "title", "h1", "meta" and "faq" (local questions shown before the generic ones).
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
    # Added 2026-11 (prototipos/docs/2026-11-contenido-seo.md, section B).
    {
        "slug": 'pintor-arenys-de-mar', "name": 'Arenys de Mar', "photo": 'fachada-despues-general',
        "title": 'Pintor en Arenys de Mar', "h1": 'Pintor en Arenys de Mar',
        "meta": 'Pintura de pisos y casas de pueblo en Arenys de Mar: paredes, techos, gotelé, lacados y fachadas cerca del mar. Presupuesto por escrito tras la visita.',
        "intro": 'En Arenys de Mar pintamos pisos y casas de pueblo, alisamos paredes con gotelé, lacamos puertas y pintamos fachadas. Llegamos desde Cabrils por la costa.',
        "local": [
            'Arenys de Mar es un pueblo de puerto, con un casco antiguo de casas estrechas y alargadas a ambos lados de la riera, y bloques de pisos hacia el mar y en los barrios más nuevos. En las casas de pueblo, las paredes gruesas y los techos altos piden revisar bien el soporte antes de pintar: es habitual encontrar capas de pintura antigua que hay que retirar.',
            'Las viviendas cercanas al puerto y a la playa reciben brisa marina a diario. En fachadas, balcones y barandillas usamos pinturas de exterior transpirables y tratamos el óxido de las rejas antes de esmaltarlas. En interior, el trabajo más habitual es pintar el piso entero y lacar las puertas.',
            'Si la vivienda está en una calle estrecha del centro, planificamos la descarga de material y, cuando hace falta, el permiso para ocupar la acera, para que la obra no se alargue por la logística.',
        ],
        "services": ['pintura-viviendas', 'alisados-lacados', 'decorativa-estucos', 'microcemento'],
        "faq": [
            ('¿Pintáis casas de pueblo en el casco antiguo de Arenys de Mar?',
             'Sí. En estas casas revisamos primero el estado de las paredes, porque suelen tener varias capas de pintura y zonas con humedad en la planta baja. Te explicamos en el presupuesto qué hay que sanear antes de pintar.'),
            ('¿Qué pintura conviene para una fachada cerca del puerto?',
             'Una pintura de exterior transpirable sobre un soporte limpio y saneado, que deje salir la humedad del muro. Las rejas y barandillas se tratan contra el óxido antes del esmalte. Lo concretamos al ver la fachada.'),
            ('¿Necesito permiso del Ayuntamiento para pintar la fachada?',
             'Para pintar una fachada suele hacer falta una comunicación previa o licencia, y otra para ocupar la acera si se monta andamio. Te indicamos qué trámite corresponde y lo tenemos en cuenta en el plazo.'),
        ],
    },
    {
        "slug": 'pintor-premia-de-dalt', "name": 'Premià de Dalt', "photo": 'fachada-despues-esquina',
        "title": 'Pintor en Premià de Dalt', "h1": 'Pintor en Premià de Dalt',
        "meta": 'Pintamos casas y pisos en Premià de Dalt: interiores, gotelé, lacados, fachadas expuestas al sol y estucos. Presupuesto por escrito tras ver la obra.',
        "intro": 'En Premià de Dalt pintamos casas unifamiliares y pisos, quitamos gotelé, lacamos carpinterías y renovamos fachadas. Estamos en Cabrils, el municipio vecino.',
        "local": [
            'Premià de Dalt sube desde la carretera hacia la sierra: un núcleo con casas de pueblo y bloques de pisos, y barrios de casas unifamiliares en la ladera. En las casas con varias plantas y escalera interior, pintar el hueco de escalera y los techos altos exige andamio interior o plataforma, y lo incluimos en el presupuesto.',
            'Las fachadas orientadas al sur reciben sol casi todo el día y los colores intensos pierden tono antes. Recomendamos pinturas de exterior con buena resistencia a los rayos UV y, en la madera de porches y ventanas, un lijado a fondo antes de volver a barnizar.',
            'En los pisos del núcleo, lo más pedido es pintar la vivienda entera y quitar el gotelé de salones y pasillos. Como estamos al lado, podemos pasar a ver la obra con facilidad y ajustar el calendario a tus horarios.',
        ],
        "services": ['pintura-viviendas', 'alisados-lacados', 'decorativa-estucos', 'microcemento'],
        "faq": [
            ('¿Pintáis la escalera interior y los techos altos de una casa?',
             'Sí. Montamos andamio interior o plataforma para trabajar con seguridad en huecos de escalera y techos de doble altura. Lo incluimos como partida en el presupuesto para que veas su coste.'),
            ('¿Qué color aguanta mejor en una fachada al sol?',
             'Los tonos claros y las pinturas de exterior con buena resistencia UV mantienen el color durante más años. Los colores oscuros o muy saturados pierden tono antes con el sol del sur. Te enseñamos muestras sobre tu fachada antes de decidir.'),
            ('¿Hacéis la casa entera por fases?',
             'Sí. Podemos pintar primero el interior y dejar la fachada o la carpintería exterior para otro momento. Lo dejamos dividido en el presupuesto para que puedas decidir.'),
        ],
    },
    {
        "slug": 'pintor-vilassar-de-dalt', "name": 'Vilassar de Dalt', "photo": 'madera-despues-terraza',
        "title": 'Pintor en Vilassar de Dalt', "h1": 'Pintor en Vilassar de Dalt',
        "meta": 'Pintura de casas de pueblo, pisos y unifamiliares en Vilassar de Dalt: paredes, techos, gotelé, carpintería de madera y estucos. Presupuesto por escrito.',
        "intro": 'En Vilassar de Dalt pintamos casas de pueblo, pisos y casas unifamiliares, alisamos paredes y renovamos carpintería de madera, a pocos minutos de Cabrils.',
        "local": [
            'Vilassar de Dalt está en el interior, al pie de la sierra, con un casco antiguo de casas de pueblo, algunas con muros de piedra, y zonas de casas unifamiliares alrededor. En los muros antiguos de piedra o de ladrillo macizo, la pintura tiene que dejar transpirar la pared: una pintura plástica cerrada sobre un muro húmedo acaba levantándose.',
            'En las casas con jardín, el trabajo suele combinar interior y exterior: paredes y techos, puertas y ventanas de madera, y muros de cerramiento. Muchos de esos muros reciben humedad del terreno por la base, y conviene tratarla antes de pintar.',
            'En los pisos y en las casas más recientes, el trabajo habitual es pintar toda la vivienda, alisar las paredes con gotelé y lacar puertas y armarios en blanco. Lo organizamos por estancias para que puedas seguir viviendo en casa.',
        ],
        "services": ['pintura-viviendas', 'alisados-lacados', 'decorativa-estucos', 'microcemento'],
        "faq": [
            ('¿Qué pintura usáis en una casa de pueblo con muros antiguos?',
             'Pinturas transpirables, como las de cal o silicato, cuando el muro lo pide, para que la humedad pueda salir. Sobre un muro antiguo, una pintura plástica cerrada suele acabar haciendo bolsas. Lo decidimos al ver la pared.'),
            ('¿Barnizáis puertas y ventanas de madera exterior?',
             'Sí. Lijamos hasta la madera sana, reparamos lo necesario y aplicamos un protector y un barniz de exterior en varias manos. Una ventana parte de unos 60 € sin IVA, según su tamaño y estado.'),
            ('¿Podéis pintar los muros del jardín?',
             'Sí. Primero limpiamos y saneamos la base, donde suele subir la humedad del terreno, y después aplicamos una pintura de exterior adecuada. Lo indicamos en el presupuesto por metros.'),
        ],
    },
    {
        "slug": 'pintor-teia', "name": 'Teià', "photo": 'deco-pared-aguas',
        "title": 'Pintor en Teià: casas y pisos', "h1": 'Pintor en Teià',
        "meta": 'En Teià pintamos casas y pisos: interiores, techos altos, lacados, fachadas, estuco veneciano y microcemento. Presupuesto por escrito tras la visita.',
        "intro": 'En Teià pintamos casas y pisos, aplicamos estuco veneciano y lacamos carpinterías, con la vivienda protegida durante toda la obra.',
        "local": [
            'Teià es un municipio pequeño, entre El Masnou y Alella, con un núcleo antiguo y muchas casas unifamiliares en la ladera de la sierra, rodeadas de jardín y, en algunos casos, de viñedos. Son casas con salones amplios, techos altos y mucha luz natural, donde cualquier defecto de la pared se ve con la luz lateral.',
            'En este tipo de vivienda es habitual combinar la pintura de toda la casa con una pared de estuco en el salón o la entrada, y lacar puertas y armarios en el mismo tono. Antes de aplicar un estuco hacemos una muestra sobre la pared para elegir el acabado con la luz real de la casa.',
            'En las fachadas de estas casas, con zócalos de piedra, aleros y barandillas, protegemos el jardín y las plantas antes de empezar y dejamos la zona limpia al terminar cada jornada.',
        ],
        "services": ['pintura-viviendas', 'decorativa-estucos', 'alisados-lacados', 'microcemento'],
        "faq": [
            ('¿Hacéis muestras del color o del estuco antes de empezar?',
             'Sí. Aplicamos una muestra sobre la pared para verla con la luz natural de la casa, por la mañana y por la tarde. Así decides el tono y el acabado antes de pintar toda la estancia.'),
            ('¿Cómo protegéis la casa si está habitada?',
             'Juntamos los muebles en el centro de cada estancia y los cubrimos, protegemos el suelo según el material y trabajamos por zonas. Al terminar cada día dejamos las estancias recogidas.'),
            ('¿Lacáis las puertas en casa o las lleváis al taller?',
             'Depende del número de puertas y del acabado. El lacado en casa es más rápido y evita desmontar; el taller da un acabado más fino en puertas con molduras. Lo concretamos en el presupuesto, con el precio de cada opción.'),
        ],
    },
    {
        "slug": 'pintor-argentona', "name": 'Argentona', "photo": 'fachada-proceso-escalera',
        "title": 'Pintor en Argentona', "h1": 'Pintor en Argentona',
        "meta": 'Pintura de casas, masías y pisos en Argentona: paredes, techos, gotelé, lacados, fachadas y carpintería de madera. Presupuesto por escrito tras la visita.',
        "intro": 'En Argentona pintamos pisos, casas unifamiliares y masías: interiores, fachadas y carpintería, desde Cabrils, a pocos kilómetros.',
        "local": [
            'Argentona, en el interior del Maresme junto a Mataró, mezcla un casco antiguo de casas de pueblo, urbanizaciones de casas con jardín y masías repartidas por el término. En las masías y casas antiguas encontramos muros gruesos, vigas de madera y techos de bovedilla, que se pintan con productos y herramientas distintos a los de un piso.',
            'Al estar más lejos del mar hay menos salitre, pero más diferencia de temperatura entre el día y la noche, y en invierno es frecuente la condensación en paredes frías y en los muros en contacto con el terreno. Si aparecen manchas de moho, las tratamos antes de pintar y recomendamos pintura antimoho en baños y dormitorios.',
            'En las urbanizaciones, muchas casas tienen porches, pérgolas y contraventanas de madera que acusan el sol. Las lijamos y las volvemos a proteger con barniz o lasur de exterior, y aprovechamos para pintar rejas y muros de cerramiento.',
        ],
        "services": ['pintura-viviendas', 'alisados-lacados', 'decorativa-estucos', 'microcemento'],
        "faq": [
            ('¿Pintáis vigas de madera y techos de bovedilla?',
             'Sí. Las vigas se lijan y se barnizan, se tiñen o se pintan según el acabado que quieras, y las bovedillas se pintan a mano protegiendo la madera. Es un trabajo más lento que un techo liso y se presupuesta aparte.'),
            ('Me sale moho en una pared del dormitorio, ¿se arregla pintando?',
             'Pintar encima no lo resuelve. Primero limpiamos y tratamos el moho, revisamos si la causa es condensación o una filtración, y después aplicamos una pintura antimoho. Si la causa es una filtración, te lo decimos antes de pintar.'),
            ('¿Trabajáis en masías alejadas del núcleo?',
             'Sí, en todo el término de Argentona. Para presupuestar necesitamos saber el acceso con furgoneta y si hay que trabajar en altura en la fachada.'),
        ],
    },
    {
        "slug": 'pintor-barcelona', "name": 'Barcelona', "photo": 'garaje-despues-pasillo',
        "title": 'Pintor en Barcelona: pisos y fincas antiguas', "h1": 'Pintor en Barcelona',
        "meta": 'Pintamos pisos en Barcelona: techos altos, molduras, gotelé, lacado de puertas, estucos y escaleras de comunidad. Presupuesto por escrito tras la visita.',
        "intro": 'En Barcelona pintamos pisos enteros o por estancias, quitamos gotelé, lacamos puertas y pintamos escaleras y zonas comunes de comunidades.',
        "local": [
            'Buena parte de los pisos de Barcelona están en fincas antiguas, como las del Eixample, Gràcia o Sant Antoni, con techos de más de tres metros, molduras y rosetones de yeso y puertas de madera altas. Pintar estos pisos lleva más preparación que uno moderno: las molduras se repasan a mano, las grietas de los techos se abren y se rellenan, y hace falta andamio interior para trabajar arriba con seguridad.',
            'En los pisos de los años 60 y 70 el trabajo más pedido es quitar el gotelé y lacar las puertas de sapelli en blanco. En comunidades, pintamos escaleras y vestíbulos por plantas y organizamos el horario para que los vecinos puedan seguir usando la escalera.',
            'Si la obra afecta a la fachada o necesita andamio en la calle, el Ayuntamiento pide un trámite previo y un permiso de ocupación de la vía pública. Lo tenemos en cuenta en el plazo y te indicamos qué gestión corresponde en cada caso.',
        ],
        "services": ['pintura-viviendas', 'alisados-lacados', 'decorativa-estucos', 'microcemento'],
        "faq": [
            ('¿Cuánto cuesta pintar un piso con techos altos en el Eixample?',
             'Los techos de más de tres metros y las molduras suelen sumar entre un 10 y un 20 % a un piso estándar, por el andamio interior y el trabajo a mano. Como referencia, un piso de 80 m² vacío y en buen estado empieza en 1.800 € sin IVA. Te damos el precio cerrado tras la visita.'),
            ('¿Restauráis molduras de yeso?',
             'Reparamos fisuras y pequeños desperfectos en molduras y rosetones, y los pintamos a mano para no perder el detalle. Si faltan piezas enteras, te lo indicamos en la visita para valorar su reposición.'),
            ('¿Pintáis escaleras de comunidad en Barcelona?',
             'Sí. Presupuestamos por plantas, trabajamos por tramos para que la escalera siga en uso y protegemos barandillas, ascensor y buzones. Como orientación, desde 300 € por planta sin IVA.'),
        ],
    },
]


def faq(name: str) -> list:
    return [
        (f"¿Trabajáis en {name}?", f"Sí. Tenemos la base en Cabrils y trabajamos en {name} y en todo el Maresme" + ("." if name == "Barcelona" else " y Barcelona.")),
        ("¿Cómo pido presupuesto?", "Por el formulario, por teléfono o por WhatsApp, con fotos si las tienes. Si hace falta, visitamos la obra y te enviamos el presupuesto por escrito."),
        ("¿Qué incluye el presupuesto?", "La preparación de las superficies, los materiales, la protección de la vivienda, lo que no está incluido y cómo se gestionan los cambios durante la obra."),
    ]
