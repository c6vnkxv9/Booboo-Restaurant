import { alpha } from '@mui/material/styles';
import {
	Box,
	Container,
	Divider,
	Grid,
	Stack,
	Typography,
} from '@mui/material';

export default function AdminFooter() {
	const year = new Date().getFullYear();

	return (
		<Box
			component="footer"
			sx={(theme) => ({
				mt: 'auto',
				py: { xs: 5, md: 6 },
				color: alpha(theme.palette.common.white, 0.72),
				background: `linear-gradient(180deg, ${alpha(
					theme.palette.text.primary,
					0.92
				)} 0%, ${alpha(theme.palette.text.primary, 0.98)} 100%)`,
			})}
		>
			<Container maxWidth="lg">
				<Grid container spacing={4}>
					<Grid item xs={12} md={6} lg={3}>
						<Stack spacing={1.25}>
							<Stack
								direction="row"
								spacing={1}
								alignItems="center"
								sx={{ color: '#fff' }}
							>
								<span
									className="material-symbols-outlined"
									style={{ fontSize: 30 }}
								>
									ramen_dining
								</span>
								<Typography
									variant="subtitle1"
									sx={(theme) => ({
										fontWeight: 900,
										color: '#fff',
										fontFamily:
											theme.typography.title?.fontFamily || "'Kaisei Opti', serif",
										letterSpacing: theme.typography.title?.letterSpacing || '0.04em',
									})}
								>
									BooBoo食堂
								</Typography>
							</Stack>
							<Typography
								variant="body2"
								sx={{ lineHeight: 1.8, color: alpha('#fff', 0.62) }}
							>
								用心製作每一道料理，帶給您最溫暖的日式風味。選用當季新鮮食材，保留食物最原始的美味。
							</Typography>
						</Stack>
					</Grid>

					<Grid item xs={12} md={6} lg={3}>
						<Stack spacing={1.5}>
							<Typography
								variant="subtitle2"
								sx={{ fontWeight: 900, color: '#fff' }}
							>
								聯絡我們
							</Typography>
							<Stack spacing={1} sx={{ color: alpha('#fff', 0.62) }}>
								<Stack direction="row" spacing={1} alignItems="center">
									<span
										className="material-symbols-outlined"
										style={{ fontSize: 18 }}
									>
										location_on
									</span>
									<Typography variant="body2">
										台北市大安區美食路一段88號
									</Typography>
								</Stack>
								<Stack direction="row" spacing={1} alignItems="center">
									<span
										className="material-symbols-outlined"
										style={{ fontSize: 18 }}
									>
										call
									</span>
									<Typography variant="body2">(02) 2345-6789</Typography>
								</Stack>
								<Stack direction="row" spacing={1} alignItems="center">
									<span
										className="material-symbols-outlined"
										style={{ fontSize: 18 }}
									>
										mail
									</span>
									<Typography variant="body2">
										service@japanesecanteen.com
									</Typography>
								</Stack>
							</Stack>
						</Stack>
					</Grid>

					<Grid item xs={12} md={6} lg={3}>
						<Stack spacing={1.5}>
							<Typography
								variant="subtitle2"
								sx={{ fontWeight: 900, color: '#fff' }}
							>
								營業時間
							</Typography>
							<Stack spacing={1} sx={{ color: alpha('#fff', 0.62) }}>
								<Typography variant="body2">
									週一至週五: 11:00 - 14:30, 17:00 - 21:00
								</Typography>
								<Typography variant="body2">
									週六至週日: 11:00 - 21:30
								</Typography>
							</Stack>
						</Stack>
					</Grid>

					<Grid item xs={12} md={6} lg={3}>
						<Stack spacing={1.5}>
							<Typography
								variant="subtitle2"
								sx={{ fontWeight: 900, color: '#fff' }}
							>
								訂閱電子報
							</Typography>
							<Typography variant="body2" sx={{ color: alpha('#fff', 0.62) }}>
								訂閱以獲取最新菜單和優惠資訊。
							</Typography>
						</Stack>
					</Grid>
				</Grid>

				<Divider
					sx={{ my: { xs: 4, md: 5 }, borderColor: alpha('#fff', 0.12) }}
				/>

				<Typography
					variant="caption"
					sx={{
						display: 'block',
						textAlign: 'center',
						color: alpha('#fff', 0.45),
					}}
				>
					© {year} BooBoo食堂. All rights reserved.
				</Typography>
			</Container>
		</Box>
	);
}
