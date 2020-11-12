<template>
<div>
  <div :class="[ 'effect_data', effect.type, effect.damage_max ? 'data--bold': '', ]">
    <div class="effect_data__name">{{ effect.name + ((effect.stats.count) ? ` (${effect.stats.count})`: '') }}</div>
    <div title="Chance" v-if="effect.stats.chance" class="effect_data__info" >
      <b>{{ Math.round(100*effect.stats.chance) }}%</b>
    </div>
    <div class="effect_data__stats">
      <div title="Damage Reduction" v-if="effect.stats.reduction" class="effect_data__info" >
        <img src="/assets/SwordIcon.png" class="effect_data__icon" />
        &nbsp;{{ `-${fp(effect.stats.reduction, null, 1)}%` }}
      </div>
      <div title="Defend"  v-if="effect.stats.defend" class="effect_data__info">
        <img src="/assets/ShieldIcon.png" class="effect_data__icon" />
      </div>
      <div title="Charge"  v-if="effect.stats.charge" class="effect_data__info">
        <img src="/assets/ChargeIcon.png" class="effect_data__icon effect_data__thin_icon" />
        &nbsp;{{ fv(effect.stats.charge) }}s
      </div>
      <div title="Increased Damage Taken" v-if="effect.stats.multiplier" class="effect_data__info" >
        <img src="/assets/ShieldIcon.png" class="effect_data__icon" />
        &nbsp;{{ `-${fp(effect.stats.multiplier)}%` }}
      </div>
      <div title="Range"  v-if="effect.stats.range" class="effect_data__info">
        <img src="/assets/RangeIcon.png" class="effect_data__icon effect_data__thin_icon" />
        &nbsp;{{ (effect.stats.range > 0 ? '+' : '') + fp(effect.stats.range) }}%
      </div>
      <div title="Radius" v-if="effect.stats.radius" class="effect_data__info">
        <img src="/assets/RadiusIcon5.png" class="effect_data__icon" />
        &nbsp;{{ fv(effect.stats.radius) }}
      </div>
      <div title="Duration" v-if="effect.stats.duration" class="effect_data__info" >
        <img src="/assets/DurationIcon.png" class="effect_data__duration_icon" />
        &nbsp;{{ fv(effect.stats.duration, null, 1) }}s
      </div>
      <template v-if="effect.damage_max">
        <div title="Damage" v-if="effect.damage_max" :class="[ 'effect_data__damage', effect.crit_chance ? '' : dmg_mag((effect.dot_damage || effect.damage_max)) ]">
          {{ (effect.dot_damage || effect.damage) }}
        </div>
      </template>
    </div>
  </div>

  <div title="Damage Over Time" v-if="effect.dot_damage !== undefined" :class="['dot_data', effect.type ]">
    <div title="Interval" class="effect_data__interval">
      &nbsp;<b>{{ effect.damage }}</b> every <b>{{ effect.stats.interval }}</b> Sec.
    </div>
  </div>

  <template v-if="effect.crit_chance">
    <div class="crit_data">
      <div title="Critical Chance" class="crit_data__label">
        &nbsp;Critical&nbsp;
        <b>{{ `${fp(effect.crit_chance, null, 1)}%` }}</b>
      </div>
      <div title="Critical Damage" class="crit_data__value">
        {{ effect.crit_damage }}
      </div>
    </div>

    <div title="Average Damage" class="avg_data">
      <div class="crit_data__label">
        &nbsp;Avg
      </div>
      <div :class="[ 'avg_data__value', dmg_mag(effect.avg_damage) ]"><b>{{ effect.avg_damage }}</b></div>
    </div>
  </template>

  <div v-if="effect.slam" :class="['knockback_data', effect.slam.type]">
    &nbsp;Knockback
    <div :class="['slam_data', dmg_mag(30*effect.slam.stats.mult_base)]">Slam</div>
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
  flex-flow: row wrap;
  align-items: baseline;
}
.effect_data__stats {
  flex: 1 1 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
}

.effect_data__spacer {
  flex: 0.5 0.5 auto;
}

.effect_data__info {
  display: flex;
  font-size: 90%;
  margin-left: 0.5em;
  align-items: baseline;
}

.effect_data__name {}

.effect_data__icon {
  height: 0.9em;
  width: 0.9em;
  position: relative;
  top: 0.05em;
}
.effect_data__thin_icon {
  width: 0.5em;
}
.effect_data__duration_icon {
  height: 0.95em;
  width: 0.95em;
  position: relative;
  top: 0.05em;
  opacity: 0.8;
}

.effect_data__damage {
  flex: 1 0 auto;
  margin: 0 0 0 1em;
  text-align: right;
}

.effect_data__interval {
  font-weight: normal;
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
.dot_data__duration {
  padding-left: 1em;
}
.dot_data__interval {

}
.dot_data__damage {
  flex: 1;
  text-align: right;
  font-weight: bold;
}

.knockback_data {
  font-size: 90%;
  font-weight: 500;
  text-align:left;
  color: #aaa;
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
}

.slam_data {
  flex: 2 0;
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
  font-size: 95%;
}
.dmg_mag--3 {
  font-size: 100%;
}
.dmg_mag--4 {
  font-size: 105%;
}
.dmg_mag--5 {
  font-size: 110%;
}
.dmg_mag--6 {
  font-size: 115%;
}
.dmg_mag--7 {
  font-size: 120%;
}

.event { color: #aaa; }
.bolt, .chain, .jolt, .jolted, .spark { color: #cc4; }
.heartbreak, .weak, .lament, .despair, .charm, .crush, .passion, .love { color: rgb(219, 88, 219); }
.doom, .rift { color: #d55; }
.deadly, .hunters, .arrow, .exit { color: #6b6; }
.deflect, .shield, .phalanx { color: #baa968; }
.arctic, .chill, .snow, .frozen, .freeze, .shatter, .beam, .vortex { color: rgb(177, 203, 255); }
.hangover, .pressure, .trippy, .festive { color: rgb(146, 122, 255); }
.wave, .rupture, .flood, .surge, .typhoon, .watery { color: rgb(122, 195, 255) }
.shared { color: #bbf; }
.hammer { color: rgb(152, 156, 173); }
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
