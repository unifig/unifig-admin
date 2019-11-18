<template>
  <div class="app-container">
    <div class="header-me">
      <div class="header-title">
        <p></p>保险服务 - 保险风险数据
      </div>
      <div class="header-con">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="车牌号：">
            <el-input style="width: 130%" v-model="listQuery.plateNumber" class="input-width" placeholder="车牌"></el-input>
          </el-form-item>
          <el-form-item label style="float:right">
            <div class="reset-groups" style="right: 10px">
              <el-button size="mini" @click="resetData">重置</el-button>
              <el-button
                @click="handleSearchList()"
                size="small"
                type="primary"
                icon="el-icon-search"
              >搜索</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table-container con-me">
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span class="color-main">保险风险数据列表</span>
        <el-button
          size="mini"
          type="primary"
          class="btn-add"
          @click="handleAdd()"
          style="margin-left: 20px"
        >自定义风格数据模板</el-button>
      </el-card>
      <!--<el-table ref="productTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
        <el-table-column label="序号" align="center" type="index"  width="60">></el-table-column>
        <el-table-column label="车牌号" width="120" align="center"  :class="rowsheade.isplateNumber">
          <template slot-scope="scope">
            {{scope.row.plateNumber}}
          </template>
        </el-table-column>
        <el-table-column label="在网时长/天" min-width="120" align="center" :class="rowsheade.istimeSpentOnline">
          <template slot-scope="scope">
            {{scope.row.timeSpentOnline}}
          </template>
        </el-table-column>
        <el-table-column label="行驶天数" min-width="120" align="center" :class="rowsheade.isdrivingDays">
          <template slot-scope="scope">
            {{scope.row.drivingDays}}
          </template>
        </el-table-column>
        <el-table-column label="行驶里程/公里" min-width="120" align="center" :class="rowsheade.isdrivingMileage">
          <template slot-scope="scope">
            {{scope.row.drivingMileage}}
          </template>
        </el-table-column>
        <el-table-column label="急加数次数" min-width="120" align="center" :class="rowsheade.israpidAcceleration">
          <template slot-scope="scope">
            {{scope.row.rapidAcceleration}}
          </template>
        </el-table-column>
        <el-table-column label="急减速次数" min-width="120" align="center" :class="rowsheade.isacceleratedDeceleration">
          <template slot-scope="scope">
            {{scope.row.acceleratedDeceleration}}
          </template>
        </el-table-column>
        <el-table-column label="急转弯次数" min-width="120" align="center" :class="rowsheade.issharpTurn">
          <template slot-scope="scope">
            {{scope.row.sharpTurn}}
          </template>
        </el-table-column>
        <el-table-column label="高峰时长(分钟)" min-width="120" align="center" :class="rowsheade.ispeakHour">
          <template slot-scope="scope">
            {{scope.row.peakHour}}
          </template>
        </el-table-column>
      </el-table>-->
      <el-table
        ref="returnApplyTable"
        :data="list"
        style="width: 100%;"
        v-loading="listLoading"
        border
      >
        <el-table-column
          v-for="(item,index) in tableHeadAdd"
          :prop="item.prop"
          :key="index"
          :label="item.label"
          align="center"
        ></el-table-column>
      </el-table>
      <div class="pagination-container">
        <div class="right">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :current-page.sync="listQuery.page"
            :page-size="listQuery.rows"
            :page-sizes="[5,10,15]"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!--自定义模板-->
    <el-dialog title="自定义模板" :visible.sync="dialogVisible" width="900px" align="center">
      <el-checkbox-group v-model="addHeader" size="small" @change="handlecheckbox" style="width: 840px;">
        <el-checkbox label="plateNumber" border>车牌号</el-checkbox>
        <el-checkbox label="timeSpentOnline" border>在网时长(天)</el-checkbox>
        <el-checkbox label="drivingDays" border>行驶天数</el-checkbox>
        <el-checkbox label="drivingMileage" border>行驶里程(公里)</el-checkbox>
        <el-checkbox label="rapidAcceleration" border>急加数次数</el-checkbox>
        <el-checkbox label="acceleratedDeceleration" border>急减速次数</el-checkbox>
        <el-checkbox label="sharpTurn" border>急转弯次数</el-checkbox>
        <el-checkbox label="peakHour" border>高峰时长(分钟)</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditSkuConfirm()">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import {
  insuranceRiskHeader,
  insuranceRiskList,
  insuranceRiskUpdateHeader
} from "@/api/insuranceService";
const defaultListQuery = {
  page: 1,
  rows: 5,
  plateNumber: null
};
const defaultaddHeaderObj = {
  plateNumber: "",
  timeSpentOnline: "",
  drivingDays: "",
  drivingMileage: "",
  rapidAcceleration: "",
  acceleratedDeceleration: "",
  sharpTurn: "",
  peakHour: ""
}; //存放上传保存的请求参数
export default {
  name: "articleManage",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      dialogVisible: false,
      addHeader: [], //数据存放
      //模板数组
      tableHead: [
        {
          label: "车牌号",
          prop: "plateNumber"
        },
        {
          label: "在网时长(天)",
          prop: "timeSpentOnline"
        },
        {
          label: "行驶天数",
          prop: "drivingDays"
        },
        {
          label: "行驶里程(公里)",
          prop: "drivingMileage"
        },
        {
          label: "急加速次数",
          prop: "rapidAcceleration"
        },
        {
          label: "急减速次数",
          prop: "acceleratedDeceleration"
        },
        {
          label: "急转弯次数",
          prop: "sharpTurn"
        },
        {
          label: "高峰时长",
          prop: "peakHour"
        }
      ],
      tableHeadAdd: [],
      total: null,
      listLoading: false,
      multipleSelection: [],
      operateType: 1,
      headerId: "",
      addHeaderObj: Object.assign({}, defaultaddHeaderObj),
      addHeaderArr: [] //存放上传保存的请求数组
    };
  },
  created() {
    this.getinsuranceRiskHeader();
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
    //1.列表
    getList() {
      this.listLoading = true;
      insuranceRiskList(this.listQuery).then(response => {
        console.log(response);
        this.listLoading = false;
        this.list = response.data;
        this.total = response.count;
      });
    },
    //获取表头
    getinsuranceRiskHeader() {
      this.listLoading = true;
      //数组置空
      this.tableHeadAdd.length = 0;
      this.addHeader.length = 0;
      insuranceRiskHeader().then(response => {
        this.listLoading = false;
        this.headerId = response.data.id;
        console.log(response.data);
        if (response.data.plateNumber == 0) {
          this.tableHeadAdd.push(this.tableHead[0]);
          this.addHeader.push("plateNumber");
        }
        if (response.data.timeSpentOnline == 0) {
          this.tableHeadAdd.push(this.tableHead[1]);
          this.addHeader.push("timeSpentOnline");
        }
        if (response.data.drivingDays == 0) {
          this.tableHeadAdd.push(this.tableHead[2]);
          this.addHeader.push("drivingDays");
        }
        if (response.data.drivingMileage == 0) {
          this.tableHeadAdd.push(this.tableHead[3]);
          this.addHeader.push("drivingMileage");
        }
        if (response.data.rapidAcceleration == 0) {
          this.tableHeadAdd.push(this.tableHead[4]);
          this.addHeader.push("rapidAcceleration");
        }
        if (response.data.acceleratedDeceleration == 0) {
          this.tableHeadAdd.push(this.tableHead[5]);
          this.addHeader.push("acceleratedDeceleration");
        }
        if (response.data.sharpTurn == 0) {
          this.tableHeadAdd.push(this.tableHead[6]);
          this.addHeader.push("sharpTurn");
        }
        if (response.data.peakHour == 0) {
          this.tableHeadAdd.push(this.tableHead[7]);
          this.addHeader.push("peakHour");
        }
        this.getList();
      });
    },
    //2.自定义模板
    handleAdd() {
      this.dialogVisible = true;
      this.addHeaderArr.length = 0;
    },
    handlecheckbox(value) {
      this.addHeaderArr = value;
    },
    //点击确定按钮
    handleEditSkuConfirm() {
      this.$confirm("是否确定使用该模板", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var _this = this;
        console.log(_this.addHeaderObj);
        for (var key in _this.addHeaderObj) {
          var num = 0;
          for (var j = 0; j < this.addHeaderArr.length; j++) {
            if (key == this.addHeaderArr[j]) {
              num++;
              _this.addHeaderObj[key] = 0;
            }
            if (j == this.addHeaderArr.length - 1 && num == 0) {
              _this.addHeaderObj[key] = 1;
            }
          }
        }
        _this.addHeaderObj["id"] = this.headerId;
        console.log(_this.addHeaderObj);
        insuranceRiskUpdateHeader(_this.addHeaderObj).then(response => {
          console.log(response);
          this.$message({
            message: "保存成功",
            type: "success",
            duration: 1000
          });
          this.dialogVisible = false;
          //获取调取表头
          this.getinsuranceRiskHeader();
        });
      });
    },
    //
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.page = 1;
      this.getList();
    },

    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.listQuery.rows = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    resetData() {
      this.listQuery = Object.assign({}, this.defaultListQuery);
      this.handleSearchList();
    },
  }
};
</script>
<style scoped>
.input-width {
  width: 203px;
}
.el-checkbox.is-bordered.el-checkbox--medium {
  margin-bottom: 20px;
}
.hide {
  display: none;
}
.show {
  display: inline-block;
}
  .el-checkbox{
    margin-right: 0px;
    margin-bottom: 10px;

  }
.el-checkbox.is-bordered.el-checkbox--small{
  width: 160px;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
  float: right;
  text-align: right;
}
.el-checkbox-group{
  padding: 0 6%;
}
.el-checkbox{
  margin-bottom: 0px;
  margin-left: 0px;
  margin: 10px;
}
  .app-container >>> .el-dialog__footer {
    padding-top: 20px;
  }
</style>

