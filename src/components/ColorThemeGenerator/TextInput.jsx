import React from "react";
import styled from "styled-components";

const TextInput = ({ value, onChange, ...rest }) => (
  <ElInput
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    {...rest}
  />
);

const ElInput = styled.input``;

export default TextInput;
