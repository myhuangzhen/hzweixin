<template>
  <div class="login-vue">
    <img alt class="img-manhole" src="../assets/img/loginbg.png">
    <div class="login-div">
      <div class="login-name mt10">登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
      <div class="login-user mt10">用户名</div>
      <div class="login-form mt10">
        <el-input
          class="input-name"
          v-model="account"
          placeholder="请输入用户名"
          clearable
          @on-blur="verifyAccount"
        />
      </div>
      <div class="pw-name mt10">密码</div>
      <div class="pw-div mt10" >
        <el-input
          class="input-pw"
          v-model="pwd"
          type="password"
          prefix="md-lock"
          placeholder="请输入密码"
          clearable
          @on-blur="verifyPwd"
        />
      </div>
      <div
        class="btn-submit mt10"
        @click="submit"
      ><img
        class="btn-login"
          src="@/assets/img/login.png"
          
        /></div>
    </div>
  </div>

  <!-- <div class="login-vue">
        <div class="container">
            <p class="title">招商公路视频云平台</p>
            <div class="input-c">
                <Input prefix="ios-contact" v-model="account" placeholder="用户名" clearable @on-blur="verifyAccount"/>
                <p class="error">{{accountError}}</p>
            </div>
            <div class="input-c">
                <Input type="password" v-model="pwd" prefix="md-lock" placeholder="密码" clearable @on-blur="verifyPwd"/>
                <p class="error">{{pwdError}}</p>
            </div>
            <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登陆</Button>
            <p class="account"><span @click="register">注册账号</span> | <span @click="forgetPwd">忘记密码</span></p>
        </div>
    </div> -->
</template>

<script>
// import '@/assets/css/style-anjian.css'
import axios from "axios";
import Utils from "../assets/js/utils.js";
export default {
  name: "login",
  data() {
    return {
      account: "",
      pwd: "",
      accountError: "",
      pwdError: "",
      isShowLoading: false,
      bg: {}
    };
  },
  created() {
    this.bg.backgroundImage =
      "url(" + require("../assets/img/loginbg.png") + ")";
  },
  watch: {
    // $route: {
    //   handler (route) {
    //     this.redirect = route.query && route.query.redirect
    //   },
    //   immediate: true
    // }
  },
  methods: {
    verifyAccount() {
      if (this.account !== "admin") {
        this.accountError = "账号为admin";
      } else {
        this.accountError = "";
      }
    },
    verifyPwd() {
      if (this.pwd !== "admin") {
        this.pwdError = "密码为admin";
      } else {
        this.pwdError = "";
      }
    },
    register() {},
    forgetPwd() {},
    submit() {
      var that = this;
      var pass = Utils.encrypt(this.pwd);
      const params = new URLSearchParams();
      params.append("username", this.account);
      params.append("password", pass);
      axios
        .create({
          baseURL: "http://47.92.121.146:9000",
          headers: { "Content-Type": "application/json" }
        })
        .post("/login", params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        })
        .then(function(response) {
          if (response.data.code === "200") {
            // that.$message({
            //   message: '登录成功',
            //   type: 'success'
            // })
            // alert(response.data.code)
            // localStorage.setItem('userName', that.account)
            // // 获取并存储服务器返回的AuthorizationToken信息
            // console.log(response)
            var authorization = response.headers.authorization;
            that.$store.commit("set_token", authorization);
            // 登录成功跳转页面
            that.$router.push({ path: "/home" });
            // this.$router.push('/home')
          } else if (that.account === "" || pass === "") {
            that.$message("请输入用户名、密码");
          } else {
            that.$message.error("登录失败,用户名或密码错误");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      // if (this.account === 'admin' && this.pwd === 'admin') {
      //   this.isShowLoading = true
      //   // 登陆成功 设置用户信息
      //   localStorage.setItem('userImg', 'https://avatars3.githubusercontent.com/u/22117876?s=460&v=4')
      //   localStorage.setItem('userName', 'admin')
      //   // 登陆成功 假设这里是后台返回的 token
      //   localStorage.setItem('token', 'i_am_token')
      //   this.$router.push({ path: '/home' })
      // } else {
      //   if (this.account !== 'admin') {
      //     this.accountError = '账号为admin'
      //   }

      //   if (this.pwd !== 'admin') {
      //     this.pwdError = '密码为admin'
      //   }
      // }
    }
  }
};
</script>

<style scoped>
.login-vue {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  /* background: url(../assets/img/loginbg.png) no-repeat 0 0/100% auto; */
}
.login-vue .img-manhole {
    width: 100%;
    height: 100%;
  }
.login-vue .container {
  /* background: rgba(255, 255, 255, .5);
    width: 300px; */
  text-align: center;
  border-radius: 10px;
  padding: 30px;
}
.login-vue .ivu-input {
  background-color: transparent;
  color: #fff;
  outline: #fff;
  border-color: #fff;
}
.login-vue ::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue :-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue .title {
  font-size: 24px;
  margin-bottom: 20px;
}
.login-vue .input-c {
  margin: auto;
  width: 200px;
}
.login-vue .error {
  color: red;
  text-align: left;
  margin: 5px auto;
  font-size: 12px;
  padding-left: 30px;
  height: 20px;
}
.login-vue .submit {
  width: 200px;
}
.login-vue .account {
  margin-top: 30px;
}
.login-vue .account span {
  cursor: pointer;
}
.login-vue .ivu-icon {
  color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
  color: #777;
}
::-webkit-input-placeholder {
  /*Webkit browsers*/
  color: #999;
  font-size: 16px;
}
:-moz-placeholder {
  /*Mozilla Firefox 4 to 8*/
  color: #999;
  font-size: 16px;
}
::moz-placeholder {
  /*Mozilla Firefox 19+*/
  color: #999;
  font-size: 16px;
}
:-ms-input-placeholder {
  /*Internet Explorer 10+*/
  color: #999;
  font-size: 16px;
}

.login-div {
  width: 940px;
  height: 250px;
  position: absolute;
  margin: auto;
  position:absolute;
  top: 31%;
  left: 25%;
}
.login-name {
  width:300px; 
  font-size:30px; 
  font-weight:bold; 
  text-align:center;
  margin-bottom:20px;
}
.login-user {
  width:300px; 
  font-size:20px;  
  margin-bottom:10px;
}
.login-form {
  width:300px;
  line-height: 10px;
}
.input-name {
  background-color:rgba(0,21,57,0.5);
  border:1px solid #547797; 
  color:#FFF; 
  width:277px; 
  height:35px; 
  border-radius:5px; 
  margin-bottom:15px;
}
.pw-name {
  width:300px; 
  font-size:20px;  
  margin-bottom:10px;
  margin-top: 20px;
}
.pw-div {
  width:300px;
  line-height: 10px;
}
.input-pw {
  background-color:rgba(0,21,57,0.5);
  border:1px solid #547797; 
  width:277px; 
  color:#FFF;
   height:35px; 
   border-radius:5px; 
   margin-bottom:10px;
}
.btn-submit {
  width:300px; 
  font-size:20px;  
  margin-top:30px;
}
.btn-login {
  /* width="276" */
          /* height="41" */
  display: block;
  width: 276px;
  height: 41px;
}
.el-input__inner {
  height: 35px;
}
.el-input__suffix{
  top: -10px;
}
</style>
