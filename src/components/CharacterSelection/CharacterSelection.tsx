/*
<--------------- Imports and Interface --------------->
*/

import React from "react";
import { Character, categories } from "../../utilities";
import characters from "../../assets/characters.json";
import "./CharacterSelection.scss";

interface CharacterSelectionProps {
  selectedCharacter: Character | null;
  selectedCategory: string;
  setSelectedCharacter: (character: Character) => void;
  setSelectedCategory: (category: string) => void;
}

/*
<--------------- Component --------------->
*/

const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  selectedCharacter,
  selectedCategory,
  setSelectedCharacter,
  setSelectedCategory,
}) => {
  /*
  <--------------- Variable --------------->
  */

  const filteredCharacters =
    selectedCategory === "All"
      ? characters
      : characters.filter(
          (character) => character.category === selectedCategory
        );

  /*
  <--------------- Functions --------------->
  */

  const handleCharacterSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCharId = event.target.value;
    if (selectedCharId !== "") {
      const selectedCharacter = characters.find(
        (character) => character.charId === selectedCharId
      );
      if (selectedCharacter) {
        setSelectedCharacter(selectedCharacter);
      }
    }

    event.target.blur();
  };

  const handleCategorySelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);

    const firstCharacter =
      selectedCategory === "All"
        ? characters[0]
        : characters.find(
            (character) => character.category === selectedCategory
          );

    if (firstCharacter) {
      setSelectedCharacter(firstCharacter);
    }

    event.target.blur();
  };

  /*
  <--------------- Rendering --------------->
  */

  return (
    <div className="character-selection">
      <div className="select-block">
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
      </div>

      <div className="select-block">
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
    </div>
  );
};

export default CharacterSelection;
