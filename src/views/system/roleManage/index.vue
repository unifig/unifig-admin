<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <i class="icon"></i>系统管理-角色
      </div>
      <el-form class="reset-form" :inline="true" :model="listQuery" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色名称：">
              <el-input v-model="listQuery.roleName" class="input-width" placeholder="角色名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="reset-search-groups">
              <el-button size="mini" @click="resetData" style="padding: 6px 23px;font-size: 16px">重置</el-button>
              <el-button
                type="primary"
                icon="el-icon-search"
                class="initbtn"
                size="mini"
                @click="getList"
                style="padding: 5px 12px;font-size: 16px"
              >搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="content-section clearfix mt20">
      <div class="table-title" style="padding-left: 20px;">
        <i class="el-icon-tickets"></i>
        角色列表
        <div class="right">
          <el-button type="primary" class="initbtn" size="mini" @click="goDetail">新增</el-button>
        </div>
      </div>
    </div>
    <!-- <el-card class="operate-container">
      <span>角色列表</span>
      <el-button type="primary" class="right" size="mini" @click="goDetail">新增</el-button>
    </el-card>-->

    <el-table
      ref="returnApplyTable"
      :data="list"
      style="width: 100%;"
      v-loading="listLoading"
      border
    >
      <el-table-column label="序号" width="90" type="index" align="center"></el-table-column>
      <el-table-column label="角色名称" width="180" align="center" prop="roleName"></el-table-column>
      <el-table-column label="所属机构" width="180" align="center" prop="deptName"></el-table-column>
      <el-table-column label="备注" align="center" prop="remark"></el-table-column>
      <el-table-column label="创建时间" width="180" align="center">
        <template slot-scope="scope">{{scope.row.createTime|formatTime}}</template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="update(scope.row.roleId)">修改</el-button>
          <el-button
            size="mini"
            type="text"
            class="color-danger"
            @click="delRole(scope.row.roleId)"
          >
            <span class="color-danger">删除</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import { roleList, deleteRole, updateRole } from "@/api/system";
const defaultListQuery = {
  page: 1,
  limit: 10,
  roleName: null
};
export default {
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: [],
      total: null,
      listLoading: false
    };
  },
  created() {
    this.getList();
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
    // 列表
    getList() {
      this.listLoading = true;
      roleList(this.listQuery).then(res => {
        this.listLoading = false;
        this.list = res.data;
        this.total = res.count;
      });
    },
    // 新增
    goDetail(id) {
      this.$router.push({ name: "roleDetail" });
    },
    // 修改
    update(id) {
      this.$router.push({ name: "roleDetail", params: { id: id } });
    },
    // 删除
    delRole(id) {
      this.$confirm("此操作将删除该角色，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        deleteRole({ ids: id }).then(res => {
          if (res.code == 200) {
            this.$message.success("删除成功");
            this.getList();
          } else {
            this.$message.error("删除出错");
          }
        });
      });
    },
    resetData() {
      this.listQuery.roleName = null;
      this.getList();
    },

    handleSizeChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.limit = val;
      this.getList();
    }
  }
};
</script>
<style lang="scss">
.initbtn {
  width: 80px;
  height: 30px;
  border-radius: 4px;
}
</style>


