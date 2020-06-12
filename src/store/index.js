import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 左侧菜单栏数据
    menuItems: [
      {
        name: 'home', // 要跳转的路由名称 不是路径
        size: 18, // icon大小
        type: 'md-home', // icon类型
        text: '数据源管理' // 文本内容
      },
      {
        name: 'map', // 要跳转的路由名称 不是路径
        size: 18, // icon大小
        type: 'ios-paper', // icon类型
        text: '地图' // 文本内容
      },
      {
        name: 'screen', // 要跳转的路由名称 不是路径
        size: 18, // icon大小
        type: 'ios-paper', // icon类型
        text: '传输管道管理' // 文本内容
      },
      {
        name: 'userinfo2', // 要跳转的路由名称 不是路径
        size: 18, // icon大小
        type: 'ios-paper', // icon类型
        text: '用户和权限管理' // 文本内容
      }
      // {
      //   text: '二级菜单',
      //   type: 'ios-paper',
      //   children: [
      //     {
      //       text: '三级菜单',
      //       type: 'ios-paper',
      //       children: [
      //         {
      //           type: 'ios-notifications-outline',
      //           name: 'msg',
      //           text: '查看消息'
      //         },
      //         {
      //           type: 'md-lock',
      //           name: 'password',
      //           text: '修改密码'
      //         },
      //         {
      //           type: 'md-person',
      //           name: 'userinfo',
      //           text: '基本资料'
      //         }
      //       ]
      //     }
      //   ]
      // }
    ],
    state: {
      token: ''
    }
  },
  mutations: {
    setMenus (state, items) {
      state.menuItems = [...items]
    },
    set_token (state, token) {
      state.token = token
      sessionStorage.token = token
    }
    // ,
    // set_token (state, token) {
    //   state.token = token
    //   sessionStorage.token = token
    // }
  }
})

export default store
