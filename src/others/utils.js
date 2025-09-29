import locations from "../data/locations.json";


export function generateLocationSuggestions(keyword) {
  const lowercasedKeyword = keyword.toLowerCase();
  return locations.filter((location) => location.displayName.toLowerCase().includes(lowercasedKeyword)).slice(0, 10);
}


export function findWeatherSrc(code) {
  let weatherSrc;

  if (code === 1 || code === 0) {
    weatherSrc = "assets/w-sunny.webp";
  } else if (code === 2) {
    weatherSrc = "assets/w-partly-cloudy.webp";
  } else if (code === 3) {
    weatherSrc = "assets/w-overcast.webp";
  } else if (code >= 45 && code <= 48) {
    weatherSrc = "assets/w-fog.webp";
  } else if (code >= 51 && code <= 57) {
    weatherSrc = "assets/w-drizzle.webp";
  } else if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    weatherSrc = "assets/w-rain.webp";
  } else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    weatherSrc = "assets/w-snow.webp";
  } else if (code >= 95 && code <= 99) {
    weatherSrc = "assets/w-storm.webp";
  } else {
    weatherSrc = "assets/icon-error.svg";
  }

  return weatherSrc
}


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


// assets/w-sunny.webp - 0,1
// assets/w-partly-cloudy.webp - 2
// assets/w-overcast.webp - 3
// assets/w-fog.webp - 45-48
// assets/w-drizzle.webp - 51-57
// assets/w-rain.webp 61-67， 80-82
// assets/w-snow.webp 71-77， 85-86
// assets/w-storm.webp 95-99