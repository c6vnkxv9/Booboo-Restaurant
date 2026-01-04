// 認證相關的 API 請求
import axiosInstance from './axios'
import axios from 'axios'
import { API_CONFIG } from '../config/api'
import { auth } from '../utils/auth'

/**
 * 管理員登入 API
 * POST /v2/admin/signin
 * @param {string} username - 用戶名（或 email）
 * @param {string} password - 密碼
 * @returns {Promise} API 響應
 */
export const adminSigninAPI = async (username, password) => {
  // 登入 API 在 /v2/admin/signin，不在 /v2/api/{api_path}/ 路徑下
  const baseUrl = API_CONFIG.BASE_URL
  const response = await axios.post(
    `${baseUrl}admin/signin`,
    {
      username,
      password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  
  // 登入成功後，保存 token 和相關資訊到 sessionStorage
  if (response.data.success && response.data.token) {
    auth.setToken(response.data.token, response.data.uid, response.data.expired)
    auth.login(username, password)
  }
  
  return response.data
}

/**
 * 登出 API
 * POST /v2/api/{api_path}/logout
 * @returns {Promise} API 響應
 */
export const logoutAPI = async () => {
  try {
    const response = await axiosInstance.post('/logout')
    // 登出成功後清除 token
    auth.logout()
    return response.data
  } catch (error) {
    // 即使 API 失敗，也清除本地 token
    auth.logout()
    throw error
  }
}

/**
 * 檢查用戶登入狀態 API
 * POST /api/user/check
 * @returns {Promise} API 響應
 */
export const checkUserAPI = async () => {
  const response = await axiosInstance.post('/user/check')
  return response.data
}

// 為了向後兼容，保留舊的函數名稱
export const loginAPI = adminSigninAPI
// export const checkLoginAPI = checkUserAPI

