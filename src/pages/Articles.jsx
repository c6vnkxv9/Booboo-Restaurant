import { useState, useEffect, useMemo } from 'react';
import { getArticlesAPI } from '../api/article';
import ListLayout from '../components/ListLayout';
import CategorySidebar from '../components/CategorySidebar';
import ArticleCard from '../components/ArticleCard';
import PermissionDenied from '../components/PermissionDenied';
import { isPermissionDenied } from '../utils/permissions';
import {
	Alert,
	Box,
	Button,
	CircularProgress,
	FormControl,
	MenuItem,
	Paper,
	Select,
	Stack,
	Typography,
} from '@mui/material';
const CATEGORIES = [
	{ id: 'all', name: '全部文章', icon: '📰' },
	{ id: 'customerStories', name: '顧客故事', icon: '👥' },
	{ id: 'ownerDaily', name: '店主日常', icon: '👨‍🍳' },
	{ id: 'holidayInfo', name: '店休資訊', icon: '📅' },
	{ id: 'mediaReports', name: '媒體報導', icon: '📺' },
	{ id: 'charityEvents', name: '公益活動', icon: '❤️' },
];

const SORT_OPTIONS = [
	{ value: 'newest', label: '由新到舊' },
	{ value: 'oldest', label: '由舊到新' },
];

export default function Articles() {
	const [allArticles, setAllArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [permissionError, setPermissionError] = useState(null);
	const [activeCategory, setActiveCategory] = useState('all');
	const [sortBy, setSortBy] = useState('newest');

	useEffect(() => {
		fetchArticles();
		// uploadAndSaveToLocal(['Gemini_Generated_Image_2yyxph2yyxph2yyx.png'])
	}, []);

	const fetchArticles = async () => {
		try {
			setLoading(true);
			setError(null);
			setPermissionError(null);
			const response = await getArticlesAPI();
			const articlesData = response.articles || [];
			setAllArticles(articlesData);
		} catch (err) {
			// 檢查是否為權限不足錯誤
			if (isPermissionDenied(err)) {
				setPermissionError(err);
			} else {
				setError('獲取文章列表失敗，請稍後再試');
			}
		} finally {
			setLoading(false);
		}
	};

	const filteredArticles = useMemo(() => {
		let filtered = [...allArticles];
		if (activeCategory !== 'all') {
			filtered = filtered.filter(
				(article) =>
					article.tag?.includes(activeCategory) ||
					article.category === activeCategory
			);
		}
		switch (sortBy) {
			case 'oldest':
				filtered.sort((a, b) => (a.create_at || 0) - (b.create_at || 0));
				break;
			case 'newest':
			default:
				filtered.sort((a, b) => (b.create_at || 0) - (a.create_at || 0));
				break;
		}
		return filtered;
	}, [allArticles, activeCategory, sortBy]);

	if (loading) {
		return (
			<Paper
				elevation={0}
				sx={{
					p: 5,
					textAlign: 'center',
					bgcolor: 'theme.palette.background.default',
				}}
			>
				<CircularProgress
					size={28}
					sx={{ color: 'theme.palette.primary.main' }}
				/>
				<Typography sx={{ mt: 2, color: 'theme.palette.text.primary' }}>
					正在載入文章列表...
				</Typography>
			</Paper>
		);
	}

	// 如果權限不足，顯示權限錯誤提示
	//https://storage.googleapis.com/vue-course-api.appspot.com/booboo/1767627615866.png
	//https://storage.googleapis.com/vue-course-api.appspot.com/booboo/1767627615830.png
	if (permissionError) {
		return <PermissionDenied error={permissionError} onRetry={fetchArticles} />;
	}

	if (error) {
		return (
			<Paper
				elevation={0}
				sx={{
					p: 5,
					textAlign: 'center',
					bgcolor: 'theme.palette.background.default',
				}}
			>
				<Alert
					severity="error"
					sx={{ display: 'inline-flex', textAlign: 'left' }}
				>
					{error}
				</Alert>
				<Box sx={{ mt: 2 }}>
					<Button
						variant="contained"
						onClick={fetchArticles}
						sx={{
							fontWeight: 800,
							background:
								'linear-gradient(to right, theme.palette.primary.main, theme.palette.primary.dark, #d88a7d))',
						}}
					>
						重新載入
					</Button>
				</Box>
			</Paper>
		);
	}

	return (
		<ListLayout
			sidebar={
				<CategorySidebar
					activeCategory={activeCategory}
					onCategoryChange={setActiveCategory}
					categories={CATEGORIES}
					title="文章分類"
					subtitle="瀏覽我們的最新動態"
				/>
			}
		>
			{/* 篩選和排序工具欄 */}
			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				justifyContent="space-between"
				alignItems={{ xs: 'flex-start', sm: 'center' }}
				spacing={2}
				sx={{ mb: 3 }}
			>
				<Stack direction="row" spacing={1.5} alignItems="center">
					<Box
						sx={{
							width: 6,
							height: 24,
							borderRadius: 1,
							bgcolor: 'theme.palette.primary.main',
						}}
					/>
					<Typography
						variant="h5"
						sx={{ fontWeight: 900, color: 'theme.palette.text.primary' }}
					>
						全部文章
						<Typography
							component="span"
							sx={{
								ml: 1.25,
								fontSize: 14,
								fontWeight: 500,
								color: 'theme.palette.secondary.main',
							}}
						>
							({filteredArticles.length} 項文章)
						</Typography>
					</Typography>
				</Stack>

				<FormControl size="small" sx={{ minWidth: 160 }}>
					<Select
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
						sx={{
							borderRadius: 999,
							bgcolor: 'theme.palette.background.default',
						}}
					>
						{SORT_OPTIONS.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Stack>

			{/* 文章網格 */}
			{filteredArticles.length === 0 ? (
				<Paper
					elevation={0}
					sx={{
						p: 5,
						textAlign: 'center',
						bgcolor: 'theme.palette.background.default',
					}}
				>
					<Typography sx={{ color: 'theme.palette.text.primary' }}>
						目前沒有文章
					</Typography>
				</Paper>
			) : (
				<div className="row g-4">
					{filteredArticles.map((article) => (
						<ArticleCard key={article.id} article={article} />
					))}
				</div>
			)}
		</ListLayout>
	);
}
