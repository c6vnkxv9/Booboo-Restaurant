import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminSigninAPI } from '../api/auth'
export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // 使用 guest middleware - 如果已經登入，重定向到產品頁面
  // useEffect(() => {
  //   const { shouldRedirect, redirect } = guestMiddleware()
  //   if (shouldRedirect && redirect) {
  //     navigate(redirect, { replace: true })
  //   }
  // }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('請輸入用戶名和密碼')
      return
    }

    try {
      // 調用登入 API，token 會自動保存到 sessionStorage
      const response = await adminSigninAPI(username, password)
      
      // 根據 API 響應判斷登入是否成功
      if (response.success && response.token) {
        // 登入成功，導航到產品頁面
        navigate('/products', { replace: true })
      } else {
        setError(response.message || '登入失敗')
      }
    } catch (err) {
      // 處理錯誤響應
      const errorMessage = err.response?.data?.message || err.message || '登入時發生錯誤'
      setError(errorMessage)
    }
  }

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #FAEDE7 0%, #E6ACA3 100%)' }}>
      <div className="text-center w-100">
        <div className="mb-4">
          <h1 className="mb-0" style={{ color: '#675335', fontWeight: 'bold', fontSize: '2rem' }}>後台系統</h1>
        </div>
        <div className="card shadow-lg mx-auto" style={{ width: '100%', maxWidth: '800px', minWidth: '300px', borderRadius: '15px', border: 'none' }}>
          <div className="card-body p-5 d-flex align-items-center justify-content-center">
            <img src="/logo.png" alt="BooBoo食堂" className="img-fluid mb-3 me-5" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            <form className="flex-grow-1" onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <label htmlFor="username" className="form-label mb-0 me-3" style={{ minWidth: '90px', color: '#675335', fontWeight: '500' }}>用戶名</label>
                  <input
                    type="text"
                    className="form-control flex-grow-1"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="請輸入用戶名"
                    autoComplete="username"
                    style={{ borderRadius: '8px', border: '2px solid #E6ACA3' }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <label htmlFor="password" className="form-label mb-0 me-3" style={{ minWidth: '90px', color: '#675335', fontWeight: '500' }}>密碼</label>
                  <input
                    type="password"
                    className="form-control flex-grow-1"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="請輸入密碼"
                    autoComplete="current-password"
                    style={{ borderRadius: '8px', border: '2px solid #E6ACA3' }}
                  />
                </div>
              </div>
              {error && (
                <div className="alert alert-danger mb-4" role="alert" style={{ borderRadius: '8px', border: 'none' }}>
                  {error}
                </div>)
              }
              <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: '8px', padding: '12px', fontSize: '1.1rem', fontWeight: '600' }}>
                登入
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

