<template>
  <div class="app-container">
    <el-card class="content-section">
      <div class="title">
        <i class="icon"></i>
        <span>数据统计-活动参与人数</span>
      </div>
    </el-card>
    <div class="content-section">
      <div class="small-title">
        活动参与人数统计：
        <el-select class="active-input" v-model="promotionId" size="mini" @change="getData">
          <el-option v-for="(item) in promotionArr" :key="item" :value="item" :label="item"></el-option>
        </el-select>
        <change-time-view @changeTime="changeTime"></change-time-view>
      </div>
      <div class="data-image">
        <ve-line :data="promotionData"></ve-line>
      </div>
    </div>
  </div>
</template>
<script>
import { getPromotionData } from "@/api/data";
import ChangeTimeView from "../changeDate";
export default {
  components: { ChangeTimeView },
  data() {
    return {
      promotionArr: [1, 2, 3],
      promotionId: null,
      promotionData: {
        columns: ["日期", "活动参与人数"],
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
      getPromotionData({
        startDate: this.startDate,
        stopDate: this.stopDate,
        promotionId: this.promotionId
      }).then(res => {
        let resData = res.data.joinPromotionCount;
        let xData = resData.x;
        let yData = resData.y;
        let rows = [];
        for (let i = 0, j = xData.length; i < j; i++) {
          rows[i] = { 日期: xData[i], 活动参与人数: yData[i] };
        }
        this.$nextTick(() => {
          this.promotionData.rows = rows;
        });
      });
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
  .app-container >>> .small-title .active-input .el-input__inner{
    width: 240px;
    height: 30px;
    line-height: 30px;
  }
  .app-container >>> .el-card__body{
    padding-top: 0;
  }
</style>


