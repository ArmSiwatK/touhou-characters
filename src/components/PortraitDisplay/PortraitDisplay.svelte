<script lang="ts">
  import charactersJson from '../../assets/characters.json';
  import emotionsJson from '../../assets/emotions.json';
  import type { Character, Emotion } from '../../utilities/Interfaces';
  import { getNextCharacter, getPreviousCharacter } from './PortraitDisplayUtils';

  type Props = {
    selectedCategory: string;
    selectedCharacter: Character;
    selectedEmotion: string;
    disableKeyBindings: boolean;
    onSelectCharacter: (character: Character) => void;
  };

  const characters = charactersJson as Character[];
  const emotions = emotionsJson as Emotion[];
  const portraitCache: Record<string, HTMLImageElement> = {};

  let {
    selectedCategory,
    selectedCharacter,
    selectedEmotion,
    disableKeyBindings,
    onSelectCharacter
  }: Props = $props();

  let isMobile = $state(false);
  let isPortraitsLoaded = $state(false);
  let previousCharacter = $derived(getPreviousCharacter(selectedCharacter, selectedCategory));
  let nextCharacter = $derived(getNextCharacter(selectedCharacter, selectedCategory));

  function handleNextCharacter(): void {
    onSelectCharacter(getNextCharacter(selectedCharacter, selectedCategory));
  }

  function handlePreviousCharacter(): void {
    onSelectCharacter(getPreviousCharacter(selectedCharacter, selectedCategory));
  }

  function preloadCharacterEmotionImages(characterId: string): Promise<PromiseSettledResult<void>[]> {
    const characterFolder = `/characters/${characterId}/`;

    const promises = emotions.map((emotion) => {
      const image = new Image();
      image.src = `${characterFolder}${characterId}-${emotion.name}.webp`;

      return new Promise<void>((resolve, reject) => {
        image.onload = () => {
          portraitCache[`${characterId}-${emotion.name}`] = image;
          resolve();
        };
        image.onerror = () => reject(new Error(`Image load failed: ${image.src}`));
      });
    });

    return Promise.allSettled(promises);
  }

  async function preloadImages(): Promise<void> {
    isPortraitsLoaded = false;

    const results = await Promise.allSettled(
      characters.map((character) => preloadCharacterEmotionImages(character.charId))
    );

    for (const result of results) {
      if (result.status === 'rejected') {
        console.warn(result.reason);
      }
    }

    isPortraitsLoaded = true;
  }

  $effect(() => {
    void preloadImages();
  });

  $effect(() => {
    function handleResize(): void {
      isMobile = window.innerWidth <= 768;
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  });

  $effect(() => {
    if (disableKeyBindings) return;

    function handleKeydown(event: KeyboardEvent): void {
      const key = event.key.toLowerCase();

      if (key === 'a') {
        handlePreviousCharacter();
      } else if (key === 'd') {
        handleNextCharacter();
      }
    }

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<div class="portrait-display">
  {#if !isPortraitsLoaded}
    Loading...
  {:else}
    <div class="character-info">
      <h2 class="character-name">{selectedCharacter.name}</h2>
      <div class="portrait-gallery">
        {#if !isMobile}
          {#each [previousCharacter, selectedCharacter, nextCharacter] as character (character.charId)}
            {#if character.charId === selectedCharacter.charId}
              <div class="portrait-item selected">
                <a href={selectedCharacter.wikiUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`/characters/${character.charId}/${character.charId}-${selectedEmotion}.webp`}
                    alt={`Character portrait - ${character.name}`}
                  />
                </a>
              </div>
            {:else}
              <button type="button" class="portrait-item side" onclick={() => onSelectCharacter(character)}>
                <img
                  src={`/characters/${character.charId}/${character.charId}-neutral.webp`}
                  alt={`Character portrait - ${character.name}`}
                />
              </button>
            {/if}
          {/each}
        {:else}
          <div class="portrait-item selected">
            <a href={selectedCharacter.wikiUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={`/characters/${selectedCharacter.charId}/${selectedCharacter.charId}-${selectedEmotion}.webp`}
                alt={`Character portrait - ${selectedCharacter.name}`}
              />
            </a>
          </div>
          <h2 class="character-title">{selectedCharacter.title}</h2>
          <div class="gallery-buttons">
            <button type="button" onclick={handlePreviousCharacter}>◄</button>
            <button type="button" onclick={handleNextCharacter}>►</button>
          </div>
        {/if}
      </div>
      {#if !isMobile}
        <h2 class="character-title">{selectedCharacter.title}</h2>
      {/if}
    </div>
  {/if}
</div>
<style>
  @import url("https://fonts.googleapis.com/css2?family=Julee&display=swap");

  .portrait-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    font-family: "Julee", cursive;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .character-info {
    display: flex;
    flex-direction: column;
  }

  .character-name,
  .character-title {
    font-size: 40px;
    font-weight: bold;
    color: #333;
  }

  .character-name {
    margin: 0 20px 20px;
  }

  .character-title {
    margin: 20px 10px;
  }

  .portrait-gallery {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .portrait-item {
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .portrait-item.selected {
    opacity: 1;
    transform: scale(1);
  }

  .portrait-item.selected:hover {
    transform: scale(1.05);
  }

  .portrait-item.selected:active {
    transform: scale(1);
  }

  .portrait-item.side {
    opacity: 0.5;
    transform: scale(0.8);
  }

  .portrait-item.side:hover {
    opacity: 0.75;
    transform: scale(0.9);
  }

  .portrait-item.side:active {
    transform: scale(0.8);
  }

  img {
    width: 100%;
    height: auto;
    background: linear-gradient(to bottom, rgba(211, 211, 211, 0.25) 0%, white 100%);
    border-radius: 4px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
    z-index: 1;
  }

  .portrait-gallery button:not(.portrait-item) {
    margin: 0 24px;
    padding: 8px 32px;
    font-size: 32px;
    color: #333;
    background-color: #f2f2f2;
    border: none;
    border-radius: 20px;
    transition: background-color 0.3s ease;
  }

  .portrait-gallery button:not(.portrait-item):hover {
    background-color: #e6e6e6;
    cursor: pointer;
  }

  .gallery-buttons {
    margin-bottom: 30px;
  }

  @media (max-width: 768px) {
    .portrait-display {
      padding: 0;
      box-shadow: none;
    }

    .portrait-gallery {
      flex-direction: column;
    }
  }
</style>
