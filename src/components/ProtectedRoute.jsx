import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { authMiddleware } from '../middleware/authMiddleware'
import { checkUserAPI } from '../api/auth'
import { auth } from '../utils/auth'
import { Box, CircularProgress, Typography } from '@mui/material'

// 受保護的路由組件 - 使用認證中間件
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, redirect } = authMiddleware()
  const [checking, setChecking] = useState(isAuthenticated)
  const [verified, setVerified] = useState(false)
  const [forceRedirect, setForceRedirect] = useState(false)
  
  useEffect(() => {
    let cancelled = false

    const verify = async () => {
      if (!isAuthenticated) {
        if (!cancelled) {
          setChecking(false)
          setVerified(false)
        }
        return
      }

      try {
        if (!cancelled) setChecking(true)
        const res = await checkUserAPI()
        if (cancelled) return

        if (res?.success) {
          setVerified(true)
          setForceRedirect(false)
        } else {
          auth.logout()
          setVerified(false)
          setForceRedirect(true)
        }
      } catch (err) {
        if (cancelled) return
        auth.logout()
        setVerified(false)
        setForceRedirect(true)
      } finally {
        if (!cancelled) setChecking(false)
      }
    }

    verify()
    return () => {
      cancelled = true
    }
  }, [isAuthenticated])

  if (!isAuthenticated && redirect) return <Navigate to={redirect} replace />
  if (forceRedirect) return <Navigate to="/login" replace />

  if (checking && !verified) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress size={28} />
        <Typography variant="body2" color="text.secondary">
          驗證登入狀態中...
        </Typography>
      </Box>
    )
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
}

