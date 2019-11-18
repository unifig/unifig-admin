<template>
  <div>
    <el-dialog title="标记故障" :visible.sync="visible" :show-close="false" class="reset-dialog">
      <el-form
        ref="break"
        :rules="rules"
        :model="form"
        label-width="90px"
        label-position="right"
        class="reset-form"
        inline
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="故障类型：" prop="type">
              <el-select v-model="form.type" clearable class="reset-input">
                <el-option
                  v-for="(item) in typeArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注：" prop="remark" class="reset-input">
              <el-input v-model="form.remark" class="reset-input"></el-input>
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
import { updateStatus } from "@/api/vehicle";
const defaultData = {
  type: null,
  remark: null
};
export default {
  data() {
    return {
      ids: null,
      visible: false,
      form: Object.assign({}, this.defaultData),
      rules: {
        type: [{ required: true, message: "请选择故障类型" }]
      },

      typeArr: [
        {
          id: 0,
          name: "通信故障"
        },
        {
          id: 1,
          name: "定位故障"
        },
        {
          id: 2,
          name: "ODB模块"
        },
        {
          id: 3,
          name: "其他"
        }
      ]
    };
  },
  methods: {
    sure() {
      this.$refs.break.validate(valid => {
        if (valid) {
          let params = {
            ids: this.ids,
            faultStatus: 0,
            faultType: this.form.type,
            faultRemarks: this.form.remark
          };
          updateStatus(params).then(res => {
            this.$message({ type: "success", message: "标记成功" });
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
      this.form = Object.assign({}, this.defaultData);
      this.visible = false;
    }
  }
};
</script>

