<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <span class="icon"></span>车机管理-盘存管理
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
            <el-form-item label="机构名称：">
              <el-input v-model="searchObj.deptName" class="reset-input" placeholder="机构名称"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="盘存时间：">
              <el-date-picker
                v-model="take_inventory_time"
                type="daterange"
                range-separator="至"
                @change="changeTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>-->
          <el-col :span="8">
            <el-form-item label="盘存开始时间：">
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
            <el-form-item label="盘存结束时间：">
              <el-date-picker
                placeholder="结束时间"
                class="reset-input"
                v-model="endTime"
                type="date"
                @change="changeEndTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="text-align:right;margin-bottom:14px">
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
      <div class="table-title">
        盘存列表
        <div class="right">
          <el-button type="primary" size="mini" @click="addButton" style="margin-right:10px;">新增车机盘存</el-button>
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
      <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
      <el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
      <el-table-column prop="deptName" label="机构名称" min-width="120" align="center"></el-table-column>
      <el-table-column prop="takeInventoryTime" label="盘存时间" min-width="140" align="center">
        <template slot-scope="scope">{{scope.row.takeInventoryTime |formatTime}}</template>
      </el-table-column>
      <el-table-column prop="residualQuantity" label="应剩余车机数量" min-width="90" align="center"></el-table-column>
      <el-table-column prop="actualResidualQuantity" label="实际剩余车机数量" min-width="80" align="center">
        <template slot-scope="scope">
          <div
            @click="showActual(scope.row.id)"
            v-if="scope.row.actualResidualQuantity*1 >0"
          >{{scope.row.actualResidualQuantity}}</div>
          <div v-else>{{scope.row.actualResidualQuantity}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="difference" label="差额" min-width="80" align="center">
        <template slot-scope="scope">
          <div
            @click="showDifference(scope.row.id)"
            v-if="scope.row.actualResidualQuantity*1 >0"
          >{{scope.row.actualResidualQuantity}}</div>
          <div v-else>{{scope.row.actualResidualQuantity}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="createName" label="操作人" min-width="90" align="center"></el-table-column>
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
    <add-save-dialog ref="addRef" @add="addUnSave"></add-save-dialog>
    <save-dialog ref="detail"></save-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import {
  getSaveList,
  getUnSaveList,
  addSave,
  getSaveLogs
} from "@/api/vehicle";
import SaveDialog from "./common/saveDialog";
import AddSaveDialog from "./common/addSaveDialog";
const defaultSearch = {
  deptName: null,
  takeInventoryTimeStart: null,
  takeInventoryTimeEnd: null,
  pageSize: 10,
  pageNum: 1
};

export default {
  components: { AddSaveDialog, SaveDialog },
  data() {
    return {
      searchObj: Object.assign({}, defaultSearch),
      take_inventory_time: null,
      startTime: null,
      endTime: null,
      dataList: [],
      total: null,
      listLoading: false
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
      //1.存盘列表
      this.listLoading = true;
      getSaveList(this.searchObj).then(res => {
        this.listLoading = false;
        this.dataList = res.data;
        this.total = res.count;
      });
    },
    addButton() {
      // 2.获取未存盘列表
      let ref = this.$refs.addRef;
      getUnSaveList().then(res => {
        ref.dataList = res.data;
        ref.visible = true;
      });
    },
    addUnSave(params) {
      //3.保存存盘
      addSave(params).then(res => {
        this.$message({ type: "success", message: res.msg });
        this.getData();
      });
    },
    // 4.显示差额
    showDifference(id) {
      //   console.log(id);
      getSaveLogs({ takeIinventoryId: id, type: 1 }).then(res => {
        // console.log(res.data, "差额");
        let resData = res.data;
        let detailRef = this.$refs.detail;
        detailRef.title = "差额明细";
        detailRef.num = resData.length;
        detailRef.dataList = resData;
        detailRef.type = "diffence";
        detailRef.visible = true;
      });
    },
    // 5.显示实际剩余数量
    showActual(id) {
      getSaveLogs({ takeIinventoryId: id, type: 0 }).then(res => {
        let resData = res.data;
        let detailRef = this.$refs.detail;
        detailRef.title = "实际剩余车机";
        detailRef.num = resData.length;
        detailRef.dataList = resData;
        detailRef.type = "actual";
        detailRef.visible = true;
      });
    },
    changeTime(time) {
      if (time) {
        this.searchObj.takeInventoryTimeStart = this.formatDate(
          time[0],
          "yyyy-MM-dd"
        );
        this.searchObj.takeInventoryTimeEnd = this.formatDate(
          time[1],
          "yyyy-MM-dd"
        );
      } else {
        this.searchObj.takeInventoryTimeStart = null;
        this.searchObj.takeInventoryTimeEnd = null;
      }
      this.getData();
    },
    changeStartTime(time) {
      if (time) {
        this.searchObj.takeInventoryTimeStart = this.formatDate(
          time,
          "yyyy-MM-dd"
        );
      } else {
        this.searchObj.takeInventoryTimeStart = null;
      }
      this.getData();
    },
    changeEndTime(time) {
      if (time) {
        this.searchObj.takeInventoryTimeEnd = this.formatDate(
          time,
          "yyyy-MM-dd"
        );
      } else {
        this.searchObj.takeInventoryTimeEnd = null;
      }
      this.getData();
    },
    resetData() {
      this.searchObj = Object.assign({}, this.defaultSearch);
      this.take_inventory_time = null;
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

