import PropTypes from 'prop-types';
import { Box, Container, Typography, Grid, Avatar, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const REVIEWS = [
	{
		name: 'John Doe',
		rating: 5,
		comment: 'This is a test review',
	},
{
		name: 'John Doe',
		rating: 5,
		comment: 'This is a test review',
	},
	{
		name: 'John Doe',
		rating: 5,
		comment: 'This is a test review',
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
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, color: theme.palette.secondary.main, fontSize: '0.75rem', marginBottom: 3 }}>
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
				<span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
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
							fontSize: { xs: '1.875rem', md: '2.25rem' },
							fontWeight: 'bold',
							color: theme.palette.text.primary,
							fontFamily: "'Kaisei Opti', serif",
						}}
					>
						お客様の声
					</Typography>
				</Box>

				<Grid container spacing={4}>
					{REVIEWS.map((t, index) => (
						<Grid item xs={12} md={4} key={t.name || t.id || index}>
							<TestimonialCard>
								<StarRating rating={t.rating} />
								<Typography
									sx={{
										fontStyle: 'italic',
										marginBottom: 3,
										color: theme.palette.text.secondary || 'rgba(0, 0, 0, 0.6)',
										lineHeight: 1.75,
										fontFamily: 'serif',
									}}
								>
									&ldquo;{t.quote || t.comment}&rdquo;
								</Typography>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										borderTop: `1px solid ${theme.palette.divider || 'rgba(0, 0, 0, 0.1)'}`,
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
						</Grid>
					))}
				</Grid>
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
		})
	),
};

export default TestimonialsSection;

