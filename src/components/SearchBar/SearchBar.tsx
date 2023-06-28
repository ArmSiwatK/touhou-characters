/*
<--------------- Imports and Interface --------------->
*/

import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Character } from "../../utilities";
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
  <--------------- State --------------->
  */

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  /*
  <--------------- Functions --------------->
  */

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const filteredSuggestions = characters
      .filter(
        (character) =>
          character.name.toLowerCase().includes(value.toLowerCase()) ||
          character.charId.toString().includes(value.toLowerCase())
      )
      .map((character) => character.name);
    setSuggestions(filteredSuggestions);

    setShowSuggestions(value !== "");
  };

  const handleSearch = () => {
    const filteredCharacters = characters.filter(
      (character) =>
        character.name.toLowerCase().includes(query.toLowerCase()) ||
        character.charId.toString().includes(query.toLowerCase())
    );
    if (filteredCharacters.length > 0) {
      setSelectedCharacter(filteredCharacters[0]);
    } else {
      setSelectedCharacter(characters[0]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch();
    setShowSuggestions(false);
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
