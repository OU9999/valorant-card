# Session Handoff — Valorant Pose Generation

> 새 세션에서 작업 이어갈 때 이 문서 참조 (Round 15 기준 최신화)

## 핵심 파일 경로

### 반드시 읽어야 할 파일
| 파일 | 용도 |
|------|------|
| `.research/status.md` | 전체 진행 상태 (누가 완료, 누가 남음) |
| `.research/pose-research.md` | 연구 로그 — 성공/실패 사례, 전략, 인사이트 |
| `script/agent-config.ts` | 요원별 프롬프트 설정 (characterDesc, palette, expression, poses) |
| `script/generate-agent-poses.ts` | 생성 파이프라인 (buildStylePreamble, 추가 레퍼런스 로드 등) |
| `prompt/style/valorant-character-art.md` | **절대 룰** — 발로란트 스타일 가이드 (Planar Shading, Hard Edge 등) |
| `prompt/valorant/agent-poses.md` | 전체 28명 요원의 포즈 설계 (연구 기반 개정판) |

### 결과물 위치
| 디렉토리 | 용도 |
|---------|------|
| `new-pose/{agent}/` | 합격한 최종 포즈 이미지 |
| `output/{agent}/` | 최신 생성물 (재생성 시 덮어쓰기됨) |
| `asset/valorant/{agent}/` | 레퍼런스 이미지 (fullportrait.png, displayicon.png, reference-*.{jpg,png}) |

## 검증된 전략 (Round 1~15 누적)

### 핵심 3원칙 (Round 15 최종 정리)
1. **캐릭터 개성 최우선** — 고유 스킬, 색상, 성격이 포즈에 반영되어야 함. 범용 포즈(양손허리, 뒤통수깍지 등)보다 **캐릭터만의 스킬/능력 기반 포즈**가 훨씬 좋음
2. **다방면 구도** — 정면만 고집하면 단조로움. 정면, 3/4 턴, 스프린트, 공중, 이펙트 관통 등 다양한 구도를 섞어야 카드 세트가 멋있음
3. **촌스러운 포즈 즉시 폐기** — 캐릭터에 안 맞는 포즈는 아무리 골격이 바뀌어도 촌스러움. 감이 안 오면 바로 교체

### 골격 앵커링 해결법 (Round 9~ 확립)
Gemini 모델이 레퍼런스 이미지의 몸 골격을 그대로 복사하는 문제. 해결:
1. **SKELETON CHANGE 명시**: 각 포즈 프롬프트에 기본 골격과 어떻게 다른지 명시
2. **이펙트 몸 감싸기**: 분리된 투사체보다 몸에 밀착/감싸는 이펙트
3. **표정 절제**: 냉정한 전투 준비 무드
4. **간단한 구도**: 복잡한 손가락 자세보다 전체 실루엣에 집중

### 촌스러운 포즈 금지 목록 ❌
- **뒤통수 깍지 (behind head)**: Phoenix curveball에서는 성공했지만, Yoru에서는 촌스러움 → 캐릭터에 따라 판단
- **양손 허리 (hands on hips)**: Neon relay-bolt에서 성공했지만, Iso double-tap에서 촌스러움 → 마찬가지
- **범용 파워 포즈**: 캐릭터 고유 능력과 무관한 제네릭 포즈는 피할 것
- **원칙**: 팔 배치는 캐릭터의 스킬/성격에서 자연스럽게 나와야 함. "이 캐릭터가 실제로 이런 자세를 취할까?" 테스트

### 성공 패턴 (Round 12~15 추가)
| 패턴 | 설명 | 성공 사례 |
|------|------|----------|
| 이펙트 관통 (emerging) | 이펙트 벽을 뚫고 나옴 | Omen smoke-emerge, Iso contingency |
| 이펙트 복도 (corridor) | 양쪽 이펙트 벽 사이 | Neon fast-lane, Iso contingency(이전) |
| 공중 (airborne) | 폭발/점프로 공중 부유 | Raze blast-pack |
| 차원 내부 (dimension) | 어두운 차원 배경 (흰색 아님) | Yoru dimensional-drift |
| 분신/클론 (clone) | 캐릭터 뒤에 반투명 에너지 복제체 | Yoru clone |
| 무기 포즈 (weapon) | 무기를 들고 조준/올림 | Iso double-tap(밴달), Yoru gatecrash(쉐리프) |
| 추가 레퍼런스 (extra ref) | reference-*.{jpg,png}로 스킬 이펙트/앞모습 참조 | Iso 팔각형, Yoru 앞모습 |
| 변신 (transformation) | 궁극기 변신 상태 | Reyna empress, Yoru dimensional-drift(마스크) |

### 추가 레퍼런스 이미지 시스템 (Round 14~ 추가)
- `asset/valorant/{agent}/` 디렉토리에 `reference-*.{jpg,png}` 파일을 넣으면 자동 로드
- 뒷모습만 있는 요원(Yoru)의 앞모습, 스킬 이펙트 형태(Iso 팔각형) 등에 활용
- pipeline(`generate-agent-poses.ts`)이 자동으로 감지하여 Gemini API에 추가 전송

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
↓
[레퍼런스 이미지] (fullportrait.png + displayicon.png + reference-*.{jpg,png})
```

### 무기 텍스트 묘사 가이드
무기 레퍼런스 이미지 없이 텍스트만으로 성공:
- **Judge**: "LARGE, BOXY pump-action combat shotgun, thick, rectangular, chunky"
- **Shorty**: "VERY SMALL, COMPACT pocket sidearm, barely bigger than fist"
- **Sheriff**: "heavy REVOLVER-style pistol, long barrel, futuristic magnum"
- **Vandal**: "medium-length tactical assault RIFLE, angular geometric design"
- **핵심**: 크기+형태+실루엣 중심 묘사. 세부 메커니즘 X

## 현재 진행 상황
- **6명 완료** (3/3 저장): Jett, Reyna, Omen, Phoenix, Neon, Raze
- **3명 진행중**: Yoru (1/3), Iso (1/3), Waylay (1/3) — 나머지 합격 수준 포즈 유저 확인 대기
- **19명 미착수**: 전체 28명 중 9명 작업 완료/진행중

## 향후 과제
- Yoru/Iso/Waylay 나머지 포즈 유저 확인 후 저장
- 나머지 19명 요원 작업 시작 (agent-poses.md에 설계 완료)
- 캐릭터별 추가 레퍼런스 이미지 확보 (특히 뒷모습만 있는 요원)
- 스킬 이펙트 정확도 확보 (게임 내 스크린샷 → reference-skill.jpg)

## 실행 방법
```bash
cd nano-banana-cli
pnpm install                                          # 의존성 설치
npx tsx script/generate-agent-poses.ts yoru            # yoru만 생성
npx tsx script/generate-agent-poses.ts yoru iso        # 복수 요원
npx tsx script/generate-agent-poses.ts --all           # 전체
```
