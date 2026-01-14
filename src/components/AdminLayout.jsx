import { Outlet } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'

/**
 * 後台共用佈局組件
 * 包含導覽列 (AdminHeader) 以及主要的內容顯示區域 (Outlet)
 */
export default function AdminLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'url(/japanese-paper.jpg)',
        backgroundSize: '200px 200px',
        backgroundRepeat: 'repeat',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 }, flexGrow: 1 }}>
        <AdminHeader />
        <Box component="main" sx={{ mt: { xs: 2.5, md: 4 } }}>
          <Outlet />
        </Box>
      </Container>
      <AdminFooter />
    </Box>
  )
}

