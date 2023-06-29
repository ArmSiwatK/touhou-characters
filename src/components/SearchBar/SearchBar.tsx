/*
<--------------- Imports --------------->
*/

import React, { useState, useEffect, useRef, ChangeEvent } from "react";

import SearchSuggestions from "./SearchSuggestions";
import handleKeyDown from "./SearchBarKeys";
import { filterCharacters, getFilteredSuggestions } from "./SearchBarUtils";
import { SearchBarProps } from "../../utilities/Interfaces";
import { useKeyboardContext } from "../../utilities/KeyboardContext";
import characters from "../../assets/characters.json";
import "./SearchBar.scss";

/*
<--------------- Component --------------->
*/

const SearchBar: React.FC<SearchBarProps> = ({
  selectedCategory,
  setSelectedCharacter,
}) => {
  /*
  <--------------- States and Variable --------------->
  */

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);

  const selectedSuggestionRef = useRef<HTMLLIElement>(null);

  const { setDisableKeyBindings } = useKeyboardContext();

  /*
  <--------------- Search Function --------------->
  */

  const handleSearch = () => {
    const filteredCharacters = filterCharacters(
      characters,
      query,
      selectedCategory
    );

    if (filteredCharacters.length > 0) {
      setSelectedCharacter(filteredCharacters[0]);
    }
  };

  /*
  <--------------- Suggestion Functions --------------->
  */

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedSuggestionIndex(-1);

    const filteredSuggestions = getFilteredSuggestions(value, selectedCategory);

    setSuggestions(filteredSuggestions);
    setShowSuggestions(value !== "");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);

    const filteredCharacters = characters.filter(({ name, charId }) =>
      [name, charId.toString()].some((property) =>
        property.toLowerCase().includes(suggestion.toLowerCase())
      )
    );

    setSelectedCharacter(filteredCharacters[0] || characters[0]);
  };

  /*
  <--------------- Handler Functions --------------->
  */

  const handleSuggestionHover = (index: number) => {
    setSelectedSuggestionIndex(index);
  };

  const handleFocus = () => {
    setDisableKeyBindings(true);
  };

  const handleBlur = () => {
    setDisableKeyBindings(false);
  };

  /*
  <--------------- useEffect Hook --------------->
  */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchBar = document.getElementById("search-bar");
      if (searchBar && !searchBar.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /*
  <--------------- Rendering --------------->
  */

  return (
    <div className="search-bar" id="search-bar">
      <input
        type="text"
        placeholder="Search characters..."
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={(e) =>
          handleKeyDown(
            e,
            suggestions,
            selectedSuggestionIndex,
            selectedSuggestionRef,
            handleSuggestionClick,
            handleSearch,
            setSelectedSuggestionIndex,
            setShowSuggestions
          )
        }
      />

      {showSuggestions && (
        <SearchSuggestions
          suggestions={suggestions}
          selectedSuggestionIndex={selectedSuggestionIndex}
          selectedSuggestionRef={selectedSuggestionRef}
          handleSuggestionClick={handleSuggestionClick}
          handleSuggestionHover={handleSuggestionHover}
        />
      )}

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
