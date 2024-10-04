/*
<--------------- Imports --------------->
*/

import React, { useState } from "react";
import CharacterSelection from "./components/CharacterSelection/CharacterSelection";
import SearchBar from "./components/SearchBar/SearchBar";
import EmotionButtons from "./components/EmotionButtons/EmotionButtons";
import PortraitDisplay from "./components/PortraitDisplay/PortraitDisplay";
import CharacterProfiles from "./components/CharacterProfiles/CharacterProfiles";
import { Character } from "./utilities/Interfaces";
import { KeyboardProvider } from "./utilities/KeyboardContext";
import characters from "./assets/characters.json";
import "./styles/App.scss";

/*
<--------------- Component --------------->
*/

const App: React.FC = () => {
  /*
  <--------------- States --------------->
  */

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEmotion, setSelectedEmotion] = useState("neutral");
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(
    characters[0]
  );

  /*
  <--------------- Rendering --------------->
  */

  return (
    <KeyboardProvider
      disableKeyBindings={false}
      setDisableKeyBindings={() => { }}
    >
      <div className="app">
        <CharacterSelection
          selectedCharacter={selectedCharacter}
          selectedCategory={selectedCategory}
          setSelectedCharacter={setSelectedCharacter}
          setSelectedCategory={setSelectedCategory}
        />
        <SearchBar
          selectedCategory={selectedCategory}
          setSelectedCharacter={setSelectedCharacter}
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
        <CharacterProfiles
          selectedCharacter={selectedCharacter}
          selectedCategory={selectedCategory}
          setSelectedCharacter={setSelectedCharacter}
        />
      </div>
    </KeyboardProvider>
  );
};

export default App;
