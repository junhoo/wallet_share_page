import Share from '@/components/share' // 分享
import Reg from '@/components/reg' //注册

const Vue = require('vue')
const Router = require('vue-router')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Share',
      component: Share
    },
    {
      path: '/share',
      name: 'Share',
      component: Share
    },
     {
      path: '/reg',
      name: 'Reg',
      component: Reg
    }
  ]
})
