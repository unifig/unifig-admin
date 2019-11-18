<template>
  <div class="app-container">
    <div class="content-section" style="height: 0;">
      <div class="title">
        <span class="icon"></span>机构管理-机构信息
      </div>
      <div class="detail-wrap" style="border-bottom: 0;border-top: 0;">
        <el-form class="reset-form" :model="form" label-width="120px" label-position="right" style="padding-top: 50px;">
          <el-row>
            <el-col :span="12">
              <el-form-item prop="userUsername" label="管理员账号：">
                <!-- <el-input v-model="form.userUsername" disabled class="reset-input"></el-input> -->
                <div class="reset-auto-input-auto">{{form.userUsername}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="sjjg" prop="parentName" label="上级机构：">
                <div class="reset-auto-input-auto">{{form.parentName}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="sjjg" prop="name" label="机构名称：">
                <div class="reset-auto-input-auto">{{form.name}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="organizationCode" label="机构代码：">
                <div class="reset-auto-input-auto">{{form.organizationCode}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="type" label="机构类型：">
                <div class="reset-auto-input-auto">{{form.type |formatType}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="address" label="机构详细地址：">
                <div class="reset-auto-input-auto">{{form.address}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="businessLicenseNumber" label="营业执照编号：">
                <div class="reset-auto-input-auto">{{form.businessLicenseNumber}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="contacts" label="机构联系人：">
                <div class="reset-auto-input-auto">{{form.contacts}}</div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item prop="phone" label="机构手机号：">
                <div class="reset-auto-input-auto">{{form.phone}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="zzLogo">
            <el-col :span="12">
              <el-form-item prop="logo" label="机构LOGO：">
                <img
                  style="width:160px;height:160px"
                  :src="`https://api.yirisanxian.com/rb/file/view/${form.logo}`"
                  alt
                >
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="businessLicense" label="营业执照：">
                <img
                  style="width:160px;height:160px"
                  :src="`https://api.yirisanxian.com/rb/file/view/${form.businessLicense}`"
                  alt
                >
              </el-form-item>
            </el-col>
          </el-row>
          <div class="center mb20">
            <el-button @click="goBack" type="primary" size="mini" style="padding: 6px 23px !important;margin-top: 20px;">返回</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getDept // 详情
} from "@/api/vehicle";
export default {
  data() {
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
      fileList: [],
      imageUrl: "",
      deptId: this.$route.params.id,
      dialogVisible: false,
      dialogImageUrl: null,
      form: {
        userUsername: "xia",
        parentName: "上级机构名称",
        name: "xx机构",
        organizationCode: "xxxxx",
        type: 1,
        provinceId: null,
        provinceName: null,
        cityId: null,
        cityName: null,
        areaId: null,
        areaName: null,
        address: null,
        contacts: "",
        phone: null,
        logo: null,
        businessLicense: null,
        businessLicenseNumber: "wwww"
      }
    };
  },
  created() {
    this.getInfo();
  },
  filters: {
    formatType(id) {
      if (id == 0) {
        return "o顶级";
      } else if (id == 1) {
        return "ts下级";
      } else if (id == 2) {
        return "s最下级";
      } else {
        return "未知";
      }
    }
  },
  methods: {
    getInfo() {
      getDept({ id: this.deptId }).then(res => {
        this.form = res.data;
      });
    },
    handleSuccess() {},
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    goBack() {
      this.$router.push({ name: "agency" });
    }
  }
};
</script>
<style scoped>
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
  width: 178px;
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
  position: relative;
}
.app-container >>> .sjjg .reset-auto-input-auto{
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
.app-container >>> .reset-form .el-row{
  margin-bottom: 25px;
}
.app-container >>> .reset-form .el-form-item__content{
  height: 30px;
}
.app-container >>> .reset-form .el-form-item{
  margin-bottom: 0;
}
.app-container >>> .reset-form .zzLogo .el-form-item__content{
  height: auto;
}
</style>


