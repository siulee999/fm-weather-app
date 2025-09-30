import { describe, test, expect } from "vitest";
import { generateLocationSuggestions } from "./generateLocationSuggestions.js";

describe("generate related location suggestions", () => {
  test("returns related suggestions for keyword", () => {
    const keyword = "HonG";
    const results = generateLocationSuggestions(keyword);
    const allRelated = results.every(item => item.displayName.toLowerCase().includes(keyword.toLowerCase()))

    expect(allRelated).toBe(true);
  })

  test("returns empty list for not found", () => {
    const keyword = "xyz";
    const results =  generateLocationSuggestions(keyword);

    expect(results).toEqual([]);
  })
})