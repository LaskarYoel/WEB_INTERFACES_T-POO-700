import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

import Raphael from 'raphael/raphael'
global.Raphael = Raphael
Vue.config.productionTip = false

import VueRouter from 'vue-router'
import User from "./components/User";
import ChartManager from "./components/ChartManager";
Vue.use(VueRouter)


const routes = [
  { path: '/stats', component: ChartManager },
  { path: '/user', component: User }
]
const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
