export interface Character {
  charId: string;
  name: string;
  title: string;
  category: string;
  wikiUrl: string;
}

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
