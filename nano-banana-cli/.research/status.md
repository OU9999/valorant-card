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
| Raze | ✅ raze-pose1 (paint-shells, R9) | ✅ raze-pose2 (showstopper, R9) | ✅ raze-pose3 (blast-pack, R12) | **완료** |
| Yoru | 🔄 dimensional-drift (R15 합격수준) | 🔄 gatecrash (R15 합격수준) | ✅ yoru-pose3 (clone, R14) | **2개 남음** |
| Iso | ✅ iso-pose1 (double-tap, R15) | 🔄 kill-contract (R15 합격수준) | 🔄 contingency (R15 합격수준) | **2개 남음** |
| Waylay | 🔄 light-speed (R15 합격수준) | ✅ waylay-pose2 (convergent-paths, R15) | 🔄 refract (R15 합격수준) | **2개 남음** |

## 합격 포즈 저장 위치
`nano-banana-cli/new-pose/{agent}/{agent}-pose{N}.png`

## 현재 진행 상황
- **6명 완료**: Jett, Reyna, Omen, Phoenix, Neon, Raze (각 3/3)
- **3명 진행중**: Yoru (1/3 저장), Iso (1/3 저장), Waylay (1/3 저장) — 나머지 포즈도 합격 수준이나 유저 확인 대기
- **19명 미착수**: 전체 28명 중 9명 작업 완료/진행중

## Config 등록 현황
현재 agent-config.ts 등록: reyna, phoenix, neon, omen, yoru, iso, waylay (7명)
Jett, Raze는 포즈 완료되었으나 config에서 제거된 상태
