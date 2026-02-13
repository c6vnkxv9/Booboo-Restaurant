import { useState, useEffect } from 'react';
import {
	TableRow,
	TableCell,
	Typography,
	Switch,
	Box,
	Alert,
	CircularProgress,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
	DataGrid,
	ActionButtons,
	StatusBadge,
} from '@/components/admin/common';
import PermissionDenied from '@/components/PermissionDenied';
import { isPermissionDenied } from '@/utils/permissions';

// 優惠券狀態配置
const COUPON_STATUS_CONFIG = {
	active: {
		label: '啟用中',
		color: 'success',
	},
	expired: {
		label: '已過期',
		color: 'error',
	},
	'expiring-soon': {
		label: 'Expiring Soon',
		color: 'warning',
	},
};

// 表格列配置
const COLUMNS = [
	{ id: 'discount', label: '折扣', minWidth: 100, align: 'center' },
	{ id: 'title', label: '優惠券名稱', minWidth: 200 },
	{ id: 'code', label: 'COUPON CODE', minWidth: 150 },
	{ id: 'expires', label: 'EXPIRES', minWidth: 150 },
	{ id: 'status', label: '狀態', minWidth: 120, align: 'center' },
	{ id: 'toggle', label: '開關', minWidth: 100, align: 'center' },
	{ id: 'actions', label: '操作', minWidth: 120, align: 'center' },
];

// 排序選項
const SORT_OPTIONS = [
	{ value: 'newest', label: '最新發布' },
	{ value: 'expiring', label: '即將過期' },
	{ value: 'discount', label: '折扣大小' },
];

// 狀態篩選選項
const STATUS_FILTER_OPTIONS = [
	{ value: 'all', label: '全部狀態' },
	{ value: 'active', label: '啟用中' },
	{ value: 'expired', label: '已過期' },
	{ value: 'expiring-soon', label: '即將過期' },
];

export default function Coupons() {
	const [coupons, setCoupons] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [permissionError, setPermissionError] = useState(null);
	const [searchValue, setSearchValue] = useState('');
	const [sortBy, setSortBy] = useState('newest');
	const [statusFilter, setStatusFilter] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		fetchCoupons();
	}, [currentPage, sortBy, statusFilter]);

	const fetchCoupons = async () => {
		try {
			setLoading(true);
			setError(null);
			setPermissionError(null);

			// TODO: 替換為實際的 API 調用
			// const response = await getCouponsAPI({ page: currentPage, sort: sortBy, status: statusFilter });

			// 模擬數據
			const mockData = [
				{
					id: 1,
					discount: '9折',
					title: '夏季清涼祭',
					code: 'SUMMER2024',
					expires: '2024/08/31',
					status: 'active',
					enabled: true,
					description: '一年四季都通用，首次購買立即享 $500 折扣！',
				},
				{
					id: 2,
					discount: '-$50',
					title: '新會員見面禮',
					code: 'NEWFRIEND',
					expires: '長期有效',
					status: 'active',
					enabled: true,
					description: '首次購買專享，加入會員立即獲得！',
				},
				{
					id: 3,
					discount: '免運',
					title: '週末快樂運費全包',
					code: 'FREESHIP',
					expires: '2024/01/10',
					status: 'expiring-soon',
					enabled: true,
					description: '週末訂單免運費，滿 $1000 即可使用。',
				},
			];

			setCoupons(mockData);
			setTotalPages(1);
		} catch (err) {
			if (isPermissionDenied(err)) {
				setPermissionError(err);
			} else {
				setError('獲取優惠券列表失敗，請稍後再試');
			}
		} finally {
			setLoading(false);
		}
	};

	const handleToggleCoupon = (couponId) => {
		// TODO: 實現切換優惠券狀態的邏輯
		console.log('Toggle coupon:', couponId);
	};

	const handleEditCoupon = (coupon) => {
		// TODO: 實現編輯優惠券的邏輯
		console.log('Edit coupon:', coupon);
	};

	const handleDeleteCoupon = (coupon) => {
		// TODO: 實現刪除優惠券的邏輯
		console.log('Delete coupon:', coupon);
	};

	const handleAddCoupon = () => {
		// TODO: 實現新增優惠券的邏輯
		console.log('Add new coupon');
	};

	// 渲染表格行
	const renderRow = (coupon) => (
		<TableRow
			key={coupon.id}
			hover
			sx={{
				'&:hover': {
					backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.02),
				},
				transition: 'background-color 0.2s ease-in-out',
			}}
		>
			<TableCell align="center">
				<Box
					sx={{
						backgroundColor: 'primary.light',
						color: 'primary.contrastText',
						fontWeight: 800,
						fontSize: '0.875rem',
						borderRadius: 1,
						px: 1.5,
						py: 0.5,
						display: 'inline-block',
					}}
				>
					{coupon.discount}
				</Box>
			</TableCell>

			<TableCell>
				<Typography variant="body2" fontWeight={600}>
					{coupon.title}
				</Typography>
				{coupon.description && (
					<Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
						{coupon.description}
					</Typography>
				)}
			</TableCell>

			<TableCell>
				<Typography
					variant="body2"
					fontWeight={700}
					sx={{
						fontFamily: 'monospace',
						letterSpacing: '0.05em',
						color: 'text.secondary',
					}}
				>
					{coupon.code}
				</Typography>
			</TableCell>

			<TableCell>
				<Typography variant="body2" color="text.secondary">
					{coupon.expires}
				</Typography>
			</TableCell>

			<TableCell align="center">
				<StatusBadge
					status={coupon.status}
					statusConfig={COUPON_STATUS_CONFIG}
				/>
			</TableCell>

			<TableCell align="center">
				<Switch
					checked={coupon.enabled}
					onChange={() => handleToggleCoupon(coupon.id)}
					size="small"
					sx={{
						'& .MuiSwitch-switchBase.Mui-checked': {
							color: 'success.main',
						},
						'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
							backgroundColor: 'success.main',
						},
					}}
				/>
			</TableCell>

			<TableCell align="center">
				<ActionButtons
					onEdit={() => handleEditCoupon(coupon)}
					onDelete={() => handleDeleteCoupon(coupon)}
					showView={false}
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
				title="優惠券列表"
				count={coupons.length}
				onAdd={handleAddCoupon}
				addButtonText="新增優惠券"
				filterProps={{
					searchValue,
					onSearchChange: setSearchValue,
					searchPlaceholder: '搜尋優惠券名稱或代碼...',
					sortValue: sortBy,
					onSortChange: setSortBy,
					sortOptions: SORT_OPTIONS,
					filterValue: statusFilter,
					onFilterChange: setStatusFilter,
					filterOptions: STATUS_FILTER_OPTIONS,
				}}
				tableProps={{
					columns: COLUMNS,
					data: coupons,
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
