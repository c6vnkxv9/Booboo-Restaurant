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
	Chip,
	Switch,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
	DataGrid,
	ActionButtons,
	StatusBadge,
} from '@/components/admin/common';
import PermissionDenied from '@/components/PermissionDenied';
import { isPermissionDenied } from '@/utils/permissions';
import {
	getAdminProductsAPI,
	createAdminProductAPI,
	updateAdminProductAPI,
	deleteAdminProductAPI,
} from '@/api/products';
import ProductEditModal from '@/components/admin/ProductEditModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import DeleteModal from '@/components/admin/DeleteModal';
import { CATEGORIES, SORT_OPTIONS } from '@/const/PRODUCT_CATEGEORIES';

// 商品狀態配置
const PRODUCT_STATUS_CONFIG = {
	enabled: {
		label: '上架中',
		color: 'success',
	},
	disabled: {
		label: '已下架',
		color: 'default',
	},
};

// 表格列配置
const COLUMNS = [
	{ id: 'image', label: '商品圖片', minWidth: 100, align: 'center' },
	{ id: 'name', label: '商品名稱 / ID', minWidth: 250 },
	{ id: 'category', label: '分類', minWidth: 120, align: 'center' },
	{ id: 'price', label: '價格', minWidth: 100, align: 'right' },
	{ id: 'stock', label: '庫存', minWidth: 100, align: 'center' },
	{ id: 'sales', label: '總銷量', minWidth: 100, align: 'center' },
	{ id: 'status', label: '上架狀態', minWidth: 100, align: 'center' },
	{ id: 'actions', label: '操作', minWidth: 120, align: 'center' },
];

// 分類篩選選項
const CATEGORY_FILTER_OPTIONS = [
	{ value: 'all', label: '全部商品' },
	...CATEGORIES.filter((cat) => cat.id !== 'all').map((cat) => ({
		value: cat.id,
		label: cat.name,
	})),
];

export default function Products() {
	const [allProducts, setAllProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [permissionError, setPermissionError] = useState(null);
	const [searchValue, setSearchValue] = useState('');
	const [sortBy, setSortBy] = useState('newest');
	const [categoryFilter, setCategoryFilter] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [showEditModal, setShowEditModal] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const [detailOpen, setDetailOpen] = useState(false);
	const [viewingProduct, setViewingProduct] = useState(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [deletingProduct, setDeletingProduct] = useState(null);

	useEffect(() => {
		setCurrentPage(1);
		fetchProducts(1);
	}, [categoryFilter, sortBy]);

	const fetchProducts = async (page = 1) => {
		try {
			setLoading(true);
			setError(null);
			setPermissionError(null);
			const response = await getAdminProductsAPI({ page });
			const productsData = response.products || response.data || [];
			const productsArray = Array.isArray(productsData)
				? productsData
				: Object.values(productsData);

			// 篩選分類
			let filteredProducts = productsArray;
			if (categoryFilter !== 'all') {
				filteredProducts = productsArray.filter(
					(product) => product.category === categoryFilter,
				);
			}

			// 排序
			switch (sortBy) {
				case 'priceHigh':
					filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
					break;
				case 'priceLow':
					filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
					break;
				case 'newest':
					filteredProducts.sort(
						(a, b) => (b.create_at || 0) - (a.create_at || 0),
					);
					break;
				default:
					break;
			}

			setAllProducts(filteredProducts);
			const totalPagesFromAPI = response.pagination?.total_pages;
			setTotalPages(
				Number.isFinite(totalPagesFromAPI) && totalPagesFromAPI > 0
					? totalPagesFromAPI
					: 1,
			);
		} catch (err) {
			if (isPermissionDenied(err)) {
				setPermissionError(err);
			} else {
				setError('獲取產品列表失敗，請稍後再試');
			}
		} finally {
			setLoading(false);
		}
	};

	const handleAddProduct = () => {
		setEditingProduct(null);
		setShowEditModal(true);
	};

	const handleEditProduct = (product) => {
		setEditingProduct(product);
		setShowEditModal(true);
	};

	const handleViewProduct = (product) => {
		setViewingProduct(product);
		setDetailOpen(true);
	};

	const handleCloseDetailModal = () => {
		setDetailOpen(false);
		setViewingProduct(null);
	};

	const handleDeleteProduct = (product) => {
		setDeletingProduct(product);
		setDeleteDialogOpen(true);
	};

	const handleCloseDeleteDialog = () => {
		if (deleting) return;
		setDeleteDialogOpen(false);
		setDeletingProduct(null);
	};

	const handleConfirmDelete = async () => {
		if (!deletingProduct) return;
		try {
			setDeleting(true);
			await deleteAdminProductAPI(deletingProduct.id);
			await fetchProducts(currentPage);
			setDeleteDialogOpen(false);
			setDeletingProduct(null);
		} catch (err) {
			if (isPermissionDenied(err)) {
				setPermissionError(err);
				setDeleteDialogOpen(false);
				setDeletingProduct(null);
				return;
			}
			setError('刪除產品失敗，請稍後再試');
		} finally {
			setDeleting(false);
		}
	};

	const handleCloseModal = () => {
		setShowEditModal(false);
		setEditingProduct(null);
	};

	const handleSaveProduct = async (formData) => {
		try {
			const requestData = {
				data: {
					...formData,
				},
			};

			if (editingProduct) {
				await updateAdminProductAPI(editingProduct.id, requestData);
			} else {
				await createAdminProductAPI(requestData);
			}
			await fetchProducts(currentPage);
		} catch (err) {
			if (isPermissionDenied(err)) {
				setPermissionError(err);
				throw err;
			} else {
				const errorMessage = err.response?.data?.message;
				const errorText = Array.isArray(errorMessage)
					? errorMessage.join(', ')
					: errorMessage || '保存失敗，請稍後再試';
				throw new Error(errorText);
			}
		}
	};

	const handleToggleProduct = async (product) => {
		// TODO: 實現切換商品上架狀態的邏輯
		console.log('Toggle product:', product);
	};

	// 獲取分類資訊
	const getCategoryInfo = (categoryId) => {
		return (
			CATEGORIES.find((cat) => cat.id === categoryId) || {
				name: '未分類',
				icon: '📦',
			}
		);
	};

	// 渲染表格行
	const renderRow = (product) => {
		const categoryInfo = getCategoryInfo(product.category);
		const isEnabled = product.is_enabled ?? true;

		return (
			<TableRow
				key={product.id}
				hover
				sx={{
					'&:hover': {
						backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.02),
					},
					transition: 'background-color 0.2s ease-in-out',
				}}
			>
				{/* 商品圖片 */}
				<TableCell align="center">
					<Avatar
						src={product.imageUrl || product.image}
						variant="rounded"
						sx={{
							width: 72,
							height: 72,
							borderRadius: 1,
							border: (theme) =>
								`1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
						}}
					/>
				</TableCell>

				{/* 商品名稱 / ID */}
				<TableCell>
					<Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
						{product.title || product.name}
					</Typography>
					<Typography
						variant="caption"
						sx={{
							fontFamily: 'monospace',
							color: 'text.secondary',
						}}
					>
						ID: {product.id}
					</Typography>
				</TableCell>

				{/* 分類 */}
				<TableCell align="center">
					<Chip
						label={`${categoryInfo.icon} ${categoryInfo.name}`}
						size="small"
						sx={{
							borderRadius: 1,
							fontWeight: 600,
							fontSize: '0.75rem',
							backgroundColor: (theme) =>
								alpha(theme.palette.primary.main, 0.08),
							color: 'primary.main',
						}}
					/>
				</TableCell>

				{/* 價格 */}
				<TableCell align="right">
					<Stack alignItems="flex-end" spacing={0.5}>
						<Typography variant="body2" fontWeight={700} color="primary.main">
							NT$ {product.price}
						</Typography>
						{product.origin_price && product.origin_price > product.price && (
							<Typography
								variant="caption"
								sx={{
									textDecoration: 'line-through',
									color: 'text.secondary',
								}}
							>
								NT$ {product.origin_price}
							</Typography>
						)}
					</Stack>
				</TableCell>

				{/* 庫存 */}
				<TableCell align="center">
					<Chip
						label={`${product.stock || 0} 份`}
						size="small"
						color={
							(product.stock || 0) > 20
								? 'success'
								: (product.stock || 0) > 5
									? 'warning'
									: 'error'
						}
						sx={{
							borderRadius: 1,
							fontWeight: 700,
							minWidth: 60,
						}}
					/>
				</TableCell>

				{/* 總銷量 */}
				<TableCell align="center">
					<Typography variant="body2" fontWeight={600} color="text.secondary">
						{product.sales || 0} 份
					</Typography>
				</TableCell>

				{/* 上架狀態 */}
				<TableCell align="center">
					<Switch
						checked={isEnabled}
						onChange={() => handleToggleProduct(product)}
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

				{/* 操作按鈕 */}
				<TableCell align="center">
					<ActionButtons
						onView={() => handleViewProduct(product)}
						onEdit={() => handleEditProduct(product)}
						onDelete={() => handleDeleteProduct(product)}
						showView={true}
					/>
				</TableCell>
			</TableRow>
		);
	};

	if (permissionError) {
		return <PermissionDenied error={permissionError} onRetry={fetchProducts} />;
	}

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
				title="商品管理"
				count={allProducts.length}
				onAdd={handleAddProduct}
				addButtonText="新增商品"
				filterProps={{
					searchValue,
					onSearchChange: setSearchValue,
					searchPlaceholder: '搜尋商品名稱或 ID...',
					sortValue: sortBy,
					onSortChange: setSortBy,
					sortOptions: SORT_OPTIONS,
					filterValue: categoryFilter,
					onFilterChange: setCategoryFilter,
					filterOptions: CATEGORY_FILTER_OPTIONS,
				}}
				tableProps={{
					columns: COLUMNS,
					data: allProducts,
					renderRow,
				}}
				paginationProps={{
					currentPage,
					totalPages,
					onPageChange: (page) => {
						setCurrentPage(page);
						fetchProducts(page);
					},
				}}
			/>

			<DeleteModal
				open={deleteDialogOpen}
				onClose={handleCloseDeleteDialog}
				onConfirm={handleConfirmDelete}
				loading={deleting}
				description={`確定要刪除「${
					deletingProduct?.title || deletingProduct?.name || '此商品'
				}」嗎？此操作無法復原。`}
			/>

			<ProductEditModal
				show={showEditModal}
				product={editingProduct}
				onClose={handleCloseModal}
				onSave={handleSaveProduct}
			/>

			<ProductDetailModal
				open={detailOpen}
				product={viewingProduct}
				onClose={handleCloseDetailModal}
			/>
		</Box>
	);
}
