import { describe, expect, test } from "vitest";
import { cleanInput } from "./repl.js";

describe.each([
  {
    input: "  hello world  ",
    expected: ["hello", "world"],
  },
  {
    input: " hello world  again ",
    expected: ["hello", "world", "again"],
  },
  {
    input: "hELlo worLd",
    expected: ["hello", "world"],
  },
  {
    input: "  hello  ",
    expected: ["hello"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
