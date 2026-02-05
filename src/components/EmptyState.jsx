import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

function BentoIllustration() {
	return (
		<Box
			component="svg"
			viewBox="0 0 320 220"
			role="img"
			aria-label="空狀態插畫"
			sx={(theme) => ({
				width: 'min(260px, 85%)',
				height: 'auto',
				display: 'block',
				mx: 'auto',
				color: theme.palette.primary.main,
			})}
		>
			{/* 盤子 */}
			<path
				d="M40 170c0-18 14-32 32-32h176c18 0 32 14 32 32s-14 32-32 32H72c-18 0-32-14-32-32Z"
				fill="currentColor"
				opacity="0.10"
			/>
			{/* 便當盒 */}
			<rect
				x="70"
				y="70"
				width="180"
				height="110"
				rx="18"
				fill="currentColor"
				opacity="0.12"
			/>
			<rect
				x="78"
				y="78"
				width="164"
				height="94"
				rx="14"
				fill="white"
				opacity="0.95"
			/>
			{/* 分隔線 */}
			<path
				d="M160 84v82"
				stroke="currentColor"
				strokeOpacity="0.25"
				strokeWidth="4"
			/>
			<path
				d="M84 124h152"
				stroke="currentColor"
				strokeOpacity="0.18"
				strokeWidth="4"
			/>

			{/* 左上：飯糰 */}
			<path
				d="M104 114c0-18 14-32 32-32s32 14 32 32-14 32-32 32-32-14-32-32Z"
				fill="currentColor"
				opacity="0.14"
			/>
			<path
				d="M114 114c0-12 10-22 22-22s22 10 22 22-10 22-22 22-22-10-22-22Z"
				fill="white"
			/>
			<path
				d="M136 122c-8 0-14 6-14 14h28c0-8-6-14-14-14Z"
				fill="currentColor"
				opacity="0.18"
			/>

			{/* 右上：壽司 */}
			<rect
				x="176"
				y="92"
				width="54"
				height="44"
				rx="14"
				fill="currentColor"
				opacity="0.16"
			/>
			<rect x="182" y="98" width="42" height="18" rx="9" fill="white" />
			<rect
				x="182"
				y="120"
				width="42"
				height="10"
				rx="5"
				fill="currentColor"
				opacity="0.18"
			/>

			{/* 左下：小菜 */}
			<rect
				x="92"
				y="136"
				width="56"
				height="26"
				rx="13"
				fill="currentColor"
				opacity="0.14"
			/>
			<circle cx="108" cy="149" r="6" fill="white" />
			<circle cx="126" cy="149" r="6" fill="white" />
			<circle cx="144" cy="149" r="6" fill="white" />

			{/* 右下：可愛臉 */}
			<path
				d="M186 147c0-10 8-18 18-18h10c10 0 18 8 18 18s-8 18-18 18h-10c-10 0-18-8-18-18Z"
				fill="currentColor"
				opacity="0.12"
			/>
			<circle cx="206" cy="147" r="3" fill="currentColor" opacity="0.55" />
			<circle cx="222" cy="147" r="3" fill="currentColor" opacity="0.55" />
			<path
				d="M210 156c4 3 8 3 12 0"
				stroke="currentColor"
				strokeOpacity="0.45"
				strokeWidth="3"
				strokeLinecap="round"
			/>
		</Box>
	);
}

export default function EmptyState({
	title = '目前沒有商品',
	description = '這個分類暫時沒有餐點，換個分類看看吧。',
	actionLabel,
	onAction,
}) {
	return (
		<Paper
			elevation={0}
			sx={(theme) => ({
				p: { xs: 3, md: 5 },
				textAlign: 'center',
				bgcolor: theme.palette.background.default,
				border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
			})}
		>
			<Stack spacing={1.5} alignItems="center">
				<BentoIllustration />
				<Typography
					variant="h6"
					sx={{ fontWeight: 900, color: 'text.primary' }}
				>
					{title}
				</Typography>
				<Typography
					variant="body2"
					sx={{ color: 'text.secondary', maxWidth: 520 }}
				>
					{description}
				</Typography>
				{actionLabel && onAction ? (
					<Box sx={{ pt: 1 }}>
						<Button
							variant="contained"
							onClick={onAction}
							sx={(theme) => ({
								background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
							})}
						>
							{actionLabel}
						</Button>
					</Box>
				) : null}
			</Stack>
		</Paper>
	);
}

EmptyState.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	actionLabel: PropTypes.string,
	onAction: PropTypes.func,
};
