// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Index from './components/index'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'


Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.config.devtools = true;//开启浏览器debug支持

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

/*new Vue({
  template: '<Index/>',
  el: '#index',
  router,
  components: {
    Index
  }
})*/
