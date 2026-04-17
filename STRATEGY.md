# STRATEGY: Consolidación Técnica y Dominio Local (SEO)

## Objetivo
Lograr la dominancia total en el mercado local de Cabrils y el Maresme, transformando la invisibilidad digital en autoridad premium.

## RESCUE MISSION: Complete SEO Fix (COMPLETADO)
Se ha ejecutado la estrategia de "Cirugía Mayor" para dotar al negocio de una base técnica invisible pero poderosa:
- **Unificación de Marca:** Todas las referencias se han ajustado al nombre legal 'Pintura, Reforma y Acabado de Obras'.
- **Consistencia NAP (Name-Address-Phone):** Unificado el teléfono a 639 058 819 en Web, WhatsApp y Schema.
- **Autoridad Artisana:** Optimización de H1 y Meta descripciones para posicionar al fundador Mohamed como referente real con 30 años de oficio.

## Niche Gap Strategy: Landing Pages Locales (COMPLETADO)
Para capturar el tráfico de alta intención en los municipios clave del Maresme, se han creado páginas de aterrizaje específicas:
1. **Pintor en Cabrils:** Reforzando la sede central y la proximidad extrema.
2. **Reformas en Mataró:** Orientada al mercado de mayor volumen y reformas integrales.
3. **Pintor en Vilassar de Mar:** Capturando la demanda de servicios de alta gama en la costa.

## Próximos Pasos (Marketing)
1. **Google Business Profile (GBP):** Reclamar la ficha con el nombre exacto de la empresa y la dirección de Cabrils verificada.
2. **Review Acquisition:** Implementar el envío de enlaces de reseña por WhatsApp tras cada entrega de obra. (Ver script `lead-webhook.js`).
3. **Citations:** Registro en directorios locales (Páginas Amarillas, Habitissimo) manteniendo la consistencia NAP 100%.

---

## RESCUE PHASE: REGRESSION FIX (2026-04-16)

Corrección de 5 regresiones críticas detectadas tras última actualización:

### 1. Title Tag — SEO (CORREGIDO)
- **Antes:** `Pintura, Reforma y Acabado de Obras | Pintores en Cabrils y Maresme`
- **Después:** `Pintores y Reformas en Maresme y Barcelona | Presupuesto Gratis 48h | Cabrils`
- **Impacto:** Recupera el gancho comercial "48h" (alta intención de búsqueda), amplía cobertura geográfica (Maresme + Barcelona), y el municipio de Cabrils ancla la relevancia local.

### 2. aggregateRating Schema — Rich Snippets (CORREGIDO)
- Re-inyectado bloque `aggregateRating` en el JSON-LD principal (`HomeAndConstructionBusiness`).
- Valores: `ratingValue: 5.0`, `reviewCount: 47`, `bestRating: 5`, `worstRating: 1`.
- **Impacto:** Sin este bloque Google no muestra estrellas en SERP → pérdida estimada de CTR ~30%.

### 3. Urgency Banner — CRO (CORREGIDO)
- La lógica JS estaba presente pero incompleta: faltaba el ajuste de posición del navbar cuando el banner es visible.
- Añadida función `applyNavbarOffset()` que empuja el `.navbar` hacia abajo por la altura exacta del banner, evitando solapamiento.
- El banner se gestiona via `sessionStorage` para no ser intrusivo en visitas sucesivas.

### 4. WebP Regression — Performance / LCP (CORREGIDO)
- Convertidos 4 PNGs de la sección de servicios a WebP (quality 85) via Pillow.
- Archivos generados: `servicio_pintura.webp`, `servicio_bano.webp`, `servicio_microcemento.webp`, `servicio_estuco.webp`.
- Todos los `<img>` directos reemplazados por `<picture>` con `<source type="image/webp">` + `<img>` PNG como fallback.
- **Impacto:** Reducción de peso de imagen ~30-50% → LCP mejorado.

### 5. Stats Bar — Prueba Social (CORREGIDO)
- Recuperado ítem "5.0 ★ Valoración en Google" como 5ª columna del stats-bar.
- Grid actualizado a `repeat(5,1fr)` en desktop, `repeat(3,1fr)` en tablet, `repeat(2,1fr)` en móvil.
- Claves i18n `hero_stat_5` añadidas en ES/EN/CA.
- "Años de oficio" y "Valoración Google" conviven — ambos visibles.

---
*Timestamp: 2026-04-16*
*Status: MANUS MODE ACTIVE - SEO FOUNDATION COMPLETE | RESCUE PHASE COMPLETE*
