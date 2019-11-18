<template>
  <div class="reset-dialog">
    <el-dialog title="车机列表" :visible.sync="visible" :showClose="false" align="center" width="960px">
      <div class="cjlb-title" style="font-size:14px;padding-bottom:20px;">
        <span>当前已选择：{{ids.length}}</span>
        <span>实际剩余车机数：{{dataList.length - ids.length}}</span>
        <span>应剩余车机数：{{dataList.length}}</span>
      </div>
      <el-table
        :data="dataList"
        ref="multipleTable"
        border
        max-height="250"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="90" align="center"></el-table-column>
        <el-table-column label="序号" width="100" align="center" type="index"></el-table-column>
        <el-table-column prop="boxNumber" label="箱号" min-width="100" align="center"></el-table-column>
        <el-table-column prop="vehicleNumber" label="车机号" min-width="100" align="center"></el-table-column>
        <el-table-column prop="vehicleSn" label="SN码" min-width="100" align="center"></el-table-column>
        <el-table-column prop="vehicleModel" label="车机型号" min-width="90" align="center"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer center">
        <el-button size="mini" @click="cancle">取消</el-button>
        <el-button size="mini" type="primary" @click="sure">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      dataList: null,
      ids: [],
      index: null,
      count: null
    };
  },

  methods: {
    sure() {
      this.$emit("addVehicleData", {
        index: this.index,
        ids: this.ids,
        count: this.count
      });
      this.resetData();
      // this.$confirm("次操作将添加已经选中的车机，是否继续？", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // }).then(res => {
      //   this.$emit("addVehicleData", {
      //     index: this.index,
      //     ids: this.ids,
      //     count: this.count
      //   });
      //   this.resetData();
      // });
    },
    cancle() {
      this.resetData();
    },
    resetData() {
      this.$refs.multipleTable.clearSelection();
      this.visible = false;
    },
    handleSelectionChange(rows) {
      this.ids = rows.map(item => {
        return item.id;
      });
    }
  }
};
</script>
<style lang="scss">
  .cjlb-title {
    width: 570px;
    span{
      display: inline-block;
      padding-right: 120px;
      &:last-child{
        padding-right: 0;
      }
    }
  }
</style>

