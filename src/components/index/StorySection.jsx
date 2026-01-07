import { Box, Container, Typography, Grid, Link, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const SectionBox = styled(Box)(({ theme }) => ({
	padding: theme.spacing(5, 0),
}));

const ImageContainer = styled(Box)(({ theme }) => ({
	borderRadius: theme.spacing(2),
	overflow: 'hidden',
	boxShadow: theme.shadows[8],
	border: `3px solid ${theme.palette.secondary.main}`,
	position: 'relative',
	'& img': {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		display: 'block',
	},
}));

const QuoteBox = styled(Box)(({ theme }) => ({
	position: 'absolute',
	bottom: '-30px',
	left: '15%',
	maxWidth: '320px',
	backgroundColor: theme.palette.background.paper || '#FAEDE7',
	borderLeft: `4px solid ${theme.palette.primary.main}`,
	borderRadius: theme.spacing(1.5),
	padding: theme.spacing(2.25),
	boxShadow: theme.shadows[8],
	display: { xs: 'none', md: 'block' },
}));

const FeatureIconBox = styled(Box)(({ theme }) => ({
	width: '64px',
	height: '64px',
	borderRadius: '50%',
	backgroundColor: `${theme.palette.primary.main}14`,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	marginBottom: theme.spacing(1),
}));

const StorySection = () => {
	const theme = useTheme();

	const features = [
		{ icon: 'restaurant', label: '伝統' },
		{ icon: 'local_florist', label: '新鮮' },
		{ icon: 'handshake', label: '手作り' },
	];

	return (
		<SectionBox component="section" id="story">
			<Container>
				<Grid container spacing={4} alignItems="center">
					<Grid item xs={12} lg={6} sx={{ position: 'relative' }}>
						<ImageContainer>
							<img src="/banner.jpg" alt="Craft" />
						</ImageContainer>
						<QuoteBox>
							<Typography sx={{ fontWeight: 'bold', marginBottom: 0.5, color: theme.palette.primary.main }}>
								&ldquo;本物とは、単なる味ではなく、生き方そのものだ。&rdquo;
							</Typography>
							<Typography variant="caption" sx={{ color: 'text.secondary' }}>
								— 熟練の職人 健次郎
							</Typography>
						</QuoteBox>
					</Grid>

					<Grid item xs={12} lg={6}>
						<Typography
							variant="overline"
							sx={{
								fontWeight: 'bold',
								textTransform: 'uppercase',
								color: theme.palette.primary.main,
								letterSpacing: '0.25em',
								display: 'block',
								marginBottom: 1,
							}}
						>
							私たちの物語
						</Typography>
						<Typography
							variant="h2"
							sx={{
								fontSize: { xs: '2rem', md: '3rem' },
								fontWeight: 'bold',
								marginBottom: 3,
								color: theme.palette.text.primary,
								fontFamily: "'Kaisei Opti', serif",
							}}
						>
							江戸の<span style={{ color: theme.palette.primary.main }}>魂</span>を継ぐ
						</Typography>
						<Typography
							variant="body1"
							sx={{
								color: 'text.secondary',
								marginBottom: 3,
								lineHeight: 1.8,
							}}
						>
							古き良き東京の路地裏で始まった私たちの物語は、素材を尊ぶという約束から生まれました。真の風味は、
							あらゆる要素の自然な本質を尊重することから生まれると信じています。
						</Typography>
						<Typography
							variant="body1"
							sx={{
								color: 'text.secondary',
								marginBottom: 4,
								lineHeight: 1.8,
							}}
						>
							刺身の繊細な切り方から出汁の絶妙なバランスまで、何十年もかけて磨いた技を、あなたの食卓へ。
						</Typography>

						<Box sx={{ display: 'flex', gap: 4, marginBottom: 4 }}>
							{features.map((feature) => (
								<Box key={feature.label} sx={{ textAlign: 'center' }}>
									<FeatureIconBox>
										<span
											className="material-symbols-outlined"
											style={{
												fontSize: '1.5rem',
												color: theme.palette.primary.main,
											}}
										>
											{feature.icon}
										</span>
									</FeatureIconBox>
									<Typography
										variant="caption"
										sx={{
											fontWeight: 'bold',
											color: theme.palette.text.primary,
											display: 'block',
										}}
									>
										{feature.label}
									</Typography>
								</Box>
							))}
						</Box>

						<Link
							href="#journal"
							sx={{
								display: 'inline-block',
								marginTop: 2,
								fontWeight: 'bold',
								textDecoration: 'underline',
								color: theme.palette.text.primary,
								'&:hover': {
									color: theme.palette.primary.main,
								},
							}}
						>
							市場の物語を深く知る
						</Link>
					</Grid>
				</Grid>
			</Container>
		</SectionBox>
	);
};

export default StorySection;

