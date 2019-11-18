<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}"
        @click=" dialogVisible=true" type="primary">上传图片
    </el-button>
    <el-dialog title="上传图片" append-to-body :visible.sync="dialogVisible" width="800px">
      <el-upload class="editor-slide-upload"
        :action="global.fileUploadApi"
        :data="dataObj"
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        list-type="picture-card"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        align="center"
        style="padding-bottom: 30px"
        >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false" style="width: 110px;height: 40px;border-radius: 20px;margin-bottom: 20px;margin-left: 250px;">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" style="width: 110px;height: 40px;border-radius: 20px;margin-bottom: 20px;">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import {policy} from '@/api/oss'

  export default {
    name: 'editorSlideUpload',
    props: {
      color: {
        type: String,
        default: '#1890ff'
      }
    },
    data() {
      return {
        dialogVisible: false,
        listObj: [],
        fileList: [],
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: ''
        }
      }
    },
    methods: {
      checkAllSuccess() {
        return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
      },
      handleSubmit() {
        // const arr = Object.keys(this.listObj).map(v => this.listObj[v])
        const arr = this.listObj
        if (!this.checkAllSuccess()) {
          this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
          return
        }
        this.$emit('successCBK', arr);
        this.listObj = {};
        this.fileList = [];
        this.dialogVisible = false;
      },
      handleSuccess(response, file) {
        this.listObj.push({url: 'https://api.yirisanxian.com/rb/file/view/' + response, hasSuccess: true})
      },
      handleRemove(file) {
        const uid = file.uid;
        const objKeyArr = Object.keys(this.listObj);
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            delete this.listObj[objKeyArr[i]];
            return
          }
        }
      },

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .upload-container .editor-slide-upload{
    margin-bottom: 20px;
  }
</style>
