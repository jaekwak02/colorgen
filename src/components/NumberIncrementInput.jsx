import React from "react";
import styled from "styled-components";

const NumberIncrementInput = ({
  value = 0,
  increment = 1,
  showValue = true,
  incrementSymbol = "+",
  decrementSymbol = "–",
  onChange = () => null,
  formatter = (x) => x,
}) => {
  return (
    <ElContainer>
      <ElIncrement onClick={() => onChange(value + increment, +increment)}>
        {incrementSymbol}
      </ElIncrement>
      {showValue ? <ElContent>{formatter(value)}</ElContent> : <div />}
      <ElIncrement onClick={() => onChange(value - increment, -increment)}>
        {decrementSymbol}
      </ElIncrement>
    </ElContainer>
  );
};

const ElContainer = styled.div`
  width: 50px;

  display: grid;
  grid-template-rows: 1fr 1fr 1fr;

  transition: 0.25s;
`;

const ElIncrement = styled.div`
  background-color: var(--color-neutral-300);
  border: 1px solid var(--color-neutral-500);

  font-weight: 700;

  display: grid;
  align-items: center;
  justify-items: center;

  cursor: pointer;

  user-select: none;

  transition: 0.25s;

  &:hover {
    background-color: var(--color-neutral-400);
  }
`;

const ElContent = styled.div`
  background-color: var(--color-neutral-300);
  border-left: 1px solid var(--color-neutral-500);
  border-right: 1px solid var(--color-neutral-500);

  display: grid;
  align-items: center;
  justify-items: center;

  font-size: 0.8rem;
`;

export default NumberIncrementInput;
