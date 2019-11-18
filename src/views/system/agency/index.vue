<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <span class="icon"></span>系统管理-机构
      </div>
      <el-form
        class="reset-form clearfix"
        ref="searchForm"
        :model="searchObj"
        inline
        size="small"
        label-width="100px"
        label-position="left"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="机构名称：">
              <el-input placeholder="请输入机构名称" v-model="searchObj.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构代码：">
              <el-input placeholder="请输入机构代码" v-model="searchObj.organizationCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="机构状态：">
              <el-select v-model="searchObj.status" @change="changeStatus1">
                <el-option
                  v-for="(item,index) in statusArr"
                  :key="index"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <div class="reset-search-groups">
              <el-button size="mini" @click="resetData">重置</el-button>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="getData">搜索</el-button>
            </div>
          </el-col>-->
        </el-row>
        <el-row>
          <el-col style="text-align:right;margin-bottom:14px;">
            <el-form-item>
              <div class="reset-search-groups">
                <el-button size="mini" @click="resetData" style="padding: 6px 23px">重置</el-button>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="getData" style="padding: 5px 12px">搜索</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="content-section clearfix mt20">
      <div class="table-title" style="padding-left: 20px;">
        <i class="el-icon-tickets"></i>
        本级机构列表
      </div>
    </div>
    <el-table ref="stockTable" border v-loading="listLoading" :data="infoList">
      <el-table-column prop="id" label="序号" width="90" align="center" type="index"></el-table-column>
      <el-table-column prop="organizationCode" label="机构代码" min-width="100" align="center"></el-table-column>
      <el-table-column prop="name" label="机构名称" min-width="240" align="center"></el-table-column>
      <el-table-column prop="parentName" label="上级机构" min-width="240" align="center"></el-table-column>
      <el-table-column prop="userUsername" label="管理员账号" min-width="120px" align="center"></el-table-column>
      <el-table-column
        prop="status"
        label="机构状态"
        min-width="100"
        align="center"
        :formatter="formatStatus"
      ></el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="120" align="center">
        <template slot-scope="scope">{{scope.row.createTime|formatTime}}</template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="goDetail(scope.row.deptId)">
            <span class="color-warning">详情</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="content-section clearfix mt20">
      <div class="table-title" style="padding-left: 20px;">
        <i class="el-icon-tickets"></i>
        下级机构列表
        <div class="right">
          <el-button
            type="primary"
            size="mini"
            @click="createDept"
            style="margin-right:10px;"
          >新增下级机构</el-button>
        </div>
      </div>
    </div>
    <el-table ref="stockTable" border v-loading="listLoading" :data="dataList">
      <el-table-column prop="id" label="序号" width="90" align="center" type="index"></el-table-column>
      <el-table-column prop="organizationCode" label="机构代码" min-width="100" align="center"></el-table-column>
      <el-table-column prop="name" label="机构名称" min-width="220" align="center"></el-table-column>
      <el-table-column prop="parentName" label="上级机构" min-width="210" align="center"></el-table-column>
      <el-table-column prop="userUsername" label="管理员账号" min-width="100" align="center"></el-table-column>
      <el-table-column
        prop="status"
        label="机构状态"
        min-width="100"
        align="center"
        :formatter="formatStatus"
      ></el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="100" align="center">
        <template slot-scope="scope">{{scope.row.createTime|formatTime}}</template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="changeStatus({ids:scope.row.deptId,status:1})"
            v-if="scope.row.status == 0"
          >启用</el-button>
          <el-button
            size="mini"
            type="text"
            @click="changeStatus({ids:scope.row.deptId,status:0})"
            v-if="scope.row.status == 1"
          >
            <span class="color-danger">停用</span>
          </el-button>

          <el-button size="mini" type="text" @click="resetPass(scope.row)">重置密码</el-button>
          <el-button size="mini" type="text" @click="getLog(scope.row.deptId)">历史记录</el-button>
          <el-button size="mini" type="text" @click="goDetail(scope.row.deptId)">
            <span class="color-warning">详情</span>
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
    <reset-pass-dialog ref="refPass"></reset-pass-dialog>
    <get-log-dialog ref="refLog"></get-log-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import ResetPassDialog from "./resetPassDialog";
import GetLogDialog from "./getLogDialog";
import {
  getDept, // 详情
  createDept, // 创建
  resetDeptPass, // 重置
  switchDept, // 启用/停用
  getDeptLogs, // 历史
  getChildrenDept // 机构下拉
} from "@/api/vehicle";
const defaultSearch = {
  name: null,
  organizationCode: null,
  status: null,
  pageNum: 1,
  pageSize: 10
};
export default {
  components: { ResetPassDialog, GetLogDialog },
  data() {
    return {
      total: null,
      searchObj: Object.assign({}, this.defaultSearch),
      statusArr: [
        {
          id: 1,
          label: "启用"
        },
        {
          id: 0,
          label: "停用"
        }
      ],
      listLoading: false,
      total: null,
      infoList: [],
      dataList: []
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
      // 1.机构列表
      getDept().then(res => {
        this.$set(this.infoList, 0, res.data);
      });
      // 2.下级机构列表
      getChildrenDept(this.searchObj).then(res => {
        this.dataList = res.data;
        this.total = res.count;
      });
    },
    //3.详情
    goDetail(id) {
      this.$router.push({ name: "agency-detail", params: { id: id } });
    },
    // 4.创建
    createDept() {
      this.$router.push({ name: "agency-add" });
    },
    // 状态
    changeStatus(option) {
      let params = option;
      let status = option.status;
      let startMsg = "启用机构成功";
      let stopMsg = "停用机构成功";
      switchDept(params).then(res => {
        this.$message({
          type: "success",
          message: status == 0 ? stopMsg : startMsg
        });
        this.getData();
      });
    },
    changeStatus1() {
      // 2.下级机构列表
      getChildrenDept(this.searchObj).then(res => {
        this.dataList = res.data;
      });
    },
    // 重置密码
    resetPass(row) {
      let ref = this.$refs.refPass;
      ref.formData = Object.assign({}, row);
      ref.visible = true;
    },
    // 历史记录
    getLog(id) {
      let params = {
        deptId: id
      };
      getDeptLogs(params).then(res => {
        let ref = this.$refs.refLog;
        ref.dataList = res.data;
        ref.visible = true;
      });
    },
    resetData() {
      this.searchObj = Object.assign({}, this.defaultSearch);
      this.getData();
    },
    formatStatus(row) {
      let id = row.status * 1;
      if (id == 0) {
        return "停用";
      } else if (id == 1) {
        return "启用";
      }
    },
    handleSelectionChange(ids) {
      // console.log(ids);
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


