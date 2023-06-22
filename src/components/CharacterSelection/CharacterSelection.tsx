/*
<--------------- Imports and Interfaces --------------->
*/

import React from "react";
import "./CharacterSelection.scss";

interface Character {
  charId: string;
  name: string;
  title: string;
  category: string;
}

interface CharacterSelectionProps {
  characters: Character[];
  categories: string[];
  selectedCharacter: Character | null;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  handleCharacterSelection: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

/*
<--------------- Component --------------->
*/

const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  characters,
  categories,
  selectedCharacter,
  selectedCategory,
  setSelectedCategory,
  handleCharacterSelection,
}) => {
  /*
  <--------------- State and Variable --------------->
  */

  const filteredCharacters =
    selectedCategory === "All"
      ? characters
      : characters.filter(
          (character) => character.category === selectedCategory
        );

  /*
  <--------------- Function --------------->
  */

  const handleCategorySelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  /*
  <--------------- Rendering --------------->
  */

  return (
    <div className="character-selection">
      <label htmlFor="category-dropdown">Category:</label>
      <select
        id="category-dropdown"
        value={selectedCategory}
        onChange={handleCategorySelection}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label htmlFor="character-dropdown">Character:</label>
      <select
        id="character-dropdown"
        value={selectedCharacter?.charId || ""}
        onChange={handleCharacterSelection}
      >
        {filteredCharacters.map(({ charId, name }: Character) => (
          <option key={charId} value={charId}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CharacterSelection;
