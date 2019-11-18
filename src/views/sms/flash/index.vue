<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div class="header-me">
        <div class="header-title"><p></p>营销 - 秒杀活动</div>
        <div class="header-con">
          <el-form :inline="true" :model="listQuery" size="small" label-width="120px" label-position="right">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="活动名称：">
                      <el-input v-model="listQuery.keyword" class="input-width" placeholder="活动名称" clearable></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label style="float:right">
                    <div class="reset-groups" style="right: 10px; margin-bottom: 10px">
                      <el-button size="mini"  @click="handleResetSearch()">重置</el-button>
                      <el-button
                        @click="handleSearchList()"
                        size="small"
                        type="primary"
                        icon="el-icon-search"
                      >搜索</el-button>
                    </div>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>秒杀活动列表</span>
      <el-button size="mini" type="primary" class="btn-add" @click="handleAdd()" style="margin-left: 20px;padding: 6px 7px;">添加活动</el-button>
      <el-button size="mini" type="primary" class="btn-add" @click="handleShowSessionList()" style="padding: 6px 7px;">秒杀时间段列表</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="flashTable" :data="list" style="width: 100%;" v-loading="listLoading" border>
        <!--<el-table-column type="selection" width="60" align="center"></el-table-column>-->
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="活动标题" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="活动状态" width="140" align="center">
          <template slot-scope="scope">{{scope.row |formatActiveStatus}}</template>
        </el-table-column>
        <el-table-column label="开始时间" width="140" align="center">
          <template slot-scope="scope">{{scope.row.startDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="结束时间" width="140" align="center">
          <template slot-scope="scope">{{scope.row.endDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="上线/下线" width="200" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleSelectSession(scope.$index, scope.row)"
            >设置商品</el-button>
            <el-button size="mini" type="text" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <el-dialog class="flex-flash" title="添加活动" :visible.sync="dialogVisible" width="40%">
      <el-form :model="flashPromotion" ref="flashPromotionForm" label-width="88px" size="small">
        <el-form-item label="活动标题 ：">
          <el-input v-model="flashPromotion.title" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="开始时间 ：">
          <el-date-picker v-model="flashPromotion.startDate" type="date" placeholder="请选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间 ：">
          <el-date-picker v-model="flashPromotion.endDate" type="date" placeholder="请选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="上线/下线 ：">
          <el-radio-group v-model="flashPromotion.status">
            <el-radio :label="1">上线</el-radio>
            <el-radio :label="0">下线</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchList,
  updateStatus,
  deleteFlash,
  createFlash,
  updateFlash
} from "@/api/flash";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
};
const defaultFlashPromotion = {
  id: null,
  title: null,
  startDate: null,
  endDate: null,
  status: 0
};
export default {
  name: "flashPromotionList",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      flashPromotion: Object.assign({}, defaultFlashPromotion),
      isEdit: false
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatActiveStatus(row) {
      let nowTime = new Date().getTime();
      if (nowTime >= row.startDate && nowTime <= row.endDate) {
        return "活动进行中";
      } else if (nowTime > row.endDate) {
        return "活动已结束";
      } else {
        return "活动未开始";
      }
    },
    formatDate(time) {
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.flashPromotion = Object.assign({}, defaultFlashPromotion);
    },
    handleShowSessionList() {
      this.$router.push({ path: "/sms/flashSession" });
    },
    handleStatusChange(index, row) {
      this.$confirm("是否要修改该状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          updateStatus(row.id, { status: row.status }).then(response => {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改"
          });
          this.getList();
        });
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该活动?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteFlash(row.id).then(response => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList();
        });
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.flashPromotion = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (this.isEdit) {
          updateFlash(this.flashPromotion.id, this.flashPromotion).then(
            response => {
              this.$message({
                message: "修改成功！",
                type: "success"
              });
              this.dialogVisible = false;
              this.getList();
            }
          );
        } else {
          createFlash(this.flashPromotion).then(response => {
            this.$message({
              message: "添加成功！",
              type: "success"
            });
            this.dialogVisible = false;
            this.getList();
          });
        }
      });
    },
    handleSelectSession(index, row) {
      this.$router.push({
        path: "/sms/selectSession",
        query: { flashPromotionId: row.id }
      });
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    }
  }
};
</script>
<style scoped>
  .input-width {
    width: 130%;
  }
  .app-container >>> .flex-flash .el-form-item--small {
    display: flex;
    justify-content:center;
  }
  .app-container >>> .flex-flash .el-form-item--small .el-form-item__content{
    margin-left: 0 !important;
  }
  .filter-container >>> .el-card__body{
    padding-bottom: 0;
    padding-top: 0;
  }
</style>


