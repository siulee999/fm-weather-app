export function convertTempUnit(valueOfCelsius, toUnit) {
  if (toUnit === "celsius") {
    return Math.round(valueOfCelsius);
  }
  if (toUnit === "fahrenheit") {
    return Math.round(valueOfCelsius * 1.8 + 32);
  }
}

export function convertWindSpeedUnit(valueOfKmh, toUnit) {
  if (toUnit === "kmh") {
    return Math.round(valueOfKmh);
  }
  if (toUnit === "mph") {
    return Math.round(valueOfKmh * 0.621371);
  }
}

export function convertPreciUnit(valueOfMilimeters, toUnit) {
  if (toUnit === "mm") {
    return Math.round(valueOfMilimeters);
  }
  if (toUnit === "inch") {
    return Math.round(valueOfMilimeters / 25.4);
  }
}