import { describe, before, after, it } from "node:test";
import assert from "node:assert";
import { destroy_test, init_test } from "./startup.js";

describe("database test suite", () => {
  let db;
  before(async () => {
    db = await init_test();
  });
  after(async () => await destroy_test(db));

  it("passes", () => {
    assert(true);
  });
});
