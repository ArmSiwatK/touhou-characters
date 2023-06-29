/*
<--------------- Imports --------------->
*/

import React, { useState, useEffect } from "react";
import PortraitDisplayRendering from "./PortraitDisplayRendering";
import { PortraitDisplayProps } from "../../utilities/Interfaces";
import { useKeyboardContext } from "../../utilities/KeyboardContext";
import characters from "../../assets/characters.json";
import emotions from "../../assets/emotions.json";

import "./PortraitDisplay.scss";

/*
<--------------- Component --------------->
*/

const PortraitDisplay: React.FC<PortraitDisplayProps> = ({
  selectedCharacter,
  selectedCategory,
  selectedEmotion,
  setSelectedCharacter,
}) => {
  /*
  <--------------- States and Variable --------------->
  */

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isPortraitsLoaded, setIsPortraitsLoaded] = useState<boolean>(false);

  let portraitCache: { [key: string]: HTMLImageElement } = {};

  const { disableKeyBindings } = useKeyboardContext();

  /*
  <--------------- Functions --------------->
  */

  const getFilteredCharacters = () => {
    return selectedCategory === "All"
      ? characters
      : characters.filter(
          (character) => character.category === selectedCategory
        );
  };

  const getNextCharacter = () => {
    const filteredCharacters = getFilteredCharacters();
    const currentIndex = filteredCharacters.findIndex(
      (character) => character.charId === selectedCharacter?.charId
    );
    const nextIndex = (currentIndex + 1) % filteredCharacters.length;
    return filteredCharacters[nextIndex];
  };

  const getPreviousCharacter = () => {
    const filteredCharacters = getFilteredCharacters();
    const currentIndex = filteredCharacters.findIndex(
      (character) => character.charId === selectedCharacter?.charId
    );
    const previousIndex =
      (currentIndex - 1 + filteredCharacters.length) %
      filteredCharacters.length;
    return filteredCharacters[previousIndex];
  };

  const handleNextCharacter = () => {
    setSelectedCharacter(getNextCharacter());
  };

  const handlePreviousCharacter = () => {
    setSelectedCharacter(getPreviousCharacter());
  };

  /*
  <--------------- Preloading Images --------------->
  */

  const preloadCharacterEmotionImages = (characterId: string) => {
    const characterFolder = `./characters/${characterId}/`;

    const promises = emotions.map((emotion) => {
      return new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = () => {
          portraitCache[`${characterId}-${emotion.name}`] = image;
          resolve();
        };
        image.src = `${characterFolder}${characterId}-${emotion.name}.webp`;
      });
    });

    return Promise.all(promises);
  };

  useEffect(() => {
    const preloadImages = async () => {
      setIsPortraitsLoaded(false);

      await Promise.all(
        characters.map((character) =>
          preloadCharacterEmotionImages(character.charId)
        )
      );

      setIsPortraitsLoaded(true);
    };

    preloadImages();
  }, []);

  /*
  <--------------- useEffect Hooks --------------->
  */

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!disableKeyBindings) {
      const handleKeyDown = (event: KeyboardEvent) => {
        const key = event.key.toLowerCase();

        if (key === "a") {
          handlePreviousCharacter();
        } else if (key === "d") {
          handleNextCharacter();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleNextCharacter, handlePreviousCharacter]);

  /*
  <--------------- Rendering --------------->
  */

  const previousCharacter = getPreviousCharacter();
  const nextCharacter = getNextCharacter();

  if (!isPortraitsLoaded) {
    return <div className="portrait-display">Loading...</div>;
  }

  return (
    <PortraitDisplayRendering
      isMobile={isMobile}
      previousCharacter={previousCharacter}
      selectedCharacter={selectedCharacter}
      nextCharacter={nextCharacter}
      selectedEmotion={selectedEmotion}
      setSelectedCharacter={setSelectedCharacter}
      handlePreviousCharacter={handlePreviousCharacter}
      handleNextCharacter={handleNextCharacter}
    />
  );
};

export default PortraitDisplay;
