# Inventario y línea base — 3 a 6 de noviembre de 2026

Documento interno (`prototipos/` no se publica). Rama `fix/contacto-y-confianza`, worktree fuera del repositorio.

## Estado de la fuente

- Producción = `f5cb712`. Los 9 archivos comparados son idénticos byte a byte; despliegue `jdan9a6nx` hecho por CLI.
- `feat/web-v2` = `83847d3`, 10 commits sin publicar. En este paquete solo entran `1ea52f2` (limpieza del paquete y retirada de `/municipios/template`) y `36fdd2c` (enlace al Gremi).
- Cambios ajenos que no se tocan: `.gitignore` (`.env*`) y `.claude/` en el repositorio principal.
- `sitio-integracion`: mismos commits y 79 archivos modificados sin commit. No es fuente.
- Comprobaciones ejecutadas el 3/11 sobre `master` + 2 commits: `check-pages --site` 144/144 y `check-guide-share` PASS. **Las dos pasaban con todos los fallos de abajo presentes.**

## Receptor del formulario (Apps Script, leído en modo lectura el 3/11)

- Proyecto «Proyecto sin título» de bcnproreforma@gmail.com. Es independiente, no está vinculado a la hoja. Última modificación: 2 may 2026.
- Responde `{status:'ok'}` o `{status:'error'}`. No responde `ok:true`.
- **Guarda y envía por email solo** timestamp, nombre, teléfono, email, servicio, metros, fuente, dispositivo, utm_* y página.
- **Pierde municipio, descripción, referencia, inmueble, fecha, presupuesto, origen y referrer.** Ocurre desde que salió la web v2 (21/10).
- No deduplica: un reintento puede crear dos filas.
- Ejecuciones en los últimos 7 días: 0.
- El kit de `kit-google` usaba `getActive()`: pegado tal cual habría rechazado todas las solicitudes. Corregido en `6af148e` y comprobado con `check-apps-script.mjs`. Ver `apps-script-leads.gs` para instalarlo.
- **Incidente (3/11):** al intentar bajar por el editor de Apps Script, una pulsación de teclado dejó el código como «Cambios sin guardar». Se deshizo al momento, el editor volvió a «Guardado en Drive» y la fecha de última modificación sigue siendo el 2 may 2026. No se guardó, desplegó ni ejecutó nada.

## Search Console (omarbenkri@gmail.com, del 20/10 al 1/11/2026)

- 3 clics, 1.180 impresiones, CTR 0,3 %, posición media 35,3.
- Páginas: `/reformas-mataro` 508 impresiones, `/blog/reforma-bano-integral-guia-completa` 351, `/` 145 (3 clics), `/municipios/pintor-el-masnou` 46, `/blog/cuanto-cuesta-pintar-piso-barcelona` 42.
- Las consultas que contienen «pint» suman 90 impresiones y 0 clics. Las primeras: «trabajos de pintura y estucado en maresme», «presupuesto pintar casa barcelona», «precio pintor casa barcelona», «pintar piso barcelona», «pintores barcelona precios».
- Indexación: 16 páginas indexadas y 16 sin indexar (11 por noindex, 3 por redirección, 2 rastreadas sin indexar).
- Existe el informe de funciones de IA generativa. No se ha abierto todavía.

## Perfil de Empresa de Google (bcnproreforma@gmail.com)

- **Existe y está verificado**, con el nombre «BcnProReforma». El bloqueo que figura en `HANDOFF.md` ya no está vigente.
- Área de servicio: Sant Gervasi-La Bonanova, Sarrià-Sant Gervasi, Barcelona y 18 zonas más.
- 294 visualizaciones, 0 reseñas, y Google lo marca como incompleto («Completar información»).
- Hay 1 actualización de Google pendiente de revisar.
- Riesgo: el kit pedía usar el nombre legal y no la marca. Una suspensión anterior fue por las directrices.

## Medición

- No hay GA en las páginas y Vercel Web Analytics no está activado (la API responde 404).
- `window.track` solo escribe en la consola. Aunque se pusiera un GA_ID, no enviaría eventos.

## Fotos

- No hay ninguna foto de un interior pintado y terminado.
- Fachada: el número de la vivienda aparecía en 7 de las 9 fotos publicadas, junto al municipio, y en una foto se leía una matrícula. Recortado en `images.py`; los originales quedan excluidos del despliegue.
- Madera: `restauracion-madera-exterior-02` muestra a una persona y un cartel de alarma con teléfono. Excluida.
- Baños con mármol de `images/projects/WhatsApp Image…`: parecen renders o catálogo. Excluidos desde `1ea52f2`.
- Pendiente fuera de la web: las fotos 06, 07 y 08 de `prototipos/kit-google/fotos/` muestran el número. Recortarlas antes de usarlas en el perfil.

## Línea base GEO (ola 0, 3/11)

Consultas sin la marca, hechas con la búsqueda de Claude Code (resultados centrados en EE. UU.; resultado exploratorio):

| Consulta | ¿Aparece BCN ProReforma? | Qué se cita |
|---|---|---|
| mejor empresa de pintores en el Maresme para pintar una casa | No | Habitissimo, Trustlocal, notas de prensa de Pintors Molins |
| pintor en Mataró presupuesto pintar piso | No | Cronoshare (media de 728 € en Mataró), Trustlocal |
| pintores en Cabrils pintar casa | No | Cronoshare |
| quitar gotelé Vilassar de Mar / Premià | No | Cronoshare, Trustlocal, Habitissimo |
| cuánto cuesta pintar un piso de 80 m² en Barcelona | No | Cronoshare (orquilla de 320 a 1.120 €) |
| estuco veneciano Maresme | No | Trustlocal (AB Decoración), fichas de fabricantes |

**Conclusión:** para estas consultas, las respuestas se apoyan en directorios (Cronoshare, Trustlocal, Habitissimo) y en precios concretos. Dos acciones pesan más que añadir marcado en la web: tener presencia veraz y coherente en esos directorios y en el Perfil de Empresa (ola 3), y publicar rangos de precio propios validados.

Pendiente: repetir la prueba en Google Modo IA, ChatGPT y Perplexity, cada uno con su modalidad.
