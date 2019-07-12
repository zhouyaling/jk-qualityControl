// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {server} from './providers/apiUnify.js'
import './static/stytle/mint-ui-style.css'
import './static/stytle/pages.css'
import './static/stytle/public.css'

Vue.use(require('vue-wechat-title'))
Vue.config.productionTip = false
Vue.prototype.$server = server;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
