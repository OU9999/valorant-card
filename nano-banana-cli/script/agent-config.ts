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
    characterDesc: `FIRST IMAGE: Full-body character reference for "Yoru" from the game Valorant. NOTE: This reference shows Yoru FROM BEHIND — the large demon/oni mask design is on the BACK of his jacket. When generating FRONT-FACING poses, the FRONT of the jacket is PLAIN dark navy blue with a zipper closure, high collar, and subtle geometric accents — NO demon mask on the front.

Match his appearance EXACTLY — Japanese male, lean athletic build, dark navy-blue hair styled in a sharp swept-back pompadour/spike with blue highlights. He wears a dark blue BOMBER JACKET (front is plain dark blue with zipper, demon mask is on the BACK only). Orange trim accents and an orange number patch on the left sleeve. Under the jacket: dark shirt/tactical gear. Black tactical PANTS with utility straps. Orange-and-white SNEAKERS with bright orange accents. Silver EAR PIERCINGS/STUDS on both ears. Reproduce his face, outfit, and color palette PRECISELY.

SECOND IMAGE: Close-up face reference for Yoru. Match his EXACT facial features — angular face, sharp jawline, dark navy hair swept back with blue highlights, silver ear piercings, intense confident eyes, slight cocky edge to his expression.

THIRD IMAGE: Front-view reference showing Yoru's FRONT appearance and his DIMENSIONAL CLONE ability. This shows how Yoru looks FROM THE FRONT — the jacket front is dark navy with geometric accents. Behind him is a translucent BLUE DIMENSIONAL CLONE (a ghostly blue energy copy of himself). Use this image to accurately render Yoru's front-facing appearance.`,
    palette: `Yoru's palette: dark blue, navy, black, orange accents. The base outfit uses DARK NAVY BLUE and BLACK — sleek streetwear. ONLY ability effects (dimensional rifts, teleport energy) use EXTREME high-saturation BRIGHT CYAN-BLUE with electric glow. Orange accents on jacket trim, sneakers, and sleeve patch provide warm contrast against the cool dark base.`,
    expression: `Expression is COOL and NONCHALANT — a trickster's quiet confidence. Subtle smirk at most, one eyebrow slightly raised. He looks like he already knows how this ends. Cocky but RESTRAINED — not a big grin. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "dimensional-drift",
        prompt: `POSE — "DIMENSIONAL DRIFT" (Ultimate — Masked Sprint Inside Blue Dimension):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows Yoru from BEHIND in a 3/4 RIGHT turn looking over his shoulder. This pose is COMPLETELY DIFFERENT — facing STRAIGHT AT THE VIEWER, sprinting forward aggressively. Do NOT copy the reference back-view angle.

IMPORTANT — JACKET FRONT: The reference shows the BACK of the jacket (demon mask). When facing the viewer, the FRONT of the jacket is PLAIN dark navy blue with a zipper and high collar. Do NOT put the demon mask design on the front.

ONI MASK (CRITICAL — MUST BE PRESENT): Yoru wears a JAPANESE ONI/DEMON MASK over his face. The mask covers his entire face. The mask has SHARP FANGS/TEETH painted on it, angular demon features, and GLOWING BLUE EYES visible through the eye holes. The mask is the MOST IMPORTANT element of this pose — it MUST be clearly visible and prominent. Without the mask, this pose is WRONG.

DIMENSIONAL ATMOSPHERE (CRITICAL): Yoru is INSIDE his dimensional rift — the space around him is filled with DARK BLUE-PURPLE dimensional energy. Dense dark blue/indigo void WRAPS around his entire body. The overall color tone is DEEP DARK BLUE and INDIGO — like the interior of a dimensional void. Blue-cyan energy streaks and rifts trail behind and around him. This is NOT a clean white background — the dimensional void is the background.

Yoru SPRINTS aggressively STRAIGHT AT THE VIEWER — body leaning forward, one foot forward in a long stride. This is a fast, predatory run through the dimension.

BOTH arms pump naturally in a sprint motion. NO weapons in hands.

His hair and jacket flow BACKWARD from speed. Blue energy rifts trail from his body like speed lines.

NO GUN, NO RIFLE, NO WEAPON.

The background is the DARK BLUE DIMENSIONAL VOID — not white. Dark indigo/navy with blue energy streaks. The overall mood is DARK and MENACING.`,
      },
      {
        name: "gatecrash",
        prompt: `POSE — "GATECRASH" (Dimensional Rift — Sheriff Pistol):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows Yoru from BEHIND in a 3/4 RIGHT turn. This pose is COMPLETELY DIFFERENT — facing STRAIGHT AT THE VIEWER with one arm forward and one arm raised with a pistol. Do NOT copy the reference back-view angle.

IMPORTANT — JACKET FRONT: The reference shows the BACK of the jacket (demon mask). When facing the viewer, the FRONT of the jacket is PLAIN dark navy blue with a zipper and high collar. Do NOT put the demon mask design on the front.

Yoru faces the viewer STRAIGHT-ON. NO mask — his normal face is visible.

His LEFT ARM extends FORWARD toward the viewer — open palm, fingers spread, as if channeling or beckoning. A dimensional rift energy glows around his extended hand.

His RIGHT HAND holds a SHERIFF — Valorant's heavy revolver-style pistol. It is a large, angular, boxy REVOLVER with a long barrel — looks like a futuristic magnum/desert eagle hybrid. He holds it RAISED and slightly tilted upward at about 45 degrees, elbow bent — a stylish, casual gun-raised pose. NOT aiming at the viewer — pointing upward/to the side.

The asymmetric pose — one arm reaching forward, one arm with pistol raised — creates a dynamic, trickster silhouette.

Dimensional rift energy WRAPS around his body — blue-cyan cracks and rifts cling to his form.

Wide planted stance. Cocky nonchalant expression.

Clean white background.`,
      },
    ],
  },

  iso: {
    characterDesc: `FIRST IMAGE: Full-body character reference for "Iso" from the game Valorant. Match his appearance EXACTLY — Chinese male, lean build, dark messy BLACK HAIR that falls over one eye (emo/scene hairstyle covering the right eye). Angular face with PURPLE/VIOLET EYES, a small BAND-AID/TAPE on his left cheek. He wears an oversized light GRAY/WHITE tactical JACKET with a high collar and black geometric accents, a dark shirt underneath. Wide BLACK BAGGY PANTS. Dark gray/black SNEAKERS. His pose shows a large geometric PURPLE ENERGY SHIELD behind him — a hexagonal/star-shaped kinetic energy pattern. He holds thin red THREADS/WIRES between his hands. Reproduce his face, outfit, and color palette PRECISELY.

SECOND IMAGE: Close-up face reference for Iso. Match his EXACT facial features — angular face, dark hair covering one eye, purple/violet eyes visible through the hair, band-aid on cheek, cold detached expression, purple energy accents on collar.

THIRD IMAGE: Reference showing Iso's signature ability effect — CONCENTRIC OCTAGONAL/STAR-SHAPED geometric energy rings. These are layered geometric patterns of purple-white energy radiating outward in concentric octagonal shapes. This is the correct visual for Iso's kinetic energy — NOT a simple sphere, but GEOMETRIC OCTAGONAL RINGS.`,
    palette: `Iso's palette: purple, violet, white/light gray, black. The base outfit uses LIGHT GRAY/WHITE and BLACK — clean, monochromatic. ONLY ability effects (kinetic shields, energy spheres, dimensional rifts) use EXTREME high-saturation PURPLE/VIOLET with bright glow. This creates stark contrast between his muted grayscale outfit and the intense purple energy.`,
    expression: `Expression is COLD and DETACHED — isolated, looking through the viewer rather than at them. Minimal emotion, almost apathetic. Eyes half-visible behind hair. The quiet intensity of someone who has disconnected from everything. NOT angry, NOT sad — just absent. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "kill-contract",
        prompt: `POSE — "KILL CONTRACT" (Ultimate — Octagonal Energy Dimension):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 RIGHT turn in a crouching action pose with arms spread holding threads. This pose is COMPLETELY DIFFERENT — facing STRAIGHT AT THE VIEWER with BOTH arms forward together. Do NOT copy the reference crouching angle.

Iso faces the viewer STRAIGHT-ON. BOTH ARMS are extended forward together at chest height — hands facing each other with a gap between them.

ENERGY EFFECT (CRITICAL — see third reference image): Behind Iso, CONCENTRIC OCTAGONAL/STAR-SHAPED geometric energy rings radiate outward from his body. These are NOT simple spheres — they are layered GEOMETRIC OCTAGONAL PATTERNS of purple-white energy, like concentric star/octagon shapes expanding behind him. Multiple nested octagonal rings, each glowing with purple-violet energy. The geometric pattern wraps BEHIND and AROUND his body like a mandala of energy.

The octagonal energy rings emit purple light that illuminates his face. Kinetic energy lines flow from the rings along his arms.

Wide symmetrical stance. Hair over one eye. Band-aid visible. Cold, detached stare.

NO weapons.

Clean white background.`,
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
        prompt: `POSE — "CONTINGENCY" (Emerging Through Octagonal Energy):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 RIGHT turn in a crouching action pose. This pose is COMPLETELY DIFFERENT — EMERGING FORWARD through a wall of energy STRAIGHT AT THE VIEWER. Do NOT copy the reference crouching angle.

Iso EMERGES through a wall of OCTAGONAL KINETIC ENERGY, pushing forward STRAIGHT AT THE VIEWER. His full body is visible — he is breaking through the geometric energy barrier.

ENERGY EFFECT (CRITICAL): Dense PURPLE OCTAGONAL/STAR-SHAPED geometric energy patterns WRAP AROUND his entire body — clinging to his jacket, swirling around his legs. The geometric rings are THICKEST behind him, THINNEST at his front where he has pushed through. The energy is NOT separate from him — it clings to and wraps his form with geometric patterns.

His body leans SLIGHTLY FORWARD — weight on his front foot, forward momentum. One arm reaches forward, the other at his side.

His oversized jacket billows backward into the energy behind him. Hair over one eye. Cold detached expression — pushing through his own dimensional barrier.

NO weapons.

Clean white background. ONLY the character emerging from geometric purple energy.`,
      },
    ],
  },

  waylay: {
    characterDesc: `FIRST IMAGE: Full-body character reference for "Waylay" from the game Valorant. Match her appearance EXACTLY — Thai female, medium-dark tan skin, athletic combat build. She has wild spiky SILVER/WHITE hair swept back with crystalline/prismatic highlights that catch light in rainbow hues. She wears a sleeveless GOLD/TAN tactical VEST with a high collar and dark interior lining, dark shirt underneath with chain/bead accessories at the neckline. Dark navy/black BAGGY PANTS with tactical straps. Purple/violet SNEAKERS. Her signature ability creates PRISMATIC LIGHT — rainbow-refracting energy with dominant purple, cyan, and gold tones. In the reference she holds a large PRISMATIC LIGHT SWORD in her right hand — a blade made of pure refracting light energy. Reproduce her face, outfit, and color palette PRECISELY.

SECOND IMAGE: Close-up face reference for Waylay. Match her EXACT facial features — angular face, medium-dark skin, silver/white crystalline hair, sharp determined eyes with gold/amber undertones, small ear piercings, intense focused expression.`,
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
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a wide combat stance with sword extended. This pose is COMPLETELY DIFFERENT — standing STRAIGHT facing the viewer with ARMS CROSSED. Do NOT copy the reference stance.

Waylay faces the viewer STRAIGHT-ON. Her ARMS are CROSSED over her chest — a confident, controlled stance. NO weapon in hands.

PRISMATIC EFFECT: Light fragments and prismatic shards FLOAT around her body — small rainbow-refracting pieces of light energy hovering near her arms, shoulders, and hair. The prismatic light illuminates her from multiple angles, creating rainbow light patches on her skin and clothes.

Her silver/white hair catches the prismatic light, creating subtle rainbow highlights.

Wide planted stance. Quiet intensity — a warrior at rest but ready.

This pose has a COMPLETELY DIFFERENT body arrangement from her other two poses (arms-at-sides and sprinting).

Clean white background.`,
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
