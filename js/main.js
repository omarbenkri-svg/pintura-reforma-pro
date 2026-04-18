document.addEventListener('DOMContentLoaded', () => {
    /* ---- BEFORE/AFTER SLIDER (inlined) ---- */
    (function initBeforeAfterSlider() {
        const containers = document.querySelectorAll('.ba-slider-container');
        containers.forEach(container => {
            const slider = container.querySelector('.ba-slider-handle');
            const beforeImg = container.querySelector('.ba-before');
            const moveSlider = (e) => {
                const rect = container.getBoundingClientRect();
                let x = (e.pageX || (e.touches && e.touches[0].pageX) || 0) - rect.left;
                if (x < 0) x = 0;
                if (x > rect.width) x = rect.width;
                const position = (x / rect.width) * 100;
                if (slider) slider.style.left = `${position}%`;
                if (beforeImg) beforeImg.style.width = `${position}%`;
            };
            container.addEventListener('mousemove', moveSlider);
            container.addEventListener('touchmove', moveSlider);
        });
    })();

    /* =========================================
       -1. MOTOR DE IDIOMAS (i18n)
       ========================================= */
    const dict = {
        es: {
            nav_services: "Servicios <i class='fa-solid fa-chevron-down' style='font-size:0.7em;margin-left:3px;'></i>",
            nav_residential:"Residencial", nav_res_paint:"Pintura de Pisos / Casas",
            nav_res_bath:"Baños y Cocinas", nav_res_integral:"Reformas Integrales",
            nav_b2b:"Empresas & Zonas Comunes", nav_b2b_office:"Oficinas y Locales Comerciales",
            nav_b2b_parking:"Parkings y Escaleras", nav_b2b_community:"Mantenimiento de Comunidades",
            nav_method:"Método <i class='fa-solid fa-chevron-down' style='font-size:0.7em;margin-left:3px;'></i>",
            nav_method_1:"1. Asesoramiento 1 a 1", nav_method_2:"2. Presupuesto Cerrado", nav_method_3:"3. Ejecución y Entrega",
            nav_gallery:"Trabajos", nav_faq:"FAQ",
            nav_whatsapp:"<i class='fa-brands fa-whatsapp'></i> WhatsApp",
            hero_title: "Pintura, Reforma y Acabado de Obras en Cabrils y Maresme",
            hero_desc: "Especialistas con sede en Cabrils. 30 años de oficio real, no de marketing. Te visitamos gratis, presupuesto cerrado en 48h y sin sorpresas.",
            hero_btn_quote: "<i class='fa-solid fa-calculator'></i> ¿Cuánto me costará?",
            hero_btn_phone: "<i class='fa-solid fa-phone'></i> 639 058 819",
            calc_title:"¿Cuánto te va a costar?",
            calc_intro:"Responde unas preguntas rápidas y te damos una estimación realista al momento.<br><small style='color:var(--text-light);display:block;margin-top:10px;'><i class='fa-solid fa-gem' style='color:var(--accent);'></i> <b>Especialistas en proyectos integrales y acabados de alta calidad.</b><br>No realizamos parches ni pequeñas reparaciones.</small>",
            alert_radio:"Por favor escoge una opción.",
            alert_data:"Por favor déjanos tu nombre y móvil.",
            hero_eyebrow:"30 años de oficio real · +180 hogares transformados en Maresme y Barcelona",
            hero_stat_1:"Hogares transformados",
            hero_stat_2:"Entrega puntual",
            hero_stat_3:"Años de oficio real",
            hero_stat_5:"Valoración en Google",
            services_cat_high_end:"Alta Decoración & Revestimientos",
            service_micro_title:"Microcemento de Autor",
            service_micro_desc:"Suelos y paredes continuas sin juntas de dilatación. Estética industrial refinada con máxima resistencia al desgaste.",
            service_micro_feat_1:"Aplicación sobre baldosa sin escombro",
            service_micro_feat_2:"100% Impermeable (ideal baños/cocinas)",
            service_micro_feat_3:"Garantía Estructural (Malla de fibra)",
            service_estuco_title:"Estuco Veneciano Real",
            service_estuco_desc:"Elegancia clásica mediante técnicas de espatulado a la cal. Texturas con profundidad y brillo natural.",
            service_estuco_feat_1:"Cal de Grassello de alta pureza",
            service_estuco_feat_2:"Protección con ceras naturales",
            service_estuco_feat_3:"Efecto Mármol sin juntas",
            services_tag:"Lo que hacemos",
            services_title:"Servicios Especializados",
            services_subtitle:"Alta ingeniería aplicada a la pintura y la reforma residencial e industrial en el Maresme y Barcelona.",
            services_cat_residential:"Soluciones Residenciales",
            service_1_title:"Pintura de Interiores",
            service_1_desc:"Alisados de máxima precisión y acabados decorativos que transforman la percepción de tus espacios.",
            service_1_feat_1:"Alisado y Eliminación de Gotelé",
            service_1_feat_2:"Pintura Plástica Antipolvo",
            service_1_feat_3:"Lacado de Puertas y Zócalos",
            service_2_title:"Baños y Cocinas Pro",
            service_2_desc:"Reformas parciales o integrales con gestión de fontanería, electricidad y mobiliario a medida.",
            service_2_feat_1:"Sustitución de Bañera por Plato",
            service_2_feat_2:"Mobiliario de Cocina Premium",
            service_2_feat_3:"Revestimientos de Alta Resistencia",
            service_3_title:"Reformas de Pisos y Casas",
            service_3_desc:"Planificación integral para rehabilitar viviendas vacías o habitadas con mínima molestia.",
            service_3_feat_1:"Cambio de Suelos (Parquet/Cerámico)",
            service_3_feat_2:"Tabiquería y Pladur",
            service_3_feat_3:"Climatización e Iluminación",
            service_tech_title:"Tratamientos Especiales",
            service_tech_desc:"Soluciones para problemas críticos: humedades, moho o protección pasiva contra el fuego.",
            service_tech_feat_1:"Pinturas Intumescentes Certificadas",
            service_tech_feat_2:"Barreras Anti-humedad capilar",
            service_tech_feat_3:"Aislamiento Térmico con Corcho",
            services_cat_business:"Empresas & Zonas Comunes",
            service_4_title:"Oficinas y Locales",
            service_4_desc:"Acondicionamiento rápido para negocios. Adaptamos horarios para no frenar tu facturación.",
            service_4_feat_1:"Pintura de Grandes Superficies",
            service_4_feat_2:"Divisiones de Cristal y Madera",
            service_4_feat_3:"Mantenimiento Preventivo",
            service_5_title:"Escaleras y Parkings",
            service_5_desc:"Servicio especializado para administradores de fincas y presidentes de comunidad.",
            service_5_feat_1:"Pintura de Suelos Epoxi",
            service_5_feat_2:"Reparación de Fachadas y Patios",
            service_5_feat_3:"Mantenimiento de Zonas Nobles",
            compare_title: "Lo que <span>otros no te cuentan</span>",
            compare_row_1_good: "Cumplimos los plazos acordados: respetamos tu tiempo desde el primer día.",
            compare_row_5_good: "Cuidamos tu hogar como si fuera el nuestro: protección total de mobiliario y superficies.",
            process_2_title: "Visita gratuita en tu domicilio",
            process_2_desc: "Venimos a verte, medimos con precisión y te asesoramos en persona, sin coste ni compromiso.",
            footer_title: "Pintura, Reformas y Acabados",
            footer_desc: "30 años de oficio artesano. Profesionales de confianza en Barcelona y Maresme.",
            footer_loc: "<i class='fa-solid fa-location-dot'></i> Maresme y Barcelona",
            trust_label: "Por qué confían en nosotros",
            trust_1_title: "Cuidado total de tu hogar",
            trust_1_desc: "Trato profesional y cuidadoso: máxima protección para tus muebles, suelos y paredes.",
            trust_1_seal: "Incluido",
            trust_2_title: "Precio Cerrado por Contrato",
            trust_2_desc: "El presupuesto firmado es el precio final. Sin sorpresas ni costes ocultos a mitad de obra.",
            trust_2_seal: "Garantizado",
            trust_3_title: "Equipo propio y trato directo",
            trust_3_desc: "Sin intermediarios ni agencias: los mismos artesanos de principio a fin. Contacto directo con el responsable.",
            trust_3_seal: "30 años",
            trust_4_title: "Tu casa, lista para vivir",
            trust_4_desc: "Limpieza profunda al acabar cada jornada y al finalizar la obra: dejamos todo como lo encontramos, o mejor.",
            trust_4_seal: "Cada día",
            trust_5_title: "Compromiso de entrega puntual",
            trust_5_desc: "Respetamos tu tiempo desde el primer día. Nuestros plazos son realistas y los cumplimos.",
            trust_5_seal: "Sin excusas",
            trust_6_title: "30 años de oficio real — Maresme y Barcelona",
            trust_6_desc: "Una reputación construida proyecto a proyecto, no de folleto. Más de 180 hogares transformados.",
            trust_6_seal: "Desde 1994",
            compare_label: "Transparencia total",
            compare_subtitle: "Compara antes de decidir. La diferencia entre un trabajo mediocre y uno que dura décadas está en los detalles.",
            compare_row_1_label: "Cumplimiento de plazos",
            compare_row_1_bad: "Retrasos frecuentes sin consecuencias. 'La semana que viene…'",
            compare_row_1_good: "Cumplimos los plazos acordados: respetamos tu tiempo desde el primer día.",
            compare_row_2_label: "Transparencia de precio",
            compare_row_2_bad: "Presupuesto orientativo que se infla a mitad de obra con 'imprevistos'.",
            compare_row_2_good: "Precio cerrado y firmado. Lo que ves es lo que pagas.",
            compare_row_3_label: "Personal en la obra",
            compare_row_3_bad: "Subcontratistas sin verificar. No sabes quién entra en tu casa.",
            compare_row_3_good: "Equipo 100% propio y regulado. Sin intermediarios.",
            compare_row_4_label: "Estado después de la obra",
            compare_row_4_bad: "Polvo, escombros y desorden. La limpieza corre por tu cuenta.",
            compare_row_4_good: "Limpieza industrial incluida. Espacio listo para entrar a vivir.",
            compare_row_5_label: "Cobertura de daños",
            compare_row_5_bad: "Sin seguro. Si hay un daño, el problema es tuyo.",
            compare_row_6_label: "Calidad de materiales",
            compare_row_6_bad: "Materiales de bajo coste para maximizar margen.",
            compare_row_6_good: "Marcas de primera: Valentine, Titanlux, Mapei.",
            compare_cta: "📞 Pide tu presupuesto cerrado ahora — sin compromiso",
            process_tag: "Nuestro método",
            process_title: "Ingeniería del Resultado",
            process_subtitle: "Así transformamos tu visión en una realidad técnica impecable y sin fricción.",
            process_1_title: "Escucha Activa y Diagnóstico",
            process_1_desc: "Analizamos tu estilo de vida o negocio para proponer soluciones que maximicen el valor de la propiedad.",
            process_3_title: "Presupuesto de Máxima Claridad",
            process_3_desc: "Documento cerrado por contrato. Sin sobresaltos de última hora.",
            process_4_title: "Ejecución Quirúrgica",
            process_4_desc: "Protección total, cumplimiento de cronograma y limpieza industrial profunda.",
            ba_tag: "Resultados reales",
            ba_title: "La Transformación: Antes y Después",
            ba_subtitle: "Desliza para ver la calidad real de nuestra ejecución técnica.",
            ba_before: "Estado Inicial",
            ba_after: "Entrega Final",
            gallery_tag: "Portafolio",
            gallery_title: "Proyectos Reales",
            gallery_subtitle: "Resultados limpios y duraderos en viviendas del Maresme y Barcelona.",
            reviews_tag: "Opiniones verificadas",
            reviews_title: "Lo que opinan nuestros clientes",
            reviews_subtitle: "Reseñas reales de clientes en el Maresme y Barcelona.",
            reviews_google_btn: "Ver todas las reseñas en Google",
            reviews_leave: "Déjanos tu reseña",
            about_tag: "Quiénes somos",
            about_title: "30 años de oficio real,<br><span class=\"highlight\">no de catálogo de marketing.</span>",
            about_p1: "Hay muchas empresas que te mandan una foto bonita y luego subcontratan. Nosotros no. Llevamos más de 30 años trabajando con las manos, aprendiendo en cada pared.",
            about_p2: "Sabemos que dejar entrar a desconocidos da respeto. Nuestro estándar mínimo es: precio que no cambia, obra limpia cada día y entrega a tiempo.",
            about_signature: "— <a href='tel:+34639058819' onclick='trackPhoneCall()' style='color:var(--text);text-decoration:underline;'>639 058 819</a> | 30 años en el oficio",
            insta_subtitle: "Síguenos · obras en directo cada día",
            insta_btn: "Seguir en Instagram",
            insta_footer_text: "Contenido nuevo cada día · obras reales · consejos de mantenimiento",
            insta_footer_btn: "Ver perfil completo",
            faq_tag: "Resolvemos tus dudas",
            faq_title: "Preguntas Frecuentes",
            faq_1_q: "¿Realmente cubrís todo el mobiliario y protegéis el suelo?",
            faq_1_a: "<strong>Sí, lo protegemos absolutamente todo.</strong> Los muebles se forran y el suelo se protege con papel o lona. Al acabar, no verás ni una mota de polvo.",
            faq_2_q: "¿El presupuesto tiene algún coste oculto o sorpresas finales?",
            faq_2_a: "<strong>No, cero costes ocultos.</strong> Precio Cerrado y Firmado. Solo varía si pides un cambio o ampliación fuera de contrato.",
            faq_3_q: "¿Qué pasa si la obra se retrasa de la fecha de entrega?",
            faq_3_a: "<strong>Lo compensamos.</strong> Si hay retraso imputable a nosotros, compensamos económicamente. Nuestra tasa de cumplimiento es del 98%.",
            faq_4_q: "¿Pedís dinero por adelantado para empezar?",
            faq_4_a: "<strong>Un 30% a la firma.</strong> Y el resto en certificaciones de obra o al finalizar.",
            faq_5_q: "¿Cuánto cuesta pintar un piso de 80m² en el Maresme?",
            faq_5_a: "<strong>Entre 1.800€ y 3.200€.</strong> Depende del estado de las paredes y si hay gotelé.",
            faq_6_q: "¿Cuánto tarda una reforma de baño completa?",
            faq_6_a: "<strong>Entre 5 y 10 días laborables.</strong> Un baño estándar lo hacemos en una semana.",
            faq_7_q: "¿Trabajáis los fines de semana?",
            faq_7_a: "<strong>Los sábados por la mañana sí, domingos no.</strong> Para excepciones, nos podemos adaptar.",
            faq_8_q: "¿En qué zonas trabajáis?",
            faq_8_a: "<strong>Todo el Maresme y Barcelona ciudad.</strong> Visita de presupuesto gratuita en estas zonas.",
            cta_tag: "Sin compromiso",
            cta_title: "¿Preparado para transformar tu espacio?",
            cta_desc: "Visita gratuita en el Maresme, Barcelona y Costa Brava. Presupuesto cerrado en 48h. Precio que no cambia.",
            cta_btn_1: "<i class='fa-solid fa-calculator'></i> Calcular mi presupuesto",
            cta_btn_2: "<i class='fa-brands fa-whatsapp'></i> WhatsApp directo",
            cta_trust_1: "Garantía por escrito",
            cta_trust_2: "Precio cerrado",
            cta_trust_3: "30 años de oficio",
            cta_trust_4: "Respuesta en <2h",
            footer_brand_title: "<i class='fa-solid fa-house-chimney' style='color:var(--accent);margin-right:8px;'></i>Pintura, Reforma y Acabado de Obras",
            footer_brand_desc: "Especialistas con sede en Cabrils. Referente de confianza en el Maresme y Barcelona. 30 años de oficio real y gestión integral.",
            footer_nav_1_title: "Servicios Pro",
            footer_nav_1_l1: "Pintura Profesional",
            footer_nav_1_l2: "Baños y Cocinas",
            footer_nav_1_l3: "Reformas Integrales",
            footer_nav_1_l4: "Comunidades y Locales",
            footer_nav_2_title: "Confianza Total",
            footer_nav_2_l1: "Garantía por escrito",
            footer_nav_2_l2: "Precio cerrado",
            footer_nav_2_l3: "Materiales certificados",
            footer_nav_2_l4: "30 años de oficio",
            footer_nav_3_title: "Contacto Directo",
            footer_nav_3_loc: "Maresme y Barcelona",
            footer_nav_areas_title: "Zonas de Servicio",
            footer_nav_areas_more: "Otras Localidades",
            footer_bottom: "Pintura, Reforma y Acabado de Obras. Todos los derechos reservados.",
            cookie_text: "Utilizamos cookies propias para mejorar tu experiencia. Al continuar navegando aceptas nuestra <a href='#' style='color:var(--accent);text-decoration:underline;'>política de privacidad</a>.",
            cookie_btn: "Aceptar y cerrar",
            // Calculator Keys
            calc_step1_q: "1. Selecciona el foco principal de tu proyecto:",
            calc_step2_q: "2. ¿En qué tipo de inmueble se realizará?",
            calc_step2_desc: "Ayuda a calcular logística exterior e interior.",
            calc_step3_q: "3. ¿Cuál es el estado actual del inmueble?",
            calc_step3_desc: "El nivel de protección/escombros afecta directamente el coste.",
            calc_step4_q: "4. Tamaño de la superficie a trabajar",
            calc_step5_q: "5. Nivel de acabados deseado",
            calc_step6_q: "6. ¿Para cuándo necesitas tenerlo listo?",
            calc_step6_desc: "Tu timeline ayuda a planificar nuestra agenda.",
            calc_placeholder_name: "Tu nombre",
            calc_placeholder_phone: "Tu teléfono",
            btn_next: "Continuar <i class='fa-solid fa-arrow-right'></i>",
            btn_calc: "Emitir Análisis <i class='fa-solid fa-calculator'></i>",
            calc_loader: "Generando Precio Orientativo Local...",
            calc_price_title: "Estimación Analítica Pro",
            calc_price_desc: "Este rango es una aproximación técnica. Envíanos el informe por WhatsApp para confirmar viabilidad y fecha de visita.",
            btn_whatsapp_calc: "Agendar Visita por WhatsApp",
            calc_res_paint: "Pintura Profesional",
            calc_res_bath: "Baños y Cocinas",
            calc_res_integral: "Reformas e Industrias",
            calc_prop_piso: "Piso",
            calc_prop_casa: "Casa/Adosado",
            calc_prop_local: "Local",
            calc_m2_min: "10m²",
            calc_m2_max: "250m²+",
            calc_email_titulo: "Tu presupuesto ya está listo",
            calc_email_subtitulo: "Te lo mandamos también por email — opcional",
            calc_email_placeholder: "tu@email.com",
            calc_email_btn_saltar: "Saltar",
            calc_email_btn_anadir: "Añadir y enviar",
            calc_email_error_invalido: "Email no válido. Revísalo o salta."
        },

        en: {
            nav_services: "Our Services <i class='fa-solid fa-chevron-down' style='font-size:0.7em; margin-left:3px;'></i>",
            nav_residential: "Residential",
            nav_res_paint: "House & Apartment Painting",
            nav_res_bath: "Bathrooms & Kitchens",
            nav_res_integral: "Complete Renovations",
            nav_b2b: "Corporate & Communities",
            nav_b2b_office: "Offices & Retail Spaces",
            nav_b2b_parking: "Garages & Staircases",
            nav_b2b_community: "Community Maintenance",
            services_cat_high_end: "High-End Decor & Surfacing",
            service_micro_title: "Signature Microcement",
            service_micro_desc: "Seamless floors and walls without expansion joints. Refined industrial aesthetic with maximum wear resistance.",
            service_micro_feat_1: "Application over tile (no debris)",
            service_micro_feat_2: "100% Waterproof (ideal for baths/kitchens)",
            service_micro_feat_3: "Structural Guarantee (Technical mesh)",
            service_estuco_title: "Real Venetian Stucco",
            service_estuco_desc: "Classic elegance through lime spatulating techniques. Textures with depth and natural shine.",
            service_estuco_feat_1: "High-purity Grassello Lime",
            service_estuco_feat_2: "Natural wax protection",
            service_estuco_feat_3: "Jointless Marble Effect",
            service_tech_title: "Specialized Treatments",
            service_tech_desc: "Solutions for critical issues: moisture, mold, or passive fire protection.",
            service_tech_feat_1: "Certified Intumescent Paints",
            service_tech_feat_2: "Capillary damp barriers",
            service_tech_feat_3: "Thermal Isolation with Cork",
            nav_method: "Our Process <i class='fa-solid fa-chevron-down' style='font-size:0.7em; margin-left:3px;'></i>",
            nav_method_1: "1. 1-to-1 Consultation",
            nav_method_2: "2. Fixed Quote",
            nav_method_3: "3. Turnkey Execution",
            nav_gallery: "Portfolio",
            nav_faq: "FAQ",
            nav_whatsapp: "<i class='fa-brands fa-whatsapp'></i> Chat on WhatsApp",
            hero_eyebrow: "30 years of craftsman trade · +180 homes transformed in Maresme and Barcelona",
            hero_stat_1: "Homes transformed",
            hero_stat_2: "On-time delivery",
            hero_stat_3: "Years of real trade",
            hero_stat_5: "Google Rating",
            hero_title: "We care for your renovation as <br> if it were our own project.",
            hero_desc: "30 years of trade, not marketing. Free site visit in Maresme and Barcelona, fixed quote in 48h and no surprises.",
            hero_btn_quote: "How much will it cost?",
            hero_btn_phone: "<i class='fa-solid fa-phone'></i> 639 058 819",
            services_tag: "What we do",
            services_title: "Specialized Services",
            services_subtitle: "High-end engineering applied to painting and residential renovation in Maresme and Barcelona.",
            services_cat_residential: "Residential Solutions",
            service_1_title: "Interior Painting",
            service_1_desc: "High-precision plaster finishes and decorative coatings that transform the perception of your spaces.",
            service_1_feat_1: "Skimming & Popcorn Ceiling Removal",
            service_1_feat_2: "Anti-Dust Plastic Paint",
            service_1_feat_3: "Hypoallergenic Low-VOC Enamels",
            service_2_title: "Bathrooms & Kitchens",
            service_2_desc: "Complete renovation with waterproofing, tiling, plumbing and fixtures installation.",
            service_2_feat_1: "Full Waterproofing System",
            service_2_feat_2: "Porcelain & Large-Format Tile",
            service_2_feat_3: "Integrated Plumbing & Fixtures",
            service_3_title: "Complete Renovations",
            service_3_desc: "Turnkey project management: architecture, construction, finishes and delivery.",
            service_3_feat_1: "Single Contract, All Trades",
            service_3_feat_2: "Structural Permits & Compliance",
            service_3_feat_3: "Guaranteed Delivery Dates",
            services_cat_business: "Business Solutions",
            service_4_title: "Offices & Commercial Spaces",
            service_4_desc: "Minimising downtime. We work at night and weekends to avoid disruption to your business.",
            service_4_feat_1: "Night & Weekend Scheduling",
            service_4_feat_2: "Epoxy & Anti-Slip Coatings",
            service_4_feat_3: "Fire-Resistant Certification",
            service_5_title: "Communities & Garages",
            service_5_desc: "Integral maintenance contracts for communities: facades, common areas and parking.",
            service_5_feat_1: "Long-Term Maintenance Contracts",
            service_5_feat_2: "Facade Restoration & Waterproofing",
            service_5_feat_3: "Thermochromic & Anti-Graffiti Treatments",
            compare_label: "Total Transparency",
            compare_title: "Us vs. The Industry",
            compare_subtitle: "Compare before you decide. The difference between mediocre work and work that lasts decades is in the details.",
            compare_row_1_label: "Deadline Compliance",
            compare_row_1_bad: "Frequent delays with no consequences. 'Next week…'",
            compare_row_2_label: "Price Transparency",
            compare_row_2_bad: "Approximate quote that inflates mid-project with 'unexpected costs'.",
            compare_row_2_good: "Fixed and signed price. What you see is what you pay.",
            compare_row_3_label: "On-site Staff",
            compare_row_3_bad: "Unverified subcontractors. You don't know who enters your home.",
            compare_row_3_good: "100% own and regulated team. No middlemen.",
            compare_row_4_label: "Post-project Condition",
            compare_row_4_bad: "Dust, debris and disorder. Cleaning is on you.",
            compare_row_4_good: "Industrial cleaning included. Space ready to move in.",
            compare_row_5_label: "Damage Coverage",
            compare_row_5_bad: "No insurance. If there's damage, it's your problem.",
            compare_row_6_label: "Material Quality",
            compare_row_6_bad: "Low-cost materials to maximise margin.",
            compare_row_6_good: "Premium brands: Valentine, Titanlux, Mapei.",
            compare_cta: "📞 Request your fixed quote now — no obligation",
            process_tag: "Our method",
            process_title: "Engineering the Result",
            process_subtitle: "This is how we transform your vision into a flawless, friction-free technical reality.",
            process_1_title: "Active Listening & Diagnosis",
            process_1_desc: "We analyse your lifestyle or business to propose solutions that maximise the property's value.",
            process_3_title: "Maximum Clarity Quote",
            process_3_desc: "Contract-locked document. No last-minute surprises.",
            process_4_title: "Surgical Execution",
            process_4_desc: "Total protection, schedule compliance and deep industrial cleaning.",
            ba_tag: "Real results",
            ba_title: "The Transformation: Before & After",
            ba_subtitle: "Slide to see the real quality of our technical execution.",
            ba_before: "Initial State",
            ba_after: "Final Delivery",
            gallery_tag: "Portfolio",
            gallery_title: "Real Projects",
            gallery_subtitle: "Clean, long-lasting results in homes across Maresme and Barcelona.",
            reviews_tag: "Verified reviews",
            reviews_title: "What our clients say",
            reviews_subtitle: "Real reviews from clients in Maresme and Barcelona.",
            reviews_google_btn: "See all reviews on Google",
            reviews_leave: "Leave us your review",
            about_tag: "Who we are",
            about_title: "30 years of real trade,<br><span class=\"highlight\">not marketing brochures.</span>",
            about_p1: "Many companies send you a nice photo and then subcontract. We don't. We have spent over 30 years working with our hands, learning at every wall.",
            about_p2: "We know that letting strangers into your home takes trust. Our minimum standard is: price that doesn't change, clean site every day and on-time delivery.",
            about_signature: "— <a href='tel:+34639058819' onclick='trackPhoneCall()' style='color:var(--text);text-decoration:underline;'>639 058 819</a> | 30 years in the trade",
            insta_subtitle: "Follow us · live projects every day",
            insta_btn: "Follow on Instagram",
            insta_footer_text: "New content every day · real projects · maintenance tips",
            insta_footer_btn: "See full profile",
            faq_tag: "We answer your questions",
            faq_title: "Frequently Asked Questions",
            faq_1_q: "Do you really cover all the furniture and protect the floor?",
            faq_1_a: "<strong>Yes, we protect absolutely everything.</strong> Furniture is wrapped and floors are covered with paper or canvas. When we finish, you won't see a speck of dust.",
            faq_2_q: "Does the quote have any hidden costs or final surprises?",
            faq_2_a: "<strong>No, zero hidden costs.</strong> Fixed and Signed Price. It only varies if you request a change or extension outside the contract.",
            faq_3_q: "What happens if the project is delayed from the delivery date?",
            faq_3_a: "<strong>We compensate you.</strong> If there is a delay attributable to us, we compensate financially. Our on-time delivery rate is 98%.",
            faq_4_q: "Do you ask for money upfront to start?",
            faq_4_a: "<strong>30% upon signing.</strong> The rest in project certifications or upon completion.",
            faq_5_q: "How much does it cost to paint an 80m² apartment in Maresme?",
            faq_5_a: "<strong>Between €1,800 and €3,200.</strong> Depends on wall condition and whether there is textured paint.",
            faq_6_q: "How long does a full bathroom renovation take?",
            faq_6_a: "<strong>Between 5 and 10 working days.</strong> A standard bathroom we complete in one week.",
            faq_7_q: "Do you work on weekends?",
            faq_7_a: "<strong>Saturday mornings yes, Sundays no.</strong> For exceptions, we can adapt.",
            faq_8_q: "What areas do you work in?",
            faq_8_a: "<strong>All of Maresme and Barcelona city.</strong> Free quote visit in these areas.",
            cta_tag: "No obligation",
            cta_title: "Ready to transform your space?",
            cta_desc: "Free visit in Maresme, Barcelona and Costa Brava. Fixed quote in 48h. Price that doesn't change.",
            cta_btn_1: "<i class='fa-solid fa-calculator'></i> Calculate my budget",
            cta_btn_2: "<i class='fa-brands fa-whatsapp'></i> Direct WhatsApp",
            cta_trust_1: "Written guarantee",
            cta_trust_2: "Fixed price",
            cta_trust_3: "30 years of trade",
            cta_trust_4: "Response in <2h",
            footer_brand_title: "<i class='fa-solid fa-house-chimney' style='color:var(--accent);margin-right:8px;'></i>Painting, Renovations & Finishes",
            footer_brand_desc: "Trusted reference in Maresme and Barcelona. Specialists in high-end finishes and comprehensive residential project management.",
            footer_nav_1_title: "Pro Services",
            footer_nav_1_l1: "Professional Painting",
            footer_nav_1_l2: "Bathrooms & Kitchens",
            footer_nav_1_l3: "Complete Renovations",
            footer_nav_1_l4: "Communities & Spaces",
            footer_nav_2_title: "Total Trust",
            footer_nav_2_l1: "Written guarantee",
            footer_nav_2_l2: "Fixed price",
            footer_nav_2_l3: "Certified materials",
            footer_nav_2_l4: "30 years of trade",
            footer_nav_3_title: "Direct Contact",
            footer_nav_3_loc: "Maresme and Barcelona",
            footer_nav_areas_title: "Service Areas",
            footer_nav_areas_more: "Other Locations",
            footer_bottom: "Painting, Renovations & Finishes. All rights reserved.",
            cookie_text: "We use our own cookies to improve your experience. By continuing to browse you accept our <a href='#' style='color:var(--accent);text-decoration:underline;'>privacy policy</a>.",
            cookie_btn: "Accept and close",
            // Trust section
            trust_label: "Why they trust us",
            trust_1_title: "Total care of your home",
            trust_1_desc: "Professional and careful treatment: maximum protection for your furniture, floors and walls.",
            trust_1_seal: "Included",
            trust_2_title: "Fixed Price by Contract",
            trust_2_desc: "The signed quote is the final price. No surprises or hidden costs mid-project.",
            trust_2_seal: "Guaranteed",
            trust_3_title: "Own team, direct contact",
            trust_3_desc: "No middlemen or agencies: the same craftsmen from start to finish. Direct contact with the project manager.",
            trust_3_seal: "30 years",
            trust_4_title: "Your home, ready to live in",
            trust_4_desc: "Deep cleaning at the end of each day and at project completion: we leave everything as we found it, or better.",
            trust_4_seal: "Every day",
            trust_5_title: "On-time delivery commitment",
            trust_5_desc: "We respect your time from day one. Our timelines are realistic and we stick to them.",
            trust_5_seal: "No excuses",
            trust_6_title: "30 years of real trade — Maresme & Barcelona",
            trust_6_desc: "A reputation built project by project, not from a brochure. Over 180 homes transformed.",
            trust_6_seal: "Since 1994",
            compare_row_1_good: "We meet agreed deadlines: we respect your time from day one.",
            compare_row_5_good: "We treat your home like our own: total protection of furniture and surfaces.",
            process_2_title: "Free home visit",
            process_2_desc: "We come to you, measure precisely and advise you in person — at no cost and no commitment.",
            // Calculator Keys
            calc_step1_q: "1. Select the main focus of your project:",
            calc_step2_q: "2. What type of property is it?",
            calc_step2_desc: "Helps calculate exterior and interior logistics.",
            calc_step3_q: "3. What is the current state of the property?",
            calc_step3_desc: "The level of protection/debris directly affects the cost.",
            calc_step4_q: "4. Size of the surface area",
            calc_step5_q: "5. Desired finish level",
            calc_step6_q: "6. When do you need it ready?",
            calc_step6_desc: "Your timeline helps us plan our schedule.",
            calc_placeholder_name: "Your name",
            calc_placeholder_phone: "Your phone",
            btn_next: "Next <i class='fa-solid fa-arrow-right'></i>",
            btn_calc: "Get Analysis <i class='fa-solid fa-calculator'></i>",
            calc_loader: "Generating Local Price Estimate...",
            calc_price_title: "Pro Analytical Estimate",
            calc_price_desc: "This range is a technical approximation. Send us the report via WhatsApp to confirm feasibility and visit date.",
            btn_whatsapp_calc: "Schedule Visit via WhatsApp",
            calc_res_paint: "Professional Painting",
            calc_res_bath: "Bathroom & Kitchen",
            calc_res_integral: "Full Renovations",
            calc_prop_piso: "Apartment",
            calc_prop_casa: "House/Villa",
            calc_prop_local: "Commercial",
            calc_m2_min: "10sqm",
            calc_m2_max: "250sqm+",
            calc_title: "How much will it cost?",
            calc_intro: "Answer a few quick questions...",
            calc_email_titulo: "Your quote is ready",
            calc_email_subtitulo: "We can also send it by email — optional",
            calc_email_placeholder: "your@email.com",
            calc_email_btn_saltar: "Skip",
            calc_email_btn_anadir: "Add & send",
            calc_email_error_invalido: "Invalid email. Check it or skip."
        },


        ca: {
            nav_services: "Serveis <i class='fa-solid fa-chevron-down' style='font-size:0.7em;margin-left:3px;'></i>",
            nav_residential:"Residencial", nav_res_paint:"Pintura de Pisos / Cases",
            nav_res_bath:"Banys i Cuines", nav_res_integral:"Reformes Integrals",
            nav_b2b:"Empreses i Zones Comunes", nav_b2b_office:"Oficines i Locals Comercials",
            nav_b2b_parking:"Pàrquings i Escales", nav_b2b_community:"Manteniment de Comunitats",
            nav_method:"Mètode <i class='fa-solid fa-chevron-down' style='font-size:0.7em;margin-left:3px;'></i>",
            nav_method_1:"1. Assessorament 1 a 1", nav_method_2:"2. Pressupost Tancat", nav_method_3:"3. Execució i Entrega",
            nav_gallery:"Treballs", nav_faq:"FAQ",
            nav_whatsapp:"<i class='fa-brands fa-whatsapp'></i> WhatsApp",
            hero_title:"Necessites pintar o reformar<br>el teu pis al Maresme o Barcelona?",
            hero_desc:"Et visitem gratis, pressupost tancat en 48h i comencem quan tu diguis. Sense sorpreses, sense extres, sense retards.",
            hero_btn_quote:"<i class='fa-solid fa-calculator'></i> Quant em costarà?",
            hero_btn_phone:"<i class='fa-solid fa-phone'></i> 639 058 819",
            calc_title:"Quant et costarà?",
            calc_intro:"Respon unes preguntes ràpides i et donem una estimació realista al moment.<br><small style='color:var(--text-light);display:block;margin-top:10px;'><i class='fa-solid fa-gem' style='color:var(--accent);'></i> <b>Especialistes en projectes integrals i acabats d'alta qualitat.</b><br>No realitzem pedaços ni petites reparacions.</small>",
            alert_radio:"Si us plau escull una opció.",
            alert_data:"Si us plau deixa'ns el teu nom i mòbil.",
            hero_eyebrow:"30 anys d'ofici real · +180 llars transformades al Maresme i Barcelona",
            hero_stat_1:"Llars transformades",
            hero_stat_2:"Entrega puntual",
            hero_stat_3:"Anys d'ofici real",
            hero_stat_5:"Valoració a Google",
            services_cat_high_end:"Alta Decoració & Revestiments",
            service_micro_title:"Microciment d'Autor",
            service_micro_desc:"Terres i parets contínues sense juntes de dilatació. Estètica industrial refinada amb màxima resistència al desgast.",
            service_micro_feat_1:"Aplicació sobre rajola sense runa",
            service_micro_feat_2:"100% Impermeable (ideal banys/cuines)",
            service_micro_feat_3:"Garantia Estructural (Malla de fibra)",
            service_estuco_title:"Estuc Venecià Real",
            service_estuco_desc:"Elegància clàssica mitjançant tècniques d'espatulat a la calç. Textures amb profunditat i brillantor natural.",
            service_estuco_feat_1:"Calç de Grassello d'alta puresa",
            service_estuco_feat_2:"Protecció amb ceres naturals",
            service_estuco_feat_3:"Efecte Marbre sense juntes",
            services_tag: "El que fem",
            services_title: "Serveis Especialitzats",
            services_subtitle: "Alta enginyeria aplicada a la pintura i la reforma residencial i industrial al Maresme i Barcelona.",
            services_cat_residential: "Solucions Residencials",
            service_1_title: "Pintura d'Interiors",
            service_1_desc: "Allisat de màxima precisió i acabats decoratius que transformen la percepció dels teus espais.",
            service_1_feat_1: "Allisat i Eliminació de Gotelé",
            service_1_feat_2: "Pintura Plàstica Antipols",
            service_1_feat_3: "Lacat de Portes i Sòcols",
            service_2_title: "Banys i Cuines Pro",
            service_2_desc: "Reformes parcials o integrals amb gestió de fontaneria, electricitat i mobiliari a mida.",
            service_2_feat_1: "Substitució de Banyera per Plat",
            service_2_feat_2: "Mobiliari de Cuina Premium",
            service_2_feat_3: "Revestiments d'Alta Resistència",
            service_3_title: "Reformes de Pisos i Cases",
            service_3_desc: "Planificació integral per rehabilitar habitatges buits o habitats amb mínimes molèsties.",
            service_3_feat_1: "Canvi de Sòls (Parquet/Ceràmic)",
            service_3_feat_2: "Tabicació i Pladur",
            service_3_feat_3: "Climatització i Il·luminació",
            service_tech_title: "Tractaments Especials",
            service_tech_desc: "Solucions per a problemes crítics: humitats, floridura o protecció passiva contra el foc.",
            service_tech_feat_1: "Pintures Intumescents Certificades",
            service_tech_feat_2: "Barreres Anti-humitat capil·lar",
            service_tech_feat_3: "Aïllament Tèrmic amb Suro",
            services_cat_business: "Empreses & Zones Comunes",
            service_4_title: "Oficines i Locals",
            service_4_desc: "Condicionament ràpid per a negocis. Adaptem horaris per no frenar la teva facturació.",
            service_4_feat_1: "Pintura de Grans Superfícies",
            service_4_feat_2: "Divisions de Vidre i Fusta",
            service_4_feat_3: "Manteniment Preventiu",
            service_5_title: "Escales i Pàrquings",
            service_5_desc: "Manteniment integral d'escales, pàrquings i zones comunes amb pressupost adaptat a comunitats.",
            service_5_feat_1: "Pintura de Sòls Epoxi",
            service_5_feat_2: "Reparació de Façanes i Patis",
            service_5_feat_3: "Manteniment de Zones Nobles",
            compare_label: "Transparència total",
            compare_title: "El que <span>altres no t'expliquen</span>",
            compare_subtitle: "Compara abans de decidir. La diferència entre un treball mediocre i un que dura dècades està en els detalls.",
            compare_row_1_label: "Compliment de terminis",
            compare_row_1_bad: "Retards freqüents sense conseqüències. 'La setmana que ve…'",
            compare_row_1_good: "Complim els terminis acordats: respectem el teu temps des del primer dia.",
            compare_row_2_label: "Transparència de preu",
            compare_row_2_bad: "Pressupost orientatiu que s'infla a mitja obra amb 'imprevistos'.",
            compare_row_2_good: "Preu tancat i signat. El que veus és el que pagues.",
            compare_row_3_label: "Personal a l'obra",
            compare_row_3_bad: "Subcontractistes sense verificar. No saps qui entra a casa teva.",
            compare_row_3_good: "Equip 100% propi i regulat. Sense intermediaris.",
            compare_row_4_label: "Estat després de l'obra",
            compare_row_4_bad: "Pols, runa i desordre. La neteja va a càrrec teu.",
            compare_row_4_good: "Neteja industrial inclosa. Espai llest per entrar-hi a viure.",
            compare_row_5_label: "Cobertura de danys",
            compare_row_5_bad: "Sense assegurança. Si hi ha un dany, el problema és teu.",
            compare_row_5_good: "Cuidem la teva llar com si fos la nostra: protecció total de mobles i superfícies.",
            compare_row_6_label: "Qualitat de materials",
            compare_row_6_bad: "Materials de baix cost per maximitzar marge.",
            compare_row_6_good: "Marques de primera: Valentine, Titanlux, Mapei.",
            compare_cta: "📞 Demana el teu pressupost tancat ara — sense compromís",
            process_tag: "El nostre mètode",
            process_title: "Enginyeria del Resultat",
            process_subtitle: "Així transformem la teva visió en una realitat tècnica impecable i sense fricció.",
            process_1_title: "Escolta Activa i Diagnòstic",
            process_1_desc: "Analitzem el teu estil de vida o negoci per proposar solucions que maximitzin el valor de la propietat.",
            process_2_title: "Visita gratuïta al teu domicili",
            process_2_desc: "Venim a veure't, mesurem amb precisió i t'assessorem en persona, sense cost ni compromís.",
            process_3_title: "Pressupost de Màxima Claredat",
            process_3_desc: "Document tancat per contracte. Sense ensurts d'última hora.",
            process_4_title: "Execució Quirúrgica",
            process_4_desc: "Protecció total, compliment de cronograma i neteja industrial profunda.",
            ba_tag: "Resultats reals",
            ba_title: "La Transformació: Abans i Després",
            ba_subtitle: "Llisca per veure la qualitat real de la nostra execució tècnica.",
            ba_before: "Estat Inicial",
            ba_after: "Entrega Final",
            gallery_tag: "Portafoli",
            gallery_title: "Projectes Reals",
            gallery_subtitle: "Resultats nets i duradors en habitatges del Maresme i Barcelona.",
            trust_label: "Per què confien en nosaltres",
            trust_1_title: "Cura total de la teva llar",
            trust_1_desc: "Tracte professional i curós: màxima protecció per als teus mobles, terres i parets.",
            trust_1_seal: "Inclòs",
            trust_2_title: "Preu Tancat per Contracte",
            trust_2_desc: "El pressupost signat és el preu final. Sense sorpreses ni costos ocults a mitja obra.",
            trust_2_seal: "Garantit",
            trust_3_title: "Equip propi i tracte directe",
            trust_3_desc: "Sense intermediaris ni agències: els mateixos artesans de principi a fi. Contacte directe amb el responsable.",
            trust_3_seal: "30 anys",
            trust_4_title: "La teva casa, llesta per viure",
            trust_4_desc: "Neteja profunda en acabar cada jornada i en finalitzar l'obra: deixem tot com ho trobem, o millor.",
            trust_4_seal: "Cada dia",
            trust_5_title: "Compromís d'entrega puntual",
            trust_5_desc: "Respectem el teu temps des del primer dia. Els nostres terminis són realistes i els complim.",
            trust_5_seal: "Sense excuses",
            trust_6_title: "30 anys d'ofici real — Maresme i Barcelona",
            trust_6_desc: "Una reputació construïda projecte a projecte, no de fullet. Més de 180 llars transformades.",
            trust_6_seal: "Des de 1994",
            reviews_tag: "Opinions verificades",
            reviews_title: "El que opinen els nostres clients",
            reviews_subtitle: "Ressenyes reals de clients al Maresme i Barcelona.",
            reviews_google_btn: "Veure totes les ressenyes a Google",
            reviews_leave: "Deixa'ns la teva ressenya",
            about_tag: "Qui som",
            about_title: "30 anys d'ofici real,<br><span class=\"highlight\">no de catàleg de màrqueting.</span>",
            about_p1: "Hi ha moltes empreses que et manen una foto bonica i després subcontracten. Nosaltres no. Portem més de 30 anys treballant amb les mans, aprenent a cada paret.",
            about_p2: "Sabem que deixar entrar a desconeguts fa respecte. El nostre estàndard mínim és: preu que no canvia, obra neta cada dia i lliurament a temps.",
            about_signature: "— <a href='tel:+34639058819' onclick='trackPhoneCall()' style='color:var(--text);text-decoration:underline;'>639 058 819</a> | 30 anys a l'ofici",
            insta_subtitle: "Segueix-nos · obres en directe cada dia",
            insta_btn: "Seguir a Instagram",
            insta_footer_text: "Contingut nou cada dia · obres reals · consells de manteniment",
            insta_footer_btn: "Veure perfil complet",
            faq_tag: "Resolem els teus dubtes",
            faq_title: "Preguntes Freqüents",
            faq_1_q: "Realment cobriu tot el mobiliari i protegiu el terra?",
            faq_1_a: "<strong>Sí, ho protegim absolutament tot.</strong> Els mobles es forren i el terra es protegeix amb paper o lona. Al acabar, no veuràs ni una mota de pols.",
            faq_2_q: "El pressupost té algun cost ocult o sorpreses finals?",
            faq_2_a: "<strong>No, zero costos ocults.</strong> Preu Tancat i Signat. Només varia si demanes un canvi o ampliació fora de contracte.",
            faq_3_q: "Què passa si l'obra es retarda de la data d'entrega?",
            faq_3_a: "<strong>Ho compensem.</strong> Si hi ha retard imputable a nosaltres, compensem econòmicament. La nostra taxa de compliment és del 98%.",
            faq_4_q: "Demaneu diners per avançat per començar?",
            faq_4_a: "<strong>Un 30% a la signatura.</strong> I la resta en certificacions d'obra o al finalitzar.",
            faq_5_q: "Quant costa pintar un pis de 80m² al Maresme?",
            faq_5_a: "<strong>Entre 1.800€ i 3.200€.</strong> Depèn de l'estat de les parets i si hi ha gotelé.",
            faq_6_q: "Quant triga una reforma de bany completa?",
            faq_6_a: "<strong>Entre 5 i 10 dies feiners.</strong> Un bany estàndard el fem en una setmana.",
            faq_7_q: "Treballeu els caps de setmana?",
            faq_7_a: "<strong>Els dissabtes al matí sí, diumenges no.</strong> Per a excepcions, ens podem adaptar.",
            faq_8_q: "A quines zones treballeu?",
            faq_8_a: "<strong>Tot el Maresme i Barcelona ciutat.</strong> Visita de pressupost gratuïta en aquestes zones.",
            cta_tag: "Sense compromís",
            cta_title: "Preparat per transformar el teu espai?",
            cta_desc: "Visita gratuïta al Maresme, Barcelona i Costa Brava. Pressupost tancat en 48h. Preu que no canvia.",
            cta_btn_1: "<i class='fa-solid fa-calculator'></i> Calcular el meu pressupost",
            cta_btn_2: "<i class='fa-brands fa-whatsapp'></i> WhatsApp directe",
            cta_trust_1: "Garantia per escrit",
            cta_trust_2: "Preu tancat",
            cta_trust_3: "30 anys d'ofici",
            cta_trust_4: "Resposta en <2h",
            footer_brand_title: "<i class='fa-solid fa-house-chimney' style='color:var(--accent);margin-right:8px;'></i>Pintura, Reformes i Acabats d'Obra",
            footer_brand_desc: "Referent de confiança al Maresme i Barcelona. Especialistes en acabats d'alta gamma i gestió integral d'obres residencials.",
            footer_nav_1_title: "Serveis Pro",
            footer_nav_1_l1: "Pintura Professional",
            footer_nav_1_l2: "Banys i Cuines",
            footer_nav_1_l3: "Reformes Integrals",
            footer_nav_1_l4: "Comunitats i Locals",
            footer_nav_2_title: "Confiança Total",
            footer_nav_2_l1: "Garantia per escrit",
            footer_nav_2_l2: "Pressupost tancat",
            footer_nav_2_l3: "Materials certificats",
            footer_nav_2_l4: "30 anys d'ofici",
            footer_nav_3_title: "Contacte Directe",
            footer_nav_3_loc: "Maresme i Barcelona",
            footer_nav_areas_title: "Zones de Servei",
            footer_nav_areas_more: "Altres Localitats",
            footer_bottom: "Pintura, Reformes i Acabats d'Obra. Tots els drets reservats.",
            cookie_text: "Utilitzem cookies pròpies per millorar la teva experiència. En continuar navegant acceptes la nostra <a href='#' style='color:var(--accent);text-decoration:underline;'>política de privadesa</a>.",
            cookie_btn: "Acceptar i tancar",
            // Calculator Keys
            calc_step1_q: "1. Selecciona el foc principal del teu projecte:",
            calc_step2_q: "2. En quin tipus d'immoble es realitzarà?",
            calc_step2_desc: "Ajuda a calcular logística exterior i interior.",
            calc_step3_q: "3. Quin és l'estat actual de l'immoble?",
            calc_step3_desc: "El nivell de protecció/runa afecta directament el cost.",
            calc_step4_q: "4. Mida de la superfície a treballar",
            calc_step5_q: "5. Nivell d'acabats desitjat",
            calc_step6_q: "6. Per a quan necessites tenir-lo llistat?",
            calc_step6_desc: "El teu timeline ajuda a planificar la nostra agenda.",
            calc_placeholder_name: "El teu nom",
            calc_placeholder_phone: "El teu telèfon",
            btn_next: "Continuar <i class='fa-solid fa-arrow-right'></i>",
            btn_calc: "Emetre Anàlisi <i class='fa-solid fa-calculator'></i>",
            calc_loader: "Generant Preu Orientatiu Local...",
            calc_price_title: "Estimació Analítica Pro",
            calc_price_desc: "Aquest rang és una aproximació tècnica. Envia'ns l'informe per WhatsApp per confirmar viabilitat i data de visita.",
            btn_whatsapp_calc: "Agendar Visita per WhatsApp",
            calc_res_paint: "Pintura Professional",
            calc_res_bath: "Banys i Cuines",
            calc_res_integral: "Reformes e Indústries",
            calc_prop_piso: "Pis",
            calc_prop_casa: "Casa/Adossat",
            calc_prop_local: "Local",
            calc_m2_min: "10m²",
            calc_m2_max: "250m²+",
            calc_title: "Quant et costarà?",
            calc_intro: "Respon unes preguntes ràpides...",
            calc_email_titulo: "El teu pressupost ja està llest",
            calc_email_subtitulo: "Te'l podem enviar per email — opcional",
            calc_email_placeholder: "el-teu@email.com",
            calc_email_btn_saltar: "Saltar",
            calc_email_btn_anadir: "Afegir i enviar",
            calc_email_error_invalido: "Email no vàlid. Revisa'l o salta."
        }


    };

    window.setLanguage = function(lang, event = null) {
        const l = lang.toLowerCase().trim();
        const btns = document.querySelectorAll('.lang-btn');
        btns.forEach(btn => btn.classList.remove('active'));

        // Si viene de un click directo
        if (event && event.currentTarget) {
            event.currentTarget.classList.add('active');
        } else {
            // Si es programático, buscar el botón correspondiente
            btns.forEach(btn => {
                if (btn.textContent.toLowerCase().trim() === l) {
                    btn.classList.add('active');
                }
            });
        }
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[l] && dict[l][key]) {
                el.innerHTML = dict[l][key];
            }
        });

        // Soporte para placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[l] && dict[l][key]) {
                el.setAttribute('placeholder', dict[l][key]);
            }
        });
    }

    /* ---- TEXT ANIMATION PREPARATOR ---- */
    const splitTextArray = document.querySelectorAll('.anim-split-text');
    splitTextArray.forEach(el => {
        const content = el.innerHTML;
        const newStr = content.split('<br>').map(line => {
            return line.split('').map((char, index) => {
                if(char === ' ') return ' ';
                return `<span class="char" style="animation-delay: ${index * 0.025}s">${char}</span>`;
            }).join('');
        }).join('<br>');
        el.innerHTML = newStr;
    });

    /* ---- INTERSECTION OBSERVERS (SCROLL ANIM) ---- */
    const observerOptions = { threshold: 0.12, rootMargin: "0px 0px -40px 0px" };
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-animating');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animElements = document.querySelectorAll('.anim-fade-up, .anim-zoom-in, .anim-slide-right, .anim-split-text');
    animElements.forEach(el => {
        el.classList.add('anim-target');
        scrollObserver.observe(el);
    });

    setTimeout(() => {
        document.querySelectorAll('.anim-split-text').forEach(el => el.classList.add('is-animating'));
    }, 120);

    /* ---- HAMBURGER MENU ---- */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            const open = hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open', open);
            hamburger.setAttribute('aria-expanded', open);
        });
        mobileMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }

    /* ---- FAQ ACCORDION ---- */
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
            btn.setAttribute('aria-expanded', !isActive);
        });
    });

    /* ---- URGENCY BANNER LOGIC ---- */
    (function() {
        const BANNER_KEY = 'urgency_banner_closed';
        const banner = document.getElementById('urgency-banner');
        const closeBtn = document.getElementById('urgency-banner-close');
        const navbar = document.querySelector('.navbar');
        if (!banner) return;

        function applyNavbarOffset() {
            if (!navbar) return;
            const h = banner.classList.contains('visible') ? banner.offsetHeight : 0;
            navbar.style.top = h + 'px';
            const heroWrap = document.querySelector('.hero-wrapper');
            if (heroWrap) heroWrap.style.paddingTop = (h + 80) + 'px';
        }

        if (sessionStorage.getItem(BANNER_KEY)) { applyNavbarOffset(); return; }
        requestAnimationFrame(function() {
            setTimeout(function() {
                banner.classList.add('visible');
                document.body.classList.add('banner-visible');
                applyNavbarOffset();
            }, 800);
        });
        if(closeBtn) {
            closeBtn.addEventListener('click', function() {
                banner.classList.remove('visible');
                document.body.classList.remove('banner-visible');
                applyNavbarOffset();
                sessionStorage.setItem(BANNER_KEY, '1');
            });
        }
    })();

    /* ---- EMBUDO CUESTIONARIO (MODAL CALCULADORA INYECTADO) ---- */
    const modal = document.getElementById('calcModal');
    const modalContent = modal ? modal.querySelector('.calc-modal-content') : null;
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtn = modal ? modal.querySelector('.close-modal') : null;
    let finalReport = '';

    const calculatorHTML = `
        <div class="form-container">
            <!-- Paso 1: Tipo de Proyecto -->
            <div class="form-step active" id="step-1">
                <h3 data-i18n="calc_title">¿Cuánto te va a costar?</h3>
                <p class="form-intro" data-i18n="calc_intro">Responde unas preguntas rápidas y te damos una estimación realista al momento.</p>
                <h4 data-i18n="calc_step1_q">1. Selecciona el foco principal de tu proyecto:</h4>
                <div class="options-grid vertical luxe" style="display:grid;gap:12px;margin-bottom:20px;">
                    <label class="option-card image-card" style="position:relative;height:100px;border-radius:12px;overflow:hidden;cursor:pointer;background:url('https://images.unsplash.com/photo-1562663474-6cbb3fee4c77?q=80&w=400&auto=format&fit=crop');background-size:cover;display:flex;align-items:center;padding:0 20px;border:2px solid transparent;">
                        <input type="radio" name="project_type" value="Pintura" style="display:none;" required>
                        <div class="card-overlay" style="position:absolute;inset:0;background:rgba(0,0,0,0.5);"></div>
                        <div class="card-content" style="position:relative;z-index:2;color:#fff;display:flex;align-items:center;gap:12px;">
                            <span class="icon"><i class="fa-solid fa-paint-roller"></i></span>
                            <span class="text" data-i18n="calc_res_paint">Pintura Profesional</span>
                        </div>
                    </label>
                    <label class="option-card image-card" style="position:relative;height:100px;border-radius:12px;overflow:hidden;cursor:pointer;background:url('https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=400&auto=format&fit=crop');background-size:cover;display:flex;align-items:center;padding:0 20px;border:2px solid transparent;">
                        <input type="radio" name="project_type" value="BanoCocina" style="display:none;">
                        <div class="card-overlay" style="position:absolute;inset:0;background:rgba(0,0,0,0.5);"></div>
                        <div class="card-content" style="position:relative;z-index:2;color:#fff;display:flex;align-items:center;gap:12px;">
                            <span class="icon"><i class="fa-solid fa-bath"></i></span>
                            <span class="text" data-i18n="calc_res_bath">Baños y Cocinas</span>
                        </div>
                    </label>
                    <label class="option-card image-card" style="position:relative;height:100px;border-radius:12px;overflow:hidden;cursor:pointer;background:url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=400&auto=format&fit=crop');background-size:cover;display:flex;align-items:center;padding:0 20px;border:2px solid transparent;">
                        <input type="radio" name="project_type" value="Integral" style="display:none;">
                        <div class="card-overlay" style="position:absolute;inset:0;background:rgba(0,0,0,0.5);"></div>
                        <div class="card-content" style="position:relative;z-index:2;color:#fff;display:flex;align-items:center;gap:12px;">
                            <span class="icon"><i class="fa-solid fa-hammer"></i></span>
                            <span class="text" data-i18n="calc_res_integral">Reformas e Industrias</span>
                        </div>
                    </label>
                </div>
                <div class="form-actions" style="text-align:right;">
                    <button class="btn-primary next-step" data-target="step-2" data-i18n="btn_next">Continuar <i class='fa-solid fa-arrow-right'></i></button>
                </div>
            </div>

            <!-- Paso 2: Tipo de Inmueble -->
            <div class="form-step hidden" id="step-2">
                <h3 data-i18n="calc_step2_q">2. ¿En qué tipo de inmueble se realizará?</h3>
                <p class="step-subtitle" data-i18n="calc_step2_desc">Ayuda a calcular logística exterior e interior.</p>
                <div class="options-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;">
                    <label class="option-card compact" style="padding:15px;border:1px solid #ddd;border-radius:8px;text-align:center;cursor:pointer;">
                        <input type="radio" name="property_type" value="Piso" style="display:none;" checked>
                        <i class="fa-solid fa-building" style="display:block;margin-bottom:5px;"></i>
                        <span class="text" data-i18n="calc_prop_piso">Piso</span>
                    </label>
                    <label class="option-card compact" style="padding:15px;border:1px solid #ddd;border-radius:8px;text-align:center;cursor:pointer;">
                        <input type="radio" name="property_type" value="Casa" style="display:none;">
                        <i class="fa-solid fa-house" style="display:block;margin-bottom:5px;"></i>
                        <span class="text" data-i18n="calc_prop_casa">Casa</span>
                    </label>
                    <label class="option-card compact" style="padding:15px;border:1px solid #ddd;border-radius:8px;text-align:center;cursor:pointer;">
                        <input type="radio" name="property_type" value="Local" style="display:none;">
                        <i class="fa-solid fa-store" style="display:block;margin-bottom:5px;"></i>
                        <span class="text" data-i18n="calc_prop_local">Local</span>
                    </label>
                </div>
                <div class="form-actions" style="display:flex;justify-content:space-between;">
                    <button class="btn-secondary prev-step" data-target="step-1"><i class="fa-solid fa-arrow-left"></i></button>
                    <button class="btn-primary next-step" data-target="step-3" data-i18n="btn_next">Continuar <i class='fa-solid fa-arrow-right'></i></button>
                </div>
            </div>

            <!-- Paso 3: Estado -->
            <div class="form-step hidden" id="step-3">
                <h3 data-i18n="calc_step3_q">3. ¿Cuál es el estado actual del inmueble?</h3>
                <p class="step-subtitle" data-i18n="calc_step3_desc">El nivel de protección afecta directamente el coste.</p>
                <div class="options-grid" style="display:grid;gap:10px;margin-bottom:20px;">
                    <label class="option-card" style="padding:15px;border:1px solid #ddd;border-radius:8px;cursor:pointer;display:block;">
                        <input type="radio" name="property_state" value="Vacio" style="display:none;" checked>
                        <span class="text" data-i18n="calc_state_vacio_title">Vacío o Despejado</span>
                    </label>
                    <label class="option-card" style="padding:15px;border:1px solid #ddd;border-radius:8px;cursor:pointer;display:block;">
                        <input type="radio" name="property_state" value="Amueblado" style="display:none;">
                        <span class="text" style="font-weight:600;">Amueblado / Habitado</span>
                    </label>
                </div>
                <div class="form-actions" style="display:flex;justify-content:space-between;">
                    <button class="btn-secondary prev-step" data-target="step-2"><i class="fa-solid fa-arrow-left"></i></button>
                    <button class="btn-primary next-step" data-target="step-4" data-i18n="btn_next">Continuar <i class='fa-solid fa-arrow-right'></i></button>
                </div>
            </div>

            <!-- Paso 4: M2 y Calidad -->
            <div class="form-step hidden" id="step-4">
                <h3 data-i18n="calc_step4_q">4. Tamaño de la superficie a trabajar</h3>
                <div class="slider-wrapper" style="text-align:center;margin:20px 0;">
                    <div class="slider-value-display" style="font-size:2rem;font-weight:800;color:var(--accent);"><span id="m2-output">75</span> m²</div>
                    <input type="range" id="size-slider" min="10" max="250" value="75" step="5" style="width:100%;accent-color:var(--accent);">
                </div>
                <h3 data-i18n="calc_step5_q">5. Nivel de acabados deseado</h3>
                <div class="options-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;">
                    <label class="option-card compact" style="padding:15px;border:1px solid #ddd;border-radius:8px;text-align:center;cursor:pointer;">
                        <input type="radio" name="quality" value="Estandar" style="display:none;" checked>
                        <span class="text">Básico/Medio</span>
                    </label>
                    <label class="option-card compact" style="padding:15px;border:1px solid #ddd;border-radius:8px;text-align:center;cursor:pointer;">
                        <input type="radio" name="quality" value="Premium" style="display:none;">
                        <span class="text">Alta Gama</span>
                    </label>
                </div>
                <div class="form-actions" style="display:flex;justify-content:space-between;">
                    <button class="btn-secondary prev-step" data-target="step-3"><i class="fa-solid fa-arrow-left"></i></button>
                    <button class="btn-primary next-step" data-target="step-8" data-i18n="btn_next">Continuar <i class='fa-solid fa-arrow-right'></i></button>
                </div>
            </div>

            <!-- Paso 8: Timeline -->
            <div class="form-step hidden" id="step-8">
                <h3 data-i18n="calc_step6_q">6. ¿Para cuándo necesitas tenerlo listo?</h3>
                <div class="options-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;">
                    <label class="option-card compact" style="padding:15px;border:1px solid #ddd;border-radius:8px;text-align:center;cursor:pointer;">
                        <input type="radio" name="timeline" value="Urgente" style="display:none;">
                        <span class="text" data-i18n="calc_time_urg">Urgente</span>
                    </label>
                    <label class="option-card compact" style="padding:15px;border:1px solid #ddd;border-radius:8px;text-align:center;cursor:pointer;">
                        <input type="radio" name="timeline" value="Medio" style="display:none;" checked>
                        <span class="text">1-3 meses</span>
                    </label>
                    <label class="option-card compact" style="padding:15px;border:1px solid #ddd;border-radius:8px;text-align:center;cursor:pointer;">
                        <input type="radio" name="timeline" value="Flexible" style="display:none;">
                        <span class="text" data-i18n="calc_time_flex">Flexible</span>
                    </label>
                </div>
                <div class="form-actions" style="display:flex;justify-content:space-between;">
                    <button class="btn-secondary prev-step" data-target="step-4"><i class="fa-solid fa-arrow-left"></i></button>
                    <button class="btn-primary next-step" data-target="step-9" data-i18n="btn_next">Continuar <i class='fa-solid fa-arrow-right'></i></button>
                </div>
            </div>

            <!-- Paso 9: Datos -->
            <div class="form-step hidden" id="step-9">
                <h3 style="margin-bottom:10px;">Estamos procesando tu informe...</h3>
                <p style="margin-bottom:20px;">Déjanos tus datos para vincular el presupuesto a tu expediente técnico.</p>
                <div style="margin-bottom:15px;">
                    <input type="text" id="calc-name" data-i18n-placeholder="calc_placeholder_name" placeholder="Tu nombre" style="width:100%;padding:12px;border-radius:8px;border:1px solid #ddd;">
                </div>
                <div style="margin-bottom:20px;">
                    <input type="tel" id="calc-phone" data-i18n-placeholder="calc_placeholder_phone" placeholder="Tu teléfono" style="width:100%;padding:12px;border-radius:8px;border:1px solid #ddd;">
                </div>
                <div class="form-actions" style="display:flex;justify-content:space-between;">
                    <button class="btn-secondary prev-step" data-target="step-8"><i class="fa-solid fa-arrow-left"></i></button>
                    <button id="calculate-btn" class="btn-primary" data-i18n="btn_calc">Emitir Análisis <i class="fa-solid fa-calculator"></i></button>
                </div>
            </div>

            <!-- Paso Email: dirección (opcional) -->
            <div class="form-step hidden" id="step-email">
                <h3 data-i18n="calc_email_titulo">Tu presupuesto ya está listo</h3>
                <p class="step-subtitle" data-i18n="calc_email_subtitulo">Te lo mandamos también por email — opcional</p>
                <div style="margin-bottom:8px;">
                    <label for="calc-email" style="display:block;margin-bottom:6px;font-weight:600;">Email</label>
                    <input type="email" id="calc-email" aria-required="false" aria-describedby="calc-email-error" data-i18n-placeholder="calc_email_placeholder" placeholder="tu@email.com" style="width:100%;padding:12px;border-radius:8px;border:1px solid #ddd;box-sizing:border-box;">
                    <span id="calc-email-error" style="display:none;color:#e53e3e;font-size:.85rem;margin-top:4px;" data-i18n="calc_email_error_invalido">Email no válido. Revísalo o salta.</span>
                </div>
                <div class="form-actions" style="display:flex;gap:10px;margin-top:20px;">
                    <button id="email-skip-btn" class="btn-secondary" style="flex:1;min-height:48px;padding:12px 8px;" data-i18n="calc_email_btn_saltar">Saltar</button>
                    <button id="email-add-btn" class="btn-primary" style="flex:2;min-height:48px;padding:12px;" data-i18n="calc_email_btn_anadir">Añadir y enviar</button>
                </div>
            </div>

            <!-- Paso 10: Resultado -->
            <div class="form-step hidden" id="step-10">
                <div id="calc-loader" class="hidden" style="text-align:center;padding:40px 0;">
                    <i class="fa-solid fa-circle-notch fa-spin" style="font-size:3rem;color:var(--accent);margin-bottom:15px;"></i>
                    <p data-i18n="calc_loader">Generando Precio Orientativo Local...</p>
                </div>
                <div id="step-10-actions" class="price-reveal">
                    <h4 data-i18n="calc_price_title" style="text-align:center;margin-bottom:15px;">Estimación Analítica Pro</h4>
                    <div class="price-range" style="font-size:2.5rem;font-weight:800;color:var(--accent);text-align:center;margin-bottom:20px;">
                        <span id="price-min">0€</span> - <span id="price-max">0€</span>
                    </div>
                    <p data-i18n="calc_price_desc" style="font-size:.9rem;color:var(--text-muted);margin-bottom:25px;">Este rango es una aproximación técnica. Envíanos el informe por WhatsApp para confirmar viabilidad y fecha de visita.</p>
                    <button id="final-submit" class="btn-whatsapp" style="width:100%;display:flex;align-items:center;justify-content:center;gap:10px;padding:15px;background:#25D366;color:#fff;border-radius:8px;border:none;font-weight:700;cursor:pointer;">
                        <i class='fa-brands fa-whatsapp'></i> <span data-i18n="btn_whatsapp_calc">Agendar Visita por WhatsApp</span>
                    </button>
                </div>
            </div>

            <div class="progress-container" style="margin-top:20px;background:#eee;height:6px;border-radius:3px;overflow:hidden;">
                <div class="progress-bar" id="form-progress" style="width: 10%;background:var(--accent);height:100%;transition:width 0.3s ease;"></div>
            </div>
        </div>
    `;

    const initCalculator = () => {
        if (!modalContent || modalContent.innerHTML.includes('form-container')) return;
        
        const closeBtnHTML = modalContent.querySelector('.close-modal').outerHTML;
        modalContent.innerHTML = closeBtnHTML + calculatorHTML;

        // Re-attach close button listener
        const newCloseBtn = modalContent.querySelector('.close-modal');
        if (newCloseBtn) newCloseBtn.addEventListener('click', closeModal);

        const stepsElems = modalContent.querySelectorAll('.form-step');
        const progressBar = modalContent.querySelector('#form-progress');
        const sizeSlider = modalContent.querySelector('#size-slider');
        const m2Output = modalContent.querySelector('#m2-output');

        if (sizeSlider && m2Output) {
            sizeSlider.addEventListener('input', () => { m2Output.textContent = sizeSlider.value; });
        }

        const goToStep = (targetId) => {
            stepsElems.forEach(s => s.classList.add('hidden'));
            const next = modalContent.querySelector(`#${targetId}`);
            if (next) next.classList.remove('hidden');
            const num = targetId === 'step-email' ? 9.5 : (parseInt(targetId.split('-')[1]) || 1);
            if (progressBar) progressBar.style.width = ((num / 10) * 100) + '%';
        };

        modalContent.querySelectorAll('.next-step').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const currentStep = btn.closest('.form-step');
                const hasRadios = currentStep.querySelector('input[type="radio"]');
                if (hasRadios && !currentStep.querySelector('input[type="radio"]:checked')) {
                    const activeLang = document.querySelector('.lang-btn.active')?.textContent.toLowerCase().trim() || 'es';
                    const langKey = activeLang.includes('cat') ? 'ca' : 'es';
                    alert(dict[langKey].alert_radio || 'Por favor escoge una opción.');
                    return;
                }
                goToStep(btn.getAttribute('data-target'));
            });
        });

        modalContent.querySelectorAll('.prev-step').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                goToStep(btn.getAttribute('data-target'));
            });
        });

        // Visual selection for cards
        modalContent.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', () => {
                const input = card.querySelector('input[type="radio"]');
                if (!input) return;
                const name = input.getAttribute('name');
                modalContent.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                    r.closest('.option-card').style.borderColor = '#ddd';
                    r.closest('.option-card').style.background = 'transparent';
                    if (r.closest('.image-card')) {
                        r.closest('.image-card').style.borderColor = 'transparent';
                    }
                });
                input.checked = true;
                card.style.borderColor = 'var(--accent)';
                if (card.classList.contains('image-card')) {
                    card.style.borderColor = 'var(--accent)';
                } else {
                    card.style.background = 'var(--accent-lt)';
                }
            });
        });

        // Calc Engine
        const calcBtn = modalContent.querySelector('#calculate-btn');
        if (calcBtn) {
            calcBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const nameI = modalContent.querySelector('#calc-name');
                const phoneI = modalContent.querySelector('#calc-phone');
                if (!nameI.value || !phoneI.value) {
                    const activeLang = document.querySelector('.lang-btn.active')?.textContent.toLowerCase().trim() || 'es';
                    const langKey = activeLang.includes('cat') ? 'ca' : 'es';
                    alert(dict[langKey].alert_data || 'Por favor déjanos tu nombre y móvil.');
                    return;
                }
                const typeR = modalContent.querySelector('input[name="project_type"]:checked');
                const qualityR = modalContent.querySelector('input[name="quality"]:checked');
                const m2 = parseInt(sizeSlider.value);
                
                let basePrice = 0;
                const type = typeR ? typeR.value : 'Pintura';
                const quality = qualityR ? qualityR.value : 'Estandar';

                if (type === 'Pintura') basePrice = quality === 'Premium' ? 25 : 12;
                else if (type === 'BanoCocina') basePrice = quality === 'Premium' ? 250 : 150;
                else basePrice = quality === 'Premium' ? 950 : 650;

                let total = m2 * basePrice;
                if (type === 'BanoCocina' && total < 4500) total = 4500;
                if (type === 'Integral' && total < 15000) total = 15000;

                const min = Math.round(total * 0.85);
                const max = Math.round(total * 1.15);
                const fmt = new Intl.NumberFormat('es-ES');

                modalContent.querySelector('#price-min').textContent = fmt.format(min) + '€';
                modalContent.querySelector('#price-max').textContent = fmt.format(max) + '€';

                finalReport = `*Hola, soy ${nameI.value}!* 👋\nHe usado la Calculadora de vuestra web.\n` +
                    `*🎯 Foco:* ${type}\n*📏 Superficie:* ${m2}m²\n*💎 Calidad:* ${quality}\n` +
                    `*📊 Estimación:* ${fmt.format(min)}€ - ${fmt.format(max)}€\n` +
                    `*📱 Tel:* ${phoneI.value}`;

                goToStep('step-email');
            });
        }

        // ── Email step: dirección opcional ──
        const showStep10 = () => {
            modalContent.querySelector('#calc-loader').classList.remove('hidden');
            modalContent.querySelector('#step-10-actions').classList.add('hidden');
            goToStep('step-10');
            setTimeout(() => {
                modalContent.querySelector('#calc-loader').classList.add('hidden');
                modalContent.querySelector('#step-10-actions').classList.remove('hidden');
            }, 1500);
        };

        const dispatchLead = (email) => {
            const nameEl = modalContent.querySelector('#calc-name');
            const phoneEl = modalContent.querySelector('#calc-phone');
            const typeR = modalContent.querySelector('input[name="project_type"]:checked');
            window.dispatchEvent(new CustomEvent('leadCapturado', {
                detail: {
                    nombre: nameEl ? nameEl.value : '',
                    telefono: phoneEl ? phoneEl.value : '',
                    email: email,
                    servicio: typeR ? typeR.value : 'Pintura',
                    metros: parseInt(sizeSlider.value),
                    timestamp: new Date().toISOString(),
                    fuente: 'calculadora_luxe'
                }
            }));
        };

        const emailSkipBtn = modalContent.querySelector('#email-skip-btn');
        if (emailSkipBtn) {
            emailSkipBtn.addEventListener('click', () => {
                dispatchLead('');
                showStep10();
            });
        }

        const emailAddBtn = modalContent.querySelector('#email-add-btn');
        if (emailAddBtn) {
            emailAddBtn.addEventListener('click', () => {
                const emailInput = modalContent.querySelector('#calc-email');
                const emailError = modalContent.querySelector('#calc-email-error');
                const val = emailInput ? emailInput.value.trim() : '';
                if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                    if (emailError) emailError.style.display = 'block';
                    return;
                }
                if (emailError) emailError.style.display = 'none';
                dispatchLead(val);
                showStep10();
            });
        }

        const finalSubmit = modalContent.querySelector('#final-submit');
        if (finalSubmit) {
            finalSubmit.addEventListener('click', () => {
                window.open(`https://wa.me/34631714077?text=${encodeURIComponent(finalReport)}`, '_blank');
                closeModal();
            });
        }
        
        // Translate the newly injected content
        const activeLangBtn = document.querySelector('.lang-btn.active');
        let currentLang = 'es';
        if (activeLangBtn) {
            const btnText = activeLangBtn.textContent.toLowerCase().trim();
            // Map 'ca' or 'català' to 'ca'
            currentLang = (btnText === 'ca' || btnText.includes('cat')) ? 'ca' : 'es';
        }
        
        console.log('Antigravity: Initializing calculator in language:', currentLang);
        window.setLanguage(currentLang);
    };

    const openModal = (e) => {
        if(e) e.preventDefault();
        if(modal) {
            initCalculator();
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; 
        }
    };

    openBtns.forEach(btn => btn.addEventListener('click', openModal));

    const closeModal = () => {
        if(modal) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };
    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    // Show more testimonials
    const showMoreTestBtn = document.getElementById('show-more-testimonials');
    if(showMoreTestBtn) {
        showMoreTestBtn.addEventListener('click', () => {
            document.querySelectorAll('.extra-testimonial').forEach(t => {
                t.classList.remove('hidden');
                t.classList.add('is-animating');
            });
            showMoreTestBtn.style.display = 'none';
        });
    }

    // Inicializar idioma al cargar
    const initialLang = document.querySelector('.lang-btn.active')?.textContent.toLowerCase().trim() || 'es';
    window.setLanguage(initialLang);

});

