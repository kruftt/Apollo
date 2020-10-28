<template>
  <div class="trait_prereqs">
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
  </div>
</template>

<style>
.trait_prereqs {
  position: absolute;
  width: 12em;
  padding: 1em 0.5em;
  color: #aaa;
  background-color: #080808;
  border: 2px solid #752;
}
.trait_prereqs__section_label {
  font-weight: bold;
  margin: 0 0;
}
.prereq--active {
  text-decoration: line-through;
}
.prereq--inactive {
  color: #888;
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
