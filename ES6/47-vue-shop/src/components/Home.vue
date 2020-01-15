<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" />
        <span>电商后台管理系统</span>
      </div>
      <el-button @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto">
        <div class="toggle-button" @click="toggleCollapse">
          |||
        </div>
        <!-- 侧边栏菜单 -->
        <menu-item
          :menuList="menuList"
          :icons="iconsObj"
          :isCollapse="isCollapse"
          :activePath="activePath"
          @saveNavStatus="saveNavStatus($event)"
        />
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuItem from './Menu'

export default {
  components: {
    MenuItem
  },
  props: {
    currentUri: String
  },
  data() {
    return {
      menuList: [],
      // 可以做成后台接口获取
      iconsObj: {
        '125': 'el-icon-user-solid',
        '103': 'el-icon-mouse',
        '101': 'el-icon-s-goods',
        '102': 'el-icon-s-order',
        '145': 'el-icon-s-data'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  watch: {
    currentUri: function() {
      if (this.currentUri !== '') {
        this.activePath = this.currentUri
      }
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$axios.get('menus')
      if (res.meta.status === 200) {
        this.menuList = res.data
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    // 菜单折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavStatus(path) {
      window.sessionStorage.setItem('activePath', path)
      this.activePath = path
      this.$emit('clearCurrentUri')
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 1%;
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
