import { getPermissionErrorMessage } from '../utils/permissions';
import PropTypes from 'prop-types';
import { Alert, Box, Button, Paper, Stack, Typography } from '@mui/material';

/**
 * 權限不足提示組件
 * @param {Object} props
 * @param {Error} props.error - API 錯誤物件
 * @param {Function} props.onRetry - 重試函數（可選）
 * @param {string} props.customMessage - 自訂錯誤訊息（可選）
 */
export default function PermissionDenied({ error, onRetry, customMessage }) {
	const message =
		customMessage || getPermissionErrorMessage(error) || '您沒有權限執行此操作';

	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				px: 2,
				py: { xs: 4, md: 8 },
			}}
		>
			<Paper
				elevation={2}
				sx={{
					width: '100%',
					maxWidth: 640,
					borderRadius: 2,
					px: { xs: 3, md: 6 },
					py: { xs: 4, md: 5 },
					textAlign: 'center',
				}}
			>
				<Box sx={{ mb: 3 }}>
					<Box
						component="span"
						className="material-symbols-outlined"
						sx={{
							display: 'inline-block',
							fontSize: 80,
							lineHeight: 1,
							color: 'warning.main',
							textShadow: '0 1px 2px rgba(0, 0, 0, 0.10)',
						}}
						style={{
							fontVariationSettings:
								"'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 48",
						}}
					>
						lock
					</Box>
				</Box>

				<Typography
					variant="h4"
					sx={{
						fontWeight: 800,
						color: 'text.primary',
						letterSpacing: '0.025em',
						mb: 2,
					}}
				>
					權限不足
				</Typography>

				<Stack spacing={2} alignItems="center">
					<Alert
						severity="warning"
						sx={{
							width: '100%',
							maxWidth: 520,
							'& .MuiAlert-message': { width: '100%' },
						}}
					>
						{message}
					</Alert>

					<Box sx={{ maxWidth: 560 }}>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{ lineHeight: 1.75 }}
						>
							您已成功登入，但您的帳號沒有管理權限。
						</Typography>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{ lineHeight: 1.75 }}
						>
							如需使用後台功能，請聯繫系統管理員。
						</Typography>
					</Box>

					{onRetry ? (
						<Button variant="outlined" color="primary" onClick={onRetry}>
							重新載入
						</Button>
					) : null}
				</Stack>
			</Paper>
		</Box>
	);
}

PermissionDenied.propTypes = {
	error: PropTypes.object,
	onRetry: PropTypes.func,
	customMessage: PropTypes.string,
};
