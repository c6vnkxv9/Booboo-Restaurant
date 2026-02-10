import { useState, useEffect, useMemo } from 'react';
import { getArticlesAPI } from '@/api/article';
import ListLayout from '@/components/ListLayout';
import CategorySidebar from '@/components/CategorySidebar';
import ArticleCard from '@/components/front/ArticleCard';
import PermissionDenied from '@/components/PermissionDenied';
import { isPermissionDenied } from '@/utils/permissions';
import { PageHeader, FilterBar } from '@/components/admin/common';
import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Paper,
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
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		fetchArticles();
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

		// 分類篩選
		if (activeCategory !== 'all') {
			filtered = filtered.filter(
				(article) =>
					article.tag?.includes(activeCategory) ||
					article.category === activeCategory,
			);
		}

		// 搜尋篩選
		if (searchValue) {
			const searchLower = searchValue.toLowerCase();
			filtered = filtered.filter(
				(article) =>
					article.title?.toLowerCase().includes(searchLower) ||
					article.description?.toLowerCase().includes(searchLower),
			);
		}

		// 排序
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
	}, [allArticles, activeCategory, sortBy, searchValue]);

	const handleAddArticle = () => {
		// TODO: 實現新增文章的邏輯
		console.log('Add new article');
	};

	// 載入中顯示
	if (loading) {
		return (
			<Paper
				elevation={0}
				sx={{
					p: 5,
					textAlign: 'center',
					bgcolor: 'background.default',
				}}
			>
				<CircularProgress size={28} sx={{ color: 'primary.main' }} />
				<Typography sx={{ mt: 2, color: 'text.primary' }}>
					正在載入文章列表...
				</Typography>
			</Paper>
		);
	}

	// 權限錯誤顯示
	if (permissionError) {
		return <PermissionDenied error={permissionError} onRetry={fetchArticles} />;
	}

	// 一般錯誤顯示
	if (error) {
		return (
			<Paper
				elevation={0}
				sx={{
					p: 5,
					textAlign: 'center',
					bgcolor: 'background.default',
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
							borderRadius: 1,
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
			{/* 使用統一的頁面標題元件 */}
			<PageHeader
				title="全部文章"
				count={filteredArticles.length}
				onAdd={handleAddArticle}
				addButtonText="新增文章"
			/>

			{/* 使用統一的篩選欄元件 */}
			<FilterBar
				searchValue={searchValue}
				onSearchChange={setSearchValue}
				searchPlaceholder="搜尋文章標題或內容..."
				sortValue={sortBy}
				onSortChange={setSortBy}
				sortOptions={SORT_OPTIONS}
			/>

			{/* 文章網格 - 保持原有的卡片式布局 */}
			{filteredArticles.length === 0 ? (
				<Paper
					elevation={0}
					sx={{
						p: 5,
						textAlign: 'center',
						bgcolor: 'background.default',
						borderRadius: 1,
					}}
				>
					<Typography sx={{ color: 'text.primary' }}>目前沒有文章</Typography>
				</Paper>
			) : (
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: {
							xs: '1fr',
							sm: 'repeat(auto-fill, minmax(300px, 1fr))',
						},
						gap: 3,
					}}
				>
					{filteredArticles.map((article) => (
						<ArticleCard key={article.id} article={article} />
					))}
				</Box>
			)}
		</ListLayout>
	);
}
