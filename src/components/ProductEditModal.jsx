import { useState, useEffect } from 'react'
import { CATEGORIES, SORT_OPTIONS } from '@/const/PRODUCT_CATEGEORIES'
/**
 * 產品編輯Modal組件
 * @param {boolean} show - 是否顯示Modal
 * @param {Object} product - 產品數據
 * @param {Function} onClose - 關閉Modal的回調
 * @param {Function} onSave - 保存的回調，接收更新後的產品數據
 */
export default function ProductEditModal({ show, product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    price: 0,
    origin_price: 0,
    unit: '',
    is_enabled: 1
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 當產品數據變化時，更新表單數據
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        content: product.content || '',
        category: product.category || '',
        price: product.price || 0,
        origin_price: product.origin_price || 0,
        unit: product.unit || '',
        is_enabled: product.is_enabled !== undefined ? product.is_enabled : 1
      })
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : (type === 'number' ? parseFloat(value) || 0 : value)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // 調用父組件的 onSave 回調
      await onSave(formData)
      onClose()
    } catch (err) {
      setError(err.message || '保存失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
      tabIndex="-1"
    >
      <div
        className="modal-dialog modal-dialog-scrollable modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header border-bottom" style={{ backgroundColor: 'var(--bs-light)' }}>
            <h5 className="modal-title fw-bold" style={{ color: 'var(--bs-dark)' }}>
              編輯商品資訊
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body" style={{ backgroundColor: 'var(--bs-light)' }}>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="row g-4">
                {/* 商品名稱 */}
                <div className="col-12">
                  <label className="form-label fw-bold small" style={{ color: 'var(--bs-dark)' }}>
                    商品名稱 <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    style={{
                      borderColor: '#e0e0e0'
                    }}
                  />
                </div>

                {/* 分類 */}
                <div className="col-md-6">
                  <label className="form-label fw-bold small" style={{ color: 'var(--bs-dark)' }}>
                    分類 <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    style={{
                      borderColor: '#e0e0e0'
                    }}
                  >
                    <option value="">請選擇分類</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 上架狀態 */}
                <div className="col-md-6">
                  <label className="form-label fw-bold small" style={{ color: 'var(--bs-dark)' }}>
                    上架狀態
                  </label>
                  <div className="form-check form-switch mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_enabled"
                      checked={formData.is_enabled === 1}
                      onChange={handleChange}
                      style={{
                        backgroundColor: formData.is_enabled === 1 ? 'var(--bs-primary)' : '#ccc',
                        borderColor: formData.is_enabled === 1 ? 'var(--bs-primary)' : '#ccc'
                      }}
                    />
                    <label className="form-check-label ms-2" style={{ color: 'var(--bs-dark)' }}>
                      {formData.is_enabled === 1 ? '上架中' : '已下架'}
                    </label>
                  </div>
                </div>

                {/* 商品簡述 */}
                <div className="col-12">
                  <label className="form-label fw-bold small" style={{ color: 'var(--bs-dark)' }}>
                    商品簡述
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    style={{
                      borderColor: '#e0e0e0',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* 內容 */}
                <div className="col-12">
                  <label className="form-label fw-bold small" style={{ color: 'var(--bs-dark)' }}>
                    內容
                  </label>
                  <textarea
                    className="form-control"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows="3"
                    style={{
                      borderColor: '#e0e0e0',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* 價格 */}
                <div className="col-md-6">
                  <label className="form-label fw-bold small" style={{ color: 'var(--bs-dark)' }}>
                    銷售價格 <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">NT$</span>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      required
                      style={{
                        borderColor: '#e0e0e0'
                      }}
                    />
                  </div>
                </div>

                {/* 原價 */}
                <div className="col-md-6">
                  <label className="form-label fw-bold small" style={{ color: 'var(--bs-dark)' }}>
                    原價
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">NT$</span>
                    <input
                      type="number"
                      className="form-control"
                      name="origin_price"
                      value={formData.origin_price}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      style={{
                        borderColor: '#e0e0e0'
                      }}
                    />
                  </div>
                </div>

                {/* 單位 */}
                <div className="col-md-6">
                  <label className="form-label fw-bold small" style={{ color: 'var(--bs-dark)' }}>
                    單位
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    placeholder="例如：份、碗、杯"
                    style={{
                      borderColor: '#e0e0e0'
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer border-top" style={{ backgroundColor: 'var(--bs-light)' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                取消
              </button>
              <button
                type="submit"
                className="btn fw-bold"
                style={{
                  backgroundColor: 'var(--bs-primary)',
                  borderColor: 'var(--bs-primary)',
                  color: 'var(--bs-dark)'
                }}
                disabled={loading}
              >
                {loading ? '儲存中...' : '儲存變更'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

