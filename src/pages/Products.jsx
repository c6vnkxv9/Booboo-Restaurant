import { useState, useEffect, useMemo } from 'react'
import { getAllAdminProductsAPI } from '@/api/products'
import ListLayout from '@/components/ListLayout'
import CategorySidebar from '@/components/CategorySidebar'
import ProductCard from '@/components/ProductCard'
import PermissionDenied from '@/components/PermissionDenied'
import { isPermissionDenied } from '@/utils/permissions'
import { CATEGORIES, SORT_OPTIONS } from '@/const/PRODUCT_CATEGEORIES'


export default function Products() {
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [permissionError, setPermissionError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    fetchProducts()
  }, [])
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      setPermissionError(null)
      const response = await getAllAdminProductsAPI()
      const productsData = response.products || [] 
      const productsArray = Array.isArray(productsData) ? productsData : Object.values(productsData)
      setAllProducts(productsArray)
    } catch (err) {
      // 檢查是否為權限不足錯誤
      if (isPermissionDenied(err)) {
        setPermissionError(err)
      } else {
        setError('獲取產品列表失敗，請稍後再試')
      }
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory)
    }
    switch (sortBy) {
      case 'priceHigh':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0))
        break
      case 'priceLow':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
        break
      case 'newest':
        filtered.sort((a, b) => (b.create_at || 0) - (a.create_at || 0))
        break
      default:
        break
    }
    return filtered
  }, [allProducts, activeCategory, sortBy])

  if (loading) {
    return (
      <div className="card shadow-sm border-0">
        <div className="card-body text-center py-5" style={{ backgroundColor: 'var(--bs-light)' }}>
          <div className="spinner-border" role="status" style={{ color: 'var(--bs-primary)' }}>
            <span className="visually-hidden">載入中...</span>
          </div>
          <p className="mt-3" style={{ color: 'var(--bs-dark)' }}>正在載入產品列表...</p>
        </div>
      </div>
    )
  }

  // 如果權限不足，顯示權限錯誤提示
  if (permissionError) {
    return (
        <PermissionDenied error={permissionError} onRetry={fetchProducts} />
    )
  }

  if (error) {
    return (
      <div className="card shadow-sm border-0">
        <div className="card-body text-center py-5" style={{ backgroundColor: 'var(--bs-light)' }}>
          <div className="alert alert-danger" role="alert" style={{ backgroundColor: 'var(--bs-success)', color: 'var(--bs-light)', border: 'none' }}>
            {error}
          </div>
          <button onClick={fetchProducts} className="btn btn-primary mt-3">重新載入</button>
        </div>
      </div>
    )
  }

  return (
    <ListLayout
      sidebar={
        <CategorySidebar 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          categories={CATEGORIES}
          title="菜單分類"
          subtitle="請選擇您喜愛的餐點類別"
        />
      }
    >
      {/* 篩選和排序工具欄 */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-4 mb-4">
        <div className="d-flex align-items-center gap-2">
          <div className="rounded" style={{ width: '6px', height: '24px', backgroundColor: 'var(--bs-primary)' }} />
          <h2 className="h4 fw-bold mb-0" style={{ color: 'var(--bs-dark)' }}>
            全部商品 
            <span className="small fw-normal ms-2" style={{ color: 'var(--bs-accent)' }}>
              ({filteredProducts.length} 項餐點)
            </span>
          </h2>
        </div>
        <div className="d-flex align-items-center gap-3">
          <select
            className="form-select form-select-sm rounded-pill border shadow-sm"
            style={{ maxWidth: '150px', backgroundColor: 'var(--bs-light)', color: 'var(--bs-dark)' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 產品網格 */}
      {filteredProducts.length === 0 ? (
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5" style={{ backgroundColor: 'var(--bs-light)' }}>
            <p className="mb-0" style={{ color: 'var(--bs-dark)' }}>目前沒有產品</p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </ListLayout>
  )
}
