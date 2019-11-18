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
</style>
<template>
  <div class="app-container">
    <div class="header-me">
      <div class="header-title">
        <p></p>运营管理 - 优惠券管理
      </div>
      <div class="header-con">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="auto"
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
        <el-table-column label="序号" min-width="100" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="名称" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="类型" min-width="120">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="商家归属" min-width="140" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="发放数量" min-width="140" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="当前状态" min-width="120" align="center">
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
        <el-table-column label="操作" align="center" width="600">
          <template slot-scope="scope">
            <el-button
              type="text"
              style="color: red"
              size="mini"
              @click="userGrant(scope.row.id)"
            >目标用户发放</el-button>
            <el-button
              type="text"
              style="color: red"
              size="mini"
              @click="gradeGrant(scope.row.id)"
            >等级发放</el-button>
            <el-button
              type="text"
              style="color: red"
              size="mini"
              @click="rationGrant(scope.row.id)"
            >定量发放</el-button>
            <el-button
              type="text"
              style="color:#DDA450"
              size="mini"
              @click="recall(scope.row.id)"
            >撤回</el-button>
            <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="text"
              style="color: red"
              @click="handleDelete(scope.row.id)"
            >删除</el-button>
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
    <el-dialog title="新增卡券" :visible.sync="dialogVisible" width="60%" class="con-me modal">
      <el-form ref="form" :model="form" label-width="120px" :label-position="labelPosition">
        <el-form-item label="优惠券类型">
          <el-select v-model="form.region" placeholder="优惠券类型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="面额"
          :rules="[
                              { required: true, message: '请输入面额', trigger: 'blur' },
                              { type: 'number', message: '只能输入数值,限2位小数', trigger: ['blur', 'change'] }
                            ]"
        >
          <el-input v-model="form.name" placeholder="只能输入数值,限2位小数"></el-input>元
        </el-form-item>
        <el-form-item label="默认限额">
          <el-input v-model="form.name"></el-input>张
        </el-form-item>
        <el-form-item label="规则描述" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="总发行量">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="关联服务分类">
          <el-select v-model="form.region" placeholder>
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联商家">
          <el-radio-group v-model="form.resource">
            <el-radio label></el-radio>
            <el-select
              v-model="form.region"
              placeholder="指定商家"
              style="display: inline-block;margin-right: 30px;width: 60%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-radio label="全部"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="有效期：">
          <el-date-picker
            v-model="valueDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--目标用户发放-->
    <el-dialog title="目标用户发放" :visible.sync="dialogVisibleUser" width="60%">
      <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label>
                <span>当前剩余可发放券:20</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple-light">
              <el-form-item label="用户列表">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label>
                <el-button
                  @click="handleSearchList()"
                  size="small"
                  type="primary"
                  icon="el-icon-search"
                >搜索</el-button>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        ref="returnApplyTable"
        :data="list"
        style="width: 100%;"
        class="table-me"
        v-loading="listLoading"
      >
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="车牌号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="车机号" width="120">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="车架号" width="140" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="昵称" width="140" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="手机号码" width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="最后绑定时间" width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="最后连接时间" width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="归属机构" width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleUser = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleUser = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--等级发放-->
    <el-dialog title="等级发放" :visible.sync="dialogVisibleGrade" width="60%">
      <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label>
                <span>当前剩余可发放券:20</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple-light">
              <el-form-item label="用户列表">
                <el-select v-model="form.region" placeholder="用户列表">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleGrade = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleGrade = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--定量发放-->
    <el-dialog title="定量发放" :visible.sync="dialogVisibleRation" width="60%">
      <el-form ref="form" :model="form" label-width="80px" :label-position="labelPosition">
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label>
                <span>当前剩余可发放券:20</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple-light">
              <el-form-item label="用户列表">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label>
                <el-button
                  @click="handleSearchList()"
                  size="small"
                  type="primary"
                  icon="el-icon-search"
                >搜索</el-button>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        ref="returnApplyTable"
        :data="list"
        style="width: 100%;"
        class="table-me"
        v-loading="listLoading"
      >
        <el-table-column label="序号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="车牌号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="车机号" width="120">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="车架号" width="140" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="昵称" width="140" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="手机号码" width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="最后绑定时间" width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="最后连接时间" width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="归属机构" width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="发放数量" width="120" align="center">
          <template slot-scope="scope">
            <el-input-number
              v-model="num1"
              size="mini"
              @change="handleChangeCont"
              :min="1"
              :max="10"
            ></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleRation = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleRation = false">确 定</el-button>
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
      dialogVisibleUser: false,
      dialogVisibleGrade: false,
      dialogVisibleRation: false,
      labelPosition: "left",
      titleName: "服务分类列表",
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
    // 3.添加
    handleAdd() {
      this.titleName = "新增服务分类";
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
    //5.userGrant(目标用户发放)
    userGrant() {
      this.dialogVisibleUser = true;
    },
    //6.等级发放
    gradeGrant() {
      this.dialogVisibleGrade = true;
    },
    //7.定量发放
    rationGrant() {
      this.dialogVisibleRation = true;
    },
    //8.定量发放数量
    handleChangeCont(value) {
      console.log(value);
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



