import PropTypes from 'prop-types';

const Hero = ({ palette, heroImage }) => (
	<header
		className="position-relative text-white"
		style={{
			minHeight: '90vh',
			backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.25)), url(${heroImage})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			paddingTop: '120px',
		}}
	>
		<div className="container position-relative h-100 d-flex align-items-center py-5">
			<div className="d-flex flex-column align-items-start justify-content-center col-12 col-lg-9 col-xl-7 gap-3">
				<div
					className="border-start border-4 ps-4 mb-3"
					style={{ borderColor: palette.clay }}
				>
					<p
						className="text-uppercase mb-0 fw-semibold"
						style={{ letterSpacing: '0.2em' }}
					>
						Japanese Craftsmanship
					</p>
				</div>
				<h1
					className="fw-bold mb-3 lh-tight"
					style={{
						fontFamily: "'Kaisei Opti', serif",
						fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
						textShadow: '0 6px 24px rgba(0,0,0,0.35)',
					}}
				>
					一期一會的
					<br />
					<span style={{ color: palette.clay }}>旬之味</span>
				</h1>
				<p
					className="fs-5 mb-4 text-light"
					style={{ maxWidth: '640px', lineHeight: 1.7 }}
				>
					Experience the ephemeral beauty of seasonal ingredients, crafted with
					dedication and tradition. Each bowl tells a story of patience and
					mastery.
				</p>
				<div className="d-flex flex-column flex-sm-row gap-3">
					<a
						className="btn btn-lg px-4 py-3 text-white fw-bold shadow d-flex align-items-center gap-2"
						style={{
							backgroundColor: palette.clay,
							borderRadius: '4px',
							letterSpacing: '0.08em',
						}}
						href="#items"
					>
						立即選購
						<span
							className="material-symbols-outlined"
							style={{ transition: 'transform 0.2s' }}
						>
							arrow_forward
						</span>
					</a>
					<a
						className="btn btn-lg px-4 py-3 fw-bold shadow d-flex align-items-center justify-content-center"
						style={{
							border: '2px solid #fff',
							color: '#fff',
							borderRadius: '4px',
							letterSpacing: '0.08em',
							backgroundColor: 'transparent',
						}}
						href="#menu"
					>
						View Menu
					</a>
				</div>
			</div>
			<div className="position-absolute bottom-0 start-50 translate-middle-x pb-3">
				<span className="material-symbols-outlined fs-1 text-white opacity-75">
					arrow_downward
				</span>
			</div>
		</div>
	</header>
);

Hero.propTypes = {
	palette: PropTypes.shape({
		clay: PropTypes.string.isRequired,
	}).isRequired,
	heroImage: PropTypes.string.isRequired,
};

export default Hero;
