<template>
  <div>
    <el-dialog :visible="visible" title="重置密码" :showClose="false" class="reset-dialog">
      <el-form :model="formData" label-width="150px" label-position="right" class="reset-form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="管理员账号 ：" class="reset-auto-input">
              <el-input v-model="formData.userUsername" disabled class="reset-input"></el-input>
              <!-- <div class="reset-auto-input">{{formData.userUsername}}</div> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构名称 ：" class="reset-auto-input">
              <el-input v-model="formData.name" disabled class="reset-input"></el-input>
              <!-- <div class="reset-auto-input">{{formData.name}}</div> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="设置新密码 ：">
              <el-input
                type="password"
                class="reset-input"
                v-model="password"
                :show-password="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="再次输入新密码 ：">
              <el-input type="password" v-model="resetPass" class="reset-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer center">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" @click="sure">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { resetDeptPass } from "@/api/vehicle";
const defaultData = {
  account: null,
  deptName: null,
  password: null,
  code: null
};
export default {
  data() {
    return {
      password: null,
      resetPass: null,
      formData: {},
      surePass: null,
      visible: false
    };
  },
  methods: {
    sure() {
      let params = {
        id: this.formData.deptId,
        password: this.password
      };
      resetDeptPass(params).then(res => {
        this.$message({ type: "success", message: res.msg });
        this.cancle();
        this.$parent.getData();
      });
    },
    cancle() {
      this.resetData();
    },
    postCode() {},
    resetData() {
      this.formData = Object.assign({}, this.defaultData);
      this.resetPass = null;
      this.password = null;
      this.visible = false;
    }
  }
};
</script>
<style scoped>
  .reset-dialog >>> .el-dialog__footer{
    padding-top: 20px;
  }
  .reset-dialog >>> .el-dialog__body{
    padding-left: 0;
    padding-right: 0;
  }
  .reset-dialog >>> .el-dialog__body .reset-form{
    padding-left: 0;
    padding-right: 0;
  }
</style>

