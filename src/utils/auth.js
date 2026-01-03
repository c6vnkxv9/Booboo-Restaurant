// 簡單的認證工具函數
export const auth = {
  // 檢查是否已登入
  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true'
  },

  // 登入
  login: (username, password) => {
    // 簡單的驗證邏輯（實際應用中應該連接到後端 API）
    if (username && password) {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('username', username)
      return true
    }
    return false
  },

  // 登出
  logout: () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('username')
  },

  // 獲取當前用戶名
  getUsername: () => {
    return localStorage.getItem('username') || ''
  }
}