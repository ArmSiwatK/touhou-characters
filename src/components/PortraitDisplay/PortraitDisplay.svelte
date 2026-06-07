<script lang="ts">
  import charactersJson from '../../assets/characters.json';
  import emotionsJson from '../../assets/emotions.json';
  import type { Character, Emotion } from '../../utilities/Interfaces';
  import { getNextCharacter, getPreviousCharacter } from './PortraitDisplayUtils';
  import './PortraitDisplay.scss';

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