import { chill } from './demeter'

export default [
  {
    name: 'Curse of Longing',
    title: 'CurseSickTrait',
    type: 'secondary',
    icon: 'assets/traits/Ares_Aphrodite_01.png',
    god: ['Ares', 'Aphrodite'],
    rarity: 5,
    prereqs: {
      Aphrodite: ['Heartbreak Strike', 'Heartbreak Flourish', 'Crush Shot', 'Passion Dash'],
      Ares: ['Curse of Agony', 'Curse of Pain'],
    },
    description: (stats) =>
      `<div>Your<b>Doom</b>effects continuously strike<b>Weak</b>foes.</div>` +
      `<div>▶ Successive Hit Damage:<div><span>+50%</span></div></div>`,
    feature: (stats) => `<div>Your <b>Doom</b> effects continuously strike <b>Weak</b> foes.</div>`,
    effects: [{
      name: 'Curse of Longing',
      type: 'longing',
      trigger: 'doom',
    }],
  },
  {
    name: 'Deadly Reversal',
    title: 'ArtemisReflectBuffTrait',
    type: 'secondary',
    icon: 'assets/traits/Artemis_Athena_01.png',
    god: ['Artemis', 'Athena'],
    rarity: 5,
    prereqs: {
      Artemis: ['Deadly Strike', 'Deadly Flourish', 'True Shot', "Hunter's Flare", "Artemis' Aid"],
      Athena: ['Divine Strike', 'Divine Flourish'],
    },
    description: (stats) =>
      `<div>After you Deflect, briefly gain +20% chance to deal Critical damage.</div>` +
      `<div>▶ Critical Duration:<div><span>2 Sec.</span></div></div>`,
    mods: [{
      name: 'Deadly Reversal',
      type: 'effect',
      target: 'coefficients',
      stats: { crit: 0.2 },
      status: { target: 'player', name: 'Deadly Reversal' },
    }],
    effects: [{
      name: 'Deadly Reversal',
      type: 'reversal',
      trigger: 'deflect',
    }]
  },
  {
    name: 'Exclusive Access',
    title: 'RaritySuperBoost',
    type: 'secondary',
    icon: 'assets/traits/Dionysus_Poseidon_01.png',
    god: ['Dionysus', 'Poseidon'],
    rarity: 5,
    prereqs: {
      Dionysus: ['Drunken Strike', 'Drunken Flourish', 'Trippy Shot', 'Trippy Flare', 'Drunken Dash', "Dionysus' Aid"],
      Poseidon: ['Tempest Strike', 'Tempest Flourish', 'Flood Shot', 'Tidal Dash', "Poseidon's Aid"],
    },
    description: (stats) =>
      `<div>Any Boons you find have superior effects.</div>` +
      `<div>▶ Minimum Boon Rarity:<div><span class="epic">Epic</span></div></div>`,
    feature: (stats) =>
      `Minimum Boon Rarity: <span class="epic">Epic</span>`,
  },
  {
    name: 'Heart Rend',
    title: 'HeartsickCritDamageTrait',
    type: 'secondary',
    icon: 'assets/traits/Artemis_Aphrodite_01.png',
    god: ['Artemis', 'Aphrodite'],
    rarity: 5,
    prereqs: {
      Aphrodite: ['Heartbreak Strike', 'Heartbreak Flourish', 'Crush Shot', 'Passion Dash'],
      Artemis: ['Deadly Strike', 'Deadly Flourish', 'True Shot'],
    },
    description: (stats) =>
      `<div>Your critical hits do more damage to Weak enemies.</div>` +
      `<div>▶ Bonus Critical Damage:<div><span>+150%</span></div></div>`,
    mods: [{
      name: 'Heart Rend',
      type: 'effect',
      target: 'crit',
      stats: { mult_base: 1.5 },
      status: { target: 'foe', name: 'Weak' },
    },],
  },
  {
    name: 'Hunting Blades',
    title: 'AresHomingTrait',
    type: 'secondary',
    icon: 'assets/traits/Artemis_Ares_01.png',
    god: ['Ares', 'Artemis'],
    rarity: 5,
    prereqs: {
      Artemis: ['Deadly Strike', 'Deadly Flourish', 'Hunter Dash', "Artemis' Aid"],
      Ares: ['Slicing Shot'],
    },
    exclude: ['Freezing Vortex'],
    description: (stats) =>
      `<div>Your Cast creates a faster Blade Rift that seeks the nearest foe.</div>` +
      `<div>▶ Seek Duration:<div><span>3.3 Sec.</span></div></div>`,
    mods: [{
      name: 'Hunting Blades',
      type: 'effect',
      target: 'Slicing Shot',
      stats: { name: 'Hunting Blades', duration: -0.7 },
    },],
  },
  {
    name: 'Lightning Rod',
    title: 'AmmoBoltTrait',
    type: 'secondary',
    icon: 'assets/traits/Artemis_Zeus_01.png',
    god: ['Artemis', 'Zeus'],
    rarity: 5,
    prereqs: {
      Zeus: ['Lightning Strike', 'Thunder Flourish', 'Thunder Dash', 'Electric Shot', "Zeus' Aid"],
      Artemis: ['Deadly Strike', 'Deadly Flourish', 'True Shot', 'Hunter Dash', "Artemis' Aid"],
    },
    description: (stats) =>
      `<div>Your collectible Bloodstones strike nearby foes every 1 Sec.</div>` +
      `<div>▶ Lightning Damage:<div><span>70</span></div></div>`,
    effects: [{
      name: 'Lightning Rod',
      type: 'bolt',
      trigger: 'dislodge',
      stats: { min: 70 },
    }],
  },
  {
    name: 'Lightning Phalanx',
    title: 'ReboundingAthenaCastTrait',
    type: 'secondary',
    icon: 'assets/traits/Athena_Zeus_01.png',
    god: ['Zeus', 'Athena'],
    rarity: 5,
    prereqs: {
      Zeus: ['Lightning Strike', 'Thunder Flourish', 'Thunder Dash', 'Electric Shot', "Zeus' Aid"],
      Athena: ['Phalanx Shot'],
    },
    description: (stats) =>
      `<div>Your Cast bounces between enemies.</div>` +
      `<div>▶ Max Bounces:<div><span>3</span></div></div>`,
    mods: [
      {
        name: 'Lightning Phalanx',
        type: 'effect',
        target: 'Phalanx Shot',
        stats: { count: 1 },
      },
      {
        name: 'Lightning Phalanx Bounces',
        type: 'effect',
        target: 'Phalanx Shot',
        stats: { count: 1 },
        status: { name: 'Phalanx Bounces', target: 'foe', max_stacks: 3 },
      },
    ],
  },
  {
    name: 'Low Tolerance',
    title: 'DionysusAphroditeStackIncreaseTrait',
    type: 'secondary',
    icon: 'assets/traits/Dionysus_Aphrodite_01.png',
    god: ['Dionysus', 'Aphrodite'],
    rarity: 5,
    prereqs: {
      Aphrodite: ['Heartbreak Strike', 'Heartbreak Flourish', 'Crush Shot', 'Passion Dash'],
      Dionysus: ['Drunken Strike', 'Drunken Flourish', 'Drunken Dash', "Dionysus' Aid"],
    },
    description: (stats) =>
      `<div>Your Hangover effects can stack even more times against Weak foes.</div>` +
      `<div>▶ Max Stacks vs Weak:<div><span>+3</span></div></div>`,
    feature: (stats) => '<span class="Dionysus">Hangover</span> stacks <span>8</span> times vs <span class="Aphrodite">Weak</span> foes.',
    mods: [
      {
        name: 'Low Tolerance',
        type: 'meta',
        target: 'Hangover Stacks',
        stats: { max_stacks: 3 },
        status: { target: 'foe', name: 'Weak' },
      },
    ],
  },
  {
    name: 'Merciful End',
    title: 'TriggerCurseTrait',
    type: 'secondary',
    icon: 'assets/traits/Athena_Ares_01.png',
    god: ['Ares', 'Athena'],
    rarity: 5,
    prereqs: {
      Athena: ['Divine Strike', 'Divine Flourish'],
      Ares: ['Curse of Agony', 'Curse of Pain'],
    },
    description: (stats) =>
      `<div>Your attacks that can Deflect immediately activate<b>Doom</b>effects.</div>` +
      `<div>▶ Doom Combo Damage:<div><span>40</span></div></div>`,
    feature: (stats) => '<span class="Athena">Deflect</span> immediately activates <span class="Ares">Doom.</span>',
    effects: [{
      name: 'Merciful End',
      type: 'merciful',
      trigger: 'doom',
      stats: { min: 40 },
    }],
  },
  {
    name: 'Scintillating Feast',
    title: 'LightningCloudTrait',
    type: 'secondary',
    icon: 'assets/traits/Zeus_Dionysus_01.png',
    god: ['Dionysus', 'Zeus'],
    rarity: 5,
    prereqs: {
      Zeus: ['Lightning Strike', 'Thunder Flourish', 'Electric Shot', 'Thunder Dash', "Zeus' Aid"],
      Dionysus: ['Trippy Shot', 'Trippy Flare', 'High Tolerance'],
    },
    description: (stats) =>
      `<div>Your Festive Fog effects also deal lightning damage periodically.</div>` +
      `<div>▶ Lightning Damage:<div><span>60</span></div></div>`,
    effects: [{
      name: 'Scintillating Feast',
      type: 'bolt',
      trigger: 'festive',
      stats: { min: 60 },
    }],
  },
  {
    name: 'Parting Shot',
    title: 'CastBackstabTrait',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_Athena_01.png',
    god: ['Aphrodite', 'Athena'],
    rarity: 5,
    prereqs: {
      Athena: ['Divine Strike', 'Divine Flourish', 'Phalanx Shot', 'Divine Dash', "Athena's Aid"],
      Aphrodite: ['Heartbreak Strike', 'Heartbreak Flourish', 'Crush Shot', "Aphrodite's Aid", 'Passion Dash'],
    },
    description: (stats) =>
      `<div>Your Cast gains any bonuses you have for striking foes from behind.</div>` +
      `<div>▶ Bonus Backstab Damage:<div><span>+25%</span></div></div>`,
    mods: [{
      name: 'Parting Shot',
      type: 'effect',
      trigger: 'cast',
      stats: { backstab: true, backstab: 0.25 },
    }],
  },
  {
    name: 'Sweet Nectar',
    title: 'ImprovedPomTrait',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_Poseidon_01.png',
    god: ['Aphrodite', 'Poseidon'],
    rarity: 5,
    prereqs: {
      Poseidon: ['Tempest Strike', 'Tempest Flourish', 'Flood Shot', 'Tidal Dash', "Poseidon's Aid"],
      Aphrodite: ['Heartbreak Strike', 'Heartbreak Flourish', 'Crush Shot', 'Passion Dash', "Aphrodite's Aid"],
    },
    description: (stats) =>
      `<div>All Poms of Power you find are more effective.</div>` +
      `<div>▶ Pom Level Increase:<div><span>1</span></div></div>`,
    feature: (stats) =>
      `Poms of Power are more effective.`
  },
  {
    name: 'Sea Storm',
    title: 'ImpactBoltTrait',
    type: 'secondary',
    icon: 'assets/traits/Poseidon_Zeus_01.png',
    god: ['Poseidon', 'Zeus'],
    rarity: 5,
    prereqs: {
      Zeus: ['Lightning Strike', 'Thunder Flourish', 'Electric Shot', 'Thunder Dash', "Zeus' Aid"],
      Poseidon: ['Tempest Strike', 'Tempest Flourish', 'Flood Shot', 'Tidal Dash', "Poseidon's Aid"],
    },
    description: (stats) =>
      `<div>Your knock-away effects also cause foes to be struck by lightning.</div>` +
      `<div>▶ Lightning Damage:<div><span>40</span></div></div>`,
    effects: [{
      name: 'Sea Storm',
      type: 'bolt',
      trigger: 'knockback',
      stats: { min: 40, radius: 200 },
    }],
  },
  {
    name: 'Vengeful Mood',
    title: 'AutoRetaliateTrait',
    type: 'secondary',
    icon: 'assets/traits/Zeus_Ares_01.png',
    god: ['Ares', 'Zeus'],
    rarity: 5,
    prereqs: {
      Zeus: [ 'Lightning Strike', 'Thunder Flourish', 'Electric Shot', 'Thunder Dash', "Heaven's Vengeance" ],
      Ares: [ 'Curse of Agony', 'Curse of Pain', 'Curse of Vengeance' ],
      Revenge: [ 'Wave of Despair', 'Curse of Vengeance', 'Holy Shield', 'Frozen Touch', "Heaven's Vengeance" ]
    },
    description: (stats) =>
      `<div>Your Revenge effects sometimes occur without taking damage.</div>` +
      `<div>▶ Auto-Revenge Rate:<div><span>3 Sec.</span></div></div>`,
  },
  {
    name: 'Ice Wine',
    title: 'IceStrikeArrayTrait',
    type: 'secondary',
    icon: 'assets/traits/Demeter_Dionysus_01.png',
    god: ['Demeter', 'Dionysus'],
    rarity: 5,
    prereqs: {
      Dionysus: ['Trippy Shot', 'Trippy Flare'],
      Demeter: ['Frost Strike', 'Frost Flourish', 'Mistral Dash', "Demeter's Aid"],
    },
    description: (stats) =>
      `<div>Your Cast blasts an area with freezing Festive Fog that inflicts Chill.</div>` +
      `<div>▶ Blast Damage:<div><span>+30%</span></div></div>`,
    mods: [{
      name: 'Ice Wine',
      type: 'effect',
      target: 'Trippy Shot',
      stats: { mult_base: 0.3 },
    }],
    effects: [{...chill, trigger: 'festive'}]
  },
  {
    name: 'Crystal Clarity',
    title: 'HomingLaserTrait',
    type: 'secondary',
    icon: 'assets/traits/Demeter_Artemis_01.png',
    god: ['Demeter', 'Artemis'],
    rarity: 5,
    prereqs: {
      Artemis: ['Deadly Strike', 'Deadly Flourish', 'Hunter Dash', "Artemis' Aid"],
      Demeter: ['Crystal Beam'],
    },
    description: (stats) =>
      `<div>Your Cast is stronger and tracks foes more effectively.</div>` +
      `<div>▶ Beam Damage:<div><span>+10%</span></div></div>`,
    mods: [{
      name: 'Crystal Clarity',
      type: 'effect',
      target: 'Crystal Beam',
      stats: { mult_base: 0.1 },
    }],
    effects: [{
      name: 'Fast Tracking',
      trigger: 'beam',
    }]
  },
  {
    name: 'Blizzard Shot',
    title: 'BlizzardOrbTrait',
    type: 'secondary',
    icon: 'assets/traits/Poseidon_Demeter_01.png',
    god: ['Poseidon', 'Demeter'],
    rarity: 5,
    prereqs: {
      Demeter: ['Frost Strike', 'Frost Flourish', 'Mistral Dash', 'Snow Burst'],
      Poseidon: ['Flood Shot'],
    },
    description: (stats) =>
      `<div>Your Cast moves slowly, piercing foes and firing shards around it.</div>` +
      `<div>▶ Shard Damage:<div><span>40</span></div></div>`,
    effects: [{
      name: 'Ice Shard',
      type: 'shard',
      trigger: 'cast',
      stats: { min: 40 },
    }],
    mods: [{
      name: 'Blizzard Shot',
      type: 'effect',
      target: 'Flood Shot',
      stats: { name: 'Blizzard Shot', knockback: false }
    },],
  },
  {
    name: 'Cold Fusion',
    title: 'JoltDurationTrait',
    type: 'secondary',
    icon: 'assets/traits/Demeter_Zeus_01.png',
    god: ['Demeter', 'Zeus'],
    rarity: 5,
    prereqs: {
      Zeus: ['Static Discharge'],
      Demeter: ['Frost Strike', 'Frost Flourish', 'Mistral Dash', "Demeter's Aid"],
    },
    description: (stats) =>
      `<div>Your Jolted effects do not expire when foes attack.</div>` +
      `<div>▶ Jolted Duration:<div><span>10 Sec.</span></div></div>`,
    feature: (stats) =>
      `<span class="Zeus">Jolted</span> effects do not expire when foes attack.`
  },
  {
    name: 'Unshakable Mettle',
    title: 'StatusImmunityTrait',
    type: 'secondary',
    icon: 'assets/traits/Poseidon_Athena_01.png',
    god: ['Poseidon', 'Athena'],
    rarity: 5,
    prereqs: {
      Athena: ['Divine Strike', 'Divine Dash'],
      Poseidon: ['Tempest Strike', 'Tidal Dash', 'Flood Shot'],
    },
    description: (stats) =>
      `<div>You cannot be stunned, and resist some damage from Bosses.</div>` +
      `<div>▶ Boss Damage Reduction:<div><span>10%</span></div></div>`,
    feature: (stats) =>
      `You cannot be stunned.`,
    mods: [{
      name: 'Unshakable Mettle',
      type: 'effect',
      target: 'coefficients',
      stats: { reduction: 0.1 },
      status: { target: 'foe', name: 'Boss' },
    }],
  },
  {
    name: 'Mirage Shot',
    title: 'ArtemisBonusProjectileTrait',
    type: 'secondary',
    icon: 'assets/traits/Poseidon_Artemis_01.png',
    god: ['Poseidon', 'Artemis'],
    rarity: 5,
    prereqs: {
      Artemis: ['Deadly Strike', 'Deadly Flourish', 'True Shot', "Hunter's Flare", "Artemis' Aid"],
      Poseidon: ['Tempest Strike', 'Tempest Flourish', 'Flood Shot', 'Tidal Dash', "Poseidons' Aid"],
    },
    description: (stats) =>
      `<div>Your Cast fires a second projectile, though it has reduced damage.</div>` +
      `<div>▶ Secondary Shot Damage:<div><span>30%</span></div></div>`,
    effects: [{
      name: 'Mirage Shot',
      type: 'mirage',
      trigger: 'cast',
    }],
  },
  {
    name: 'Curse of Drowning',
    title: 'PoseidonAresProjectileTrait',
    type: 'secondary',
    icon: 'assets/traits/Poseidon_Ares_01.png',
    god: ['Poseidon', 'Ares'],
    rarity: 5,
    prereqs: {
      Ares: [ 'Curse of Agony', 'Curse of Pain', 'Blade Dash', "Ares' Aid"],
      Poseidon: ['Flood Shot'],
    },
    description: (stats) =>
      `<div>Your Cast is a pulse that deals damage to foes around you.</div>` +
      `<div>▶ Pulses per Cast:<div><span>3</span></div></div>`,
    mods: [
      {
        name: 'Curse of Drowning',
        type: 'effect',
        target: 'Flood Shot',
        stats: { name: 'Drowning Waves', lodge: false },
      },
      {
        name: 'Curse of Drowning',
        type: 'effect',
        target: 'Flood Shot',
        stats: { count: 1 },
        status: { target: 'foe', name: 'Drowning Waves', min_stacks: 1, max_stacks: 3 },
      }
    ],
  },
  {
    name: 'Stubborn Roots',
    title: 'NoLastStandRegenerationTrait',
    type: 'secondary',
    icon: 'assets/traits/Demeter_Athena_01.png',
    god: ['Demeter', 'Athena'],
    rarity: 5,
    prereqs: {
      Athena: ['Divine Strike', 'Divine Dash', "Athena's Aid"],
      Demeter: ['Frost Strike', 'Frost Flourish', "Demeter's Aid"],
    },
    description: (stats) =>
      `<div>While you have no Death/Stubborn Defiance, your Life slowly recovers.</div>` +
      `<div>▶ Life Regeneration:<div><span>1</span>every 0.8 Sec.</div></div>`,
    feature: (stats) =>
      `Regenerate <span>1</span>&nbsp;<img src="/Apollo/assets/LifeRestore_Small.png" />&nbsp;per <b>Sec</b> while you have no <b>Death/Stubborn Defiance.</b>`,
  },
  {
    name: 'Cold Embrace',
    title: 'SelfLaserTrait',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_Demeter_01.png',
    god: ['Aphrodite', 'Demeter'],
    rarity: 5,
    prereqs: {
      Demeter: ['Crystal Beam'],
      Aphrodite: ['Heartbreak Strike', 'Passion Dash', 'Heartbreak Flourish', "Aphrodite's Aid"],
    },
    description: (stats) =>
      `<div>Your Cast fires its beam directly at you for +4 Sec.</div>` +
      `<div>▶ Bonus Cast Damage:<div><span>+30%</span></div></div>`,
    feature: (stats) =>
      `<span class="Demeter">Crystal Beam</span> fires directly at you.`,
    mods: [{
      name: 'Cold Embrace',
      type: 'effect',
      target: 'beam',
      stats: { mult_base: 0.3 },
    }],
  },
  {
    name: 'Smoldering Air',
    title: 'RegeneratingCappedSuperTrait',
    type: 'secondary',
    icon: 'assets/traits/Zeus_Aphrodite_01.png',
    god: ['Aphrodite', 'Zeus'],
    rarity: 5,
    prereqs: {
      Zeus: ['Lightning Strike', 'Thunder Flourish', 'Electric Shot', 'Thunder Dash', "Zeus' Aid"],
      Aphrodite: ["Heartbreak Strike", "Heartbreak Flourish", "Crush Shot", "Passion Dash", "Aphrodite's Aid"],
    },
    description: (stats) =>
      `<div>Your<b>God Gauge</b>charges up automatically, but is capped at<span>25%</span></div>` +
      `<div>▶ Auto Gauge Gain:<div><span>1%</span>every 0.2 Sec.</div></div>`,
    feature: (stats) =>
      `<b>God Gauge</b> charges automatically, but is capped at <span>25%</span>`,
    mods: [
      { name: 'Smoldering Air', type: 'effect', target: 'coefficients', stats: { gauge_auto: 0.01 } },
    ],
  },
  {
    name: 'Curse of Nausea',
    title: 'PoisonTickRateTrait',
    type: 'secondary',
    icon: 'assets/traits/Dionysus_Ares_01.png',
    god: ['Dionysus', 'Ares'],
    rarity: 5,
    prereqs: {
      Ares: ['Curse of Agony', 'Curse of Vengeance', 'Curse of Pain'],
      Dionysus: ['Drunken Strike', 'Drunken Flourish', 'Drunken Dash'],
    },
    description: (stats) =>
      `<div>Your Hangover effects deal damage faster.</div>` +
      `<div>▶ Hangover damage rate:<div><span>0.3 Sec.</span></div></div>`,
    mods: [{
      name: 'Curse of Nausea',
      type: 'effect',
      target: 'hangover',
      stats: { interval: -0.2 },
    }],
  },
  {
    name: 'Calculated Risk',
    title: 'SlowProjectileTrait',
    type: 'secondary',
    icon: 'assets/traits/Dionysus_Athena_01.png',
    god: ['Athena', 'Dionysus'],
    rarity: 5,
    prereqs: {
      Dionysus: ["Dionysus' Aid", 'Drunken Dash', 'Drunken Flourish', 'Drunken Strike'],
      Athena: ["Athena's Aid", 'Divine Dash', 'Divine Flourish', 'Divine Strike'],
    },
    description: (stats) =>
      `<div>Your foes' ranged-attack projectiles are slower.</div>` +
      `<div>▶ Foe Projectile Speed Reduction:<div><span>+50%</span></div></div>`,
    feature: (stats) =>
      `Foes' <b>projectiles</b> are <span class="Athena">slower.</span>`,
    mods: [{
      name: 'Calculated Risk',
      type: 'effect',
      trigger: 'foe',
      stats: { speed_projectile: -0.5 },
    }],
  },
  {
    name: 'Freezing Vortex',
    title: 'StationaryRiftTrait',
    type: 'secondary',
    icon: 'assets/traits/Ares_Demeter_01.png',
    god: ['Ares', 'Demeter'],
    rarity: 5,
    exclude: ['Hunting Blades'],
    prereqs: {
      Demeter: ["Demeter's Aid", 'Frost Flourish', 'Frost Strike', 'Mistral Dash'],
      Ares: ['Slicing Flare', 'Slicing Shot'],
    },
    description: (stats) =>
      `<div>Your Cast inflicts Chill, but is smaller and moves slower.</div>` +
      `<div>▶ Blade Rift size:<div><span class="bad_effect">-15%</span></div></div>`,
    effects: [{...chill, trigger: 'cast'}],
    mods: [{
      name: 'Freezing Vortex',
      type: 'effect',
      target: 'cast',
      stats: { multiply_radius: -0.15 },
    }],
  },
  {
    name: 'Splitting Headache',
    title: 'PoisonCritVulnerabilityTrait',
    type: 'secondary',
    icon: 'assets/traits/Dionysus_Artemis_01.png',
    god: ['Dionysus', 'Artemis'],
    rarity: 5,
    prereqs: {
      Artemis: ["Artemis' Aid", 'Deadly Flourish', 'Deadly Strike', 'True Shot'],
      Dionysus: ["Dionysus' Aid", 'Drunken Dash', 'Drunken Flourish', 'Drunken Strike'],
    },
    description: (stats) =>
      `<div>Hangover-afflicted foes are more likely to take Critical damage.</div>` +
      `<div>▶ Bonus Critical Chance per Hangover Stack:<div><span>+1.5%</span></div></div>`,
    mods: [{
      name: 'Splitting Headache',
      type: 'effect',
      target: 'coefficients',
      stats: { crit: 0.015 },
      status: { target: 'foe', name: 'Hangover' },
    }],
  },
]