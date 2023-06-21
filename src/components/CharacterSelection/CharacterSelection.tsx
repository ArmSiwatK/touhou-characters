import React from "react";
import characters from "../../assets/characters.json";
import "./CharacterSelection.scss";

interface Character {
  charId: string;
  name: string;
  title: string;
}

interface CharacterSelectionProps {
  selectedCharacter: Character | null;
  handleCharacterSelection: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  selectedCharacter,
  handleCharacterSelection,
}) => {
  return (
    <div className="character-selection">
      <label htmlFor="characterDropdown">Select Character: </label>
      <select
        id="characterDropdown"
        value={selectedCharacter?.charId || ""}
        onChange={handleCharacterSelection}
      >
        <option value="">Select a character</option>
        {characters.map((character: Character) => (
          <option key={character.charId} value={character.charId}>
            {character.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CharacterSelection;
