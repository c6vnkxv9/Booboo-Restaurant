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
      const errorMessage = error.response.data?.message || ''
      
      // 根據錯誤訊息判斷是權限不足還是 token 無效
      // 後端返回 "禁止使用, 請確認 api_path 是否為本人使用。" 表示權限不足
      const isPermissionDeniedMessage = errorMessage.includes('禁止使用') || 
                                        errorMessage.includes('api_path') ||
                                        errorMessage.includes('權限')
      
      // 如果是權限不足的錯誤訊息，標記為權限不足（不自動登出）
      if (isPermissionDeniedMessage) {
        error.isPermissionDenied = true
        error.permissionMessage = errorMessage || '您沒有權限執行此操作'
        console.warn('Permission denied - User does not have admin access:', error.permissionMessage)
        // 不自動登出，讓使用者保持登入狀態
      } else if (status === 401 || status === 403) {
        // 其他 401/403 錯誤視為 token 無效或過期，需要重新登入
        console.warn(`${status} Unauthorized - Token may be invalid or expired`)
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
        message: errorMessage,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        fullURL: error.config?.baseURL ? `${error.config.baseURL}${error.config.url}` : error.config?.url,
        isPermissionDenied: error.isPermissionDenied
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

