import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { CATEGORIES } from '@/const/PRODUCT_CATEGEORIES';
import {
	Box,
	Button,
	Chip,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Stack,
	Typography,
} from '@mui/material';

export default function ProductDetailModal({ open, product, onClose }) {
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	useEffect(() => {
		if (open) setSelectedImageIndex(0);
	}, [open, product?.id]);

	const productName = product?.title || product?.name || '未命名商品';
	const description = product?.description || '暫無描述';
	const price = Number(product?.price || 0);
	const enabled = product?.is_enabled === 1 || product?.is_enabled === true;
	const categoryName =
		CATEGORIES.find((cat) => cat.id === product?.category)?.name || '未分類';

	const productImages = useMemo(() => {
		const imgs =
			product?.imagesUrl || (product?.imageUrl ? [product.imageUrl] : []) || [];
		return Array.isArray(imgs) ? imgs.filter(Boolean) : [];
	}, [product?.imagesUrl, product?.imageUrl]);

	const mainImage =
		productImages[selectedImageIndex] || productImages[0] || '/error-img.svg';

	return (
		<Dialog
			open={Boolean(open)}
			onClose={onClose}
			fullWidth
			maxWidth="lg"
			scroll="paper"
			PaperProps={{ sx: { overflow: 'hidden' } }}
		>
			<DialogTitle
				sx={(theme) => ({
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 2,
					px: { xs: 2.5, md: 3 },
					py: 2,
					borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
					bgcolor: 'transparent',
				})}
			>
				<Stack spacing={0.25} sx={{ minWidth: 0 }}>
					<Typography variant="subtitle1" sx={{ fontWeight: 900 }} noWrap>
						{productName}
					</Typography>
					<Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
						商品詳情 #{product?.id ?? '-'}
					</Typography>
				</Stack>

				<IconButton onClick={onClose} aria-label="關閉">
					<span className="material-symbols-outlined">close</span>
				</IconButton>
			</DialogTitle>

			<DialogContent sx={{ p: { xs: 2.5, md: 3 } }}>
				{!product ? (
					<Box
						sx={(theme) => ({
							p: 5,
							textAlign: 'center',
							borderRadius: theme.shape.borderRadius,
							bgcolor: 'rgba(255, 255, 255, 0.85)',
							backdropFilter: 'blur(10px)',
							border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
							boxShadow: 'none',
						})}
					>
						<Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
							沒有可顯示的商品資料
						</Typography>
						<Button variant="outlined" onClick={onClose}>
							關閉
						</Button>
					</Box>
				) : (
					<Box
						sx={(theme) => ({
							p: { xs: 2.5, md: 4 },
						})}
					>
						<Stack direction={{ xs: 'column', lg: 'row' }} spacing={4}>
							<Box sx={{ width: { xs: '100%', lg: '42%' } }}>
								<Stack spacing={2}>
									<Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
										商品圖片
									</Typography>

									<Box
										sx={(theme) => ({
											position: 'relative',
											borderRadius: theme.shape.borderRadius,
											overflow: 'hidden',
											border: `1px solid ${alpha(
												theme.palette.text.primary,
												0.1
											)}`,
											bgcolor: theme.palette.secondary.main,
											aspectRatio: '4 / 3',
										})}
									>
										<Box
											component="img"
											src={mainImage}
											alt={productName}
											sx={{
												width: '100%',
												height: '100%',
												objectFit: 'cover',
												display: 'block',
											}}
											onError={(e) => {
												e.currentTarget.src = '/error-img.svg';
											}}
										/>
									</Box>

									{productImages.length > 1 ? (
										<Stack
											direction="row"
											spacing={1}
											sx={{ flexWrap: 'wrap' }}
										>
											{productImages.slice(0, 4).map((img, idx) => {
												const selected = selectedImageIndex === idx;
												return (
													<Box
														key={img || idx}
														role="button"
														tabIndex={0}
														onClick={() => setSelectedImageIndex(idx)}
														onKeyDown={(e) => {
															if (e.key === 'Enter' || e.key === ' ')
																setSelectedImageIndex(idx);
														}}
														sx={(theme) => ({
															width: 72,
															height: 72,
															borderRadius: theme.shape.borderRadius,
															overflow: 'hidden',
															bgcolor: theme.palette.secondary.main,
															border: selected
																? `2px solid ${theme.palette.primary.main}`
																: `1px solid ${alpha(
																		theme.palette.text.primary,
																		0.1
																  )}`,
															cursor: 'pointer',
															outline: 'none',
															'&:focus-visible': {
																boxShadow: `0 0 0 3px ${alpha(
																	theme.palette.primary.main,
																	0.25
																)}`,
															},
														})}
													>
														<Box
															component="img"
															src={img}
															alt={`${productName} ${idx + 1}`}
															sx={{
																width: '100%',
																height: '100%',
																objectFit: 'cover',
																display: 'block',
															}}
															onError={(e) => {
																e.currentTarget.src = '/error-img.svg';
															}}
														/>
													</Box>
												);
											})}
										</Stack>
									) : null}
								</Stack>
							</Box>

							<Box sx={{ flex: 1, minWidth: 0 }}>
								<Stack spacing={3} sx={{ height: '100%' }}>
									<Stack
										direction="row"
										spacing={1}
										alignItems="center"
										sx={{ flexWrap: 'wrap' }}
									>
										<Chip
											label={enabled ? '上架中' : '已下架'}
											sx={(theme) => ({
												fontWeight: 900,
												border: '1px solid',
												bgcolor: enabled
													? alpha(theme.palette.primary.main, 0.1)
													: alpha(theme.palette.text.primary, 0.06),
												color: enabled
													? theme.palette.primary.main
													: theme.palette.text.secondary,
												borderColor: enabled
													? alpha(theme.palette.primary.main, 0.35)
													: alpha(theme.palette.text.primary, 0.18),
											})}
										/>
										<Chip
											label={categoryName}
											variant="outlined"
											sx={{
												fontWeight: 700,
												bgcolor: alpha('#fff', 0.55),
												color: 'text.primary',
												borderColor: alpha('#000', 0.1),
											}}
										/>
									</Stack>

									<Divider />

									<Box>
										<Typography
											variant="caption"
											sx={(theme) => ({
												color: theme.palette.secondary.main,
												fontWeight: 900,
											})}
										>
											商品名稱
										</Typography>
										<Typography
											variant="h4"
											sx={{ fontWeight: 900, color: 'text.primary' }}
										>
											{productName}
										</Typography>
									</Box>

									<Box>
										<Typography
											variant="caption"
											sx={(theme) => ({
												color: theme.palette.secondary.main,
												fontWeight: 900,
											})}
										>
											商品描述
										</Typography>
										<Typography
											variant="body2"
											sx={(theme) => ({
												color: theme.palette.secondary.main,
												lineHeight: 1.7,
												mt: 0.5,
											})}
										>
											{description}
										</Typography>
									</Box>

									<Box
										sx={(theme) => ({
											p: 3,
											borderRadius: theme.shape.borderRadius,
											bgcolor: theme.palette.background.default,
											border: `1px solid ${alpha(
												theme.palette.text.primary,
												0.1
											)}`,
											borderColor: alpha(theme.palette.text.primary, 0.1),
											boxShadow: 'none',
										})}
									>
										<Stack
											direction="row"
											justifyContent="space-between"
											alignItems="baseline"
											spacing={2}
										>
											<Typography
												variant="body2"
												sx={(theme) => ({
													color: theme.palette.secondary.main,
												})}
											>
												銷售價格
											</Typography>
											<Typography
												variant="h5"
												sx={(theme) => ({
													fontWeight: 900,
													color: theme.palette.primary.main,
												})}
											>
												NT$ {price.toLocaleString()}
											</Typography>
										</Stack>
										{product?.origin_price ? (
											<Stack
												direction="row"
												justifyContent="space-between"
												alignItems="baseline"
												sx={{ mt: 1 }}
											>
												<Typography
													variant="body2"
													sx={(theme) => ({
														color: theme.palette.secondary.main,
													})}
												>
													原價
												</Typography>
												<Typography
													variant="body2"
													sx={{ textDecoration: 'line-through' }}
												>
													NT${' '}
													{Number(product.origin_price || 0).toLocaleString()}
												</Typography>
											</Stack>
										) : null}
									</Box>
								</Stack>
							</Box>
						</Stack>
					</Box>
				)}
			</DialogContent>
		</Dialog>
	);
}

ProductDetailModal.propTypes = {
	open: PropTypes.bool,
	product: PropTypes.object,
	onClose: PropTypes.func.isRequired,
};
