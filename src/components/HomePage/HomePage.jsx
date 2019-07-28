import React from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';
import Layout from '../Layout/Layout';

const HomePageDiv = styled.div`
	height: 100%;

	background-color: var(--background-light-color);

	display: grid;
	grid-template-rows: var(--spacing-xl) 1fr;
`;

function HomePage() {
	return (
		<HomePageDiv>
			<Header />
			<Layout padding="var(--spacing-large)">
				<div>TEST 1</div>
				<div>TEST 2</div>
			</Layout>
		</HomePageDiv>
	);
}

export default HomePage;
