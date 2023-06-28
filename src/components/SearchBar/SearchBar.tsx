/*
<--------------- Imports and Interface --------------->
*/

import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
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
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);

  const selectedSuggestionRef = useRef<HTMLLIElement>(null);

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

  const handleSuggestionHover = (index: number) => {
    setSelectedSuggestionIndex(index);
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
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex(
        (prevIndex) => (prevIndex + 1) % suggestions.length
      );
      selectedSuggestionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex(
        (prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length
      );
      selectedSuggestionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedSuggestionIndex !== -1) {
        handleSuggestionClick(suggestions[selectedSuggestionIndex]);
      } else {
        handleSearch();
      }
      setShowSuggestions(false);
    }
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
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => handleSuggestionHover(index)}
              className={index === selectedSuggestionIndex ? "selected" : ""}
              ref={
                index === selectedSuggestionIndex ? selectedSuggestionRef : null
              }
            >
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
