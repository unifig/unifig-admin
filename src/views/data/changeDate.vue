<template>
  <div>
    <div class="time">
      <el-radio-group v-model="time" @change="changeTime" size="mini">
        <el-radio-button label="1">昨天</el-radio-button>
        <el-radio-button label="7">最近7天</el-radio-button>
        <el-radio-button label="30">最近30天</el-radio-button>
        <el-radio-button label="60">最近60天</el-radio-button>
      </el-radio-group>
      <el-date-picker
        size="mini"
        v-model="rangeTime"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="changeRangeTime"
      ></el-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: "1",
      rangeTime: [],
      startTime: null,
      endTime: null,
      nowTime: this.moment(new Date()).format("YYYY-MM-DD"),
      yesTime: this.moment(new Date())
        .add(-1, "day")
        .format("YYYY-MM-DD"),
      sevenTime: this.moment(new Date())
        .add(-7, "day")
        .format("YYYY-MM-DD"),
      thirtyTime: this.moment(new Date())
        .add(-1, "month")
        .format("YYYY-MM-DD"),
      sixyTime: this.moment(new Date())
        .add(-2, "month")
        .format("YYYY-MM-DD")
    };
  },
  methods: {
    changeTime(val) {
      let id = val * 1;
      this.rangeTime = [];
      this.endTime = this.nowTime;
      switch (id) {
        case 1:
          this.startTime = this.moment(new Date(this.yesTime)).format(
            "YYYY-MM-DD"
          );
          break;
        case 7:
          this.startTime = this.moment(new Date(this.sevenTime)).format(
            "YYYY-MM-DD"
          );

          break;
        case 30:
          this.startTime = this.moment(new Date(this.thirtyTime)).format(
            "YYYY-MM-DD"
          );

          break;
        case 60:
          this.startTime = this.moment(new Date(this.sixyTime)).format(
            "YYYY-MM-DD"
          );
          break;
      }

      this.$emit("changeTime", { start: this.startTime, end: this.endTime });
      //   console.log(this.startTime, this.endTime);
    },

    changeRangeTime(val) {
      this.time = null;
      this.startTime = this.moment(new Date(val[0])).format("YYYY-MM-DD");
      this.endTime = this.moment(new Date(val[1])).format("YYYY-MM-DD");
      this.$emit("changeTime", { start: this.startTime, end: this.endTime });
      //   console.log(this.startTime, this.endTime);
    }
  }
};
</script>
