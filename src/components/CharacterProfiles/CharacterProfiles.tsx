import React from "react";
import { Character } from "../../utilities";
import characters from "../../assets/characters.json";
import "./CharacterProfiles.scss";

interface CharacterProfilesProps {
  selectedCharacter: Character;
  selectedCategory: string;
  setSelectedCharacter: (character: Character) => void;
}

const CharacterProfiles: React.FC<CharacterProfilesProps> = ({
  selectedCharacter,
  selectedCategory,
  setSelectedCharacter,
}) => {
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

  const filteredCharacters = getFilteredCharacters();

  return (
    <div className="character-profiles">
      {filteredCharacters.map((character) => (
        <img
          key={character.charId}
          src={`/profiles/${character.charId}.webp`}
          alt={character.name}
          onClick={() => handleCharacterClick(character)}
          className={`character-profile ${
            selectedCharacter.charId === character.charId ? "selected" : ""
          }`}
        />
      ))}
    </div>
  );
};

export default CharacterProfiles;
