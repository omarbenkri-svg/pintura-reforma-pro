import { initBeforeAfterSlider } from './components/BeforeAfterSlider.js';

document.addEventListener('DOMContentLoaded', () => {
    initBeforeAfterSlider();

    /* =========================================
       -1. MOTOR DE IDIOMAS (i18n)
       ========================================= */
    const dict = {
        es: {
            nav_services: "Nuestros Servicios <i class='fa-solid fa-chevron-down' style='font-size:0.7em; margin-left:3px;'></i>",
            nav_residential: "Residencial",
            nav_res_paint: "Pintura de Pisos / Casas",
            nav_res_bath: "Baños y Cocinas",
            nav_res_integral: "Reformas Integrales",
            nav_b2b: "Empresas & Zonas Comunes",
            nav_b2b_office: "Oficinas y Locales Comerciales",
            nav_b2b_parking: "Parkings y Escaleras",
            nav_b2b_community: "Mantenimiento de Comunidades",
            nav_method: "Método <i class='fa-solid fa-chevron-down' style='font-size:0.7em; margin-left:3px;'></i>",
            nav_method_1: "1. Asesoramiento 1 a 1",
            nav_method_2: "2. Presupuesto Cerrado",
            nav_method_3: "3. Ejecución y Entrega",
            nav_gallery: "Trabajos",
            nav_faq: "FAQ",
            nav_whatsapp: "<i class='fa-brands fa-whatsapp'></i> Hablar por WhatsApp",
            hero_title: "Cuidamos tu reforma como <br> si fuera nuestro propio proyecto.",
            hero_desc: "Alta disciplina en pintura, reformas de lujo y acondicionamiento institucional en el Maresme y Barcelona. Diseño atemporal, sin sorpresas.",
            hero_btn_quote: "Precio Orientativo Online",
            hero_btn_phone: "<i class='fa-solid fa-phone'></i> Llámanos y resuelve tus dudas",
            ser_paint_title: "Pintura Profesional",
            ser_paint_desc: "Pintura de interiores y exteriores. Acabados siempre lisos, limpios e impecables.",
            ser_bath_title: "Baños y Cocinas",
            ser_bath_desc: "Actualizamos tu baño o cocina por completo. Diseño moderno y gran funcionalidad.",
            ser_integral_title: "Reformas Integrales",
            ser_integral_desc: "Gestionamos toda la obra de principio a fin para que no te preocupes de nada.",
            ser_floor_title: "Suelos y Parquet",
            ser_floor_desc: "Suelos laminados y vinílicos. Un cambio rápido que aporta muchísima calidez.",
            ser_util_title: "Luz y Fontanería",
            ser_util_desc: "Actualización total de antiguas instalaciones. Modernidad oculta en tú vivienda.",
            ser_comm_title: "Comunidades y Oficinas",
            ser_comm_desc: "Mantenimiento integral de zonas comunes, parkings y espacios de trabajo institucionales.",
            ser_hint: "<i class='fa-solid fa-rotate'></i> Ver especializaciones",
            ser_specs_title: "Especialidades:",
            footer_title: "Pintura, Reforma y Acabados",
            footer_desc: "Profesionales de confianza. Pintores y constructores en BCN.",
            footer_loc: "<i class='fa-solid fa-location-dot'></i> Maresme y Barcelona",
            calc_title: "Diagnóstico de Alta Calificación",
            calc_intro: "Inicia el proceso para recibir una propuesta profesional ajustada a mercado.",
            calc_step1_q: "1. Selecciona el foco principal de tu proyecto:",
            calc_res_paint: "Pintura Profesional",
            calc_res_bath: "Baños y Cocinas",
            calc_res_integral: "Reformas e Industrias",
            calc_step2_q: "2. ¿En qué tipo de inmueble se realizará?",
            calc_step2_desc: "Ayuda a calcular logística exterior e interior.",
            calc_prop_piso: "Piso",
            calc_prop_casa: "Casa/Adosado",
            calc_prop_local: "Local",
            calc_step3_q: "3. ¿Cuál es el estado actual del inmueble?",
            calc_step3_desc: "El nivel de protección/escombros afecta directamente el coste.",
            calc_state_vacio_title: "Vacío o Despejado",
            calc_state_vacio_desc: "Fácil acceso para trabajar rápidamente.",
            calc_state_amueb_title: "Amueblado / Habitado",
            calc_state_amueb_desc: "Requiere máxima protección y movimientos.",
            calc_state_damage_title: "Muy dañado / Derribo",
            calc_state_damage_desc: "Requiere saneamiento profundo previo.",
            calc_step4_q: "4. Tamaño de la superficie a trabajar",
            calc_step5_q: "5. Nivel de acabados deseado",
            calc_qual_std: "Básico/Medio",
            calc_qual_pre: "Alta Gama",
            calc_step6_q: "6. ¿Para cuándo necesitas tenerlo listo?",
            calc_step6_desc: "Tu timeline ayuda a planificar nuestra agenda.",
            calc_time_urg: "Lo antes posible",
            calc_time_med: "Entre 1 a 3 meses",
            calc_time_flex: "Flexible",
            calc_placeholder_name: "Tu nombre",
            calc_placeholder_phone: "Tu teléfono (secreto profesional)",
            calc_loader: "Cruzando variables logísticas y precios locales...",
            btn_next: "Continuar <i class='fa-solid fa-arrow-right'></i>",
            btn_calc: "Emitir Análisis <i class='fa-solid fa-calculator'></i>",
            calc_price_title: "Estimación Analítica Local",
            calc_price_desc: "Este rango asertivo se basa en tus respuestas exclusivas. Lánzanos tu expediente por WhatsApp y coordinaremos una vista sin coste.",
            btn_whatsapp_calc: "Hablar para Visita Definitiva",
            chat_title: "Asistente de Atención",
            chat_welcome: "¡Hola! Soy el asistente virtual. ¿En qué tipo de obra o pintura puedo ayudarte hoy?",
            alert_radio: "Por favor escoge una opción.",
            alert_data: "Por favor déjanos tu nombre y móvil (esencial profesionalmente)."
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
            nav_method: "Our Process <i class='fa-solid fa-chevron-down' style='font-size:0.7em; margin-left:3px;'></i>",
            nav_method_1: "1. 1-to-1 Consultation",
            nav_method_2: "2. Fixed Quote",
            nav_method_3: "3. Turnkey Execution",
            nav_gallery: "Portfolio",
            nav_faq: "FAQ",
            nav_whatsapp: "<i class='fa-brands fa-whatsapp'></i> Chat on WhatsApp",
            hero_title: "We care for your renovation as <br> if it were our own project.",
            hero_desc: "High discipline in painting, luxury renovations, and institutional conditioning in Maresme and Barcelona. Timeless design, no surprises.",
            hero_btn_quote: "Configure Free Diagnostic",
            hero_btn_phone: "<i class='fa-solid fa-phone'></i> Technical Call",
            ser_paint_title: "Professional Painting",
            ser_paint_desc: "Interior and exterior painting. Always smooth, clean, and flawless finishes.",
            ser_bath_title: "Bathrooms & Kitchens",
            ser_bath_desc: "Complete bathroom or kitchen update. Modern design and great functionality.",
            ser_integral_title: "Complete Renovations",
            ser_integral_desc: "We manage the entire project from start to finish so you don't have to worry.",
            ser_floor_title: "Flooring & Parquet",
            ser_floor_desc: "Laminate and vinyl floors. A quick change that adds a lot of warmth.",
            ser_util_title: "Power & Plumbing",
            ser_util_desc: "Total update of old installations. Hidden modernity in your home.",
            ser_comm_title: "Communities & Offices",
            ser_comm_desc: "Integral maintenance of common areas, parkings, and institutional workspaces.",
            ser_hint: "<i class='fa-solid fa-rotate'></i> View specializations",
            ser_specs_title: "Specialties:",
            footer_title: "Painting, Renovation & Finishing",
            footer_desc: "Trusted professionals. Painters and builders in BCN.",
            footer_loc: "<i class='fa-solid fa-location-dot'></i> Maresme and Barcelona",
            calc_title: "High Qualification Diagnostic",
            calc_intro: "Start the process to receive a professional proposal adjusted to market rates.",
            calc_step1_q: "1. Select the main focus of your project:",
            calc_res_paint: "Professional Painting",
            calc_res_bath: "Bathrooms & Kitchens",
            calc_res_integral: "Renovations & Industry",
            calc_step2_q: "2. What type of property is it?",
            calc_step2_desc: "Helps calculate exterior and interior logistics.",
            calc_prop_piso: "Apartment",
            calc_prop_casa: "House/Townhouse",
            calc_prop_local: "Retail Space",
            calc_step3_q: "3. What is the current state of the property?",
            calc_step3_desc: "The level of protection/debris directly affects the cost.",
            calc_state_vacio_title: "Empty or Clear",
            calc_state_vacio_desc: "Easy access to work quickly.",
            calc_state_amueb_title: "Furnished / Lived-in",
            calc_state_amueb_desc: "Requires maximum protection and items movement.",
            calc_state_damage_title: "Heavily Damaged / Demolition",
            calc_state_damage_desc: "Requires deep cleaning and prior repairs.",
            calc_step4_q: "4. Measurement of the surface to work on",
            calc_step5_q: "5. Desired finish quality level",
            calc_qual_std: "Basic/Medium",
            calc_qual_pre: "High End",
            calc_step6_q: "6. When do you need it ready?",
            calc_step6_desc: "Your timeline helps us plan our schedule.",
            calc_time_urg: "As soon as possible",
            calc_time_med: "In 1 to 3 months",
            calc_time_flex: "Flexible",
            calc_placeholder_name: "Your name",
            calc_placeholder_phone: "Your phone number",
            calc_loader: "Crunching logistics variables and local rates...",
            btn_next: "Next <i class='fa-solid fa-arrow-right'></i>",
            btn_calc: "Issue Analysis <i class='fa-solid fa-calculator'></i>",
            calc_price_title: "Local Analytical Estimation",
            calc_price_desc: "This assertive range is based on your exclusive answers. Send us your file by WhatsApp for a free site visit.",
            btn_whatsapp_calc: "Speak for Final Visit",
            chat_title: "Customer Assistant",
            chat_welcome: "Hi! I'm your virtual assistant. What kind of renovation or painting project can I help you with today?",
            alert_radio: "Please select an option.",
            alert_data: "Please provide your name and phone (professionally essential)."
        },
        ca: {
            nav_services: "Els Nostres Serveis <i class='fa-solid fa-chevron-down' style='font-size:0.7em; margin-left:3px;'></i>",
            nav_residential: "Residencial",
            nav_res_paint: "Pintura de Pisos / Cases",
            nav_res_bath: "Banys i Cuines",
            nav_res_integral: "Reformes Integrals",
            nav_b2b: "Empreses i Zones Comunes",
            nav_b2b_office: "Oficines i Locals Comercials",
            nav_b2b_parking: "Pàrquings i Escales",
            nav_b2b_community: "Manteniment de Comunitats",
            nav_method: "Mètode <i class='fa-solid fa-chevron-down' style='font-size:0.7em; margin-left:3px;'></i>",
            nav_method_1: "1. Assessorament 1 a 1",
            nav_method_2: "2. Pressupost Tancat",
            nav_method_3: "3. Execució i Entrega",
            nav_gallery: "Treballs",
            nav_faq: "FAQ",
            nav_whatsapp: "<i class='fa-brands fa-whatsapp'></i> Parlar per WhatsApp",
            hero_title: "Cuidem la teva reforma com <br> si fos el nostre propi projecte.",
            hero_desc: "Alta disciplina en pintura, reformes de luxe i condicionament institucional al Maresme i Barcelona. Disseny atemporal, sense sorpreses.",
            hero_btn_quote: "Configurar Diagnòstic Sense Cost",
            hero_btn_phone: "<i class='fa-solid fa-phone'></i> Trucada Tècnica",
            ser_paint_title: "Pintura Professional",
            ser_paint_desc: "Pintura d'interiors i exteriors. Acabats sempre llisos, nets i impecables.",
            ser_bath_title: "Banys i Cuines",
            ser_bath_desc: "Actualitzem el teu bany o cuina completament. Disseny modern i gran funcionalitat.",
            ser_integral_title: "Reformes Integrals",
            ser_integral_desc: "Gestionem tota l'obra de principi a fi perquè no t'hagis de preocupar de res.",
            ser_floor_title: "Sòls i Parquet",
            ser_floor_desc: "Sòls laminats i vinílics. Un canvi ràpid que aporta molta calidesa.",
            ser_util_title: "Llum i Fontaneria",
            ser_util_desc: "Actualització total d'antigues instal·lacions. Modernitat oculta a la teva vivenda.",
            ser_comm_title: "Comunitats i Oficines",
            ser_comm_desc: "Manteniment integral de zones comunes, pàrquings i espais de treball institucionals.",
            ser_hint: "<i class='fa-solid fa-rotate'></i> Veure especialitzacions",
            ser_specs_title: "Especialitats:",
            footer_title: "Pintura, Reforma i Acabats",
            footer_desc: "Professionals de confiança. Pintors i constructors a BCN.",
            footer_loc: "<i class='fa-solid fa-location-dot'></i> Maresme i Barcelona",
            calc_title: "Diagnòstic d'Alta Qualificació",
            calc_intro: "Inicia el procés per rebre una proposta professional ajustada al mercat local.",
            calc_step1_q: "1. Selecciona el focus principal del teu projecte:",
            calc_res_paint: "Pintura Professional",
            calc_res_bath: "Banys i Cuines",
            calc_res_integral: "Reformes i Indústries",
            calc_step2_q: "2. En quin tipus d'immoble es realitzarà?",
            calc_step2_desc: "Ajuda a calcular la logística exterior i interior.",
            calc_prop_piso: "Pis",
            calc_prop_casa: "Casa/Adossat",
            calc_prop_local: "Local",
            calc_step3_q: "3. Quin és l'estat actual de l'immoble?",
            calc_step3_desc: "El nivell de protecció/runa afecta directament el cost.",
            calc_state_vacio_title: "Buit o Despejat",
            calc_state_vacio_desc: "Fàcil accés per treballar ràpidament.",
            calc_state_amueb_title: "Moblat / Habitat",
            calc_state_amueb_desc: "Requereix màxima protecció i moviments.",
            calc_state_damage_title: "Molt malmès / Enderroc",
            calc_state_damage_desc: "Requereix sanejament profund previ.",
            calc_step4_q: "4. Mida de la superfície a treballar",
            calc_step5_q: "5. Nivell d'acabats desitjat",
            calc_qual_std: "Bàsic/Mig",
            calc_qual_pre: "Alta Gamma",
            calc_step6_q: "6. Per a quan ho necessites tenir llest?",
            calc_step6_desc: "El teu timeline ens ajuda a planificar l'agenda.",
            calc_time_urg: "El més aviat possible",
            calc_time_med: "Entre 1 a 3 mesos",
            calc_time_flex: "Flexible",
            calc_placeholder_name: "El teu nom",
            calc_placeholder_phone: "El teu telèfon (secret professional)",
            calc_loader: "Creuant variables logístiques i preus locals...",
            btn_next: "Continuar <i class='fa-solid fa-arrow-right'></i>",
            btn_calc: "Emetre Anàlisi <i class='fa-solid fa-calculator'></i>",
            calc_price_title: "Estimació Analítica Local",
            calc_price_desc: "Aquest rang assertiu es basa en les teves respostes exclusives. Envia'ns el teu expedient per WhatsApp i coordinarem una vista sense cost.",
            btn_whatsapp_calc: "Parlar per Visita Definitiva",
            chat_title: "Assistent d'Atenció",
            chat_welcome: "Hola! Sóc l'assistent virtual. En quin tipus d'obra o pintura et puc ajudar avui?",
            alert_radio: "Per favor escull una opció.",
            alert_data: "Per favor deixa'ns el teu nom i mòbil (essencial professionalment)."
        }
    };

    window.setLanguage = function(lang) {
        if(event) {
            document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
            event.currentTarget.classList.add('active');
        }
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[lang][key]) {
                el.innerHTML = dict[lang][key];
            }
        });

        // Soporte para placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[lang][key]) {
                el.setAttribute('placeholder', dict[lang][key]);
            }
        });
    }

    /* =========================================
       0. PREPARADOR DE ANIMACIÓN DE TEXTO
       Divide el H1 en letras para animar
       ========================================= */
    const splitTextArray = document.querySelectorAll('.anim-split-text');
    splitTextArray.forEach(el => {
        // Envolver letras, exceptuando <br>
        const content = el.innerHTML;
        const newStr = content.split('<br>').map(line => {
            return line.split('').map((char, index) => {
                if(char === ' ') return ' ';
                // Stagger progresivo por letra
                return `<span class="char" style="animation-delay: ${index * 0.03}s">${char}</span>`;
            }).join('');
        }).join('<br>');
        el.innerHTML = newStr;
        // La clase is-animating desencadenará el @keyframes en el CSS
    });

    
    /* =========================================
       1. INTERSECTION OBSERVERS (SCROLL ANIM)
       ========================================= */
    const observerOptions = { 
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-animating');
                scrollObserver.unobserve(entry.target); // Solo 1 vez
            }
        });
    }, observerOptions);

    // Seleccionamos todo lo que queremos animar (letras, tarjetas, títulos)
    const animElements = document.querySelectorAll('.anim-fade-up, .anim-zoom-in, .anim-slide-right, .anim-split-text');
    animElements.forEach(el => {
        // Asignamos opacidad inicial 0 directamente x via css class (already defined in CSS)
        // Y lo observamos
        el.classList.add('anim-target');
        scrollObserver.observe(el);
    });

    // Animar las cosas que ya están en el hero viewport inmediatamente
    setTimeout(() => {
        document.querySelectorAll('.anim-split-text').forEach(el => el.classList.add('is-animating'));
    }, 100);

    /* =========================================
       2. EMBUDO CUESTIONARIO (MODAL CALCULADORA)
       ========================================= */
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtn = document.querySelector('.close-modal');
    const modal = document.getElementById('qualify-modal');
    const whatsappNum = "34631714077";
    
    // Función centralizada para abrir el modal
    const openModal = (e) => {
        if(e) e.preventDefault();
        console.log("Intentando abrir modal...");
        if(modal) {
            modal.style.display = 'flex'; // Asegurar visibilidad
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; 
            goToStep('step-1'); 
        }
    };

    // Asignación múltiple para máxima compatibilidad
    openBtns.forEach(btn => {
        btn.onclick = openModal;
        btn.addEventListener('click', openModal);
    });

    const closeModal = () => {
        if(modal) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };
    if(closeBtn) {
        closeBtn.onclick = closeModal;
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Cerrar al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    const steps = document.querySelectorAll('.form-step');
    const progressBar = document.getElementById('form-progress');

    // Selección de radio buttons
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        const input = card.querySelector('input[type="radio"]');
        if(!input) return;
        card.addEventListener('click', () => {
            const groupName = input.getAttribute('name');
            document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => {
                r.closest('.option-card').classList.remove('selected');
                r.checked = false;
            });
            input.checked = true;
            card.classList.add('selected');
            
            // Auto avance solo si es compact (para no forzar en el primer paso)
            if (card.classList.contains('compact')) {
                const step = card.closest('.form-step');
                const nextBtnWrapper = step.querySelector('.next-step');
                // if(nextBtnWrapper) nextBtnWrapper.click(); // Desactivado auto-avance para dar control
            }
        });
    });

    // Sincronización del slider de Metros Cuadrados
    const sizeSlider = document.getElementById('size-slider');
    const m2Output = document.getElementById('m2-output');
    if(sizeSlider && m2Output) {
        sizeSlider.addEventListener('input', (e) => {
            m2Output.innerText = e.target.value;
        });
    }

    const goToStep = (targetId) => {
        steps.forEach(s => s.classList.remove('active'));
        const nextStep = document.getElementById(targetId);
        if(nextStep) nextStep.classList.add('active');
        const stepNum = parseInt(targetId.split('-')[1]);
        progressBar.style.width = `${(stepNum / steps.length) * 100}%`;
    };

    nextBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentStep = btn.closest('.form-step');
            const hasRadios = currentStep.querySelector('input[type="radio"]');
            if(hasRadios && !currentStep.querySelector('input[type="radio"]:checked')) {
                alert("Por favor escoge una opción.");
                return;
            }
            goToStep(btn.getAttribute('data-target'));
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); goToStep(btn.getAttribute('data-target'));
        });
    });

    // Motor de Cálculo Avanzado (Hyper-Funnel)
    let calcMin = 0; let calcMax = 0; let finalReport = "";
    const calcBtn = document.getElementById('calculate-btn');
    if(calcBtn) {
        calcBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('vp-phone');
            
            if(!nameInput.value || !phoneInput.value) {
                alert("Por favor déjanos tu nombre y móvil (esencial profesionalmente)."); return;
            }

            // Datos del form (seguro null handling for defensive JS)
            const typeRadio = document.querySelector('input[name="project_type"]:checked');
            const propertyRadio = document.querySelector('input[name="property_type"]:checked');
            const stateRadio = document.querySelector('input[name="property_state"]:checked');
            const qualityRadio = document.querySelector('input[name="quality"]:checked');
            const timelineRadio = document.querySelector('input[name="timeline"]:checked');

            if(!typeRadio) { alert("Por favor escoge especialidad inicial."); return; }

            const type = typeRadio.value;
            const property = propertyRadio ? propertyRadio.value : 'Piso';
            const state = stateRadio ? stateRadio.value : 'Vacio';
            const quality = qualityRadio ? qualityRadio.value : 'Estandar';
            const timeline = timelineRadio ? timelineRadio.value : 'Medio';
            const m2 = parseInt(sizeSlider ? sizeSlider.value : "75");
            
            // Lógica algorítmica de precios base (Rango BCN 2024-2025 extrapolado a premium)
            let basePriceM2 = 0;
            if(type === 'Pintura') basePriceM2 = (quality === 'Premium') ? 25 : 12;
            else if(type === 'BanoCocina') basePriceM2 = (quality === 'Premium') ? 250 : 150; 
            else if(type === 'Integral') basePriceM2 = (quality === 'Premium') ? 950 : 650;
            
            let totalEstimation = m2 * basePriceM2;

            // Multiplicadores Expertos
            let multProperty = 1.0;
            if (property === 'Casa') multProperty = 1.15; // +15% andamios/exteriores
            else if (property === 'Local') multProperty = 1.10; // +10% permisos locales

            let multState = 1.0;
            if (state === 'Amueblado') multState = 1.10; // +10% protecciones y movimientos
            else if (state === 'Dañado') multState = 1.25; // +25% derribos pesados y desescombro
            
            totalEstimation = totalEstimation * multProperty * multState;

            // Piso mínimo cocina/baño
            if(type === 'BanoCocina' && totalEstimation < 4500) totalEstimation = 4500;

            calcMin = totalEstimation * 0.85; // Aumentamos la anchura de la horquilla por ser hiper precisos
            calcMax = totalEstimation * 1.15;

            // Formateador de moneda europeo
            const formatter = new Intl.NumberFormat('es-ES');
            document.getElementById('price-min').innerText = formatter.format(Math.round(calcMin)) + '€';
            document.getElementById('price-max').innerText = formatter.format(Math.round(calcMax)) + '€';

            // String final súper asertivo y comercial
            finalReport = `*Hola, soy ${nameInput.value}!* 👋\nHe usado la Calculadora Diagnóstica de vuestra web. Aquí mi expediente para agendar visita sin coste:\n\n` +
                          `*🎯 Foco:* ${(type === 'BanoCocina') ? 'Baño y Cocina' : type}\n` +
                          `*🏠 Inmueble:* ${property} - ${m2}m²\n` +
                          `*📦 Estado:* ${state}\n` +
                          `*💎 Calidad acordada:* ${quality}\n` +
                          `*⏳ Urgencia del proyecto:* ${timeline}\n\n` +
                          `*📊 Análisis del Sistema:* ${formatter.format(Math.round(calcMin))}€ a ${formatter.format(Math.round(calcMax))}€.\n\n` +
                          `*📱 Mi teléfono:* ${phoneInput.value}\n\nMe gustaría reservar en vuestro calendario disponible para visita y confirmación: https://cal.com/reformas-bcnpro`;

            // Transición Visual de Carga Psicológica Superior
            document.getElementById('step-10-actions').classList.add('hidden');
            document.getElementById('calc-loader').classList.remove('hidden');

            setTimeout(() => {
                document.getElementById('calc-loader').classList.add('hidden');
                document.getElementById('step-10-actions').classList.remove('hidden');
                goToStep('step-10');
            }, 2400); // 2.4s cruce de datos
        });
    }

    const submitBtn = document.getElementById('final-submit');
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let wUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(finalReport)}`;
            window.open(wUrl, '_blank');
            closeModal();
        });
    }

    /* =========================================
       5. LÓGICA DE TESTIMONIOS (VER MÁS)
       ========================================= */
    const showMoreBtn = document.getElementById('show-more-testimonials');
    const extraTestimonials = document.querySelectorAll('.extra-testimonial');
    
    if(showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            extraTestimonials.forEach(t => {
                t.classList.remove('hidden');
                t.classList.add('is-animating');
            });
            showMoreBtn.style.display = 'none'; // Se oculta tras mostrar todo
        });
    }

});
