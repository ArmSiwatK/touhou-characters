/*
<--------------- Imports --------------->
*/

import React, { useState, useEffect } from "react";
import CharacterSelection from "./components/CharacterSelection/CharacterSelection";
import EmotionButtons from "./components/EmotionButtons/EmotionButtons";
import PortraitDisplay from "./components/PortraitDisplay/PortraitDisplay";
import CharacterProfiles from "./components/CharacterProfiles/CharacterProfiles";
import { Character, emotions } from "./utilities";
import characters from "./assets/characters.json";
import "./styles/App.scss";

/*
<--------------- Component --------------->
*/

const App: React.FC = () => {
  /*
  <--------------- States --------------->
  */

  const [selectedEmotion, setSelectedEmotion] = useState("neutral");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCharacter, setSelectedCharacter] = useState<Character>({
    charId: "reimu",
    name: "Hakurei Reimu",
    title: "Shrine Maiden of Paradise",
    category: "Protagonists",
    wikiUrl: "https://en.touhouwiki.net/wiki/Reimu_Hakurei",
  });

  /*
  <--------------- useEffect Hook --------------->
  */

  useEffect(() => {
    const preloadCharacterImages = (characterId: string) => {
      const characterFolder = `./characters/${characterId}/`;
      emotions.forEach((emotion) => {
        const image = new Image();
        image.src = `${characterFolder}${characterId}-${emotion.name}.webp`;
      });
      // Preload the profile image
      const profileImage = new Image();
      profileImage.src = `${characterFolder}${characterId}-profile.webp`;
    };

    // Preload images for all characters
    characters.forEach((character) => {
      preloadCharacterImages(character.charId);
    });
  }, []);

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
      <CharacterProfiles
        selectedCharacter={selectedCharacter}
        selectedCategory={selectedCategory}
        setSelectedCharacter={setSelectedCharacter}
      />
    </div>
  );
};

export default App;
