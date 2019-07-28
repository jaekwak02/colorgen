import React, { useState } from 'react';
import styled from 'styled-components';
import ColorSelection from './ColorSelection';
import GeneratorContext from './GeneratorContext';
import GeneratedColorView from './GeneratedColorView';
// import ColorThemeDemo from './ColorThemeDemo';
import Randomizer from './Randomizer';
import SliderGroup from './SliderGroup';

import { Color } from '../../classes/Color';
import { generateAnalagous } from '../../utils/generators';
import { hexToRGB, combineRGB, generateHue } from '../../utils/utils';

const ColorThemeGeneratorDiv = styled.div`
	height: 100%;

	box-sizing: border-box;
	background-color: #333333;
	color: #ffffff;

	a:link {
		color: #00dddd;
		text-decoration: none;
	}

	a:visited {
		color: #00dddd;
		text-decoration: none;
	}

	a:hover {
		color: #eeffff;
	}

	padding: var(--spacing-large);
	overflow: auto;
`;

const ContainerInnerDiv = styled.div`
	max-width: 1500px;
	margin: auto;

	display: grid;
	align-content: start;
	grid-gap: var(--spacing-large);
`;

const ControlDiv = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 20px;
`;

const HeaderDiv = styled.div`
	font-size: 30px;
	text-align: center;

	padding: 20px 0px;
`;

const ColorViewDiv = styled.div`
	display: grid;
	grid-template-columns: ${props => `repeat(${props.colors.length}, 1fr)`};
`;

const GeneratedColors = styled.div`
	display: grid;
	height: 100px;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const initialColors = generateAnalagous();

function ColorThemeGenerator() {
	const [colors, setColors] = useState(initialColors);
	const [picker, setPicker] = useState(null);

	const [lightVariant, setLightVariant] = useState(25);
	const [lighterVariant, setLighterVariant] = useState(75);
	const [darkVariant, setDarkVariant] = useState(25);
	const [darkerVariant, setDarkerVariant] = useState(75);

	const [neutralTint, setNeutralTint] = useState(6);

	const handleContainerClick = () => setPicker(null);

	const onColorChange = (index, color) => {
		const newColors = [...colors];
		newColors[index].setColor(color);
		setColors(newColors);
	};

	const rgb = colors
		.map(c => c.rgb)
		.reduce(
			(acc, curr) => {
				acc.r += curr.r;
				acc.g += curr.g;
				acc.b += curr.b;
				return acc;
			},
			{ r: 0, g: 0, b: 0 }
		);

	const isWarm = rgb.r > rgb.b;
	const ratio = rgb.r === rgb.b ? 0.5 : rgb.r === 0 || rgb.b === 0 ? 1 : 1 - (isWarm ? rgb.b / rgb.r : rgb.r / rgb.b);

	const maxRGB = Math.max(rgb.r, rgb.g, rgb.b) / 255;
	const scaledRGB = {};
	scaledRGB.r = Math.round(rgb.r / maxRGB);
	scaledRGB.g = Math.round(rgb.g / maxRGB);
	scaledRGB.b = Math.round(rgb.b / maxRGB);

	const neutrals = [
		combineRGB(hexToRGB('#111111'), scaledRGB, neutralTint / 100),
		combineRGB(hexToRGB('#333333'), scaledRGB, neutralTint / 100),
		combineRGB(hexToRGB('#666666'), scaledRGB, neutralTint / 100),
		combineRGB(hexToRGB('#aaaaaa'), scaledRGB, neutralTint / 100),
		combineRGB(hexToRGB('#dddddd'), scaledRGB, neutralTint / 100),
		combineRGB(hexToRGB('#ffffff'), scaledRGB, neutralTint / 100)
	];

	const colorsCalculated = colors.map(c => ({
		color: c,
		light: generateHue(c, lightVariant),
		lighter: generateHue(c, lighterVariant),
		dark: generateHue(c, -darkVariant),
		darker: generateHue(c, -darkerVariant)
	}));

	const contextValue = {
		colors,
		colorsCalculated,
		neutrals,
		onColorChange,
		picker,
		setPicker,
		lightVariant,
		lighterVariant,
		darkVariant,
		darkerVariant
	};

	return (
		<GeneratorContext.Provider value={contextValue}>
			<ColorThemeGeneratorDiv onClick={handleContainerClick}>
				<ContainerInnerDiv>
					<HeaderDiv>Color Theme Generator</HeaderDiv>

					<Randomizer setColors={setColors} />

					<ColorViewDiv colors={colors}>
						{colors.map((color, i) => (
							<ColorSelection key={i} index={i} />
						))}
					</ColorViewDiv>

					<ControlDiv>
						<div>
							<div>
								{isWarm ? 'Warm' : 'Cool'} {ratio.toFixed(2)}
							</div>
						</div>

						<SliderGroup
							id="lightVariant"
							label="Light Variant"
							extra={`${lightVariant}%`}
							min="0"
							max="100"
							value={lightVariant}
							onChange={e => setLightVariant(e.target.value)}
							style={{
								background: 'linear-gradient(to right, black, white)'
							}}
						/>

						<SliderGroup
							id="darkVariant"
							label="Dark Variant"
							extra={`${darkVariant}%`}
							min="0"
							max="100"
							value={darkVariant}
							onChange={e => setDarkVariant(e.target.value)}
							style={{
								background: 'linear-gradient(to right, black, white)'
							}}
						/>

						<SliderGroup
							id="neutralTint"
							label="Neutral Tint"
							extra={`${neutralTint}%`}
							min="0"
							max="100"
							value={neutralTint}
							onChange={e => setNeutralTint(e.target.value)}
							style={{
								background: 'linear-gradient(to right, black, white)'
							}}
						/>

						<SliderGroup
							id="lighterVariant"
							label="Lighter Variant"
							extra={`${lighterVariant}%`}
							min="0"
							max="100"
							value={lighterVariant}
							onChange={e => setLighterVariant(e.target.value)}
							style={{
								background: 'linear-gradient(to right, black, white)'
							}}
						/>

						<SliderGroup
							id="darkerVariant"
							label="Darker Variant"
							extra={`${darkerVariant}%`}
							min="0"
							max="100"
							value={darkerVariant}
							onChange={e => setDarkerVariant(e.target.value)}
							style={{
								background: 'linear-gradient(to right, black, white)'
							}}
						/>
					</ControlDiv>

					<GeneratedColors style={{ gridTemplateColumns: `repeat(${neutrals.length}, 1fr)` }}>
						<GeneratedColorView color={neutrals[0]} />
						<GeneratedColorView color={neutrals[1]} />
						<GeneratedColorView color={neutrals[2]} />
						<GeneratedColorView color={neutrals[3]} />
						<GeneratedColorView color={neutrals[4]} />
						<GeneratedColorView color={neutrals[5]} />
					</GeneratedColors>

					<div style={{ marginTop: 100 }}>
						For Inspiration:{' '}
						<a href="http://colrd.com/" target="_blank" rel="noopener noreferrer">
							COLRD
						</a>
					</div>
				</ContainerInnerDiv>
				<div style={{ height: 200 }} />

				{/* <ColorThemeDemo /> */}
			</ColorThemeGeneratorDiv>
		</GeneratorContext.Provider>
	);
}

export default ColorThemeGenerator;
