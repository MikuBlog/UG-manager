import Vue from 'vue'
import App from './App.vue'
import router from "./router/router.js"
import './global/global.css'
import 'font-awesome/css/font-awesome.css'
import $ from 'jquery'
import store from './vuex/store.js'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import 'swiper/dist/css/swiper.css'

Vue.prototype.$axios = axios

import AMap from 'vue-amap';
Vue.use(AMap);

// 初始化vue-amap
AMap.initAMapApiLoader({
    // 高德key
    key: '8a6780a9e7a00b1be97c37c04a08e96f',
    // 插件集合 （插件按需引入）
    plugin: [
      'AMap.Autocomplete', 
      'AMap.PlaceSearch', 
      'AMap.Scale', 
      'AMap.OverView', 
      'AMap.ToolBar', 
      'AMap.MapType', 
      'AMap.PolyEditor',
      'AMap.CircleEditor',
      'AMap.Geolocation'
  ],

});


Vue.use(Mint)



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
