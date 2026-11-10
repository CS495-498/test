import test from "node:test";
import assert from "node:assert/strict";
import { calculateProgress } from "../site/logic.js";

test("calculates an ordinary percentage", () => {
  assert.equal(calculateProgress(3, 4), 75);
});

test("calculates zero progress", () => {
  assert.equal(calculateProgress(0, 5), 0);
});

test("calculates complete progress", () => {
  assert.equal(calculateProgress(10, 10), 100);
});

test("rejects impossible progress", () => {
  assert.throws(() => calculateProgress(11, 10), RangeError);
});

test("rejects a zero total", () => {
  assert.throws(() => calculateProgress(0, 0), RangeError);
});
