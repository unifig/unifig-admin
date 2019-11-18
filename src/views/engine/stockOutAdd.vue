<template>
  <div class="app-container">
    <div class="content-section" style="height: 0;">
      <div class="title">
        <i class="icon"></i>
        车机管理 - 新增出库
      </div>
      <div style="margin:20px auto;width:1000px;border-right:1px solid #EBEEF5;border-left:1px solid #EBEEF5;margin-top: 0;padding-top: 35px;">
      <el-form class="reset-form xzck" label-width="110px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单批次号：" class="reset-auto-input">
              <el-input class="reset-input" :disabled="true" placeholder="系统自动生成"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出库时间：" class="reset-auto-input">
              <el-date-picker
                class="reset-input"
                disabled
                v-model="outTime"
                type="date"
                placeholder="选择日期"
                @change="changeOutTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
          <el-col :span="12">
            <el-form-item label="收货机构：">
              <el-cascader
                :show-all-levels="false"
                :clearable="true"
                :options="deptArr"
                v-model="inputDeptId"
                filterable
                change-on-select
                @change="changeInDept"
              ></el-cascader>
            </el-form-item>
          </el-col>
            <el-col :span="12">
              <el-form-item label="备注：">
                <el-input class="reset-input" v-model="params.remarks" placeholder="请输入备注"></el-input>
              </el-form-item>
          </el-col>
        </el-row>
      </el-form>
       <div class="content-section" style="border-top:1px solid #eee;padding:20px 0">
      <div class="table-title">出库货物清单</div>
      <el-tabs v-model="activeName"  type="card" @tab-click="handleClick" style="padding:20px 30px">
        <el-tab-pane label="车机明细" name="first">
          <el-table :data="vehicleSelectData" border @selection-change="changeVehicleSelect">
          
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
        <el-tab-pane label="配件明细" name="second">
          <el-table border :data="partData" @selection-change="changePartSelect">
           
            <el-table-column prop="batchNumber" label="批次号" align="center"></el-table-column>
            <el-table-column prop="partName" label="配件名称" align="center"></el-table-column>
            <el-table-column prop="partNumber" label="配件数量" align="center"></el-table-column>
            <el-table-column prop="outNumber" label="出库数量" align="center">
              <template slot-scope="scope">
                <el-input
                  type="number"
                  class="reset-input"
                  :max="scope.row.partNumber*1"
                  :min="0"
                  v-model="scope.row.outNumber"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
     <div class="mt20 pb20 center">
      <el-button size="small" @click="cancle">返回</el-button>
      <el-button type="primary" size="small" @click="sure">出库</el-button>
    </div>

      </div>
    </div>
    <!-- <div class="content-section mt30">
      <div class="table-title">出库货物清单</div>
      <el-tabs v-model="activeName" class="mt30" type="card" @tab-click="handleClick">
        <el-tab-pane label="车机明细" name="first">
          <el-table :data="vehicleSelectData" border @selection-change="changeVehicleSelect">
          
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
        <el-tab-pane label="配件明细" name="second">
          <el-table border :data="partData" @selection-change="changePartSelect">
           
            <el-table-column prop="batchNumber" label="批次号" align="center"></el-table-column>
            <el-table-column prop="partName" label="配件名称" align="center"></el-table-column>
            <el-table-column prop="partNumber" label="配件数量" align="center"></el-table-column>
            <el-table-column prop="outNumber" label="出库数量" align="center">
              <template slot-scope="scope">
                <el-input
                  type="number"
                  class="reset-input"
                  :max="scope.row.partNumber*1"
                  :min="0"
                  v-model="scope.row.outNumber"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div> -->
    <!-- <div class="mt20 pb20 center">
      <el-button size="small" @click="cancle">返回</el-button>
      <el-button type="primary" size="small" @click="sure" style="padding: 8px 27px !important;">出库</el-button>
    </div> -->
    <add-out-dialog ref="add_vehicle" @addVehicleData="addVehicleData"></add-out-dialog>
    <!-- <add-part-dialog ref="add_part" @addPartDada="addPartData"></add-part-dialog> -->
  </div>
</template>
<script>
import {
  getSelectedVehicle,
  getSelectedPart,
  surePutBack
} from "@/api/vehicle";
import AddOutDialog from "./common/addOutDialog";
import AddPartDialog from "./common/addPart";
export default {
  components: { AddOutDialog, AddPartDialog },
  data() {
    return {
      deptArr: [],
      outTime: this.formatDate(new Date(), "yyyy-MM-dd"),
      inTime: this.formatDate(new Date(), "yyyy-MM-dd"),
      inputDeptId: null,
      outDeptId: null,
      remark: null,
      params: {
        outTime: this.formatDate(new Date(), "yyyy-MM-dd"),
        inTime: this.formatDate(new Date(), "yyyy-MM-dd"),
        inputDeptId: null,
        outDeptId: null,
        remarks: null,
        type: 0, //正常调货
        status: 1, // 待收货
        createId: null,
        createName: null,
        partsNumber: null, // 配件数量
        partsIds: [], //配件ids
        vehicleEngineIds: [], // 车机ids
        vehicleEngineNumber: null
      },
      activeName: "first",
      vehicleSelectData: [],
      partData: [],
      vechileIds: [],
      partsIds: []
    };
  },
  created() {
    // 机构选择
    this.$store.dispatch("GetAllDept").then(res => {
      this.deptArr = res;
    });
    // 机车选择
    getSelectedVehicle().then(res => {
      // console.log(res.data, "机车");
      this.vehicleSelectData = res.data;
    });
    // 配件选择
    getSelectedPart().then(res => {
      // console.log(res.data, "配件"); //[{batchNumber,partsList}]
      this.handlePart(res.data);
    });
  },
  methods: {
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
      }
    },

    //精确选择车机器
    selectVehicle(scope, dataList) {
      //   console.log(dataList, "fff");
      let addRef = this.$refs.add_vehicle;
      addRef.dataList = dataList;
      addRef.index = scope.$index;
      addRef.count = dataList.length;
      addRef.visible = true;
    },
    //选择的机车处理
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
    },
    sure() {
      if (!this.inputDeptId) {
        this.$message({ type: "warning", message: "请选择收货机构" });
        return;
      }
      if (this.vehicleSelectData.length == 0 && this.partData.length == 0) {
        this.$message({ type: "warning", message: "没有车机和配件，无法出库" });
        return;
      }
      // 配件处理
      let partSelectIds = [];
      this.partData.forEach(item => {
        let count = item.outNumber;
        let partSelectId = [];
        if (count) {
          partSelectId = item.partsList.slice(0, count).map(item => {
            return item.id;
          });
          partSelectIds.push(...partSelectId);
        }
      });
      this.params.partsIds = partSelectIds;

      // 车机处理
      if (this.vechileIds.length > 0) {
        this.vechileIds.forEach(item => {
          this.params.vehicleEngineIds.push(...item);
        });
      }

      // 是否都是空
      if (this.params.partsIds.length == 0 && this.vechileIds.length == 0) {
        this.$message({ type: "warning", message: "请选择出库的车机和配件" });
        return;
      }

      this.params.vehicleEngineIds = this.params.vehicleEngineIds.join(",");
      this.params.partsIds = this.params.partsIds.join(",");

      // 出库接口
      surePutBack(this.params).then(res => {
        this.$message({ type: "success", message: res.msg });
        this.$router.push({ name: "engine-stock-out" });
      });
    },
    cancle() {
      this.$router.push({ name: "engine-stock-out" });
    },
    changeInTime(time) {
      this.params.inTime = this.formatDate(time, "yyyy-MM-dd");
    },
    changeOutTime(time) {
      this.params.outTime = this.formatDate(time, "yyyy-MM-dd");
    },
    //
    changeInDept(data) {
      this.params.inputDeptId = data[data.length - 1];
    },
    //
    changeOutDept(data) {
      this.params.outDeptId = data[data.length - 1];
    },
    handleClick(tab) {
      //   this.activeName = tab.label;
    },
    changeVehicleSelect() {},
    changePartSelect() {}
  }
};
</script>
<style scoped>
  .app-container >>> .pb20 .el-button{
    font-size: 16px;
    padding: 6px 23px !important;
  }
  .app-container >>> .el-dialog__footer{
    padding-top: 30px;
  }
  .app-container >>> .el-dialog__footer .el-button{
    width: 110px;
    height: 40px;
    border-radius: 12px;
  }
  .app-container >>> .xzck .el-form-item{
    margin-bottom: 28px;
  }
</style>


