<template>
  <div class="app-container">
    <div class="content-section" style="height: 0">
      <div class="title">
        <span class="icon"></span>
        入库管理 - 采购入库
      </div>
      <div style="margin:20px auto;width:1000px;border-left:1px solid #EBEEF5;border-right:1px solid #EBEEF5;border-radius:0;margin-top: 0;padding-top: 35px;">
        <el-form
          class="reset-form cgrk"
          label-width="110px"
          label-position="right"
          style="padding-bottom:10px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="订单批次号：" class="reset-auto-input">
                <el-input class="reset-input" :disabled="true" placeholder="系统自动生成"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同编号：">
                <el-input class="reset-input" v-model="contractNumber" placeholder="请输入合同编号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="cgrk-remark">
              <el-form-item label="备注：" style="margin-bottom: 0;">
                <el-input :autoSize="true" v-model="remarks" type="textarea" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="content-section" style="border-top:1px solid #eee;padding:20px 0">
          <div class="table-title clearfix">
            <el-button size="mini" type="primary" @click="addVehicle">添加车机</el-button>
            <el-button size="mini" type="primary" @click="addPart">添加配件</el-button>
            <!-- <div class="right"> -->
            <el-upload
              class="upload-demo right"
              ref="upload"
              action="rh/customer/importCustomer"
              :on-change="upload"
              :auto-upload="false"
              :show-file-list="false"
            >
              <el-button size="mini" type="primary" class="btn-add" style="margin-left: 16px">导入车机</el-button>
            </el-upload>
            <!-- </div> -->
            <div class="right">
              <el-button size="mini" type="primary">
                <a
                  href="https://api.yirisanxian.com/rb/file/view/5ca74744c9e77c0001cf255e"
                >车机模版下载</a>
              </el-button>
            </div>
          </div>
          <el-tabs
            v-model="activeName"
            type="card"
            @tab-click="handleClick"
            style="padding:20px 30px"
          >
            <el-tab-pane label="车机明细" name="first">
              <el-table border class="mt20" :data="vechileData">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-width="100px" label-position="left" :inline="true">
                      <el-form-item label="运营商">
                        <span>{{props.row.operator}}</span>
                      </el-form-item>
                      <el-form-item label="sim卡类型">
                        <span>{{props.row.simCardType}}</span>
                      </el-form-item>
                      <el-form-item label="sim卡号">
                        <span>{{props.row.simCardNumber}}</span>
                      </el-form-item>
                      <el-form-item label="cup-id">
                        <span>{{props.row.cupId}}</span>
                      </el-form-item>
                      <el-form-item label="gsm-imsi">
                        <span>{{props.row.gsmImsi}}</span>
                      </el-form-item>
                      <el-form-item label="gsm-imeii">
                        <span>{{props.row.gsmImeii}}</span>
                      </el-form-item>
                      <el-form-item label="gsm-ccid">
                        <span>{{props.row.gsmCcid}}</span>
                      </el-form-item>
                      <el-form-item label="gps-id">
                        <span>{{props.row.gpsId}}</span>
                      </el-form-item>
                      <el-form-item label="flash-id">
                        <span>{{props.row.flashId}}</span>
                      </el-form-item>
                      <el-form-item label="软件发行日期">
                        <span>{{props.row.softwareReleaseDate}}</span>
                      </el-form-item>
                      <el-form-item label="软件版本号">
                        <span>{{props.row.softwareVersion}}</span>
                      </el-form-item>
                      <el-form-item label="销售版本号">
                        <span>{{props.row.salesVersionNumber}}</span>
                      </el-form-item>
                      <el-form-item label="备注">
                        <span>{{props.row.remarks}}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column prop="boxNumber" label="箱号" align="center"></el-table-column>
                <el-table-column prop="vehicleNumber" label="车机号" align="center"></el-table-column>
                <el-table-column prop="vehicleSn" label="车机SN" align="center"></el-table-column>
                <el-table-column prop="vehicleModel" label="车机型号" align="center"></el-table-column>
                <el-table-column prop="termOfService" label="服务期限" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      class="color-danger"
                      @click="deleteVehicleData(scope.$index)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="配件明细" name="second">
              <el-table :data="partsData" class="mt20" border>
                <el-table-column prop="name" label="配件名称" align="center"></el-table-column>
                <el-table-column prop="number" label="配件数量" align="center"></el-table-column>
                <el-table-column prop="remarks" label="配件备注" align="center"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
          <div class="mt20 pb20 center">
            <el-button size="small" @click="back">返回</el-button>
            <el-button size="mini" @click="sure(0)" style="padding: 6px 7px !important;">存为草稿</el-button>
            <el-button type="primary" size="mini" @click="sure(2)">确定入库</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="content-section mt20">
      <div class="table-title clearfix">
        <el-button size="mini" type="primary" @click="addVehicle">添加车机</el-button>
        <el-button size="mini" type="primary" @click="addPart">添加配件</el-button>

        <el-upload
          class="upload-demo right"
          ref="upload"
          action="rh/customer/importCustomer"
          :on-change="upload"
          :auto-upload="false"
          :show-file-list="false"
        >
          <el-button size="mini" type="primary" class="btn-add" style="margin-left: 16px">导入车机</el-button>
        </el-upload>

        <div class="right">
          <el-button size="mini" type="primary">
            <a href="https://api.yirisanxian.com/rb/file/view/5ca74744c9e77c0001cf255e">车机模版下载</a>
          </el-button>
        </div>
      </div>
    </div>-->
    <!-- <el-tabs class v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="车机明细" name="first">
        <el-table border class="mt20" :data="vechileData">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-width="100px" label-position="left" :inline="true">
                <el-form-item label="运营商">
                  <span>{{props.row.operator}}</span>
                </el-form-item>
                <el-form-item label="sim卡类型">
                  <span>{{props.row.simCardType}}</span>
                </el-form-item>
                <el-form-item label="sim卡号">
                  <span>{{props.row.simCardNumber}}</span>
                </el-form-item>
                <el-form-item label="cup-id">
                  <span>{{props.row.cupId}}</span>
                </el-form-item>
                <el-form-item label="gsm-imsi">
                  <span>{{props.row.gsmImsi}}</span>
                </el-form-item>
                <el-form-item label="gsm-imeii">
                  <span>{{props.row.gsmImeii}}</span>
                </el-form-item>
                <el-form-item label="gsm-ccid">
                  <span>{{props.row.gsmCcid}}</span>
                </el-form-item>
                <el-form-item label="gps-id">
                  <span>{{props.row.gpsId}}</span>
                </el-form-item>
                <el-form-item label="flash-id">
                  <span>{{props.row.flashId}}</span>
                </el-form-item>
                <el-form-item label="软件发行日期">
                  <span>{{props.row.softwareReleaseDate}}</span>
                </el-form-item>
                <el-form-item label="软件版本号">
                  <span>{{props.row.softwareVersion}}</span>
                </el-form-item>
                <el-form-item label="销售版本号">
                  <span>{{props.row.salesVersionNumber}}</span>
                </el-form-item>
                <el-form-item label="备注">
                  <span>{{props.row.remarks}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="boxNumber" label="箱号" align="center"></el-table-column>
          <el-table-column prop="vehicleNumber" label="车机号" align="center"></el-table-column>
          <el-table-column prop="vehicleSn" label="车机SN" align="center"></el-table-column>
          <el-table-column prop="vehicleModel" label="车机型号" align="center"></el-table-column>
          <el-table-column prop="termOfService" label="服务期限" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                class="color-danger"
                @click="deleteVehicleData(scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="配件明细" name="second">
        <el-table :data="partsData" class="mt20" border>
          <el-table-column prop="name" label="配件名称" align="center"></el-table-column>
          <el-table-column prop="number" label="配件数量" align="center"></el-table-column>
          <el-table-column prop="remarks" label="配件备注" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>-->
    <!-- <div class="mt20 pb20 center">
      <el-button size="small" @click="back">返回</el-button>
      <el-button type="primary" size="mini" @click="sure(0)">存为草稿</el-button>
      <el-button type="primary" size="mini" @click="sure(2)">确定入库</el-button>
    </div>-->
    <add-vehicle-dialog ref="add_vehicle" @addVehicleData="addVehicleData"></add-vehicle-dialog>
    <add-part-dialog ref="add_part" @addPartData="addPartData"></add-part-dialog>
  </div>
</template>
<script>
import XLSX from "xlsx";
import { addPutIn } from "@/api/vehicle";
import AddVehicleDialog from "./common/addVehicle";
import AddPartDialog from "./common/addPart";
export default {
  components: { AddVehicleDialog, AddPartDialog },
  data() {
    return {
      contractNumber: null,
      remarks: null,
      activeName: "first",
      partsData: [],
      vechileData: [],
      listLoading: false,
      leadObjArr: [],
      listData: []
    };
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
    },
    addVehicle() {
      let addRef = this.$refs.add_vehicle;
      addRef.form = {};
      addRef.visible = true;
    },
    addVehicleData(data) {
      this.vechileData.push(data);
    },

    deleteVehicleData(index) {
      this.vechileData.splice(index, 1);
    },
    addPart() {
      let partRef = this.$refs.add_part;
      partRef.partData = {};
      partRef.visible = true;
    },
    addPartData(data) {
      this.$set(this.partsData, 0, data);
    },
    sure(status) {
      if (!this.contractNumber) {
        this.$message({ type: "warning", message: "请填写合同编号" });
        return;
      }
      if (this.vechileData.length == 0 && this.partsData.length == 0) {
        this.$message({ type: "error", message: "信息填写不完整，无法入库" });
        return;
      }
      let params = {
        contractNumber: this.contractNumber,
        remarks: this.remarks,
        status: status, // 0,草稿，1待收货 2.已入库
        type: 1, //0:正常调货 1:采购入库 2退货流转
        vehicleEngineList: this.vechileData,
        partsVo: this.partsData[0]
      };
      // 1.入库
      addPutIn(params)
        .then(res => {
          this.$message({ type: "success", message: res.msg });
          this.back();
        })
        .catch(err => {
          // console.log(err, "http error");
          // console.dir(err, "dir");
          this.$message({ type: "error", message: "车机号重复" });
        });
    },
    back() {
      this.$router.push({ name: "engine-stock-in" });
    },

    // 导入
    upload(file) {
      let files = { 0: file.raw };
      this.readExcel(files);
    },
    readExcel(files) {
      var that = this;
      that.listData.length = 0;
      if (files.length <= 0) {
        //如果没有文件名
        return false;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$Message.error("上传格式不正确，请上传xls或者xlsx格式");
        return false;
      }
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary"
          });
          const wsname = workbook.SheetNames[0]; //取第一张表
          let ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容

          for (var i = 0, j = ws.length; i < j; i++) {
            let item = ws[i];
            let time =
              item[
                "软件发行日期(日期格式举例:2019-03-28,日期格式如果错误无法导入)"
              ];
            console.log(time, "time");
            let inObj = {
              boxNumber: item["箱号"],
              vehicleNumber: item["车机号(车机号不可重复否则无法导入)"],
              vehicleSn: item["车机SN"],
              cupId: item["CPU_ID"],
              gsmImeii: item["GSM_IMEI"],
              gsmImsi: item["GSM_IMSI"],
              gsmCcid: item["GSM_CCID"],
              simCardNumber: item["SIM卡号"],
              flashId: item["FLASH_ID"],
              gpsId: item["GPS_ID"],
              softwareVersion: item["软件版本号"],
              softwareReleaseDate:
                item[
                  "软件发行日期(日期格式举例:2019-03-28,日期格式如果错误无法导入)"
                ],
              vehicleModel: item["车机型号"],
              salesVersionNumber: item["销售版本号"],
              remarks: item["备注"],
              operator: item["运营商"],
              termOfService: item["服务期限"]
              // item['发货日期'],
              // item['产品名称']
              // item['车机用途']
            };
            that.listData.push(inObj);
          }
          // console.log(that.listData);
          that.vechileData.push(...that.listData);
          this.$refs.upload.value = "";
        } catch (e) {
          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
    }
  }
};
</script>
<style scoped>
.app-container >>> .reset-auto-input {
  height: 30px;
}
.app-container >>> .el-form-item__label {
  padding-right: 0;
  line-height: 30px;
}
.app-container >>> .el-form-item__content {
  height: 30px;
  line-height: 30px;
}
.app-container >>> .el-form-item__content .reset-input {
  width: 240px;
  height: 30px;
  line-height: 30px;
}
.app-container >>> .el-input__inner {
  width: 240px;
  height: 30px !important;
  line-height: 30px !important;
}
.app-container >>> .table-title .el-button--primary {
  padding: 6px 7px;
}

.app-container >>> .mt20 .el-button--default {
  padding: 6px 23px !important;
  font-size: 16px;
}
.app-container >>> .mt20 .el-button--primary {
  padding: 6px 7px !important;
  font-size: 16px;
}
  .app-container >>> .cgrk-remark .el-form-item__content{
    width: auto;
    height: auto;
  }
.app-container >>> .cgrk-remark .el-textarea__inner{
    width: 704px;
    max-width: 704px;
    height: 60px;
    min-height: 60px;
  }
  .app-container >>> .cgrk .el-form-item__content {
    margin-bottom: 17px;
  }
</style>



