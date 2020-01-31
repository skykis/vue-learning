<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="12">
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand" />
        <!-- 索引列 -->
        <el-table-column type="index" />
        <el-table-column label="角色名称" prop="roleName" />
        <el-table-column label="角色描述" prop="roleDesc" />
        <el-table-column label="操作" width="300px">
          <template slot-scope="">
            <el-button type="primary" icon="el-icon-edit" size="mini">
              编辑
            </el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">
              删除
            </el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini">
              分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: []
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$axios.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      } else {
        this.rolesList = res.data
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
