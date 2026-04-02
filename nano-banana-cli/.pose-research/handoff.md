# Session Handoff — Valorant Pose Generation

> 새 세션에서 작업 이어갈 때 이 문서 참조 (2026-03-26 세션 3 기준 최신화)

## 핵심 파일 경로

### 반드시 읽어야 할 파일
| 파일 | 용도 |
|------|------|
| `.research/status.md` | 전체 진행 상태 (67/84 완료) |
| `.research/seed.yaml` | Ouroboros Seed — 실행 명세서 |
| `.research/pose-research.md` | 연구 로그 — 성공/실패 사례, 전략, 인사이트 |
| `script/agent-config.ts` | 요원별 프롬프트 설정 (28명 등록, **세션 3에서 5명 재작성 완료**) |
| `script/generate-agent-poses.ts` | 생성 파이프라인 (**에러 로깅 개선됨**) |
| `prompt/style/valorant-character-art.md` | **절대 룰** — 발로란트 스타일 가이드 |
| `prompt/valorant/agent-poses.md` | 전체 28명 요원의 포즈 설계 |

### 결과물 위치
| 디렉토리 | 용도 |
|---------|------|
| `new-pose/{agent}/` | 합격한 최종 포즈 이미지 |
| `output/{agent}/` | 최신 생성물 (재생성 시 덮어쓰기됨) |
| `asset/valorant/{agent}/` | 레퍼런스 이미지 |

## 현재 진행 상황 (67/84 = 80%)

### 완료 (23명, 67장)
Jett, Reyna, Omen, Phoenix, Neon, Raze, Yoru, Iso, Waylay,
Astra, Brimstone, Viper, Harbor, Clove,
Breach, Fade, KAY/O, Skye, Sova,
Vyse, Tejo, Cypher, Sage

### 프롬프트 재작성 완료, 생성 대기 (5명, 14장)
**API 쿼타 복구 후 즉시 생성 가능** (~2026-03-28 예상)

| 요원 | Pose 1 | Pose 2 | Pose 3 | ref 상태 |
|------|--------|--------|--------|---------|
| **Gekko** | 🔄 mosh-pit | ✅ dizzy | 🔄 wingman | fullportrait + displayicon |
| **Chamber** | 🔄 tour-de-force | 🔄 headhunter | 🔄 rendezvous | fullportrait + displayicon + reference-headhunter.png |
| **Deadlock** | 🔄 annihilation | 🔄 gravnet | 🔄 sonic-sensor | fullportrait + displayicon |
| **Killjoy** | 🔄 lockdown | 🔄 turret | 🔄 nanoswarm | fullportrait + displayicon |
| **Veto** | 🔄 evolution | 🔄 arc | 🔄 chokehold | fullportrait + displayicon + reference-evolution.png |

## ⭐ 세션 3 핵심 전략 — "핵심만 남기기"

### 근본 원인: 이펙트 설명 복잡도
합격/불합격 프롬프트 EFFECTS 블록 정밀 비교:
- **합격** (Sage/Cypher/Vyse): ~15단어, "색상 + 동사 + 방향"
- **불합격** (5명): ~45단어, "색상 + 기하학 형태(cone/grid/hexagon/circuit) + 방향 + 크기"

### 적용한 공식
**이펙트 = 색상(hex) + 동사 + 방향** — 기하학 형태 설명 전면 삭제

예시:
- ❌ `"V-SHAPED CONE narrows at palms, WIDENS outward"` (45단어)
- ✅ `"Steel blue (#425495) energy shoots forward from both palms."` (10단어)

### 포즈별 변경 요약
| 요원 | 포즈 변경 | 아이코닉 제스처 | 팔배치 다양성 |
|------|----------|--------------|-------------|
| Gekko | thrash→mosh-pit(크리처 제거) | 샤카(shaka) | 양팔벌림 / dizzy / 워킹+샤카 |
| Chamber | 이펙트만 축약 | 라펠 정리 | 스나이퍼+라펠 / 권총+주머니 / 스냅+내림 |
| Deadlock | barrier-mesh→gravnet(보철팔 제스처) | 보철팔 들기 | 양팔앞 / 보철주먹위+내림 / 워킹 |
| Killjoy | 이펙트만 축약 | 안경 올리기 | 양손라이플 / 안경+허리 / 워킹+안경 |
| Veto | interceptor→arc(변이팔 응시) | 변이팔 응시 | 양팔내림(변신) / 팔응시+내림 / 워킹 |

## 세션 2 핵심 학습 (여전히 유효)

1. **ref 외형 묘사 금지** — ref에 위임, 프롬프트에서 외형 묘사 안 함
2. **스킬 디바이스/크리처 포기** — 총기류만 OK (단순 형태)
3. **프롬프트 = 정체 + 자세 + 태도 + 색상(hex)**

## 다음 세션 TODO
1. **API 쿼타 복구 확인** → 즉시 5명 병렬 생성
2. 생성 결과 확인 및 합격/불합격 판정
3. 불합격 시 프롬프트 미세 조정 후 재생성
4. 합격 시 `new-pose/{agent}/`에 저장 + status.md 업데이트

## 실행 방법
```bash
cd nano-banana-cli
pnpm install
npx tsx script/generate-agent-poses.ts killjoy chamber gekko veto deadlock
```
