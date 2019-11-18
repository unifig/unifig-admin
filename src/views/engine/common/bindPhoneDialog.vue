<template>
  <div>
    <el-dialog class="reset-dialog xgsjh" title="修改手机号" :visible.sync="visible" :show-close="false" width="800px">
      <el-form
        style="margin-top:34px"
        class="reset-dialog"
        ref="phoneRef"
        :model="form"
        :rules="rules"
        label-width="110px"
        label-position="right"
        inline
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="当前手机号：" class="reset-auto-input">
              <!-- <div class="reset-auto-input">{{form.phone}}</div> -->
              <el-input v-model="form.phone" disabled class="reset-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="新手机号：" prop="vehicleUserPhone">
              <el-input v-model.trim="form.vehicleUserPhone" class="reset-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer center">
        <el-button size="mini" @click="cancle">取消</el-button>
        <el-button size="mini" type="primary" @click="sure">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { bindUpdatePhone } from "@/api/vehicle";
const defaultData = {
  id: null,
  phone: null,
  vehicleUserPhone: null
};
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入新的手机号"));
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      form: Object.assign({}, this.defaultData),
      rules: {
        vehicleUserPhone: [{ required: true, validator: validatePhone }]
      }
    };
  },
  methods: {
    sure() {
      this.$refs.phoneRef.validate(valid => {
        if (valid) {
          let params = { ...this.form };
          delete params.phone;
          bindUpdatePhone(params).then(res => {
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
      this.$refs.phoneRef.resetFields();
      this.form = Object.assign({}, this.defaultData);
      this.visible = false;
    }
  }
};
</script>
<style scoped>
  .xgsjh >>> .el-dialog__body{
    padding-top: 0 !important;
  }
</style>

