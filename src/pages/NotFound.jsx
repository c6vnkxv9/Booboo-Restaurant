import { Link as RouterLink } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import FrontLayout from '@/components/FrontLayout';

export default function NotFound() {
	return (
		<FrontLayout maxWidth="md">
			<Stack spacing={3} alignItems="center" sx={{ py: 8 }}>
				<Typography variant="h3" sx={{ fontWeight: 900 }}>
					404
				</Typography>
				<Typography
					variant="h6"
					sx={{ color: 'text.secondary', textAlign: 'center' }}
				>
					找不到你要的頁面，請確認網址是否正確。
				</Typography>
				<Button
					component={RouterLink}
					to="/"
					variant="contained"
					sx={{ fontWeight: 800 }}
				>
					回到首頁
				</Button>
			</Stack>
		</FrontLayout>
	);
}
