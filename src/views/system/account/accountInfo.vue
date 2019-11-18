<template>
  <div>
    <el-dialog :visible="visible" :title="title" :show-close="false" class="reset-dialog" width="60%">
      <el-form
        ref="account"
        :model="info"
        :rules="rules"
        label-position="right"
        label-width="120px"
        class="reset-form"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item prop="username" label="用户名：">
              <el-input v-model="info.username" class="reset-input" :max-length="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="password" label="密码：">
              <el-input
                class="reset-input"
                type="password"
                v-model="info.password"
                :max-length="20"
                auto-complete="new-password"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="deptName" label="归属机构：">
              <el-cascader
                class="reset-input"
                clearable
                :show-all-levels="false"
                :options="deptArr"
                v-model="name"
                filterable
                change-on-select
                @change="changeDept"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <!--<el-col :span="12">
            <el-form-item prop="accountName" label="账号名称：">
              <el-input v-model="info.accountName" class="reset-input" :max-length="20"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="12">
            <el-form-item prop="roleId" label="角色：">
              <el-select v-model="info.roleId" class="reset-input" clearable>
                <el-option
                  v-for="(item,index) in roleArr"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="holderName" label="使用人名称：">
              <el-input v-model="info.holderName" class="reset-input" :max-length="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="mobile" label="手机号：">
              <el-input v-model="info.mobile" class="reset-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row>
          <el-col :span="12">
            <el-form-item prop="roleId" label="角色：">
              <el-select v-model="info.roleId" class="reset-input" clearable>
                <el-option
                  v-for="(item,index) in roleArr"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
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
import {
  addAccount,
  updateAccount,
  getRole,
  deptArrChildren
} from "@/api/dept";
const defaultData = {
  username: null,
  password: null,
  accountName: null,
  holderName: null,
  roleId: null,
  deptName: null,
  deptId: null
};
export default {
  data() {
    var validateUserName = (rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error("请输入正确的手机号格式"));
      } else {
        callback();
      }
      // if (value == "") {
      //   return callback(new Error("不能为空值"));
      // } else if (!/^1[34578]\d{9}$/.test(value)) {
      //   return callback(new Error("请输入正确的手机号格式"));
      // } else {
      //   callback();
      // }
    };
    return {
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
        mobile: null
      },
      rules: {
        username: [
          {
            required: true
          },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符" }
        ],
        password: [
          {
            required: true,
            message: "请填写密码"
          }
        ],
        deptName: [
          {
            required: true,
            message: "请选择归属机构"
          }
        ],
        accountName: [
          {
            required: true,
            message: "请填写账号名称"
          }
        ],

        holderName: [
          {
            required: true,
            message: "请填写使用人名称"
          }
        ],
        mobile: [
          {
            // required: true,
            validator: validateUserName
          }
        ],
        roleId: [
          {
            required: true,
            message: "请选择角色"
          }
        ]
      },
      deptId: [],
      name: [],
      deptArr: [],
      roleArr: []
    };
  },
  created() {
    deptArrChildren({ resultType: 1 }).then(res => {
      function deepMap(data) {
        for (let i = 0, j = data.length; i < j; i++) {
          data[i].label = data[i].name;
          data[i].value = data[i].deptId;
          if (data[i].children) {
            deepMap(data[i].children);
          }
        }
        return data;
      }
      this.deptArr = deepMap(res.data.options);
      //   console.log(this.deptArr, "归属机构");
    });

    getRole().then(res => {
      //   console.log(res.data, "rolelist");
      this.roleArr = res.data.map(item => {
        return {
          id: item.roleId,
          name: item.roleName
        };
      });
    });
  },
  methods: {
    changeDept(id) {
      if (id.length > 0) {
        this.info.deptId = id[id.length - 1];
        console.log(this.info.deptId, "dddd");
        let name = null;
        let deptObj = this.deptArr.slice(0);
        let menuArr = [];
        spread(deptObj);
        function spread(menus) {
          for (var i = 0; i < menus.length; i++) {
            var menu = menus[i];
            if (menu.children) {
              spread(menu.children);
            }
            menuArr.push(menu);
          }
        }
        menuArr.forEach(item => {
          if (item.deptId == this.info.deptId) {
            this.info.deptName = item.name;
          }
        });
        // console.log(menuArr, "object", this.info.deptName);
      } else {
        this.$nextTick(() => {
          this.info.deptName = null;
          this.info.deptId = null;
        });
      }
    },

    sure() {
      this.$refs.account.validate(valid => {
        if (valid) {
          //创建账号
          addAccount(this.info).then(res => {
            this.$message({ type: "success", message: res.msg });
            this.resetData();
            this.$parent.getData();
          });
        }
      });
    },
    cancle() {
      this.resetData();
    },
    resetData() {
      this.$refs.account.resetFields();
      this.info = Object.assign({}, this.defaultData);
      this.deptId = [];
      this.visible = false;
    }
  }
};
</script>

