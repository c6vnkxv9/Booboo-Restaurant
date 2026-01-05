import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4">
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
                src={product.imageUrl || product.image || product.imagesUrl?.[0] || product.images?.[0] || '/error-img.svg'}
                alt={product.title || product.name}
                className="w-100 h-100"
                style={{ 
                  objectFit: 'cover',
                  transition: 'transform 0.5s'
                }}
                onError={(e) => {
                  e.target.src = '/error-img.svg'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              />
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
  )
}

