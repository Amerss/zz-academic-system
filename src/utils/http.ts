import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

// 基础的配置
const http = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: false
})

// 请求的拦截
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('请求被拦截')
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization')
    }
    return config
  },
  (error) => {
    console.log('请求被拦截,且失败')
    return Promise.reject(error)
  }
)

//  响应的拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('响应被拦截')
    return response
  },
  (error) => {
    console.log('响应被拦截,出现了错误')
    return Promise.reject(error)
  }
)

export default http
