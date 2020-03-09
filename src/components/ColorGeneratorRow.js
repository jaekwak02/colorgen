import React from "react";
import styled from "styled-components";
import color from "color";

const ColorGeneratorRow = ({
  colors,
  level,
  index,
  editingIndex,
  setEditingIndex,
  showConnector = false
}) => {
  return (
    <ElContainer>
      <ElColors>
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
        {showConnector && <ElConnector />}
      </ElColors>
      {typeof index === "number" && (
        <ElColorSelect
          onClick={() => setEditingIndex(index === editingIndex ? -1 : index)}
        >
          <ElColor style={{ backgroundColor: colors[level - 1] }} />
        </ElColorSelect>
      )}
    </ElContainer>
  );
};

const ElContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: auto auto auto 1fr;
  align-items: flex-start;
`;

const ElColors = styled.div`
  position: relative;
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

const ElColorSelect = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  justify-self: start;
  border: 1px solid var(--color-neutral-500);
`;

const ElConnector = styled.div`
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  top: -31px;
  transform: translateX(-50%);
  height: 30px;
  /* width: calc(100% - 75px); */
  width: 15px;
  background-color: var(--color-neutral-600);
`;

export default ColorGeneratorRow;
