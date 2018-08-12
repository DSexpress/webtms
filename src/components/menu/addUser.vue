<template>
    <div v-loading.fullscreen.lock="loading" style="padding:0 20px;">
      <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="管理员用户名">
          <el-input v-model="uesrName"  :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="旧密码">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>       
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import bus from "@/assets/eventBus.js";
export default {
  data() {
    return {
      loading: false,
      uesrName: sessionStorage.getItem("userName"),
      ruleForm2: {
        pass: "",
        checkPass: ""
      }
    };
  },
  methods: {
    submitForm() {
      if (this.ruleForm2.pass && this.ruleForm2.checkPass) {
        this.loading = true;
        this.$http
          .get(
            "/TMS/admin/changePwdById?id=" +
              sessionStorage.getItem("accessToken") +
              "&oldPwd=" +
              this.ruleForm2.pass +
              "&pwd=" +
              this.ruleForm2.checkPass
          )
          .then(res => {
            if (res.data.status == 1) {
              this.loading = false;
              bus.$emit("closeOverlay", false);
              this.$notify({
                title: "提示",
                message: "密码修改成功！",
                duration: 1500,
                type: "success"
              });
            }
          });
      } else {
        this.$notify({
          title: "提示",
          message: "信息填写不完整！",
          duration: 1500,
          type: "warning"
        });
      }
    },
    resetForm(formName) {
      this.ruleForm2.pass = "";
      this.ruleForm2.checkPass = "";
    }
  }
};
</script>

<style>
</style>
