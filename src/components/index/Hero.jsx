import { Box, Container, Typography, Button, Stack, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
const heroImage = '/jp_patten2.jpg';
const HeroHeader = styled(Box)(({ heroImage }) => ({
	position: 'relative',
	color: '#fff',
    marginTop: '80px',
	height: '',
	backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.25)), url(${heroImage})`,
	backgroundSize: 'cover',
	backgroundPosition: 'center',
}));

const BorderAccent = styled(Box)(({ theme }) => ({
	borderLeft: `4px solid ${theme.palette.secondary.main}`,
	paddingLeft: theme.spacing(2),
	marginBottom: theme.spacing(3),
}));

const HeroTitle = styled(Typography)({
	fontFamily: "'Kaisei Opti', serif",
	fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
	textShadow: '0 6px 24px rgba(0,0,0,0.35)',
	fontWeight: 'bold',
	lineHeight: 'tight',
	marginBottom: theme => theme.spacing(3),
});

const PrimaryButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: '#fff',
	borderRadius: '4px',
	letterSpacing: '0.08em',
	fontWeight: 'bold',
	padding: theme.spacing(1.5, 2),
	boxShadow: theme.shadows[4],
	'&:hover': {
		backgroundColor: theme.palette.primary.main,
		opacity: 0.9,
	},
}));

const OutlineButton = styled(Button)({
	border: '2px solid #fff',
	color: '#fff',
	borderRadius: '4px',
	letterSpacing: '0.08em',
	fontWeight: 'bold',
	backgroundColor: 'transparent',
	padding: theme => theme.spacing(1.5, 2),
	boxShadow: theme => theme.shadows[4],
	'&:hover': {
		border: '2px solid #fff',
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
	},
});

const ScrollIndicator = styled(Box)({
	position: 'absolute',
	bottom: 0,
	left: '50%',
	transform: 'translateX(-50%)',
	paddingBottom: theme => theme.spacing(3),
});

const Hero = () => {
	const theme = useTheme();
	
	return (
		<HeroHeader component="header" heroImage={heroImage}>
			<Container
				sx={{
					position: 'relative',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					py: 5,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						justifyContent: 'center',
						width: { xs: '100%', lg: '75%', xl: '58.33%' },
						gap: 3,
					}}
				>
					<BorderAccent>
						<Typography
							variant="body2"
							sx={{
								textTransform: 'uppercase',
								marginBottom: 0,
								fontWeight: 600,
								letterSpacing: '0.2em',
							}}
						>
							日本料理
						</Typography>
					</BorderAccent>
					<HeroTitle variant="h1">
						一期一會的
						<br />
						<span style={{ color: theme.palette.primary.main }}>旬之味</span>
					</HeroTitle>
					<Typography
						variant="h6"
						sx={{
							maxWidth: '640px',
							lineHeight: 1.7,
							color: 'rgba(255, 255, 255, 0.9)',
							marginBottom: 4,
						}}
					>
						體驗四季旬味的無常美感，以匠心與傳承細膩呈現。
						每一碗皆蘊藏時間與技藝的故事。
					</Typography>
					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						spacing={3}
					>
						<PrimaryButton
							href="#items"
							size="large"
							endIcon={
								<span
									className="material-symbols-outlined"
									style={{ transition: 'transform 0.2s' }}
								>
									arrow_forward
								</span>
							}
						>
							瀏覽菜單
						</PrimaryButton>
						<OutlineButton href="#menu" size="large">
							加入會員
						</OutlineButton>
					</Stack>
				</Box>
				<ScrollIndicator>
					<span
						className="material-symbols-outlined"
						style={{
							fontSize: '3rem',
							color: 'rgba(255, 255, 255, 0.75)',
						}}
					>
						arrow_downward
					</span>
				</ScrollIndicator>
			</Container>
		</HeroHeader>
	);
};

export default Hero;
