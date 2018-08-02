import Vue from 'vue'
import Router from 'vue-router'
import maps from '@/components/map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'maps',
      component: maps
    }
  ]
})
