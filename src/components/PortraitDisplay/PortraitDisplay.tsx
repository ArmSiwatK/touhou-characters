/*
<--------------- Imports and Interfaces --------------->
*/

import React, { useState, useEffect } from "react";
import "./PortraitDisplay.scss";

interface Character {
  charId: string;
  name: string;
  title: string;
  category: string;
}

interface PortraitDisplayProps {
  selectedCharacter: Character;
  characters: Character[];
  selectedEmotion: string;
  handleNextCharacter: () => void;
  handlePreviousCharacter: () => void;
}

/*
<--------------- Component --------------->
*/

const PortraitDisplay: React.FC<PortraitDisplayProps> = ({
  selectedCharacter,
  selectedEmotion,
  handleNextCharacter,
  handlePreviousCharacter,
}) => {
  /*
  <--------------- State --------------->
  */

  const [isMobile, setIsMobile] = useState<boolean>(false);

  /*
  <--------------- Function --------------->
  */

  const getImagePath = (charId: string) =>
    `/portraits/${selectedEmotion.toLowerCase()}/${charId}.png`;

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

  /*
  <--------------- Rendering --------------->
  */

  if (isMobile) {
    return (
      <div className="portrait-display">
        {selectedCharacter && (
          <div className="character-info">
            <h2>{selectedCharacter.name}</h2>
            <div className="portrait-gallery">
              <img
                src={getImagePath(selectedCharacter.charId)}
                alt={`Character portrait - ${selectedCharacter.name}`}
              />
              <div>
                <button onClick={handlePreviousCharacter}>&lt;&lt;&lt;</button>
                <button onClick={handleNextCharacter}>&gt;&gt;&gt;</button>
              </div>
            </div>
            <h2>{selectedCharacter.title}</h2>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="portrait-display">
      {selectedCharacter && (
        <div className="character-info">
          <h2 className="character-name">{selectedCharacter.name}</h2>
          <div className="portrait-gallery">
            <button onClick={handlePreviousCharacter}>&lt;&lt;&lt;</button>
            <img
              src={getImagePath(selectedCharacter.charId)}
              alt={`Character portrait - ${selectedCharacter.name}`}
            />
            <button onClick={handleNextCharacter}>&gt;&gt;&gt;</button>
          </div>
          <h2 className="character-title">{selectedCharacter.title}</h2>
        </div>
      )}
    </div>
  );
};

export default PortraitDisplay;
