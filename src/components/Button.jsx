import React from "react";
import styled, { css } from "styled-components";

const Button = ({
  isDisabled = false,
  type = "neutral",
  onClick,
  ...props
}) => (
  <ElContainer
    isDisabled={isDisabled}
    onClick={isDisabled ? () => null : onClick}
    tabIndex="0"
    type={type}
    {...props}
  />
);

const styles = {
  neutral: css`
    border: 1px solid var(--color-neutral-500);
    background-color: var(--color-neutral-300);

    &:hover {
      background-color: var(--color-neutral-400);
    }
  `,
  primary: css`
    border: 1px solid var(--color-primary-700);
    background-color: var(--color-primary-400);

    &:hover {
      background-color: var(--color-primary-500);
    }
  `,
  error: css`
    border: 1px solid var(--color-error-700);
    background-color: var(--color-error-400);

    &:hover {
      background-color: var(--color-error-500);
    }
  `,
};

const ElContainer = styled.button`
  height: 30px;
  padding: 0px 15px;
  background-color: black;

  font-family: Roboto, Arial, sans-serif;
  color: white;
  text-align: center;
  line-height: 30px;

  transition: 0.25s;

  cursor: pointer;

  user-select: none;

  ${(props) => styles[props.type]}

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
