//引入axios
import axios from 'axios'
/* 这里需要注意，因为是服务器端渲染，我们得时刻明确当前地址是属于路由跳转还是属于
axios 请求。所以我们需要在 service/index.js 写入以下判断*/

//重复请求取消
let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;
//请求拦截器
axios.interceptors.request.use(config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
        promiseArr[config.url]('操作取消')
        promiseArr[config.url] = cancel
    } else {
        promiseArr[config.url] = cancel
    }
      return config
}, error => {
    return Promise.reject(error)
})

//响应拦截器异常处理
axios.interceptors.response.use(response => {
    return response
}, err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break;
        case 401:
          err.message = '未授权，请重新登录'
          break;
        case 403:
          err.message = '拒绝访问'
          break;
        case 404:
          err.message = '请求错误,未找到该资源'
          break;
        case 405:
          err.message = '请求方法未允许'
          break;
        case 408:
          err.message = '请求超时'
          break;
        case 500:
          err.message = '服务器端出错'
          break;
        case 501:
          err.message = '网络未实现'
          break;
        case 502:
          err.message = '网络错误'
          break;
        case 503:
          err.message = '服务不可用'
          break;
        case 504:
          err.message = '网络超时'
          break;
        case 505:
          err.message = 'http版本不支持该请求'
          break;
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = "连接到服务器失败"
    }
    //alert(err.message)
    console.log(err.message)
    return Promise.resolve(err.response)
})

//抽离get,post公共配置

axios.defaults.baseURL = 'http://192.168.1.11:8000'
 
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8',
}
axios.defaults.timeout = 10000

// 跨域是否带cookie
axios.defaults.withCredentials = true

export default {
    //get请求
    get (url,data) {
      return new Promise((resolve) => {
        axios({
          method: 'get',
          url: url,
          params: data,
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          resolve(res)
        })
      })
    },

    //post请求
    post (url,data) {
      let storage = window.localStorage
      return new Promise((resolve) => {
        axios({
          method: 'post',
          url: url,
          data: JSON.stringify(data),//将post请求的数据转化为json对象
          headers: {'Authorization': storage.token},
          cancelToken: new CancelToken(c => {
            cancel = c
          })
        }).then(res => {
          resolve(res)
        })
      })
    }
  }