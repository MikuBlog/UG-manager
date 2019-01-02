import Vue from 'vue'
import App from './App.vue'

import router from './router/router.js'
import store from './vuex/store.js'
import './global/style.css'
import 'font-awesome/css/font-awesome.css'
import $ from 'jquery'
import VueAreaLinkage from 'vue-area-linkage'
import  ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import uploader from 'vue-easy-uploader'
import Vuex from 'vuex'

let storer = new Vuex.Store({})
Vue.use(uploader, storer)


Vue.use(VueAreaLinkage)

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  methods: {

    moreChart() {
      var options = this.getMoreOptions(this.type);

      if (this.chart) {
          this.chart.destroy();
      };
    // 初始化 Highcharts 图表
    this.chart = new Highcharts.Chart('highcharts-more', options);
    }

  }
})
