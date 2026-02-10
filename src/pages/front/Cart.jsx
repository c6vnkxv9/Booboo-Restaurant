import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Alert,
	Backdrop,
	Box,
	Button,
	CircularProgress,
	IconButton,
	Snackbar,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material';
import Swal from 'sweetalert2';
import FrontLayout from '@/components/front/FrontLayout';
import DeleteModal from '@/components/admin/DeleteModal';
import EmptyCart from '@/components/front/EmptyCart';
import {
	clearCartAPI,
	getCartAPI,
	removeCartItemAPI,
	updateCartItemAPI,
} from '@/api/cart';

const normalizeCart = (response) => {
	const data = response?.data || response || {};
	const cartData = data.data || data;
	return {
		carts: cartData.carts || [],
		total: Number(cartData.total || 0),
		finalTotal: Number(
			cartData.final_total || cartData.finalTotal || cartData.total || 0,
		),
	};
};

export default function Cart() {
	const navigate = useNavigate();
	const [cartItems, setCartItems] = useState([]);
	const [total, setTotal] = useState(0);
	const [finalTotal, setFinalTotal] = useState(0);
	const [loading, setLoading] = useState(true);
	const [updatingId, setUpdatingId] = useState(null);
	const [clearing, setClearing] = useState(false);
	const [deleteModal, setDeleteModal] = useState({
		open: false,
		itemId: null,
		itemName: '',
	});
	const [toast, setToast] = useState({
		open: false,
		message: '',
		severity: 'success',
	});

	const fetchCart = async () => {
		try {
			setLoading(true);
			const response = await getCartAPI();
			const cart = normalizeCart(response);
			setCartItems(cart.carts);
			setTotal(cart.total);
			setFinalTotal(cart.finalTotal);
		} catch (err) {
			setToast({
				open: true,
				message: '取得購物車失敗，請稍後再試',
				severity: 'error',
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCart();
	}, []);

	const handleUpdateQty = async (item, qty) => {
		const productId = item.product_id || item.product?.id;
		if (!item?.id || !productId) return;
		const nextQty = Number(qty);

		// 如果數量低於 1，顯示刪除確認
		if (nextQty < 1) {
			const product = item.product || {};
			setDeleteModal({
				open: true,
				itemId: item.id,
				itemName: product.title || product.name || '此商品',
			});
			return;
		}

		try {
			setUpdatingId(item.id);
			await updateCartItemAPI(item.id, productId, nextQty);
			await fetchCart();
		} catch (err) {
			setToast({
				open: true,
				message: '更新數量失敗，請稍後再試',
				severity: 'error',
			});
		} finally {
			setUpdatingId(null);
		}
	};

	const handleRemoveItem = async (itemId, itemName) => {
		setDeleteModal({
			open: true,
			itemId,
			itemName,
		});
	};

	const confirmRemoveItem = async () => {
		const { itemId } = deleteModal;
		try {
			setUpdatingId(itemId);
			setDeleteModal({ open: false, itemId: null, itemName: '' });
			await removeCartItemAPI(itemId);
			await fetchCart();
			Swal.fire({
				icon: 'success',
				title: '已刪除',
				text: '商品已從購物車移除',
				timer: 1500,
				showConfirmButton: false,
			});
		} catch (err) {
			setToast({
				open: true,
				message: '刪除品項失敗，請稍後再試',
				severity: 'error',
			});
		} finally {
			setUpdatingId(null);
		}
	};

	const handleClearCart = async () => {
		try {
			setClearing(true);
			await clearCartAPI();
			await fetchCart();
		} catch (err) {
			setToast({
				open: true,
				message: '清空購物車失敗，請稍後再試',
				severity: 'error',
			});
		} finally {
			setClearing(false);
		}
	};

	return (
		<FrontLayout>
			<Stack spacing={3}>
				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					alignItems={{ xs: 'flex-start', sm: 'center' }}
					justifyContent="space-between"
					spacing={2}
				>
					<Typography variant="h4" sx={{ fontWeight: 900 }}>
						購物車
					</Typography>
					<Button
						variant="outlined"
						onClick={handleClearCart}
						disabled={clearing || cartItems.length === 0}
					>
						清空購物車
					</Button>
				</Stack>

				{loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
						<CircularProgress />
					</Box>
				) : cartItems.length === 0 ? (
					<EmptyCart />
				) : (
					<>
						<Box sx={{ overflowX: 'auto' }}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>品項</TableCell>
										<TableCell align="right">單價</TableCell>
										<TableCell align="center">數量</TableCell>
										<TableCell align="right">小計</TableCell>
										<TableCell align="center">操作</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{cartItems.map((item) => {
										const product = item.product || {};
										const price = Number(product.price || item.price || 0);
										return (
											<TableRow key={item.id}>
												<TableCell>
													<Stack spacing={0.5}>
														<Typography sx={{ fontWeight: 700 }}>
															{product.title || product.name}
														</Typography>
														<Typography
															variant="caption"
															sx={{ color: 'text.secondary' }}
														>
															{product.category || ''}
														</Typography>
													</Stack>
												</TableCell>
												<TableCell align="right">
													NT$ {price.toLocaleString()}
												</TableCell>
												<TableCell align="center">
													<TextField
														type="number"
														size="small"
														inputProps={{
															min: 1,
															style: { textAlign: 'center', width: '80px' },
														}}
														value={item.qty || 1}
														onChange={(e) =>
															handleUpdateQty(item, e.target.value)
														}
														disabled={updatingId === item.id}
													/>
												</TableCell>
												<TableCell align="right">
													NT$ {Number(item.total || 0).toLocaleString()}
												</TableCell>
												<TableCell align="center">
													<IconButton
														onClick={() =>
															handleRemoveItem(
																item.id,
																product.title || product.name || '此商品',
															)
														}
														disabled={updatingId === item.id}
														aria-label="刪除"
													>
														<span className="material-symbols-outlined">
															delete
														</span>
													</IconButton>
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</Box>

						<Stack spacing={2} sx={{ alignSelf: 'flex-end', minWidth: 280 }}>
							<Stack spacing={1}>
								<Stack direction="row" justifyContent="space-between">
									<Typography variant="body2" sx={{ color: 'text.secondary' }}>
										小計
									</Typography>
									<Typography variant="body2">
										NT$ {total.toLocaleString()}
									</Typography>
								</Stack>
								<Stack direction="row" justifyContent="space-between">
									<Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
										總金額
									</Typography>
									<Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
										NT$ {finalTotal.toLocaleString()}
									</Typography>
								</Stack>
							</Stack>
							<Button
								variant="contained"
								size="large"
								onClick={() => navigate('/checkout')}
								sx={{
									py: 1.5,
									fontWeight: 800,
								}}
							>
								前往結帳
							</Button>
						</Stack>
					</>
				)}
			</Stack>

			<DeleteModal
				open={deleteModal.open}
				title="確認刪除商品"
				description={`確定要將「${deleteModal.itemName}」從購物車移除嗎？`}
				onClose={() =>
					setDeleteModal({ open: false, itemId: null, itemName: '' })
				}
				onConfirm={confirmRemoveItem}
				loading={Boolean(updatingId)}
			/>

			<Backdrop
				open={Boolean(updatingId) || clearing}
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
