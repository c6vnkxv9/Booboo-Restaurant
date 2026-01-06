import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminSigninAPI } from '../api/auth'
export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('請輸入用戶名和密碼')
      return
    }

    try {
      const response = await adminSigninAPI(username, password)
      if (response.success && response.token) {
        navigate('/products', { replace: true })
      } else {
        setError(response.message || '登入失敗')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || '登入時發生錯誤'
      setError(errorMessage)
    }
  }

  return (
      <main className="container-fluid vh-100 d-flex align-items-center justify-content-center position-relative flex-column" style={{ backgroundImage: 'url(/japanese-paper.jpg)', backgroundSize: '200px 200px', backgroundRepeat: 'repeat' }}>
        <h1 className="display-6 fw-bold mb-4 d-flex align-items-center gap-3" style={{ color: '#675335', letterSpacing: '0.05em' }}>
          <span 
            className="d-block bg-primary rounded-pill shadow-sm" 
            style={{ width: '8px', height: '100%', boxShadow: '0 0 10px rgba(230,154,141,0.6)' }}
          ></span>
          後台系統
        </h1>

        <div className="card border-0 rounded-4 shadow-lg overflow-hidden flex-column flex-md-row d-flex w-100" style={{ maxWidth: '900px', transition: 'all 0.3s' }}>
          {/* 左側資訊欄 */}
          <div className="col-12 col-md-5 p-5 d-flex flex-column align-items-center justify-content-center position-relative overflow-hidden text-center" 
               style={{ background: 'linear-gradient(135deg, #FDF5F3 0%, #F4DCD9 100%)' }}>
            <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }}></div>
            
            <div className="relative z-1 mb-4">
              <div className="p-2 rounded-circle border border-white border-opacity-50 bg-white bg-opacity-25 backdrop-blur shadow-sm">
                <img 
                  alt="BooBoo 食堂 Logo" 
                  className="rounded-circle shadow-sm bg-white p-1" 
                  src="/logo.png"
                  style={{ width: '130px', height: '130px', objectFit: 'contain' }}
                />
              </div>
            </div>
            
            <div className="position-relative z-1">
              <h2 className="h4 fw-bold mb-2" style={{ color: '#675335' }}>BooBoo 食堂</h2>
              <div className="mx-auto rounded-pill bg-primary bg-opacity-50 mb-2" style={{ height: '4px', width: '100%' }}></div>
              <p className="small fw-medium mb-0" style={{ color: 'rgba(103, 83, 53, 0.7)' }}>主廚跟老鼠才可以進來</p>
            </div>
          </div>

          {/* 右側登入表單 */}
          <div className="col-12 col-md-7 p-4 p-md-5 bg-white d-flex flex-column justify-content-center">
            <div className="mb-4">
              <h3 className="h4 fw-bold text-dark mb-2">歡迎回來</h3>
              <p className="text-muted small d-flex align-items-center gap-2">
                <span className="rounded-circle bg-primary" style={{ width: '6px', height: '6px' }}></span>
                請輸入您的帳號密碼以登入系統
              </p>
            </div>

            <form onSubmit={handleSubmit} className="d-grid gap-4">
              {/* 用戶名 */}
              <div className="form-group">
                <label className="form-label small fw-bold text-muted ms-1 mb-2" htmlFor="username">用戶名</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 rounded-start-3 px-3">
                    <i className="material-symbols-outlined text-secondary opacity-50">person</i>
                  </span>
                  <input
                    className="form-control bg-light border-start-0 rounded-end-3 py-2 px-3"
                    id="username"
                    name="username"
                    placeholder="請輸入用戶名"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ border: '1px solid #dee2e6' }}
                  />
                </div>
              </div>

              {/* 密碼 */}
              <div className="form-group">
                <label className="form-label small fw-bold text-muted ms-1 mb-2" htmlFor="password">密碼</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 rounded-start-3 px-3">
                    <i className="material-symbols-outlined text-secondary opacity-50">lock</i>
                  </span>
                  <input
                    className="form-control bg-light border-start-0 rounded-end-3 py-2 px-3"
                    id="password"
                    name="password"
                    placeholder="請輸入密碼"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ border: '1px solid #dee2e6' }}
                  />
                </div>
              </div>

              {/* 錯誤提示 */}
              {error && (
                <div className="alert alert-danger py-2 px-3 rounded-3 small d-flex align-items-start gap-2 mb-0" style={{ borderLeft: '4px solid #dc3545' }}>
                  <i className="material-symbols-outlined small">info</i>
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-2">
                <button 
                  className="btn btn-primary w-100 py-3 rounded-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 border-0" 
                  type="submit"
                  style={{ background: 'linear-gradient(to right, var(--bs-primary), var(--bs-primary-dark, #d88a7d))' }}
                >
                  <span>登入</span>
                  <i className="material-symbols-outlined">arrow_forward</i>
                </button>
              </div>

              <div className="d-flex justify-content-end align-items-center pt-3 border-top mt-2">
                <span className="font-monospace text-muted" style={{ fontSize: '10px', opacity: 0.7 }}>v1.0 System</span>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-muted small mb-0">© 2026 BooBoo Canteen. All rights reserved.</p>
        </div>
      </main>
  )
}

