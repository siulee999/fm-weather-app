import { memo } from 'react';
import { useState } from "react";
import SimpleDropdown from "../ui/SimpleDropdown";
import { findWeatherSrc, convertTempUnit } from "../../others/utils.js";

const Hourly = ({ hourlyData, tempUnit, isLoading }) => {
  const [selectedDay, setSelectedDay] = useState(0);

  const startIndex = selectedDay * 24;
  const endIndex = startIndex + 24;
  const dayData = {
    time: hourlyData?.time?.slice(startIndex, endIndex) || [],
    temperature: hourlyData?.temperature_2m?.slice(startIndex, endIndex) || [],
    weather_code: hourlyData?.weather_code?.slice(startIndex, endIndex) || [],
  };

  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const date = hourlyData?.time[i * 24];
    if (date) return new Date(date).toLocaleDateString("en-US", { weekday: "long" })
    return null
  });


  return (
    <aside className="rounded-2xl bg-n-800 p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-p-5">Hourly forecast</div>
        <SimpleDropdown list={weekdays} setSelectedDay={setSelectedDay} selectedDay={selectedDay} />
      </div>

      <div className="flex flex-col gap-6 justify-between h-[580px] overflow-y-scroll">
        {
          dayData?.time.map((h, index) => (
            <div key={h} className={`flex justify-between items-center gap-3 bg-n-700 border border-n-600 rounded-md px-4 py-2 ${isLoading ? "invisible" : "block"}`}>
              <div className="flex items-center gap-2">
                <img alt="icon" className="w-10 h-10" src={findWeatherSrc(dayData?.weather_code[index])} />
                <div className="text-p-5m">
                  {
                    new Date(h).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      hour12: true
                    })
                  }
                </div>
              </div>
              <div className="text-p-7">{convertTempUnit(dayData?.temperature[index], tempUnit)}°</div>
            </div>
          ))
        }
      </div>
    </aside>
  )
}

export default memo(Hourly)