import React, { useState } from "react";
import characters from "../../assets/characters.json";
import CharacterSelection from "../CharacterSelection/CharacterSelection";
import EmotionButtons from "../EmotionButtons/EmotionButtons";
import "./PortraitDisplay.scss";

interface Character {
  charId: string;
  name: string;
  title: string;
}

const PortraitDisplay: React.FC = () => {
  /*
  <--------------- States and Variable --------------->
  */
  const [selectedEmotion, setSelectedEmotion] = useState("Neutral");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>({
    charId: "reimu",
    name: "Hakurei Reimu",
    title: "Shrine Maiden of Paradise",
  });

  const emotions = [
    "Angry",
    "Confused",
    "Happy",
    "Neutral",
    "Shocked",
    "Tired",
  ];

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

  const getImagePath = (charId: string) =>
    `/portraits/${selectedEmotion.toLowerCase()}/${charId}.png`;

  const getCharacter = (charId: string) =>
    characters.find((character: Character) => character.charId === charId) ||
    null;

  /*
  <--------------- Rendering --------------->
  */

  return (
    <div className="portrait-display">
      <EmotionButtons
        emotions={emotions}
        selectedEmotion={selectedEmotion}
        handleEmotionSelection={handleEmotionSelection}
      />
      <CharacterSelection
        selectedCharacter={selectedCharacter}
        handleCharacterSelection={handleCharacterSelection}
      />
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
