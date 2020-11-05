<template>
  <div class="description_data">
    <template v-for="description in descriptions">
      <div v-html="description"></div>
    </template>
  </div>
</template>

<style>
.description_data {

}
</style>

<script>
export default {
  props: {
    descriptions: Array
  }
}
</script>
