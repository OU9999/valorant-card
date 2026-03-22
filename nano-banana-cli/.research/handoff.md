# Session Handoff — Valorant Pose Generation

> 새 세션에서 작업 이어갈 때 이 문서 참조

## 핵심 파일 경로

### 반드시 읽어야 할 파일
| 파일 | 용도 |
|------|------|
| `.research/status.md` | 전체 진행 상태 (누가 완료, 누가 남음) |
| `.research/pose-research.md` | 연구 로그 — 성공/실패 사례, 전략, 인사이트 |
| `script/agent-config.ts` | 요원별 프롬프트 설정 (characterDesc, palette, expression, poses) |
| `script/generate-agent-poses.ts` | 생성 파이프라인 (buildStylePreamble, SKELETON CHANGE 지시 등) |
| `prompt/style/valorant-character-art.md` | **절대 룰** — 발로란트 스타일 가이드 (Planar Shading, Hard Edge 등) |
| `prompt/valorant/agent-poses.md` | 전체 28명 요원의 포즈 스펙 |

### 결과물 위치
| 디렉토리 | 용도 |
|---------|------|
| `new-pose/{agent}/` | 합격한 최종 포즈 이미지 |
| `output/{agent}/` | 최신 생성물 (재생성 시 덮어쓰기됨) |
| `asset/valorant/{agent}/` | 레퍼런스 이미지 (fullportrait.png, displayicon.png) |

## 검증된 전략 (11라운드 연구 결과)

### 골격 앵커링 해결법
Gemini 모델이 레퍼런스 이미지의 몸 골격을 그대로 복사하는 문제. 해결:

1. **SKELETON CHANGE 명시**: 각 포즈 프롬프트에 `SKELETON CHANGE: The reference shows [기본 골격]. This pose is COMPLETELY DIFFERENT — [새 골격]. Do NOT copy the reference body angle.`
2. **정면 직시(STRAIGHT-ON)**: 기본 일러가 대부분 3/4 턴이므로 정면이 가장 확실한 골격 파괴
3. **양팔 대칭**: 기본 일러가 "한팔 위+한팔 아래"이므로 양팔 같은 높이/같은 동작
4. **이펙트 몸 감싸기**: 분리된 투사체보다 몸에 밀착되는 이펙트
5. **표정 절제**: "NOT smiling, NOT a big grin" — 발로란트 스타일은 냉정한 전투 준비 무드
6. **간단한 구도**: 복잡한 손 자세보다 전체 실루엣에 집중

### 프롬프트 구조 (generate-agent-poses.ts)
```
[characterDesc] (agent-config.ts)
↓
[POSE vs STYLE 분리 지시] (buildStylePreamble)
↓
[STYLE 7포인트] (buildStylePreamble)
↓
[FRAMING 규칙] (buildStylePreamble)
↓
[개별 포즈 프롬프트] (agent-config.ts — SKELETON CHANGE + STYLE REMINDER + 포즈 설명)
```

### 3포즈 차별화 원칙
같은 요원의 3포즈가 전부 "정면+대칭"이면 단조로움. 다양한 팔 배치 활용:
- 팔짱 (crossed arms)
- 양손 뒤통수 깍지 (behind head)
- 양손 허리 (hands on hips)
- 워킹 (walking toward viewer)
- 양팔 벌림 (T-pose spread)
- 양팔 앞 모음 (arms forward together)

## 남은 즉시 작업
1. **Raze boom-bot** 1포즈 — 현재 "정면 워킹 + 봇 어깨 위" 프롬프트. 재생성 or 프롬프트 조정 필요

## 향후 과제 (TODO)
- 모든 포즈가 정면 응시라 카드 세트가 단조로워질 수 있음 → 비정면 방향 연구
- 오멘 dark-cover(3/4 좌회전) 성공 패턴을 다른 요원에 확장
- 나머지 22명 요원 추가 등록 + 포즈 생성

## 실행 방법
```bash
cd nano-banana-cli
npx tsx script/generate-agent-poses.ts raze          # raze만 생성
npx tsx script/generate-agent-poses.ts raze phoenix   # 복수 요원
npx tsx script/generate-agent-poses.ts --all          # 전체
```
