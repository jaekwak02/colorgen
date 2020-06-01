import React from "react";
import styled, { css } from "styled-components";

const Button = ({ isDisabled = false, onClick, ...props }) => (
  <ElContainer
    isDisabled={isDisabled}
    onClick={isDisabled ? () => null : onClick}
    tabIndex="0"
    {...props}
  />
);

const ElContainer = styled.button`
  height: 30px;
  padding: 0px 15px;
  border: 1px solid var(--color-neutral-500);
  background-color: var(--color-neutral-300);

  font-family: Roboto, Arial, sans-serif;
  color: white;
  text-align: center;
  line-height: 30px;

  transition: 0.25s;

  cursor: pointer;

  user-select: none;

  &:hover {
    background-color: var(--color-neutral-400);
  }

  ${(props) =>
    props.isDisabled &&
    css`
      background-color: var(--color-neutral-400);
      border-color: var(--color-neutral-500);
      color: var(--color-neutral-600);

      cursor: not-allowed;
    `}
`;

export default Button;
