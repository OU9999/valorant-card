import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  getAccountByRiotId,
  getMatchListByPuuid,
  getMatchById,
} from "@/lib/riot/client";
import { calculateCardScore, formatCardStats } from "@/lib/valorant/card-stats";
import { getTierInfo, getDivision } from "@/lib/valorant/tiers";
import type { MatchDetails } from "@/network/riot/match";

// ─── .env 로드 ───

const loadEnv = () => {
  const envPath = resolve(process.cwd(), ".env");
  const content = readFileSync(envPath, "utf-8");

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;

    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
};

// ─── 유틸 ───

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const log = (msg: string) => console.log(`  ${msg}`);

// ─── 메인 ───

const main = async () => {
  loadEnv();

  const input = process.argv[2];
  if (!input) {
    console.error("Usage: pnpm test:real <gameName#tagLine>");
    console.error('Example: pnpm test:real "Hide on bush#KR1"');
    process.exit(1);
  }

  const [gameName, tagLine] = input.split("#");
  if (!gameName || !tagLine) {
    console.error("Invalid format. Use: gameName#tagLine");
    process.exit(1);
  }

  console.log(`\n🔍 계정 조회: ${gameName}#${tagLine}`);

  const accountResult = await getAccountByRiotId(gameName, tagLine);
  if (!accountResult.ok) {
    console.error(`❌ 계정 조회 실패: ${accountResult.error.message}`);
    process.exit(1);
  }

  const { puuid } = accountResult.data;
  log(`PUUID: ${puuid}`);
  log(`닉네임: ${accountResult.data.gameName}#${accountResult.data.tagLine}`);

  console.log(`\n📋 매치 목록 조회 중...`);

  const matchListResult = await getMatchListByPuuid(puuid);
  if (!matchListResult.ok) {
    console.error(`❌ 매치 목록 조회 실패: ${matchListResult.error.message}`);
    process.exit(1);
  }

  const matchIds = matchListResult.data.history.map((h) => h.matchId);
  const maxMatches = Math.min(matchIds.length, 20);
  log(`총 ${matchIds.length}개 매치 발견 → 최근 ${maxMatches}개 분석`);

  console.log(`\n⬇️  매치 상세 데이터 로딩...`);

  const matches: MatchDetails[] = [];
  let competitiveTier = 0;

  for (let i = 0; i < maxMatches; i++) {
    const matchId = matchIds[i];
    const result = await getMatchById(matchId);

    if (!result.ok) {
      log(`⚠️  [${i + 1}/${maxMatches}] ${matchId} 실패 - 건너뜀`);
      continue;
    }

    const match = result.data;
    matches.push(match);

    if (competitiveTier === 0) {
      const player = match.players.find((p) => p.puuid === puuid);
      if (player && player.competitiveTier > 0) {
        competitiveTier = player.competitiveTier;
      }
    }

    const player = match.players.find((p) => p.puuid === puuid);
    const team = match.teams.find((t) => t.teamId === player?.teamId);
    const won = team?.won ? "✅ 승" : "❌ 패";
    const agent = player?.characterId?.slice(0, 8) ?? "unknown";
    const kda = player
      ? `${player.stats.kills}/${player.stats.deaths}/${player.stats.assists}`
      : "-";

    log(
      `[${i + 1}/${maxMatches}] ${won} | K/D/A: ${kda} | agent: ${agent} | ${match.matchInfo.mapId.split("/").pop()}`
    );

    // Rate limit 방지: 매치 간 1.2초 대기
    if (i < maxMatches - 1) await sleep(1200);
  }

  if (matches.length === 0) {
    console.error("\n❌ 유효한 매치 데이터가 없습니다.");
    process.exit(1);
  }

  if (competitiveTier === 0) {
    console.log("\n⚠️  경쟁전 티어를 찾을 수 없어 골드 1(10)로 가정합니다.");
    competitiveTier = 10;
  }

  console.log(`\n📊 알고리즘 실행 (${matches.length}경기, tier=${competitiveTier})`);

  const tierInfo = getTierInfo(competitiveTier);
  const division = getDivision(competitiveTier);

  const result = calculateCardScore(matches, puuid, competitiveTier);

  if (!result) {
    console.error("❌ 카드 스코어 계산 실패");
    process.exit(1);
  }

  // ─── 결과 출력 ───

  const divStr = division > 0 ? ` ${division}` : "";
  console.log(`\n${"═".repeat(50)}`);
  console.log(`  🃏 VALORANT CARD - ${accountResult.data.gameName}#${accountResult.data.tagLine}`);
  console.log(`${"═".repeat(50)}`);
  console.log(`  티어: ${tierInfo?.name ?? "??"}${divStr} (competitive: ${competitiveTier})`);
  console.log(`  OVR:  ${result.ovr}`);
  console.log(`  폼:   ${result.trend === "up" ? "📈 상승" : result.trend === "down" ? "📉 하락" : "➡️  유지"}`);
  console.log(`${"─".repeat(50)}`);

  const formatted = formatCardStats(result.stats);
  for (const stat of formatted) {
    const bar = renderBar(stat.label, result.stats);
    console.log(`  ${stat.label.padEnd(6)} ${stat.value.padStart(7)}  ${bar}`);
  }

  console.log(`${"─".repeat(50)}`);

  if (result.badges.length > 0) {
    console.log(`  뱃지: ${result.badges.map((b) => `🏅 ${b.name}`).join("  ")}`);
  } else {
    console.log(`  뱃지: 없음`);
  }

  console.log(`${"═".repeat(50)}\n`);

  // ─── Raw 데이터 ───

  console.log("📦 Raw CardScoreResult:");
  console.log(JSON.stringify(result, null, 2));
};

// ─── 시각적 바 렌더링 ───

const renderBar = (label: string, stats: Record<string, number>): string => {
  const maxMap: Record<string, number> = {
    ACS: 350,
    "K/D": 2.0,
    "HS%": 35,
    DDΔ: 80,
    KAST: 100,
    ADR: 200,
  };

  const valueMap: Record<string, number> = {
    ACS: stats.acs,
    "K/D": stats.kd,
    "HS%": stats.hsPercent,
    DDΔ: Math.max(0, stats.ddDelta),
    KAST: stats.kast,
    ADR: stats.adr,
  };

  const max = maxMap[label] ?? 100;
  const val = valueMap[label] ?? 0;
  const ratio = Math.min(val / max, 1);
  const filled = Math.round(ratio * 20);

  return "█".repeat(filled) + "░".repeat(20 - filled);
};

main().catch((err) => {
  console.error("\n💥 예상치 못한 에러:", err);
  process.exit(1);
});
