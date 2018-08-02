<template>
  <div id="app">
    <div class="app_main">
      <div class="app_main_div1">
         <menus style="width:100%"></menus>
      </div>
     <div class=" app_main_div2">
         <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import menus from './components/menu/index'
export default {
  name: 'App',
  components:{menus}
}
</script>

<style>
html,body{
    height: 100%;
    width: 100%;
    overflow: hidden;
    padding: 0%;
    margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.app_main{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 100%;
}
.app_main .app_main_col,.app_main_col .app_main_div{
  height: 100%;
}
.app_main_div2{
  flex: 1;
}
</style>
