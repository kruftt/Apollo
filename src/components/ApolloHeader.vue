<template>
  <div id="header_bar">
    <img id="header_bar__image" src="assets/gods/Apollo.png" />
    <h2 id="header_bar__title">
      Apollo (alpha v0.1)
    </h2>
  </div>
</template>

<style>
#header_bar {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  width: 100%;
  min-width: 50em;
  height: 8em;
}

#header_bar__image {
  height: 8em;

}

#header_bar__title {
  height: 100%;
  margin: 0;
  color: #DDD;
  line-height: 5em;
}
</style>

<script>
export default {}
</script>
