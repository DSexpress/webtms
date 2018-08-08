// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill'//兼容老版本浏览器

Vue.config.productionTip = false
Vue.prototype.$http = axios
// axios.defaults.baseURL = 'http://192.168.3.14:8095'
// axios.defaults.baseURL = '/api/'
Vue.prototype.$http.get("serverconfig.json").then((result) => {
  //用一个全局字段保存ApiUrl  也可以用sessionStorage存储
  axios.defaults.baseURL = result.data.ApiUrl;
}).catch((error) => {
  axios.defaults.baseURL = "http://192.168.3.14:8095"
});
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
