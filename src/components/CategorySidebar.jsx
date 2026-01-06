import PropTypes from 'prop-types'

/**
 * 通用的分類導航組件
 * @param {string} activeCategory - 當前選中的分類
 * @param {Function} onCategoryChange - 分類變更處理函數
 * @param {Array} categories - 分類清單
 * @param {string} title - 側邊欄標題
 * @param {string} subtitle - 側邊欄副標題
 * @param {React.ReactNode} extra - 額外的內容（如優惠橫幅）
 */
export default function CategorySidebar({ 
  activeCategory = 'all', 
  onCategoryChange, 
  categories = [],
  title = '分類',
  subtitle = '請選擇類別',
  extra
}) {
  return (
    <div className="d-flex flex-column gap-4">
      {/* 分類導航 */}
      <div 
        className="card shadow-sm border-0" 
        style={{ backgroundColor: 'var(--bs-light)' }}
      >
        <div className="card-body p-4">
          <h3 className="h5 fw-bold mb-1" style={{ color: 'var(--bs-dark)' }}>
            {title}
          </h3>
          <p className="small mb-4" style={{ color: 'var(--bs-accent)' }}>
            {subtitle}
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

      {extra}
    </div>
  )
}

CategorySidebar.propTypes = {
  activeCategory: PropTypes.string,
  onCategoryChange: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  extra: PropTypes.node
}

