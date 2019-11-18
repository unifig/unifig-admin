<template> 
  <div class="app-container">
    <!--搜索开始-->
    <div class="header-me">
      <div class="header-title"><p></p>保险服务 - 客户资料卡</div>
      <div class="header-con">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px" :label-position="labelPosition">
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="归属机构：">
                  <el-cascader
                    :options="deptArr"
                    v-model="outDeptId"
                    filterable
                    change-on-select
                    @change="changeOutDept"
                    size="medium"
                    style="width: 100%"
                  ></el-cascader>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="保单号：">
                  <el-input  style="width: 100%" v-model="listQuery.policyNumber" placeholder="保单号"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="车牌号：">
                  <el-input  style="width: 100%" v-model="listQuery.plateNumber" placeholder="车牌号"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <el-form-item label="用户等级：">
                  <el-select v-model="listQuery.customerClassificationLevel" placeholder="用户等级" clearable  style="width: 100%">
                    <el-option
                      v-for="item in userlevellist"
                      :key="item.createId"
                      :label="item.classificationLevel"
                      :value="item.classificationLevel">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8" style="float:right">
              <div class="reset-groups">
                <el-button size="mini" @click="resetData">重置</el-button>
                <el-button type="primary" icon="el-icon-search" size="mini"  @click="handleSearchList()">搜索</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!--搜索结束-->
    <div class="table-container con-me">
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span class="color-main">客户资料列表</span>
        <el-upload
          class="upload-demo"
          ref="upload"
          :on-change="upload"
          action="rh/customer/importCustomer"
          style="height: 50px;line-height: 50px;"
          :auto-upload="false">
          <el-button size="mini" type="primary" class="btn-add " style="margin-left: 20px">导入</el-button>
        </el-upload>
        <el-button size="mini" type="primary" class="btn-add " style="margin-left: 20px">
          <a href="https://api.yirisanxian.com/rb/file/view/5c9ecb06c9e77c0001950206">导入模板下载</a>
        </el-button>
        <!--<el-button size="mini" type="primary" class="btn-add " @click="handlecustomerDatalead()" style="margin-left: 20px"> 导入</el-button>-->
      </el-card>
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border
                :row-class-name="tableRowClassName"
      >
        <!--<el-table-column type="selection" width="60" align="center"></el-table-column>-->
        <el-table-column label="序号" align="center" type="index"  width="60">></el-table-column>
        <el-table-column label="车牌号" width="120" align="center">
          <template slot-scope="scope">
           {{scope.row.plateNumber}}
          </template>
        </el-table-column>
        <el-table-column label="交强险保单号" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.compulsoryPolicyNumber}}
          </template>
        </el-table-column>
        <el-table-column label="商业险保单号" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.commercialPolicyNumber}}
          </template>
        </el-table-column>
        <el-table-column label="用户等级" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.customerClassificationLevel}}
          </template>
        </el-table-column>
        <el-table-column label="交强险生效日期" width="140" align="center">
          <template slot-scope="scope">
            {{scope.row.compulsoryInsuranceStartDate|formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="交强险失效日期" width="140" align="center">
          <template slot-scope="scope">
            {{scope.row.compulsoryInsuranceEndDate|formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="商业险生效日期" width="140" align="center">
          <template slot-scope="scope">
            {{scope.row.commercialInsuranceStartDate|formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="商业险失效日期" width="140" align="center">
          <template slot-scope="scope">
           {{scope.row.commercialInsuranceEndDate|formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="归属机构" min-width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.deptName}}
          </template>
        </el-table-column>
        <el-table-column label="交强险剩余天数" min-width="140" align="center">
          <template slot-scope="scope">
            {{scope.row.compulsoryInsuranceDaysRemaining}}
          </template>
        </el-table-column>
        <el-table-column label="商业险剩余天数" min-width="140" align="center">
          <template slot-scope="scope">
            {{scope.row.commercialInsuranceDaysRemaining}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                style ="color: red"
                @click="handlecustomerDatadetails(scope.$index, scope.row)">续保
              </el-button>
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
    <!--续保弹框-->
    <el-dialog
      title="续保确认"
      :visible.sync="renewingCoverage.dialogVisible"
      width="60%">
      <el-form :model="renewingCoverage.renewingCoverageList"
               :label-position="labelPosition"
               label-width="195px"
      >
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="车牌号 ：">
                <span class="bods">{{renewingCoverage.renewingCoverageList.plateNumber}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="归属机构 ：">
                <span class="bods">{{renewingCoverage.renewingCoverageList.deptName}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="交强险生效日期 ：">
                <span class="bods">{{renewingCoverage.renewingCoverageList.compulsoryInsuranceStartDate|formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="商业险生效日期 ：">
                <span class="bods">{{renewingCoverage.renewingCoverageList.commercialInsuranceStartDate|formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="交强险失效日期 ：">
                <span class="bods">{{renewingCoverage.renewingCoverageList.compulsoryInsuranceEndDate|formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="商业险失效日期 ：">
                <span class="bods">{{renewingCoverage.renewingCoverageList.commercialInsuranceEndDate|formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="交强险剩余天数 ：">
                <span class="bods">{{renewingCoverage.renewingCoverageList.compulsoryInsuranceDaysRemaining}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="商业险剩余天数 ：">
                <span class="bods">{{renewingCoverage.renewingCoverageList.commercialInsuranceDaysRemaining}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="续交强险 ：">
                <el-radio-group @change="handleisCompulsoryInsurance"  v-model="renewingCoverage.isCompulsoryInsurance">
                  <el-radio :label="0" >是</el-radio>
                  <el-radio :label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="续商业险 ：">
                <el-radio-group @change="handleisCommercialInsuranceTe" v-model="renewingCoverage.isCommercialInsuranceTe">
                  <el-radio :label="0" >是</el-radio>
                  <el-radio :label="1" >否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <el-form-item label="续保周期 ：">
                <el-input-number  size="mini" v-model="renewingCoverage.renewalPeriod"  @change="handleChangeNum" :min="1" :max="10" label="描述文字"></el-input-number>
                <span style="padding-left: 5px;">年</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="续保后强险生效日期 ：">
                <span class="bods">{{renewingCoverage.compulsoryData |formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="续保后商业险生效日期 ：">
                <span class="bods">{{renewingCoverage.commercialData |formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="renewingCoverage.dialogVisible = false">取 消</el-button>
        <el-button type="primary"  @click="handleEditSkuConfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    customerDataList,
    customerDatalead,
    customerDatadetails,
    customerDataBtn,
    customerDataorganization,
    customergrend,
  } from '@/api/insuranceService'
  import { formatDate } from '@/utils/date';
  import XLSX from 'xlsx'
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    plateNumber: null,
    deptName: null,
    customerClassificationLevel: null,
    compulsoryPolicyNumber: null,
    commercialPolicyNumber: null,
  };
  const defaultListQuerylead ={
    plateNumber: null,
    customerClassificationLevel: null,
    compulsoryPolicyNumber: null,
    compulsoryInsuranceStartDate: null,
    compulsoryInsuranceEndDate: null,
    commercialPolicyNumber: null,
    commercialInsuranceStartDate:null ,
    commercialInsuranceEndDate: null
  }

  export default {
    data() {
      return {
        labelPosition:'right',
        outDeptId:'',
        valueDate: '',
        renewingCoverage:{
          dialogVisible:false,
          compulsoryData:'',  //继交强险失效日期 
          compulsoryInsuranceEndDate:'',
          commercialData:'',  //继交商业失效日期 
          commercialInsuranceEndDate:'',
          renewingCoverageList:[],
          renewalPeriod: 1,//续保周期
          isCommercialInsuranceTe:0,
          isCompulsoryInsurance:0
        },
        leadObj: Object.assign({}, defaultListQuerylead),
        leadObjArr:[],
        leadObjJson: {},
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        verifyStatusOptions: [{
          value: 1,
          label: '1'
        }, {
          value: 2,
          label: '2'
        },
          {
            value: 3,
            label: '3'
          }],
        deptArr:[
          {
          value: '1',
          label: '顶级机构',
          children: [{
            value: '2',
            label: '-级机构',
            children: [{
              value: '3',
              label: '二机机构'
            }, {
              value: '4',
              label: '二级机构'
            }]
          }],
        },
          {
            value: '1',
            label: '顶级机构',
            children: [{
              value: '2',
              label: '-级机构',
              children: [{
                value: '3',
                label: '二机机构'
              }, {
                value: '4',
                label: '二级机构'
              }]
            }],
          }
        ],
      }
    },
    created() {
      this.getList();
      this.userlevel()
      this.$store.dispatch("GetAllDeptme").then(res => {
        console.log(res, "机构列表");
        this.deptArr = res;
      });
    },
    //监听变化
    computed:{

    },
    filters:{
      formatTime(time) {
        if(time==null||time===''){
          return '--';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    methods: {
      //表格每行样式变红
      tableRowClassName({row, rowIndex}) {
        //console.log(row)
        if (parseInt(row.compulsoryInsuranceDaysRemaining) < 60 || parseInt(row.commercialInsuranceDaysRemaining) < 60) {
          return 'warning-row';
        }
        return '';
      },
      upload(file,fileList){
        console.log("file",file);
        console.log("fileList",fileList);
        let files = {0:file.raw}
        this.readExcel1(files);
      },
      readExcel1(files) {
        var that = this;
        that.leadObjArr.length =0
        if(files.length<=0){//如果没有文件名
          return false;
        }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
          this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
          return false;
        }
        const fileReader = new FileReader();
        fileReader.onload = (ev) => {
          console.log(ev)
          try {
            const data = ev.target.result;
            const workbook = XLSX.read(data, {
              type: 'binary'
            });
            const wsname = workbook.SheetNames[0];//取第一张表
            console.log(wsname)
            let ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
            console.log(ws)
            for (var i = 1; i < ws.length; i++) {
              that.leadObj=Object.assign({}, defaultListQuerylead)
              that.leadObj.plateNumber = ws[i].__EMPTY;
              that.leadObj.customerClassificationLevel = ws[i].__EMPTY_1;
              that.leadObj.compulsoryPolicyNumber = ws[i].__EMPTY_2;
              that.leadObj.compulsoryInsuranceStartDate = ws[i].__EMPTY_3;
              that.leadObj.compulsoryInsuranceEndDate = ws[i].__EMPTY_4;
              that.leadObj.commercialPolicyNumber = ws[i].__EMPTY_5;
              that.leadObj.commercialInsuranceStartDate = ws[i].__EMPTY_6;
              that.leadObj.commercialInsuranceEndDate = ws[i].__EMPTY_7;
              that.leadObjArr.push(that.leadObj)
            }
            console.log(that.leadObjArr)
            that.leadObjJson['customers'] =that.leadObjArr
            customerDatalead(that.leadObjJson).then(response => {
              console.log(response)
              if(response.success){
                this.getList()
                this.$message({
                  message: response.msg,
                  type: 'success',
                  duration: 1000
                });
                this.listLoading = false;
              }else{
                this.$message.error('导入失败')
              }

            });
            try{

            }catch(err){
              console.log(err)
            }

            this.$refs.upload.value = '';

          } catch (e) {

            return false;
          }
        };
        fileReader.readAsBinaryString(files[0]);
      },



  //列表渲染
      getList() {
        this.listLoading = true;
        customerDataList(this.listQuery).then(response => {
          console.log(response)
          this.listLoading = false;
          this.list = response.data;
          this.total = response.count;
        });
      },
      //机构参数
      changeOutDept(id) {
        this.listQuery.deptId = id[id.length - 1];
        this.getList();
      },
      Corganization() {
        var _this =this
        customerDataorganization({resultType:1}).then(response => {
          console.log(response.data.options)
          response.data.options.forEach(function(e,i){
            _this.deptArr[i].value = e.name
            _this.deptArr[i].value = e.deptId
            _this.deptArr[i].children = e.children
          })
         console.log( _this.deptArr)
        });
      },
      //用户等级
      userlevel(){
        var _this =this
        customergrend().then(response => {
          this.userlevellist = response.data
          console.log(response)
        });
      },
      //点击续保按钮
      handlecustomerDatadetails(index,row){
        console.log(row)
        this.renewingCoverage.dialogVisible=true;
        this.renewingCoverage.renewingCoverageList=row;
        this.renewingCoverage.renewalPeriod =1
        this.renewingCoverage.renewingCoverageList.isCommercialInsuranceTe =0
        this.renewingCoverage.renewingCoverageList.isCompulsoryInsurance=0
        //this.renewingCoverage.isCommercialInsuranceTe =1
        //this.renewingCoverage.isCompulsoryInsurance =1
        this.compulsoryInsuranceEndDate = this.renewingCoverage.renewingCoverageList.compulsoryInsuranceEndDate
        this.commercialInsuranceEndDate = this.renewingCoverage.renewingCoverageList.commercialInsuranceEndDate
        //默认续保周期一年
        if(this.compulsoryInsuranceEndDate){
          this.renewingCoverage.compulsoryData=31536000000+parseInt(this.compulsoryInsuranceEndDate) //继交强险生效日期 
        }else{
          this.renewingCoverage.compulsoryData =''
        }
       if(this.commercialInsuranceEndDate){
         this.renewingCoverage.commercialData=31536000000+parseInt(this.commercialInsuranceEndDate)
       }else{
         this.renewingCoverage.commercialData =''
       }


        console.log(this.compulsoryInsuranceEndDate)
        console.log( this.commercialInsuranceEndDate)
      },
      //续保周期
      handleChangeNum(value) {
        this.renewingCoverage.renewingCoverageList.renewalPeriod = parseInt(value)
        //继交商业
        if(this.renewingCoverage.renewingCoverageList.isCommercialInsuranceTe==0){
          this.renewingCoverage.commercialData=parseInt(value)*31536000000 + parseInt(this.commercialInsuranceEndDate) //继交商业生效日期
        }

        //继交强险
        if(this.renewingCoverage.renewingCoverageList.isCompulsoryInsurance==0){
          this.renewingCoverage.compulsoryData=parseInt(value)*31536000000 + parseInt(this.compulsoryInsuranceEndDate) //继交强险生效日期 

        }
      },
      //继交商业
      handleisCommercialInsuranceTe(value){
        console.log(value);
        if(value==1){
          this.renewingCoverage.commercialData= parseInt(this.commercialInsuranceEndDate)
        }else{
          this.renewingCoverage.commercialData=parseInt(this.renewingCoverage.renewingCoverageList.renewalPeriod)*31536000000 + parseInt(this.commercialInsuranceEndDate)
        }
        this.renewingCoverage.renewingCoverageList.isCommercialInsuranceTe =value

      },
      //继交强险
      handleisCompulsoryInsurance(value){
        console.log(value);
        if(value==1){
          this.renewingCoverage.compulsoryData= parseInt(this.compulsoryInsuranceEndDate)
        }else {
          this.renewingCoverage.compulsoryData=parseInt( this.renewingCoverage.renewingCoverageList.renewalPeriod)*31536000000 + parseInt(this.compulsoryInsuranceEndDate) //继交强险生效日期 
        }
        this.renewingCoverage.renewingCoverageList.isCompulsoryInsurance=value
      },
      //归属机构
      changeDept(id){
        console.log(id)
      },
      //搜索
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      //翻页
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
      //续保点击确定按钮
      handleEditSkuConfirm(){
        this.$confirm('是否确定续保', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.renewingCoverage.renewingCoverageList.afterRenewalCommercialInsuranceEndDate = this.renewingCoverage.commercialData
          this.renewingCoverage.renewingCoverageList.afterRenewalCompulsoryInsuranceEndDate=this.renewingCoverage.compulsoryData
          customerDataBtn(this.renewingCoverage.renewingCoverageList).then(response=>{
            this.$message({
              message: '续保成功',
              type: 'success',
              duration: 1000
            });
            this.renewingCoverage.dialogVisible=false;
            this.getList();
          });
        });
      },
      // 点击导入按钮
     /* handlecustomerDatalead() {
        customerDatalead(this.listQuery).then(response => {
          console.log(response)
          this.listLoading = false;

        });
      },*/
    }
  }
</script>
<style scoped>
  .el-table .warning-row {
    color: red;
  }
  .upload-demo{
    float: right;
  }
  .el-upload-list__item-name{
    display: none;
  }
  .bods{
    display: inline-block;
    width:100%;
    height:30px;
    border:1px solid rgba(238,238,238,1);
    border-radius:6px;
    line-height: 30px;
    padding-left: 10px;
  }
</style>



