/*
<--------------- Imports and Interface --------------->
*/

import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Character } from "../../utilities";
import { useKeyboardContext } from "../../KeyboardContext";
import characters from "../../assets/characters.json";
import "./SearchBar.scss";

interface SearchBarProps {
  setSelectedCharacter: (character: Character) => void;
}

/*
<--------------- Component --------------->
*/

const SearchBar: React.FC<SearchBarProps> = ({ setSelectedCharacter }) => {
  /*
  <--------------- States and Variable --------------->
  */

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { setDisableKeyBindings } = useKeyboardContext();

  /*
  <--------------- Functions --------------->
  */

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const filteredSuggestions = characters
      .filter(({ name, charId }) =>
        [name, charId.toString()].some((property) =>
          property.toLowerCase().includes(value.toLowerCase())
        )
      )
      .map(({ name }) => name);

    setSuggestions(filteredSuggestions);
    setShowSuggestions(value !== "");
  };

  const handleFocus = () => {
    setDisableKeyBindings(true);
  };

  const handleBlur = () => {
    setDisableKeyBindings(false);
  };

  const handleSearch = () => {
    const filteredCharacters = characters.filter(({ name, charId }) =>
      [name, charId.toString()].some((property) =>
        property.toLowerCase().includes(query.toLowerCase())
      )
    );

    setSelectedCharacter(filteredCharacters[0] || characters[0]);
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
      setShowSuggestions(false);
    }
  };

  /*
  <--------------- Rendering --------------->
  */

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search characters..."
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
