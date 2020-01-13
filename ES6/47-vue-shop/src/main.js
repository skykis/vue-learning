import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './plugins/element'
// 导入全局样式表
import './assets/css/global.css'
import axios from './router/axios'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
