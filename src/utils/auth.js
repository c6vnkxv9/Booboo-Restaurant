export const auth = {
  isAuthenticated: () => {
    const token = sessionStorage.getItem('token')
    if (token) {
      const expired = sessionStorage.getItem('expired')
      if (expired) {
        const isExpired = Date.now() > parseInt(expired, 10)
        if (!isExpired) {
          return true
        }
      } else {
        return true
      }
    }
    // 如果沒有 token 或 token 已過期，則檢查 isAuthenticated 標誌（向後兼容）
    return sessionStorage.getItem('isAuthenticated') === 'true'
  },
  login: (username, password) => {
    if (username && password) {
      sessionStorage.setItem('isAuthenticated', 'true')
      sessionStorage.setItem('username', username)
      return true
    }
    return false
  },
  logout: () => {
    sessionStorage.removeItem('isAuthenticated')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('uid')
    sessionStorage.removeItem('expired')
  },
  getUsername: () => {
    return sessionStorage.getItem('username') || ''
  },
  setToken: (token, uid, expired) => {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('uid', uid)
    sessionStorage.setItem('expired', expired.toString())
  },
  getToken: () => {
    return sessionStorage.getItem('token') || ''
  },
  getUid: () => {
    return sessionStorage.getItem('uid') || ''
  },
  isTokenExpired: () => {
    const expired = sessionStorage.getItem('expired')
    if (!expired) return true
    return Date.now() > parseInt(expired, 10)
  },
  clearToken: () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('uid')
    sessionStorage.removeItem('expired')
  }
}