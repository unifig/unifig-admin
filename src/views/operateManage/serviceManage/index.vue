<style scoped>
.con-me .el-select {
  display: block;
}
.input-width {
  width: 203px;
}
.regionsty .el-select {
  display: inline-block;
  width: 32.7%;
}
</style>
<template>
  <div class="app-container">
    <div class="header-me">
      <div class="header-title">
        <p></p>运营管理 - 服务商管理
      </div>
      <div class="header-con">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="auto"
          :label-position="labelPosition"
        >
          <el-form-item label="检索类型：">
            <el-select v-model="listQuery.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-input v-model="listQuery.title" class="input-width" placeholder="检索内容"></el-input>
          </el-form-item>
          <el-form-item label style="float:right">
            <el-button
              @click="handleSearchList()"
              size="small"
              type="primary"
              icon="el-icon-search"
            >搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table-container con-me">
      <el-card class="operate-container" shadow="never">
        <span class="color-main">服务商管理</span>
        <el-button
          size="mini"
          type="primary"
          class="btn-add el-icon-plus"
          @click="handleAdd()"
          style="margin-left: 20px"
        >新增服务商</el-button>
      </el-card>
      <el-table
        ref="returnApplyTable"
        :data="list"
        style="width: 100%;"
        class="table-me"
        v-loading="listLoading"
      >
        <el-table-column label="序号" min-width="100" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="商家ID" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="商家名称" min-width="120">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="商家图片" min-width="140" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="服务类别" min-width="140" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="地址" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="电话" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="备注" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="创建时间" min-width="120" align="center">
          <template slot-scope="scope">{{scope.row.originalPrice}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="edit(scope.row.id)">编辑</el-button>

            <el-button
              size="mini"
              type="text"
              style="color: red"
              @click="handleDelete(scope.row.id)"
            >删除</el-button>
            <el-button
              size="mini"
              type="text"
              style="color:#DDA450"
              @click="examine(scope.row.id)"
            >查看</el-button>
          </template>
        </el-table-column>
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
    <el-dialog :title="titleName" :visible.sync="dialogVisible" width="60%">
      <el-form ref="form" :model="form" label-width="120px" :label-position="labelPosition">
        <el-form-item label="服务商名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="服务类别">
          <el-select v-model="form.region" placeholder="请选择类型">
            <el-option label="1" value="1"></el-option>
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <div class="regionsty">
          <el-form-item label="服务类别">
            <el-select v-model="valueProvince" placeholder="请选择省" @change="changeProvince">
              <el-option
                v-for="item in provinceList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="valueCity" placeholder="请选择市" @change="changeCity">
              <el-option
                v-for="item in cityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="valueOrigin" placeholder="请选择区" @change="changeOrigin">
              <el-option
                v-for="item in originOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="地址">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="图片：">
          <el-upload
            class="editor-slide-upload"
            :action="global.fileUploadApi"
            :file-list="fileList"
            :show-file-list="true"
            :on-success="handleSuccess"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <a :href="form.thumb" target="_blank" v-if="form.thumb">{{form.thumb}}</a>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { formatDate } from "@/utils/date";
import {
  articleList,
  updateArticleNavStatus,
  deleteArticle
} from "@/api/article";
const defaultListQuery = {
  page: 1,
  rows: 5,
  title: null,
  region: ""
};
export default {
  name: "articleManage",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      operateType: 1,
      dialogVisible: false,
      labelPosition: "left",
      titleName: "服务商",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      provinceList: [], // 省列表
      cityList: [], // 市列表
      originList: [], // 区列表
      valueProvince: "", // 所选的省
      valueCity: "", // 所选的市
      valueOrigin: "", // 所选的区
      cityOptions: [], // 市下拉框数据
      originOptions: [] // 区下拉框数据
    };
  },
  created() {
    this.getList();
    this._getJsonData();
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
    //1.文章列表
    getList() {
      this.listLoading = true;
      articleList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data;
        this.total = response.count;
      });
    },
    // 2.编辑
    edit(id) {
      console.log(id);
      this.titleName = "修改服务商";
      this.dialogVisible = true;
    },
    // 3.添加
    handleAdd() {
      this.titleName = "新增服务商";
      this.dialogVisible = true;
    },
    //4.查看
    examine(id) {
      this.titleName = "查看服务商";
      this.dialogVisible = true;
    },
    // 4.删除
    handleDelete(id) {
      this.$confirm("是否要删除该文章", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteArticle({ id: id }).then(response => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000
          });
          this.getList();
        });
      });
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
    // 图片上传成功
    handleSuccess(res) {
      this.article.fileUrl = res;
    },

    // 选择省
    changeProvince(val) {
      this.provinceList.forEach((province, index) => {
        if (val.toString() === this.provinceList[index].value) {
          this.cityOptions = this.provinceList[index].children;
          this.valueCity = this.provinceList[index].children[0].value;
          this.originOptions = this.provinceList[index].children[0].children;
          this.valueOrigin = this.provinceList[
            index
          ].children[0].children[0].value;
        }
      });
    },
    // 选择市
    changeCity(val) {
      this.cityList.forEach((city, index) => {
        if (val.toString() === this.cityList[index].value) {
          this.originOptions = this.cityList[index].children;
          this.valueOrigin = this.cityList[index].children[0].value;
        }
      });
    },
    // 选择区
    changeOrigin(val) {
      this.valueOrigin = val;
    },
    _getJsonData() {
      axios.get("../../../../static/china_address_v4.json").then(res => {
        console.log(res);
        this.provinceList = [];
        this.cityList = [];
        this.originList = [];
        res.data.forEach(item => {
          if (item.value.match(/0000$/)) {
            this.provinceList.push({
              value: item.value,
              label: item.name,
              children: []
            });
          } else if (item.value.match(/00$/)) {
            this.cityList.push({
              value: item.value,
              label: item.name,
              children: []
            });
          } else {
            this.originList.push({
              value: item.value,
              label: item.name
            });
          }
        });
        for (let index in this.provinceList) {
          for (let index1 in this.cityList) {
            if (
              this.provinceList[index].value.slice(0, 2) ===
              this.cityList[index1].value.slice(0, 2)
            ) {
              this.provinceList[index].children.push(this.cityList[index1]);
            }
          }
        }
        for (let item1 in this.cityList) {
          for (let item2 in this.originList) {
            if (
              this.originList[item2].value.slice(0, 4) ===
              this.cityList[item1].value.slice(0, 4)
            ) {
              this.cityList[item1].children.push(this.originList[item2]);
            }
          }
        }
      });
    }
  }
};
</script>

