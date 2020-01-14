// 引入axios
import axios from 'axios'
import { Message } from 'element-ui'
import { showFullScreenLoading, tryHideFullScreenLoading } from './loading'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// http请求拦截器
axios.interceptors.request.use(
  config => {
    if (config.headers.isLoading !== false) {
      // 如果配置了isLoading: false，则不显示loading
      showFullScreenLoading()
    }
    return config
  },
  error => {
    tryHideFullScreenLoading()
    Message.error({
      message: '加载超时'
    })
    return Promise.reject(error)
  }
)
// http响应拦截器
axios.interceptors.response.use(
  data => {
    // 响应成功关闭loading
    tryHideFullScreenLoading()
    return data
  },
  error => {
    tryHideFullScreenLoading()
    Message.error({
      message: '加载超时'
    })
    return Promise.reject(error)
  }
)

export default axios
