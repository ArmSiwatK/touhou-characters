import charactersJson from '../../assets/characters.json';
import type { Character } from '../../utilities/Interfaces';

const characters = charactersJson as Character[];

function getFilteredCharacters(selectedCategory: string): Character[] {
  return selectedCategory === 'All'
    ? characters
    : characters.filter((character) => character.category === selectedCategory);
}

export function getNextCharacter(selectedCharacter: Character, selectedCategory: string): Character {
  const filteredCharacters = getFilteredCharacters(selectedCategory);
  const currentIndex = filteredCharacters.findIndex(
    (character) => character.charId === selectedCharacter.charId
  );
  const nextIndex = (currentIndex + 1) % filteredCharacters.length;

  return filteredCharacters[nextIndex] ?? selectedCharacter;
}

export function getPreviousCharacter(selectedCharacter: Character, selectedCategory: string): Character {
  const filteredCharacters = getFilteredCharacters(selectedCategory);
  const currentIndex = filteredCharacters.findIndex(
    (character) => character.charId === selectedCharacter.charId
  );
  const previousIndex = (currentIndex - 1 + filteredCharacters.length) % filteredCharacters.length;

  return filteredCharacters[previousIndex] ?? selectedCharacter;
}