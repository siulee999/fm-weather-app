import { describe, test, expect } from "vitest";
import { convertTempUnit, convertWindSpeedUnit, convertPreciUnit } from "./convertUnits";

describe("unit converts correctly", () => {
  test("temperature unit", () => {
    expect(convertTempUnit(24, "celsius")).toBe(24);
    expect(convertTempUnit(24, "fahrenheit")).toBe(75);
    expect(convertTempUnit(0, "celsius")).toBe(0);
    expect(convertTempUnit(0, "fahrenheit")).toBe(32);
  })

  test("wind speed unit", () => {
    expect(convertWindSpeedUnit(24, "kmh")).toBe(24);
    expect(convertWindSpeedUnit(24, "mph")).toBe(15);
    expect(convertWindSpeedUnit(0, "kmh")).toBe(0);
    expect(convertWindSpeedUnit(0, "mph")).toBe(0);
  })

  test("precipitation unit", () => {
    expect(convertPreciUnit(24, "mm")).toBe(24);
    expect(convertPreciUnit(24, "inch")).toBe(1);
    expect(convertPreciUnit(0, "mm")).toBe(0);
    expect(convertPreciUnit(0, "inch")).toBe(0);
  })
})
