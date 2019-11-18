<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="admin"
             :rules="rules"
             ref="couponFrom"
             label-width="150px"
             size="small">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="admin.username" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="所属部门：">
        <el-input v-model="admin.deptName" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="admin.email" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="mobile">
        <el-input v-model="admin.mobile" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="角色：">
        <el-checkbox-group v-model="admin.roleIdList">
          <el-checkbox-button v-for="item in dataArr.roles" :label="item.roleId" :key="item.roleId">{{item.roleName}}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="状态：">
        <el-radio-group v-model="admin.status">
          <el-radio-button label="1">正常</el-radio-button>
          <el-radio-button label="0">禁用</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('couponFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('couponFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {allRoles, getInfo, updateAdmin} from '@/api/admin'
  const defaultAdmin = {
    createTime: null,
    username: null,
    userId: null,
    deptId: null,
    deptName: null,
    email: null,
    mobile: null,
    password: null,
    roleIdList: ['5'],
    status: null,
    createUserId: 1
  };
  const defaultData = {
    roles: []
  }
  export default {
    name: 'addAdmin',
    props: {
      isEdit: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        admin: Object.assign({}, defaultAdmin),
        dataArr: Object.assign({}, defaultData),
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入手机', trigger: 'blur'}
          ]
        },
      }
    },
    created () {
      this.getAllRole()
      this.getInfo()
    },
    methods:{
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if(this.isEdit){
                updateAdmin(this.admin).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                })
              }else{
                createCoupon(this.coupon).then(response=>{
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              }
            });
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.admin = Object.assign({},defaultCoupon);
      },
      // 获取角色
      getAllRole () {
        allRoles({date: new Date()}).then(response => {
          this.dataArr.roles = response.list
        }).catch();
      },
      // 获取个人信息
      getInfo () {
        getInfo(this.$route.query.id).then(response => {
          this.admin = response.user
        })
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 60%;
  }
</style>


