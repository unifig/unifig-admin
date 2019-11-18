<template>
  <div class="app-container">
    <div class="header-me">
      <div class="header-title"><p></p>保险服务 - 事故还原</div>
      <div class="header-con">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="车牌号：">
            <el-input style="width: 130%" v-model="listQuery.plateNumber" class="input-width" placeholder="车牌号"></el-input>
            <!--<el-input v-model="listQuery.plateNumber" class="input-width" placeholder="检索内容"></el-input>-->
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
        <span class="color-main">事故还原列表</span>
        <!--<el-button size="mini" type="primary" class="btn-add el-icon-plus" @click="handleAdd()" style="margin-left: 20px"> 新增查询申请</el-button>-->
      </el-card>
      <el-table ref="returnApplyTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="序号" align="center" type="index" width="80"></el-table-column>
        <el-table-column label="案件号"  align="center">
          <template slot-scope="scope">
            {{scope.row.caseNumber}}
          </template>
        </el-table-column>
        <el-table-column label="车牌号"  align="center">
          <template slot-scope="scope">
            {{scope.row.plateNumber}}
          </template>
        </el-table-column>
        <el-table-column label="事故发生时间段"  align="center">
          <template slot-scope="scope">
            {{scope.row.accidentOccurrencePeriodStart|formatTime}} - {{scope.row.accidentOccurrencePeriodEnd|formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="审核结果"  align="center">
          <template slot-scope="scope">
            {{scope.row.status | levelFilter}}
          </template>
        </el-table-column>
        <el-table-column label="事故还原"  align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==0"
                       size="mini"
                       type="text"
                       style ="color: #409EFF"
                       @click="handlereason(scope.row)"> 审核
            </el-button>
            <el-button v-else-if="scope.row.status==1"
                       size="mini"
                       type="text"
                       style ="color:#DDA450"
                       @click="handleDetail(scope.row)">查看
            </el-button>
            <el-button v-else-if="scope.row.status==2"
                       size="mini"
                       type="text"
                       style ="color: red"
                       @click="handleDelete(scope.row)">删除
            </el-button>
            <el-button v-else style="display: none"></el-button>
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
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <!--新增查询申请-->
    <el-dialog title="新增查询申请" :visible.sync="dialogVisible">
      <el-form :model="addListQuery">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="案件号：">
                <el-input style="width: 203px" v-model="addListQuery.caseNumber" placeholder="案件号"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="保单号：">
                <el-input style="width: 203px" v-model="addListQuery.plateNumber" placeholder="保单号"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="事故发生段：">
                <el-date-picker
                  v-model="addListQuery.accidentOccurrencePeriodStart"
                  type="date"
                  placeholder="开始日期"
                >
                </el-date-picker>
                至
                <el-date-picker
                  v-model="addListQuery.accidentOccurrencePeriodEnd"
                  type="date"
                  placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSkuConfirm()">确 定</el-button>
      </div>
    </el-dialog>
    <!--查看-->
    <el-dialog title="查看事故详情" :visible.sync="handleDetailDialog">
      <el-table :data="listDetail" border>
        <el-table-column property="name" label="姓名" align="center">
          <template slot-scope="scope">
            {{scope.row.carName}}
          </template>
        </el-table-column>
        <el-table-column property="" label="电话" align="center">
          <template slot-scope="scope">
            {{scope.row.carPhone}}
          </template>
        </el-table-column>
        <el-table-column property="" label="车牌号" align="center">
          <template slot-scope="scope">
            {{scope.row.plateNumber}}
          </template>
        </el-table-column>
        <el-table-column property="" label="品牌" align="center">
          <template slot-scope="scope">
            {{scope.row.carBrand}}
          </template>
        </el-table-column>
        <el-table-column property="" label="车型" align="center">
          <template slot-scope="scope">
            {{scope.row.carType}}
          </template>
        </el-table-column>
        <el-table-column property="" label="车款" align="center">
          <template slot-scope="scope">
            {{scope.row.carStyle}}
          </template>
        </el-table-column>
        <el-table-column property="" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              style="color: #409EFF"
              @click="handlerestore(scope.row)">还原事故
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div :class="imgBlock">
        <img  :src="runningTrajectoryUrl">
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDetailDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleDetailDialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--审核-->
    <el-dialog title="审核" :visible.sync="handlereasonDialog" class="sg-sh" width="960px">
      <el-form :model="listReason" label-position="right" label-width="140px">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="案件号 :">
                <span class="bods">{{listReason.caseNumber}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="车牌号 :">
                <span class="bods">{{listReason.plateNumber}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="事故发生开始时间 :">
                <span class="bods">{{listReason.accidentOccurrencePeriodStart |formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="事故发生结束时间 :">
                <span class="bods">{{listReason.accidentOccurrencePeriodEnd |formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item label="申请时间 :">
              <span class="bods">{{listReason.applicationTime |formatTime}}</span>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item label="申请人 :">
              <span class="bods">{{listReason.applicant}}</span>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="所属机构 :" class="ssjg">
                <span class="bods">{{listReason.deptName}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="审核 :">
                <el-radio-group v-model="checkListQuery.status" size="small" @change="handleradio">
                  <el-radio label="1" >通过</el-radio>
                  <el-radio label="2" >不通过</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple sh-bz">
              <el-form-item label="备注 :">
                <el-input type="textarea" v-model="checkListQuery.reason" @change="handleblur"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handlereasonDialog = false">取 消</el-button>
        <el-button type="primary" @click="handlereasonDialogBtn()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { formatDate } from '@/utils/date';
  import {accidentestorelist,accidentestoreadd,accidentestoreupdate} from '@/api/insuranceService';
  const defaultListQuery = {
    keyword: null,
    pageNum: 1,
    pageSize:5,
    plateNumber:null
  };
  const defaultaddListQuery = {
    caseNumber: null,
    plateNumber:null,
    accidentOccurrencePeriodStart:null,
    accidentOccurrencePeriodEnd:null
  };
  const defaultacheckListQuery = {
    id:null,
    reason:null,
    status:1,
  };
  export default {
    name:'articleManage',
    data() {
      return {
        listQuery:Object.assign({},defaultListQuery),
        addListQuery:Object.assign({},defaultaddListQuery),
        checkListQuery:Object.assign({},defaultacheckListQuery),
        list:null,
        dialogVisible:false,
        handleDetailDialog:false,
        handlereasonDialog:false,
        total:null,
        listLoading:false,
        multipleSelection:[],
        operateType:1,
        imgBlock:'showHide',
        value6: '',
        listDetail:null,
        listDetailArr:[],
        runningTrajectoryUrl:'',
        listReason:{},
        checkBtn:2,


      }
    },
    created(){
      this.getList();
    },
    filters:{
      formatTime(time) {
        if(time==null||time===''){
          return '--';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd  hh:mm:ss')
      },
      levelFilter(value) {
        if (value === "1") {
          return '通过';
        } else if (value ==="0") {
          return '待审核';
        } else if (value === "2") {
          return '未通过';
        }
      }
    },
    methods:{
      //1.列表
      getList(){
        this.listLoading=true;
        accidentestorelist(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.count;
        });
      },
      //2.新增查询申请
      handleAdd(){
        this.dialogVisible = true

      },
      //点击确定按钮
      handleEditSkuConfirm(){
        var _this = this
        this.$confirm('是否确定新增', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          console.log(_this.addListQuery)
          accidentestoreadd(_this.addListQuery).then(response=>{
            console.log(response)
            this.$message({
              message: '保存成功',
              type: 'success',
              duration: 1000
            });
            _this.dialogVisible = false

          });
        });
      },
      //查看
      handleDetail(row){
        console.log(row)
        this.listDetailArr.length = 0
        this.imgBlock ='showHide'
        this.handleDetailDialog = true
        this.listDetailArr.push(row)
        this.listDetail=  this.listDetailArr
        this.runningTrajectoryUrl = row.runningTrajectoryUrl
        console.log( this.runningTrajectoryUrl)
      },
      //审核
      handlereason(row){
        console.log(row)
        this.handlereasonDialog = true
        this.listReason= row
        this.checkListQuery.id = row.id;
        this.checkListQuery.status = 0

      },
      //单选值
      handleradio(value){
        console.log(value)
        this.checkListQuery.status = value
      },
      //输入框值
      handleblur(value){
        console.log(value)
        this.checkListQuery.reason = value
      },
      //审核确定按钮
      handlereasonDialogBtn(){
        var _this = this
        this.$confirm('是否确定提交内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          accidentestoreupdate(_this.checkListQuery).then(response=>{
            console.log(response)
            this.$message({
              message: '提交成功',
              type: 'success',
              duration: 1000
            });
            _this.handlereasonDialog = false
            _this.getList();
          });
        });
      },
      //还原事故
      handlerestore(){
        this.imgBlock ='hideShow'
      },
      // 5.删除
      handleDelete(row){
        console.log(row)
        let id = row.id
        this.$confirm('是否要删除该数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'})
          .then(() => {
            console.log({isDelete:0,id: id})
            accidentestoreupdate({isDelete:0,id: id}).then(response => {
              this.$message({
                message: '删除成功',
                type: 'success',
                duration: 1000
              });
              this.getList();
            });
          });
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSizeChange(val){
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.pageNum = val;
        this.getList();
      },
      resetData() {
        this.listQuery = Object.assign({}, this.defaultListQuery);
        this.handleSearchList();
      },
    }
  }
</script>
<style scoped>
.input-width {
  width: 203px;
}
.el-checkbox-button{
  margin-right: 10px;
  border-left:1px solid #dcdfe6;
}
.el-checkbox-button:first-child{
  border-left:none;
}
.hideShow{
  display: block;
}
.showHide{
  display: none;
}
.el-textarea{
  width: 90%;
}
.bods{
  display: inline-block;
  width:80%;
  height:34px;
  border:1px solid rgba(238,238,238,1);
  border-radius:6px;
  line-height: 34px;
  padding-left: 10px;
}
.app-container >>> .el-dialog__footer {
  padding-top: 30px;
}
.app-container >>> .sg-sh .el-dialog__body {
  padding-bottom: 0;
}
.app-container >>> .sg-sh .el-form-item__content{
  height: 30px;
}
.app-container >>> .sg-sh .sh-bz .el-form-item__content{
  height: auto;
  width: auto;
}
.app-container >>> .sg-sh .sh-bz .el-textarea__inner{
  max-width: 700px;
  width: 685px;
}
.app-container >>> .ssjg .el-form-item__content .bods {
  white-space: nowrap;
  overflow: hidden;
}
</style>



