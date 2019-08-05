import React from 'react';
import styled from 'styled-components';
import TextInput from './TextInput';

const ContainerDiv = styled.div`
	margin: auto;
	margin-bottom: var(--spacing-large);
`;

const HeaderDiv = styled.div`
	color: white;
	margin-bottom: var(--spacing-small);
	text-align: center;
`;

function RandomizerBaseColorSelect({ color, setColor }) {
	return (
		<ContainerDiv>
			<HeaderDiv>Base Color</HeaderDiv>
			<TextInput value={color} onChange={newColor => setColor(newColor)} />
		</ContainerDiv>
	);
}

export default RandomizerBaseColorSelect;
