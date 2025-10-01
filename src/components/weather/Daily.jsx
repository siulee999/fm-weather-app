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
    weatherSrc: findWeatherSrc(dailyData?.weather_code[i])
  }));
  
  return (
    <div className="flex flex-col gap-4">
      <div className="text-p-5">Daily forecast</div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {
          dailyList.map((d, index) => (
            <div key={`${d.day}-${index}`} className="rounded-xl bg-n-800 border border-n-600 p-4 flex flex-col items-center gap-4">
              {
                <>
                  <div className={`text-p-6 ${isLoading ? "invisible" : "block"}`}>{d.day}</div>
                  <img alt="weather image" className={`w-full max-w-20 object-contain object-center ${isLoading ? "invisible" : "block"}`} src={d.weatherSrc} />
                  <div className={`w-full flex items-center justify-between text-p-7 ${isLoading ? "invisible" : "block"}`}>
                    <span>{d.min}</span>
                    <span>{d.max}</span>
                  </div>
                </>
              }
            </div>)
          )
        }
      </div>
    </div>
  )
}

export default memo(Daily)