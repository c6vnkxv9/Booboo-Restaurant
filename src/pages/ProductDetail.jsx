import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getAdminProductByIdAPI, getAllAdminProductsAPI } from '../api/products'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // 先嘗試使用單個產品 API
      try {
        const response = await getAdminProductByIdAPI(id)
        const productData = response.product || response.data || response
        if (productData) {
          setProduct(productData)
          setLoading(false)
          return
        }
      } catch (singleProductError) {
        // 如果單個產品 API 失敗，則從所有產品列表中查找
        console.log('單個產品 API 失敗，嘗試從列表中獲取:', singleProductError)
      }

      // 從所有產品列表中查找
      const response = await getAllAdminProductsAPI()
      let productsData = response.products || response.data || response || []
      
      // 如果是對象（不是數組），將對象轉換為數組
      if (!Array.isArray(productsData) && typeof productsData === 'object') {
        productsData = Object.values(productsData)
      }
      
      const productsArray = Array.isArray(productsData) ? productsData : []
      const foundProduct = productsArray.find(
        (p) => p.id === id || p.id === parseInt(id) || p._id === id
      )
      
      if (foundProduct) {
        setProduct(foundProduct)
      } else {
        setError('產品不存在')
      }
    } catch (err) {
      console.error('獲取產品詳情失敗:', err)
      setError('獲取產品詳情失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  if (loading) {
    return (
      <div className="container-fluid min-vh-100 py-5" style={{ backgroundColor: 'var(--bs-secondary)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="card border-0 shadow-lg" style={{ backgroundColor: 'var(--bs-light)' }}>
            <div className="card-body text-center py-5">
              <div className="spinner-border" role="status" style={{ color: 'var(--bs-primary)' }}>
                <span className="visually-hidden">載入中...</span>
              </div>
              <p className="mt-3" style={{ color: 'var(--bs-dark)' }}>正在載入產品詳情...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container-fluid min-vh-100 py-5" style={{ backgroundColor: 'var(--bs-secondary)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="card border-0 shadow-lg" style={{ backgroundColor: 'var(--bs-light)' }}>
            <div className="card-body text-center py-5">
              <h2 className="card-title mb-4" style={{ color: 'var(--bs-dark)' }}>
                {error || '產品不存在'}
              </h2>
              <Link to="/products" className="btn btn-primary">
                返回產品列表
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const productName = product.title || product.name || '未命名產品'
  const productImages = product.imagesUrl || (product.imageUrl ? [product.imageUrl] : []) || []
  const mainImage = productImages[selectedImageIndex] || productImages[0] || 'https://via.placeholder.com/400x300?text=No+Image'
  const productPrice = product.price || 0
  const productDescription = product.description || '暫無描述'
  const productContent = product.content || ''

  // 分類名稱對應
  const categoryNames = {
    'mainDishes': '主餐類',
    'sideDishes': '小菜類',
    'soups': '湯品類',
    'drinks': '飲料類'
  }

  const categoryName = categoryNames[product.category] || product.category || '未分類'

  return (
    <div className="container-fluid min-vh-100 py-4" style={{ backgroundColor: 'var(--bs-secondary)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* 麵包屑導航和操作按鈕 */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
          <div className="d-flex flex-wrap align-items-center gap-2 small">
            <Link 
              to="/products" 
              className="text-decoration-none"
              style={{ 
                color: 'var(--bs-accent)',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--bs-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--bs-accent)'
              }}
            >
              商品列表
            </Link>
            <span style={{ color: 'var(--bs-accent)' }}>›</span>
            <span className="fw-semibold" style={{ color: 'var(--bs-dark)' }}>
              商品詳情 #{id}
            </span>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm border rounded"
              style={{
                backgroundColor: 'var(--bs-light)',
                borderColor: '#e0e0e0',
                color: 'var(--bs-accent)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#d0d0d0'
                e.currentTarget.style.color = 'var(--bs-dark)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0'
                e.currentTarget.style.color = 'var(--bs-accent)'
              }}
            >
              <span className="me-2">👁</span>
              預覽前台
            </button>
          </div>
        </div>

        {/* 主內容區 */}
        <div 
          className="card border-0 shadow-lg rounded-4"
          style={{ 
            backgroundColor: 'var(--bs-light)',
            padding: '24px 32px'
          }}
        >
          <div className="row g-4">
            {/* 左側：商品圖片 */}
            <div className="col-12 col-lg-5">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h3 className="h6 fw-bold mb-0" style={{ color: 'var(--bs-dark)' }}>
                    商品圖片
                  </h3>
                  <button
                    className="btn btn-sm border-0 p-0 fw-bold small"
                    style={{ 
                      color: 'var(--bs-primary)'
                    }}
                  >
                    <span className="me-1">+</span>
                    新增圖片
                  </button>
                </div>
                
                {/* 主圖 */}
                <div 
                  className="position-relative rounded-3 overflow-hidden border"
                  style={{ 
                    aspectRatio: '4/3',
                    backgroundColor: 'var(--bs-secondary)',
                    borderColor: '#e5e7eb'
                  }}
                >
                  <img
                    src={mainImage}
                    alt={productName}
                    className="w-100 h-100"
                    style={{ 
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'
                    }}
                  />
                  {/* Hover 編輯按鈕 */}
                  <div 
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center gap-3"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      opacity: 0,
                      transition: 'opacity 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = 1
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = 0
                    }}
                  >
                    <button
                      className="btn rounded-circle border-0"
                      style={{
                        backgroundColor: 'var(--bs-light)',
                        width: '40px',
                        height: '40px',
                        color: 'var(--bs-dark)'
                      }}
                      title="更換主圖"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn rounded-circle border-0"
                      style={{
                        backgroundColor: 'var(--bs-light)',
                        width: '40px',
                        height: '40px',
                        color: '#ef4444'
                      }}
                      title="刪除圖片"
                    >
                      🗑️
                    </button>
                  </div>
                  {/* 封面圖標籤 */}
                  {selectedImageIndex === 0 && (
                    <div 
                      className="position-absolute top-0 start-0 m-3 px-2 py-1 rounded small fw-bold shadow-sm border"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: 'var(--bs-dark)',
                        borderColor: '#e5e7eb',
                        zIndex: 5
                      }}
                    >
                      封面圖
                    </div>
                  )}
                </div>
                
                {/* 縮略圖 */}
                <div className="row g-2">
                  {productImages.slice(0, 4).map((image, index) => (
                    <div key={index} className="col-3">
                      <div
                        className={`position-relative rounded overflow-hidden border ${
                          selectedImageIndex === index ? 'border-2' : ''
                        }`}
                        style={{
                          aspectRatio: '1/1',
                          backgroundColor: 'var(--bs-secondary)',
                          borderColor: selectedImageIndex === index 
                            ? 'var(--bs-primary)' 
                            : '#e5e7eb',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onClick={() => setSelectedImageIndex(index)}
                        onMouseEnter={(e) => {
                          if (selectedImageIndex !== index) {
                            e.currentTarget.style.borderColor = 'var(--bs-primary)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedImageIndex !== index) {
                            e.currentTarget.style.borderColor = '#e5e7eb'
                          }
                        }}
                      >
                        <img
                          src={image}
                          alt={`${productName} ${index + 1}`}
                          className="w-100 h-100"
                          style={{ objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100x100?text=No+Image'
                          }}
                        />
                        {/* 刪除按鈕 */}
                        {index > 0 && (
                          <button
                            className="position-absolute top-0 end-0 m-1 btn rounded-circle border-0 p-1"
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.8)',
                              width: '24px',
                              height: '24px',
                              opacity: 0,
                              transition: 'opacity 0.2s',
                              color: '#ef4444',
                              fontSize: '14px'
                            }}
                            onClick={(e) => {
                              e.stopPropagation()
                              // TODO: 刪除圖片功能
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.opacity = 1
                              e.currentTarget.style.backgroundColor = 'var(--bs-light)'
                            }}
                            title="刪除"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* 上傳按鈕 */}
                  {productImages.length < 4 && (
                    <div className="col-3">
                      <div
                        className="rounded border-2 border-dashed d-flex flex-column align-items-center justify-content-center"
                        style={{
                          aspectRatio: '1/1',
                          borderColor: '#d1d5db',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--bs-primary)'
                          e.currentTarget.style.backgroundColor = 'rgba(230, 172, 163, 0.05)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#d1d5db'
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                      >
                        <span style={{ fontSize: '24px', color: 'var(--bs-accent)' }}>+</span>
                        <span 
                          className="small fw-medium"
                          style={{ 
                            color: 'var(--bs-accent)',
                            fontSize: '10px'
                          }}
                        >
                          上傳
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 右側：商品資訊 */}
            <div className="col-12 col-lg-7">
              <div className="d-flex flex-column h-100">
                {/* 狀態和分類 */}
                <div className="d-flex justify-content-between align-items-start mb-4 pb-4 border-bottom">
                  <div className="d-flex flex-wrap gap-2 align-items-center small">
                    <span 
                      className="px-3 py-1 rounded small fw-bold border d-flex align-items-center gap-1"
                      style={{
                        backgroundColor: product.is_enabled === 1 ? '#dcfce7' : '#fee2e2',
                        color: product.is_enabled === 1 ? '#15803d' : '#dc2626',
                        borderColor: product.is_enabled === 1 ? '#86efac' : '#fecaca'
                      }}
                    >
                      <span 
                        className="rounded-circle"
                        style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: product.is_enabled === 1 ? '#16a34a' : '#ef4444',
                          display: 'inline-block'
                        }}
                      />
                      {product.is_enabled === 1 ? '上架中' : '已下架'}
                    </span>
                    <span 
                      className="px-3 py-1 rounded small fw-semibold border"
                      style={{
                        backgroundColor: '#f3f4f6',
                        color: '#4b5563',
                        borderColor: '#e5e7eb'
                      }}
                    >
                      {categoryName}
                    </span>
                    <span 
                      className="small"
                      style={{ color: 'var(--bs-accent)' }}
                    >
                      ID: {id}
                    </span>
                  </div>
                </div>

                {/* 商品名稱 */}
                <div className="mb-4 position-relative">
                  <label 
                    className="small fw-bold d-block mb-1"
                    style={{ color: 'var(--bs-accent)' }}
                  >
                    商品名稱
                  </label>
                  <div className="d-flex align-items-center justify-content-between group">
                    <h1 
                      className="h3 fw-bold mb-0"
                      style={{ 
                        color: 'var(--bs-dark)',
                        lineHeight: '1.2'
                      }}
                    >
                      {productName}
                    </h1>
                  </div>
                </div>

                {/* 商品簡述 */}
                <div className="mb-4 position-relative">
                  <label 
                    className="small fw-bold d-block mb-1"
                    style={{ color: 'var(--bs-accent)' }}
                  >
                    商品簡述
                  </label>
                  <p 
                    className="small p-3 rounded border"
                    style={{
                      color: 'var(--bs-accent)',
                      lineHeight: '1.6',
                      borderColor: 'transparent',
                      backgroundColor: 'transparent',
                      transition: 'all 0.2s',
                      margin: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(230, 172, 163, 0.3)'
                      e.currentTarget.style.backgroundColor = 'var(--bs-secondary)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'transparent'
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    {productDescription}
                  </p>
                  {productContent && productContent !== productDescription && (
                    <p 
                      className="small p-3 rounded border"
                      style={{
                        color: 'var(--bs-accent)',
                        lineHeight: '1.6',
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                        margin: 0,
                        marginTop: '8px'
                      }}
                    >
                      {productContent}
                    </p>
                  )}
                </div>

                {/* 價格設定 */}
                <div 
                  className="mb-4 p-4 rounded-3 border"
                  style={{
                    backgroundColor: 'var(--bs-secondary)',
                    borderColor: '#e0e0e0'
                  }}
                >
                  <h4 
                    className="small fw-bold mb-3 d-flex align-items-center gap-2 border-bottom pb-2"
                    style={{ 
                      color: 'var(--bs-dark)',
                      borderColor: '#e5e7eb !important'
                    }}
                  >
                    <span>💰</span>
                    價格設定
                  </h4>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="small" style={{ color: 'var(--bs-accent)' }}>
                      銷售價格
                    </span>
                    <div className="d-flex align-items-center gap-2">
                      <span 
                        className="h5 fw-bold mb-0"
                        style={{ color: 'var(--bs-primary)' }}
                      >
                        NT$ {productPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  {product.origin_price && product.origin_price > productPrice && (
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="small" style={{ color: 'var(--bs-accent)' }}>
                        原價 (劃線價)
                      </span>
                      <span 
                        className="small text-decoration-line-through"
                        style={{ color: 'var(--bs-dark)' }}
                      >
                        NT$ {product.origin_price.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {product.unit && (
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="small" style={{ color: 'var(--bs-accent)' }}>
                        單位
                      </span>
                      <span className="small" style={{ color: 'var(--bs-dark)' }}>
                        {product.unit}
                      </span>
                    </div>
                  )}
                </div>

                {/* 底部操作按鈕 */}
                <div className="mt-auto border-top pt-4 d-flex flex-column flex-sm-row gap-3 justify-content-end align-items-center">
                  <div 
                    className="small me-auto"
                    style={{ color: 'var(--bs-accent)' }}
                  >
                    <span className="me-1">ℹ️</span>
                    此商品目前在前台{product.is_enabled === 1 ? '可見' : '不可見'}
                  </div>
                  <button
                    className="btn btn-sm border rounded"
                    style={{
                      borderColor: product.is_enabled === 1 ? '#fecaca' : '#86efac',
                      color: product.is_enabled === 1 ? '#dc2626' : '#15803d',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <span className="me-2">{product.is_enabled === 1 ? '👁️' : '👁️‍🗨️'}</span>
                    {product.is_enabled === 1 ? '下架商品' : '上架商品'}
                  </button>
                  <button
                    className="btn btn-sm border rounded fw-bold"
                    style={{
                      backgroundColor: 'var(--bs-primary)',
                      borderColor: 'var(--bs-primary)',
                      color: 'var(--bs-dark)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#d49c95'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bs-primary)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <span className="me-2">✏️</span>
                    編輯詳細資訊
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
