/*
<--------------- Imports and Interface --------------->
*/

import React from "react";

interface SearchSuggestionsProps {
  suggestions: string[];
  selectedSuggestionIndex: number;
  selectedSuggestionRef: React.RefObject<HTMLLIElement>;
  handleSuggestionClick: (suggestion: string) => void;
  handleSuggestionHover: (index: number) => void;
}

/*
<--------------- Component --------------->
*/

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  selectedSuggestionIndex,
  selectedSuggestionRef,
  handleSuggestionClick,
  handleSuggestionHover,
}) => {
  /*
  <--------------- Rendering --------------->
  */
  return (
    <ul className="suggestions">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => handleSuggestionClick(suggestion)}
          onMouseEnter={() => handleSuggestionHover(index)}
          className={index === selectedSuggestionIndex ? "selected" : ""}
          ref={index === selectedSuggestionIndex ? selectedSuggestionRef : null}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

export default SearchSuggestions;
