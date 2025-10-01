import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Current from "./Current";

describe("Current Weather Component", () => {
  const currentData = {
    "time": "2025-09-27T00:00",
    "interval": 900,
    "weather_code": 3,
    "apparent_temperature": 33.2,
    "relative_humidity_2m": 84,
    "temperature_2m": 27.5,
    "wind_speed_10m": 3.4,
    "precipitation": 0.000
  };
  const location = { lat: 22.3167, lon: 114.183, displayName: "Kowloon, Hong Kong" };

  test("displays all required data correctly", () => {
    render(<Current currentData={currentData} tempUnit="celsius" windSpeedUnit="kmh" preciUnit="mm" location={location} isLoading={false} />);
    
    const date = new Date().toLocaleDateString('en-US', {
      weekday: "short", month: 'short', day: 'numeric', year: 'numeric'
    }); 

    expect(screen.getByText(date)).toBeInTheDocument();
    expect(screen.getByText("33 °")).toBeInTheDocument();
    expect(screen.getByText("84 %")).toBeInTheDocument();
    expect(screen.getByText("28°")).toBeInTheDocument();
    expect(screen.getByText("3 kmh")).toBeInTheDocument();
    expect(screen.getByText("0 mm")).toBeInTheDocument();
    expect(screen.getByTestId("weather-image")).toHaveAttribute("src", "assets/w-overcast.webp");
  })


  test("displays data correctly with changed units", () => {
    render(<Current currentData={currentData} tempUnit="fahrenheit" windSpeedUnit="mph" preciUnit="inch" location={location} isLoading={false} />);

    expect(screen.getByText("92 °")).toBeInTheDocument();
    expect(screen.getByText("84 %")).toBeInTheDocument();
    expect(screen.getByText("82°")).toBeInTheDocument();
    expect(screen.getByText("2 mph")).toBeInTheDocument();
    expect(screen.getByText("0 inch")).toBeInTheDocument();
    expect(screen.getByTestId("weather-image")).toHaveAttribute("src", "assets/w-overcast.webp");
  })
})