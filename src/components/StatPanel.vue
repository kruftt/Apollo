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
  </div>
</template>

<style>
.stat_panel {
  background-color: #080808;
  width: 17em;
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
  margin: 0 1em 0 0;
  color: #bbb;
}
.stat_panel__effect_data + .stat_panel__effect_data {
  margin-top: 1.0em;
}

.stat_panel__char_data {
  margin: 0 0 2em 0;
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
  dash: 'Dash',
  cast: 'Cast',
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
