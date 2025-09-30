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


// 0	Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail