<template> 
  <div class="content-section" style="margin-top: 70px;border-bottom: 0;">
    <div class="title">
      <span class="icon"></span>营销 - 添加文章
    </div>
    <el-card class="form-container" shadow="never" style="width: 1000px;margin-top: 0;border-bottom: 0;border-top: 0;border-radius: 0;padding-top: 50px;">
    <el-form :model="article"
        :rules="rules"
        ref="addArticle"
        label-width="150px"
        label-position="right"
        size="small">
      <el-form-item label="文章标题：" prop="title">
        <el-input v-model="article.title" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="所属分类：" prop="catId">
        <el-select  v-model="article.catId" placeholder="请选择" class="input-width">
          <el-option
                v-for="item in articleTypeArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="是否显示在导航栏：">
        <el-radio-group v-model="article.navStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
       <el-form-item label="点击量：">
            <el-input-number   v-model="article.click"  size="mini" :min="0"></el-input-number>
      </el-form-item>
       <el-form-item label="点赞量：">
            <el-input-number   v-model="article.like"  size="mini" :min="0"></el-input-number>
        </el-form-item>
       <el-form-item label="分享量：">
            <el-input-number   v-model="article.share" size="mini" :min="0"></el-input-number>
        </el-form-item>
        <!-- <el-form-item label="分享的得分：">
            <el-input-number  v-model="article.shareIntegral" size="mini" :min="0"></el-input-number>
        </el-form-item> -->
      <el-form-item label="seo关键字：">
        <el-input v-model="article.keywords" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="链接：">
        <el-input v-model="article.link" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="发布时间：">
        <el-date-picker
            v-model="article.addTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="文章摘要：">
        <el-input type="textarea" style="width: 300px" v-model="article.description"></el-input>
      </el-form-item>
      <el-form-item label="缩略图：">
        <el-upload class="editor-slide-upload"
            :action="global.fileUploadApi"
            :file-list="fileList"
            :show-file-list="true"
            :on-success="handleSuccess"
            list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <a :href="article.thumb" target="_blank" v-if="article.thumb">{{article.thumb}}</a>
      </el-form-item>
      <el-form-item class="wznr" label="文章内容：">
        <tinymce :width="732" :height="300" v-model="article.content"></tinymce>
      </el-form-item>
      <el-form-item label="关联商品：">
          <el-button type="primary" @click="dialogTableVisible = true">添加关联商品</el-button>
      </el-form-item>
      <el-form-item class="spmx" label="商品明细：">
        <el-table border :data="productSelected" style="width: 100%">
            <el-table-column  label="操作" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="deleteProduct(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="productName" label="商品名称" min-width="120" align="center"></el-table-column>
            <el-table-column prop="productSubtitle" label="商品标题" min-width="200" align="center"> </el-table-column>
            <el-table-column prop="productPrice" label="商品价格" min-width="100" align="center"> </el-table-column>
            <el-table-column prop="productPic" label="商品图片" min-width="120" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.productPic" width="40px" height="40px">
                </template>
            </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item style="margin-top: 36px">
        <el-button size="medium" type="primary" @click="onSubmit('addArticle')" style="padding: 6px 23px !important;">提交</el-button>
        <el-button size="medium" @click="resetForm('addArticle')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 关联的商品 -->
    <el-dialog title="选择关联的商品" :visible.sync="dialogTableVisible" class="glsp-modal">
        <el-form label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品分类 ：">
                  <el-cascader
                      clearable
                      :options="productCateOptions"
                      v-model="productCateId"
                      @change="changeProductCate">
                  </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品名称 ：">
                  <el-select v-model="productIds"  multiple @change="changeSelected">
                      <el-option v-for="(item,index) in productList"
                          :key="index"
                          :label="item.name"
                          :value="item.id">
                      </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="resetProduct" style="border-radius: 20px;">取消</el-button>
          <el-button size="mini" type="primary" @click="addProduct" style="border-radius: 20px;">确定</el-button>
        </span>
    </el-dialog>
  </el-card>
  </div>
</template>
<script>
  import {fetchListWithChildren} from '@/api/productCate'
  import {fetchList} from '@/api/product'
  import {addArticle, getInfo,articleCategory,deleteContactProduct} from '@/api/article'
  import Tinymce from '@/components/Tinymce'
  const defaultArticle = {
    id:null,
    title: null,
    catId: null,
    keywords: null,
    link: null,
    fileUrl:null,
    addTime: null,
    enable: 1,
    description: null,
    content: null,
    catName: null,
    navStatus:1,
    click:null,
    like:null,
    share:null,
    shareIntegral:null,
    thumb:null,
  };
  export default {
    name: 'addArticle',
    components: {Tinymce},
    data() {
      return {
        fileList: [],
        article: Object.assign({}, defaultArticle),
        articleTypeArr:[],
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          catId: [
            {required: true, message: '请选择分类', trigger: 'blur'}
          ]
        },
        productModel:{},
        productCateOptions:[],
        productCateId:null,
        productSelected:[], // 选中的商品明细
        productList:null, // 商品列表
        dialogTableVisible:false,
        productIds:[], // dialog选中的商品
        productAdd:[], // dialog 商品添加
        type:this.$route.query.type,
        articleId:this.$route.query.id?this.$route.query.id:null
      }
    },
    created () {
      if (this.type == 'edit') {
        this.getInfo()
      }
      this.getArticleCategory();
      this.getProductList();
      this.getProductAttrCateList()
    },
    methods:{
        // 1.获取文章分类
        getArticleCategory(){
            this.listLoading=true;
            let params = {
                pageNum: 1,
                pageSize: 1000
            }
            articleCategory(params).then(response => {
                this.listLoading = false;
                this.articleTypeArr = response.data.map(item=>{
                    return {
                        id:item.id,
                        name:item.catName
                    }
                });
            });
        },
        // 2.文章详情
        getInfo () {
            getInfo({id: this.$route.query.id}).then(res => {
                if (res.success) {
                    let data = res.data;
                    this.article.id = data.id;
                    this.article.title =  data.title,
                    this.article.keywords = data.keywords,
                     this.article.link= data.link;
                    //  this.article.addTime = data.addTime,
                    this.article.fileUrl =  data.fileUrl,
                    this.article.keywords = data.keywords,
                    this.article.description = data.description;
                    this.article.content =  data.content,
                    this.article.keywords = data.keywords,
                    this.article.catName= data.catName,
                    this.article.catId = data.catId,
                    this.article.navStatus = data.navStatus,
                    this.article.click = data.click?data.click:'0';
                    this.article.like = data.like;
                    this.article.share = data.share;
                    this.article.shareIntegral = data.shareIntegral;
                    this.productSelected = Array.concat(res.data.productList);
                }
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

        },
        // 添加商品
        addProduct(){
           let ids = this.productIds;
           let selected = this.productList.filter(item=>{
               if(ids.indexOf(item.id)>-1 ){
                   return item
               }
           })
           let productArr = selected.map(item =>{
               return {
                    id:null,
                    articleId:this.articleId,
                    productId:item.id,
                    productName:item.name,
                    productPic:item.pic,
                    productSubtitle:item.subTitle,
                    productPrice:item.price,
                    productCatId: item.productCategoryId,
                    productCatName: item.productCategoryName
               }
           })
           this.productSelected.push(...productArr)
           this.dialogTableVisible = false;
        },

        // 重置商品关联
        resetProduct(){
            this.productCateId = null;
            this.productIds = [];
            this.dialogTableVisible = false
        },
        // 删除关联的商品
        deleteProduct(index,row){
            this.$confirm('是否要删除该商品', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'})
            .then(() => {
                let id = row.id;
                if(id){
                    deleteContactProduct({id:id}).then(res =>{
                      this.productSelected.splice(index,1)
                })
                }else{
                    this.productSelected.splice(index,1)
                }
            });

        },
        // 改变商品分类
        changeProductCate(id){
            let ids = id.concat().pop();
            this.productList = [];
            this.getProductList(ids)
        },
        // 提交
        onSubmit(formName) {
          console.log(formName)
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$confirm('是否提交数据', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    let params = Object.assign({},this.article);
                    params.productList = this.productSelected
                addArticle(params).then(res => {
                    if (res.success) {
                    this.$message({
                        message: res.msg,
                        type: 'success',
                        duration:1000
                    });
                    this.$router.push({
                        path: '/sms/article'
                    })
                    }
                })
                });
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
            this.article = Object.assign({}, defaultArticle)
        },
        // 图片上传成功
        handleSuccess (res) {
            this.article.fileUrl = 'https://api.yirisanxian.com/rb/file/view/'+res;
            this.article.thumb = 'https://api.yirisanxian.com/rb/file/view/'+res;
        }
    },
  }
</script>
<style scoped>
  .input-width,.el-date-editor--date {
    width: 240px;
  }
  .form-container >>> .el-card__body {
    padding-top: 0;
  }
  .form-container >>> .el-form-item .el-form-item__label {
    padding-right: 10px;
  }
  .form-container >>> .el-upload--picture {
    padding: 6px 7px;
  }
  .form-container >>> .wznr .el-form-item__content{
    width: auto;
  }
  .form-container >>> .spmx .el-form-item__content{
    width: auto;
  }
  .form-container >>> .glsp-modal .el-dialog__body .el-form-item__content{
    height: 30px;
    line-height: 30px;
  }
  .form-container >>> .glsp-modal .el-dialog__body .el-form-item__content .el-cascader__label{
    height: 30px;
    line-height: 30px;
  }
  .form-container >>> .glsp-modal .el-dialog__body .el-form-item__content .el-cascader{
    line-height: 30px;
  }
  .form-container >>> .glsp-modal .el-dialog__body .el-form-item__content .el-select{
    line-height: 30px;
  }
  .form-container >>> .glsp-modal .el-dialog__body .el-form-item__content .el-input__inner{
    height: 30px !important;
    line-height: 30px;
  }
  .form-container >>> .glsp-modal .el-dialog__body .el-form-item__content .el-input__icon {
    line-height: 30px;
  }
</style>


