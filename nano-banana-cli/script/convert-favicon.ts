import * as fs from "node:fs";
import * as path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const INPUT = path.join(import.meta.dirname, "..", "output", "favicon", "favicon.png");
const OUTPUT_DIR = path.join(import.meta.dirname, "..", "output", "favicon");

const SIZES = [16, 32, 48, 64, 128, 256];
const CORNER_RATIO = 0.2; // 20% of size = rounded corner radius

const createRoundedPng = async (size: number): Promise<Buffer> => {
  const radius = Math.round(size * CORNER_RATIO);

  const roundedMask = Buffer.from(
    `<svg width="${size}" height="${size}">
      <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/>
    </svg>`,
  );

  return sharp(INPUT)
    .resize(size, size)
    .composite([{ input: roundedMask, blend: "dest-in" }])
    .png()
    .toBuffer();
};

const main = async (): Promise<void> => {
  console.log("🔧 Rounded favicon 생성 중...\n");

  // 1. 각 사이즈별 rounded PNG 생성
  const pngBuffers: Buffer[] = [];

  for (const size of SIZES) {
    const buf = await createRoundedPng(size);
    pngBuffers.push(buf);
    console.log(`  ✅ ${size}x${size} rounded PNG 생성`);
  }

  // 2. 256px rounded PNG 저장 (미리보기용)
  const previewPath = path.join(OUTPUT_DIR, "favicon-rounded.png");
  const previewBuf = await createRoundedPng(256);
  fs.writeFileSync(previewPath, previewBuf);
  console.log(`\n  📎 미리보기 저장 → ${previewPath}`);

  // 3. ICO 변환
  const icoBuffer = await pngToIco(pngBuffers);
  const icoPath = path.join(OUTPUT_DIR, "favicon.ico");
  fs.writeFileSync(icoPath, icoBuffer);
  console.log(`  ✅ ICO 저장 → ${icoPath}`);

  console.log("\n🏁 완료!");
};

await main();
