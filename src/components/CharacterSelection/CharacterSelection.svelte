<script lang="ts">
  import charactersJson from '../../assets/characters.json';
  import categoriesJson from '../../assets/categories.json';
  import type { Character } from '../../utilities/Interfaces';

  type Props = {
    selectedCategory: string;
    selectedCharacter: Character;
    onSelectCategory: (category: string) => void;
    onSelectCharacter: (character: Character) => void;
  };

  const characters = charactersJson as Character[];
  const categories = categoriesJson as string[];

  let { selectedCategory, selectedCharacter, onSelectCategory, onSelectCharacter }: Props = $props();

  let filteredCharacters = $derived(
    selectedCategory === 'All'
      ? characters
      : characters.filter((character) => character.category === selectedCategory)
  );

  function handleCharacterSelection(event: Event): void {
    const select = event.currentTarget as HTMLSelectElement;
    const selectedCharId = select.value;
    const character = characters.find((item) => item.charId === selectedCharId);

    if (character) {
      onSelectCharacter(character);
    }

    select.blur();
  }

  function handleCategorySelection(event: Event): void {
    const select = event.currentTarget as HTMLSelectElement;
    const category = select.value;
    const firstCharacter =
      category === 'All' ? characters[0] : characters.find((character) => character.category === category);

    onSelectCategory(category);

    if (firstCharacter) {
      onSelectCharacter(firstCharacter);
    }

    select.blur();
  }
</script>

<div class="character-selection">
  <div class="select-block">
    <label for="category-dropdown">Category:</label>
    <select id="category-dropdown" value={selectedCategory} onchange={handleCategorySelection}>
      {#each categories as category (category)}
        <option value={category}>{category}</option>
      {/each}
    </select>
  </div>

  <div class="select-block">
    <label for="character-dropdown">Character:</label>
    <select id="character-dropdown" value={selectedCharacter.charId} onchange={handleCharacterSelection}>
      {#each filteredCharacters as character (character.charId)}
        <option value={character.charId}>{character.name}</option>
      {/each}
    </select>
  </div>
</div>
<style>
  .character-selection {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  .select-block {
    margin: 20px;
  }

  label {
    font-weight: bold;
    margin-right: 10px;
  }

  select {
    width: 150px;
    padding: 10px 16px;
    font-size: 14px;
    color: #333;
    background-color: #f2f2f2;
    border: none;
    border-radius: 20px;
    transition: background-color 0.3s ease;
  }

  select:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    .character-selection {
      flex-direction: column;
    }
  }
</style>
