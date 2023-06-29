/*
<--------------- Imports --------------->
*/

import { Character } from "../../utilities/Interfaces";
import characters from "../../assets/characters.json";

/*
<--------------- Functions --------------->
*/

const getFilteredCharacters = (selectedCategory: string): Character[] => {
  return selectedCategory === "All"
    ? characters
    : characters.filter((character) => character.category === selectedCategory);
};

export const getNextCharacter = (
  selectedCharacter: Character,
  selectedCategory: string
): Character => {
  const filteredCharacters = getFilteredCharacters(selectedCategory);
  const currentIndex = filteredCharacters.findIndex(
    (character) => character.charId === selectedCharacter?.charId
  );
  const nextIndex = (currentIndex + 1) % filteredCharacters.length;
  return filteredCharacters[nextIndex];
};

export const getPreviousCharacter = (
  selectedCharacter: Character,
  selectedCategory: string
): Character => {
  const filteredCharacters = getFilteredCharacters(selectedCategory);
  const currentIndex = filteredCharacters.findIndex(
    (character) => character.charId === selectedCharacter?.charId
  );
  const previousIndex =
    (currentIndex - 1 + filteredCharacters.length) % filteredCharacters.length;
  return filteredCharacters[previousIndex];
};
