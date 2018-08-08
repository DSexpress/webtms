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
   <div class="username">
     <img src="@/assets/emblemmatic-tms-logo.png" alt="">
     <span v-show="!isCollapse">管理员</span>
   </div>
</div>
</div>
</template>
<script>
import bus from "@/assets/eventBus.js";
export default {
  data() {
    return {
      show:true,
      isCollapse: false
    };
  },
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
    }
  },
  mounted() {
    bus.$on('showNav',(data)=>{
      this.show = data;
    })
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
.el-menu{
  border: none;
}
.el-menu-item,
.el-submenu__title {
  text-align: left;
}
.username{
    border-top: 1px solid whitesmoke;
  text-align: left;
  box-sizing: border-box;
  padding: 10px;
  color: white;
}
.username img{
  width: 38px;
  height: 38px;
  border-radius: 50%;
  overflow: hidden;
  vertical-align: middle;
}
.logo_img{
  display: inline-block !important;
  text-align: center;
}
.logo_img img{
  width: 50px;
}
</style>
