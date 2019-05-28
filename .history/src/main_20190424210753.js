// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import qs from 'qs'
import Vue from 'vue'
import App from './App'
import router from './router'
import rem from '../static/rem'
import {List, Toast, Dialog} from 'vant'
import 'vant/lib/toast/style';
import 'vant/lib/dialog/style';
// import Toast from 'common/toast/index'
// import { List } from 'vant'

// eslint-disable-next-line semi
Vue.config.productionTip = false
Vue.use(rem)
Vue.use(qs)
Vue.use(List)
Vue.use(Toast)

Vue.prototype.$api = JSON.parse(process.env.api)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
