/**
 * Life After Sports survey — Google Sheets backend.
 *
 * Paste this into Extensions > Apps Script on the Google Sheet that should
 * hold responses, then deploy it as a web app (see SURVEY_SETUP.md).
 *
 * POST  -> appends one response row to the "Responses" tab.
 * GET   -> returns totals for the multiple-choice answers only (no written
 *          answers, no individual responses), which the public results page
 *          turns into charts.
 */

var SHEET_NAME = 'Responses';

// [field key sent by survey.html, column header in the sheet]
var FIELDS = [
  ['q1', '1. Highest level'],
  ['q1_other', '1. Highest level (other)'],
  ['q2', '2. Time since competing'],
  ['q3', '3. Biggest challenges'],
  ['q3_other', '3. Challenges (other)'],
  ['q4', '4. Prepared (1-5)'],
  ['q5', '5. Wish I had been prepared for'],
  ['q6', '6. Most positive aspects'],
  ['q6_other', '6. Positives (other)'],
  ['q7', '7. Skills that helped'],
  ['q7_other', '7. Skills (other)'],
  ['q8', '8. Positive accomplishment/discovery'],
  ['q9', '9. Support that would have helped'],
  ['q9_other', '9. Support (other)'],
  ['q10', '10. One thing to change']
];

// Only these are returned to the public results page.
var PUBLIC_FIELDS = ['q1', 'q2', 'q3', 'q4', 'q6', 'q7', 'q9'];

var LIST_SEPARATOR = ' | ';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.website) return json_({ ok: true }); // honeypot filled in: likely a bot
    var row = [new Date()].concat(FIELDS.map(function (f) { return clean_(data[f[0]]); }));
    getSheet_().appendRow(row);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Returns counts only, never individual responses, so nobody can be picked
// out of the public results.
function doGet() {
  var sheet = getSheet_();
  var lastRow = sheet.getLastRow();
  var totals = {};
  PUBLIC_FIELDS.forEach(function (key) { totals[key] = { answered: 0, counts: {} }; });
  var count = 0;
  if (lastRow > 1) {
    var values = sheet.getRange(2, 1, lastRow - 1, FIELDS.length + 1).getValues();
    var index = {};
    FIELDS.forEach(function (f, i) { index[f[0]] = i + 1; }); // +1 for timestamp column
    count = values.length;
    values.forEach(function (v) {
      PUBLIC_FIELDS.forEach(function (key) {
        var cell = String(v[index[key]]).replace(/^'/, '');
        var picks = cell ? cell.split(LIST_SEPARATOR) : [];
        var t = totals[key];
        if (picks.length) t.answered++;
        picks.forEach(function (p) { t.counts[p] = (t.counts[p] || 0) + 1; });
      });
    });
  }
  return json_({ ok: true, count: count, totals: totals });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Submitted'].concat(FIELDS.map(function (f) { return f[1]; })));
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function clean_(value) {
  if (Array.isArray(value)) value = value.join(LIST_SEPARATOR);
  value = value == null ? '' : String(value).slice(0, 1000);
  // Stop answers starting with = + - @ from being run as spreadsheet formulas.
  if (/^[=+\-@]/.test(value)) value = "'" + value;
  return value;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
