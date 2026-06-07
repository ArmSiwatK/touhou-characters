<script lang="ts">
  import charactersJson from '../../assets/characters.json';
  import categoriesJson from '../../assets/categories.json';
  import type { Character } from '../../utilities/Interfaces';
  import './CharacterSelection.scss';

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