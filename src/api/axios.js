import axios from 'axios'
import { API_CONFIG } from '../config/api'
import { auth } from '../utils/auth'

// 創建 axios 實例
const axiosInstance = axios.create({
  baseURL: `${API_CONFIG.BASE_URL}api/${API_CONFIG.API_KEY}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 請求攔截器 - 自動添加 Token
axiosInstance.interceptors.request.use(
  (config) => {
    // 這確保即使在 Vercel 等部署環境中，baseURL 也不會被錯誤解析
    config.baseURL = `${API_CONFIG.BASE_URL}api/${API_CONFIG.API_KEY}`
    const token = auth.getToken()
    if (token) {
      config.headers['Authorization'] = token
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 響應攔截器 - 統一處理錯誤
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // 統一處理錯誤
    if (error.response) {
      // 服務器返回了錯誤狀態碼
      const status = error.response.status
      
      // 如果是 401 未授權，清除 token 並導向登入頁
      if (status === 401) {
        console.warn('401 Unauthorized - Token may be invalid or expired')
        auth.logout()
        // 如果不在登入頁面，則導向登入頁（使用延遲，避免立即跳轉）
        if (window.location.pathname !== '/login') {
          setTimeout(() => {
            window.location.href = '/login'
          }, 100)
        }
      }
      
      console.error('API Error:', {
        status,
        data: error.response.data,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        fullURL: error.config?.baseURL ? `${error.config.baseURL}${error.config.url}` : error.config?.url
      })
    } else if (error.request) {
      // 請求已發出但沒有收到響應
      console.error('Network Error:', error.request)
    } else {
      // 其他錯誤
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance

