<template>
  <div class="trait_icon__interface">
    <TraitIcon :trait="trait" />
    <div
      v-if="trait.type === 'placeholder'"
      class="trait_icon__placeholder"
      @click.stop="cb(trait)"
    />

    <template v-else >
      <div class="trait_icon__target" @click.stop="cb(trait)" />
      <div v-if="trait.type !== 'keepsake'" class="trait_icon__highlight" @click.stop="cb(trait)" />
      <img
        v-if="active"
        src="/assets/TrashButtonHilight.png"
        class="trait_icon__button button__remove_trait"
        @click.stop="remove"
      />

      <template v-if="showRarity">
        <div
          v-if="prevRarity"
          :class="`trait_icon__button button__rarity button__rarity--decrease button__rarity--${ prevRarity }`"
          @click.stop="decreaseRarity"
        />
        <div
          v-if="nextRarity"
          :class="`trait_icon__button button__rarity button__rarity--increase button__rarity--${ nextRarity }`"
          @click.stop="increaseRarity"
        />
      </template>

      <div v-if="trait.level" class="trait_icon__level_container" @click.stop="">
        <img class="trait_icon__button button__level_arrow" src="/assets/Arrow_Left.png" @click.stop="decreaseLevel" />
        <div class="trait_icon__level_text">Lv.{{ trait.level }}</div>
        <img class="trait_icon__button button__level_arrow" src="/assets/Arrow_Right.png" @click.stop="increaseLevel" />
      </div>
    </template>
  </div>
</template>

<style>
.trait_icon__placeholder {
  position: absolute;
  left: .75em;
  top: 1.9em;
  width: 2.9em;
  height: 2.9em;
  margin: 0 0 0 1em;
  transform: rotate(45deg);
  background-color: #303030;
  box-shadow: inset 0.2em 0.2em 0.5em 0.3em #222a;
  outline: 2px #4446 inset;
}
.trait_icon__placeholder:hover {
  outline: 2px #BB4C inset;
  box-shadow: inset 0.2em 0.2em 0.5em 0.3em #BB41;
}

.trait_icon__target {
  position: absolute;
  left: 0.6em;
  top: 0.6em;
  width: 5.2em;
  height: 5.2em;
  transform: rotate(45deg);
  z-index: 1;
}
.trait_icon__highlight {
  position: absolute;
  left: 1.52em;
  top: 1.61em;
  width: 3.5em;
  height: 3.5em;
  transform: rotate(45deg);
  z-index: 1;
}
.trait_icon__highlight:hover {
  box-shadow: inset 0 0 0.25em 0.05em #BB46, 0 0 0.3em 0.05em #BB46;
}

.trait_icon__button {
  z-index: 2;
  display: none;
}
.trait_icon__button:hover {
  transform-origin: center;
  transform: scale(1.1, 1.1);
}
.trait_icon__interface:hover .trait_icon__button {
  display: block;
}

.button__remove_trait {
  position: absolute;
  width: 2.2em;
  height: 2.2em;
  left: 2.2em;
  top: -0.3em;
  filter: saturate(0%)
}
.button__remove_trait:hover {
  filter: saturate(100%);
}

.button__rarity {
  position: absolute;
  width: 1.8em;
  height: 1.8em;
  top: 2.15em;
  border-radius: 50%;
  box-shadow: 0 0 0.4em 0.1em #111 inset, -0.1em 0.1em 0.1em 0.05em #111;
  transition: background-color 0.14s;
  filter: saturate(70%)
}
.button__rarity:hover {
  top: 2.05em;
  filter: none;
  box-shadow: 0 0 0.4em 0.1em #222 inset, -0.1em 0.1em 0.2em 0.1em #111;
}
.button__rarity--decrease {
  left: -0.3em;
}
.button__rarity--increase {
  left: 5.0em;
}
.button__rarity--0 {
  background-color: #bbb;
}
.button__rarity--1 {
  background-color: #0080F0;
}
.button__rarity--2 {
  background-color: #8000F0;
}
.button__rarity--3 {
  background-color: #F00000;
}
.button__rarity--4 {
  background-color: #F0F000;
}
.button__rarity--none {
  background-color: #444;
}

.trait_icon__level_container {
  position: absolute;
  /* z-index: 0; */
  width: 100%;
  top: 4.5em;
  display: flex;
  justify-content: center;
}
.trait_icon__interface:hover > .trait_icon__level_container {
  z-index: 2;
}

.button__level_arrow {
  position: relative;
  top: 0.15em;
  height: 1.4em;
}

.trait_icon__level_text {
  font-family: "Arial";
  font-weight: 800;
  background-color: #000;
  padding: 0 0.2em;
  border: 2px solid #431;
  margin: 0 -0.15em
}
</style>

<script>
import { computed } from 'vue'
import TraitIcon from './TraitIcon.vue'
import useStore from '../store'
const store = useStore()

export default {
  components: { TraitIcon },
  props: { active: Boolean, trait: Object, cb: Function },
  setup (props) {
    const remove = () => {
      switch(props.trait.type) {
        case 'attack':
          store.traits.splice(0, 1, store.base.attack)
          break
        case 'special':
          store.traits.splice(1, 1, store.base.special)
          break
        case 'cast':
          store.traits.splice(2, 1, store.base.cast)
          break
        case 'dash':
          store.traits.splice(3, 1, store.base.dash)
          break
        case 'call':
          store.traits.splice(4, 1, store.base.call)
          break
        case 'keepsake':
          store.traits.splice(5, 1, store.base.keepsake)
          break
        case 'hammer':
        case 'primary':
        case 'secondary':
          store.traits.splice(store.traits.indexOf(props.trait), 1)
          break
      }
    }
    const showRarity = computed(() => {
      const rarity = props.trait.rarity
      const _type = props.trait.type
      return (rarity > -1) && ((rarity < 4) || (_type === 'aspect' && rarity < 5))
    })
    const prevRarity = computed(() => {
      return `${ props.trait.rarity > 0 ? props.trait.rarity - 1 : 'none' }`
    })
    const nextRarity = computed(() => {
      const max = props.trait.type === 'aspect' ? 4 : (props.trait.god === 'Chaos' ? 2 : 3)
      return `${ props.trait.rarity < max ? props.trait.rarity + 1 : 'none' }`
    })
    const decreaseRarity = () => {
      if (props.trait.rarity > 0)
        props.trait.rarity -= 1
    }
    const increaseRarity = () => {
      const max = props.trait.type === 'aspect' ? 4 : (props.trait.god === 'Chaos' ? 2 : 3)
      if (props.trait.rarity > -1 && props.trait.rarity < max)
        props.trait.rarity += 1
    }

    const decreaseLevel = () => {
      if (props.trait.level > 1) props.trait.level -= 1
    }
    const increaseLevel = () => {
      props.trait.level += 1
    }

    return {
      remove,
      showRarity,
      prevRarity,
      nextRarity,
      decreaseRarity,
      increaseRarity,
      decreaseLevel,
      increaseLevel,
    }
  }
}
</script>
