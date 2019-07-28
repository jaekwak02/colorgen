import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: grid;
	grid-template-rows: 100px auto;
	grid-gap: var(--spacing-medium);
`;

const ColorBlock = styled.div.attrs(props => ({
	style: { backgroundColor: props.color }
}))``;

function GeneratedColorView({ color }) {
	return (
		<Container>
			<ColorBlock color={color} />
			<div>{color}</div>
		</Container>
	);
}

export default GeneratedColorView;
