import axios from 'axios'
import { API_CONFIG } from '../config/api'

// 創建 axios 實例
const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 請求攔截器 - 自動添加 API Key
axiosInstance.interceptors.request.use(
  (config) => {
    // 根據 hexschool API 文檔，通常需要在 headers 中添加 API Key
    // 如果 API 需要特定的 header 名稱，請根據文檔調整
    // 常見的格式：
    // 1. Authorization: Bearer {api_key}
    // 2. api-key: {api_key}
    // 3. x-api-key: {api_key}
    
    // 目前使用 Authorization header（如果 API 需要其他格式，請修改這裡）
    config.headers['Authorization'] = `Bearer ${API_CONFIG.API_KEY}`
    
    // 如果需要使用其他格式，可以取消註釋下面這行：
    // config.headers['api-key'] = API_CONFIG.API_KEY
    
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
      console.error('API Error:', error.response.data)
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

