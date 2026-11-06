/**
 * Receptor de solicitudes de bcnproreforma.com → hoja «Form Leads» + email.
 *
 * CÓMO INSTALARLO (cuenta bcnproreforma@gmail.com, 10 minutos):
 * 1. Abre script.google.com con esa cuenta y entra en «Proyecto sin título».
 *    Es un proyecto independiente: NO lo crees desde la hoja, porque tendría
 *    otra URL /exec y la web dejaría de entregar las solicitudes.
 * 2. Sustituye el código de Código.gs por este y guarda.
 * 3. Implementar → Gestionar implementaciones → lápiz de la implementación
 *    actual → Versión: «Nueva versión» → Implementar.
 *    (Así la URL /exec NO cambia y la web sigue funcionando.)
 * 4. Si pide permisos, acéptalos con la misma cuenta.
 * 5. Haz una única solicitud de prueba identificada desde /contacto y comprueba
 *    la fila, el email y que aparecen municipio y descripción. Borra esa fila.
 *
 * Qué hace:
 * - Guarda cada campo en su columna por nombre. Si llega un campo nuevo,
 *   crea la columna al final: nunca se pierde información.
 * - Si llega dos veces la misma referencia (reintento), no la duplica.
 * - Un texto no se puede ejecutar como fórmula de la hoja.
 * - Envía un email de aviso con los datos de cualificación. Si el aviso falla,
 *   la solicitud ya está guardada y se confirma igualmente.
 * - Responde {"ok":true,"status":"ok","ref":...}: la web solo muestra «Solicitud
 *   recibida» cuando recibe ese acuse.
 *
 * Comprobación sin tocar la cuenta: node prototipos/_build/check-apps-script.mjs
 */
var SHEET_ID = '1IFAssx08QR-smmgj5Jzjr99aFnTCGZTnfH5KDQ0zQIQ';
var SHEET_NAME = 'Form Leads';
var NOTIFY_TO = 'bcnproreforma@gmail.com';

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!data.telefono) return json_({ ok: false, status: 'error', error: 'telefono requerido' });
    data.recibido = new Date();

    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    var headers = sheet.getLastColumn() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    var keys = headers.map(norm_);
    if (keys.indexOf('status') !== -1 && data.status === undefined) data.status = 'Nuevo';
    Object.keys(data).forEach(function (k) {
      if (keys.indexOf(norm_(k)) === -1) {
        headers.push(k); keys.push(norm_(k));
        sheet.getRange(1, headers.length).setValue(k);
      }
    });

    if (data.ref) {
      var refCol = keys.indexOf('ref') + 1;
      var last = sheet.getLastRow();
      if (refCol > 0 && last > 1) {
        var refs = sheet.getRange(2, refCol, last - 1, 1).getValues().map(function (r) { return r[0]; });
        if (refs.indexOf(data.ref) !== -1) return json_({ ok: true, status: 'ok', ref: data.ref, duplicate: true });
      }
    }

    var byKey = {};
    Object.keys(data).forEach(function (k) { byKey[norm_(k)] = data[k]; });
    sheet.appendRow(keys.map(function (k) { return byKey[k] !== undefined ? safe_(byKey[k]) : ''; }));
    try {
      notify_(data);
    } catch (mailError) {
      console.error('Aviso por email no enviado: ' + mailError);
    }
    return json_({ ok: true, status: 'ok', ref: data.ref || '' });
  } catch (err) {
    return json_({ ok: false, status: 'error', error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* «UTM_Source», «utm_source» and «Página» name the same column as their key. */
function norm_(header) {
  return String(header).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '_');
}

/* A value starting with = + - @ would run as a spreadsheet formula. */
function safe_(value) {
  return typeof value === 'string' && /^[=+\-@]/.test(value) ? "'" + value : value;
}

function notify_(d) {
  var lines = [
    'Nueva solicitud desde bcnproreforma.com',
    '',
    'Referencia: ' + (d.ref || '-'),
    'Servicio: ' + (d.servicio || '-'),
    'Municipio: ' + (d.municipio || '-'),
    'Inmueble: ' + (d.inmueble || '-'),
    'Superficie: ' + (d.metros || '-'),
    'Presupuesto previsto: ' + (d.presupuesto || '-'),
    'Cuándo: ' + (d.fecha_deseada || '-'),
    '',
    'Nombre: ' + (d.nombre || '-'),
    'Teléfono: ' + d.telefono,
    'Qué quiere renovar: ' + (d.descripcion || '-'),
    '',
    'Origen: ' + (d.origen || '-') + ' · página ' + (d.pagina || '-') + ' · ' + (d.dispositivo || '-'),
    'UTM: ' + [d.utm_source, d.utm_medium, d.utm_campaign].filter(String).join(' / ')
  ];
  MailApp.sendEmail(NOTIFY_TO, 'Solicitud ' + (d.ref || '') + ': ' + (d.servicio || 'web') + ' en ' + (d.municipio || '?'),
    lines.join('\n'));
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
