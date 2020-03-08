import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Route } from "react-router-dom";
import "normalize.css";
import "./transitions.css";

import HomePage from "../HomePage/HomePage";
import ColorThemeGenerator from "../ColorThemeGenerator/ColorThemeGenerator";
import NewColorGen from "../NewColorGen";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={NewColorGen} />

      {/* <Route path="/" exact component={HomePage} /> */}
    </BrowserRouter>
  );
}

export default App;
