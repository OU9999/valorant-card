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
        name: "overdrive",
        prompt: `POSE — "OVERDRIVE" (Ultimate Ability — Transformation):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 RIGHT turn with one arm up and one arm down. This pose is COMPLETELY DIFFERENT — facing STRAIGHT AT THE VIEWER with BOTH arms forward together. Do NOT copy the reference body angle.

Neon faces the viewer STRAIGHT-ON. Her eyes glow blue, hair stands up with static, circuit patterns on her arms glow. BOTH arms extended forward together at chest height — like aiming a pistol. Subtle electric energy wraps around her body. Minimal effects — focus on the character.

Wide symmetrical stance. Intense focused expression.

Clean white background.`,
      },
      {
        name: "high-gear",
        prompt: `POSE — "HIGH GEAR" (Electric Sprint — Walking Forward):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 RIGHT turn. This pose is COMPLETELY DIFFERENT — walking STRAIGHT TOWARD THE VIEWER like the Jett walking poses. Do NOT copy the reference body angle.

Neon walks STRAIGHT TOWARD the viewer. Left foot forward, right foot behind. BOTH arms hang naturally at her sides with slight motion blur — a confident walk, not a sprint. Small electric wisps trail from her body. Hair flows back slightly.

Determined focused expression — NOT smiling.

Clean white background.`,
      },
      {
        name: "relay-bolt",
        prompt: `POSE — "RELAY BOLT" (Electric Power — Hands on Hips):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 RIGHT turn with one arm up one arm down. This pose is COMPLETELY DIFFERENT — facing STRAIGHT AT THE VIEWER with BOTH hands on hips. Do NOT copy the reference body angle.

Neon faces the viewer STRAIGHT-ON. BOTH HANDS on her HIPS — elbows out, a confident power stance. Like a superhero landing pose but standing upright. Chin slightly raised, looking at the viewer with quiet intensity.

Subtle electric energy wraps around her body — small sparks and faint blue glow close to her skin. NOT large bolts or beams. The character is the focus, not the effects.

Wide planted stance, weight even. She radiates controlled power — coiled energy at rest.

This pose has a COMPLETELY DIFFERENT arm arrangement from her other two poses (arms-forward and arms-at-sides walking).

Clean white background.`,
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
        name: "from-the-shadows",
        prompt: `POSE — "FROM THE SHADOWS" (Ultimate Ability — Shadow Teleport):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.

Omen faces the viewer STRAIGHT-ON. He is COMPLETELY WRAPPED in his cloak — BOTH arms hidden inside, NO hands visible, NO weapons visible. IMPORTANT: There is NO RIFLE, NO GUN in this image. He holds NOTHING. His cloak cocoons his entire body like a dark shroud.

His LOWER BODY from the knees down DISSOLVES into dense dark purple-black smoke that swirls and pools beneath him. He RISES from a dark shadow portal on the ground.

His wide-brimmed hat (FLAT, ANGULAR — exactly like the reference image) crowns the figure. Below the hat brim, ONLY two TEAL GLOWING EYES in absolute darkness. No face, no features.

His silhouette is a NARROW VERTICAL COLUMN — the hat is the widest point, below it the cloak narrows to a pillar shape, then dissolves into smoke. He is PERFECTLY STILL. Not dramatic, not active — just present. An ancient shadow that appeared without warning.

Clean white background. ONLY the cloaked figure and shadow smoke.`,
      },
      {
        name: "dark-cover",
        prompt: `POSE — "DARK COVER" (Smoke Orb — Placing Darkness):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
POSE CHANGE: This pose faces LEFT (3/4 left turn) — the OPPOSITE direction of the reference image. The head looks UP. NO RIFLE — only shadow ability. This is NOT the default pose.

Omen stands in a strong 3/4 turn to the LEFT. His body faces LEFT while his head tilts UPWARD — he is looking at the SKY, watching where his smoke orb will land. This upward gaze is completely different from his usual forward stare.

His LEFT ARM is raised HIGH above his head, clawed hand open, palm facing up. Above his raised hand, a dark SHADOW ORB hovers — a dense sphere of swirling dark purple-black smoke, about the size of his head. The orb appears to be floating just above his clawed fingers, ready to be sent.

His RIGHT ARM is completely HIDDEN inside his cloak, tucked against his body. This creates a strong ASYMMETRIC silhouette — one arm reaching high, the other invisible.

His wide-brimmed hat (FLAT, ANGULAR — match the reference exactly) tilts back with his upward gaze. His teal eyes glow upward toward the orb. His cloak hangs heavily on his right side.

The overall shape is a TALL VERTICAL composition — very different from the wide spread of other poses. One clawed hand reaching skyward with a dark sphere, the rest of the body still and cloaked.

Clean white background. ONLY the character and the hovering shadow orb.`,
      },
      {
        name: "paranoia",
        prompt: `POSE — "PARANOIA" (Shadow Projectile — Forward Cast):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
This pose faces STRAIGHT-ON at the viewer with ONE ARM extended forward casting shadow. NO GUN in this pose.

Omen faces the viewer STRAIGHT-ON. His posture is upright and CONTROLLED.

His RIGHT ARM extends FORWARD directly at the viewer at chest height — clawed hand open, palm facing the camera. From his palm, a MASSIVE dark shadow mass LAUNCHES toward the viewer — a dense dark purple-black void with shadow tendrils streaming outward. The projectile appears to come AT the viewer, creating depth.

His LEFT ARM hangs at his side, clawed fingers loosely curled — calm, still. Only one arm acts while the rest remains composed.

CRITICAL — HAT SHAPE: His hat is WIDE, FLAT-BRIMMED, angular — like the reference image. NOT a pointy witch hat. The brim is wide and horizontal with sharp geometric edges.

His cloak drapes symmetrically since he faces straight-on. His teal eyes glow with cold precision — locked on the viewer. The shadow projectile in front of him creates a dark mass between him and the viewer.

The overall composition is SYMMETRICAL and CONFRONTATIONAL — Omen staring and casting directly at you. Very different from the angled reference pose.

Clean white background. ONLY the character and the shadow projectile.`,
      },
    ],
  },

  raze: {
    characterDesc: `FIRST IMAGE: Full-body character reference for "Raze" from the game Valorant. Match her appearance EXACTLY — dark brown Brazilian skin, athletic build with visible muscle. She wears an ORANGE BANDANA/HEADBAND with goggles pushed up on top, large ORANGE HEADPHONES over her ears. Her outfit is a teal/olive tactical CROP TOP exposing her midriff, with an orange-and-camo tactical harness/vest over it. Teal/olive BAGGY CARGO PANTS with orange stripes and paint splatter details. Black COMBAT BOOTS with orange/red soles and X markings. She carries explosives and grenades on her belt. Reproduce her face, outfit, and color palette PRECISELY.

SECOND IMAGE: Close-up face reference for Raze. Match her EXACT facial features — round face, warm confident eyes, orange bandana with goggles, large orange headphones, dark brown skin.`,
    palette: `Raze's palette: orange, yellow-gold, teal/olive, brown. The base outfit uses TEAL/OLIVE and BROWN — earthy, military. ONLY ability effects (explosions, paint splatters, rocket blast) use EXTREME high-saturation ORANGE/YELLOW with bright warm glow. Orange accents on her headphones, bandana, and boots provide identity markers against the muted teal base.`,
    expression: `Expression is CONFIDENT with a slight edge of mischief — but RESTRAINED. NOT a big grin or exaggerated smile. A subtle, self-assured smirk at most — the quiet confidence of someone who knows exactly how much damage she can do. Eyes sharp and focused. Cool, not cartoonish. Valorant expressions are ALWAYS understated.`,
    poses: [
      {
        name: "showstopper",
        prompt: `POSE — "SHOWSTOPPER" (Ultimate Ability — Rocket Launcher):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 RIGHT turn with one arm up and one arm down. This pose is COMPLETELY DIFFERENT — facing STRAIGHT AT THE VIEWER with the launcher across both shoulders. Do NOT copy the reference body angle.

Raze faces the viewer STRAIGHT-ON. Wide confident stance, feet apart, weight even.

A large ROCKET LAUNCHER rests across BOTH SHOULDERS behind her neck — she grips it with BOTH hands, one on each side. The launcher sits horizontally behind her head like a yoke. This creates a WIDE SYMMETRICAL silhouette completely different from the reference.

Subtle confident expression — restrained, not a grin. Cool.

Clean white background. ONLY the character and the launcher.`,
      },
      {
        name: "boom-bot",
        prompt: `POSE — "BOOM BOT" (Robot Companion — Walking With Pet):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 RIGHT turn standing still. This pose is COMPLETELY DIFFERENT — WALKING STRAIGHT TOWARD THE VIEWER. Do NOT copy the reference body angle.

Raze WALKS STRAIGHT TOWARD the viewer. Left foot forward, right foot behind, mid-stride — confident swagger. BOTH arms swing naturally at her sides in a walking motion.

On her RIGHT SHOULDER sits a small round BOOM BOT — a mechanical ball-shaped robot with two simple eyes and an antenna, perched on her shoulder like a pet parrot. The bot is at head/shoulder level so it is clearly visible in the upper body area.

Her expression is subtle and cool — walking with purpose.

This is a WALKING pose, completely different from her other two poses which are static standing.

Clean white background.`,
      },
      {
        name: "paint-shells",
        prompt: `POSE — "PAINT SHELLS" (Cluster Grenade — Arms Crossed):
STYLE REMINDER: Render with PLANAR SHADING — faceted angular planes, hard edges, NO outlines, NO smooth gradients. Copy the EXACT rendering technique from the reference images.
FULL BODY must be visible from head to FEET — do NOT crop any part of the body.
SKELETON CHANGE: The reference shows a 3/4 RIGHT turn with one arm up and one arm down. This pose is COMPLETELY DIFFERENT — facing STRAIGHT AT THE VIEWER with arms CROSSED. Do NOT copy the reference body angle.

Raze faces the viewer STRAIGHT-ON. Her ARMS are CROSSED over her chest — a confident, relaxed stance. In her RIGHT HAND (crossed over), she holds a small CLUSTER GRENADE casually between her fingers. The grenade peeks out from her crossed arms.

Wide stance, weight even, chin slightly up. The crossed-arms pose is completely different from the reference's one-up-one-down arm arrangement.

Subtle confident expression — cool, not grinning.

Clean white background. ONLY the character with the grenade in her crossed arms.`,
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
