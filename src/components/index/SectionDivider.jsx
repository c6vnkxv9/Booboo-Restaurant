const SectionDivider = ({ color }) => (
	<div
		className="w-100 my-5"
		style={{
			height: '1px',
			background: `linear-gradient(to right, transparent, ${color}, transparent)`,
		}}
	/>
);

export default SectionDivider;

