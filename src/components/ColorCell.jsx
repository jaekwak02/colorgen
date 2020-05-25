import React from "react";
import styled from "styled-components";

const ColorCell = ({ color, isEditing, onClick }) => {
  return (
    <StyledContainer onClick={onClick} style={{ backgroundColor: color }}>
      {isEditing && <StyledEditingMarker />}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
  height: 80px;
  width: 80px;
`;

const StyledEditingMarker = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;

  border: 1px solid white;
`;

export default ColorCell;
