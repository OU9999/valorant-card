---
tags:
  - algorithm
  - scoring
  - card-stats
  - badge
status: published
category: algorithm
date: 2025-03-18
related:
  - "[[tracker-score-improvements]]"
  - "[[tracker-score-validation]]"
---

# 티어 기반 스코어링 알고리즘

## 1. 개요

[[tracker-score-improvements]]의 개선안을 반영한 최종 알고리즘.

플레이어의 능력치를 **1~99** OVR 점수와 **실전 스탯 6종**으로 부여한다.
점수는 두 가지 요소로 결정된다:

1. **랭크 티어** → 점수의 바닥(베이스)과 천장(상한)을 결정
2. **최근 전적** → 해당 범위 내에서 실제 점수를 결정

---

## 2. 티어별 점수 범위

### 공식

```
base(i)    = 1 + i × 11       (i = 0 ~ 8)
ceiling(i) = min(99, base(i) + 16)
```

- **범위 폭**: 17점 (레디언트만 11점, 상한 99 캡)
- **인접 티어 오버랩**: 6점

### 결과 테이블

| i | 티어 (`competitiveTier`) | 한국어 명칭 | 베이스 | 상한 | 폭 |
|---|--------------------------|-------------|--------|------|----|
| 0 | 1~3                      | 아이언      | 1      | 17   | 17 |
| 1 | 4~6                      | 브론즈      | 12     | 28   | 17 |
| 2 | 7~9                      | 실버        | 23     | 39   | 17 |
| 3 | 10~12                    | 골드        | 34     | 50   | 17 |
| 4 | 13~15                    | 플래티넘    | 45     | 61   | 17 |
| 5 | 16~18                    | 다이아몬드  | 56     | 72   | 17 |
| 6 | 19~21                    | 초월자      | 67     | 83   | 17 |
| 7 | 22~24                    | 불멸        | 78     | 94   | 17 |
| 8 | 27                       | 레디언트    | 89     | 99   | 11 |

> `competitiveTier` 0 = 언랭크, 25~26 = 사용 안 함

### 오버랩 구간

인접 티어 간 6점이 겹친다. 최근 전적이 좋은 하위 티어 플레이어가 전적이 나쁜 상위 티어 플레이어보다 높은 점수를 받을 수 있다.

```
골드 상한:    ████████████████████████████████████████████████50
플래티넘 하한: ████████████████████████████████████████████45
                                                     ^^^^^^
                                                   오버랩 (45~50)
```

---

## 3. 디비전 (1, 2, 3)

디비전이 티어 범위 내 시작점(adjustedBase)을 이동시킨다. 디비전이 범위의 30%를 차지하고, 나머지 70%를 performance가 결정.

```
divisionOffset = (division - 1) / 2    // div1: 0, div2: 0.5, div3: 1.0
adjustedBase = base + divisionOffset × (ceiling - base) × 0.3
```

| 예시 (골드) | division | adjustedBase | 실효 범위 |
|------------|----------|--------------|-----------|
| 골드 1 | 1 | 34.0 | 34 ~ 50 |
| 골드 2 | 2 | 36.4 | 36 ~ 50 |
| 골드 3 | 3 | 38.8 | 39 ~ 50 |

레디언트는 디비전이 없으므로 adjustedBase = base(89) 그대로.

---

## 4. 최근 전적 기반 점수 산출

최근 **20경기**의 8개 지표를 기반으로 티어 범위 내 실제 점수를 산출한다.

### 4.1 사용 지표

| 지표 | 계산식 | 데이터 소스 |
|------|--------|-------------|
| K/D | `kills / max(deaths, 1)` | `PlayerStats` |
| ACS | `score / roundsPlayed` | `PlayerStats` |
| HS% | `Σheadshots / Σ(headshots + bodyshots + legshots) × 100` | `RoundPlayerStats.damage[]` |
| ADR | `Σdamage / roundsPlayed` | `RoundPlayerStats.damage[]` |
| DDΔ | `(dealt - received) / roundsPlayed` | `RoundPlayerStats.damage[]` 전체 순회 |
| Win | `1 (승) / 0 (패)` | `MatchTeam.won` |
| KAST | `KAS(T) 라운드 수 / 총 라운드 수 × 100` | `RoundResult.playerStats[]` |
| Consistency | `1 - clamp(stddev(performances) / 0.3, 0, 1)` | 매치별 performance의 표준편차 |

#### DDΔ (Damage Delta / Round)

라운드당 데미지 교환 차이. 단순 ADR과 달리 "받은 데미지"를 고려하여 상대적 우위를 측정.

- dealt: 해당 플레이어의 `damage[].damage` 합산
- received: 모든 다른 플레이어의 `damage[]` 중 `receiver === puuid`인 damage 합산
- DDΔ +50이면 라운드당 50 데미지만큼 교환 우위

#### Consistency (일관성 점수)

매치 간 performance 편차가 낮을수록 높은 점수. 매치 간의 메타 지표이므로 별도 계산.

- 편차 0 → 1.0 (완벽한 일관성)
- 편차 0.3+ → 0.0 (극심한 들쭉날쭉)

#### KAST 라운드 판정

- **K** (Kill): 해당 라운드에서 1킬 이상
- **A** (Assist): 킬 이벤트의 `assistants[]`에 포함
- **S** (Survive): 킬 이벤트의 `victim`에 미포함
- **T** (Trade): 사망 후 5초 이내에 팀원이 킬러를 처치

### 4.2 최신 가중 평균 (Recency Weighting)

```
weight(i) = 0.97^(i-1)    // i=1(최신) ~ i=20(가장 오래된)
가중 평균 = Σ(weight_i × metric_i) / Σ(weight_i)
```

| 매치 순번 | 가중치 |
|-----------|--------|
| 1 (최신) | 1.00 |
| 10 | ~0.76 |
| 20 (가장 오래된) | ~0.56 |

### 4.3 승률 보정 (베이지안 평균)

극단적 승률의 과도한 영향을 방지하기 위해 50% 기준의 사전 확률을 적용한다.

```
adjustedWinRate = (wins + 5) / (totalMatches + 10)
```

| 실제 승률 | 보정 후 |
|-----------|---------|
| 20경기 18승 (90%) | 76.7% |
| 20경기 12승 (60%) | 56.7% |
| 20경기 11승 (55%) | 53.3% |
| 20경기 4승 (20%) | 30.0% |

### 4.4 정규화 (0~1 스케일)

K/D, ACS, HS%, ADR에는 **제곱근 정규화**를 적용하여 performance 분포를 확장한다.
Win과 KAST는 성격이 다르므로 선형 정규화를 유지한다.

| 지표 | 정규화 공식 | 기준값 (=1.0) |
|------|-------------|---------------|
| K/D | `clamp(√(kd / 2.0), 0, 1)` | K/D 2.0 |
| ACS | `clamp(√(acs / 350), 0, 1)` | ACS 350 |
| HS% | `clamp(√(hs / 35), 0, 1)` | HS 35% |
| ADR | `clamp(√(adr / 200), 0, 1)` | ADR 200 |
| DDΔ | `clamp(ddΔ / 80, -1, 1) × 0.5 + 0.5` | DDΔ ±80 |
| Win | `adjustedWinRate` (베이지안 보정) | — |
| KAST | `clamp((kast - 65) / 25, 0, 1)` | KAST 90% |

> - K/D, ACS, HS%, ADR: 제곱근 정규화로 performance 분포 확장
> - DDΔ: 음수 가능 → [-1,1] 정규화 후 [0,1] 재매핑 (0이면 0.5, +80이면 1.0, -80이면 0.0)
> - KAST: 범위 65%~90%로 좁혀서 실제 분포(71~75%)에서의 민감도를 높임

### 4.5 가중 합산

```
basePerformance = ACS×0.25 + K/D×0.20 + DDΔ×0.10 + ADR×0.10 + HS%×0.10 + Win×0.10 + KAST×0.05
finalPerformance = basePerformance × 0.90 + consistency × 0.10
```

| 지표 | 가중치 | 이유 |
|------|--------|------|
| ACS | 0.25 | Riot 공식 전투 점수, 가장 종합적 |
| K/D | 0.20 | 핵심 퍼포먼스 지표 |
| DDΔ | 0.10 | 데미지 교환 우위 (ADR 보완) |
| ADR | 0.10 | 라운드당 데미지 기여도 |
| HS% | 0.10 | 에임 정밀도 |
| Win | 0.10 | 게임 승리 기여도 (베이지안 보정과 병행) |
| KAST | 0.05 | 라운드 기여 일관성 (티어 간 차이 적어 낮은 비중) |
| Consistency | 0.10 | 매치 간 안정성 (별도 합산) |

> Consistency는 매치 간의 메타 지표이므로 basePerformance와 별도로 10% 비중으로 합산.

### 4.6 최종 점수 매핑

```
finalScore = round(adjustedBase + finalPerformance × (ceiling - adjustedBase))
```

`adjustedBase`는 디비전이 반영된 시작점 (§3 참조).

---

## 5. 검증 시뮬레이션

전체 검증 결과는 [[tracker-score-validation]] 참고.

### GenG Xiesta (레디언트)

```
입력 (최근 20경기 평균):
  K/D=1.28, ACS=253, HS%=24, ADR=170, Win=11/20, KAST=75.5%

정규화 (제곱근 + 베이지안 승률 + DDΔ):
  K/D:  √(1.28/2.0)     = 0.80
  ACS:  √(253/350)       = 0.85
  HS%:  √(24/35)         = 0.83
  ADR:  √(170/200)       = 0.92
  DDΔ:  29/80×0.5+0.5    = 0.68
  Win:  (11+5)/(20+10)   = 0.53
  KAST: (75.5-65)/25     = 0.42

가중 합산:
  base = 0.85×0.25 + 0.80×0.20 + 0.68×0.10 + 0.92×0.10 + 0.83×0.10 + 0.53×0.10 + 0.42×0.05
       = 0.213 + 0.160 + 0.068 + 0.092 + 0.083 + 0.053 + 0.021 = 0.690
  consistency ≈ 0.75 (가정)
  final = 0.690 × 0.90 + 0.75 × 0.10 = 0.621 + 0.075 = 0.696

최종 점수 (레디언트, adjustedBase=89):
  89 + 0.696 × (99-89) = 96 ✅
```

---

## 6. 카드 스탯 시스템

### 6.1 개요

카드에 **OVR(1~99)**과 **실전 스탯 6종**(실제 수치)을 표시한다.
기존 FIFA식 추상 점수(SHO, DRI 등)를 폐기하고, OP.GG/tracker.gg에서 사용하는 실제 발로란트 지표를 직접 노출.

### 6.2 카드 표시 스탯

| 라벨 | 의미 | 원천 | 포맷 |
|------|------|------|------|
| **ACS** | 평균 전투 점수 | `MatchMetrics.acs` | 정수 (280) |
| **K/D** | 킬뎃 비율 | `MatchMetrics.kd` | 소수 1자리 (1.3) |
| **HS%** | 헤드샷률 | `MatchMetrics.hsPercent` | 정수% (27%) |
| **DDΔ** | 데미지 델타 | `MatchMetrics.ddDelta` | 부호 정수 (+31) |
| **KAST** | 라운드 기여율 | `MatchMetrics.kast` | 정수% (74%) |
| **ADR** | 라운드당 데미지 | `MatchMetrics.adr` | 정수 (168) |

모든 스탯은 최근 20경기의 가중 평균(§4.2)에서 직접 산출. 별도 변환 공식 없음.

### 6.3 OVR 산출

```
performance = ACS×0.25 + K/D×0.20 + DDΔ×0.10 + ADR×0.10 + HS%×0.10 + Win×0.10 + KAST×0.05
finalPerf = performance × 0.90 + consistency × 0.10
OVR = round(adjustedBase + finalPerf × (ceiling - adjustedBase))
```

§4.5의 가중 합산 공식 그대로 사용. 티어 범위(§2) 내에서 매핑.

### 6.4 최근 폼 트렌드

최근 5경기 vs 이전 15경기의 performance 비교.

```
trend = avg(recent5) - avg(older15)
  diff > 0.05  → ↑ (up)
  diff < -0.05 → ↓ (down)
  그 외        → → (stable)
```

최소 6경기 이상이어야 판정 가능. 미만이면 "stable".

---

## 7. 스페셜 뱃지

특정 조건 달성 시 카드에 뱃지를 표시한다. 최근 20경기 데이터 기반으로 판정.

| 뱃지 | 조건 | 판정 방식 |
|------|------|----------|
| **에이스 헌터** | 에이스(라운드 5킬) 3회+ | 라운드별 킬 수 집계 |
| **철벽** | 평균 KAST 80%+ | aggregated MatchMetrics.kast |
| **저격수** | 평균 HS% 30%+ | aggregated MatchMetrics.hsPercent |
| **클러치 킹** | 1vX 클러치 성공 5회+ | 팀원 전멸 후 라운드 승리 판정 |
| **무패 행진** | 최근 10경기 연속 승리 | MatchMetrics.win 순서 확인 |
| **원챔 장인** | 모스트 에이전트 점유율 70%+ | characterId 빈도 집계 |

뱃지는 `CardScoreResult.badges`에 `Badge[]`로 반환. 조건 미충족 시 빈 배열.

---

## 8. 구현 파일

| 파일 | 설명 |
|------|------|
| `src/lib/valorant/tiers.ts` | 티어 상수, 디비전 매핑, adjustedBase 계산 |
| `src/lib/valorant/tracker-score.ts` | 기본 지표 계산 (K/D, ACS, HS%, ADR, DDΔ, Win, KAST, Consistency) |
| `src/lib/valorant/card-stats.ts` | 실전 스탯 6종, OVR, FormTrend, Badges 통합 |
| `src/lib/valorant/badges.ts` | 스페셜 뱃지 6종 판정 |

리팩토링 계획은 추후 별도 문서로 정리 예정.
