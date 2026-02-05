// 產品相關的 API 請求
import axiosInstance from './axios'

/**
 * 獲取產品列表
 * @returns {Promise} API 響應
 */
export const getProductsAPI = async () => {
  const response = await axiosInstance.get('/products')
  return response.data
}

/**
 * 獲取單一產品詳情
 * @param {string|number} id - 產品 ID
 * @returns {Promise} API 響應
 */
export const getProductByIdAPI = async (id) => {
  const response = await axiosInstance.get(`/product/${id}`)
  return response.data
}

/**
 * 創建產品
 * @param {Object} productData - 產品數據
 * @returns {Promise} API 響應
 */
export const createProductAPI = async (productData) => {
  const response = await axiosInstance.post('/products', productData)
  return response.data
}

/**
 * 更新產品
 * @param {string|number} id - 產品 ID
 * @param {Object} productData - 產品數據
 * @returns {Promise} API 響應
 */
export const updateProductAPI = async (id, productData) => {
  const response = await axiosInstance.put(`/products/${id}`, productData)
  return response.data
}

/**
 * 刪除產品
 * @param {string|number} id - 產品 ID
 * @returns {Promise} API 響應
 */
export const deleteProductAPI = async (id) => {
  const response = await axiosInstance.delete(`/products/${id}`)
  return response.data
}

// ==================== 管理控制台 - 產品 API ====================

/**
 * 獲取所有產品（管理控制台）
 * GET /v2/api/{api_path}/admin/products/all
 * @returns {Promise} API 響應
 */
export const getAllAdminProductsAPI = async () => {
  const response = await axiosInstance.get(`/admin/products/all`)
  return response.data
}

/**
 * 獲取產品列表（管理控制台）
 * GET /v2/api/{api_path}/admin/products
 * @param {Object} params - 查詢參數（可選，如分頁參數）
 * @returns {Promise} API 響應
 */
export const getAdminProductsAPI = async (params = {}) => {
  const response = await axiosInstance.get(`/admin/products`, {
    params
  })
  return response.data
}

/**
 * 創建產品（管理控制台）
 * POST /v2/api/{api_path}/admin/product
 * @param {Object} productData - 產品數據
 * @returns {Promise} API 響應
 */
export const createAdminProductAPI = async (productData) => {
  const response = await axiosInstance.post(`/admin/product`, productData)
  return response.data
}

/**
 * 更新產品（管理控制台）
 * PUT /v2/api/{api_path}/admin/product/{id}
 * @param {string|number} id - 產品 ID
 * @param {Object} productData - 產品數據
 * @returns {Promise} API 響應
 */
export const updateAdminProductAPI = async (id, productData) => {
  const response = await axiosInstance.put(`/admin/product/${id}`, productData)
  return response.data
}

/**
 * 刪除產品（管理控制台）
 * DELETE /v2/api/{api_path}/admin/product/{id}
 * @param {string|number} id - 產品 ID
 * @returns {Promise} API 響應
 */
export const deleteAdminProductAPI = async (id) => {
  const response = await axiosInstance.delete(`/admin/product/${id}`)
  return response.data
}
