import type { GeneratedCardData } from "./generate";

// TODO: DB로 교체 — 현재는 개발용 in-memory 저장소
const cards = new Map<string, GeneratedCardData>();

const generateCardId = (): string => {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
};

const saveCard = (data: GeneratedCardData): string => {
  const id = generateCardId();
  cards.set(id, data);
  return id;
};

const getCard = (id: string): GeneratedCardData | null => {
  return cards.get(id) ?? null;
};

export { saveCard, getCard };
