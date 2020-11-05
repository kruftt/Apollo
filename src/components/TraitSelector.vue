<template>
<div class="trait_selector__screen" @click="store.selected = null">
  <div class="apollo_calc__spacer" />
  <div class="trait_selector__panel_wrapper">
    <div class="trait_selector__panel">
      <TraitInfoBar
        v-for="trait in selection.list"
        :trait="trait"
        @click.stop="trait.active ? selectTrait(trait) : 0"
        @mouseenter="hover = trait.prereqs ? trait : null"
        @mousemove="hover = trait.prereqs ? trait : null"
        @mouseleave="hover = null"
        :class="['trait_selector__info_bar', trait.active ? '' : 'trait_selector__info_bar--inactive']"
      />
    </div>
    <TraitPrereqs
      :trait="hover"
      class="trait_selector__prereqs"
    />
  </div>
  <div class="apollo_calc__spacer" />
</div>
</template>

<style scoped>
.trait_selector__screen {
  z-index: 1;
  background-color: #0008;
  display: flex;
  flex-flow: row nowrap;
  font-size: 90%;
  min-width: 100%;
}
.trait_selector__panel_wrapper {
  position: relative;
  height: 40em;
  margin: 3em 0;
  border: 2px solid #544;
  /* border: 2px solid #540; */
  border-radius: 8px;

  display: flex;
  flex-flow: row nowrap;
}
.trait_selector__panel {
  max-height: 100%;
  min-width: 42em;
  background-color: #060606;
  overflow-y: auto;
  scrollbar-width: 1.0em;
  scrollbar-color: #333 #111;
}
.trait_selector__panel::-webkit-scrollbar {
  width: 1.0em;
}

.trait_selector__panel::-webkit-scrollbar-track {
  background:  #111;
}
.trait_selector__panel::-webkit-scrollbar-thumb {
  /* background-color: #333; */
  background-color: #201818;
}

.trait_selector__info_bar {
  border: 4px groove #544;
  /* border: 4px groove #540; */
  border-radius: 8px;
  margin: 0 0 0 -4px;
}
.trait_selector__info_bar--inactive {
  filter: brightness(50%);
}

.trait_selector__prereqs {
  width: 14em;
}
</style>

<script>
import { onMounted, reactive, computed, nextTick, ref } from 'vue'
import TraitInfoBar from './TraitInfoBar.vue'
import TraitPrereqs from './TraitPrereqs.vue'
import { useStore } from '../store'
const store = useStore()

export default {
  components: {
    TraitInfoBar,
    TraitPrereqs,
  },
  props: {
    trait: Object
  },
  setup(props) {
    const selection = reactive({
      weapon: null,
      list: [],
    })

    nextTick(() => {
      const t = store.selected.type
      switch(t) {
        case 'attack':
        case 'special':
        case 'dash':
        case 'cast':
        case 'call':
          selection.list = store.filterTraits({ type: t })
          window.trait = selection.list[0]
          break
        case 'aspect':
          selection.list = store.filterTraits({ type: 'weapon' })
          break
        case 'placeholder':
        case 'hammer':
        case 'primary':
        case 'secondary':
          const gods = store.build.gods
          selection.list = store.filterTraits({ type: 'god' }).sort(
            (a, b) => (gods[a.name]) ? (gods[b.name]) ? 0 : -1 : 1
          )
          break
        case 'keepsake':
        default:
      }
    })

    function selectTrait(trait) {
      switch(trait.type) {
        case 'aspect':
          store.weapon = selection.weapon
        case 'hammer':
        case 'attack':
        case 'special':
        case 'cast':
        case 'dash':
        case 'call':
        case 'primary':
        case 'secondary':
          trait.sum = computed(() => trait.level + trait.rarity)
          const idx = store.traits.indexOf(store.selected)
          if (idx === -1) store.traits.push(trait)
          else store.traits[idx] = trait
          store.selected = null
          break
        case 'weapon':
          selection.weapon = trait
          selection.list = store.filterTraits({ type: 'aspect', weapon: trait.name })
          break
        case 'god':
          selection.list = (trait.name === 'Daedalus')
            ? store.filterTraits({ type: 'hammer', weapon: store.weapon.name })
            : store.filterTraits({ type: 'primary secondary', god: trait.name })
          break
        default:
      }
    }

    return {
      hover: ref(null),
      selection,
      selectTrait,
      store,
    }
  },
}
</script>
