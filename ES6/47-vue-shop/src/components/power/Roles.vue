<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="addDialogVisible = true">
            添加角色
          </el-button>
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
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeRoleById(scope.row.id)"
            >
              删除
            </el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini">
              分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addDialogVisible"
      width="50%"
      modal
      @close="addDialogClosed"
    >
      <!-- 内容主体 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="90px"
        status-icon
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addrole">
          确 定
        </el-button>
      </span>
    </el-dialog>

    <!-- 修改角色对话框 -->
    <el-dialog
      title="修改角色"
      :visible.sync="editDialogVisible"
      width="50%"
      modal
      @close="editDialogClosed"
    >
      <!-- 内容主体 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="90px"
        status-icon
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [],
      addDialogVisible: false,
      addForm: { roleName: '', roleDesc: '' },
      addFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      editDialogVisible: false,
      // 添加用户的表单
      editForm: {},
      // 添加用户的验证规则
      editFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
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
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击添加用户确定按钮
    addrole() {
      this.$refs.addFormRef.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$axios.post('roles', this.addForm)
          if (res.meta.status !== 201) {
            return this.$message.error('添加角色失败：' + res.meta.msg)
          } else {
            this.addDialogVisible = false
            this.getRolesList()
            this.$message.success('添加角色成功')
          }
        } else {
          return false
        }
      })
    },
    // 根据id删除角色信息
    async removeRoleById(id) {
      // 弹框
      const confirmResult = await this.$confirm(
        '此操作将永久删除该角色, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult === 'confirm') {
        const { data: res } = await this.$axios.delete(`roles/${id}`)
        if (res.meta.status !== 200) {
          return this.$message.error('删除角色失败：' + res.meta.msg)
        } else {
          this.getRolesList()
          this.$message.success('删除角色成功')
        }
      } else {
        this.$message.info('已取消删除')
      }
    },
    // 显示修改角色对话框
    async showEditDialog(id) {
      const { data: res } = await this.$axios.get(`roles/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('查询角色信息失败失败')
      } else {
        this.editForm = res.data
        this.editDialogVisible = true
      }
    },
    // 监听修改角色对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 点击添加角色确定按钮
    editRole() {
      this.$refs.editFormRef.validate(async valid => {
        if (valid) {
          const { data: res } = await this.$axios.put(
            `roles/${this.editForm.roleId}`,
            {
              roleName: this.editForm.roleName,
              roleDesc: this.editForm.roleDesc
            }
          )
          if (res.meta.status !== 200) {
            return this.$message.error('修改角色失败：' + res.meta.msg)
          } else {
            this.editDialogVisible = false
            this.getRolesList()
            this.$message.success('修改角色成功')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
