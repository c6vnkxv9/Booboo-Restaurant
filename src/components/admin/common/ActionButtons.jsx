import { IconButton, Tooltip, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';

/**
 * 統一的操作按鈕組件
 * 基於 theme.js 的樣式規範
 *
 * @param {Object} props
 * @param {Function} props.onEdit - 編輯回調
 * @param {Function} props.onDelete - 刪除回調
 * @param {Function} props.onView - 查看回調
 * @param {Function} props.onMore - 更多操作回調
 * @param {boolean} props.showEdit - 是否顯示編輯按鈕
 * @param {boolean} props.showDelete - 是否顯示刪除按鈕
 * @param {boolean} props.showView - 是否顯示查看按鈕
 * @param {boolean} props.showMore - 是否顯示更多按鈕
 * @param {string} props.size - 按鈕大小 'small' | 'medium'
 */
export default function ActionButtons({
	onEdit,
	onDelete,
	onView,
	onMore,
	showEdit = true,
	showDelete = true,
	showView = false,
	showMore = false,
	size = 'small',
}) {
	const buttonSx = {
		color: 'text.secondary',
		transition: 'all 0.2s ease-in-out',
		'&:hover': {
			backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
			color: 'primary.main',
			transform: 'scale(1.1)',
		},
	};

	return (
		<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
			{showView && onView && (
				<Tooltip title="查看詳情" arrow>
					<IconButton size={size} onClick={onView} sx={buttonSx}>
						<VisibilityIcon fontSize={size} />
					</IconButton>
				</Tooltip>
			)}

			{showEdit && onEdit && (
				<Tooltip title="編輯" arrow>
					<IconButton size={size} onClick={onEdit} sx={buttonSx}>
						<EditIcon fontSize={size} />
					</IconButton>
				</Tooltip>
			)}

			{showDelete && onDelete && (
				<Tooltip title="刪除" arrow>
					<IconButton
						size={size}
						onClick={onDelete}
						sx={{
							...buttonSx,
							'&:hover': {
								backgroundColor: (theme) =>
									alpha(theme.palette.error.main, 0.08),
								color: 'error.main',
								transform: 'scale(1.1)',
							},
						}}
					>
						<DeleteIcon fontSize={size} />
					</IconButton>
				</Tooltip>
			)}

			{showMore && onMore && (
				<Tooltip title="更多操作" arrow>
					<IconButton size={size} onClick={onMore} sx={buttonSx}>
						<MoreVertIcon fontSize={size} />
					</IconButton>
				</Tooltip>
			)}
		</Box>
	);
}
