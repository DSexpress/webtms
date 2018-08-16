// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';//element-ui
import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill'//兼容老版本浏览器

Vue.config.productionTip = false
Vue.prototype.$http = axios

axios.defaults.baseURL = '/api/'//代理，再config/index.js的dev.proxyTable.target更改开发时的ip地址


// 开发打包时，下面注释的代码，将ip地址作为单独的配置文件拿出来，同时注释axios.defaults.baseURL 

// Vue.prototype.$http.get("serverconfig.json").then((result) => {
//   //用一个全局字段保存ApiUrl  也可以用sessionStorage存储
//   axios.defaults.baseURL = result.data.ApiUrl;
//   Vue.prototype.$a =result.data.ApiUrl;
// }).catch((error) => {
//   axios.defaults.baseURL = "http://tms.fyyk.net"
//   Vue.prototype.$a ="http://tms.fyyk.net";
// });

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
