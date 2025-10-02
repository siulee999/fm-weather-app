import { memo } from 'react';
import { findWeatherSrc } from '../../utils/findWeatherSrc.js';
import { convertTempUnit } from "../../utils/convertUnits.js";


const Daily = ({ dailyData, tempUnit, isLoading }) => {
  let dailyList = Array.from({ length: 7 }, (_, i) => ({
    day: dailyData?.time?.[i]
      ? new Date(dailyData.time[i]).toLocaleDateString("en-US", { weekday: "short" })
      : "-",
    min: dailyData?.temperature_2m_min?.[i] !== undefined 
      ? `${convertTempUnit(dailyData?.temperature_2m_min[i], tempUnit)}°`
      : "N/A",
    max: dailyData?.temperature_2m_max?.[i] !== undefined 
      ? `${convertTempUnit(dailyData.temperature_2m_max[i], tempUnit)}°`
      : "N/A",
    ...findWeatherSrc(dailyData?.weather_code[i])
  }));
  
  return (
    <section className="flex flex-col gap-4" aria-labelledby="daily-weather">
      <h2 id="daily-weather" aria-label="Daily forecast of 7 days" className="text-p-5">Daily forecast</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {
          dailyList.map((d, index) => (
            <figure key={`${d.day}-${index}`} className="rounded-xl bg-n-800 border border-n-600 p-4 flex flex-col items-center gap-4">
              {
                <>
                  <h3 className={`text-p-6 ${isLoading ? "invisible" : "block"}`}>{d.day}</h3>
                  <img alt={d.weatherAlt} src={d.weatherSrc} data-testid="weather-image" className={`w-full max-w-20 object-contain object-center ${isLoading ? "invisible" : "block"}`}  />
                  <div className={`w-full flex items-center justify-between text-p-7 ${isLoading ? "invisible" : "block"}`}>
                    <div className="sr-only">Temperature range is {d.min} to {d.max}</div>
                    <span>{d.min}</span>
                    <span>{d.max}</span>
                  </div>
                </>
              }
            </figure>)
          )
        }
      </div>
    </section>
  )
}

export default memo(Daily)