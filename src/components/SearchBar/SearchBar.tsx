/*
<--------------- Imports and Interface --------------->
*/

import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Character } from "../../utilities/utilities";
import { useKeyboardContext } from "../../utilities/KeyboardContext";
import characters from "../../assets/characters.json";
import "./SearchBar.scss";

interface SearchBarProps {
  selectedCategory: string;
  setSelectedCharacter: (character: Character) => void;
}

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

  const { setDisableKeyBindings } = useKeyboardContext();

  /*
  <--------------- Search Functions --------------->
  */

  const filterCharacters = (
    characters: Character[],
    query: string,
    selectedCategory: string
  ) => {
    return characters.filter(({ name, charId, category }) => {
      const isInSelectedCategory =
        selectedCategory === "All" || category === selectedCategory;
      const matchesQuery = [name, charId.toString()].some((property) =>
        property.toLowerCase().includes(query.toLowerCase())
      );
      return isInSelectedCategory && matchesQuery;
    });
  };

  const handleSearch = () => {
    const filteredCharacters = filterCharacters(
      characters,
      query,
      selectedCategory
    );

    const selectedCharacter = filteredCharacters.find(
      ({ category }) => category === selectedCategory
    );

    if (selectedCharacter) {
      setSelectedCharacter(selectedCharacter);
    }
  };

  /*
  <--------------- Suggestion Functions --------------->
  */

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const filteredCharacters = filterCharacters(
      characters,
      value,
      selectedCategory
    );
    const filteredSuggestions = filteredCharacters.map(({ name }) => name);

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

  const handleFocus = () => {
    setDisableKeyBindings(true);
  };

  const handleBlur = () => {
    setDisableKeyBindings(false);
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
