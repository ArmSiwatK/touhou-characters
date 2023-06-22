/*
<--------------- Imports --------------->
*/

import React, { useState } from "react";
import CharacterSelection from "./components/CharacterSelection/CharacterSelection";
import EmotionButtons from "./components/EmotionButtons/EmotionButtons";
import PortraitDisplay from "./components/PortraitDisplay/PortraitDisplay";
import { Character, categories, emotions } from "./utilities";
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
  const [selectedCharacter, setSelectedCharacter] = useState<Character>({
    charId: "reimu",
    name: "Hakurei Reimu",
    title: "Shrine Maiden of Paradise",
    category: "Protagonists",
  });

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
