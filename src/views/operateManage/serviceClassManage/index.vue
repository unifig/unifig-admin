<style scoped>
.el-select {
  display: block;
}
.input-width {
  width: 203px;
}
</style>
<template>
  <div class="app-container">
    <div class="header-me">
      <div class="header-title">
        <p></p>运营管理 - 服务分类管理
      </div>
    </div>
    <div class="table-container con-me">
      <el-card class="operate-container" shadow="never">
        <span class="color-main">服务分类列表</span>
        <el-button
          size="mini"
          type="primary"
          class="btn-add el-icon-plus"
          @click="handleAdd()"
          style="margin-left: 20px"
        >新增服务分类</el-button>
      </el-card>
      <el-table
        ref="returnApplyTable"
        :data="list"
        style="width: 100%;"
        class="table-me"
        v-loading="listLoading"
      >
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="分类名称" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="edit(scope.row.id)">编辑</el-button>

            <el-button
              size="mini"
              type="text"
              style="color: red"
              @click="handleDelete(scope.row.id)"
            >删除</el-button>
            <!--<el-button size="mini" type="text"  style="color:#DDA450"   @click ="examine(scope.row.id)">查看</el-button>-->
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
    <el-dialog :title="titleName" :visible.sync="dialogVisible" width="60%">
      <el-form ref="form" :model="form" label-width="120px" :label-position="labelPosition">
        <el-form-item label="新增服务分类">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { formatDate } from "@/utils/date";
import {
  articleList,
  updateArticleNavStatus,
  deleteArticle
} from "@/api/article";
const defaultListQuery = {
  page: 1,
  rows: 5,
  title: null,
  region: ""
};
export default {
  name: "articleManage",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      operateType: 1,
      dialogVisible: false,
      labelPosition: "left",
      titleName: "服务分类列表",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  created() {
    this.getList();
    this._getJsonData();
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
    //1.列表
    getList() {
      this.listLoading = true;
      articleList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data;
        this.total = response.count;
      });
    },
    // 2.编辑
    edit(id) {
      console.log(id);
      this.titleName = "修改服务分类";
      this.dialogVisible = true;
    },
    // 3.添加
    handleAdd() {
      this.titleName = "新增服务分类";
      this.dialogVisible = true;
    },
    //4.查看
    examine(id) {
      this.titleName = "查看服务商";
      this.dialogVisible = true;
    },
    // 4.删除
    handleDelete(id) {
      this.$confirm("是否要删除该文章", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteArticle({ id: id }).then(response => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000
          });
          this.getList();
        });
      });
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
    },
    // 图片上传成功
    handleSuccess(res) {
      this.article.fileUrl = res;
    }
  }
};
</script>


