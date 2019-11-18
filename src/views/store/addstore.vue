<template>
  <div class="app-container xzdp" align="center">
    <div class="content-section" align="left">
      <div class="title">
        <i class="icon"></i>
        店铺 - 新增店铺
      </div>
    </div>
    <section class="store-body sj-detail" style="width: 1330px; background-color: #fff;padding-top: 50px;border-left: 1px solid #EBEEF5;border-right:1px solid #EBEEF5;">
      <!--<span class="title" style="">商家基本信息</span>-->
      <el-form ref="storeInfo" :model="storeInfo" label-width="160px" :rules="rules">
        <el-row>
          <el-col :span="6">
            <el-form-item label="商家名称：" prop="name">
              <el-input v-model="storeInfo.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-form-item label="商家电话：" prop="phone">
              <el-input v-model="storeInfo.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="经度：" prop="longitude">
              <el-input v-model="storeInfo.longitude" disabled></el-input>
              <span @click="centerDialogVisible = true" class="spanBtn">点击选择经纬度</span>
            </el-form-item>
          </el-col>
          <!--<el-col :span="6" :offset="3">-->
          <!--<el-form-item label="优惠券数量">-->
          <!--<el-input v-model="storeInfo.name"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="6" :offset="3">
            <el-form-item label="纬度：" prop="latitude">
              <el-input v-model="storeInfo.latitude" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="营业时间：" prop="businessHours">
              <el-input v-model="storeInfo.businessHours"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="portrait">
          <span class="n">商家头像：</span>
          <el-upload
            class="avatar-uploader"
            action="https://api.yirisanxian.com/rb/file/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商家地址：" prop="area">
              <el-input v-model="storeInfo.area" class="sj-add"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="describe">
          <span class="n">商家介绍：</span>
          <tinymce :width="732" :height="300" v-model="storeInfo.content" class="h"></tinymce>
        </div>
        <div class="banner">
          <span class="n">商家banner：</span>
          <el-upload
            align="left"
            action="https://api.yirisanxian.com/rb/file/upload"
            list-type="picture-card"
            :file-list="filelist"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
        <div class="employees">
          <span class="n">商家员工：</span>
          <el-button type="primary" @click="associated" style="font-size:16px;margin-left: 1018px;padding: 6px 7px;">关联员工</el-button>
          <el-table ref="productTable"
                               :data="employeesList"
                               style="width: 1120px;max-height: 314px;overflow-y: auto;margin-left: 158px;margin-top: 30px;"
                               border>
          <el-table-column label="序号" align="center" type="index" width="60">></el-table-column>
          <el-table-column label="员工账号" width="200" align="center">
            <template slot-scope="scope">
              {{scope.row.accountNumber}}
            </template>
          </el-table-column>
          <el-table-column label="员工名称" width="200" align="center">
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column label="员工职位" width="200" align="center">
            <template slot-scope="scope">
              {{scope.row.type == '0' ? '普通员工' : '管理员'}}
            </template>
          </el-table-column>
          <el-table-column label="员工状态" width="190" align="center">
            <template slot-scope="scope">
              {{scope.row.status == '0' ? '启用': scope.row.status == '1' ? '停用' : '解除关联'}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                style="font-size: 12px"
                @click="stop(scope.row.id, scope.row.userId, scope.row.status)">{{scope.row.status == '0' ? '停用':  '启用'}}
              </el-button>
              <el-button
                size="mini"
                type="text"
                style="font-size: 12px"
                @click="stop(scope.row.id, scope.row.userId, scope.row.status, 'remove')">解除关联
              </el-button>
            </template>
          </el-table-column>
        </el-table>
          <el-row style="margin-top: 32px;text-align: center">
            <el-col>
              <el-form-item>
                <el-button type="primary" @click="submitForm" style="">提交</el-button>
                <el-button @click="backStore">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </section>
    <baidumap @listen="getMap" :centerDialogVisible="centerDialogVisible"></baidumap>
    <el-dialog
      title="关联员工"
      :visible.sync="mployeesQuery"
      width="970px"
      class="glyg"
    >
      <el-form ref="employeesQuery" :model="employeesQuery" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="手机号码：">
              <el-input v-model="employeesQuery.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" :offset="2">
              <el-button
                @click="getSelectList()"
                size="small" type="primary" icon="el-icon-search">
                搜索
              </el-button>
          </el-col>
        </el-row>
      <el-table ref="productTable"
                :data="searchlist"
                style="width: 100%;max-height: 290px;overflow-y: auto;margin-bottom: 24px;"
                @selection-change="selectChange"
                border>
        <el-table-column
          type="selection"
          width="60"
          align="center"
        >
        </el-table-column>
        <el-table-column label="用户昵称" width="283" align="center">
          <template slot-scope="scope">
            {{scope.row.accountName}}
          </template>
        </el-table-column>
        <el-table-column label="用户手机号" width="265" align="center">
          <template slot-scope="scope">
            {{scope.row.mobile}}
          </template>
        </el-table-column>
        <el-table-column label="归属机构" width="283" align="center">
          <template slot-scope="scope">
            {{scope.row.deptName}}
          </template>
        </el-table-column>
      </el-table>
        <el-row>
          <el-col :span="8">
            <el-form-item label="选择员工角色：" label-width="108px">
              <el-select v-model="role" placeholder="请选员工角色">
                <el-option label="普通员工" value="0"></el-option>
                <el-option label="管理员" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mployeesQuery = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="modalQuery" width="500px"
      class="jcgl"
    >
      确定要{{statusText}}该员工么吗?
      <span slot="footer" class="dialog-footer">
        <el-button @click="modalQuery = false" style="line-height: 28px;">取 消</el-button>
        <el-button type="primary" @click="primaryConfirm" style="line-height: 28px;">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss">
  .xzdp {
    .sj-detail {
      padding: 20px;
      .title {
        font-weight: 700;
        color: #000;
        font-size: 22px;
        margin-bottom: 16px;
        display: block;
        line-height: 26px;
      }
      .el-row {
        height: 30px;
        margin-bottom: 24px;
        .el-col {
          height: 30px;
          .el-form-item__label {
            line-height: 30px;
          }
          .el-form-item__content {
            height: 30px;
            position: relative;
            .el-input {
              height: 30px;
              .el-input__inner {
                height: 30px;
                line-height: 30px;
                float: left;
              }
            }
            .spanBtn {
              position: absolute;
              top: 0;
              right: -148px;
              line-height: 32px;
              height: 32px;
              display: inline-block;
              color: #999999;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
      .portrait {
        height: 178px;
        margin-bottom: 24px;
        .n {
          display: inline-block;
          width: 160px;
          text-align: right;
          height: 178px;
          line-height: 178px;
          float: left;
          padding-right: 12px;
          font-size: 14px;
          color: #606266;
        }
        .avatar-uploader .el-upload {
          float: left;
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
      }
      .describe {
        height: 402px;
        margin-bottom: 24px;
        .n {
          display: inline-block;
          width: 160px;
          text-align: right;
          height: 20px;
          line-height: 20px;
          float: left;
          padding-right: 12px;
          font-size: 14px;
          color: #606266;
        }
        .h {
          float: left;
        }
      }
      .banner {
        margin-bottom: 24px;
        .n {
          display: inline-block;
          width: 160px;
          text-align: right;
          height: 20px;
          line-height: 20px;
          float: left;
          padding-right: 12px;
          font-size: 14px;
          color: #606266;
        }
      }
      .employees {
        .n {
          display: inline-block;
          width: 160px;
          text-align: right;
          height: 20px;
          line-height: 20px;
          float: left;
          padding-right: 12px;
          font-size: 14px;
          color: #606266;
        }
      }
    }
    .el-dialog {
      .el-dialog__body {
        padding: 30px 30px 0;
        .el-row {
          height: 32px;
          margin-bottom: 24px;
          .el-col {
            height: 32px;
            .el-form-item__label {
              line-height: 32px;
            }
            .el-form-item__content {
              height: 32px;
              position: relative;
              .el-input {
                height: 32px;
                .el-input__inner {
                  height: 32px;
                  line-height: 32px;
                  float: left;
                }
              }
              .spanBtn {
                position: absolute;
                top: 0;
                right: -110px;
                line-height: 32px;
                height: 32px;
                display: inline-block;
                color: #999999;
                &:hover {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
<script>
  import Tinymce from '@/components/Tinymce'
  import baidumap from '@/components/map'
  // import gloabl from '@/utils/gloabl'
  import {submitStore, getStoreDetail, updataStore, accountList, getStoreEmployees, associated, changeStatus} from '@/api/store'

  export default {
    components: {Tinymce, baidumap},
    data() {
      return {
        centerDialogVisible: false,
        storeInfo: {
          name: '',
          phone: '',
          businessHours: '',
          longitude: '',
          latitude: '',
          area: '',
          logo: '',
          picture: '',
          content: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入商家名称', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入商家电话', trigger: 'blur'},
          ],
          businessHours: [
            {required: true, message: '请输入营业时间', trigger: 'blur'},
          ],
          longitude: [
            {required: true, message: '请选择经度', trigger: 'blur'},
          ],
          latitude: [
            {required: true, message: '请选择纬度', trigger: 'blur'},
          ],
          area: [
            {required: true, message: '请输入商家地址', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入商家名称', trigger: 'blur'},
          ],
        },
        imageUrl: '',
        dialogImageUrl: '',
        dialogVisible: false,
        filelist: [],
        filelistLength: '',
        storeId: '',
        mployeesQuery: false,
        employeesList: [],
        employeesQuery: {
          mobile: ''
        },
        searchlist: [],
        role: '0',
        selectList: [],
        filterList: [],
        modalQuery: false,
        statusText: '',
        selectId: '',
        userId: ''
      };
    },
    created() {
      if (this.$route.query.type == 'edit') {
        this.getData()
        this.getassociatedList()
      }
    },
    methods: {
      // 获取经纬度
      getMap(data) {
        let arr = data.split(',')
        this.storeInfo.longitude = arr[0]
        this.storeInfo.latitude = arr[1]
        this.centerDialogVisible = false
      },
      // 头像上传成功回调
      handleAvatarSuccess(res, file) {
        let url = 'https://api.yirisanxian.com/rb/file/view/' + res
        this.storeInfo.logo = url
        this.imageUrl = url
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;
        //
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      },
      // banner上传成功回调
      handleSuccess(response, file, fileList) {
        this.filelistLength = fileList.length
        fileList[fileList.length - 1].url = 'https://api.yirisanxian.com/rb/file/view/' + response
        this.filelist = JSON.parse(JSON.stringify(fileList))
      },
      // banner上传之前回调
      beforeUpload(response, file, fileList) {
        if (this.filelistLength == 5) {
          this.$message.error('上传不能超过五张');
          return false
        }
      },
      // banner删除成功回调
      handleRemove(file, fileList) {
        this.filelistLength = fileList.length
        this.filelist = JSON.parse(JSON.stringify(fileList))
      },
      // banner放大
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 提交
      submitForm() {
        this.$refs['storeInfo'].validate((valid) => {
          if (valid) {
            if (this.filelist.length != 0) {
              let arr = []
              this.filelist.forEach((item) => {
                arr.push(item.url)
              })
              this.storeInfo.picture = arr.join(',')
            }
            let params = {
              area: this.storeInfo.area,
              name: this.storeInfo.name,
              phone: this.storeInfo.phone,
              businessHours: this.storeInfo.businessHours,
              longitude: this.storeInfo.longitude,
              latitude: this.storeInfo.latitude,
              logo: this.storeInfo.logo,
              picture: this.storeInfo.picture,
              intro: this.storeInfo.content,
              id: this.storeId ? this.storeId : '',
              shopStaffLists: this.$route.query.type == 'edit' ? [] : this.filterList
            }
            if (this.$route.query.type == 'edit') {
              updataStore(params).then((res) => {
                if (res.success) {
                  this.$message.success('编辑成功');
                  this.$router.push({
                    path: '/store/list',
                  })
                } else {
                  this.$message.error('编辑失败');
                }
              })
            } else {
              submitStore(params).then((res) => {
                if (res.success) {
                  this.$message.success('新增成功');
                  this.$router.push({
                    path: '/store/list',
                  })
                } else {
                  this.$message.error('新增失败');
                }
              })
            }
          } else {
            this.$message.error('信息填写不完整');
            return false;
          }
        });
      },
      // 返回
      backStore() {
        this.$router.push({
          path: '/store/list'
        })
      },
      // 获取详情
      getData() {
        let params = {
          id: this.$route.query.id
        }
        getStoreDetail(params).then((res) => {
          if (res.success) {
            let detailData = res.data
            this.storeInfo.name = detailData.name
            this.storeInfo.phone = detailData.phone
            this.storeInfo.businessHours = detailData.businessHours
            this.storeInfo.longitude = detailData.longitude
            this.storeInfo.latitude = detailData.latitude
            this.storeInfo.area = detailData.area
            this.storeInfo.logo = detailData.logo
            this.imageUrl = detailData.logo
            this.storeId = detailData.id
            this.storeInfo.picture = detailData.picture
            this.storeInfo.content = detailData.intro
            let imgArr = this.storeInfo.picture.split(',')
            imgArr.forEach((item, i) => {
              this.filelist.push({
                url: item,
                name: i
              })
            })
          } else {
            this.$message.error('获取失败');
          }
        })
      },
      // 获取员工列表
      getassociatedList () {
        let pa = {
          page: '1',
          row: '9999',
          shopId: this.$route.query.id
        }
        getStoreEmployees(pa).then((res) => {
          if (res.success) {
            this.employeesList = JSON.parse(JSON.stringify(res.data))
          } else {
            this.$message.error('获取失败');
          }
        })
      },
      // 新增关联员工
      associated () {
      this.getSelectList()
      },
      // 员工列表
      getSelectList () {
        let params = {
          pageNum: 1,
          pageSize: 9999,
          mobile: this.employeesQuery.mobile
        }
        accountList(params).then((res) => {
          if (res.success) {
            this.searchlist = res.data
            this.mployeesQuery = true
            this.employeesQuery.mobile = ''
            this.role = '0'
            this.selectList = []
          } else {

          }
        })
      },
      // 选择员工
      selectChange (val) {
        this.selectList = JSON.parse(JSON.stringify(val))
      },
      // 关联员工
      handleConfirm () {
        if (this.selectList.length != 0 ) {
          let arr = []
          this.selectList.forEach((item) => {
            let obj = {
              accountNumber: item.mobile,
              status: '0',
              type: this.role,
              userId: item.id,
              name: item.username,
              shopId: this.storeId
            }
            arr.push(obj)
          })
          if (this.$route.query.type != 'edit') {
            arr.forEach((n) => {
              this.filterList.push(n)
            })
            let ob = {};
            this.filterList = this.filterList.reduce(function(item, next) {
              ob[next.userId] ? '' : ob[next.userId] = true && item.push(next);
              return item;
              }, []);
            this.employeesList = JSON.parse(JSON.stringify(this.filterList))
          } else {
            this.filterList = arr
            associated(this.filterList).then((res) => {
              if (res.success) {
                this.$message.success('关联成功');
                this.getassociatedList()
              } else {
                this.$message.error('关联失败');
              }
            })
          }
          this.mployeesQuery = false
        } else {
          this.$message.error('请选择员工');
        }
      },
      // 停用启用
      stop (id, userId, status, type) {
        this.modalQuery = true;
        this.selectId = id
        this.userId = userId
        status = String(status)
        if (type == 'remove') {
          this.statusText = '解除关联'
        } else {
          switch (status) {
            case '0':
              this.statusText = '停用'
              break;
            case '1':
              this.statusText = '启用'
              break;
          }
        }
      },
      // 确认操作
      primaryConfirm () {
        this.modalQuery = false;
        if (this.$route.query.type != 'edit') {
          let index = this.filterList.findIndex((item) => {
            return item.userId == this.userId
          })
          if (this.statusText == '解除关联') {
            this.filterList.splice(index, 1)
          } else {
            this.filterList[index].status = this.filterList[index].status == '0' ? '1' : '0'
          }
          this.employeesList = JSON.parse(JSON.stringify(this.filterList))
          this.$message.success('修改状态成功');
        } else {
          let params = {
            id: this.selectId,
            status: this.statusText == '停用' ? '1' : this.statusText == '启用' ? '0' : '2'
          }
          if (this.statusText == '解除关联') {
            changeStatus(params).then((res) => {
              if (res.success) {
                this.$message.success('修改状态成功');
                this.getassociatedList()
              } else {
                this.$message.error('修改状态失败');
              }
            })
          } else {
            changeStatus(params).then((res) => {
              if (res.success) {
                this.$message.success('修改状态成功');
                this.getassociatedList()
              } else {
                this.$message.error('修改状态失败');
              }
            })
          }
        }
      }
    }
  };
</script>
<style scoped>
.app-container >>> .el-form-item__content {
  margin-left: 0;
}
.app-container >>> .el-form-item .el-input__inner {
  width: 240px;
  height: 30px;
  line-height: 30px;
}
.app-container >>> .sj-add .el-input__inner{
  width: 485px;
}
.app-container >>> .el-button {
  padding: 6px 23px;
  font-size: 16px;
}
.app-container >>> .editor-upload-btn .el-button {
  padding: 5px 14px;
  font-size: 16px;
}
.app-container >>> .jcgl .el-dialog__footer {
  padding-top: 40px;
}
.app-container >>> .glyg .el-dialog__footer button{
    line-height: 30px;
  }
</style>


