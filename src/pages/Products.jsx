import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/auth'
import { getAllAdminProductsAPI } from '../api/products'
import AdminHeader from '../components/AdminHeader'
import ProductSidebar from '../components/ProductSidebar'

export default function Products() {
  const navigate = useNavigate()
  const username = auth.getUsername()
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getAllAdminProductsAPI()

      let productsData = response.products || [] 
      productsData = Object.values(productsData)     
      setAllProducts(productsData)
    } catch (err) {
      setError('獲取產品列表失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  // 過濾和排序產品
  const products = useMemo(() => {
    let filtered = [...allProducts]

    // 分類過濾
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory)
    }

    // 排序
    switch (sortBy) {
      case 'priceHigh':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0))
        break
      case 'priceLow':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
        break
      case 'newest':
        // 如果 API 有創建時間字段，可以按時間排序
        break
      default: // 'popular'
        // 預設排序
        break
    }

    return filtered
  }, [allProducts, activeCategory, sortBy])

  const handleLogout = () => {
    auth.logout()
    navigate('/login', { replace: true })
  }

  if (loading) {
    return (
      <div className="container-fluid min-vh-100 py-4" style={{ backgroundColor: 'var(--bs-secondary)' }}>
        <div className="container">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center py-5" style={{ backgroundColor: 'var(--bs-light)' }}>
              <div className="spinner-border" role="status" style={{ color: 'var(--bs-primary)' }}>
                <span className="visually-hidden">載入中...</span>
              </div>
              <p className="mt-3" style={{ color: 'var(--bs-dark)' }}>正在載入產品列表...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-fluid min-vh-100 py-4" style={{ backgroundColor: 'var(--bs-secondary)' }}>
        <div className="container">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center py-5" style={{ backgroundColor: 'var(--bs-light)' }}>
              <div className="alert alert-danger" role="alert" style={{ backgroundColor: 'var(--bs-success)', color: 'var(--bs-light)', border: 'none' }}>
                {error}
              </div>
              <button onClick={fetchProducts} className="btn btn-primary mt-3">
                重新載入
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid min-vh-100 py-4" style={{ backgroundColor: 'var(--bs-secondary)' }}>
      <div className="container">
        <AdminHeader 
          title="商品管理後台"
          username={username}
          onLogout={handleLogout}
        />

        <div className="row mt-4">
          {/* 側邊欄 */}
          <ProductSidebar 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* 主內容區 */}
          <div className="col-12 col-lg-9">
            {/* 篩選和排序工具欄 */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-4 mb-4">
              <div className="d-flex align-items-center gap-2">
                <div 
                  className="rounded"
                  style={{ 
                    width: '6px', 
                    height: '24px', 
                    backgroundColor: 'var(--bs-primary)' 
                  }}
                />
                <h2 className="h4 fw-bold mb-0" style={{ color: 'var(--bs-dark)' }}>
                  全部商品 
                  <span className="small fw-normal ms-2" style={{ color: 'var(--bs-accent)' }}>
                    ({products.length} 項餐點)
                  </span>
                </h2>
              </div>
              <div className="d-flex align-items-center gap-3">
                <select
                  className="form-select form-select-sm rounded-pill border shadow-sm"
                  style={{ 
                    maxWidth: '150px',
                    backgroundColor: 'var(--bs-light)',
                    color: 'var(--bs-dark)'
                  }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">人氣推薦</option>
                  <option value="priceHigh">價格由高到低</option>
                  <option value="priceLow">價格由低到高</option>
                  <option value="newest">最新上架</option>
                </select>
              </div>
            </div>

            {/* 產品網格 */}
            {products.length === 0 ? (
              <div className="card shadow-sm border-0">
                <div className="card-body text-center py-5" style={{ backgroundColor: 'var(--bs-light)' }}>
                  <p className="mb-0" style={{ color: 'var(--bs-dark)' }}>目前沒有產品</p>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {products.map((product) => (
                  <div key={product.id} className="col-12 col-sm-6 col-lg-4">
                    <div className="product-card-group-new">
                      <Link
                        to={`/products/${product.id}`}
                        className="text-decoration-none"
                      >
                        <div 
                          className="card h-100 shadow-sm border product-card-new" 
                          style={{ 
                            backgroundColor: 'var(--bs-light)',
                            borderRadius: '12px',
                            borderColor: 'transparent',
                            transition: 'all 0.3s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)'
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)'
                            e.currentTarget.style.borderColor = 'rgba(230, 172, 163, 0.2)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
                            e.currentTarget.style.borderColor = 'transparent'
                          }}
                        >
                          <div 
                            className="position-relative"
                            style={{ 
                              aspectRatio: '4/3',
                              overflow: 'hidden',
                              backgroundColor: 'var(--bs-secondary)',
                              borderRadius: '8px 8px 0 0'
                            }}
                          >
                            <img
                              src={product.imageUrl || product.image || product.imagesUrl?.[0] || product.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
                              alt={product.title || product.name}
                              className="w-100 h-100"
                              style={{ 
                                objectFit: 'cover',
                                transition: 'transform 0.5s'
                              }}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)'
                              }}
                            />
                            {/* 收藏按鈕 */}
                            <button
                              type="button"
                              className="position-absolute top-0 end-0 m-2 rounded-circle border-0 d-flex align-items-center justify-content-center"
                              style={{
                                width: '36px',
                                height: '36px',
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                color: '#9ca3af',
                                transition: 'all 0.2s',
                                zIndex: 10
                              }}
                              onClick={(e) => {
                                e.preventDefault()
                                // TODO: 收藏功能
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#fee2e2'
                                e.currentTarget.style.color = '#ef4444'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                                e.currentTarget.style.color = '#9ca3af'
                              }}
                              aria-label="收藏"
                            >
                              <span style={{ fontSize: '20px' }}>♡</span>
                            </button>
                            {/* Hover 加入購物車按鈕 */}
                            <div 
                              className="position-absolute bottom-0 start-0 end-0 p-3"
                              style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                transform: 'translateY(100%)',
                                transition: 'transform 0.3s',
                                zIndex: 5
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                              }}
                            >
                              <button
                                type="button"
                                className="btn w-100 rounded border-0 fw-bold text-dark"
                                style={{ backgroundColor: 'var(--bs-light)' }}
                                onClick={(e) => {
                                  e.preventDefault()
                                  // TODO: 加入購物車功能
                                }}
                              >
                                加入購物車
                              </button>
                            </div>
                          </div>
                          <div className="card-body p-3">
                            <h3 
                              className="h6 fw-bold mb-2"
                              style={{ 
                                color: 'var(--bs-dark)',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {product.title || product.name}
                            </h3>
                            {product.description && (
                              <p 
                                className="small mb-3"
                                style={{ 
                                  color: 'var(--bs-accent)',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden'
                                }}
                              >
                                {product.description}
                              </p>
                            )}
                            <div className="d-flex align-items-center justify-content-between">
                              <span 
                                className="h5 fw-bold mb-0"
                                style={{ color: 'var(--bs-dark)' }}
                              >
                                NT$ {(product.price || 0).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

