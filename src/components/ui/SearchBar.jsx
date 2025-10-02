import { useState, useRef, useMemo } from "react";
import { ReactSVG } from "react-svg";
import Button from "./Button";
import { generateLocationSuggestions } from "../../utils/generateLocationSuggestions.js";


const SearchBar = ({ setLocation }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [isSuggestionsOpened, setIsSuggestionsOpened] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const inputRef = useRef(false);

  const locationSuggestions = useMemo(() => {
    const cleanedTerm = searchTerm.trim();
    if (!cleanedTerm) return;

    return generateLocationSuggestions(cleanedTerm)
  }, [searchTerm]);


  function handleSuggestionSubmit(lat, lon, displayName) {
    if (!lat || !lon || !displayName) {
      return;
    }
    setLocation({ lat, lon, displayName });
    setSearchTerm("");
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setLocation(null);
    setSearchTerm("");
  }

  function handleKeyDown(e) {
    if (!isSuggestionsOpened || locationSuggestions?.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestionIndex((prev) => (prev + 1) % locationSuggestions?.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestionIndex((prev) => (prev - 1 + locationSuggestions?.length) % locationSuggestions?.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestionIndex >= 0) {
          const selected = locationSuggestions[activeSuggestionIndex];
          handleSuggestionSubmit(selected.lat, selected.lon, selected.displayName);
        } else {
          handleFormSubmit(e); // Fallback to submit
        }
        break;
      case 'Escape':
        setIsSuggestionsOpened(false);
        setActiveSuggestionIndex(-1);
        inputRef.current?.focus();
        break;
      default:
        break;
    }
  };

  function handleFocus() {
    if (locationSuggestions?.length > 0) {
      setIsSuggestionsOpened(true)
    }
  }

  function handleBlur() {
    setIsSuggestionsOpened(false);
    setActiveSuggestionIndex(-1);
  }


  return (
    <div className="w-full flex justify-center" aria-label="search bar for searching weather of specific location">
      <form
        onSubmit={handleFormSubmit}
        autoComplete="off"
        className="flex-1 max-w-3xl flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
      >
        <div className="flex-1 flex items-center rounded-xl pl-13 pr-6 py-4 text-n-200 text-p-5m bg-n-800 relative focus-within:outline-2 focus-within:outline-n-200 focus-within:outline-offset-4 hover:bg-n-700">
          <input
            type="text"
            name="searchbar"
            placeholder="Search for a place..."
            className="outline-0 w-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setActiveSuggestionIndex(-1);
              if (e.target.value.trim()) {
                setIsSuggestionsOpened(true);
              }
            }}
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-controls="suggestions-list"
            aria-autocomplete="list"
            aria-activedescendant={activeSuggestionIndex >= 0 ? `suggestion-${activeSuggestionIndex}` : undefined}
          />
          <ReactSVG
            src="assets/icon-search.svg"
            aria-hidden="true"
            className="text-n-200 size-5 mx-4 absolute left-0"
          />

          {
            isSuggestionsOpened && locationSuggestions?.length > 0 && (
              <ul
                className={`absolute left-0 right-0 top-full mt-3 z-[55] bg-n-800 rounded-xl text-p-7 text-n-0 [&>*]:mb-1`} id="suggestions-list"
                role="listbox"
              >
                <div className="px-2 py-2.5">
                  {locationSuggestions.map((item, index) => (
                    <li
                      key={`${item.lat}-${item.lon}`}
                      role="option"
                      aria-selected={index === activeSuggestionIndex}
                      onMouseDown={() => handleSuggestionSubmit(item.lat, item.lon, item.displayName)}
                      className={`rounded-lg px-2 py-2.5 border border-n-800 hover:bg-n-700 hover:border-n-600 hover:cursor-pointer ${index === activeSuggestionIndex ? "border-n-600 bg-n-700" : "border-n-800"} `}
                    >
                      {item.displayName}
                    </li>))}
                </div>
              </ul>)
          }
        </div>

        <Button type="submit">Search</Button>
      </form>
    </div>
  )
}

export default SearchBar