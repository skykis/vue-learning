import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  // next()直接放行，next('/login')跳转
  if (to.path === '/login') {
    return next()
  } else {
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (tokenStr) {
      return next()
    } else {
      return next('/login')
    }
  }
})
export default router
