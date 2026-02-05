import PropTypes from 'prop-types';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	Typography,
} from '@mui/material';

export default function DeleteModal({
	open,
	title,
	description,
	onClose,
	onConfirm,
	loading,
}) {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle sx={{ fontWeight: 900 }}>{title}</DialogTitle>
			<DialogContent>
				<Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
					{description}
				</Typography>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 2 }}>
				<Button onClick={onClose} disabled={loading}>
					取消
				</Button>
				<Button
					color="error"
					variant="contained"
					onClick={onConfirm}
					disabled={loading}
				>
					{loading ? '刪除中...' : '確認刪除'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

DeleteModal.propTypes = {
	open: PropTypes.bool,
	title: PropTypes.string,
	description: PropTypes.string,
	onClose: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	loading: PropTypes.bool,
};

DeleteModal.defaultProps = {
	open: false,
	title: '確認刪除',
	description: '確定要刪除這筆資料嗎？此操作無法復原。',
	loading: false,
};
