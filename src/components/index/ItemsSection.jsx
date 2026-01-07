const ItemsSection = ({ palette, items }) => (
	<section id="items" className="py-5">
		<div className="container">
			<div className="text-center mb-4">
				<span className="fw-bold text-uppercase" style={{ color: palette.clay, letterSpacing: '0.25em' }}>
					屋台の品々
				</span>
				<h2 className="display-6 fw-bold mt-2" style={{ color: palette.ink }}>
					職人の逸品
				</h2>
				<div
					className="mx-auto mt-3"
					style={{
						width: '80px',
						height: '4px',
						backgroundColor: palette.earth,
						borderRadius: '8px',
					}}
				></div>
			</div>

			<div className="row g-4">
				{items.map((item) => (
					<div key={item.title} className="col-12 col-sm-6 col-lg-3">
						<div
							className="card h-100 shadow-sm border-0 position-relative overflow-hidden"
							style={{
								backgroundColor: 'rgba(255,255,255,0.8)',
								borderRadius: '14px',
							}}
						>
							<span
								className="badge position-absolute top-0 start-0 m-3 text-uppercase fw-bold"
								style={{
									backgroundColor: item.badgeColor,
									color: '#fff',
									borderRadius: '999px',
									letterSpacing: '0.08em',
								}}
							>
								{item.badge}
							</span>
							<div className="ratio ratio-4x3">
								<img src={item.image} alt={item.title} className="w-100 h-100 object-fit-cover" />
							</div>
							<div className="card-body d-flex flex-column gap-2">
								<h5 className="card-title fw-bold" style={{ color: palette.ink }}>
									{item.title}
								</h5>
								<p className="text-muted small mb-0" style={{ minHeight: '48px' }}>
									{item.desc}
								</p>
								<div className="d-flex justify-content-between align-items-center mt-2">
									<span className="fw-bold fs-5" style={{ color: palette.clay }}>
										{item.price}
									</span>
									<button className="btn btn-sm btn-outline-dark rounded-circle">
										<span className="material-symbols-outlined">add_shopping_cart</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="text-center mt-4">
				<a className="fw-bold text-decoration-none" style={{ color: palette.ink }} href="#cta">
					全ての品を見る
					<span className="material-symbols-outlined align-middle ms-1" style={{ fontSize: '18px' }}>
						arrow_forward_ios
					</span>
				</a>
			</div>
		</div>
	</section>
);

export default ItemsSection;

