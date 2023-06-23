/*
<--------------- Imports --------------->
*/

import React, { useState } from "react";
import CharacterSelection from "./components/CharacterSelection/CharacterSelection";
import EmotionButtons from "./components/EmotionButtons/EmotionButtons";
import PortraitDisplay from "./components/PortraitDisplay/PortraitDisplay";
import CharacterProfiles from "./components/CharacterProfiles/CharacterProfiles";
import { Character } from "./utilities";
import "./styles/App.scss";

/*
<--------------- Component --------------->
*/

const App: React.FC = () => {
  /*
  <--------------- States --------------->
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
        selectedCharacter={selectedCharacter}
        selectedCategory={selectedCategory}
        setSelectedCharacter={setSelectedCharacter}
        setSelectedCategory={setSelectedCategory}
      />
      <EmotionButtons
        selectedEmotion={selectedEmotion}
        setSelectedEmotion={setSelectedEmotion}
      />
      <PortraitDisplay
        selectedCharacter={selectedCharacter}
        selectedCategory={selectedCategory}
        selectedEmotion={selectedEmotion}
        setSelectedCharacter={setSelectedCharacter}
      />
      <CharacterProfiles setSelectedCharacter={setSelectedCharacter} />
    </div>
  );
};

export default App;
