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

  // ============================================================
  // Phase 2: Initiators
  // ============================================================

  breach: {
    characterDesc: `FIRST IMAGE: Full-body reference for "Breach" — match his appearance EXACTLY. He has MASSIVE MECHANICAL ARMS (both arms are cybernetic/prosthetic from the shoulders down).
SECOND IMAGE: Face close-up reference.
Match the reference images' appearance and rendering style EXACTLY.`,
    palette: `Breach's palette: orange, metal gray, black. The base outfit uses DARK GRAY/BLACK tactical gear with orange accents. His MECHANICAL ARMS are metallic gray with ORANGE energy glowing between the joints. Ability effects use FIERY ORANGE (#D4631D) — hot amber-orange seismic energy. The contrast is dark metallic body vs vivid orange kinetic glow.`,
    expression: `Expression is AGGRESSIVE and UNFLINCHING — a brawler who runs toward the fight. Hard stare, set jaw, zero hesitation. NOT smiling. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "rolling-thunder",
        prompt: `POSE — "ROLLING THUNDER" (Ultimate — Ground Slam):
SKELETON CHANGE: The reference shows a standing pose. This pose is COMPLETELY DIFFERENT — SLAMMING both mechanical fists toward the ground.

POSE: Breach faces the viewer STRAIGHT-ON. He SLAMS both MASSIVE MECHANICAL FISTS downward — arms raised high and crashing down, body leaning forward with the impact. Knees bent in a wide power stance. The mechanical arms are the focal point — huge, metallic, glowing orange at the joints.

EFFECTS: Fiery orange (#D4631D) SHOCKWAVE RINGS radiate outward from where his fists meet the ground — concentric energy rings spreading along the floor. Orange energy cracks run up his mechanical arms.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "aftershock",
        prompt: `POSE — "AFTERSHOCK" (Kinetic Punch — Wall Break):
SKELETON CHANGE: The reference shows a standing pose. This is COMPLETELY DIFFERENT — one mechanical arm PUNCHING FORWARD.

POSE: Breach faces the viewer in slight 3/4 turn. His RIGHT MECHANICAL ARM is fully extended FORWARD in a devastating punch — fist clenched, arm at full extension. His LEFT MECHANICAL ARM is pulled back, elbow bent, ready for the next strike. Weight shifted forward onto his front leg. A boxer's follow-through.

EFFECTS: Fiery orange (#D4631D) energy EXPLODES from his extended fist — a shockwave burst at the point of impact. Orange energy lines trace along the extended arm's joints. The kinetic energy is concentrated at the fist.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "fault-line",
        prompt: `POSE — "FAULT LINE" (Seismic — Cracking Knuckles):
SKELETON CHANGE: The reference shows a standing pose. This is COMPLETELY DIFFERENT — cracking mechanical knuckles threateningly.

POSE: Breach faces the viewer STRAIGHT-ON. He CRACKS his mechanical knuckles — LEFT fist pressed into RIGHT open palm at chest height, mechanical fingers interlocking and flexing. Head tilted down slightly, looking up at the viewer through his brow — pure menace. Wide grounded stance.

EFFECTS: Orange (#D4631D) sparks FLY from the knuckle-cracking gesture — tiny kinetic energy bursts where metal meets metal. Faint orange glow between the interlocked mechanical fingers. The energy is subtle — the intimidation IS the pose.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  fade: {
    characterDesc: `FIRST IMAGE: Full-body reference for "Fade" — match her appearance EXACTLY from this image.
SECOND IMAGE: Face close-up reference.
Match the reference images' appearance and rendering style EXACTLY.`,
    palette: `Fade's palette: dark indigo, black, nightmare purple. The base outfit uses DARK BLACK/NAVY. Ability effects use DARK NIGHTMARE INDIGO (#2A1A4E) — almost black with deep purple undertones. Think: dark ink, not bright purple. Her nightmare creatures are shadowy dark with faint indigo trailing energy. The effect is DARK and OMINOUS, not colorful.`,
    expression: `Expression is PIERCING and UNSETTLING — she sees your fears. Intense dark eyes that look THROUGH the viewer. An unsettling calm. NOT smiling. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "nightfall",
        prompt: `POSE — "NIGHTFALL" (Ultimate — Nightmare Tendrils):
SKELETON CHANGE: The reference shows a standing pose. This is COMPLETELY DIFFERENT — standing with dark tendrils extending from her body.

POSE: Fade faces the viewer STRAIGHT-ON. Her arms are slightly raised at her sides, palms facing outward. Dark NIGHTMARE TENDRILS extend from her back, shoulders, and arms — shadowy ink-like appendages reaching outward in multiple directions. She is the source of the nightmare. Wide stance, eerily calm.

EFFECTS: Dark indigo (#2A1A4E) nightmare tendrils — like living ink/shadow — extend from her body. The tendrils are semi-transparent, dark, almost black with faint purple edges. They reach and coil around her.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "haunt",
        prompt: `POSE — "HAUNT" (Nightmare Eye — Holding Orb):
SKELETON CHANGE: The reference shows a standing pose. This is COMPLETELY DIFFERENT — holding a nightmare eye orb.

POSE: Fade faces the viewer STRAIGHT-ON. Her RIGHT HAND is raised to face level — she holds a dark NIGHTMARE EYE ORB (a hovering dark sphere with a single glowing eye/iris in its center). She gazes at it with dark fascination. Her LEFT ARM hangs at her side. Slight head tilt — studying her creation.

EFFECTS: The nightmare eye orb GLOWS with a faint dark indigo (#2A1A4E) aura. Dark wisps trail from the orb. The eye in the orb looks toward the viewer. Faint nightmare ink trails connect the orb to her hand.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "prowler",
        prompt: `POSE — "PROWLER" (Shadow Creature — Commanding):
SKELETON CHANGE: The reference shows a standing pose. This is COMPLETELY DIFFERENT — directing a shadow creature at her feet.

POSE: Fade faces the viewer in slight 3/4 turn. Her RIGHT HAND extends FORWARD, fingers spread in a commanding gesture — directing her Prowler creature. At her feet/beside her legs, a dark SHADOW CREATURE (Prowler — a small quadruped beast made of dark nightmare ink) crouches, ready to attack in the direction she points. Her LEFT ARM at her side.

EFFECTS: Dark indigo (#2A1A4E) nightmare energy connects her commanding hand to the Prowler — shadowy ink trails. The Prowler is dark, semi-transparent, with faint glowing eyes.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  gekko: {
    characterDesc: `FIRST IMAGE: Full-body character reference — match EXACTLY.
SECOND IMAGE: Face close-up — match EXACTLY.`,
    palette: `Ability effects: green (#5EBD3E), purple (#7C37E7), yellow/golden — vibrant multi-color energy auras. All bioluminescent abstract glow.`,
    expression: `Expression is FRIENDLY and ENERGETIC — an LA kid bursting with energy. Genuine smile allowed (Gekko is one of the few agents where warmth fits). Bright eyes, open expression. More expressive than most Valorant agents.`,
    poses: [
      {
        name: "mosh-pit",
        prompt: `POSE — "MOSH PIT" (Energy Eruption — Arms Wide):
SKELETON CHANGE: The reference shows a standing pose. This is COMPLETELY DIFFERENT — both arms spread wide with energy erupting from the ground.

POSE: Gekko faces the viewer STRAIGHT-ON. BOTH ARMS spread WIDE open to the sides, palms facing outward — an exuberant "bring it on" stance. Wide relaxed stance, genuine grin, chest open. ATTITUDE: overflowing energy — a kid who can barely contain the power inside him.

EFFECTS: Green (#5EBD3E) energy erupts upward from the ground around his feet. Purple (#7C37E7) wisps rise from his shoulders.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "dizzy",
        prompt: `POSE — "DIZZY" (Flying Creature — Reaching Up):
SKELETON CHANGE: The reference shows a standing pose. This is COMPLETELY DIFFERENT — reaching up toward a flying creature.

POSE: Gekko faces the viewer STRAIGHT-ON. His RIGHT ARM reaches UP above his head, fingers open — a small floating BLUE ARMADILLO-LIKE CREATURE (Dizzy — see 4th reference icon) hovers above his hand. Dizzy is BLUE (plasma blue), rounded/curled like an armadillo, with a tail. She floats. His LEFT HAND on his hip. He looks UP at Dizzy with a warm smile.

EFFECTS: Dizzy GLOWS BLUE (plasma blue, NOT green) — a small floating armadillo creature with gelatinous translucent quality. Faint blue trail from the creature.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "wingman",
        prompt: `POSE — "WINGMAN" (Confident Walk — Shaka Gesture):
SKELETON CHANGE: The reference shows a standing pose. This is COMPLETELY DIFFERENT — walking casually forward with a relaxed shaka hand sign.

POSE: Gekko WALKS forward toward the viewer — casual LA stroll, one foot ahead, relaxed swagger. His RIGHT HAND in his jacket pocket. His LEFT HAND makes a relaxed SHAKA gesture (hang loose sign) at his side. He looks at the viewer with a confident grin. ATTITUDE: self-assured youth — a kid strolling into battle like it's just another sunny day.

EFFECTS: Green (#5EBD3E) and golden (#DAA520) bioluminescent glow trails behind him from his footsteps.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  kayo: {
    characterDesc: `FIRST IMAGE: Full-body reference for "KAY/O" — match his appearance EXACTLY. He is a WAR ROBOT — fully mechanical, large, armored.
SECOND IMAGE: Face close-up reference (mechanical head/visor).
Match the reference images' appearance and rendering style EXACTLY.`,
    palette: `KAY/O's palette: metal gray, black, blue energy accents. The body is DARK METALLIC GRAY/BLACK armored plating — a war machine. Ability effects use POLARIZED BLUE (#4466FF) — a deep electric blue radianite energy. The blue light glows from joints, visor, and core. Suppression effects are blue-purple. The contrast is dark metal vs vivid blue energy.`,
    expression: `KAY/O has NO facial expression — he is a robot. His visor/eye slit GLOWS with blue light. Mechanical head, no emotions. The body language IS the expression.`,
    poses: [
      {
        name: "null-cmd",
        prompt: `POSE — "NULL/CMD" (Ultimate — Overload):
SKELETON CHANGE: The reference shows a standing pose. This is COMPLETELY DIFFERENT — overloading with energy bursting from joints.

TRANSFORMATION: KAY/O has activated his ultimate. BRIGHT BLUE (#4466FF) ENERGY bursts from ALL his joints — shoulders, elbows, knees, chest core, visor. He is overloading with radianite suppression energy. The energy is intense, almost blinding at the joints.

POSE: KAY/O stands facing the viewer STRAIGHT-ON. Both arms slightly raised at his sides, fists clenched — his body is RIGID with energy overload. Wide planted mechanical stance. Energy pours from every seam.

EFFECTS: Polarized blue (#4466FF) energy BURSTS from all joints and seams. His chest core blazes with blue light. Visor glows intensely. Suppression pulse waves radiate from his body.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "zero-point",
        prompt: `POSE — "ZERO/POINT" (Suppression Knife — Spinning):
SKELETON CHANGE: The reference shows a standing pose. This is COMPLETELY DIFFERENT — spinning a knife on one finger.

POSE: KAY/O faces the viewer STRAIGHT-ON. His RIGHT HAND is raised to chest height — a glowing blue SUPPRESSION KNIFE spins on the tip of his index finger, balanced perfectly. His LEFT ARM hangs at his side. His visor is angled toward the spinning knife. Even a robot can show nonchalance.

EFFECTS: The knife GLOWS polarized blue (#4466FF) as it spins — blue energy trails from the rotation. Faint suppression pulse ripples from the knife.

NO weapons except the knife.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "fragment",
        prompt: `POSE — "FRAG/MENT" (War Machine — Grenade Hold):
SKELETON CHANGE: The reference shows a standing pose. This is COMPLETELY DIFFERENT — holding a glowing grenade, ready to throw.

POSE: KAY/O faces the viewer STRAIGHT-ON. His RIGHT ARM is pulled back at shoulder height — holding a glowing blue FRAG GRENADE, ready to throw. His LEFT ARM is extended forward for balance — pointing at where the grenade will land. A quarterback's throwing stance. Mechanical body angled in the throw.

EFFECTS: The grenade GLOWS polarized blue (#4466FF). Blue energy lines trace from the grenade along his arm to his shoulder joint. Faint blue glow on his visor.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  skye: {
    characterDesc: `FIRST IMAGE: Full-body reference for "Skye" — match her appearance EXACTLY from this image.
SECOND IMAGE: Face close-up reference.
Match the reference images' appearance and rendering style EXACTLY.`,
    palette: `Skye's palette: nature green, brown, gold accents. The base outfit uses EARTHY BROWN/GREEN tactical gear with nature elements. Ability effects use NATURE GREEN (#5EBD3E) — earthy forest green. Her hawk creature has golden-amber accents. Healing energy is soft green glow. The contrast is earthy outfit vs luminous nature green energy.`,
    expression: `Expression is DETERMINED and PROTECTIVE — an Australian nature warrior. Steady focused eyes, set jaw. She's here to protect her team. NOT smiling, but warmer than most agents. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "seekers",
        prompt: `POSE — "SEEKERS" (Ultimate — Nature Channeling):
SKELETON CHANGE: The reference shows a standing pose. This is COMPLETELY DIFFERENT — channeling nature energy with both hands raised.

POSE: Skye faces the viewer STRAIGHT-ON. BOTH HANDS raised to shoulder height, palms facing upward — she CHANNELS nature energy, green wisps rising from her open palms. Eyes glow faintly green with concentration. Hair and clothing lift slightly from the energy. Wide grounded stance.

EFFECTS: Nature green (#5EBD3E) energy rises from her palms — organic, vine-like wisps that spiral upward. Faint green particles float around her like pollen. The energy is natural, alive, organic — not mechanical.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "guiding-light",
        prompt: `POSE — "GUIDING LIGHT" (Hawk — Perched on Arm):
SKELETON CHANGE: The reference shows a standing pose. This is COMPLETELY DIFFERENT — a hawk perched on her extended forearm.

POSE: Skye faces the viewer in slight 3/4 turn. Her RIGHT ARM extends outward at shoulder height — a glowing green-gold HAWK SPIRIT perches on her forearm. The hawk is made of nature energy — translucent green with golden edges. She looks at the hawk with quiet pride. LEFT ARM at her side. Confident stance.

EFFECTS: The hawk GLOWS nature green (#5EBD3E) with golden (#DAA520) highlights on its wing edges. Green energy wisps connect the hawk to her arm. The hawk looks toward the viewer.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "trailblazer",
        prompt: `POSE — "TRAILBLAZER" (Tiger Spirit — Summoning):
SKELETON CHANGE: The reference shows a standing pose. This is COMPLETELY DIFFERENT — summoning a tiger spirit from her hands.

POSE: Skye faces the viewer STRAIGHT-ON. BOTH ARMS extended forward at waist height — from between her hands, a GREEN TIGER SPIRIT is FORMING. The tiger is made of translucent nature energy — a spectral big cat emerging from her channeled power. She looks at the viewer with fierce determination. Wide stance.

EFFECTS: Nature green (#5EBD3E) tiger spirit FORMS from energy between her hands — a translucent, ghostly tiger head/body taking shape. Green energy swirls around the forming creature. Vine-like energy connects to her hands.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  sova: {
    characterDesc: `FIRST IMAGE: Full-body reference for "Sova" — match his appearance EXACTLY from this image.
SECOND IMAGE: Face close-up reference.
Match the reference images' appearance and rendering style EXACTLY.`,
    palette: `Sova's palette: blue, white, silver. The base outfit uses WHITE/LIGHT BLUE tactical gear with silver accents. Ability effects use ELECTRIC CYAN-BLUE (#38B3DD) — bright scanning/recon blue. His bow and arrows glow with blue energy. Owl drone is blue-tinted. The contrast is clean white outfit vs vivid cyan-blue energy.`,
    expression: `Expression is CALM and ANALYTICAL — a patient hunter reading the terrain. Sharp calculating eyes, slight squint as if tracking prey. NOT smiling. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "hunters-fury",
        prompt: `POSE — "HUNTER'S FURY" (Ultimate — Drawing Bow):
SKELETON CHANGE: The reference shows walking with bow lowered. This is COMPLETELY DIFFERENT — DRAWING the bow with an energy arrow.

POSE: Sova faces the viewer in slight 3/4 turn. His LEFT ARM extends forward, gripping the BOW. His RIGHT ARM pulls back the BOWSTRING to his cheek — a fully drawn shot. An energy ARROW sits on the string, glowing intense cyan-blue. One eye squints in aim. Athletic archer stance — back straight, weight on back leg.

EFFECTS: The arrow GLOWS electric cyan-blue (#38B3DD) — intense energy radiates from the arrowhead. Blue light illuminates his face from the drawn arrow. Energy lines trace along the bowstring.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "owl-drone",
        prompt: `POSE — "OWL DRONE" (Recon — Owl on Shoulder):
SKELETON CHANGE: The reference shows walking. This is COMPLETELY DIFFERENT — standing with an owl drone on his shoulder.

POSE: Sova faces the viewer STRAIGHT-ON. A small blue-tinted OWL DRONE perches on his RIGHT SHOULDER — a mechanical/energy owl with glowing blue eyes. Sova's RIGHT HAND rests on the bow slung across his back. His LEFT HAND touches his chin thoughtfully — analyzing incoming data. He looks at the viewer with analytical calm.

EFFECTS: The owl drone GLOWS cyan-blue (#38B3DD) — a small mechanical owl with blue energy eyes. Faint blue scanning lines emit from the owl's eyes. Blue holographic data fragments float near the owl.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "recon-bolt",
        prompt: `POSE — "RECON BOLT" (Scanning Arrow — Examining):
SKELETON CHANGE: The reference shows walking. This is COMPLETELY DIFFERENT — holding an arrow up for inspection.

POSE: Sova faces the viewer STRAIGHT-ON. His RIGHT HAND holds a RECON ARROW up to eye level — examining the glowing tip between his fingers. The arrow tip pulses with scanning energy. His LEFT HAND holds the bow at his side, relaxed. He tilts his head, inspecting the arrow's charge with a hunter's precision.

EFFECTS: The recon arrow tip GLOWS cyan-blue (#38B3DD) — pulsing with scanning energy. Faint blue sonar rings radiate from the arrow tip. Blue light illuminates his face.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  tejo: {
    characterDesc: `FIRST IMAGE: Full-body reference for "Tejo" — match his appearance EXACTLY from this image.
SECOND IMAGE: Face close-up reference.
Match the reference images' appearance and rendering style EXACTLY.`,
    palette: `Tejo's palette: olive, military tan, black, orange accents. The base outfit uses OLIVE/DARK TAN military tactical gear. Ability effects use WARM AMBER-ORANGE (#D4761D) — military explosion/bombing orange, slightly warmer and more golden than Breach's fiery orange. Tactical HUD elements use amber holographic glow. The contrast is muted military outfit vs warm amber explosions.`,
    expression: `Expression is FOCUSED and OPERATIONAL — a military professional executing a plan. His SUNGLASSES are OPAQUE — you CANNOT see his eyes through them. The sunglasses reflect light, hiding his gaze completely. This opacity makes him look MORE intimidating, not less. Mission-first mentality. NOT smiling. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "armageddon",
        prompt: `POSE — "ARMAGEDDON" (Ultimate — Tactical Tablet Strike):
SKELETON CHANGE: The reference shows a relaxed standing pose with arms down. This is COMPLETELY DIFFERENT — both arms forward operating a device.

POSE: Tejo STANDS facing the viewer STRAIGHT-ON. BOTH ARMS are raised in front of his chest — he holds a TACTICAL TABLET between both hands, fingers tapping coordinates. A large HOLOGRAPHIC MAP/TARGETING DISPLAY projects upward from the tablet, showing bombing coordinates. He stares through the hologram with cold operational focus. Wide military stance, jacket open.

EFFECTS: The tablet GLOWS warm amber (#D4761D). A holographic targeting display projects ABOVE the tablet — amber gridlines, coordinate numbers, bombing zone circles. Amber light illuminates his face from below. His OPAQUE SUNGLASSES reflect the hologram.

NO weapons. Only the tactical tablet device.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "guided-salvo",
        prompt: `POSE — "GUIDED SALVO" (Tactical Commander — Directing Strike):
SKELETON CHANGE: The reference shows a relaxed standing pose. This is COMPLETELY DIFFERENT — commanding military stance directing an attack.

POSE: Tejo faces the viewer STRAIGHT-ON. His RIGHT ARM extends forward, pointing with two fingers — designating a target with absolute authority. His LEFT HAND holds a small TACTICAL DEVICE at his hip. Wide power stance, chest out, shoulders back. He embodies a military commander who just gave the order. His OPAQUE SUNGLASSES reflect amber light — eyes NOT visible. Jacket slightly open, showing tactical vest underneath.

EFFECTS: Warm amber (#D4761D) energy aura surrounds his body — faint explosive energy radiating outward. Holographic targeting data trails from his pointing fingers. His sunglasses glow amber.

NO large weapons. Only the small tactical device.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "stealth-drone",
        prompt: `POSE — "STEALTH DRONE" (Recon — Sprinting With Drone):
SKELETON CHANGE: The reference shows a relaxed standing pose. This is COMPLETELY DIFFERENT — running/sprinting forward in action.

POSE: Tejo is MID-SPRINT toward the viewer, leaning forward aggressively. His RIGHT ARM pumps back, LEFT ARM forward — full running motion. His jacket FLARES behind him from speed. A small CRAB-LIKE GROUND DRONE with legs (NOT propellers) runs alongside his feet, keeping pace. He looks straight ahead through his opaque sunglasses — locked on target.

EFFECTS: The drone's amber (#D4761D) lights glow as it scuttles alongside. Motion blur lines behind his jacket. Amber holographic data trails from his sunglasses.

NO weapons in hands.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  // ============================================================
  // Phase 3: Sentinels
  // ============================================================

  chamber: {
    characterDesc: `FIRST IMAGE: Full-body character reference — match EXACTLY.
SECOND IMAGE: Face close-up — match EXACTLY.
Additional ref shows his HEADHUNTER pistol.`,
    palette: `Ability effects: gold (#FFD700) — luxurious metallic gold energy. Gold particles and aura.`,
    expression: `Expression is SMUG and REFINED — a man who knows he's the best and dresses the part. Slight confident smirk, one eyebrow slightly raised. French sophistication. NOT a big smile. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "tour-de-force",
        prompt: `POSE — "TOUR DE FORCE" (Sniper On Shoulder):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — one hand holds a gold sniper rifle resting on shoulder, the other adjusts his lapel.

POSE: Chamber faces the viewer STRAIGHT-ON. His RIGHT HAND holds a sleek GOLD-ACCENTED SNIPER RIFLE resting on his RIGHT SHOULDER — barrel pointing up and behind him. His LEFT HAND adjusts his suit lapel casually. Weight on one hip, confident lean. ATTITUDE: luxurious authority — the weapon is a fashion accessory, not a tool of war.

EFFECTS: Gold (#FFD700) light rises from the sniper barrel. Faint gold glow on the right side of his face.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "headhunter",
        prompt: `POSE — "HEADHUNTER" (Gold Pistol — Casual Hold):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — holding his signature gold pistol with extreme nonchalance.

POSE: Chamber faces the viewer STRAIGHT-ON. His RIGHT HAND holds his HEADHUNTER gold pistol (see ref image) raised beside his head, barrel pointing UP. His LEFT HAND in his suit pocket. Weight shifted to one hip. ATTITUDE: extreme nonchalance — he treats a lethal weapon like jewelry.

EFFECTS: The Headhunter glows gold (#FFD700). Gold light illuminates the right side of his face from the weapon.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "rendezvous",
        prompt: `POSE — "RENDEZVOUS" (Finger Snap — Teleport):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — snapping fingers with pure style, no weapons.

POSE: Chamber faces the viewer in slight 3/4 turn. His RIGHT HAND raised at head height — fingers in a SNAP GESTURE, thumb and middle finger just touching. His LEFT HAND at his side, relaxed. One foot slightly lifted — about to vanish. ATTITUDE: pure style — effortless superiority in a single gesture.

EFFECTS: Gold (#FFD700) sparks fall downward from his snapping fingers. Faint gold glow at his feet.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  cypher: {
    characterDesc: `FIRST IMAGE: Full-body reference for "Cypher" — match his appearance EXACTLY. He wears a distinctive WHITE HAT and face-covering mask with hexagonal eye panels.
SECOND IMAGE: Face close-up reference.
Match the reference images' appearance and rendering style EXACTLY.`,
    palette: `Cypher's palette: white, black, cyan-blue accents. The base outfit uses WHITE (hat, shirt) and BLACK (coat, pants). Ability effects use ELECTRIC CYAN (#24FBFF) — bright digital surveillance blue. His mask eyes glow cyan. Wires and digital energy are his signature. The contrast is classic black-white outfit vs vivid cyan tech glow.`,
    expression: `Cypher's face is HIDDEN behind his mask — hexagonal eye panels glow CYAN. No visible expression. The mask and hat ARE his identity. Mysterious, all-knowing.`,
    poses: [
      {
        name: "neural-theft",
        prompt: `POSE — "NEURAL THEFT" (Ultimate — Stealing Intelligence):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — dramatic hat-tip with data theft.

POSE: Cypher faces the viewer in slight 3/4 turn. His RIGHT HAND TIPS his white hat forward — a dramatic greeting gesture, like a gentleman thief revealing he's already stolen everything. His LEFT HAND is open at his side, palm up, with small cyan holographic data fragments floating above it. Relaxed confident stance, one foot slightly forward. His long coat drapes elegantly.

EFFECTS: Subtle cyan (#24FBFF) data particles drift from under his tilted hat brim. Small holographic fragments float above his left palm. His mask eyes glow cyan. Restrained, mysterious effect.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "trapwire",
        prompt: `POSE — "TRAPWIRE" (Surveillance Wire — Stretching Between Hands):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — stretching a glowing wire between both hands.

POSE: Cypher faces the viewer STRAIGHT-ON. BOTH HANDS are raised at chest height, spread apart — a thin glowing CYAN TRIPWIRE stretches between his fingers. He holds it taut like a garrote, examining it. The wire catches light between his hands. Wide stable stance.

EFFECTS: The tripwire GLOWS electric cyan (#24FBFF) between his hands. Faint digital pulse travels along the wire. His mask eyes glow matching cyan.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "ghost-pistol",
        prompt: `POSE — "GHOST" (Armed — Holding Ghost Pistol):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — holding a pistol in a stylish pose.

POSE: Cypher faces the viewer STRAIGHT-ON. His RIGHT HAND holds a GHOST PISTOL (Valorant sidearm — a sleek, angular semi-automatic pistol) raised beside his head, barrel pointing UP. His LEFT HAND adjusts the brim of his hat. He tilts his head slightly — mysterious and dangerous. Wide stance, coat flowing. The gun is held casually, not aiming — he's posing with it.

EFFECTS: His mask eyes glow cyan (#24FBFF). Faint cyan digital lines trace along the pistol's barrel. Minimal effects — the silhouette of hat + gun is the statement.

The Ghost pistol is ANGULAR, SLEEK, modern tactical design — NOT a revolver.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  deadlock: {
    characterDesc: `FIRST IMAGE: Full-body character reference — match EXACTLY.
SECOND IMAGE: Face close-up — match EXACTLY.`,
    palette: `Ability effects: steel blue (#425495) abstract energy, teal prosthetic glow at arm joints.`,
    expression: `Expression is FIERCE and UNBREAKABLE — a Norwegian warrior who will not be moved. Hard determined eyes, set jaw, no mercy. She IS the wall. NOT smiling. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "annihilation",
        prompt: `POSE — "ANNIHILATION" (Arms Forward — Energy Projection):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — both arms thrust forward projecting energy toward the viewer.

POSE: Deadlock faces the viewer STRAIGHT-ON. BOTH ARMS THRUST FORWARD at chest height, palms facing out — fingers spread, pushing energy TOWARD the viewer. Aggressive forward lean, wide power stance, feet planted. ATTITUDE: a defender unleashing raw force — total commitment to the strike.

EFFECTS: Steel blue (#425495) energy shoots forward from both palms. Teal glow pulses at her prosthetic arm joints.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "gravnet",
        prompt: `POSE — "GRAVNET" (Prosthetic Fist Raised — Energy Rising):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — prosthetic arm raised overhead in a power fist, energy rising from the ground.

POSE: Deadlock faces the viewer STRAIGHT-ON. Her LEFT prosthetic arm is RAISED OVERHEAD, fist clenched tight — a declaration of unstoppable force. Her RIGHT ARM hangs at her side, relaxed. Wide planted power stance. ATTITUDE: immovable wall — she IS the barrier.

EFFECTS: Steel blue (#425495) energy rises upward from the ground around her feet. Her raised prosthetic fist glows teal at every joint.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "sonic-sensor",
        prompt: `POSE — "SONIC SENSOR" (Walking Forward — Ground Pulse):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — walking forward with energy pulsing from her footsteps.

POSE: Deadlock WALKS FORWARD toward the viewer — mid-stride, determined march. RIGHT fist clenched at her side. LEFT arm swings naturally. Fierce forward momentum. ATTITUDE: a guard on patrol — the wall that moves toward you. Unyielding.

EFFECTS: Steel blue (#425495) energy pulses outward on the ground from her footsteps. Teal glow at prosthetic arm joints.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  killjoy: {
    characterDesc: `FIRST IMAGE: Full-body character reference — match EXACTLY.
SECOND IMAGE: Face close-up — match EXACTLY.`,
    palette: `Ability effects: golden yellow (#FADC31) tech energy, pink/magenta (#FF4893) secondary accent.`,
    expression: `Expression is CONFIDENT and CLEVER — a genius engineer who knows exactly what she built. Slight knowing smirk. She can allow a SUBTLE smile — Killjoy is one of the more personable agents. Adjusting glasses is her signature gesture.`,
    poses: [
      {
        name: "lockdown",
        prompt: `POSE — "LOCKDOWN" (Vandal Aim — Combat Engineer):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — aiming a Vandal rifle with energy rising from below.

POSE: Killjoy faces the viewer in slight 3/4 turn. BOTH HANDS grip a VANDAL RIFLE — she aims it forward, shouldered properly. Her expression is focused through her glasses. ATTITUDE: the combat engineer — brains AND firepower combined.

EFFECTS: Pink/magenta (#FF4893) energy rises from the ground around her feet. Her glasses reflect the magenta glow.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "turret",
        prompt: `POSE — "TURRET" (Glasses Adjust — Lens Glow):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — adjusting glasses in a 3/4 turn, glasses glow as the focal point.

POSE: Killjoy faces the viewer in a 3/4 TURN — looking back over her shoulder. Her RIGHT HAND pushes her glasses up the bridge of her nose. Her LEFT HAND on her hip. ATTITUDE: the genius who already solved the problem before you even understood it — effortless intellectual superiority.

EFFECTS: Her glasses lenses glow golden yellow (#FADC31). Golden light illuminates her fingertips touching the frame.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "nanoswarm",
        prompt: `POSE — "NANOSWARM" (Walking Engineer — Energy Trail):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — walking forward while golden energy trails from her hand.

POSE: Killjoy WALKS forward toward the viewer — casual confident stride. Her RIGHT HAND pushes her glasses up with one finger. Her LEFT ARM hangs at her side with fingers slightly spread. She tilts her head with a knowing smirk. ATTITUDE: playful self-assurance — an engineer on her way to collect another win.

EFFECTS: Golden yellow (#FADC31) energy trails behind from her fingertips. Faint pink (#FF4893) wisps drift upward.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  sage: {
    characterDesc: `FIRST IMAGE: Full-body reference for "Sage" — match her appearance EXACTLY. She is a Chinese healer with jade/turquoise crystal elements.
SECOND IMAGE: Face close-up reference.
Match the reference images' appearance and rendering style EXACTLY.`,
    palette: `Sage's palette: jade green, turquoise, white, light blue. The base outfit uses WHITE and LIGHT BLUE with jade crystal accents. Ability effects use JADE/TURQUOISE (#3BE0C3) — luminous healing green-cyan. Her orbs and walls are translucent jade crystal. The contrast is serene white outfit vs luminous jade energy. She is warmth and protection.`,
    expression: `Expression is SERENE and COMPASSIONATE — a healer's quiet strength. Calm eyes, gentle determination. She is the team's anchor. Sage can show WARMTH — one of the few agents where a gentle, caring look fits. But still composed, not overly emotional.`,
    poses: [
      {
        name: "resurrection",
        prompt: `POSE — "RESURRECTION" (Ultimate — Healing Energy Downward):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — channeling resurrection energy downward with both hands.

POSE: Sage faces the viewer STRAIGHT-ON. BOTH HANDS extended downward at waist height, palms facing down — jade healing energy FLOWS downward from her palms toward the ground. Eyes closed in concentration. Her body has a faint jade glow. Wide stable stance. She is bringing someone back.

EFFECTS: Jade/turquoise (#3BE0C3) energy STREAMS downward from her palms — crystalline healing light flowing to the ground. A pillar of jade light beneath her hands. Her entire body has a soft turquoise aura. Crystal particles float around her.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "barrier-orb",
        prompt: `POSE — "BARRIER ORB" (Wall — Raising Crystal Wall):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — one hand raised creating a jade crystal wall.

POSE: Sage faces the viewer in slight 3/4 turn. Her RIGHT HAND is raised upward, palm facing out — a JADE CRYSTAL WALL forms from the ground beside her, rising upward. The wall is translucent turquoise crystal with faceted surfaces. Her LEFT HAND at her side. She commands the crystal with serene authority.

EFFECTS: The crystal wall GLOWS jade (#3BE0C3) — translucent, faceted, geometric crystal surfaces. Jade light illuminates her from the side. Crystal particles drift upward from the forming wall.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "healing-orb",
        prompt: `POSE — "HEALING ORB" (Heal — Cradling Orb):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — cradling a glowing healing orb between cupped hands.

POSE: Sage faces the viewer STRAIGHT-ON. BOTH HANDS cupped together at chest height — a glowing JADE ORB floats between her palms, radiating healing energy. She gazes at the orb with gentle care. The orb illuminates her face with soft turquoise light. Peaceful stance.

EFFECTS: The healing orb GLOWS jade/turquoise (#3BE0C3) — a luminous sphere of crystalline energy between her hands. Soft green light radiates outward. Tiny crystal particles orbit the orb. Warm, gentle energy.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  vyse: {
    characterDesc: `FIRST IMAGE: Full-body reference for "Vyse" — match her appearance EXACTLY. She controls metal and magnetic forces.
SECOND IMAGE: Face close-up reference.
CRITICAL OUTFIT DETAIL: She has metallic silver armor on BOTH shoulders — symmetrical shoulder plates. Her upper body is WHITE/SILVER armored, lower body is DARK/BLACK. Dark cables hang from her helmet. Match BOTH shoulder armor pieces exactly.
Match the reference images' appearance and rendering style EXACTLY.`,
    palette: `Vyse's palette: deep purple, metallic silver, black. The base outfit uses DARK/BLACK with metallic accents. Ability effects use DEEP PURPLE/VIOLET (#6153B7) as primary and MAGENTA (#F047FE) as secondary accent. Her abilities manifest as liquid metal with purple energy. The contrast is dark metallic outfit vs vivid purple magnetic energy.`,
    expression: `Expression is SHARP and DANGEROUS — beauty with an edge. Calculating eyes, slight tilt of head. She controls metal, and she knows how devastating that is. NOT smiling. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "steel-garden",
        prompt: `POSE — "STEEL GARDEN" (Ultimate — Metal Thorns Erupting):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — metal thorns erupting from below around her.

POSE: Vyse faces the viewer STRAIGHT-ON. BOTH ARMS slightly raised at her sides, palms down — commanding METAL THORNS/VINES that erupt from the ground around her. The metal thorns curve upward like a deadly garden, surrounding her legs and reaching her waist. She stands calmly in the center of her metal garden. Wide stance.

EFFECTS: Metallic silver thorns/spikes ERUPT from below — sharp, angular metal vines with deep purple (#6153B7) energy glowing between the metal surfaces. Magnetic purple energy connects the thorns. Faint magenta (#F047FE) sparks at the thorn tips.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "arc-rose",
        prompt: `POSE — "ARC ROSE" (Magnetic Rose — Floating Between Hands):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — a metal rose floating between her hands.

POSE: Vyse faces the viewer STRAIGHT-ON. Her BOTH ARMS hang relaxed at her sides — palms slightly open, fingers spread. She stands perfectly still with quiet menace. Sharp metal SHARDS float around her body — orbiting slowly at various heights. Wide stable stance.

Her face is COVERED by her HELMET/MASK with glowing orange eyes. She does NOT have a human face — her mask IS her face. The helmet has two horn-like protrusions on top.

EFFECTS: 8-12 sharp metallic silver shards ORBIT her body in a slow spiral — at chest, hip, and knee level. Deep purple (#6153B7) magnetic energy threads connect the shards. Faint magenta (#F047FE) glow at tips.

DO NOT alter her outfit. Keep BOTH shoulder armor plates visible and symmetrical.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "shear",
        prompt: `POSE — "SHEAR" (Magnetic Field — Metal Shards Orbiting):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — metal shards orbiting her body like a magnetic field.

POSE: Vyse WALKS FORWARD toward the viewer — mid-stride, confident and predatory. Her RIGHT ARM swings naturally at her side. Her LEFT ARM swings forward in walking motion. Her coat/outfit flows with the movement. Metal shards TRAIL BEHIND her — pulled along by her magnetic field as she walks. She looks straight at the viewer through her glowing mask.

EFFECTS: 5-8 metallic silver shards TRAIL behind her body, pulled along by magnetic force — like metal filings following a magnet. Faint deep purple (#6153B7) magnetic trails connect her body to the shards. Subtle magenta (#F047FE) at shard edges.

DO NOT alter her outfit. Keep BOTH shoulder armor plates visible and symmetrical.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
    ],
  },

  veto: {
    characterDesc: `FIRST IMAGE: Full-body character reference — match EXACTLY.
SECOND IMAGE: Face close-up — match EXACTLY.
Additional ref shows Evolution ultimate form — match that transformation EXACTLY.`,
    palette: `Ability effects: teal-cyan (#1A5D65) bio-mutation energy, luminous green (#39FF14) bioluminescent accents.`,
    expression: `Expression is INTENSE and FOCUSED — a man grappling with the mutation inside him. Hard stare, tight jaw. The mutation is both his weapon and his burden. NOT smiling. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "evolution",
        prompt: `POSE — "EVOLUTION" (Ultimate — Transformation):
SKELETON CHANGE: The reference shows normal form. This is COMPLETELY DIFFERENT — fully transformed ultimate state as shown in official art reference. MATCH THE OFFICIAL ART REFERENCE.

POSE: Veto in his EVOLUTION ultimate form — MATCH THE OFFICIAL ART REFERENCE IMAGE EXACTLY. Both arms lowered at his sides, body relaxed but radiating overwhelming power. His transformed body itself IS the effect — no exaggerated gestures needed. Wide planted stance. ATTITUDE: overwhelming presence — a being who has transcended his human limits.

EFFECTS: Teal-cyan (#1A5D65) energy rises upward through his transformed body. Luminous green (#39FF14) veins pulse along his skin. Yellow glowing eyes.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "arc",
        prompt: `POSE — "ARC" (Mutation Arm Gaze — Inner Conflict):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — raising one arm to stare at his own mutating hand.

POSE: Veto faces the viewer STRAIGHT-ON. His RIGHT ARM is raised forward at chest height — he STARES at his own hand as mutation energy crawls up his arm. His LEFT ARM hangs at his side. Wide planted stance. ATTITUDE: a man confronting the mutation inside him — both weapon and burden.

EFFECTS: Teal-cyan (#1A5D65) mutation energy crawls up his raised right arm from elbow to fingertips. Luminous green (#39FF14) veins glow along the arm.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
      },
      {
        name: "chokehold",
        prompt: `POSE — "CHOKEHOLD" (Walking Forward — Energy Wrap):
SKELETON CHANGE: The reference shows a different pose. This is COMPLETELY DIFFERENT — walking forward with mutation energy wrapping around his body.

POSE: Veto WALKS FORWARD toward the viewer — determined stride. RIGHT fist clenched at his side. LEFT arm swings naturally. ATTITUDE: cold, unflinching composure — the mutation does not control him, he controls it.

EFFECTS: Teal-cyan (#1A5D65) energy wraps around his body. Luminous green (#39FF14) wisps trail behind him.

NO weapons.

FRAMING: FULL BODY head-to-toe, 85% vertical fill. Character CENTERED. Clean white background.`,
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
