/**
 * Receptor de solicitudes de bcnproreforma.com → hoja «Form Leads» + email.
 *
 * CÓMO INSTALARLO (cuenta bcnproreforma@gmail.com, 10 minutos):
 * 1. Abre la hoja «Form Leads» → Extensiones → Apps Script.
 * 2. Sustituye el código del archivo por este y guarda.
 * 3. Implementar → Gestionar implementaciones → lápiz de la implementación
 *    actual → Versión: «Nueva versión» → Implementar.
 *    (Así la URL /exec NO cambia y la web sigue funcionando.)
 * 4. Si pide permisos, acéptalos con la misma cuenta.
 *
 * Qué hace:
 * - Guarda cada campo en su columna por nombre. Si llega un campo nuevo,
 *   crea la columna al final: nunca se pierde información.
 * - Si llega dos veces la misma referencia (reintento), no la duplica.
 * - Envía un email de aviso con los datos de cualificación.
 * - Responde {"ok":true,"ref":...}: la web solo muestra «Solicitud recibida»
 *   cuando recibe esta respuesta.
 */
var SHEET_NAME = 'Form Leads';
var NOTIFY_TO = 'bcnproreforma@gmail.com';

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!data.telefono) return json_({ ok: false, error: 'telefono requerido' });
    data.recibido = new Date();

    var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
    var headers = sheet.getLastColumn() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    Object.keys(data).forEach(function (k) {
      if (headers.indexOf(k) === -1) { headers.push(k); sheet.getRange(1, headers.length).setValue(k); }
    });

    if (data.ref) {
      var refCol = headers.indexOf('ref') + 1;
      var last = sheet.getLastRow();
      if (refCol > 0 && last > 1) {
        var refs = sheet.getRange(2, refCol, last - 1, 1).getValues().map(function (r) { return r[0]; });
        if (refs.indexOf(data.ref) !== -1) return json_({ ok: true, ref: data.ref, duplicate: true });
      }
    }

    sheet.appendRow(headers.map(function (h) { return data[h] !== undefined ? data[h] : ''; }));
    notify_(data);
    return json_({ ok: true, ref: data.ref || '' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
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
