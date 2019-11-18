<template>
  <div class="app-container">
    <div class="header-me">
      <div class="header-title">
        <p></p>公众号 -公众号信息管理
      </div>
      <div class="header-con">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="等级名称：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="等级名称"></el-input>
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
        <span class="color-main">内容列表</span>
        <el-button size="mini" class="btn-add" @click="handleAddactivity(0)" style="margin-left: 20px">新增活动</el-button>
        <el-button size="mini" class="btn-add" @click="handleAddtopic(0)" style="margin-left: 20px">新增话题</el-button>
      </el-card>
      <el-table
        ref="returnApplyTable"
        :data="list"
        style="width: 100%;"
        v-loading="listLoading"
        border
      >
        <el-table-column label="内容ID" align="center" min-width="120">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="内容摘要" align="center" min-width="120">
          <template slot-scope="scope">{{scope.row.classificationLevel}}</template>
        </el-table-column>
        <el-table-column label="类型" align="center" min-width="120">
          <template slot-scope="scope">{{scope.row.classificationLevel}}</template>
        </el-table-column>
        <el-table-column label="是否投票" align="center" min-width="120">
          <template slot-scope="scope">{{scope.row.classificationLevel}}</template>
        </el-table-column>
        <el-table-column label="评论数" align="center">
          <template slot-scope="scope">{{scope.row.classificationLevel}}</template>
        </el-table-column>
        <el-table-column label="浏览数" align="center">
          <template slot-scope="scope">{{scope.row.classificationLevel}}</template>
        </el-table-column>
        <el-table-column label="发表时间" align="center">
          <template slot-scope="scope">{{scope.row.classificationLevel}}</template>
        </el-table-column>
        <el-table-column label="属性" align="center">
          <template slot-scope="scope">{{scope.row.classificationLevel}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.classificationLevel}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="180">
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
    <el-dialog title="会员等级模板" :visible.sync="dialogVisible" width="60%">
      <el-form :model="memberGradeModel" label-width="180px"  size="small">
        <el-form-item label="名称：">
          <el-input v-model="memberGradeModel.name" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="分类级别：">
          <el-input v-model="memberGradeModel.classificationLevel" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="有效期同步保险有效时间：">
          <el-radio-group v-model="memberGradeModel.isSynchro">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="点击上传：">
          <single-upload v-model="memberGradeModel.picture"></single-upload>
        </el-form-item>
        <el-form-item label="简述：">
          <el-input type="textarea" v-model="memberGradeModel.sketch"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 36px" class="hide">
          <el-button v-if="handleType==2" size="medium" @click="dialogVisible=false">关闭</el-button>
          <el-button v-else size="medium" type="primary" @click="onSubmit()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--话题-->
    <el-dialog title="新增素材" :visible.sync="dialogVisibletopic" width="60%">
      <el-form :model="infoForm" label-width="80px" label-position="left" size="small">
          <div class="edit_container">
            <quill-editor v-model="infoForm.a_content"
                          ref="myQuillEditor"
                          class="editer"
                          :options="infoForm.editorOption"  @change="onEditorReady($event)">
            </quill-editor>
          </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibletopic = false">取 消</el-button>
          <el-button type="primary"  @click="handleEditSkuConfirm()">确 定</el-button>
      </span>
    </el-dialog>
    <!--活动-->
    <el-dialog title="新增活动" :visible.sync="dialogVisibleactivity" width="60%">
      <el-form :model="memberGradeModel"  label-width="140px" label-position="left" size="small">
        <el-form-item label="活动名称：">
          <el-input v-model="memberGradeModel.name"    class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="是否允许搜索：">
          <el-select  class="input-width"  v-model="listQuery.customerClassificationLevel" placeholder="是" clearable>
            <el-option
              v-for="item in verifyStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动属性：">
          <el-select class="input-width" v-model="listQuery.customerClassificationLevel" placeholder="活动属性" clearable>
            <el-option
              v-for="item in verifyStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动类型：">
          <el-select class="input-width" v-model="listQuery.customerClassificationLevel" placeholder="活动属性" clearable>
            <el-option
              v-for="item in verifyStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择模板：">
          <el-select  class="input-width"  v-model="listQuery.customerClassificationLevel" placeholder="活动属性" clearable>
            <el-option
              v-for="item in verifyStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组织人：">
          <el-input v-model="memberGradeModel.name" class="input-width"></el-input>
        </el-form-item>
        <el-form-item label="活动开始时间：">
          <el-date-picker
            v-model="listQuery.bindingTimeEnd"
            type="date"
            placeholder="活动开始时间"
            class="input-width"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动结束时间：">
          <el-date-picker
            v-model="listQuery.bindingTimeEnd"
            type="date"
            placeholder="活动结束时间"
            class="input-width"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报名截止时间：">
          <el-date-picker
            v-model="listQuery.bindingTimeEnd"
            type="date"
            placeholder="报名截止时间"
            class="input-width"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报名人数上限：">
          <el-input v-model="memberGradeModel.classificationLevel" class="input-width"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleactivity = false">取 消</el-button>
            <el-button type="primary"  @click="activityBtn()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {quillEditor}  from 'vue-quill-editor';//调用编辑器
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
  components: { quillEditor},
  name: "contentmanage",
  data() {
    return {
      labelPosition:'right',
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      memberGradeModel: Object.assign({}, defaultMemberGradeModel),
      operationQuery: "",
      handleType: "",
      fileList: [],
      dialogVisibletopic:false,
      dialogVisibleactivity:false,
      infoForm: {
        a_content:'',
        editorOption: {}
      },
      verifyStatusOptions: [{
        value: 1,
        label: '人保1'
      }, {
        value: 0,
        label: '人保2'
      }]
    };
  },
  created() {
    this.getList();
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
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
    //话题
    handleAddtopic(){
      this.dialogVisibletopic = true
    },
    onEditorReady(editor) {
      console.log(editor)
    },
    //活动
    handleAddactivity(){
      this.dialogVisibleactivity = true
    },
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
  },
};
</script>
<style scoped>
.input-width {
  width: 50%;
}
</style>

