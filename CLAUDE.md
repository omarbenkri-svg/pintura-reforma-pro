# CLAUDE.md: Protocolo E-E-A-T y Guía de Ingeniería

Este documento es cargado automáticamente. Define las reglas de oro y el protocolo de activación de herramientas para garantizar la coherencia del proyecto **Pintura, Reforma y Acabados de Obra**.

## 🛠️ Protocolo de Integración Proactiva (PIP)

Para evitar la "brecha de activación", el agente DEBE:
1. **Auto-Trigger de Skills**: Invocar `brainstorming` y `verification` ante cualquier cambio estructural o de UI.
2. **Contexto Técnico**: Usar `context7` para investigar dependencias o APIs antes de proponer implementaciones.
3. **Validación Visual**: Usar `chrome-devtools-mcp` o `claude-in-chrome` para verificar despliegues en `https://bcnproreforma.com` y dispositivos móviles. El deploy se ejecuta via `vercel --prod` en bash.
4. **Estado de MANUS**: Ejecutar la verificación de shell al inicio de tareas complejas:
   `echo "MANUS MODE ACTIVE" && echo "Timestamp: $(date)"`

## 📜 Reglas de Oro (Maestro Artesano)

1. **E-E-A-T Real**: Prohibido usar métricas falsas (estrellas/reseñas fake). La autoridad emana de los 30 años de oficio.
2. **Identidad Invisible**: La entidad del fundador (Mohamed) se mantiene en el Schema JSON-LD, no en el UI (a menos que se pida).
3. **Tono Institucional-Artesano**: Copy sobrio, honesto y directo. Conceptos clave: *Oficio, Presupuesto Cerrado, Protección Total.*
4. **Prioridad Revestimientos**: El foco comercial es Microcemento y Estuco Veneciano.
5. **Fuente de Verdad i18n**: Todo texto debe residir en `js/main.js` (dict object). No Hardcoding en HTML.

## 🔭 Protocolo de Observabilidad Estratégica (POS)

Cada respuesta a una tarea técnica o estratégica DEBE terminar con el bloque estándar de la CLAUDE.md raíz (✅ DONE / ⚠️ PENDING / 🐛 BUGS) más el siguiente bloque adicional:

```
[STRATEGIC_REFLEXION]
- Skill aplicada: [E-E-A-T / UX / CRO / SEO-GEO / i18n / Arquitectura]
- Impacto en embudo: [cómo afecta a captación/conversión de leads]
- Verificación técnica: [qué se comprobó y con qué herramienta]
```

Este bloque es obligatorio. No requiere respuesta del usuario.

## 📋 Estado del Proyecto
- **Dominio**: `https://bcnproreforma.com`
- **Infraestructura**: Vercel / GoDaddy.
- **Fuente de verdad i18n**: `js/main.js` — ES ✅ CA ✅ EN ✅ (185 claves auditadas 2026-04-15).
- **Punto Crítico**: Mantener compatibilidad SEO/GEO en cada despliegue.
