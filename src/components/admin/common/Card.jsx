import { Paper } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * 統一的卡片容器元件
 * 基於 theme.js 的樣式規範
 *
 * @param {Object} props
 * @param {React.Node} props.children - 子元素
 * @param {boolean} props.hover - 是否啟用 hover 效果
 * @param {string} props.elevation - 陰影層級 0-24
 * @param {Object} props.sx - 自定義樣式
 */
export default function Card({
	children,
	hover = false,
	elevation = 0,
	sx = {},
	...props
}) {
	return (
		<Paper
			elevation={elevation}
			sx={{
				borderRadius: 1, // 4px (theme.shape.borderRadius)
				backgroundColor: 'rgba(255, 255, 255, 0.85)',
				backdropFilter: 'blur(10px)',
				border: (theme) =>
					`1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
				...(hover && {
					transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
					'&:hover': {
						transform: 'translateY(-4px)',
						boxShadow: (theme) =>
							`0 8px 24px ${alpha(theme.palette.primary.main, 0.12)}`,
					},
				}),
				...sx,
			}}
			{...props}
		>
			{children}
		</Paper>
	);
}
