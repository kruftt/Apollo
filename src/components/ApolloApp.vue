<template>
  <ApolloHeader></ApolloHeader>
  <div id="apollo_calc">
    <div class="apollo_calc__spacer" />
    <TraitPanel id="trait_panel" />
    <div id="apollo_calc__stats">
      <StatPanel />
      <TraitInfoBar v-if="validHover" :trait="store.hover" id="tool_tip" />
    </div>
    <TraitSelector v-if="store.selected !== null" />
    <div class="apollo_calc__spacer" />
  </div>
</template>

<style>
#apollo_calc {
  display: flex;
  position: relative;
  max-height: 39.5em;
}

.apollo_calc__spacer {
  flex: 1 1;
}

#trait_panel {
  position: relative;
  background-color: #080808;
  padding: 0 0 3.5em 0em;
  margin: 0 0 0 0.5em;
  flex: 0 0;
}

#apollo_calc__stats {
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: row nowrap;
}

#tool_tip {
  position: absolute;
  top: 1em;
  left: 1em;
  border: 4px ridge #762;
  font-size: 85%;
}
</style>

<script>
import ApolloHeader from './ApolloHeader.vue'
import StatPanel from './StatPanel.vue'
import TraitInfoBar from './TraitInfoBar.vue'
import TraitPanel from './TraitPanel.vue'
import TraitSelector from './TraitSelector.vue'
import { computed } from 'vue'
import useStore from '../store'
const store = useStore()

export default {
  components: {
    ApolloHeader,
    StatPanel,
    TraitInfoBar,
    TraitPanel,
    TraitSelector,
  },
  setup() {
    const validHover = computed(() =>
      store.hover && store.hover.type !== 'placeholder' && store.hover.name !== 'base'
    )

    return {
      store,
      validHover,
    }
  }
}
</script>
