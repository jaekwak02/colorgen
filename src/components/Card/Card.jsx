import React from 'react';
import styled from 'styled-components';

const CardDiv = styled.div`
	position: relative;

	padding: var(--spacing-medium);

	box-shadow: var(--box-shadow-medium);

	background-color: white;
`;

const CardHeaderDiv = styled.div``;

const CardBodyDiv = styled.div`
	font-size: 16px;
`;

function Card({ title, children }) {
	return (
		<CardDiv>
			<CardHeaderDiv>{title}</CardHeaderDiv>
			<CardBodyDiv>{children}</CardBodyDiv>
		</CardDiv>
	);
}

export default Card;
