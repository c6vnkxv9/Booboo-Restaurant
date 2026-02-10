import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { adminSigninAPI } from '@/api/auth';

import {
	Alert,
	Box,
	Button,
	Container,
	Divider,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

export default function Login() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm({
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit = async (data) => {
		try {
			const response = await adminSigninAPI(data.username, data.password);
			if (response.success && response.token) {
				navigate('/admin/products', { replace: true });
			} else {
				setError('root', {
					message: response.message || '登入失敗',
				});
			}
		} catch (err) {
			const errorMessage =
				err.response?.data?.message || err.message || '登入時發生錯誤';
			setError('root', { message: errorMessage });
		}
	};
	return (
		<Box
			component="main"
			sx={(theme) => ({
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				py: { xs: 6, md: 10 },
				backgroundColor: theme.palette.background.default,
				backgroundImage: `linear-gradient(135deg, ${alpha(
					theme.palette.primary.light,
					0.1,
				)} 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%), url(${
					theme.custom?.login?.backgroundImageUrl || '/japanese-paper.jpg'
				})`,
				backgroundSize: `cover, ${
					theme.custom?.login?.backgroundSize || '200px 200px'
				}`,
				backgroundRepeat: 'no-repeat, repeat',
			})}
		>
			<Container maxWidth="md">
				<Stack spacing={3} alignItems="center">
					<Stack direction="row" spacing={2} alignItems="center">
						<Box
							sx={{
								width: 8,
								height: 40,
								borderRadius: 999,
								bgcolor: 'primary.main',
								boxShadow: '0 0 10px rgba(230,154,141,0.6)',
							}}
						/>
						<Typography
							variant="h4"
							sx={{
								fontWeight: 800,
								color: '#675335',
								letterSpacing: '0.05em',
							}}
						>
							後台系統
						</Typography>
					</Stack>

					<Paper
						elevation={8}
						sx={{
							width: '100%',
							overflow: 'hidden',
							borderRadius: 4,
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
						}}
					>
						{/* 左側資訊 */}
						<Box
							sx={{
								position: 'relative',
								p: { xs: 4, md: 5 },
								textAlign: 'center',
								background: 'linear-gradient(135deg, #FDF5F3 0%, #F4DCD9 100%)',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 2,
							}}
						>
							<Box
								sx={{
									position: 'absolute',
									inset: 0,
									opacity: 0.18,
									backgroundImage:
										'radial-gradient(#000 0.5px, transparent 0.5px)',
									backgroundSize: '10px 10px',
								}}
							/>

							<Box sx={{ position: 'relative', zIndex: 1 }}>
								<Box
									sx={{
										p: 1,
										borderRadius: '999px',
										border: '1px solid rgba(255,255,255,0.55)',
										bgcolor: 'rgba(255,255,255,0.25)',
										boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
									}}
								>
									<Box
										component="img"
										src="/logo.png"
										alt="BooBoo 食堂 Logo"
										sx={{
											width: 130,
											height: 130,
											objectFit: 'contain',
											borderRadius: '999px',
											bgcolor: 'white',
											p: 0.75,
										}}
									/>
								</Box>
							</Box>

							<Box sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
								<Typography
									variant="h5"
									sx={{ fontWeight: 800, color: '#675335' }}
								>
									BooBoo 食堂
								</Typography>
								<Box
									sx={{
										mx: 'auto',
										mt: 1,
										mb: 1,
										height: 4,
										width: '100%',
										borderRadius: 999,
										bgcolor: 'primary.main',
										opacity: 0.45,
									}}
								/>
								<Typography
									variant="body2"
									sx={{ fontWeight: 600, color: 'rgba(103, 83, 53, 0.70)' }}
								>
									主廚跟老鼠才可以進來
								</Typography>
							</Box>
						</Box>

						{/* 右側表單 */}
						<Box sx={{ p: { xs: 4, md: 5 }, bgcolor: 'background.paper' }}>
							<Stack spacing={2} sx={{ mb: 3 }}>
								<Typography variant="h5" sx={{ fontWeight: 800 }}>
									歡迎回來
								</Typography>
								<Stack direction="row" spacing={1} alignItems="center">
									<Box
										sx={{
											width: 6,
											height: 6,
											borderRadius: 999,
											bgcolor: 'primary.main',
										}}
									/>
									<Typography variant="body2" color="text.secondary">
										請輸入您的帳號密碼以登入系統
									</Typography>
								</Stack>
							</Stack>

							<Box component="form" onSubmit={handleSubmit(onSubmit)}>
								<Stack spacing={2.5}>
									<TextField
										{...register('username', {
											required: '請輸入電子郵件',
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
												message: '請輸入有效的電子郵件格式',
											},
										})}
										id="username"
										type="email"
										label="電子郵件"
										placeholder="請輸入電子郵件"
										fullWidth
										variant="filled"
										error={!!errors.username}
										helperText={errors.username?.message}
										InputProps={{
											disableUnderline: true,
											startAdornment: (
												<InputAdornment position="start">
													<Box
														component="span"
														className="material-symbols-outlined"
														sx={{ opacity: 0.55 }}
													>
														email
													</Box>
												</InputAdornment>
											),
										}}
										sx={{
											'& .MuiFilledInput-root': {
												borderRadius: 2,
												bgcolor: 'rgba(0,0,0,0.04)',
											},
										}}
									/>

									<TextField
										{...register('password', {
											required: '請輸入密碼',
											minLength: {
												value: 6,
												message: '密碼至少需要 6 個字元',
											},
										})}
										id="password"
										label="密碼"
										placeholder="請輸入密碼"
										type="password"
										fullWidth
										variant="filled"
										error={!!errors.password}
										helperText={errors.password?.message}
										InputProps={{
											disableUnderline: true,
											startAdornment: (
												<InputAdornment position="start">
													<Box
														component="span"
														className="material-symbols-outlined"
														sx={{ opacity: 0.55 }}
													>
														lock
													</Box>
												</InputAdornment>
											),
										}}
										sx={{
											'& .MuiFilledInput-root': {
												borderRadius: 2,
												bgcolor: 'rgba(0,0,0,0.04)',
											},
										}}
									/>

									{errors.root ? (
										<Alert
											severity="error"
											icon={
												<span className="material-symbols-outlined">info</span>
											}
										>
											{errors.root.message}
										</Alert>
									) : null}

									<Button
										type="submit"
										variant="contained"
										size="large"
										disabled={isSubmitting}
										sx={{
											py: 1.5,
											borderRadius: 2,
											fontWeight: 800,
											boxShadow: '0 8px 18px rgba(0,0,0,0.10)',
											background:
												'linear-gradient(to right, theme.palette.primary.main, theme.palette.primary.dark, #d88a7d))',
											'&:hover': {
												background:
													'linear-gradient(to right, theme.palette.primary.main, theme.palette.primary.dark, #c85a4a))',
											},
										}}
										endIcon={
											<span className="material-symbols-outlined">
												arrow_forward
											</span>
										}
									>
										{isSubmitting ? '登入中...' : '登入'}
									</Button>

									<Divider sx={{ pt: 0.5 }} />
									<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
										<Typography
											variant="caption"
											sx={{ fontFamily: 'monospace', opacity: 0.7 }}
											color="text.secondary"
										>
											v1.0 System
										</Typography>
									</Box>
								</Stack>
							</Box>
						</Box>
					</Paper>

					<Typography variant="body2" color="text.secondary">
						© 2026 BooBoo Canteen. All rights reserved.
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
}
