<template>
  <div class="app-container">
    <!--搜索开始-->
    <div class="header-me">
      <div class="header-title">
        <p></p>店铺 - 店铺列表
      </div>
      <div class="header-con">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="120px"
          :label-position="labelPosition"
        >
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="店铺名称：">
                  <el-input style="width: 203px" v-model="listQuery.name" placeholder="店铺名称"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple-light">
                <el-form-item label style="float:right">
                  <el-button
                    @click="handleSearchList()"
                    size="small"
                    type="primary"
                    icon="el-icon-search"
                    class="initbtn"
                    style="float: right;margin-left: 20px;margin-right: 10px;"
                  >搜索</el-button>
                  <el-button size="mini" @click="handleResetSearch()" class="initbtn" style="float: right;">重置</el-button>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!--搜索结束-->
    <div class="table-container con-me">
      <el-card class="operate-container" shadow="never">
        <span class="color-main">
          <i class="el-icon-tickets"></i>
          店铺列表
        </span>
        <el-button
          size="mini"
          type="primary"
          class="btn-add initbtn"
          @click="addStore"
          style="margin-left: 20px"
        >新增</el-button>
      </el-card>
      <el-table ref="productTable" :data="list" style="width: 100%" v-loading="listLoading" border>
        <el-table-column label="序号" align="center" type="index" width="60">></el-table-column>
        <el-table-column label="商家名称" width="200" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="商家电话" width="200" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <!--<el-table-column label="优惠券数量" width="200" align="center">-->
          <!--<template slot-scope="scope"></template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="商家简介" width="200" align="center">-->
          <!--<template slot-scope="scope"></template>-->
        <!--</el-table-column>-->
        <el-table-column label="商家状态" width="200" align="center">
          <template slot-scope="scope">{{scope.row.status == 0 ? '正常' : '关闭'}}</template>
        </el-table-column>
        <el-table-column label="营业时间" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.businessHours}}</template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="editStore(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <div class="right">
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
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import { storeDataList } from "@/api/store";

const defaultListQuery = {
  page: 1,
  rows: 5,
  name: "",
  terraceId: 1
};
export default {
  data() {
    return {
      labelPosition: "right",
      valueDate: "",
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      num1: 1,
      listLoading: true
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatTime(time) {
      if (time == null || time === "") {
        return "--";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  //监听变化
  computed: {},
  methods: {
    //列表渲染
    getList() {
      this.listLoading = true;
      storeDataList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data;
        this.total = response.count;
      });
    },
    //搜索
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    //翻页
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    // 新增店铺
    addStore() {
      this.$router.push({ path: "/store/addstore" });
    },
    // 编辑
    editStore(id) {
      this.$router.push({
        path: "/store/addstore",
        query: {
          id: id,
          type: "edit"
        }
      });
    },
    // 重置
    handleResetSearch() {
      this.listQuery.name = "";
    }
  }
};
</script>
<style lang="scss">
.initbtn {
  width: 80px;
  height: 30px;
  border-radius: 4px;
}
</style>



