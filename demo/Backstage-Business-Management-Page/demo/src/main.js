import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './vuex/store.js'
import './global/style.css'
import $ from 'jquery'
import 'font-awesome/css/font-awesome.css'
import VueAreaLinkage from 'vue-area-linkage'
import  ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueAreaLinkage)

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
