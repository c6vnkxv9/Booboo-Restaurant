import { useState, useEffect, useMemo } from 'react'
import { getAllAdminProductsAPI, createAdminProductAPI, updateAdminProductAPI, deleteAdminProductAPI } from '@/api/products'
import ListLayout from '@/components/ListLayout'
import CategorySidebar from '@/components/CategorySidebar'
import ProductCard from '@/components/ProductCard'
import ProductEditModal from '@/components/ProductEditModal'
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
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

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

  // 處理新增商品
  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowEditModal(true)

  }

  // 處理編輯商品
  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setShowEditModal(true)
  }
  const handleDeleteProduct = (product) => {
    deleteAdminProductAPI(product.id)
    fetchProducts()
  }

  // 處理關閉 Modal
  const handleCloseModal = () => {
    setShowEditModal(false)
    setEditingProduct(null)
  }

  // 處理保存商品
  const handleSaveProduct = async (formData) => {
    try {
      // API 需要將數據包裝在 data 物件中
      const requestData = {
        data: {
          ...formData
        }
      }
      
      if (editingProduct) {
        // 更新現有商品
        await updateAdminProductAPI(editingProduct.id, requestData)
      } else {
        // 創建新商品
        await createAdminProductAPI(requestData)
      }
      // 重新獲取產品列表
      await fetchProducts()
    } catch (err) {
      if (isPermissionDenied(err)) {
        setPermissionError(err)
        throw err
      } else {
        // 處理錯誤訊息陣列
        const errorMessage = err.response?.data?.message
        const errorText = Array.isArray(errorMessage) 
          ? errorMessage.join(', ') 
          : (errorMessage || '保存失敗，請稍後再試')
        throw new Error(errorText)
      }
    }
  }

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
          <button
            className="btn btn-primary py-1 rounded-3 fw-bold"
            style={{ background: 'linear-gradient(to right, var(--bs-primary), var(--bs-primary-dark, #d88a7d))' }}
            onClick={handleAddProduct}
          >
            新增商品
          </button>
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
            <ProductCard 
              key={product.id} 
              product={product} 
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      )}

      {/* 產品編輯 Modal */}
      <ProductEditModal
        show={showEditModal}
        product={editingProduct}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
      />
    </ListLayout>
  )
}
