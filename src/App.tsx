import React, { useState } from "react";
import characters from "./assets/characters.json";
import EmotionButtons from "./components/EmotionButtons/EmotionButtons";
import CharacterSelection from "./components/CharacterSelection/CharacterSelection";
import PortraitDisplay from "./components/PortraitDisplay/PortraitDisplay";
import "./styles/App.scss";

const App: React.FC = () => {
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
    "Sad",
    "Surprised",
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
      setSelectedCharacter(getCharacter(selectedCharId));
    }
  };

  const getCharacter = (charId: string) =>
    characters.find((character) => character.charId === charId) || null;

  const getImagePath = (charId: string) =>
    `/portraits/${selectedEmotion.toLowerCase()}/${charId}.png`;

  /*
  <--------------- Rendering --------------->
  */

  return (
    <div className="app">
      <EmotionButtons
        emotions={emotions}
        selectedEmotion={selectedEmotion}
        handleEmotionSelection={handleEmotionSelection}
      />
      <CharacterSelection
        selectedCharacter={selectedCharacter}
        handleCharacterSelection={handleCharacterSelection}
      />
      <PortraitDisplay
        selectedCharacter={selectedCharacter}
        getImagePath={getImagePath}
      />
    </div>
  );
};

export default App;
