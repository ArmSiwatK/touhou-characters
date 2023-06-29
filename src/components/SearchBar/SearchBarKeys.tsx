/*
<--------------- Import --------------->
*/

import { KeyboardEvent } from "react";

/*
<--------------- Export --------------->
*/

const handleKeyDown = (
  e: KeyboardEvent<HTMLInputElement>,
  suggestions: string[],
  selectedSuggestionIndex: number,
  selectedSuggestionRef: React.RefObject<HTMLLIElement>,
  handleSuggestionClick: (suggestion: string) => void,
  handleSearch: () => void,
  setSelectedSuggestionIndex: (index: number) => void,
  setShowSuggestions: (show: boolean) => void
) => {
  /*
  <--------------- Variables --------------->
  */
  const selectedIndex = selectedSuggestionIndex;
  const suggestionCount = suggestions.length;

  /*
  <--------------- Functions --------------->
  */

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

  /*
  <--------------- Key Bindings --------------->
  */

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

export default handleKeyDown;
