/*
<--------------- Imports --------------->
*/

import { KeyboardEvent } from "react";
import { Character } from "../../utilities/Interfaces";
import characters from "../../assets/characters.json";

/*
<--------------- Functions --------------->
*/

export const filterCharacters = (
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

export const getFilteredSuggestions = (
  query: string,
  selectedCategory: string
) => {
  const filteredCharacters = filterCharacters(
    characters,
    query,
    selectedCategory
  );
  return filteredCharacters.map(({ name }) => name);
};

export const handleKeyDown = (
  e: KeyboardEvent<HTMLInputElement>,
  suggestions: string[],
  selectedSuggestionIndex: number,
  selectedSuggestionRef: React.RefObject<HTMLLIElement>,
  handleSuggestionClick: (suggestion: string) => void,
  handleSearch: () => void,
  setSelectedSuggestionIndex: (index: number) => void,
  setShowSuggestions: (show: boolean) => void
) => {
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
