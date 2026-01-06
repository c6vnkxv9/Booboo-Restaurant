// 文章相關的 API 請求
import axiosInstance from './axios'

// ==================== 管理控制台 - 文章 API ====================

/**
 * 獲取文章列表（管理控制台）
 * GET /v2/api/{api_path}/admin/articles
 * @param {number} page - 頁碼
 * @returns {Promise} API 響應
 */
export const getAdminArticlesAPI = async (page = 1) => {
  const response = await axiosInstance.get(`/admin/articles?page=${page}`)
  return response.data
}

/**
 * 獲取單一文章詳情（管理控制台）
 * GET /v2/api/{api_path}/admin/article/{id}
 * @param {string} id - 文章 ID
 * @returns {Promise} API 響應
 */
export const getAdminArticleByIdAPI = async (id) => {
  const response = await axiosInstance.get(`/admin/article/${id}`)
  return response.data
}

/**
 * 創建文章（管理控制台）
 * POST /v2/api/{api_path}/admin/article
 * @param {Object} articleData - 文章數據 (通常需包含 { data: { ... } })
 * @returns {Promise} API 響應
 */
export const createAdminArticleAPI = async (articleData) => {
  const response = await axiosInstance.post(`/admin/article`, articleData)
  return response.data
}

/**
 * 更新文章（管理控制台）
 * PUT /v2/api/{api_path}/admin/article/{id}
 * @param {string} id - 文章 ID
 * @param {Object} articleData - 文章數據 (通常需包含 { data: { ... } })
 * @returns {Promise} API 響應
 */
export const updateAdminArticleAPI = async (id, articleData) => {
  const response = await axiosInstance.put(`/admin/article/${id}`, articleData)
  return response.data
}

/**
 * 刪除文章（管理控制台）
 * DELETE /v2/api/{api_path}/admin/article/{id}
 * @param {string} id - 文章 ID
 * @returns {Promise} API 響應
 */
export const deleteAdminArticleAPI = async (id) => {
  const response = await axiosInstance.delete(`/admin/article/${id}`)
  return response.data
}

// ==================== 客戶購物 - 文章 API ====================

/**
 * 獲取文章列表（客戶端）
 * GET /v2/api/{api_path}/articles
 * @param {number} page - 頁碼
 * @returns {Promise} API 響應
 */
export const getArticlesAPI = async (page = 1) => {
  const response = await axiosInstance.get(`/articles?page=${page}`)
  return response.data
}

/**
 * 獲取單一文章詳情（客戶端）
 * GET /v2/api/{api_path}/article/{id}
 * @param {string} id - 文章 ID
 * @returns {Promise} API 響應
 */
export const getArticleByIdAPI = async (id) => {
  const response = await axiosInstance.get(`/article/${id}`)
  return response.data
}

