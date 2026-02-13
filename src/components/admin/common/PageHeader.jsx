import { Box, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

/**
 * 統一的頁面標題元件
 * 基於 theme.js 的樣式規範
 *
 * @param {Object} props
 * @param {string} props.title - 頁面標題
 * @param {string} props.subtitle - 頁面副標題
 * @param {string} props.count - 項目數量
 * @param {Function} props.onAdd - 新增按鈕回調
 * @param {string} props.addButtonText - 新增按鈕文字
 * @param {React.Node} props.actions - 自定義操作按鈕
 */
export default function PageHeader({
	title,
	subtitle,
	count,
	onAdd,
	addButtonText = '新增',
	actions,
}) {
	return (
		<Box
			sx={{
				mb: 4,
				display: 'flex',
				flexDirection: { xs: 'column', sm: 'row' },
				justifyContent: 'space-between',
				alignItems: { xs: 'flex-start', sm: 'center' },
				gap: 2,
			}}
		>
			<Box>
				<Stack
					direction="row"
					spacing={1.5}
					alignItems="center"
					sx={{ mb: 0.5 }}
				>
					<Typography
						variant="h2"
						sx={{
							fontFamily: "'Kaisei Opti', serif",
							fontWeight: 700,
							fontSize: 'clamp(1.5rem, 2vw + 1rem, 2rem)',
							color: 'text.primary',
						}}
					>
						{title}
					</Typography>
					{typeof count !== 'undefined' && (
						<Typography
							component="span"
							sx={{
								fontSize: '0.875rem',
								fontWeight: 700,
								color: 'text.secondary',
								backgroundColor: (theme) => theme.palette.background.default,
								px: 1.5,
								py: 0.5,
								borderRadius: 1,
							}}
						>
							共 {count} 項
						</Typography>
					)}
				</Stack>
				{subtitle && (
					<Typography variant="body2" color="text.secondary">
						{subtitle}
					</Typography>
				)}
			</Box>

			{(onAdd || actions) && (
				<Box sx={{ display: 'flex', gap: 2 }}>
					{onAdd && (
						<Button
							variant="contained"
							startIcon={<AddIcon />}
							onClick={onAdd}
							sx={{
								borderRadius: 1,
								fontWeight: 800,
								textTransform: 'none',
								letterSpacing: '0.1em',
								px: 3,
								boxShadow: (theme) =>
									`0 4px 12px ${theme.palette.primary.main}40`,
								'&:hover': {
									boxShadow: (theme) =>
										`0 6px 16px ${theme.palette.primary.main}60`,
									transform: 'translateY(-2px)',
								},
								transition: 'all 0.2s ease-in-out',
							}}
						>
							{addButtonText}
						</Button>
					)}
					{actions}
				</Box>
			)}
		</Box>
	);
}
