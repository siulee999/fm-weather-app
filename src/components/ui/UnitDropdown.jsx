import { useState } from "react";
import { unitGroups } from "../../data/constant.js";
import { ReactSVG } from "react-svg";

const UnitDropdown = ({
  tempUnit, windSpeedUnit, preciUnit, setTempUnit, setWindSpeedUnit, setPreciUnit
}) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const isMetric = tempUnit === "celsius" && windSpeedUnit === "kmh" && preciUnit === "mm";

  function isSelected(value) {
    return (value === tempUnit || value === windSpeedUnit || value === preciUnit);
  };

  function toggleDropdown() {
    setIsDropdownOpened(!isDropdownOpened);
  }

  function handleUnitChange(title, value) {
    if (title === "temperature") {
      return setTempUnit(value);
    }

    if (title === "windSpeed") {
      return setWindSpeedUnit(value);
    }

    if (title === "precipitation") {
      return setPreciUnit(value)
    }
    setIsDropdownOpened(false);
  }

  function switchAllUnits() {
    if (isMetric) {
      setTempUnit("fahrenheit");
      setWindSpeedUnit("mph");
      setPreciUnit("inch");

    } else {
      setTempUnit("celsius");
      setWindSpeedUnit("kmh");
      setPreciUnit("mm");
    }
    setIsDropdownOpened(false);
  }

  return (
    <div className="relative">
      <button
        id="unit-selection-dropdown"
        aria-expanded={isDropdownOpened}
        aria-haspopup="menu"
        aria-controls="unit-popup-menu"
        className="flex items-center gap-2 rounded-md bg-n-800 px-3 py-2 text-p-7 focus:outline-2 focus:outline-n-200 focus:outline-offset-4"
        onClick={toggleDropdown}
      >
        <ReactSVG
          src="assets/icon-units.svg"
          aria-hidden="true"
          className="size-4"
        />
        <span>Units</span>
        <ReactSVG
          src="assets/icon-dropdown.svg"
          aria-hidden="true"
          className={`size-4 flex-center ${isDropdownOpened && "rotate-x-180"}`}
        />
      </button>

      <div
        id="unit-popup-menu"
        role="menu"
        aria-labelledby="unit-selection-dropdown"
        className={`absolute top-full right-0 z-50 w-[250px] bg-n-800 border border-n-600 rounded-xl mt-3 px-2 py-2.5 text-p-7 text-n-0 [&>*]:mb-1 ${isDropdownOpened ? "block" : "hidden"}`}

      >
        <button
          role="menuitem"
          className="w-full text-left px-2 py-2.5 hover:bg-n-700 rounded-md focus:outline focus:outline-offset-2"
          onClick={switchAllUnits}>
          {isMetric ? "Switch to Imperial" : "Switch to Metric"}
        </button>
        {
          unitGroups?.map((gp, idx) => {
            return (
              <div key={idx} className="flex flex-col gap-2 not-last:after:border-b not-last:after:border-n-600">
                <span id={`unit-${gp.title}`} className="text-p-8 text-n-300 pt-1.5 px-2">{gp.label}</span>
                <div
                  role="group"
                  aria-labelledby={`unit-${gp.title}`}
                  className="flex flex-col gap-1">
                  {
                    gp?.options?.map((option, index) => (
                      <button
                        key={index}
                        role="menuitemradio"
                        aria-checked={isSelected(option.value)}
                        onClick={() => handleUnitChange(gp.title, option.value)}
                        className={`flex justify-between items-center rounded-md px-2 py-2.5 ${isSelected(option.value) ? "bg-n-700" : "bg-n-800"}`}
                      >
                        <span>{option.label}</span>
                        <ReactSVG
                          src="assets/icon-checkmark.svg"
                          aria-hidden="true"
                          className={`size-4 ${isSelected(option.value) ? "block" : "hidden"}`}
                        />
                      </button>
                    ))
                  }
                </div>
              </div>)
          })
        }
      </div>
    </div>
  )
}

export default UnitDropdown