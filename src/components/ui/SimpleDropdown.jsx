import { useState } from "react";
import { ReactSVG } from "react-svg";

const SimpleDropdown = ({ list, setSelectedDay, selectedDay }) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  function toggleDropdown() {
    setIsDropdownOpened(!isDropdownOpened);
  }

  function handleWeekdayChange(index) {
    setSelectedDay(index);
    setIsDropdownOpened(false);
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="px-3 py-2 rounded-md bg-n-600 text-p-7 flex items-center justify-between gap-2 focus:outline-2 focus:outline-n-200 focus:outline-offset-4"
        >
        <span>{list[selectedDay] || "-"}</span>
        <ReactSVG src="assets/icon-dropdown.svg" className={`size-4 flex-center ${isDropdownOpened || "rotate-x-180"}`} />
      </button>
      {
        <div 
          className={`absolute top-full right-0 w-[150px] bg-n-800 border border-n-600 rounded-xl mt-3 px-2 py-2.5 text-p-7 text-n-0 [&>*]:not-last:mb-2 ${isDropdownOpened ? "block" : "hidden"}`}
          >
          {
            list?.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleWeekdayChange(idx)}
                className={`w-full flex items-center gap-2 rounded-md px-3 py-2 text-p-7 focus:outline focus:outline-n-200 focus:outline-offset-2 ${idx === 0 ? "bg-n-700" : "bg-n-800"}`}
                >
                <span>{option}</span>
              </button>
            ))
          }
        </div>
      }
    </div>
  )
}

export default SimpleDropdown