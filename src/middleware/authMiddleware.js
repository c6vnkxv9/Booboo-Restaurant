// 認證 Middleware
import { auth } from '../utils/auth'

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

