import { useState } from 'react'
import { auth } from '@/utils/auth'
import { useNavigate, Link } from 'react-router-dom'
const NAV_LIST = [
  {
    name: '產品一覽',
    path: '/products'
  },
  {
    name: '優惠券管理',
    path: '/coupons'
  },
  {
    name: '訂單列表',
    path: '/orders'
  },
  {
    name: '文章管理',
    path: '/articles'
  }
]
export default function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const username = auth.getUsername()
  const navigate = useNavigate()

  const onLogout = () => {
    auth.logout()
    navigate('/login', { replace: true })
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="position-relative mb-4">
      <div className="d-flex align-items-center justify-content-between text-nowrap px-4 py-3">
        <div className="d-flex align-items-center gap-3">
          <Link to="/products" className="d-flex align-items-center gap-3 text-decoration-none">
            <img src="/logo.png" alt="BooBoo食堂" className="img-fluid" style={{ width: '40px', height: '40px', backgroundSize: 'contain', backgroundRepeat: 'repeat' }} />
            <h2 className="text-dark fs-5 fw-bold mb-0">
              BooBoo食堂後台系統
            </h2>
          </Link>
        </div>
        <div className="d-none d-md-flex flex-grow-1 justify-content-end align-items-center gap-4">
          <nav 
            className="d-flex align-items-center gap-4 px-4 py-2 rounded-pill border bg-white shadow-sm"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(4px)' }}
          >
            {NAV_LIST.map((item) => (
              <Link className="text-dark text-decoration-none small fw-medium link-primary transition-colors" to={item.path} key={item.name}>{item.name}</Link>
            ))}
          </nav>

          <div className="d-flex align-items-center gap-2 ">
            <span className="text-muted d-none d-lg-block me-2">歡迎，{username}</span>
            <button 
              onClick={onLogout}
              className="btn btn-dark rounded-pill px-4 fw-bold shadow-sm"
              style={{ fontSize: '0.875rem' }}
            >
              登出
            </button>
          </div>
        </div>

        <button 
          className="d-md-none btn p-2 text-dark border-0"
          onClick={toggleMenu}
        >
          <span className="material-symbols-outlined">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* 手機版選單 */}
      {isMenuOpen && (
        <div 
          className="d-md-none bg-white border-top px-4 py-3 shadow-sm"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1050
          }}
        >
          <nav className="d-flex flex-column gap-3 mb-4">
            {NAV_LIST.map((item) => (
              <Link className="text-dark text-decoration-none small fw-medium py-2" to={item.path} key={item.name} onClick={() => setIsMenuOpen(false)}>{item.name}</Link>
            ))}
          </nav>
          <div className="d-flex align-items-center justify-content-between pt-3 border-top">
            <span className="text-muted small">歡迎，{username}</span>
            <button 
              onClick={onLogout}
              className="btn btn-dark rounded-pill px-4 fw-bold shadow-sm"
              style={{ fontSize: '0.875rem' }}
            >
              登出
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

