import { Navigate } from 'react-router-dom'
import { authMiddleware } from '../middleware/authMiddleware'

// 受保護的路由組件 - 使用認證中間件
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, redirect } = authMiddleware()
  
  if (!isAuthenticated && redirect) {
    return <Navigate to={redirect} replace />
  }
  
  return children
}

