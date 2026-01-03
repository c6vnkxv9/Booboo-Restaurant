// 認證 Middleware
import { auth } from '../utils/auth'

/**
 * 認證中間件 - 檢查用戶是否已登入
 * @returns {Object} { isAuthenticated: boolean, redirect: string | null }
 */
export const authMiddleware = () => {
  const isAuthenticated = auth.isAuthenticated()
  
  if (!isAuthenticated) {
    return {
      isAuthenticated: false,
      redirect: '/login'
    }
  }
  
  return {
    isAuthenticated: true,
    redirect: null
  }
}

/**
 * 反向認證中間件 - 如果已登入則重定向（用於登入頁面）
 * @returns {Object} { shouldRedirect: boolean, redirect: string | null }
 */
export const guestMiddleware = () => {
  const isAuthenticated = auth.isAuthenticated()
  
  if (isAuthenticated) {
    return {
      shouldRedirect: true,
      redirect: '/products'
    }
  }
  
  return {
    shouldRedirect: false,
    redirect: null
  }
}

