<template>
    <div v-loading.fullscreen.lock="loading" style="padding:0 20px;">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="uesrName">
          <el-input v-model="ruleForm2.uesrName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
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
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("名称不能为空"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading:false,
      ruleForm2: {
        pass: "",
        checkPass: "",
        uesrName: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        uesrName: [{ validator: checkUser, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      if (this.ruleForm2.pass && this.ruleForm2.uesrName) {
        this.loading=true;
        this.$http
          .get(
            "/TMS/user/addUser?userName=" +
              this.ruleForm2.uesrName +
              "&pwd=" +
              this.ruleForm2.pass
          )
          .then(res => {
            if (res.data.status == 1) {
              this.loading=false;
              bus.$emit("closeOverlay",false)
              this.$notify({
                title: "提示",
                message: "新增成功！",
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
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
</style>
