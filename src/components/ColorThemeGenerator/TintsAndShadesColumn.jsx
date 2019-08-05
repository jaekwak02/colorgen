import React, { useMemo } from 'react';
import styled from 'styled-components';
import { generateHue, getTextDark } from '../../utils/utils';

const ContainerDiv = styled.div`
	display: grid;
	grid-auto-flow: row;
`;

const RowDiv = styled.div`
	padding: 2px var(--spacing-medium);

	display: grid;
	grid-template-columns: 1fr 1fr;
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

function TintsAndShadesColumn({ color, increment }) {
	const scale = useMemo(() => {
		let c = increment;
		let cc = 0;
		const scalePre = [0];
		while (c < 100 && cc < 100) {
			scalePre.unshift(c);
			scalePre.push(-c);

			c += increment;
			cc++;
		}

		const scale = scalePre.map(changeValue => {
			const newHex = generateHue(color, changeValue);
			const textColor = getTextDark(newHex) ? 'black' : 'white';

			return {
				hex: newHex,
				textColor,
				change: changeValue === 0 ? '―' : `${Math.abs(changeValue)}% ${changeValue > 0 ? 'lighter' : 'darker'}`,
				changeValue
			};
		});

		return scale;
	}, [color, increment]);

	return (
		<ContainerDiv>
			{scale.map((c, i) => (
				<RowDiv key={i} style={{ backgroundColor: c.hex, color: c.textColor }}>
					<div>{c.change}</div>
					<div>{c.hex}</div>
				</RowDiv>
			))}
		</ContainerDiv>
	);
}

export default TintsAndShadesColumn;
