import { useEffect, useState } from "react";
import SimpleDropdown from "../ui/SimpleDropdown";
import axios from "axios";
import { findWeatherSrc } from "../../others/utils.js";

const Hourly = ({ selectedUnits, location }) => {
  const [hourlyData, setHourlyData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const [selectedDay, setSelectedDay] = useState(0);

  const hourly_value = hourlyData?.hourly;

  const startIndex = selectedDay * 24;
  const endIndex = startIndex + 24;
  const dayData = {
    time: hourly_value?.time?.slice(startIndex, endIndex) || [],
    temperature: hourly_value?.temperature_2m?.slice(startIndex, endIndex) || [],
    weather_code: hourly_value?.weather_code?.slice(startIndex, endIndex) || [],
  };

  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const date = hourly_value?.time[i * 24];
    if (date) return new Date(date).toLocaleDateString("en-US", { weekday: "long" })
    return null
  });

  const params = {
    latitude: location.lat,
    longitude: location.lon,
    timezone: "auto",
    temperature_unit: selectedUnits.temperature,
    hourly: "temperature_2m,weather_code",
    forecast_days: 7,
  };

  useEffect(() => {
    async function fetchHourlyData() {
      try {
        setIsLoading(true);

        const response = await axios.get("https://api.open-meteo.com/v1/forecast", { params });
        setHourlyData(response.data);

      } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchHourlyData();
  }, [selectedUnits.temperature, location]);


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
              <div className="text-p-7">{Math.round(dayData?.temperature[index])}°</div>
            </div>
          ))
        }
      </div>
    </aside>
  )
}

export default Hourly