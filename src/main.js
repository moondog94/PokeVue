// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueSVGIcon from 'vue-svgicon'
import VueWaypoint from 'vue-waypoint'
import VueScrollTo from 'vue-scrollto'
import App from './App'
import router from './router'

Vue.use(Vuetify)
Vue.use(VueSVGIcon)
Vue.use(VueWaypoint)
Vue.use(VueScrollTo)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
