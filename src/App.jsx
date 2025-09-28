import { useState } from "react";
import { Header } from "./components/ui/Header";
import SearchBar from "./components/ui/SearchBar";
import Current from "./components/weather/Current";
import Daily from "./components/weather/Daily";
import Hourly from "./components/weather/Hourly";


const App = () => {
  const [location, setLocation] = useState({ 
    lat: "22.2793278", 
    lon: "114.1628131", 
    displayName: "Hong Kong Island, Hong Kong" 
  });

  const [selectedUnits, setSelectedUnits] = useState({ 
    temperature: "celsius", 
    windSpeed: "kmh", 
    precipitation: "mm" 
  });

  return (
    <div className="min-h-screen min-w-[390px] bg-n-900">
      <Header className="px-6 md:px-14 pt-6" selectedUnits={selectedUnits} setSelectedUnits={setSelectedUnits} />

      <h1 className="text-center text-p-2 px-4 md:px-14 py-12 md:py-16">How’s the sky looking today?</h1>

      <main className="px-4 md:px-14 pb-16 flex flex-col items-center justify-between gap-8 md:gap-12">
        <SearchBar setLocation={setLocation} />
        {
          location
            ? (
              <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_384px] gap-8">
                <div className="flex flex-col justify-between gap-8">
                  <Current selectedUnits={selectedUnits} location={location} />
                  <Daily selectedUnits={selectedUnits} location={location} />
                </div>
                <Hourly selectedUnits={selectedUnits} location={location} />
              </div>
            ) : (
              <div className="text-p-4">No search result found!</div>
            )
        }
      </main>
    </div>
  );
}

export default App

