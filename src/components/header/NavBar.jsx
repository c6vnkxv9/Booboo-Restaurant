const NavBar = ({ palette }) => (
	<nav
		className="navbar navbar-expand-lg navbar-light py-3 shadow-sm fixed-top"
		style={{
			backgroundColor: 'rgba(242, 237, 228, 0.95)',
			backdropFilter: 'blur(8px)',
		}}
	>
		<div className="container">
			<div className="d-flex align-items-center gap-2">
				<span
					className="material-symbols-outlined fs-2"
					style={{ color: palette.clay }}
				>
					storefront
				</span>
				<div className="d-flex flex-column">
					<span
						className="fw-bold"
						style={{ letterSpacing: '0.08em', color: palette.ink }}
					>
						BooBoo食堂
					</span>
					<small style={{ color: palette.shadow, letterSpacing: '0.1em' }}>
						風味と伝統
					</small>
				</div>
			</div>

			<button
				className="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#machiyaNavbar"
				aria-controls="machiyaNavbar"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			<div
				className="collapse navbar-collapse justify-content-end"
				id="machiyaNavbar"
			>
				<ul className="navbar-nav align-items-lg-center gap-lg-3">
					<li className="nav-item">
						<a
							className="nav-link fw-semibold"
							style={{ color: palette.ink }}
							href="#items"
						>
							品目
						</a>
					</li>
					<li className="nav-item">
						<a
							className="nav-link fw-semibold"
							style={{ color: palette.ink }}
							href="#story"
						>
							物語
						</a>
					</li>
					<li className="nav-item">
						<a
							className="nav-link fw-semibold"
							style={{ color: palette.ink }}
							href="#journal"
						>
							日誌
						</a>
					</li>
					<li className="nav-item">
						<a
							className="btn btn-sm px-3 rounded-pill text-white"
							style={{ backgroundColor: palette.clay }}
							href="#cta"
						>
							注文する
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
);

export default NavBar;
