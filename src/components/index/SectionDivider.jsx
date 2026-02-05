import { useTheme } from '@mui/material/styles';
const SectionDivider = () => {
	const theme = useTheme();
	return (
	<div
		className="w-100 my-5"
		style={{
			height: '1px',
			background: `linear-gradient(to right, transparent, ${theme.palette.primary.main}, transparent)`,
		}}
	/>
)};

export default SectionDivider;

