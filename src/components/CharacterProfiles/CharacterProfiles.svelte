<script lang="ts">
  import charactersJson from '../../assets/characters.json';
  import type { Character } from '../../utilities/Interfaces';

  type Props = {
    selectedCategory: string;
    selectedCharacter: Character;
    onSelectCharacter: (character: Character) => void;
  };

  const characters = charactersJson as Character[];
  const profileCache: Record<string, HTMLImageElement> = {};

  let { selectedCategory, selectedCharacter, onSelectCharacter }: Props = $props();

  let columnCount = $state(9);
  let shouldRender = $state(true);
  let isProfilesLoaded = $state(false);
  let filteredCharacters = $derived(
    selectedCategory === 'All'
      ? characters
      : characters.filter((character) => character.category === selectedCategory)
  );
  let gridTemplateColumns = $derived(`repeat(${columnCount}, 1fr)`);

  function handleCharacterClick(character: Character): void {
    onSelectCharacter(character);

    if (selectedCategory === 'All' || selectedCategory === 'Others') {
      document.getElementById('character-click-target')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function updateGridSize(): void {
    const screenWidth = window.innerWidth;

    if (filteredCharacters.length > columnCount) {
      if (screenWidth >= 1575) {
        columnCount = 9;
      } else if (screenWidth >= 1425) {
        columnCount = 8;
      } else if (screenWidth >= 1250) {
        columnCount = 7;
      } else if (screenWidth >= 1100) {
        columnCount = 6;
      } else if (screenWidth >= 940) {
        columnCount = 5;
      } else {
        columnCount = 4;
      }
    } else {
      columnCount = filteredCharacters.length;
    }

    shouldRender = screenWidth >= 768;
  }

  function loadImage(character: Character): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const image = new Image();
      image.src = `/characters/${character.charId}/${character.charId}-profile.webp`;

      image.onload = () => {
        profileCache[character.charId] = image;
        resolve();
      };

      image.onerror = () => reject(new Error(`Failed to load image for character: ${character.charId}`));
    });
  }

  async function preloadCharacterProfileImages(): Promise<void> {
    isProfilesLoaded = false;

    const results = await Promise.allSettled(characters.map(loadImage));

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.warn(`Image loading failed for character ${characters[index]?.charId}: ${result.reason}`);
      }
    });

    isProfilesLoaded = true;
  }

  $effect(() => {
    updateGridSize();
  });

  $effect(() => {
    window.addEventListener('resize', updateGridSize);
    updateGridSize();

    return () => window.removeEventListener('resize', updateGridSize);
  });

  $effect(() => {
    void preloadCharacterProfileImages();
  });
</script>

{#if isProfilesLoaded && shouldRender}
  <div class="character-profiles" style:grid-template-columns={gridTemplateColumns}>
    {#each filteredCharacters as character (character.charId)}
      <button
        type="button"
        class="character-profile"
        class:selected={selectedCharacter.charId === character.charId}
        onclick={() => handleCharacterClick(character)}
      >
        <img src={`/characters/${character.charId}/${character.charId}-profile.webp`} alt={character.name} />
      </button>
    {/each}
  </div>
{/if}
<style>
  .character-profiles {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-gap: 10px;
    margin-top: 30px;
    padding: 40px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .character-profile {
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.3s ease, transform 0.3s ease;
    transform-origin: center;
  }

  .character-profile:hover {
    opacity: 0.75;
    transform: scale(1.05);
  }

  .character-profile.selected {
    opacity: 1;
  }

  .character-profile:active {
    transform: scale(0.95);
  }

  img {
    width: 150px;
    border-radius: 50%;
    background: linear-gradient(to top, rgba(211, 211, 211, 0.25) 0%, white 100%);
    pointer-events: none;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  }
</style>
