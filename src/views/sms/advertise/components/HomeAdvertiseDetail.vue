<template>
  <div class="content-section" style="margin-top: 70px;border-bottom: 0;">
    <div class="title">
      <span class="icon"></span>营销 - 添加广告
    </div>
    <el-card class="form-container" shadow="never" style="margin-top: 0;padding-top: 70px;border-bottom: 0;border-top: 0;border-radius: 0;">
    <el-form
      :model="homeAdvertise"
      :rules="rules"
      ref="homeAdvertiseFrom"
      label-width="150px"
      size="small"
    >
      <el-form-item label="广告名称：" prop="name">
        <el-input v-model="homeAdvertise.name" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="广告位置：">
        <el-select v-model="homeAdvertise.type">
          <el-option
            v-for="type in typeOptions"
            :key="type.value"
            :label="type.label"
            :value="type.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间：" prop="startTime">
        <el-date-picker type="datetime" placeholder="选择日期" v-model="homeAdvertise.startTime"></el-date-picker>
      </el-form-item>
      <el-form-item label="到期时间：" prop="endTime">
        <el-date-picker type="datetime" placeholder="选择日期" v-model="homeAdvertise.endTime"></el-date-picker>
      </el-form-item>
      <el-form-item label="上线/下线：">
        <el-radio-group v-model="homeAdvertise.status">
          <el-radio :label="0">下线</el-radio>
          <el-radio :label="1">上线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告图片：">
        <single-upload v-model="homeAdvertise.pic"></single-upload>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="homeAdvertise.sort" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="跳转类型" prop="skipType">
          <el-radio-group v-model="homeAdvertise.skipType" @change="changeSkipType()">
            <el-radio-button :label="0">商品</el-radio-button>
            <el-radio-button :label="1">文章</el-radio-button>
            <el-radio-button :label="2">团购</el-radio-button>
            <el-radio-button :label="3">活动</el-radio-button>
            <el-radio-button :label="4">外链</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="homeAdvertise.skipType!=null" label="跳转值" prop="skipValue">
            <el-input v-model="homeAdvertise.skipValue" @blur="blurSkipValue()" class="input-width"></el-input>
        </el-form-item>
      <!-- <el-form-item class="gglj" label="广告链接：" prop="url">
        <el-input v-model="homeAdvertise.url" class="input-width"></el-input>
      </el-form-item> -->
      <el-form-item label="广告备注：">
        <el-input
          class="input-width"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="homeAdvertise.note"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  </div>
</template>
<script>
import SingleUpload from "@/components/Upload/singleUpload";
import {
  createHomeAdvertise,
  getHomeAdvertise,
  updateHomeAdvertise
} from "@/api/homeAdvertise";
const defaultTypeOptions = [
  {
    label: "首页导航",
    value: 0
  },
  {
    label: "APP首页轮播",
    value: 1
  },
  {
    label: "小程序搜索好物轮播",
    value: 2
  },
  {
    label: "小程序首页轮播",
    value: 3
  }
];
const defaultHomeAdvertise = {
  name: null,
  type: 1,
  pic: null,
  startTime: null,
  endTime: null,
  status: 0,
  url: null,
  note: null,
  sort: 0,
  skipType:null,
  skipValue:null
};
export default {
  name: "HomeAdvertiseDetail",
  components: { SingleUpload },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      homeAdvertise: null,
      skipValueObject:{},
      rules: {
        name: [
          { required: true, message: "请输入广告名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur"
          }
        ],
        //url: [{ required: true, message: "请输入广告链接", trigger: "blur" }],
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "请选择到期时间", trigger: "blur" }
        ],
        pic: [{ required: true, message: "请选择广告图片", trigger: "blur" }],
        skipType:[{ required: true, message: "请选择广告的跳转类型", trigger: "blur" }],
        skipValue:[{ required: true, message: "请输入广告的跳转值", trigger: "blur" }],
      },
      typeOptions: Object.assign({}, defaultTypeOptions)
    };
  },
  created() {
    if (this.isEdit) {
      getHomeAdvertise(this.$route.query.id).then(response => {
        this.homeAdvertise = response.data;
        this.skipValueObject[response.data.skipType] = response.data.skipValue;
      });
    } else {
      this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
    }
  },
  methods: {
    changeSkipType(){
      this.homeAdvertise.skipValue = this.skipValueObject[this.homeAdvertise.skipType];
    },
    blurSkipValue(){
      this.skipValueObject[this.homeAdvertise.skipType] = this.homeAdvertise.skipValue;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            if (this.isEdit) {
              updateHomeAdvertise(
                this.$route.query.id,
                this.homeAdvertise
              ).then(response => {
                this.$refs[formName].resetFields();
                this.$message({
                  message: "修改成功",
                  type: "success",
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createHomeAdvertise(this.homeAdvertise).then(response => {
                this.$refs[formName].resetFields();
                this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
                this.$message({
                  message: "提交成功",
                  type: "success",
                  duration: 1000
                });
              });
            }
          });
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
    }
  }
};
</script>
<style scoped>
.input-width {
  width: 70%;
}
.form-container >>> .el-card__body{
  padding-top: 0;
}
.form-container >>> .el-upload--picture .el-button--primary{
  padding: 6px 7px;
}
  .form-container >>> .el-form-item .el-form-item__label{
    line-height: 30px;
  }
  .form-container >>> .el-form-item .el-form-item__content{
    line-height: 30px;
  }
  .form-container >>> .el-form-item .el-form-item__content .el-date-editor.el-input{
    width: 240px;
  }
  .form-container >>> .el-form-item .el-form-item__content .el-input__inner{
    width: 240px;
    height: 30px;
    line-height: 30px;
  }
  .form-container >>> .el-form-item.gglj .el-form-item__content .el-input__inner{
    width: 320px;
  }
</style>


