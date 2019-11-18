<template>
  <div class="app-container">
    <el-card class="content-section">
      <div class="title">
        <i class="icon"></i>
        <span>数据统计-文章阅读量</span>
      </div>
    </el-card>
    <div class="content-section">
      <div class="small-title">
        文章阅读量统计：
        <el-select class="article-input" v-model="articleId" size="mini" @change="getData">
          <el-option v-for="(item) in articleArr" :key="item" :value="item" :label="item"></el-option>
        </el-select>
        <change-time-view @changeTime="changeTime"></change-time-view>
      </div>
      <div class="data-image">
        <ve-line :data="articleData"></ve-line>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticleData } from "@/api/data";
import ChangeTimeView from "../changeDate";
export default {
  components: { ChangeTimeView },
  data() {
    return {
      articleArr: [1, 2, 3],
      articleId: null,
      articleData: {
        columns: ["日期", "文章阅读量"],
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
      getArticleData({
        startDate: this.startDate,
        stopDate: this.stopDate,
        articleId: this.articleId
      }).then(res => {
        let resData = res.data.readArticleCount;
        let xData = resData.x;
        let yData = resData.y;
        let rows = [];
        for (let i = 0, j = xData.length; i < j; i++) {
          rows[i] = { 日期: xData[i], 文章阅读量: yData[i] };
        }
        this.$nextTick(() => {
          this.articleData.rows = rows;
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
  .app-container >>> .small-title .article-input .el-input__inner{
    width: 240px;
    height: 30px;
    line-height: 30px;
  }
  .app-container >>> .el-card__body{
    padding-top: 0;
  }
</style>


