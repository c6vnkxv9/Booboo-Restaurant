/**
 * 管理後台 Header 組件
 * @param {string} title - 標題
 * @param {string} username - 用戶名
 * @param {Function} onLogout - 登出處理函數
 */
export default function AdminHeader({ title = '商品管理後台', username, onLogout }) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="card-title mb-0">{title}</h1>
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted">歡迎，{username}</span>
            <button onClick={onLogout} className="btn btn-danger">
              登出
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

