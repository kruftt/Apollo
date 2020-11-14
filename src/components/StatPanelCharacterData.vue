<template>
  <div class="character_panel">
    <div class="character_panel__name">{{ character.name }}</div>

    <div v-for="stat_value, stat_name in character.stats" class="character_panel__row">
      <div class="character_panel__stat_name">{{ firstToUpper(stat_name) }}</div>
      <div class="character_panel__stat_value">{{ formatStatValue(stat_name, stat_value) }}</div>
    </div>


    <div class="character_panel__status">
      <label
        v-for="status, status_key in character.status"
        :for="status_key"
        class="character_panel__status_row"
      >
        <div class="character_panel__status_name">{{ firstToUpper(status_key) }}</div>
        <template v-if="character[`max_${status_key}`]">
          <div class="character_panel__value_container" @click.stop="" @mousewheel.prevent="scrollStacks($event, status_key)">
            <img class="character_panel__button button__value_arrow" src="/assets/Arrow_Left.png" @click.stop="stepDown(status_key)" />
            <div :id="`${status_key}_numbers`" class="character_panel__number">{{ Number(character.status[status_key]) }}</div>
            <img class="character_panel__button button__value_arrow" src="/assets/Arrow_Right.png" @click.stop="stepUp(status_key)" />
          </div>
        </template>
        <template v-else>
          <input :id="status_key" v-model="character.status[status_key]" type="checkbox" :checked="character.status[status_key]" class="character_panel__checkbox" />
          <div class="character_panel__checkbox_image" />
        </template>
      </label>
    </div>
  </div>
</template>


<style>
.character_panel {
  color: #ccc;
}

.character_panel__name {
  font-size: 110%;
  margin-right: 0.8em;
}

.character_panel__row {
  display: flex;
  margin: 0.2em 0.8em 0 0;
}

.character_panel__stat_name {
  flex-grow: 1;
  text-align: left;
}

.character_panel__stat_value { }

.character_panel__status {
  background-color: #111;
  padding: 0.5em;
  margin: 1em 0.8em 0 0;
  border: 0.2em inset #222;
}

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
/* .character_panel__number::-webkit-inner-spin-button,
.character_panel__number::-webkit-outer-spin-button {
  -webkit-appearance: none;
} */

.character_panel__checkbox {
  display: none;
}

.character_panel__checkbox_image {
  height: 1.6em;
  width: 1.6em;
  display: inline-block;
  padding: 0;
  background-image: url('/assets/RadioButton_Unselected.png');
  background-size: 1.6em;
}


.character_panel__checkbox:checked + .character_panel__checkbox_image {
  background-image: url('/assets/RadioButton_Selected.png');
}
</style>


<script>
function firstToUpper(str) {
  return str[0].toUpperCase() + str.slice(1)
}
function formatStatValue(n, v) {
  if ('healthammodashes'.indexOf(n) !== -1) return v
  return `${ Math.round(1000*v)/10 }%`
}

export default {
  props: {
    character: Object,
  },
  setup(props) {
    const character = props.character
    const stepDown = (status_key) => character.status[status_key] -= (character.status[status_key] > (character[`min_${status_key}`] || 0)) ? 1 : 0
    const stepUp = (status_key) => character.status[status_key] += (character.status[status_key] < character[`max_${status_key}`]) ? 1 : 0

    function scrollStacks(e, status_key) {
      if (e.wheelDelta > 0) stepUp(status_key)
      else stepDown(status_key)
    }

    return {
      stepDown,
      stepUp,
      scrollStacks,
      formatStatValue,
      firstToUpper,
    }
  },
}
</script>
