import React from "react";
import styled from "styled-components";
import Color from "color";

const ColorDotSecondary = ({ color, isIndex }) => {
  return (
    <StyledContainer style={{ backgroundColor: color }}>
      {isIndex && (
        <StyledIndexMarker
          style={{
            border: `1px solid ${
              Color(color).isDark()
                ? "var(--color-neutral-700)"
                : "var(--color-neutral-200)"
            }`,
          }}
        />
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 80px;
  width: 80px;

  display: grid;
  place-content: center;
`;

const StyledIndexMarker = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 15px;
`;

export default ColorDotSecondary;
