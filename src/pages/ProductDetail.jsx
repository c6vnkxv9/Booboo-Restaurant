import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductById } from '../data/products'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)

  if (!product) {
    return (
      <div className="container-fluid bg-light min-vh-100 py-5">
        <div className="container">
          <div className="card shadow">
            <div className="card-body text-center py-5">
              <h2 className="card-title mb-4">產品不存在</h2>
              <Link to="/products" className="btn btn-primary">
                返回產品列表
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-4">
          ← 返回
        </button>

        <div className="card shadow">
          <div className="card-body">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="bg-light rounded" style={{ height: '400px', overflow: 'hidden' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h1 className="mb-3">{product.name}</h1>
                <p className="text-muted mb-3">分類：{product.category}</p>
                <p className="text-primary fw-bold fs-2 mb-4">
                  NT$ {product.price.toLocaleString()}
                </p>
                <div className="alert alert-info d-flex align-items-center mb-4" role="alert">
                  <span className="me-2">庫存：</span>
                  <span className={`fw-bold ${product.stock > 20 ? 'text-success' : 'text-danger'}`}>
                    {product.stock} 件
                  </span>
                </div>
                <div className="border-top pt-4">
                  <h3 className="mb-3">產品描述</h3>
                  <p className="text-muted" style={{ lineHeight: '1.8' }}>
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

