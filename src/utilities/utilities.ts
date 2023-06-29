/*
<--------------- Arrays --------------->
*/

export const categories = [
  "All",
  "Protagonists",
  "Embodiment of Scarlet Devil",
  "Perfect Cherry Blossom",
  "Imperishable Night",
  "Phantasmagoria of Flower View",
  "Mountain of Faith",
  "Subterranean Animism",
  "Undefined Fantastic Object",
  "Ten Desires",
  "Double Dealing Character",
  "Legacy of Lunatic Kingdom",
  "Hidden Star in Four Seasons",
  "Wily Beast and Weakest Creature",
  "Unconnected Marketeers",
  "Others",
];

export const emotions = [
  { name: "angry", emoji: "😡" },
  { name: "confused", emoji: "😕" },
  { name: "happy", emoji: "😄" },
  { name: "neutral", emoji: "😐" },
  { name: "sad", emoji: "😢" },
  { name: "special", emoji: "😶" },
  { name: "surprised", emoji: "😲" },
];

/*
<--------------- Interfaces --------------->
*/

export interface Character {
  category: string;
  charId: string;
  name: string;
  title: string;
  wikiUrl: string;
}

export interface CharacterProfilesProps {
  selectedCategory: string;
  selectedCharacter: Character;
  setSelectedCharacter: (character: Character) => void;
}

export interface CharacterSelectionProps {
  selectedCategory: string;
  selectedCharacter: Character | null;
  setSelectedCategory: (category: string) => void;
  setSelectedCharacter: (character: Character) => void;
}

export interface EmotionButtonsProps {
  selectedEmotion: string;
  setSelectedEmotion: (emotion: string) => void;
}

export interface KeyboardContextType {
  children?: React.ReactNode;
  disableKeyBindings: boolean;
  setDisableKeyBindings: (disable: boolean) => void;
}

export interface PortraitDisplayProps {
  selectedCategory: string;
  selectedCharacter: Character;
  selectedEmotion: string;
  setSelectedCharacter: (character: Character) => void;
}

export interface PortraitDisplayRenderingProps {
  handleNextCharacter: () => void;
  handlePreviousCharacter: () => void;
  isMobile: boolean;
  nextCharacter: Character;
  previousCharacter: Character;
  selectedCharacter: Character;
  selectedEmotion: string;
  setSelectedCharacter: (character: Character) => void;
}

export interface SearchBarProps {
  selectedCategory: string;
  setSelectedCharacter: (character: Character) => void;
}

export interface SearchSuggestionsProps {
  handleSuggestionClick: (suggestion: string) => void;
  handleSuggestionHover: (index: number) => void;
  selectedSuggestionIndex: number;
  selectedSuggestionRef: React.RefObject<HTMLLIElement>;
  suggestions: string[];
}
