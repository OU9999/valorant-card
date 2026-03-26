# Valorant Agent Pose Generation — Status

> 최종 업데이트: 2026-03-26 (세션 3)

## 전체 현황 (67/84 저장)

| 요원 | Pose 1 | Pose 2 | Pose 3 | 상태 |
|------|--------|--------|--------|------|
| Jett | ✅ | ✅ | ✅ | **3/3 완료** |
| Reyna | ✅ | ✅ | ✅ | **3/3 완료** |
| Omen | ✅ | ✅ | ✅ | **3/3 완료** |
| Phoenix | ✅ | ✅ | ✅ | **3/3 완료** |
| Neon | ✅ | ✅ | ✅ | **3/3 완료** |
| Raze | ✅ | ✅ | ✅ | **3/3 완료** |
| Yoru | ✅ dimensional-drift | ✅ gatecrash | ✅ clone | **3/3 완료** |
| Iso | ✅ double-tap | ✅ kill-contract | ✅ contingency | **3/3 완료** |
| Waylay | ✅ pose1 | ✅ pose2 | ✅ refract | **3/3 완료** |
| Astra | ✅ astral-form | ✅ nova-pulse(후드) | ✅ cosmic-divide | **3/3 완료** |
| Brimstone | ✅ orbital-strike | ✅ stim-beacon | ✅ incendiary(시가) | **3/3 완료** |
| Viper | ✅ vipers-pit(헬멧) | ✅ snake-bite(독뚝뚝) | ✅ toxic-screen | **3/3 완료** |
| Harbor | ✅ reckoning | ✅ cascade | ✅ cove | **3/3 완료** |
| Clove | ✅ not-dead-yet | ✅ meddle(나비검지) | ✅ pick-me-up(부유) | **3/3 완료** |
| Breach | ✅ rolling-thunder | ✅ aftershock | ✅ fault-line | **3/3 완료** |
| Fade | ✅ nightfall | ✅ haunt | ✅ prowler | **3/3 완료** |
| KAY/O | ✅ null-cmd | ✅ zero-point | ✅ fragment | **3/3 완료** |
| Skye | ✅ seekers | ✅ guiding-light | ✅ trailblazer | **3/3 완료** |
| Sova | ✅ hunters-fury | ✅ owl-drone | ✅ recon-bolt | **3/3 완료** |
| Vyse | ✅ steel-garden | ✅ arc-rose | ✅ shear | **3/3 완료** |
| Tejo | ✅ armageddon | ✅ guided-salvo | ✅ stealth-drone | **3/3 완료** |
| Cypher | ✅ neural-theft | ✅ trapwire | ✅ ghost-pistol | **3/3 완료** |
| Sage | ✅ resurrection | ✅ healing-orb | ✅ barrier-orb | **3/3 완료** |
| Gekko | 🔄 mosh-pit | ✅ dizzy | 🔄 wingman | **1/3 — 프롬프트 재작성 완료, 생성 대기** |
| Chamber | 🔄 tour-de-force | 🔄 headhunter | 🔄 rendezvous | **0/3 — 프롬프트 재작성 완료, 생성 대기** |
| Deadlock | 🔄 annihilation | 🔄 gravnet | 🔄 sonic-sensor | **0/3 — 프롬프트 재작성 완료, 생성 대기** |
| Killjoy | 🔄 lockdown | 🔄 turret | 🔄 nanoswarm | **0/3 — 프롬프트 재작성 완료, 생성 대기** |
| Veto | 🔄 evolution | 🔄 arc | 🔄 chokehold | **0/3 — 프롬프트 재작성 완료, 생성 대기** |

## 남은 5명 — 세션 3 전략 적용 완료, API 쿼타 대기

### 세션 3 전략: "핵심만 남기기" (이펙트 극도 축약)

합격/불합격 프롬프트 정밀 비교 결과, **이펙트 설명 복잡도**가 핵심 차이.
- 합격: ~15단어 ("jade energy streams downward")
- 불합격: ~45단어 ("V-SHAPED CONE narrows at palms, WIDENS outward")

**적용 공식**: 이펙트 = **색상 + 동사 + 방향** (기하학 형태 설명 전면 삭제)

| 요원 | 변경 사항 | 아이코닉 제스처 |
|------|----------|--------------|
| Gekko | thrash→mosh-pit(크리처 제거), wingman 이펙트 축약 | 샤카(shaka) |
| Chamber | 3포즈 이펙트 1-2줄로 축약 | 라펠 정리 |
| Deadlock | barrier-mesh→gravnet(보철팔 들기), 기하학 형태 전면 삭제 | 보철팔 들어올리기 |
| Killjoy | pillars/circuit-board/rectangular 전부 삭제 | 안경 올리기 |
| Veto | interceptor→arc(변이팔 응시), 벽뚫기→워킹+감싸기 | 변이팔 응시 |

### 블로커: Gemini API 쿼타 초과 (2026-03-26)

무료 티어 일일 쿼타 소진. 카드 결제 검증에 약 2일 소요 예상 (~2026-03-28).
프롬프트 재작성은 `agent-config.ts`에 반영 완료. 쿼타 복구 후 즉시 생성 가능:

```bash
cd nano-banana-cli
npx tsx script/generate-agent-poses.ts killjoy chamber gekko veto deadlock
```

### 추가 수정 사항
- `reference-evolution.webp` → `reference-evolution.png` 변환 완료 (파이프라인이 webp 미지원)
- `generate-agent-poses.ts`에 rejection reason 로깅 추가 (에러 원인 즉시 확인 가능)

## 합격 포즈 저장 위치
`nano-banana-cli/new-pose/{agent}/{agent}-pose{N}.png`
