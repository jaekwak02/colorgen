import React from "react";
import styled from "styled-components";

const HorizontalLayout = (props) => <ElContainer {...props} />;

const ElContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 15px;
  align-items: center;
  justify-content: start;
`;

export default HorizontalLayout;
