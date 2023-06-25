/*
<--------------- Imports and Interface --------------->
*/

import React, { useState, useEffect } from "react";
import { emotions } from "../../utilities";
import "./EmotionButtons.scss";

interface EmotionButtonsProps {
  selectedEmotion: string;
  setSelectedEmotion: (emotion: string) => void;
}

/*
<--------------- Component --------------->
*/

const EmotionButtons: React.FC<EmotionButtonsProps> = ({
  selectedEmotion,
  setSelectedEmotion,
}) => {
  /*
  <--------------- State --------------->
  */

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [currentEmotionIndex, setCurrentEmotionIndex] = useState<number>(3);

  /*
  <--------------- Function --------------->
  */

  const selectEmotion = (forward: boolean) => {
    const nextIndex =
      (currentEmotionIndex + (forward ? 1 : -1) + emotions.length) %
      emotions.length;
    setCurrentEmotionIndex(nextIndex);
    setSelectedEmotion(emotions[nextIndex].name);
  };

  /*
  <--------------- useEffect Hooks --------------->
  */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      key === "w" ? selectEmotion(true) : key === "s" && selectEmotion(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentEmotionIndex]);

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

  return (
    <div className="emotion-buttons">
      {isMobile ? (
        <div className="responsive">
          <button onClick={() => selectEmotion(false)}>&#8249;</button>
          <div className="selected-emoji">
            {emotions[currentEmotionIndex].emoji}
          </div>
          <button onClick={() => selectEmotion(true)}>&#8250;</button>
        </div>
      ) : (
        emotions.map((emotion) => (
          <button
            key={emotion.name}
            onClick={() => setSelectedEmotion(emotion.name)}
            className={selectedEmotion === emotion.name ? "selected" : ""}
          >
            {emotion.emoji}
          </button>
        ))
      )}
    </div>
  );
};

export default EmotionButtons;
