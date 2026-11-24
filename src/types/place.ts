export type Category = "Heritage" | "Nature" | "Beach" | "Spiritual" | "Adventure";

export interface Place {
  id: string;
  name: string;
  city: string;
  state: string;
  category: Category;
  tagline: string;
  description: string;
  bestTime: string;
  highlights: string[];
  emoji: string;
  gradient: [string, string];
}
