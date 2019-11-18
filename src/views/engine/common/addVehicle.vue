<template>
  <div>
    <el-dialog class="reset-dialog" title="添加车机明细" :visible.sync="visible" :show-close="false">
      <el-form
        ref="vehicleRef"
        :model="form"
        inline
        label-width="110px"
        label-position="right"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品类型：" class="reset-auto-input">
              <el-input v-model="itemLable" disabled class="reset-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车机号：" prop="vehicleNumber">
              <el-input v-model="form.vehicleNumber" class="reset-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="箱号：" prop="boxNumber">
              <el-input v-model="form.boxNumber" class="reset-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车机SN：" prop="vehicleSn">
              <el-input v-model="form.vehicleSn" class="reset-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="服务期限：" class="reset-auto-input">
              <el-input v-model="form.termOfService" disabled class="reset-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="sim卡号：" prop="simCardNumber">
              <el-input v-model="form.simCardNumber" class="reset-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="cup-id：">
              <el-input v-model="form.cupId" class="reset-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="运营商：">
              <el-select v-model="form.operator" class="reset-input">
                <el-option
                  v-for="(item,index) in operatorArr"
                  :label="item.name"
                  :value="item.id"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="gsm-imsi：">
              <el-input v-model="form.gsmImsi" class="reset-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="gsm-imeii：">
              <el-input v-model="form.gsmImeii" class="reset-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="flash-id：">
              <el-input v-model="form.flashId" class="reset-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="gsm-ccid：">
              <el-input v-model="form.gsmCcid" class="reset-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="软件版本号：" prop="softwareVersion">
              <el-input v-model="form.softwareVersion" class="reset-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="gps-id：">
              <el-input v-model="form.gpsId" class="reset-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="车机型号：">
              <el-select v-model="form.vehicleModel" class="reset-input">
                <el-option
                  v-for="(item,index) in modelType"
                  :label="item.name"
                  :value="item.id"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="软件发行日期：" prop="softwareReleaseDate">
              <el-date-picker
                class="reset-input"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                v-model="form.softwareReleaseDate"
                @change="changeTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="sim卡类型：">
              <el-input v-model="form.simCardType"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="销售版本号：">
              <el-input v-model="form.salesVersionNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注：" class="cjmx-bz">
          <el-input type="textarea" v-model="form.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer center">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" @click="sure">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import XLSX from "xlsx";
const defaultData = {
  vehicleNumber: null,
  vehicleModel: null,
  simCardType: null,
  simCardNumber: null,
  gsmCcid: null,
  gpsId: null,
  boxNumber: null,
  vehicleSn: null,
  termOfService: null,
  simCardNumber: null,
  simCardType: null,
  operator: null,
  cupId: null,
  flashId: null,
  gsmImsi: null,
  gsmImeii: null,
  softwareVersion: 1,
  vehicleModel: null,
  softwareReleaseDate: null,
  salesVersionNumber: null,
  remarks: null
};
export default {
  data() {
    return {
      itemLable: "车机",
      form: Object.assign({}, this.defaultData),
      visible: false,
      leadObjArr: [],
      listData: [],
      modelType: [
        {
          id: 1,
          name: "M500"
        }
      ],
      operatorArr: [
        {
          id: 1,
          name: "中国移动"
        },{
          id:2,
          name:'深圳移动'
        },{
          id:3,
          name:'江苏移动'
        },{
          id:4,
          name:'商丘移动'
        },{
          id:5,
          name:'浙江移动'
        },{
          id:6,
          name:'重庆移动'
        },{
          id:7,
          name:'重庆移动南岸分公司'
        },{
          id:8,
          name:'重庆移动诚二分公司'
        }
      ],
      rules: {
        vehicleNumber: [
          {
            required: true,
            message: "请填写车机号"
          }
        ],
        boxNumber: [
          {
            required: true,
            message: "请填写箱号"
          }
        ],
        vehicleSn: [
          {
            required: true,
            message: "请填写车机SN"
          }
        ],
        simCardNumber: [
          {
            required: true,
            message: "请填写sim卡号"
          }
        ],
        softwareVersion: [
          {
            // required: true,
            message: "请填写软件版本号"
          }
        ],
        softwareReleaseDate: [
          {
            required: true,
            message: "请选择软件发行时间"
          }
        ]
      }
    };
  },
  methods: {
    sure() {
      this.$refs.vehicleRef.validate(valid => {
        if (valid) {
          this.$emit("addVehicleData", this.form);
          this.resetData();
        }
      });
    },
    cancle() {
      this.resetData();
    },
    resetData() {
      this.form = Object.assign({}, this.defaultData);
      this.visible = false;
    },
    changeTime(time) {
      this.form.softwareReleaseDate = this.formatDate(time, "yyyy-MM-dd");
    }
  }
};
</script>
<style scoped>
  .el-dialog__wrapper >>> .el-dialog__body {
    padding-left: 40px;
    padding-right: 40px;
  }
  .el-dialog__wrapper >>> .el-dialog__body .cjmx-bz .el-form-item__content{
    width: auto;
    height: auto;
  }
  .el-dialog__wrapper >>> .el-dialog__body .cjmx-bz .el-textarea{
    width: auto;
    height: auto;
  }
  .el-dialog__wrapper >>> .el-dialog__body .cjmx-bz .el-textarea__inner{
    max-width: 500px;
    max-height: 70px;
    width: 500px;
    height: 70px;
  }
</style>


