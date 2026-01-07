const StorySection = ({ palette }) => (
	<section id="story" className="py-5">
		<div className="container">
			<div className="row g-4 align-items-center">
				<div className="col-lg-6 position-relative">
					<div className="rounded-4 overflow-hidden shadow-lg border border-3" style={{ borderColor: palette.wood }}>
						<img
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuARqLmCeoVkO01eSzwPvTzCxuewBcoT58wQplJ4WuD4jwCRyp1mS7-Fi55Gfc9MMS7h-AC963ZpJFPcHafcd8YD0bblN-e2ubXupsQ-JFF1nxkmFXYwYFGlpYd7WFObeGK_jEBs5cRUubn_VUW7JxhjdSDWNKc7XQOi3blVv00xok3q54OfV1-7VsltMC0e8nylntl822mFvjY7PYMzJzDb4AYfJVJCV3vT1ImSZVAztYT_lpTDuDrRxE5W4Wa6ymCOtfeKNHDyiYOR"
							alt="Craft"
							className="w-100 h-100 object-fit-cover"
						/>
					</div>
					<div
						className="position-absolute translate-middle-x shadow-lg d-none d-md-block"
						style={{
							bottom: '-30px',
							left: '15%',
							maxWidth: '320px',
							backgroundColor: palette.paper,
							borderLeft: `4px solid ${palette.clay}`,
							borderRadius: '12px',
							padding: '18px',
						}}
					>
						<p className="fw-bold mb-1" style={{ color: palette.ink }}>
							&ldquo;本物とは、単なる味ではなく、生き方そのものだ。&rdquo;
						</p>
						<small className="text-muted">— 熟練の職人 健次郎</small>
					</div>
				</div>

				<div className="col-lg-6">
					<span className="fw-bold text-uppercase" style={{ color: palette.clay, letterSpacing: '0.25em' }}>
						私たちの物語
					</span>
					<h2 className="display-5 fw-bold mb-3" style={{ color: palette.ink, fontFamily: "'Kaisei Opti', serif" }}>
						江戸の<span style={{ color: palette.clay }}>魂</span>を継ぐ
					</h2>
					<p className="text-muted fs-6 mb-3" style={{ lineHeight: 1.8 }}>
						古き良き東京の路地裏で始まった私たちの物語は、素材を尊ぶという約束から生まれました。真の風味は、
						あらゆる要素の自然な本質を尊重することから生まれると信じています。
					</p>
					<p className="text-muted fs-6" style={{ lineHeight: 1.8 }}>
						刺身の繊細な切り方から出汁の絶妙なバランスまで、何十年もかけて磨いた技を、あなたの食卓へ。
					</p>

					<div className="d-flex gap-4 mt-4">
						{[
							{ icon: 'restaurant', label: '伝統' },
							{ icon: 'local_florist', label: '新鮮' },
							{ icon: 'handshake', label: '手作り' },
						].map((feature) => (
							<div key={feature.label} className="text-center">
								<div
									className="d-flex align-items-center justify-content-center rounded-circle mb-2"
									style={{
										width: '64px',
										height: '64px',
										backgroundColor: 'rgba(166,61,64,0.08)',
									}}
								>
									<span className="material-symbols-outlined fs-3" style={{ color: palette.clay }}>
										{feature.icon}
									</span>
								</div>
								<div className="fw-bold small" style={{ color: palette.ink }}>
									{feature.label}
								</div>
							</div>
						))}
					</div>

					<a className="d-inline-block mt-4 fw-bold text-decoration-underline" style={{ color: palette.ink }} href="#journal">
						市場の物語を深く知る
					</a>
				</div>
			</div>
		</div>
	</section>
);

export default StorySection;

