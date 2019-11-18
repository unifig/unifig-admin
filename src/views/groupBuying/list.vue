<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div class="header-me">
        <div class="header-title"><p></p>团购 - 团购列表</div>
        <div class="header-con">
          <el-form :inline="true" :model="listQuery" size="small" label-width="120px" label-position="right">
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="订单编号：">
                    <el-input v-model="listQuery.title" class="input-width" placeholder="订单编号"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="团购名称：">
                    <el-input v-model="listQuery.title" class="input-width" placeholder="团购名称"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="团购人数：">
                    <el-input v-model="listQuery.title" class="input-width" placeholder="团购人数"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="订单状态：">
                    <el-input v-model="listQuery.title" class="input-width" placeholder="订单状态"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="16">
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
      <span>团购列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd" style="margin-left: 20px;padding: 6px 7px;">添加团购</el-button>
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
        <!--<el-table-column label="拼团编号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>-->
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <!-- <el-table-column label="拼团名称" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column> -->
        <el-table-column label="开团时间" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.startTime|formatTime(scope.row.startTime)}}</template>
        </el-table-column>
        <el-table-column label="结束时间" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.endTime|formatTime(scope.row.endTime)}}</template>
        </el-table-column>
        <el-table-column label="成团倒计时" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.validTime/1000/1000}}</template>
        </el-table-column>
        <el-table-column label="拼团价格" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.groupPurchasePrice}}</template>
        </el-table-column>
        <el-table-column label="当前订单状态" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.status==0?'保存':scope.row.status==1?'开启':scope.row.status==2?'关闭':''}}</template>
        </el-table-column>
        <!-- <el-table-column label="当前参团人数" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.status}}</template>
        </el-table-column> -->
        <el-table-column label="操作" min-width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="edit(scope.row.id,scope.row)">查看</el-button>
            <el-button
              size="mini"
              type="text"
              style="color: red"
              @click="handleDelete(scope.row)"
            >终止</el-button>
            <el-button size="mini" type="text" v-if="scope.row.status==0" @click="handleRelease(scope.row)">发布</el-button>
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
        :page-size="listQuery.rows"
        :page-sizes="[5,10,15]"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import {
  groupBuyingAdd,
  groupBuyingList,
  groupBuyingUpdate,
} from "@/api/groupBuying";
const defaultListQuery = {
  page: 1,
  rows: 5,
  title: null
};
export default {
  name: "articleManage",
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
    //1.团购列表
    getList() {
      this.listLoading = true;
      let str = 'page='+this.listQuery.page+'&rows='+this.listQuery.rows;
      groupBuyingList(str).then(response => {
        this.listLoading = false;
        this.list = response.data;
        this.total = response.count;
      });
    },
    // 2.编辑团购
    edit(id,info) {
      this.$router.push({
        path: "/group/buying/add",
        query: {
          type: "edit",
          id: id,
          data:JSON.stringify(info)
        }
      });
    },
    // 3.添加团购
    handleAdd() {
      this.$router.push({
        path: "/group/buying/add",
        query: {
          type: "add"
        }
      });
    },
    // 4.删除团购
    handleDelete(row) {
      this.$confirm("确定要终止此团购吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          id:row.id,
          status:2
        };
        groupBuyingUpdate(params).then(response => {
          if(response.code==200){
            this.$message({
              message: "终止成功",
              type: "success",
              duration: 1000
            });
            this.getList();
          }

        })
      });
    },
    //发布团购
    handleRelease:function(row){
      let params = {
        id:row.id,
        status:1
      };
      groupBuyingUpdate(params).then(response => {
          if(response.code==200){
            this.$message({
              message: "发布成功",
              type: "success",
              duration: 1000
            });
            this.getList();
          }
      })
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

    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.listQuery.rows = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    }
  }
};
</script>
<style scoped>
.input-width {
  width:130%;
}
.app-container .el-card__body{
  padding-bottom: 0;
  padding-top: 0;
}
</style>
