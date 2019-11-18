<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <span class="icon"></span>首页
      </div>
    </div>
    <!-- 内容 -->
  </div>
</template>
<script>
import "@/api/homeindex";
import { formatDate } from "@/utils/date";

export default {
  name: "home",
  data() {
    return {
      
    };
  },
  created() {
    
  },
  filters: {
    formatTime(time) {
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  methods: {
    
  }
};
</script>
<style lang="scss">
.el-collapse {
  .el-collapse-item__header {
    padding-left: 16px !important;
  }
  .el-collapse-item__wrap {
    padding: 16px;
    padding-top: 0;
  }
}
.last {
  .el-collapse-item__header {
    position: relative;
  }
}
</style>
<style scoped>
  .app-container >>> .el-dialog__footer {
    padding-top: 30px;
  }
</style>
