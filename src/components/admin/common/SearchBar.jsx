import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { alpha } from '@mui/material/styles';

/**
 * 統一的搜尋欄元件
 * 基於 theme.js 的樣式規範
 *
 * @param {Object} props
 * @param {string} props.value - 搜尋值
 * @param {Function} props.onChange - 變更回調
 * @param {string} props.placeholder - 佔位符
 * @param {boolean} props.fullWidth - 是否全寬
 */
export default function SearchBar({
	value,
	onChange,
	placeholder = '搜尋...',
	fullWidth = true,
	...props
}) {
	return (
		<TextField
			size="small"
			fullWidth={fullWidth}
			placeholder={placeholder}
			value={value}
			onChange={(e) => onChange?.(e.target.value)}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon
							sx={{
								color: 'text.secondary',
								fontSize: '1.25rem',
							}}
						/>
					</InputAdornment>
				),
			}}
			sx={{
				'& .MuiOutlinedInput-root': {
					borderRadius: 1, // 4px (theme.shape.borderRadius)
					backgroundColor: 'background.paper',
					transition: 'all 0.2s ease-in-out',
					'&:hover': {
						backgroundColor: (theme) =>
							alpha(theme.palette.primary.main, 0.02),
					},
					'&.Mui-focused': {
						backgroundColor: 'background.paper',
						boxShadow: (theme) =>
							`0 0 0 2px ${alpha(theme.palette.primary.main, 0.08)}`,
					},
				},
			}}
			{...props}
		/>
	);
}
