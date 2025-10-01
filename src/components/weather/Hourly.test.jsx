import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hourly from "./Hourly";
import userEvent from "@testing-library/user-event";


describe("Hourly Weather Component", () => {
  const hourlyData = {
    time: Array.from({ length: 168 }, (_, i) => {
      const date = new Date('2025-10-01T00:00:00Z');
      date.setHours(date.getHours() + i);
      return date.toISOString();
    }),
    temperature_2m: Array.from({ length: 168 }, (_, i) => i),
    weather_code: Array.from({ length: 168 }, (_, i) => i % 10)
  };

  test("displays 24 hours of data for the current day", () => {
    render(<Hourly hourlyData={hourlyData} tempUnit="celsius" isLoading={false} />);
    for (let i = 0; i < 24; i++) {
      const time = new Date(hourlyData.time[i]).toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true
      });
      expect(screen.getByText(time)).toBeInTheDocument();
      expect(screen.getByText(`${hourlyData.temperature_2m[i].toFixed()}°`)).toBeInTheDocument();
    }
  })

  test("renders weekday dropdown properly", async () => {
    render(<Hourly hourlyData={hourlyData} tempUnit="celsius" isLoading={false} />);

    const user = userEvent.setup();
    const weedayDropdownBtn = screen.getByTestId("weekday-dropdown-btn");
    await user.click(weedayDropdownBtn);

    const weekdayList = ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
    weekdayList.forEach((day) => {
      expect(screen.getAllByText(day)).not.toHaveLength(0);
    });
    expect(screen.getByTestId("weekday-dropdown-btn")).toHaveTextContent("Wednesday");
    expect(screen.getAllByTestId("weekday-btns")).toHaveLength(7);
  })

  test("changes displayed data when selecting different day", async () => {
    render(<Hourly hourlyData={hourlyData} tempUnit="celsius" isLoading={false} />);

    // select the second day of weekday
    const user = userEvent.setup();
    const weekdayButtons = screen.getAllByTestId('weekday-btns');
    await user.click(weekdayButtons[1]);

    // check second day's hourly data (indices 24-47)
    for (let i = 24; i < 48; i++) {
      const time = new Date(hourlyData.time[i]).toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true
      });

      expect(screen.getByTestId("weekday-dropdown-btn")).toHaveTextContent("Thursday");
      expect(screen.getByText(time)).toBeInTheDocument();
      expect(screen.getByText(`${hourlyData.temperature_2m[i].toFixed()}°`)).toBeInTheDocument();
    }
  })
})