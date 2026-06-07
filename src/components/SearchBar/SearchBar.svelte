<script lang="ts">
  import { tick } from 'svelte';
  import charactersJson from '../../assets/characters.json';
  import type { Character } from '../../utilities/Interfaces';
  import { filterCharacters, getFilteredSuggestions } from './SearchBarUtils';
  import './SearchBar.scss';

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