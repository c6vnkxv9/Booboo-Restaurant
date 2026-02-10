import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { Oval } from 'react-loader-spinner';

/**
 * Loading 轉圈元件
 * @param {number} height - 高度（預設 60）
 * @param {number} width - 寬度（預設 60）
 * @param {string} color - 主要顏色（預設主題色）
 * @param {string} secondaryColor - 次要顏色（預設主題淺色）
 * @param {boolean} fullScreen - 是否全螢幕置中（預設 false）
 */
export default function LoadingSpinner({
	height = 60,
	width = 60,
	color = '#E05D4A',
	secondaryColor = '#E6ACA3',
	fullScreen = false,
}) {
	const spinner = (
		<Oval
			height={height}
			width={width}
			color={color}
			secondaryColor={secondaryColor}
			strokeWidth={4}
			strokeWidthSecondary={4}
		/>
	);

	if (fullScreen) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '60vh',
				}}
			>
				{spinner}
			</Box>
		);
	}

	return spinner;
}

LoadingSpinner.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
	color: PropTypes.string,
	secondaryColor: PropTypes.string,
	fullScreen: PropTypes.bool,
};
