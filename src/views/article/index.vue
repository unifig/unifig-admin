<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div class="header-me">
        <div class="header-title"><p></p>营销 - 文章列表</div>
        <div class="header-con">
        <el-form :inline="true" :model="listQuery" size="small" label-width="120px" label-position="right">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <el-form-item label="文章名：">
                  <el-input v-model="listQuery.title" class="input-width" placeholder="文章名称"></el-input>
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
      <span>文章列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px;padding: 6px 7px;margin-top: 10px;">添加文章</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="returnApplyTable"
            :data="list"
            style="width: 100%;"
            @selection-change="handleSelectionChange"
            v-loading="listLoading" border>
        <!--<el-table-column type="selection" width="60" align="center"></el-table-column>-->
        <!--<el-table-column label="编号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>-->
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column label="文章标题" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="文章分类" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.catName}}</template>
        </el-table-column>
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
        <!-- <el-table-column label="点击量" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.click}}</template>
        </el-table-column>
         <el-table-column label="点赞量" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.like}}</template>
        </el-table-column>
         <el-table-column label="分享量" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.share}}</template>
        </el-table-column>

        <el-table-column label="分享的积分" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.shareIntegral}}</template>
        </el-table-column> -->
         <el-table-column label="发布时间" min-width="180" align="center">
          <template slot-scope="scope">{{scope.row.editTime  | formatTime}}</template>
        </el-table-column>
        <el-table-column label="操作" min-width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="edit(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="text" style="color: red"
                @click="handleDelete(scope.row.id)">
                删除
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
            :current-page.sync="listQuery.page"
            :page-size="listQuery.rows"
            :page-sizes="[5,10,15]"
            :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { formatDate } from '@/utils/date';
  import {articleList,updateArticleNavStatus,deleteArticle} from '@/api/article';
  const defaultListQuery = {
    page: 1,
    rows:5,
    title: null
  };
  export default {
    name:'articleManage',
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
    filters:{
      formatTime(time) {
        if(time==null||time===''){
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods:{
      //1.文章列表
      getList(){
        this.listLoading=true;
        articleList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.count;
        });
      },
      // 2.文章编辑
      edit (id) {
        this.$router.push({
          path: '/sms/addArticle',
          query: {
            type: 'edit',
            id: id
          }
        })
      },
      // 3.文章添加
      handleAdd () {
        this.$router.push({
          path: '/sms/addArticle',
          query: {
            type: 'add'
          }
        })
      },
      // 4.文章删除
      handleDelete(id){
          this.$confirm('是否要删除该文章', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'})
            .then(() => {
                deleteArticle({id:id}).then(response => {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                        duration: 1000
                        });
                    this.getList();
                });
            });
        },
        //5.导航推荐与否
        handleNavStatusChange(index, row) {
            let data = new URLSearchParams();
            let ids=[];
            ids.push(row.id)
            data.append('ids',ids);
            data.append('navStatus',row.navStatus);
            updateArticleNavStatus(data).then(response=>{
            this.$message({
                message: '修改成功',
                type: 'success',
                duration: 1000
            });
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
        this.listQuery.rows = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.page = val;
        this.getList();
      }
    }
  }
</script>
<style scoped>
.input-width {
  width: 130%;
}
.filter-container >>> .el-card__body{
  padding-bottom: 0;
  padding-top: 0;
}
</style>
