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

import SearchSuggestions from "./SearchSuggestions";
import { filterCharacters, getFilteredSuggestions } from "./SearchBarUtils";
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

  const handleSuggestionHover = (index: number) => {
    setSelectedSuggestionIndex(index);
  };

  /*
  <--------------- Keydown Functions --------------->
  */

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const selectedIndex = selectedSuggestionIndex;
    const suggestionCount = suggestions.length;

    const handleArrowDown = () => {
      setSelectedSuggestionIndex((selectedIndex + 1) % suggestionCount);
      selectedSuggestionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    };

    const handleArrowUp = () => {
      setSelectedSuggestionIndex(
        (selectedIndex - 1 + suggestionCount) % suggestionCount
      );
      selectedSuggestionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    };

    const handleEnter = () => {
      e.preventDefault();
      if (selectedIndex !== -1) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        handleSearch();
      }
      setShowSuggestions(false);
    };

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        handleArrowDown();
        break;
      case "ArrowUp":
        e.preventDefault();
        handleArrowUp();
        break;
      case "Enter":
        handleEnter();
        break;
      default:
        break;
    }
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
