<script lang="ts">
  import CharacterProfiles from './components/CharacterProfiles/CharacterProfiles.svelte';
  import CharacterSelection from './components/CharacterSelection/CharacterSelection.svelte';
  import EmotionButtons from './components/EmotionButtons/EmotionButtons.svelte';
  import PortraitDisplay from './components/PortraitDisplay/PortraitDisplay.svelte';
  import SearchBar from './components/SearchBar/SearchBar.svelte';
  import charactersJson from './assets/characters.json';
  import type { Character } from './utilities/Interfaces';

  const characters = charactersJson as Character[];
  const firstCharacter = characters[0];

  if (!firstCharacter) {
    throw new Error('No characters are available.');
  }

  let selectedCategory = $state('All');
  let selectedEmotion = $state('neutral');
  let selectedCharacter = $state<Character>(firstCharacter);
  let disableKeyBindings = $state(false);
</script>

<div class="app">
  <CharacterSelection
    {selectedCharacter}
    {selectedCategory}
    onSelectCharacter={(character) => (selectedCharacter = character)}
    onSelectCategory={(category) => (selectedCategory = category)}
  />
  <SearchBar
    {selectedCategory}
    onSelectCharacter={(character) => (selectedCharacter = character)}
    onDisableKeyBindings={(disabled) => (disableKeyBindings = disabled)}
  />
  <EmotionButtons
    {selectedEmotion}
    {disableKeyBindings}
    onSelectEmotion={(emotion) => (selectedEmotion = emotion)}
  />
  <PortraitDisplay
    {selectedCharacter}
    {selectedCategory}
    {selectedEmotion}
    {disableKeyBindings}
    onSelectCharacter={(character) => (selectedCharacter = character)}
  />
  <CharacterProfiles
    {selectedCharacter}
    {selectedCategory}
    onSelectCharacter={(character) => (selectedCharacter = character)}
  />
</div>
<style>
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
