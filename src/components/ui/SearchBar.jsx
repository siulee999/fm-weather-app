import { ReactSVG } from "react-svg"
import Button from "./Button"
import { useEffect, useState, useRef } from "react";
import axios from "axios";


const SearchBar = ({ setLocation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const inputRef = useRef(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  async function fetchLocationSuggestions(city) {
    try {
      setSuggestions([]);
      setIsLoading(true);

      const response = await axios.get(`${import.meta.env.VITE_MY_PROXY_SERVER}/api/locations`, {
        params: { city }
      });
      const filteredList = response.data;
      setSuggestions(filteredList);

    } catch (err) {
      console.log(err);
      alert("Something went wrong fetching for suggestions.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSuggestionSubmit(lat, lon, displayName) {
    if (!lat || !lon || !displayName) {
      return;
    }
    setLocation({ lat, lon, displayName });
    setSearchTerm("");
    setSuggestions([]);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setLocation(null);
    setSearchTerm("");
    setSuggestions([]);
  }

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    let id = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(id);
  }, [searchTerm]);


  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.trim().length >= 2) {
      fetchLocationSuggestions(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full flex justify-center">
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
            onChange={(e) => setSearchTerm(e.target.value)}
            ref={inputRef}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <ReactSVG src="assets/icon-search.svg" className="text-n-200 size-5 mx-4 absolute left-0" />

          {
            isInputFocused && (
              <div className={`absolute left-0 right-0 top-full mt-3 z-[55] bg-n-800 rounded-xl text-p-7 text-n-0 [&>*]:mb-1`}>
                {
                  isLoading && (
                    <div className="px-4 py-5 flex gap-4">
                      <ReactSVG src="assets/icon-loading.svg" size={20} />
                      <span>Search in progress</span>
                    </div>)
                }
                {
                  suggestions?.length > 0 && (
                    <div className="px-2 py-2.5">
                      {suggestions.map((item) => (
                        <div
                          key={`${item.lat}-${item.lon}`}
                          onMouseDown={() => handleSuggestionSubmit(item.lat, item.lon, item.displayName)}
                          className="rounded-lg px-2 py-2.5 border border-n-800 hover:bg-n-700 hover:border-n-600 hover:cursor-pointer"
                        >
                          {item.displayName}
                        </div>))}
                    </div>)
                }
              </div>)
          }
        </div>

        <Button type="submit">Search</Button>
      </form>
    </div>
  )
}

export default SearchBar