import { useState, useEffect, useMemo } from 'react'
import { getAdminArticlesAPI } from '../api/article'
import ListLayout from '../components/ListLayout'
import CategorySidebar from '../components/CategorySidebar'
import ArticleCard from '../components/ArticleCard'
import PermissionDenied from '../components/PermissionDenied'
import { isPermissionDenied } from '../utils/permissions'

const CATEGORIES = [
  { id: 'all', name: '全部文章', icon: '📰' },
  { id: 'news', name: '最新消息', icon: '✨' },
  { id: 'events', name: '活動資訊', icon: '🎁' },
  { id: 'blog', name: '美食日誌', icon: '📝' }
]

const SORT_OPTIONS = [
  { value: 'newest', label: '由新到舊' },
  { value: 'oldest', label: '由舊到新' }
]

export default function Articles() {
  const [allArticles, setAllArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [permissionError, setPermissionError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      setError(null)
      setPermissionError(null)
      const response = await getAdminArticlesAPI()
      const articlesData = response.articles || []
      setAllArticles(articlesData)
    } catch (err) {
      // 檢查是否為權限不足錯誤
      if (isPermissionDenied(err)) {
        setPermissionError(err)
      } else {
        setError('獲取文章列表失敗，請稍後再試')
      }
    } finally {
      setLoading(false)
    }
  }

  const filteredArticles = useMemo(() => {
    let filtered = [...allArticles]
    if (activeCategory !== 'all') {
      filtered = filtered.filter(article => 
        article.tag?.includes(activeCategory) || article.category === activeCategory
      )
    }
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => (a.create_at || 0) - (b.create_at || 0))
        break
      case 'newest':
      default:
        filtered.sort((a, b) => (b.create_at || 0) - (a.create_at || 0))
        break
    }
    return filtered
  }, [allArticles, activeCategory, sortBy])

  if (loading) {
    return (
      <div className="card shadow-sm border-0">
        <div className="card-body text-center py-5" style={{ backgroundColor: 'var(--bs-light)' }}>
          <div className="spinner-border" role="status" style={{ color: 'var(--bs-primary)' }}>
            <span className="visually-hidden">載入中...</span>
          </div>
          <p className="mt-3" style={{ color: 'var(--bs-dark)' }}>正在載入文章列表...</p>
        </div>
      </div>
    )
  }

  // 如果權限不足，顯示權限錯誤提示
  if (permissionError) {
    return (
        <PermissionDenied error={permissionError} onRetry={fetchArticles} />
    )
  }

  if (error) {
    return (
      <div className="card shadow-sm border-0">
        <div className="card-body text-center py-5" style={{ backgroundColor: 'var(--bs-light)' }}>
          <div className="alert alert-danger" role="alert" style={{ backgroundColor: 'var(--bs-success)', color: 'var(--bs-light)', border: 'none' }}>
            {error}
          </div>
          <button onClick={fetchArticles} className="btn btn-primary mt-3">重新載入</button>
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
          title="文章分類"
          subtitle="瀏覽我們的最新動態"
        />
      }
    >
      {/* 篩選和排序工具欄 */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-4 mb-4">
        <div className="d-flex align-items-center gap-2">
          <div className="rounded" style={{ width: '6px', height: '24px', backgroundColor: 'var(--bs-primary)' }} />
          <h2 className="h4 fw-bold mb-0" style={{ color: 'var(--bs-dark)' }}>
            全部文章
            <span className="small fw-normal ms-2" style={{ color: 'var(--bs-accent)' }}>
              ({filteredArticles.length} 項文章)
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

      {/* 文章網格 */}
      {filteredArticles.length === 0 ? (
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5" style={{ backgroundColor: 'var(--bs-light)' }}>
            <p className="mb-0" style={{ color: 'var(--bs-dark)' }}>目前沒有文章</p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </ListLayout>
  )
}
