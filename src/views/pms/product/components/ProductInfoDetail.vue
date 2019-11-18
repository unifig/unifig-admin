<template>
  <div class="product-info-detail" style="margin-top: 50px">
    <el-form
      :model="value"
      :rules="rules"
      ref="productInfoForm"
      label-width="120px"
      style="width: 100%"
      size="small"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="关联店铺：" prop="shopId"><!--  v-if="!isEdit" -->
            <el-select v-model="value.shopId" placeholder="请选择">
              <el-option
                v-for="(item, index) in storeList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品分类：" prop="productCategoryId">
            <el-cascader v-model="selectProductCateValue" :options="productCateOptions"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品名称：" prop="name">
            <el-input v-model="value.name"></el-input>
          </el-form-item>
        </el-col>

      <!--<el-form-item label="副标题：" prop="subTitle">
        <el-input v-model="value.subTitle"></el-input>
      </el-form-item>-->
      <!--<el-form-item label="商品品牌：" prop="brandId">
        <el-select
          v-model="value.brandId"
          @change="handleBrandChange"
          placeholder="请选择品牌">
          <el-option
            v-for="item in brandOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>-->
      <!--<el-form-item label="商品货号：">
        <el-input v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="商品售价：">
        <el-input v-model="value.price"></el-input>
      </el-form-item>-->
        <el-col :span="12">
          <el-form-item label="市场价：">
            <el-input v-model="value.originalPrice"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品售价：">
            <el-input v-model="value.price"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="选择商品类型：">
            <el-select v-model="value.type">
              <el-option label="普通商品" value="1"></el-option>
              <el-option label="积分商品" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <!--<el-form-item v-if="value.type === '2'" label="积分：">
            <el-input v-model="value.usePointLimit"></el-input>
          </el-form-item>-->
          <el-form-item label="商品库存：">
            <el-input v-model="value.stock"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计量单位：">
            <el-input v-model="value.unit"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="代理人数：">
            <el-input v-model="value.agencyNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="代理积分：">
            <el-input v-model="value.agencyIntegral"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="商品介绍：">
            <el-input :autoSize="true" v-model="value.description" type="textarea" placeholder="请输入内容" class="spjs"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <el-form-item label="商品库存：">
        <el-input v-model="value.stock"></el-input>
      </el-form-item>-->
      <!--<el-form-item label="计量单位：">
        <el-input v-model="value.unit"></el-input>
      </el-form-item>
      <el-form-item label="商品重量：">
        <el-input v-model="value.weight" style="width: 300px"></el-input>
        <span style="margin-left: 20px">克</span>
      </el-form-item>-->
      <!--<el-form-item label="排序">
        <el-input v-model="value.sort"></el-input>
      </el-form-item>-->
      <el-form-item style="text-align: center" class="next-btn">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品属性</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchListWithChildren } from "@/api/productCate";
import { fetchList as fetchBrandList } from "@/api/brand";
import { getProduct } from "@/api/product";
import { storeDataList } from "@/api/store";

export default {
  name: "ProductInfoDetail",
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      storeList: [],
      hasEditCreated: false,
      //选中商品分类的值
      selectProductCateValue: [],
      productCateOptions: [],
      brandOptions: [],
      rules: {
        shopId: [
          { required: true, message: "请选择关联商店", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur"
          }
        ],
        subTitle: [
          { required: true, message: "请输入商品副标题", trigger: "blur" }
        ],
        productCategoryId: [
          { required: true, message: "请选择商品分类", trigger: "blur" }
        ],
        brandId: [
          { required: true, message: "请选择商品品牌", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入商品介绍", trigger: "blur" }
        ],
        requiredProp: [
          { required: true, message: "该项为必填项", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getProductCateList();
    this.getBrandList();
    this.getStoreList();
  },
  computed: {
    //商品的编号
    productId() {
      return this.value.id;
    }
  },
  watch: {
    productId: function(newValue) {
      if (!this.isEdit) return;
      if (this.hasEditCreated) return;
      if (newValue === undefined || newValue == null || newValue === 0) return;
      this.handleEditCreated();
    },
    selectProductCateValue: function(newValue) {
      if (newValue != null && newValue.length === 2) {
        this.value.productCategoryId = newValue[1];
        this.value.productCategoryName = this.getCateNameById(
          this.value.productCategoryId
        );
      } else {
        this.value.productCategoryId = null;
        this.value.productCategoryName = null;
      }
    }
  },
  methods: {
    // 获取店铺列表
    getStoreList() {
      let p = {
        page: 1,
        rows: 999999,
        name: "",
        terraceId: 1
      };
      storeDataList(p).then(response => {
        this.storeList = response.data;
      });
    },
    //处理编辑逻辑
    handleEditCreated() {
      if (this.value.productCategoryId != null) {
        this.selectProductCateValue.push(this.value.cateParentId);
        this.selectProductCateValue.push(this.value.productCategoryId);
      }
      this.hasEditCreated = true;
    },
    getProductCateList() {
      fetchListWithChildren().then(response => {
        let list = response.data;
        this.productCateOptions = [];
        for (let i = 0; i < list.length; i++) {
          let children = [];
          if (list[i].children != null && list[i].children.length > 0) {
            for (let j = 0; j < list[i].children.length; j++) {
              children.push({
                label: list[i].children[j].name,
                value: list[i].children[j].id
              });
            }
          }
          this.productCateOptions.push({
            label: list[i].name,
            value: list[i].id,
            children: children
          });
        }
      });
    },
    getBrandList() {
      fetchBrandList({ pageNum: 1, pageSize: 100 }).then(response => {
        this.brandOptions = [];
        let brandList = response.data.list;
        for (let i = 0; i < brandList.length; i++) {
          this.brandOptions.push({
            label: brandList[i].name,
            value: brandList[i].id
          });
        }
      });
    },
    getCateNameById(id) {
      let name = null;
      for (let i = 0; i < this.productCateOptions.length; i++) {
        for (let j = 0; i < this.productCateOptions[i].children.length; j++) {
          if (this.productCateOptions[i].children[j].value === id) {
            name = this.productCateOptions[i].children[j].label;
            return name;
          }
        }
      }
      return name;
    },
    handleNext(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("nextStep");
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000
          });
          return false;
        }
      });
    },
    handleBrandChange(val) {
      let brandName = "";
      for (let i = 0; i < this.brandOptions.length; i++) {
        if (this.brandOptions[i].value === val) {
          brandName = this.brandOptions[i].label;
          break;
        }
      }
      this.value.brandName = brandName;
    }
  }
};
</script>
<style scoped>
  .product-info-detail >>> .el-form-item__label{
    height: 30px;
    line-height: 30px;
  }
  .product-info-detail >>> .el-input__inner{
    width: 240px;
    height: 30px;
    line-height: 30px;
  }
  .product-info-detail >>> .spjs .el-textarea__inner{
    min-height: 60px !important;
    max-width: 685px;
  }
  .product-info-detail >>> .el-form-item--small.el-form-item {
    margin-bottom: 24px;
  }
  .product-info-detail >>> .next-btn .el-form-item__content{
    margin-left: 0 !important;
  }
  .product-info-detail >>> .el-form-item__content .el-button--primary{
    margin-top: 50px;
  }
</style>
