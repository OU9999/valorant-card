import * as fs from "node:fs";
import * as path from "node:path";
import { execSync } from "node:child_process";

const ROOT_DIR = path.join(import.meta.dirname, "..");
const INPUT_DIR = path.join(ROOT_DIR, "new-pose");
const OUTPUT_DIR = path.join(ROOT_DIR, "new-pose-nobg");
const VENV_REMBG = path.join(ROOT_DIR, ".venv", "bin", "rembg");
const MODEL = "isnet-anime";

// ============================================================
// CLI 인자 파싱
// ============================================================
const args = process.argv.slice(2);

if (!fs.existsSync(INPUT_DIR)) {
  console.error(`❌ 입력 디렉토리를 찾을 수 없습니다: ${INPUT_DIR}`);
  process.exit(1);
}

const allAgents = fs
  .readdirSync(INPUT_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

let agentNames: string[];

if (args.length === 0 || args.includes("--all")) {
  agentNames = allAgents;
} else {
  agentNames = args.filter((arg) => {
    if (!allAgents.includes(arg)) {
      console.error(
        `❌ "${arg}" — new-pose/에 존재하지 않는 요원입니다. 가능한 요원: ${allAgents.join(", ")}`,
      );
      return false;
    }
    return true;
  });
}

if (agentNames.length === 0) {
  console.error("처리할 요원이 없습니다.");
  process.exit(1);
}

// ============================================================
// rembg 존재 확인
// ============================================================
if (!fs.existsSync(VENV_REMBG)) {
  console.error(
    "❌ rembg를 찾을 수 없습니다. 먼저 venv를 설정해주세요:\n" +
      "   cd nano-banana-cli && python3 -m venv .venv && source .venv/bin/activate && pip install 'rembg[cpu,cli]'",
  );
  process.exit(1);
}

// ============================================================
// 배경 제거 실행
// ============================================================
console.log(`\n🎨 배경 제거 시작 (모델: ${MODEL})`);
console.log(`📋 대상: ${agentNames.length}명 — ${agentNames.join(", ")}\n`);

let successCount = 0;
let failCount = 0;

for (const agent of agentNames) {
  const inputPath = path.join(INPUT_DIR, agent);
  const outputPath = path.join(OUTPUT_DIR, agent);

  fs.mkdirSync(outputPath, { recursive: true });

  const pngFiles = fs
    .readdirSync(inputPath)
    .filter((f) => f.endsWith(".png"));

  if (pngFiles.length === 0) {
    console.log(`⏭️  ${agent} — png 파일 없음, 스킵`);
    continue;
  }

  console.log(`🔄 ${agent} (${pngFiles.length}장)...`);

  try {
    execSync(`"${VENV_REMBG}" p "${inputPath}/" "${outputPath}/" -m ${MODEL}`, {
      stdio: "pipe",
      timeout: 120_000,
    });
    successCount++;
    console.log(`✅ ${agent} — 완료`);
  } catch (err) {
    failCount++;
    const message = err instanceof Error ? err.message : String(err);
    const stderr = (err as { stderr?: Buffer }).stderr?.toString();
    console.error(`❌ ${agent} — 실패: ${message}${stderr ? `\n${stderr}` : ""}`);
  }
}

console.log(
  `\n📊 결과: ${successCount}/${agentNames.length} 성공` +
    (failCount > 0 ? `, ${failCount} 실패` : ""),
);
console.log(`📁 출력: ${OUTPUT_DIR}`);
