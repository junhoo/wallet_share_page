import Example from '@/components/example' //
import ActDetail from '@/components/actDetail' //列表详情
import Share from '@/components/share' //列表详情

const Vue = require('vue')
const Router = require('vue-router')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Example',
      component: Example
    },
    {
    path: '/actDetail',
    name: 'ActDetail',
    component: ActDetail
    },
    {
      path: '/share',
      name: 'Share',
      component: Share
    }
  ]
})
