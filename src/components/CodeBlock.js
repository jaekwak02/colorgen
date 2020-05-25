import React from "react";
import styled from "styled-components";

const CodeBlock = (props) => <ElContainer {...props} />;

const ElContainer = styled.div`
  background-color: var(--color-neutral-300);
  border: 1px solid var(--color-neutral-500);
  padding: 30px;
  max-width: 600px;

  font-family: "Roboto Mono", monospace;
  white-space: pre-line;
`;

export default CodeBlock;
