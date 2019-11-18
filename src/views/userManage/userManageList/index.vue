<template>
  <div class="app-container">
    <div class="header-me">
      <div class="header-title">
        <p></p>用户管理 - 用户列表
      </div>
      <div class="header-con">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="存放机构：">
                  <el-cascader
                    :options="deptArr"
                    v-model="outDeptId"
                    filterable
                    change-on-select
                    @change="changeOutDept"
                    :clearable="true"
                    style="width: 100%"
                  ></el-cascader>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="车机号：">
                  <el-input style="width: 100%" v-model="listQuery.vehicleNumber" placeholder="车机号"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="昵称：">
                  <el-input style="width: 100%" v-model="listQuery.nickname" placeholder="昵称"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="绑定开始时间：">
                  <el-date-picker
                    v-model="listQuery.bindingTimeSatrt"
                    type="date"
                    placeholder="开始日期"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="绑定结束时间：">
                  <el-date-picker v-model="listQuery.bindingTimeEnd" type="date" placeholder="结束日期" style="width: 100%"></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="用户手机号：">
                  <el-input
                    v-model="listQuery.vehicleUserPhone"
                    placeholder="用户手机号"
                    style="width: 100%"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row></el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="链接开始时间：">
                  <el-date-picker
                    v-model="listQuery.lastConnectionTimeStart"
                    type="date"
                    placeholder="开始日期"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                <el-form-item label="链接结束时间：">
                  <el-date-picker
                    v-model="listQuery.lastConnectionTimeEnd"
                    type="date"
                    placeholder="结束日期"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <el-form-item label style="float:right">
                <div class="reset-groups" style="right: 10px;">
                  <el-button size="mini" @click="resetData">重置</el-button>
                  <el-button
                    @click="handleSearchList()"
                    size="small"
                    type="primary"
                    icon="el-icon-search"
                  >搜索</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row></el-row>
        </el-form>
      </div>
    </div>
    <div class="table-container con-me">
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span class="color-main">用户列表</span>
        <!--<el-button
          class="btn-add"
          @click="handleAddProduct()"
          size="mini" type="primary">
          导入
        </el-button>-->
      </el-card>
      <el-table ref="productTable" :data="list" style="width: 100%" v-loading="listLoading" border>
        <!--<el-table-column type="selection" width="60" align="center"></el-table-column>-->
        <el-table-column label="序号" align="center" type="index" width="60">></el-table-column>
        <el-table-column label="车牌号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.plateNumber}}</template>
        </el-table-column>
        <el-table-column label="车机号" width="140" align="center">
          <template slot-scope="scope">{{scope.row.vehicleNumber}}</template>
        </el-table-column>
        <el-table-column label="手机号" width="140" align="center">
          <template slot-scope="scope">{{scope.row.vehicleUserPhone}}</template>
        </el-table-column>
        <el-table-column label="车架号" width="170" align="center">
          <template slot-scope="scope">{{scope.row.frameNumber}}</template>
        </el-table-column>
        <el-table-column label="昵称" width="140" align="center">
          <template slot-scope="scope">{{scope.row.nickname}}</template>
        </el-table-column>
        <el-table-column label="用户等级" width="140" align="center">
          <template slot-scope="scope">{{scope.row.customerClassificationLevel}}</template>
        </el-table-column>
        <!-- <el-table-column label="保单号" width="140" align="center">
          <template slot-scope="scope">
            {{scope.row.originalPrice}}
          </template>
        </el-table-column>-->
        <el-table-column label="交强险保单号" width="140" align="center">
          <template slot-scope="scope">{{scope.row.compulsoryPolicyNumber}}</template>
        </el-table-column>
        <el-table-column label="交强险生效日期" width="140" align="center">
          <template slot-scope="scope">{{scope.row.compulsoryInsuranceStartDate |formatTime}}</template>
        </el-table-column>
        <el-table-column label="交强险失效日期" width="140" align="center">
          <template slot-scope="scope">{{scope.row.compulsoryInsuranceEndDate |formatTime}}</template>
        </el-table-column>
        <el-table-column label="商业险保单号" width="140" align="center">
          <template slot-scope="scope">{{scope.row.commercialPolicyNumber}}</template>
        </el-table-column>
        <el-table-column label="商业险生效日期" width="140" align="center">
          <template slot-scope="scope">{{scope.row.commercialInsuranceStartDate |formatTime}}</template>
        </el-table-column>
        <el-table-column label="商业险失效日期" width="140" align="center">
          <template slot-scope="scope">{{scope.row.commercialInsuranceEndDate |formatTime}}</template>
        </el-table-column>
        <el-table-column label="车辆品牌" width="140" align="center">
          <template slot-scope="scope">{{scope.row.vehicleBrand}}</template>
        </el-table-column>
        <el-table-column label="车型" width="140" align="center">
          <template slot-scope="scope">{{scope.row.vehicleType}}</template>
        </el-table-column>
        <el-table-column label="首次绑定时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.firstBindingTime |formatTime}}</template>
        </el-table-column>
        <el-table-column label="最后一次绑定时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.bindingTime |formatTime}}</template>
        </el-table-column>
        <el-table-column label="车机上线时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.lastOnLineTime |formatTime}}</template>
        </el-table-column>
        <el-table-column label="最后一次连接平台时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.lastConnectionTime |formatTime}}</template>
        </el-table-column>
        <el-table-column label="归属机构" min-width="200" align="center">
          <template slot-scope="scope">{{scope.row.deptName}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              style="color: red"
              @click="handleShowSkuEditDialog(scope.$index, scope.row)"
            >查看明细</el-button>
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
            :page-size="listQuery.pageSize"
            :page-sizes="[5,10,15]"
            :current-page.sync="listQuery.pageNum"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="用户详情" :visible.sync="dialogVisible" width="60%" class="myModal">
      <el-form :model="editSkuInfo" :label-position="labelPosition" label-width="165px">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="车牌号 ：">
                <span class="bods">{{editSkuInfo.plateNumber}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="车机号 ：">
                <span class="bods">{{editSkuInfo.vehicleNumber}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="手机号 ：">
                <span class="bods">{{editSkuInfo.vehicleUserPhone}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="车架号 ：">
                <span class="bods">{{editSkuInfo.vehicleNumber}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="昵称 ：">
                <span class="bods">{{editSkuInfo.nickname}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="用户等级 ：">
                <span class="bods">{{editSkuInfo.customerClassificationLevel}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="交强险保单号 ：">
                <span class="bods">{{editSkuInfo.compulsoryPolicyNumber}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="交强险生效日期 ：">
                <span class="bods">{{editSkuInfo.compulsoryInsuranceStartDate |formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="交强险失效日期 ：">
                <span class="bods">{{editSkuInfo.compulsoryInsuranceEndDate |formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="商业险保单号 ：">
                <span class="bods">{{editSkuInfo.commercialPolicyNumber}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="商业险生效日期 ：">
                <span class="bods">{{editSkuInfo.commercialInsuranceStartDate |formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="	商业险失效日期 ：">
                <span class="bods">{{editSkuInfo.commercialInsuranceEndDate |formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="	车辆品牌 ：">
                <span class="bods">{{editSkuInfo.vehicleBrand}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="	车辆型号 ：">
                <span class="bods">{{editSkuInfo.vehicleType}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="	首次绑定时间 ：">
                <span class="bods">{{editSkuInfo.firstBindingTime |formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="	最后绑定时间 ：">
                <span class="bods">{{editSkuInfo.bindingTime |formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="	最后上线时间 ：">
                <span class="bods">{{editSkuInfo.lastOnLineTime |formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="	最后连接时间 ：">
                <span class="bods">{{editSkuInfo.lastConnectionTime |formatTime}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="	归属机构 ：">
                <span class="bods">{{editSkuInfo.deptName}}</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { userManageList, userManagedetails } from "@/api/insuranceService";
import { deptArrChildren } from "@/api/dept";
import { formatDate } from "@/utils/date";
const defaultListQuery = {
  deptId: null,
  pageNum: 1,
  pageSize: 5,
  bindingTimeSatrt: null,
  bindingTimeEnd: null,
  lastConnectionTimeStart: null,
  lastConnectionTimeEnd: null,
  vehicleNumber: null,
  vehicleUserPhone: null,
  frameNumber: null,
  nickname: null
};
export default {
  data() {
    return {
      valueDate: "",
      editSkuInfo: {},
      labelPosition: "right",
      dialogVisible: false,
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: true,
      selectProductCateValue: null,
      productCateOptions: [],
      brandOptions: [],
      deptArr: [],
      verifyStatusOptions: [
        {
          value: 1,
          label: "人保1"
        },
        {
          value: 0,
          label: "人保2"
        }
      ]
    };
  },
  created() {
    // this.$store.dispatch("GetAllDept").then(res => {
    //   this.deptArr = res;
    // });
    deptArrChildren({ resultType: 1 }).then(res => {
      function deepMap(data) {
        for (let i = 0, j = data.length; i < j; i++) {
          data[i].label = data[i].name;
          data[i].value = data[i].deptId;
          if (data[i].children) {
            deepMap(data[i].children);
          }
        }
        return data;
      }
      this.deptArr = deepMap(res.data.options);
    });
    //this.getList();
  },
  filters: {
    formatTime(time) {
      if (time == null || time === "") {
        return "--";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  methods: {
    changeOutDept(id) {
      this.listQuery.deptId = id[id.length - 1];
      this.getList();
    },
    //列表渲染
    getList() {
      this.listLoading = true;
      userManageList(this.listQuery).then(response => {
        console.log(response);
        this.listLoading = false;
        this.list = response.data;
        this.total = response.data.total;
      });
    },
    //点击查看详情
    handleShowSkuEditDialog(index, row) {
      this.dialogVisible = true;
      userManagedetails({ id: row.id }).then(response => {
        //console.log(response)
        this.editSkuInfo = response.data;
      });
    },
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
    // 点击导入按钮
    handleAddProduct() {
      this.$router.push({ path: "/pms/addProduct" });
    }
  }
};
</script>
<style scoped>
.bods {
  display: inline-block;
  width: 100%;
  height: 30px;
  border: 1px solid rgba(238, 238, 238, 1);
  border-radius: 4px;
  line-height: 30px;
  padding-left: 10px;
}
.app-container >>> .el-form-item__content {
  height: 30px;
}
.app-container >>> .el-dialog__footer {
  padding-top: 10px;
}
</style>



