import Vue from 'vue'
import Router from 'vue-router'
import Dex from '@/components/DexView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dex',
      name: 'dex',
      component: Dex
    }
  ]
})
