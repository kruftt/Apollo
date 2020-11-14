<template>
  <div class="stat_panel">
    <template v-for="name, key of ability_names">
      <template v-if="store.build.abilities[key]">
        <div class="stat_panel__name_bar">
          <div class="name_bar__spacer" />
          <div class="name_bar__name">{{ name }}</div>
          <div class="name_bar__spacer" />
        </div>
        <StatPanelEffectData v-for="effect of store.build.abilities[key]" :effect="effect" class="stat_panel__effect_data" />
      </template>
    </template>
  </div>
  <div class="stat_panel">
    <StatPanelCharacterData class="stat_panel__char_data" :character="store.player" />
    <StatPanelCharacterData class="stat_panel__char_data" :character="store.foe" />
    <div class="build_features">
      <div v-for="feature in store.build.features" class="build_features__feature">
        <img class="build_features__bullet" src="/assets/Bullet.png" />
        <div class="build_features__content" v-html="feature" />
      </div>
    </div>
  </div>
</template>

<style>
.stat_panel {
  background-color: #080808;
  width: 20em;
  margin: 1em 1em 1em 1em;
  background-color: #181818;
  border: 1em solid #181818;
  border-radius: 1em;
  border-right-width: 0.1em;
  box-shadow: 0 0 0 0.15em #222;
  font-family: "Inter","Roobert","Helvetica Neue",Helvetica,Arial,sans-serif;
  overflow-y: auto;
  scrollbar-width: 0.4em;
  scrollbar-color: #333 #111;
}
.stat_panel::-webkit-scrollbar {
  width: 0.4em;
}
.stat_panel::-webkit-scrollbar-track {
  background:  #111;
  margin: 0em;
}
.stat_panel::-webkit-scrollbar-thumb {
  background-color: #333;
  margin: 0em;
}

.stat_panel__name_bar {
  height: 1.5em;
  margin: 0 1em 0.1em 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.name_bar__spacer {
  flex: 1 1;
  background-color: #444;
  height: 0.05em;
}
.name_bar__name {
  color: #444;
  margin: 0 0.25em;
  font-weight: bold;
}

.stat_panel__effect_data + .stat_panel__name_bar {
  margin-top: 2em;
}

.stat_panel__effect_data {
  margin: 0 1.25em 0 0.25em;
  color: #bbb;
}
.stat_panel__effect_data + .stat_panel__effect_data {
  margin-top: 1.0em;
}

.stat_panel__char_data {
  margin: 0 0.5em 2em 0.5em;
}

.build_features {
  text-align: left;
  color: #bbb;
  font-size: 95%;
  display: flex;
  flex-flow: column nowrap;
}
.build_features__feature span {
  font-weight: bold;
  color: #4c4;
}
.build_features__bullet {
  display: inline-block;
  height: 1em;
  margin: 0.1em 0.4em 0 0;
  opacity: 0.7;
}
.build_features__content {
  margin-right: 1em;
}

.build_features__content img {
  position: relative;
  top: 0.2em;
  height: 1em;
  transform: scale(1.4, 1.4);
  margin: 0 0.1em;
}
.build_features__feature {
  display: flex;
}
.build_features__feature + .build_features__feature {
  margin-top: 0.6em;
}

</style>

<script>
import { computed } from 'vue'
import TraitInfoBar from './TraitInfoBar.vue'
import StatPanelCharacterData from './StatPanelCharacterData.vue'
import StatPanelEffectData from './StatPanelEffectData.vue'
import useStore from '../store'
const store = useStore()
const ability_names = {
  attack: 'Attack',
  chargeAttack: 'Charge Attack',
  dashAttack: 'Dash Attack',
  special: 'Special',
  chargeSpecial: 'Charge Special',
  dashSpecial: 'Dash Special',
  cast: 'Cast',
  dash: 'Dash',
  call: 'Call',
  revenge: 'Revenge',
  slain: 'On Enemy Slain'
}

export default {
  components: {
    TraitInfoBar,
    StatPanelCharacterData,
    StatPanelEffectData,
  },
  setup () {
    return {
      ability_names,
      store,
    }
  }
}
</script>
