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
          style={{ backgroundColor: colors[level - 1] }}
        />
      )}
      {typeof index === "number" && index === editingIndex && <ElColorSelectIndicator />}
    </ElContainer>
  );
};

const ElContainer = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: minmax(0, 675px) minmax(0, 75px) 30px;
  align-items: flex-start;
`;

const ElColors = styled.div`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  border: 1px solid var(--color-neutral-500);
`;

const ElColor = styled.div`
  height: 75px;
  min-width: 30px;

  display: grid;
  align-items: center;
  justify-items: center;
`;


const ElColorSelect = styled.div`
  height: 75px;
  width: 75px;
  border: 1px solid var(--color-neutral-500);

  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  justify-self: start;

  cursor: pointer;
`;

const ElColorSelectIndicator = styled.div`
  position: relative;

  &::before {
    content: "";
    display: block;
    border-top: 37.5px solid transparent;
    border-left: 15px solid var(--color-neutral-700);
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    border-bottom: 37.5px solid transparent;
    border-left: 15px solid var(--color-neutral-700);
  }
`
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
