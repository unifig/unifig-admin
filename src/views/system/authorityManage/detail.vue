<template>
  <div class="app-container permissions">
    <div class="content-section" style="height: 0;">
      <div class="title">
        <span class="icon"></span>权限管理 - 权限信息
      </div>
      <div class="detail-wrap" style="border-bottom: 0;border-top: 0;">
        <el-form
          class="reset-form"
          ref="dataForm"
          label-position="right"
          label-width="100px"
          :model="dataForm"
          :rules="rules"
          style="padding-top: 50px;"
        >
          <el-form-item label="类型：">
            <el-radio-group v-model="dataForm.type" @change="radioChange">
              <el-radio :label="0" :disabled="fdisabled">目录</el-radio>
              <el-radio :label="1" :disabled="sdisabled">菜单</el-radio>
              <el-radio :label="2" :disabled="tdisabled">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单名称：" prop="name">
            <el-input class="reset-input" v-model="dataForm.name"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单：" v-if="dataForm.type != 0">
            <el-input class="reset-input" v-model="dataForm.parentName" disabled></el-input>
          </el-form-item>
          <el-form-item label="菜单url：" v-if="dataForm.type == 1">
            <el-input class="reset-input" v-model="dataForm.url"></el-input>
          </el-form-item>
          <el-form-item label="授权标识：" prop="perms">
            <el-input class="reset-input" v-model="dataForm.perms"></el-input>
          </el-form-item>
          <el-form-item label="排序：" v-if="dataForm.type != 2">
            <el-input class="reset-input" v-model="dataForm.orderNum"></el-input>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <el-radio v-model="dataForm.status" label="0">有效</el-radio>
            <el-radio v-model="dataForm.status" label="1">无效</el-radio>
          </el-form-item>
          <div class="center mb20">
            <el-button size="small" @click="back">返回</el-button>
            <!--<el-button size="small" @click="resetData">重置</el-button>-->
            <el-button size="small" type="primary" @click="sure" style="padding: 6px 23px !important;">确定</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { addMean, updateMean, getDetail } from "@/api/meanList";

export default {
  data() {
    return {
      id: this.$route.query.id ? this.$route.query.id : null,
      dataForm: {
        type: 0,
        name: "",
        orderNum: "",
        parentName: "目录",
        parentId: 0,
        status: "",
        perms: "",
        url: "",
        menuId: ""
      },
      rules: {
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        perms: [{ required: true, message: "请输入授权标识", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      fdisabled: false,
      sdisabled: false,
      tdisabled: false
    };
  },
  methods: {
    sure() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (this.id) {
            let p = {
              type: this.dataForm.type,
              name: this.dataForm.name,
              orderNum: this.dataForm.orderNum,
              status: this.dataForm.status,
              parentName: this.dataForm.parentName,
              parentId: this.dataForm.parentId,
              perms: this.dataForm.perms,
              url: this.dataForm.url,
              menuId: this.dataForm.menuId
            };
            updateMean(p).then(res => {
              if (res.code == 0) {
                this.$message.success("编辑成功");
                this.$router.push({
                  path: "/system/authorityManage"
                });
              } else {
                this.$message.error("编辑出错");
              }
            });
          } else {
            let p = {
              type: this.dataForm.type,
              name: this.dataForm.name,
              orderNum: this.dataForm.orderNum,
              status: this.dataForm.status,
              parentName: this.dataForm.parentName,
              parentId: this.dataForm.parentId,
              perms: this.dataForm.perms,
              url: this.dataForm.url
            };
            addMean(p).then(res => {
              if (res.success) {
                this.$message.success("新增成功");
                this.$router.push({
                  path: "/system/authorityManage"
                });
              } else {
                this.$message.error("新增出错");
              }
            });
          }
        } else {
          this.$message.error("信息填写不完整");
          return false;
        }
      });
      // this.back()
    },
    back() {
      this.$router.push({ name: "authorityManage" });
    },
    resetData() {
      this.dataForm.name = "";
      this.dataForm.orderNum = "";
      this.dataForm.status = "";
      this.dataForm.perms = "";
      this.dataForm.url = "";
    },
    // 单选框切换
    radioChange(val) {
      // console.log(val);
    },
    // 获取详情
    getDetail() {
      let p = {
        id: this.id
      };
      getDetail(p).then(res => {
        if (res.code == 0) {
          this.dataForm.name = res.menu.name;
          this.dataForm.menuId = res.menu.menuId;
          this.dataForm.status = String(res.menu.status);
          this.dataForm.type = res.menu.type;
          this.dataForm.parentId = res.menu.parentId;
          this.dataForm.parentName = res.menu.parentName;
          this.dataForm.perms = res.menu.perms;
          this.dataForm.url = res.menu.url;
          this.dataForm.orderNum = res.menu.orderNum;
        }
      });
    }
  },
  created() {
    if (this.$route.query.type == "first") {
      this.fdisabled = false;
      this.sdisabled = true;
      this.tdisabled = true;
      this.dataForm.type = 0;
    } else if (this.$route.query.type == "second") {
      this.fdisabled = true;
      this.sdisabled = false;
      this.tdisabled = true;
      this.dataForm.type = 1;
    } else if (this.$route.query.type == "third") {
      this.fdisabled = true;
      this.sdisabled = true;
      this.tdisabled = false;
      this.dataForm.type = 2;
    }
    if (this.$route.query.parentId) {
      this.dataForm.parentId = this.$route.query.parentId;
      this.dataForm.parentName = this.$route.query.parentName;
    }
    if (this.id) {
      this.getDetail();
    }
  }
};
</script>
<style lang="scss">
.permissions {
  .el-input {
    width: 300px !important;
  }
}
.detail-wrap {
  width: 800px;
  margin: 0 auto;
  border: 1px solid #ebeef5;
}
</style>
<style scoped>
  .app-container >>> .el-form-item {
    margin-bottom: 18px;
  }
</style>

