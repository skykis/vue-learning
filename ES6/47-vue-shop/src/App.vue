<template>
  <div id="app">
    <router-view
      :currentUri="currentUri"
      @clearCurrentUri="clearCurrentUri($event)"
    ></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      currentUri: ''
    }
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
    goBack() {
      // 该事件仅在浏览器后退按钮被点击时触发
      console.log(window.location.hash)
      const currentHash = window.location.hash.slice(1)
      window.sessionStorage.setItem('activePath', currentHash)
      this.currentUri = currentHash
      console.log('uri:' + this.uri)
      this.$router.push(currentHash).catch(err => {
        err
      })
    },
    clearCurrentUri() {
      this.currentUri = ''
    }
  }
}
</script>

<style></style>
