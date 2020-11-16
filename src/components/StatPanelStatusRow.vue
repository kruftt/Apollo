<template>

  <template v-if="character[`max_${status_name}`]">
    <div class="character_panel__status_row" @mousewheel.prevent="scrollStacks($event, status_name)">
      <div :class="['character_panel__status_name', `${character.status[status_name] ? '' : 'status__inactive'}`]">{{ status_name }}</div>

      <div class="character_panel__value_container">
        <img class="character_panel__button button__value_arrow" src="/assets/Arrow_Left.png" @click.stop="stepDown(status_name)" />
        <div class="character_panel__number">{{ Number(character.status[status_name]) }}</div>
        <img class="character_panel__button button__value_arrow" src="/assets/Arrow_Right.png" @click.stop="stepUp(status_name)" />
      </div>
    </div>
  </template>

  <template v-else>
    <div class="character_panel__status_row" @click="toggle(status_name)">
      <div :class="['character_panel__status_name', `${character.status[status_name] ? '' : 'status__inactive'}`]">{{ status_name }}</div>
      <img
        class="character_panel__checkbox_image"
        :src="`/Apollo/assets/RadioButton_${ character.status[status_name] ? 'S' : 'Uns' }elected.png`"
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
  /* -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield; */
  text-align: center;
  background-color: #111;
  color: #ddd;
  padding: 0 0.3em;
  /* border: none; */
  /* width: 1.5em; */
}

.character_panel__checkbox_image {
  height: 1.6em;
  width: 1.6em;
  display: inline-block;
  padding: 0;
}
</style>


<script>
export default {
  props: {
    character: Object,
    status_name: String,
    status_value: [ Boolean, Number ],
  },

  setup(props) {
    const character = props.character
    const stepDown = (status_key) => character.status[status_key] -= (character.status[status_key] > (character[`min_${status_key}`] || 0)) ? 1 : 0
    const stepUp = (status_key) => character.status[status_key] += (character.status[status_key] < character[`max_${status_key}`]) ? 1 : 0

    function scrollStacks(e, status_key) {
      if (e.wheelDelta > 0) stepUp(status_key)
      else stepDown(status_key)
    }

    function toggle(status_key) {
      const status = character.status
      status[status_key] = !status[status_key]
    }

    return {
      stepDown,
      stepUp,
      scrollStacks,
      toggle,
    }
  },
}
</script>
