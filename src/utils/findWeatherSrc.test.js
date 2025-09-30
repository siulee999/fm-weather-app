import { describe, test, expect } from "vitest";
import { findWeatherSrc } from "./findWeatherSrc";

describe("find weather source correctly", () => {
  test("returns image path with valid code", () => {
    expect(findWeatherSrc(0)).toBe("assets/w-sunny.webp");
    expect(findWeatherSrc(63)).toBe("assets/w-rain.webp");
  })

  test("returns error-icon path with invalid code", () => {
    expect(findWeatherSrc(30)).toBe("assets/icon-error.svg");
    expect(findWeatherSrc(null)).toBe("assets/icon-error.svg");
  })
})