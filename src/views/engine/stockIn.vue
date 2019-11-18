<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <span class="icon" style="margin-left: 27px;"></span>车机管理 - 入库管理
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
            <el-form-item prop="type" label="出库机构：">
              <el-cascader
                class="reset-input"
                :show-all-levels="false"
                :options="deptArr"
                v-model="outDeptId"
                filterable
                change-on-select
                @change="changeOutDept"
                :clearable="true"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单状态：">
              <el-select v-model="searchObj.status" @change="getData" clearable class="reset-input">
                <el-option
                  v-for="(item,index) in statusArr"
                  :key="index"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="货单批次号：">
              <el-input v-model="searchObj.batchNumber" placeholder="批次号" class="reset-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="入库开始时间：">
              <el-date-picker
                placeholder="开始时间"
                class="reset-input"
                v-model="startTime"
                type="date"
                @change="changeStartTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入库结束时间：">
              <el-date-picker
                placeholder="结束时间"
                class="reset-input"
                v-model="endTime"
                type="date"
                @change="changeEndTime"
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
        货单列表
        <div class="right">
          <el-button type="primary" size="mini" @click="addDetail">采购入库</el-button>
        </div>
      </div>
    </div>
    <div class="content-section">
      <el-table ref="stockTable" border v-loading="listLoading" :data="dataList">
        <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
        <el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
        <el-table-column prop="batchNumber" label="货单批次号" min-width="170" align="center"></el-table-column>
        <el-table-column prop="outTime" label="出库时间" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.outTime |formatTime}}</template>
        </el-table-column>
        <el-table-column prop="outDeptName" label="出库机构" min-width="120" align="center"></el-table-column>
        <el-table-column prop="inputTime" label="入库时间" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.inputTime|formatTime}}</template>
        </el-table-column>
        <el-table-column prop="inputDeptName" label="入库机构" min-width="250" align="center"></el-table-column>
        <el-table-column prop="vehicleEngineNumber" label="车机数量" min-width="90" align="center"></el-table-column>
        <el-table-column prop="termOfService" label="服务期限" min-width="120" align="center"></el-table-column>
        <el-table-column prop="partsNumber" label="配件数量" min-width="90" align="center"></el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          min-width="120"
          align="center"
          :formatter="formatStatus"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="订单类别"
          min-width="120"
          align="center"
          :formatter="formatType"
        ></el-table-column>
        <el-table-column label="操作" min-width="160" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="getSure(scope.row.id)"
              v-if="scope.row.status == 1"
            >收货</el-button>
            <el-button
              size="mini"
              type="text"
              @click="goBack(scope.row.id)"
              v-if="scope.row.status == 2 && scope.row.type == 0"
            >退货</el-button>
            <el-button
              size="mini"
              type="text"
              v-if="scope.row.status == 0"
              @click="goUpdate(scope.row.id)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="getDetail(scope.row.id)"
              v-if="scope.row.status == 2"
            >
              <span class="color-warning">查看</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
import {
  getDept,
  getDeptArr,
  getInList,
  getInDetail,
  addPutIn
} from "@/api/vehicle.js";
const defaultSearch = {
  batchNumber: null,
  inputTimeStart: null,
  inputTimeEnd: null,
  outDeptId: null,
  outTimeStart: null,
  outTimeEnd: null,
  status: null,
  pageNum: 1,
  pageSize: 10
};
export default {
  data() {
    return {
      outDeptId: null,
      outTime: null,
      inTime: null,
      startTime: null,
      endTime: null,
      total: null,
      searchObj: Object.assign({}, this.defaultSearch),
      deptArr: [],
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
      dataList: [],
      listLoading: false
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
    this.$store.dispatch("GetAllDept").then(res => {
      this.deptArr = res;
    });
  },
  methods: {
    getData() {
      // 1.列表
      getInList(this.searchObj).then(res => {
        let result = res;
        this.dataList = result.data;
        this.total = result.count;
      });
    },
    // 退货 --> 新增出库
    goBack(id) {
      this.$router.push({ name: "engine-stock-in-back", params: { id: id } });
    },
    // //  编辑 -->新增出库
    goUpdate(id) {
      // engine-stock-in-update
      this.$router.push({ name: "engine-stock-in-update", params: { id: id } });
    },

    // 采购入库
    addDetail() {
      this.$router.push({ name: "engine-stock-in-add" });
    },
    // 收货 -->入库单
    getSure(id) {
      this.$router.push({ name: "engine-stock-in-detail", params: { id: id } });
    },
    // 查看详情
    getDetail(id) {
      this.$router.push({ name: "engine-stock-in-detail", params: { id: id } });
    },
    // changetime
    changeInTime(time) {
      if (time) {
        this.searchObj.inputTimeStart = this.formatDate(time[0], "yyyy-MM-dd");
        this.searchObj.inputTimeEnd = this.formatDate(time[0], "yyyy-MM-dd");
      } else {
        this.searchObj.inputTimeStart = null;
        this.searchObj.inputTimeEnd = null;
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
    changeOutDept(id) {
      this.searchObj.outDeptId = id[id.length - 1];
      this.getData();
    },
    resetData() {
      this.searchObj = Object.assign({}, this.defaultSearch);
      this.inTime = null;
      this.startTime = null;
      this.endTime = null;
      this.outDeptId = [];
      this.getData();
    },

    handleSelectionChange(ids) {
      console.log(ids);
    },
    handleSizeChange(num) {
      this.searchObj.pageSize = num;
      this.getData();
    },
    handleCurrentChange(page) {
      this.searchObj.pageNum = page;
      this.getData();
    },
    formatStatus(row) {
      let id = row.status * 1;
      switch (id) {
        case 0:
          return "草稿状态";
          break;
        case 1:
          return "待收货";
          break;
        case 2:
          return "已收货";
          break;
      }
    },
    formatType(row) {
      let type = row.type * 1;
      switch (type) {
        case 0:
          return "正常调货";
          break;
        case 1:
          return "采购入库";
          break;
        case 2:
          return "退货流转";
          break;
      }
    }
  }
};
</script>
<style scoped>

</style>


