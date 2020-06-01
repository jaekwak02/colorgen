import React from "react";
import styled from "styled-components";

const ThemeLayout = (props) => <ElContainer {...props} />;

const ElContainer = styled.div`
  display: grid;
  gap: 30px;
`;

export default ThemeLayout;
