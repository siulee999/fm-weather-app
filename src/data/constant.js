const units = [
  { value: "temperature", title: "Temperature"},
  { value: "windSpeed", title: "Wind Speed"},
  { value: "precipitation", title: "Precipitation"}
]

const unitOptions = {
  temperature: [
    { value: "celsius", label: "Celsius (°C)"}, 
    { value: "fahrenheit", label: "Fahrenheit (°F)"}
  ], 
  windSpeed: [
    { value: "kmh", label: "km/h"},
    { value: "mph", label: "mph"},
  ],
  precipitation: [
    { value: "mm", label: "Millimeters (mm)"},
    { value: "inch", label: "Inches (in)"}
  ]  
};


export { unitOptions, units }