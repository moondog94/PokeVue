import Vue from 'vue'
import Router from 'vue-router'
import Dex from '@/components/DexView'
import Pkmn from '@/components/PkmnView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dex',
      name: 'dex',
      component: Dex
    },
    {
      path: '/dex/:id',
      name: 'pkmn',
      component: Pkmn,
      props: true
    }
  ]
})
