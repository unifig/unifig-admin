<template>
  <div>
    <el-dialog :visible="visible" :title="title" :show-close="false" class="reset-dialog" width="900px">
      <el-form :model="info" label-position="right" label-width="120px" class="reset-form" inline>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="username" label="用户名：" class="reset-auto-input">
              <el-input v-model="info.username" disabled class="reset-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="password" label="密码：">
              <el-input
                type="password"
                v-model="info.password"
                :max-length="20"
                class="reset-input"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="deptName" label="归属机构：" class="reset-auto-input">
              <el-input v-model="info.deptName" disabled class="reset-input"></el-input>
              <!-- <div class="reset-auto-input">{{info.deptName}}</div> -->
            </el-form-item>
          </el-col>
          <!--<el-col :span="12">
            <el-form-item prop="accountName" label="账号名称：" class="reset-auto-input">
              <el-input v-model="info.accountName" disabled class="reset-input"></el-input>
              &lt;!&ndash; <div class="reset-auto-input">{{info.accountName}}</div> &ndash;&gt;
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item prop="roleName" label="角色：" class="reset-auto-input">
              <el-input v-model="info.roleName" disabled class="reset-input"></el-input>
              <!-- <div class="reset-auto-input">{{info.roleName}}</div> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="holderName" label="使用人名称：" class="reset-auto-input">
              <el-input v-model="info.holderName" disabled class="reset-input"></el-input>
              <!-- <div class="reset-auto-input">{{info.holderName}}</div> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="mobile" label="手机号：" class="reset-auto-input">
              <el-input v-model="info.mobile" disabled class="reset-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row>
          <el-col :span="12">
            <el-form-item prop="roleName" label="角色：" class="reset-auto-input">
              <el-input v-model="info.roleName" disabled class="reset-input"></el-input>
              &lt;!&ndash; <div class="reset-auto-input">{{info.roleName}}</div> &ndash;&gt;
            </el-form-item>
          </el-col>
        </el-row>-->
      </el-form>
      <div slot="footer" class="dialog-footer center">
        <el-button size="mini" @click="cancle">取消</el-button>
        <el-button size="mini" type="primary" @click="sure">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { updateAccount } from "@/api/dept";
const defaultData = {
  username: null,
  password: null,
  accountName: null,
  holderName: null,
  roleId: null,
  deptName: null,
  deptId: null,
  roleName: null
};
export default {
  data() {
    return {
      type: null,
      title: "新建账号",
      visible: false,
      info: {
        id: null,
        username: null,
        password: null,
        accountName: null,
        holderName: null,
        roleId: null,
        deptName: null,
        deptId: null,
        roleName: null,
        mobile: null
      },
      deptId: [],
      deptArr: [],
      roleArr: []
    };
  },

  methods: {
    resetData() {
      this.info = Object.assign({}, this.defaultData);
      this.visible = false;
    },
    cancle() {
      this.resetData();
    },
    sure() {
      updateAccount(this.info).then(res => {
        this.$message({ type: "success", message: res.msg });
        this.visible = false;
        this.$parent.getData();
      });
    }
  }
};
</script>

