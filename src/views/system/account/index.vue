<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <span class="icon"></span>系统管理-账号
      </div>
      <el-form
        class="reset-form clearfix"
        ref="searchForm"
        :model="searchObj"
        inline
        size="small"
        label-width="100px"
        label-position="right"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="检索：">
              <el-input v-model="searchObj.searchField" placeholder="用户名称/机构名称/使用人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="reset-search-groups">
              <el-button size="mini" @click="resetData">重置</el-button>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="getData">搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="content-section clearfix mt20">
      <div class="table-title" style="padding-left: 20px;">
        <i class="el-icon-tickets"></i>
        账号列表
        <div class="right">
          <el-button type="primary" size="mini" @click="addShow">新增账号</el-button>
        </div>
      </div>
    </div>
    <el-table ref="stockTable" border v-loading="listLoading" :data="dataList">
      <el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="100" align="center" >
         <template slot-scope="scope">{{scope.row.createTime |formatTime}}</template>
      </el-table-column>
      <!--<el-table-column prop="accountName" label="账号名称" min-width="140" align="center"></el-table-column>-->
      <el-table-column prop="username" label="用户名" min-width="140" align="center"></el-table-column>
      <el-table-column prop="deptName" label="归属机构" min-width="180" align="center"></el-table-column>
      <el-table-column prop="holderName" label="使用人" min-width="120" align="center"></el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="updateShow(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="del(scope.row.id)">
            <span class="color-danger">删除</span>
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
        :page-sizes="[5, 10, 15]"
        :total="total"
      ></el-pagination>
    </div>
    <account-create ref="ref_create"></account-create>
    <account-update ref="ref_update"></account-update>
  </div>
</template>
<script>
import {
  getAccountList,
  addAccount,
  updateAccount,
  deleteAccount
} from "@/api/dept";
import AccountCreate from "./accountInfo";
import AccountUpdate from "./update";
import { formatDate } from "@/utils/date";
const defaultSearch = {
  pageNum: 1,
  pageSize: 10,
  searchField: null
};
export default {
  components: { AccountCreate, AccountUpdate },
  data() {
    return {
      searchObj: {
        pageNum: 1,
        pageSize: 10,
        searchField: null
      },
      listLoading: false,
      time: null,
      total: null,
      dataList: []
    };
  },
   filters: {
    formatStatus(id) {},
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
    // 1.列表
    getData() {
      getAccountList(this.searchObj).then(res => {
        this.dataList = res.data;
        this.total = res.count;
      });
    },
    // 创建dialog
    addShow() {
      let info = this.$refs.ref_create;
      info.title = "创建账号";
      info.visible = true;
    },
    // 编辑dialog
    updateShow(row) {
      let params = {
        username: null,
        password: null,
        deptId: null,
        deptName: null,
        accountName: null,
        holderName: null,
        roleId: null,
        roleName: null,
        mobile: null
      };
      params.id = row.id;
      params.username = row.username;
      params.password = null;
      params.deptId = row.deptId;
      params.deptName = row.deptName;
      params.accountName = row.accountName;
      params.holderName = row.holderName;
      params.roleName = row.roleName;
      params.mobile = row.mobile;
      // console.log(params, "ffff");
      let updateInfo = this.$refs.ref_update;
      updateInfo.title = "编辑账号";
      updateInfo.type = "update";
      updateInfo.info = params;
      updateInfo.visible = true;
    },
    // 1.添加
    add(info) {
      addAccount(info).then(res => {});
    },

    // 3.删除
    del(id) {
      this.$confirm("此操作将删除该账号,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        deleteAccount({ id: id }).then(res => {
          this.$message({ type: "success", message: res.msg });
          this.getData();
        });
      });
    },
    resetData() {
      this.searchObj = {
        pageNum: 1,
        pageSize: 10,
        searchField: null
      };
      this.getData();
    },
    handleSizeChange(val) {
      this.searchObj.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.searchObj.pageNum = val;
      this.getData();
    }
  }
};
</script>
<style scoped>
  .app-container >>> .el-dialog__footer {
    padding-top: 20px;
  }
  .app-container >>>  .el-dialog__body .el-select>.el-input {
    width: 240px;
  }
</style>


