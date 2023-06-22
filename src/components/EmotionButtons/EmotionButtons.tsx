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

  /*
  <--------------- Function --------------->
  */

  const selectEmotion = (forward: boolean) => {
    const currentIndex = emotions.indexOf(selectedEmotion);
    const nextIndex =
      (currentIndex + (forward ? 1 : -1) + emotions.length) % emotions.length;
    setSelectedEmotion(emotions[nextIndex]);
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
  }, [selectedEmotion]);

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
        <div>
          <label htmlFor="emotion-dropdown">Emotion:</label>
          <select
            id="emotion-dropdown"
            value={selectedEmotion}
            onChange={(e) => setSelectedEmotion(e.target.value)}
          >
            {emotions.map((emotion) => (
              <option key={emotion} value={emotion}>
                {emotion}
              </option>
            ))}
          </select>
        </div>
      ) : (
        emotions.map((emotion) => (
          <button
            key={emotion}
            onClick={() => setSelectedEmotion(emotion)}
            className={selectedEmotion === emotion ? "selected" : ""}
          >
            {emotion}
          </button>
        ))
      )}
    </div>
  );
};

export default EmotionButtons;
