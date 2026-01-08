import { useEffect, useState } from 'react';
import { Box, Container, Typography, Link, useTheme, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getProductsAPI } from '@/api/products';
import { Link as RouterLink } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
const SectionBox = styled(Box)(({ theme }) => ({
	padding: theme.spacing(12, 0),
	position: 'relative',
	backgroundColor: theme.palette.background.default,
}));
const DecorativeCircle = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: 0,
	right: 0,
	width: '256px',
	height: '256px',
	backgroundColor: `${theme.palette.primary.main}0D`,
	borderRadius: '0 0 0 100%',
	pointerEvents: 'none',
}));
const SwiperWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	'& .swiper-button-next, & .swiper-button-prev': {
		backgroundColor: '#fff',
		width: '40px',
		height: '40px',
		borderRadius: '50%',
		boxShadow: theme.shadows[4],
		color: theme.palette.text.secondary,
		'&:hover': {
			color: theme.palette.primary.main,
		},
		'&::after': {
			fontSize: '1.5rem',
		},
		display: { xs: 'none', md: 'flex' },
	},
	'& .swiper-pagination': {
		bottom: '0 !important',
		marginTop: theme.spacing(3),
	},
	'& .swiper-pagination-bullet': {
		width: '8px',
		height: '8px',
		backgroundColor: '#d1d5db',
		opacity: 1,
	},
	'& .swiper-pagination-bullet-active': {
		backgroundColor: theme.palette.primary.main,
	},
}));

const ViewAllLink = styled(Link)(({ theme }) => ({
	fontWeight: 'bold',
	textDecoration: 'none',
	fontSize: '0.875rem',
	color: theme.palette.text.secondary,
	display: 'inline-flex',
	alignItems: 'center',
	gap: theme.spacing(0.5),
	marginTop: theme.spacing(6),
	transition: 'color 0.3s',
	'&:hover': {
		color: theme.palette.primary.main,
		'& .arrow-icon': {
			transform: 'translateX(4px)',
		},
	},
}));

const ItemsSection = () => {
	const theme = useTheme();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const response = await getProductsAPI();
				const productsData = Array.isArray(response) 
					? response.slice(0, 9)
					: (response.products || []).slice(0, 9);
				setProducts(productsData);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	return (
		<SectionBox component="section" id="seasonal-menu">
			<DecorativeCircle />
			<Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
				<Box sx={{ textAlign: 'center', marginBottom: 8 }}>
					<Typography
						variant="overline"
						sx={{
							fontSize: '0.75rem',
							fontWeight: 'bold',
							textTransform: 'uppercase',
							color: theme.palette.primary.main,
							letterSpacing: '0.3em',
							display: 'block',
							marginBottom: 1.5,
						}}
					>
						季節限定
					</Typography>
					<Typography
						variant="h2"
						sx={{
							fontFamily: "'Kaisei Opti', serif",
							fontSize: { xs: '1.875rem', md: '2.25rem' },
							fontWeight: 'bold',
							color: theme.palette.text.primary,
							letterSpacing: '0.05em',
						}}
					>
						此時此刻的美味
					</Typography>
				</Box>

				{loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
						<CircularProgress />
					</Box>
				) : error ? (
					<Box sx={{ textAlign: 'center', padding: 4 }}>
						<Typography color="error">載入產品時發生錯誤：{error}</Typography>
					</Box>
				) : products.length > 0 ? (
					<SwiperWrapper sx={{ px: { xs: 2, md: 6 } }}>
						<Swiper
							modules={[Navigation, Pagination]}
							spaceBetween={32}
							slidesPerView={1}
							breakpoints={{
								640: {
									slidesPerView: 1,
									spaceBetween: 24,
								},
								900: {
									slidesPerView: 2,
									spaceBetween: 32,
								},
								1280: {
									slidesPerView: 3,
									spaceBetween: 32,
								},
							}}
							navigation
							pagination={{ clickable: true }}
							style={{
								'--swiper-navigation-color': theme.palette.primary.main,
								'--swiper-pagination-color': theme.palette.primary.main,
								paddingBottom: '40px',
							}}
						>
							{products.map((product) => (
								<SwiperSlide key={product.id || product._id}>
									<Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
										<RouterLink
											to={`/products/${product.id || product._id}`}
											style={{ textDecoration: 'none', width: '100%' }}
										>
											<ProductCard product={product} />
										</RouterLink>
									</Box>
								</SwiperSlide>
							))}
						</Swiper>
					</SwiperWrapper>
				) : (
					<Box sx={{ textAlign: 'center', padding: 4 }}>
						<Typography>目前沒有產品</Typography>
					</Box>
				)}

				<Box sx={{ textAlign: 'center' }}>
					<ViewAllLink component={RouterLink} to="/products">
						查看完整菜單
						<span className="material-symbols-outlined arrow-icon" style={{ fontSize: '1rem', marginLeft: '4px', transition: 'transform 0.3s' }}>
							chevron_right
						</span>
					</ViewAllLink>
				</Box>
			</Container>
		</SectionBox>
	);
};

export default ItemsSection;

