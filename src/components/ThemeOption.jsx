import React from "react";
import styled, { css } from "styled-components";
import { calculateColor } from "../utils";

const ThemeOption = ({ theme, isActive, ...rest }) => {
  return (
    <ElContainer isActive={isActive} {...rest}>
      <div>{theme.name || "Untitled Theme"}</div>
      <ElColors>
        {theme.colors.map((color, colorIndex) => (
          <ElColor style={{ backgroundColor: color.color }} key={colorIndex}>
            {[...new Array(9)].map((_, i) => {
              const delta = (i - color.index) * color.increment;
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: calculateColor(color.color, delta),
                  }}
                />
              );
            })}
          </ElColor>
        ))}
      </ElColors>
      {isActive && <ElActiveIndicator />}
    </ElContainer>
  );
};

const ElContainer = styled.div`
  position:relative;
  display: grid;
  gap: 5px;

  color: var(--color-neutral-700);

  cursor: pointer;

  transition: 0.25s;

  &:hover {
    color: white;
  }

  /* ${(props) =>
    ({
      true: css`
        background-color: white;
      `,
    }[props.isActive])} */
`;

const ElColors = styled.div`
  height: 120px;
  border: 1px solid var(--color-neutral-600);
  background-color: var(--color-neutral-600);

  display: grid;
  gap: 1px;
  grid-auto-columns: 1fr;

  transition: 0.25s;

  ${ElContainer}:hover & {
    border: 1px solid white;
  }
`;

const ElColor = styled.div`
  background-color: var(--color-neutral-600);
  padding-left: 100px;

  display: grid;
  gap: 1px;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
`;

const ElActiveIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: -25px;
  transform: translateY(-50%);

  border-right: 15px solid var(--color-neutral-700);
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
`;

export default ThemeOption;
