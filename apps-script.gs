/**
 * Yoojin & Alberto RSVP backend
 * Google Sheets + Apps Script
 */

var SHEET_NAME = 'RSVP';
var MAX_GUESTS = 2;
var TIME_ZONE = 'America/Mexico_City';

function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone(TIME_ZONE);

  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Recibido',
      'Nombre',
      'Segunda persona',
      'Asiste',
      'Personas',
      'Telefono',
      'Restriccion',
      'Aplica a',
      'Mensaje',
      'Idioma'
    ]);
  }

  sheet.getRange('A1:J1')
    .setFontWeight('bold')
    .setBackground('#F5EAD8')
    .setFontColor('#4B3121');

  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 165);
  sheet.setColumnWidth(2, 190);
  sheet.setColumnWidth(3, 190);
  sheet.setColumnWidth(4, 90);
  sheet.setColumnWidth(5, 90);
  sheet.setColumnWidth(6, 170);
  sheet.setColumnWidth(7, 220);
  sheet.setColumnWidth(8, 150);
  sheet.setColumnWidth(9, 300);
  sheet.setColumnWidth(10, 80);

  return 'RSVP sheet ready.';
}

function doGet() {
  return json_({
    ok: true,
    service: 'Yoojin & Alberto RSVP',
    message: 'RSVP endpoint is online.'
  });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ok:false,error:'Missing request body.'});
    }

    var d = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      setup();
      sheet = ss.getSheetByName(SHEET_NAME);
    }

    var attending = d.attending === 'Yes' ? 'Yes' : 'No';
    var guests = attending === 'Yes'
      ? Math.max(1,Math.min(Number(d.guests) || 1,MAX_GUESTS))
      : 0;

    sheet.appendRow([
      new Date(),
      safeText_(d.name,120),
      safeText_(d.name2,120),
      attending,
      guests,
      phone_(d.phone),
      safeText_(d.diet,160),
      safeText_(d.appliesTo,120),
      safeText_(d.note,800),
      language_(d.lang)
    ]);

    return json_({ok:true});

  } catch (err) {
    console.error(err);
    return json_({ok:false,error:String(err)});
  } finally {
    lock.releaseLock();
  }
}

function safeText_(value,maxLength) {
  var s = String(value == null ? '' : value).trim().slice(0,maxLength || 500);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function phone_(value) {
  var s = String(value == null ? '' : value).trim().slice(0,50);
  if (!s) return '';
  return "'" + s.replace(/^'+/,'');
}

function language_(value) {
  return ['es','en','ko'].indexOf(value) >= 0 ? value : 'es';
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function dailySummary() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet || sheet.getLastRow() < 2) {
    MailApp.sendEmail(
      Session.getActiveUser().getEmail(),
      'RSVP update: no responses yet',
      'No RSVP responses have been received yet.'
    );
    return;
  }

  var rows = sheet.getDataRange().getValues().slice(1);
  var yesReplies = 0;
  var noReplies = 0;
  var heads = 0;

  rows.forEach(function(row) {
    if (row[3] === 'Yes') {
      yesReplies++;
      heads += Number(row[4]) || 0;
    } else if (row[3] === 'No') {
      noReplies++;
    }
  });

  MailApp.sendEmail(
    Session.getActiveUser().getEmail(),
    'RSVP update: ' + heads + ' guests confirmed',
    [
      'Yoojin & Alberto — RSVP summary',
      '',
      'Attending replies: ' + yesReplies,
      'Confirmed people: ' + heads,
      'Declined replies: ' + noReplies
    ].join('\n')
  );
}
