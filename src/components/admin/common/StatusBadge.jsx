import { Chip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import ScheduleIcon from '@mui/icons-material/Schedule';

/**
 * 統一的狀態標籤元件
 * 基於 theme.js 的樣式規範
 *
 * @param {Object} props
 * @param {string} props.status - 狀態值
 * @param {Object} props.statusConfig - 狀態配置 { [status]: { label, color, icon } }
 * @param {string} props.size - 標籤大小 'small' | 'medium'
 * @param {string} props.variant - 標籤變體 'filled' | 'outlined'
 */

// 預設狀態配置
const DEFAULT_STATUS_CONFIG = {
	active: {
		label: '啟用中',
		color: 'success',
		icon: <CheckCircleIcon />,
	},
	inactive: {
		label: '未啟用',
		color: 'default',
		icon: <CancelIcon />,
	},
	pending: {
		label: '待處理',
		color: 'warning',
		icon: <PendingIcon />,
	},
	processing: {
		label: '處理中',
		color: 'info',
		icon: <ScheduleIcon />,
	},
	completed: {
		label: '已完成',
		color: 'success',
		icon: <CheckCircleIcon />,
	},
	cancelled: {
		label: '已取消',
		color: 'error',
		icon: <CancelIcon />,
	},
	published: {
		label: '已發佈',
		color: 'success',
		icon: <CheckCircleIcon />,
	},
	draft: {
		label: '草稿',
		color: 'default',
		icon: <ScheduleIcon />,
	},
	expired: {
		label: '已過期',
		color: 'error',
		icon: <CancelIcon />,
	},
};

export default function StatusBadge({
	status,
	statusConfig = DEFAULT_STATUS_CONFIG,
	size = 'small',
	variant = 'filled',
}) {
	const config = statusConfig[status] || {
		label: status,
		color: 'default',
	};

	const getColorStyles = (color) => {
		const colorMap = {
			success: {
				backgroundColor: (theme) => alpha(theme.palette.success.main, 0.12),
				color: 'success.main',
				borderColor: 'success.main',
			},
			error: {
				backgroundColor: (theme) => alpha('#d32f2f', 0.12),
				color: '#d32f2f',
				borderColor: '#d32f2f',
			},
			warning: {
				backgroundColor: (theme) => alpha('#ed6c02', 0.12),
				color: '#ed6c02',
				borderColor: '#ed6c02',
			},
			info: {
				backgroundColor: (theme) => alpha('#0288d1', 0.12),
				color: '#0288d1',
				borderColor: '#0288d1',
			},
			default: {
				backgroundColor: (theme) => alpha(theme.palette.text.secondary, 0.08),
				color: 'text.secondary',
				borderColor: 'text.secondary',
			},
		};
		return colorMap[color] || colorMap.default;
	};

	return (
		<Chip
			label={config.label}
			icon={config.icon}
			size={size}
			variant={variant}
			sx={{
				borderRadius: 1, // 4px (theme.shape.borderRadius)
				fontWeight: 700,
				letterSpacing: '0.05em',
				fontSize: size === 'small' ? '0.75rem' : '0.875rem',
				...getColorStyles(config.color),
				...(variant === 'outlined' && {
					backgroundColor: 'transparent',
					borderWidth: 1.5,
				}),
				'& .MuiChip-icon': {
					fontSize: '1rem',
					marginLeft: '6px',
				},
			}}
		/>
	);
}

// 導出預設配置供外部使用
export { DEFAULT_STATUS_CONFIG };
