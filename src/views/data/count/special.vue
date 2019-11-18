<template>
  <div class="app-container">
    <el-card class="content-section">
      <div class="title">
        <i class="icon"></i>
        <span>数据统计-专项页面</span>
      </div>
    </el-card>
    <!--  -->
    <div class="content-section">
      <div class="small-title">
        专享页面点击次数统计数据
        <change-time-view @changeTime="changeTime"></change-time-view>
      </div>
      <div class="data-image">
        <ve-line :data="vipData"></ve-line>
      </div>
    </div>
    <!--  -->
  </div>
</template>
<script>
import { getVipData } from "@/api/data.js";
import ChangeTimeView from "../changeDate";
export default {
  components: { ChangeTimeView },
  data() {
    return {
      vipData: {
        columns: ["日期", "专享页点击量"],
        rows: []
      },
      startDate: this.moment(new Date())
        .add(-1, "day")
        .format("YYYY-MM-DD"),
      stopDate: this.moment(new Date())
        .add(-1, "day")
        .format("YYYY-MM-DD")
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getVipData({ startDate: this.startDate, stopDate: this.stopDate }).then(
        res => {
          let resData = res.data.clinkVippageCount;
          let xData = resData.x;
          let yData = resData.y;
          let rows = [];
          for (let i = 0, j = xData.length; i < j; i++) {
            rows[i] = { 日期: xData[i], 专享页点击量: yData[i] };
          }
          this.$nextTick(() => {
            this.vipData.rows = rows;
          });
        }
      );
    },
    changeTime({ start, end }) {
      this.startDate = start;
      this.stopDate = end;
      this.getData();
    }
  }
};
</script>
<style scoped>
.app-container >>> .el-card__body{
  padding-top: 0;
}
</style>


