import PropTypes from 'prop-types';
import { Pagination as MuiPagination, Stack } from '@mui/material';

export default function Pagination({ page, totalPages, onChange }) {
	if (!totalPages || totalPages <= 1) return null;

	return (
		<Stack alignItems="center" sx={{ mt: 4 }}>
			<MuiPagination
				page={page}
				count={totalPages}
				onChange={(_, value) => onChange?.(value)}
				color="primary"
				size="medium"
				showFirstButton
				showLastButton
			/>
		</Stack>
	);
}

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
};
