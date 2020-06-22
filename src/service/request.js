import dataUrl from "./dataUrl"
import  httpService  from "./httpService"

const service = {

  /*
  登录接口
  */
  login(params) {
    console.log(params);
    return httpService.post({
      url: dataUrl.login,
      data: params
    })
  },
}

export default service
