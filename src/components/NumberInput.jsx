import React from "react";
import styled from "styled-components";

const NumberInput = ({
  label,
  value,
  onChange,
  increment = 1,
  formatter = (n) => n,
}) => {
  return (
    <ElContainer>
      <div>{label}</div>
      <ElButton onClick={() => onChange(value - increment)}>–</ElButton>
      <ElValue>{formatter(value)}</ElValue>
      <ElButton onClick={() => onChange(value + increment)}>+</ElButton>
    </ElContainer>
  );
};

const ElContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px 80px 50px;
  align-items: center;
  gap: 15px;
`;

const ElButton = styled.button`
  border: 1px solid var(--color-neutral-500);
  background-color: var(--color-neutral-300);
  height: 30px;

  display: grid;
  align-items: center;
  justify-items: center;

  font-size: 24px;
  color: var(--color-neutral-700);

  cursor: pointer;

  user-select: none;

  &:hover {
    border: 1px solid var(--color-neutral-700);
    color: white;
  }

  &:focus {
    border: 1px solid var(--color-primary-500);
    outline: none;
  }
`;

const ElValue = styled.div`
  border: 1px solid var(--color-neutral-500);
  background-color: var(--color-neutral-300);
  height: 30px;

  display: grid;
  align-items: center;
  justify-items: center;
`;

export default NumberInput;
