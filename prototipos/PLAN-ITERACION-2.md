# Iteración 2 — de prototipo a web publicada, con SEO, GEO y medición

**Fecha:** 20/10/2026 · **Estado:** pendiente del OK de Omar · **Sustituye a:** la sección 5 de `PLAN-MATERIAL-MICROCEMENTO.md` (Omar pide que decida yo lo pendiente)

---

## 0. Qué me pides, en una lista

1. Cerrar yo lo pendiente del material fotográfico y meter las fotos de microcemento y estuco en los tres prototipos. Es todo el material que hay de Mohamed.
2. Reescribir todo el texto de la web con más cuidado y originalidad, partiendo de la web actual.
3. Publicar la versión final en bcnproreforma.com.
4. Instalar Google Analytics, preparar el Perfil de Empresa de Google y conectar Search Console.
5. Ordenar los encabezados (H1 a H6) con el nombre del negocio y los servicios.
6. Revisar `robots.txt` para no bloquear ningún robot.
7. Definir palabras clave, SEO y GEO (visibilidad en buscadores con IA).
8. Lo que no me has dicho: está en la sección 7.

---

## 1. Decisiones que tomo por ti (puedes cambiarlas)

| Pendiente | Decisión | Motivo |
|---|---|---|
| Microcemento | **Servicio propio con página** («Microcemento en baños, suelos y terrazas»). Estucos se queda en «Pintura decorativa y estucos» | Hay 20 fotos de microcemento y solo 2 dudosas de estuco; la web actual ya lo vende y tiene un artículo del blog sobre ello |
| Fotos por obra | Agrupo por lo que se ve: **baño claro con ducha integrada** (2021), **baño gris oscuro** (2024), **suelos de vivienda** (2021) y **terraza con escalera** (2021) | Mismo color, mismos elementos y misma fecha. Se publica como «obra de microcemento», sin municipio ni cliente |
| Municipio y permiso | No se publica municipio. Las fotos no muestran nada que identifique la vivienda ni a personas | Así se pueden usar ya; si Mohamed confirma datos, se añaden después |
| Paredes con aguas | Van a «Pintura decorativa y estucos» con el pie «acabado decorativo en pared», sin decir estuco ni microcemento | No afirmar una técnica sin confirmar |
| Capa verde | Pie: «fase intermedia del sistema, antes del acabado» | Es lo que se ve; sin nombrar producto |
| Revelado | Conservador (enderezar, recortar sacos y cinta, corregir solo una dominante evidente, sin tocar el acabado). Te enseño original y revelada | Sección 2 del plan de microcemento |
| Vídeo | 1 clip de unos 12 s sin sonido, con controles, en la ficha del baño | Sin reproducción automática (plan, sección 4) |

**Lo que no puedo decidir por ti** está en la sección 8.

---

## 2. Fase 1 — Prototipos con fotos nuevas y texto definitivo (sin bloqueos)

1. **Revelado** de las 22 fotos y del vídeo con un script reproducible (`_build/images.py`), sin metadatos. Comparativa original/revelada en una página del índice de prototipos.
2. **Contenido nuevo en `content.py`:**
   - Servicio «Microcemento» (página propia) en los tres prototipos.
   - 3 casos nuevos: baño claro, baño gris (2024) y suelos y terraza. Con estos ya son 6 obras documentadas.
   - Álbum «Microcemento».
   - Fotos de proceso: suelo a medias y capa verde.
   - Portadas: B pasa a abrir con el baño de microcemento; A y C lo meten en «Trabajos con antes y después» y en servicios.
   - Los huecos rotulados de «decorativa y estucos» y de «pintura de viviendas» se rellenan solo donde hay foto pertinente. El resto sigue rotulado.
3. **Reescritura de todo el texto**, con la web actual como fuente de voz y de datos:
   - **Se conserva lo bueno:** el trato cercano y directo, «No es una oferta de empleo» (filtra a quien busca trabajo), la cobertura por municipios, la protección de la vivienda y el presupuesto por escrito.
   - **Se quita lo que no se puede acreditar:** «30 años», «+180 hogares», «presupuesto en 48 h», «visita gratis» (salvo que lo confirmes) y la valoración 4,9/23.
   - **Se añade lo comprobado:** agremiados desde 1994, titular Mohamed, base en Cabrils y las obras reales de microcemento.
   - **Estilo:** frases concretas en castellano, sin muletillas ni rayas, una idea por párrafo y verbos de oficio (sanear, enlucir, imprimar).
   - **Revisión:** cada texto con la skill `design:ux-copy` y una lectura final completa de la página.
4. **Encabezados** de cada página según la sección 4.
5. **Comprobación:** `check-pages.mjs` ampliado (orden de encabezados, un H1, title y description únicos) y Lighthouse.

**Resultado:** los tres prototipos con todo el material real y el texto final, listos para que elijas uno.

---

## 3. Fase 2 — Llevar el prototipo elegido a producción (necesita tu elección)

1. **Estructura y URLs.** Las URLs actuales con tráfico posible se mantienen o se redirigen con 301:
   - Se mantienen: `/`, `/municipios/pintor-*.html` y `/blog/*`.
   - Páginas nuevas: `/pintura-viviendas`, `/alisados-lacados`, `/estucos-pintura-decorativa`, `/microcemento`, `/trabajos`, las fichas de obra, `/empresa`, `/contacto`, `/privacidad` y `/aviso-legal`.
   - Los duplicados de la raíz (`/pintor-cabrils.html`, `/pintor-vilassar-de-mar.html`, `/reformas-mataro.html`) redirigen a su página de municipio. Se arregla el 301 que hoy no funciona por `cleanUrls`.
2. **Municipios:** las 8 páginas se reescriben con el sistema nuevo, con texto propio por municipio y obras cercanas cuando existan. No serán copias que solo cambian el nombre.
3. **Blog:** los 4 artículos pasan a la plantilla nueva, con precios revisados o retirados si no están validados, fecha de actualización y enlaces a los servicios.
4. **Formulario real:** conectar con el Apps Script actual de forma que devuelva un acuse leíble (hoy se envía «a ciegas»). Prueba de extremo a extremo con un registro de prueba marcado y borrado después, sin enviar emails a clientes. Los 6 estados se mantienen.
5. **Idiomas:** castellano en el lanzamiento. Catalán completo en una entrega posterior: la web actual mezcla ES, EN y CA y el plan prohíbe páginas a medio traducir.
6. **Legal:** aviso legal (titular, NIF y domicilio según la decisión de la sección 8), privacidad y cookies coherentes con los scripts instalados.
7. **Rendimiento:** fuentes alojadas en la web, imágenes con tamaños, sin Font Awesome ni el JavaScript antiguo (calculadora, animaciones).
8. **Despliegue:** primero una vista previa de Vercel para revisarla; producción solo con tu OK; plan de vuelta atrás documentado.

---

## 4. Encabezados (H1 a H6) — cómo quedarán

Un solo H1 por página. El resto en orden, sin saltos y sin repetir palabras clave por relleno: Google y los buscadores con IA premian la estructura clara, no la repetición.

| Página | H1 | H2 (ejemplos) | H3 y siguientes |
|---|---|---|---|
| Inicio | Pintores en el Maresme y Barcelona: pintura, estucos y microcemento | Pintura especializada · Microcemento · Trabajos · Cómo trabajamos · Quiénes somos · Preguntas | Cada servicio, cada obra y cada paso como H3; los detalles como H4 |
| Servicio | Microcemento en baños, suelos y terrazas en el Maresme | Qué incluye · Cómo lo aplicamos · Obras · Precio · Preguntas | Partidas y fases como H3; si una fase tiene subfases, H4 |
| Municipio | Pintor en Vilassar de Mar | Servicios en Vilassar de Mar · Obras cercanas · Cómo pedir presupuesto | Servicios como H3 |
| Obra | Baño de microcemento con ducha integrada | Estado inicial · Preparación · Acabado | Fotos agrupadas como H3 |

El nombre del negocio aparece en el `<title>` (por ejemplo «Microcemento en el Maresme | Pintura en general y acabados de obra»), en la cabecera, en el pie y en los datos estructurados. En el H1 solo cuando suene natural (inicio y empresa). H5 y H6 solo si una página llega a ese nivel de detalle: forzar los seis niveles empeora el SEO.

---

## 5. Fase 3 — SEO, GEO y palabras clave

**Rastreo e indexación**
- `robots.txt`: `Allow: /` para todos. Quito `Disallow: /js/`, que impide a Google ver la página como la ve el usuario. Permito expresamente los rastreadores de buscadores con IA (Google-Extended, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Bingbot). Bloqueo solo carpetas internas que ya no se despliegan.
- `sitemap.xml` regenerado solo con las URLs finales (hoy incluye redirecciones y una página que da 404), con fecha de modificación real.
- Canónicas, `hreflang` solo cuando exista el catalán, Open Graph con una foto real por página y página 404 que no se indexe.

**Datos estructurados (JSON-LD) veraces**
- `HousePainter` (subtipo de `LocalBusiness`) como negocio sin local abierto al público: `areaServed` con los municipios, teléfono, `memberOf` Gremi y sin dirección de calle salvo tu decisión.
- `Service` por servicio, `BreadcrumbList` y `FAQPage` donde haya preguntas reales.
- **Quitar ya** la valoración 4,9/23 y el texto de relleno `DIRECCIÓN_COSTA_BRAVA`. Una valoración sin reseñas verificables va contra las normas de Google y puede acarrear una penalización manual.

**Palabras clave (mapa por página)**
- Primario por página, sin canibalizar: «pintor Maresme», «pintores en Barcelona», «microcemento Maresme» y «microcemento baño Barcelona», «quitar gotelé Maresme», «estuco veneciano Barcelona», «pintar piso precio Barcelona» (blog), «pintor + municipio» (páginas locales).
- Fuentes sin herramientas de pago: autocompletado y búsquedas relacionadas de Google, competidores locales que posicionan y lo que pregunta la gente. **No tengo volúmenes de búsqueda reales**: los dará Search Console unas semanas después de conectarlo, y entonces se ajusta el mapa.

**GEO (que los buscadores con IA nos citen)**
- Página de empresa con los datos verificables en frases claras: quién, desde cuándo (Gremi 1994), dónde, qué hace y qué no.
- Respuestas directas al principio de cada servicio y de cada FAQ.
- `llms.txt` en la raíz con un resumen y los enlaces principales.
- El mismo nombre, teléfono y zona en la web, el Perfil de Empresa, Instagram y los directorios.

---

## 6. Fase 4 — Medición y Google (tú creas las cuentas; yo lo dejo instalado y documentado)

No puedo crear cuentas ni aceptar condiciones en tu nombre. Te dejo los pasos exactos y el resto lo hago yo.

| Herramienta | Lo que haces tú (≈10 min) | Lo que hago yo |
|---|---|---|
| **Google Analytics 4** | Crear la propiedad «bcnproreforma.com» y pasarme el ID `G-…` | Instalarlo con Consent Mode v2 y un banner de cookies real (aceptar o rechazar, sin activar nada antes). Eventos: `lead_received`, `whatsapp_click`, `phone_click` y `album_open`, sin datos personales. Quitar el `AW-XXXXXXXXXX` de ejemplo |
| **Search Console** | Añadir la propiedad de dominio y crear el registro TXT en GoDaddy (o pasarme la etiqueta HTML) | Verificar, enviar el sitemap, revisar la cobertura y preparar el informe de palabras clave a las 3-4 semanas. Bing Webmaster se importa desde Search Console en un clic |
| **Perfil de Empresa** | Crear el perfil como **negocio sin local abierto al público** (el de Cabrils estuvo suspendido) y verificarlo por vídeo | Kit listo para pegar: nombre (el mismo que en la web), categorías (Pintor como principal; Contratista de microcemento y Empresa de reformas como secundarias), descripción de 750 caracteres, servicios con su descripción, zona de servicio, 10 fotos reveladas, primeras publicaciones y un texto para pedir reseñas a clientes reales |

Según `CLAUDE.md`, el Perfil de Empresa lo gestiona Claude.ai con el navegador; yo preparo el material aquí.

---

## 7. Lo que no has mencionado pero hace falta

1. **Un solo nombre comercial.** Hay tres versiones. Afecta al H1, al Perfil de Empresa y a los directorios. Ver la sección 8.
2. **Reseñas reales:** sustituyen a la valoración inventada. Pedirlas tras cada obra con un enlace directo.
3. **Directorios locales** con los mismos datos: Habitissimo, Páginas Amarillas, Houzz, Cronoshare y la ficha del Gremi.
4. **Instagram (@pintayreformatuobra):** bio con enlace a la web y un carrusel o reel con el baño de microcemento.
5. **Agente de WhatsApp** (en otro repo, pendiente de credenciales): su base de conocimiento debe repetir los datos de la web nueva.
6. **Correo con dominio propio** (`info@bcnproreforma.com`): más confianza que Gmail. Opcional y de pago.
7. **Guía de fotos para Mohamed**, para que la próxima obra llegue con un antes, tomas horizontales y luz rasante.
8. **Seguimiento comercial:** registrar cada solicitud con su origen para saber qué canal trae obras (plan base, sección 15).

---

## 8. Decisiones que necesito de ti

1. **Qué prototipo** se publica: A (recomendado), B o C. Bloquea la fase 2.
2. **Nombre comercial único**: «Pintura en general y acabados de obra» (el de las facturas), «Pintura, Reformas y Acabados de Obra» (el de la web) u otro.
3. **Aviso legal**: la ley pide titular, NIF y domicilio. ¿Publicamos el NIE y la dirección de Cabrils, o consultamos antes con la gestoría?
4. **Compromisos que la web puede prometer**: ¿visita gratuita? ¿plazo de respuesta? Si no se confirman, no aparecen.
5. **Cuentas de Google**: crear GA4 y Search Console y pasarme el ID o el TXT, y crear el Perfil de Empresa cuando el kit esté listo.

---

## 9. Orden y entregas

| Paso | Entrega | Necesita |
|---|---|---|
| 1 | Fase 1 completa en los tres prototipos | Nada: empiezo con tu OK a este plan |
| 2 | Arreglos urgentes en la web actual: valoración y dirección falsas del schema, `robots.txt`, sitemap y redirección rota | Tu OK al despliegue |
| 3 | Fase 2 en una vista previa de Vercel | Decisiones 1, 2 y 3 |
| 4 | Fases 3 y 4 en la vista previa | Decisión 5 (los ID) |
| 5 | Publicación en bcnproreforma.com y conexión de Search Console | Tu OK final |
| 6 | Kit del Perfil de Empresa, directorios y guía de fotos | Ninguna |
| 7 | Informe de palabras clave con datos reales (3-4 semanas después) | Search Console con datos |

Commits atómicos y sin push ni despliegue sin tu OK (Carapace). Cada entrega se cierra con el informe ✅/⚠️/🐛.
