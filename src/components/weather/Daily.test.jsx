import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { convertTempUnit } from "../../utils/convertUnits";
import Daily from "./Daily";

describe("Daily Weather Component", () => {
  const dailyData = {
      "time": [
        "2025-10-01",
        "2025-10-02",
        "2025-10-03",
        "2025-10-04",
        "2025-10-05",
        "2025-10-06",
        "2025-10-07"
      ],
      "temperature_2m_min": [21.2, 26.8, 27.8, 29.1, 29.7, 22.4, 23.3],
      "temperature_2m_max": [26.2, 33.5, 31.1, 32.9, 34.7, 24.3, 25.1],
      "weather_code": [80, 80, 3, 2, 80, 80, 2]
    }


  test("displays 7 days of data", () => {
    render(<Daily dailyData={dailyData} tempUnit="celsius" isLoading={false} />)
    const days = ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'];
    days.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });

    dailyData.temperature_2m_min.forEach((min,index) => {
      expect(screen.getByText(`${convertTempUnit(min, "celsius")}°`)).toBeInTheDocument();
      expect(screen.getByText(`${convertTempUnit(dailyData.temperature_2m_max[index], "celsius")}°`)).toBeInTheDocument();
    });
  });


  test("handles missing data gracefully", () => {
    render(<Daily dailyData={null} tempUnit="celsius" isLoading={false} />)
    const naElements = screen.getAllByText('N/A');
    expect(naElements).toHaveLength(14); 

    const imgElements = screen.getAllByAltText('weather image');
    expect(imgElements).toHaveLength(7);
  });

})