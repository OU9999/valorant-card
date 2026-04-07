import * as fs from "node:fs";
import * as path from "node:path";
import sharp from "sharp";

const INPUT = path.join(import.meta.dirname, "..", "output", "favicon", "favicon.png");
const OUTPUT_DIR = path.join(import.meta.dirname, "..", "output", "favicon");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const LOGO_SIZE = 400;

const main = async (): Promise<void> => {
  console.log("🖼️  OG 이미지 생성 중...\n");

  // 원본에서 배경색 추출 (좌상단 픽셀)
  const { dominant } = await sharp(INPUT).stats();
  const bgColor = { r: dominant.r, g: dominant.g, b: dominant.b };

  // 로고 리사이즈
  const logo = await sharp(INPUT).resize(LOGO_SIZE, LOGO_SIZE).png().toBuffer();

  // 배경 생성 + 로고 중앙 배치
  const ogBuffer = await sharp({
    create: {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      channels: 3,
      background: bgColor,
    },
  })
    .composite([
      {
        input: logo,
        left: Math.round((OG_WIDTH - LOGO_SIZE) / 2),
        top: Math.round((OG_HEIGHT - LOGO_SIZE) / 2),
      },
    ])
    .png()
    .toBuffer();

  const outputPath = path.join(OUTPUT_DIR, "og-image.png");
  fs.writeFileSync(outputPath, ogBuffer);
  console.log(`✅ OG 이미지 저장 → ${outputPath}`);
};

await main();
