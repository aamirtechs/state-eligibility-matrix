"use strict";
const test = require("node:test");
const assert = require("node:assert");
const L = require("../src/logic.js");

test("built-in dataset covers 50 states and validates clean", () => {
  assert.strictEqual(L.DEFAULT_DATASET.length, 50);
  assert.deepStrictEqual(L.validateDataset(L.DEFAULT_DATASET), []);
  const codes = L.DEFAULT_DATASET.map(r => r.state);
  ["CA", "TX", "FL", "NY", "WA", "IL", "CT", "DE", "ID", "MD", "MN", "MT", "OR", "VT", "WI"].forEach(c => {
    assert.ok(codes.indexOf(c) !== -1, c);
  });
  L.DEFAULT_DATASET.forEach(r => {
    assert.ok(r.source_url.indexOf("http") === 0, r.state);
    assert.strictEqual(r.last_verified, "2026-10-23", r.state);
    // Unverified placeholders must not claim the service is available.
    if (r.licensing_note.toLowerCase().includes("unverified")) {
      assert.notStrictEqual(r.service_available, "yes", r.state);
    }
  });
});

test("WA cap is 15 percent of enrolled debt", () => {
  const ok = L.checkEligibility(L.DEFAULT_DATASET, { state: "WA", enrolledDebt: 20000, proposedFee: 3000 });
  assert.strictEqual(ok.verdict, "fee within cap");
  assert.strictEqual(ok.feeCapAmount, 3000);
  const over = L.checkEligibility(L.DEFAULT_DATASET, { state: "WA", enrolledDebt: 20000, proposedFee: 4000 });
  assert.strictEqual(over.verdict, "fee exceeds cap");
  assert.strictEqual(over.excessAmount, 1000);
});

test("IL cap is 15 percent of savings, not of debt", () => {
  const out = L.checkEligibility(L.DEFAULT_DATASET, { state: "IL", enrolledDebt: 20000, expectedSavings: 10000, proposedFee: 2000 });
  assert.strictEqual(out.feeCapAmount, 1500);
  assert.strictEqual(out.verdict, "fee exceeds cap");
  assert.strictEqual(out.excessAmount, 500);
});

test("service unavailable state returns that verdict before any fee maths", () => {
  const out = L.checkEligibility(L.DEFAULT_DATASET, { state: "CT", enrolledDebt: 20000, expectedSavings: 10000, proposedFee: 100 });
  assert.strictEqual(out.verdict, "service unavailable");
  assert.ok(out.reason.indexOf("CT") !== -1);
});

test("insufficient data when the cap basis amount or the row is missing", () => {
  const noSavings = L.checkEligibility(L.DEFAULT_DATASET, { state: "IL", enrolledDebt: 20000, proposedFee: 100 });
  assert.strictEqual(noSavings.verdict, "insufficient data");
  const noRow = L.checkEligibility(L.DEFAULT_DATASET, { state: "ZZ", enrolledDebt: 20000, proposedFee: 100 });
  assert.strictEqual(noRow.verdict, "insufficient data");
  const noCap = L.checkEligibility(L.DEFAULT_DATASET, { state: "CA", enrolledDebt: 20000, proposedFee: 100 });
  assert.strictEqual(noCap.verdict, "insufficient data");
});

test("verdict carries the row citation with source and last verified date", () => {
  const out = L.checkEligibility(L.DEFAULT_DATASET, { state: "WA", enrolledDebt: 20000, proposedFee: 100 });
  assert.ok(out.citation.indexOf("http") !== -1);
  assert.ok(out.citation.indexOf("2026-10-23") !== -1);
  assert.ok(out.reason.indexOf(out.citation) !== -1);
});

test("diff view reports changed, added and removed rows by field", () => {
  const base = L.cloneDataset(L.DEFAULT_DATASET).filter(r => r.state !== "NV");
  const changed = L.cloneDataset(L.DEFAULT_DATASET);
  changed.find(r => r.state === "WA").fee_cap_value = 20;
  const trimmed = changed.filter(r => r.state !== "TX");
  const diff = L.diffDatasets(base, trimmed);
  const wa = diff.find(d => d.state === "WA" && d.field === "fee_cap_value");
  assert.strictEqual(wa.from, "15");
  assert.strictEqual(wa.to, "20");
  assert.strictEqual(wa.type, "changed");
  assert.ok(diff.some(d => d.state === "NV" && d.type === "added"));
  assert.ok(diff.some(d => d.state === "TX" && d.type === "removed"));
});

test("dataset JSON round trip and verdict CSV", () => {
  const parsed = L.parseDatasetJSON(JSON.stringify(L.DEFAULT_DATASET));
  assert.strictEqual(parsed.length, 50);
  assert.strictEqual(parsed.find(r => r.state === "WA").fee_cap_value, 15);
  const csv = L.buildVerdictCSV(L.checkEligibility(L.DEFAULT_DATASET, { state: "WA", enrolledDebt: 20000, proposedFee: 4000 }));
  assert.ok(csv.indexOf("fee exceeds cap") !== -1);
  assert.ok(csv.indexOf("last_verified") !== -1);
});
