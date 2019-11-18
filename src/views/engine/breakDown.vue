<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <span class="icon" style="margin-left: 27px;"></span>车机管理-故障机管理
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
            <el-form-item prop="type" label="客户姓名：">
              <el-input v-model="searchObj.vehicleUserName" class="reset-input" placeholder="客户姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="num" label="客户电话：">
              <el-input v-model="searchObj.vehicleUserPhone" class="reset-input" placeholder="客户电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="type" label="车机号：">
              <el-input v-model="searchObj.vehicleNumber" class="reset-input" placeholder="车机号"></el-input>
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
        故障机列表
      </div>
    </div>
    <el-table ref="stockTable" border v-loading="listLoading" :data="dataList">
      <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
      <el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
      <el-table-column prop="vehicleNumber" label="车机号" min-width="120" align="center"></el-table-column>
      <el-table-column prop="vehicleSn" label="SN号" min-width="140" align="center"></el-table-column>
      <el-table-column
        prop="faultStatus"
        label="故障原因"
        min-width="120"
        align="center"
        :formatter="formatStatus"
      >
        <!-- 故障类型(0:通信故障1:定位故障2:ODB模块3:其他) -->
      </el-table-column>
      <el-table-column prop="faultRemarks" label="备注" min-width="160" align="center"></el-table-column>
      <el-table-column label="操作" min-width="90" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="reBack(scope.row.id)">
            <span class="color-danger">退货</span>
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
  </div>
</template>
<script>
import { getFaultList, getFaultBack, getFaultBackDept } from "@/api/vehicle";
const defaultSearch = {
  vehicleNumber: null,
  vehicleUserName: "",
  vehicleUserPhone: "",
  inputTimeEnd: null,
  inputTimeStart: null,
  pageSize: 10,
  pageNum: 1
};
export default {
  data() {
    return {
      searchObj: Object.assign(defaultSearch),
      time: null,
      startTime: null,
      endTime: null,
      typeArr: [
        {
          id: 1,
          label: "类型1"
        }
      ],
      total: null,
      listLoading: false,
      dataList: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      // 1.列表
      getFaultList(this.searchObj).then(res => {
        this.dataList = res.data;
      });
    },
    // 2.退货
    reBack(id) {
      let name = null;
      getFaultBackDept({ id: id })
        .then(res => {
          name = res.data;
          this.$confirm(`确认将此车机退回到${name}?`, "退货确认", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(res => {
            getFaultBack({ id: id }).then(res => {
              this.$message({ type: "success", message: res.msg });
              this.getData();
            });
          });
        })
        .catch(err => {});
    },
    // 0:通信故障1:定位故障2:ODB模块3:其他
    formatStatus(row) {
      let id = row.faultType * 1;
      switch (id) {
        case 0:
          return "通信故障";
          break;
        case 1:
          return "定位故障";
          break;
        case 2:
          return "ODB模块";
          break;
        case 3:
          return "其他";
          break;
        default:
          return "无";
      }
    },
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

    resetData() {
      this.time = null;
      this.startTime = null;
      this.endTime = null;
      this.searchObj = Object.assign({}, this.defaultSearch);
      this.getData();
    },
    handleSelectionChange(ids) {},
    handleSizeChange(num) {
      this.searchObj.pageSize = num;
      this.getData();
    },
    handleCurrentChange(page) {
      this.searchObj.pageNum = page;
      this.getData();
    }
  }
};
</script>


