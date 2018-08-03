<template lang="html">
  <transition name='fade'>
    <div  class="overlay_main" v-show="close">
      <span class="close" title="关闭" @click="switchs();changeSatus()"></span>
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
  props: ["close", 'title'],
  methods: {
    switchs() {
      this.$emit("update:close", false);
    },
    changeSatus() {
      //事件
      this.$emit("changeSatus", false); //触发自定义事件
    }
  }
};
</script>

<style lang="css">
.overlay_main {
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(50%, -50%);
  box-sizing: border-box;
  padding: 14px;
  min-width: 280px;
  min-height: 120px;
  z-index: 1000;
}
</style>
