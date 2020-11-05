<template>
<div>
  <div :class="[ 'effect_data', effect.type, effect.damage_max ? 'data--bold': '', ]">
    <div class="effect_data__name">{{ effect.name + ((effect.stats.count) ? ` (x${effect.stats.count})`: '') }}</div>
    <div v-if="effect.stats.duration"
      class="effect_data__duration" >
      {{ fv(effect.stats.duration, null, 1) }}s
    </div>
    <div v-if="effect.stats.reduction"
      class="effect_data__reduction" >
      {{ `-${Math.round(1000*(effect.stats.reduction))/10}% dmg` }}
    </div>
    <div v-if="effect.stats.chance"
      class="effect_data__chance" >
      {{ Math.round(100*effect.stats.chance) }}% chance
    </div>
    <div class="effect_data__spacer" />
    <div v-if="effect.damage_max"
      :class="[ 'effect_data__damage', effect.crit_chance ? '' : dmg_mag(effect.damage_max) ]">
      {{ effect.damage }}
    </div>
  </div>

  <template v-if="effect.crit_chance">
    <div class="crit_data">
      <div class="crit_data__label">
        critical&nbsp;&nbsp;{{ `${Math.round(1000*effect.crit_chance)/10}%` }}
      </div>
      <div class="crit_data__value">{{ effect.crit_damage }}</div>
    </div>

    <div class="avg_data data--bold">
      <div class="crit_data__label">
        Avg
      </div>
      <div :class="[ 'avg_data__value', dmg_mag(effect.avg_damage) ]">{{ effect.avg_damage }}</div>
    </div>
  </template>

  <div v-if="effect.dot_damage" :class="['dot_data', effect.type ]">
    <div class="dot_data__interval">&nbsp;Every {{ effect.stats.interval }} Sec.</div>
    <div :class="['dot_data__damage', dmg_mag(effect.dot_damage) ]">{{ effect.dot_damage }}</div>
  </div>

  <div v-if="effect.slam" :class="['knockback_data', effect.slam.type]">
    Knockback
    <div class="slam_data">Slam</div>
    <div class="slam_damage">{{ effect.slam.damage_min }}</div>
  </div>

  <div v-if="effect.effects.length > 0" class="secondary_data">
    <div class="secondary_data__spacer" />
    <div class="secondary_data__content">
      <StatPanelEffectData v-for="_effect of effect.effects" :effect="_effect" />
    </div>
  </div>
</div>
</template>


<style>
.data--bold {
  font-weight: 600;
}


.effect_data {
  text-align: left;
  color: #ccc;
  display: flex;
  align-items: baseline;
}

.effect_data__name {}

.effect_data__duration {
  text-align: right;
  margin-left: 1em;
  flex: 1 0 auto;
}
.effect_data__reduction {
  text-align: left;
  font-size: 80%;
  margin-left: 1.25em;
}

.effect_data__chance {
  text-align: left;
  font-size: 80%;
  margin-left: 1em;
}

.effect_data__spacer {
  flex-grow: 1;
}

.effect_data__damage {
  margin: 0 0 0 0;
  text-align: right;
}


.crit_data {
  font-size: 90%;
  font-weight: 500;
  text-align: left;
  display: flex;
  color: #6b6;
}

.crit_data__label {
  flex-grow: 1;
}

.crit_data__value {
  text-align: right;
}


.avg_data {
  display: flex;
  text-align: left;
  color: #8d8;
}
.avg_data__value { }

.dot_data {
  display: flex;
  font-size: 95%;
  align-items: baseline;
}
.dot_data__interval {

}
.dot_data__damage {
  flex: 1;
  text-align: right;
}

.knockback_data {
  font-size: 90%;
  font-weight: 500;
  text-align:left;
  color: #aaa;
  display: flex;
  flex-flow: row nowrap;
}

.slam_data {
  flex: 2 0;
  text-align: right;
  font-weight: bold;
}

.slam_damage {
  flex: 1 0;
  text-align: right;
  font-weight: bold;
}


.secondary_data {
  display: flex;
  font-size: 95%;
}
.secondary_data__spacer {
  width: 1em;
}
.secondary_data__content {
  flex-grow: 1;
}


.dmg_mag--1 {
  font-size: 90%;
}
.dmg_mag--2 {
  font-size: 100%;
}
.dmg_mag--3 {
  font-size: 110%;
}
.dmg_mag--4 {
  font-size: 115%;
}
.dmg_mag--5 {
  font-size: 120%;
}
.dmg_mag--6 {
  font-size: 125%;
}
.dmg_mag--7 {
  font-size: 130%;
}

.bolt, .chain, .jolt, .jolted, .spark { color: #cc4; }
.weak, .charm, .crush, .love { color: rgb(219, 88, 219); }
.doom, .rift { color: #d55; }
.arrow, .exit { color: #6b6; }
.deflect, .shield { color: #baa968; }
.arctic, .chill, .snow, .frozen, .freeze, .shatter, .beam, .vortex { color: rgb(177, 203, 255); }
.hangover, .pressure, .trippy, .festive { color: rgb(146, 122, 255); }
.wave, .rupture, .flood, .surge, .typhoon, .watery { color: rgb(122, 195, 255) }
.shared { color: #bbf; }
</style>


<script>
import { computed } from 'vue'
import { fp, fv } from '../data/util'
import useStore from '../store'
const store = useStore()

function dmg_mag(dmg) {
  if (dmg === undefined) return ''
  return `dmg_mag--${
    (dmg < 20) ? 1 :
    (dmg < 40) ? 2 :
    (dmg < 100) ? 3 :
    (dmg < 200) ? 4 :
    (dmg < 400) ? 5 :
    (dmg < 800) ? 6 : 7
  }`
}

export default {
  name: 'StatPanelEffectData',
  props: {
    effect: Object
  },
  setup (props) {
    const effect = props.effect

    return {
      dmg_mag,
      fp, fv,
    }
  }
}
</script>
