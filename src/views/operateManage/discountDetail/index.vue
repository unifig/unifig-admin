<style scoped>
.con-me .el-select {
  display: block;
}
.input-width {
  width: 203px;
}
.modal .el-input,
.modal .el-select,
.modal .el-date-picker {
  width: 95%;
}
.app-container >>> .header-me .el-form-item__content:last-child{
  width: auto;
}
.app-container >>> .el-dialog__body {
  padding-left: 60px;
  padding-right: 60px;
}
</style>
<template>
  <div class="app-container">
    <div class="header-me">
      <div class="header-title">
        <p></p>运营管理 - 优惠券明细发放
      </div>
      <div class="header-con">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="120px"
          :label-position="labelPosition"
        >
          <el-form-item label="创建时间：">
            <el-date-picker v-model="valueDate" type="date" placeholder="开始日期"></el-date-picker>
          </el-form-item>
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
        <span class="color-main">优惠券列表</span>
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
        <el-table-column label="优惠券ID" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="优惠券名称" min-width="120">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="类型" min-width="140" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="商家归属" min-width="140" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="服务分类" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="有效期" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="创建时间" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="发放用户" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="是否送达" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="核销状态" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="核销服务商名称" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="当前状态" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button type="text" style="color: red" size="mini" @click="edit(scope.row.id)">查看明细</el-button>
            <!--<el-button size="mini" icon="el-icon-search" type="success"   @click="examine(scope.row.id)"></el-button>-->
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
    <!--新增-->
    <el-dialog title="查看详情" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="form" :label-position="labelPosition">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="优惠券名称 ：">
                <span>{{form.productId}}123456</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="类型 ：">
                <span>{{form.productId}}123456</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="优惠券ID ：">
                <span>{{form.productId}}123456</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="商家归属 ：">
                <span>{{form.productId}}123456</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="服务分类 ：">
                <span>{{form.productId}}123456</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="有效期 ：">
                <span>{{form.productId}}123456</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="创建时间 ：">
                <span>{{form.productId}}123456</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="发放用户 ：">
                <span>{{form.productId}}123456</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="用户手机号 ：">
                <span>{{form.productId}}123456</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="是否送达 ：">
                <span>{{form.productId}}123456</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="核销状态 ：">
                <span>{{form.productId}}123456</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="核销服务商名称 ：">
                <span>{{form.productId}}123456</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="核销服务商ID ：">
                <span>{{form.productId}}123456</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="核销服务商电话 ：">
                <span>{{form.productId}}123456</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="当前状态 ：">
                <span>{{form.productId}}123456</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"></div>
          </el-col>
        </el-row>
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
      valueDate: "",
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      operateType: 1,
      dialogVisible: false,
      labelPosition: "left",
      titleName: "",
      num1: 1,
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



