<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <span class="icon"></span>车机入库 - 详情
      </div>
      <div class="detail">
        <div class="agency-title">{{info.inputDeptName}}</div>
        <div style="padding:20px">
          <el-row>
            <el-col :span="8" class="table-tip" style="text-align:left">出货机构：{{info.outDeptName}}</el-col>
            <el-col :span="8" class="table-tip" style="text-align: center;">出库日期：{{info.outTime|formatTime}}</el-col>
            <el-col :span="8" class="table-tip" style="text-align:right">订单批次号：{{info.batchNumber}}</el-col>
          </el-row>
          <div style="padding-top: 20px;border-top: 1px solid #ddd;">
            <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
            <span class="font-small">入库单</span>
          </div>
          <div class="section">
            <el-table border :data="data1" class="mt20">
              <el-table-column prop="name" label="产品名称" align="center"></el-table-column>
              <el-table-column prop="unit" label="单位" align="center"></el-table-column>
              <el-table-column prop="number" label="数量" align="center"></el-table-column>
              <el-table-column prop="remark" label="备注" align="center"></el-table-column>
            </el-table>
          </div>
          <div class="mt20">
            <div class="flex">
              <div class="table-tip">客户签字：</div>
              <div class="table-tip">制单：</div>
              <div class="table-tip">审核：</div>
            </div>
          </div>
          <div class="section mt20" style="border-top: 1px solid #ddd;">
            <div style="margin-top: 20px;">
              <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
              <span class="font-small">出库明细</span>
            </div>
            <el-table border :data="stockOrderItemList" class="mt20" max-height="200">
              <el-table-column type="index" label="序号" align="center" width="90"></el-table-column>
              <el-table-column prop="partsName" label="配件名称" align="center"></el-table-column>
              <el-table-column prop="vehicleNumber" label="车机号" align="center"></el-table-column>
              <el-table-column prop="vehicleSn" label="SN号" align="center"></el-table-column>
            </el-table>
          </div>
          <div class="section mt20" style="border-top: 1px solid #ddd;">
            <div style="margin-top: 20px;">
              <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
              <span class="font-small">回执信息</span>
            </div>
            <el-table border :data="data3" class="mt20">
              <el-table-column prop="consigneeName" label="收货人" align="center"></el-table-column>
              <el-table-column prop="consigneeTime" label="收货时间" align="center"></el-table-column>
              <el-table-column prop="consigneeRemarks" label="备注" align="center"></el-table-column>
            </el-table>
          </div>
          <div class="mt30 center">
            <el-button size="small" @click="back" style="padding: 6px 23px;font-size: 16px;">返回</el-button>
            <el-button type="primary" size="small" @click="sure" style="padding: 6px 7px !important;" v-if="info.status == 1">确认收货</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import { getInDetail, surePutIn } from "@/api/vehicle";
import AddOutDialog from "./common/addOutDialog";
export default {
  components: { AddOutDialog },
  data() {
    return {
      status: null,
      info: null,
      data1: [
        {
          name: "车机",
          unit: "个",
          number: null,
          remark: ""
        },
        {
          name: "配件",
          unit: "个",
          number: null,
          remark: ""
        },
        {
          name: "合计",
          unit: "个",
          number: null,
          remark: ""
        }
      ],
      // 出库明细 -->stockOrderItemList
      stockOrderItemList: [],
      // 收货人
      data3: [
        {
          consigneeId: null,
          consigneeName: this.$store.state.user.name,
          consigneeTime: this.formatDate(new Date(), "yyyy-MM-dd"),
          consigneeRemarks: ""
        }
      ],
      id: this.$route.params.id
    };
  },
  filters: {
    formatTime(time) {
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      // 1.收货单详情
      getInDetail({ id: this.id }).then(res => {
        // console.log(res.data);
        this.status = res.data.status;
        let resData = res.data;
        this.stockOrderItemList = res.data.stockOrderItemList;
        this.info = res.data;
        this.data1[0].number = resData.vehicleEngineNumber;
        this.data1[1].number = resData.partsNumber;
        this.data1[2].number =
          resData.vehicleEngineNumber + resData.partsNumber;
      });
    },
    // 收货
    sure() {
      this.$confirm("是否要确认收货", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$router.push({ name: "engine-stock-in" });
        let params = {
          id: this.id,
          consigneeId: this.data3.consigneeId,
          consigneeName: this.data3.consigneeName,
          consigneeRemarks: this.data3.consigneeRemarks
        };
        // 2.收货
        surePutIn(params).then(res => {
          this.$router.push({ name: "engine-stock-in" });
        });
      });
    },
    // 返回
    back() {
      this.$router.push({ name: "engine-stock-in" });
    }
  }
};
</script>
<style lang="scss" scoped>
.detail {
  min-height: 100%;
  width: 80%;
  margin: 50px auto 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  .title {
    font-size: 20px;
    text-align: center;
    .tip {
      font-size: 14px;
      line-height: 40px;
    }
  }
  .section {
    .section-title {
      margin-top: 30px;
      display: flex;
      line-height: 40px;
      justify-content: space-between;
      align-items: center;
      font-size: #888;
      font-size: 14px;
      text-align: center;
    }
  }
  .auto-table {
    margin-top: 30px;
    width: 100%;
    border: 1px solid #888;
    td {
      width: 30%;
      text-align: center;
      height: 60px;
      line-height: 60px;
    }
  }

  .table-tip {
    line-height: 40px;
    font-size: 14px;
    // padding-left: 10px;
  }
  .agency-title {
    font-size: 20px;
    text-align: center;
    line-height: 80px;
    background: #f2f6fc;
  }
}
.mt30 .el-button--primary {
  font-size: 16px;
  padding: 6px 23px !important;
}
</style>


