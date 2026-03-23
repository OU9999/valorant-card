# Session Handoff — Valorant Pose Generation

> 새 세션에서 작업 이어갈 때 이 문서 참조 (2026-03-24 기준 최신화)

## 핵심 파일 경로

### 반드시 읽어야 할 파일
| 파일 | 용도 |
|------|------|
| `.research/status.md` | 전체 진행 상태 (43/84 완료, 누가 남음) |
| `.research/seed.yaml` | Ouroboros Seed — 실행 명세서 |
| `.research/pose-research.md` | 연구 로그 — 성공/실패 사례, 전략, 인사이트 |
| `script/agent-config.ts` | 요원별 프롬프트 설정 (28명 중 26명 등록) |
| `script/generate-agent-poses.ts` | 생성 파이프라인 |
| `prompt/style/valorant-character-art.md` | **절대 룰** — 발로란트 스타일 가이드 |
| `prompt/valorant/agent-poses.md` | 전체 28명 요원의 포즈 설계 |

### 결과물 위치
| 디렉토리 | 용도 |
|---------|------|
| `new-pose/{agent}/` | 합격한 최종 포즈 이미지 |
| `output/{agent}/` | 최신 생성물 (재생성 시 덮어쓰기됨) |
| `asset/valorant/{agent}/` | 레퍼런스 이미지 |

## 현재 진행 상황 (43/84 = 51%)

### 완료 (19명 × 3 = 57장)
Jett, Reyna, Omen, Phoenix, Neon, Raze, Yoru, Iso, Waylay,
Astra, Brimstone, Viper, Harbor, Clove,
Breach, Fade, KAY/O, Skye, Sova

### 부분 완료 (3명, 4장)
- **Tejo**: guided-salvo만 합격 (1/3) — 나머지 역동적 포즈 필요
- **Cypher**: trapwire만 합격 (1/3) — 나머지 재생성 (팔3개/확대 문제)
- **Sage**: resurrection + healing-orb 합격 (2/3) — barrier-orb 얼음벽 레퍼런스 필요

### 미완료 (6명, 0장씩)
| 요원 | 필요한 레퍼런스 |
|------|-------------|
| **Gekko** | 봇(Thrash/Dizzy/Wingman/Mosh) 실제 인게임 모습. 현재 봇 색상은 리서치 완료: Wingman=노랑, Dizzy=파랑, Mosh=초록, Thrash=청록+보라 |
| **Chamber** | Headhunter 금 권총, Tour de Force 금 스나이퍼 실제 모습 |
| **Deadlock** | 나노와이어, 배리어 메시, 소닉센서 스킬 이펙트 |
| **Killjoy** | 터렛, 록다운 장치, 나노스웜 실제 인게임 모습 |
| **Vyse** | 앞모습 레퍼런스 추가 완료 (reference-front.jpg). 뒷모습 기반 ref가 문제였음 |
| **Veto** | Evolution 궁극기 변신 모습 (파란 피부 + 어두운 마킹 + 노란 눈) |

## 검증된 전략 (Round 1~16+ 누적)

### 핵심 원칙
1. **캐릭터 고유 포즈 필수** — 팔짱/양손허리/워킹 등 범용 포즈 금지. "이 캐릭터만 할 수 있는 포즈인가?" 테스트
2. **characterDesc 최소화** — 레퍼런스 이미지가 외모 전달. 텍스트는 변신/스킬 상태만 명시
3. **스킬 컬러 정확한 hex** — 리서치 기반 정확한 색상. palette에서 지배
4. **3변형 전략** — 어려운 포즈는 A/B/C 변형 동시 생성 후 선택
5. **레퍼런스 이미지 핵심** — reference-*.{jpg,png}로 스킬/장비/변신 모습 직접 전달

### 스킬 컬러 리서치 완료 (전체 28명)
모든 요원의 정확한 hex 코드가 agent-config.ts palette에 반영됨.
특히 주의: Yoru=#0A18F6(딥 일렉트릭 블루), Gekko 봇 각각 다른 색

### 성공 패턴
- 스킬 소품(독 바이알, 나이프, 수류탄 등)을 들고 있는 포즈가 캐릭터 개성 표현에 효과적
- 크리처/동반자(매, 올빼미, 프라울러 등)가 있는 포즈가 차별화에 매우 좋음
- 변신 포즈(Astra 후드, Viper 헬멧, Veto Evolution)는 레퍼런스 이미지가 반드시 필요

### 실패 패턴
- 범용 템플릿(팔짱, 양손허리) 반복 → 전부 같아 보여서 불합격
- 레퍼런스 없는 장비/봇 묘사 → 모델이 다른 모양 생성
- characterDesc 과묘사 → 변신 상태에서 원래 외모로 회귀

## 실행 방법
```bash
cd nano-banana-cli
pnpm install
npx tsx script/generate-agent-poses.ts {agent}     # 특정 요원
npx tsx script/generate-agent-poses.ts --all        # 전체 (config 등록된 것만)
```

## 다음 세션 TODO
1. 6명 레퍼런스 이미지 수집 (Gekko봇, Chamber총, Deadlock/Killjoy스킬, Sage벽, Veto궁)
2. Vyse 재생성 (앞모습 ref 추가됨)
3. Tejo/Cypher 재생성 (프롬프트 개선)
4. Sage barrier-orb 재생성 (얼음벽 ref 추가 후)
5. 남은 41장 생성 완료 → 84/84
