<template>
  <div class="app-container">
    <div class="header-me">
      <div class="header-title">
        <p></p>保险服务 - 会员等级模板
      </div>
      <div class="header-con">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="等级名称：">
            <el-input style="width: 130%" v-model="listQuery.name" class="input-width" placeholder="等级名称"></el-input>
          </el-form-item>
          <el-form-item label style="float:right">
            <div class="reset-groups" style="right: 10px">
              <el-button size="mini" @click="resetData">重置</el-button>
              <el-button
                @click="handleSearchList()"
                size="small"
                type="primary"
                icon="el-icon-search"
              >搜索</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table-container con-me">
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span class="color-main">会员等级模板列表</span>
        <el-button size="mini" class="btn-add" @click="handleAdd(0)" style="border-color:#409EFF;margin-left: 20px;background-color:#409EFF;color: #ffffff">添加</el-button>
      </el-card>
      <el-table
        ref="returnApplyTable"
        :data="list"
        style="width: 100%;"
        v-loading="listLoading"
        border
      >
        <el-table-column label="等级名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="分类级别" align="center">
          <template slot-scope="scope">{{scope.row.classificationLevel}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="text"
              style="color: red"
              @click="handleDelete(scope.row)"
            >删除</el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleCheck(scope.row)"
              style="color:#DDA450"
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
            :current-page.sync="listQuery.pageNum"
            :page-size="listQuery.pageSize"
            :page-sizes="[5,10,15]"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!--增删改查-->
    <el-dialog class="flex-grade" title="会员等级模板" :visible.sync="dialogVisible" width="800px" >
      <el-form :model="memberGradeModel" label-width="120px" label-position="right" size="small">
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
            <el-form-item label="有效同步时间 ：">
              <el-radio-group v-model="memberGradeModel.isSynchro">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="点击上传 ：" class="upload-hy">
              <single-upload v-model="memberGradeModel.picture"></single-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="简述 ：" class="hymb-js">
              <el-input type="textarea" v-model="memberGradeModel.sketch"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-form-item style="margin-top: 36px" class="hide">
          <el-button v-if="handleType==2" size="medium" @click="dialogVisible=false">关闭</el-button>
          <el-button v-else size="medium" type="primary" @click="onSubmit()">提交</el-button>
          <el-button size="medium" @click="resetForm('addArticle')">重置</el-button>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
         <div v-if="handleType==2">
            <el-button  size="medium" @click="dialogVisible=false">关闭</el-button>
         </div>
        <div v-else>
            <el-button  size="medium" @click="dialogVisible=false">关闭</el-button>
            <el-button  size="medium" type="primary" @click="onSubmit()">提交</el-button>
          </div>
      </span>
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
    resetData() {
      this.listQuery = Object.assign({}, this.defaultListQuery);
      this.handleSearchList();
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
  width: 100%;
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
