<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <span class="icon"></span>车机出库 - 出库详情
      </div>
    </div>
    <div class="detail" v-if="info">
      <div class="agency-title">{{info.outDeptName}}机构</div>
      <div style="padding:20px">
        <el-row>
          <el-col :span="8" class="title-tip">收货机构：{{info.inputDeptName}}</el-col>
          <el-col :span="8" class="title-tip">出库日期：{{info.outTime|formatTime}}</el-col>
          <el-col :span="8" class="title-tip" style="text-align: right;">订单批次号：{{info.batchNumber}}</el-col>
        </el-row>
        <div style="margin-top: 20px">
          <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
          <span class="font-small">出库单</span>
        </div>
        <div class="section">
          <el-table border :data="data1" class="mt20">
            <el-table-column prop="name" label="产品名称" align="center"></el-table-column>
            <el-table-column prop="unit" label="单位" align="center"></el-table-column>
            <el-table-column prop="number" label="数量" align="center"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
          </el-table>
          <div class="section-title">
            <div></div>
            <div>客户签字：</div>
            <div>制单：</div>
            <div>审核：</div>
            <div></div>
          </div>
        </div>
        <div class="section mt20">
          <div style="margin-top: 20px">
            <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
            <span class="font-small">出库明细</span>
          </div>
          <el-table border :data="info.stockOrderItemList" class="mt20" max-height="200">
            <el-table-column label="序号" align="center" width="90" type="index"></el-table-column>
            <el-table-column prop="partsName" label="配件名称" align="center"></el-table-column>
            <el-table-column prop="vehicleNumber" label="车机号" align="center"></el-table-column>
            <el-table-column prop="vehicleSn" label="SN号" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="mt30 center">
          <!-- <el-button type="primary" size="small">打印出库单</el-button>
          <el-button type="primary" size="small">打印出库明细</el-button>-->
          <el-button size="small" @click="goBack" style="font-size: 16px;padding: 6px 23px !important;">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import { getOutDetail } from "@/api/vehicle";
import AddOutDialog from "./common/addOutDialog";
export default {
  components: { AddOutDialog },
  data() {
    return {
      id: this.$route.params.id,
      outDeptName: null,
      inputDeptName: null,
      outTime: null,
      batchNumber: null,
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
      ]
    };
  },
  created() {
    this.getInfo();
  },
  watch: {
    id() {
      this.getInfo();
    }
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
  methods: {
    goBack() {
      this.$router.push({ name: "engine-stock-out" });
    },
    // 1.详情
    getInfo() {
      getOutDetail({ id: this.id }).then(res => {
        // console.log(res.data, "出货单");
        let resData = res.data;
        this.info = resData;
        this.stockOrderItemList = resData.stockOrderItemList;
        this.data1[0].number = resData.vehicleEngineNumber;
        this.data1[1].number = resData.partsNumber;
        this.data1[2].number =
          resData.vehicleEngineNumber + resData.partsNumber;
        // var {inputDeptName} = {...resdata};
        // console.log(res.data, "ffff");
      });
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
    font-size: 30px;
    text-align: center;
  }
  .tip {
    font-size: 14px;
    line-height: 30px;
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
    margin: 30px auto;
    width: 80%;

    border: 1px solid #888;
    td,
    th {
      width: 30%;
      text-align: center;
      height: 40px;
      line-height: 40px;
      border: 1px solid #888;
    }
  }
  .agency-title {
    font-size: 20px;
    text-align: center;
    line-height: 80px;
    background: #f2f6fc;
  }

  .title-tip {
    line-height: 40px;
    font-size: 14px;
    // padding-left: 20px;
  }
  .mt30 .el-button--primary {
    padding: 8px 27px !important;
  }
}
</style>


