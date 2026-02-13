import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function EmptyCart() {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '60vh',
				py: 6,
			}}
		>
			<Stack spacing={4} alignItems="center" sx={{ maxWidth: 400 }}>
				{/* 空購物車插圖 */}
				<Box
					sx={{
						width: 160,
						height: 160,
						borderRadius: '50%',
						bgcolor: 'grey.50',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						'&::before': {
							content: '""',
							position: 'absolute',
							width: '100%',
							height: '100%',
							borderRadius: '50%',
							border: '2px dashed',
							borderColor: 'grey.300',
							animation: 'rotate 20s linear infinite',
						},
						'@keyframes rotate': {
							from: { transform: 'rotate(0deg)' },
							to: { transform: 'rotate(360deg)' },
						},
					}}
				>
					<span
						className="material-symbols-outlined"
						style={{
							fontSize: '80px',
							color: '#bdbdbd',
							fontWeight: 300,
						}}
					>
						shopping_cart
					</span>
				</Box>

				{/* 情感化文案 */}
				<Stack spacing={1.5} alignItems="center" sx={{ textAlign: 'center' }}>
					<Typography
						variant="h5"
						sx={{
							fontWeight: 800,
							color: 'text.primary',
						}}
					>
						您的肚子跟購物車都空空的嗎?
					</Typography>
					<Typography
						variant="body1"
						sx={{
							color: 'text.secondary',
							lineHeight: 1.7,
						}}
					>
						快去選購美味料理吧!
						<br />
						讓我們為您準備最道地的日式美食
					</Typography>
				</Stack>

				{/* CTA 按鈕 */}
				<Button
					variant="contained"
					size="large"
					onClick={() => navigate('/products')}
					startIcon={
						<span className="material-symbols-outlined">restaurant_menu</span>
					}
					sx={{
						px: 4,
						py: 1.5,
						fontWeight: 800,
						fontSize: '1rem',
						borderRadius: 2,
						boxShadow: 2,
						'&:hover': {
							boxShadow: 4,
							transform: 'translateY(-2px)',
						},
						transition: 'all 0.3s ease',
					}}
				>
					前往購物
				</Button>

				{/* 裝飾性元素 */}
				<Stack
					direction="row"
					spacing={2}
					sx={{
						mt: 2,
						opacity: 0.6,
					}}
				>
					<Typography variant="caption" sx={{ color: 'text.secondary' }}>
						🍱
					</Typography>
					<Typography variant="caption" sx={{ color: 'text.secondary' }}>
						🍜
					</Typography>
					<Typography variant="caption" sx={{ color: 'text.secondary' }}>
						🍙
					</Typography>
					<Typography variant="caption" sx={{ color: 'text.secondary' }}>
						🍵
					</Typography>
				</Stack>
			</Stack>
		</Box>
	);
}
