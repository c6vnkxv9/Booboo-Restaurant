import { useState, useEffect, useMemo } from 'react';
import {
	getAllAdminProductsAPI,
	createAdminProductAPI,
	updateAdminProductAPI,
	deleteAdminProductAPI,
} from '@/api/products';
import ListLayout from '@/components/ListLayout';
import CategorySidebar from '@/components/CategorySidebar';
import ProductCard from '@/components/ProductCard';
import ProductEditModal from '@/components/ProductEditModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import PermissionDenied from '@/components/PermissionDenied';
import EmptyState from '@/components/EmptyState';
import { isPermissionDenied } from '@/utils/permissions';
import { CATEGORIES, SORT_OPTIONS } from '@/const/PRODUCT_CATEGEORIES';
import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	MenuItem,
	Paper,
	Select,
	Stack,
	Typography,
} from '@mui/material';

export default function Products() {
	const [allProducts, setAllProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [permissionError, setPermissionError] = useState(null);
	const [activeCategory, setActiveCategory] = useState('all');
	const [sortBy, setSortBy] = useState('newest');
	const [showEditModal, setShowEditModal] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const [detailOpen, setDetailOpen] = useState(false);
	const [viewingProduct, setViewingProduct] = useState(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [deletingProduct, setDeletingProduct] = useState(null);

	useEffect(() => {
		fetchProducts();
	}, []);
	const fetchProducts = async () => {
		try {
			setLoading(true);
			setError(null);
			setPermissionError(null);
			const response = await getAllAdminProductsAPI();
			const productsData = response.products || [];
			const productsArray = Array.isArray(productsData)
				? productsData
				: Object.values(productsData);
			setAllProducts(productsArray);
		} catch (err) {
			// 檢查是否為權限不足錯誤
			if (isPermissionDenied(err)) {
				setPermissionError(err);
			} else {
				setError('獲取產品列表失敗，請稍後再試');
			}
		} finally {
			setLoading(false);
		}
	};

	const filteredProducts = useMemo(() => {
		let filtered = [...allProducts];
		if (activeCategory !== 'all') {
			filtered = filtered.filter(
				(product) => product.category === activeCategory
			);
		}
		switch (sortBy) {
			case 'priceHigh':
				filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
				break;
			case 'priceLow':
				filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
				break;
			case 'newest':
				filtered.sort((a, b) => (b.create_at || 0) - (a.create_at || 0));
				break;
			default:
				break;
		}
		return filtered;
	}, [allProducts, activeCategory, sortBy]);

	const activeCategoryName =
		CATEGORIES.find((c) => c.id === activeCategory)?.name || '此分類';

	// 處理新增商品
	const handleAddProduct = () => {
		setEditingProduct(null);
		setShowEditModal(true);
	};

	// 處理編輯商品
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
			await fetchProducts();
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

	// 處理關閉 Modal
	const handleCloseModal = () => {
		setShowEditModal(false);
		setEditingProduct(null);
	};

	// 處理保存商品
	const handleSaveProduct = async (formData) => {
		try {
			// API 需要將數據包裝在 data 物件中
			const requestData = {
				data: {
					...formData,
				},
			};

			if (editingProduct) {
				// 更新現有商品
				await updateAdminProductAPI(editingProduct.id, requestData);
			} else {
				// 創建新商品
				await createAdminProductAPI(requestData);
			}
			// 重新獲取產品列表
			await fetchProducts();
		} catch (err) {
			if (isPermissionDenied(err)) {
				setPermissionError(err);
				throw err;
			} else {
				// 處理錯誤訊息陣列
				const errorMessage = err.response?.data?.message;
				const errorText = Array.isArray(errorMessage)
					? errorMessage.join(', ')
					: errorMessage || '保存失敗，請稍後再試';
				throw new Error(errorText);
			}
		}
	};

	if (loading) {
		return (
			<Paper
				elevation={0}
				sx={{
					p: 5,
					textAlign: 'center',
					bgcolor: 'theme.palette.background.default',
				}}
			>
				<CircularProgress
					size={28}
					sx={{ color: 'theme.palette.primary.main' }}
				/>
				<Typography sx={{ mt: 2, color: 'theme.palette.text.primary' }}>
					正在載入產品列表...
				</Typography>
			</Paper>
		);
	}

	// 如果權限不足，顯示權限錯誤提示
	if (permissionError) {
		return <PermissionDenied error={permissionError} onRetry={fetchProducts} />;
	}

	if (error) {
		return (
			<Paper
				elevation={0}
				sx={{
					p: 5,
					textAlign: 'center',
					bgcolor: 'theme.palette.background.default',
				}}
			>
				<Alert
					severity="error"
					sx={{ display: 'inline-flex', textAlign: 'left' }}
				>
					{error}
				</Alert>
				<Box sx={{ mt: 2 }}>
					<Button
						variant="contained"
						onClick={fetchProducts}
						sx={{
							fontWeight: 800,
							background:
								'linear-gradient(to right, theme.palette.primary.main, theme.palette.primary.dark, #d88a7d))',
						}}
					>
						重新載入
					</Button>
				</Box>
			</Paper>
		);
	}

	return (
		<ListLayout
			sidebar={
				<CategorySidebar
					activeCategory={activeCategory}
					onCategoryChange={setActiveCategory}
					categories={CATEGORIES}
					title="菜單分類"
					subtitle="請選擇您喜愛的餐點類別"
				/>
			}
		>
			{/* 篩選和排序工具欄 */}
			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				justifyContent="space-between"
				alignItems={{ xs: 'flex-start', sm: 'center' }}
				spacing={2}
				sx={{ mb: 3 }}
			>
				<Stack direction="row" spacing={1.5} alignItems="center">
					<Box
						sx={{
							width: 6,
							height: 24,
							borderRadius: 1,
							bgcolor: 'theme.palette.primary.main',
						}}
					/>
					<Typography
						variant="h5"
						sx={{ fontWeight: 900, color: 'theme.palette.text.primary' }}
					>
						全部商品
						<Typography
							component="span"
							sx={{
								ml: 1.25,
								fontSize: 14,
								fontWeight: 500,
								color: 'theme.palette.secondary.main',
							}}
						>
							({filteredProducts.length} 項餐點)
						</Typography>
					</Typography>
				</Stack>

				<Stack direction="row" spacing={1.5} alignItems="center">
					<FormControl size="small" sx={{ minWidth: 160 }}>
						<Select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							sx={{
								borderRadius: 999,
								bgcolor: 'theme.palette.background.default',
							}}
						>
							{SORT_OPTIONS.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<Button
						variant="contained"
						onClick={handleAddProduct}
						sx={{
							fontWeight: 900,
							borderRadius: 2,
							px: 2,
							background:
								'linear-gradient(to right, theme.palette.primary.main, theme.palette.primary.dark, #d88a7d))',
						}}
					>
						新增商品
					</Button>
				</Stack>
			</Stack>

			{/* 產品網格 */}
			{filteredProducts.length === 0 ? (
				<EmptyState
					title="目前沒有商品"
					description={
						activeCategory === 'all'
							? '目前還沒有任何餐點。你可以先新增商品，或稍後再回來看看。'
							: `「${activeCategoryName}」目前沒有餐點，換個分類看看吧。`
					}
					actionLabel={activeCategory === 'all' ? '新增商品' : '回到全部商品'}
					onAction={() => {
						if (activeCategory === 'all') handleAddProduct();
						else setActiveCategory('all');
					}}
				/>
			) : (
				<div className="row g-4">
					{filteredProducts.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onView={handleViewProduct}
							onEdit={handleEditProduct}
							onDelete={handleDeleteProduct}
						/>
					))}
				</div>
			)}

			{/* 產品刪除 Modal */}
			<Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
				<DialogTitle sx={{ fontWeight: 900 }}>確認刪除</DialogTitle>
				<DialogContent>
					<Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
						確定要刪除「
						{deletingProduct?.title || deletingProduct?.name || '此商品'}
						」嗎？此操作無法復原。
					</Typography>
				</DialogContent>
				<DialogActions sx={{ px: 3, pb: 2 }}>
					<Button onClick={handleCloseDeleteDialog} disabled={deleting}>
						取消
					</Button>
					<Button
						color="error"
						variant="contained"
						onClick={handleConfirmDelete}
						disabled={deleting}
					>
						{deleting ? '刪除中...' : '確認刪除'}
					</Button>
				</DialogActions>
			</Dialog>

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
		</ListLayout>
	);
}
