<template>
  <div id="app">
    <h2>--------app内容--------</h2>
    <h2>{{ $store.state.counter }}</h2>
    <h2>{{ $store.getters.showNum }}</h2>
    <button @click="$store.state.counter++">++</button>
    <button @click="$store.state.counter--">--</button>
    <button @click="handle1">++</button>
    <button @click="handle2">--</button>
    <button @click="handle3(3)">+3</button>
    <button @click="handleAsync1">Async++</button>
    <button @click="handleAsync2">Async--</button>
    <button @click="handleAsync3(3)">Async+3</button>
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
  },
  methods: {
    // 第一种mutations调用
    handle1() {
      this.$store.commit('plus')
    },
    handle2() {
      this.$store.commit('minus')
    },
    handle3(n) {
      this.$store.commit('plusN', n)
    },
    // 第一种Actions调用
    handleAsync1() {
      this.$store.dispatch('plusAsync')
    },
    handleAsync2() {
      this.$store.dispatch('minusAsync')
    },
    handleAsync3(n) {
      this.$store.dispatch('plusNAsync', n)
    }
  }
}
</script>

<style></style>
