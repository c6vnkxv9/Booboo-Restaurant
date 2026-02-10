import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
	Alert,
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Snackbar,
	Stack,
	Typography,
} from '@mui/material';
import Swal from 'sweetalert2';
import FrontLayout from '@/components/front/FrontLayout';
import { getProductByIdAPI } from '@/api/products';
import { addToCartAPI } from '@/api/cart';

export default function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [adding, setAdding] = useState(false);
	const [error, setError] = useState(null);
	const [toast, setToast] = useState({
		open: false,
		message: '',
		severity: 'success',
	});

	const fetchProduct = async (productId) => {
		try {
			setLoading(true);
			setError(null);
			const response = await getProductByIdAPI(productId);
			const productData =
				response.product || response.data?.product || response.data || null;
			setProduct(productData);
		} catch (err) {
			setError('取得產品資料失敗，請稍後再試');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (id) fetchProduct(id);
	}, [id]);

	const handleAddToCart = async () => {
		if (!product?.id) return;
		try {
			setAdding(true);
			await addToCartAPI(product.id, 1);
			Swal.fire({
				icon: 'success',
				title: '加入成功！',
				text: `已將「${product.title || product.name}」加入購物車`,
				timer: 2000,
				showConfirmButton: false,
				position: 'top-end',
				toast: true,
			});
		} catch (err) {
			Swal.fire({
				icon: 'error',
				title: '加入失敗',
				text: '加入購物車失敗，請稍後再試',
				confirmButtonText: '確定',
			});
		} finally {
			setAdding(false);
		}
	};

	if (loading) {
		return (
			<FrontLayout>
				<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
					<CircularProgress />
				</Box>
			</FrontLayout>
		);
	}

	if (error) {
		return (
			<FrontLayout>
				<Alert severity="error">{error}</Alert>
			</FrontLayout>
		);
	}

	if (!product) {
		return (
			<FrontLayout>
				<Alert severity="warning">找不到該產品</Alert>
			</FrontLayout>
		);
	}

	const imageSrc =
		product.imageUrl ||
		product.image ||
		product.imagesUrl?.[0] ||
		product.images?.[0] ||
		'/error-img.svg';
	const price = Number(product.price || 0);
	const originPrice = Number(product.origin_price || product.originPrice || 0);

	return (
		<FrontLayout>
			<Stack spacing={4}>
				<Button
					component={RouterLink}
					to="/products"
					sx={{ width: 'fit-content' }}
				>
					返回產品列表
				</Button>

				<Box
					sx={{
						display: 'grid',
						gap: 4,
						gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' },
						alignItems: 'start',
					}}
				>
					<Box
						component="img"
						src={imageSrc}
						alt={product.title || product.name}
						onError={(e) => {
							e.currentTarget.src = '/error-img.svg';
						}}
						sx={{ width: '100%', borderRadius: 2, objectFit: 'cover' }}
					/>
					<Stack spacing={2}>
						<Typography variant="h4" sx={{ fontWeight: 900 }}>
							{product.title || product.name}
						</Typography>
						<Stack direction="row" spacing={1} alignItems="baseline">
							<Typography variant="h5" sx={{ fontWeight: 900 }}>
								NT$ {price.toLocaleString()}
							</Typography>
							{originPrice > price ? (
								<Typography
									variant="body1"
									sx={{
										textDecoration: 'line-through',
										color: 'text.secondary',
									}}
								>
									NT$ {originPrice.toLocaleString()}
								</Typography>
							) : null}
						</Stack>
						<Typography
							variant="body1"
							sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}
						>
							{product.description || '尚未提供產品描述。'}
						</Typography>
						<Button
							variant="contained"
							onClick={handleAddToCart}
							disabled={adding}
							sx={{ fontWeight: 800, width: { xs: '100%', sm: 'fit-content' } }}
						>
							{adding ? '加入中...' : '加入購物車'}
						</Button>
					</Stack>
				</Box>
			</Stack>

			<Backdrop
				open={adding}
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
