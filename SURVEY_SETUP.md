# Life After Sports survey: setup

`survey.html` is the survey and `results.html` shows live totals.

The survey (`survey.html`) and results page (`results.html`) save answers to a
Google Sheet you own. One-time setup, about 5 minutes:

1. Go to <https://sheets.new> and name the sheet something like
   "Life After Sports Responses".
2. In the sheet, open **Extensions > Apps Script**.
3. Delete what's in `Code.gs`, paste in everything from `apps-script/Code.gs`
   in this repo, and click **Save**.
4. Click **Deploy > New deployment**. Click the gear next to "Select type" and
   choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, approve the permissions prompt (Google warns because it's
   your own unverified script; choose Advanced > Go to project), and copy the
   **Web app URL** (ends in `/exec`).
6. Open `survey-data.js` and paste that URL into `endpoint: ''`.
7. Commit and push. Responses now land in the sheet's **Responses** tab.

## Where things show up

- **Every answer**, including written ones: your Google Sheet.
- **Public results page** (`/results.html`): totals for the multiple-choice and
  1–5 questions only. Written answers are never sent to the public page.
- **Layout preview with fake numbers**: `/results.html?demo=1`.

## Changing the script later

If you edit the Apps Script, use **Deploy > Manage deployments > Edit >
Version: New version** so the URL stays the same.

## Changing questions

Questions live in `survey-data.js`. If you add or rename a question, also update
`FIELDS` (and `PUBLIC_FIELDS` if it should be charted) in `apps-script/Code.gs`
and redeploy it.
