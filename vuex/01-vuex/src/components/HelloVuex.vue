<template>
  <div>
    <h2>count1:{{ count1 }}</h2>
    <h2>count2:{{ count2 }}</h2>
    <h2>count3:{{ count3 }}</h2>
    <h2>{{ showNum }}</h2>
    <button @click="plus">++</button>
    <button @click="minus">--</button>
    <button @click="plusN(3)">+3</button>
    <button @click="plusAsync">Async++</button>
    <button @click="minusAsync">Async--</button>
    <button @click="plusNAsync(3)">Async+3</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'HelloVuex',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      // 箭头函数可使代码更简练
      count1: state => state.counter,
      // 传字符串参数 'counter' 等同于 `state => state.count`
      count2: 'counter',
      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      count3(state) {
        return state.counter
      }
    }),
    ...mapGetters(['showNum'])
  },
  methods: {
    // 第二种调用，可以直接调用函数名或者在其他地方this.函数名
    ...mapMutations(['plus', 'minus', 'plusN']),
    ...mapActions(['plusAsync', 'minusAsync', 'plusNAsync'])
  }
}
</script>

<style></style>
