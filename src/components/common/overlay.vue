<template>
  <transition name='fade'>
    <div  id="overlay" class="overlay_main" v-show="close">
      <div class="overlay_title">
        <span>{{title}}</span>
        <i class="el-icon-close right" title="关闭" @click="switchs();changeSatus()"></i>
      </div>
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  name: "overlay",
  data() {
    return {};
  },
  props: ["close", "title"],
  methods: {
    switchs() {
      this.$emit("update:close", false);
    },
    changeSatus() {
      //事件
      this.$emit("changeSatus", false); //触发自定义事件
    },
    move() {
      overlay.onmousedown = function(e) {
        var x = e.clientX;
        var y = e.clientY;
        var left = overlay.offsetLeft;
        var top = overlay.offsetTop;
        overlay.onmousemove = function(e) {
          overlay.style.left = e.clientX - (x - left) + "px";
          overlay.style.top = e.clientY - (y - top) + "px";
        };
      };

      overlay.onmouseup = function(e) {
        overlay.onmousemove = null;
      };
    }
  },
  mounted() {
    this.move();
  }
};
</script>

<style lang="css">
.overlay_main {
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-30%, -50%);
  box-sizing: border-box;
  padding: 14px;
  min-width: 280px;
  min-height: 120px;
  z-index: 10001;
}
.el-icon-close {
  cursor: pointer;
}
.overlay_title {
  overflow: hidden;
  text-align: left;
  margin-bottom: 12px;
  cursor: move;
}
</style>
