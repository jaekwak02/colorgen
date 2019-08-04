import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import GeneratorContext from './GeneratorContext';
import TintsAndShadesColumn from './TintsAndShadesColumn';

const ContainerDiv = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;

	z-index: 200;

	color: white;
	background-color: black;

	display: grid;
	/* grid-row-gap: var(--spacing-large); */
	grid-template-rows: auto 1fr;
`;

const ContainerHeaderDiv = styled.div`
	font-size: 30px;
	text-align: center;
	padding: var(--spacing-large) 0px;
`;

const ContainerFooterDiv = styled.div`
	font-size: 24px;
	text-align: center;
	padding: var(--spacing-large) 0px;
	cursor: pointer;
	transition: 500ms;
`;

const ColorAccordionLayoutDiv = styled.div`
	display: grid;
`;

function TintsAndShadesVisualizer() {
	const [isOpen, setIsOpen] = useState(false);
	const generatorContext = useContext(GeneratorContext);
	const { colors } = generatorContext;

	return (
		<>
			<div onClick={() => setIsOpen(true)}>TEST ME</div>

			{ReactDOM.createPortal(
				<CSSTransition in={isOpen} timeout={300} classNames="fade" unmountOnExit>
					<ContainerDiv>
						<ContainerHeaderDiv>TINTS AND SHADES</ContainerHeaderDiv>
						<ColorAccordionLayoutDiv style={{ gridTemplateColumns: `repeat(${colors.length}, 1fr)` }}>
							{colors.map((color, colorIndex) => (
								<TintsAndShadesColumn color={color} key={colorIndex} />
							))}
						</ColorAccordionLayoutDiv>
						<ContainerFooterDiv onClick={() => setIsOpen(false)}>Close</ContainerFooterDiv>
					</ContainerDiv>
				</CSSTransition>,
				document.querySelector('#root')
			)}
		</>
	);
}

export default TintsAndShadesVisualizer;
