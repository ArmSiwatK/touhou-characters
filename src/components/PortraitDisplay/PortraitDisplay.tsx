import React, { useState } from "react";
import characters from "../../assets/characters.json";
import "./PortraitDisplay.scss";

const emotions = ["Angry", "Confused", "Happy", "Neutral", "Shocked", "Tired"];

interface Character {
  charId: string;
  name: string;
  title: string;
}

const PortraitDisplay: React.FC = () => {
  /*
  <--------------- States --------------->
  */
  const [selectedEmotion, setSelectedEmotion] = useState<string>("Neutral");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>({
    charId: "reimu",
    name: "Hakurei Reimu",
    title: "Shrine Maiden of Paradise",
  });

  /*
  <--------------- Functions --------------->
  */

  const handleEmotionSelection = (emotion: string) => {
    setSelectedEmotion(emotion);
  };

  const handleCharacterSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCharId = event.target.value;

    if (selectedCharId !== "") {
      const character = getCharacter(selectedCharId);
      setSelectedCharacter(character);
    }
  };

  const getImagePath = (charId: string) => {
    return `/portraits/${selectedEmotion.toLowerCase()}/${charId}.png`;
  };

  const getCharacter = (charId: string) => {
    return (
      characters.find((character: Character) => character.charId === charId) ||
      null
    );
  };

  /*
  <--------------- Rendering --------------->
  */

  return (
    <div className="portrait-display">
      <div className="emotion-buttons">
        {emotions.map((emotion) => (
          <button
            key={emotion}
            onClick={() => handleEmotionSelection(emotion)}
            className={selectedEmotion === emotion ? "selected" : ""}
          >
            {emotion}
          </button>
        ))}
      </div>
      <div className="character-dropdown">
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
      <div>
        {selectedCharacter && (
          <div className="character-info">
            <h2>{selectedCharacter.name}</h2>
            <img
              src={getImagePath(selectedCharacter.charId)}
              alt={`Character portrait - ${selectedCharacter.name}`}
            />
            <h2>{selectedCharacter.title}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortraitDisplay;
