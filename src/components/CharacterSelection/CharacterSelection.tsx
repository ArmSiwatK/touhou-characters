import React from "react";
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
  characters: Character[];
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  selectedCharacter,
  handleCharacterSelection,
  characters,
}) => {
  /*
  <--------------- Rendering --------------->
  */

  return (
    <div className="character-selection">
      <label htmlFor="character-dropdown">Character:</label>
      <select
        id="character-dropdown"
        value={selectedCharacter?.charId || ""}
        onChange={handleCharacterSelection}
      >
        {characters.map(({ charId, name }: Character) => (
          <option key={charId} value={charId}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CharacterSelection;
