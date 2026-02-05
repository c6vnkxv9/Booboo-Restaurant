<<<<<<< HEAD
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import AdminHeader from '@/components/header/AdminHeader';
import CommonFooter from '@/components/footer/CommonFooter';
=======
import { Outlet } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'
>>>>>>> 86529634bb5e9b54ae57abdef0415c425b481266

/**
 * 後台共用佈局組件
 * 包含導覽列 (AdminHeader) 以及主要的內容顯示區域 (Outlet)
 */
export default function AdminLayout() {
<<<<<<< HEAD
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
			<CommonFooter />
		</Box>
	);
=======
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
>>>>>>> 86529634bb5e9b54ae57abdef0415c425b481266
}
