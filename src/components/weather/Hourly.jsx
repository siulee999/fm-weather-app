import { useState, memo, useMemo } from "react";
import SimpleDropdown from "../ui/SimpleDropdown";
import { findWeatherSrc } from "../../utils/findWeatherSrc.js";
import { convertTempUnit } from "../../utils/convertUnits.js";


const Hourly = ({ hourlyData, tempUnit, isLoading }) => {
  const [selectedDay, setSelectedDay] = useState(0);

  const weekdays = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = hourlyData?.time[i * 24];
      if (date) return new Date(date).toLocaleDateString("en-US", { weekday: "long" })
      return null
    });

    return days
  }, [hourlyData]);

  const dayData = useMemo(() => {
    const startIndex = selectedDay * 24;
    const endIndex = startIndex + 24;
    return {
      time: hourlyData?.time?.slice(startIndex, endIndex) || [],
      temperature: hourlyData?.temperature_2m?.slice(startIndex, endIndex) || [],
      weather_code: hourlyData?.weather_code?.slice(startIndex, endIndex) || [],
    }
  }, [selectedDay, hourlyData]);


  return (
    <section className="rounded-2xl bg-n-800 p-6 flex flex-col gap-4" aria-labelledby="hourly-weather">
      <div className="flex items-center justify-between">
        <h2 id="hourly-weather" aria-label="Hourly forecast of 7 days" className="text-p-5">Hourly forecast</h2>
        <SimpleDropdown list={weekdays} setSelectedDay={setSelectedDay} selectedDay={selectedDay} />
      </div>

      <ul className="flex flex-col gap-6 justify-between h-[580px] overflow-y-scroll" aria-label={`hourly forecast of ${weekdays[selectedDay]}`}>
        {
          dayData?.time.map((h, index) => {
            const { weatherSrc, weatherAlt } = findWeatherSrc(dayData?.weather_code[index]);
            const hourTime = new Date(h).toLocaleTimeString("en-US", {
              hour: "numeric",
              hour12: true
            });
            const hourTemperature = `${convertTempUnit(dayData?.temperature[index], tempUnit)}°`;

            return (
              <li
                key={h}
                className={`flex justify-between items-center gap-3 bg-n-700 border border-n-600 rounded-md px-4 py-2 ${isLoading ? "invisible" : "block"}`}>
                <div className="flex items-center gap-2">
                  <img
                    alt={`${weatherAlt} at ${hourTime}`}
                    src={weatherSrc}
                    className="w-10 h-10" />
                  <span className="text-p-5m">{hourTime}</span>
                </div>
                <div className="text-p-7">{hourTemperature}</div>
              </li>)
          })
        }
      </ul>
    </section>
  )
}

export default memo(Hourly)