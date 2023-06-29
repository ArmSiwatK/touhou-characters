/*
<--------------- Imports --------------->
*/

import { Character } from "../../utilities/utilities";
import characters from "../../assets/characters.json";

/*
<--------------- Functions --------------->
*/

export const filterCharacters = (
  characters: Character[],
  query: string,
  selectedCategory: string
) => {
  return characters.filter(({ name, charId, category }) => {
    const isInSelectedCategory =
      selectedCategory === "All" || category === selectedCategory;
    const matchesQuery = [name, charId.toString()].some((property) =>
      property.toLowerCase().includes(query.toLowerCase())
    );
    return isInSelectedCategory && matchesQuery;
  });
};

export const getFilteredSuggestions = (
  query: string,
  selectedCategory: string
) => {
  const filteredCharacters = filterCharacters(
    characters,
    query,
    selectedCategory
  );
  return filteredCharacters.map(({ name }) => name);
};
