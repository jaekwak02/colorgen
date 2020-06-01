import React from "react";
import styled, { css } from "styled-components";

const ColorCellLayout = ({ children, isEditing, onClick, ...rest }) => {
  return (
    <StyledContainer {...rest} onClick={onClick}>
      {children}
      {isEditing && <StyledEditingMarker />}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;

  background-color: var(--color-neutral-600);
  border: 1px solid var(--color-neutral-600);

  display: grid;
  grid-auto-flow: column;
  gap: 1px;
  align-items: center;
  justify-content: start;
  justify-self: start;

  ${(props) =>
    props.onClick
      ? css`
          cursor: pointer;

          &:hover {
            border: 1px solid var(--color-neutral-700);
          }
        `
      : ""}
`;

const StyledEditingMarker = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;

  border: 1px solid white;
`;

export default ColorCellLayout;
