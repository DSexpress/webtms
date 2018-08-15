<template>
  <transition name='fade'>
    <div   class="overlay_main overlay" v-show="close">
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
    return {
      canMove:this.moves
    };
  },
  // props: ["close", "title"],
  props: {
    close: Boolean,
    title: String,
    moves: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    switchs() {
      this.$emit("update:close", false);
    },
    changeSatus() {
      //事件
      this.$emit("changeSatus", false); //触发自定义事件
    },
    move() {
      if (this.canMove) {
        var overlay = document.getElementsByClassName("overlay");
        for (let i = 0; i < overlay.length; i++) {
          overlay[i].onmousedown = function(e) {
            var x = e.clientX;
            var y = e.clientY;
            var left = overlay[i].offsetLeft;
            var top = overlay[i].offsetTop;
            overlay[i].onmousemove = function(e) {
              overlay[i].style.left = e.clientX - (x - left) + "px";
              overlay[i].style.top = e.clientY - (y - top) + "px";
            };
          };
          overlay[i].onmouseup = function(e) {
            overlay[i].onmousemove = null;
          };
        }
      }
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.move();
    })
   
  }
};
</script>

<style lang="css">
.overlay_main {
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 14px;
  min-width: 280px;
  min-height: 120px;
  z-index: 109;
  border-radius: 4px;
  box-shadow: 5px 5px 10px #dbdbdb;
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
