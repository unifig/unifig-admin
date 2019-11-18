<style scoped>
  .box{
    background: url("../../assets/images/login_bg.png");
    height:100%;
    width:100%;
    overflow: hidden;
    background-size:100%;
    min-height: 100vh;
    position: relative;
  }
  .login-form-layout {
    width:550px;
    height:450px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 50px 0px rgba(232,62,66,0.12);
    position: absolute;
    left: 50%;
    top: 55%;
    transform: translate(-50%,-50%);
    border-radius:22px;
  }
  .login-title {
    text-align: center;
    font-size:30px;
    font-family:FZHTJW--GB1-0;
    font-weight:normal;
    color:rgba(247,59,66,1);
    line-height:80px;
  }
  .ipt{
    width:400px;
    margin-left: 55px;
    margin-right: 55px;
    border: 0 !important;
    outline: none;
  }
  .loginBtn{
    width:160px;
    height:44px;
    background:rgba(63,133,255,1);
    box-shadow:0px 5px 10px 0px rgba(63,133,255,0.3);
    border-radius:6px;
    color: #ffffff;
    margin-left: 55px;
    margin-right: 65px;
  }
  .resetBtn{
    width:160px;
    height:44px;
    background:rgba(255,102,108,1);
    box-shadow:0px 5px 10px 0px rgba(255,102,108,0.3);
    border-radius:6px;
    color: #ffffff;
    /*margin-right: 75px;*/
  }
  .boxCon{
    text-align: center;
  }
  .titlelogo{
    width:103px;
    height:41px;
    font-size:50px;
    font-family:Adobe Heiti Std R;
    font-weight:bold;
    color:rgba(247,59,66,1);
    line-height:169px;
  }
  .titlecon{
    width:358px;
    height:38px;
    font-size:40px;
    font-family:FZLTZHK--GBK1-0;
    font-weight:normal;
    color:rgba(255,255,255,1);
    line-height:89px;
    text-shadow:0px 0px 10px rgba(0, 0, 0, 0.14);
  }
  .el-form-item__error{
    left: 50%;
  }
  .el-input__inner{
    background-color: red;
  }
</style>
<template>
  <div class="box">
    <div class="boxCon">
      <!--<span class="titlelogo">PICC</span>
      <span  class="titlecon">人保车联网管理平台</span>-->
      <!-- <img src="../../assets/images/logo@2x.png" alt="" width="100px" height="auto" style="margin-top: 8%"> -->
    </div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
       <!-- <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>-->
        <h2 class="login-title color-main">用户登录</h2>
        <el-form-item prop="username">
          <el-input name="username" class="ipt"
                    type="text"
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名">
          <span slot="prefix">
            <svg-icon icon-class="user" width="28px" height="28px"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" class="ipt"
                    :type="pwdType"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.password"
                    autoComplete="on"
                    placeholder="请输入密码">
          <span slot="prefix">
            <svg-icon icon-class="password" width="28px" height="28px"></svg-icon>
          </span>
            <span slot="suffix" @click="showPwd">
            <!--<svg-icon icon-class="eye" class="color-main"></svg-icon>-->
          </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px">
          <el-button class="loginBtn"    :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
          <el-button  class="resetBtn"    :loading="loading" @click.native.prevent="handleReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!--<img  class="login-center-layout">-->
  </div>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate';
  import login_center_bg from '@/assets/images/login_center_bg.png';
  import {getMechanismArr} from '@/api/navbar';
  import {
    setDeptId,
    removeDeptId,
    removeDeptArr,
    removeDeptArrOther,
  } from '@/utils/auth'

  const defaultlogin = {
    username: '',
    password: ''
  };
  export default {
    name: 'login',

    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 3) {
          callback(new Error('密码不能小于3位'))
        } else {
          callback()
        }
      };
      return {
        loginForm: Object.assign({}, defaultlogin),
        loginRules: {
          // username: [{required: true, trigger: 'blur', validator: validateUsername}],
          // password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        loading: false,
        pwdType: 'password',
        login_center_bg
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('Login', this.loginForm).then(() => {
              removeDeptId();
              getMechanismArr().then(response => {
                let list = response.data.options;
                if(list.length > 0){
                  this.loading = false;
                  setDeptId(list[0].deptId);
                }
                removeDeptArr();
                removeDeptArrOther();
                this.$router.push({path: '/'})
              });


            }).catch(() => {
              this.loading = false
            })
          } else {
            // console.log('参数验证不合法！');
            return false
          }
        })
      },
      handleReset(){
        this.loginForm = Object.assign({}, defaultlogin)
      },
    }
  }
</script>

