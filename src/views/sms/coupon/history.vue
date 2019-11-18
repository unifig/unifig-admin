<template>
  <div class="content-section" style="margin-top: 70px;border-bottom: 0;">
    <div class="title">
      <span class="icon"></span>营销 - 查看优惠券
    </div>
    <div class="app-container" style="margin-top: 50px;">
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">名称</el-col>
          <el-col :span="4" class="table-cell-title">优惠券类型</el-col>
          <el-col :span="4" class="table-cell-title">可使用商品</el-col>
          <el-col :span="4" class="table-cell-title">使用门槛</el-col>
          <el-col :span="4" class="table-cell-title">面值</el-col>
          <el-col :span="4" class="table-cell-title">状态</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{coupon.name}}</el-col>
          <el-col :span="4" class="table-cell">{{coupon.type | formatType}}</el-col>
          <el-col :span="4" class="table-cell">{{coupon.useType | formatUseType}}</el-col>
          <el-col :span="4" class="table-cell">满{{coupon.minPoint}}元可用</el-col>
          <el-col :span="4" class="table-cell">{{coupon.amount}}元</el-col>
          <el-col :span="4" class="table-cell">{{coupon.endTime | formatStatus}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">有效期</el-col>
          <el-col :span="4" class="table-cell-title">总发行量</el-col>
          <el-col :span="4" class="table-cell-title">已领取</el-col>
          <el-col :span="4" class="table-cell-title">待领取</el-col>
          <el-col :span="4" class="table-cell-title">已使用</el-col>
          <el-col :span="4" class="table-cell-title">未使用</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="4"
            class="table-cell"
            style="font-size: 13px"
          >{{coupon.startTime|formatDate}}至{{coupon.endTime|formatDate}}</el-col>
          <el-col :span="4" class="table-cell">{{coupon.publishCount}}</el-col>
          <el-col :span="4" class="table-cell">{{coupon.receiveCount}}</el-col>
          <el-col :span="4" class="table-cell">{{coupon.publishCount-coupon.receiveCount}}</el-col>
          <el-col :span="4" class="table-cell">{{coupon.useCount}}</el-col>
          <el-col :span="4" class="table-cell">{{coupon.publishCount-coupon.useCount}}</el-col>
        </el-row>
      </div>
      <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button style="float:right;padding: 6px 7px !important;" type="primary" @click="handleSearchList()" size="small">查询搜索</el-button>
          <el-button style="float:right;margin-right: 20px;margin-left: 20px" @click="handleResetSearch()" type="primary" size="small">重置</el-button>
          <el-button style="float:right;" type="primary" @click="handleissue()" size="small">发放</el-button>
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
            <el-form-item label="使用状态：">
              <el-select v-model="listQuery.useStatus" placeholder="全部" clearable class="input-width">
                <el-option
                  v-for="item in useTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单编号：">
              <el-input v-model="listQuery.orderSn" class="input-width" placeholder="订单编号"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <div class="table-container">
        <el-table
          ref="couponHistoryTable"
          :data="list"
          style="width: 100%;"
          v-loading="listLoading"
          border
        >
          <el-table-column label="优惠码" width="160" align="center">
            <template slot-scope="scope">{{scope.row.code}}</template>
          </el-table-column>
          <el-table-column label="领取会员" width="140" align="center">
            <template slot-scope="scope">{{scope.row.memberNickname}}</template>
          </el-table-column>
          <el-table-column label="领取方式" width="100" align="center">
            <template slot-scope="scope">{{scope.row.getType | formatGetType}}</template>
          </el-table-column>
          <el-table-column label="领取时间" width="160" align="center">
            <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
          </el-table-column>
          <el-table-column label="当前状态" min-width="140" align="center">
            <template slot-scope="scope">{{scope.row.useStatus | formatCouponHistoryUseType}}</template>
          </el-table-column>
          <el-table-column label="使用时间"  min-width="160" align="center">
            <template slot-scope="scope">{{scope.row.useTime | formatTime}}</template>
          </el-table-column>
         <!-- <el-table-column label="订单编号" align="center">
            <template slot-scope="scope">{{scope.row.orderSn===null?'N/A':scope.row.orderSn}}</template>
          </el-table-column>-->
        </el-table>
      </div>
      <div class="pagination-container">
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
    <el-dialog title="优惠券发放用户" :visible.sync="handleDetailDialog" width="60%">
      <el-form :inline="true" :model="listQuery" size="small" label-width="68px" label-position="right">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="手机号：">
                <el-input v-model="listQuery.mobile" class="input-width" placeholder="手机号"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label style="float:right">
                <div class="reset-groups" style="right: 10px; margin-bottom: 10px">
                  <el-button size="mini"  @click="handleResetSearch()">重置</el-button>
                  <el-button
                    @click="handleSearchFFList()"
                    size="small"
                    type="primary"
                    icon="el-icon-search"
                    style="padding: 5px 12px !important;"
                  >搜索</el-button>
                </div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-table
      ref="returnApplyTable"
      :data="wxlist"
      style="width: 100%;"
      v-loading="listLoading"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="60" align="center"  ></el-table-column>
      <el-table-column label="手机号" min-width="180" align="center">
        <template slot-scope="scope">{{scope.row.mobile}}</template>
      </el-table-column>
      <el-table-column label="昵称" min-width="180" align="center">
        <template slot-scope="scope">{{scope.row.nickname}}</template>
      </el-table-column>
      <el-table-column label="头像" min-width="160" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" alt style="width: 40px;height: 40px;">
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="wxhandleSizeChange"
        @current-change="wxhandleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.page"
        :page-size="listQuery.limit"
        :page-sizes="[5,10,15]"
        :total="wxtotal"
      ></el-pagination>
    </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDetailDialog = false">取 消</el-button>
        <el-button type="primary"@click="handleEditSkuConfirm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import { getCoupon } from "@/api/coupon";
import {fetchList, coupongiveOut} from "@/api/couponHistory";
import { memberList } from "@/api/memberList";

const defaultTypeOptions = [
  {
    label: "全场赠券",
    value: 0
  },
  {
    label: "会员赠券",
    value: 1
  },
  {
    label: "购物赠券",
    value: 2
  },
  {
    label: "注册赠券",
    value: 3
  },
  {
    label: "服务券",
    value: 4
  }
];
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  useStatus: null,
  orderSn: null,
  couponId: null,
  nickname: null,
};
const defaultUseTypeOptions = [
  {
    label: "未使用",
    value: 0
  },
  {
    label: "已使用",
    value: 1
  },
  {
    label: "已过期",
    value: 2
  }
];
export default {
  name: "couponHistoryList",
  data() {
    return {
      coupon: {},
      listQuery: Object.assign({}, defaultListQuery),
      useTypeOptions: Object.assign({}, defaultUseTypeOptions),
      list: null,
      total: null,
      wxtotal: null,
      wxlist:null,
      listLoading: false,
      handleDetailDialog:false,
      userIdArr:[]
    };
  },
  created() {
    getCoupon(this.$route.query.id).then(response => {
      this.coupon = response.data;
    });
    this.listQuery.couponId = this.$route.query.id;
    this.getList();
  },
  filters: {
    formatType(type) {
      for (let i = 0; i < defaultTypeOptions.length; i++) {
        if (type === defaultTypeOptions[i].value) {
          return defaultTypeOptions[i].label;
        }
      }
      return "";
    },
    formatUseType(useType) {
      if (useType === 0) {
        return "全场通用";
      } else if (useType === 1) {
        return "指定分类";
      } else {
        return "指定商品";
      }
    },
    formatPlatform(platform) {
      if (platform === 1) {
        return "移动平台";
      } else if (platform === 2) {
        return "PC平台";
      } else {
        return "全平台";
      }
    },
    formatDate(time) {
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    formatStatus(endTime) {
      let now = new Date().getTime();
      if (endTime > now) {
        return "未过期";
      } else {
        return "已过期";
      }
    },
    formatGetType(type) {
      if (type === 1) {
        return "主动获取";
      } else {
        return "后台赠送";
      }
    },
    formatCouponHistoryUseType(useType) {
      if (useType === 0) {
        return "未使用";
      } else if (useType === 1) {
        return "已使用";
      } else {
        return "已过期";
      }
    },
    formatTime(time) {
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.listQuery.couponId = this.$route.query.id;
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSearchFFList() {
      this.listQuery.pageNum = 1;
      this.wxgetList();
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
    //用户接口wx
    wxgetList() {
      this.listLoading = true;
      memberList(this.listQuery).then(response => {
        console.log(response.data)
        this.listLoading = false;
        this.wxlist = response.data;
        this.wxtotal = response.count;
      });
    },
    //发放接口
    handleissue(){
      this.wxgetList()
      this.handleDetailDialog = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = [];
      for (let i = 0; i < val.length; i++) {
        if (this.multipleSelection.indexOf(val[i].userId) === -1) {
          this.multipleSelection.push({currentMemberId:'',currentMemberName:''})
          this.multipleSelection[i]['currentMemberId']=val[i].userId
          this.multipleSelection[i]['currentMemberName']=val[i].nickname
        }
      }
    },
    //续保点击确定按钮
  //{ "couponId": 37, "users": [ { "currentMemberId": 36, "currentMemberName": "郑佳良测试2" },{ "currentMemberId": 36, "currentMemberName": "郑佳良测试3" } ] }
    handleEditSkuConfirm(){
      this.$confirm('是否确定发放优惠券', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        //let  multipleSelectionstr =  this.multipleSelection.join(',')
        //console.log(multipleSelectionstr)
        coupongiveOut({couponId:this.listQuery.couponId,users:this.multipleSelection}).then(response=>{
          this.$message({
            message: '发放优惠券成功',
            type: 'success',
            duration: 1000
          });
          this.handleDetailDialog=false;
          this.getList()
          this.wxgetList()
        });
      });
    },
    wxhandleSizeChange(val) {
      this.wxgetList();
    },
    wxhandleCurrentChange(val) {
      this.wxgetList();
    },

  }
};
</script>
<style scoped>
.app-container {
  width: 80%;
  margin: 20px auto;
}

.filter-container {
  margin-top: 20px;
}

.table-layout {
  margin-top: 20px;
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
}

.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}

.table-cell-title {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  background: #f2f6fc;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
</style>


