import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';
import 'normalize.css';

import HomePage from '../HomePage/HomePage';
import ColorThemeGenerator from '../ColorThemeGenerator/ColorThemeGenerator';

const GlobalStyle = createGlobalStyle`
  :root {
    --color-primary: #01BAEF
    --color-secondary: #0B4f6c;
    --color-light: #FBFBFF;
    --color-dark: #040F16;

    --color-success: #56E39F; 
    --color-warning: #F0C808;
    --color-error: #B80C09;

    --color-light-primary: #01BAEF;
    --color-light-background: #fbfbff;
    --color-light-foreground: #333333;

    --color-neutral-1: #333333;
    --color-dark-foreground: #fbfbff;

    --spacing-small: 10px;
    --spacing-medium: 20px;
    --spacing-large: 30px;

    --box-shadow-medium: 2px 2px 6px rgba(0, 0, 0, 0.2), 1px 1px 3px rgba(0, 0, 0, 0.4);

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, sans-serif;
    color: var(--color-light-foreground);

    height: 100%;
  }

  body {
    height: 100%;
  }

  #root {
    height: 100%;
  }
`;

function App() {
	return (
		<>
			{/* Inject Global Styles */}
			<GlobalStyle />

			{/* App */}
			<BrowserRouter>
				<Route path="/" exact component={ColorThemeGenerator} />

				{/* <Route path="/" exact component={HomePage} /> */}
			</BrowserRouter>
		</>
	);
}

export default App;
