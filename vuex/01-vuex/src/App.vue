<template>
  <div id="app">
    <h2>--------app内容--------</h2>
    <h2>{{ $store.state.counter }}</h2>
    <button @click="$store.state.counter++">++</button>
    <button @click="$store.state.counter--">--</button>
    <h2>--------hello vuex内容--------</h2>
    <hello-vuex></hello-vuex>
  </div>
</template>

<script>
import HelloVuex from './components/HelloVuex'

export default {
  name: 'App',
  components: { HelloVuex },
  data() {
    return {
      message: 'app组件'
    }
  }
}
</script>

<style></style>
