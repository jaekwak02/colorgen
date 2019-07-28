import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Manager, Reference, Popper } from 'react-popper';
import ColorPicker from './ColorPicker';
import GeneratorContext from './GeneratorContext';
import { getTextDark } from '../../utils/utils';
import Button from './Button';

const ColorSelectionDiv = styled.div`
	position: relative;

	display: grid;
	grid-template-rows: 300px auto;
`;

const ColorBlockContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 50% 25% 25%;

	:hover {
		cursor: pointer;
	}
`;

const ColorBlockLabel = styled.div`
	grid-column: span 2;

	font-size: 24px;

	justify-self: center;
	align-self: center;
`;

const ColorBlock = styled.div.attrs(props => ({ style: { backgroundColor: props.color } }))``;

const ColorSelectionControl = styled.div`
	padding: 10px;

	display: grid;
	grid-gap: 10px;
	grid-template-columns: 1fr auto;
	align-items: center;
`;

const Arrow = styled.div`
	position: absolute;
	top: -20px;
	border-left: 18px solid transparent;
	border-right: 18px solid transparent;
	border-bottom: 20px solid #555555;
`;

function ColorSelection({ index }) {
	const { colorsCalculated, neutrals, onColorChange, picker, setPicker } = useContext(GeneratorContext);

	const color = colorsCalculated[index];

	const handleClick = (e, open) => {
		e.preventDefault();
		e.stopPropagation();

		setPicker(open ? index : null);
	};

	const c = colorsCalculated[index];
	const tcColor = getTextDark(c.color.hex) ? 'black' : 'white';
	// const tcLight = getTextDark(c.light) ? '#000000' : '#ffffff';
	// const tcLighter = getTextDark(c.lighter) ? '#000000' : '#ffffff';
	// const tcDark = getTextDark(c.dark) ? '#000000' : '#ffffff';
	// const tcDarker = getTextDark(c.darker) ? '#000000' : '#ffffff';

	return (
		<Manager>
			<Reference>
				{({ ref }) => (
					<ColorSelectionDiv>
						<ColorBlockContainer ref={ref} onClick={e => handleClick(e, true)} style={{ background: color.color.hex }}>
							<ColorBlockLabel style={{ color: tcColor }}>{color.color.hex}</ColorBlockLabel>
							<ColorBlock color={color.light} />
							<ColorBlock color={color.dark} />
							<ColorBlock color={color.lighter} />
							<ColorBlock color={color.darker} />
						</ColorBlockContainer>

						<ColorSelectionControl>
							<div>{color.color.hex}</div>
							<Button theme="secondary">Remove</Button>
						</ColorSelectionControl>
					</ColorSelectionDiv>
				)}
			</Reference>
			{picker === index &&
				ReactDOM.createPortal(
					<Popper
						modifiers={{
							offset: { offset: '0, 10' }
						}}
					>
						{({ ref, style, placement, arrowProps }) => (
							<div ref={ref} style={style} data-placement={placement} onClick={e => e.stopPropagation()}>
								<Arrow ref={arrowProps.ref} style={arrowProps.style} />
								<ColorPicker color={color.color} onClose={e => handleClick(e, false)} onChange={color => onColorChange(index, color)} />
							</div>
						)}
					</Popper>,
					document.querySelector('body')
				)}
		</Manager>
	);
}

export default ColorSelection;
