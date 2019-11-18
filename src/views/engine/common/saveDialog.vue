<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" :show-close="false">
      <div style="font-size:12px;padding-bottom:20px;">
        <span v-if="type == 'actual'">实际剩余车机数({{num}})</span>
        <span v-else>差额明细（{{num}}）</span>
      </div>
      <el-table :data="dataList" ref="multipleTable" border max-height="250">
        <el-table-column property="id" label="序号" width="90" align="center" type="index"></el-table-column>
        <el-table-column property="vehicleNumber" label="车机号" min-width="100" align="center"></el-table-column>
        <el-table-column property="vehicleSn" label="SN码" min-width="100" align="center"></el-table-column>
        <el-table-column property="boxNumber" label="箱号" min-width="90" align="center"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer center">
        <el-button size="mini" @click="cancle">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      title: "",
      type: "actual", // diffence
      num: null,
      dataList: [],
      selectedIds: []
    };
  },

  methods: {
    cancle() {
      this.dataList = [];
      this.title = null;
      this.visible = false;
    }
  }
};
</script>

