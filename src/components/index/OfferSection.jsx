const OfferSection = ({ palette }) => (
	<section
		id="cta"
		className="py-5"
		style={{
			background: `linear-gradient(135deg, ${palette.ink} 0%, ${palette.wood} 100%)`,
			color: '#fff',
		}}
	>
		<div className="container">
			<div className="row g-4 align-items-center">
				<div className="col-lg-6">
					<div
						className="p-4 rounded-4 shadow-lg h-100"
						style={{
							backgroundColor: 'rgba(255,255,255,0.08)',
							border: '1px solid rgba(255,255,255,0.15)',
						}}
					>
						<div className="d-flex justify-content-between align-items-start mb-3">
							<div>
								<span className="badge rounded-pill text-uppercase fw-bold mb-2" style={{ backgroundColor: palette.earth }}>
									新規のお客様へ
								</span>
								<h3 className="h3 fw-bold mb-2">歓迎の贈り物</h3>
								<p className="text-white-50 mb-0">初回注文で特別割引が適用されます。</p>
							</div>
							<div
								className="d-flex align-items-center justify-content-center rounded-circle shadow"
								style={{
									width: '80px',
									height: '80px',
									backgroundColor: '#fff',
									color: palette.clay,
									fontWeight: 700,
									fontSize: '22px',
									transform: 'rotate(6deg)',
								}}
							>
								¥50
							</div>
						</div>
						<div
							className="d-flex justify-content-between align-items-center p-3 rounded-3 mb-3"
							style={{
								border: '2px dashed rgba(255,255,255,0.2)',
								backgroundColor: 'rgba(0,0,0,0.15)',
							}}
						>
							<span className="fw-bold fs-5" style={{ letterSpacing: '0.2em' }}>
								WELCOME50
							</span>
							<button className="btn btn-sm btn-outline-light">コピー</button>
						</div>
						<button className="btn btn-light w-100 fw-bold py-2" style={{ color: palette.ink }}>
							¥50割引クーポンを受け取る
						</button>
					</div>
				</div>

				<div className="col-lg-6">
					<div className="text-center text-lg-start">
						<div className="d-flex justify-content-center justify-content-lg-start align-items-center gap-2 text-warning mb-3">
							<span className="material-symbols-outlined">timer</span>
							<span className="fw-bold text-uppercase">限定セール終了まで</span>
						</div>
						<h3 className="display-5 fw-bold mb-4">週末特別御膳</h3>
						<div className="d-flex gap-3 justify-content-center justify-content-lg-start mb-4">
							{[
								{ label: '時間', value: '08' },
								{ label: '分', value: '45' },
								{ label: '秒', value: '12' },
							].map((item) => (
								<div
									key={item.label}
									className="text-center p-3 rounded-3"
									style={{
										backgroundColor: 'rgba(0,0,0,0.2)',
										minWidth: '88px',
										border: '1px solid rgba(255,255,255,0.1)',
									}}
								>
									<div className="display-6 fw-bold font-monospace">{item.value}</div>
									<small className="text-white-50 text-uppercase">{item.label}</small>
								</div>
							))}
						</div>
						<p className="lead text-white-75 mb-4">
							特別ファミリーセットが30%OFF。本場の味をご自宅までお届けします。
						</p>
						<a className="btn btn-lg fw-bold px-4" style={{ backgroundColor: palette.earth, color: '#fff' }} href="#items">
							お得な情報を見る
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
);

export default OfferSection;

