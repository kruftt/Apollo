<template>
  <div class="trait_panel__column">
    <TraitIconInterface
      v-for="n in size"
      :key="n-1"
      :trait="traits[n-1] || placeholder"
      :cb="select"
      :active="isActive(traits[n-1])"
      @mouseenter="store.hover = traits[n-1]"
      @mouseleave="store.hover = null"
      class="trait_panel__icon"
    />
  </div>
</template>

<style>
.trait_panel__column {
  position: relative;
  margin: 0 -2em 0 0;
  padding-right: 0.5em;
}
.trait_panel__column:nth-child(odd) {
  top: 1.0em;
}
.trait_panel__column:nth-child(even) {
  top: 4.1em;
}

.trait_panel__icon {
  position: relative;
  margin: 0 -0.5em -0.5em 0;
}
</style>

<script>
import TraitIconInterface from './TraitIconInterface.vue'
import useStore from '../store'
const store = useStore()

function select(trait) {
  store.selected = trait
}

function isActive(trait) {
  if (!trait) return false
  return (trait.type === 'aspect' || trait.name === 'base')
    ? false
    : true
}

export default {
  components: {
    TraitIconInterface
  },
  props: {
    traits: Array,
    size: Number,
  },
  setup() {
    return {
      isActive,
      placeholder: store.placeholder,
      select,
      store,
    }
  }
}
</script>
