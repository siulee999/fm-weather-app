import { describe, test, expect } from "vitest";
import { findWeatherSrc } from "./findWeatherSrc";

describe("find weather source correctly", () => {
  test("returns image path with valid code", () => {
    expect(findWeatherSrc(0).weatherSrc).toBe("assets/w-sunny.webp");
    expect(findWeatherSrc(63).weatherSrc).toBe("assets/w-rain.webp");
  })

  test("returns error-icon path with invalid code", () => {
    expect(findWeatherSrc(30).weatherSrc).toBe("assets/icon-error.svg");
    expect(findWeatherSrc(null).weatherSrc).toBe("assets/icon-error.svg");
  })
})