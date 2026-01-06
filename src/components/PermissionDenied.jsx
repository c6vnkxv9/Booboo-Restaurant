import { getPermissionErrorMessage } from '../utils/permissions'
import PropTypes from 'prop-types'

/**
 * 權限不足提示組件
 * @param {Object} props
 * @param {Error} props.error - API 錯誤物件
 * @param {Function} props.onRetry - 重試函數（可選）
 * @param {string} props.customMessage - 自訂錯誤訊息（可選）
 */
export default function PermissionDenied({ error, onRetry, customMessage }) {
  const message = customMessage || getPermissionErrorMessage(error) || '您沒有權限執行此操作'
  
  return (
    <main className="flex-grow d-flex align-items-center justify-content-center p-4 py-12">
      <div className="bg-white w-100" style={{ 
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        borderRadius: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 4rem',
        textAlign: 'center'
      }}>
        <div className="mb-5 position-relative">
          <span 
            className="material-symbols-outlined"
            style={{
              fontSize: '80px',
              color: 'rgba(234, 179, 8, 0.8)',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
              fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 48"
            }}
          >
            lock
          </span>
        </div>
        <h1 className="h2 fw-bold mb-4" style={{ 
          color: '#1f2937',
          letterSpacing: '0.025em'
        }}>
          權限不足
        </h1>
        <div 
          className="bg-primary text-dark fw-medium py-3 px-4 rounded shadow-sm mb-4 w-100"
          style={{
            maxWidth: '28rem',
            transition: 'all 0.2s',
            backgroundColor: 'var(--bs-primary)',
            color: 'var(--bs-dark)'
          }}
        >
          {message}
        </div>
        <div className="text-muted small" style={{ 
          lineHeight: '1.75',
          maxWidth: '32rem',
          margin: '0 auto'
        }}>
          <p className="mb-1">您已成功登入，但您的帳號沒有管理權限。</p>
          <p className="mb-0">如需使用後台功能，請聯繫系統管理員。</p>
        </div>
        {onRetry && (
          <button 
            onClick={onRetry} 
            className="btn btn-outline-primary mt-4"
            style={{ borderRadius: '0.375rem' }}
          >
            重新載入
          </button>
        )}
      </div>
    </main>
  )
}

PermissionDenied.propTypes = {
  error: PropTypes.object,
  onRetry: PropTypes.func,
  customMessage: PropTypes.string
}

