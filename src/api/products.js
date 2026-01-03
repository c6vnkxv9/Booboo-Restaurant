// 產品相關的 API 請求
import axiosInstance from './axios'

/**
 * 獲取產品列表
 * @returns {Promise} API 響應
 */
export const getProductsAPI = async () => {
  try {
    const response = await axiosInstance.get('/products')
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * 獲取單一產品詳情
 * @param {string|number} id - 產品 ID
 * @returns {Promise} API 響應
 */
export const getProductByIdAPI = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * 創建產品
 * @param {Object} productData - 產品數據
 * @returns {Promise} API 響應
 */
export const createProductAPI = async (productData) => {
  try {
    const response = await axiosInstance.post('/products', productData)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * 更新產品
 * @param {string|number} id - 產品 ID
 * @param {Object} productData - 產品數據
 * @returns {Promise} API 響應
 */
export const updateProductAPI = async (id, productData) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, productData)
    return response.data
  } catch (error) {
    throw error
  }
}

/**
 * 刪除產品
 * @param {string|number} id - 產品 ID
 * @returns {Promise} API 響應
 */
export const deleteProductAPI = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

