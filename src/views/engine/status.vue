<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <span class="icon" style="margin-left: 27px;"></span>车机管理-状态管理
      </div>
      <el-form
        ref="searchForm"
        :model="searchObj"
        inline
        class="reset-form clearfix"
        size="small"
        label-width="90px"
        label-position="right"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item prop="size" label="车机号：">
              <el-input v-model="searchObj.vehicleNumber" class="reset-input" placeholder="车机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="box_num" label="SN号：">
              <el-input v-model="searchObj.vehicleSn" class="reset-input" placeholder="SN号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="type" label="车机状态：">
              <el-select
                v-model="searchObj.vehicleStatus"
                @change="getData"
                class="reset-input"
                placeholder="请选择"
                clearable
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
          <!-- <el-col :span="3" style="text-align:right">
            <el-form-item>
              <div class="reset-search-groups">
                <el-button size="mini" @click="resetData">重置</el-button>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="getData">搜索</el-button>
              </div>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row>
          <el-col :span="24" style="text-align:right;margin-bottom:14px;">
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
    <div class="content-section mt20">
      <div class="table-title" style="padding-left: 25px;">
        <i class="el-icon-tickets"></i>
        车机列表
      </div>
    </div>
    <el-table
      ref="stockTable"
      border
      v-loading="listLoading"
      :data="dataList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="序号" width="70" align="center" type="index"></el-table-column>
      <el-table-column prop="vehicleNumber" label="车机号" min-width="150" align="center"></el-table-column>
      <el-table-column prop="vehicleSn" label="SN码" min-width="100" align="center"></el-table-column>
      <el-table-column prop="deptName" label="所属机构" min-width="300" align="center"></el-table-column>
      <el-table-column prop="deptId" label="机构ID" min-width="80" align="center"></el-table-column>
      <el-table-column prop="vehicleStatus" label="车机状态" min-width="100" align="center">
        <template slot-scope="scope">{{scope.row.vehicleStatus|formatStatus }}</template>
      </el-table-column>
      <el-table-column
        prop="bindingTime"
        label="绑定时间"
        min-width="140"
        align="center"
        :formatter="formatTime"
      ></el-table-column>
      <el-table-column prop="vehicleUserName" label="用户姓名" min-width="120" align="center"></el-table-column>
      <el-table-column prop="vehicleUserPhone" label="用户电话" min-width="140" align="center"></el-table-column>
      <el-table-column prop="plateNumber" label="车牌号码" min-width="140" align="center"></el-table-column>
      <el-table-column label="操作" min-width="100" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="goDetail(scope.row.id)">
            <span class="color-warning">详情</span>
          </el-button>
          <!-- <el-button size="mini" type="text" @click="bind(scope.row.id)">
            <span class="color-main">绑定</span>
          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="searchObj.page"
        :page-size="searchObj.limit"
        :page-sizes="[5,10,15]"
        :total="total"
      ></el-pagination>
    </div>
    <vehicle-dialog ref="vehicleRef"></vehicle-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import { addBind, getStatusList, getStatusInfo } from "@/api/vehicle";
import VehicleDialog from "./common/vehicleDialog";
const defaultSearch = {
  vehicleNumber: null,
  vehicleSn: null,
  vehicleStatus: null,
  pageSize: 5,
  pageNum: 1
};
export default {
  components: { VehicleDialog },
  data() {
    return {
      searchObj: Object.assign({}, defaultSearch),
      time: null,
      statusArr: [
        {
          id: 0,
          label: "库存"
        },
        {
          id: 1,
          label: "绑定"
        },
        {
          id: 2,
          label: "故障"
        }
      ],
      total: null,
      listLoading: false,
      dataList: []
    };
  },
  filters: {
    formatStatus(status) {
      let id = status * 1;
      switch (id) {
        case 0:
          return "库存";
          break;
        case 1:
          return "绑定";
          break;
        case 2:
          return "故障";
          break;
        default:
          return "未知类型";
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      // 1.列表
      getStatusList(this.searchObj).then(res => {
        this.dataList = res.data;
        this.total = res.count;
      });
    },
    goDetail(id) {
      //  2. 详情
      getStatusInfo({ id: id }).then(res => {
        let resData = res.data;
        let refV = this.$refs.vehicleRef;
        refV.form = resData;
        refV.visible = true;
      });
    },
    bind(id) {
      addBind({ id: id }).then(res => {
        this.getData();
      });
    },
    resetData() {
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
    },
    formatTime(row) {
      let time = row.bindingTime;
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  }
};
</script>
<style scoped>
.app-container >>> .el-dialog__body .el-form-item{
  height: 30px;
}
</style>
