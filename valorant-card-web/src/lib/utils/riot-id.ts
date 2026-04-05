interface RiotId {
  gameName: string;
  tagLine: string;
}

const parseRiotId = (input: string): RiotId | null => {
  const trimmed = input.trim();
  const hashIndex = trimmed.indexOf("#");
  if (hashIndex === -1) return null;

  const gameName = trimmed.slice(0, hashIndex).trim();
  const tagLine = trimmed.slice(hashIndex + 1).trim();

  if (!gameName || !tagLine) return null;
  if (gameName.length > 16 || tagLine.length > 5) return null;

  return { gameName, tagLine };
};

export { parseRiotId };
export type { RiotId };
