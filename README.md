# State Eligibility Matrix
Live page: https://aamirtechs.github.io/state-eligibility-matrix/

Check whether a consumer can be enrolled in a state and whether a proposed fee fits the state cap, from a versioned, citable, editable dataset. Reference data only, not legal advice. Operations teams currently do this by hand, one row at a time, in spreadsheets. This tool does the whole batch in the browser for free.

Seed notes: Washington caps total fees at 15 percent of enrolled debt; Illinois at 15 percent of savings; Connecticut at 10 percent of savings; California requires DFPI registration from February 2025; Maryland requires NMLS registration plus a 50000 dollar surety bond; Minnesota charges a 1000 dollar registration fee and requires a 5000 dollar bond; Montana charges a 250 dollar annual registration. Every row is editable reference data that must be verified with primary sources and counsel. This tool is not legal advice.

## Features
- Versioned built-in dataset for about 15 high-volume states: availability, fee cap value and basis, licensing note, source URL and last verified date per row.
- Checker form for state, enrolled debt, expected savings and proposed fee, returning a cited verdict: service unavailable, fee within cap, fee exceeds cap by an amount, or insufficient data.
- Editable dataset JSON in the page, so a corrected row takes effect immediately.
- Diff view that compares two dataset versions row by row and field by field.
- Downloadable verdict CSV. Reference data only, not legal advice: verify every row with primary sources and counsel.

## How it works
Pick a state, enter the debt, expected savings and proposed fee, and the checker applies that state's row from the dataset, keeping percent-of-debt and percent-of-savings caps separate. Edit the dataset JSON in the page to correct a row, and paste a second version to see exactly what changed. It runs entirely in the browser.

## Privacy
Runs 100% in your browser. Your files never leave this device, nothing is uploaded,
and there is no tracking.

## Development
Core logic lives in `src/logic.js` and is shared by the page and the tests.
Run the tests with `npm test`.

## License
MIT, Copyright 2026 Amir Hussain.
