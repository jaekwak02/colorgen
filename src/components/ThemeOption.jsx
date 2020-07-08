import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import HorizontalLayout from "../components/HorizontalLayout";
import { calculateColor } from "../utils";

const ThemeOption = ({ theme, isActive, onDelete, ...rest }) => {
  return (
    <ElContainer isActive={isActive} {...rest}>
      <ElTitle>
        <div>{theme.name || "Untitled Theme"}</div>
        {onDelete && (
          <Button
            type="neutral"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
          >
            Delete
          </Button>
        )}
      </ElTitle>
      <HorizontalLayout>
        <ElPie viewBox="0 0 100 100">
          <circle r="50" cx="50" cy="50" fill="currentcolor" />
          {theme.colors.map((color, colorIndex) => {
            const radius = 49;
            const circumference = Math.PI * radius;
            const slice = circumference / theme.colors.length;
            const offset = colorIndex * (360 / theme.colors.length);

            return (
              <circle
                key={colorIndex}
                r={radius / 2}
                cx="50"
                cy="50"
                fill="transparent"
                stroke={color.color}
                strokeWidth={radius}
                strokeDasharray={`${slice} ${circumference - slice}`}
                transform={`rotate(${-90 + offset} 50 50)`}
              />
            );
          })}
          {theme.colors.map((color, colorIndex) => {
            const offset = colorIndex * (360 / theme.colors.length);

            return (
              <path
                key={colorIndex}
                d="M 50 50 L 50 0"
                stroke="currentcolor"
                strokeWidth="1"
                transform={`rotate(${offset} 50 50)`}
              />
            );
          })}
        </ElPie>
        <ElColors>
          {theme.colors.map((color, colorIndex) => (
            <ElColor key={colorIndex}>
              <div style={{ width: 90, backgroundColor: color.color }} />
              {[...new Array(9)].map((_, i) => {
                const delta = (i - color.index) * color.increment;
                return (
                  <div
                    key={i}
                    style={{
                      width: 30,
                      backgroundColor: calculateColor(color.color, delta),
                    }}
                  />
                );
              })}
            </ElColor>
          ))}
        </ElColors>
      </HorizontalLayout>
      {isActive && <ElActiveIndicator />}
    </ElContainer>
  );
};

const ElContainer = styled.div`
  position: relative;

  background-color: var(--color-neutral-300);
  padding: 15px;

  color: var(--color-neutral-700);

  cursor: pointer;

  transition: 0.25s;

  &:hover {
    color: white;
    background-color: var(--color-neutral-200);
  }
`;

const ElTitle = styled.div`
  height: 30px;

  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
`;

const ElPie = styled.svg`
  width: 120px;
  height: 120px;

  color: var(--color-neutral-600);

  transition: 0.25s;

  ${ElContainer}:hover & {
    color: white;
  }
`;

const ElColors = styled.div`
  height: 120px;
  border: 1px solid var(--color-neutral-600);
  background-color: var(--color-neutral-600);

  display: grid;
  gap: 1px;

  transition: 0.25s;

  ${ElContainer}:hover & {
    border: 1px solid white;
  }
`;

const ElColor = styled.div`
  background-color: var(--color-neutral-600);

  display: grid;
  gap: 1px;
  grid-auto-flow: column;
  grid-auto-columns: auto;
`;

const ElActiveIndicator = styled.div`
  position: absolute;
  top: 0px;
  left: -20px;

  border-right: 20px solid var(--color-neutral-500);
  border-top: 90px solid transparent;
  border-bottom: 90px solid transparent;
`;

export default ThemeOption;
