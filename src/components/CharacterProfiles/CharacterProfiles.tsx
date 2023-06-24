/*
<--------------- Imports and Interface --------------->
*/

import React from "react";
import { Character } from "../../utilities";
import characters from "../../assets/characters.json";
import "./CharacterProfiles.scss";

interface CharacterProfilesProps {
  selectedCharacter: Character;
  selectedCategory: string;
  setSelectedCharacter: (character: Character) => void;
}

/*
<--------------- Component --------------->
*/

const CharacterProfiles: React.FC<CharacterProfilesProps> = ({
  selectedCharacter,
  selectedCategory,
  setSelectedCharacter,
}) => {
  /*
  <--------------- Functions --------------->
  */
  const getFilteredCharacters = () => {
    return selectedCategory === "All"
      ? characters
      : characters.filter(
          (character) => character.category === selectedCategory
        );
  };

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  /*
  <--------------- Rendering --------------->
  */

  const filteredCharacters = getFilteredCharacters();

  return (
    <div className="character-profiles">
      {filteredCharacters.map((character) => (
        <div
          className={`character-profile ${
            selectedCharacter.charId === character.charId ? "selected" : ""
          }`}
          key={character.charId}
          onClick={() => handleCharacterClick(character)}
        >
          <img
            src={`/profiles/${character.charId}.webp`}
            alt={character.name}
          />
        </div>
      ))}
    </div>
  );
};

export default CharacterProfiles;
