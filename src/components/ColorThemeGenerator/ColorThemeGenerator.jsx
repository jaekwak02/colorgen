import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import ColorSelection from './ColorSelection';
import GeneratorContext from './GeneratorContext';
import GeneratedColorView from './GeneratedColorView';
// import ColorThemeDemo from './ColorThemeDemo';
import TintsAndShadesVisualizer from './TintsAndShadesVisualizer';
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

	overflow: auto;
`;

const ColorThemeGeneratorHeaderDiv = styled.div`
	font-size: 80px;
	font-weight: 300;
	text-align: center;
`;

const MainLayoutDiv = styled.div``;

const HeaderDiv = styled.div`
	background-color: #161616;
	padding: 0px var(--spacing-large);
	height: 60px;

	display: grid;
	grid-gap: var(--spacing-large);
	grid-template-columns: 1fr auto;
	align-items: center;
`;

const ContainerInnerDiv = styled.div`
	padding: var(--spacing-medium) var(--spacing-large);

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

const ColorViewDiv = styled.div`
	display: grid;
	grid-template-columns: ${props => `repeat(${props.colors.length}, 1fr)`};
`;

const GeneratedColors = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const ColorProfileLayout = styled.div`
	display: grid;
	grid-gap: var(--spacing-medium);
	grid-auto-flow: column;
	justify-content: start;
`;

const ColorProfile = styled.div`
	/* width: 80px; */
	height: 40px;

	background-color: black;
	border: 2px solid black;

	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: 40px;
	grid-gap: 2px;

	transition: 100ms;

	&:hover {
		background-color: white;
		border: 2px solid white;
		cursor: pointer;
	}
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

	const savedProfilesJSON = localStorage.getItem('saved');
	const savedProfiles = savedProfilesJSON ? JSON.parse(savedProfilesJSON) : [];

	const [, updateState] = React.useState();
	const forceUpdate = useCallback(() => updateState({}), []);

	const handleContainerClick = () => setPicker(null);

	const handleSave = () => {
		const savedJSON = localStorage.getItem('saved');
		const saved = savedJSON ? JSON.parse(savedJSON) : [];

		const hexes = colors.map(c => c.hex);

		saved.push(hexes);

		localStorage.setItem('saved', JSON.stringify(saved));
		forceUpdate();
	};

	const handleRestore = hexColors => {
		const newColors = hexColors.map(hex => new Color(hex));
		setColors(newColors);
	};

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
				<MainLayoutDiv>
					<HeaderDiv>
						<ColorProfileLayout>
							{savedProfiles.map((profile, profileIndex) => (
								<ColorProfile key={profileIndex} onClick={() => handleRestore(profile)}>
									{profile.map((c, cIndex) => (
										<div key={cIndex} style={{ backgroundColor: c }} />
									))}
								</ColorProfile>
							))}
						</ColorProfileLayout>

						<div onClick={handleSave}>SAVE</div>
					</HeaderDiv>
					<ContainerInnerDiv>
						<ColorThemeGeneratorHeaderDiv>Color Theme Generator</ColorThemeGeneratorHeaderDiv>

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

						<TintsAndShadesVisualizer />

						<div style={{ marginTop: 100 }}>
							For Inspiration:{' '}
							<a href="http://colrd.com/" target="_blank" rel="noopener noreferrer">
								COLRD
							</a>
						</div>

						<div style={{ height: 200 }} />

						{/* <ColorThemeDemo /> */}
					</ContainerInnerDiv>
				</MainLayoutDiv>
			</ColorThemeGeneratorDiv>
		</GeneratorContext.Provider>
	);
}

export default ColorThemeGenerator;
