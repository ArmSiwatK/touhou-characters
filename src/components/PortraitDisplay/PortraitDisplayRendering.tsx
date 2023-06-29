/*
<--------------- Imports --------------->
*/

import React from "react";
import { PortraitDisplayRenderingProps } from "../../utilities/Interfaces";

/*
<--------------- Component --------------->
*/

const PortraitDisplayRendering: React.FC<PortraitDisplayRenderingProps> = ({
  isMobile,
  previousCharacter,
  selectedCharacter,
  nextCharacter,
  selectedEmotion,
  setSelectedCharacter,
  handlePreviousCharacter,
  handleNextCharacter,
}) => {
  /*
  <--------------- Rendering --------------->
  */
  return (
    <div className="portrait-display">
      {selectedCharacter && (
        <div className="character-info">
          <h2 className="character-name">{selectedCharacter.name}</h2>
          <div className="portrait-gallery">
            {!isMobile &&
              [previousCharacter, selectedCharacter, nextCharacter].map(
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
                    {character.charId === selectedCharacter.charId ? (
                      <a
                        href={selectedCharacter.wikiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`/characters/${character.charId}/${character.charId}-${selectedEmotion}.webp`}
                          alt={`Character portrait – ${character.name}`}
                        />
                      </a>
                    ) : (
                      <img
                        src={`/characters/${character.charId}/${character.charId}-neutral.webp`}
                        alt={`Character portrait – ${character.name}`}
                      />
                    )}
                  </div>
                )
              )}
            {isMobile && (
              <>
                <div className="portrait-item selected">
                  <a
                    href={selectedCharacter.wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`/characters/${selectedCharacter.charId}/${selectedCharacter.charId}-${selectedEmotion}.webp`}
                      alt={`Character portrait – ${selectedCharacter.name}`}
                    />
                  </a>
                </div>
                <h2 className="character-title">{selectedCharacter.title}</h2>
                <div className="gallery-buttons">
                  <button onClick={handlePreviousCharacter}>◄</button>
                  <button onClick={handleNextCharacter}>►</button>
                </div>
              </>
            )}
          </div>
          {!isMobile && (
            <h2 className="character-title">{selectedCharacter.title}</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default PortraitDisplayRendering;
