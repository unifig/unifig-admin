<template>
  <div class="app-container">
    <div class="header-me">
      <div class="header-title">
        <p></p>公众号管理 - 公众号添加
      </div>
    </div>
    <div class="table-container con-me">
      <el-card class="operate-container" shadow="never">
        <span class="color-main">公众号添加</span>
      </el-card>
      <div class="conBox">
        <el-form :model="memberGradeModel" label-width="180px" label-position="right" size="small">
          <el-form-item label="公众号：">
            <el-input v-model="memberGradeModel.name" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="公众号名称：">
            <el-input v-model="memberGradeModel.name" class="input-width"></el-input>
          </el-form-item>
          <el-form-item label="公众号Logo：">
            <single-upload v-model="memberGradeModel.picture"></single-upload>
          </el-form-item>
          <el-form-item label="公众号封面：">
            <single-upload v-model="memberGradeModel.picture"></single-upload>
          </el-form-item>
          <el-form-item label="公众号描述：">
            <el-input type="textarea" v-model="memberGradeModel.sketch"></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 36px" class="hide">
            <el-button v-if="handleType==2" size="medium" @click="dialogVisible=false">关闭</el-button>
            <el-button v-else size="medium" type="primary" @click="onSubmit()">提交</el-button>
            <!--<el-button size="medium" @click="resetForm('addArticle')">重置</el-button>-->
          </el-form-item>
        </el-form>
      </div>
    </div>
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
.conBox {
  /*background-color: #fff;*/
  padding: 20px;
}
</style>
