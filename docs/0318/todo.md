# TODO — Tracker Score 알고리즘 리팩토링

## 1. 코드 중복 제거

`collectAllKills`, `detectClutch` 등이 `tracker-score.ts`, `card-stats.ts`, `badges.ts` 3개 파일에 중복 존재.

- [ ] 공통 유틸 파일 `src/lib/valorant/match-utils.ts` 추출
- [ ] `collectAllKills`, `detectClutch`, `detectFirstBlood` 등을 이동
- [ ] 3개 파일에서 import하여 사용

## 2. 진입점 정리

`calculateTrackerScore`(tracker-score.ts)와 `calculateCardScore`(card-stats.ts)가 공존.
OVR로 완전 대체하기로 했으므로 정리 필요.

- [ ] `calculateTrackerScore` 제거 또는 deprecated 처리
- [ ] `calculateCardScore`를 단일 진입점으로 확정
- [ ] 외부에서 사용하는 곳이 있으면 마이그레이션

## 3. 클러치 0회 패널티 보완

클러치 시도가 0회인 매치(13-0 스톰프 등)에서 `clutchRate = 0` → PHY 스탯 부당 하락.

- [ ] 클러치 시도 0회일 때 중립값(0.5) 부여
- [ ] 또는 클러치 시도 횟수에 따른 신뢰도 가중 적용

## 4. FormTrend 기준 일치

`calculateFormTrend`가 기존 `calculatePerformance`(단일 점수)를 사용하지만, 실제 카드는 OVR(6개 스탯 평균) 사용.

- [ ] FormTrend를 OVR 기반 performance로 변경
- [ ] 또는 6개 스탯 각각의 트렌드를 제공

## 5. Consistency 활용 결정

Phase 2에서 구현한 `calculateConsistency`가 OVR 시스템에서 미사용.

- [ ] OVR 산출에 Consistency를 반영할지 결정
- [ ] 반영한다면 어떤 스탯에 포함할지 (DEF? 별도 보너스?)
- [ ] 미반영이면 tracker-score.ts에서 제거

## 6. DEF 스탯 지표 개선

`(1 - Deaths/Round)`과 `Survive비율`이 거의 동일한 것을 측정.

- [ ] 하나를 다른 지표로 교체 (예: Consistency, 또는 라운드 생존 시간)
- [ ] 또는 가중치 조정으로 차별화

## 7. 실데이터 검증

Phase 1~2는 실제 데이터로 검증했지만, 6개 스탯 시스템과 뱃지는 미검증.

- [ ] Playwright로 수집한 데이터로 6개 스탯 시뮬레이션
- [ ] 듀얼리스트 → 화력/에임 높은지 확인
- [ ] 컨트롤러 → 서포트/생존력 높은지 확인
- [ ] 뱃지 조건 달성 여부 확인
