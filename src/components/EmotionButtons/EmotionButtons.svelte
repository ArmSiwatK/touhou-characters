<script lang="ts">
  import emotionsJson from '../../assets/emotions.json';
  import type { Emotion } from '../../utilities/Interfaces';

  type Props = {
    selectedEmotion: string;
    disableKeyBindings: boolean;
    onSelectEmotion: (emotion: string) => void;
  };

  const emotions = emotionsJson as Emotion[];

  let { selectedEmotion, disableKeyBindings, onSelectEmotion }: Props = $props();

  let isMobile = $state(false);
  let currentEmotionIndex = $state(3);

  function selectEmotion(forward: boolean): void {
    const nextIndex = (currentEmotionIndex + (forward ? 1 : -1) + emotions.length) % emotions.length;
    const emotion = emotions[nextIndex];

    currentEmotionIndex = nextIndex;

    if (emotion) {
      onSelectEmotion(emotion.name);
    }
  }

  function selectEmotionByName(emotionName: string): void {
    const emotionIndex = emotions.findIndex((emotion) => emotion.name === emotionName);

    if (emotionIndex !== -1) {
      currentEmotionIndex = emotionIndex;
      onSelectEmotion(emotionName);
    }
  }

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

      if (key === 'w') {
        selectEmotion(true);
      } else if (key === 's') {
        selectEmotion(false);
      }
    }

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

<div class="emotion-buttons" id="character-click-target">
  {#if isMobile}
    <div class="responsive">
      <button type="button" onclick={() => selectEmotion(false)}>&#8249;</button>
      <div class="selected-emoji">{emotions[currentEmotionIndex]?.emoji}</div>
      <button type="button" onclick={() => selectEmotion(true)}>&#8250;</button>
    </div>
  {:else}
    {#each emotions as emotion (emotion.name)}
      <button
        type="button"
        class:selected={selectedEmotion === emotion.name}
        onclick={() => selectEmotionByName(emotion.name)}
      >
        {emotion.emoji}
      </button>
    {/each}
  {/if}
</div>
<style>
  .emotion-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }

  button {
    margin: 0 5px;
    padding: 20px;
    font-size: 20px;
    background-color: #f2f2f2;
    border: none;
    border-radius: 50%;
    opacity: 0.5;
    transition: background-color 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
  }

  button:hover {
    opacity: 0.75;
    transform: scale(1.05);
    background-color: #e6e6e6;
    cursor: pointer;
  }

  button:active {
    transform: scale(0.95);
    background-color: #ff9d9d;
  }

  button.selected {
    opacity: 1;
    background-color: #ff6666;
    color: #fff;
  }

  .responsive {
    display: flex;
    align-items: center;
    gap: 30px;
  }

  .responsive button {
    padding: 15px 30px;
  }
</style>
