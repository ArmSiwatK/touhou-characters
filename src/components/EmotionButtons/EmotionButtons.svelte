<script lang="ts">
  import emotionsJson from '../../assets/emotions.json';
  import type { Emotion } from '../../utilities/Interfaces';
  import './EmotionButtons.scss';

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