import React from "react";
import styled from "styled-components";
import color from "color";

const ColorGeneratorRow = ({
  colors,
  level,
  setColor,
  index,
  editingIndex,
  setEditingIndex
}) => {
  return (
    <ElContainer>
      <ElColorOptions>
        {colors.map((c, colorIndex) => (
          <ElColor
            key={colorIndex}
            style={{
              backgroundColor: c,
              color: color(c).isLight() ? "black" : "white"
            }}
          >
            {colorIndex === level - 1 && "╳"}
          </ElColor>
        ))}
      </ElColorOptions>
      <ElColorOptions
        onClick={() => setEditingIndex(index === editingIndex ? -1 : index)}
      >
        <ElColor style={{ backgroundColor: colors[level - 1] }}></ElColor>
      </ElColorOptions>
    </ElContainer>
  );
};

const ElContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: auto auto 1fr;
`;

const ElColorOptions = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  justify-self: start;
  border: 1px solid var(--color-neutral-500);
`;

const ElColor = styled.div`
  height: 75px;
  width: 75px;

  display: grid;
  align-items: center;
  justify-items: center;
`;

const ElColorPickerContainer = styled.div`
  height: 0;
`;

export default ColorGeneratorRow;
