// 認證相關的 API 請求
import axiosInstance from './axios'
import axios from 'axios'
import { API_CONFIG } from '../config/api'

const BASE_DOMAIN = 'https://ec-course-api.hexschool.io'

/**
 * 管理員登入 API
 * POST /v2/admin/signin
 * @param {string} username - 用戶名（或 email）
 * @param {string} password - 密碼
 * @returns {Promise} API 響應
 */
export const adminSigninAPI = async (username, password) => {
  const response = await axios.post(
    `${BASE_DOMAIN}/v2/admin/signin`,
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
  return response.data
}

/**
 * 登出 API
 * POST /v2/logout
 * @returns {Promise} API 響應
 */
export const logoutAPI = async () => {
  const response = await axios.post(
    `${BASE_DOMAIN}/v2/logout`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.API_KEY}`
      }
    }
  )
  return response.data
}

/**
 * 檢查用戶登入狀態 API
 * POST /v2/api/user/check
 * @returns {Promise} API 響應
 */
export const checkUserAPI = async () => {
  const response = await axiosInstance.post('/user/check')
  return response.data
}

// 為了向後兼容，保留舊的函數名稱
export const loginAPI = adminSigninAPI
export const checkLoginAPI = checkUserAPI

