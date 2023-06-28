/*
<--------------- Imports and Interface --------------->
*/

import React, { useEffect, useState } from "react";
import { Character } from "../../utilities";
import characters from "../../assets/characters.json";
import "./CharacterProfiles.scss";

interface CharacterProfilesProps {
  selectedCharacter: Character;
  selectedCategory: string;
  setSelectedCharacter: (character: Character) => void;
}

/*
<--------------- Component --------------->
*/

const CharacterProfiles: React.FC<CharacterProfilesProps> = ({
  selectedCharacter,
  selectedCategory,
  setSelectedCharacter,
}) => {
  /*
  <--------------- States and Variables --------------->
  */

  const [columnCount, setColumnCount] = useState(9);
  const [shouldRender, setShouldRender] = useState(true);

  const filteredCharacters =
    selectedCategory === "All"
      ? characters
      : characters.filter(
          (character) => character.category === selectedCategory
        );
  const gridTemplateColumns = `repeat(${columnCount}, 1fr)`;

  /*
  <--------------- Functions --------------->
  */

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleResize = () => {
    const screenWidth = window.innerWidth;

    if (filteredCharacters.length > columnCount) {
      if (screenWidth >= 1575) {
        setColumnCount(9);
      } else if (screenWidth >= 1425) {
        setColumnCount(8);
      } else if (screenWidth >= 1250) {
        setColumnCount(7);
      } else if (screenWidth >= 1100) {
        setColumnCount(6);
      } else if (screenWidth >= 940) {
        setColumnCount(5);
      } else {
        setColumnCount(4);
      }
    } else {
      setColumnCount(filteredCharacters.length);
    }

    setShouldRender(screenWidth >= 768);
  };

  /*
  <--------------- useEffect Hook --------------->
  */

  useEffect(() => {
    handleResize();
  }, [columnCount, filteredCharacters.length]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const preloadCharacterProfileImages = (characterId: string) => {
      const characterFolder = `./characters/${characterId}/`;
      const profileImage = new Image();
      profileImage.src = `${characterFolder}${characterId}-profile.webp`;
    };

    characters.forEach((character) => {
      preloadCharacterProfileImages(character.charId);
    });
  }, []);

  /*
  <--------------- Rendering --------------->
  */

  return shouldRender ? (
    <div
      className="character-profiles"
      style={{ gridTemplateColumns: gridTemplateColumns }}
    >
      {filteredCharacters.map((character) => (
        <div
          className={`character-profile ${
            selectedCharacter.charId === character.charId ? "selected" : ""
          }`}
          key={character.charId}
          onClick={() => handleCharacterClick(character)}
        >
          <img
            src={`/characters/${character.charId}/${character.charId}-profile.webp`}
            alt={character.name}
          />
        </div>
      ))}
    </div>
  ) : null;
};

export default CharacterProfiles;
