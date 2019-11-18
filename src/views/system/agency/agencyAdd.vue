<template>
  <div class="app-container">
    <div class="content-section" style="border-bottom: 0;height: 0;">
      <div class="title">
        <span class="icon"></span>机构管理 - 新增下级机构
      </div>
      <div class="detail-wrap" style="border-bottom: 0;border-top: 0;">
        <el-form
          ref="deptRef"
          class="reset-form add-next"
          :model="form"
          label-width="120px"
          label-position="right"
          :rules="rules"
          style="padding-top: 50px;"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item prop="userUsername" label="管理员账号：">
                <el-input
                  class="reset-input"
                  v-model="form.userUsername"
                  placeholder="请输入管理员账号"
                  :max-length="20"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="defaultPassword" label="默认密码：">
                <el-input class="reset-input" v-model="form.defaultPassword" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="parentId" label="上级机构：">
                <el-cascader
                  clearable
                  :show-all-levels="false"
                  class="reset-input"
                  :options="deptArr"
                  v-model="parentName"
                  filterable
                  change-on-select
                  @change="changeInDept"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="name" label="机构名称：">
                <el-input class="reset-input" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="type" label="机构类型：">
                <el-select class="reset-input" v-model="form.type">
                  <el-option
                    v-for="(item,index) in typeArr"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="organizationCode" label="机构代码：">
                <el-input class="reset-input" v-model="form.organizationCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="contacts" label="机构联系人：">
                <el-input class="reset-input" v-model="form.contacts"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="phone" label="手机号：">
                <el-input class="reset-input" v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="businessLicenseNumber" label="营业执照编号：">
                <el-input class="reset-input" v-model="form.businessLicenseNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="logo" label="机构LOGO：">
                <el-upload
                  class="avatar-uploader"
                  :action="global.newFileUploadApi"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="form.logo" :src="logo" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="businessLicense" label="营业执照：">
                <el-upload
                  class="avatar-uploader"
                  :action="global.newFileUploadApi"
                  :show-file-list="false"
                  :on-success="handleBusinessLicense"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="form.businessLicense" :src="businessLicense" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item class="address" prop="address" label="机构详细地址：">
                <el-input class="reset-input" type="textarea" v-model="form.address" :maxlength="30"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item class="synopsis" prop="synopsis" label="机构简介：">
                <el-input class="reset-input" type="textarea" v-model="form.synopsis"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="center mt20 mb20" style="margin-bottom: 0;padding-bottom: 20px;">
            <el-button @click="goBack" size="mini">返回</el-button>
            <el-button type="primary" @click="add" size="mini">保存</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { createDept } from "@/api/vehicle";
export default {
  data() {
    const validateUserName = (rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error("请输入正确的手机号格式"));
      } else {
        callback();
      }
      //  if (value == "") {
      //   return callback(new Error("不能为空"));
      // } else if (!/^1[34578]\d{9}$/.test(value)) {
      //   return callback(new Error("请输入正确的手机号格式"));
      // } else {
      //   callback();
      // }
    };
    return {
      typeArr: [
        {
          id: 0,
          name: "o顶级"
        },
        {
          id: 1,
          name: "ts下级"
        },
        {
          id: 2,
          name: "s最下级"
        }
      ],
      deptArr: [],
      fileList: [],
      imageUrl: "",
      deptId: this.$route.params.id,
      parentId: [],
      parentName: null,
      logo: null,
      businessLicense: null,
      form: {
        userUsername: "",
        defaultPassword: 888888,
        parentId: null,
        name: "",
        type: null,
        organizationCode: "",
        address: null,
        // provinceId: null,
        // provinceName: null,
        // cityId: null,
        // cityName: null,
        // areaId: null,
        // areaName: null,
        address: null,
        contacts: null,
        phone: null,
        logo: null,
        businessLicense: null,
        businessLicenseNumber: null
      },
      rules: {
        userUsername: [{required:true,message:"请输入管理员账号"}],
        parentId: [
          {
            required: true,
            message: "请选择上级机构"
          }
        ],
        name: [
          {
            required: true,
            message: "请填写机构名称"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择机构类型"
          }
        ],
        organizationCode: [
          {
            required: true,
            message: "请填写机构代码"
          }
        ],
        address: [
          {
            required: true,
            message: "请填写机构地址"
          }
        ],
        contacts: [
          {
            required: true,
            message: "请填写机构联系人"
          }
        ],
        phone: [
          {
            // required: true,
            validator: validateUserName
          }
        ],
        logo: [
          {
            required: true,
            message: "请上传机构logo"
          }
        ]
      }
    };
  },
  created() {
    this.$store.dispatch("GetAllDept").then(res => {
      this.deptArr = res;
    });
  },
  methods: {
    changeInDept(val) {
      this.form.parentId = val[val.length - 1];
      let id = val[val.length - 1];
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
        if (item.deptId == id) {
          name = item.name;
        }
      });
    },

    handleAvatarSuccess(res) {
      this.logo = "https://api.yirisanxian.com/rb/file/view/" + res;
      this.form.logo = res;
    },
    handleBusinessLicense(res) {
      this.businessLicense =
        "https://api.yirisanxian.com/rb/file/view/" + res;
      this.form.businessLicense = res;
    },
    beforeAvatarUpload() {},
    handleSuccess() {},
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogVisible = true;
    },
    goBack() {
      this.$router.push({ name: "agency" });
    },
    add() {
      this.$refs.deptRef.validate(valid => {
        if (valid) {
          let resData = Object.assign({}, this.form);
          resData.status = 1;
          createDept(resData)
          .then(res => {
            if(res){
              this.$router.push({ name: "agency" });
            }
          })
        }
      });
    }
  }
};
</script>
<style>
/* .reset-form{
    width:600px;
    margin:0 auto
} */
.input-reset {
  width: 300px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 237px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.detail-wrap {
  width: 1000px;
  margin: 0 auto;
  border: 1px solid #ebeef5;
}
</style>
<style scoped>
  .app-container >>> .el-form--label-right .el-form-item{
    margin-bottom: 18px;
  }
  .app-container >>> .address .el-form-item__content{
    line-height: 55px !important;
  }
  .app-container >>> .address .reset-input{
    width: 705px;
    max-width: 705px;
    height: auto !important;
    line-height: 55px !important;
  }
  .app-container >>> .address .el-form-item__content{
    width: auto;
  }
  .app-container >>> .synopsis .el-form-item__content{
    line-height: 55px !important;
  }
  .app-container >>> .synopsis .el-form-item__content{
    width: auto;
  }
  .app-container >>> .synopsis .reset-input{
    height: auto !important;
    line-height: 55px !important;
    width: 705px;
    max-width: 705px;
  }
  .app-container >>> .mt20 .el-button{
    padding: 6px 23px !important;
    margin-top: 40px;
  }
</style>


