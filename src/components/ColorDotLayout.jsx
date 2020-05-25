import React from "react";
import styled from "styled-components";

const ColorDotLayout = (props) => {
  return <StyledContainer {...props} />;
};

const StyledContainer = styled.div`
  background-color: var(--color-neutral-600);
  border: 1px solid var(--color-neutral-600);

  display: grid;
  grid-auto-flow: column;
  gap: 1px;
  align-items: center;
  justify-content: start;
  justify-self: start;
`;

export default ColorDotLayout;
