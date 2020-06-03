import React from "react";
import styled, { css } from "styled-components";

const Badge = ({ info = false, success = false, error = false, ...props }) => (
  <ElContainer info={info} success={success} error={error} {...props} />
);

const ElContainer = styled.div`
  display: inline-block;
  padding: 4px 15px;
  border: 1px solid var(--color-neutral-500);
  border-radius: 3px;

  font-size: 0.85rem;
  white-space: nowrap;

  ${(props) =>
    props.info &&
    css`
      border-color: var(--color-primary-600);
      background-color: var(--color-primary-100);
      color: var(--color-primary-600);
    `}

  ${(props) =>
    props.success &&
    css`
      border-color: var(--color-success-400);
      background-color: var(--color-success-100);
      color: var(--color-success-400);
    `}

  ${(props) =>
    props.error &&
    css`
      border-color: var(--color-error-600);
      background-color: var(--color-error-100);
      color: var(--color-error-600);
    `}
`;

export default Badge;
