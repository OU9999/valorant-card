"use client";

import Image from "next/image";
import diamondCard from "@/asset/example/tier-card/diamond.png";
import { CardSvg } from "@/components/card/card-svg";

const JETT_PORTRAIT =
  "https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png";

const SAMPLE_STATS = [
  { label: "SHO", value: 88 },
  { label: "DRI", value: 92 },
  { label: "PAC", value: 85 },
  { label: "PAS", value: 75 },
  { label: "DEF", value: 70 },
  { label: "PHY", value: 78 },
];

const CardTest = () => (
  <div className="flex min-h-screen items-center justify-center gap-12 bg-gray-950 p-8">
    {/* Overlay comparison: PNG card + SVG outline on top */}
    <div className="relative w-75 aspect-2109/3218">
      <Image
        src={diamondCard}
        alt="card"
        fill
        className="object-contain"
      />
      <CardSvg
        fill="none"
        stroke="lime"
        className="absolute inset-0 h-full w-full"
      />
    </div>

    {/* Image card */}
    <div className="relative w-75 aspect-2109/3218">
      {/* Layer 1: Card background */}
      <Image
        src={diamondCard}
        alt="card background"
        fill
        className="object-contain"
      />

      {/* Layer 2: Agent portrait (clipped + faded) */}
      <Image
        src={JETT_PORTRAIT}
        alt="agent portrait"
        fill
        sizes="300px"
        className="card-clip card-portrait-fade object-cover object-top"
      />

      {/* Layer 3: Bottom gradient for text readability */}
      <div className="card-clip absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-black/80 via-black/40 to-transparent" />

      {/* Layer 4: Text content */}
      <div className="absolute inset-0">
        {/* OVR */}
        <div className="absolute left-[12%] top-[12%]">
          <span className="text-4xl font-bold text-white drop-shadow-lg">
            92
          </span>
        </div>

        {/* Player name */}
        <div className="absolute inset-x-0 top-[62%] text-center">
          <span className="text-lg font-semibold text-white drop-shadow-lg">
            Player#KR1
          </span>
        </div>

        {/* Stats grid */}
        <div className="absolute inset-x-[15%] top-[70%] grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-white">
          {SAMPLE_STATS.map((stat) => (
            <div key={stat.label} className="flex justify-between">
              <span className="text-white/70">{stat.label}</span>
              <span className="font-bold">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export { CardTest };
