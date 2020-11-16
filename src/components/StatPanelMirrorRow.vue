<template>
  <div class="character_panel__status_row mirror_row" @click.stop="step" @mousewheel.prevent="scrollRanks($event)">
    <img class="mirror_data__icon" v-if="ad" :src="ad.src " />&nbsp;
    <div :class="['character_panel__status_name', `selection_${ store_data.selection }`]">{{ ad ? ad.name : `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${ability_data[0].name}` }}</div>

    <div v-if="store_data.selection" class="character_panel__value_container">
      <img class="character_panel__button button__value_arrow" src="/assets/Arrow_Left.png" @click.stop="stepDown()" />
      <div class="character_panel__number">{{ store_data.rank }}</div>
      <img class="character_panel__button button__value_arrow" src="/assets/Arrow_Right.png" @click.stop="stepUp()" />
    </div>
  </div>

</template>

<style>
.mirror_data__icon {
  position: relative;
  top: -0.25em;
  width: 1.5em;
  height: 1.5em;
  display: inline-block;
}

.mirror_row {
  font-weight: bold;
  margin-top: 0;
  padding-top: 0.2em;
}

.selection_0 { color: grey; }
.selection_1 { color: #9161df; }
.selection_2 { color: #b7ff43; }
</style>


<script>
import { computed } from 'vue'

export default {
  props: {
    store_data: Object,
    ability_data: Object,
  },

  setup(props) {
    const store_data = props.store_data
    const ability_data = props.ability_data
    const ad = computed(() => (store_data.selection ? ability_data[store_data.selection - 1] : null))
    const step = () => (store_data.selection = (props.store_data.selection + 1) % 3) && (store_data.rank = ad.value.ranks)
    const stepDown = () => ((store_data.rank > 1) && (store_data.rank -= 1))
    const stepUp = () => ((store_data.rank < ad.value.ranks) && (store_data.rank += 1))
    const scrollRanks = (e) => (e.wheelDelta > 0 ? stepUp() : stepDown())

    return {
      ad,
      step,
      stepDown,
      stepUp,
      scrollRanks,
    }
  },
}
</script>
