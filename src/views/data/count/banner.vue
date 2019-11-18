<template>
  <div class="app-container">
    <el-card class="content-section">
      <div class="title">
        <i class="icon"></i>
        <span>数据统计-banner</span>
      </div>
    </el-card>
    <div class="content-section">
      <div class="small-title">
        banner点击次数统计：
        <el-select class="banner-input" v-model="bannerId" size="mini" @change="getData">
          <el-option v-for="(item) in bannerArr" :key="item" :value="item" :label="item"></el-option>
        </el-select>
        <change-time-view @changeTime="changeTime"></change-time-view>
      </div>
      <div class="data-image">
        <ve-line :data="bannerData"></ve-line>
      </div>
    </div>
  </div>
</template>
<script>
import { getBannerData } from "@/api/data";
import ChangeTimeView from "../changeDate";
export default {
  components: { ChangeTimeView },
  data() {
    return {
      bannerTime: null,
      bannerArr: [1, 2, 3],
      bannerId: null,
      bannerData: {
        columns: ["日期", "banner点击量"],
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
      getBannerData({
        startDate: this.startDate,
        stopDate: this.stopDate,
        bannerId: this.bannerId
      }).then(res => {
        let resData = res.data.readBannerCount;
        let xData = resData.x;
        let yData = resData.y;
        let rows = [];
        for (let i = 0, j = xData.length; i < j; i++) {
          rows[i] = { 日期: xData[i], banner点击量: yData[i] };
        }
        this.$nextTick(() => {
          this.bannerData.rows = rows;
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
  .app-container >>> .small-title .banner-input .el-input__inner{
    width: 240px;
    height: 30px;
    line-height: 30px;
  }
  .app-container >>> .el-card__body{
    padding-top: 0;
  }
</style>


