import React from 'react';
import styled from 'styled-components';
import Slider from './Slider';

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	grid-gap: var(--spacing-small);
`;

const SliderContainer = styled.div`
	grid-column: span 2;
`;

function SliderGroup({ id, label, extra, ...rest }) {
	return (
		<Container>
			<label htmlFor={id}>{label}</label>
			<div>{extra}</div>
			<SliderContainer>
				<Slider id={id} {...rest} />
			</SliderContainer>
		</Container>
	);
}

export default SliderGroup;
