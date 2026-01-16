// 優惠券（Coupon）相關的 API 請求
import axiosInstance from './axios'

// ==================== 管理控制台 - 優惠券 API ====================

/**
 * 獲取優惠券列表（管理控制台）
 * GET /v2/api/{api_path}/admin/coupons
 * @param {Object} params - 查詢參數（可選，如分頁 page）
 * @returns {Promise} API 響應
 */
export const getAdminCouponsAPI = async (params = {}) => {
    const response = await axiosInstance.get('/admin/coupons', { params })
    return response.data
}

/**
 * 創建優惠券（管理控制台）
 * POST /v2/api/{api_path}/admin/coupon
 * @param {Object} couponData - 優惠券資料（通常需要包在 { data: {...} }）
 * @returns {Promise} API 響應
 */
export const createAdminCouponAPI = async (couponData) => {
    const response = await axiosInstance.post('/admin/coupon', couponData)
    return response.data
}

/**
 * 更新優惠券（管理控制台）
 * PUT /v2/api/{api_path}/admin/coupon/{id}
 * @param {string|number} id - 優惠券 ID
 * @param {Object} couponData - 優惠券資料（通常需要包在 { data: {...} }）
 * @returns {Promise} API 響應
 */
export const updateAdminCouponAPI = async (id, couponData) => {
    const response = await axiosInstance.put(`/admin/coupon/${id}`, couponData)
    return response.data
}

/**
 * 刪除優惠券（管理控制台）
 * DELETE /v2/api/{api_path}/admin/coupon/{id}
 * @param {string|number} id - 優惠券 ID
 * @returns {Promise} API 響應
 */
export const deleteAdminCouponAPI = async (id) => {
    const response = await axiosInstance.delete(`/admin/coupon/${id}`)
    return response.data
}

// ==================== 客戶購物 - 套用優惠券 API ====================

/**
 * 套用優惠券（前台/購物車）
 * POST /v2/api/{api_path}/coupon
 * @param {Object} coupon - 通常格式為 { data: { code: 'xxxx' } }
 * @returns {Promise} API 響應
 */
export const applyCouponAPI = async (coupon) => {
    const response = await axiosInstance.post('/coupon', coupon)
    return response.data
}