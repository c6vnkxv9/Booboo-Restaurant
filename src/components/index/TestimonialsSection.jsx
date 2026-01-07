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
	padding: theme.spacing(5, 0),
}));

const TestimonialCard = styled(Box)(({ theme }) => ({
	height: '100%',
	padding: theme.spacing(4),
	borderRadius: theme.spacing(2),
	boxShadow: theme.shadows[1],
	backgroundColor: 'rgba(107,66,38,0.08)',
	border: `1px solid ${theme.palette.primary.main}33`,
}));

const StarRating = ({ rating }) => {
	const full = Math.floor(rating);
	const half = rating % 1 >= 0.5;

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#ffc107' }}>
			{Array.from({ length: full }).map((_, idx) => (
				<span
					key={`full-${idx}`}
					className="material-symbols-outlined"
					style={{ fontSize: '18px' }}
				>
					star
				</span>
			))}
			{half && (
				<span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
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
		<SectionBox component="section">
			<Container>
				<Box sx={{ textAlign: 'center', marginBottom: 4 }}>
					<span
						className="material-symbols-outlined"
						style={{
							fontSize: '3rem',
							marginBottom: theme.spacing(3),
							color: theme.palette.secondary.main,
							display: 'block',
						}}
					>
						format_quote
					</span>
					<Typography
						variant="h3"
						sx={{
							fontWeight: 'bold',
							color: theme.palette.text.primary,
						}}
					>
						お客様の声
					</Typography>
				</Box>

				<Grid container spacing={4}>
					{REVIEWS.map((t) => (
						<Grid item xs={12} md={4} key={t.name || t.id}>
							<TestimonialCard>
								<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
									<Avatar
										src={t.image}
										alt={t.name}
										sx={{
											width: 56,
											height: 56,
											marginRight: 2,
											border: `2px solid ${theme.palette.primary.main}`,
										}}
									/>
									<Box>
										<Typography
											sx={{
												fontWeight: 'bold',
												color: theme.palette.text.primary,
												marginBottom: 0.5,
											}}
										>
											{t.name}
										</Typography>
										<StarRating rating={t.rating} />
									</Box>
								</Box>
								<Typography
									sx={{
										fontStyle: 'italic',
										marginBottom: 0,
										color: theme.palette.text.secondary || 'rgba(0, 0, 0, 0.6)',
									}}
								>
									&ldquo;{t.quote || t.comment}&rdquo;
								</Typography>
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

