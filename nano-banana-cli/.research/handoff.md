# Session Handoff — Valorant Pose Generation

> 새 세션에서 작업 이어갈 때 이 문서 참조 (2026-03-24 세션 2 기준 최신화)

## 핵심 파일 경로

### 반드시 읽어야 할 파일
| 파일 | 용도 |
|------|------|
| `.research/status.md` | 전체 진행 상태 (67/84 완료) |
| `.research/seed.yaml` | Ouroboros Seed — 실행 명세서 |
| `.research/pose-research.md` | 연구 로그 — 성공/실패 사례, 전략, 인사이트 |
| `script/agent-config.ts` | 요원별 프롬프트 설정 (28명 등록) |
| `script/generate-agent-poses.ts` | 생성 파이프라인 |
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
**Vyse, Tejo, Cypher, Sage** (세션 2에서 완료)

### 부분 완료 (1명)
- **Gekko**: dizzy만 합격 (1/3)

### 미완료 (4명, 0장씩)
| 요원 | 현재 ref 상태 |
|------|-------------|
| **Chamber** | fullportrait + displayicon + reference-headhunter.png (금 권총) |
| **Deadlock** | fullportrait + displayicon만 (스킬 ref 전부 삭제됨) |
| **Killjoy** | fullportrait + displayicon만 (스킬 ref 전부 삭제됨) |
| **Veto** | fullportrait + displayicon + reference-evolution.webp (궁극기 공식 아트) |

## ⭐ 세션 2 핵심 학습 — 소크라테스 질문기법으로 도출

### 전략 전환 1: ref 외형 묘사 금지
ref 이미지가 이미 보여주는 외형을 텍스트로 재묘사하면 모델이 둘을 합성하며 왜곡.
- ✅ "킬조이의 나노스웜(C스킬)" — 정체만
- ❌ "금색 돔 + 주황 눈 로봇 수류탄" — 외형 묘사

### 전략 전환 2: 스킬 디바이스/크리처 전면 포기
센티널/이니시에이터의 구체적 스킬 소품(터렛, 나노스웜, 배리어메시, Thrash 등)은
Gemini 모델이 잘 재현하지 못함. 이미지 퀄리티를 오히려 망침.
- 추상적 컬러 이펙트(아우라, 글로우, 에너지 감싸기)로 전환
- 총기류(밴달, 권총 등)는 단순 형태라 OK
- 예외: Veto 궁극기(변신 외형), Chamber 헤드헌터(메인 무기)

### 전략 전환 3: 프롬프트 최종 공식
**프롬프트 = 정체 + 자세 + 태도 + 색상(hex)**
- characterDesc = "match ref EXACTLY"만
- 장비/스킬 외형 묘사 ❌
- 캐릭터 외형/복장 묘사 ❌
- 스킬 디바이스/크리처 ❌

### 합격 사례 패턴
합격한 초기 요원들(Jett, Reyna, Omen 등)의 공통점:
- 스킬이 추상적 (바람, 보라 에너지, 연기 = 형체 없는 이펙트)
- 캐릭터 자세 + 표정 + 고유 컬러로 승부

## 다음 세션 TODO
1. 5명 14장 추가 전략 검토 (추상 컬러 방식도 아직 불합격)
2. 합격한 초기 요원들의 프롬프트 구조를 정밀 분석하여 차이점 도출
3. 또는 접근 자체 재검토 (3변형 전략, 포즈 설계 교체 등)

## 실행 방법
```bash
cd nano-banana-cli
pnpm install
npx tsx script/generate-agent-poses.ts {agent}     # 특정 요원
npx tsx script/generate-agent-poses.ts --all        # 전체
```
