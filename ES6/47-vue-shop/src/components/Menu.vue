<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#333744"
    text-color="#fff"
    active-text-color="#409EFF"
    unique-opened
    :collapse="isCollapse"
    router
    :default-active="activePath"
  >
    <!-- 一级菜单 -->
    <el-submenu
      :index="item.id.toString()"
      v-for="item in menuList"
      :key="item.id"
    >
      <!-- 一级菜单模板区域 -->
      <template slot="title">
        <!-- 一级菜单图标 -->
        <i :class="icons[item.id]"></i>
        <!-- 一级菜单文本 -->
        <span>{{ item.authName }}</span>
      </template>
      <!-- 二级菜单 -->
      <el-menu-item
        :index="'/' + subMenu.path"
        v-for="subMenu in item.children"
        :key="subMenu.id"
        @click="$emit('saveNavStatus', '/' + subMenu.path)"
      >
        <!-- 二级菜单模板区域 -->
        <template slot="title">
          <!-- 二级菜单图标 -->
          <i class="el-icon-menu"></i>
          <!-- 二级菜单文本 -->
          <span>{{ subMenu.authName }}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menuList: Array,
    icons: Object,
    isCollapse: Boolean,
    activePath: String
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  margin-right: 10px;
}

.el-menu {
  border-right: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
