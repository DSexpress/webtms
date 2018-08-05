// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//模拟数据,有接口后可以删除
import order from "@/mock/order.js"
import status from "@/mock/status.js"
import newOrder from "@/mock/newOrder.js"

Vue.config.productionTip = false
Vue.prototype.$http = axios
// axios.defaults.baseURL = 'http://10.42.3.210:80'
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
