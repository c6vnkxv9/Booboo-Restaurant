import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function ArticleCard({ article }) {
  // 處理日期格式
  const date = article.create_at ? new Date(article.create_at * 1000).toLocaleDateString() : ''

  return (
    <div className="col-12 col-md-6">
      <div className="article-card-group h-100">
        <Link
          to={`/articles/${article.id}`}
          className="text-decoration-none"
        >
          <div 
            className="card h-100 shadow-sm border article-card" 
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
                aspectRatio: '16/9',
                overflow: 'hidden',
                backgroundColor: 'var(--bs-secondary)',
                borderRadius: '12px 12px 0 0'
              }}
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-100 h-100"
                style={{ 
                  objectFit: 'cover',
                  transition: 'transform 0.5s'
                }}
                onError={(e) => {
                  e.target.src = '/error-img.svg'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              />
              <div 
                className="position-absolute bottom-0 start-0 p-3 w-100"
                style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }}
              >
                <span className="badge rounded-pill bg-primary text-dark fw-bold">
                  {article.tag?.[0] || '最新消息'}
                </span>
              </div>
            </div>
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-2 mb-2 small text-muted">
                <span>{article.author || '管理員'}</span>
                <span>•</span>
                <span>{date}</span>
              </div>
              <h3 
                className="h5 fw-bold mb-3"
                style={{ 
                  color: 'var(--bs-dark)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {article.title}
              </h3>
              <p 
                className="small mb-0"
                style={{ 
                  color: 'var(--bs-accent)',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: '1.6'
                }}
              >
                {article.description}
              </p>
            </div>
            <div className="card-footer bg-transparent border-0 p-4 pt-0">
              <span className="small fw-bold text-primary">閱讀更多 →</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    imageUrl: PropTypes.string,
    create_at: PropTypes.number,
    tag: PropTypes.array,
    author: PropTypes.string,
    category: PropTypes.string
  })
}
