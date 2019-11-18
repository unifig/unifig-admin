<template>
  <div class="app-container">
    <el-card class="content-section">
      <div class="title">
        <i class="icon"></i>
        <span>数据统计-导航栏</span>
      </div>
    </el-card>
    <div class="content-section">
      <div class="small-title">
        导航点击次数统计：
        <el-select class="navigation-input" v-model="navId" size="mini" @change="getData">
          <el-option v-for="(item) in navArr" :key="item" :value="item" :label="item"></el-option>
        </el-select>
        <change-time-view @changeTime="changeTime"></change-time-view>
      </div>
      <div class="data-image">
        <ve-line :data="navData"></ve-line>
      </div>
    </div>
  </div>
</template>
<script>
import { getNaviData } from "@/api/data";
import ChangeTimeView from "../changeDate";
export default {
  components: { ChangeTimeView },
  data() {
    return {
      navTime: null,
      navArr: [1, 2, 3],
      navId: 1,
      navData: {
        columns: ["日期", "导航点击量"],
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
      getNaviData({
        startDate: this.startDate,
        stopDate: this.stopDate,
        navigationId: this.navId
      }).then(res => {
        let resData = res.data.joinNavigationCount;
        let xData = resData.x;
        let yData = resData.y;
        let rows = [];
        for (let i = 0, j = xData.length; i < j; i++) {
          rows[i] = { 日期: xData[i], 导航点击量: yData[i] };
        }
        this.$nextTick(() => {
          this.navData.rows = rows;
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
  .app-container >>> .small-title .navigation-input .el-input__inner{
    width: 240px;
    height: 30px;
    line-height: 30px;
  }
  .app-container >>> .el-card__body{
    padding-top: 0;
  }
</style>


