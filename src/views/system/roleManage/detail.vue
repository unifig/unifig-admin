<template>
  <div class="app-container">
    <div class="content-section" style="height:0;">
      <div class="title">
        <span class="icon"></span>角色管理 - 角色信息
      </div>
      <div class="detail-wrap" style="border-bottom: 0;border-top: 0;">
        <el-form
          class="reset-form"
          ref="roleForm"
          label-position="right"
          label-width="100px"
          :model="roleForm"
          :rules="rules"
          style="padding-top: 50px;"
        >
          <el-form-item label="角色名称：" prop="roleName">
            <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" class="reset-input"></el-input>
          </el-form-item>
          <!--<el-form-item label="所属机构">-->
          <!--<el-input v-model="roleForm.deptName"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="roleForm.remark" class="reset-input"></el-input>
          </el-form-item>
          <el-form-item label="功能权限：">
            <template slot-scope="scope">
              <el-tree
                ref="tree"
                show-checkbox
                highlight-current
                node-key="id"
                :check-strictly="true"
                :data="dataList"
                :props="defaultProps"
              ></el-tree>
            </template>
          </el-form-item>
          <div class="center mb20">
            <el-button size="small" @click="back">返回</el-button>
            <el-button size="small" type="primary" @click="getCheckedKeys" style="padding: 6px 23px !important;">确定</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getRoleInfo,
  roleDept,
  roleMenuList,
  addRole,
  updateRole
} from "@/api/system";
import { getList } from "@/api/meanList";
const defaultForm = {
  roleName: null,
  deptName: null,
  remarks: null
};
export default {
  data() {
    return {
      id: this.$route.params.id,
      roleForm: {
        roleName: null,
        roleId: null,
        remarks: null,
        deptId: "",
        deptIdList: [],
        deptName: ""
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ]
      },
      dataList: [],
      checkedArr: []
    };
  },
  created() {
    if (this.id) {
      this.getInfo();
    }
    getList({
      date: new Date()
    })
      .then(res => {
        if (res.success) {
          this.dataList = this.toTree(res.data, 0);
        }
      })
      .catch(res => {});
  },
  methods: {
    getCheckedKeys() {
      this.$refs["roleForm"].validate(valid => {
        if (valid) {
          this.checkedArr = this.$refs.tree.getCheckedNodes();
          let ids = [];
          this.checkedArr.forEach(item=>{
            ids.push(item.id);
            ids.push(item.parentId)
          })
          let newIds = new Set(ids)
          if (this.checkedArr.length != 0) {
            let p = {
              roleName: this.roleForm.roleName,
              remark: this.roleForm.remark,
              roleId: this.roleForm.roleId,
              menuIdList: newIds,
              deptId: this.roleForm.deptId,
              deptIdList: this.roleForm.deptIdList,
              deptName: this.roleForm.deptName
            };
            if (this.id) {
              updateRole(p).then(res => {
                if (res.code == 0) {
                  this.$message.success("编辑成功");
                  this.$router.push({
                    path: "/system/roleManage"
                  });
                } else {
                  this.$message.error("编辑角色失败");
                }
              });
            } else {
              addRole(p).then(res => {
                if (res.code == 0) {
                  this.$message.success("新增成功");
                  this.$router.push({
                    path: "/system/roleManage"
                  });
                } else {
                  this.$message.error("新增角色失败");
                }
              });
            }
          } else {
            this.$message.error("请选择权限");
            return false;
          }
        } else {
          this.$message.error("信息填写不完整");
          return false;
        }
      });
    },
    // 详情
    getInfo() {
      getRoleInfo({ id: this.id }).then(res => {
        if (res.code == 0) {
          this.roleForm.roleName = res.role.roleName;
          this.roleForm.roleId = res.role.roleId;
          this.roleForm.remark = res.role.remark;
          this.checkedArr = res.role.menuIdList;
          this.$refs.tree.setCheckedKeys(this.checkedArr,true);
        } else {
          this.$message.error("获取信息失败");
        }
      });
    },
    sure() {
      if (this.id) {
        // 修改
        // updateRole()
      } else {
        // 添加
        // addRole()
      }
      this.back();
    },
    back() {
      this.$router.push({ name: "roleManage" });
    },
    toTree(data, parentId) {
      var tree = [];
      var temp;
      for (var i = 0; i < data.length; i++) {
        if (data[i].parentId == parentId) {
          // let obj = data[i];
          let obj = {
            id: data[i].menuId,
            label: data[i].name,
            parentId:data[i].parentId
          };
          temp = this.toTree(data, data[i].menuId);
          if (temp.length > 0) {
            obj.children = temp;
          }
          tree.push(obj);
        }
      }
      return tree;
    }
  }
};
</script>
<style lang="scss" scoped>
.detail-wrap {
  width: 800px;
  margin: 0 auto;
  border: 1px solid #ebeef5;
}
</style>
<style scoped>
.app-container >>> .el-textarea {
  line-height: 55px;
  height: 55px;
}
.app-container >>> .el-form-item__content{
  line-height: 55px;
}
</style>

