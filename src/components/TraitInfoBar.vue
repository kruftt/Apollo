<template>
  <div class="trait_info">
    <TraitIconInterface
      class="trait_info__icon"
      :trait="trait"
      :cb="noop"
    />
    <div class="trait_info__text">
      <h3 class="trait_info__name">{{ trait.name }}</h3>
      <div class="trait_info__description" v-html="trait.description"></div>
    </div>
  </div>
</template>


<style>
.trait_info {
  display: flex;
  padding: 1em 1.5em;
  width: 42em;
  background-color: #080808;
}
.trait_info:hover {
  background-color: #111;
}

.trait_info__icon {
  position: relative;
  top: 0;
  left: 0;
}

.trait_info__text {
  width: 100%;
  text-align: left;
  margin: 0 0 0 2em;
  font-weight: 100;
  display:flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.trait_info__name {
  margin: 0 0 0.5em 0;
  font-weight: 100;
  font-size: 140%;
}

.trait_info__description {
  white-space: nowrap;
}
.trait_info__description span::before,
.trait_info__description span::after,
.trait_info__description b::before,
.trait_info__description b::after,
.trait_info__description b + span::before,
.trait_info__description b + span::after
{
  content: '\00a0';
  /* padding: 0 0.3em; */
}

.trait_info__description img {
  height: 1.5em;
}
.trait_info__description span {
  color: #4d4;
  font-weight: bold;
}
.trait_info__description .bad_effect {
  color: #f44;
}

.trait_info__description > div {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

.trait_info__description > div + div {
  margin: 0.4em 0 0 0;
  justify-content: space-between;
}

.trait_info__description > div > div {
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  max-width: 14em;
}

.trait_info__trait_prereqs {
  position: absolute;
  left: 42em;
  top: 0;
}

span.rare {
  color: rgb(90, 120, 255) !important;
}
span.epic {
  color: rgb(94, 4, 211) !important;
}
span.heroic {
  color: rgb(224, 1, 1) !important;
}
</style>


<script>
import { computed } from 'vue'
import TraitIconInterface from './TraitIconInterface.vue'

export default {
  components: {
    TraitIconInterface,
  },
  props: {
    trait: Object
  },
  setup(props) {
    return {
      noop: () => 0,
    }
  }
}
</script>
