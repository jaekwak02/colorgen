import React from "react";
import styled from "styled-components";
import Color from "color";

const ColorDisplay = ({ theme, onColorClick }) => {
  return (
    <ElColors>
      {theme.colors.map((color, colorIndex) => {
        const isDark = Color(color.color).isDark();

        return (
          <ElColor
            key={colorIndex}
            style={{
              backgroundColor: color.color,
              color: isDark ? "white" : "black",
            }}
            onClick={() => onColorClick(colorIndex)}
          >
            {color.color}
          </ElColor>
        );
      })}
    </ElColors>
  );
};

const ElColors = styled.div`
  border: 1px solid var(--color-neutral-600);
  background-color: var(--color-neutral-600);

  display: grid;
  gap: 1px;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
`;

const ElColor = styled.div`
  height: 120px;

  display: grid;
  align-items: center;
  justify-items: center;

  cursor: pointer;

  &:hover {
    outline: 1px solid var(--color-neutral-900);
  }
`;

export default ColorDisplay;
