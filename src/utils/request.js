import axios from 'axios'

const withCredentials = String(import.meta.env.VITE_APP_WITH_CREDENTIALS ?? '') === 'true'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || '/api',
  timeout: 30000,
  withCredentials,
  headers: {
    'Content-Type': 'application/json',
  },
})

request.interceptors.request.use(
  (config) => {
    if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
      if (config.headers?.delete) {
        config.headers.delete('Content-Type')
      } else if (config.headers) {
        delete config.headers['Content-Type']
        delete config.headers['content-type']
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    if (response.config.responseType === 'blob') {
      return response
    }
    const res = response.data
    if (res && typeof res === 'object' && 'success' in res && res.success === false) {
      console.error('请求失败:', res.message)
      return Promise.reject(new Error(res.message || '请求失败'))
    }
    return res
  },
  (error) => {
    console.error('请求错误:', error.message)
    return Promise.reject(error)
  }
)

export default request
