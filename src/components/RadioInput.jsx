import React from "react";
import styled, { css } from "styled-components";

const RadioInput = ({ value, onChange, options = [] }) => {
  return (
    <ElContainer>
      {options.map((o, oIndex) => (
        <ElOption key={oIndex} onClick={() => onChange(o.value)}>
          <ElCheckbox isSelected={value === o.value} />
          <div>{o.label}</div>
        </ElOption>
      ))}
    </ElContainer>
  );
};

const ElContainer = styled.div`
  display: grid;
  gap: 10px;
  align-content: flex-start;
  justify-items: start;
`;

const ElOption = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: auto auto 1fr;
  align-items: center;

  color: var(--color-neutral-800);

  cursor: pointer;

  transition: 0.25s;

  &:hover {
    color: white;
  }
`;

const ElCheckbox = styled.div`
  border: 1px solid var(--color-neutral-500);
  height: 20px;
  width: 20px;

  transition: 0.25s;

  ${(props) =>
    props.isSelected &&
    css`
      background-color: var(--color-primary);
    `}

  ${ElOption}:hover & {
    border-color: white;
  }
`;

export default RadioInput;
