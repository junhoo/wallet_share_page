import Example from '@/components/example' //
import ActDetail from '@/components/actDetail' //列表详情
import Share from '@/components/share' //列表详情
import Register from '@/components/register' //注册
import Register2 from '@/components/register2' // 助记词1
import Register3 from '@/components/register3' // 助记词2

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
    },
    {
      path: '/',
      name: 'Register',
      component: Register
    },
    {
      path: '/register2',
      name: 'Register2',
      component: Register2
    },
    {
      path: '/register3',
      name: 'Register3',
      component: Register3
    }
  ]
})
