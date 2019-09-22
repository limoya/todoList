import Vue from 'vue'
import Router from 'vue-router'
import tolist from '@/components/tolist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tolist',
      component: tolist
    }
  ]
})
