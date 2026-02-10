import { useState, useEffect, useMemo } from 'react';
import {
	getAdminProductsAPI,
	createAdminProductAPI,
	updateAdminProductAPI,
	deleteAdminProductAPI,
} from '@/api/products';
import ListLayout from '@/components/ListLayout';
import CategorySidebar from '@/components/CategorySidebar';
import ProductCard from '@/components/admin/ProductCard';
import ProductEditModal from '@/components/admin/ProductEditModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import DeleteModal from '@/components/admin/DeleteModal';
import PermissionDenied from '@/components/PermissionDenied';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/components/Pagination';
import { isPermissionDenied } from '@/utils/permissions';
import { CATEGORIES, SORT_OPTIONS } from '@/const/PRODUCT_CATEGEORIES';
import { PageHeader, FilterBar } from '@/components/admin/common';
import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Paper,
	Typography,
} from '@mui/material';

export default function Products() {
	const [allProducts, setAllProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [permissionError, setPermissionError] = useState(null);
	const [activeCategory, setActiveCategory] = useState('all');
	const [sortBy, setSortBy] = useState('newest');
	const [searchValue, setSearchValue] = useState('');
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
	}, [activeCategory, sortBy]);

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
			setAllProducts(productsArray);
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

	const filteredProducts = useMemo(() => {
		let filtered = [...allProducts];

		// 分類篩選
		if (activeCategory !== 'all') {
			filtered = filtered.filter(
				(product) => product.category === activeCategory,
			);
		}

		// 搜尋篩選
		if (searchValue) {
			const searchLower = searchValue.toLowerCase();
			filtered = filtered.filter(
				(product) =>
					product.title?.toLowerCase().includes(searchLower) ||
					product.description?.toLowerCase().includes(searchLower),
			);
		}

		// 排序
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
	}, [allProducts, activeCategory, sortBy, searchValue]);

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

	// 處理關閉 Modal
	const handleCloseModal = () => {
		setShowEditModal(false);
		setEditingProduct(null);
	};

	// 處理保存商品
	const handleSaveProduct = async (formData) => {
		try {
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

	// 載入中顯示
	if (loading) {
		return (
			<Paper
				elevation={0}
				sx={{
					p: 5,
					textAlign: 'center',
					bgcolor: 'background.default',
					borderRadius: 1,
				}}
			>
				<CircularProgress />
				<Typography sx={{ mt: 2, color: 'text.primary' }}>
					正在載入產品列表...
				</Typography>
			</Paper>
		);
	}

	// 權限錯誤顯示
	if (permissionError) {
		return <PermissionDenied error={permissionError} onRetry={fetchProducts} />;
	}

	// 一般錯誤顯示
	if (error) {
		return (
			<Paper
				elevation={0}
				sx={{
					p: 5,
					textAlign: 'center',
					bgcolor: 'background.default',
					borderRadius: 1,
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
						onClick={() => fetchProducts(1)}
						sx={{
							fontWeight: 800,
							borderRadius: 1,
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
			{/* 使用統一的頁面標題元件 */}
			<PageHeader
				title="全部商品"
				count={filteredProducts.length}
				onAdd={handleAddProduct}
				addButtonText="新增商品"
			/>

			{/* 使用統一的篩選欄元件 */}
			<FilterBar
				searchValue={searchValue}
				onSearchChange={setSearchValue}
				searchPlaceholder="搜尋商品名稱或描述..."
				sortValue={sortBy}
				onSortChange={setSortBy}
				sortOptions={SORT_OPTIONS}
			/>

			{/* 商品網格 - 保持原有的卡片式布局 */}
			{filteredProducts.length === 0 ? (
				<EmptyState
					icon="restaurant_menu"
					title="目前沒有餐點"
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

			{/* 分頁 */}
			<Pagination
				page={currentPage}
				totalPages={totalPages}
				onChange={(page) => {
					setCurrentPage(page);
					fetchProducts(page);
				}}
			/>

			{/* Modal 組件 */}
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
		</ListLayout>
	);
}
