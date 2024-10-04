/*
<--------------- Imports and Interface --------------->
*/

import React, { useEffect, useState } from "react";
import { Character, CharacterProfilesProps } from "../../utilities/Interfaces";
import characters from "../../assets/characters.json";
import "./CharacterProfiles.scss";

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
  const [isProfilesLoaded, setIsProfilesLoaded] = useState<boolean>(false);

  const filteredCharacters =
    selectedCategory === "All"
      ? characters
      : characters.filter(
        (character) => character.category === selectedCategory
      );
  const gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
  let profileCache: { [key: string]: HTMLImageElement } = {};

  /*
  <--------------- Function --------------->
  */

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);

    if (selectedCategory === "All" || selectedCategory === "Others") {
      const portraitDisplay = document.getElementById("character-click-target");
      if (portraitDisplay) {
        portraitDisplay.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  /*
  <--------------- Grid Sizing --------------->
  */

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

  useEffect(() => {
    handleResize();
  }, [columnCount, filteredCharacters.length]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /*
  <--------------- Preloading Images --------------->
  */

  const preloadCharacterProfileImages = async () => {
    setIsProfilesLoaded(false);

    const results = await Promise.allSettled(
      characters.map(loadImage)
    );

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.warn(`Image loading failed for character ${characters[index].charId}: ${result.reason}`);
      }
    });

    setIsProfilesLoaded(true);
  };

  const loadImage = (character: Character): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const image = new Image();
      image.src = `/characters/${character.charId}/${character.charId}-profile.webp`;

      image.onload = () => {
        profileCache[character.charId] = image;
        resolve();
      };

      image.onerror = () => {
        console.error(`Failed to load image for character: ${character.charId}`);
        reject(new Error(`Failed to load image for character: ${character.charId}`));
      };
    });
  };

  useEffect(() => {
    preloadCharacterProfileImages();
  }, []);

  /*
  <--------------- Rendering --------------->
  */

  if (!isProfilesLoaded) {
    return;
  }

  return shouldRender ? (
    <div
      className="character-profiles"
      style={{ gridTemplateColumns: gridTemplateColumns }}
    >
      {filteredCharacters.map((character) => (
        <div
          className={`character-profile ${selectedCharacter.charId === character.charId ? "selected" : ""
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
