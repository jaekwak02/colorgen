import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: grid;
	align-items: center;
`;

const Input = styled.input`
	-webkit-appearance: none; /* Override default CSS styles */
	appearance: none;
	width: 100%;
	height: 10px;
	border-radius: 10px;
	/* background: #d3d3d3; */
	background: ${props => props.background || '#d3d3d3'};
	outline: none;
	opacity: 0.7;
	transition: 0.2s;

	:hover {
		opacity: 1;
	}

	::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 25px;
		height: 25px;
		border-radius: 20px;
		background: #33dddd;
		cursor: pointer;
	}

	::-moz-range-thumb {
		width: 25px;
		height: 25px;
		border-radius: 20px;
		background: #33dddd;
		cursor: pointer;
	}
`;

function Slider({ ...rest }) {
	return (
		<Container>
			<Input {...rest} type="range" />
		</Container>
	);
}

export default Slider;
