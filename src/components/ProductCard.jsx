import {
	Box,
	Card,
	CardContent,
	Chip,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';

export default function ProductCard({ product, onView, onEdit, onDelete }) {
	const imageSrc =
		product.imageUrl ||
		product.image ||
		product.imagesUrl?.[0] ||
		product.images?.[0] ||
		'/error-img.svg';

	const title = product.title || product.name || '';
	const description = product.description || '';
	const price = Number(product.price || 0);
	const enabled = product.is_enabled === 1 || product.is_enabled === true;

	return (
		<div className="col-12 col-sm-6 col-lg-4">
			<Card
				className="product-card-new"
				sx={(theme) => ({
					height: '100%',
					borderRadius: theme.shape.borderRadius,
					backgroundColor: theme.palette.background.paper,
					border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
					boxShadow: theme.shadows[1],
					transition:
						'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
					'&:hover': {
						transform: 'translateY(-4px)',
						boxShadow: theme.shadows[6],
						borderColor: alpha(theme.palette.primary.main, 0.22),
					},
				})}
			>
				<Box
					sx={(theme) => ({
						position: 'relative',
						aspectRatio: '4 / 3',
						overflow: 'hidden',
						backgroundColor: theme.palette.action.hover,
						borderTopLeftRadius: theme.shape.borderRadius,
						borderTopRightRadius: theme.shape.borderRadius,
					})}
				>
					<Box
						component="img"
						className="product-card-image"
						src={imageSrc}
						alt={title}
						sx={{
							width: '100%',
							height: '100%',
							display: 'block',
							objectFit: 'cover',
							transition: 'transform 0.5s ease',
							transformOrigin: 'center',
							'.product-card-new:hover &': { transform: 'scale(1.06)' },
						}}
						onError={(e) => {
							e.currentTarget.src = '/error-img.svg';
						}}
					/>
				</Box>

				<CardContent sx={{ p: 2.5, width: '100%' }}>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						spacing={1}
						sx={{ mb: 1 }}
					>
						<Typography
							variant="subtitle1"
							sx={{
								fontWeight: 700,
								color: 'text.primary',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								minWidth: 0,
							}}
							title={title}
						>
							{title}
						</Typography>

						<Chip
							size="small"
							label={enabled ? '上架中' : '已下架'}
							variant="outlined"
							sx={(theme) => ({
								fontWeight: 900,
								flexShrink: 0,
								borderColor: enabled
									? alpha(theme.palette.primary.main, 0.35)
									: alpha(theme.palette.text.primary, 0.2),
								color: enabled
									? theme.palette.primary.main
									: theme.palette.text.secondary,
								bgcolor: enabled
									? alpha(theme.palette.primary.main, 0.08)
									: 'transparent',
							})}
						/>
					</Stack>

					{description ? (
						<Typography
							variant="body2"
							sx={{
								color: 'text.secondary',
								display: '-webkit-box',
								WebkitLineClamp: 2,
								WebkitBoxOrient: 'vertical',
								overflow: 'hidden',
								mb: 2,
							}}
						>
							{description}
						</Typography>
					) : null}

					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						spacing={1}
					>
						<Typography
							variant="h6"
							sx={{ fontWeight: 800, color: 'text.primary' }}
						>
							NT$ {price.toLocaleString()}
						</Typography>

						<Stack direction="row" spacing={0.5} alignItems="center">
							<Tooltip title="查看">
								<IconButton
									size="small"
									sx={(theme) => ({
										color: theme.palette.primary.main,
										'&:hover': { color: theme.palette.primary.dark },
									})}
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										onView?.(product);
									}}
									aria-label="查看"
								>
									<span
										className="material-symbols-outlined"
										style={{ fontSize: '18px' }}
									>
										visibility
									</span>
								</IconButton>
							</Tooltip>

							{onEdit ? (
								<Tooltip title="編輯">
									<IconButton
										size="small"
										sx={(theme) => ({
											color: theme.palette.primary.main,
											'&:hover': { color: theme.palette.primary.dark },
										})}
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											onEdit(product);
										}}
										aria-label="編輯"
									>
										<span
											className="material-symbols-outlined"
											style={{ fontSize: '18px' }}
										>
											edit
										</span>
									</IconButton>
								</Tooltip>
							) : null}

							{onDelete ? (
								<Tooltip title="刪除">
									<IconButton
										size="small"
										sx={(theme) => ({
											color: theme.palette.primary.main,
											'&:hover': { color: theme.palette.primary.dark },
										})}
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											onDelete(product);
										}}
										aria-label="刪除"
									>
										<span
											className="material-symbols-outlined"
											style={{ fontSize: '18px' }}
										>
											delete
										</span>
									</IconButton>
								</Tooltip>
							) : null}
						</Stack>
					</Stack>
				</CardContent>
			</Card>
		</div>
	);
}

ProductCard.propTypes = {
	product: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.string,
		name: PropTypes.string,
		description: PropTypes.string,
		category: PropTypes.string,
		price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		is_enabled: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
		imageUrl: PropTypes.string,
		image: PropTypes.string,
		imagesUrl: PropTypes.arrayOf(PropTypes.string),
		images: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
	onView: PropTypes.func,
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
};
