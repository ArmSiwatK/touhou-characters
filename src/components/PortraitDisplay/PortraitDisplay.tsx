import React, { useState } from "react";
import CharacterSelection from "../CharacterSelection/CharacterSelection";
import EmotionButtons from "../EmotionButtons/EmotionButtons";
import characters from "../../assets/characters.json";
import "./PortraitDisplay.scss";

const PortraitDisplay: React.FC = () => {
  /*
  <--------------- States and Variable --------------->
  */
  const [selectedEmotion, setSelectedEmotion] = useState("Neutral");
  const [selectedCharacter, setSelectedCharacter] = useState<any>({
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
    setSelectedCharacter(getCharacter(selectedCharId));
  };

  const getImagePath = (charId: string) =>
    `/portraits/${selectedEmotion.toLowerCase()}/${charId}.png`;

  const getCharacter = (charId: string) =>
    characters.find((character) => character.charId === charId) || null;

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
  );
};

export default PortraitDisplay;
