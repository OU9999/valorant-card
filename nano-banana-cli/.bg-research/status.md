# Background Removal — Status

> 최종 업데이트: 2026-04-02

## 목표

`new-pose/` 의 포즈 이미지(1024x1024, JPEG+흰배경)에서 배경을 제거하여
투명 RGBA PNG로 변환 → `public/characters/` 에 통합

## 도구 선택

| 후보 | 방식 | 판정 |
|------|------|------|
| Sharp (threshold) | 색상 기반 | X — 흰 옷/머리 같이 제거됨 |
| ImageMagick (-fuzz) | 색상 기반 | △ — JPEG 아티팩트에 취약, 엣지 거침 |
| **rembg (isnet-anime)** | **AI 세그먼테이션** | **O — 채택** |
| @imgly/background-removal-node | AI (ONNX) | △ — 2년+ 미관리, 일러스트 모델 없음 |
| remove.bg API | 클라우드 AI | △ — 유료, 84장 무료한도 초과 |

**채택: `rembg` + `isnet-anime` 모델**
- 애니/일러스트 전용 AI 모델 (planar shading, hard edge에 최적)
- CLI 배치 처리: `rembg p ./input/ ./output/ -m isnet-anime`
- 로컬 실행, 무료, 이미지당 ~1.3초 (CPU)

## 환경

```
nano-banana-cli/.venv/  — Python venv
pip install "rembg[cpu,cli]"
모델 캐시: ~/.u2net/isnet-anime.onnx (176MB)
```

## 진행 현황 (3/84)

| 요원 | 결과 | 비고 |
|------|------|------|
| **Jett** | ✅ 3/3 | 흰 머리/스카프/바람 이펙트 보존 완벽 |

## 파이프라인

```
nano-banana-cli/new-pose/{agent}/          ← 원본 (JPEG+흰배경)
    ↓ rembg -m isnet-anime
nano-banana-cli/new-pose-nobg/{agent}/     ← 투명 PNG
    ↓ cp + rename
public/characters/{agent}/pose{N}.png     ← 웹앱 에셋
```

## 스크립트

`nano-banana-cli/script/remove-bg.ts` — tsx 스크립트, .venv/bin/rembg 호출

```bash
cd nano-banana-cli

# 특정 요원
pnpm remove-bg jett sage reyna

# 전체 28명
pnpm remove-bg
```
