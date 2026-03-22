# Valorant Agent Pose Generation — Status

> 최종 업데이트: 2026-03-23

## 전체 현황

| 요원 | Pose 1 | Pose 2 | Pose 3 | 상태 |
|------|--------|--------|--------|------|
| Jett | ✅ jett-pose1 | ✅ jett-pose2 | ✅ jett-pose3 | **완료** |
| Reyna | ✅ reyna-pose1 (leer) | ✅ reyna-pose2 (empress) | ✅ reyna-pose3 (soul-harvest) | **완료** |
| Omen | ✅ omen-pose1 (paranoia, R4) | ✅ omen-pose2 (dark-cover, R6) | ✅ omen-pose3 (smoke-emerge, R12) | **완료** |
| Phoenix | ✅ phoenix-pose1 (run-it-back, R4) | ✅ phoenix-pose2 (hot-hands, R9) | ✅ phoenix-pose3 (curveball, R11) | **완료** |
| Neon | ✅ neon-pose1 (overdrive, R9) | ✅ neon-pose2 (high-gear, R9) | ✅ neon-pose3 (fast-lane, R12) | **완료** |
| Raze | ✅ raze-pose1 (paint-shells, R9) | ✅ raze-pose2 (showstopper, R9) | 🔄 blast-pack (R12 재생성 필요) | **1개 남음** |

## 합격 포즈 저장 위치
`nano-banana-cli/new-pose/{agent}/{agent}-pose{N}.png`

## Round 12 변경 사항
- **Omen pose3**: from-the-shadows → **smoke-emerge** (연막 벽을 뚫고 나오는 오멘) — 매우 만족
- **Neon pose3**: relay-bolt → **fast-lane** (추월차선 전기벽 사이 스프린트 + Shorty) — 매우 만족
- **Raze**: boom-bot → **blast-pack** (공중 점프 + Judge 샷건) — 재생성 필요

## 남은 작업
- **Raze blast-pack** — 공중 포즈 + Judge 샷건 (Round-12에서 준합격, 재생성 예정)
- **Yoru** — config 등록 + 3포즈 생성 필요
- **Waylay** — config 등록 + 3포즈 생성 필요
- 전체 28명 중 5명 완료, 1명 진행 중(Raze), 22명 미착수

## 미등록 요원 (agent-config.ts에 없음)
현재 config 등록: reyna, phoenix, neon, omen, raze (5명)
Jett는 포즈 생성 완료되었으나 config에 미등록 상태
다음 등록 예정: yoru, waylay
