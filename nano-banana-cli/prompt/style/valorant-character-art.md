# Style: Valorant Character Art

발로란트 공식 캐릭터 포트레이트 스타일. "로우폴리 3D를 2D로 렌더링한" 하이브리드 디지털 페인팅.

## 핵심 7포인트

### 1. Planar Shading (가장 핵심)
부드러운 그라데이션 대신 각진 면(plane) 단위로 명암 분할. 로우폴리 3D 모델처럼 표면을 큰 평면들로 쪼개서 각 면에 단일 톤 적용. 면과 면 사이에 중간 톤 없이 칼같이 나뉨. 피부, 옷, 머리카락, 장비 모두 동일하게 적용. 조각상 같은 솔리드한 입체감 부여.

### 2. Hard Edge (lineless)
윤곽선 없음. 색면의 경계 자체가 날카로운 엣지로 처리됨. 특히 장갑, 부츠, 벨트, 장갑판 등 하드 서피스에서 극대화. 머리카락도 개별 가닥이 아니라 큰 덩어리로 끊어서 표현.

### 3. 제한 팔레트 + 고채도 포인트
캐릭터당 2~3개 지배적 색상으로 통일. 베이스는 중간~저채도로 억제, 능력/이펙트에만 극한의 고채도 하나를 터뜨림. 이 대비가 캐릭터 아이덴티티를 한눈에 인식하게 해줌.

- 제트 = 청/은
- 바이퍼 = 녹/검
- 레이나 = 자/금
- 피닉스 = 주황/백/금

### 4. 극적 명암비 (2~3포인트 조명)
림 라이트(역광) + 메인 라이트 조합. 그림자 면은 과감하게 어둡게, 밝은 면은 거의 흰색에 가깝게. 중간 톤 최소화. 얼굴 특히: 한쪽은 밝게, 반대쪽은 쿨톤(파랑-회색) 깊은 그림자로 40~50% 커버. 이 강한 명암이 면 분할과 결합되어 조각적 인상.

### 5. 절제된 표정 — "쿨한 긴장감"
웃는 캐릭터 거의 없음. 냉정하고 자신감 있는 "전투 준비" 무드. 시선은 카메라 직시 또는 약간 비스듬히 — 도발적이되 과하지 않은. 포즈는 무기를 든 채 여유롭지만 방심하지 않는 느낌.

### 6. 매트 본체 vs 글로우 이펙트
캐릭터 본체는 솔리드/매트/불투명. 능력 이펙트는 글로우/투명/유체 질감. 이 질감의 이중 대비가 "인간 vs 초자연적 힘"의 이중성을 시각적으로 표현.

### 7. 뚜렷한 실루엣
모든 캐릭터가 실루엣만으로 구분 가능. 포즈 + 의상 + 능력이 합쳐져 독특한 외곽 형태를 만듦.

## Prompt

```
STYLE — VALORANT OFFICIAL CHARACTER PORTRAIT (study the reference images and replicate their EXACT rendering technique):

1. PLANAR SHADING (most critical):
Render ALL surfaces — skin, clothing, hair, gear — as FACETED ANGULAR PLANES. Like a low-poly 3D model rendered into 2D. Each surface is broken into large flat color planes with ZERO smooth gradients between them. Shadow and light transitions are SHARP CUTS between planes, never blended. Clothing folds are geometric slabs, NOT soft curves. Skin is carved into flat tonal facets. This gives a sculptural, chiseled, solid look — like a statue made of flat surfaces.

2. HARD EDGES, NO OUTLINES (lineless):
There are NO drawn outlines or contour lines. Instead, the boundary between adjacent color planes IS the edge. These edges are RAZOR SHARP — crisp color-to-color transitions with no anti-aliasing blur. Especially on hard surfaces: gloves, boots, belts, armor plates, buckles. Hair is rendered as large chunky masses with sharp plane breaks, NOT individual flowing strands.

3. RESTRICTED PALETTE + ONE HIGH-SATURATION ACCENT:
The base body uses MID-TO-LOW saturation — muted, restrained tones. ONLY ability effects use one EXTREME high-saturation accent color. This contrast between muted body and vivid effect defines each character's visual identity.

4. EXTREME LIGHT-DARK CONTRAST:
Use dramatic 2-point lighting: one strong KEY LIGHT + one RIM LIGHT (backlight). Lit planes push toward near-white. Shadow planes drop to deep dark tones. MINIMIZE mid-tones — most of the image is either clearly LIT or clearly in SHADOW. The face especially: one side brightly lit, the other side in deep cool-toned shadow (blue-gray or cold teal) covering 40-50% of the face. This creates the cold, intense mood.

5. MATTE BODY vs GLOWING EFFECTS:
The character's body is completely MATTE and OPAQUE — solid, flat, no shine, no specularity, no glossy highlights. In stark contrast, ability effects are LUMINOUS, TRANSPARENT, and GLOWING — ethereal wisps with soft edges and light emission. This dual texture — solid matte human vs ethereal supernatural power — is essential.

6. EXPRESSION — COLD COMBAT READINESS:
Expression is RESTRAINED and COOL. No big smiles, no exaggerated emotion. Cold confidence, controlled intensity. Eyes focused with quiet menace or calm superiority. The character is in a "ready state" — relaxed but coiled, like a weapon about to fire.

7. STRONG SILHOUETTE:
The pose + costume + effects must create a DISTINCTIVE silhouette recognizable even as a solid black shape.
```

## 사용법

1. 위 프롬프트를 캐릭터 레퍼런스 이미지 설명 뒤에 배치
2. 캐릭터별 팔레트 정보를 포인트 3에 구체적으로 기입
3. 포즈/표정은 포인트 6~7을 캐릭터 성격에 맞게 미조정
4. `aspectRatio`: `1:1` 권장
