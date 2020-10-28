<template>
  <div class="stat_panel">
    <template v-for="ability of abilities">
      <StatPanelEffectData v-for="effect of ability" :effect="effect" class="stat_panel__effect_data" />
    </template>
  </div>
  <div>
    <StatPanelCharacterData class="stat_panel" :character="store.player" />
    <StatPanelCharacterData class="stat_panel" :character="store.foe" />
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

.stat_panel__effect_data {
  margin: 0 1em 0 0;
}
.stat_panel__effect_data + .stat_panel__effect_data {
  margin-top: 1em;
}
</style>

<script>
import { computed } from 'vue'
import TraitInfoBar from './TraitInfoBar.vue'
import StatPanelCharacterData from './StatPanelCharacterData.vue'
import StatPanelEffectData from './StatPanelEffectData.vue'
import useStore from '../store'
const store = useStore()
const ability_types = ['attack','chargeAttack','dashAttack','special','chargeSpecial','dashSpecial','dash','cast','call','revenge','slain']

export default {
  components: {
    TraitInfoBar,
    StatPanelCharacterData,
    StatPanelEffectData,
  },
  setup () {
    const abilities = computed(() => {
      const abilities = store.build.abilities
      const result = []
      for (const akey of ability_types) {
        const v = abilities[akey]
        if (v) result.push(v)
      }
      return result
    })

    return {
      abilities,
      store,
    }
  }
}
</script>
