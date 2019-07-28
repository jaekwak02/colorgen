import React, { useContext } from 'react';
import styled from 'styled-components';

const LayoutDiv = styled.div`
	padding: ${props => props.padding};

	display: grid;
	grid-gap: ${props => props.gap};
`;

function Layout({ gap = 'var(--spacing-large)', padding = 0, children }) {
	return (
		<LayoutDiv gap={gap} padding={padding}>
			{children}
		</LayoutDiv>
	);
}

export default Layout;
