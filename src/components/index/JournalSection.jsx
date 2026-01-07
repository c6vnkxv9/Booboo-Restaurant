const JournalSection = ({ palette, blogs }) => (
	<section id="journal" className="py-5">
		<div className="container">
			<div className="d-flex flex-column flex-md-row justify-content-between align-items-end mb-4">
				<div>
					<h2 className="display-6 fw-bold" style={{ color: palette.ink }}>
						職人日誌
					</h2>
					<p className="text-muted">レシピ、物語、そして季節の便り。</p>
				</div>
				<a className="fw-bold text-decoration-none" style={{ color: palette.clay }} href="#">
					全ての日誌を見る
					<span className="material-symbols-outlined align-middle ms-1">arrow_forward</span>
				</a>
			</div>

			<div className="row g-4">
				{blogs.map((blog) => (
					<div key={blog.title} className="col-12 col-md-4">
						<div
							className="card h-100 border-0 shadow-sm"
							style={{
								backgroundColor: 'rgba(255,255,255,0.85)',
								borderRadius: '14px',
							}}
						>
							<div className="position-relative">
								<div className="ratio ratio-16x9">
									<img src={blog.image} alt={blog.title} className="w-100 h-100 object-fit-cover" />
								</div>
								<span className="badge position-absolute top-0 end-0 m-3 text-uppercase fw-bold" style={{ backgroundColor: palette.wood }}>
									{blog.tag}
								</span>
							</div>
							<div className="card-body d-flex flex-column">
								<small className="text-muted fw-semibold">{blog.date}</small>
								<h5 className="fw-bold mt-2" style={{ color: palette.ink }}>
									{blog.title}
								</h5>
								<p className="text-muted small mb-3">
									旬の素材や文化を紐解く職人の視点で、味わい深い日常をお届けします。
								</p>
								<a className="text-decoration-none fw-bold mt-auto" style={{ color: palette.clay }} href="#">
									続きを読む
								</a>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	</section>
);

export default JournalSection;

