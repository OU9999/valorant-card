---
tags:
  - algorithm
  - scoring
  - improvement
  - phase/1
  - phase/2
  - phase/3
  - phase/4
status: published
category: algorithm
date: 2025-03-18
related:
  - "[[tier-scoring-algorithm]]"
  - "[[tracker-score-validation]]"
---

# Tracker Score 알고리즘 개선안

기존 알고리즘의 문제점을 분석하고 개선안을 제시함.
최종 반영 결과는 [[tier-scoring-algorithm]], 검증은 [[tracker-score-validation]] 참고.

## 1. 현재 문제점

### 1.1 KAST 차별력 부족
KAST가 실버~레디언트 전 구간에서 71~75% 범위에 몰려있어, 15% 가중치 대비 실질적 차별력이 없음.

### 1.2 Performance 분포 협소
선형 정규화로 인해 performance가 0.56~0.79에 집중. 티어 범위(16점 폭) 중 실제 사용 구간이 약 60%에 불과.

### 1.3 승률 변동 과다
최근 20경기 기반이라 90% 같은 극단적 승률이 점수에 과도한 영향.

---

## 2. 정규화 및 가중치 개선

### 2.1 KAST 정규화 범위 조정

```
기존: clamp((kast - 40) / 50, 0, 1)     → 40%~90% 범위
개선: clamp((kast - 65) / 25, 0, 1)     → 65%~90% 범위
```

실제 분포(71~75%)를 중앙에 배치하여 민감도를 높임.

### 2.2 비선형 정규화 (제곱근)

```
기존: clamp(value / max, 0, 1)
개선: clamp(sqrt(value / max), 0, 1)
```

중간값이 더 높게 올라가면서 상위값과의 차이가 벌어져 performance 분포가 확장됨.

### 2.3 승률 베이지안 평균

```
기존: wins / total
개선: (wins + 5) / (total + 10)
```

50% 기준의 사전 확률을 섞어 극단값 완화. 20경기 18승(90%) → (18+5)/(20+10) = 76.7%로 보정.

### 2.4 가중치 재분배

```
기존: ACS 0.25, K/D 0.20, ADR 0.15, KAST 0.15, Win 0.15, HS% 0.10
개선: ACS 0.25, K/D 0.20, ADR 0.15, DDΔ 0.10, Win 0.10, HS% 0.10, KAST 0.05, Consistency 0.05
```

KAST 비중 축소, DDΔ와 일관성 점수 신규 추가.

---

## 3. 새로운 지표 추가

### 3.1 DDΔ (Damage Delta / Round)

라운드별 (데미지 dealt - 데미지 received). 단순 ADR보다 상대적 우위를 표현.

```
계산: 각 라운드에서 해당 플레이어의 damage 합산 - 해당 플레이어가 받은 damage 합산
정규화: clamp(ddDelta / 80, -1, 1) → [-1, 1] 범위로 정규화 후 [0, 1]로 재매핑
```

- 데이터 소스: `RoundPlayerStats.damage[]`에서 dealt는 직접, received는 다른 플레이어의 damage에서 receiver가 본인인 것 합산

### 3.2 일관성 점수 (Consistency)

매치별 performance의 표준편차 기반. 편차가 낮을수록 높은 점수.

```
consistency = 1 - clamp(stddev(matchPerformances) / 0.3, 0, 1)
```

- 편차 0 → 1.0 (완벽한 일관성)
- 편차 0.3+ → 0.0 (극심한 들쭉날쭉)

### 3.3 First Blood 비율

```
fbRate = firstKills / max(firstDeaths, 1)
정규화: clamp(fbRate / 2.0, 0, 1)
```

- 데이터 소스: `RoundResult.playerStats[].kills[]` 중 `timeSinceRoundStartMillis`가 가장 빠른 킬/데스 이벤트

---

## 4. 디비전 반영

현재 디비전(1, 2, 3)이 점수에 반영되지 않음. 같은 골드라도 골드 3이 골드 1보다 높아야 함.

```
divisionOffset = (division - 1) / 2    // div1: 0, div2: 0.5, div3: 1.0
adjustedBase = base + divisionOffset × (ceiling - base) × 0.3
```

- 골드 1 (base=34): adjustedBase = 34
- 골드 2 (base=34): adjustedBase = 34 + 0.5 × 16 × 0.3 = 36.4
- 골드 3 (base=34): adjustedBase = 34 + 1.0 × 16 × 0.3 = 38.8

디비전이 범위의 30%를 차지하고, 나머지 70%를 performance가 결정.

---

## 5. 역할군 보정

컨트롤러/센티널은 구조적으로 K/D, ACS가 낮으므로 역할군별 기대값을 차등 적용.

| 역할군 | ACS 기준 | K/D 기준 | ADR 기준 |
|--------|----------|----------|----------|
| 듀얼리스트 | 350 | 2.0 | 200 |
| 이니시에이터 | 300 | 1.8 | 180 |
| 컨트롤러 | 280 | 1.6 | 170 |
| 센티널 | 260 | 1.6 | 160 |

- 모스트 에이전트의 역할군으로 판별
- HS%, Win, KAST, DDΔ 등은 역할군과 무관하므로 보정 없음

---

## 6. 카드 실전 스탯

카드에 OVR(1~99) + 실전 스탯 6종(실제 수치)을 직접 표시.

| 라벨 | 의미 | 포맷 |
|------|------|------|
| **ACS** | 평균 전투 점수 | 정수 |
| **K/D** | 킬뎃 비율 | 소수 1자리 |
| **HS%** | 헤드샷률 | 정수% |
| **DDΔ** | 데미지 델타 | 부호 정수 |
| **KAST** | 라운드 기여율 | 정수% |
| **ADR** | 라운드당 데미지 | 정수 |

OVR은 §4.5 가중 합산 + consistency로 산출하여 티어 범위에 매핑.

---

## 7. 재미 요소

### 7.1 최근 폼 트렌드

최근 5경기 vs 이전 15경기의 performance 비교.

```
trend = avg(recent5) - avg(older15)
표시: ↑ (trend > 0.05), → (±0.05), ↓ (trend < -0.05)
```

### 7.2 스페셜 뱃지

특정 조건 달성 시 카드에 뱃지 표시.

| 뱃지 | 조건 |
|------|------|
| 에이스 헌터 | 에이스 3회 이상 |
| 철벽 | KAST 80%+ |
| 저격수 | HS% 30%+ |
| 클러치 킹 | 1vX 성공 5회+ |
| 무패 행진 | 최근 10경기 연승 |
| 원챔 장인 | 모스트 에이전트 점유율 70%+ |

---

## 8. 적용 우선순위

### Phase 1 (즉시 적용 — 기존 코드 수정)
- KAST 정규화 범위 조정
- 비선형 정규화 (제곱근)
- 승률 베이지안 평균
- 디비전 반영

### Phase 2 (신규 지표 추가)
- DDΔ 계산 및 반영
- 일관성 점수
- 가중치 재분배

### Phase 3 (구조 확장)
- 역할군 보정
- 카드 실전 스탯 6종
- 최근 폼 트렌드

### Phase 4 (재미 요소)
- 스페셜 뱃지
- First Blood 비율
- 클러치 팩터
