// let applicition = window.eCourtApp.configs.urlPrefix.application

let urlConfigs = {
  url: 'http://47.92.121.146:9002', // 对接口的环境
  sso: 'http://47.92.121.146:9000',
}
const dataUrl = {
  // 登录接口
  login: `${urlConfigs.sso}/login`,
}

export default dataUrl
