import StoreService from './storeService'
import router from '@/router'
let callbacks = {}
import store from '../store'

export default class HttpInspectors {
  static setConfig (options) {
    var token = StoreService.getToken() || store.state.token  || ''
    var headers = {
      'Authorization': token
    }
    if (options && options.header) {
      for (let i in options.header) {
        headers[i] = options.header[i]
      }
    }

    return headers
  }

  static handleResponse (response, resolve, reject) {
    console.log(response);
    if (response || response.code === 200 ) {
      return resolve(response.data)
    }
    if (response.code === 402 || response.statusCode === 401) {
      if (callbacks['needLogin']) {
        callbacks['needLogin'](response)
        localStorage.clear()
      }
      return reject(response)
    }
    if (response.data) {
      return resolve(response)
    }
  }

  static handleError (error, reject) {
    var errorInfo = {}
    console.log(error);
    if (error.response) {
      switch (error.response.code) {
      case 404: errorInfo = {
        errorStatus: 404,
        errorMessage: '找不到请求的地址'
      }
        break
      case 401: errorInfo = {
        errorStatus: 401,
        errorMessage: '当前用户没有权限'
      }
      
        break
      case 403: errorInfo = {
        errorStatus: 403,
        errorMessage: '访问被拒绝'
      }
        break
      case 500: errorInfo = {
        errorStatus: 500,
        errorMessage: '服务器出现问题'
      }
        break
      case 400: errorInfo = {
        errorStatus: 400,
        errorMessage: '请求参数错误'
      }
        break
      case 405: errorInfo = {
        errorStatus: 405,
        errorMessage: '请求方法错误'
      }
        break
      default: errorInfo = {
        errorStatus: -2,
        errorMessage: '未知错误'
      }
        break
      }
    } else {
      errorInfo = {
        errorStatus: -3,
        errorMessage: '网络错误'
      }
    }

    if (callbacks['httpError']) {
      callbacks['httpError'](errorInfo)
    }

    reject(errorInfo)   // 返回处理后的错误信息
  }

   /**
   *
   * @param key  'httpError' 'needLogin'
   * @param value
   */
  static setCallback (key, value) {
    callbacks[key] = value
  }
}
