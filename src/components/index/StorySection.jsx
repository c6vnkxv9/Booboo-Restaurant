import {
	Box,
	Container,
	Typography,
	Grid,
	Link,
	useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const SectionBox = styled(Box)(({ theme }) => ({
	padding: theme.spacing(12, 0),
	overflow: 'hidden',
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: '100%',
	'&:hover .border-decoration': {
		transform: 'translate(8px, 8px)',
	},
}));

const BorderDecoration = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '16px',
	left: '16px',
	width: '100%',
	height: '100%',
	border: `2px solid ${theme.palette.primary.main}30`,
	zIndex: 0,
	transition: 'transform 0.5s ease',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
	position: 'relative',
	zIndex: 10,
	borderRadius: theme.spacing(0.5),
	overflow: 'hidden',
	boxShadow: theme.shadows[10],
	'& img': {
		width: '100%',
		height: 'auto',
		objectFit: 'cover',
		display: 'block',
		transition: 'transform 0.7s ease',
	},
	'&:hover img': {
		transform: 'scale(1.05)',
	},
}));

const QuoteBox = styled(Box)(({ theme }) => ({
	position: 'absolute',
	bottom: '24px',
	left: '24px',
	maxWidth: '320px',
	backgroundColor: theme.palette.background.paper,
	borderLeft: `4px solid ${theme.palette.primary.main}`,
	borderRadius: theme.spacing(0.5),
	padding: theme.spacing(3),
	boxShadow: theme.shadows[8],
	display: 'none',
	[theme.breakpoints.up('md')]: {
		display: 'block',
	},
}));

const FeatureIconBox = styled(Box)(({ theme }) => ({
	width: '48px',
	height: '48px',
	borderRadius: '50%',
	backgroundColor: `${theme.palette.primary.main}1A`,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	margin: '0 auto',
	marginBottom: theme.spacing(1),
}));

const StorySection = () => {
	const theme = useTheme();

	const features = [
		{ icon: 'restaurant', label: '#傳統風味' },
		{ icon: 'local_florist', label: '#新鮮直送' },
		{ icon: 'handshake', label: '#客戶重視' },
	];

	return (
		<SectionBox component="section" id="story">
			<Container maxWidth="lg">
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', lg: 'row' },
						alignItems: 'center',
						gap: 8,
					}}
				>
					<Box component="aside" sx={{ width: { xs: '100%', lg: '60%' } }}>
						<ImageWrapper>
							<BorderDecoration className="border-decoration" />
							<ImageContainer>
								<img src="/banner.jpg" alt="Craft" />
								<QuoteBox>
									<Typography
										sx={{
											fontWeight: 'bold',
											marginBottom: 1,
											color: theme.palette.primary.main,
											fontSize: '0.875rem',
											fontFamily: 'serif',
										}}
									>
										&ldquo;沒什麼大道理，只要看到客人吃得乾乾淨淨，就是我最快樂的事。&rdquo;
									</Typography>
									<Typography
										variant="caption"
										sx={{
											color: 'text.secondary',
											fontSize: '0.75rem',
										}}
									>
										— 料理長 健次郎
									</Typography>
								</QuoteBox>
							</ImageContainer>
						</ImageWrapper>
					</Box>
					<Box component="main" sx={{ width: { xs: '100%', lg: '40%' } }}>
						<Typography
							variant="overline"
							sx={{
								color: theme.palette.primary.main,
								display: 'block',
								marginBottom: 2,
								fontSize: '0.75rem',
								fontWeight: 'bold',
								letterSpacing: '0.3em',
							}}
						>
							我們的料理日常
						</Typography>
						<Typography
							variant="h2"
							sx={{
								marginBottom: 3,
								color: theme.palette.text.primary,
								fontSize: { xs: '2rem', md: '2.25rem' },
								fontWeight: 'bold',
								lineHeight: 1.3,
								fontFamily: 'serif',
							}}
						>
							堅持手作，傳遞一份純粹的
							<span style={{ color: theme.palette.primary.main }}>初心。</span>
						</Typography>
						<Typography
							variant="body1"
							sx={{
								color: 'text.secondary',
								marginBottom: 3,
								lineHeight: 1.75,
								fontSize: '0.875rem',
								textAlign: 'justify',
								letterSpacing: '0.05em',
							}}
						>
							從古老巷弄的職人精神出發，我們堅持最純粹的味道。
							沒有華麗的擺盤，只有對食材的尊重。從拉麵湯頭的熬製到壽司飯的溫度，每一道菜都經過幾十年的技術磨練，只為了呈現在您家門口的餐桌上。
						</Typography>
						<Typography
							variant="body1"
							sx={{
								color: 'text.secondary',
								marginBottom: 5,
								lineHeight: 1.75,
								fontSize: '0.875rem',
								textAlign: 'justify',
								letterSpacing: '0.05em',
							}}
						>
							從拉麵的湯頭到味噌湯的餘韻，我們想把這份職人精神，變成您餐桌上最平常的幸福。
						</Typography>

						<Box
							sx={{
								display: 'flex',
								gap: 4,
								marginBottom: 5,
								borderTop: '1px solid',
								borderBottom: '1px solid',
								borderColor: 'divider',
								paddingY: 3,
							}}
						>
							{features.map((feature) => (
								<Box key={feature.label} sx={{ textAlign: 'center' }}>
									<FeatureIconBox>
										<span
											className="material-symbols-outlined"
											style={{
												fontSize: '1.25rem',
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
											fontSize: '0.75rem',
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
								fontWeight: 'bold',
								fontSize: '0.875rem',
								borderBottom: `1px solid ${theme.palette.primary.main}`,
								paddingBottom: 0.5,
								color: theme.palette.primary.main,
								textDecoration: 'none',
								'&:hover': {
									color: theme.palette.primary.dark,
									borderBottomColor: theme.palette.primary.dark,
								},
								transition: 'all 0.3s ease',
							}}
						>
							了解更多故事
						</Link>
					</Box>
				</Box>
			</Container>
		</SectionBox>
	);
};

export default StorySection;
