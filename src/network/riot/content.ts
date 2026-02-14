interface ContentItem {
  name: string;
  localizedNames: Record<string, string> | null;
  id: string;
  assetName: string;
  assetPath: string;
}

interface Act {
  name: string;
  localizedNames: Record<string, string> | null;
  id: string;
  isActive: boolean;
}

interface GameContent {
  version: string;
  characters: ContentItem[];
  maps: ContentItem[];
  chromas: ContentItem[];
  skins: ContentItem[];
  skinLevels: ContentItem[];
  equips: ContentItem[];
  gameModes: ContentItem[];
  sprays: ContentItem[];
  sprayLevels: ContentItem[];
  charms: ContentItem[];
  charmLevels: ContentItem[];
  playerCards: ContentItem[];
  playerTitles: ContentItem[];
  acts: Act[];
  ceremonies: ContentItem[];
}

export type { ContentItem, Act, GameContent };
