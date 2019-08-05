import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import RandomizerBaseColorSelect from './RandomizerBaseColorSelect';
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
	const [baseColor, setBaseColor] = useState(null);
	const randomize = newColors => setColors(newColors);

	return (
		<Container>
			<RandomizerBaseColorSelect color={baseColor} setColor={setBaseColor} />
			<ButtonContainer>
				<Button onClick={() => randomize(generators.generateMonochromatic(baseColor))} theme="primary">
					Monochromatic
				</Button>
				<Button onClick={() => randomize(generators.generateAnalagous(baseColor))} theme="primary">
					Analagous
				</Button>
				<Button onClick={() => randomize(generators.generateComplementary(baseColor))} theme="primary">
					Complementary
				</Button>
				<Button onClick={() => randomize(generators.generateSplitComplementary(baseColor))} theme="primary">
					Split Complementary
				</Button>
				<Button onClick={() => randomize(generators.generateTetradic(baseColor))} theme="primary">
					Tetradic
				</Button>
			</ButtonContainer>
		</Container>
	);
}

export default Randomizer;
