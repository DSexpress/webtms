<template>
<!-- 主路由载体 -->
    <div class="app_main">
      <div class="app_main_div1">
         <menus style="width:100%"></menus>
      </div>
     <div class=" app_main_div2">
         <router-view/>
      </div>
    </div>
</template>

<script>
import menus from '../menu/nav'
export default {
  components:{menus}
};
</script>

<style>
.app_main {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 100%;
}
.app_main .app_main_col,
.app_main_col .app_main_div {
  height: 100%;
}
.app_main_div2 {
  flex: 1;
}
</style>
