import React from "react";
import Color from "color";
import styled from "styled-components";

const ColorCell = ({ color, isIndex, isEditing, delta }) => {
  const textColor = Color(color).isDark() ? "white" : "black";
  const markerColor = Color(color).isDark()
    ? "var(--color-neutral-700)"
    : "var(--color-neutral-200)";

  return (
    <StyledContainer style={{ backgroundColor: color }}>
      {isEditing && <span style={{ color: textColor }}>{delta}%</span>}
      {isIndex && (
        <StyledIndexMarker
          isEditing={isEditing}
          style={{
            border: `1px solid ${markerColor}`,
          }}
        />
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  position: relative;
  height: 80px;
  width: 80px;

  display: grid;
  justify-items: center;
  align-items: center;
`;

const StyledIndexMarker = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  height: ${(props) => (props.isEditing ? 60 : 40)}px;
  width: ${(props) => (props.isEditing ? 60 : 40)}px;
  border-radius: 30px;

  transition: 0.5s;
`;

export default ColorCell;
