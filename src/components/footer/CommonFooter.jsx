export default function CommonFooter() {
	return (
		<footer
			className="py-5 text-white-50 mt-auto"
			style={{ backgroundColor: 'var(--bs-dark)' }}
		>
			<div className="container">
				<div className="row g-5">
					<div className="col-12 col-md-6 col-lg-3">
						<div className="d-flex align-items-center gap-2 text-white mb-3">
							<span className="material-symbols-outlined fs-2">
								ramen_dining
							</span>
							<h6 className="fs-6 fw-bold mb-0">BooBoo食堂</h6>
						</div>
						<p
							className="small lh-lg mb-0"
							style={{ color: 'rgba(255, 255, 255, 0.6)' }}
						>
							用心製作每一道料理，帶給您最溫暖的日式風味。選用當季新鮮食材，保留食物最原始的美味。
						</p>
					</div>

					<div className="col-12 col-md-6 col-lg-3">
						<h6 className="fs-6 fw-bold text-white mb-3">聯絡我們</h6>
						<div
							className="d-flex flex-column gap-2 small"
							style={{ color: 'rgba(255, 255, 255, 0.6)' }}
						>
							<p className="d-flex align-items-center gap-2 mb-0">
								<span className="material-symbols-outlined fs-6">
									location_on
								</span>
								台北市大安區美食路一段88號
							</p>
							<p className="d-flex align-items-center gap-2 mb-0">
								<span className="material-symbols-outlined fs-6">call</span>
								(02) 2345-6789
							</p>
							<p className="d-flex align-items-center gap-2 mb-0">
								<span className="material-symbols-outlined fs-6">mail</span>
								service@japanesecanteen.com
							</p>
						</div>
					</div>

					{/* 營業時間 */}
					<div className="col-12 col-md-6 col-lg-3">
						<h6 className="fs-6 fw-bold text-white mb-3">營業時間</h6>
						<div
							className="d-flex flex-column gap-2 small"
							style={{ color: 'rgba(255, 255, 255, 0.6)' }}
						>
							<p className="mb-0">週一至週五: 11:00 - 14:30, 17:00 - 21:00</p>
							<p className="mb-0">週六至週日: 11:00 - 21:30</p>
						</div>
					</div>

					{/* 訂閱電子報 */}
					<div className="col-12 col-md-6 col-lg-3">
						<h6 className="fs-6 fw-bold text-white mb-3">訂閱電子報</h6>
						<p
							className="small mb-3"
							style={{ color: 'rgba(255, 255, 255, 0.6)' }}
						>
							訂閱以獲取最新菜單和優惠資訊。
						</p>
					</div>
				</div>

				<div className="mt-5 pt-4 border-top border-white-10 text-center">
					<p
						className="small mb-0"
						style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.75rem' }}
					>
						© 2026 BooBoo食堂. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
