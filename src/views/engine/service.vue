<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <span class="icon" style="margin-left: 27px;"></span>车机管理-售后管理
      </div>
      <el-form
        ref="searchForm"
        class="reset-form clearfix"
        :model="searchObj"
        inline
        size="small"
        label-width="100px"
        label-position="right"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item prop="size" label="客户姓名：">
              <el-input v-model="searchObj.vehicleUserName" class="reset-input" placeholder="客户姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="size" label="联系电话：">
              <el-input v-model="searchObj.vehicleUserPhone" class="reset-input" placeholder="联系电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="size" label="车机号：">
              <el-input v-model="searchObj.vehicleNumber" class="reset-input" placeholder="车机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item prop="num" label="绑定时间：">
              <el-date-picker
                v-model="searchObj.bindingTime"
                type="date"
                @change="changeTime"
                class="reset-input"
                placeholder="请选择"
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
        售后列表
      </div>
    </div>
    <el-table
      ref="stockTable"
      border
      v-loading="listLoading"
      :data="dataList"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
      <el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
      <el-table-column prop="vehicleUserName" label="客户姓名" min-width="120" align="center"></el-table-column>
      <el-table-column prop="vehicleUserPhone" label="联系电话" min-width="140" align="center"></el-table-column>
      <el-table-column prop="vehicleNumber" label="车机号" min-width="140" align="center"></el-table-column>
      <el-table-column
        prop="vehicleStatus"
        label="车机状态"
        min-width="120"
        align="center"
        :formatter="formatStatus"
      ></el-table-column>
      <el-table-column prop="bindingTime" label="绑定时间" min-width="104" align="center">
        <template slot-scope="scope">{{scope.row.bindingTime| formatTime}}</template>
      </el-table-column>
      <el-table-column label="操作" min-width="160" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="goDetail(scope.row,'look','车机详情')">详情</el-button>
          <el-button size="small" type="text" @click="goDetail(scope.row,'cancle','车机解绑')">
            <span class="color-danger">车机解绑</span>
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
    <cancle-bind :info="info" ref="bind" @unBind="cancleBind"></cancle-bind>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import { getServiceList, getServiceInfo, unBind } from "@/api/vehicle.js";
import CancleBind from "./common/bindDialog";
const defaultSearch = {
  vehicleUserName: "",
  vehicleUserPhone: "",
  vehicleNumber: "",
  bindingTime: "",
  pageNum: 1,
  pageSize: 10
};
export default {
  components: { CancleBind },
  data() {
    return {
      searchObj: Object.assign({}, defaultSearch),
      total: 100,
      listLoading: false,
      dataList: [],
      info: {
        vehicleUserName: "",
        vehicleUserPhone: "",
        vehicleUserType: "无",
        deptId: 1,
        deptName: ""
      }
    };
  },
  created() {
    this.getData();
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
  methods: {
    getData() {
      // 1.售后列表
      getServiceList(this.searchObj).then(res => {
        this.dataList = res.data;
        this.total = res.count;
      });
    },
    // 解绑
    cancleBind(id) {
      unBind({ id: id }).then(res => {
        this.$message({ type: "success", message: res.msg });
        this.getData();
      });
    },
    // 详情
    goDetail(row, type, title) {
      let refBind = this.$refs.bind;
      refBind.type = type;
      refBind.form = row;
      refBind.title = title;
      refBind.dialogFormVisible = true;
    },
    resetData() {
      this.searchObj = Object.assign({}, this.defaultSearch);
      this.getData();
    },
    changeTime(time) {
      if (time) {
        this.searchObj.bindingTime = this.formatDate(time, "yyyy-MM-dd");
      } else {
        this.searchObj.bindingTime = null;
      }
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
    },
    // 绑定状态
    formatStatus(row) {
      let num = row.vehicleStatus * 1;
      switch (num) {
        case 0:
          return "库存";
          break;
        case 1:
          return "绑定";
          break;
        case 2:
          return "故障";
          break;
      }
    }
  }
};
</script>

