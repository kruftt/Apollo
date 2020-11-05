<template>
  <div id="header_bar">
    <img id="header_bar__image" src="/assets/gods/Apollo.png" />
    <h2 id="header_bar__title">
      Apollo <span class="alpha">&nbsp;alpha&nbsp;</span>
    </h2>
  </div>
</template>

<style>
.alpha {
  color: #000;
  background-color: #c00;
  font-size: 90%;
  margin-left: 0.3em;
}
#header_bar {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 50em;
  height: 8em;
}

#header_bar__image {
  height: 5em;
}

#header_bar__title {
  /* height: 100%; */
  height: 5em;
  margin: 0;
  color: #DDD;
  line-height: 5em;
}
</style>

<script>
export default {}
</script>
