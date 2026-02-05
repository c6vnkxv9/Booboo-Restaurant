import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Stack,
	Typography,
} from '@mui/material';

export default function FrontProductCard({ product, onAddToCart, adding }) {
	const imageSrc =
		product.imageUrl ||
		product.image ||
		product.imagesUrl?.[0] ||
		product.images?.[0] ||
		'/error-img.svg';
	const title = product.title || product.name || '';
	const price = Number(product.price || 0);
	const originPrice = Number(product.origin_price || product.originPrice || 0);

	return (
		<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<Box
				component={RouterLink}
				to={`/product/${product.id}`}
				sx={{ textDecoration: 'none' }}
			>
				<CardMedia
					component="img"
					height="200"
					image={imageSrc}
					alt={title}
					onError={(e) => {
						e.currentTarget.src = '/error-img.svg';
					}}
					sx={{ objectFit: 'cover' }}
				/>
			</Box>
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography
					component={RouterLink}
					to={`/product/${product.id}`}
					variant="h6"
					sx={{
						textDecoration: 'none',
						color: 'text.primary',
						fontWeight: 800,
						display: 'block',
						mb: 1,
					}}
				>
					{title}
				</Typography>
				<Stack direction="row" spacing={1} alignItems="baseline">
					<Typography variant="h6" sx={{ fontWeight: 900 }}>
						NT$ {price.toLocaleString()}
					</Typography>
					{originPrice > price ? (
						<Typography
							variant="body2"
							sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
						>
							NT$ {originPrice.toLocaleString()}
						</Typography>
					) : null}
				</Stack>
			</CardContent>
			{onAddToCart ? (
				<CardActions sx={{ p: 2, pt: 0 }}>
					<Button
						fullWidth
						variant="contained"
						onClick={() => onAddToCart?.(product)}
						disabled={adding}
						sx={{ fontWeight: 800 }}
					>
						{adding ? '加入中...' : '加入購物車'}
					</Button>
				</CardActions>
			) : null}
		</Card>
	);
}

FrontProductCard.propTypes = {
	product: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.string,
		name: PropTypes.string,
		price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		origin_price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		originPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		imageUrl: PropTypes.string,
		image: PropTypes.string,
		imagesUrl: PropTypes.arrayOf(PropTypes.string),
		images: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
	onAddToCart: PropTypes.func,
	adding: PropTypes.bool,
};
