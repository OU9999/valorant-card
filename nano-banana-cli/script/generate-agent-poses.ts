import * as fs from "node:fs";
import * as path from "node:path";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { getAvailableAgents, getAgentConfig } from "./agent-config.ts";
import type { AgentConfig } from "./agent-config.ts";

const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_AI_API_KEY 환경 변수가 설정되지 않았습니다.");
}

const ai = new GoogleGenAI({ apiKey });
const IMAGE_MODEL = "gemini-3.1-flash-image-preview";
const BASE_ASSET_DIR = path.join(import.meta.dirname, "..", "asset", "valorant");
const BASE_OUTPUT_DIR = path.join(import.meta.dirname, "..", "output");

// ============================================================
// CLI 인자 파싱
// ============================================================
const args = process.argv.slice(2);
const available = getAvailableAgents();

let agentNames: string[];

if (args.length === 0 || args.includes("--all")) {
  agentNames = available;
} else {
  agentNames = args.filter((arg) => {
    if (!available.includes(arg)) {
      console.error(`❌ "${arg}" — config에 등록되지 않은 요원입니다. 등록된 요원: ${available.join(", ")}`);
      return false;
    }
    return true;
  });
}

if (agentNames.length === 0) {
  console.error("처리할 요원이 없습니다.");
  process.exit(1);
}

console.log(`\n🎯 처리 대상: ${agentNames.join(", ")} (${agentNames.length}명, 총 ${agentNames.length * 3}장)\n`);

// ============================================================
// 공통 스타일 프롬프트 (7포인트)
// ============================================================
const buildStylePreamble = (config: AgentConfig): string => `${config.characterDesc}

POSE vs STYLE — READ CAREFULLY:
- STYLE: You MUST replicate the EXACT rendering style from the reference images — planar shading with faceted angular planes, hard edges with no outlines, matte opaque body, lineless color-plane boundaries. The RENDERING STYLE is sacred and must be preserved perfectly. Study the reference images' shading technique and copy it exactly.
- POSE: The body POSE in the reference is just a default. Generate the NEW pose described below instead. Change the arm positions, body direction, and weight — but keep the rendering technique identical to the reference.

STYLE — VALORANT OFFICIAL CHARACTER PORTRAIT (study the two reference images and replicate their EXACT rendering technique):

1. PLANAR SHADING (most critical):
Render ALL surfaces — skin, clothing, hair, gear — as FACETED ANGULAR PLANES. Like a low-poly 3D model rendered into 2D. Each surface is broken into large flat color planes with ZERO smooth gradients between them. Shadow and light transitions are SHARP CUTS between planes, never blended. Clothing folds are geometric slabs, NOT soft curves. Skin is carved into flat tonal facets. This gives a sculptural, chiseled, solid look — like a statue made of flat surfaces.

2. HARD EDGES, NO OUTLINES (lineless):
There are NO drawn outlines or contour lines. Instead, the boundary between adjacent color planes IS the edge. These edges are RAZOR SHARP — crisp color-to-color transitions with no anti-aliasing blur. Especially on hard surfaces: gloves, boots, belts, armor plates, buckles. Hair is rendered as large chunky masses with sharp plane breaks, NOT individual flowing strands.

3. RESTRICTED PALETTE + ONE HIGH-SATURATION ACCENT:
${config.palette}

4. EXTREME LIGHT-DARK CONTRAST:
Use dramatic 2-point lighting: one strong KEY LIGHT + one RIM LIGHT (backlight). Lit planes push toward near-white. Shadow planes drop to deep dark tones. MINIMIZE mid-tones — most of the image is either clearly LIT or clearly in SHADOW. The face especially: one side brightly lit, the other side in deep cool-toned shadow covering 40-50% of the face. This creates the cold, intense mood.

5. MATTE BODY vs GLOWING EFFECTS:
The character's body is completely MATTE and OPAQUE — solid, flat, no shine, no specularity, no glossy highlights. In stark contrast, ability effects are LUMINOUS, TRANSPARENT, and GLOWING — ethereal wisps with soft edges and light emission. This dual texture — solid matte human vs ethereal supernatural power — is essential.

6. EXPRESSION:
${config.expression}

7. STRONG SILHOUETTE:
The pose + costume + effects must create a DISTINCTIVE silhouette recognizable even as a solid black shape.

FRAMING (CRITICAL — must be identical across all poses):
- SINGLE CHARACTER standing upright. FULL BODY visible from head to toe.
- The character fills EXACTLY 85% of the vertical frame: head at the top 7%, feet at the bottom 8%.
- CRITICAL: The character's ENTIRE BODY must be visible — head, torso, legs, and FEET. Do NOT crop or cut off any body part. If the character has effects above their head, shrink the character slightly to ensure everything fits within the frame including head-to-toe.
- Character is CENTERED horizontally in the frame.
- ALL poses must produce the character at the SAME SCALE and HEIGHT.
- Clean white/off-white background. No environment, no ground texture, no shadow on ground.

No text, no UI, no watermarks, no other characters.`;

// ============================================================
// 이미지 로드
// ============================================================
const getImageBase64 = (filePath: string): string =>
  fs.readFileSync(filePath).toString("base64");

// ============================================================
// 단일 포즈 생성
// ============================================================
const generatePose = async (
  agentName: string,
  poseName: string,
  prompt: string,
  assetDir: string,
  outputDir: string,
): Promise<void> => {
  const outputFileName = `${agentName}-${poseName}-1.png`;
  console.log(`  🎨 [${poseName}] Generating ${outputFileName}...`);

  const contents: Array<Record<string, unknown>> = [];

  for (const img of ["fullportrait.png", "displayicon.png"]) {
    const imgPath = path.join(assetDir, img);
    if (!fs.existsSync(imgPath)) {
      console.error(`  ❌ 레퍼런스 이미지 없음: ${imgPath}`);
      return;
    }
    contents.push({
      inlineData: {
        mimeType: "image/png",
        data: getImageBase64(imgPath),
      },
    });
  }

  contents.push({ text: prompt });

  const response = await ai.models.generateContent({
    model: IMAGE_MODEL,
    contents,
    config: {
      imageConfig: {
        aspectRatio: "1:1",
      },
    },
  });

  if (!response.candidates?.[0]?.content?.parts) {
    console.error(`  ❌ [${poseName}] No response received`);
    return;
  }

  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(`  ${part.text}`);
    } else if (part.inlineData && part.inlineData.data) {
      const buffer = Buffer.from(part.inlineData.data, "base64");
      fs.writeFileSync(path.join(outputDir, outputFileName), buffer);
      console.log(`  ✅ [${poseName}] Saved → ${outputFileName}`);
    }
  }
};

// ============================================================
// 요원 단위 생성
// ============================================================
const generateAgent = async (agentName: string): Promise<void> => {
  const config = getAgentConfig(agentName);
  if (!config) {
    console.error(`❌ "${agentName}" config 없음`);
    return;
  }

  const assetDir = path.join(BASE_ASSET_DIR, agentName);
  const outputDir = path.join(BASE_OUTPUT_DIR, agentName);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`\n📦 [${agentName}] ${config.poses.length}개 포즈 생성 시작`);

  const preamble = buildStylePreamble(config);

  for (const pose of config.poses) {
    const fullPrompt = `${preamble}\n\n${pose.prompt}`;
    await generatePose(agentName, pose.name, fullPrompt, assetDir, outputDir);
  }

  console.log(`✅ [${agentName}] 완료\n`);
};

// ============================================================
// 실행 — 병렬 처리
// ============================================================
const results = await Promise.allSettled(
  agentNames.map((agentName) => generateAgent(agentName))
);

const failed = results
  .map((r, i) => (r.status === "rejected" ? agentNames[i] : null))
  .filter(Boolean);

if (failed.length > 0) {
  console.error(`\n❌ 실패한 요원: ${failed.join(", ")}`);
}

const succeeded = results.filter((r) => r.status === "fulfilled").length;
console.log(`\n🏁 전체 완료: ${succeeded}/${agentNames.length}명 성공`);
