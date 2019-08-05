import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: grid;
	grid-template-rows: 100px auto;
	grid-gap: var(--spacing-small);
`;

function GeneratedColorView({ color }) {
	return (
		<Container>
			<div style={{ backgroundColor: color }} />
			<div>{color}</div>
		</Container>
	);
}

export default GeneratedColorView;
