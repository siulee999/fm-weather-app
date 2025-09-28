import { useEffect, useState } from "react";
import axios from 'axios';
import { findWeatherSrc } from "../../others/utils.js";
import { SyncLoader } from "react-spinners";

const Current = ({ selectedUnits, location }) => {
  const [currentData, setCurrentData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const params = {
    latitude: location.lat,
    longitude: location.lon,
    timezone: "auto",
    temperature_unit: selectedUnits.temperature,
    wind_speed_unit: selectedUnits.windSpeed,
    precipitation_unit: selectedUnits.precipitation,
    current: "weather_code,apparent_temperature,relative_humidity_2m,temperature_2m,wind_speed_10m,precipitation",
  };

  const current_units = currentData?.current_units;
  const current_value = currentData?.current;

  const topList = {
    nameSegments: location.displayName.split(","),
    date: new Date().toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }),
    weatherSrc: findWeatherSrc(current_value?.weather_code),
    currentTemp: `${current_value?.temperature_2m === undefined ? "N/A" : Math.round(current_value?.temperature_2m)}°`
  };

  const bottomList = [
    {
      label: "Feels like",
      value: current_value?.apparent_temperature === undefined ? "N/A" : Math.round(current_value?.apparent_temperature),
      unit: "°"
    }, {
      label: "Humidity",
      value: current_value?.relative_humidity_2m === undefined ? "N/A" : Math.round(current_value?.relative_humidity_2m),
      unit: "%"
    }, {
      label: "Wind",
      value: current_value?.wind_speed_10m === undefined ? "N/A" : Math.round(current_value?.wind_speed_10m),
      unit: current_units?.wind_speed_10m
    }, {
      label: "Precipitation",
      value: current_value?.precipitation === undefined ? "N/A" : Math.round(current_value?.precipitation),
      unit: current_units?.precipitation
    }
  ];


  useEffect(() => {
    async function fetchCurrentData() {
      try {
        setIsLoading(true);

        const response = await axios.get("https://api.open-meteo.com/v1/forecast", { params });
        setCurrentData(response.data);

      } catch (err) {
        console.log(err);
        alert("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCurrentData();
  }, [selectedUnits, location]);


  return (
    <section>
      <div className={`rounded-2xl px-8 py-8 sm:py-20 md:py-24 flex items-center justify-center flex-col sm:flex-row sm:justify-between gap-6 mb-6  ${isLoading ? "bg-n-700" : "bg-[url('bg-today-small.svg')] sm:bg-[url('bg-today-large.svg')] bg-no-repeat bg-center bg-cover"}`}>
        {
          isLoading
            ? (
              <div className="w-full text-center">
                <SyncLoader color="hsl(250, 6%, 84%)" size={12} />
                <div className="mt-4 text-lg">Loading</div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2 items-center sm:items-start">
                  <span className="text-p-4">{topList?.nameSegments[0].trim()}</span>
                  <span className="text-p-5">{topList?.nameSegments.at(-1).trim()}</span>
                  <div className="text-p-6 opacity-80">{topList?.date}</div>
                </div>
                <div className="flex items-center gap-5">
                  {
                    topList?.weatherSrc && <img alt="weather icon" className="w-24 h-24" src={topList?.weatherSrc} />
                  }
                  <div className="text-p-1">{topList?.currentTemp}</div>
                </div>
              </>
            )
        }
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {
          bottomList.map((item) => (
            <div key={item.label} className="rounded-xl bg-n-800 p-5 flex flex-col gap-4 text-n-2 border border-n-600">
              <div className="text-p-6 text-n-200">{item.label}</div>
              <div className="text-p-3 text-n-0">
                {isLoading ? "-" : `${item.value} ${item.unit}`}
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default Current