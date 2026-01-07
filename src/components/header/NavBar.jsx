import { AppBar, Toolbar, Box, Typography, Button, IconButton, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const StyledAppBar = styled(AppBar)({
	position: 'fixed',
	width: '100%',
	zIndex: 50,
	backgroundColor: 'rgba(242, 237, 228, 0.9)',
	backdropFilter: 'blur(12px)',
	borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
	transition: 'all 0.3s',
});

const LogoContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing(1.5),
	cursor: 'pointer',
	'&:hover .icon-wrapper': {
		backgroundColor: theme.palette.primary.main,
		'& .icon': {
			color: '#fff',
		},
	},
}));

const IconWrapper = styled(Box)(({ theme }) => ({
	border: `2px solid ${theme.palette.primary.main}`,
	borderRadius: '50%',
	padding: theme.spacing(1),
	transition: 'all 0.3s',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	'& .icon': {
		color: theme.palette.primary.main,
		fontSize: '1.5rem',
		transition: 'color 0.3s',
	},
}));

const NavLink = styled(Button)(({ theme }) => ({
	color: theme.palette.text.secondary || 'rgba(0, 0, 0, 0.6)',
	fontFamily: 'inherit',
	fontSize: '0.875rem',
	letterSpacing: '0.1em',
	textTransform: 'uppercase',
	padding: theme.spacing(1, 0),
	position: 'relative',
	'&:hover': {
		backgroundColor: 'transparent',
		color: theme.palette.primary.main,
		'&::after': {
			width: '100%',
		},
	},
	'&::after': {
		content: '""',
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: 0,
		height: '1px',
		backgroundColor: theme.palette.primary.main,
		transition: 'width 0.3s',
	},
}));

const OrderButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: '#fff',
	padding: theme.spacing(1.5, 4),
	borderRadius: '4px',
	fontSize: '0.875rem',
	fontFamily: 'inherit',
	letterSpacing: '0.1em',
	textTransform: 'uppercase',
	boxShadow: theme.shadows[1],
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing(1),
	'&:hover': {
		backgroundColor: theme.palette.primary.dark,
		boxShadow: theme.shadows[4],
	},
}));

const NavBar = () => {
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<StyledAppBar>
			<Box
				sx={{
					maxWidth: '1280px',
					mx: 'auto',
					px: { xs: 3, lg: 6 },
					width: '100%',
				}}
			>
				<Toolbar
					sx={{
						justifyContent: 'space-between',
						display: 'flex',
						alignItems: 'center',
						height: '96px',
						minHeight: '96px',
					}}
				>
					<Link to="/" style={{ textDecoration: 'none' }}>
						<LogoContainer>
							<IconWrapper className="icon-wrapper">
								<span className="material-symbols-outlined icon">ramen_dining</span>
							</IconWrapper>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-start',
									justifyContent: 'center',
									height: '100%',
								}}
							>
								<Typography
									variant="h5"
									sx={{
										fontWeight: 'bold',
										letterSpacing: '0.15em',
										color: theme.palette.text.primary,
										lineHeight: 1,
										marginBottom: 0.5,
									}}
								>
									BooBoo
								</Typography>
								<Typography
									variant="caption"
									sx={{
										fontSize: '0.75rem',
										color: theme.palette.primary.main,
										letterSpacing: '0.3em',
										textTransform: 'uppercase',
									}}
								>
									食堂
								</Typography>
							</Box>
						</LogoContainer>
					</Link>

					<Box
						sx={{
							display: { xs: 'none', md: 'flex' },
							alignItems: 'center',
							gap: 5,
						}}
					>
						<NavLink href="#items">菜單</NavLink>
						<NavLink href="#story">關於我們</NavLink>
						<NavLink href="#journal">部落格</NavLink>
						<OrderButton href="#login">登入</OrderButton>
					</Box>

					<Box
						sx={{
							display: { xs: 'flex', md: 'none' },
							alignItems: 'center',
						}}
					>
						<IconButton
							onClick={handleDrawerToggle}
							sx={{
								color: theme.palette.text.primary,
								'&:hover': {
									color: theme.palette.primary.main,
								},
								padding: 1,
							}}
						>
							<span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>
								menu
							</span>
						</IconButton>
					</Box>
				</Toolbar>

				{/* 移動端選單 */}
				<Box
					sx={{
						display: { xs: mobileOpen ? 'flex' : 'none', md: 'none' },
						flexDirection: 'column',
						padding: 2,
						backgroundColor: 'rgba(242, 237, 228, 0.98)',
						borderTop: '1px solid rgba(0, 0, 0, 0.1)',
						gap: 2,
					}}
				>
					<NavLink href="#items" onClick={() => setMobileOpen(false)}>
						菜單
					</NavLink>
					<NavLink href="#story" onClick={() => setMobileOpen(false)}>
						關於我們
					</NavLink>
					<NavLink href="#journal" onClick={() => setMobileOpen(false)}>
						部落格
					</NavLink>
					<OrderButton href="#login" onClick={() => setMobileOpen(false)}>
						登入
					</OrderButton>
				</Box>
			</Box>
		</StyledAppBar>
	);
};

export default NavBar;
