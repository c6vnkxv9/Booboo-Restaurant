import { useEffect, useState } from 'react';
import { Box, Container, Typography, Link, useTheme, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getProductsAPI } from '@/api/products';
import ProductCard from '@/components/ProductCard';

const SectionBox = styled(Box)(({ theme }) => ({
	padding: theme.spacing(5, 0),
}));

const Divider = styled(Box)(({ theme }) => ({
	width: '80px',
	height: '4px',
	backgroundColor: theme.palette.secondary.main,
	borderRadius: '8px',
	margin: theme.spacing(3, 'auto', 0),
}));

const ViewAllLink = styled(Link)(({ theme }) => ({
	fontWeight: 'bold',
	textDecoration: 'none',
	color: theme.palette.text.primary,
	display: 'inline-flex',
	alignItems: 'center',
	gap: theme.spacing(0.5),
	marginTop: theme.spacing(4),
	'&:hover': {
		color: theme.palette.primary.main,
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
					? response.slice(0, 5)
					: (response.products || []).slice(0, 5);
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
		<SectionBox component="section" id="items">
			<Container>
				<Box sx={{ textAlign: 'center', marginBottom: 4 }}>
					<Typography
						variant="overline"
						sx={{
							fontWeight: 'bold',
							textTransform: 'uppercase',
							color: theme.palette.primary.main,
							letterSpacing: '0.25em',
							display: 'block',
						}}
					>
						人氣料理新推出
					</Typography>
					<Typography
						variant="h3"
						sx={{
							fontWeight: 'bold',
							marginTop: 2,
							color: theme.palette.text.primary,
						}}
					>
						菜單介紹
					</Typography>
					<Divider />
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
					<Box sx={{ position: 'relative', padding: { xs: 0, md: 2 } }}>
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
										<ProductCard product={product} />
									</Box>
								</SwiperSlide>
							))}
						</Swiper>
					</Box>
				) : (
					<Box sx={{ textAlign: 'center', padding: 4 }}>
						<Typography>目前沒有產品</Typography>
					</Box>
				)}

				<Box sx={{ textAlign: 'center' }}>
					<ViewAllLink href="#cta">
						全ての品を見る
						<span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
							arrow_forward_ios
						</span>
					</ViewAllLink>
				</Box>
			</Container>
		</SectionBox>
	);
};

export default ItemsSection;

