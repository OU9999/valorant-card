// ============================================================
// 타입
// ============================================================
interface PoseConfig {
  name: string;
  prompt: string;
}

interface AgentConfig {
  characterDesc: string;
  palette: string;
  expression: string;
  poses: PoseConfig[];
}

// ============================================================
// 요원별 설정
// ============================================================
const AGENT_CONFIGS: Record<string, AgentConfig> = {
  reyna: {
    characterDesc: `FIRST IMAGE: Full-body character reference for "Reyna" from the game Valorant. Match her appearance EXACTLY — dark brown skin, long black hair with purple streaks swept to one side, GLOWING PURPLE EYES, large gold hoop earrings, dark purple/black tactical bodysuit with a glowing purple RADIANITE HEART on her upper chest (a soul-energy orb that is the source of her power — NOT a decorative gem), gold belt and gold decorative accents, long split skirt/coat tails, knee-high armored boots with gold trim. Her left arm has magenta/purple ethereal tendrils or energy wisps coiling around it. Reproduce her face, outfit, and color palette PRECISELY.

SECOND IMAGE: Close-up face reference for Reyna. Match her EXACT facial features — angular face, strong jawline, sharp eyebrows, glowing purple irises, gold hoop earrings, hair swept to one side.`,
    palette: `Reyna's palette: deep purple, magenta, black, gold accents. The base body uses DARK MUTED TONES — black and deep purple. ONLY ability effects (soul orbs, ethereal energy, eye glow) use EXTREME high-saturation MAGENTA/PURPLE. Gold accents on jewelry and belt provide warm contrast.`,
    expression: `Expression is IMPERIOUS and DISDAINFUL. Chin slightly raised, looking DOWN at the viewer with cold superiority. She is a queen surveying lesser beings. A slight sneer or contemptuous smirk at most. Eyes half-lidded with absolute dominance. No warmth, no mercy — pure regal menace.`,
    poses: [
      {
        name: "empress",
        prompt: `POSE — "EMPRESS" (Ultimate Ability — Empress Transformation):
TRANSFORMATION STATE (CRITICAL): Reyna has activated her ultimate ability. Her entire body has TRANSFORMED — her skin, hair, and outfit are all absorbed into DEEP DARK PURPLE tones. Her normal brown skin is replaced by dark purple-shadow. Her outfit (bodysuit, belt, coat tails, boots) is still recognizable in shape but darkened into the same deep purple-black palette. She is a dark silhouette of herself.

FACE (MOST IMPORTANT): Her face is FEATURELESS DARKNESS. NO nose, mouth, jawline, or eyebrows are visible — the face area is pure dark shadow. ONLY her TWO EYES are visible — glowing bright magenta/purple, two points of light in darkness. Like Omen's face. Her hair flows and floats around this dark void.

Her radianite heart on her upper chest glows softly with purple light — a natural part of her transformed body, not exaggerated.

POSE: Reyna stands upright facing the viewer, chin raised. Her RIGHT ARM is raised, hand held elegantly near her face — fingers slightly curled, as if she just snapped her fingers or is beckoning. Her LEFT ARM hangs at her side, relaxed, fingers slightly spread. NO soul orbs — just her transformed body alone. Her coat tails drift with supernatural energy. Faint purple energy wisps rise from her body.

Clean white background. No branches, no tendrils, no environmental elements. ONLY the character.`,
      },
      {
        name: "leer",
        prompt: `POSE — "LEER" (Nearsight Eye — Signature Ability):
Reyna stands upright facing the viewer in a slight 3/4 turn to the right. Weight on her back leg, front leg forward — confident and aggressive.

Her LEFT ARM is extended forward at head height, palm open and facing outward. From her palm, a large ETHEREAL EYE floats — a glowing magenta/purple eye-shaped projectile with a visible iris and dark pupil. The eye is about the size of her head, hovering just past her extended hand. It emits a soft magenta glow that illuminates her arm and face from the front.

Her RIGHT HAND rests on her hip — casual dominance. One hand sends a blinding eye, the other just chills.

Her own eyes glow purple, looking past the floating eye toward the viewer with cold menace. A faint smirk — she knows what's about to happen.

Her left arm's ethereal tendrils are active, reaching toward the floating eye as if channeling it. Her coat tails hang naturally.`,
      },
      {
        name: "soul-harvest",
        prompt: `POSE — "SOUL HARVEST" (Post-Kill Energy Absorption):
Reyna stands upright facing the viewer straight-on. She is in the act of ABSORBING energy — pulling power into herself from a recent kill.

BOTH ARMS are raised to her sides at shoulder height, elbows slightly bent, fingers spread and curled inward — a pulling/absorbing gesture. Thin magenta energy streams flow INWARD toward her body from all directions, converging on her chest (radianite heart) and her hands. The energy lines are delicate, wispy threads of magenta light being drawn into her.

Her head is tilted slightly back, chin up, eyes half-closed in satisfaction — she is SAVORING the absorbed energy. A slight parted-lip expression of dark pleasure. Eyes glow intensely purple.

Her entire body has a faint magenta aura/outline — she is powered up and brimming with stolen life force. Her ethereal tendrils on her left arm are fully active, writhing and reaching outward.

Her coat tails lift slightly from the energy rushing inward. The overall impression: a vampire queen feeding, utterly in ecstasy.`,
      },
    ],
  },

  phoenix: {
    characterDesc: `FIRST IMAGE: Full-body character reference for "Phoenix" from the game Valorant. Match his appearance EXACTLY — dark brown skin, short black hair with flame-styled tips/fade, confident athletic build. He wears a white/light gray zip-up jacket with orange flame accents and text, black tactical pants, black and orange sneakers. He holds a fireball casually in one hand. His overall style is British streetwear meets tactical gear. Reproduce his face, outfit, and color palette PRECISELY.

SECOND IMAGE: Close-up face reference for Phoenix. Match his EXACT facial features — strong jawline, warm confident eyes, slight stubble, flame-styled hair.`,
    palette: `Phoenix's palette: orange, gold, white, black. The base outfit uses WHITE and BLACK — clean, high-contrast. ONLY ability effects (fire, flames, phoenix wings) use EXTREME high-saturation ORANGE/GOLD with warm glow. This creates a striking contrast between his clean white jacket and the intense warm fire effects.`,
    expression: `Expression is COOL and SELF-ASSURED — a subtle knowing look, NOT a big smile. Slight smirk at most. Eyes calm and confident. He radiates effortless style without trying. Valorant expressions are ALWAYS understated — cold confidence, not warm friendliness.`,
    poses: [
      {
        name: "run-it-back",
        prompt: `POSE — "RUN IT BACK" (Ultimate Ability — Phoenix Rebirth):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
This pose faces STRAIGHT-ON with BOTH arms spread wide, engulfed in flame. NOT the default walking pose.

Phoenix faces the viewer STRAIGHT-ON. Feet shoulder-width apart. BOTH ARMS spread wide open to the sides at shoulder height, palms facing upward — a "come at me" power stance.

FIRE EFFECT (CRITICAL): Massive FLAMES engulf and WRAP AROUND his entire body — rising from the ground upward, spiraling and swirling around his legs, torso, and arms like a fire tornado consuming him. The flames lick upward around him in a COLUMN OF FIRE. He is standing INSIDE a pillar of flame. NOT circular rings, NOT orbiting halos — raw, chaotic, WRAPPING fire that clings to and rises around his body. Think: a man on fire who CONTROLS the fire.

IMPORTANT: NO WINGS. NO circular fire rings. NO orbital shapes. ONLY organic, chaotic flames wrapping and rising around his body.

His EYES GLOW bright orange/gold. His hair tips are ON FIRE — actual flames rising from his hair. His white jacket is visible through the transparent flames, creating contrast.

Ember particles and sparks fill the air around him. The flames are brightest at his feet and hands, creating intense uplight on his face.

Clean white background. ONLY the character engulfed in rising flames.`,
      },
      {
        name: "curveball",
        prompt: `POSE — "CURVEBALL" (Flash — Relaxed Behind-Head):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 LEFT turn walking with one arm up one arm down. This pose is COMPLETELY DIFFERENT — facing STRAIGHT AT THE VIEWER with BOTH arms raised BEHIND his head. Do NOT copy the reference body angle or walking stance.

Phoenix faces the viewer STRAIGHT-ON. BOTH ARMS are raised and his HANDS are CLASPED BEHIND HIS HEAD — elbows out to both sides. This is an extremely relaxed, cocky "I'm not even trying" pose. Like leaning back with hands behind head.

Small fire orbs float lazily around him — two or three tiny flame wisps hovering near his shoulders and elbows. Subtle warm glow, not big blasts.

Wide relaxed stance, NOT walking. Weight slightly back. Chin up.

Subtle confident expression — ultimate cool nonchalance.

This pose has a COMPLETELY DIFFERENT arm arrangement from his other two poses (arms-wide and arms-down).

Clean white background.`,
      },
      {
        name: "hot-hands",
        prompt: `POSE — "HOT HANDS" (Fire Aura — Standing Power):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 LEFT turn walking with one arm up one arm down. This pose is COMPLETELY DIFFERENT — facing STRAIGHT AT THE VIEWER with BOTH arms down at sides, fire wrapping up from below. Do NOT copy the reference body angle or walking stance.

Phoenix faces the viewer STRAIGHT-ON. BOTH ARMS hang at his sides, relaxed. Fire rises from the ground around his feet and wraps UPWARD around his legs and body in soft, transparent wisps — similar to the run-it-back pose but more subtle and controlled. He stands still in the fire, not moving.

Wide planted stance, NOT walking. Weight even. The fire wraps around him like a warm aura, not an explosion.

Subtle confident expression — he is at ease inside the fire.

Clean white background.`,
      },
    ],
  },

  neon: {
    characterDesc: `FIRST IMAGE: Full-body character reference for "Neon" from the game Valorant. Match her appearance EXACTLY — medium-tan Filipino skin, wild spiky ELECTRIC BLUE hair swept back and upward with YELLOW/GOLD lightning-bolt shaped highlights at the tips, athletic runner's build. She wears a dark navy/black tactical crop top with an off-shoulder/bandeau neckline and blue stripe accents, a lavender/pink wrap around her midsection, dark navy tactical leggings with bright BLUE RACING STRIPES down the sides, black sneakers with cyan/electric blue accents and electric spark details at the ankles, black fingerless gloves, and a belt with a teal/cyan buckle. Her arms have visible ELECTRIC CIRCUIT PATTERNS that glow blue when her abilities are active. Reproduce her face, outfit, and color palette PRECISELY.

SECOND IMAGE: Close-up face reference for Neon. Match her EXACT facial features — young angular face, sharp confident eyes, electric blue hair with gold lightning-bolt tips swept to the side, energetic determined expression.`,
    palette: `Neon's palette: electric blue, navy, black, white with cyan/teal accents. The base outfit uses DARK NAVY and BLACK — sleek, athletic. ONLY ability effects (lightning bolts, electric arcs, speed trails) use EXTREME high-saturation ELECTRIC BLUE/CYAN with bright white-core glow. Yellow-gold sparks appear as secondary accents in electrical discharges. This creates contrast between her dark tactical outfit and the intense electric effects.`,
    expression: `Expression is FOCUSED and INTENSE — the cold determination of a sprinter at the starting line. NOT smiling, NOT excited. Sharp eyes, tight jaw, quiet intensity. She is coiled energy about to explode — but the expression is RESTRAINED. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "fast-lane-a",
        prompt: `POSE — "FAST LANE RUSH" (Electric Sprint Through Energy Walls):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 RIGHT turn with a static twisted standing pose, one arm up one arm down. This pose is COMPLETELY DIFFERENT — Neon is RUNNING at full sprint STRAIGHT AT THE VIEWER, body leaning forward aggressively. Do NOT copy the reference standing twist or body angle.

Neon SPRINTS at full speed STRAIGHT AT THE VIEWER. This is faster and more intense than walking — an aggressive combat sprint.

Her body LEANS FORWARD — weight fully committed to the sprint. LEFT foot forward in a long stride, RIGHT foot pushing off behind. Her stride is wide and dynamic.

Her RIGHT HAND holds a SHORTY — a VERY SMALL, COMPACT pocket sidearm shotgun, barely bigger than her fist. Tiny stubby barrel, minimalist grip — it fits entirely in one hand. She holds it naturally at her side while running.

Her LEFT ARM pumps FORWARD in a natural sprint motion — fist or open hand, arm bent at the elbow.

ELECTRIC EFFECT (CRITICAL): Two parallel walls of ELECTRIC BLUE ENERGY run alongside her on BOTH sides — her "Fast Lane" ability. The electric walls are vertical sheets of crackling blue-white lightning energy, running parallel to her direction of movement. They are close to her body, framing her on left and right like corridor walls. The electric energy WRAPS inward slightly — small arcs and sparks jump from the walls toward her body. Her circuit patterns on her arms glow blue.

Her electric blue hair streams BACKWARD from the speed, with small electric sparks trailing from the tips. Her eyes glow with electric blue intensity.

Determined, focused expression — the cold intensity of a sprinter. NOT smiling, NOT excited. Pure forward momentum.

Clean white background. ONLY the character sprinting between the two parallel electric walls.`,
      },
      {
        name: "fast-lane-b",
        prompt: `POSE — "FAST LANE RUSH" (Electric Sprint Through Energy Walls):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 RIGHT turn with a static twisted standing pose, one arm up one arm down. This pose is COMPLETELY DIFFERENT — Neon is RUNNING at full sprint STRAIGHT AT THE VIEWER, body leaning forward aggressively. Do NOT copy the reference standing twist or body angle.

Neon SPRINTS at full speed STRAIGHT AT THE VIEWER. This is faster and more intense than walking — an aggressive combat sprint.

Her body LEANS FORWARD — weight fully committed to the sprint. LEFT foot forward in a long stride, RIGHT foot pushing off behind. Her stride is wide and dynamic.

Her RIGHT HAND holds a SHORTY — a VERY SMALL, COMPACT pocket sidearm shotgun, barely bigger than her fist. Tiny stubby barrel, minimalist grip — it fits entirely in one hand. She holds it naturally at her side while running.

Her LEFT ARM pumps FORWARD in a natural sprint motion — fist or open hand, arm bent at the elbow.

ELECTRIC EFFECT (CRITICAL): Two parallel walls of ELECTRIC BLUE ENERGY run alongside her on BOTH sides — her "Fast Lane" ability. The electric walls are vertical sheets of crackling blue-white lightning energy, running parallel to her direction of movement. They are close to her body, framing her on left and right like corridor walls. The electric energy WRAPS inward slightly — small arcs and sparks jump from the walls toward her body. Her circuit patterns on her arms glow blue.

Her electric blue hair streams BACKWARD from the speed, with small electric sparks trailing from the tips. Her eyes glow with electric blue intensity.

Determined, focused expression — the cold intensity of a sprinter. NOT smiling, NOT excited. Pure forward momentum.

Clean white background. ONLY the character sprinting between the two parallel electric walls.`,
      },
      {
        name: "fast-lane-c",
        prompt: `POSE — "FAST LANE RUSH" (Electric Sprint Through Energy Walls):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 RIGHT turn with a static twisted standing pose, one arm up one arm down. This pose is COMPLETELY DIFFERENT — Neon is RUNNING at full sprint STRAIGHT AT THE VIEWER, body leaning forward aggressively. Do NOT copy the reference standing twist or body angle.

Neon SPRINTS at full speed STRAIGHT AT THE VIEWER. This is faster and more intense than walking — an aggressive combat sprint.

Her body LEANS FORWARD — weight fully committed to the sprint. LEFT foot forward in a long stride, RIGHT foot pushing off behind. Her stride is wide and dynamic.

Her RIGHT HAND holds a SHORTY — a VERY SMALL, COMPACT pocket sidearm shotgun, barely bigger than her fist. Tiny stubby barrel, minimalist grip — it fits entirely in one hand. She holds it naturally at her side while running.

Her LEFT ARM pumps FORWARD in a natural sprint motion — fist or open hand, arm bent at the elbow.

ELECTRIC EFFECT (CRITICAL): Two parallel walls of ELECTRIC BLUE ENERGY run alongside her on BOTH sides — her "Fast Lane" ability. The electric walls are vertical sheets of crackling blue-white lightning energy, running parallel to her direction of movement. They are close to her body, framing her on left and right like corridor walls. The electric energy WRAPS inward slightly — small arcs and sparks jump from the walls toward her body. Her circuit patterns on her arms glow blue.

Her electric blue hair streams BACKWARD from the speed, with small electric sparks trailing from the tips. Her eyes glow with electric blue intensity.

Determined, focused expression — the cold intensity of a sprinter. NOT smiling, NOT excited. Pure forward momentum.

Clean white background. ONLY the character sprinting between the two parallel electric walls.`,
      },
    ],
  },

  omen: {
    characterDesc: `FIRST IMAGE: Full-body character reference for "Omen" from the game Valorant. Match his appearance EXACTLY — a dark, mysterious figure wearing a wide-brimmed pointed hat/hood and a long flowing dark cape/cloak. His face is HIDDEN in shadow beneath the hood — only GLOWING TEAL/BLUE EYES are visible in the darkness. His body is clad in dark gray/purple armor with angular geometric shapes. His lower body DISSOLVES into dark purple/black smoke and shadow — his legs are partially or fully obscured by swirling dark energy. His hands have claw-like fingers. He carries weapons but his primary identity is shadow and darkness. Reproduce his silhouette, outfit, and color palette PRECISELY.

SECOND IMAGE: Close-up face reference for Omen. Match exactly — the hood/hat silhouette, the complete darkness where a face should be, the glowing teal/blue eyes peering from shadow.`,
    palette: `Omen's palette: dark purple, black, shadow blue-gray, glowing teal/cyan eyes. The ENTIRE character is DARK — almost no bright or light surfaces. ONLY his eyes and occasional ability effects use high-saturation TEAL/CYAN glow. The overall impression is a creature made of shadow itself, with just pinpoints of cold light.`,
    expression: `There IS no facial expression — Omen has NO visible face. Only glowing teal eyes in absolute darkness beneath his hood. The "expression" is conveyed through BODY LANGUAGE and the INTENSITY of his eye glow. His posture should communicate: ancient dread, patient menace, something inhuman that has existed for too long. He is still, like a predator that doesn't need to move.`,
    poses: [
      {
        name: "smoke-emerge-a",
        prompt: `POSE — "SMOKE EMERGE" (Breaking Through Dark Smoke Wall):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 RIGHT turn standing still. This pose is COMPLETELY DIFFERENT — Omen is EMERGING forward through a wall of dense dark smoke, pushing STRAIGHT AT THE VIEWER. His body leans forward aggressively. Do NOT copy the reference body angle or still posture.

Omen EMERGES through a wall of dense dark BLACK SMOKE, pushing forward STRAIGHT AT THE VIEWER. His full body is visible — he is breaking through the smoke barrier like a predator stepping out of darkness.

His body leans SLIGHTLY FORWARD — weight on his front foot, aggressive forward momentum. He is mid-emergence, NOT standing still.

SMOKE EFFECT (CRITICAL): Dense, dark BLACK-PURPLE smoke WRAPS AROUND his entire body — clinging to his cloak, swirling around his legs, trailing behind him. The smoke is THICKEST behind him and at his sides, THINNEST at his front where he has pushed through. His body BREAKS through the smoke wall. The smoke is NOT separate from him — it clings to and wraps his form. His lower body dissolves naturally into the dense smoke below.

His RIGHT ARM pushes forward, clawed hand reaching out of the smoke toward the viewer — fingers spread, palm partially open. His LEFT ARM is partially hidden in his cloak and smoke, emerging less fully.

His wide-brimmed hat (FLAT, ANGULAR — match reference exactly) is the first thing emerging from the smoke. Below the hat, ONLY two TEAL GLOWING EYES pierce through the darkness. No face, no features — just eyes in void.

His cloak billows and streams BACKWARD into the smoke behind him, creating trailing dark wisps.

The overall impression: a shadow stepping out of darkness itself. Patient, inevitable, inhuman.

NO RIFLE, NO GUN, NO WEAPON. He holds NOTHING in his hands. ONLY clawed hands and smoke.

Clean white background. ONLY the character emerging from dark smoke.`,
      },
      {
        name: "smoke-emerge-b",
        prompt: `POSE — "SMOKE EMERGE" (Breaking Through Dark Smoke Wall):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 RIGHT turn standing still. This pose is COMPLETELY DIFFERENT — Omen is EMERGING forward through a wall of dense dark smoke, pushing STRAIGHT AT THE VIEWER. His body leans forward aggressively. Do NOT copy the reference body angle or still posture.

Omen EMERGES through a wall of dense dark BLACK SMOKE, pushing forward STRAIGHT AT THE VIEWER. His full body is visible — he is breaking through the smoke barrier like a predator stepping out of darkness.

His body leans SLIGHTLY FORWARD — weight on his front foot, aggressive forward momentum. He is mid-emergence, NOT standing still.

SMOKE EFFECT (CRITICAL): Dense, dark BLACK-PURPLE smoke WRAPS AROUND his entire body — clinging to his cloak, swirling around his legs, trailing behind him. The smoke is THICKEST behind him and at his sides, THINNEST at his front where he has pushed through. His body BREAKS through the smoke wall. The smoke is NOT separate from him — it clings to and wraps his form. His lower body dissolves naturally into the dense smoke below.

His RIGHT ARM pushes forward, clawed hand reaching out of the smoke toward the viewer — fingers spread, palm partially open. His LEFT ARM is partially hidden in his cloak and smoke, emerging less fully.

His wide-brimmed hat (FLAT, ANGULAR — match reference exactly) is the first thing emerging from the smoke. Below the hat, ONLY two TEAL GLOWING EYES pierce through the darkness. No face, no features — just eyes in void.

His cloak billows and streams BACKWARD into the smoke behind him, creating trailing dark wisps.

The overall impression: a shadow stepping out of darkness itself. Patient, inevitable, inhuman.

NO RIFLE, NO GUN, NO WEAPON. He holds NOTHING in his hands. ONLY clawed hands and smoke.

Clean white background. ONLY the character emerging from dark smoke.`,
      },
      {
        name: "smoke-emerge-c",
        prompt: `POSE — "SMOKE EMERGE" (Breaking Through Dark Smoke Wall):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 RIGHT turn standing still. This pose is COMPLETELY DIFFERENT — Omen is EMERGING forward through a wall of dense dark smoke, pushing STRAIGHT AT THE VIEWER. His body leans forward aggressively. Do NOT copy the reference body angle or still posture.

Omen EMERGES through a wall of dense dark BLACK SMOKE, pushing forward STRAIGHT AT THE VIEWER. His full body is visible — he is breaking through the smoke barrier like a predator stepping out of darkness.

His body leans SLIGHTLY FORWARD — weight on his front foot, aggressive forward momentum. He is mid-emergence, NOT standing still.

SMOKE EFFECT (CRITICAL): Dense, dark BLACK-PURPLE smoke WRAPS AROUND his entire body — clinging to his cloak, swirling around his legs, trailing behind him. The smoke is THICKEST behind him and at his sides, THINNEST at his front where he has pushed through. His body BREAKS through the smoke wall. The smoke is NOT separate from him — it clings to and wraps his form. His lower body dissolves naturally into the dense smoke below.

His RIGHT ARM pushes forward, clawed hand reaching out of the smoke toward the viewer — fingers spread, palm partially open. His LEFT ARM is partially hidden in his cloak and smoke, emerging less fully.

His wide-brimmed hat (FLAT, ANGULAR — match reference exactly) is the first thing emerging from the smoke. Below the hat, ONLY two TEAL GLOWING EYES pierce through the darkness. No face, no features — just eyes in void.

His cloak billows and streams BACKWARD into the smoke behind him, creating trailing dark wisps.

The overall impression: a shadow stepping out of darkness itself. Patient, inevitable, inhuman.

NO RIFLE, NO GUN, NO WEAPON. He holds NOTHING in his hands. ONLY clawed hands and smoke.

Clean white background. ONLY the character emerging from dark smoke.`,
      },
    ],
  },

  yoru: {
    characterDesc: `FIRST IMAGE: Full-body reference for "Yoru" — shown FROM BEHIND. The demon/oni mask is on the BACK of his jacket only. When facing the viewer, the jacket FRONT is PLAIN dark navy blue with zipper and high collar — NO demon mask on the front.
SECOND IMAGE: Face close-up reference.
THIRD IMAGE: Front-view reference showing how Yoru looks FROM THE FRONT and his DIMENSIONAL CLONE ability.
Match the reference images' appearance EXACTLY. Reproduce the SAME rendering style.`,
    palette: `Yoru's palette: blue, navy, black, orange accents. The base outfit uses MEDIUM BLUE (#4A60B6) — sleek streetwear. Ability effects use DEEP SATURATED ELECTRIC BLUE (#0A18F6) — an extremely vivid, intense PURE BLUE (NOT cyan, NOT sky blue, NOT dark navy). This is almost maximum-blue with very low red/green — think royal blue turned up to maximum saturation. The dimensional void combines this electric blue with BLACK WISPS and DARK SHADOWS. Orange accents (#F55114) on jacket trim, sneakers, and sleeve patch provide warm contrast.`,
    expression: `Expression is COOL and NONCHALANT — a trickster's quiet confidence. Subtle smirk at most, one eyebrow slightly raised. He looks like he already knows how this ends. Cocky but RESTRAINED — not a big grin. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "dimensional-drift",
        prompt: `POSE — "DIMENSIONAL DRIFT" (Ultimate — Standing Through Rift):
SKELETON CHANGE: The reference shows Yoru FROM BEHIND. This pose is COMPLETELY DIFFERENT — facing STRAIGHT AT THE VIEWER, standing powerfully through a dimensional tear.

TRANSFORMATION: Yoru wears a HALF-MASK covering his LOWER FACE (match the 4th reference image EXACTLY — orange-red painted markings, sharp white fangs/teeth). Eyes glow above the mask.

DIMENSIONAL TEAR: Behind Yoru, white background TORN OPEN — jagged crack in reality. Through it, DEEP ELECTRIC BLUE (#0A18F6) void visible with black wisps inside. Tear edges sharp like ripped paper.

POSE: Yoru stands TALL through the tear — wide powerful stance, both feet planted. BOTH ARMS at his sides, fists clenched, shoulders squared. He has JUST stepped through — still partially surrounded by the tear's edges. Static intimidation rather than motion. NO weapons.

EFFECTS: Electric blue (#0A18F6) energy wisps cling to his body from the tear behind him.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. White background WITH dimensional tear behind him.`,
      },
      {
        name: "gatecrash",
        prompt: `POSE — "GATECRASH" (Dimensional Rift — Crossed Arms):
SKELETON CHANGE: The reference shows Yoru FROM BEHIND. This pose is COMPLETELY DIFFERENT — facing STRAIGHT AT THE VIEWER with ARMS CROSSED. Do NOT copy the reference angle.

POSE: Yoru faces the viewer STRAIGHT-ON. NO mask — his normal face visible. ARMS CROSSED over his chest — a trickster's confident, nonchalant stance. Wide planted stance, weight balanced.

EFFECTS: Subtle dimensional rift energy around his body — faint DARK NAVY BLUE (NOT cyan, NOT sky blue) cracks along his jacket and legs. The energy color is DEEP DARK NAVY, matching the dark indigo dimensional void from the game. The energy is VERY SUBTLE so his outfit's NATURAL MEDIUM NAVY BLUE color is clearly visible. Do NOT darken his entire outfit.

NO WEAPONS. The pose is pure attitude — cocky confidence.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  iso: {
    characterDesc: `FIRST IMAGE: Full-body reference for "Iso" — match his appearance EXACTLY from this image.
SECOND IMAGE: Face close-up reference.
THIRD IMAGE: Reference for Iso's signature ability — CONCENTRIC OCTAGONAL geometric energy rings (NOT a simple sphere, but layered octagonal/star-shaped patterns).
Match the reference images' appearance and rendering style EXACTLY.`,
    palette: `Iso's palette: purple, violet, white/light gray, black. The base outfit uses LIGHT GRAY/WHITE and BLACK — clean, monochromatic. ONLY ability effects (kinetic shields, energy spheres, dimensional rifts) use EXTREME high-saturation PURPLE/VIOLET with bright glow. This creates stark contrast between his muted grayscale outfit and the intense purple energy.`,
    expression: `Expression is COLD and DETACHED — isolated, looking through the viewer rather than at them. Minimal emotion, almost apathetic. Eyes half-visible behind hair. The quiet intensity of someone who has disconnected from everything. NOT angry, NOT sad — just absent. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "kill-contract",
        prompt: `POSE — "KILL CONTRACT" (Ultimate — Energy Formation):
SKELETON CHANGE: The reference shows a crouching action pose. This pose is COMPLETELY DIFFERENT — facing STRAIGHT AT THE VIEWER with BOTH arms forward together.

POSE: Iso faces the viewer STRAIGHT-ON. BOTH ARMS extended forward at chest height — hands facing each other with a gap between them, as if forming energy between his palms. Wide symmetrical stance.

EFFECTS: Between his hands, purple kinetic energy forms. From his body, CONCENTRIC OCTAGONAL geometric energy rings (see third reference) radiate BEHIND him — layered octagonal patterns of purple-white energy wrapping behind and around his body. The energy illuminates his face with purple light. Energy lines flow along his arms.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "double-tap",
        prompt: `POSE — "DOUBLE TAP" (Kinetic Shield — Vandal Rifle Aim):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 RIGHT turn in a crouching action pose. This pose is COMPLETELY DIFFERENT — facing STRAIGHT AT THE VIEWER, aiming a rifle forward. Do NOT copy the reference crouching angle.

Iso faces the viewer STRAIGHT-ON. He holds a VANDAL assault rifle — Valorant's signature full-auto rifle. It is a medium-length tactical rifle with angular, geometric design. He aims it FORWARD at the viewer with BOTH HANDS — proper rifle grip, stock against shoulder, looking down the sights.

A translucent PURPLE KINETIC SHIELD hovers in front of him — a geometric OCTAGONAL barrier pattern that WRAPS partially around his upper body. He aims THROUGH the shield. The shield is semi-transparent, the rifle and his face visible behind it.

His oversized jacket hangs loosely around the rifle stance. Hair over one eye. Band-aid visible. Cold apathetic stare through scope and shield.

Purple energy lines trace along the rifle barrel and his arms.

Clean white background.`,
      },
      {
        name: "contingency",
        prompt: `POSE — "CONTINGENCY" (Energy Corridor — Walking Through):
SKELETON CHANGE: The reference shows a crouching action pose. This pose is COMPLETELY DIFFERENT — WALKING FORWARD STRAIGHT AT THE VIEWER.

POSE: Iso WALKS forward STRAIGHT AT THE VIEWER — confident stride, one foot forward, slight forward lean. One arm at his side, the other slightly forward. Oversized jacket billows slightly behind him.

EFFECTS: Purple energy WRAPS tightly around his body as he walks — clinging to his jacket, swirling around his arms and legs. Thin purple energy wisps trail behind him. The effect is SUBTLE and BODY-HUGGING — no large background patterns, no octagonal shapes behind him. Just purple energy clinging to and trailing from his form.

NO weapons. NO large background effects. NO geometric patterns behind him.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  waylay: {
    characterDesc: `FIRST IMAGE: Full-body reference for "Waylay" — match her appearance EXACTLY from this image. She holds a PRISMATIC LIGHT SWORD in the reference.
SECOND IMAGE: Face close-up reference.
Match the reference images' appearance and rendering style EXACTLY.`,
    palette: `Waylay's palette: gold/tan, silver/white, dark navy, prismatic rainbow. The base outfit uses GOLD/TAN and DARK NAVY — warm tactical. ONLY ability effects (prismatic blades, light refraction, speed trails) use EXTREME high-saturation PRISMATIC RAINBOW with dominant purple, cyan, and gold — light refracting through a prism. Silver/white hair provides a cool contrast against the warm gold vest.`,
    expression: `Expression is FOCUSED and DETERMINED — a warrior's quiet intensity before the strike. NOT smiling. Sharp eyes, tight jaw, coiled energy. She is precise and lethal. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "convergent-paths",
        prompt: `POSE — "CONVERGENT PATHS" (Ultimate — Light Transformation):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a wide combat stance with a prismatic sword. This pose is COMPLETELY DIFFERENT — standing STRAIGHT facing the viewer with BOTH arms at sides, transformed into pure light. Do NOT copy the reference combat stance.

TRANSFORMATION STATE: Waylay has activated her ultimate. Her entire body GLOWS with prismatic light energy — she is transforming into pure light itself. Rainbow-refracting energy radiates from her body in all directions. Her eyes emit bright prismatic light. Her hair floats upward, infused with rainbow energy.

Waylay faces the viewer STRAIGHT-ON. BOTH ARMS hang at her sides — relaxed but radiating power. Her body is the effect. Prismatic light WRAPS around her entire form, emanating outward.

Wide planted stance, weight even. An otherworldly being of pure light.

NO WEAPON, NO SWORD. The transformation itself is the spectacle.

Clean white background.`,
      },
      {
        name: "light-speed",
        prompt: `POSE — "LIGHT SPEED" (Prismatic Sprint — Speed Rush):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a wide combat stance. This pose is COMPLETELY DIFFERENT — SPRINTING STRAIGHT AT THE VIEWER at high speed. Do NOT copy the reference stance.

Waylay SPRINTS at full speed STRAIGHT AT THE VIEWER — body leaning forward aggressively, one foot forward in a long stride.

Her RIGHT HAND holds her PRISMATIC LIGHT SWORD — a blade made of refracting rainbow energy, glowing with purple, cyan, and gold tones. She grips it at her side while running.

Her LEFT ARM pumps FORWARD in a natural sprint motion.

PRISMATIC EFFECT: Rainbow light trails STREAM BACKWARD from her body — her speed creates prismatic afterimages and light refractions that cling to and trail from her form. Her silver hair streams back with prismatic sparkles.

Determined, focused expression — pure forward momentum.

Clean white background. ONLY the character sprinting with prismatic trails.`,
      },
      {
        name: "refract",
        prompt: `POSE — "REFRACT" (Prismatic Light — Crossed Arms):
SKELETON CHANGE: The reference shows a wide combat stance with sword. This pose is COMPLETELY DIFFERENT — standing STRAIGHT with ARMS CROSSED. Do NOT copy the reference stance.

POSE: Waylay faces the viewer STRAIGHT-ON. ARMS CROSSED over her chest — a confident, controlled warrior's stance. Wide planted stance. NO weapon in hands.

EFFECTS: Small prismatic light SHARDS and fragments FLOAT close to her body — hovering near her arms, shoulders, and through her hair. The prismatic light creates subtle rainbow refractions on her skin and clothes. Her silver/white hair catches prismatic highlights. The effect is SUBTLE and body-hugging, not explosive.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  // ============================================================
  // Phase 1: Controllers
  // ============================================================

  astra: {
    characterDesc: `FIRST IMAGE: Full-body reference for "Astra" — match her appearance EXACTLY from this image.
SECOND IMAGE: Face close-up reference.
Match the reference images' appearance and rendering style EXACTLY.`,
    palette: `Astra's palette: cosmic purple, gold, deep violet. The base outfit uses DEEP PURPLE/VIOLET and GOLD accents. Ability effects use BRIGHT COSMIC VIOLET (#7013E4) — a vivid purple glow. Secondary accents include hot magenta (#CB33B2) and pale gold sparkles (#FFFCC4) for star effects. The contrast is dark purple body vs luminous violet-purple energy.`,
    expression: `Expression is SERENE and TRANSCENDENT — a cosmic being gazing with quiet omniscience. Eyes calm, slight knowing look. She sees beyond mortal sight. NOT smiling. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "astral-form",
        prompt: `POSE — "ASTRAL FORM" (Ultimate — Cosmic Transformation):
SKELETON CHANGE: The reference shows an action pose with gun. This pose is COMPLETELY DIFFERENT — standing STRAIGHT facing the viewer with BOTH arms at sides, transformed.

TRANSFORMATION: Astra's body becomes SEMI-TRANSPARENT — infused with cosmic purple energy (#7013E4). Her skin and outfit take on a nebula-like quality with starlight points. Her eyes GLOW bright violet. Her hair floats upward, infused with cosmic energy.

POSE: Astra stands facing the viewer. BOTH ARMS relaxed at her sides. Wide stance. She IS the cosmic energy — her body radiates violet-purple light. Faint star constellation patterns appear around her feet.

EFFECTS: Cosmic violet (#7013E4) energy WRAPS around her entire body. Tiny pale gold (#FFFCC4) star sparkles float near her form. The energy is luminous and ethereal.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "nova-pulse",
        prompt: `POSE — "ASTRAL FORM" (Hooded — Cosmic Meditation):
SKELETON CHANGE: The reference shows an action pose. This pose is COMPLETELY DIFFERENT — standing with HOOD UP in a meditative cosmic state.

TRANSFORMATION (CRITICAL): Astra has PULLED HER PURPLE HOODED SHAWL UP over her head — the hood is now UP, covering her hair/mohawk. The hood is small and fitted, sitting over her head. This is her Astral Form state. Her body has a faint BLUE-VIOLET translucent energy outline.

POSE: Astra faces the viewer STRAIGHT-ON. HOOD UP. Her RIGHT HAND is raised in front of her chest, palm up — a small COSMIC STAR (bright violet-gold energy orb) floats above her open palm. Her LEFT ARM hangs at her side. Her eyes glow bright violet beneath the hood shadow. Quiet cosmic omniscience.

EFFECTS: The star in her palm emits cosmic violet (#7013E4) light with gold (#FFFCC4) sparkles. Her body has a faint blue-violet translucent glow. Small star constellation patterns near the orb.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "cosmic-divide",
        prompt: `POSE — "COSMIC DIVIDE" (Ultimate Wall — Walking Through):
SKELETON CHANGE: The reference shows an action pose. This pose is COMPLETELY DIFFERENT — WALKING FORWARD toward the viewer.

POSE: Astra WALKS forward toward the viewer — confident cosmic stride, one foot ahead. BOTH arms at sides in natural walking motion. Her cosmic energy flows with her movement.

EFFECTS: Cosmic violet (#7013E4) energy WRAPS around her body as she walks — nebula-like wisps clinging to her form and trailing behind. Gold star sparkles drift in her wake. The energy is body-hugging, not separate.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  brimstone: {
    characterDesc: `FIRST IMAGE: Full-body reference for "Brimstone" — match his appearance EXACTLY from this image.
SECOND IMAGE: Face close-up reference.
Match the reference images' appearance and rendering style EXACTLY.`,
    palette: `Brimstone's palette: dark gray, military charcoal, orange accents. The base outfit uses DARK GRAY tactical gear. Ability effects use WARM ORANGE (#F08A33) — military fire/incendiary glow. Orbital Strike leans redder (#E05030). Stim Beacon uses golden yellow (#FCC423). Orange beret is his signature. Contrast: dark military body vs warm orange fire energy.`,
    expression: `Expression is STOIC and COMMANDING — a veteran military leader. Hard jaw, steady eyes, no-nonsense. The quiet authority of someone who has seen everything. NOT smiling. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "orbital-strike",
        prompt: `POSE — "ORBITAL STRIKE" (Ultimate — Calling The Strike):
SKELETON CHANGE: The reference shows walking with rifle on shoulder. This pose is COMPLETELY DIFFERENT — pointing UP at the sky with one arm.

POSE: Brimstone faces the viewer STRAIGHT-ON. His RIGHT ARM points STRAIGHT UP at the sky — index finger extended, calling down an orbital strike from above. His LEFT HAND holds a small tactical wrist-device near his chest. Wide planted military stance, legs apart. He looks UPWARD with intense focus — his gaze follows his pointing arm to the sky.

EFFECTS: From above, warm orange (#F08A33) light beams DOWN onto him — an orange glow from the orbital strike above. The orange light illuminates his face and upraised arm from above. Faint orange energy particles rain down.

NO rifle.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "stim-beacon",
        prompt: `POSE — "STIM BEACON" (Combat Buff — Crossed Arms):
SKELETON CHANGE: The reference shows walking with rifle. This pose is COMPLETELY DIFFERENT — standing STRAIGHT with ARMS CROSSED.

POSE: Brimstone faces the viewer STRAIGHT-ON. ARMS CROSSED over his chest — veteran's confident stance. Wide planted military stance. Shoulders broad.

EFFECTS: Subtle golden-orange (#FCC423) energy aura WRAPS around his body — the stim beacon's enhancement effect. Faint warm glow on his arms and torso. The effect is subtle and body-hugging.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "incendiary",
        prompt: `POSE — "INCENDIARY" (Grenade Launcher — Hip Carry, Cigar):
SKELETON CHANGE: The reference shows walking with rifle. This pose is COMPLETELY DIFFERENT — casually holding a launcher at his hip.

POSE: Brimstone faces the viewer STRAIGHT-ON. His LEFT ARM holds a large, chunky tubular GRENADE LAUNCHER resting against his hip/thigh — one-handed, casual, like it weighs nothing. His RIGHT HAND is raised near his face, holding a lit CIGAR between two fingers — smoke curling upward. He takes a drag. The pose says "ready for war but in no rush." Wide relaxed military stance.

EFFECTS: Warm orange (#F08A33) glow from the cigar tip and faint embers. The launcher barrel has a subtle orange heat shimmer.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  viper: {
    characterDesc: `FIRST IMAGE: Full-body reference for "Viper" — match her appearance EXACTLY from this image.
SECOND IMAGE: Face close-up reference.
Match the reference images' appearance and rendering style EXACTLY.`,
    palette: `Viper's palette: toxic green, black, dark green. The base outfit uses BLACK and DARK GREEN — sleek tactical. Ability effects use TOXIC NEON GREEN (#00B441) — bright, saturated poison green. Darker gas shading uses #274B35. The contrast is dark black-green body vs vivid neon green toxic gas.`,
    expression: `Expression is COLD and VENOMOUS — predatory calm behind the mask. Calculating eyes, zero warmth. She is poison personified. NOT smiling. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "vipers-pit-a",
        prompt: `POSE — "VIPER'S PIT" Variant A (Ultimate — Insectoid Helmet, Standing):
SKELETON CHANGE: The reference shows walking forward. This pose is COMPLETELY DIFFERENT — standing with an aggressive INSECTOID HELMET.

TRANSFORMATION (CRITICAL — match the 3rd reference image EXACTLY): Viper has activated her ultimate. She wears a sharp, ANGULAR INSECTOID/SERPENTINE HELMET that covers her entire head. The helmet has: a large GOLDEN/YELLOW VISOR over the eyes (like insect compound eyes), sharp angular protrusions/horns on top, dark green-black armored plating with glowing green accent lines. The helmet looks like a SNAKE or INSECT HEAD — aggressive, predatory, alien. Her hair is completely hidden. Match the helmet design from the 3rd reference image precisely.

POSE: Viper stands facing the viewer STRAIGHT-ON. BOTH ARMS at her sides, fists clenched. Wide stance. Apex predator — still, silent, lethal.

EFFECTS: Toxic neon green (#00B441) gas RISES from below — swirling around her legs.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "vipers-pit-b",
        prompt: `POSE — "VIPER'S PIT" Variant B (Ultimate — Insectoid Helmet, Gas Control):
SKELETON CHANGE: The reference shows walking. COMPLETELY DIFFERENT — standing with helmet, arms spread low commanding gas.

TRANSFORMATION (CRITICAL — match 3rd reference image): Same ANGULAR INSECTOID/SERPENTINE HELMET — golden visor, sharp horns/protrusions, snake-head design. Match the 3rd reference image precisely.

POSE: Viper faces viewer STRAIGHT-ON. Both arms SPREAD LOW — palms facing down, fingers splayed, commanding the toxic gas. Slight forward lean. Wide stance.

EFFECTS: Toxic green (#00B441) gas rises responding to her hands. Green glow from below illuminates the golden visor.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "vipers-pit-c",
        prompt: `POSE — "VIPER'S PIT" Variant C (Ultimate — Insectoid Helmet, Walking):
SKELETON CHANGE: The reference shows normal walk. COMPLETELY DIFFERENT — walking through gas with insectoid helmet.

TRANSFORMATION (CRITICAL — match 3rd reference image): Same ANGULAR INSECTOID/SERPENTINE HELMET — golden visor, sharp horns, snake-head design. Match precisely.

POSE: Viper WALKS forward through dense green gas toward the viewer. One foot ahead, predatory stride. Arms at sides. The golden visor catches green glow.

EFFECTS: Dense toxic green (#00B441) gas wraps her lower body. Gas trails behind.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "snake-bite-a",
        prompt: `POSE — "SNAKE BITE" Variant A (Dual Palm Spray):
SKELETON CHANGE: The reference shows walking. This is COMPLETELY DIFFERENT — standing with both palms spraying toxin.

POSE: Viper faces viewer in 3/4 turn. BOTH HANDS extended at different heights — LEFT at waist, RIGHT at shoulder — palms facing outward, fingers spread. Toxic green sprays from both palms. Green tubes from her backpack connect to her palm sprayers. Aggressive lean forward.

EFFECTS: Toxic green (#00B441) streams SPRAY from both palms. Green mist around hands. Normal half-mask (NOT helmeted).

NO weapons. FRAMING: FULL BODY head-to-toe, 85% vertical fill. Clean white background.`,
      },
      {
        name: "snake-bite-b",
        prompt: `POSE — "SNAKE BITE" Variant B (One Hand Poison Drip):
SKELETON CHANGE: The reference shows walking. COMPLETELY DIFFERENT — one hand dripping poison.

POSE: Viper faces viewer STRAIGHT-ON. Her LEFT ARM extends to the side at waist height, palm DOWN — toxic green liquid DRIPS from her fingers like venom. RIGHT hand near her chin, index finger tapping her mask thoughtfully. Head tilted, cold calculating gaze.

EFFECTS: Green (#00B441) liquid drips from left hand, trailing green gas. Normal half-mask. Faint green glow on left side.

NO weapons. FRAMING: FULL BODY head-to-toe, 85% vertical fill. Clean white background.`,
      },
      {
        name: "snake-bite-c",
        prompt: `POSE — "SNAKE BITE" Variant C (Tossing Canister):
SKELETON CHANGE: The reference shows walking. COMPLETELY DIFFERENT — casually tossing a toxic canister.

POSE: Viper faces viewer STRAIGHT-ON. Her RIGHT HAND is raised, TOSSING a small green-glowing TOXIC CANISTER upward — catching it mid-air, casually juggling it. LEFT ARM at her side. Slight tilt of head — bored, contemptuous, as if the canister is a toy.

EFFECTS: The canister GLOWS toxic green (#00B441), green mist leaks from it mid-air. Normal half-mask. Faint green aura around the canister.

NO weapons. FRAMING: FULL BODY head-to-toe, 85% vertical fill. Clean white background.`,
      },
      {
        name: "toxic-screen",
        prompt: `POSE — "TOXIC SCREEN" (Poison Sweep — Arm Trailing Gas):
SKELETON CHANGE: The reference shows walking forward. This pose is COMPLETELY DIFFERENT — one arm sweeping wide with a trail of toxic gas.

POSE: Viper faces the viewer in a slight 3/4 turn. Her RIGHT ARM is fully extended to her RIGHT SIDE at hip height, fingers spread — she has just SWEPT her arm outward, deploying a toxic screen. Her LEFT ARM is at her side. Her body has a slight twist from the sweeping motion. She looks over her RIGHT shoulder toward the viewer.

EFFECTS: A trail of toxic neon green (#00B441) gas follows her sweeping right arm — a ribbon of poison gas that arcs from her hand and trails behind her arm's path. The gas clings to her arm and streams outward. Green glow illuminates her right side.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  harbor: {
    characterDesc: `FIRST IMAGE: Full-body reference for "Harbor" — match his appearance EXACTLY from this image.
SECOND IMAGE: Face close-up reference.
Match the reference images' appearance and rendering style EXACTLY.`,
    palette: `Harbor's palette: teal, deep aqua, gold/bronze accents. The base outfit uses TEAL GREEN and DARK NAVY. Ability effects use DEEP TEAL-AQUA — NOT bright cyan. Use #76DDD0 for bright water glow highlights and #11434E for deeper water tones. His ancient bracelet/artifact glows with gilded teal-blue energy. Gold/bronze accents on his artifact and gear.`,
    expression: `Expression is CALM and RESOLUTE — a guardian's steady determination. Warm but serious eyes. The quiet strength of an ancient protector. NOT smiling. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "reckoning",
        prompt: `POSE — "RECKONING" (Ultimate — Water Power):
SKELETON CHANGE: The reference shows a 3/4 pose with weapon. This pose is COMPLETELY DIFFERENT — standing STRAIGHT facing the viewer with BOTH arms at sides.

POSE: Harbor faces the viewer STRAIGHT-ON. BOTH ARMS at his sides, relaxed but radiating power. Wide grounded stance. His artifact bracelet GLOWS with teal energy.

EFFECTS: Teal-aqua (#76DDD0) water energy RISES from below his feet, wrapping around his body upward. The water has a deep teal (#11434E) interior with bright aqua highlights. Water energy clings to his arms and torso. His eyes glow faintly teal.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "cascade",
        prompt: `POSE — "CASCADE" (Water Wave — Crossed Arms):
SKELETON CHANGE: The reference shows a 3/4 pose. This pose is COMPLETELY DIFFERENT — standing STRAIGHT with ARMS CROSSED.

POSE: Harbor faces the viewer STRAIGHT-ON. ARMS CROSSED over his chest — a guardian's calm confidence. Wide stance. His artifact bracelet visible and glowing.

EFFECTS: Teal-aqua (#76DDD0) water energy aura WRAPS subtly around his body. His bracelet emits a teal glow that illuminates one side of his face. Faint water droplets/wisps float near him.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "cove",
        prompt: `POSE — "COVE" (Water Shield — Walking):
SKELETON CHANGE: The reference shows a 3/4 pose. This pose is COMPLETELY DIFFERENT — WALKING FORWARD toward the viewer.

POSE: Harbor WALKS forward toward the viewer — steady guardian's stride. One foot ahead. BOTH arms in natural walking motion. Determined expression.

EFFECTS: Teal-aqua (#76DDD0) water energy flows alongside him — clinging to his body and trailing behind. A faint water-energy shimmer in front of him like a semi-visible shield. The energy is body-hugging and fluid.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  clove: {
    characterDesc: `FIRST IMAGE: Full-body reference for "Clove" — match their appearance EXACTLY from this image.
SECOND IMAGE: Face close-up reference.
Match the reference images' appearance and rendering style EXACTLY.`,
    palette: `Clove's palette: pink, purple, blue, gold accents. The outfit is dominated by a PINK SHORT-SLEEVED JACKET (the most eye-catching piece — NOT black) over a BLACK long-sleeved SHIRT with WHITE sleeves. Purple shorts, dark blue leggings with butterfly decorations, purple shoes with white soles, gold/amber accents. Ability effects use VIVID MAGENTA-PINK (#C347C7). Butterflies shimmer iridescent pink-to-purple. The PINK JACKET is the signature — do NOT make it black.`,
    expression: `Expression is MISCHIEVOUS and UNBOTHERED — a youthful defiance of death itself. Slight smirk, relaxed confidence. They don't take death seriously. A bit more expressive than other agents — Clove's personality allows it. But still RESTRAINED.`,
    poses: [
      {
        name: "not-dead-yet",
        prompt: `POSE — "NOT DEAD YET" (Ultimate — Undead Resurrection):
SKELETON CHANGE: The reference shows a crouching pose. This pose is COMPLETELY DIFFERENT — standing STRAIGHT facing the viewer with BOTH arms at sides.

TRANSFORMATION: Clove has just resurrected — their body is SEMI-TRANSPARENT with an ethereal lavender-magenta aura. Magenta-pink (#C347C7) energy radiates from their entire form. They are between life and death.

POSE: Clove stands facing the viewer. BOTH ARMS at their sides, relaxed. Head tilted slightly up — transcending death with casual defiance. Wide stance.

EFFECTS: Magenta-pink (#C347C7) and deep purple (#4B1D80) energy WRAPS around their entire body — ethereal smoke/mist clinging to their form. Dark purple butterflies float near their body. The energy is ghostly and luminous.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "meddle-a",
        prompt: `POSE — "MEDDLE" Variant A (Butterfly On Hand — Looking At It):
SKELETON CHANGE: The reference shows a crouching pose. This pose is COMPLETELY DIFFERENT — one hand raised with a butterfly perched on it.

POSE: Clove faces the viewer in slight 3/4 turn. Their RIGHT HAND is raised to face level, palm up — a single large magenta-purple BUTTERFLY sits on their fingertips. They look at the butterfly with a mischievous half-smile, head tilted. LEFT HAND in jacket pocket. Weight on one hip.

EFFECTS: The butterfly GLOWS magenta-pink (#C347C7). Smaller butterflies float nearby. Faint magenta aura.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "meddle-b",
        prompt: `POSE — "MEDDLE" Variant B (Butterfly On Finger — Pointing Up):
SKELETON CHANGE: The reference shows a crouching pose. This pose is COMPLETELY DIFFERENT — one finger raised with a butterfly landing on it.

POSE: Clove faces the viewer STRAIGHT-ON. Their RIGHT INDEX FINGER points UP — a glowing magenta butterfly is LANDING on the tip of their finger. They watch it with a playful smirk, chin tilted up slightly. LEFT ARM relaxed at their side. Casual stance, weight shifted to one leg.

EFFECTS: The butterfly GLOWS magenta-pink (#C347C7). Trail of smaller butterflies flutter around their head and shoulders.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "meddle-c",
        prompt: `POSE — "MEDDLE" Variant C (Blowing Butterflies — Playful):
SKELETON CHANGE: The reference shows a crouching pose. This pose is COMPLETELY DIFFERENT — blowing butterflies from an open palm.

POSE: Clove faces the viewer STRAIGHT-ON. BOTH HANDS cupped together at chest level — they BLOW across their open palms, sending a burst of magenta butterflies flying outward toward the viewer. Eyes playful and mischievous, slight smile. The blowing gesture is gentle and magical.

EFFECTS: Multiple magenta-pink (#C347C7) butterflies FLY outward from their cupped hands — scattering toward the viewer. Magenta sparkles trail from the butterflies.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "pick-me-up",
        prompt: `POSE — "PICK-ME-UP" (Soul Absorb — Floating Surrounded By Butterflies):
SKELETON CHANGE: The reference shows a crouching pose. This pose is COMPLETELY DIFFERENT — FLOATING slightly above the ground, surrounded by butterflies.

POSE: Clove FLOATS slightly above the ground — feet ~15cm off the ground, body relaxed and weightless. Their head is tilted back slightly, eyes closed, arms loose at their sides with palms slightly open — absorbing energy. Hair floats upward from the supernatural lift. A serene, death-defying pose.

EFFECTS: A SWARM of magenta-pink (#C347C7) and deep purple (#4B1D80) butterflies surround their floating body — orbiting, swirling, some landing on their arms and jacket. Magenta energy wisps rise from below, lifting them. The butterflies create a halo effect around their form.

NO weapons.

FRAMING: FULL BODY head-to-toe (including gap below floating feet), 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },
};

// ============================================================
// 전체 요원 목록 (config에 등록된 것만)
// ============================================================
const getAvailableAgents = (): string[] => Object.keys(AGENT_CONFIGS);

const getAgentConfig = (name: string): AgentConfig | undefined =>
  AGENT_CONFIGS[name];

export { getAvailableAgents, getAgentConfig };
export type { AgentConfig, PoseConfig };
