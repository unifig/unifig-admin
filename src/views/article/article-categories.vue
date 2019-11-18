<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">文章分类列表</span>
      <el-button
        class="btn-add"
        @click="handleAddArticleCate"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <!--<el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>-->
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column label="类型名称" align="center">
          <template slot-scope="scope">{{scope.row.catName}}</template>
        </el-table-column>
        <el-table-column label="类型描述" width="100" align="center">
          <template slot-scope="scope">{{scope.row.catDesc}}</template>
        </el-table-column>
        <!-- <el-table-column label="类型图片" width="100" align="center">
          <template slot-scope="scope">{{scope.row.pic}}</template>
        </el-table-column> -->
        <el-table-column label="关键字" width="100" align="center">
          <template slot-scope="scope">{{scope.row.keywords }}</template>
        </el-table-column>
        <!-- <el-table-column label="首页是否显示" width="100" align="center">
          <template slot-scope="scope">{{scope.row.navStatus }}</template>
        </el-table-column> -->
        <el-table-column label="导航栏是否推荐" width="150" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleNavStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.navStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.showStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sortOrder}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              style="color: red"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
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
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {articleCategory,deleteArticleCate,updateNavStatus,updateShowStatus} from '@/api/article.js'
  export default {
    name: "articleCateList",
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 5
        },
        parentId: 0
      }
    },
    created() {
        this.getList();
    },
    // watch: {
    //   $route(route) {
    //   }
    // },
    methods: {
        // 1.列表
        getList() {
            this.listLoading = true;
            articleCategory(this.listQuery)
            .then(response => {
            this.listLoading = false;
            this.list = response.data;
            this.total = response.data.total;
            });
        },
        // 2.导航推荐与否
        handleNavStatusChange(index, row) {
            let data = new URLSearchParams();
            let ids=[];
            ids.push(row.id)
            data.append('ids',ids);
            data.append('navStatus',row.navStatus);
            updateNavStatus(data).then(response=>{
            this.$message({
                message: '修改成功',
                type: 'success',
                duration: 1000
            });
            });
        },
        // 3.显示与否
        handleShowStatusChange(index, row) {
            let data = new URLSearchParams();
            let ids=[];
            ids.push(row.id)
            data.append('ids',ids);
            data.append('showStatus',row.showStatus);
            updateShowStatus(data).then(response=>{
                this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                });
            });
        },
        // 4.编辑
        handleUpdate(index, row) {
            this.$router.push({path:'/sms/addArticleCate',query:{id:row.id}});
        },
        // 4.添加
        handleAddArticleCate() {
            this.$router.push('/sms/addArticleCate');
        },
        // 6.删除
        handleDelete(index, row) {
            this.$confirm('是否要删除该分类', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'})
                .then(() => {
                deleteArticleCate({id:row.id})
                    .then(response => {
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            duration: 1000
                            });
                        this.getList();
                    });
            });
        },
        handleSizeChange(val) {
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.pageNum = val;
            this.getList();
        }
    }
  }
</script>
