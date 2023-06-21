import React from "react";
import "./EmotionButtons.scss";

interface EmotionButtonsProps {
  emotions: string[];
  selectedEmotion: string;
  handleEmotionSelection: (emotion: string) => void;
}

const EmotionButtons: React.FC<EmotionButtonsProps> = ({
  emotions,
  selectedEmotion,
  handleEmotionSelection,
}) => {
  return (
    <div className="emotion-buttons">
      {emotions.map((emotion) => (
        <button
          key={emotion}
          onClick={() => handleEmotionSelection(emotion)}
          className={selectedEmotion === emotion ? "selected" : ""}
        >
          {emotion}
        </button>
      ))}
    </div>
  );
};

export default EmotionButtons;
