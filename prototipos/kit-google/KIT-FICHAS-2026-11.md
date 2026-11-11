# Kit de fichas y directorios — noviembre de 2026

Documento interno (`prototipos/` no se publica). Sustituye a `KIT-PERFIL-EMPRESA.md` y `DIRECTORIOS.md` (20/10/2026) en todo lo que se contradiga. El seguimiento de altas va en `CITAS.md`.

**No arrastrar de los documentos antiguos:** años de antigüedad, valoraciones o número de reseñas, el orden con el microcemento primero, el horario antiguo, «gratis», «24h», «garantizado» ni «tejados». Si un dato no está confirmado, se deja el campo vacío; nunca se escribe que falta.

**Regla de oro:** el mismo nombre, el mismo teléfono y la misma web, escritos exactamente igual, en todas las fichas. Copiar siempre del bloque 1; no reescribir de memoria.

---

## 1. Bloque maestro NAP (copiar y pegar tal cual)

```
Nombre:            BcnProReforma
Categoría:         Pintor
Teléfono:          +34 639 05 88 19
WhatsApp:          +34 631 71 40 77
Email:             bcnproreforma@gmail.com
Web:               https://bcnproreforma.com
Dirección:         C/ Doctor Masriera 8, 08348 Cabrils (Barcelona)
Dirección corta:   Cabrils, 08348 (Barcelona)
Horario:           lunes a sábado 08:00–20:00; domingo cerrado
Titular:           Mohamed Ben Mesaud (autónomo)
Asociación:        Gremi d'Empreses de Pintura de Barcelona i Comarques
Instagram:         @pintayreformatuobra  (https://www.instagram.com/pintayreformatuobra/)
```

**Formato del teléfono:** `+34 639 05 88 19` donde el campo admite prefijo; si el formulario ya fija España (+34), escribir `639 05 88 19`. No usar otras agrupaciones (639058819, 639-058-819).

**Dirección, según plataforma:**

| Plataforma | Qué poner |
|---|---|
| Google Business Profile, Bing Places | Dirección completa solo para verificar; **oculta** al público (negocio de área de servicio). |
| Apple Business | Dirección completa, **visible**. |
| Resto de directorios | `Cabrils, 08348` sin calle si el formulario lo permite; si la calle es obligatoria, la dirección completa tal cual del bloque. Nunca «bajo 2» ni variantes. |

**Zona de servicio (19 municipios, Barcelona incluida; fuente: `MUNICIPIOS` de `_build/content.py`):**

```
Alella, Arenys de Mar, Argentona, Badalona, Barcelona, Cabrera de Mar, Cabrils, Caldes d'Estrac, El Masnou, Mataró, Montgat, Premià de Dalt, Premià de Mar, Sant Andreu de Llavaneres, Sant Vicenç de Montalt, Teià, Tiana, Vilassar de Dalt, Vilassar de Mar
```

Google admite hasta 20 zonas: caben las 19. El perfil actual lista barrios (Sant Gervasi-La Bonanova, Sarrià-Sant Gervasi) y «18 zonas más»: sustituirlo por esta lista de 19 para que coincida con la web.

**Orden de servicios (en todas partes):** 1. Pintura de pisos y casas · 2. Estucos y pintura decorativa · 3. Microcemento · 4. Alisados y lacados · 5. Fachadas y comunidades · 6. Barnizado de carpintería · 7. Reformas de baño y cocina (siempre al final).

**Convención UTM para el campo «web»:**

| Destino | Enlace |
|---|---|
| Google Business Profile (web) | `https://bcnproreforma.com/?utm_source=gbp&utm_medium=organic&utm_campaign=ficha` |
| Google Business Profile (publicaciones) | `…&utm_source=gbp&utm_medium=organic&utm_campaign=post` (ver 3.1.6) |
| Cualquier directorio | `https://bcnproreforma.com/?utm_source=<plataforma>&utm_medium=directorio&utm_campaign=citas` |
| Apple Business (web y botones de acción) | `https://bcnproreforma.com` **sin UTM** |

`<plataforma>` en minúsculas y sin espacios: `bing`, `foursquare`, `yelp`, `habitissimo`, `cronoshare`, `trustlocal`, `houzz`, `instapro`, `zaask`, `starofservice`, `paginasamarillas`, `11811`, `qdq`, `infoisinfo`, `cylex`, `hotfrog`, `opendi`, `europages`, `facebook`. Si el campo rechaza parámetros, poner la web sin UTM.

---

## 2. Descripciones (español)

Recuento hecho con `len()` de Python sobre el texto exacto entre comillas (espacios y puntuación incluidos). Si se edita una, volver a contar.

### 2.1 Corta — 147 caracteres (límite 160)

> BcnProReforma, pintor en Cabrils. Pintura de pisos y casas, estucos, microcemento, alisados y lacados en el Maresme y Barcelona. Tel. 639 05 88 19.

### 2.2 Media — 228 caracteres (límite 250)

> BcnProReforma es un pintor con base en Cabrils, miembro del Gremi d'Empreses de Pintura de Barcelona i Comarques. Pintamos pisos y casas y trabajamos estucos, microcemento, alisados, lacados y fachadas en el Maresme y Barcelona.

### 2.3 Google Business Profile — 739 caracteres (límite 750)

Sin teléfono ni URL: Google no los admite en la descripción.

> BcnProReforma es un pintor con base en Cabrils, miembro del Gremi d'Empreses de Pintura de Barcelona i Comarques. Pintamos pisos y casas, enteros o por estancias: paredes, techos, puertas y radiadores. Antes de pintar protegemos suelos y muebles y reparamos grietas y golpes. También aplicamos estuco veneciano y pintura decorativa, revestimos baños, suelos y escaleras con microcemento, quitamos gotelé, alisamos paredes y lacamos o barnizamos carpinterías. Pintamos fachadas, escaleras de comunidades y garajes, y hacemos reformas de baño y cocina. Trabajamos en Cabrils, Mataró, Vilassar, Premià, El Masnou, Alella, Teià, Montgat, Badalona, Barcelona y el resto del Maresme. En el presupuesto detallamos la preparación y los materiales.

### 2.4 Larga — 1.366 caracteres (límite 1.500)

> BcnProReforma es un pintor con base en Cabrils (Barcelona). El titular es Mohamed Ben Mesaud, autónomo y miembro del Gremi d'Empreses de Pintura de Barcelona i Comarques. Nuestro trabajo principal es la pintura de viviendas: pisos y casas enteros o por estancias, con paredes, techos, puertas, zócalos y radiadores. Antes de abrir un bote protegemos suelos y muebles, reparamos grietas, golpes y desconchados e imprimamos donde el soporte lo pide. También trabajamos acabados decorativos: estuco veneciano a la cal, veladuras y acabados con aguas, con una muestra sobre la pared antes de aplicarlo entero. Revestimos baños, suelos, escaleras y terrazas con microcemento cuando el soporte y el uso lo permiten. Quitamos o tapamos el gotelé hasta dejar la pared lisa, lacamos puertas y armarios y barnizamos carpintería de madera interior y exterior. Pintamos fachadas, muros y rejas, y escaleras, zonas comunes y garajes de comunidades. Además coordinamos reformas de baño y cocina. Trabajamos en Alella, Arenys de Mar, Argentona, Badalona, Barcelona, Cabrera de Mar, Cabrils, Caldes d'Estrac, El Masnou, Mataró, Montgat, Premià de Dalt, Premià de Mar, Sant Andreu de Llavaneres, Sant Vicenç de Montalt, Teià, Tiana, Vilassar de Dalt y Vilassar de Mar. Atendemos de lunes a sábado, de 8:00 a 20:00. Llámanos al 639 05 88 19 o envía fotos por WhatsApp al 631 71 40 77.

**Qué descripción usar:** si el campo admite 1.500 o más, la larga (2.4); entre 750 y 1.499, la de GBP (2.3); entre 250 y 749, la media (2.2) o la de GBP si cabe; por debajo de 250, la corta (2.1). En Apple (500 caracteres) va la media.

---

## 3. Precios orientativos («desde», sin IVA)

> Valores «desde» de `prototipos/docs/2026-11-precios-orientativos.md` (noviembre 2026, sin IVA). En cada ficha: «Precio orientativo sin IVA. Presupuesto cerrado por escrito tras la visita.» Conviene que Mohamed revise microcemento y estuco antes de publicarlos.

| Precio | Uso |
|---|---|
| desde 1.800 € (sin IVA) | Pintura de un piso de 80 m² (rango «desde–hasta») |
| desde 250 € (sin IVA) | Pintura de una habitación |
| desde 16 €/m² (sin IVA) | Quitar gotelé y alisar, por m² de pared |
| desde 40 €/m² (sin IVA) | Estuco veneciano, por m² |
| desde 60 €/m² (sin IVA) | Microcemento, por m² |
| desde 120 €/puerta (sin IVA) | Lacado de una puerta por las dos caras, con marco |
| desde 14 €/m² (sin IVA) | Pintura de fachada, por m² |

---

## 4. Plataformas

Convenciones de cada ficha: **Nombre** = `BcnProReforma`; **teléfono, email, horario e Instagram** del bloque 1; **web** con la UTM de la plataforma. Lo marcado «(verificar)» no se ha podido confirmar en la documentación oficial a fecha 11/11/2026 y se comprueba en el formulario de alta. Las contraseñas van al gestor de contraseñas del titular, nunca a este repositorio (ver `CITAS.md`).

### 4.1 Google Business Profile (prioridad 1)

- **URL:** https://business.google.com — el perfil **ya existe y está verificado** como «BcnProReforma» (inventario 3/11). Se completa, no se crea otro. Hay una actualización de Google pendiente de revisar: aceptarla o rechazarla antes de editar.
- **Coste:** sin coste.
- **Nombre:** `BcnProReforma`. Riesgo conocido: Google exige que el nombre coincida con el usado en el mundo real. Mantener «BcnProReforma» en presupuestos, facturas, rótulo o vehículo, y guardar pruebas por si Google pide revisión. No añadir palabras al nombre (nada de «BcnProReforma Pintores Maresme»).
- **Tipo:** negocio de área de servicio; dirección completa para Google y **no mostrarla**.
- **Teléfono principal:** `+34 639 05 88 19`. **Adicional:** `+34 631 71 40 77`. Activar chat/WhatsApp solo si el titular lo atiende.
- **Web:** `https://bcnproreforma.com/?utm_source=gbp&utm_medium=organic&utm_campaign=ficha`
- **Horario:** lunes a sábado 08:00–20:00; domingo cerrado. Festivos: marcar horario especial cuando proceda.
- **Zona de servicio:** los 19 municipios del bloque 1 (quitar los barrios sueltos).
- **Descripción:** la de 739 caracteres (2.3).
- **Fecha de apertura:** dejar vacía mientras no haya un dato confirmado.

#### 4.1.1 Categorías

La lista de categorías de Google cambia y los nombres en español solo se ven dentro del selector del perfil configurado en español. **No se han podido confirmar en fuentes oficiales los rótulos en español**; el ID interno (gcid) sí es estable. Escribir el término en el selector y quedarse con la sugerencia exacta que ofrezca Google.

| Uso | gcid (inglés) | Rótulo esperado en español | Estado |
|---|---|---|---|
| **Principal** | `painter` (Painter) | **Pintor** | Existe (es la que ya usa el perfil). |
| Secundaria | `plasterer` (Plasterer) | «Yesero» o «Estucador» | Existe en inglés; el rótulo español puede ser cualquiera de los dos (verificar). Cubre estucos y alisados. |
| Secundaria | `flooring_contractor` (Flooring contractor) | «Contratista de suelos» / «Empresa de pavimentos» | Existe en inglés (verificar rótulo). Para el microcemento en suelos. |
| Secundaria | `remodeler` (Remodeler) | «Empresa de reformas» | Existe en inglés (verificar rótulo). Va la última. |
| Opcional | `bathroom_remodeler` (Bathroom remodeler) | «Empresa de reformas de baños» | Verificar; solo si se quiere reforzar baños. |
| No usar | «Contratista de pintura» (Painting contractor) | — | Algunas guías la citan, pero no está confirmada en el listado; si el selector no la ofrece, no existe. Si existe, puede sustituir a «Pintor» solo si nadie lo duda: **mantener «Pintor» como principal**. |

Máximo: 1 principal + 9 secundarias. Recomendación: Pintor + 3 secundarias (yesero/estucador, suelos, reformas). Más categorías diluyen la principal.

#### 4.1.2 Servicios (descripción ≤ 300 caracteres; recuento entre paréntesis)

Bajo la categoría **Pintor**, en este orden:

| # | Servicio | Descripción |
|---|---|---|
| 1 | Pintura de pisos y casas | Pintamos viviendas enteras o por estancias: paredes, techos, puertas, zócalos y radiadores. Protegemos suelos y muebles, reparamos grietas y golpes e imprimamos donde hace falta antes de pintar. (194) |
| 2 | Pintura de techos y paredes | Paredes y techos en mate, satinado o antimanchas, con el color que elijas. Cuando se pasa de un tono oscuro a uno claro lo indicamos en el presupuesto, porque puede pedir una mano más. (184) |
| 3 | Estuco veneciano y pintura decorativa | Estuco veneciano a la cal, veladuras y acabados con aguas aplicados a mano. Preparamos la pared hasta dejarla plana y hacemos una muestra antes de aplicar el acabado en toda la superficie. (188) |
| 4 | Microcemento | Revestimiento continuo, sin juntas, para baños, suelos, escaleras y terrazas. Revisamos el soporte antes de decidir y revestimos platos de ducha de obra, hornacinas y encimeras. (177) |
| 5 | Quitar gotelé y alisar paredes | Retiramos o tapamos el gotelé según el estado de la pared, enlucimos y lijamos hasta dejarla lisa, sin ondulaciones, e imprimamos antes de la pintura final. (156) |
| 6 | Lacado de puertas y armarios | Lijamos y preparamos puertas, marcos, zócalos y frentes de armario y los lacamos o esmaltamos en mate, satinado o brillo. (121) |
| 7 | Pintura de fachadas | Saneamos el revoque suelto, reparamos fisuras y pintamos fachadas, muros y rejas de casas y edificios. (102) |
| 8 | Pintura de comunidades y garajes | Escaleras, rellanos, zonas comunes y garajes de comunidades de vecinos, con la señalización de plazas y pasos. (110) |
| 9 | Barnizado de carpintería de madera | Lijamos y barnizamos carpintería de madera interior y exterior: puertas, ventanas, pérgolas y barandillas agrisadas o con el barniz levantado. (142) |
| 10 | Reparación de humedades y grietas | Localizamos la causa de la humedad, reparamos la pared y la dejamos lista para pintar. (86) |
| 11 | Reformas de baño | Coordinamos la reforma completa del baño y nos ocupamos de los acabados. (72) |
| 12 | Reformas de cocina | Coordinamos la reforma completa de la cocina y nos ocupamos de los acabados. (76) |

Precio en cada servicio: dejar vacío hasta tener los marcadores de la sección 3 validados.

#### 4.1.3 Productos (pestaña «Productos»)

Nombre ≤ 58 caracteres, descripción ≤ 1.000, foto obligatoria, precio opcional (fijo o rango). Botón: «Más información» → la página del servicio con UTM `utm_source=gbp&utm_medium=organic&utm_campaign=producto`.

| Producto | Precio | Foto | Enlace (añadir UTM) |
|---|---|---|---|
| Pintura de piso de 80 m² | desde 1.800 € (sin IVA) | (falta foto de interior pintado: no publicar hasta tenerla) | /pintura-viviendas |
| Quitar gotelé y alisar (m²) | desde 16 €/m² (sin IVA) | (sin foto propia aún) | /alisados-lacados |
| Estuco veneciano (m²) | desde 40 €/m² (sin IVA) | 05 | /decorativa-estucos |
| Microcemento (m²) | desde 60 €/m² (sin IVA) | 01 | /microcemento |
| Lacado de puerta | desde 120 €/puerta (sin IVA) | (sin foto propia aún) | /alisados-lacados |
| Pintura de fachada (m²) | desde 14 €/m² (sin IVA) | 06 recortada | /caso-fachada |

Publicar solo los productos que tengan foto propia y precio validado (o sin precio). Descripción de cada producto: reutilizar la del servicio equivalente de 4.1.2.

#### 4.1.4 Atributos

Los disponibles dependen de la categoría y del país; marcar solo los que sean ciertos:

- **Presupuestos en línea / Ofrece presupuestos:** sí (formulario de la web y WhatsApp).
- **Idiomas:** español y catalán, si el titular los atiende (confirmar).
- **Formas de pago:** solo las que acepte de verdad (confirmar con Mohamed: transferencia, efectivo, Bizum…).
- **Atributos de identidad** («regentado por…»): solo si el titular lo elige; son opcionales.
- No marcar nada de urgencias ni de disponibilidad continua.

#### 4.1.5 Fotos en GBP

JPG o PNG, de 10 KB a 5 MB, mínimo 250 × 250 px, recomendado 720 × 720 px o más. Logotipo cuadrado (`logo .png` de la raíz del repo, recortado a 1:1). Sin texto superpuesto, sin marcos ni collages, sin renders ni catálogo. Plan en la sección 5.

#### 4.1.6 Primeras 4 publicaciones (una por semana; texto ≤ 1.500 caracteres; sin teléfono en el texto)

Botón «Más información» con la URL indicada. Publicar solo si la página responde en producción.

1. **Pintar un piso: qué entra en el presupuesto** — Foto: 10 (garaje) o, mejor, la primera foto de interior pintado que se haga.
   > Cuando pintamos un piso, la pintura es la última parte. Antes protegemos suelos y muebles, reparamos grietas y golpes e imprimamos donde el soporte lo pide. En el presupuesto lo dejamos escrito: superficie de pared y techo, estado de las paredes, si la vivienda está vacía o amueblada y el número de manos. Si quieres pintar tu piso en el Maresme o en Barcelona, cuéntanos cuántas estancias son y en qué municipio.

   URL: `https://bcnproreforma.com/pintura-viviendas?utm_source=gbp&utm_medium=organic&utm_campaign=post`
2. **Fachada: primero la base** — Fotos: 07 y 06, recortadas (sin número de casa).
   > Antes de pintar una fachada miramos qué partes del revoque están sueltas y qué fisuras hay que reparar. El color viene después. En esta obra saneamos la base y luego pintamos.

   URL: `https://bcnproreforma.com/caso-fachada?utm_source=gbp&utm_medium=organic&utm_campaign=post`
3. **Estucos y pintura decorativa** — Foto: 05 (sin atribuirle una técnica concreta).
   > El estuco veneciano, las veladuras y los acabados con aguas se trabajan a mano y dependen mucho de la preparación: una pared mal alisada se nota más bajo un estuco que bajo una pintura lisa. Por eso hacemos una muestra sobre tu pared antes de aplicarlo entero.

   URL: `https://bcnproreforma.com/decorativa-estucos?utm_source=gbp&utm_medium=organic&utm_campaign=post`
4. **Quitar el gotelé** — Foto: 09 (carpintería) si no hay foto de gotelé; mejor esperar a tener un antes y después de la misma pared.
   > En la mayoría de paredes el gotelé se puede tapar y alisar sin picar. Lo decidimos al ver el tipo de gotelé y el estado de la pared. Después enlucimos, lijamos e imprimamos para que la pintura quede lisa.

   URL: `https://bcnproreforma.com/alisados-lacados?utm_source=gbp&utm_medium=organic&utm_campaign=post`

El microcemento entra a partir de la publicación 5 (foto 01), no antes.

### 4.2 Bing Places (prioridad 1)

- **URL:** https://www.bingplaces.com — entrar con una cuenta Microsoft y elegir **«Importar desde Google Business Profile»** (más rápido que el alta manual; tarda de días a un par de semanas en salir).
- **Coste:** sin coste.
- **Notas de importación:** importar solo cuando la ficha de Google esté completa (sección 4.1), porque copia nombre, categorías, horario y fotos. Después, revisar a mano: categoría principal **Pintores** (o la equivalente que ofrezca Bing), dirección **oculta** (Bing pide la dirección para un negocio de área de servicio pero permite no mostrarla) y web con `utm_source=bing&utm_medium=directorio&utm_campaign=citas` (la importación trae la UTM de gbp: cambiarla). El campo «segmento de negocio» no se importa: rellenarlo a mano. Si se activa la sincronización periódica con Google, cualquier cambio en GBP se arrastra.
- **Descripción:** la de GBP (2.3).
- **Fotos:** las mismas que en Google.

### 4.3 Apple Business (antes Apple Business Connect) (prioridad 1)

- **URL:** https://business.apple.com
- **Coste:** sin coste. Verificación por teléfono o documentación; los cambios tardan hasta unos 3 días en publicarse.
- **Dirección:** completa y **visible**: `C/ Doctor Masriera 8, 08348 Cabrils (Barcelona)`. Comprobar que el pin cae en el portal correcto.
- **Categoría:** buscar «Pintor» / «Painter»; si no aparece, la más cercana de servicios del hogar (verificar en el selector).
- **Descripción («Acerca de»):** límite de 500 caracteres según la documentación de proveedores (Yext, Thryv); usar la media (2.2, 228 caracteres). Apple puede generar una automáticamente desde la web: revisarla y sustituirla por la nuestra.
- **Web:** `https://bcnproreforma.com` **sin UTM**.
- **Botones de acción (action links):** **sin UTM**. Uno por tipo; el primero que se añada ocupa el cuarto lugar, después de Cómo llegar, Llamar y Web. Elegir el tipo más cercano a «pedir presupuesto» que ofrezca Apple (verificar los tipos disponibles) y enlazar a `https://bcnproreforma.com/contacto`.
- **Horario:** el del bloque 1.
- **Fotos:** las mismas que en Google; logotipo cuadrado.

### 4.4 Foursquare (prioridad 2)

- **URL:** https://foursquare.com/ → «For business» / reclamar o añadir lugar (verificar el flujo: la guía pública City Guide cerró a principios de 2025 y la ficha ya no se ve en la web pública, pero los datos alimentan a otros servicios de mapas).
- **Coste:** sin coste. Verificación por teléfono.
- **Categoría:** la de pintor o contratista dentro de servicios para el hogar (verificar en la taxonomía).
- **Dirección:** `Cabrils, 08348` si lo permite.
- **Descripción:** media (2.2).
- **Web:** UTM `foursquare`.

### 4.5 Yelp.es (prioridad 2)

- **URL:** https://biz.yelp.es
- **Coste:** sin coste; la publicidad es aparte (no contratar).
- **Categoría:** **Pintores**. Secundarias si las ofrece: estucados/yeseros, suelos (verificar).
- **Dirección:** Yelp permite ocultar la dirección en negocios que van al cliente: marcarlo y dar la zona de servicio.
- **Descripción («Especialidades»):** larga (2.4) o la de GBP si hay límite menor.
- **Web:** UTM `yelp`.
- **Fotos:** JPG/PNG; las de la sección 5.
- **Nota:** Yelp no permite pedir reseñas a los clientes; no enviar el enlace de Yelp en el proceso de la sección 6.

### 4.6 Habitissimo (prioridad 1 para GEO: lo citan las IA)

- **URL:** https://www.habitissimo.es → «Registrarse como profesional».
- **Coste:** perfil sin coste; recibir o contactar solicitudes suele requerir plan de pago (verificar condiciones antes de aceptar nada).
- **Categoría:** Pintores (principal). Añadir: Pintura decorativa / Estucos, Microcemento, Quitar gotelé, Lacado de puertas, Pintura de fachadas, Reformas de baños, Reformas de cocinas, en este orden.
- **Zona:** los 19 municipios.
- **Dirección:** `Cabrils, 08348`.
- **Descripción:** larga (2.4).
- **Web:** UTM `habitissimo` (si permite enlace).
- **Fotos:** las de la sección 5, cada una en su servicio.

### 4.7 Cronoshare (prioridad 1 para GEO: lo citan las IA en consultas de precio)

- **URL:** https://www.cronoshare.com/registrar-empresa
- **Coste:** alta sin coste; cada contacto con un cliente se paga con créditos (verificar tarifa).
- **Categoría:** Pintores y empresas de pintura. Añadir: estucos, microcemento, quitar gotelé, lacado, fachadas, reformas.
- **Zona:** los 19 municipios (o radio desde Cabrils que los cubra).
- **Descripción:** larga (2.4).
- **Web:** UTM `cronoshare` (si permite enlace).
- **Fotos:** las de la sección 5.

### 4.8 Trustlocal (prioridad 1 para GEO)

- **URL:** https://trustlocal.es → «Añade tu empresa» (verificar ruta exacta).
- **Coste:** ficha básica sin coste (verificar).
- **Categoría:** Pintores. Secundarias: estucado, microcemento, reformas.
- **Dirección:** `Cabrils, 08348`.
- **Descripción:** larga (2.4).
- **Web:** UTM `trustlocal`.

### 4.9 Houzz (prioridad 2)

- **URL:** https://www.houzz.es → «Únete como profesional» (verificar ruta).
- **Coste:** perfil sin coste; Houzz Pro es de pago (no contratar).
- **Categoría:** Pintores (Painters). Servicios: pintura interior, pintura decorativa, microcemento, fachadas.
- **Descripción:** larga (2.4).
- **Fotos:** Houzz vive de las fotos: subirlas por proyecto (Microcemento, Fachada, Carpintería, Garaje), mínimo recomendable 1.000 px de lado; las 05 y 10 son más pequeñas (855 y 719 px de ancho).
- **Web:** UTM `houzz`.

### 4.10 Instapro (prioridad 3)

- **URL:** https://www.instapro.es (verificar ruta de alta para profesionales).
- **Coste:** modelo de pago por solicitud (verificar).
- **Categoría:** Pintor. **Descripción:** larga (2.4). **Web:** UTM `instapro`.

### 4.11 Zaask (prioridad 3)

- **URL:** https://www.zaask.es → registro como profesional.
- **Coste:** alta sin coste; responder a solicitudes se paga con créditos (verificar).
- **Categoría:** Pintores; añadir estucos, microcemento, reformas. **Descripción:** larga (2.4). **Web:** UTM `zaask`.

### 4.12 StarOfService (prioridad 3)

- **URL:** https://www.starofservice.es (verificar ruta de alta).
- **Coste:** pago por contacto (verificar).
- **Categoría:** Pintor. **Descripción:** larga (2.4). **Web:** UTM `starofservice`.

### 4.13 Páginas Amarillas (prioridad 2)

- **URL:** https://www.paginasamarillas.es → alta de empresa básica sin coste (rechazar los paquetes de pago).
- **Categoría:** Pintores. Secundaria si la ofrece: Reformas.
- **Dirección:** `Cabrils, 08348` si deja omitir la calle; si no, completa.
- **Descripción:** GBP (2.3) o la que quepa. **Web:** UTM `paginasamarillas`.

### 4.14 11811 (prioridad 3)

- **URL:** https://www.11811.es (verificar ruta de alta).
- **Coste:** ficha básica sin coste (verificar). **Categoría:** Pintores. **Descripción:** media (2.2) o GBP. **Web:** UTM `11811`.

### 4.15 QDQ (prioridad 3)

- **URL:** https://www.qdq.com (verificar ruta de alta).
- **Coste:** ficha básica sin coste (verificar; QDQ vende servicios de marketing, no contratar). **Categoría:** Pintores. **Descripción:** GBP (2.3). **Web:** UTM `qdq`.

### 4.16 Infoisinfo (prioridad 3)

- **URL:** https://www.infoisinfo.es → «Añadir empresa».
- **Coste:** sin coste. **Categoría:** Pintores. **Descripción:** GBP (2.3). **Web:** UTM `infoisinfo`.

### 4.17 Cylex (prioridad 3)

- **URL:** https://www.cylex.es → «Registrar empresa».
- **Coste:** sin coste. **Categoría:** Pintores. **Descripción:** larga (2.4). **Web:** UTM `cylex`. **Fotos:** hasta varias; usar 06 recortada y 01.

### 4.18 Hotfrog (prioridad 3)

- **URL:** https://www.hotfrog.es → «Añade tu empresa».
- **Coste:** sin coste. **Categoría:** Pintores. **Descripción:** larga (2.4). **Web:** UTM `hotfrog`.

### 4.19 Opendi (prioridad 3)

- **URL:** https://www.opendi.es → «Dar de alta empresa».
- **Coste:** sin coste. **Categoría:** Pintores. **Descripción:** GBP (2.3). **Web:** UTM `opendi`.

### 4.20 Europages (prioridad 4, opcional)

- **URL:** https://www.europages.es → alta de empresa.
- **Coste:** ficha básica sin coste (verificar). Es un directorio B2B: solo aporta para comunidades y administradores de fincas.
- **Categoría:** Pintura de edificios / Pintores. **Descripción:** media (2.2). **Web:** UTM `europages`.

### 4.21 Página de Facebook (prioridad 2)

- **URL:** https://www.facebook.com/pages/create
- **Coste:** sin coste.
- **Nombre:** `BcnProReforma`. **Nombre de usuario:** `@bcnproreforma` si está libre.
- **Categoría:** Pintor (o «Servicio de pintura» / «Contratista», lo que ofrezca el selector; verificar). Hasta 3 categorías.
- **Biografía / Intro:** corta (2.1, 147 caracteres). Si el campo se queda corto (la intro tiene límite de unos 100 caracteres; verificar), usar esta de 92: «BcnProReforma, pintor en Cabrils. Pintura, estucos y microcemento en el Maresme y Barcelona.»
- **Información detallada:** larga (2.4).
- **Dirección:** ocultar o `Cabrils, 08348`; zona de servicio.
- **Web:** UTM `facebook`. **Botón:** «Enviar mensaje de WhatsApp» al +34 631 71 40 77.
- **Enlazar Instagram:** @pintayreformatuobra.
- **Fotos:** perfil = logotipo cuadrado; portada 1.640 × 856 px (16:9 aprox.) con la foto 06 recortada.

---

## 5. Plan de fotos (`prototipos/kit-google/fotos/`)

Los originales no se renombran en el repo; renombrar la **copia** que se sube. Los nombres sugeridos describen lo que se ve. Ninguna lleva coordenadas GPS en los metadatos (comprobado con `mdls`, 11/11/2026).

| # | Archivo actual | Tamaño | Nombre sugerido | Servicio (etiqueta) | Notas |
|---|---|---|---|---|---|
| 01 | 01-ducha-microcemento.jpg | 1200×1504 | bcnproreforma-microcemento-ducha-de-obra.jpg | Microcemento | Confirmar permiso. |
| 02 | 02-suelo-microcemento-salon.jpg | 1200×900 | bcnproreforma-microcemento-suelo-salon.jpg | Microcemento | |
| 03 | 03-terraza-escalera-microcemento.jpg | 1200×774 | bcnproreforma-microcemento-terraza-escalera.jpg | Microcemento | |
| 04 | 04-bano-microcemento.jpg | 1200×1472 | bcnproreforma-microcemento-bano.jpg | Microcemento | |
| 05 | 05-pared-decorativa.jpg | 855×1152 | bcnproreforma-pintura-decorativa-pared.jpg | Estucos y pintura decorativa | No atribuirle una técnica concreta (veneciano, marmolizado…) sin que Mohamed la confirme. |
| 06 | 06-fachada-terminada.jpg | 1200×1600 | bcnproreforma-pintura-fachada-terminada.jpg | Fachadas | ⚠️ **Recortar el número de la casa antes de subir.** |
| 07 | 07-fachada-antes.jpg | 1200×1152 | bcnproreforma-fachada-antes-de-pintar.jpg | Fachadas | ⚠️ **Recortar el número de la casa antes de subir.** |
| 08 | 08-reparacion-fachada.jpg | 1200×1600 | bcnproreforma-reparacion-fachada-revoque.jpg | Fachadas | ⚠️ **Recortar el número de la casa antes de subir.** |
| 09 | 09-madera-barnizada.jpg | 1200×1600 | bcnproreforma-barnizado-carpinteria-madera.jpg | Barnizado de carpintería | |
| 10 | 10-garaje-comunitario.jpg | 719×1600 | bcnproreforma-pintura-garaje-comunitario.jpg | Comunidades y garajes | Ancho por debajo de los 720 px recomendados: válida para Google (mínimo 250), floja para Houzz. |
| 11 | 11-microcemento-en-obra.jpg | 1200×792 | bcnproreforma-microcemento-aplicacion-en-obra.jpg | Microcemento | Foto de proceso. |
| 12 | 12-ducha-gris.jpg | 1200×1600 | bcnproreforma-microcemento-ducha-gris.jpg | Microcemento | |

**Orden de subida (pintura primero):** 06 → 10 → 09 → 05 → 08 → 07 → 01 → 02 → 04 → 12 → 03 → 11.

**Antes de subir cualquier foto:** permiso de publicación del cliente; nada que identifique la vivienda (números, matrículas, carteles, personas). En las 06, 07 y 08 tapar o recortar el número, y revisar también buzones y placas.

**Hueco principal:** no hay ninguna foto de un interior pintado y terminado, que es el servicio principal. En la próxima obra de pintura: estancia terminada con luz natural, muebles y suelo protegidos durante la obra, y una grieta antes y después de repararla. Esas fotos van a la cabecera de GBP y al producto «Pintura de piso de 80 m²».

---

## 6. Reseñas: proceso conforme a las políticas de Google

**Reglas (todas obligatorias):**

1. **Pedir a todos los clientes**, al terminar cada obra, sin elegir a quién según si creemos que estará contento. Prohibido filtrar (preguntar antes «¿estás satisfecho?» y enviar el enlace solo a los contentos).
2. **Sin incentivos:** ni descuentos, ni regalos, ni sorteos, ni «revisión sin cargo» a cambio de una reseña.
3. Ni el titular ni familiares, empleados o amigos escriben reseñas del negocio. No se redactan reseñas por el cliente ni se le dicta el texto.
4. No pedir reseñas en bloque ni desde el mismo dispositivo o wifi (por ejemplo, con el móvil del cliente en la obra).
5. Responder a todas las reseñas, también a las negativas, con educación y sin datos personales del cliente.
6. Solo Google: Yelp prohíbe pedir reseñas.

**Enlace:** en GBP → «Pedir reseñas» → copiar el enlace corto y pegarlo aquí:

```
{{enlace_resena_gbp}}
```

**Plantilla de WhatsApp** (enviar desde el +34 631 71 40 77 uno o dos días después de terminar la obra):

> Hola, [nombre]. Soy Mohamed, de BcnProReforma. Gracias por confiar en nosotros para [trabajo: p. ej. «pintar el piso», «el estuco del salón»] en [municipio]. Si tienes un minuto, nos ayudaría que contaras tu experiencia en Google, tal como fue: {{enlace_resena_gbp}}
> Si hay algo que no te haya convencido, dínoslo también. Un saludo.

Nombrar el trabajo y el municipio en el mensaje ayuda a que la reseña los mencione por sí sola; no pedir al cliente que use palabras concretas.

**Registro:** anotar en la hoja de clientes la fecha de envío. Un solo recordatorio, a la semana, si no ha contestado; después, nada más.
