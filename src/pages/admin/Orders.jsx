import { useState, useEffect } from 'react';
import {
	TableRow,
	TableCell,
	Typography,
	Box,
	Alert,
	CircularProgress,
	Avatar,
	Stack,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
	DataGrid,
	ActionButtons,
	StatusBadge,
} from '@/components/admin/common';
import PermissionDenied from '@/components/PermissionDenied';
import { isPermissionDenied } from '@/utils/permissions';

// 訂單狀態配置
const ORDER_STATUS_CONFIG = {
	pending: {
		label: '待處理',
		color: 'warning',
	},
	processing: {
		label: '製作中',
		color: 'info',
	},
	completed: {
		label: '已付款',
		color: 'success',
	},
	cancelled: {
		label: '未付款',
		color: 'error',
	},
};

// 表格列配置
const COLUMNS = [
	{ id: 'orderNumber', label: '訂單編號', minWidth: 120 },
	{ id: 'datetime', label: '下單時間', minWidth: 150 },
	{ id: 'customer', label: '顧客資料', minWidth: 150 },
	{ id: 'products', label: '商品摘要', minWidth: 200 },
	{ id: 'status', label: '訂單狀態', minWidth: 120, align: 'center' },
	{ id: 'total', label: '總金額', minWidth: 100, align: 'right' },
	{ id: 'payment', label: '付款狀態', minWidth: 120, align: 'center' },
	{ id: 'actions', label: '操作', minWidth: 120, align: 'center' },
];

// 排序選項
const SORT_OPTIONS = [
	{ value: 'newest', label: '最新訂單' },
	{ value: 'oldest', label: '最舊訂單' },
	{ value: 'amount-high', label: '金額由高到低' },
	{ value: 'amount-low', label: '金額由低到高' },
];

// 狀態篩選選項
const STATUS_FILTER_OPTIONS = [
	{ value: 'all', label: '全部訂單' },
	{ value: 'pending', label: '待處理' },
	{ value: 'processing', label: '製作中' },
	{ value: 'completed', label: '已完成' },
	{ value: 'cancelled', label: '已取消' },
];

export default function Orders() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [permissionError, setPermissionError] = useState(null);
	const [searchValue, setSearchValue] = useState('');
	const [sortBy, setSortBy] = useState('newest');
	const [statusFilter, setStatusFilter] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		fetchOrders();
	}, [currentPage, sortBy, statusFilter]);

	const fetchOrders = async () => {
		try {
			setLoading(true);
			setError(null);
			setPermissionError(null);

			// TODO: 替換為實際的 API 調用
			// const response = await getOrdersAPI({ page: currentPage, sort: sortBy, status: statusFilter });

			// 模擬數據
			const mockData = [
				{
					id: 1,
					orderNumber: '#1024-001',
					datetime: '2023-10-24 11:30',
					customer: {
						name: '王小明',
						phone: '0912-345-678',
					},
					products: [{ name: '旬味海鮮生魚片', quantity: 1 }],
					status: 'pending',
					total: 440,
					payment: 'completed',
					productImage: '/path/to/image.jpg',
				},
				{
					id: 2,
					orderNumber: '#1024-002',
					datetime: '2023-10-24 11:15',
					customer: {
						name: '李美華',
						phone: '0988-123-456',
					},
					products: [{ name: '手打和牛漢堡排定食', quantity: 2 }],
					status: 'processing',
					total: 840,
					payment: 'cancelled',
					productImage: '/path/to/image2.jpg',
				},
				{
					id: 3,
					orderNumber: '#1024-003',
					datetime: '2023-10-24 10:45',
					customer: {
						name: '陳大文',
						phone: '0933-777-888',
					},
					products: [{ name: '經典豚骨拉麵', quantity: 1 }],
					status: 'completed',
					total: 240,
					payment: 'completed',
					productImage: '/path/to/image3.jpg',
				},
			];

			setOrders(mockData);
			setTotalPages(3);
		} catch (err) {
			if (isPermissionDenied(err)) {
				setPermissionError(err);
			} else {
				setError('獲取訂單列表失敗，請稍後再試');
			}
		} finally {
			setLoading(false);
		}
	};

	const handleViewOrder = (order) => {
		// TODO: 實現查看訂單詳情的邏輯
		console.log('View order:', order);
	};

	const handleEditOrder = (order) => {
		// TODO: 實現編輯訂單的邏輯
		console.log('Edit order:', order);
	};

	const handleDeleteOrder = (order) => {
		// TODO: 實現刪除訂單的邏輯
		console.log('Delete order:', order);
	};

	const handleAddOrder = () => {
		// TODO: 實現新增訂單的邏輯
		console.log('Add new order');
	};

	// 渲染表格行
	const renderRow = (order) => (
		<TableRow
			key={order.id}
			hover
			sx={{
				'&:hover': {
					backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.02),
				},
				transition: 'background-color 0.2s ease-in-out',
			}}
		>
			<TableCell>
				<Typography
					variant="body2"
					fontWeight={700}
					sx={{ fontFamily: 'monospace', color: 'primary.main' }}
				>
					{order.orderNumber}
				</Typography>
			</TableCell>

			<TableCell>
				<Typography variant="body2" color="text.secondary" fontSize="0.875rem">
					{order.datetime}
				</Typography>
			</TableCell>

			<TableCell>
				<Typography variant="body2" fontWeight={600}>
					{order.customer.name}
				</Typography>
				<Typography variant="caption" color="text.secondary">
					{order.customer.phone}
				</Typography>
			</TableCell>

			<TableCell>
				<Stack direction="row" spacing={1.5} alignItems="center">
					<Avatar
						src={order.productImage}
						variant="rounded"
						sx={{
							width: 48,
							height: 48,
							borderRadius: 1,
							border: (theme) =>
								`1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
						}}
					/>
					<Box>
						<Typography variant="body2" fontWeight={600}>
							{order.products[0]?.name}
						</Typography>
						<Typography variant="caption" color="text.secondary">
							數量: {order.products[0]?.quantity}
						</Typography>
					</Box>
				</Stack>
			</TableCell>

			<TableCell align="center">
				<StatusBadge status={order.status} statusConfig={ORDER_STATUS_CONFIG} />
			</TableCell>

			<TableCell align="right">
				<Typography variant="body2" fontWeight={700} color="text.primary">
					NT$ {order.total}
				</Typography>
			</TableCell>

			<TableCell align="center">
				<StatusBadge
					status={order.payment}
					statusConfig={ORDER_STATUS_CONFIG}
					variant="outlined"
				/>
			</TableCell>

			<TableCell align="center">
				<ActionButtons
					onView={() => handleViewOrder(order)}
					onEdit={() => handleEditOrder(order)}
					onDelete={() => handleDeleteOrder(order)}
					showView={true}
				/>
			</TableCell>
		</TableRow>
	);

	// 權限錯誤顯示
	if (permissionError) {
		return <PermissionDenied error={permissionError} />;
	}

	// 載入中顯示
	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box sx={{ p: 3 }}>
			{error && (
				<Alert severity="error" sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			<DataGrid
				title="訂單列表"
				count={orders.length}
				onAdd={handleAddOrder}
				addButtonText="新增訂單"
				filterProps={{
					searchValue,
					onSearchChange: setSearchValue,
					searchPlaceholder: '搜尋訂單 ID、顧客或商品...',
					sortValue: sortBy,
					onSortChange: setSortBy,
					sortOptions: SORT_OPTIONS,
					filterValue: statusFilter,
					onFilterChange: setStatusFilter,
					filterOptions: STATUS_FILTER_OPTIONS,
				}}
				tableProps={{
					columns: COLUMNS,
					data: orders,
					renderRow,
				}}
				paginationProps={{
					currentPage,
					totalPages,
					onPageChange: setCurrentPage,
				}}
			/>
		</Box>
	);
}
