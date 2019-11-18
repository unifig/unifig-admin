<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <span class="icon" style="margin-left: 27px;"></span>车机管理-绑定管理
      </div>
      <el-form
        ref="searchForm"
        :model="searchObj"
        inline
        class="reset-form clearfix"
        size="small"
        label-width="110px"
        label-position="right"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="归属机构：">
              <el-cascader
                clearable
                :options="deptArr"
                v-model="deptId"
                @change="changeDept"
                class="reset-input"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号：">
              <el-input
                v-model="searchObj.vehicleUserPhone"
                class="reset-input"
                placeholder="手机号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="昵称：">
              <el-input v-model="searchObj.nickname" class="reset-input" placeholder="昵称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="最后绑定时间：">
              <el-date-picker
                v-model="searchObj.bindingTime"
                type="date"
                @change="changeBindTime"
                class="reset-input"
                placeholder="请选择"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车架号：">
              <el-input v-model="searchObj.frameNumber" class="reset-input" placeholder="车架号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车机号：">
              <el-input v-model="searchObj.vehicleNumber" class="reset-input" placeholder="车机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="最后连接时间：" class="reset-input">
              <el-date-picker
                class="reset-input"
                placeholder="请选择"
                v-model="searchObj.lastConnectionTime"
                type="date"
                @change="changeLinkTime"
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
        绑定列表
      </div>
    </div>
    <el-table
      ref="stockTable"
      border
      v-loading="listLoading"
      :data="dataList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="序号" width="80" align="center" type="index" fixed></el-table-column>
      <el-table-column prop="plateNumber" label="车牌号" min-width="140" align="center" fixed></el-table-column>
      <el-table-column prop="vehicleNumber" label="车机号" min-width="160" align="center" fixed></el-table-column>
      <el-table-column prop="frameNumber" label="车架号" min-width="170" align="center"></el-table-column>
      <el-table-column prop="nickname" label="昵称" min-width="140" align="center"></el-table-column>
      <el-table-column prop="vehicleBrand" label="车辆品牌" min-width="140" align="center"></el-table-column>
      <el-table-column prop="vehicleType" label="车型" min-width="120" align="center"></el-table-column>
      <el-table-column prop="vehicleColor" label="车辆颜色" min-width="120" align="center"></el-table-column>
      <el-table-column prop="firstBindingTime" label="首次绑定时间" min-width="160" align="center">
        <template slot-scope="scope">{{scope.row.firstBindingTime |formatTime}}</template>
      </el-table-column>
      <el-table-column prop="bindingTime" label="最后绑定时间" min-width="160" align="center">
        <template slot-scope="scope">{{scope.row.bindingTime |formatTime}}</template>
      </el-table-column>
      <el-table-column prop="lastOnLineTime" label="最后上线时间" min-width="160" align="center">
        <template slot-scope="scope">{{scope.row.lastOnLineTime |formatTime}}</template>
      </el-table-column>
      <el-table-column prop="lastConnectionTime" label="最后连接时间" min-width="160" align="center">
        <template slot-scope="scope">{{scope.row.lastConnectionTime |formatTime}}</template>
      </el-table-column>
      <el-table-column prop="deptName" label="归属机构" min-width="180" align="center"></el-table-column>
      <el-table-column prop="vehicleUserPhone" label="手机号码" min-width="180" align="center"></el-table-column>
      <el-table-column label="操作" align="center" min-width="120">
        <template slot-scope="scope">
          <el-button type="text" size="mini">
            <span
              class="color-danger"
              @click="updatePhone(scope.row.id,scope.row.vehicleUserPhone)"
            >修改手机号</span>
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
        :page-size="searchObj.limit"
        :page-sizes="[5,10,15]"
        :total="total"
      ></el-pagination>
    </div>
    <update-phone-dialog ref="refPhone"></update-phone-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import UpdatePhoneDialog from "./common/bindPhoneDialog";
import { getBindList } from "@/api/vehicle.js";
import { deptArrChildren } from "@/api/dept";
const defaultSearch = {
  deptId: null,
  bindingTime: "",
  lastConnectionTime: "",
  nickname: null,
  vehicleUserPhone: null,
  vehicleNumber: null,
  frameNumber: null,
  pageSize: 10,
  pageNum: 1
};
export default {
  components: {
    UpdatePhoneDialog
  },
  data() {
    return {
      searchObj: Object.assign({}, this.defaultSearch),
      dataList: [],
      total: null,
      listLoading: false,
      deptArr: [],
      deptId: []
    };
  },
  filters: {
    formatTime(time) {
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  created() {
    this.getData();
    // this.$store.dispatch("GetAllDept").then(res => {
    //   this.deptArr = res;
    // });
    deptArrChildren({ resultType: 1 }).then(res => {
      function deepMap(data) {
        for (let i = 0, j = data.length; i < j; i++) {
          data[i].label = data[i].name;
          data[i].value = data[i].deptId;
          if (data[i].children) {
            deepMap(data[i].children);
          }
        }
        return data;
      }
      this.deptArr = deepMap(res.data.options);
    });
  },
  methods: {
    getData() {
      // 1.列表
      getBindList(this.searchObj).then(res => {
        this.dataList = res.data;
        this.total = res.count;
      });
    },
    // 2.更新手机号
    updatePhone(id, phone) {
      let ref = this.$refs.refPhone;
      ref.form.id = id;
      ref.form.phone = phone;
      ref.visible = true;
    },
    changeBindTime(time) {
      if (time) {
        this.searchObj.bindingTime = this.formatDate(time, "yyyy-MM-dd");
      } else {
        this.searchObj.bindingTime = "";
      }
      this.getData();
    },
    changeLinkTime(time) {
      if (time) {
        this.searchObj.lastConnectionTime = this.formatDate(time, "yyyy-MM-dd");
      } else {
        this.searchObj.lastConnectionTime = "";
      }
      this.getData();
    },
    changeDept(val) {
      this.searchObj.deptId = val[val.length - 1];
      this.getData();
    },
    resetData() {
      this.deptId = [];
      this.searchObj = Object.assign({}, this.defaultSearch);
      this.getData();
    },
    handleSelectionChange(ids) {
      // console.log(ids);
    },
    handleSizeChange(num) {
      this.searchObj.pageNum = num;
      this.getData();
    },
    handleCurrentChange(page) {
      this.searchObj.pageSize = page;
      this.getData();
    },
    formatTime(row) {
      return this.transDate(row.lastConnectionTime);
    }
  }
};
</script>
<style scoped>
  .app-container >>> .el-dialog__footer{
    padding-top: 18px;
  }
</style>

