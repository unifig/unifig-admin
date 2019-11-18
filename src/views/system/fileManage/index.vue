<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <span class="icon"></span>系统管理-文件
      </div>
      <!-- <el-form
        class="reset-form"
        :inline="true"
        :model="listQuery"
        size="small"
        label-width="60px"
        label-position="left"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="检索：">
              <el-input v-model="listQuery.title" class="input-width" placeholder="文件名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="reset-search-groups">
              <el-button size="mini" @click="resetData">重置</el-button>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="getList">搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>-->
    </div>

    <div class="content-section clearfix mt20">
      <div class="table-title">
        文件列表
        <div class="right">
          <el-upload
            size="mini"
            :action="global.fileUploadApi"
            :show-file-list="false"
            :multiple="true"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">文件上传</el-button>
          </el-upload>
        </div>
      </div>
      <el-table ref="returnApplyTable" :data="list" border>
        <el-table-column label="编号" min-width="90" align="center" prop="id"></el-table-column>
        <el-table-column label="文件名" min-width="100" align="center" prop="name"></el-table-column>
        <el-table-column label="文件地址" min-width="140" align="center" prop="path"></el-table-column>
        <el-table-column label="文件类型" min-width="120" align="center" prop="contentType"></el-table-column>
        <el-table-column label="文件上传时间" min-width="140" align="center" prop="uploadDate">
          <template slot-scope="scope">{{scope.row.uploadDate | formatTime}}</template>
        </el-table-column>
        <el-table-column label="操作" min-width="100" align="center">
          <template slot-scope="scope">
            <span class="color-danger" @click="deleteFile(scope.row.id)">删除</span>
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
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import { fileList, deleteFile, uploadFile } from "@/api/system";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  title: null
};
export default {
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false
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
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  methods: {
    // 1.获取列表
    getList() {
      this.listLoading = true;
      fileList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data;
        this.total = response.count;
      });
    },
    // 2.文件上传成功
    handleSuccess(res) {
      let url = this.global.viewImg + res;
      this.$message({ type: "success", message: "文件上传成功" });
      this.getList();
    },
    // 3.删除
    deleteFile(id) {
      this.$confirm("是否删除该文件", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteFile({ id: id }).then(res => {
          this.$message({ type: "success", message: res.msg });
          this.getList();
        });
      });
    },
    resetData() {
      this.listQuery.title = null;
      this.getList();
    },
    handleSearchList() {
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    }
  }
};
</script>

