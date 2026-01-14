import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
	Alert,
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Switch,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { CATEGORIES } from '@/const/PRODUCT_CATEGEORIES';
import { uploadAdminImageAPI } from '@/api/imgUpload';
/**
 * 產品編輯Modal組件
 * @param {boolean} show - 是否顯示Modal
 * @param {Object} product - 產品數據
 * @param {Function} onClose - 關閉Modal的回調
 * @param {Function} onSave - 保存的回調，接收更新後的產品數據
 */
export default function ProductEditModal({ show, product, onClose, onSave }) {
	const initialFormData = useMemo(
		() => ({
			title: '',
			description: '',
			content: '',
			category: '',
			price: 0,
			origin_price: 0,
			unit: '',
			is_enabled: 1,
			imageUrl: '',
			imagesUrl: [],
		}),
		[]
	);

	const [formData, setFormData] = useState(initialFormData);
	const [loading, setLoading] = useState(false);
	const [uploadingImage, setUploadingImage] = useState(false);
	const [error, setError] = useState(null);
	const [localPreviewUrl, setLocalPreviewUrl] = useState('');
	const fileInputRef = useRef(null);

	// 當產品數據變化時，更新表單數據
	useEffect(() => {
		if (product) {
			setFormData({
				title: product.title || '',
				description: product.description || '',
				content: product.content || '',
				category: product.category || '',
				price: product.price || 0,
				origin_price: product.origin_price || 0,
				unit: product.unit || '',
				is_enabled: product.is_enabled !== undefined ? product.is_enabled : 1,
				imageUrl:
					product.imageUrl ||
					product.image ||
					product.imagesUrl?.[0] ||
					product.images?.[0] ||
					'',
				imagesUrl:
					product.imagesUrl || (product.imageUrl ? [product.imageUrl] : []),
			});
		} else {
			setFormData(initialFormData);
		}
		setError(null);
		setLocalPreviewUrl('');
	}, [product, initialFormData]);

	useEffect(() => {
		return () => {
			if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
		};
	}, [localPreviewUrl]);

	const setField = (name, value) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			// 調用父組件的 onSave 回調
			await onSave(formData);
			onClose();
		} catch (err) {
			setError(err.message || '保存失敗，請稍後再試');
		} finally {
			setLoading(false);
		}
	};

	const enabled = formData.is_enabled === 1;
	const previewImage = localPreviewUrl || formData.imageUrl || '';
	const hasUploadedImage = Boolean(formData.imageUrl);

	const handlePickImage = () => {
		if (uploadingImage || loading) return;
		fileInputRef.current?.click();
	};

	const handleRemoveImage = (e) => {
		e?.preventDefault?.();
		e?.stopPropagation?.();
		if (uploadingImage || loading) return;
		if (!previewImage && !hasUploadedImage) return;
		const ok = window.confirm('確定要移除這張照片嗎？');
		if (!ok) return;
		if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
		setLocalPreviewUrl('');
		setField('imageUrl', '');
		setField('imagesUrl', []);
	};

	const handleFileChange = async (e) => {
		const file = e.target.files?.[0];
		// 允許再次選到同一張
		e.target.value = '';
		if (!file) return;

		// 基本檢查
		const isImage = file.type.startsWith('image/');
		if (!isImage) {
			setError('請選擇圖片檔（JPG / PNG）');
			return;
		}
		const maxSizeBytes = 2 * 1024 * 1024;
		if (file.size > maxSizeBytes) {
			setError('圖片檔案不可超過 2MB');
			return;
		}

		// 本地預覽
		if (localPreviewUrl) URL.revokeObjectURL(localPreviewUrl);
		const objectUrl = URL.createObjectURL(file);
		setLocalPreviewUrl(objectUrl);

		try {
			setUploadingImage(true);
			setError(null);
			const result = await uploadAdminImageAPI(file);
			if (!result?.success || !result?.imageUrl) {
				throw new Error('圖片上傳失敗，請稍後再試');
			}
			setField('imageUrl', result.imageUrl);
			setField('imagesUrl', [result.imageUrl]);
		} catch (err) {
			const msg =
				err?.response?.data?.message ||
				err?.message ||
				'圖片上傳失敗，請稍後再試';
			setError(typeof msg === 'string' ? msg : '圖片上傳失敗，請稍後再試');
		} finally {
			setUploadingImage(false);
		}
	};

	const inputSx = (theme) => ({
		'& .MuiOutlinedInput-root': {
			borderRadius: 3,
			bgcolor: '#fff',
			transition: theme.transitions.create(['border-color', 'box-shadow'], {
				duration: theme.transitions.duration.shortest,
			}),
			'& fieldset': { borderColor: alpha(theme.palette.text.primary, 0.12) },
			'&:hover fieldset': {
				borderColor: alpha(theme.palette.primary.main, 0.28),
			},
			'&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
			'&.Mui-focused': {
				boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.18)}`,
			},
		},
		'& .MuiInputLabel-root.Mui-focused': { color: theme.palette.primary.main },
	});

	return (
		<Dialog
			open={Boolean(show)}
			onClose={() => {
				if (!loading) onClose();
			}}
			fullWidth
			maxWidth="md"
			scroll="paper"
			PaperProps={{
				sx: (theme) => ({
					borderRadius: 6, // rounded-3xl 느낌
					overflow: 'hidden',
					boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
					border: `1px solid ${alpha(theme.palette.primary.main, 0.20)}`,
				}),
			}}
		>
			<DialogTitle
				sx={(theme) => ({
					px: { xs: 3, md: 4 },
					py: 3,
					bgcolor: 'transparent',
					borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 2,
				})}
			>
				<Box
					sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}
				>
					<Box
						component="span"
						className="material-symbols-outlined"
						aria-hidden="true"
						sx={{ fontSize: 22, color: 'primary.main' }}
					>
						edit_note
					</Box>
					<Typography
						variant="h6"
						sx={{
							fontWeight: 900,
							color: 'text.primary',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						編輯商品資訊
					</Typography>
				</Box>

				<Box
					sx={(theme) => ({
						display: 'flex',
						alignItems: 'center',
						gap: 1.25,
						px: 2,
						py: 1,
						borderRadius: 999,
						bgcolor: alpha(theme.palette.text.primary, 0.03),
						border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
						flexShrink: 0,
					})}
				>
					<Typography
						variant="body2"
						sx={{ fontWeight: 700, color: 'text.secondary' }}
					>
						上架狀態
					</Typography>
					<Switch
						checked={enabled}
						onChange={(e) => setField('is_enabled', e.target.checked ? 1 : 0)}
						color="primary"
						disabled={loading || uploadingImage}
						sx={(theme) => ({
							'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
								backgroundColor: theme.palette.primary.main,
							},
						})}
					/>
					<Typography
						variant="body2"
						sx={{
							fontWeight: 900,
							color: enabled ? 'primary.main' : 'text.secondary',
							minWidth: 56,
							textAlign: 'right',
						}}
					>
						{enabled ? '上架中' : '已下架'}
					</Typography>
				</Box>
			</DialogTitle>

			<Box component="form" onSubmit={handleSubmit}>
				<DialogContent
					sx={{
						bgcolor: 'transparent',
						px: { xs: 3, md: 4 },
						py: { xs: 3, md: 4 },
					}}
				>
					<Stack spacing={2.5}>
						{error ? <Alert severity="error">{error}</Alert> : null}

						<Stack
							direction={{ xs: 'column', md: 'row' }}
							spacing={{ xs: 3, md: 5 }}
						>
							{/* 左側：照片區（僅樣式，無上傳功能） */}
							<Box sx={{ width: { xs: '100%', md: '33%' } }}>
								<Stack spacing={1.5}>
									<Typography
										variant="body2"
										sx={{ fontWeight: 700, color: 'text.secondary' }}
									>
										商品照片
									</Typography>
									<Box
										role="button"
										tabIndex={0}
										onClick={handlePickImage}
										onKeyDown={(ev) => {
											if (ev.key === 'Enter' || ev.key === ' ')
												handlePickImage();
										}}
										sx={(theme) => ({
											position: 'relative',
											width: '100%',
											aspectRatio: '1 / 1',
											bgcolor: alpha(theme.palette.text.primary, 0.03),
											border: `2px dashed ${alpha(
												theme.palette.text.primary,
												0.14
											)}`,
											borderRadius: 6,
											overflow: 'hidden',
											cursor: 'pointer',
											transition: theme.transitions.create(
												['border-color', 'transform'],
												{
													duration: theme.transitions.duration.shortest,
												}
											),
											'&:hover': {
												borderColor: theme.palette.primary.main,
											},
											'&:hover .photo-overlay': {
												backgroundColor: previewImage
													? 'rgba(0,0,0,0.40)'
													: 'rgba(0,0,0,0.18)',
											},
											'&:hover .photo-image': { transform: 'scale(1.05)' },
											'&:focus-visible': {
												outline: 'none',
												boxShadow: `0 0 0 3px ${alpha(
													theme.palette.primary.main,
													0.18
												)}`,
											},
										})}
									>
										{uploadingImage ? (
											<Chip
												size="small"
												label="上傳中"
												sx={(theme) => ({
													position: 'absolute',
													top: 12,
													left: 12,
													zIndex: 3,
													fontWeight: 900,
													color: theme.palette.primary.main,
													bgcolor: alpha(theme.palette.primary.main, 0.14),
													border: `1px solid ${alpha(
														theme.palette.primary.main,
														0.3
													)}`,
												})}
											/>
										) : hasUploadedImage ? (
											<Chip
												size="small"
												label="已上傳"
												sx={(theme) => ({
													position: 'absolute',
													top: 12,
													left: 12,
													zIndex: 3,
													fontWeight: 900,
													color: theme.palette.primary.main,
													bgcolor: alpha(theme.palette.primary.main, 0.14),
													border: `1px solid ${alpha(
														theme.palette.primary.main,
														0.3
													)}`,
												})}
											/>
										) : null}

										{previewImage ? (
											<Tooltip title="移除照片">
												<IconButton
													size="small"
													onClick={handleRemoveImage}
													disabled={loading || uploadingImage}
													aria-label="移除照片"
													sx={(theme) => ({
														position: 'absolute',
														top: 10,
														right: 10,
														zIndex: 3,
														color: '#fff',
														bgcolor: 'rgba(0,0,0,0.35)',
														border: `1px solid ${alpha(
															theme.palette.common.white,
															0.25
														)}`,
														'&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
													})}
												>
													<span
														className="material-symbols-outlined"
														style={{ fontSize: 18 }}
													>
														close
													</span>
												</IconButton>
											</Tooltip>
										) : null}

										{previewImage ? (
											<Box
												component="img"
												className="photo-image"
												src={previewImage}
												alt="商品圖片預覽"
												sx={{
													position: 'absolute',
													inset: 0,
													width: '100%',
													height: '100%',
													objectFit: 'cover',
													opacity: 0.92,
													transition: 'transform 300ms ease',
												}}
												onError={(e) => {
													e.currentTarget.src = '/error-img.svg';
												}}
											/>
										) : null}

										<Box
											className="photo-overlay"
											sx={{
												position: 'absolute',
												inset: 0,
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
												justifyContent: 'center',
												gap: 1,
												color: '#fff',
												backgroundColor: previewImage
													? 'rgba(0,0,0,0.25)'
													: 'rgba(0,0,0,0.10)',
												transition: 'background-color 200ms ease',
												pointerEvents: 'none',
											}}
										>
											<span
												className="material-symbols-outlined"
												style={{ fontSize: 38 }}
											>
												add_a_photo
											</span>
											<Typography variant="body2" sx={{ fontWeight: 800 }}>
												{uploadingImage ? '上傳中...' : '更換照片'}
											</Typography>
										</Box>
									</Box>

									<input
										ref={fileInputRef}
										type="file"
										accept="image/*"
										style={{ display: 'none' }}
										onChange={handleFileChange}
										disabled={loading || uploadingImage}
									/>

									<Typography
										variant="caption"
										sx={{ color: 'text.disabled', lineHeight: 1.6 }}
									>
										建議尺寸 800 x 800 px，檔案大小不超過 2MB。格式支援 JPG,
										PNG。
									</Typography>
								</Stack>
							</Box>

							{/* 右側：表單 */}
							<Box sx={{ flex: 1, minWidth: 0 }}>
								<Stack spacing={2.5}>
									<Grid container spacing={2}>
										<Grid item xs={12} md={6}>
											<TextField
												label="商品名稱"
												value={formData.title}
												onChange={(e) => setField('title', e.target.value)}
												required
												fullWidth
												placeholder="輸入商品名稱"
												sx={inputSx}
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<FormControl fullWidth required sx={inputSx}>
												<InputLabel id="product-category-label">
													分類
												</InputLabel>
												<Select
													labelId="product-category-label"
													label="分類"
													value={formData.category}
													onChange={(e) => setField('category', e.target.value)}
												>
													<MenuItem value="">
														<em>請選擇分類</em>
													</MenuItem>
													{CATEGORIES.map((cat) => (
														<MenuItem key={cat.id} value={cat.id}>
															{cat.name}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
									</Grid>

									<TextField
										label="商品簡述"
										value={formData.description}
										onChange={(e) => setField('description', e.target.value)}
										fullWidth
										placeholder="描述商品特色與口感..."
										multiline
										minRows={3}
										sx={inputSx}
									/>

									<Grid container spacing={2}>
										<Grid item xs={12} md={4}>
											<TextField
												label="銷售價格"
												value={formData.price}
												onChange={(e) =>
													setField('price', parseFloat(e.target.value) || 0)
												}
												required
												fullWidth
												type="number"
												inputProps={{ min: 0, step: 1 }}
												sx={(theme) => ({
													...inputSx(theme),
													'& input': { fontWeight: 900 },
												})}
												InputProps={{
													startAdornment: (
														<InputAdornment
															position="start"
															sx={{ color: 'text.disabled', fontWeight: 700 }}
														>
															NT$
														</InputAdornment>
													),
												}}
											/>
										</Grid>
										<Grid item xs={12} md={4}>
											<TextField
												label="原價"
												value={formData.origin_price}
												onChange={(e) =>
													setField(
														'origin_price',
														parseFloat(e.target.value) || 0
													)
												}
												fullWidth
												type="number"
												inputProps={{ min: 0, step: 1 }}
												sx={(theme) => ({
													'& .MuiOutlinedInput-root': {
														borderRadius: 3,
														bgcolor: alpha(theme.palette.text.primary, 0.03),
														'& fieldset': {
															borderColor: alpha(
																theme.palette.text.primary,
																0.1
															),
														},
														'&:hover fieldset': {
															borderColor: alpha(
																theme.palette.primary.main,
																0.22
															),
														},
														'&.Mui-focused fieldset': {
															borderColor: theme.palette.primary.main,
														},
													},
													'& .MuiInputLabel-root.Mui-focused': {
														color: theme.palette.primary.main,
													},
													'& input': { color: theme.palette.text.secondary },
												})}
												InputProps={{
													startAdornment: (
														<InputAdornment
															position="start"
															sx={{ color: 'text.disabled', fontWeight: 700 }}
														>
															NT$
														</InputAdornment>
													),
												}}
											/>
										</Grid>
										<Grid item xs={12} md={4}>
											<TextField
												label="單位"
												value={formData.unit}
												onChange={(e) => setField('unit', e.target.value)}
												placeholder="如：份、碗"
												fullWidth
												sx={inputSx}
											/>
										</Grid>
									</Grid>

									<TextField
										label="內容"
										value={formData.content}
										onChange={(e) => setField('content', e.target.value)}
										fullWidth
										multiline
										minRows={3}
										sx={inputSx}
									/>
								</Stack>
							</Box>
						</Stack>
					</Stack>
				</DialogContent>

				<DialogActions
					sx={(theme) => ({
						bgcolor: alpha(theme.palette.text.primary, 0.03),
						borderTop: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
						px: { xs: 3, md: 4 },
						py: 3,
						display: 'flex',
						justifyContent: 'flex-end',
						gap: 1.5,
					})}
				>
					<Button
						onClick={onClose}
						disabled={loading}
						variant="text"
						sx={{ color: 'text.secondary', fontWeight: 800 }}
					>
						取消編輯
					</Button>
					<Button
						type="submit"
						variant="contained"
						disabled={loading || uploadingImage}
						sx={(theme) => ({
							fontWeight: 900,
							borderRadius: 3,
							px: 3,
							py: 1.25,
							background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
							boxShadow: `0 10px 24px ${alpha(
								theme.palette.primary.main,
								0.22
							)}`,
							'&:hover': { filter: 'brightness(1.05)' },
							'&:active': { transform: 'scale(0.98)' },
						})}
					>
						{uploadingImage
							? '圖片上傳中...'
							: loading
							? '儲存中...'
							: '儲存變更'}
					</Button>
				</DialogActions>
			</Box>
		</Dialog>
	);
}

ProductEditModal.propTypes = {
	show: PropTypes.bool,
	product: PropTypes.object,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
};
