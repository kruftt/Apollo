<template>
  <div class="trait_prereqs">
    <template v-if="trait !== null && trait.prereqs !== undefined">
      <template v-for="prereqs, category in trait.prereqs">
        <div class="trait_prereqs__section_label">
          {{ `${ trait.threshold ? trait.threshold : 1 } required:` }}
        </div>
        <div
          v-for="value, name in prereqs"
          :class="['trait_prereqs__prereq', value ? 'prereq--active' : 'prereq--inactive']"
        >
          {{ name }}
        </div>
      </template>
    </template>
    <div v-else>
      No Requirements.
    </div>
  </div>
</template>

<style>
.trait_prereqs {
  padding: 1em 0.5em;
  color: #ccc;
  background-color: #080808;
  border-left: 2px solid #544;
  font-size: 105%
}
.trait_prereqs__section_label {
  font-weight: bold;
  margin: 0 0;
}
.prereq--active {
  text-decoration: line-through;
}
.prereq--inactive {
  color: #999;
}

.trait_prereqs__prereq + .trait_prereqs__section_label {
  margin-top: 1em;
}
</style>

<script>
import { onMounted, reactive, computed, nextTick } from 'vue'
import { useStore } from '../store'
const store = useStore()

export default {
  props: {
    trait: Object
  },
  setup(props) {
    return {

    }
  }
}
</script>
