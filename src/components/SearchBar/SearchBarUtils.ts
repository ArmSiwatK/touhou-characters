import charactersJson from '../../assets/characters.json';
import type { Character } from '../../utilities/Interfaces';

const characters = charactersJson as Character[];

export function filterCharacters(
  query: string,
  selectedCategory: string,
  characterList: Character[] = characters
): Character[] {
  const normalizedQuery = query.toLowerCase();

  return characterList.filter(({ name, charId, category }) => {
    const isInSelectedCategory = selectedCategory === 'All' || category === selectedCategory;
    const matchesQuery = [name, charId].some((property) =>
      property.toLowerCase().includes(normalizedQuery)
    );

    return isInSelectedCategory && matchesQuery;
  });
}

export function getFilteredSuggestions(query: string, selectedCategory: string): string[] {
  return filterCharacters(query, selectedCategory).map(({ name }) => name);
}