import { useMemo, useState } from 'react';
import { auth } from '../utils/auth';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import {
	Box,
	Button,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	ListItemText,
	Stack,
	Typography,
} from '@mui/material';
const NAV_LIST = [
	{
		name: '產品一覽',
		path: '/products',
	},
	{
		name: '優惠券管理',
		path: '/coupons',
	},
	{
		name: '訂單列表',
		path: '/orders',
	},
	{
		name: '文章管理',
		path: '/articles',
	},
];
export default function AdminHeader() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const username = auth.getUsername();
	const navigate = useNavigate();
	const location = useLocation();

	const onLogout = () => {
		auth.logout();
		navigate('/login', { replace: true });
	};

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const activePath = useMemo(() => location.pathname, [location.pathname]);

	return (
		<Box component="header" sx={{ mb: { xs: 2.5, md: 4 } }}>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				sx={{
					px: { xs: 1, md: 2 },
					py: { xs: 1.25, md: 1.75 },
				}}
			>
				<Stack
					component={RouterLink}
					to="/products"
					direction="row"
					alignItems="center"
					spacing={1.5}
					sx={{
						textDecoration: 'none',
						color: 'text.primary',
						minWidth: 0,
					}}
				>
					<Box
						component="img"
						src="/logo.png"
						alt="BooBoo食堂"
						sx={{ width: 40, height: 40, objectFit: 'contain', flexShrink: 0 }}
					/>
					<Typography
						variant="h6"
						sx={(theme) => ({
							fontWeight: 900,
							fontFamily:
								theme.typography.title?.fontFamily || "'Kaisei Opti', serif",
							letterSpacing: theme.typography.title?.letterSpacing || '0.04em',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						})}
					>
						BooBoo食堂後台系統
					</Typography>
				</Stack>

				<Stack
					direction="row"
					alignItems="center"
					spacing={2}
					sx={{
						display: { xs: 'none', md: 'flex' },
						flexGrow: 1,
						justifyContent: 'flex-end',
					}}
				>
					<Stack
						direction="row"
						alignItems="center"
						spacing={0.5}
						sx={(theme) => ({
							px: 2,
							py: 1,
							borderRadius: 999,
							border: `1px solid ${alpha(theme.palette.common.white, 0.35)}`,
							bgcolor: alpha(theme.palette.common.white, 0.55),
							backdropFilter: 'blur(6px)',
							boxShadow: theme.shadows[1],
						})}
					>
						{NAV_LIST.map((item) => {
							const selected =
								activePath === item.path ||
								activePath.startsWith(`${item.path}/`);
							return (
								<Button
									key={item.name}
									component={RouterLink}
									to={item.path}
									size="small"
									sx={(theme) => ({
										fontWeight: selected ? 900 : 700,
										color: selected
											? theme.palette.primary.main
											: theme.palette.text.primary,
										borderRadius: 999,
										px: 1.5,
										'&:hover': {
											bgcolor: alpha(theme.palette.primary.main, 0.08),
										},
									})}
								>
									{item.name}
								</Button>
							);
						})}
					</Stack>

					<Stack direction="row" alignItems="center" spacing={1.25}>
						<Typography
							variant="body2"
							sx={{
								color: 'text.secondary',
								display: { xs: 'none', lg: 'block' },
							}}
						>
							歡迎，{username}
						</Typography>
						<Button
							onClick={onLogout}
							variant="contained"
							sx={{
								borderRadius: 999,
								px: 3,
								fontWeight: 900,
								bgcolor: 'text.primary',
								'&:hover': { bgcolor: 'text.primary' },
							}}
						>
							登出
						</Button>
					</Stack>
				</Stack>

				{/* 手機：menu */}
				<IconButton
					onClick={toggleMenu}
					sx={{ display: { xs: 'inline-flex', md: 'none' } }}
					aria-label={isMenuOpen ? '關閉選單' : '開啟選單'}
				>
					<span className="material-symbols-outlined">
						{isMenuOpen ? 'close' : 'menu'}
					</span>
				</IconButton>
			</Stack>

			{/* 手機 Drawer */}
			<Drawer
				anchor="right"
				open={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
				PaperProps={{
					sx: (theme) => ({
						width: 320,
						bgcolor: alpha(theme.palette.common.white, 0.92),
						backdropFilter: 'blur(10px)',
					}),
				}}
			>
				<Box sx={{ p: 2 }}>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						sx={{ mb: 1 }}
					>
						<Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
							選單
						</Typography>
						<IconButton
							onClick={() => setIsMenuOpen(false)}
							aria-label="關閉選單"
						>
							<span className="material-symbols-outlined">close</span>
						</IconButton>
					</Stack>

					<List disablePadding sx={{ mt: 1 }}>
						{NAV_LIST.map((item) => {
							const selected =
								activePath === item.path ||
								activePath.startsWith(`${item.path}/`);
							return (
								<ListItemButton
									key={item.name}
									component={RouterLink}
									to={item.path}
									selected={selected}
									onClick={() => setIsMenuOpen(false)}
									sx={(theme) => ({
										borderRadius: 2,
										mb: 0.5,
										'&.Mui-selected': {
											bgcolor: alpha(theme.palette.primary.main, 0.1),
											color: theme.palette.primary.main,
											'&:hover': {
												bgcolor: alpha(theme.palette.primary.main, 0.14),
											},
										},
									})}
								>
									<ListItemText
										primary={item.name}
										primaryTypographyProps={{
											fontWeight: selected ? 900 : 700,
										}}
									/>
								</ListItemButton>
							);
						})}
					</List>

					<Divider sx={{ my: 2 }} />

					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Typography
							variant="body2"
							sx={{ color: 'text.secondary', fontWeight: 700 }}
						>
							歡迎，{username}
						</Typography>
						<Button
							onClick={onLogout}
							variant="contained"
							sx={{
								borderRadius: 999,
								px: 2.5,
								fontWeight: 900,
								bgcolor: 'text.primary',
								'&:hover': { bgcolor: 'text.primary' },
							}}
						>
							登出
						</Button>
					</Stack>
				</Box>
			</Drawer>
		</Box>
	);
}
