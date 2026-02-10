import { useState, useEffect } from 'react';
import {
	TableRow,
	TableCell,
	Typography,
	Box,
	Alert,
	CircularProgress,
	Avatar,
	Stack,
	Chip,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
	DataGrid,
	ActionButtons,
	StatusBadge,
} from '@/components/admin/common';
import PermissionDenied from '@/components/PermissionDenied';
import { isPermissionDenied } from '@/utils/permissions';
import { getArticlesAPI } from '@/api/article';

// 文章分類配置
const CATEGORIES = {
	customerStories: { name: '顧客故事', color: 'primary' },
	ownerDaily: { name: '店主日常', color: 'secondary' },
	holidayInfo: { name: '店休資訊', color: 'warning' },
	mediaReports: { name: '媒體報導', color: 'info' },
	charityEvents: { name: '公益活動', color: 'success' },
};

// 文章狀態配置
const ARTICLE_STATUS_CONFIG = {
	published: {
		label: '已發佈',
		color: 'success',
	},
	draft: {
		label: '草稿',
		color: 'default',
	},
};

// 表格列配置
const COLUMNS = [
	{ id: 'cover', label: '封面', minWidth: 100, align: 'center' },
	{ id: 'title', label: '文章標題 / 摘要', minWidth: 300 },
	{ id: 'category', label: '分類', minWidth: 120, align: 'center' },
	{ id: 'status', label: '狀態', minWidth: 100, align: 'center' },
	{ id: 'date', label: '發布日期', minWidth: 120 },
	{ id: 'stats', label: '點擊 / 喜愛', minWidth: 120, align: 'center' },
	{ id: 'author', label: '作者', minWidth: 100 },
	{ id: 'actions', label: '操作', minWidth: 120, align: 'center' },
];

// 排序選項
const SORT_OPTIONS = [
	{ value: 'newest', label: '由新到舊' },
	{ value: 'oldest', label: '由舊到新' },
	{ value: 'views', label: '最多點擊' },
	{ value: 'likes', label: '最多喜愛' },
];

// 分類篩選選項
const CATEGORY_FILTER_OPTIONS = [
	{ value: 'all', label: '全部分類' },
	{ value: 'customerStories', label: '顧客故事' },
	{ value: 'ownerDaily', label: '店主日常' },
	{ value: 'holidayInfo', label: '店休資訊' },
	{ value: 'mediaReports', label: '媒體報導' },
	{ value: 'charityEvents', label: '公益活動' },
];

// 狀態篩選選項
const STATUS_FILTER_OPTIONS = [
	{ value: 'all', label: '全部狀態' },
	{ value: 'published', label: '已發佈' },
	{ value: 'draft', label: '草稿' },
];

export default function Articles() {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [permissionError, setPermissionError] = useState(null);
	const [searchValue, setSearchValue] = useState('');
	const [sortBy, setSortBy] = useState('newest');
	const [categoryFilter, setCategoryFilter] = useState('all');
	const [statusFilter, setStatusFilter] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		fetchArticles();
	}, [currentPage, sortBy, categoryFilter, statusFilter]);

	const fetchArticles = async () => {
		try {
			setLoading(true);
			setError(null);
			setPermissionError(null);

			const response = await getArticlesAPI();
			let articlesData = response.articles || [];

			// 篩選分類
			if (categoryFilter !== 'all') {
				articlesData = articlesData.filter(
					(article) =>
						article.tag?.includes(categoryFilter) ||
						article.category === categoryFilter,
				);
			}

			// 篩選狀態
			if (statusFilter !== 'all') {
				articlesData = articlesData.filter(
					(article) => article.status === statusFilter,
				);
			}

			// 排序
			switch (sortBy) {
				case 'oldest':
					articlesData.sort((a, b) => (a.create_at || 0) - (b.create_at || 0));
					break;
				case 'views':
					articlesData.sort((a, b) => (b.views || 0) - (a.views || 0));
					break;
				case 'likes':
					articlesData.sort((a, b) => (b.likes || 0) - (a.likes || 0));
					break;
				case 'newest':
				default:
					articlesData.sort((a, b) => (b.create_at || 0) - (a.create_at || 0));
					break;
			}

			setArticles(articlesData);
			setTotalPages(1); // TODO: 根據實際 API 響應設置分頁
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

	const handleViewArticle = (article) => {
		// TODO: 實現查看文章的邏輯
		console.log('View article:', article);
	};

	const handleEditArticle = (article) => {
		// TODO: 實現編輯文章的邏輯
		console.log('Edit article:', article);
	};

	const handleDeleteArticle = (article) => {
		// TODO: 實現刪除文章的邏輯
		console.log('Delete article:', article);
	};

	const handleAddArticle = () => {
		// TODO: 實現新增文章的邏輯
		console.log('Add new article');
	};

	// 格式化日期
	const formatDate = (timestamp) => {
		if (!timestamp) return '-';
		const date = new Date(timestamp * 1000);
		return date.toLocaleDateString('zh-TW', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
	};

	// 渲染表格行
	const renderRow = (article) => {
		const categoryInfo = CATEGORIES[article.category || article.tag?.[0]] || {
			name: '未分類',
			color: 'default',
		};

		return (
			<TableRow
				key={article.id}
				hover
				sx={{
					'&:hover': {
						backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.02),
					},
					transition: 'background-color 0.2s ease-in-out',
				}}
			>
				{/* 封面圖片 */}
				<TableCell align="center">
					<Avatar
						src={article.image}
						variant="rounded"
						sx={{
							width: 64,
							height: 64,
							borderRadius: 1,
							border: (theme) =>
								`1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
						}}
					/>
				</TableCell>

				{/* 標題與摘要 */}
				<TableCell>
					<Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
						{article.title}
					</Typography>
					{article.description && (
						<Typography
							variant="caption"
							color="text.secondary"
							sx={{
								display: '-webkit-box',
								WebkitLineClamp: 2,
								WebkitBoxOrient: 'vertical',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								lineHeight: 1.4,
							}}
						>
							{article.description}
						</Typography>
					)}
				</TableCell>

				{/* 分類 */}
				<TableCell align="center">
					<Chip
						label={categoryInfo.name}
						color={categoryInfo.color}
						size="small"
						sx={{
							borderRadius: 1,
							fontWeight: 600,
							fontSize: '0.75rem',
						}}
					/>
				</TableCell>

				{/* 狀態 */}
				<TableCell align="center">
					<StatusBadge
						status={article.status || 'published'}
						statusConfig={ARTICLE_STATUS_CONFIG}
					/>
				</TableCell>

				{/* 發布日期 */}
				<TableCell>
					<Typography variant="body2" color="text.secondary">
						{formatDate(article.create_at)}
					</Typography>
				</TableCell>

				{/* 點擊 / 喜愛 */}
				<TableCell align="center">
					<Stack direction="row" spacing={1} justifyContent="center">
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
							<Typography
								variant="body2"
								sx={{ color: 'info.main', fontWeight: 600 }}
							>
								👁️ {article.views || 0}
							</Typography>
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
							<Typography
								variant="body2"
								sx={{ color: 'error.main', fontWeight: 600 }}
							>
								❤️ {article.likes || 0}
							</Typography>
						</Box>
					</Stack>
				</TableCell>

				{/* 作者 */}
				<TableCell>
					<Typography variant="body2" color="text.secondary">
						{article.author || 'Admin'}
					</Typography>
				</TableCell>

				{/* 操作按鈕 */}
				<TableCell align="center">
					<ActionButtons
						onView={() => handleViewArticle(article)}
						onEdit={() => handleEditArticle(article)}
						onDelete={() => handleDeleteArticle(article)}
						showView={true}
					/>
				</TableCell>
			</TableRow>
		);
	};

	// 權限錯誤顯示
	if (permissionError) {
		return <PermissionDenied error={permissionError} />;
	}

	// 載入中顯示
	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box sx={{ p: 3 }}>
			{error && (
				<Alert severity="error" sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			<DataGrid
				title="文章管理"
				count={articles.length}
				onAdd={handleAddArticle}
				addButtonText="新增文章"
				filterProps={{
					searchValue,
					onSearchChange: setSearchValue,
					searchPlaceholder: '搜尋文章標題或內容...',
					sortValue: sortBy,
					onSortChange: setSortBy,
					sortOptions: SORT_OPTIONS,
					filterValue: statusFilter,
					onFilterChange: setStatusFilter,
					filterOptions: STATUS_FILTER_OPTIONS,
				}}
				tableProps={{
					columns: COLUMNS,
					data: articles,
					renderRow,
				}}
				paginationProps={{
					currentPage,
					totalPages,
					onPageChange: setCurrentPage,
				}}
			/>
		</Box>
	);
}
