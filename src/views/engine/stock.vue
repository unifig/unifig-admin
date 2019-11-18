<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <span class="icon" style="margin-left: 27px;"></span>车机管理-库存管理
      </div>
      <el-form
        class="reset-form clearfix"
        ref="searchForm"
        :model="searchObj"
        inline
        size="small"
        label-width="110px"
        label-position="right"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item prop="size" label="车机号：">
              <el-input v-model="searchObj.vehicleNumber" class="reset-input" placeholder="车机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="type" label="车机型号：">
              <el-select v-model="searchObj.vehicleModel" class="reset-input">
                <el-option
                  v-for="(item,index) in typeArr"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="box_num" label="箱号：">
              <el-input v-model="searchObj.boxNumber" class="reset-input" placeholder="箱号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="num" label="入库开始时间：">
              <el-date-picker
                class="reset-input"
                v-model="startTime"
                type="date"
                @change="changeStartTime"
                placeholder="开始时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="num" label="入库结束时间：">
              <el-date-picker
                class="reset-input"
                v-model="endTime"
                type="date"
                @change="changeEndTime"
                placeholder="结束时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <div class="reset-search-groups">
              <el-button size="mini" @click="resetData">重置</el-button>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="getData">搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="content-section mt20">
      <div class="table-title" style="padding-left: 25px;">
        <i class="el-icon-tickets"></i>
        库存列表
        <div class="right">
          <el-button type="danger" size="mini" @click="markBreak">批量标记故障</el-button>
          <el-button type="primary" size="mini" @click="cancleBreak">批量取消故障</el-button>
        </div>
      </div>
    </div>
    <el-table
      ref="stockTable"
      border
      v-loading="listLoading"
      :data="dataList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="90" align="center"></el-table-column>
      <el-table-column label="序号" width="100" align="center" type="index"></el-table-column>
      <el-table-column label="车机号" min-width="120" align="center" prop="vehicleNumber"></el-table-column>
      <el-table-column label="SN码" min-width="120" align="center" prop="vehicleSn"></el-table-column>
      <el-table-column label="箱号" width="90" align="center" prop="boxNumber"></el-table-column>
      <el-table-column label="车机型号" min-width="90" align="center" prop="vehicleModel"></el-table-column>
      <el-table-column label="入库时间" min-width="100" align="center" prop="inputTime">
        <template slot-scope="scope">{{scope.row.inputTime | formatTime}}</template>
      </el-table-column>
      <el-table-column
        label="状态"
        min-width="100"
        align="center"
        prop="faultStatus"
        :formatter="formatStatus"
      ></el-table-column>
      <el-table-column label="操作" min-width="140" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text">
            <span
              class="color-danger"
              v-if="scope.row.faultStatus == 0"
              @click="breakCancle(scope.row.id)"
            >取消故障</span>
            <span v-else @click="breakDown(scope.row.id)">标记故障</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="searchObj.pageNum"
        :page-size="searchObj.pageSize"
        :page-sizes="[5,10,15]"
        :total="total"
      ></el-pagination>
    </div>
    <break-dialog ref="break_ref"></break-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import BreakDialog from "./common/breakDialog";
import { getStockList, updateStatus } from "@/api/vehicle";
const defaultData = {
  vehicleNumber: null,
  vehicleModel: null,
  boxNumber: null,
  inputTimeStart: null,
  inputTimeEnd: null,
  pageNum: 1,
  pageSize: 10
};
export default {
  components: { BreakDialog },
  data() {
    return {
      searchObj: Object.assign({}, this.defaultData),
      time: null,
      startTime: null,
      endTime: null,
      selectedIds: null,
      typeArr: [
        {
          id: 1,
          name: "M500"
        }
      ],
      total: null,
      listLoading: false,
      dataList: []
    };
  },
  filters: {
    formatTime(time) {
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      // 1.获取库存列表
      // this.listLoading = true;
      getStockList(this.searchObj).then(res => {
        this.listLoading = false;
        this.dataList = res.data;
        this.total = res.count;
      });
    },
    // 2,1标记故障
    breakDown(id) {
      let ref = this.$refs.break_ref;
      ref.ids = id;
      ref.visible = true;
    },
    // 2.2批量故障
    markBreak() {
      if (this.selectedIds) {
        let ref = this.$refs.break_ref;
        ref.ids = this.selectedIds;
        ref.visible = true;
      } else {
        this.$message({ type: "warning", message: "请选择车机" });
      }
    },
    // 3.1取消故障
    breakCancle(id) {
      this.$confirm("此操作将取消故障,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        let params = {
          ids: id,
          faultStatus: 1,
          faultType: "",
          faultRemarks: ""
        };
        updateStatus(params).then(res => {
          this.$message({
            type: "success",
            message: "取消故障成功!"
          });
          this.getData();
        });
      });
    },
    // 3.2批量取消故障
    cancleBreak() {
      if (this.selectedIds) {
        this.$confirm("此操作将批量取消故障,是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(res => {
          let params = {
            ids: this.selectedIds,
            faultStatus: 1,
            faultType: "",
            faultRemarks: ""
          };
          updateStatus(params).then(res => {
            this.$message({
              type: "success",
              message: "取消故障成功!"
            });
            this.getData();
          });
        });
      } else {
        this.$message({ type: "warning", message: "请选择车机" });
      }
    },
    // changeTime
    changeTime(time) {
      if (time) {
        this.searchObj.inputTimeStart = this.formatDate(time[0], "yyyy-MM-dd");
        this.searchObj.inputTimeEnd = this.formatDate(time[1], "yyyy-MM-dd");
      } else {
        this.searchObj.inputTimeStart = null;
        this.searchObj.inputTimeEnd = null;
      }
      this.getData();
    },
    changeStartTime(time) {
      if (time) {
        this.searchObj.inputTimeStart = this.formatDate(time, "yyyy-MM-dd");
      } else {
        this.searchObj.inputTimeStart = null;
      }
      this.getData();
    },
    changeEndTime(time) {
      if (time) {
        this.searchObj.inputTimeEnd = this.formatDate(time, "yyyy-MM-dd");
      } else {
        this.searchObj.inputTimeEnd = null;
      }
      this.getData();
    },
    // 重置搜索
    resetData() {
      this.time = null;
      this.startTime = null;
      this.endTime = null;
      this.searchObj = Object.assign({}, this.defaultData);
      this.getData();
    },
    // 机车故障状态
    formatStatus(row) {
      let id = row.faultStatus * 1;
      switch (id) {
        case 0:
          return "故障";
          break;
        case 1:
          return "正常";
          break;
        // case 0:
        //     return '库存'
        // break;
        // case 1:
        //     return '绑定'
        // break;
        // case 2:
        //     return '故障'
        // break;
        default:
          return "未知";
      }
    },
    handleSizeChange(num) {
      this.searchObj.pageSize = num;
      this.getData();
    },
    handleCurrentChange(page) {
      this.searchObj.pageNum = page;
      this.getData();
    },
    // 多选
    handleSelectionChange(val) {
      let arr = val.map(item => {
        return item.id;
      });
      this.selectedIds = arr.join(",");
    }
  }
};
</script>




