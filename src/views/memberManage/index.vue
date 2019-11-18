<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div class="header-me">
        <div class="header-title"><p></p>会员 - 会员列表</div>
        <div class="header-con">
          <el-form :inline="true" :model="listQuery" size="small" label-width="120px" label-position="right">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="昵称：">
                    <el-input v-model="listQuery.nickname" class="input-width" placeholder="昵称"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label style="float:right">
                    <div class="reset-groups" style="right: 10px; margin-bottom: 10px">
                      <el-button size="mini"  @click="handleResetSearch()">重置</el-button>
                      <el-button
                        @click="handleSearchList()"
                        size="small"
                        type="primary"
                        icon="el-icon-search"
                      >搜索</el-button>
                    </div>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>会员列表</span>
    </el-card>
    <div class="table-container">
      <el-table
        ref="returnApplyTable"
        :data="list"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <!--<el-table-column type="selection" width="60" align="center"></el-table-column>-->
        <!-- 邀请码 头像 昵称  性别 城市 注册时间 -->
        <el-table-column label="邀请码" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.invitCode}}</template>
        </el-table-column>
        <el-table-column label="头像" min-width="160" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" alt style="width: 40px;height: 40px;">
          </template>
        </el-table-column>
        <el-table-column label="昵称" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.nickname}}</template>
        </el-table-column>
        <el-table-column label="名称" min-width="180" align="center"  v-if='false'>
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="性别" min-width="120" align="center" :formatter="formatSex"></el-table-column>
        <el-table-column label="城市" min-width="160" align="center">
          <template slot-scope="scope">{{scope.row.city}}</template>
        </el-table-column>
        <el-table-column label="注册时间" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.registerTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="最后登录时间" min-width="180" align="center" v-if='false' >
          <template slot-scope="scope">{{scope.row.last_login_time | formatTime}}</template>
        </el-table-column>
        <el-table-column label="手机号码" min-width="180" align="center"  v-if='false'>
          <template slot-scope="scope">{{scope.row.mobile}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" v-if="scope.row.proxy==0" type="text" @click="handleSetProxy(scope.$index, scope.row,3)">设为配送员</el-button>
            <el-button size="mini" v-if="scope.row.proxy==3" type="text" @click="handleSetProxy(scope.$index, scope.row,0)">设为普通会员</el-button>
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
        :current-page.sync="listQuery.page"
        :page-size="listQuery.limit"
        :page-sizes="[5,10,15]"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import { memberList,memberSetProxy } from "@/api/memberList";
const defaultListQuery = {
  page: 1,
  limit: 10,
  order: "asc",
  username: null
};
export default {
  name: "memberManage",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      multipleSelection: [],
      operateType: 1
    };
  },
  created() {
    this.getList();
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
  methods: {
    handleSetProxy(index,data,proxy){
      var self = this;
      memberSetProxy({userId:data.id,proxy:proxy}).then(response => {
        if(response.code==200){
          self.$message({
            message: '设置成功',
            type: 'success'
          });
          self.getList();
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleViewDetail(index, row) {
      this.$router.push({
        path: "/oms/returnApplyDetail",
        query: { id: row.id }
      });
    },
    handleBatchOperate() {
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: "请选择要操作的申请",
          type: "warning",
          duration: 1000
        });
        return;
      }
      if (this.operateType === 1) {
        //批量删除
        this.$confirm("是否要进行删除操作?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let params = new URLSearchParams();
          let ids = [];
          for (let i = 0; i < this.multipleSelection.length; i++) {
            ids.push(this.multipleSelection[i].id);
          }
          params.append("ids", ids);
          deleteApply(params).then(response => {
            this.getList();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        });
      }
    },
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      memberList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data;
        this.total = response.count;
      });
    },
    //性别显示转换
    formatSex: function(row, column) {
      return row.gender == 1 ? "男" : row.gender == 2 ? "女" : "";
    }
  }
};
</script>
<style scoped>
.input-width {
  width: 130%;
}
.app-container .el-card__body{
  padding-bottom: 0;
  padding-top: 0;
}
</style>
