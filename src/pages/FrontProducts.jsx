import { useEffect, useState } from 'react';
import {
	Alert,
	Backdrop,
	Box,
	CircularProgress,
	Snackbar,
	Stack,
	Typography,
} from '@mui/material';
import FrontLayout from '@/components/FrontLayout';
import FrontProductCard from '@/components/FrontProductCard';
import Pagination from '@/components/Pagination';
import { getProductsAPI } from '@/api/products';
import { addToCartAPI } from '@/api/cart';

export default function FrontProducts() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [addingId, setAddingId] = useState(null);
	const [toast, setToast] = useState({
		open: false,
		message: '',
		severity: 'success',
	});

	const fetchProducts = async (targetPage = 1) => {
		try {
			setLoading(true);
			setError(null);
			const response = await getProductsAPI({ page: targetPage });
			const productsData =
				response.products || response.data?.products || response.data || [];
			setProducts(
				Array.isArray(productsData) ? productsData : Object.values(productsData)
			);
			const total =
				response.pagination?.total_pages ||
				response.data?.pagination?.total_pages ||
				1;
			setTotalPages(Number.isFinite(total) && total > 0 ? total : 1);
		} catch (err) {
			setError('取得產品列表失敗，請稍後再試');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts(1);
	}, []);

	const handleAddToCart = async (product) => {
		if (!product?.id) return;
		try {
			setAddingId(product.id);
			await addToCartAPI(product.id, 1);
			setToast({ open: true, message: '已加入購物車', severity: 'success' });
		} catch (err) {
			setToast({
				open: true,
				message: '加入購物車失敗，請稍後再試',
				severity: 'error',
			});
		} finally {
			setAddingId(null);
		}
	};

	return (
		<FrontLayout>
			<Stack spacing={1.5} sx={{ mb: 4 }}>
				<Typography variant="h4" sx={{ fontWeight: 900 }}>
					產品列表
				</Typography>
				<Typography variant="body2" sx={{ color: 'text.secondary' }}>
					探索每日精選餐點，挑選你的喜愛口味。
				</Typography>
			</Stack>

			{loading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
					<CircularProgress />
				</Box>
			) : error ? (
				<Alert severity="error">{error}</Alert>
			) : products.length === 0 ? (
				<Alert severity="info">目前沒有可顯示的商品</Alert>
			) : (
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: {
							xs: 'repeat(1, minmax(0, 1fr))',
							sm: 'repeat(2, minmax(0, 1fr))',
							lg: 'repeat(3, minmax(0, 1fr))',
						},
						gap: 3,
					}}
				>
					{products.map((product) => (
						<FrontProductCard
							key={product.id}
							product={product}
							onAddToCart={handleAddToCart}
							adding={addingId === product.id}
						/>
					))}
				</Box>
			)}

			<Pagination
				page={page}
				totalPages={totalPages}
				onChange={(nextPage) => {
					setPage(nextPage);
					fetchProducts(nextPage);
				}}
			/>

			<Backdrop
				open={Boolean(addingId)}
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<CircularProgress color="inherit" />
			</Backdrop>

			<Snackbar
				open={toast.open}
				autoHideDuration={2400}
				onClose={() => setToast((prev) => ({ ...prev, open: false }))}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert severity={toast.severity} sx={{ width: '100%' }}>
					{toast.message}
				</Alert>
			</Snackbar>
		</FrontLayout>
	);
}
