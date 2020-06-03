import React from "react";
import styled from "styled-components";

const TextInput = ({ value, ...rest }) => (
  <ElInput value={value || ""} {...rest} />
);

const ElInput = styled.input`
  border: 1px solid var(--color-neutral-500);
  background-color: var(--color-neutral-300);
  padding: 0px 15px;
  height: 30px;

  color: white;
  line-height: 28px;

  &::placeholder {
    color: var(--color-neutral-500);
  }
`;

export default TextInput;
