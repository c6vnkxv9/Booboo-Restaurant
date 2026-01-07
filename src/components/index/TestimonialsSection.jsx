const renderStars = (score) => {
	const full = Math.floor(score);
	const half = score % 1 >= 0.5;
	return (
		<div className="d-flex align-items-center gap-1 text-warning">
			{Array.from({ length: full }).map((_, idx) => (
				<span key={`full-${idx}`} className="material-symbols-outlined" style={{ fontSize: '18px' }}>
					star
				</span>
			))}
			{half && (
				<span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
					star_half
				</span>
			)}
		</div>
	);
};

const TestimonialsSection = ({ palette, testimonials }) => (
	<section className="py-5">
		<div className="container">
			<div className="text-center mb-4">
				<span className="material-symbols-outlined fs-1 mb-3" style={{ color: palette.earth }}>
					format_quote
				</span>
				<h2 className="display-6 fw-bold" style={{ color: palette.ink }}>
					お客様の声
				</h2>
			</div>

			<div className="row g-4">
				{testimonials.map((t) => (
					<div key={t.name} className="col-12 col-md-4">
						<div
							className="h-100 p-4 rounded-4 shadow-sm"
							style={{
								backgroundColor: 'rgba(107,66,38,0.08)',
								border: `1px solid ${palette.clay}33`,
							}}
						>
							<div className="d-flex align-items-center mb-3">
								<img
									src={t.image}
									alt={t.name}
									className="rounded-circle me-3"
									style={{
										width: '56px',
										height: '56px',
										objectFit: 'cover',
										border: `2px solid ${palette.clay}`,
									}}
								/>
								<div>
									<div className="fw-bold" style={{ color: palette.ink }}>
										{t.name}
									</div>
									{renderStars(t.rating)}
								</div>
							</div>
							<p className="fst-italic mb-0" style={{ color: palette.shadow }}>
								&ldquo;{t.quote}&rdquo;
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	</section>
);

export default TestimonialsSection;

