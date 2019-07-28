import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	background-color: ${props => props.background || 'red'};
	color: ${props => props.color || 'red'};

	padding: 0px var(--spacing-medium);
	border: none;
	display: grid;
	align-items: center;

	min-height: 32px;
	border-radius: 3px;

	transition: 0.25s;

	&:hover {
		background-color: #44eeee;
		cursor: pointer;
	}
`;

const BUTTON_THEMES = {
	primary: {
		background: '#44dddd',
		color: '#222222'
	},
	secondary: {
		background: 'transparent',
		color: '#ffffff'
	}
};

function Button({ value, onClick, children, theme }) {
	const buttonStyle = BUTTON_THEMES[theme];

	return (
		<StyledButton value={value} onClick={onClick} {...buttonStyle}>
			{children}
		</StyledButton>
	);
}

export default Button;
