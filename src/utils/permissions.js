// 權限檢查工具函數

/**
 * 檢查錯誤訊息是否為權限不足的訊息
 * @param {string} message - 錯誤訊息
 * @returns {boolean} 是否為權限不足訊息
 */
const isPermissionDeniedMessage = (message) => {
  if (!message) return false
  const lowerMessage = message.toLowerCase()
  return lowerMessage.includes('禁止使用') || 
         lowerMessage.includes('api_path') ||
         lowerMessage.includes('權限') ||
         lowerMessage.includes('permission')
}

/**
 * 檢查錯誤是否為權限不足錯誤
 * @param {Error} error - API 錯誤物件
 * @returns {boolean} 是否為權限不足錯誤
 */
export const isPermissionDenied = (error) => {
  // 優先檢查 axios 攔截器標記的權限錯誤
  if (error?.isPermissionDenied === true) {
    return true
  }
  
  // 檢查錯誤訊息是否包含權限相關關鍵字
  const errorMessage = error?.permissionMessage || 
                       error?.response?.data?.message || 
                       error?.message || ''
  
  if (isPermissionDeniedMessage(errorMessage)) {
    return true
  }
  
  // 如果沒有明確標記，但狀態碼是 403，也可能是權限不足
  // 但優先以錯誤訊息為準
  return false
}

/**
 * 獲取權限錯誤訊息
 * @param {Error} error - API 錯誤物件
 * @returns {string} 權限錯誤訊息
 */
export const getPermissionErrorMessage = (error) => {
  if (isPermissionDenied(error)) {
    return error?.permissionMessage || 
           error?.response?.data?.message || 
           '您沒有權限執行此操作'
  }
  return null
}

/**
 * 檢查錯誤是否為認證錯誤（需要重新登入）
 * @param {Error} error - API 錯誤物件
 * @returns {boolean} 是否為認證錯誤
 */
export const isAuthenticationError = (error) => {
  // 如果已經被標記為權限不足，就不是認證錯誤
  if (error?.isPermissionDenied === true) {
    return false
  }
  
  // 檢查錯誤訊息是否為認證相關
  const errorMessage = error?.response?.data?.message || error?.message || ''
  const isAuthMessage = errorMessage.includes('token') || 
                        errorMessage.includes('登入') ||
                        errorMessage.includes('認證')
  
  // 如果是認證相關訊息，或是 401 狀態碼，視為認證錯誤
  return isAuthMessage || error?.response?.status === 401
}

