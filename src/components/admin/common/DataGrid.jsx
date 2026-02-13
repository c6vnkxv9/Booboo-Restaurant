import { Box, Stack } from '@mui/material';
import DataTable from './DataTable';
import PageHeader from './PageHeader';
import FilterBar from './FilterBar';
import Pagination from '@/components/Pagination';

/**
 * 統一的數據網格容器元件（整合 Table + Header + Filter + Pagination）
 * 基於 theme.js 的樣式規範
 *
 * @param {Object} props
 * @param {string} props.title - 頁面標題
 * @param {number} props.count - 項目總數
 * @param {Function} props.onAdd - 新增按鈕回調
 * @param {string} props.addButtonText - 新增按鈕文字
 * @param {Object} props.filterProps - FilterBar 的屬性
 * @param {Object} props.tableProps - DataTable 的屬性
 * @param {Object} props.paginationProps - Pagination 的屬性
 */
export default function DataGrid({
	title,
	count,
	onAdd,
	addButtonText,
	filterProps = {},
	tableProps = {},
	paginationProps = {},
}) {
	return (
		<Box>
			{/* 頁面標題 */}
			<PageHeader
				title={title}
				count={count}
				onAdd={onAdd}
				addButtonText={addButtonText}
			/>

			{/* 篩選欄 */}
			{Object.keys(filterProps).length > 0 && <FilterBar {...filterProps} />}

			{/* 數據表格 */}
			<DataTable {...tableProps} />

			{/* 分頁 */}
			{paginationProps.totalPages > 1 && (
				<Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
					<Pagination {...paginationProps} />
				</Box>
			)}
		</Box>
	);
}
