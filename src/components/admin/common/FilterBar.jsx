import {
	Box,
	FormControl,
	Select,
	MenuItem,
	InputAdornment,
	Stack,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { alpha } from '@mui/material/styles';
import SearchBar from './SearchBar';

/**
 * 統一的篩選欄元件
 * 基於 theme.js 的樣式規範
 *
 * @param {Object} props
 * @param {string} props.searchValue - 搜尋值
 * @param {Function} props.onSearchChange - 搜尋變更回調
 * @param {string} props.searchPlaceholder - 搜尋框佔位符
 * @param {string} props.sortValue - 排序值
 * @param {Function} props.onSortChange - 排序變更回調
 * @param {Array} props.sortOptions - 排序選項 [{ value, label }]
 * @param {string} props.filterValue - 篩選值
 * @param {Function} props.onFilterChange - 篩選變更回調
 * @param {Array} props.filterOptions - 篩選選項 [{ value, label }]
 * @param {string} props.filterLabel - 篩選標籤
 */
export default function FilterBar({
	searchValue,
	onSearchChange,
	searchPlaceholder = '搜尋...',
	sortValue,
	onSortChange,
	sortOptions = [],
	filterValue,
	onFilterChange,
	filterOptions = [],
	filterLabel = '篩選',
}) {
	return (
		<Stack
			direction={{ xs: 'column', sm: 'row' }}
			spacing={2}
			sx={{
				mb: 3,
				alignItems: { xs: 'stretch', sm: 'center' },
			}}
		>
			{/* 搜尋框 */}
			{onSearchChange && (
				<Box sx={{ flex: 1 }}>
					<SearchBar
						value={searchValue}
						onChange={onSearchChange}
						placeholder={searchPlaceholder}
					/>
				</Box>
			)}

			{/* 篩選下拉選單 */}
			{filterOptions.length > 0 && onFilterChange && (
				<FormControl size="small" sx={{ minWidth: 160 }}>
					<Select
						value={filterValue}
						onChange={(e) => onFilterChange(e.target.value)}
						displayEmpty
						startAdornment={
							<InputAdornment position="start" sx={{ ml: 1 }}>
								<FilterListIcon
									sx={{ fontSize: '1.25rem', color: 'text.secondary' }}
								/>
							</InputAdornment>
						}
						sx={{
							borderRadius: 1,
							backgroundColor: 'background.paper',
							'&:hover': {
								backgroundColor: (theme) =>
									alpha(theme.palette.primary.main, 0.02),
							},
						}}
					>
						{filterOptions.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}

			{/* 排序下拉選單 */}
			{sortOptions.length > 0 && onSortChange && (
				<FormControl size="small" sx={{ minWidth: 140 }}>
					<Select
						value={sortValue}
						onChange={(e) => onSortChange(e.target.value)}
						sx={{
							borderRadius: 1,
							backgroundColor: 'background.paper',
							'&:hover': {
								backgroundColor: (theme) =>
									alpha(theme.palette.primary.main, 0.02),
							},
						}}
					>
						{sortOptions.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
		</Stack>
	);
}
