<template>
  <div class="app-container">
    <div class="header-me">
      <div class="header-title"><p></p>保险服务 - 非顶级权限</div>
      <div class="header-con">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="车牌号：">
            <el-input style="width: 130%" v-model="listQuery.plateNumber" class="input-width" placeholder="车牌号"></el-input>
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
        <span class="color-main">非顶级权限列表</span>
        <el-button size="mini" type="primary" class="btn-add el-icon-plus" @click="handleAdd()" style="margin-left: 20px"> 新增查询申请</el-button>
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
                      >
            </el-button>
            <el-button v-else-if="scope.row.status==1"
                       size="mini"
                       type="text"
                       style ="color:#DDA450"
                       @click="handleDetail(scope.row)">查看详情
            </el-button>
            <el-button v-else-if="scope.row.status==2"
                       size="mini"
                       type="text"
                       style ="color: red"
                       @click="handlereason(scope.row)">查看原因
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
    <el-dialog title="新增查询申请" class="xzcxxq" :visible.sync="dialogVisible" width="960px">
      <el-form :model="addListQuery"
               :rules="rules"
               ref="formName"
               label-width="150px"
               width="60%"
      >
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="案件号："  prop="caseNumber">
                <el-input v-model="addListQuery.caseNumber" placeholder="案件号"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="车牌号：" prop="plateNumber">
                <el-input v-model="addListQuery.plateNumber" placeholder="车牌号"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="开始时间：" prop="accidentOccurrencePeriodStart">
                <el-date-picker
                  v-model="addListQuery.accidentOccurrencePeriodStart"
                  type="datetime"
                  placeholder="开始时间"
                >
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="结束时间：" prop="accidentOccurrencePeriodEnd">
                <el-date-picker
                  v-model="addListQuery.accidentOccurrencePeriodEnd"
                  type="datetime"
                  placeholder="结束时间">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('formName')">确 定</el-button>
      </div>
    </el-dialog>
    <!--查看详情-->
    <el-dialog class="look-sg-detail" title="查看事故详情" :visible.sync="handleDetailDialog">
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
        <img style="height: 80px" :src="runningTrajectoryUrl">
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDetailDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleDetailDialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--查看原因-->
    <el-dialog title="查看事故原因" :visible.sync="handlereasonDialog">
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
              <el-form-item label="车牌号  :">
                <span class="bods">{{listReason.plateNumber}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="事故发生时间段  :">
                <span class="bods">{{listReason.accidentOccurrencePeriodStart |formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="事故发生时间段  :">
                <span class="bods">{{listReason.accidentOccurrencePeriodEnd |formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <el-form-item label="申请时间  :">
                <span class="bods">{{listReason.applicationTime |formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="原因  :">
                <span class="bods">{{listReason.reason}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handlereasonDialog = false">取 消</el-button>
        <el-button type="primary" @click="handlereasonDialog = false">确 定</el-button>
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
  export default {
    data() {
      return {
        listQuery:Object.assign({},defaultListQuery),
        addListQuery:Object.assign({},defaultaddListQuery),
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
        rules: {
          caseNumber: [
            {required: true, message: '请填写正确的案件号', trigger: 'blur'}
          ],
          accidentOccurrencePeriodStart: [
            {required: true, message: '请选择正确的事故开始日期和结束日期', trigger: 'blur'}
          ],
          accidentOccurrencePeriodEnd: [
            {required: true, message: '事故发生结束时间', trigger: 'blur'}
          ],
          plateNumber: [
            {required: true, message: '请填写正确的保单号', trigger: 'blur'}
          ]
        },

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
          console.log(response)
          this.listLoading = false;
          this.list = response.data;
          this.total = response.count;
        });
      },
      //2.新增查询申请
      handleAdd(){
        this.dialogVisible = true
        this.addListQuery=Object.assign({},defaultaddListQuery)
      },
      //点击确定按钮
      onSubmit(formName){
        var _this = this
        _this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.$confirm('是否确定新增', '提示', {
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
                this.getList();

              });
            });
          }

        });


      },
      //查看详情
      handleDetail(row){
        console.log(row)
        this.listDetailArr.length = 0
        this.imgBlock ='showHide'
        this.handleDetailDialog = true
        this.listDetailArr.push(row)
        this.listDetail=  this.listDetailArr
        this.runningTrajectoryUrl = row.runningTrajectoryUrl
      },
      //查看原因
      handlereason(row){
        console.log(row)
        this.handlereasonDialog = true
        this.listReason= row

      },
      //还原事故
      handlerestore(){
        this.imgBlock ='hideShow'
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
.el-form-item__error{
  left:20%;
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
.app-container >>> .el-dialog__body .el-form-item__content {
  width: auto;
}
.app-container >>> .look-sg-detail .el-dialog__footer {
  padding-top: 30px;
}
.app-container >>> .xzcxxq .el-input{
  width: 240px;
  height: 30px;
  line-height: 30px;
}
.app-container >>> .xzcxxq .el-form-item{
 margin-bottom: 10px;
}
.app-container >>> .xzcxxq .el-input__inner{
  width: 240px;
  height: 30px;
  line-height: 30px;
}
.app-container >>> .xzcxxq .el-input__icon{
  line-height: 30px;
}
.app-container >>> .xzcxxq .el-dialog__footer{
  padding-top: 30px;
}
.app-container >>> .xzcxxq .el-dialog__body{
  padding-bottom: 0;
}
</style>



