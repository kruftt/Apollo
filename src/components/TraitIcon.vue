<template>
  <div class="trait_icon">
    <img v-if="trait.icon" class="trait_icon__image" :src="trait.icon" />
    <img v-if="frame" class="trait_icon__frame" :src="frame" />
  </div>
</template>

<style scoped>
.trait_icon {
  position: relative;
  height: 6.5em;
  width: 6.5em;
}

.trait_icon__image {
  position: absolute;
  left: 0.87em;
  top: 0.82em;
  width: 4.8em;
  height: 4.8em;
}

.trait_icon__frame {
  position: absolute;
  left: 0;
  top: 0;
  height: 6.6em;
}
</style>

<script>
import { computed } from 'vue'

export default {
  props: { trait: Object },
  setup(props) {
    const frame = computed(() => {
      const r = props.trait.rarity
      if (r !== undefined) {
        switch (r) {
          case -3: return 'assets/frames/special_hammer.png'
          case -2: return 'assets/frames/Keepsake_Backing_Edit.png'
          case -1: return 'assets/frames/primary.png'
          case -4:
          case 0: return 'assets/frames/common.png'
          case 1: return 'assets/frames/rare.png'
          case 2: return 'assets/frames/epic.png'
          case 3: return 'assets/frames/heroic.png'
          case 4: return 'assets/frames/legendary.png'
          case 5: return 'assets/frames/duo.png'
          default: return null
        }
      }
    })
    return {
        frame
    }
  }
}
</script>
