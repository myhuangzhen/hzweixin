// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import ViewUI from 'view-design'
import App from './App'
import store from './store'
import router from './router'
import 'jquery'
import './permission'
import api from '../config/index.js'
import 'echarts-liquidfill'
import echarts from 'echarts'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome.css/css/font-awesome.css'
import './assets/css/zTreeStyle.css'
import './assets/js/jquery.1.10.2.min.js'
import './assets/js/jquery.ztree.core.js'
import './assets/js/jquery.ztree.exedit.js'
import fullscreen from 'vue-fullscreen'
import FastClick from 'fastclick'
import './utils/rem'
FastClick.attach(document.body)
Vue.use(fullscreen)
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.use(ViewUI)
// 设置基础URL
axios.defaults.baseURL = 'http://47.92.121.146:9002'
// axios.defaults.withCredentials = true
// 设置请求超时时间//
// axios.defaults.timeout = 5000
Vue.prototype.$http = axios
// Vue.prototype.$axios = axios
// Vue.prototype.HOST = '/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// 已经为ajax请求设置了loading 请求前自动调用 请求完成自动结束
// 添加请求拦截器
// this.$axios.interceptors.request.use(config => {
//   alert('调')
//   if (sessionStorage.getItem('token') !== '') {
//     alert('有')
//     config.headers.common['Authorization'] = sessionStorage.getItem('token')
//   }
//   // this.showLoading = true
//   // 在发送请求之前做些什么
//   return config
// }, error => {
//   // this.showLoading = false
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })
// // 添加响应拦截器
// this.$axios.interceptors.response.use(response => {
//   // 可以在这里对返回的数据进行错误处理 如果返回的 code 不对 直接报错或退出登陆
//   // 就可以省去在业务代码里重复判断
//   // 例子
//   // if (res.code != 0) {
//   //     this.$Message.error(res.msg)
//   //     return Promise.reject()
//   // }
//   // this.showLoading = false
//   const res = response.data
//   return res
// }, error => {
//   // this.showLoading = false
//   // 对响应错误做点什么
//   return Promise.reject(error)
// })
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  console.log(store.state.token)
  if (store.state.token !== undefined) {
    config.headers.common['Authorization'] = store.state.token
    return config
  } else {
    var error
    router.push('/')
    return Promise.reject(error)
  }
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  // if (store.state.token) {
  //   config.headers.common['Authorization'] = store.state.token
  // }
}, function (error) {
  router.push('/')
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  console.log('响应拦截')
  console.log(response)
  // if (response !== undefined) {
  // 对响应数据做点什么
  return response
  // } else {
  //   router.push('/')
  // }
}, function (error) {
  // 对响应错误做点什么
  // if (error.response) {
  //   router.push('/')
  // }
  return Promise.reject(error)
})
