<template>
  <div>
    <el-dialog title="车机信息" :visible.sync="visible" :show-close="false" class="reset-dialog" width="900px">
      <el-form class="reset-form" :model="form" inline label-width="115px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="车机号 ：">
              <div class="reset-auto-input-auto">{{form.vehicleNumber}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SN码 ：">
              <div class="reset-auto-input-auto">{{form.vehicleSn}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="销售时间 ：">
              <div class="reset-auto-input-auto">{{form.saleTime|formatTime}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否绑定 ：">
              <div class="reset-auto-input-auto">{{form.vehicleStatus == 1?'是':'否'}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="绑定时间 ：">
              <div class="reset-auto-input-auto">{{form.firstBindingTime|formatTime}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="解绑时间 ：">
              <div class="reset-auto-input-auto">{{form.untyingTime|formatTime}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="箱号 ：">
              <div class="reset-auto-input-auto">{{form.boxNumber}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="剩余服务 ：">
              <div class="reset-auto-input-auto">{{form.termOfService}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否故障 ：">
              <div class="reset-auto-input-auto">{{form.vehicleStatus == 2 ?'是':'否'}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否报停 ：">
              <div class="reset-auto-input-auto">{{form.blockUp == 0?'是':'否'}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属机构 ：">
              <div class="reset-auto-input-auto">{{form.deptName}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构ID ：">
              <div class="reset-auto-input-auto">{{form.deptId}}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer center">
        <el-button @click="visible = false" style="display:none">取消</el-button>
        <el-button @click="visible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
export default {
  data() {
    return {
      form: {},
      visible: false
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
  }
};
</script>

