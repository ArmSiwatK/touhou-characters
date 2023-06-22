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

  const handleNextCharacter = () => {
    const currentIndex = characters.findIndex(
      (character) => character.charId === selectedCharacter?.charId
    );
    setSelectedCharacter(characters[(currentIndex + 1) % characters.length]);
  };

  const handlePreviousCharacter = () => {
    const currentIndex = characters.findIndex(
      (character) => character.charId === selectedCharacter?.charId
    );
    setSelectedCharacter(
      characters[(currentIndex - 1 + characters.length) % characters.length]
    );
  };

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
        characters={characters}
        handleNextCharacter={handleNextCharacter}
        handlePreviousCharacter={handlePreviousCharacter}
      />
    </div>
  );
};

export default App;
