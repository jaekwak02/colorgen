import React from "react";
import styled from "styled-components";

const ColorRow = (props) => {
  return <StyledContainer {...props} />;
};

const StyledContainer = styled.div`
  display: grid;
  gap: 30px;
  grid-auto-flow: column;
  justify-content: start;
`;

export default ColorRow;
