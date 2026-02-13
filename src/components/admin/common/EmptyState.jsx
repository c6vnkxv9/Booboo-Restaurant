import { Box, Typography, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';
import InboxIcon from '@mui/icons-material/Inbox';

/**
 * 統一的空狀態元件
 * 基於 theme.js 的樣式規範
 *
 * @param {Object} props
 * @param {string} props.title - 標題
 * @param {string} props.description - 描述
 * @param {string} props.actionLabel - 操作按鈕文字
 * @param {Function} props.onAction - 操作回調
 * @param {React.Node} props.icon - 自定義圖標
 */
export default function EmptyState({
	title = '暫無數據',
	description,
	actionLabel,
	onAction,
	icon,
}) {
	return (
		<Box
			sx={{
				textAlign: 'center',
				py: 8,
				px: 3,
			}}
		>
			<Box
				sx={{
					mb: 3,
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: 80,
					height: 80,
					borderRadius: '50%',
					backgroundColor: (theme) =>
						alpha(theme.palette.primary.main, 0.08),
					color: 'primary.main',
				}}
			>
				{icon || <InboxIcon sx={{ fontSize: 40 }} />}
			</Box>

			<Typography
				variant="h6"
				sx={{
					fontWeight: 700,
					color: 'text.primary',
					mb: 1,
				}}
			>
				{title}
			</Typography>

			{description && (
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}
				>
					{description}
				</Typography>
			)}

			{actionLabel && onAction && (
				<Button
					variant="contained"
					onClick={onAction}
					sx={{
						borderRadius: 1,
						fontWeight: 800,
						textTransform: 'none',
						letterSpacing: '0.1em',
						px: 3,
					}}
				>
					{actionLabel}
				</Button>
			)}
		</Box>
	);
}
