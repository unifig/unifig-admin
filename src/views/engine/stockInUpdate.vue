<template>
  <div class="app-container">
    <div class="content-section">
      <div class="title">
        <span class="icon"></span>
        入库管理 - 采购入库
      </div>
      <el-form class="reset-form" label-width="100px" label-position="left">
        <el-form-item label="订单批次号">{{batchNumber}}</el-form-item>
        <el-form-item label="合同编号">{{contractNumber}}</el-form-item>
        <el-form-item label="备注">{{remarks}}</el-form-item>
      </el-form>
    </div>
    <div class="content-section mt30">
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
          <el-button size="mini" type="primary" class="btn-add" style="margin-left: 20px">导入车机</el-button>
        </el-upload>
        <!-- </div> -->
        <div class="right">
          <el-button size="mini" type="primary">
            <a href="https://api.yirisanxian.com/rb/file/view/5c9ee620c9e77c0001950218">车机模版下载</a>
          </el-button>
        </div>
      </div>
    </div>
    <el-tabs class v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="机车明细" name="first">
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
    <div class="mt20 center">
      <el-button size="small" @click="back">返回</el-button>
      <el-button type="primary" size="mini" @click="sure(0)">存为草稿</el-button>
      <el-button type="primary" size="mini" @click="sure(2)">确定入库</el-button>
    </div>
    <add-vehicle-dialog ref="add_vehicle" @addVehicleData="addVehicleData"></add-vehicle-dialog>
    <add-part-dialog ref="add_part" @addPartData="addPartData"></add-part-dialog>
  </div>
</template>
<script>
import XLSX from "xlsx";
import { addPutIn, getInDetail, updatePutIn } from "@/api/vehicle";
import AddVehicleDialog from "./common/addVehicle";
import AddPartDialog from "./common/addPart";
export default {
  components: { AddVehicleDialog, AddPartDialog },
  data() {
    return {
      batchNumber: null, //订单批次号
      contractNumber: null, // 合同编号
      remarks: null, // 备注
      activeName: "first",
      partsData: [],
      vechileData: [],
      listLoading: false,
      leadObjArr: [],
      listData: [],
      id: this.$route.params.id,
      info: null
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      // 1.详情
      updatePutIn({ id: this.id }).then(res => {
        let resData = res.data;
        this.batchNumber = resData.batchNumber;
        this.contractNumber = resData.contractNumber;
        this.remarks = resData.remarks;
        this.vechileData = res.data.vehicleEngineList;
        this.partsData.push(res.data.partsVo);
        // console.log(this.info, "ff");
      });
    },
    // 添加车机dialog
    addVehicle() {
      let addRef = this.$refs.add_vehicle;
      addRef.form = {};
      addRef.visible = true;
    },
    // 添加车机dialog 数据处理
    addVehicleData(data) {
      this.vechileData.push(data);
    },
    // 车机列表删除
    deleteVehicleData(index) {
      this.vechileData.splice(index, 1);
    },
    // 添加配件dialog
    addPart() {
      let partRef = this.$refs.add_part;
      partRef.partData = this.partsData[0];
      partRef.visible = true;
    },
    // 配件数据处理
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
        id: this.id,
        batchNumber: this.batchNumber,
        contractNumber: this.contractNumber,
        remarks: this.remarks,
        status: status, // 0,草稿，1待收货 2.已入库
        type: 1, //0:正常调货 1:采购入库 2退货流转
        vehicleEngineList: this.vechileData,
        partsVo: this.partsData[0]
      };
      // 入库操作
      addPutIn(params).then(res => {
        this.$message({ type: "success", message: res.msg });
        this.back();
      });
    },
    // 批量导入车机
    upload(file) {
      let files = { 0: file.raw };
      this.readExcel(files);
    },
    // 读取excle
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
            let time = item["软件发行日期"];
            let inObj = {
              boxNumber: item["箱号"],
              vehicleNumber: item["车机号"],
              vehicleSn: item["车机SN"],
              simCardNumber: item["SIM卡号"],
              operator: item["运营商"],
              cupId: item["CPU_ID"],
              gsmImsi: item["GSM_IMSI"],
              gsmCcid: item["GSM_CCID"],
              gpsId: item["GPS_ID"], // 软件发行日期
              softwareReleaseDate: time,
              simCardType: item["SIM卡类型"],
              remarks: item["备注"]
            };
            that.listData.push(inObj);
          }
          that.vechileData.push(...that.listData);
          //   console.log(that.vechileData, "ff");
          this.$refs.upload.value = "";
        } catch (e) {
          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
    },
    handleClick(tab) {
      this.activeName = tab.name;
    },
    back() {
      this.$router.push({ name: "engine-stock-in" });
    }
  }
};
</script>



