import locations from "../data/locations.json";

export function generateLocationSuggestions(keyword) {
  const lowercasedKeyword = keyword.toLowerCase();
  return locations.filter((location) => location.displayName.toLowerCase().includes(lowercasedKeyword)).slice(0, 10);
}