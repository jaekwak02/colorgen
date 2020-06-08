import React from "react";
import styled, { css } from "styled-components";
import { calculateColor } from "../utils";

const ThemeOption = ({ theme, isActive, onDelete, ...rest }) => {
  return (
    <ElContainer isActive={isActive} {...rest}>
      <ElTitle>
        <div>{theme.name || "Untitled Theme"}</div>
        {onDelete && (
          <ElDelete
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
          >
            ✕
          </ElDelete>
        )}
      </ElTitle>
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
  position: relative;

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

const ElTitle = styled.div`
  height: 30px;

  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
`;

const ElDelete = styled.div`
  cursor: pointer;
  font-weight: 700;

  &:hover {
    color: var(--color-error-400);
  }
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
  padding-left: 60px;

  display: grid;
  gap: 1px;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
`;

const ElActiveIndicator = styled.div`
  position: absolute;
  top: 30px;
  left: -20px;
  /* transform: translateY(-50%); */

  border-right: 15px solid var(--color-neutral-700);
  border-top: 60px solid transparent;
  border-bottom: 60px solid transparent;
`;

export default ThemeOption;
