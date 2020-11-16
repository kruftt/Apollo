<template>
  <div class="character_panel">

    <div class="character_panel__name">{{ character.name }}</div>

    <div v-for="stat_value, stat_name in character.stats" class="character_panel__row">
      <div class="character_panel__stat_name">{{ firstToUpper(stat_name) }}</div>
      <div class="character_panel__stat_value">{{ formatStatValue(stat_name, stat_value) }}</div>
    </div>

    <div class="character_panel__status noselect">
      <div v-if="character.name === 'Zagreus'" @click="mirror_active = !mirror_active">
        <div class="character_panel__mirror">{{ (mirror_active ? '&#9660; Mirror of Night' : '&#9654; Mirror of Night' ) }}</div>
        <StatPanelMirrorRow
          v-if="mirror_active"
          v-for="store_data, key in mirror"
          :store_data="store_data"
          :ability_data="mirrorData[key]"
        />
      </div>

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

.character_panel__mirror {
  color: #7f42e2;
  text-align: left;
  font-weight: bold;
  margin-top: 0;
  padding-bottom: 0.4em;
}
.character_panel__mirror:hover {
  transform: scale(1.08,1.08);
  transform-origin: left center;
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
import { ref } from 'vue'
import StatPanelStatusRow from './StatPanelStatusRow.vue'
import StatPanelMirrorRow from './StatPanelMirrorRow.vue'
import useStore from '../store'
const store = useStore()

function firstToUpper(str) {
  return str[0].toUpperCase() + str.slice(1)
}
function formatStatValue(n, v) {
  if ('healthammodashesAmmo Regen (Sec.)'.indexOf(n) !== -1) return v
  return `${ Math.round(1000*v)/10 }%`
}

const mirrorData = {
  presence: [
    { name: 'Shadow Presence', ranks: 5, src: '/assets/mirror/shadow presence.png' },
    { name: 'Fiery Presence', ranks: 5, src: '/assets/mirror/Fiery_Presence.png' },
  ], reflex: [
    { name: 'Greater Reflex', ranks: 1, src: '/assets/mirror/greater reflex.png' },
    { name: 'Ruthless Reflex', ranks: 1, src: '/assets/mirror/Greater_Celerity.png' },
  ], blood: [
    { name: 'Boiling Blood', ranks: 5, src: '/assets/mirror/boiling blood.png' },
    { name: 'Abyssal Blood', ranks: 5, src: '/assets/mirror/First_Blood.png' },
  ], soul: [
    { name: 'Infernal Soul', ranks: 2, src: '/assets/mirror/infernal soul.png' },
    { name: 'Stygian Soul', ranks: 3, src: '/assets/mirror/Stygian_Soul.png' },
  ], skin: [
    { name: 'Thick Skin', ranks: 10, src: '/assets/mirror/thick skin.png' },
    { name: 'High Confidence', ranks: 5, src: '/assets/mirror/High_Confidence.png' },
  ], privlege: [
    { name: 'Privileged Status', ranks: 2, src: '/assets/mirror/priveleged status.png' },
    { name: 'Family Favorite', ranks: 2, src: '/assets/mirror/Unifying_Bond.png' },
  ],
}

export default {
  components: {
    StatPanelStatusRow,
    StatPanelMirrorRow,
  },
  props: {
    character: Object,
  },
  setup(props) {
    const character = props.character
    const stepDown = (status_key) => character.status[status_key] -= (character.status[status_key] > (character[`min_${status_key}`] || 0)) ? 1 : 0
    const stepUp = (status_key) => character.status[status_key] += (character.status[status_key] < character[`max_${status_key}`]) ? 1 : 0
    const mirror_active = ref(true)
    function scrollStacks(e, status_key) {
      if (e.wheelDelta > 0) stepUp(status_key)
      else stepDown(status_key)
    }

    return {
      stepDown,
      stepUp,
      scrollStacks,
      mirror_active,
      formatStatValue,
      firstToUpper,
      mirrorData,
      mirror: store.mirror,
    }
  },
}
</script>
