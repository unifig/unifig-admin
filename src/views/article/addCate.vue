<template>
  <div class="content-section" style="margin-top: 70px;border-bottom: 0;">
    <div class="title">
      <span class="icon"></span>营销 - 添加文章分类
    </div>
    <el-card class="form-container" shadow="never" style="padding-top: 70px;margin-top: 0;border-radius: 0;border-top: 0;border-bottom: 0;">
      <el-form  ref="articleCateFrom"
                :model="articleCate"
                :rules="rules"
                label-width="150px"
                label-position="right">
        <el-form-item label="文章类型：" prop="catName">
          <el-input placeholder="请填写文章类型名称" v-model="articleCate.catName"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="articleCate.sortOrder"></el-input>
        </el-form-item>
        <el-form-item label="是否显示：">
          <el-radio-group v-model="articleCate.showStatus">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否显示在导航栏：">
          <el-radio-group v-model="articleCate.navStatus">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分类图标：">
          <single-upload v-model="articleCate.pic"></single-upload>
        </el-form-item>
        <el-form-item label="关键词：">
          <el-input v-model="articleCate.keywords"></el-input>
        </el-form-item>
        <el-form-item label="分类描述：">
          <el-input type="textarea" :autosize="true" v-model="articleCate.catDesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('articleCateFrom')" style="padding: 6px 23px !important;">提交</el-button>
          <el-button v-if="!isEdit" @click="resetForm('articleCateFrom')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  import SingleUpload from '@/components/Upload/singleUpload';
  import {fetchListWithChildren} from '@/api/productCate'
  import {fetchList} from '@/api/product'
  import {articleList,getArticleCateInfo,createArticleCate,updateArticleCate} from '@/api/article.js'
  const defaultArticleCate = {
    catName:'',
    sortOrder:'',
    showStatus:'',
    navStatus :'',
    pic:'',
    keywords :'',
    catDesc:'',
  };
  export default {
    name: "ArticleCateDetail",
    components: {SingleUpload},
    data() {
      return {
        articleCate:{
            catName:'',
            sortOrder:'',
            showStatus:'',
            navStatus :'',
            pic:'',
            keywords :'',
            catDesc:'',
        },
        rules: {
          catName: [
            {required: true, message: '请输入文章分类名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ]
        },
      }
    },
    computed:{
        isEdit(){
            if(this.$route.query.id){
                return true
            }else{
                return false
            }
        }
    },
    created() {
      if (this.isEdit) {
        // 1.详情
        getArticleCateInfo({id:this.$route.query.id}).then(response => {
            this.articleCate = response.data;
        });
      } else {
        this.articleCate = Object.assign({}, defaultArticleCate);
      }
    
    },
    methods: {
      // 1.提交
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                let params = Object.assign({},this.articleCate);
                params.id = this.$route.query.id;   
                updateArticleCate(params).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back(-1);
                });
              } else {
                  let params = Object.assign({},this.articleCate);
                  params.id = null;
                createArticleCate(this.articleCate).then(response => {
                  this.$refs[formName].resetFields();
                  this.resetForm(formName);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                   this.$router.back(-1);
                });
              }
            });
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.articleCate = Object.assign({}, defaultArticleCate);
      }
    },
  }
</script>
<style scoped>
  .form-container >>> .el-upload--picture .el-button--primary{
    padding: 6px 7px !important;
  }
  .form-container >>> .el-card__body{
    padding-top: 0;
  }
  .form-container >>> .el-form-item{
    margin-bottom: 25px;
  }
  .form-container >>> .el-form-item__label{
    padding-right: 10px;
  }
  .form-container >>> .el-form-item__content .el-input__inner{
    height: 30px;
    line-height: 30px;
    width: 400px;
  }
  .form-container >>> .el-form-item__content .el-textarea .el-textarea__inner{
    max-width: 400px;
    width: 400px;
    height: 50px !important;
    min-height: 50px !important;
  }
</style>
