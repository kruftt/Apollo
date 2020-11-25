<template>
  <div id="header_bar">
    <img id="header_bar__image" src="/assets/gods/Apollo.png" />
    <div id="header_bar__title" class="noselect">
      <h2 id="header_bar__name">Apollo <span class="alpha">&nbsp;alpha&nbsp;</h2>
      <div id="apollo_live" @click="store.toggle_connection">
        <div id="apollo_live__dot" :class="'apollo_live__dot--' + store.connection_status" />
        <div id="apollo_live__label">&nbsp;Live</div>
        <div id="apollo_live__status" :class="(store.connection_status === 'connected' ? 'status--connected' : '')">&nbsp;{{ store.connection_status }}</div>
      </div>
    </div>
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

#header_bar__name {
  margin: 0;
}

#header_bar__image {
  height: 5em;
}

#header_bar__title {
  margin: 0.12em 0 0 0;
  color: #DDD;
  /* line-height: 5em; */
  display: flex;
  flex-flow: column nowrap;
}

#apollo_live {
  margin-top: 0.2em;
  display: flex;
  flex-flow: row nowrap;
  font-weight: bold;
  color: #777;
}
#apollo_live:hover {
  color: #888;
  transform: scale(1.02);
  transform-origin: left center;
}

#apollo_live__dot {
  width: 1.0em;
  height: 1.0em;
  border-radius: 50%;
  box-shadow: 0 0 0.25em 0.1em #111 inset, -0.1em 0.1em 0.1em 0.05em #111;
  transition: background-color 0.14s;
  filter: saturate(70%)
}
.apollo_live__dot--scanning { background-color: yellow; }
.apollo_live__dot--connected { background-color: rgb(49, 179, 49); }
.apollo_live__dot--disconnecting { background-color: rgb(255, 115, 0); }
.apollo_live__dot--disconnected { background-color: red; }
/* #apollo_live__label { color: #888; } */
#apollo_live__status { font-size: 95%; font-weight: normal; }
.status--connected { color: #aaa; }
</style>

<script>
import useStore from '../store'
const store = useStore()

export default {
  setup() {
    return {
      store,
    }
  }
}
</script>
