export interface Character {
  charId: string;
  name: string;
  title: string;
  category: string;
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
  { name: "Angry", emoji: "😡" },
  { name: "Confused", emoji: "😕" },
  { name: "Happy", emoji: "😄" },
  { name: "Neutral", emoji: "😐" },
  { name: "Sad", emoji: "😢" },
  { name: "Special", emoji: "😶" },
  { name: "Surprised", emoji: "😲" },
];
