import { memo } from 'react';
import { findWeatherSrc, convertTempUnit, convertWindSpeedUnit, convertPreciUnit } from "../../others/utils.js";
import { SyncLoader } from "react-spinners";

const Current = ({ currentData, tempUnit, windSpeedUnit, preciUnit, location, isLoading }) => {
  const topList = {
    nameSegments: location.displayName.split(","),
    date: new Date().toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }),
    weatherSrc: findWeatherSrc(currentData?.weather_code),
    currentTemp: `${currentData?.temperature_2m === undefined ? "N/A" : convertTempUnit(currentData?.temperature_2m, tempUnit)}°`
  };

  const bottomList = [
    {
      label: "Feels like",
      value: currentData?.apparent_temperature === undefined ? "N/A" : convertTempUnit(currentData?.apparent_temperature, tempUnit),
      unit: "°"
    }, {
      label: "Humidity",
      value: currentData?.relative_humidity_2m === undefined ? "N/A" : Math.round(currentData?.relative_humidity_2m),
      unit: "%"
    }, {
      label: "Wind",
      value: currentData?.wind_speed_10m === undefined ? "N/A" : convertWindSpeedUnit(currentData?.wind_speed_10m, windSpeedUnit),
      unit: windSpeedUnit
    }, {
      label: "Precipitation",
      value: currentData?.precipitation === undefined ? "N/A" : convertPreciUnit(currentData?.precipitation, preciUnit),
      unit: preciUnit
    }
  ];

  return (
    <section>
      <div className="rounded-2xl px-8 py-8 sm:py-20 md:py-24 flex items-center justify-center flex-col sm:flex-row sm:justify-between gap-6 mb-6 bg-[url('bg-today-small.svg')] sm:bg-[url('bg-today-large.svg')] bg-no-repeat bg-center bg-cover">
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

export default memo(Current)