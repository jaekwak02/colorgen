import React from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';
import Button from './Button';
import SliderGroup from './SliderGroup';
import { hexToRGB, RGBToHSL, HSLToRGB, RGBToHex } from '../../utils/utils';

const ContainerDiv = styled.div`
	padding: 20px;

	display: grid;
	grid-gap: var(--spacing-medium);
	grid-template-rows: auto auto 36px;

	background-color: #555555;
	color: white;
`;

const ContainerInner = styled.div`
	display: grid;
	grid-gap: var(--spacing-medium);
	grid-template-columns: auto 300px;
`;

const HeaderDiv = styled.div`
	text-align: center;
`;

const PickerContainer = styled.div`
	background-color: white;
`;

const SlidersContainer = styled.div`
	display: grid;
	grid-gap: var(--spacing-medium);

	align-content: start;
`;

function ColorPicker({ color, onChange, onClose }) {
	const hsl = color.hsl;

	const handleHSLChange = (target, value) => {
		const newHSL = { ...hsl, [target]: value };
		newHSL[target] = value;
		onChange(newHSL);
	};

	return (
		<ContainerDiv>
			<HeaderDiv>Select a color</HeaderDiv>

			<ContainerInner>
				<PickerContainer>
					<SketchPicker color={color.hex} onChange={value => onChange(value.hex)} disableAlpha width={500} />
				</PickerContainer>
				<SlidersContainer>
					<SliderGroup
						id="hsl-h"
						label="Hue"
						extra={`${hsl.h}`}
						value={hsl.h}
						min="0"
						max="359"
						onChange={e => handleHSLChange('h', e.target.value)}
					/>
					<SliderGroup
						id="hsl-s"
						label="Saturation"
						extra={`${Math.round(hsl.s)}%`}
						value={hsl.s}
						min="0"
						max="100"
						onChange={e => handleHSLChange('s', e.target.value)}
					/>
					<SliderGroup
						id="hsl-l"
						label="Lightness"
						extra={`${Math.round(hsl.l)}%`}
						value={hsl.l}
						min="0"
						max="100"
						onChange={e => handleHSLChange('l', e.target.value)}
					/>
				</SlidersContainer>
			</ContainerInner>

			<Button onClick={onClose} theme="primary">
				OK
			</Button>
		</ContainerDiv>
	);
}

export default ColorPicker;
