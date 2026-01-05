/**
 * 促銷橫幅組件
 */
export default function PromotionBanner() {
  return (
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
  )
}

