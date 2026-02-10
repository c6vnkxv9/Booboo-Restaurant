import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
	Alert,
	Box,
	Button,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Typography,
	Divider,
} from '@mui/material';
import { Oval } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import FrontLayout from '@/components/front/FrontLayout';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getCartAPI } from '@/api/cart';
import { createOrderAPI } from '@/api/order';

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

export default function Checkout() {
	const navigate = useNavigate();
	const [cartItems, setCartItems] = useState([]);
	const [total, setTotal] = useState(0);
	const [finalTotal, setFinalTotal] = useState(0);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
			tel: '',
			address: '',
			message: '',
		},
	});

	const fetchCart = async () => {
		try {
			setLoading(true);
			const response = await getCartAPI();
			const cart = normalizeCart(response);
			setCartItems(cart.carts);
			setTotal(cart.total);
			setFinalTotal(cart.finalTotal);

			// 如果購物車是空的，導回購物車頁面
			if (cart.carts.length === 0) {
				Swal.fire({
					icon: 'warning',
					title: '購物車是空的',
					text: '請先加入商品到購物車',
					confirmButtonText: '前往購物',
				}).then(() => {
					navigate('/products');
				});
			}
		} catch (err) {
			Swal.fire({
				icon: 'error',
				title: '載入失敗',
				text: '無法取得購物車資料，請稍後再試',
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCart();
	}, []);

	const onSubmit = async (data) => {
		// 再次檢查購物車是否為空
		if (cartItems.length === 0) {
			Swal.fire({
				icon: 'warning',
				title: '購物車是空的',
				text: '無法建立訂單',
			});
			return;
		}

		try {
			setSubmitting(true);

			const orderData = {
				user: {
					name: data.name,
					email: data.email,
					tel: data.tel,
					address: data.address,
				},
				message: data.message || '',
			};

			const response = await createOrderAPI(orderData);

			// 訂單建立成功
			Swal.fire({
				icon: 'success',
				title: '訂單建立成功！',
				text: `訂單編號：${response.orderId || ''}`,
				confirmButtonText: '確定',
			}).then(() => {
				// 導向訂單完成頁面或產品列表
				navigate('/products');
			});
		} catch (err) {
			Swal.fire({
				icon: 'error',
				title: '訂單建立失敗',
				text: err.response?.data?.message || '請稍後再試',
				confirmButtonText: '確定',
			});
		} finally {
			setSubmitting(false);
		}
	};

	if (loading) {
		return (
			<FrontLayout>
				<LoadingSpinner fullScreen />
			</FrontLayout>
		);
	}

	return (
		<FrontLayout>
			<Stack spacing={4}>
				<Typography variant="h4" sx={{ fontWeight: 900 }}>
					結帳
				</Typography>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', lg: '1fr 400px' },
						gap: 4,
					}}
				>
					{/* 左側：結帳表單 */}
					<Paper sx={{ p: 4 }}>
						<Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
							填寫資料
						</Typography>

						<Box component="form" onSubmit={handleSubmit(onSubmit)}>
							<Stack spacing={3}>
								<TextField
									{...register('name', {
										required: '請輸入姓名',
									})}
									label="姓名"
									placeholder="請輸入您的姓名"
									fullWidth
									error={!!errors.name}
									helperText={errors.name?.message}
									disabled={submitting}
								/>

								<TextField
									{...register('email', {
										required: '請輸入 Email',
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: '請輸入有效的 Email 格式',
										},
									})}
									type="email"
									label="Email"
									placeholder="example@email.com"
									fullWidth
									error={!!errors.email}
									helperText={errors.email?.message}
									disabled={submitting}
								/>

								<TextField
									{...register('tel', {
										required: '請輸入電話',
										minLength: {
											value: 8,
											message: '電話號碼至少需要 8 碼',
										},
										pattern: {
											value: /^[0-9-]+$/,
											message: '請輸入有效的電話號碼',
										},
									})}
									type="tel"
									label="電話"
									placeholder="0912-345-678"
									fullWidth
									error={!!errors.tel}
									helperText={errors.tel?.message}
									disabled={submitting}
								/>

								<TextField
									{...register('address', {
										required: '請輸入地址',
									})}
									label="地址"
									placeholder="請輸入您的地址"
									fullWidth
									error={!!errors.address}
									helperText={errors.address?.message}
									disabled={submitting}
								/>

								<TextField
									{...register('message')}
									label="留言"
									placeholder="有什麼想告訴我們的嗎？（選填）"
									fullWidth
									multiline
									rows={3}
									disabled={submitting}
								/>

								<Button
									type="submit"
									variant="contained"
									size="large"
									disabled={submitting || cartItems.length === 0}
									sx={{
										py: 1.5,
										fontWeight: 800,
										position: 'relative',
									}}
								>
									{submitting ? (
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: 1,
											}}
										>
											<Oval
												height={20}
												width={20}
												color="#fff"
												secondaryColor="#fff"
												strokeWidth={4}
												strokeWidthSecondary={4}
											/>
											<span>處理中...</span>
										</Box>
									) : (
										'確認送出訂單'
									)}
								</Button>
							</Stack>
						</Box>
					</Paper>

					{/* 右側：訂單摘要 */}
					<Box>
						<Paper sx={{ p: 3, position: 'sticky', top: 100 }}>
							<Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
								訂單摘要
							</Typography>

							{cartItems.length === 0 ? (
								<Alert severity="info">購物車目前沒有商品</Alert>
							) : (
								<>
									<Stack spacing={2} sx={{ mb: 3 }}>
										{cartItems.map((item) => {
											const product = item.product || {};
											return (
												<Box
													key={item.id}
													sx={{
														display: 'flex',
														justifyContent: 'space-between',
														alignItems: 'center',
													}}
												>
													<Box sx={{ flex: 1 }}>
														<Typography
															variant="body2"
															sx={{ fontWeight: 600 }}
														>
															{product.title || product.name}
														</Typography>
														<Typography
															variant="caption"
															sx={{ color: 'text.secondary' }}
														>
															x {item.qty}
														</Typography>
													</Box>
													<Typography variant="body2" sx={{ fontWeight: 600 }}>
														NT$ {Number(item.total || 0).toLocaleString()}
													</Typography>
												</Box>
											);
										})}
									</Stack>

									<Divider sx={{ my: 2 }} />

									<Stack spacing={1}>
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'space-between',
											}}
										>
											<Typography variant="body2" color="text.secondary">
												小計
											</Typography>
											<Typography variant="body2">
												NT$ {total.toLocaleString()}
											</Typography>
										</Box>
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'space-between',
											}}
										>
											<Typography variant="h6" sx={{ fontWeight: 800 }}>
												總金額
											</Typography>
											<Typography
												variant="h6"
												sx={{ fontWeight: 800, color: 'primary.main' }}
											>
												NT$ {finalTotal.toLocaleString()}
											</Typography>
										</Box>
									</Stack>
								</>
							)}
						</Paper>
					</Box>
				</Box>
			</Stack>
		</FrontLayout>
	);
}
