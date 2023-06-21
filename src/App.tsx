import React, { useState } from "react";
import CharacterSelection from "./components/CharacterSelection/CharacterSelection";
import EmotionButtons from "./components/EmotionButtons/EmotionButtons";
import PortraitDisplay from "./components/PortraitDisplay/PortraitDisplay";
import characters from "./assets/characters.json";
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
    "Special",
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
      <CharacterSelection
        characters={characters}
        selectedCharacter={selectedCharacter}
        handleCharacterSelection={handleCharacterSelection}
      />
      <EmotionButtons
        emotions={emotions}
        selectedEmotion={selectedEmotion}
        handleEmotionSelection={handleEmotionSelection}
      />
      <PortraitDisplay
        selectedCharacter={selectedCharacter}
        getImagePath={getImagePath}
      />
    </div>
  );
};

export default App;
