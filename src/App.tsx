import React, { useState, useEffect } from "react";
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
  <--------------- Getter Functions --------------->
  */

  const getCharacter = (charId: string) =>
    characters.find((character) => character.charId === charId) || null;

  const getImagePath = (charId: string) =>
    `/portraits/${selectedEmotion.toLowerCase()}/${charId}.png`;

  /*
  <--------------- Character Selection Functions --------------->
  */

  const handleCharacterSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCharId = event.target.value;
    if (selectedCharId !== "") {
      setSelectedCharacter(getCharacter(selectedCharId));
    }
  };

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
  <--------------- Emotion Selection Function --------------->
  */

  const selectEmotion = (forward: boolean) => {
    const currentIndex = emotions.findIndex(
      (emotion) => emotion === selectedEmotion
    );
    const nextIndex =
      (forward ? currentIndex + 1 : currentIndex - 1 + emotions.length) %
      emotions.length;
    setSelectedEmotion(emotions[nextIndex]);
  };

  /*
  <--------------- useEffect Hook --------------->
  */

  useEffect(() => {
    const keyMap: { [key: string]: () => void } = {
      a: handlePreviousCharacter,
      A: handlePreviousCharacter,
      d: handleNextCharacter,
      D: handleNextCharacter,
      w: () => selectEmotion(true),
      W: () => selectEmotion(true),
      s: () => selectEmotion(false),
      S: () => selectEmotion(false),
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const action = keyMap[key];
      if (action) {
        action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNextCharacter, handlePreviousCharacter, selectEmotion]);

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
        setSelectedEmotion={setSelectedEmotion}
      />
      <PortraitDisplay
        characters={characters}
        selectedCharacter={selectedCharacter}
        getImagePath={getImagePath}
        handleNextCharacter={handleNextCharacter}
        handlePreviousCharacter={handlePreviousCharacter}
      />
    </div>
  );
};

export default App;
