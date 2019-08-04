import React from 'react';
import styled from 'styled-components';
import { generateHue, getTextDark } from '../../utils/utils';

const ContainerDiv = styled.div`
	display: grid;
	grid-auto-flow: row;
`;

const RowDiv = styled.div`
	padding: 0px var(--spacing-medium);

	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
	justify-items: center;

	.view-granularity {
		opacity: 0;
	}

	&:hover .view-granularity {
		opacity: 1;
		cursor: pointer;
	}
`;

function TintsAndShadesColumn({ color }) {
	const increment10 = true;
	const scalePre = increment10 ? [...new Array(19).keys()].map(k => k * 10 - 90) : [...new Array(39).keys()].map(k => k * 5 - 95);
	const scale = scalePre.reverse().map(change => {
		const newHex = generateHue(color, change);
		const textColor = getTextDark(newHex) ? 'black' : 'white';

		return {
			hex: newHex,
			textColor,
			change: change === 0 ? '―' : `${Math.abs(change)}% ${change > 0 ? 'lighter' : 'darker'}`
		};
	});

	return (
		<ContainerDiv>
			{scale.map((c, i) => (
				<RowDiv key={i} style={{ backgroundColor: c.hex, color: c.textColor }}>
					<div>{c.change}</div>
					<div className="view-granularity">More</div>
					<div>{c.hex}</div>
				</RowDiv>
			))}
		</ContainerDiv>
	);
}

export default TintsAndShadesColumn;
