<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <span class="icon" style="margin-left: 27px;"></span>车机管理-出库管理
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
            <el-form-item label="收货机构：">
              <el-cascader
               :show-all-levels="false"
                class="reset-input"
                :options="deptArr"
                v-model="input_deptId"
                filterable
                change-on-select
                @change="changeDept"
                :clearable="true"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车机号：">
              <el-input v-model="searchObj.vehicleNumber" class="reset-input" placeholder="车机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单状态：">
              <el-select
                v-model="searchObj.status"
                @change="changeOrder"
                clearable
                class="reset-input"
              >
                <el-option
                  v-for="(item,index) in statusArr"
                  :key="index"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="type" label="货单批次号：">
              <el-input v-model="searchObj.batchNumber" class="reset-input" placeholder="货单批次号"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="出库时间：">
              <el-date-picker
                v-model="out_time"
                type="daterange"
                range-separator="至"
                @change="changeOutTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>-->
          <el-col :span="8">
            <el-form-item label="出库开始时间：">
              <el-date-picker
                placeholder="开始时间"
                v-model="startTime"
                type="date"
                @change="changeStartTime"
                class="reset-input"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出库结束时间：">
              <el-date-picker
                placeholder="结束时间"
                v-model="endTime"
                type="date"
                @change="changeEndTime"
                class="reset-input"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="margin-bottom:12px;text-align:right">
            <el-form-item>
              <div class="reset-search-groups">
                <el-button size="mini" @click="resetData">重置</el-button>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="getData">搜索</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="content-section clearfix mt20">
      <div class="table-title" style="padding-left: 25px;">
        <i class="el-icon-tickets"></i>
        出库列表
        <div class="right" style="display:inline-block;margin-right:10px">
          <el-button type="primary" size="mini" @click="add">新增出库</el-button>
        </div>
      </div>
    </div>
    <el-table ref="stockTable" border v-loading="listLoading" :data="dataList">
      <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
      <el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
      <el-table-column prop="batchNumber" label="货单批次号" min-width="170" align="center"></el-table-column>
      <!-- <el-table-column prop="vehicleNumber" label="车机号" min-width="140" align="center"></el-table-column> -->
      <el-table-column prop="outTime" label="出库时间" min-width="120" align="center">
        <template slot-scope="scope">{{scope.row.outTime | formatTime}}</template>
      </el-table-column>
      <el-table-column prop="inputDeptName" label="收货机构" min-width="120" align="center"></el-table-column>
      <el-table-column prop="remarks" label="备注" min-width="180px" align="center"></el-table-column>
      <el-table-column prop="partsNumber" label="配件数量" min-width="100" align="center"></el-table-column>
      <el-table-column prop="vehicleEngineNumber" label="车机数量" min-width="100" align="center"></el-table-column>
      <el-table-column prop="termOfService" label="服务期限" min-width="100" align="center"></el-table-column>
      <el-table-column label="订单状态" width="180" align="center">
        <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
      </el-table-column>
      <el-table-column label="操作" min-width="140" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="goDetail(scope.row.id)">出货单</el-button>
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
import { formatDate } from "@/utils/date";
import { getOutList, getOutDetail } from "@/api/vehicle";
const defaultSearch = {
  batchNumber: null,
  inputDeptId: null,
  inputTimeEnd: null,
  inputTimeStart: null,
  outDeptId: null,
  outTimeEnd: null,
  outTimeStart: null,
  pageNum: 1,
  pageSize: 10,
  remarks: null,
  status: null,
  vehicleNumber: null
};
export default {
  data() {
    return {
      searchObj: Object.assign({}, this.defaultSearch),
      input_deptId: null,
      out_time: null,
      startTime: null,
      endTime: null,
      input_time: null,
      statusArr: [
        {
          id: 0,
          label: "草稿状态"
        },
        {
          id: 1,
          label: "待收货"
        },
        {
          id: 2,
          label: "已收货"
        }
      ],
      typeArr: [
        {
          id: 1,
          label: "类型1"
        }
      ],
      deptArr: [],
      listLoading: false,
      time: null,
      total: null,
      dataList: []
    };
  },
  filters: {
    formatStatus(id) {
      if (id == 0) {
        return "草稿";
      } else if (id == 1) {
        return "待收货状态";
      } else if (id == 2) {
        return "已收货";
      } else {
        return "未知状态";
      }
    },
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
    this.$store.dispatch("GetAllDept").then(res => {
      this.deptArr = res;
    });
  },
  methods: {
    getData() {
      // 1.列表
      getOutList(this.searchObj).then(res => {
        this.dataList = res.data;
        this.total = res.count;
      });
    },
    // 新增出库
    add() {
      this.$router.push({ name: "engine-stock-out-add" });
    },
    // 出库详情
    goDetail(id) {
      this.$router.push({
        name: "engine-stock-out-detail",
        params: { id: id }
      });
    },
    changeOutTime(time) {
      if (time) {
        this.searchObj.outTimeStart = this.formatDate(time[0], "yyyy-MM-dd");
        this.searchObj.outTimeEnd = this.formatDate(time[1], "yyyy-MM-dd");
      } else {
        this.searchObj.outTimeStart = null;
        this.searchObj.outTimeEnd = null;
      }
      this.getData();
    },
    changeStartTime(time) {
      if (time) {
        this.searchObj.outTimeStart = this.formatDate(time, "yyyy-MM-dd");
      } else {
        this.searchObj.outTimeStart = null;
      }
      this.getData();
    },
    changeEndTime(time) {
      if (time) {
        this.searchObj.outTimeEnd = this.formatDate(time, "yyyy-MM-dd");
      } else {
        this.searchObj.outTimeEnd = null;
      }
      this.getData();
    },
    changeInTime(time) {
      if (time) {
        this.searchObj.inputTimeStart = this.formatDate(time[0], "yyyy-MM-dd");
        this.searchObj.inputTimeEnd = this.formatDate(time[1], "yyyy-MM-dd");
      } else {
        this.searchObj.inputTimeStart = null;
        this.searchObj.inputTimeEnd = null;
      }
      this.getData();
    },
    changeDept(id) {
      this.searchObj.inputDeptId = id[id.length - 1];
      this.getData();
    },
    changeOrder(id) {
      this.getData();
    },
    resetData() {
      this.searchObj = Object.assign({}, this.defaultSearch);
      this.input_deptId = null;
      this.out_time = null;
      this.input_time = null;
      this.startTime = null;
      this.endTime = null;
      this.getData();
    },
    handleSelectionChange(ids) {
      //   console.log(ids);
    },
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
<style scoped>

</style>


