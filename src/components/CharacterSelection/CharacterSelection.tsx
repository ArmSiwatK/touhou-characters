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
  /*
  <--------------- Rendering --------------->
  */

  return (
    <div className="character-selection">
      <label htmlFor="characterDropdown">Select Character: </label>
      <select
        id="characterDropdown"
        value={selectedCharacter?.charId || ""}
        onChange={handleCharacterSelection}
      >
        <option value="">Select a character</option>
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
