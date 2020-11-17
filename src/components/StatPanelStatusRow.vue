<template>

  <template v-if="max">
    <div class="character_panel__status_row" @mousewheel.prevent="scrollStacks" @click="cycle">
      <div :class="['character_panel__status_name', `${status_value ? '' : 'status__inactive'}`]">{{ status_name }}</div>

      <div class="character_panel__value_container">
        <img class="character_panel__button button__value_arrow" src="/assets/Arrow_Left.png" @click.stop="stepDown()" />
        <div class="character_panel__number">{{ Number(status_value) }}</div>
        <img class="character_panel__button button__value_arrow" src="/assets/Arrow_Right.png" @click.stop="stepUp()" />
      </div>
    </div>
  </template>

  <template v-else>
    <div class="character_panel__status_row" @click="toggle()">
      <div :class="['character_panel__status_name', `${status_value ? '' : 'status__inactive'}`]">{{ status_name }}</div>
      <img
        class="character_panel__checkbox_image"
        :src="`/Apollo/assets/RadioButton_${ status_value ? 'S' : 'Uns' }elected.png`"
      />
    </div>
  </template>

</template>

<style>

.character_panel__status_row {
  display: flex;
  margin-top: 0.2em;
  height: 1.5em;
}

.character_panel__status_name {
  flex-grow: 1;
  text-align: left;
}
.character_panel__status_row:hover > .character_panel__status_name {
  font-size: 105%;
}
.status__inactive {
  color: grey;
}

.character_panel__value_container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.character_panel__button {
  height: 1em;
}

.button__value_arrow {
  filter: opacity(50%);
}

.character_panel__number {
  text-align: center;
  background-color: #111;
  color: #ddd;
  padding: 0 0.3em;
}

.character_panel__checkbox_image {
  height: 1.6em;
  width: 1.6em;
  display: inline-block;
  padding: 0;
}
</style>


<script>
import { computed } from 'vue'

export default {
  props: {
    character: Object,
    status_name: String,
    status_value: [ Boolean, Number ],
  },

  setup(props) {
    const { character, status_name, status_value } = props
    const min = computed(() => character[`min_${status_name}`] || 0)
    const max = computed(() => character[`max_${status_name}`])
    const cstatus = character.status
    const stepDown = () => cstatus[status_name] -= (cstatus[status_name] > min.value) ? 1 : 0
    const stepUp = () => cstatus[status_name] += (cstatus[status_name] < max.value) ? 1 : 0
    const scrollStacks = (e) => (e.wheelDelta > 0) ? stepUp(status_name) : stepDown(status_name)
    const cycle = () => cstatus[status_name] = Math.max(min.value, (cstatus[status_name] + 1) % (max.value + 1))
    const toggle = () => cstatus[status_name] = !cstatus[status_name]

    return {
      cycle,
      max,
      scrollStacks,
      stepDown,
      stepUp,
      toggle,
    }
  },
}
</script>
