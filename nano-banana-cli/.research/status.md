# Valorant Agent Pose Generation — Status

> 최종 업데이트: 2026-03-22

## 전체 현황

| 요원 | Pose 1 | Pose 2 | Pose 3 | 상태 |
|------|--------|--------|--------|------|
| Jett | ✅ jett-pose1 | ✅ jett-pose2 | ✅ jett-pose3 | **완료** |
| Reyna | ✅ reyna-pose1 (leer) | ✅ reyna-pose2 (empress) | ✅ reyna-pose3 (soul-harvest) | **완료** |
| Omen | ✅ omen-pose1 (paranoia, R4) | ✅ omen-pose2 (dark-cover, R6) | ✅ omen-pose3 (from-the-shadows, R6) | **완료** |
| Phoenix | ✅ phoenix-pose1 (run-it-back, R4) | ✅ phoenix-pose2 (hot-hands, R9) | ✅ phoenix-pose3 (curveball, R11) | **완료** |
| Neon | ✅ neon-pose1 (overdrive, R9) | ✅ neon-pose2 (high-gear, R9) | ✅ neon-pose3 (relay-bolt, R11) | **완료** |
| Raze | ✅ raze-pose1 (paint-shells, R9) | ✅ raze-pose2 (showstopper, R9) | ❌ boom-bot | **1개 남음** |

## 합격 포즈 저장 위치
`nano-banana-cli/new-pose/{agent}/{agent}-pose{N}.png`

## 남은 작업
- **Raze boom-bot** — 정면 워킹 + 봇 어깨 위 컨셉 (Round-11에서 시도했으나 불합격)

## TODO
- 모든 포즈가 "정면 응시"라 카드 세트가 단조로울 수 있음 → 비정면 방향으로도 골격 파괴 성공하는 방법 연구 필요
- 오멘 dark-cover(3/4 좌회전)가 유일한 비정면 성공 사례 → 이 패턴 확장 가능성 탐구
- 전체 28명 요원 중 6명 완료. 나머지 22명 추가 작업 필요

## 미등록 요원 (agent-config.ts에 없음)
agent-poses.md에는 28명 정의되어 있으나, 현재 config에 등록된 요원: reyna, phoenix, neon, omen, raze (5명)
