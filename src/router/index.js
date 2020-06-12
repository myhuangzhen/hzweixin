import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      meta: {
        title: '招商公路视频云平台-登录'
      },
      component: (Login) => require(['@/components/Login'], Login)
    }, {
      path: '/index',
      name: 'Index',
      meta: {
        title: '招商公路视频云平台'
      },
      component: (Index) => require(['@/components/index'], Index),
      children: [
        {
          path: '/home',
          name: 'Home',
          meta: {
            title: '招商公路视频云平台-数据'
          },
          component: (Home) => require(['@/views/Home'], Home)
        },
        {
          path: '/map',
          name: 'Map',
          meta: {
            title: '招商公路视频云平台-地图'
          },
          component: (Map) => require(['@/views/Map'], Map)
        },
        {
          path: '/screen',
          name: 'Screen',
          meta: {
            title: '招商公路视频云平台-视频'
          },
          component: (Screen) => require(['@/views/Screen'], Screen)
        }
      ]
    }
  ]
})

// if (sessionStorage.getItem('token')) {
//   store.commit("set_token", sessionStorage.getItem("token"))
// }

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
// if (sessionStorage.getItem('token')) {
//   store.commit('set_token', sessionStorage.getItem('token'))
// }

export default router
