import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import GeneratorContext from './GeneratorContext';

const DemoPanel = styled.div`
	margin-left: calc(var(--spacing-large) * -1);
	margin-right: calc(var(--spacing-large) * -1);
	margin-bottom: calc(var(--spacing-large) * -1);

	--color-primary: ${props => props.theme.primary.color};
	--color-primary-light: ${props => props.theme.primary.light};
	--color-primary-lighter: ${props => props.theme.primary.lighter};
	--color-primary-dark: ${props => props.theme.primary.dark};
	--color-primary-darker: ${props => props.theme.primary.darker};

	--color-secondary: ${props => props.theme.secondary.color};
	--color-secondary-light: ${props => props.theme.secondary.light};
	--color-secondary-dark: ${props => props.theme.secondary.dark};

	--color-tertiary: ${props => props.theme.tertiary.color};
	--color-tertiary-light: ${props => props.theme.tertiary.light};
	--color-tertiary-dark: ${props => props.theme.tertiary.dark};

	--color-quaternary: ${props => props.theme.quaternary.color};
	--color-quaternary-light: ${props => props.theme.quaternary.light};
	--color-quaternary-dark: ${props => props.theme.quaternary.dark};

	--color-neutral-1: ${props => props.theme.n1};
	--color-neutral-2: ${props => props.theme.n2};
	--color-neutral-3: ${props => props.theme.n3};
	--color-neutral-4: ${props => props.theme.n4};
	--color-neutral-5: ${props => props.theme.n5};

	background-color: var(--color-neutral-4);
	display: grid;
	grid-template-rows: 50px calc(100vh - 50px);

	color: var(--color-neutral-1);
	font-size: 16px;

	.text-header-1 {
		font-size: 32px;
	}

	.text-header-2 {
		font-size: 25px;
	}

	.text-header-3 {
		font-size: 21px;
	}

	.text-header-3 {
		font-size: 18px;
	}

	div {
		word-break: break-word;
	}
`;

const Card = styled.div`
	background-color: var(--color-neutral-5);
	padding: var(--spacing-medium);
	box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2), 1px 1px 3px rgba(0, 0, 0, 0.4);

	display: grid;
	grid-gap: var(--spacing-3);
	align-content: start;

	color: var(--color-neutral-1);
`;

const CardHeader = styled.div`
	font-size: 20px;
	font-weight: 500;
`;

const CardActionsPanel = styled.div`
	display: grid;
	grid-gap: 10px;
	grid-auto-flow: column;
	justify-content: end;
`;

const CardContent = styled.div``;

const HorizontalLayout = styled.div`
	display: grid;
	grid-template-columns: ${props => props.columns};
	grid-gap: var(--spacing-large);
	align-items: start;

	padding: ${props => props.padding};
`;

const Button = styled.button`
	height: var(--spacing-large);
	padding: 0px var(--spacing-3);
	width: 100px;

	border: none;
	border-radius: 5px;

	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 1px;

	${props =>
		props.type === 'ghost'
			? css`
				background-color: var(--color-primary-lighter)};
				color: var(--color-neutral-1);
				
				:hover {
					cursor: pointer;
					background-color: var(--color-neutral-5);
					color: var(--color-neutral-1);
				}
			`
			: props.type === 'muted'
			? css`
				background-color: var(--color-primary-dark)};
				color: var(--color-neutral-5);
				
				:hover {
					cursor: pointer;
					background-color: var(--color-primary);
					color: var(--color-neutral-5);
				}
			`
			: css`
				background-color: var(--color-primary)};
				color: var(--color-neutral-5);

				:hover {
					cursor: pointer;
					background-color: var(--color-primary-light);
					color: var(--color-neutral-1);
				}
	`}
`;

const DemoHeader = styled.div`
	background-color: var(--color-primary-darker);
	padding: 0px var(--spacing-large);

	color: var(--color-neutral-5);

	display: grid;
	grid-auto-flow: column;
	grid-gap: var(--spacing-large);
	justify-content: start;
	align-items: center;
`;

const DemoHeaderTitle = styled.div`
	color: var(--color-neutral-5);
`;

const DemoHeaderItem = styled.div`
	color: var(--color-neutral-4);
`;

const DemoContent = styled.div`
	overflow: auto;
`;

const DemoMedia = styled.div`
	position: relative;
	height: 50vh;
	background: linear-gradient(120deg, var(--color-primary), var(--color-primary-lighter));
`;

const DemoMediaContent = styled.div`
	margin: auto;
	max-width: 500px;
	padding: var(--spacing-large);

	z-index: 1;
`;

const DemoMediaContentGradient1 = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

function ColorThemeDemo({}) {
	const { colorsCalculated, neutrals } = useContext(GeneratorContext);

	const mapPrimary = [0, 1, 2, 3];
	const mapNeutral = [0, 1, 2, 3, 4];

	const theme = {
		primary: colorsCalculated[mapPrimary[0]],
		secondary: colorsCalculated[mapPrimary[1]],
		tertiary: colorsCalculated[mapPrimary[2]],
		quaternary: colorsCalculated[mapPrimary[3]],

		n1: neutrals[mapNeutral[0]],
		n2: neutrals[mapNeutral[1]],
		n3: neutrals[mapNeutral[2]],
		n4: neutrals[mapNeutral[3]],
		n5: neutrals[mapNeutral[4]]
	};

	return <DemoPanel theme={theme} />;
}

export default ColorThemeDemo;
