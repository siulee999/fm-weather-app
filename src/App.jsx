import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/ui/Header";
import SearchBar from "./components/ui/SearchBar";
import Current from "./components/weather/Current";
import Daily from "./components/weather/Daily";
import Hourly from "./components/weather/Hourly";
import Error from "./components/ui/Error";
import axios from "axios";


const App = () => {
  const [location, setLocation] = useState({
    lat: "22.2793278",
    lon: "114.1628131",
    displayName: "Hong Kong Island, Hong Kong"
  });

  const [weatherData, setWeatherData] = useState({});

  const currentData = useMemo(() => weatherData.current, [weatherData]);
  const dailyData = useMemo(() => weatherData.daily, [weatherData]);
  const hourlyData = useMemo(() => weatherData.hourly, [weatherData]);

  const [tempUnit, setTempUnit] = useState("celsius");
  const [windSpeedUnit, setWindSpeedUnit] = useState("kmh");
  const [preciUnit, setPreciUnit] = useState("mm");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);

  const params = {
    latitude: location.lat,
    longitude: location.lon,
    timezone: "auto",
    forecast_days: 7,
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    precipitation_unit: "mm",
    current: "weather_code,apparent_temperature,relative_humidity_2m,temperature_2m,wind_speed_10m,precipitation",
    daily: "temperature_2m_min,temperature_2m_max,weather_code",
    hourly: "temperature_2m,weather_code",
  }

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        setIsLoading(true);

        const response = await axios.get("https://api.open-meteo.com/v1/forecast", { params });
        setWeatherData(response.data);

      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeatherData();
  }, []);

  return (
    <div className="min-h-screen min-w-[390px] bg-n-900">
      <Header className="px-6 md:px-14 pt-6" tempUnit={tempUnit} windSpeedUnit={windSpeedUnit} preciUnit={preciUnit} setTempUnit={setTempUnit} setWindSpeedUnit={setWindSpeedUnit} setPreciUnit={setPreciUnit} />
      {
        error
          ? <Error className={"pt-10 mt-12 md:mt-16"}/>
          : (<>
            <h1 className="text-center text-p-2 px-4 md:px-14 py-12 md:py-16">How’s the sky looking today?</h1>
            <main className="px-4 md:px-14 pb-16 flex flex-col items-center justify-between gap-8 md:gap-12">
              <SearchBar setLocation={setLocation} />
              {
                location
                  ? (
                    <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_384px] gap-8">
                      <div className="flex flex-col justify-between gap-8">
                        <Current
                          isLoading={isLoading}
                          currentData={currentData}
                          tempUnit={tempUnit}
                          windSpeedUnit={windSpeedUnit}
                          preciUnit={preciUnit}
                          location={location} />
                        <Daily
                          isLoading={isLoading}
                          dailyData={dailyData}
                          tempUnit={tempUnit} />
                      </div>
                      <Hourly
                        isLoading={isLoading}
                        hourlyData={hourlyData}
                        tempUnit={tempUnit} />
                    </div>
                  ) : (
                    <div className="text-p-4">No search result found!</div>
                  )
              }
            </main>
          </>)
      }
    </div>
  );
}

export default App

