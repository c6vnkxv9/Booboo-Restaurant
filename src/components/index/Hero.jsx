import { Box, Container, Typography, Button, Stack, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
const heroVideo = '/banner.mp4';
const HeroHeader = styled(Box)({
	position: 'relative',
	color: '#fff',
    marginTop: 'var(--header-height)',
	height: 'calc(100vh - var(--header-height))',
	overflow: 'hidden',
});

const VideoBackground = styled('video')({
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	zIndex: 0,
});

const VideoOverlay = styled(Box)({
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	background: 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.5))',
	zIndex: 1,
});

const HeroTitle = styled(Typography)(({ theme }) => ({
	fontFamily: theme.typography.title.fontFamily,
	fontWeight: theme.typography.title.fontWeight,
	lineHeight: theme.typography.title.lineHeight,
	letterSpacing: theme.typography.title.letterSpacing,
	fontSize: theme.typography.title.fontSize.xs,
	textShadow: '0 6px 24px rgba(0,0,0,0.35)',
	marginBottom: theme.spacing(2),
	[theme.breakpoints.up('md')]: {
		fontSize: theme.typography.title.fontSize.md,
	},
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: '#fff',
	borderRadius: '2px',
	letterSpacing: '0.2em',
	fontWeight: 'bold',
	fontSize: '0.75rem',
	textTransform: 'uppercase',
	padding: theme.spacing(1.5, 3.75),
	transition: 'all 0.3s',
	'&:hover': {
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
	},
}));

const DecorateText = styled(Box)(({ theme }) => ({
	writingMode: 'vertical-rl',
	textOrientation: 'mixed',
	color: 'rgba(255, 255, 255, 0.6)',
	fontFamily: "'Kaisei Opti', serif",
	fontSize: '0.875rem',
	letterSpacing: '0.5em',
	height: '256px',
	borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
	paddingLeft: theme.spacing(1),
}));

const Hero = () => {
	const theme = useTheme();
	
	return (
		<HeroHeader component="header">
			<VideoBackground
				autoPlay
				muted
				playsInline
			>
				<source src={heroVideo} type="video/mp4" />
			</VideoBackground>
			<VideoOverlay />
			<Container
				sx={{
					position: 'relative',
					zIndex: 10,
					maxWidth: '1280px',
					px: 3,
					width: '100%',
					color: '#fff',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: { xs: 'center', md: 'space-between' },
					flexDirection: { xs: 'column', md: 'row' },
					pb: 3,
				}}
			>
				<Box
					sx={{
						maxWidth: '768px',
						mb: { xs: 3, md: 0 },
					}}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 2,
							mb: 4,
						}}
					>
						<Box
							sx={{
								height: '1px',
								width: '48px',
								backgroundColor: 'rgba(255, 255, 255, 0.6)',
							}}
						/>
						<Typography
							sx={{
								fontSize: '0.75rem',
								letterSpacing: '0.3em',
								textTransform: 'uppercase',
								color: 'rgba(255, 255, 255, 0.9)',
								fontWeight: 300,
							}}
						>
							季節探索
						</Typography>
					</Box>
					<HeroTitle variant="h1" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
						一期一會的
						<br />
						<Box
							component="span"
							sx={{
								fontWeight: 500,
								fontStyle: 'italic',
								ml: { xs: 0, md: 3 },
								mt: 0.5,
								display: 'block',
								color: theme.palette.primary.main,
							}}
						>
							旬之味
						</Box>
					</HeroTitle>
					<Typography
						sx={{
							fontSize: { xs: '1rem', md: '1.125rem' },
							color: 'rgba(255, 255, 255, 0.9)',
							mb: 3,
							lineHeight: 1.8,
							fontWeight: 300,
							letterSpacing: '0.05em',
							maxWidth: '576px',
						}}
					>
						體驗四季旬味的無常美感，以匠心與傳承細膩呈現。
						<br />
						每一碗皆蘊藏時間與技藝的故事。
					</Typography>
					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						spacing={1.5}
					>
						<PrimaryButton
							href="#items"
							endIcon={
								<span
									className="material-symbols-outlined"
									style={{ 
										transition: 'transform 0.2s',
										fontSize: '1rem',
									}}
								>
									arrow_forward
								</span>
							}
						>
							瀏覽菜單
						</PrimaryButton>
						<PrimaryButton
							href="#menu"
							sx={{
								backgroundColor: 'transparent',
								color: '#fff',
								border: '2px solid #fff',
								'&:hover': {
									backgroundColor: 'rgba(255, 255, 255, 0.1)',
									border: '2px solid #fff',
								},
							}}
						>
							加入會員
						</PrimaryButton>
					</Stack>
				</Box>
				<DecorateText sx={{ display: { xs: 'none', md: 'block' } }}>
					二十四節氣 七十二候
				</DecorateText>
			</Container>
		</HeroHeader>
	);
};

export default Hero;
