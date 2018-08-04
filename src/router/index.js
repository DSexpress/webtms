import Vue from 'vue'
import Router from 'vue-router'
const index = () =>
  import ('@/components/index/index');
const maps = () =>
  import ('@/components/index/map');
const statusOrder = () =>
  import ('@/components/statusOrder/index.vue'); //智能分单
const intellectOrder = () =>
  import ('@/components/intellectOrder/index.vue'); //智能分单
const upload = () =>
  import ('@/components/uploadOrder/index'); //订单分配
const login = () =>
  import ('@/components/login');
Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/',
      component: index,
      meta: {
        requiresAuth: true
      },
      children: [{
          path: '',
          name: 'maps',
          component: maps,
          meta: {
            requiresAuth: true
          }
        },
        { //订单上传
          path: 'upload',
          name: 'upload',
          component: upload
        },
        { //智能分单
          path: 'intellectOrder',
          name: 'intellectOrder',
          component: intellectOrder
        },
        { //定单状态
          path: 'statusOrder',
          name: 'statusOrder',
          component: statusOrder
        }
      ]
    },

    { //登陆模块
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
router.beforeEach((to, from, next) => {
  //to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
  if (to.path === '/login') {
    next()
  } // 如果即将进入登录路由，则直接放行
  else { //进入的不是登录路由
    if (to.meta.requiresAuth && !sessionStorage.getItem('accessToken')) {
      next({
        path: '/login'
      })
    }
    //下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由
    else {
      next()
    }
  } //如果不需要登录验证，或者已经登录成功，则直接放行
})
export default router;
