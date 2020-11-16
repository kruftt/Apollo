<template>
  <div class="character_panel">

    <div class="character_panel__name">{{ character.name }}</div>

    <div v-for="stat_value, stat_name in character.stats" class="character_panel__row">
      <div class="character_panel__stat_name">{{ firstToUpper(stat_name) }}</div>
      <div class="character_panel__stat_value">{{ formatStatValue(stat_name, stat_value) }}</div>
    </div>

    <div class="character_panel__status">
      <StatPanelStatusRow
        v-for="status_value, status_name in character.status"
        :character="character"
        :status_name="status_name"
        :status_value="status_value"
      />
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
</style>


<script>
import StatPanelStatusRow from './StatPanelStatusRow.vue'

function firstToUpper(str) {
  return str[0].toUpperCase() + str.slice(1)
}
function formatStatValue(n, v) {
  if ('healthammodashes'.indexOf(n) !== -1) return v
  return `${ Math.round(1000*v)/10 }%`
}

export default {
  components: {
    StatPanelStatusRow,
  },
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
