import PropTypes from 'prop-types';
import { Box, Container, Typography, Avatar, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const REVIEWS = [
	{
		id: 1,
		name: '佐藤健',
		rating: 5,
		comment: '魚料極其新鮮，醋飯的酸度與溫度掌握得恰到好處。',
	},
	{
		name: 'Emily Chen',
		rating: 4,
		comment:
			'豚骨湯頭極其濃郁卻不膩口，手打麵條彈牙吸汁。店內氣氛充滿活力的日式喧囂感，配上一杯生啤酒，彷彿置身於新宿街頭。',
	},
	{
		name: '林先生',
		rating: 5,
		comment:
			'餐點如藝術品般精緻，陶器皿的選用也非常講究。服務完美詮釋了「御持成」的精神，店員觀察入微且專業，是慶祝重要紀念日的首選。',
	},
];
const SectionBox = styled(Box)(({ theme }) => ({
	padding: theme.spacing(24, 0),
	borderTop: `1px solid ${theme.palette.divider || 'rgba(0, 0, 0, 0.1)'}`,
}));
const PatternBackground = styled(Box)({
	position: 'absolute',
	inset: 0,
	backgroundImage: 'url(/japanese-paper.jpg)',
	backgroundRepeat: 'repeat',
	backgroundSize: '300px 300px',
	opacity: 0.5,
	pointerEvents: 'none',
	zIndex: -1,
});
const TestimonialCard = styled(Box)(({ theme }) => ({
	height: '100%',
	padding: theme.spacing(8),
	backgroundColor: theme.palette.background.paper || '#FAEDE7',
	border: `1px solid ${theme.palette.divider || 'rgba(0, 0, 0, 0.1)'}`,
	position: 'relative',
	transition: 'all 0.3s',
	'&:hover': {
		boxShadow: theme.shadows[4],
	},
}));

const StarRating = ({ rating }) => {
	const theme = useTheme();
	const full = Math.floor(rating);
	const half = rating % 1 >= 0.5;

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 0.25,
				color: theme.palette.secondary.main,
				fontSize: '0.75rem',
				marginBottom: 3,
			}}
		>
			{Array.from({ length: full }).map((_, idx) => (
				<span
					key={`full-${idx}`}
					className="material-symbols-outlined"
					style={{ fontSize: '14px', fill: 'currentColor' }}
				>
					star
				</span>
			))}
			{half && (
				<span
					className="material-symbols-outlined"
					style={{ fontSize: '14px' }}
				>
					star_half
				</span>
			)}
		</Box>
	);
};

StarRating.propTypes = {
	rating: PropTypes.number.isRequired,
};

const TestimonialsSection = () => {
	const theme = useTheme();

	return (
		<SectionBox component="section" sx={{ position: 'relative' }}>
			<PatternBackground />
			<Container maxWidth="xl" sx={{ px: { xs: 3, lg: 6 } }}>
				<Box sx={{ textAlign: 'center', marginBottom: 16 }}>
					<span
						className="material-symbols-outlined"
						style={{
							fontSize: '2.5rem',
							marginBottom: theme.spacing(4),
							color: `${theme.palette.secondary.main}80`,
							display: 'block',
						}}
					>
						format_quote
					</span>
					<Typography
						variant="h2"
						sx={{
							color: theme.palette.text.primary,
						}}
					>
						謝謝你們，讓這裡充滿暖意
					</Typography>
					<Typography
						variant="subtitle1"
						sx={{
							fontStyle: 'italic',
							marginBottom: 3,
							color: theme.palette.text.secondary || 'rgba(0, 0, 0, 0.6)',
							fontFamily: 'serif',
						}}
					>
						來自餐桌上的真實迴響
					</Typography>
				</Box>

				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						flexWrap: { xs: 'nowrap', md: 'wrap' },
						gap: 4,
					}}
				>
					{REVIEWS.map((t, index) => (
						<Box
							key={t.name || t.id || index}
							sx={{
								minWidth: 0,
								width: { xs: '100%', md: 'calc(33.333% - 32px)' },
								flex: { xs: '1 1 auto', md: '1 1 calc(33.333% - 32px)' },
								maxWidth: { md: 'calc(33.333% - 32px)' },
							}}
						>
							<TestimonialCard>
								<StarRating rating={t.rating} />
								<Typography
									sx={{
										fontStyle: 'italic',
										marginBottom: 3,
										color: theme.palette.text.secondary || 'rgba(0, 0, 0, 0.6)',
										lineHeight: 1.75,
										fontFamily: 'serif',
										overflowWrap: 'anywhere',
										wordBreak: 'break-word',
									}}
								>
									{t.quote || t.comment}
								</Typography>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										borderTop: `1px solid ${
											theme.palette.divider || 'rgba(0, 0, 0, 0.1)'
										}`,
										paddingTop: 2,
									}}
								>
									<Avatar
										src={t.image}
										alt={t.name}
										sx={{
											width: 40,
											height: 40,
											marginRight: 1.5,
											filter: 'grayscale(100%)',
										}}
									/>
									<Typography
										sx={{
											fontWeight: 'bold',
											fontSize: '0.875rem',
											color: theme.palette.text.primary,
											textTransform: 'uppercase',
											letterSpacing: '0.1em',
											fontFamily: "'Kaisei Opti', serif",
										}}
									>
										{t.name}
									</Typography>
								</Box>
							</TestimonialCard>
						</Box>
					))}
				</Box>
			</Container>
		</SectionBox>
	);
};

TestimonialsSection.propTypes = {
	testimonials: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			rating: PropTypes.number.isRequired,
			quote: PropTypes.string,
			comment: PropTypes.string,
			image: PropTypes.string,
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		}),
	),
};

export default TestimonialsSection;
