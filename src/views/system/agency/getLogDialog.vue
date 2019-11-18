<template>
  <div>
    <el-dialog :visible="visible" title="历史记录" :show-close="false" width="1000px">
      <el-table :data="dataList" border>
        <el-table-column label="序号" width="90" prop="id" type="index" align="center" fixed></el-table-column>
        <el-table-column label="机构代码" min-width="90" prop="deptId" align="center"></el-table-column>
        <el-table-column label="机构名称" min-width="120" prop="name" align="center"></el-table-column>
        <el-table-column label="上级机构" min-width="140" prop="parentName" align="center"></el-table-column>
        <el-table-column label="管理员账号" min-width="120" prop="userUsername" align="center"></el-table-column>
        <el-table-column label="创建时间" min-width="120" prop="createTime" align="center">
          <template slot-scope="scope">{{scope.row.createTime |formatTime}}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="90"
          prop="operateStatus"
          align="center"
          :formatter="formatStatus"
        ></el-table-column>
        <el-table-column label="操作时间" min-width="120" prop="operateTime" align="center">
          <template slot-scope="scope">{{scope.row.createTime |formatTime}}</template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer center">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="close">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
export default {
  data() {
    return {
      visible: false,
      dataList: []
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
  methods: {
    // 0:停用,1:正常2:修改密码3:创建)
    formatStatus(row) {
      let id = row.operateStatus;
      if (id == 0) {
        return "停用";
      } else if (id == 1) {
        return "正常";
      } else if (id == 2) {
        return "修改密码";
      } else if (id == 3) {
        return "创建";
      }
    },
    close() {
      this.visible = false;
    }
  }
};
</script>
<style scoped>
  .el-dialog__wrapper >>> .el-dialog__footer{
    padding-top: 30px;
  }
</style>


