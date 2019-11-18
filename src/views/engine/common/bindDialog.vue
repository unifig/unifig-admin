<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      class="reset-dialog"
    >
      <el-form :model="form" label-width="100px" label-position="right" class="reset-form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户姓名：" class="reset-auto-input">
              <el-input v-model="form.vehicleUserName" disabled class="reset-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话：" class="reset-auto-input">
              <el-input v-model="form.vehicleUserPhone" disabled class="reset-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构名称：" class="reset-auto-input">
              <el-input v-model="form.deptName" disabled class="reset-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构代码：" class="reset-auto-input">
              <el-input v-model="form.deptId" disabled class="reset-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户类型：" class="reset-auto-input">
              <el-input v-model="form.vehicleUserType" disabled class="reset-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-tip" v-if="type == 'cancle'">解绑后，车机与用户绑定状态将会取消，解绑后的车机将重新进入库存管理</div>
      <div slot="footer" class="dialog-footer center" v-if="type == 'cancle'">
        <el-button size="mini" @click="dialogFormVisible = false">关闭</el-button>
        <el-button size="mini" type="primary" @click="sure">确 定</el-button>
      </div>
      <div slot="footer" class="dialog-footer center" v-else>
        <el-button size="mini" type="primary" @click="sure" style="display:none">确 定</el-button>
        <el-button size="mini" @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["info"],
  data() {
    return {
      form: Object.assign(this.info),
      dialogFormVisible: false,
      type: "cancle",
      title: null
    };
  },
  methods: {
    sure() {
      this.$confirm(
        "解绑后，车机与用户绑定状态将会取消，解绑后的车机将重新进入库存管理，是否确认解绑？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(res => {
        this.$emit("unBind", this.form.id);
        this.dialogFormVisible = false;
      });
    }
  }
};
</script>

