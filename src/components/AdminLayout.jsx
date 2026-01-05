import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'

/**
 * 後台共用佈局組件
 * 包含導覽列 (AdminHeader) 以及主要的內容顯示區域 (Outlet)
 */
export default function AdminLayout() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundImage: 'url(/japanese-paper.svg)', backgroundSize: 'contain', backgroundRepeat: 'repeat' }}>
      <div className="container py-4 flex-grow-1">
        <AdminHeader />
        <main className="mt-4">
          <Outlet />
        </main>
      </div>
      <AdminFooter />
    </div>
  )
}

