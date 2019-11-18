<template>
  <div>
    <el-dialog title="新增盘存" :visible.sync="visible" :show-close="false">
      <div style="font-size:12px;padding-bottom:20px;">
        <el-row>
          <el-col :span="6">
            <span>当前已选择：{{selectedIds.length}}</span>
          </el-col>
          <el-col :span="6">
            <span>实际剩余车机数：{{dataList.length - selectedIds.length}}</span>
          </el-col>
          <el-col :span="6">
            <span>应剩余车机数：{{dataList.length}}</span>
          </el-col>
        </el-row>
      </div>
      <el-table
        :data="dataList"
        ref="multipleTable"
        border
        max-height="250"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="90" align="center"></el-table-column>
        <el-table-column label="序号" width="90" align="center" type="index"></el-table-column>
        <el-table-column prop="vehicleNumber" label="车机号" min-width="100" align="center"></el-table-column>
        <el-table-column prop="vehicleSn" label="SN码" min-width="100" align="center"></el-table-column>
        <el-table-column prop="boxNumber" label="箱号" min-width="90" align="center"></el-table-column>
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
      dataList: [],
      selectedIds: [],
      unselectedIds: [],
      allIds: [],
      ids: [],
      deptArr: [],
      inDeptId: null,
      params: {
        inDeptId: null
      },
      form: {
        inDeptId: [],
        deptName: null,
        takeInventoryTime: null
      },
      takeInventoryTime: [],
      inDeptId: null
    };
  },
  created() {
    this.$store.dispatch("GetAllDept").then(res => {
      this.deptArr = res;
    });
  },

  methods: {
    sure() {
      this.allIds = this.dataList.map(item => {
        return item.id;
      });

      this.allIds.forEach(item => {
        if (!this.selectedIds.includes(item)) {
          this.unselectedIds.push(item);
        }
      });
      this.$confirm("该操作将新增选中的盘存，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$emit("add", {
          differenceIds: this.unselectedIds.join(","),
          actualResidualQuantityIds: this.selectedIds.join(",")
        });
        this.cancle();
      });
    },
    cancle() {
      this.cancleSelection();
      this.visible = false;
    },
    cancleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    handleSelectionChange(rows) {
      this.selectedIds = rows.map(item => {
        return item.id;
      });
    }
  }
};
</script>

