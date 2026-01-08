import { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, Link, useTheme, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getArticlesAPI } from '@/api/article';

const SectionBox = styled(Box)(({ theme }) => ({
	padding: theme.spacing(24, 0),
	backgroundColor: theme.palette.background.paper || '#FAEDE7',
	position: 'relative',
}));



const ImageContainer = styled(Box)(({ theme, rotate }) => ({
	position: 'relative',
	aspectRatio: '4/3',
	overflow: 'hidden',
	width: '100%',
	[theme.breakpoints.up('md')]: {
		width: '41.666%',
	},
	transform: rotate ? `rotate(${rotate}deg)` : 'none',
	transition: 'transform 0.5s',
	'&:hover': {
		transform: 'rotate(0deg)',
	},
	border: `2px solid ${theme.palette.secondary.main}`,
	borderRadius: '4px',
}));

const ArticleImage = styled('img')({
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	transition: 'transform 0.7s',
	'&:hover': {
		transform: 'scale(1.1)',
	},
});

const TagBadge = styled(Box)(({ theme }) => ({
	position: 'absolute',
	bottom: 0,
	left: 0,
	backgroundColor: theme.palette.primary.main,
	color: '#fff',
	padding: theme.spacing(1, 2),
	fontWeight: 'bold',
	fontSize: '0.75rem',
	letterSpacing: '0.1em',
	textTransform: 'uppercase',
}));

const TimelineIcon = styled(Box)(({ theme }) => ({
	width: '48px',
	height: '48px',
	borderRadius: '50%',
	border: `2px solid ${theme.palette.secondary.main}`,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: theme.palette.background.paper || '#FAEDE7',
	boxShadow: theme.shadows[1],
	zIndex: 10,
	color: theme.palette.secondary.main,
	fontSize: '1.25rem',
}));

const TimelineLine = styled(Box)(({ theme }) => ({
	width: '1px',
	backgroundColor: theme.palette.secondary.main,
	flexGrow: 1,
	'&.top': {
		height: '32px',
		marginBottom: '4px',
	},
	'&.bottom': {
		flexGrow: 1,
		marginTop: '4px',
		opacity: 0.2,
	},
}));

const JournalSection = () => {
	const theme = useTheme();
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState('全て');

	const iconMap = {
		Recipe: 'restaurant_menu',
		Culture: 'temple_buddhist',
		Guide: 'liquor',
		default: 'article',
	};

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				setLoading(true);
				const response = await getArticlesAPI(1);
				const articlesData = Array.isArray(response) 
					? response.slice(0, 3)
					: (response.articles || response.data || []).slice(0, 3);
				setArticles(articlesData);
			} catch (err) {
				console.error('Failed to fetch articles:', err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchArticles();
	}, []);

	const formatDate = (timestamp) => {
		if (!timestamp) return '';
		const date = new Date(timestamp * 1000);
		return date.toLocaleDateString('ja-JP', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		}).replace(/\//g, '.');
	};

	const getCategoryTag = (article) => {
		if (article.tag && article.tag.length > 0) {
			return article.tag[0];
		}
		if (article.category) {
			return article.category;
		}
		return 'Article';
	};

	return (
		<SectionBox component="section" id="journal">
			<Container >
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						justifyContent: 'space-between',
						alignItems: { xs: 'flex-start', md: 'flex-end' },
						marginBottom: 16,
						gap: 4,
					}}
				>
					<Box>
						<Typography
							variant="overline"
							sx={{
								color: theme.palette.primary.main,
								fontWeight: 'bold',
								letterSpacing: '0.2em',
								fontSize: '0.875rem',
								display: 'block',
								marginBottom: 1,
							}}
						>
							職人日誌
						</Typography>
						<Typography
							variant="h2"
							sx={{
								fontSize: { xs: '2.5rem', md: '3rem' },
								fontWeight: 'bold',
								color: theme.palette.text.primary,
								lineHeight: 1.2,
								fontFamily: "'Kaisei Opti', serif",
							}}
						>
							市場の
							<br style={{ display: { xs: 'block', md: 'none' } }} />
							物語
						</Typography>
					</Box>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
						{['全て', '料理', '職人', '文化'].map((category) => (
							<Button
								key={category}
								variant={selectedCategory === category ? 'contained' : 'outlined'}
								onClick={() => setSelectedCategory(category)}
								sx={{
									padding: theme.spacing(1, 3),
									backgroundColor: selectedCategory === category ? theme.palette.primary.main : 'transparent',
									color: selectedCategory === category ? '#fff' : theme.palette.secondary.main,
									borderColor: theme.palette.secondary.main,
									borderRadius: '999px',
									fontWeight: 'bold',
									fontSize: '0.875rem',
									textTransform: 'none',
									boxShadow: selectedCategory === category ? theme.shadows[2] : 'none',
									'&:hover': {
										backgroundColor: selectedCategory === category 
											? theme.palette.primary.dark 
											: theme.palette.background.paper || '#FAEDE7',
										borderColor: theme.palette.secondary.main,
									},
								}}
							>
								{category}
							</Button>
						))}
					</Box>
				</Box>

				{loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
						<CircularProgress />
					</Box>
				) : error ? (
					<Box sx={{ textAlign: 'center', padding: 4 }}>
						<Typography color="error">載入文章時發生錯誤：{error}</Typography>
					</Box>
				) : articles.length > 0 ? (
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
						{articles.map((article, index) => {
							const isEven = index % 2 === 1;
							const categoryTag = getCategoryTag(article);
							const iconName = iconMap[categoryTag] || iconMap.default;
							const rotate = isEven ? -1 : 1;

							return (
								<Box
									key={article.id || article._id}
									sx={{
										display: 'flex',
										flexDirection: { xs: 'column', md: 'row' },
										gap: 4,
										alignItems: { xs: 'center', md: 'stretch' },
										position: 'relative',
									}}
								>
									{/* Timeline (desktop only) */}
									<Box
										sx={{
											display: { xs: 'none', md: 'flex' },
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'flex-start',
											paddingTop: 2,
											width: '64px',
											flexShrink: 0,
										}}
									>
										<TimelineLine className="top" />
										<TimelineIcon>
											<span className="material-symbols-outlined">{iconName}</span>
										</TimelineIcon>
										<TimelineLine className="bottom" />
									</Box>

									{/* Image */}
									<ImageContainer rotate={rotate} sx={{ order: { md: isEven ? 3 : 1 } }}>
										<ArticleImage
											src={article.image || article.imageUrl || '/error-img.svg'}
											alt={article.title}
											onError={(e) => {
												e.target.src = '/error-img.svg';
											}}
										/>
										<TagBadge>{categoryTag}</TagBadge>
									</ImageContainer>

									{/* Content */}
									<Box
										sx={{
											width: { xs: '100%', md: '50%' },
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											padding: { xs: 2, md: 4 },
											textAlign: { xs: 'left', md: isEven ? 'right' : 'left' },
											alignItems: { xs: 'flex-start', md: isEven ? 'flex-end' : 'flex-start' },
											order: { md: 2 },
										}}
									>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: 1.5,
												marginBottom: 2,
												color: theme.palette.primary.main,
												flexDirection: isEven ? 'row-reverse' : 'row',
											}}
										>
											<Typography sx={{ fontSize: '0.875rem', fontWeight: 'bold', letterSpacing: '0.1em' }}>
												{formatDate(article.create_at)}
											</Typography>
											<Box sx={{ width: '32px', height: '1px', backgroundColor: theme.palette.primary.main }} />
											<Typography sx={{ fontSize: '0.875rem', fontFamily: "'Kaisei Opti', serif" }}>
												{categoryTag}
											</Typography>
										</Box>
										<Typography
											variant="h3"
											component={Link}
											href={`/articles/${article.id}`}
											sx={{
												fontSize: { xs: '1.875rem', md: '2.25rem' },
												fontWeight: 'bold',
												color: theme.palette.text.primary,
												marginBottom: 3,
												lineHeight: 1.3,
												fontFamily: "'Kaisei Opti', serif",
												textDecoration: 'none',
												'&:hover': {
													color: theme.palette.secondary.main,
												},
											}}
										>
											{article.title}
										</Typography>
										<Typography
											sx={{
												color: theme.palette.secondary.main,
												marginBottom: 3,
												lineHeight: 1.75,
												fontWeight: 500,
												display: '-webkit-box',
												WebkitLineClamp: 3,
												WebkitBoxOrient: 'vertical',
												overflow: 'hidden',
											}}
										>
											{article.description || '旬の素材や文化を紐解く職人の視点で、味わい深い日常をお届けします。'}
										</Typography>
										<Link
											href={`/articles/${article.id}`}
											sx={{
												display: 'inline-flex',
												alignItems: 'center',
												color: theme.palette.text.primary,
												fontWeight: 'bold',
												textDecoration: 'none',
												'&:hover': {
													color: theme.palette.primary.main,
												},
											}}
										>
											{isEven && (
												<span className="material-symbols-outlined" style={{ marginRight: 8, transform: 'rotate(180deg)' }}>
													arrow_right_alt
												</span>
											)}
											続きを読む
											{!isEven && (
												<span className="material-symbols-outlined" style={{ marginLeft: 8 }}>
													arrow_right_alt
												</span>
											)}
										</Link>
									</Box>
								</Box>
							);
						})}
					</Box>
				) : (
					<Box sx={{ textAlign: 'center', padding: 4 }}>
						<Typography>目前沒有文章</Typography>
					</Box>
				)}

				<Box sx={{ marginTop: 10, textAlign: 'center' }}>
					<Button
						variant="outlined"
						href="/articles"
						sx={{
							border: `2px solid ${theme.palette.primary.main}`,
							color: theme.palette.primary.main,
							padding: theme.spacing(2, 5),
							fontWeight: 'bold',
							letterSpacing: '0.1em',
							textTransform: 'uppercase',
							fontSize: '0.875rem',
							borderRadius: 0,
							'&:hover': {
								backgroundColor: theme.palette.primary.main,
								color: '#fff',
								borderColor: theme.palette.primary.main,
							},
						}}
					>
						過去の日誌を紐解く
					</Button>
				</Box>
			</Container>
		</SectionBox>
	);
};

export default JournalSection;

