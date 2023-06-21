import React from "react";
import "./PortraitDisplay.scss";

interface PortraitDisplayProps {
  selectedCharacter: any;
  getImagePath: (charId: string) => string;
}

const PortraitDisplay: React.FC<PortraitDisplayProps> = ({
  selectedCharacter,
  getImagePath,
}) => {
  /*
  <--------------- Rendering --------------->
  */

  return (
    <div className="portrait-display">
      {selectedCharacter && (
        <div className="character-info">
          <h2>{selectedCharacter.name}</h2>
          <img
            src={getImagePath(selectedCharacter.charId)}
            alt={`Character portrait - ${selectedCharacter.name}`}
          />
          <h2>{selectedCharacter.title}</h2>
        </div>
      )}
    </div>
  );
};

export default PortraitDisplay;
