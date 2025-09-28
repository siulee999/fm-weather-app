import { useState } from "react";
import { unitOptions, units } from "../../others/constant.js";
import { ReactSVG } from "react-svg";

const UnitDropdown = ({ selectedUnits, setSelectedUnits }) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const isMetric = selectedUnits.temperature === "celsius" && selectedUnits.windSpeed === "kmh" && selectedUnits.precipitation === "mm";

  function toggleDropdown() {
    setIsDropdownOpened(!isDropdownOpened);
  }

  function handleUnitChange(key, value) {
    setSelectedUnits(prev => ({ ...prev, [key]:value }));
    setIsDropdownOpened(false);
  }

  function switchAllUnits() {
    if (isMetric) {
      setSelectedUnits({ temperature: "fahrenheit", windSpeed: "mph", precipitation: "inch" })

    } else {
      setSelectedUnits({ temperature: "celsius", windSpeed: "kmh", precipitation: "mm" });
    }
    setIsDropdownOpened(false);
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 rounded-md bg-n-800 px-3 py-2 text-p-7 focus:outline-2 focus:outline-n-200 focus:outline-offset-4"
        onClick={toggleDropdown}
      >
        <ReactSVG src="assets/icon-units.svg" className="size-4" />
        <span>Units</span>
        <ReactSVG src="assets/icon-dropdown.svg" className={`size-4 flex-center ${isDropdownOpened && "rotate-x-180"}`} />
      </button>

      <div className={`absolute top-full right-0 z-50 w-[250px] bg-n-800 border border-n-600 rounded-xl mt-3 px-2 py-2.5 text-p-7 text-n-0 [&>*]:mb-1 ${isDropdownOpened ? "block" : "hidden"}`}>
        <button
          className="w-full text-left px-2 py-2.5 hover:bg-n-700 rounded-md focus:outline focus:outline-offset-2"
          onClick={switchAllUnits}>
          {isMetric ? "Switch to Imperial" : "Switch to Metric"}
        </button>
        {
          units?.map((unit, idx) => (
            <div key={idx} className="flex flex-col gap-2 not-last:after:border-b not-last:after:border-n-600">
              <span className="text-p-8 text-n-300 pt-1.5 px-2">{unit.title}</span>
              <div className="flex flex-col gap-1">
                {
                  unitOptions[unit.value]?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleUnitChange(unit.value, option.value)}
                      className={`flex justify-between items-center rounded-md px-2 py-2.5 ${option.value === selectedUnits[unit.value] ? "bg-n-700" : "bg-n-800"}`}
                    >
                      <span>{option.label}</span>
                      <ReactSVG
                        src="/assets/icon-checkmark.svg"
                        className={`size-4 ${option.value === selectedUnits[unit.value] ? "block" : "hidden"}`} />
                    </button>
                  ))
                }
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default UnitDropdown