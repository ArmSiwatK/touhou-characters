/*
<--------------- Imports --------------->
*/

import React, { useState, useEffect } from "react";
import CharacterSelection from "./components/CharacterSelection/CharacterSelection";
import EmotionButtons from "./components/EmotionButtons/EmotionButtons";
import PortraitDisplay from "./components/PortraitDisplay/PortraitDisplay";
import characters from "./assets/characters.json";
import "./styles/App.scss";

/*
<--------------- Component --------------->
*/

const App: React.FC = () => {
  /*
  <--------------- States and Variables --------------->
  */

  const [selectedEmotion, setSelectedEmotion] = useState("Neutral");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCharacter, setSelectedCharacter] = useState<any>({
    charId: "reimu",
    name: "Hakurei Reimu",
    title: "Shrine Maiden of Paradise",
  });

  const categories = [
    "All",
    "Protagonists",
    "Embodiment of Scarlet Devil",
    "Perfect Cherry Blossom",
    "Imperishable Night",
    "Phantasmagoria of Flower View",
    "Mountain of Faith",
    "Subterranean Animism",
    "Undefined Fantastic Object",
    "Ten Desires",
    "Double Dealing Character",
    "Legacy of Lunatic Kingdom",
    "Hidden Star in Four Seasons",
    "Wily Beast and Weakest Creature",
    "Unconnected Marketeers",
    "Others",
  ];

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

  const getFilteredCharacters = () => {
    if (selectedCategory === "All") {
      return characters;
    } else {
      return characters.filter(
        (character) => character.category === selectedCategory
      );
    }
  };

  const getImagePath = (charId: string) =>
    `/portraits/${selectedEmotion.toLowerCase()}/${charId}.png`;

  /*
  <--------------- Character Selection Functions --------------->
  */

  const handleNextCharacter = () => {
    const currentIndex = getFilteredCharacters().findIndex(
      (character) => character.charId === selectedCharacter?.charId
    );
    setSelectedCharacter(
      getFilteredCharacters()[
        (currentIndex + 1) % getFilteredCharacters().length
      ]
    );
  };

  const handlePreviousCharacter = () => {
    const currentIndex = getFilteredCharacters().findIndex(
      (character) => character.charId === selectedCharacter?.charId
    );
    setSelectedCharacter(
      getFilteredCharacters()[
        (currentIndex - 1 + getFilteredCharacters().length) %
          getFilteredCharacters().length
      ]
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
        categories={categories}
        selectedCharacter={selectedCharacter}
        selectedCategory={selectedCategory}
        setSelectedCharacter={setSelectedCharacter}
        setSelectedCategory={setSelectedCategory}
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
