import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/auth'
import { products } from '../data/products'

export default function Products() {
  const navigate = useNavigate()
  const username = auth.getUsername()

  const handleLogout = () => {
    auth.logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="card-title mb-0">商品管理後台</h1>
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted">歡迎，{username}</span>
                <button onClick={handleLogout} className="btn btn-danger">
                  登出
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-4">
              <Link
                to={`/products/${product.id}`}
                className="text-decoration-none"
              >
                <div className="card h-100 shadow-sm">
                  <div className="card-img-top" style={{ height: '200px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted small mb-2">{product.category}</p>
                    <p className="card-text text-primary fw-bold fs-5 mb-2">
                      NT$ {product.price.toLocaleString()}
                    </p>
                    <p className="card-text text-secondary small mb-0">庫存：{product.stock}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

