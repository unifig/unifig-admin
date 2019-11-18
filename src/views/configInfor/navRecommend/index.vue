<style scoped>
.input-width {
  width: 203px;
}
.header-me {
  background-color: #fff;
  box-shadow: 3px 3px 10px #bbb;
  color: #353535;
}
.con-me {
  box-shadow: 3px 3px 10px #bbb;
}
.header-title {
  padding: 15px 0 15px 20px;
  border-bottom: 1px solid #eef2f7;
  font-size: 14px;
  position: relative;
  margin-bottom: 10px;
}
.header-title p {
  height: 16px;
  width: 5px;
  background-color: #e44d4a;
  border-radius: 50px;
  position: absolute;
  top: 0px;
  left: 10px;
}
.header-con {
  padding-left: 10px;
}
</style>
<template>
  <div class="app-container">
    <div class="header-me">
      <div class="header-title">
        <p></p>配置信息管理 - banner管理
      </div>
      <div class="header-con">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="auto"
          :label-position="labelPosition"
        >
          <el-form-item label="检索类型：">
            <el-select v-model="listQuery.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-input v-model="listQuery.title" class="input-width" placeholder="检索内容"></el-input>
          </el-form-item>
          <el-form-item label style="float:right">
            <el-button
              @click="handleSearchList()"
              size="small"
              type="primary"
              icon="el-icon-search"
            >搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table-container con-me">
      <el-card class="operate-container" shadow="never">
        <span class="color-main">广告位列表</span>
        <el-button
          size="mini"
          type="primary"
          class="btn-add el-icon-plus"
          @click="handleAdd()"
          style="margin-left: 20px"
        >添加</el-button>
      </el-card>
      <el-table
        ref="returnApplyTable"
        :data="list"
        style="width: 100%;"
        class="table-me"
        v-loading="listLoading"
      >
        <el-table-column label="序号" min-width="100" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="标题" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="排序" min-width="120">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="类型" min-width="140" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="图片" min-width="140" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="PV" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="UV" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="关联链接" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="关联商家" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="关联推文或活动" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="创建时间" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="edit(scope.row.id)">编辑</el-button>

            <el-button
              size="mini"
              type="text"
              style="color: red"
              @click="handleDelete(scope.row.id)"
            >删除</el-button>
            <el-button
              size="mini"
              type="text"
              style="color:#DDA450"
              @click="examine(scope.row.id)"
            >查看</el-button>
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
    <el-dialog title="广告位" :visible.sync="dialogVisible" width="60%">
      <el-form ref="form" :model="form" label-width="120px" :label-position="labelPosition">
        <el-form-item label="标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.region" placeholder="请选择类型">
            <el-option label="1" value="1"></el-option>
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="关联商家">
          <el-select v-model="form.region" placeholder>
            <el-option label="1" value="1"></el-option>
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联文章或活动">
          <el-select v-model="form.region" placeholder>
            <el-option label="1" value="1"></el-option>
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="图片：">
          <el-upload
            class="editor-slide-upload"
            :action="global.fileUploadApi"
            :file-list="fileList"
            :show-file-list="true"
            :on-success="handleSuccess"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <a :href="form.thumb" target="_blank" v-if="form.thumb">{{form.thumb}}</a>
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
    //1.文章列表
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
      this.dialogVisible = true;
    },
    // 3.添加
    handleAdd() {
      this.dialogVisible = true;
    },
    //4.查看
    examine(id) {
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

