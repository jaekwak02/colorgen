import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import GeneratorContext from './GeneratorContext';
import TintsAndShadesColumn from './TintsAndShadesColumn';
import Button from './Button';

const ContainerDiv = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;

	z-index: 1;

	color: white;
	background-color: black;

	display: grid;
	grid-template-rows: auto 1fr auto;
	overflow-y: auto;
`;

const ContainerHeaderDiv = styled.div`
	position: relative;

	font-size: 30px;
	text-align: center;
	padding: var(--spacing-large) 0px;
`;

const PercentControlLayoutDiv = styled.div`
	position: absolute;
	top: var(--spacing-large);
	right: var(--spacing-large);

	display: grid;
	grid-auto-flow: column;
	grid-gap: var(--spacing-small);
`;

const PercentControlDiv = styled.div`
	border: 1px solid white;
	padding: 0px var(--spacing-small);

	cursor: pointer;

	&:hover {
		color: var(--color-primary);
		border: 1px solid var(--color-primary);
	}
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
	const { colors } = useContext(GeneratorContext);

	const [isOpen, setIsOpen] = useState(false);
	const [increment, setIncrement] = useState(10);

	return (
		<>
			<Button theme="primary" onClick={() => setIsOpen(true)}>
				Tints and Shades
			</Button>

			{ReactDOM.createPortal(
				<CSSTransition in={isOpen} timeout={300} classNames="fade" unmountOnExit>
					<ContainerDiv>
						<ContainerHeaderDiv>
							TINTS AND SHADES
							<PercentControlLayoutDiv>
								<PercentControlDiv
									style={{ marginLeft: 'var(--spacing-small)', border: '1px solid white', padding: '0px var(--spacing-small)' }}
									onClick={() => setIncrement(1)}
								>
									1 %
								</PercentControlDiv>
								<PercentControlDiv
									style={{ marginLeft: 'var(--spacing-small)', border: '1px solid white', padding: '0px var(--spacing-small)' }}
									onClick={() => setIncrement(2)}
								>
									2 %
								</PercentControlDiv>
								<PercentControlDiv
									style={{ marginLeft: 'var(--spacing-small)', border: '1px solid white', padding: '0px var(--spacing-small)' }}
									onClick={() => setIncrement(4)}
								>
									4 %
								</PercentControlDiv>
								<PercentControlDiv
									style={{ marginLeft: 'var(--spacing-small)', border: '1px solid white', padding: '0px var(--spacing-small)' }}
									onClick={() => setIncrement(5)}
								>
									5 %
								</PercentControlDiv>
								<PercentControlDiv
									style={{ marginLeft: 'var(--spacing-small)', border: '1px solid white', padding: '0px var(--spacing-small)' }}
									onClick={() => setIncrement(8)}
								>
									8 %
								</PercentControlDiv>
								<PercentControlDiv
									style={{ marginLeft: 'var(--spacing-small)', border: '1px solid white', padding: '0px var(--spacing-small)' }}
									onClick={() => setIncrement(10)}
								>
									10 %
								</PercentControlDiv>
							</PercentControlLayoutDiv>
						</ContainerHeaderDiv>
						<ColorAccordionLayoutDiv style={{ gridTemplateColumns: `repeat(${colors.length}, 1fr)` }}>
							{colors.map((color, colorIndex) => (
								<TintsAndShadesColumn color={color} key={colorIndex} increment={increment} />
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
