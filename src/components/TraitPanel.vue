<template>
<div>
  <div id="trait_panel__backing" />
  <img id="trait_panel__primary_backing" src="assets/PrimaryBoonBacking_6.png" />
  <div id="trait_panel__columns">
    <TraitPanelColumn
      v-for="n in slicedTraits.length"
      :traits="slicedTraits[n-1]"
      :size="n % 2 == 0 ? 5 : 6"
    />
  </div>
</div>
</template>

<style>
#trait_panel__backing {
  position: absolute;
  height: 35.5em;
  width: calc(100% - 5em);
  margin: 1em 1em 1em 2em;
  border: 1em solid #333;
  border-radius: 1em;
  box-shadow: -0em -0.4em 0.1em 0em #202020;
  background-color: #333;
}

#trait_panel__primary_backing {
  position: absolute;
  top: -0.1em;
  left: 0.9em;
  height: 39.5em;
}

#trait_panel__columns {
  display: flex;
  padding-right: 2.5em;
}
</style>

<script>
import { computed } from 'vue'
import TraitPanelColumn from './TraitPanelColumn.vue'
import useStore from '../store.js'
const store = useStore()

export default {
  components: { TraitPanelColumn },
  setup() {
    return {
      slicedTraits: computed(() => {
        const result = []
        let index = 0
        let offset = 6
        while (index < store.traits.length) {
          result.push(store.traits.slice(index, index + offset))
          index = index + offset
          offset == 6 ? offset = 5 : offset = 6
        }
        if (store.traits.length % 5.5 < 1) result.push([])
        return result
      })
    }
  }
}
</script>
