import PropTypes from 'prop-types';
import { Box, Container } from '@mui/material';
import NavBar from '@/components/header/NavBar';
import CommonFooter from '@/components/footer/CommonFooter';

export default function FrontLayout({ children, maxWidth = 'xl' }) {
	return (
		<Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
			<NavBar />
			<Container
				maxWidth={maxWidth}
				sx={{
					pt: { xs: 14, md: 16 },
					pb: { xs: 6, md: 8 },
				}}
			>
				{children}
			</Container>
			<CommonFooter />
		</Box>
	);
}

FrontLayout.propTypes = {
	children: PropTypes.node.isRequired,
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
