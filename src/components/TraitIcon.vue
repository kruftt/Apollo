<template>
  <div class="trait_icon">
    <div class="trait_icon__image_container">
      <img v-if="trait.icon" class="trait_icon__image" :src="trait.icon" />
    </div>
    <img v-if="frame" class="trait_icon__frame" :src="frame" />
  </div>
</template>

<style scoped>
.trait_icon {
  position: relative;
  height: 6.5em;
  width: 6.5em;
}

.trait_icon__image_container {
  position: absolute;
  height: 6.5em;
  width: 6.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.trait_icon__image {
  position: relative;
  width: 4.9em;
  height: 4.9em;
}

.trait_icon__frame {
  position: absolute;
  left: 0.01em;
  top: 0.08em;
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
          case -5: return null
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
