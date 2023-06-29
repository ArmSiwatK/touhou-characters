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
