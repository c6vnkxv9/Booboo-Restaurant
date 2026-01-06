import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductByIdAPI } from '@/api/products'
import ProductEditModal from '@/components/ProductEditModal'
import PermissionDenied from '@/components/PermissionDenied'
import { isPermissionDenied } from '@/utils/permissions'
import { CATEGORIES } from '@/const/PRODUCT_CATEGEORIES'
export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [permissionError, setPermissionError] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showEditModal, setShowEditModal] = useState(false)

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      setPermissionError(null)
      
      // 先嘗試使用單個產品 API
      try {
        const response = await getProductByIdAPI(id)
        const productData = response.product || response.data || response
        if (productData) {
          setProduct(productData)
          setLoading(false)
          return
        }
      } catch (singleProductError) {
        // 檢查是否為權限不足錯誤
        if (isPermissionDenied(singleProductError)) {
          setPermissionError(singleProductError)
          setLoading(false)
          return
        }
      }
    } catch (err) {
      console.error('獲取產品詳情失敗:', err)
      // 檢查是否為權限不足錯誤
      if (isPermissionDenied(err)) {
        setPermissionError(err)
      } else {
        setError('獲取產品詳情失敗，請稍後再試')
      }
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  if (loading) {
    return (
      <div className="card border-0 shadow-lg" style={{ backgroundColor: 'var(--bs-light)' }}>
        <div className="card-body text-center py-5">
          <div className="spinner-border" role="status" style={{ color: 'var(--bs-primary)' }}>
            <span className="visually-hidden">載入中...</span>
          </div>
          <p className="mt-3" style={{ color: 'var(--bs-dark)' }}>正在載入產品詳情...</p>
        </div>
      </div>
    )
  }

  // 如果權限不足，顯示權限錯誤提示
  if (permissionError) {
    return (
      <>
        <PermissionDenied error={permissionError} onRetry={fetchProduct} />
        <div className="mt-3 text-center">
          <Link to="/products" className="btn btn-outline-primary">
            返回產品列表
          </Link>
        </div>
      </>
    )
  }

  if (error || !product) {
    return (
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
    )
  }

  const productName = product.title || product.name || '未命名產品'
  const productImages = product.imagesUrl || (product.imageUrl ? [product.imageUrl] : []) || []
  const mainImage = productImages[selectedImageIndex] || productImages[0] || '/error-img.svg'
  const productPrice = product.price || 0
  const productDescription = product.description || '暫無描述'
  const productContent = product.content || ''

  // 分類名稱對應
 

  const categoryName = CATEGORIES.find(cat => cat.id === product.category)?.name || '未分類'

  // 處理保存編輯
  const handleSaveEdit = async (formData) => {
    try {
      const requestData = {
        data: {
          ...formData,
          imageUrl: product.imageUrl || product.imagesUrl?.[0] || '',
          imagesUrl: product.imagesUrl || (product.imageUrl ? [product.imageUrl] : [])
        }
      }
      await updateAdminProductAPI(id, requestData)
      await fetchProduct()
    } catch (err) {
      console.error('更新商品失敗:', err)
      // 如果是權限不足，顯示友好提示
      if (isPermissionDenied(err)) {
        setShowEditModal(false)
        return
      }
      throw new Error(err.response?.data?.message || '更新商品失敗')
    }
  }

  return (
    <>
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
                    e.target.src = '/error-img.svg'
                  }}
                />
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
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedImageIndex(index)}
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
                    </div>
                  </div>
                ))}
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
                </div>
              </div>

              {/* 商品名稱 */}
              <div className="mb-4">
                <label className="small fw-bold d-block mb-1" style={{ color: 'var(--bs-accent)' }}>商品名稱</label>
                <h1 className="h3 fw-bold mb-0" style={{ color: 'var(--bs-dark)' }}>{productName}</h1>
              </div>

              {/* 商品簡述 */}
              <div className="mb-4">
                <label className="small fw-bold d-block mb-1" style={{ color: 'var(--bs-accent)' }}>商品描述</label>
                <p className="small" style={{ color: 'var(--bs-accent)', lineHeight: '1.6' }}>{productDescription}</p>
              </div>

              {/* 價格設定 */}
              <div 
                className="mb-4 p-4 rounded-3 border"
                style={{
                  backgroundColor: 'var(--bs-secondary)',
                  borderColor: '#e0e0e0'
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small" style={{ color: 'var(--bs-accent)' }}>銷售價格</span>
                  <span className="h5 fw-bold mb-0" style={{ color: 'var(--bs-primary)' }}>NT$ {productPrice.toLocaleString()}</span>
                </div>
                {product.origin_price && (
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="small" style={{ color: 'var(--bs-accent)' }}>原價</span>
                    <span className="small text-decoration-line-through">NT$ {product.origin_price.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* 底部操作按鈕 */}
              <div className="mt-auto border-top pt-4 d-flex justify-content-end gap-3">
                {/* <button
                  className="btn btn-primary py-1 rounded-3 fw-bold"
                  style={{ background: 'linear-gradient(to right, var(--bs-primary), var(--bs-primary-dark, #d88a7d))' }}
                  onClick={() => setShowEditModal(true)}
                >
                  編輯資訊
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductEditModal
        show={showEditModal}
        product={product}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
      />
    </>
  )
}
