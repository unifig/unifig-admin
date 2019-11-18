<template>
  <div class="app-container">
    <div class="header-me">
      <div class="header-title">
        <p></p>公众号 -公众号信息管理
      </div>
    </div>
    <div class="table-container con-me">
      <el-card class="operate-container" shadow="never">
        <span class="color-main">公众号信息管理</span>
      </el-card>
      <el-table
        ref="returnApplyTable"
        :data="list"
        style="width: 100%;"
        v-loading="listLoading"
        border
      >
        <el-table-column label="公众号" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="公众号名称" align="center">
          <template slot-scope="scope">{{scope.row.classificationLevel}}</template>
        </el-table-column>
        <el-table-column label="公众号Logo" align="center">
          <template slot-scope="scope">{{scope.row.classificationLevel}}</template>
        </el-table-column>
        <el-table-column label="公众号封面" align="center">
          <template slot-scope="scope">{{scope.row.classificationLevel}}</template>
        </el-table-column>
        <el-table-column label="公众号描述" align="center">
          <template slot-scope="scope">{{scope.row.classificationLevel}}</template>
        </el-table-column>
        <el-table-column label="管理" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.row)">修改信息</el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleCheck(scope.row)"
              style="color:#DDA450"
            >公众号设置</el-button>
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
            :current-page.sync="listQuery.pageNum"
            :page-size="listQuery.pageSize"
            :page-sizes="[5,10,15]"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!--增删改查-->
    <el-dialog class="flex-grade" title="会员等级模板" :visible.sync="dialogVisible" width="800px">
      <el-form :model="memberGradeModel" label-width="180px" label-position="right" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称 ：">
              <el-input v-model="memberGradeModel.name" class="input-width"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分类级别 ：">
              <el-input v-model="memberGradeModel.classificationLevel" class="input-width"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="有效同步时间：">
              <el-radio-group v-model="memberGradeModel.isSynchro">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="点击上传：">
              <single-upload v-model="memberGradeModel.picture"></single-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="简述：">
              <el-input type="textarea" v-model="memberGradeModel.sketch"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin-top: 36px;margin-bottom: 20px;" class="hide">
          <el-button size="medium" @click="dialogVisible=false" style="width: 110px;height: 40px;padding: 0 !important;border-radius: 20px;">关闭</el-button>
          <el-button size="medium" type="primary" @click="onSubmit()" style="width: 110px;height: 40px;padding: 0 !important;border-radius: 20px;">提交</el-button>
          <!--<el-button size="medium" @click="resetForm('addArticle')">重置</el-button>-->
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import SingleUpload from "@/components/Upload/singleUpload";
import Tinymce from "@/components/Tinymce";
import {
  memberGradeList,
  memberGradeAdd,
  memberGradeEdit,
  memberGradeCheck,
  memberGradeDelete
} from "@/api/insuranceService";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5
};
const defaultMemberGradeModel = {
  picture: null,
  name: null,
  sketch: null,
  isSynchro: null,
  fileUrl: null,
  thumb: null,
  id: null
};
export default {
  components: { Tinymce },
  components: { SingleUpload },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      multipleSelection: [],
      dialogVisible: false,
      memberGradeModel: Object.assign({}, defaultMemberGradeModel),
      operationQuery: "",
      handleType: "",
      fileList: []
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
    //1.列表
    getList() {
      this.listLoading = true;
      memberGradeList(this.listQuery).then(response => {
        console.log(response);
        this.listLoading = false;
        this.list = response.data;
        this.total = response.count;
      });
    },
    // 2.添加
    handleAdd() {
      this.handleType = 0;
      this.dialogVisible = true;
      this.memberGradeModel = Object.assign({}, defaultMemberGradeModel);
      console.log(this.memberGradeModel.thumb);
      /* this.memberGradeModel.thumb ='';
         this.memberGradeModel.fileUrl = '';*/
    },
    // 3. 改
    handleEdit(id) {
      console.log(id);
      this.handleType = 1;
      this.dialogVisible = true;
      this.operationQuery = id.id;
      memberGradeCheck({ id: id.id }).then(response => {
        this.memberGradeModel = response.data;
        console.log(this.memberGradeModel.isSynchro);
      });
    },
    // 4. 查
    handleCheck(id) {
      this.handleType = 2;
      this.dialogVisible = true;
      console.log(id);
      memberGradeCheck({ id: id.id }).then(response => {
        this.memberGradeModel = response.data;
      });
    },
    // 5.删除
    handleDelete(id) {
      this.handleType = 3;
      this.$confirm("是否要删除该模板", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        memberGradeDelete({ id: id.id, isDelete: 0 }).then(response => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000
          });
          this.getList();
        });
      });
    },
    //6.添加 修改 确定按钮
    onSubmit() {
      var _this = this;
      this.$confirm("是否提交数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //添加
        if (this.handleType == 0) {
          memberGradeAdd(_this.memberGradeModel).then(res => {
            if (res.success) {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 1000
              });
              _this.dialogVisible = false;
              _this.getList();
            }
          });
        }
        //更新
        else if (this.handleType == 1) {
          this.memberGradeModel.id = this.operationQuery;
          this.memberGradeModel.isDelete = 1;
          memberGradeEdit(_this.memberGradeModel).then(res => {
            if (res.success) {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 1000
              });
              _this.dialogVisible = false;
              _this.getList();
            }
          });
        }
      });
    },
    //搜索查询
    handleSearchList() {
      this.listQuery.page = 1;
      this.getList();
    },
    //翻页
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    // 图片上传成功
    handleSuccess(res) {
      this.memberGradeModel.fileUrl = res;
      this.memberGradeModel.thumb = res;
    }
  }
};
</script>
<style scoped>
.input-width {
  width: 203px;
}
.app-container >>> .flex-grade .el-form-item--small {
  display: flex;
  justify-content:left;
}
.app-container >>> .upload-hy .el-upload-list__item {
  margin-top: 0;
}
.app-container >>> .flex-grade .el-form-item--small .el-form-item__content{
  margin-left: 0 !important;
}
.app-container >>> .el-dialog .el-dialog__body .el-form-item__content {
  height: auto !important;
}
.app-container >>> .el-dialog .hymb-js .el-form-item__content {
  width: 610px;
}
.app-container >>> .el-dialog .hymb-js .el-input--small {
  width: 610px;
}
.app-container >>> .el-dialog .hymb-js .el-textarea__inner {
  width: 610px;
  height: 70px;
  max-height: 70px;
}
</style>
