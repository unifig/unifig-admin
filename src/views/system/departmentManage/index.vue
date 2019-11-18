<template>
  <div class="app-container">
    <!-- <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
       
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="用户名：">
            <el-input v-model="listQuery.username" class="input-width" placeholder="用户名"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card> -->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
     <!-- <el-button type="primary" size="mini" class="mt20 right"> 新增</el-button>
     <el-button type="warning" size="mini" class="mt20 right">修改</el-button>
     <el-button type="danger" size="mini" class="mt20 right">删除</el-button> -->
    <div class="table-container">
      <el-table ref="returnApplyTable"
            :data="list"
            style="width: 100%;"
            @selection-change="handleSelectionChange"
            v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="部门ID" width="180" align="center">
          <template slot-scope="scope">{{scope.row.deptId}}</template>
        </el-table-column>
        <el-table-column label="部门名称" width="180" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="上级部门" align="center">
          <template slot-scope="scope">{{scope.row.parentName}}</template>
        </el-table-column>
        <el-table-column label="排序号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.orderNum}}</template>
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
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { formatDate } from '@/utils/date';
  import {departmentList} from '@/api/system';
  const defaultListQuery = {
    page: 1,
    limit: 5,
    order: 'asc',
    username: null
  };
  export default {
    name:'memberManage',
    data() {
      return {
        listQuery:Object.assign({},defaultListQuery),
        list:null,
        total:null,
        listLoading:false,
        multipleSelection:[],
        operateType:1,
      }
    },
    created(){
      this.getList();
    },
    methods:{
      getList(){
        this.listLoading=true;
        departmentList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.count;
        });
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.page = 1;
        this.getList();
      },
      handleSizeChange(val){
        this.listQuery.page = 1;
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.page = val;
        this.getList();
      },
    
    }
  }
</script>


