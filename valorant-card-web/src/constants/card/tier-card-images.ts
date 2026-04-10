import type { StaticImageData } from "next/image";
import ironCard from "@/asset/example/tier-card/iron.png";
import bronzeCard from "@/asset/example/tier-card/bronze.png";
import silverCard from "@/asset/example/tier-card/silver.png";
import goldCard from "@/asset/example/tier-card/gold.png";
import platinumCard from "@/asset/example/tier-card/platinum.png";
import diamondCard from "@/asset/example/tier-card/diamond.png";
import ascendantCard from "@/asset/example/tier-card/ascendant.png";
import immortalCard from "@/asset/example/tier-card/immortal.png";
import radiantCard from "@/asset/example/tier-card/radiant.png";
import type { TierName } from "@/constants/card/tier-design";

const TIER_CARD_IMAGES: Record<TierName, StaticImageData> = {
  Iron: ironCard,
  Bronze: bronzeCard,
  Silver: silverCard,
  Gold: goldCard,
  Platinum: platinumCard,
  Diamond: diamondCard,
  Ascendant: ascendantCard,
  Immortal: immortalCard,
  Radiant: radiantCard,
};

export { TIER_CARD_IMAGES };
