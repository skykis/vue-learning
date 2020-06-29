import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

// 2.创建对象
const store = new Vuex.Store({
  state: {
    counter: 1000
  },
  // 不要在mutations中写异步操作
  mutations: {
    plus(state) {
      state.counter++
    },
    minus(state) {
      state.counter--
    },
    plusN(state, n) {
      state.counter += n
    }
  },
  // 用于异步操作
  actions: {
    plusAsync(context) {
      setTimeout(() => {
        context.commit('plus')
      }, 1000)
    },
    minusAsync(context) {
      setTimeout(() => {
        context.commit('minus')
      }, 1000)
    },
    plusNAsync(context, n) {
      setTimeout(() => {
        context.commit('plusN', n)
      }, 1000)
    }
  },
  // 类似计算属性
  getters: {
    showNum: state => {
      return 'now counter:' + state.counter
    }
  },
  modules: {}
})

// 3.导出store
export default store
