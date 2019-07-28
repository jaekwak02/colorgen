import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import * as generators from '../../utils/generators';

const Container = styled.div`
	display: grid;
`;

const ButtonContainer = styled.div`
	margin: auto;
	width: auto;

	display: grid;
	grid-gap: var(--spacing-medium);
	grid-auto-flow: column;
`;

function Randomizer({ setColors }) {
	const randomize = newColors => setColors(newColors);

	return (
		<Container>
			<ButtonContainer>
				<Button onClick={() => randomize(generators.generateMonochromatic())} theme="primary">
					Monochromatic
				</Button>
				<Button onClick={() => randomize(generators.generateAnalagous())} theme="primary">
					Analagous
				</Button>
				<Button onClick={() => randomize(generators.generateComplementary())} theme="primary">
					Complementary
				</Button>
				<Button onClick={() => randomize(generators.generateSplitComplementary())} theme="primary">
					Split Complementary
				</Button>
				<Button onClick={() => randomize(generators.generateTetradic())} theme="primary">
					Tetradic
				</Button>
			</ButtonContainer>
		</Container>
	);
}

export default Randomizer;
