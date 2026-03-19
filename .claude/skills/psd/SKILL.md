---
name: psd
description: PSD 파일에서 레이어 추출, 구조 확인, PNG 내보내기. PSD 관련 작업 요청 시 사용.
allowed-tools: ["Bash"]
---

# PSD 파일 조작 (psd-tools)

## Quick start

```bash
# 레이어 구조 확인
psd-tools show design.psd

# 전체 합성 이미지 PNG 내보내기
psd-tools export design.psd output.png

# 특정 레이어 내보내기 (인덱스)
psd-tools export design.psd[0] layer-0.png
```

## CLI Commands

```bash
# 레이어 트리 구조 출력
psd-tools show <file>

# 전체 합성 이미지 내보내기
psd-tools export <file> <output.png>

# 특정 레이어 내보내기 (N = 레이어 인덱스, 0부터 시작)
psd-tools export <file>[N] <output.png>

# PSD 파일 디버그 정보 (해상도, 색상 모드, 깊이 등)
psd-tools debug <file>
```

## Python 스크립트 (고급 작업)

CLI만으로 부족한 경우 Python 스크립트를 사용한다.
pipx 환경이므로 반드시 아래 python 경로를 사용:

```bash
/Users/ou9999/.local/pipx/venvs/psd-tools/bin/python3 -c "<스크립트>"
```

### 전체 레이어 일괄 PNG 추출

```bash
/Users/ou9999/.local/pipx/venvs/psd-tools/bin/python3 -c "
from psd_tools import PSDImage
psd = PSDImage.open('input.psd')
for layer in psd:
    image = layer.composite()
    image.save(f'{layer.name}.png')
    print(f'exported: {layer.name}.png ({image.width}x{image.height})')
"
```

### 특정 이름의 레이어만 추출

```bash
/Users/ou9999/.local/pipx/venvs/psd-tools/bin/python3 -c "
from psd_tools import PSDImage
psd = PSDImage.open('input.psd')
for layer in psd.descendants():
    if 'background' in layer.name.lower():
        layer.composite().save(f'{layer.name}.png')
        print(f'exported: {layer.name}.png')
"
```

### 그룹(폴더) 단위 추출

```bash
/Users/ou9999/.local/pipx/venvs/psd-tools/bin/python3 -c "
from psd_tools import PSDImage
psd = PSDImage.open('input.psd')
for layer in psd:
    if layer.kind == 'group':
        image = layer.composite()
        image.save(f'{layer.name}.png')
        print(f'exported group: {layer.name}.png ({image.width}x{image.height})')
"
```

### 레이어 메타데이터 상세 출력

```bash
/Users/ou9999/.local/pipx/venvs/psd-tools/bin/python3 -c "
from psd_tools import PSDImage
psd = PSDImage.open('input.psd')
print(f'Document: {psd.width}x{psd.height}, {psd.color_mode}, depth={psd.depth}')
for i, layer in enumerate(psd.descendants()):
    print(f'[{i}] {layer.kind:10s} | {layer.name:30s} | {layer.size} | visible={layer.visible} | opacity={layer.opacity}')
"
```

## 주의사항

- psd-tools는 **읽기/추출 전용** 도구. 색상 보정, 필터 적용 등 편집 불가.
- 추출된 PNG의 해상도는 원본 PSD 레이어의 해상도 그대로 유지 (4K 이상도 가능).
- 시스템 python3에서는 `import psd_tools` 불가. 반드시 pipx venv python 경로 사용.
- 복잡한 블렌드 모드, 조정 레이어는 Photoshop과 렌더링 결과가 다를 수 있음.
