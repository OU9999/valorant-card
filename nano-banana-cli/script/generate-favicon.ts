import * as fs from "node:fs";
import * as path from "node:path";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_AI_API_KEY 환경 변수가 설정되지 않았습니다.");
}

const ai = new GoogleGenAI({ apiKey });
const IMAGE_MODEL = "gemini-3.1-flash-image-preview";
const OUTPUT_DIR = path.join(import.meta.dirname, "..", "output", "favicon");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const PROMPT = `Design a minimalist favicon/app icon featuring the letters "VC".

STYLE DIRECTION:
- Inspired by VALORANT's visual identity: angular, sharp, geometric, bold
- But MINIMALIST — clean, no clutter, no ornament, no gradients
- Hard geometric edges, razor-sharp cuts — like VALORANT's angular UI aesthetic
- The letters "VC" should be stylized with angular cuts and sharp terminals
- Think of how VALORANT cuts through letterforms with diagonal slashes

COLOR:
- Primary: deep red (#FF4655 VALORANT red) on dark background (#0F1923)
- OR white/light letters on dark background with a red accent cut
- Maximum 2-3 colors total. Less is more.

COMPOSITION:
- Square format, designed to work at 32x32px and 512x512px
- The "VC" must be instantly readable even at tiny sizes
- Strong silhouette — recognizable even as a solid shape
- No text other than "VC". No tagline, no subtitle.
- No background pattern, no texture. Clean solid background.

TECHNICAL:
- Clean vector-like rendering, no noise, no film grain
- No 3D effects, no drop shadows, no glow
- No rounded/bubbly shapes — everything angular and sharp
- Output should look like a professional app icon / favicon

Generate exactly ONE clean icon design.`;

const generateFavicon = async (): Promise<void> => {
  console.log("🎨 Generating VC favicon...\n");

  const response = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents: [{ text: PROMPT }],
    config: {
      imageConfig: {
        aspectRatio: "1:1",
      },
    },
  });

  if (!response.candidates?.[0]?.content?.parts) {
    console.error("❌ No response received");
    return;
  }

  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData?.data) {
      const buffer = Buffer.from(part.inlineData.data, "base64");
      const outputPath = path.join(OUTPUT_DIR, "favicon.png");
      fs.writeFileSync(outputPath, buffer);
      console.log(`✅ Saved → ${outputPath}`);
    }
  }
};

await generateFavicon();
