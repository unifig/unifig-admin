<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <span class="icon"></span>入库管理-退货详情
      </div>
      <el-form inline class="reset-form" v-if="info && info.batchNumber">
        <el-form-item label="订单批次号：">{{info.batchNumber}}</el-form-item>
        <el-form-item label="出库时间：">{{info.outTime|formatTime}}</el-form-item>
        <el-form-item label="收货机构：">{{info.outDeptName}}</el-form-item>
        <el-form-item label="备注：">{{info.remarks}}</el-form-item>
      </el-form>
    </div>
    <div class="content-section mt30">
      <div class="table-title">退货货物清单</div>

      <el-tabs v-model="activeName" class="mt30" type="card" @tab-click="handleClick">
        <el-tab-pane label="选择车机" name="first">
          <el-table :data="vehicleSelectData" border>
            <el-table-column prop="boxNumber" label="箱号" align="center"></el-table-column>
            <el-table-column prop="selectNumber" label="已选数量" align="center"></el-table-column>
            <el-table-column prop="plusNumber" label="剩余数量" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="selectVehicle(scope,scope.row.vehicleEngineList)"
                >精确选择</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="选择配件" name="second">
          <el-table border :data="partData">
            <el-table-column prop="batchNumber" label="批次号" align="center"></el-table-column>
            <el-table-column prop="partName" label="配件名称" align="center"></el-table-column>
            <el-table-column prop="partNumber" label="配件数量" align="center"></el-table-column>
            <el-table-column prop="outNumber" label="出库数量" align="center">
              <template slot-scope="scope">
                <el-input type="number" class="reset-input" v-model="scope.row.outNumber"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="center" style="padding:40px;">
      <el-button size="mini" @click="cancle" style="padding: 8px 27px;">返回</el-button>
      <el-button type="primary" size="mini" @click="sure" style="padding: 8px 15px;">确定退货</el-button>
    </div>
    <add-out-dialog ref="add_vehicle" @addVehicleData="addVehicleData"></add-out-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import {
  getInDetail,
  getSelectedPart,
  getSelectedVehicle,
  surePutBack
} from "@/api/vehicle";
import AddOutDialog from "./common/addOutDialog";
import AddPartDialog from "./common/addPart";
export default {
  components: { AddOutDialog, AddPartDialog },
  data() {
    return {
      id: this.$route.params.id,
      activeName: "first",
      // 车机明细
      vehicleSelectData: [
        {
          boxNumber: null,
          selectNumber: null,
          plusNumber: null
        }
      ],
      // 配件明细
      partData: [
        {
          batchNumber: null,
          partName: null,
          partNumber: null,
          outNumber: null
        }
      ],
      info: null,
      batchNumber: null,
      vechileIds: [],
      partData: [],
      partsIds: [],
      params: {
        type: 2, //退货
        status: 2,
        inputDeptId: null,
        inputDeptName: null,
        partsNumber: null, // 配件数量
        partsIds: [], //配件ids
        vehicleEngineIds: [], // 车机ids
        vehicleEngineNumber: null,
        batchNumber: null
      }
    };
  },
  filters: {
    formatTime(time) {
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
      return;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      // 1.详情
      getInDetail({ id: this.id }).then(res => {
        this.info = res.data;
        this.batchNumber = res.data.batchNumber;
        this.params.batchNumber = res.data.batchNumber;
        this.params.inputDeptId = res.data.outDeptId;
        this.params.inputDeptName = res.data.outDeptName;
        this.$set(
          this.partData,
          this.partData.batchNumber,
          res.data.batchNumber
        );
        // 车机列表
        getSelectedVehicle({ batchNumber: this.batchNumber }).then(res => {
          //   console.log(res.data, "车机列表");
          this.vehicleSelectData = res.data;
        });
        // 配件选择
        getSelectedPart({ batchNumber: this.batchNumber }).then(res => {
          console.log(res.data, "配件列表");
          this.handlePart(res.data);
        });
      });
    },
    //精确选择车机列表
    selectVehicle(scope, dataList) {
      let addRef = this.$refs.add_vehicle;
      addRef.dataList = dataList;
      addRef.index = scope.$index;
      addRef.count = dataList.length;
      addRef.visible = true;
    },

    // 添加车机列表
    addVehicleData(obj) {
      let index = obj.index;
      let selectNum = obj.ids.length;
      let acount = obj.count;
      this.$nextTick(() => {
        this.vehicleSelectData[index].selectNumber = selectNum;
        this.vehicleSelectData[index].plusNumber = acount - selectNum;
      });
      this.$set(
        this.vehicleSelectData[index],
        this.vehicleSelectData[index].selectNumber,
        selectNum
      );
      this.$set(
        this.vehicleSelectData[index],
        this.vehicleSelectData[index].plusNumber,
        acount - selectNum
      );
      this.vechileIds[index] = obj.ids;
      //   console.log(this.vechileIds, "选择的车机");
    },

    // 处理配件列表
    handlePart(data) {
      let resData = data;
      if (resData.length > 0) {
        this.partData = resData.map(item => {
          return {
            batchNumber: item.batchNumber,
            partName: item.partsList[0].name,
            partNumber: item.partsList.length,
            partsList: item.partsList
          };
        });
      } else {
        this.partData = [];
      }
      console.log(this.partData, "配件数据");
    },
    cancle() {
      this.$router.push({ name: "engine-stock-in" });
    },
    handleClick(tab) {
      this.activeName = tab.name;
    },

    sure() {
      if (this.vehicleSelectData.length == 0 && this.partData.length == 0) {
        this.$message({
          type: "warning",
          message: "可退的车机和配件数为空，已全部退货完成"
        });
        return;
      }
      // 配件处理
      if (this.partData.length > 0) {
        let partSelectIds = [];
        this.partData.forEach(item => {
          let count = item.outNumber;
          let partSelectId = item.partsList.slice(0, count).map(item => {
            return item.id;
          });
          partSelectIds.push(...partSelectId);
        });
        this.params.partsIds = partSelectIds;
      } else {
        this.params.partsIds = [];
      }
      //配件ids处理
      if (this.params.partsIds.length > 0) {
        this.params.partsIds = this.params.partsIds.join(",");
      } else {
        this.params.partsIds = null;
      }
      // 车机ids处理
      if (this.vechileIds.length > 0) {
        let selectIds = [];
        this.vechileIds.forEach(item => {
          selectIds.push(...item);
        });
        this.params.vehicleEngineIds = selectIds.join(",");
      } else {
        this.params.vehicleEngineIds = null;
      }
      // 不能为空
      if (!this.params.partsIds && !this.params.vehicleEngineIds) {
        this.$message({ type: "error", message: "请选择车机或配件" });
        this.show = false;
      } else {
        this.show = true;
      }
      // 退货
      if (this.show) {
        this.$confirm("是否要确认退货", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(res => {
          surePutBack(this.params).then(res => {
            this.$message({ type: "success", message: res.msg });
            this.$router.push({ name: "engine-stock-in" });
          });
        });
      }
    }
  }
};
</script>
<style scoped>
  .app-container >>> .el-form-item__label {
    line-height: 30px;
  }
</style>

