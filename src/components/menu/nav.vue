<template>
<div class="menu_wrap" v-show="show">
<el-menu 
  class="el-menu-vertical-demo" 
  router
  @open="handleOpen" 
  @close="handleClose" 
  :collapse="isCollapse"  
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">  
 <el-menu-item index=""  @click="isCollapse=!isCollapse;sendMsg()">
    <i :class="[isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left']"></i>
    <span slot="title" class="logo_img">
      <img src="@/assets/img/favicon.png" alt="">
    </span>
  </el-menu-item>
  <el-menu-item index="/">
    <i class="el-icon-news"></i>
      <span slot="title">基础数据</span>
  </el-menu-item>
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-menu"></i>
      <span>智能分单</span>
    </template>
    <el-menu-item-group>
      <el-menu-item index="/upload">订单上传 </el-menu-item>
      <el-menu-item index="/intellectOrder">订单分配</el-menu-item>
      <el-menu-item index="/userManage">司机管理</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-menu-item index="/statusOrder">
    <i class="el-icon-document"></i>
    <span slot="title">订单状态</span>
  </el-menu-item>
</el-menu>
<div class="others">
  <div class="username" @click="showSet=!showSet" title="退出">
    <img src="@/assets/emblemmatic-tms-logo.png" alt="">
    <span v-show="!isCollapse">{{ueserName}}</span>
  </div>
  <div class="uerSetting" v-show="showSet">
    <ul class="setList">
      <li>
        <p @click="clearAllData()"><i style="margin-right:8px;" class="el-icon-circle-close-outline"></i>清除数据</p>
        <p @click="close=true;showSet=false"><i style="margin-right:8px;" class="el-icon-setting"></i>管理员密码修改</p>
        <p @click="quit()"><i style="margin-right:8px;" class="el-icon-edit"></i>退出登陆</p>
      </li>
    </ul>
  </div>
</div>
<overlay :close.sync="close" title="密码修改">
  <edit></edit>
</overlay>
</div>
</template>
<script>
import bus from "@/assets/eventBus.js";
import overlay from "@/components/common/overlay";
import edit from "./addUser";
export default {
  data() {
    return {
      close: false,
      show: true,
      showSet: false,
      isCollapse: false,
      ueserName: sessionStorage.getItem("userName")
    };
  },
  components: { overlay, edit },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    sendMsg() {
      console.log("click");
      bus.$emit("show", "Im from router");
    },
    quit() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
    clearAllData() {
      var that = this;
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          that.$http.get("/TMS//data/deleteAll").
            then(res => {
              if (res.data.status === 1) {
                window.location.reload();
                that.$message({
                  type: "success",
                  message: "数据已清空!"
                });
              } else {
                that.$message({
                  type: "info",
                  message: "清除失败!"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    bus.$on("showNav", data => {
      this.show = data;
    });
    bus.$on("closeOverlay", data => {
      this.close = false;
    });
  }
};
</script>

<style>
.menu_wrap {
  height: 100%;
  background-color: #545c64;
  display: flex;
  flex-direction: column;
}
.el-menu-vertical-demo {
  flex: 1;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  border: none;
}
.el-menu-item,
.el-submenu__title {
  text-align: left;
}
.username {
  border-top: 1px solid whitesmoke;
  text-align: left;
  box-sizing: border-box;
  padding: 10px;
  color: white;
  cursor: pointer;
}
.username img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  vertical-align: middle;
}
.logo_img {
  display: inline-block !important;
  text-align: center;
}
.logo_img img {
  width: 50px;
}
.others {
  position: relative;
}
.uerSetting {
  border-radius: 4px;
  position: absolute;
  left: 103%;
  bottom: 10px;
  width: 290px;
  min-height: 120px;
  background: white;
  z-index: 12000;
  box-shadow: 0 2px 10px rgba(51, 51, 51, 0.2);
  padding: 18px 0;
}
.setList li p {
  text-indent: 15px;
  display: block;
  font-size: 14px;
  font-family: MicrosoftYaHeiLight;
  border-bottom: 1px solid #ededed;
  color: #484848;
  line-height: 38px;
  cursor: pointer;
}
.setList li p:hover {
  background-color: #bae7ff;
}
</style>
