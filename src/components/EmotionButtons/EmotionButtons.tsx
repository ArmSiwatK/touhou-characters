import React, { useState, useEffect } from "react";
import "./EmotionButtons.scss";

interface EmotionButtonsProps {
  emotions: string[];
  selectedEmotion: string;
  setSelectedEmotion: (emotion: string) => void;
}

const EmotionButtons: React.FC<EmotionButtonsProps> = ({
  emotions,
  selectedEmotion,
  setSelectedEmotion,
}) => {
  /*
  <--------------- State --------------->
  */

  const [isMobile, setIsMobile] = useState<boolean>(false);

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
      <div className="emotion-buttons" id="responsive">
        <label htmlFor="emotion-dropdown">Select Emotion:</label>
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
    );
  }

  return (
    <div className="emotion-buttons">
      {emotions.map((emotion) => (
        <button
          key={emotion}
          onClick={() => setSelectedEmotion(emotion)}
          className={selectedEmotion === emotion ? "selected" : ""}
        >
          {emotion}
        </button>
      ))}
    </div>
  );
};

export default EmotionButtons;
