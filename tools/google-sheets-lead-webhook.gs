/**
 * Google Sheets lead webhook for the TextTonality VSL page.
 *
 * Setup:
 *  1. Create a Google Sheet. Extensions > Apps Script. Paste this file in, Save.
 *  2. Deploy > New deployment > type "Web app".
 *       Execute as: Me      Who has access: Anyone
 *  3. Authorize, then copy the Web app URL (ends in /exec).
 *  4. Paste it into leadWebhookUrl in index.html.
 *
 * If you change this script later: Deploy > Manage deployments > edit > New version
 * (keeps the same URL).
 */

var SHEET_NAME = 'Leads';
var COLUMNS = [
  'submitted_at', 'name', 'first_name', 'last_name', 'email', 'phone',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'fbclid', 'li_fat_id', 'source', 'page_url'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS);
      sheet.setFrozenRows(1);
    }
    var p = (e && e.parameter) || {};
    sheet.appendRow(COLUMNS.map(function (c) {
      var v = p[c] || '';
      // Stop Sheets from treating values like "+16105551234" or "=..." as formulas
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    }));
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}
