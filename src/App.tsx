/*
<--------------- Imports and Interface --------------->
*/

import React, { useState, useEffect } from "react";
import CharacterSelection from "./components/CharacterSelection/CharacterSelection";
import EmotionButtons from "./components/EmotionButtons/EmotionButtons";
import PortraitDisplay from "./components/PortraitDisplay/PortraitDisplay";
import characters from "./assets/characters.json";
import "./styles/App.scss";

interface Character {
  charId: string;
  name: string;
  title: string;
  category: string;
}

/*
<--------------- Component --------------->
*/

const App: React.FC = () => {
  /*
  <--------------- States and Variables --------------->
  */

  const [selectedEmotion, setSelectedEmotion] = useState("Neutral");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCharacter, setSelectedCharacter] = useState<Character>({
    charId: "reimu",
    name: "Hakurei Reimu",
    title: "Shrine Maiden of Paradise",
    category: "Protagonists",
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
        selectedCategory={selectedCategory}
        selectedEmotion={selectedEmotion}
        setSelectedCharacter={setSelectedCharacter}
      />
    </div>
  );
};

export default App;
