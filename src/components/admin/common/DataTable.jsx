import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Box,
	Typography,
	Checkbox,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * 統一的數據表格元件
 * 基於 theme.js 的樣式規範
 *
 * @param {Object} props
 * @param {Array} props.columns - 表格列配置 [{ id, label, align, minWidth }]
 * @param {Array} props.data - 表格數據
 * @param {Function} props.renderRow - 渲染每一行的函數 (row, index) => React.Node
 * @param {boolean} props.selectable - 是否支持選擇
 * @param {Array} props.selected - 已選中的項目
 * @param {Function} props.onSelectAll - 全選回調
 * @param {Function} props.onSelect - 單選回調
 */
export default function DataTable({
	columns = [],
	data = [],
	renderRow,
	selectable = false,
	selected = [],
	onSelectAll,
	onSelect,
}) {
	const isAllSelected = data.length > 0 && selected.length === data.length;
	const isIndeterminate = selected.length > 0 && selected.length < data.length;

	return (
		<TableContainer
			component={Paper}
			elevation={0}
			sx={{
				borderRadius: 1, // 4px (theme.shape.borderRadius)
				backgroundColor: 'rgba(255, 255, 255, 0.80)',
				backdropFilter: 'blur(8px)',
				border: (theme) =>
					`1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
				overflow: 'hidden',
			}}
		>
			<Table sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow
						sx={{
							backgroundColor: (theme) =>
								alpha(theme.palette.primary.main, 0.04),
						}}
					>
						{selectable && (
							<TableCell padding="checkbox">
								<Checkbox
									indeterminate={isIndeterminate}
									checked={isAllSelected}
									onChange={onSelectAll}
									sx={{
										color: (theme) => alpha(theme.palette.primary.main, 0.3),
										'&.Mui-checked': {
											color: 'primary.main',
										},
									}}
								/>
							</TableCell>
						)}
						{columns.map((column) => (
							<TableCell
								key={column.id}
								align={column.align || 'left'}
								sx={{
									minWidth: column.minWidth,
									fontWeight: 700,
									fontSize: '0.875rem',
									color: 'text.secondary',
									borderBottom: (theme) =>
										`1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
								}}
							>
								{column.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={columns.length + (selectable ? 1 : 0)}
								sx={{ textAlign: 'center', py: 8 }}
							>
								<Typography variant="body2" color="text.secondary">
									暫無數據
								</Typography>
							</TableCell>
						</TableRow>
					) : (
						data.map((row, index) => renderRow(row, index))
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
