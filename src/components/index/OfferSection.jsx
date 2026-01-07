import { Box, Container, Typography, Button, useTheme } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const bounce = keyframes`
	0%, 100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
`;

const SectionBox = styled(Box)(({ theme }) => ({
	padding: theme.spacing(20, 0),
	backgroundColor: theme.palette.primary.main,
	color: '#fff',
	position: 'relative',
	overflow: 'hidden',
}));

const PatternBackground = styled(Box)({
	position: 'absolute',
	inset: 0,
	backgroundImage: 'url(/jp_patten1.jpg)',
	backgroundSize: 'contain',
	backgroundRepeat: 'repeat',
	opacity: 0.2,
	zIndex: 0,
});

const ContentBox = styled(Box)(({ theme }) => ({
	maxWidth: '896px',
	margin: '0 auto',
	border: `4px double ${theme.palette.secondary.main}40`,
	padding: theme.spacing(4, 3),
	[theme.breakpoints.up('md')]: {
		padding: theme.spacing(6, 4),
	},
	backgroundColor: `${theme.palette.primary.main}CC`,
	backdropFilter: 'blur(4px)',
	textAlign: 'center',
	position: 'relative',
	zIndex: 10,
}));

const IconBox = styled(Box)(({ theme }) => ({
	fontSize: '3rem',
	marginBottom: theme.spacing(4),
	color: theme.palette.primary.main,
	animation: `${bounce} 2s infinite`,
	[theme.breakpoints.up('md')]: {
		fontSize: '3.5rem',
	},
}));

const CouponContainer = styled(Box)(({ theme }) => ({
	display: 'inline-flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: theme.spacing(2),
	backgroundColor: '#fff',
	color: theme.palette.primary.main,
	padding: theme.spacing(1),
	borderRadius: '4px',
	boxShadow: theme.shadows[8],
	[theme.breakpoints.up('md')]: {
		flexDirection: 'row',
	},
}));

const CouponCode = styled(Box)(({ theme }) => ({
	padding: theme.spacing(1, 3),
	border: `2px dashed ${theme.palette.secondary.main}4D`,
	fontFamily: 'monospace',
	fontSize: '1.25rem',
	fontWeight: 'bold',
	letterSpacing: '0.2em',
	backgroundColor: 'rgba(0,0,0,0.05)',
}));

const OfferSection = () => {
	const theme = useTheme();

	return (
		<SectionBox component="section" id="cta">
			<PatternBackground />
			<Container sx={{ position: 'relative', zIndex: 10 }}>
				<ContentBox>
					<IconBox>
						<span className="material-symbols-outlined">local_offer</span>
					</IconBox>
					<Typography
						variant="h3"
						sx={{
							fontSize: { xs: '1.875rem', md: '3rem' },
							fontWeight: 'bold',
							marginBottom: 3,
							fontFamily: "'Kaisei Opti', serif",
						}}
					>
						初回のお客様へ、歓迎の印
					</Typography>
					<Typography
						variant="h6"
						sx={{
							fontSize: { xs: '1.125rem', md: '1.25rem' },
							fontWeight: 300,
							marginBottom: 4,
							color: 'rgba(255,255,255,0.8)',
							lineHeight: 1.75,
						}}
					>
						暖簾をくぐってくださった感謝を込めて。
						<br />
						初めてのお買い物が少し特別なものになりますように。
					</Typography>
					<CouponContainer>
						<CouponCode>WELCOME50</CouponCode>
						<Button
							variant="contained"
							sx={{
								backgroundColor: theme.palette.primary.main,
								color: '#fff',
								fontWeight: 'bold',
								padding: theme.spacing(1.5, 4),
								boxShadow: theme.shadows[4],
								'&:hover': {
									backgroundColor: theme.palette.secondary.main,
									boxShadow: theme.shadows[6],
								},
							}}
						>
							¥50引きクーポンを使う
						</Button>
					</CouponContainer>
				</ContentBox>
			</Container>
		</SectionBox>
	);
};

export default OfferSection;

