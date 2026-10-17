# Plan — 3 prototipos de la nueva web de BCN ProReforma

**Fecha:** 17 de octubre de 2026 · **Estado:** aprobado por Omar y construido (ver la sección 10) · **Base:** «BCN ProReforma — Plan de diseño, conversión y desarrollo» (17/10/2026)

Prototipos navegables y completos, en local, que no se publican en producción. Los tres comparten el contenido, las fotografías y la lógica de contacto. Solo cambia la dirección visual, para poder comparar en igualdad de condiciones.

---

## 1. Qué entendemos por «3 webs»

Los tres enfoques que el documento considera en su sección 3, cada uno llevado a una web prototipo completa:

| | Prototipo | Enfoque | Para qué sirve |
|---|---|---|---|
| **A** | **Oficio** *(recomendado por el documento)* | Evoluciona la marca actual con el sistema visual de la sección 4 al pie de la letra | Es la propuesta que se construiría |
| **B** | **Estudio** | Estética de estudio de interiorismo: materiales, texturas y fotografía grande | Ver si una presencia más «premium» compensa el riesgo de parecer decoradores |
| **C** | **Técnico** | Presentación de proceso y sistema: preparación, capas y ficha técnica por obra | Ver si mostrar el método convence más que la estética |

En los tres manda la pintura (la portada da acceso primero a pintura especializada; reformas y acabados quedan como servicios secundarios).

> **Alternativa (2):** tres variantes de composición dentro del enfoque A (misma paleta y tipografía, distinta maquetación de portada y servicios). Si prefieres esto, dímelo al dar el OK.

---

## 2. Auditoría del punto de partida (hecha hoy)

| Hallazgo | Evidencia | Consecuencia para los prototipos |
|---|---|---|
| Producción se sirve desde este repo | `index.html` local y el de bcnproreforma.com tienen el mismo md5 (`deb2dbdc…`) | Los prototipos se crean aquí, en `prototipos/` |
| **Las fotos reales no están en git** | `scratch/` e `images/projects/real/` faltan en el repo (0 archivos en git); solo existen en la copia de OneDrive (sin `.git`, propiedad de root) y en el sitio en vivo | Copio a `prototipos/` solo las fotos elegidas, optimizadas. **Riesgo:** un `vercel --prod` desde este repo rompería la galería en vivo |
| **H1 invisible: causa confirmada** | `.anim-target{opacity:0}` se aplica al H1 (`main.js:822-825`); ninguna regla `.is-animating.anim-split-text` le devuelve la opacidad. Las letras animan dentro de un contenedor que sigue en 0 | Le pasa a todos los usuarios con JS. En los prototipos, el contenido es visible sin JS y la animación solo se añade encima |
| **Álbumes mal etiquetados en la web en vivo** | «Estuco veneciano» muestra una escalera de mármol y fontanería; «Baño de lujo» muestra la carpintería de madera del ático; «Tejados» muestra el garaje comunitario; «Microcemento» muestra una cocina | Los prototipos separan casos de álbumes y etiquetan lo que se ve realmente |
| **Imágenes generadas por IA presentadas como propias** | `servicio_*.webp`, `*-elite.png` y `hero-team.png` (también OG image) son renders | No se usan como obra propia en ningún prototipo |
| No hay fotos propias de pintura interior, alisados ni estucos | Revisión visual de las 146 fotos | Ver decisión de la sección 5 |
| Calculadora, `AW-XXXXXXXXXX`, Snapwidget `TU_WIDGET_ID` y privacidad `#` | `index.html` | Nada de esto entra en los prototipos |

---

## 3. Material propio utilizable (revisado foto a foto)

Los tres casos de obra salen de las únicas series con antes, proceso y después del mismo trabajo:

| Caso | Fotos | Antes → después | Por confirmar (Omar) |
|---|---|---|---|
| **1. Rehabilitación y pintura de fachada** (vivienda con el n.º 21) | `rehabilitacion-fachada-mataro-01…28` (las «23-13-39/40» son duplicados) | Pilar y muro con el revoque desprendido → reparación con escalera → fachada crema y carpintería gris | Municipio: los nombres de archivo dicen Mataró, pero el álbum dice Vilassar de Mar. Permiso de publicación |
| **2. Barnizado de carpintería exterior de madera** (cerramiento de ático) | `barnizado-madera-atico-01…15` + `restauracion-madera-exterior-01/02` | Madera gastada y agrisada → acabado barnizado con brillo | Municipio, producto aplicado, número de capas |
| **3. Pintura de garaje comunitario** | `pintura-garaje-comunitario-01…07` | Pared con la pintura desconchada → zócalo gris, franja roja y suelo pintado | Municipio y si se puede nombrar la comunidad |

Uso secundario: cocina con muebles verdes (`23-05-21`, falta saber qué trabajo se hizo), entrada con arco y tejado (`22-54-35`) y escalera de mármol (reformas). No se usan los renders de IA, las fotos de catálogo de baños (`WhatsApp 22.13.*`) ni las del muestrario de azulejos (`materials/`).

---

## 4. Lo común a los tres prototipos

**Páginas (12 por prototipo):** Inicio · Pintura de viviendas · Alisados y lacados · Pintura decorativa y estucos · Trabajos (casos + álbumes por categoría, separados) · 3 fichas de caso · Empresa · Contacto · Privacidad (borrador marcado) · 404. Menú: *Pintura y servicios · Trabajos · Empresa · Contacto* + «Solicitar presupuesto» + teléfono visible. Blog y reformas en un nivel secundario.

**Portada:** los 9 bloques de la sección 6, en orden, con el texto propuesto (antetítulo, titular, descripción, «Solicitar presupuesto» / «Enviar fotos por WhatsApp»). El bloque 7 (opiniones) aparece vacío y marcado como pendiente: no se inventan reseñas.

**Contacto (sección 9):**
- Formulario en una columna. Obligatorios: teléfono, municipio y tipo de trabajo. Opcionales: nombre y descripción. De forma progresiva: superficie («No lo sé»), fecha deseada y presupuesto («Prefiero no decirlo»).
- Los 6 estados diseñados: sin completar, campo no válido (error junto al campo y foco en el primero), enviando (botón bloqueado contra dobles envíos), recepción confirmada (con identificador de la solicitud), error del receptor (conserva lo escrito y ofrece reintento, WhatsApp y teléfono) y recepción no confirmada por corte de red (explica la incertidumbre, sin falso éxito).
- **El prototipo no envía nada.** Un panel de demostración con la etiqueta «Prototipo · no envía datos» permite simular cada resultado. No se toca el Apps Script real, así que no salen emails de prueba.
- WhatsApp con mensaje prellenado según el servicio y la página de origen. El servicio llega preseleccionado desde su página o su caso.
- Canales centralizados en un solo `config.js`: llamadas al +34 639 05 88 19 y WhatsApp al +34 631 71 40 77, cada uno identificado (sección 9, «pueden ser diferentes»).

**Calidad:**
- H1, oferta y contacto visibles sin JS y con movimiento reducido. Desplazamientos de 8 px como máximo y transiciones de 150–240 ms.
- Enlace para saltar al contenido, foco visible, etiquetas reales, teclado en galería y diálogo (con retorno del foco) y textos alternativos que describen lo visible.
- Barra inferior móvil (WhatsApp + Llamar) que no tapa el formulario ni el teclado.
- Imágenes WebP a 2 tamaños con dimensiones reservadas: la principal con prioridad y el resto en diferido.
- Sin Font Awesome: iconos SVG en línea. Analítica simulada (solo consola, sin datos personales). `noindex` en todas las páginas.

**Modo revisión:** un botón resalta cada dato pendiente de confirmar (municipios, enlace al Gremi, horarios, respuestas de FAQ, responsables de cada canal). Sirve como lista de comprobación para Omar y Mohamed.

---

## 5. Decisión que necesito: fotos que no existen

Los tres servicios prioritarios (viviendas, alisados/lacados y decorativa/estucos) **no tienen fotos propias**.

1. **(Recomendado)** Hueco diseñado y rotulado: «Foto propia pendiente: alisado de pared antes/después». El prototipo funciona además como lista de fotos que Mohamed debe hacer en las próximas obras.
2. Imágenes ilustrativas (las actuales generadas por IA) con la etiqueta visible «Imagen ilustrativa · sustituir», nunca en casos ni en Trabajos.

El hero de cada prototipo usa siempre una foto propia: fachada terminada (A), detalle de madera barnizada (B) y la secuencia antes/proceso de la fachada (C).

---

## 6. Las tres direcciones visuales

### A · Oficio (sección 4, literal)
- **Color:** marfil `#F7F4EE`, azul `#162D3B`, cobre `#A84821` (botón principal, texto blanco 5,81:1), secundario `#52616B`. Blanco y líneas discretas como superficies.
- **Tipografía:** Inter 400/600/700 (la elige el documento por continuidad, aunque la skill de rediseño desaconseja Inter: manda el documento). Texto de 17–18 px con interlineado 1,55; titulares de 34–38 px en móvil y 52–60 px en escritorio, con `text-wrap: balance`.
- **Composición:** contenedor de 1.184 px. Bloques que alternan foto y explicación; tarjetas solo para elegir servicio u obra. Hero en dos columnas con el texto sobre fondo sólido.

### B · Estudio
- **Color:** cal `#F2EEE7`, piedra `#E3DCD1`, tinta `#1E272C`, acento terracota `#9A4527` (contraste ≥4,5:1 comprobado antes de aplicarlo).
- **Tipografía:** serif de titular (Fraunces) + Inter para la lectura.
- **Composición:** retícula asimétrica, fotos a sangre, recortes de detalle (veta, brillo del barniz, textura del revoque) y mucho espacio en blanco. Muestrario de acabados con el nombre de cada técnica.
- **Riesgo que se evalúa:** que se perciba como diseño de interiores y no como oficio.

### C · Técnico
- **Color:** blanco roto `#F5F5F2`, grafito `#1C232B`, azul `#162D3B`, cobre de acento. Retícula visible con líneas finas.
- **Tipografía:** Inter + IBM Plex Mono para etiquetas y datos (tabular).
- **Composición:** proceso numerado (01 Protección · 02 Preparación del soporte · 03 Imprimación · 04 Acabado). Cada caso como «ficha técnica»: soporte inicial, preparación, sistema aplicado y acabado, con los datos desconocidos marcados como pendientes, no estimados.
- **Riesgo que se evalúa:** que resulte frío para un cliente que quiere renovar su casa.

Skills por dirección: `design-taste-frontend` y `high-end-visual-design` (las tres), `minimalist-ui` (B) e `industrial-brutalist-ui` en versión suave (C). Además, `emil-design-eng` para el movimiento y `design:ux-copy` para estados y errores.

---

## 7. Ejecución

1. **Rama** `feat/prototipos-rediseno` desde `master`. No se toca `.gitignore`, que ya tiene un cambio tuyo sin commitear.
2. **Capa compartida:** fotos elegidas y optimizadas (Pillow, ya instalado), `config.js` de canales, lógica del formulario y de sus estados, galería accesible, modo revisión y textos comunes en un único archivo (los tres dicen exactamente lo mismo). `prototipos` se añade a `.vercelignore` para que nunca llegue a producción.
3. **Prototipo A**, después **B** y **C**. Los tres son carpetas independientes, así que B y C pueden ir en paralelo en sesiones separadas cuando la capa compartida esté terminada. Te lo propondré en ese momento.
4. **Página índice** `prototipos/index.html` para comparar los tres, con notas de cada enfoque.
5. **Verificación con evidencia:** servidor local en el panel del navegador; capturas a 320, 360, 390, 768, 1.024 y 1.440 px; teclado; movimiento reducido; JS desactivado (el H1 se tiene que ver); los 6 estados del formulario; Lighthouse (`chrome-devtools`) y revisión de accesibilidad (`design:accessibility-review`). Se informa de lo comprobado, no de lo supuesto.
6. **Commits atómicos** en inglés, **sin push** (Carapace) y `HANDOFF.md` actualizado al cerrar.

**No se hace sin otro OK:** desplegar en Vercel (ni preview ni prod), tocar `index.html`/`main.js` de producción, enviar al Apps Script, `npm install` o borrar archivos.

---

## 8. Pendiente de Omar (no bloquea los prototipos, sí la publicación)

1. Municipio real y permiso de publicación de los 3 casos.
2. Quién atiende el teléfono y quién el WhatsApp.
3. URL exacta de la ficha de Mohamed en el directorio del Gremi.
4. Respuestas de FAQ, plazos y compromisos validados por Mohamed.
5. Fotos propias de pintura interior, alisados y estucos (ver la sección 5).

## 9. Fuera de alcance (posible sesión aparte)

Corregir el H1 invisible en producción (Paquete 2) y subir a git las fotos que faltan. Son arreglos de la web actual, independientes de los prototipos. **Hecho y desplegado el 17/10/2026** (ver `HANDOFF.md`).

---

## 10. Resultado (17/10/2026)

**Dónde:** `prototipos/index.html` compara los tres; cada uno vive en `a-oficio/`, `b-estudio/` y `c-tecnico/` (12 páginas cada uno). Servir el repo con `python3 -m http.server 8181` y abrir `http://localhost:8181/prototipos/`.

**Cómo se regeneran:** el contenido común está en `_build/content.py` y cada dirección en `_build/theme_a|b|c.py`; el CSS de cada tema está junto a sus páginas.

```bash
python3 prototipos/_build/images.py      # fotos optimizadas (solo si cambian las fuentes)
python3 prototipos/_build/build.py       # regenera las 36 páginas
node prototipos/_build/check-pages.mjs   # 216 comprobaciones (con el servidor local en marcha)
```

**Ajustes respecto a este plan, aplicando las skills de diseño:**
- B usa Newsreader + Geist y una paleta gris piedra fría, pizarra y terracota, en lugar de Fraunces y el beige con terracota previstos: la skill de diseño veta Fraunces y esa paleta como opción por defecto.
- C usa IBM Plex Sans + Plex Mono (no Inter) para diferenciarse de A, y el cobre de la marca como único acento.
- La descripción del hero se limita a 12 palabras; la frase sobre Mohamed pasa a su bloque, y el texto de apoyo, al contacto y al cierre.
- Solo modo claro y solo castellano. Las fuentes se cargan de Google Fonts; en producción, alojarlas en la web.
- Fotos: se recortó una matrícula legible y las franjas de una captura de móvil. No se aplican filtros: los colores de la pintura deben verse reales.

**Comprobado:**
- 36 páginas a 320, 390, 768, 1.024 y 1.440 px y sin JavaScript: un H1 visible, sin desbordamiento horizontal, sin imágenes rotas, sin errores de consola, sin alt vacíos, sin `href="#"` y sin rayas.
- Formulario: los 6 estados; la referencia se mantiene al reintentar y un doble clic produce un solo envío; el servicio llega preseleccionado desde la URL; la medición simulada no lleva datos personales.
- Lightbox: teclado, vuelta circular y retorno del foco.
- Lighthouse móvil en las tres portadas: Accesibilidad 100 y Buenas prácticas 100. SEO 66 solo por el `noindex` intencionado.

**No comprobado:** lectores de pantalla reales, Safari en iOS, rendimiento de campo. El formulario no está conectado a ningún receptor.

**Pendiente añadido en la revisión:** en el álbum de madera aparece una persona reconocible y un cartel con un teléfono (esa foto ya está publicada en la web actual).
