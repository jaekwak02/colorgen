import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route } from "react-router-dom";
import "normalize.css";
import "./transitions.css";

import HomePage from "../HomePage/HomePage";
import ColorThemeGenerator from "../ColorThemeGenerator/ColorThemeGenerator";
import NewColorGen from "../NewColorGen";

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

    color-b-L90: #f0fffe;
    color-b-L80: #e1fffc;
    color-b-L70: #d2fefb;
    color-b-L60: #c3fef9;
    color-b-L50: #b4fef8;
    color-b-L40: #a4fef7;
    color-b-L30: #95fef5;
    color-b-L20: #86fdf4;
    color-b-L10: #77fdf2;
    color-b: #68fdf1;
    color-b-D10: #5ee4d9;
    color-b-D20: #53cac1;
    color-b-D30: #49b1a9;
    color-b-D40: #3e9891;
    color-b-D50: #347f79;
    color-b-D60: #2a6560;
    color-b-D70: #1f4c48;
    color-b-D80: #153330;
    color-b-D90: #0a1918;

    --color-neutral-1: #333333;
    --color-dark-foreground: #fbfbff;

    --spacing-small: 10px;
    --spacing-medium: 20px;
    --spacing-large: 30px;
    --spacing-extra-large: 45px;

    --box-shadow-medium: 2px 2px 6px rgba(0, 0, 0, 0.2), 1px 1px 3px rgba(0, 0, 0, 0.4);

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, sans-serif;
    color: var(--color-light-foreground);

    height: 100%;

    * {
      box-sizing: border-box;
    }
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
        <Route path="/" exact component={NewColorGen} />

        {/* <Route path="/" exact component={HomePage} /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
