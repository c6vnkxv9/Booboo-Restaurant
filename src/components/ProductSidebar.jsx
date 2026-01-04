/**
 * 產品側邊欄組件 - 包含分類導航和優惠橫幅
 * @param {string} activeCategory - 當前選中的分類
 * @param {Function} onCategoryChange - 分類變更處理函數
 */
export default function ProductSidebar({ activeCategory = 'all', onCategoryChange }) {
  const categories = [
    { id: 'all', name: '全部商品', icon: '📋' },
    { id: 'mainDishes', name: '定食套餐', icon: '🍱' },
    { id: 'rice', name: '丼飯系列', icon: '🍚' },
    { id: 'noodles', name: '麵食料理', icon: '🍜' },
    { id: 'sideDishes', name: '單點小菜', icon: '🥗' },
    { id: 'drinks', name: '飲料甜點', icon: '🥤' }
  ]

  return (
    <aside className="col-12 col-lg-3 mb-4 mb-lg-0">
      <div className="sticky-top" style={{ top: '120px' }}>
        <div className="d-flex flex-column gap-4">
          {/* 分類導航 */}
          <div 
            className="card shadow-sm border-0" 
            style={{ backgroundColor: 'var(--bs-light)' }}
          >
            <div className="card-body p-4">
              <h3 className="h5 fw-bold mb-1" style={{ color: 'var(--bs-dark)' }}>
                菜單分類
              </h3>
              <p className="small mb-4" style={{ color: 'var(--bs-accent)' }}>
                請選擇您喜愛的餐點類別
              </p>
              <nav className="d-flex flex-column gap-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`btn text-start d-flex align-items-center gap-3 px-3 py-2 rounded border-0 ${
                      activeCategory === category.id
                        ? 'fw-bold'
                        : ''
                    }`}
                    style={{
                      backgroundColor: activeCategory === category.id 
                        ? 'rgba(230, 172, 163, 0.1)' 
                        : 'transparent',
                      color: activeCategory === category.id 
                        ? 'var(--bs-primary)' 
                        : 'var(--bs-dark)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (activeCategory !== category.id) {
                        e.currentTarget.style.backgroundColor = 'var(--bs-secondary)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeCategory !== category.id) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* 會員優惠橫幅 */}
          <div 
            className="card border-0 text-white shadow-md position-relative overflow-hidden"
            style={{ 
              backgroundColor: 'var(--bs-dark)',
              minHeight: '200px'
            }}
          >
            <div 
              className="position-absolute top-0 start-0 w-100 h-100 opacity-30"
              style={{
                backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBvWcIFX7fTsijP8vJABjxP4toU5fxUS2WSTv01IIAZjnz1ZPGS5bIzjSdfY9xGgQJJTHV0u9hvlFY2HlbcZBqIkMQo3ez7SNl4qBrB53_7Zw8LX19P5xVqnwQVu2o-t33lQY6wfnLXE69aQYCJxjl9g-lklH5FFKIQTzEZ7sfEKTTq7sM97L5PPF410UBC5NH0pLsjQPkhrodQobJWfBKYzOJ3AtyA6mOTu1lE7F7KwQKf-tLYBacwKxi-BugfMApUrJNAl9PNznI)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="card-body p-4 position-relative" style={{ zIndex: 1 }}>
              <div className="text-center">
                <div className="mb-2" style={{ fontSize: '40px' }}>🎁</div>
                <h4 className="fw-bold h5 mb-2">會員專屬優惠</h4>
                <p className="small mb-4 opacity-90">
                  加入會員即送
                  <br />
                  季節小菜一份
                </p>
                <button 
                  className="btn w-100 rounded-pill fw-bold text-dark border-0"
                  style={{ 
                    backgroundColor: 'var(--bs-light)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f0f0'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bs-light)'
                  }}
                >
                  立即註冊
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

