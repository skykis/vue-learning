<template>
  <div id="app">
    <router-view
      :currentUri="currentUri"
      :breadcrumb="breadcrumb"
      :menuList="menuList"
      @clearCurrentUri="clearCurrentUri($event)"
      @setTitle="setTitle($event)"
    ></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      currentUri: '',
      breadcrumb: { top: 'Welcome', second: '' },
      menuList: []
    }
  },
  created() {
    this.getMenuList()
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.goBack, false)
    }
  },
  destroyed() {
    window.removeEventListener('popstate', this.goBack, false)
  },
  methods: {
    async getMenuList() {
      const { data: res } = await this.$axios.get('menus')
      if (res.meta.status === 200) {
        this.menuList = res.data
        this.refresh()
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    setTitle(currentPath) {
      if (currentPath === '/home' || currentPath === '/welcome') {
        this.breadcrumb.top = 'Welcome'
        this.breadcrumb.second = ''
        return
      }
      this.menuList.some(menu => {
        const flag = menu.children.some(submenu => {
          if (currentPath.slice(1) === submenu.path) {
            this.breadcrumb.second = submenu.authName
            return true
          }
        })
        if (flag) {
          this.breadcrumb.top = menu.authName
          return true
        }
      })
    },
    goBack() {
      // 该事件仅在浏览器后退按钮被点击时触发
      const currentHash = window.location.hash.slice(1)
      window.sessionStorage.setItem('activePath', currentHash)
      this.currentUri = currentHash
      this.setTitle(currentHash)
      this.$router.push(currentHash).catch(err => {
        err
      })
    },
    refresh() {
      const currentHash = window.location.hash.slice(1)
      this.setTitle(currentHash)
    },
    clearCurrentUri() {
      this.currentUri = ''
    }
  }
}
</script>

<style></style>
