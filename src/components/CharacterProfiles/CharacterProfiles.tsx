import React from "react";
import { Character } from "../../utilities";
import characters from "../../assets/characters.json";
import "./CharacterProfiles.scss";

interface CharacterProfilesProps {
  setSelectedCharacter: (character: Character) => void;
}

const CharacterProfiles: React.FC<CharacterProfilesProps> = ({
  setSelectedCharacter,
}) => {
  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  return (
    <div>
      {characters.map((character) => (
        <img
          key={character.charId}
          src={`/profiles/${character.charId}.webp`}
          alt={character.name}
          onClick={() => handleCharacterClick(character)}
        />
      ))}
    </div>
  );
};

export default CharacterProfiles;
