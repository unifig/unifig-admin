<template>
  <div class="content-section" style="margin-top: 70px;border-bottom: 0;">
    <div class="title">
      <span class="icon"></span>团购 - 添加团购
    </div>
    <el-card class="form-container" shadow="never" style="width: 1000px;padding-top: 50px;border-bottom: 0;border-top: 0;border-radius: 0;margin-top: 0;">
    <el-form :model="groupGoods"
        :rules="rules"
        ref="addGroupGoods"
        label-width="180px"
        label-position="right"
        size="small">
      <!-- <el-form-item label="团购编号：" prop="title">
        <el-input v-model="groupGoods.title" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="团购名称：" prop="title">
        <el-input v-model="groupGoods.title" class="input-width"></el-input>
      </el-form-item> -->
      <el-form-item label="开始时间：" prop="startTime">
        <!-- <el-date-picker v-model="groupGoods.startTime" type="date" placeholder="请选择开始时间" class="input-width"></el-date-picker> -->
        <el-date-picker class="input-width" v-model="groupGoods.startTime" type="datetime" placeholder="请选择开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：" prop="endTime">
        <!-- <el-date-picker v-model="groupGoods.endTime" type="date" placeholder="请选择结束时间" class="input-width"></el-date-picker> -->
        <el-date-picker class="input-width" v-model="groupGoods.endTime" type="datetime" placeholder="请选择结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="有效成团时间（分）：" prop="validTime">
        <el-input v-model="groupGoods.validTime" placeholder="请输入有效成团时间" type="number" class="input-width"></el-input>
      </el-form-item>
      <!-- <el-form-item label="成功拼团人数：" prop="title">
        <el-input v-model="groupGoods.title" class="input-width"></el-input>
      </el-form-item> -->
      <el-form-item label="每人限购订单数：" prop="limitation">
        <el-input v-model="groupGoods.limitation" class="input-width"></el-input>
      </el-form-item>
      <!-- <el-form-item label="人数不满，是否成团：" prop="successGroupNumber">
            <el-radio-group v-model="groupGoods.successGroupNumber">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
            </el-radio-group>
      </el-form-item> -->
      <el-form-item label="团购商品：">
          <el-button type="primary" @click="dialogTableVisible = true" style="padding: 6px 7px !important;">添加商品</el-button>
      </el-form-item>
      <el-form-item label="商品规格：" class="groupGoodsTable" style="width:400px;">
        <el-table style="width:400px;" border :data="productSelected">
            <el-table-column prop="productName" label="商品名称" min-width="120" align="center"></el-table-column>
            <!-- <el-table-column prop="productSubtitle" label="商品标题" min-width="200" align="center"> </el-table-column> -->
            <el-table-column prop="productPrice" label="商品价格" min-width="100" align="center"> </el-table-column>
            <el-table-column prop="productPic" label="商品图片" min-width="120" align="center"> 
                <template slot-scope="scope">
                    <img :src="scope.row.productPic" width="40px" height="40px">
                </template>
            </el-table-column> 
        </el-table>
      </el-form-item>
      <el-form-item style="margin-top: 36px">
        <el-button size="medium" type="primary" @click="onSubmit('addGroupGoods')">提交</el-button>
        <el-button size="medium" @click="resetForm('addGroupGoods')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 关联的商品 -->
    <el-dialog class="flex-group-add" title="选择关联的商品" :visible.sync="dialogTableVisible" width="35%">
        <el-form label-width="100px">
            <el-form-item label="商品分类：" style="margin-bottom: 10px;">
                <el-cascader
                    clearable
                    :options="productCateOptions"
                    v-model="productCateId"
                    @change="changeProductCate">
                </el-cascader>
            </el-form-item>
            <el-form-item label="商品名称：" style="margin-bottom: 10px;">
                <el-select v-model="productIds" @change="changeSelected">
                    <el-option v-for="(item,index) in productList" 
                        :key="index"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-button size="mini" @click="resetProduct" style="margin-left: 33%;margin-top: 28px;margin-bottom: 20px;">取消</el-button>
            <el-button size="mini" type="primary" @click="addProduct" style="margin-top: 28px;margin-bottom: 20px;">确定</el-button>
        </el-form>
    </el-dialog>
  </el-card>
  </div>
</template>
<script>
  import {fetchListWithChildren} from '@/api/productCate'
  import {fetchList} from '@/api/product'
  import {groupBuyingAdd,groupBuyingUpdate,getGoodsInfo,format,formatDate} from "@/api/groupBuying";
  // import Tinymce from '@/components/Tinymce'
  const defaultGroup = {
    startTime:null,
    endTime:null,
    validTime:30,
    //successGroupNumber:1,
    //number:null,
    limitation:null,
    productId:null,
    status:0
  };
  export default {
    name: 'addGroupGoods',
    //components: {Tinymce},
    data() {
      return {
        groupGoods:Object.assign({}, defaultGroup),
        rules: {
          startTime: [
            {required: true, message: '请选择开始时间', trigger: 'blur'}
          ],
          endTime: [
            {required: true, message: '请选择结束时间', trigger: 'blur'}
          ],
          validTime: [
            {required: true, message: '请输入有效成团时间', trigger: 'blur'}
          ],
          successGroupNumber: [
            {required: true, message: '请选择人数不满，是否成团', trigger: 'blur'}
          ],
          limitation: [
            {required: true, message: '请输入每人限购订单数', trigger: 'blur'}
          ],
        },
        // productModel:{},
        productCateOptions:[],
        productCateId:null,
        productSelected:[], // 选中的商品明细
        productList:null, // 商品列表
        dialogTableVisible:false,
        productIds:null, // dialog选中的商品
        productAdd:[], // dialog 商品添加
        type:this.$route.query.type,
        grouId:this.$route.query.id?this.$route.query.id:null,
        groupInfo:null
      }
    },
    created () {
      if (this.type == 'edit') {
        let _data = JSON.parse(this.$route.query.data);
        this.groupGoods.startTime = _data.startTime;
        this.groupGoods.endTime = _data.endTime;
        this.groupGoods.validTime = (_data.validTime/1000/1000);
        //this.groupGoods.successGroupNumber = _data.successGroupNumber;
        this.groupGoods.productId = _data.productId;
        this.groupGoods.limitation = _data.limitation;
        this.groupGoods.id = _data.id;
        this.getInfo(_data.productId);
        // this.groupInfo = JSON.parse(this.$route.query.data);
        // console.log(JSON.parse(this.$route.query.data));
      }
      this.getProductList();
      this.getProductAttrCateList()
    },
    methods:{
        //获取商品详情
        getInfo(id){
          let self = this;
          getGoodsInfo(id).then(response=>{
            let productArr = [];
            if(response.code==200){
              let item = response.data;
              productArr = [{
                  productId:item.id,
                  productName:item.name,
                  productPic:item.pic,
                  productSubtitle:item.subTitle,
                  productPrice:item.price,
                  productCatId: item.productCategoryId,
                  productCatName: item.productCategoryName
              }];
            }
            self.productSelected = productArr;
          })
        },
        // 3.获取商品分类
        getProductAttrCateList() {
            fetchListWithChildren().then(response => {
                let list = response.data;
                this.productCateOptions = [];
                for (let i = 0; i < list.length; i++) {
                    let children = [];
                    if (list[i].children != null && list[i].children.length > 0) {
                        for (let j = 0; j < list[i].children.length; j++) {
                            children.push({label: list[i].children[j].name, value: list[i].children[j].id});
                        }
                    }
                    this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
                    
                }
                
            });
        },
        // 4.获取商品列表
        getProductList(productCateId){
            let params = {
                productCategoryId:productCateId,
                pageNum: 1,
                pageSize: 10000
            }
            fetchList(params).then(res=>{
                this.productList = res.data.list;
            })
        },
        // 选中的商品
        changeSelected(ids){
            this.productIds = ids;
            this.groupGoods.productId = ids;
        },
        // 添加商品
        addProduct(){
           let ids = this.productIds;
           let productArr = [];
           for(let item of this.productList) {
            if(item.id==ids){
                productArr = [{
                    productId:item.id,
                    productName:item.name,
                    productPic:item.pic,
                    productSubtitle:item.subTitle,
                    productPrice:item.price,
                    productCatId: item.productCategoryId,
                    productCatName: item.productCategoryName
               }];
            }
          }
          this.productSelected = productArr;
          this.dialogTableVisible = false;
        },

        // 重置商品关联
        resetProduct(){
            this.productCateId = null;
            this.productIds = null;
            this.dialogTableVisible = false
        },
        // 改变商品分类
        changeProductCate(id){
            let ids = id.concat().pop();
            this.productList = [];
            this.productIds = null;
            this.getProductList(ids)
        },
        // 提交
        onSubmit(formName) {
            let self = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.groupGoods.productId==null){
                this.$message({
                    message: '请选择关联商品',
                    type: 'error',
                    duration:1000
                });
              } else {
                this.$confirm('是否提交数据', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = Object.assign({},this.groupGoods);
                    params.startTime = format(params.startTime,'yyyy-MM-dd HH:mm:ss');
                    params.endTime = format(params.endTime,'yyyy-MM-dd HH:mm:ss');
                    params.validTime = Number(params.validTime*1000*1000);
                    if(self.type=='edit'){
                      groupBuyingUpdate(params).then(response => {
                        if(response.code==200){
                          this.$message({
                              message: '修改成功',
                              type: 'success',
                              duration:1000
                          });
                          self.groupGoods = Object.assign({}, defaultGroup);
                          self.productList = [];
                          self.productIds = null;
                        }
                      });
                    } else {
                      groupBuyingAdd(params).then(response => {
                        if(response.code==200){
                          this.$message({
                              message: '添加成功',
                              type: 'success',
                              duration:1000
                          });
                          self.groupGoods = Object.assign({}, defaultGroup);
                          self.productList = [];
                          self.productIds = null;
                        }
                      });
                    }
                    
                });
              }
                
            } else {
                this.$message({
                    message: '验证失败',
                    type: 'error',
                    duration:1000
                });
                return false;
                }
            });
        },
        // 重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.groupGoods = Object.assign({}, defaultGroup)
        },
    },
  }
</script>
<style scoped>
  .input-width {
    width: 220px;
  }
  .form-container .el-form--label-right .el-form-item {
    margin-bottom: 18px;
  }
  .form-container .sp-table .el-form-item__content {
    width: auto;
  }
  .form-container .el-card__body{
    padding-top: 0;
  }
  .form-container .el-card__body .el-button{
    padding: 6px 23px !important;
  }
  .form-container .flex-group-add .el-form-item{
    display: flex;
    justify-content: center;
  }
  .form-container .flex-group-add .el-form-item .el-form-item__label{
    height: 30px;
    line-height: 30px;
  }
  .form-container .flex-group-add .el-form-item .el-form-item__content{
    margin-left: 0 !important;
    line-height: 30px;
    height: 30px;
  }
  .form-container .flex-group-add .el-form-item .el-form-item__content .el-cascader{
    line-height: 30px;
  }
 .form-container .flex-group-add .el-form-item .el-form-item__content .el-input__inner{
   line-height: 30px !important;
   height: 30px !important;
   width: 240px;
 }
  .form-container .flex-group-add .el-form-item .el-form-item__content .el-select__caret{
    line-height: 30px !important;
    height: 30px !important;
  }
  .form-container .flex-group-add .el-form-item .el-date-editor.el-input{
    width: 240px;
  }
  .form-container .flex-group-add .el-form-item .el-input__icon {
    line-height: 30px;
  }
</style>


