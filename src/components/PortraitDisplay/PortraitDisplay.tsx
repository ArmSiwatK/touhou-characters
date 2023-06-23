/*
<--------------- Imports and Interface --------------->
*/

import React, { useState, useEffect } from "react";
import { Character } from "../../utilities";
import characters from "../../assets/characters.json";
import "./PortraitDisplay.scss";

interface PortraitDisplayProps {
  selectedCharacter: Character;
  selectedCategory: string;
  selectedEmotion: string;
  setSelectedCharacter: (character: Character) => void;
}

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
  <--------------- State --------------->
  */

  const [isMobile, setIsMobile] = useState<boolean>(false);

  /*
  <--------------- Function --------------->
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
  <--------------- useEffect Hook --------------->
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
  }, [handleNextCharacter, handlePreviousCharacter]);

  /*
  <--------------- Rendering --------------->
  */

  const previousCharacter = getPreviousCharacter();
  const nextCharacter = getNextCharacter();

  return (
    <div className="portrait-display">
      {selectedCharacter && (
        <div className="character-info">
          <h2 className="character-name">{selectedCharacter.name}</h2>
          <div className="portrait-gallery">
            {[previousCharacter, selectedCharacter, nextCharacter].map(
              (character) => (
                <div
                  className={`portrait-item ${
                    character.charId === selectedCharacter.charId
                      ? "selected"
                      : "side"
                  }`}
                  key={character.charId}
                  onClick={() => setSelectedCharacter(character)}
                >
                  <img
                    src={
                      character.charId === selectedCharacter.charId
                        ? `/portraits/${selectedEmotion.toLowerCase()}/${
                            character.charId
                          }.png`
                        : `/portraits/neutral/${character.charId}.png`
                    }
                    alt={`Character portrait – ${character.name}`}
                  />
                </div>
              )
            )}
            {isMobile && (
              <div>
                <button onClick={handlePreviousCharacter}>&lt;&lt;&lt;</button>
                <button onClick={handleNextCharacter}>&gt;&gt;&gt;</button>
              </div>
            )}
          </div>
          <h2 className="character-title">{selectedCharacter.title}</h2>
        </div>
      )}
    </div>
  );
};

export default PortraitDisplay;
