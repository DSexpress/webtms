<template>
    <div class="login_main">
     <div class="login_wrap">
        <h1 style="margin-bottom:18px;">袋鼠速运管理系统</h1>
        <el-input
            prefix-icon='el-icon-edit'
            class="login_input"
            placeholder="请输入内容"
            v-model="ruleForm2.username"
            clearable>
        </el-input>
        <el-input
            prefix-icon='el-icon-edit-outline'
            type='password'
            class="login_input"
            placeholder="请输入内容"
            v-model="ruleForm2.password"
            clearable>
        </el-input>
         <el-button class="login_input" type="primary" @click="Login()">登陆</el-button>
     </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm2: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    Login() {
      //  XHR
      this.$http
        .get("/TMS/admin/login?name=" + this.ruleForm2.username + "&pwd=" + this.ruleForm2.password)
        .then(res => {
          if (res.data.status === 1) {
             sessionStorage.setItem("accessToken",res.data.data.aid);
            sessionStorage.setItem("userName",res.data.data.aaccount);
            this.$router.push("/");          
          } else {
            this.$notify.error({
              title: "错误",
              message: "登陆失败，用户名密码或错误！"
            });
          }
        });
      // sessionStorage.setItem("accessToken", "1111111111");
      // this.$router.push("/")
    }
  }
};
</script>
<style>
.login_main {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url("../assets/bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  text-align: center;
}
.login_wrap {
  width: 600px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 10px;
  background: white;
  border-radius: 8px;
}
.login_input {
  width: 55% !important;
  margin-top: 15px !important;
}
</style>
