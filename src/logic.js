"use strict";
// State Eligibility Matrix: core logic (pure functions, no DOM).
// IMPORTANT: the built-in dataset is editable reference data only.
// It is not legal advice. Verify every row against primary sources
// and counsel before relying on it.

const LAST_VERIFIED = "2026-10-23";
const SRC_STATE_TABLE = "https://www.lowincomeconsumers.org/_files/ugd/5b4010_5e1eb2f3b35946c7bafb034ab7a5793b.pdf";
const SRC_WA = "https://www.curadebt.com/washington-debt-relief-how-to-reduce-your-finances/";
const SRC_MARKET = "https://legalclarity.org/debt-settlement-solution-market-size-regulation-outlook/";

function row(state, available, capValue, capBasis, note, source) {
  return {
    state: state,
    service_available: available,
    fee_cap_value: capValue,
    fee_cap_basis: capBasis,
    licensing_note: note,
    source_url: source,
    last_verified: LAST_VERIFIED
  };
}

const DEFAULT_DATASET = [
  row("CA", "yes", null, "none", "California DFPI registration required for debt settlement providers from February 2025. Verify current DFPI status before enrolling.", SRC_MARKET),
  row("TX", "yes", null, "none", "No fee cap seeded in the reference set. Verify current Texas requirements with primary sources.", SRC_MARKET),
  row("FL", "yes", null, "none", "No fee cap seeded in the reference set. Verify current Florida requirements with primary sources.", SRC_MARKET),
  row("NY", "yes", null, "none", "No fee cap seeded in the reference set. Verify current New York requirements with primary sources.", SRC_MARKET),
  row("WA", "yes", 15, "percent_of_debt", "Washington caps total fees at 15 percent of enrolled debt, including third-party account fees in the cited summary.", SRC_WA),
  row("IL", "yes", 15, "percent_of_savings", "Illinois cap cited as 15 percent of savings in the state fee table used as a seed source.", SRC_STATE_TABLE),
  row("CT", "no", 10, "percent_of_savings", "Connecticut cap cited as 10 percent of savings. Seed set marks service as unavailable, matching common program exclusions. Verify before use.", SRC_STATE_TABLE),
  row("DE", "yes", 18, "percent_of_debt", "Delaware cap cited as under 18 percent of debt in the state fee table used as a seed source.", SRC_STATE_TABLE),
  row("ID", "yes", 20, "percent_of_debt", "Idaho cap cited as 20 percent of debt in the state fee table used as a seed source.", SRC_STATE_TABLE),
  row("MD", "yes", null, "none", "Maryland requires registration through NMLS and a 50000 dollar surety bond, per the cited summary.", SRC_MARKET),
  row("MN", "no", null, "none", "Minnesota charges a 1000 dollar registration fee and requires a 5000 dollar surety bond. Seed set marks service as unavailable, matching common program exclusions.", SRC_MARKET),
  row("MT", "yes", null, "none", "Montana requires a 250 dollar annual registration, per the cited summary.", SRC_MARKET),
  row("OR", "no", null, "none", "Seed set marks service as unavailable, matching common program exclusions. Verify current Oregon rules before use.", SRC_MARKET),
  row("VT", "no", null, "none", "Seed set marks service as unavailable, matching common program exclusions. Verify current Vermont rules before use.", SRC_MARKET),
  row("WI", "no", null, "none", "Seed set marks service as unavailable, matching common program exclusions. Verify current Wisconsin rules before use.", SRC_MARKET),
  row("AL", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("MA", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("AK", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("AZ", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("AR", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("CO", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("GA", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("HI", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("IN", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("IA", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("KS", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("KY", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("LA", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("ME", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("MI", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("MS", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("MO", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("NE", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("NV", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("NH", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("NJ", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("NM", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("NC", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("ND", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("OH", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("OK", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("PA", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("RI", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("SC", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("SD", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("TN", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("UT", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("VA", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("WV", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", ""),
  row("WY", "yes", null, "none", "Unverified placeholder. Fill in fee caps and licensing with primary-source citations.", "")
];

function csvEscape(v) {
  const s = String(v === null || v === undefined ? "" : v);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}
function toCSV(headers, rows) {
  return [headers.join(",")].concat(rows.map(function (r) {
    return headers.map(function (h) { return csvEscape(r[h]); }).join(",");
  })).join("\n");
}
function round2(n) { return Math.round(n * 100) / 100; }
function cloneDataset(ds) { return JSON.parse(JSON.stringify(ds || DEFAULT_DATASET)); }

function parseDatasetJSON(text) {
  const parsed = JSON.parse(String(text || ""));
  const arr = Array.isArray(parsed) ? parsed : (parsed.states || parsed.dataset || []);
  if (!Array.isArray(arr)) { throw new Error("Dataset JSON must be an array or an object with a states array."); }
  return arr.map(normalizeRow);
}
function normalizeRow(r) {
  return {
    state: String((r && r.state) || "").trim().toUpperCase(),
    service_available: String((r && r.service_available) || "").trim().toLowerCase(),
    fee_cap_value: (r && r.fee_cap_value !== undefined && r.fee_cap_value !== "" && r.fee_cap_value !== null) ? Number(r.fee_cap_value) : null,
    fee_cap_basis: String((r && r.fee_cap_basis) || "none").trim(),
    licensing_note: String((r && r.licensing_note) || ""),
    source_url: String((r && r.source_url) || ""),
    last_verified: String((r && r.last_verified) || "")
  };
}
function validateDataset(ds) {
  const errors = [];
  if (!Array.isArray(ds)) { return ["Dataset is not an array."]; }
  const seen = {};
  ds.forEach(function (r, i) {
    if (!r.state || r.state.length !== 2) { errors.push("Row " + i + ": state must be a 2 letter code."); }
    if (seen[r.state]) { errors.push("Duplicate state: " + r.state); }
    seen[r.state] = true;
    if (["yes", "no"].indexOf(r.service_available) === -1) { errors.push(r.state + ": service_available must be yes or no."); }
    if (["percent_of_debt", "percent_of_savings", "none"].indexOf(r.fee_cap_basis) === -1) { errors.push(r.state + ": unknown fee_cap_basis " + r.fee_cap_basis); }
    if (r.fee_cap_basis !== "none" && (r.fee_cap_value === null || isNaN(r.fee_cap_value))) { errors.push(r.state + ": fee cap basis set but no fee_cap_value."); }
  });
  return errors;
}
function findState(ds, code) {
  const target = String(code || "").trim().toUpperCase();
  return (ds || []).map(normalizeRow).find(function (r) { return r.state === target; }) || null;
}

function checkEligibility(ds, input) {
  const opts = input || {};
  const state = String(opts.state || "").trim().toUpperCase();
  const debt = opts.enrolledDebt === "" || opts.enrolledDebt === undefined || opts.enrolledDebt === null ? null : Number(opts.enrolledDebt);
  const savings = opts.expectedSavings === "" || opts.expectedSavings === undefined || opts.expectedSavings === null ? null : Number(opts.expectedSavings);
  const fee = opts.proposedFee === "" || opts.proposedFee === undefined || opts.proposedFee === null ? null : Number(opts.proposedFee);
  const found = findState(ds || DEFAULT_DATASET, state);
  const base = { state: state, enrolledDebt: debt, expectedSavings: savings, proposedFee: fee, row: found, feeCapAmount: null, excessAmount: null };
  if (!state || !found) {
    return Object.assign(base, { verdict: "insufficient data", reason: "No dataset row for state " + (state || "(blank)") + "." });
  }
  const citation = found.source_url + " (last verified " + found.last_verified + ")";
  if (found.service_available !== "yes") {
    return Object.assign(base, { verdict: "service unavailable", reason: "Dataset marks " + state + " as not service available. Citation: " + citation, citation: citation });
  }
  if (fee === null || isNaN(fee)) {
    return Object.assign(base, { verdict: "insufficient data", reason: "A proposed fee is required to check the cap for " + state + ".", citation: citation });
  }
  if (!found.fee_cap_basis || found.fee_cap_basis === "none" || found.fee_cap_value === null) {
    return Object.assign(base, { verdict: "insufficient data", reason: "No fee cap is seeded for " + state + " in this reference dataset, so the fee cannot be judged here. Verify with primary sources. Citation: " + citation, citation: citation });
  }
  let capBase = null, capBaseName = "";
  if (found.fee_cap_basis === "percent_of_debt") { capBase = debt; capBaseName = "enrolled debt"; }
  if (found.fee_cap_basis === "percent_of_savings") { capBase = savings; capBaseName = "expected savings"; }
  if (capBase === null || isNaN(capBase)) {
    return Object.assign(base, { verdict: "insufficient data", reason: "The " + state + " cap is " + found.fee_cap_value + "% of " + capBaseName + ", but no " + capBaseName + " amount was supplied.", citation: citation });
  }
  const capAmount = round2(capBase * found.fee_cap_value / 100);
  if (fee <= capAmount) {
    return Object.assign(base, { verdict: "fee within cap", feeCapAmount: capAmount, excessAmount: 0, reason: "Proposed fee " + fee + " is within the " + state + " cap of " + capAmount + " (" + found.fee_cap_value + "% of " + capBaseName + "). Citation: " + citation, citation: citation });
  }
  const excess = round2(fee - capAmount);
  return Object.assign(base, { verdict: "fee exceeds cap", feeCapAmount: capAmount, excessAmount: excess, reason: "Proposed fee " + fee + " exceeds the " + state + " cap of " + capAmount + " by " + excess + " (" + found.fee_cap_value + "% of " + capBaseName + "). Citation: " + citation, citation: citation });
}

const DIFF_FIELDS = ["service_available", "fee_cap_value", "fee_cap_basis", "licensing_note", "source_url", "last_verified"];
function diffDatasets(oldDs, newDs) {
  const a = {}; (oldDs || []).map(normalizeRow).forEach(function (r) { a[r.state] = r; });
  const b = {}; (newDs || []).map(normalizeRow).forEach(function (r) { b[r.state] = r; });
  const changes = [];
  const states = Array.from(new Set(Object.keys(a).concat(Object.keys(b)))).sort();
  states.forEach(function (st) {
    if (!a[st]) { changes.push({ state: st, field: "(row)", type: "added", from: "", to: "present" }); return; }
    if (!b[st]) { changes.push({ state: st, field: "(row)", type: "removed", from: "present", to: "" }); return; }
    DIFF_FIELDS.forEach(function (f) {
      const from = a[st][f] === null ? "" : String(a[st][f]);
      const to = b[st][f] === null ? "" : String(b[st][f]);
      if (from !== to) { changes.push({ state: st, field: f, type: "changed", from: from, to: to }); }
    });
  });
  return changes;
}

function buildVerdictCSV(results) {
  const list = Array.isArray(results) ? results : [results];
  const rows = list.map(function (r) {
    return {
      state: r.state, enrolled_debt: r.enrolledDebt, expected_savings: r.expectedSavings,
      proposed_fee: r.proposedFee, verdict: r.verdict, fee_cap_amount: r.feeCapAmount,
      excess_amount: r.excessAmount, reason: r.reason,
      source_url: r.row ? r.row.source_url : "", last_verified: r.row ? r.row.last_verified : ""
    };
  });
  return toCSV(["state", "enrolled_debt", "expected_savings", "proposed_fee", "verdict", "fee_cap_amount", "excess_amount", "reason", "source_url", "last_verified"], rows);
}

const api = { DEFAULT_DATASET: DEFAULT_DATASET, defaultDataset: DEFAULT_DATASET, parseDatasetJSON: parseDatasetJSON, normalizeRow: normalizeRow, validateDataset: validateDataset, findState: findState, checkEligibility: checkEligibility, diffDatasets: diffDatasets, buildVerdictCSV: buildVerdictCSV, cloneDataset: cloneDataset };
if (typeof module !== "undefined" && module.exports) { module.exports = api; }
if (typeof window !== "undefined") { window.StateEligibilityMatrix = api; }
