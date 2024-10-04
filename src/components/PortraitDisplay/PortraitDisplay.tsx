/*
<--------------- Imports --------------->
*/

import React, { useState, useEffect } from "react";
import { getNextCharacter, getPreviousCharacter } from "./PortraitDisplayUtils";
import { PortraitDisplayProps } from "../../utilities/Interfaces";
import { useKeyboardContext } from "../../utilities/KeyboardContext";
import PortraitDisplayRendering from "./PortraitDisplayRendering";
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
  <--------------- Character Functions --------------->
  */

  const handleNextCharacter = () => {
    setSelectedCharacter(getNextCharacter(selectedCharacter, selectedCategory));
  };

  const handlePreviousCharacter = () => {
    setSelectedCharacter(
      getPreviousCharacter(selectedCharacter, selectedCategory)
    );
  };

  const previousCharacter = getPreviousCharacter(
    selectedCharacter,
    selectedCategory
  );
  const nextCharacter = getNextCharacter(selectedCharacter, selectedCategory);

  /*
  <--------------- Preloading Images --------------->
  */
  const preloadImages = async () => {
    setIsPortraitsLoaded(false);
    const results = await Promise.allSettled(characters.map((character) => preloadCharacterEmotionImages(character.charId)));
    results.forEach((result) => { if (result.status === 'rejected') console.warn(result.reason) });
    setIsPortraitsLoaded(true);
  };

  const preloadCharacterEmotionImages = (characterId: string): Promise<PromiseSettledResult<void>[]> => {
    const characterFolder = `./characters/${characterId}/`;

    const promises = emotions.map((emotion) => {
      const image = new Image();
      image.src = `${characterFolder}${characterId}-${emotion.name}.webp`;

      return new Promise<void>((resolve, reject) => {
        image.onload = () => {
          portraitCache[`${characterId}-${emotion.name}`] = image;
          resolve();
        };
        image.onerror = () => {
          console.error(`Failed to load image: ${image.src}`);
          reject(new Error(`Image load failed: ${image.src}`));
        };
      });
    });

    return Promise.allSettled(promises);
  };

  useEffect(() => { preloadImages() }, []);

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
