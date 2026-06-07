<script lang="ts">
  import { tick } from 'svelte';
  import charactersJson from '../../assets/characters.json';
  import type { Character } from '../../utilities/Interfaces';
  import { filterCharacters, getFilteredSuggestions } from './SearchBarUtils';

  type Props = {
    selectedCategory: string;
    onSelectCharacter: (character: Character) => void;
    onDisableKeyBindings: (disabled: boolean) => void;
  };

  const characters = charactersJson as Character[];

  let { selectedCategory, onSelectCharacter, onDisableKeyBindings }: Props = $props();

  let query = $state('');
  let suggestions = $state<string[]>([]);
  let showSuggestions = $state(false);
  let selectedSuggestionIndex = $state(-1);

  function handleSearch(): void {
    const filteredCharacters = filterCharacters(query, selectedCategory);

    if (filteredCharacters[0]) {
      onSelectCharacter(filteredCharacters[0]);
    }
  }

  function handleInput(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;

    query = input.value;
    selectedSuggestionIndex = -1;
    suggestions = getFilteredSuggestions(query, selectedCategory);
    showSuggestions = query !== '';
  }

  function selectSuggestion(suggestion: string): void {
    query = suggestion;
    showSuggestions = false;

    const character = characters.find(({ name, charId }) =>
      [name, charId].some((property) => property.toLowerCase().includes(suggestion.toLowerCase()))
    );

    onSelectCharacter(character ?? characters[0]);
  }

  async function moveSelectedSuggestion(nextIndex: number): Promise<void> {
    selectedSuggestionIndex = nextIndex;
    await tick();
    document.querySelector('.suggestions .selected')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    });
  }

  function handleKeydown(event: KeyboardEvent): void {
    const suggestionCount = suggestions.length;

    if (event.key === 'ArrowDown' && suggestionCount > 0) {
      event.preventDefault();
      void moveSelectedSuggestion((selectedSuggestionIndex + 1) % suggestionCount);
    } else if (event.key === 'ArrowUp' && suggestionCount > 0) {
      event.preventDefault();
      void moveSelectedSuggestion((selectedSuggestionIndex - 1 + suggestionCount) % suggestionCount);
    } else if (event.key === 'Enter') {
      event.preventDefault();

      if (selectedSuggestionIndex !== -1 && suggestions[selectedSuggestionIndex]) {
        selectSuggestion(suggestions[selectedSuggestionIndex]);
      } else {
        handleSearch();
      }

      showSuggestions = false;
    }
  }

  $effect(() => {
    function handleClickOutside(event: MouseEvent): void {
      const searchBar = document.getElementById('search-bar');

      if (searchBar && event.target instanceof Node && !searchBar.contains(event.target)) {
        showSuggestions = false;
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });
</script>

<div class="search-bar" id="search-bar">
  <input
    type="text"
    placeholder="Search characters..."
    value={query}
    oninput={handleInput}
    onfocus={() => onDisableKeyBindings(true)}
    onblur={() => onDisableKeyBindings(false)}
    onkeydown={handleKeydown}
  />

  {#if showSuggestions}
    <ul class="suggestions">
      {#each suggestions as suggestion, index (`${suggestion}-${index}`)}
        <li class:selected={index === selectedSuggestionIndex}>
          <button
            type="button"
            onclick={() => selectSuggestion(suggestion)}
            onmouseenter={() => (selectedSuggestionIndex = index)}
          >
            {suggestion}
          </button>
        </li>
      {/each}
    </ul>
  {/if}

  <button type="button" onclick={handleSearch}>Search</button>
</div>
<style>
  .search-bar {
    display: flex;
    align-items: center;
    margin-bottom: 45px;
    position: relative;
  }

  input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
    z-index: 2;
  }

  .suggestions {
    position: absolute;
    top: 125%;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 0;
    margin: 0;
    list-style: none;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  li {
    cursor: pointer;
  }

  li:hover,
  li.selected {
    background-color: #f2f2f2;
  }

  li button {
    width: 100%;
    padding: 8px 12px;
    border: 0;
    border-radius: 0;
    color: #333;
    background: transparent;
    text-align: left;
    cursor: pointer;
  }

  .search-bar > button {
    padding: 10px 20px;
    margin-left: 15px;
    font-size: 16px;
    background-color: #ff6666;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
  }

  .search-bar > button:hover {
    background-color: #ff5050;
  }

  .search-bar > button:active {
    transform: scale(0.95);
  }
</style>
