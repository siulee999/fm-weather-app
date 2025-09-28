import { useEffect, useState } from "react";
import axios from "axios";
import { findWeatherSrc } from "../../others/utils.js";

const Daily = ({ selectedUnits, location }) => {
  const [dailyData, setDailyData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const daily_value = dailyData?.daily;

  let dailyList = Array.from({ length: 7 }, (_, i) => ({
    day: daily_value?.time?.[i]
      ? new Date(daily_value.time[i]).toLocaleDateString("en-US", { weekday: "short" })
      : "N/A",
    min: daily_value?.temperature_2m_min?.[i] !== undefined 
      ? Math.round(daily_value.temperature_2m_min[i]) 
      : "N/A",
    max: daily_value?.temperature_2m_max?.[i] !== undefined 
      ? Math.round(daily_value.temperature_2m_max[i]) 
      : "N/A",
    weatherSrc: findWeatherSrc(daily_value?.weather_code[i])
  }));

  const params = {
    latitude: location.lat,
    longitude: location.lon,
    timezone: "auto",
    temperature_unit: selectedUnits.temperature,
    forecast_days: 7,
    daily: "temperature_2m_min,temperature_2m_max,weather_code",
  };

  useEffect(() => {
    async function fetchDailyData() {
      try {
        setIsLoading(true);

        const response = await axios.get("https://api.open-meteo.com/v1/forecast", { params });
        setDailyData(response.data);

      } catch (err) {
        console.log(err);
        alert("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
      }

    }

    fetchDailyData();
  }, [selectedUnits.temperature, location]);

  
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
                  <img alt="icon" className={`w-full max-w-20 object-contain object-center ${isLoading ? "invisible" : "block"}`} src={d.weatherSrc} />
                  <div className={`w-full flex items-center justify-between text-p-7 ${isLoading ? "invisible" : "block"}`}>
                    <span>{d.min}°</span>
                    <span>{d.max}°</span>
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

export default Daily