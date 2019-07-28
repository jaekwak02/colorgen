import React from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.div`
	background-color: var(--color-neutral-1);
	color: var(--color-dark-foreground);

	padding: 0px var(--spacing-large);

	display: grid;
	grid-gap: var(--spacing-large);
	grid-auto-flow: column;
	align-items: center;
	justify-content: start;
`;

function Header() {
	return (
		<HeaderDiv>
			<div>Header</div>
			<div>Item 1</div>
			<div>Item 2</div>
		</HeaderDiv>
	);
}

export default Header;
