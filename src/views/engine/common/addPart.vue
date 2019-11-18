<template>
  <div>
    <el-dialog title="配件明细" :visible.sync="visible" :show-close="false" class="reset-dialog">
      <el-form
        ref="part"
        :model="partData"
        :rules="rules"
        label-width="100px"
        label-position="right"
        class="reset-form"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品类型：" class="reset-auto-input">
              <el-input v-model="itemName" disabled class="reset-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="配件名称：" prop="name">
              <el-input v-model="partData.name" class="reset-input" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="数量：" prop="number">
              <el-input type="number" v-model="partData.number" :min="0" class="reset-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注：">
              <el-input v-model="partData.remarks" class="reset-input"></el-input>
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
const defaultData = {
  name: null,
  number: null,
  remarks: null
};
export default {
  data() {
    return {
      visible: false,
      itemName: "配件",
      partData: Object.assign({}, this.defaultData),
      rules: {
        name: [
          {
            required: true,
            message: "请填写配件名称"
          }
        ],
        number: [
          {
            required: true,
            message: "请填写配件数量"
          }
        ]
      }
    };
  },
  methods: {
    sure() {
      this.$nextTick(() => {
        this.$refs.part.validate(valid => {
          if (valid) {
            this.$emit("addPartData", this.partData);
            this.resetData();
          }
        });
      });
    },
    cancle() {
      this.$refs.part.clearValidate();
      this.visible = false;
    },
    resetData() {
      this.visible = false;
      this.partData = Object.assign({}, this.defaultData);
    }
  }
};
</script>

